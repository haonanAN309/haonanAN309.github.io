---
title: "[TDSC 2026] GCP: Guarded Collaborative Perception with Spatial-Temporal Aware Malicious Agent Detection"
ccf: A
collection: publications
category: Collaboration
permalink: /publication/2026_TDSC_GCP
excerpt: 'Yihang Tao, Senkang Hu, Yue Hu, **Haonan An**, Hangcheng Cao, Yuguang Fang'
date: 2026-04-26
paperurl: 'https://arxiv.org/abs/2501.02450' 
---

<!-- venue: '' -->
<!-- slidesurl: '' -->
<!-- citation: '' -->


Collaborative perception significantly enhances autonomous driving safety by extending each vehicle's perception range through message sharing among connected and autonomous vehicles. Unfortunately, it is also vulnerable to adversarial message attacks from malicious agents, resulting in severe performance degradation. While existing defenses employ hypothesis-and-verification frameworks to detect malicious agents based on single-shot outliers, they overlook temporal message correlations, which can be circumvented by subtle yet harmful perturbations in model input and output spaces. This paper reveals a novel blind area confusion (BAC) attack that compromises existing single-shot outlier-based detection methods. As a countermeasure, we propose GCP, a Guarded Collaborative Perception framework based on spatial-temporal aware malicious agent detection, which maintains single-shot spatial consistency through a confidence-scaled spatial concordance loss, while simultaneously examining temporal anomalies by reconstructing historical bird's eye view motion flows in low-confidence regions. We also employ a joint spatial-temporal Benjamini-Hochberg test to synthesize dual-domain anomaly results for reliable malicious agent detection. Extensive experiments demonstrate GCP's superior performance under diverse attack scenarios, achieving up to 34.69% improvements in AP@0.5 compared to the state-of-the-art CP defense strategies under BAC attacks, while maintaining consistent 5-8% improvements under other typical attacks. 
