---
title: "[TDSC 2026] NWaaS: A Non-Intrusive and Privacy-Preserving Watermarking-as-a-Service System with Adaptive Resource Scheduling"
ccf: A
collection: publications
category: first_author
permalink: /publication/2026_TDSC_NWaaS
excerpt: '**Haonan An, Qianyao Ren, Guang Hua, Tao Li, Yu Guo, Yanan Ma, Hangcheng Cao, Yuguang Fang'
date: 2026-03-01
paperurl: '' 
---

<!-- venue: '' -->
<!-- slidesurl: '' -->
<!-- citation: '' -->

Securing intellectual property (IP) in Machine Learning as a Service is critical yet challenging. While deep neural network watermarking serves as a standard defense against model extraction, existing Watermarking-as-a-Service paradigms face a triple challenge of intrusiveness, privacy risks, and inefficiency. To address these challenges, we propose Non-intrusive Watermarking as a Service (NWaaS), a holistic framework enabling trustworthy and efficient IP protection. We first introduce $\mathtt{ShadowMark}$, a novel watermarking algorithm that establishes a side-channel for ownership verification without modifying the model. It ensures zero performance degradation and eliminates the need for parameter-heavy fine-tuning as well as access to original training data, thereby addressing the intrusiveness and inefficiency inherent in existing approaches. Leveraging this non-intrusive property, we design a collaborative partitioning mechanism that allows model owners to offload self-defined partial layers, enabling a flexible trade-off between IP privacy and service cost. Furthermore, to mitigate latency from collaborative computing under high concurrency and enhance system resource utilization, we propose proportion disparity joint scheduling, a payload-balancing resource scheduling algorithm tailored to the heterogeneous constraints of edge-cloud environments. Extensive experiments demonstrate that NWaaS provides robust ownership verification across diverse continuous X-to-Image modalities, while ensuring secure owner privacy protection and superior system performance.
