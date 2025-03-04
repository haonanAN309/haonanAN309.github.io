---
title: "[ICRA 2024] SmartCooper: Vehicular Collaborative Perception with Adaptive Fusion and Judger Mechanism"
collection: publications
category: Collaboration
permalink: /publication/2024_ICRA_SmartCooper
excerpt: 'Yuang Zhang, **Haonan An**, Zhengru Fang, Guowen Xu, Yuan Zhou, Xianhao Chen, Yuguang Fang'
date: 2024-02-01
paperurl: 'https://ieeexplore.ieee.org/abstract/document/10610199' 
---

<!-- venue: '' -->
<!-- slidesurl: '' -->
<!-- citation: '' -->

In recent years, autonomous driving has garnered significant attention due to its potential for improving road safety through collaborative perception among connected and autonomous vehicles (CAVs). However, time-varying channel variations in vehicular transmission environments demand dynamic allocation of communication resources. Moreover, in the context of collaborative perception, it is important to recognize that not all CAVs contribute valuable data, and some CAV data even have detrimental effects on collaborative perception. In this paper, we introduce SmartCooper, an adaptive collaborative perception framework that incorporates communication optimization and a judger mechanism to facilitate CAV data fusion. Our approach begins with optimizing the connectivity of vehicles while considering communication constraints. We then train a learnable encoder to dynamically adjust the compression ratio based on the channel state information (CSI). Subsequently, we devise a judger mechanism to filter the detrimental image data reconstructed by adaptive decoders. We evaluate the effectiveness of our proposed algorithm on the OpenCOOD platform. Our results demonstrate a substantial reduction in communication costs by 23.10% compared to the non-judger scheme. Additionally, we achieve a significant improvement on the average precision of Intersection over Union (AP@IoU) by 7.15% compared with state-of-the-art schemes.
