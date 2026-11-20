/* Independent video controls, with an optional synchronized comparison mode. */
const names = ['CausVid', 'Self Forcing', 'Causal Forcing', 'Reward Forcing', 'RAVEN', 'SGF', 'SGF+', 'Hindsight Forcing', 'Hindsight Forcing Long'];
let manifest = [];
const state = {
  short: { scene: 'car', time: 2.5, playing: false, mode: 'independent', operation: 0 },
  long: { scene: 'gold_rush_camp', time: 20, playing: false, mode: 'independent', operation: 0 }
};
const videoRecords = new WeakMap();

// Keep the per-video controls readable even in the compact comparison grid.
const playerStyles = document.createElement('style');
playerStyles.textContent = `
  .individual-controls{display:flex;align-items:center;gap:7px;padding:9px 8px;background:#fff;border-top:1px solid var(--line);font:inherit}
  .individual-play{flex:0 0 46px;min-height:30px;padding:4px 5px;border:1px solid #d5e0e4;border-radius:5px;background:#f5f8f9;color:#315460;font:inherit;font-size:11px;cursor:pointer}
  .individual-play:disabled{cursor:wait;color:#849299}
  .individual-seek{flex:1;min-width:32px;width:100%;accent-color:var(--teal);cursor:pointer}
  .individual-time{flex:0 0 auto;white-space:nowrap;color:#6d7c85;font-size:10px;font-variant-numeric:tabular-nums}
  .video-label{gap:8px;min-height:36px}.video-label strong{line-height:1.35}.video-label .badge{flex-shrink:0}
  .video-card video{cursor:pointer}.video-card video:focus-visible{outline:3px solid var(--teal);outline-offset:-3px}
  .video-error{margin:0;padding:0 9px 8px;background:white;color:#9b423e;font-size:11px;line-height:1.5}
  @media(max-width:480px){.individual-controls{flex-wrap:wrap}.individual-seek{order:3;flex-basis:100%}.individual-time{margin-left:auto}}
`;
document.head.appendChild(playerStyles);

function files(kind, scene) {
  return manifest.filter(a => a.kind === kind && a.scene === scene).sort((a, b) => a.method_index - b.method_index);
}

function videosFor(kind) {
  return [...document.querySelectorAll('#' + kind + '-grid video')];
}

function groupButton(kind, label) {
  document.getElementById(kind + '-play').textContent = label;
}

function cancelGroup(kind) {
  const st = state[kind];
  st.operation += 1;
  st.controller?.abort();
  st.controller = null;
  st.playing = false;
  st.mode = 'independent';
  st.resumeAfterSeek = false;
  groupButton(kind, '▶ Play all');
}

function leaveGroup(kind) {
  // Other videos keep their own playback state; no timer will pull this one back.
  cancelGroup(kind);
}

function displayTime(value) {
  return Math.max(0, value || 0).toFixed(1);
}

function updateIndividual(video) {
  const record = videoRecords.get(video);
  if (!record) return;
  const time = video.readyState ? video.currentTime : record.desiredTime;
  const duration = Number.isFinite(video.duration) ? video.duration : record.duration;
  if (!record.scrubbing) record.seek.value = time;
  record.seek.max = duration;
  record.clock.textContent = displayTime(time) + ' / ' + displayTime(duration) + ' s';
  record.seek.setAttribute('aria-valuetext', displayTime(time) + ' of ' + displayTime(duration) + ' seconds');
  if (!record.loading) record.play.textContent = video.paused || video.ended ? '▶ Play' : 'Ⅱ Pause';
  record.play.setAttribute('aria-label', (video.paused || video.ended ? 'Play ' : 'Pause ') + record.label);
  record.play.setAttribute('aria-pressed', String(!video.paused && !video.ended));
}

function showVideoError(video, message) {
  const record = videoRecords.get(video);
  if (!record) return;
  record.error.textContent = message;
  record.error.hidden = !message;
}

function mediaReady(video, event, isReady, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException('Cancelled', 'AbortError'));
    if (isReady()) return resolve();
    let timeout;
    const cleanup = () => {
      clearTimeout(timeout);
      video.removeEventListener(event, success);
      video.removeEventListener('error', failure);
      signal?.removeEventListener('abort', abort);
    };
    const success = () => { cleanup(); resolve(); };
    const failure = () => { cleanup(); reject(new Error('Unable to load this video.')); };
    const abort = () => { cleanup(); reject(new DOMException('Cancelled', 'AbortError')); };
    video.addEventListener(event, success, { once: true });
    video.addEventListener('error', failure, { once: true });
    signal?.addEventListener('abort', abort, { once: true });
    timeout = setTimeout(() => { cleanup(); reject(new Error('Video loading timed out.')); }, 30000);
  });
}

async function prepare(video, time, signal) {
  if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError');
  if (!video.getAttribute('src')) video.src = video.dataset.source;
  const metadata = mediaReady(video, 'loadedmetadata', () => video.readyState >= 1, signal);
  if (video.readyState < 1 && video.networkState !== 2) video.load();
  await metadata;
  const target = Math.min(Math.max(0, time), Math.max(0, video.duration - 0.05));
  if (Math.abs(video.currentTime - target) > 0.025 || video.seeking) {
    const seek = mediaReady(video, 'seeked', () => !video.seeking && Math.abs(video.currentTime - target) < 0.025, signal);
    video.currentTime = target;
    await seek;
  }
  await mediaReady(video, 'canplay', () => video.readyState >= 3, signal);
  if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError');
  updateIndividual(video);
}

function startIndividualOperation(video) {
  const record = videoRecords.get(video);
  leaveGroup(record.kind);
  record.controller?.abort();
  record.controller = new AbortController();
  record.operation += 1;
  record.loading = false;
  record.play.disabled = false;
  showVideoError(video, '');
  return { record, operation: record.operation, signal: record.controller.signal };
}

async function toggleIndividual(video) {
  const { record, operation, signal } = startIndividualOperation(video);
  if (!video.paused && !video.ended) {
    video.pause();
    updateIndividual(video);
    return;
  }
  record.loading = true;
  record.play.disabled = true;
  record.play.textContent = 'Loading…';
  try {
    const time = video.ended ? 0 : (video.readyState ? video.currentTime : record.desiredTime);
    await prepare(video, time, signal);
    if (operation !== record.operation || !video.isConnected) return;
    await video.play();
  } catch (error) {
    if (error.name !== 'AbortError' && video.isConnected) showVideoError(video, 'Unable to play. Please try again.');
  } finally {
    if (operation === record.operation) {
      record.loading = false;
      record.play.disabled = false;
      updateIndividual(video);
    }
  }
}

async function seekIndividual(video, time) {
  const { record, operation, signal } = startIndividualOperation(video);
  record.desiredTime = time;
  try {
    await prepare(video, time, signal);
  } catch (error) {
    if (error.name !== 'AbortError' && video.isConnected) showVideoError(video, 'Unable to seek. Please try again.');
  } finally {
    if (operation === record.operation) updateIndividual(video);
  }
}

function renderVideos(kind, scene) {
  cancelGroup(kind);
  const st = state[kind];
  videosFor(kind).forEach(video => {
    videoRecords.get(video)?.controller?.abort();
    video.pause();
    video.removeAttribute('src');
    video.load();
  });
  st.scene = scene;
  st.time = kind === 'short' ? 2.5 : 20;
  const grid = document.getElementById(kind + '-grid');
  grid.replaceChildren();
  files(kind, scene).forEach(file => {
    const name = names[file.method_index - 1];
    const label = name + ' — ' + scene.replaceAll('_', ' ');
    const card = document.createElement('div');
    card.className = 'video-card' + (file.method_index >= 8 ? ' ours' : '');
    const header = document.createElement('div');
    header.className = 'video-label';
    const title = document.createElement('strong');
    title.textContent = name;
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = file.method_index >= 8 ? 'Ours' : String(file.method_index).padStart(2, '0');
    header.append(title, badge);
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'none';
    video.controls = true;
    video.poster = file.poster;
    video.src = file.source;
    video.dataset.source = file.source;
    video.setAttribute('aria-label', label);
    const controls = document.createElement('div');
    controls.className = 'individual-controls';
    const play = document.createElement('button');
    play.className = 'individual-play';
    play.type = 'button';
    const seek = document.createElement('input');
    seek.className = 'individual-seek';
    seek.type = 'range';
    seek.min = 0;
    seek.max = file.duration;
    seek.step = 0.05;
    seek.value = st.time;
    seek.setAttribute('aria-label', label + ' timeline');
    const clock = document.createElement('span');
    clock.className = 'individual-time';
    const error = document.createElement('p');
    error.className = 'video-error';
    error.setAttribute('role', 'status');
    error.hidden = true;
    controls.append(play, seek, clock);
    card.append(header, video, controls, error);
    grid.append(card);
    const record = { kind, label, play, seek, clock, error, duration: file.duration, desiredTime: st.time, loading: false, operation: 0, scrubbing: false };
    videoRecords.set(video, record);
    play.addEventListener('click', () => toggleIndividual(video));
    seek.addEventListener('input', () => {
      leaveGroup(kind);
      record.scrubbing = true;
      clock.textContent = displayTime(Number(seek.value)) + ' / ' + displayTime(file.duration) + ' s';
    });
    seek.addEventListener('change', () => {
      record.scrubbing = false;
      seekIndividual(video, Number(seek.value));
    });
    // Native video controls also leave group mode before applying a local action.
    const useNativeControls = () => {
      leaveGroup(kind);
      record.controller?.abort();
      record.operation += 1;
      record.loading = false;
      record.play.disabled = false;
      updateIndividual(video);
    };
    video.addEventListener('pointerdown', useNativeControls);
    video.addEventListener('keydown', useNativeControls);
    ['play', 'pause', 'timeupdate', 'ended', 'loadedmetadata', 'seeked'].forEach(event => video.addEventListener(event, () => updateIndividual(video)));
    video.addEventListener('error', () => showVideoError(video, 'This video could not be loaded.'));
    updateIndividual(video);
  });
  document.querySelectorAll('#' + kind + '-tabs button').forEach(button => {
    const active = button.dataset.scene === scene;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  updateTime(kind);
}

function updateTime(kind) {
  const st = state[kind];
  const duration = files(kind, st.scene)[0]?.duration || (kind === 'short' ? 5.0625 : 59.8125);
  const seek = document.getElementById(kind + '-seek');
  seek.max = duration;
  seek.value = st.time;
  document.getElementById(kind + '-time').textContent = displayTime(st.time) + ' / ' + displayTime(duration) + ' s';
}

async function runGroup(kind, time, shouldPlay) {
  cancelGroup(kind);
  const st = state[kind];
  st.mode = shouldPlay ? 'group-loading' : 'group-seeking';
  st.resumeAfterSeek = shouldPlay;
  st.controller = new AbortController();
  const signal = st.controller.signal;
  const operation = st.operation;
  const videos = videosFor(kind);
  st.time = time;
  updateTime(kind);
  groupButton(kind, shouldPlay ? 'Loading…' : 'Seeking…');
  videos.forEach(video => {
    const record = videoRecords.get(video);
    record.controller?.abort();
    record.operation += 1;
    record.loading = false;
    record.play.disabled = false;
    video.pause();
    showVideoError(video, '');
    updateIndividual(video);
  });
  try {
    await Promise.all(videos.map(video => prepare(video, time, signal)));
    if (signal.aborted || operation !== st.operation) return;
    const rate = Number(document.getElementById(kind + '-speed').value);
    videos.forEach(video => { video.playbackRate = rate; });
    if (shouldPlay) await Promise.all(videos.map(video => video.play()));
    if (signal.aborted || operation !== st.operation) return;
    st.playing = shouldPlay;
    st.mode = shouldPlay ? 'group-playing' : 'group-paused';
    groupButton(kind, shouldPlay ? 'Ⅱ Pause all' : '▶ Play all');
  } catch (error) {
    if (error.name === 'AbortError' || operation !== st.operation) return;
    videos.forEach(video => video.pause());
    st.playing = false;
    st.mode = 'independent';
    groupButton(kind, 'Retry play all');
  }
}

['short', 'long'].forEach(kind => {
  document.querySelectorAll('#' + kind + '-tabs button').forEach(button => {
    button.addEventListener('click', () => renderVideos(kind, button.dataset.scene));
  });
  document.getElementById(kind + '-play').addEventListener('click', () => {
    const st = state[kind];
    if (st.playing || st.mode === 'group-loading') {
      cancelGroup(kind);
      videosFor(kind).forEach(video => video.pause());
      return;
    }
    const duration = files(kind, st.scene)[0]?.duration || 0;
    const time = st.time >= duration - 0.15 ? 0 : st.time;
    runGroup(kind, time, true);
  });
  const groupSeek = document.getElementById(kind + '-seek');
  groupSeek.addEventListener('input', () => {
    const st = state[kind];
    const resume = st.playing || st.resumeAfterSeek;
    cancelGroup(kind);
    videosFor(kind).forEach(video => video.pause());
    st.resumeAfterSeek = resume;
    st.mode = 'group-scrubbing';
    st.time = Number(groupSeek.value);
    updateTime(kind);
  });
  groupSeek.addEventListener('change', () => {
    runGroup(kind, Number(groupSeek.value), state[kind].resumeAfterSeek);
  });
  document.getElementById(kind + '-speed').addEventListener('change', event => {
    videosFor(kind).forEach(video => { video.playbackRate = Number(event.target.value); });
  });
});

setInterval(() => {
  ['short', 'long'].forEach(kind => {
    const st = state[kind];
    if (!st.playing || st.mode !== 'group-playing') return;
    const videos = videosFor(kind);
    const master = videos[0];
    if (!master) return;
    st.time = master.currentTime;
    updateTime(kind);
    if (master.ended) {
      videos.forEach(video => video.pause());
      cancelGroup(kind);
      return;
    }
    videos.slice(1).forEach(video => {
      if (!video.seeking && video.readyState >= 3 && Math.abs(video.currentTime - master.currentTime) > 0.3) {
        video.currentTime = master.currentTime;
      }
    });
  });
}, 150);
