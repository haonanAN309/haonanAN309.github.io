---
title: "[CVPR 2025] Decoder Gradient Shield: Provable and High-Fidelity Prevention of Gradient-Based Box-Free Watermark Removal"
collection: publications
category: first_author
permalink: /publication/2025_CVPR_DGS
excerpt: '**Haonan An**, Guang Hua, Zhengru Fang, Guowen Xu, Susanto Rahardja, Yuguang Fang'
date: 2025-06-01
paperurl: '[https://ieeexplore.ieee.org/abstract/document/10646529](https://openaccess.thecvf.com/content/CVPR2025/html/An_Decoder_Gradient_Shield_Provable_and_High-Fidelity_Prevention_of_Gradient-Based_Box-Free_CVPR_2025_paper.html)' 
---
<!-- venue: '' -->
<!-- slidesurl: '' -->
<!-- paperurl: '' -->
<!-- citation: '' -->


The intellectual property of deep image-to-image models can be protected by the so-called box-free watermarking. It uses an encoder and a decoder, respectively, to embed into and extract from the model's output images invisible copyright marks. Prior works have improved watermark robustness, focusing on the design of better watermark encoders. In this paper, we reveal an overlooked vulnerability of the unprotected watermark decoder which is jointly trained with the encoder and can be exploited to train a watermark removal network. To defend against such an attack, we propose the decoder gradient shield (DGS) as a protection layer in the decoder API to prevent gradient-based watermark removal with a closed-form solution. The fundamental idea is inspired by the classical adversarial attack, but is utilized for the first time as a defensive mechanism in the box-free model watermarking. We then demonstrate that DGS can reorient and rescale the gradient directions of watermarked queries and stop the watermark remover's training loss from converging to the level without DGS, while retaining decoder output image quality. Experimental results verify the effectiveness of proposed method. 

