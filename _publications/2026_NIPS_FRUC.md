---
title: "[NeurIPS 2026] FRUC: Feedforward Dynamic Scene Reconstruction from Uncalibrated Collaborative Driving Views"
ccf: A
collection: publications
category: Collaboration
permalink: /publication/2026_NIPS_FRUC
excerpt: 'Yihang Tao, Yu Guo, Zhengru Fang, **Haonan An**, Yuguang Fang'
date: 2026-09-27
paperurl: 'https://arxiv.org/abs/2605.29997'
---

<!-- venue: '' -->
<!-- slidesurl: '' -->
<!-- citation: '' -->


We present FRUC, a feed-forward 3D Gaussian splatting framework for dynamic scene reconstruction from uncalibrated collaborative driving views. Existing multi-agent reconstruction frameworks are often hindered by rigid prerequisites, demanding precise spatial calibration and slow per-scene optimization. In this paper, we rethink this task by conceptualizing a distributed multi-vehicle network as a spatio-temporally unstructured ego-centric multi-camera system, where the core challenge lies in enhancing ego-centric occluded geometry through collaboration without degrading the ego's accurately observed visible geometry, while preserving reconstruction efficiency. For efficient reconstruction, FRUC is built upon a visual grounded geometric Transformer backbone to enable one-shot, calibration-free inference from a flexible number of multi-vehicle views. To achieve non-destructive geometric supplementation under uncalibrated cross-agent misalignment, FRUC first introduces an ego-centric causal occlusion field that explicitly derives occlusion evolution as latent priors by modeling agent-wise spatio-temporal correlations. Guided by these occlusion priors, it further formulates cross-agent integration as a deterministic residual denoising process via zero-initialized injection, turning challenging cross-agent fusion into bounded residual learning for robust collaborative blind-spot completion. Through extensive evaluations on the real-world V2XReal and UrbanIng-V2X datasets, FRUC is shown to be a new state-of-the-art for the scene reconstruction of dynamic collaborative driving environments, significantly outperforming existing methods in both rendering quality and efficiency.
