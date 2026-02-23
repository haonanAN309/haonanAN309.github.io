---
title: "[CVPR 2026] RecoverMark: Robust Watermarking for Localization and Recovery of Manipulated Faces"
collection: publications
category: first_author
permalink: /publication/2026_CVPR_RecoverMark
excerpt: '**Haonan An**, Ye Xiaohui, Guang Hua, Yihang Tao, Hangcheng Cao, Xiangyu Yu, Yuguang Fang'
date: 2026-02-21
paperurl: '' 
---
<!-- venue: '' -->
<!-- slidesurl: '' -->
<!-- paperurl: '' -->
<!-- citation: '' -->

The proliferation of AI-generated content (AIGC) has facilitated sophisticated face manipulation, severely undermining visual integrity and posing unprecedented challenges to intellectual property (IP). In response, a common proactive defense leverages fragile watermarks to detect, localize, or even recover manipulated regions. However, these methods always assume an adversary unaware of the embedded watermark, overlooking their inherent vulnerability to watermark removal attacks. Furthermore, this fragility is exacerbated in the commonly used dual-watermark strategy that adds a robust watermark for image ownership verification, where mutual interference and limited embedding capacity reduce the fragile watermark's effectiveness. To address the gap, we propose RecoverMark, a watermarking framework that achieves robust manipulation localization, content recovery, and ownership verification simultaneously. Our key insight is twofold. First, we exploit a critical real-world constraint: an adversary must preserve the background's semantic consistency to avoid visual detection, even if they apply global, imperceptible watermark removal attacks. Second, using the image's own content (face, in this paper) as the watermark enhances extraction robustness. Based on these insights, RecoverMark treats the protected face content itself as the watermark and embeds it into the surrounding background. By designing a robust two-stage training paradigm with carefully crafted distortion layers that simulate comprehensive potential attacks and a progressive training strategy, RecoverMark achieves a robust watermark embedding in no fragile manner for image manipulation localization, recovery, and image IP protection simultaneously. Extensive experiments demonstrate the proposed RecoverMark's robustness against both seen and unseen attacks and its generalizability to in-distribution (ID) and out-of-distribution (OOD) data.

