---
title: "[CVPR 2026] Learning Mutual View Information Graph for Adaptive Adversarial Collaborative Perception"
ccf: A
collection: publications
category: Collaboration
permalink: /publication/2026_CVPR_CAV_Attack
excerpt: 'Yihang Tao, Senkang Hu, **Haonan An**, Zhengru Fang, Hangcheng Cao, Yuguang Fang '
date: 2026-02-21
paperurl: '' 
---

<!-- venue: '' -->
<!-- slidesurl: '' -->
<!-- citation: '' -->


Collaborative perception (CP) enables data sharing among connected and autonomous vehicles (CAVs) to enhance driving safety. However, CP systems are vulnerable to adversarial attacks where malicious agents forge false objects via feature-level perturbations. Current defensive systems use threshold-based consensus verification by comparing collaborative and ego detection results. Yet, these defenses remain vulnerable to more sophisticated attack strategies that could exploit two critical weaknesses: (i) lack of robustness against attacks with systematic timing and target region optimization, and (ii) inadvertent disclosure of vulnerability knowledge through implicit confidence information in shared collaboration data. In this paper, we propose MVIG attack, a novel adaptive adversarial CP framework learning to capture vulnerability knowledge disclosed by different defensive CP systems from a unified mutual view information graph (MVIG) representation. Our approach combines MVIG representation with temporal graph learning to generate evolving fabrication risk maps and employs entropy-aware vulnerability search to optimize attack location, timing and persistence, enabling adaptive attacks with generalizability across various defensive configurations. Extensive evaluations on OPV2V and Adv-OPV2V datasets demonstrate that MVIG attack reduces defense success rates by up to 62% against state-of-the-art defenses while achieving 47% lower detection for persistent attacks at 29.9 FPS, exposing critical security gaps in CP systems.
