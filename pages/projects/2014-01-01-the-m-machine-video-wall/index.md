---
title: The M Machine - 3D virtual light wall
date: 03/01/2013
description: 3D video composite concert visuals
thumbnail: thumbnail.jpg
---

![](./thumbnail.jpg) {.full-width}

In early 2013 The M Machine were invited to play at Ultra Music Festival in Miami, and we began the process of designing a new live show complete with an entirely new visual package. While the physical M light wall was a truly impressive stagepiece, it was impractical to tour with, particularly for festival shows where stage transition time is very limited.


<figure>
    <video src="./m-video-wall-03.webm" width="100%" autoplay loop></video>
    <figcaption>The virtual light wall in action on massive LED walls at Lucky Seattle, 2013</figcaption>
</figure>

We elected to build a completely digital version of our physical light wall, which could do everything the LED version could (responding to the OSC output of our original synchronized visual package) with the added trick of being able to be fully composited with digital video.

Using an amazing program called [TouchDesigner](https://www.derivative.ca/), I was able to composite a real-time generated 3D model of our M Light wall with pre-rendered 3D background video content by our frequent collaborator and brilliant motion graphics maven [Scott Pagano](http://www.neither-field.com/). Since TouchDesigner can ingest almost any kind of data, including OSC, we were able to send the same signals that drove the LED sequences of the physical light wall from Max into TouchDesigner, wire them to lights, and create a fully digital working version of our M.

<figure>
    <img src="./collage-1.jpg" width="100%" class="full-width"></img>
    <figcaption>Many late nights spent hacking Touch Designer with Phil Reyneri</figcaption>
</figure>

But perhaps the coolest feature of the virtual M was it's ability to **play** video on the panels themselves. By capturing video off of the GPU using [syphon recorder](http://syphon.v002.info/recorder/), we were able to take the output of my [Resolume](https://resolume.com/) VJ software and composite it into our TouchDesigner rig to display it in in real time on the face of the M. The live show thus became centered around an idea: The M would display different video content corresponding to each song in the performance. The visual show would consist of zooming into the M until you were immersed in the content, then zooming back out to show the visuals being displayed on the face of the M.


<figure>
    <video src="./m-video-wall-05.webm" width="100%" autoplay loop></video>
    <figcaption>Sequenced video for Shinichi Osawa's remix of Tiny Anthem</figcaption>
</figure>

Of course, it wasn't enough to be able to just play video on the virtual M, I had to sequence it and perform with it as well. So I built another OSC-based system for Ableton to sequence video clips and effects and resolume, as well as transitioning between scenes in Touch Designer. When all of it was working together, it was a massive scale orchestration of three machines and a multitude of controllers and sequencers generating a highly synchronized and deeply detailed visual performance.

<figure>
    <video src="./m-video-wall-04.webm" width="100%" autoplay loop></video>
    <figcaption>Austin, TX - 2013</figcaption>
</figure>

One of the most satisfying pieces of switching from the LED to the virtual light wall was the incredible array creative frontiers it opened up. Programming visuals for the LED light wall was truly a unique art form, and I felt as if I had perfected it around my 30th composition - there's only so many ways to make 32 pixels and 20 channels of LED ribbon look compelling. However the world of video and VFX is almost limitless, and I sampled thousands of videos of countless styles, mixing, mashing, and effecting them in countless ways to create new and interesting visual content for every track that I programmed accompanying visuals. From **Black**, which featured a strobing black, white, and red 3D spider, to **Luma**, which featured beautiful space imagery, the live show never felt stagnant, repetitive, or forced. And I could always invent new interpretations of the original sequenced data - **Deep Search**, for example, featured a minimalistic 3D pure geometric version of the original LED wall sequence that could be bent and distorted in real time with my MIDI controller.

<figure>
    <img src="./collage-2.jpg" width="100%" class="full-width"></img>
    <figcaption>Ableton, MAX/MSP, Touch Designer, and Resolume</figcaption>
</figure>

<video src="./m-video-wall-01.webm" width="100%" autoplay loop></video>

<video src="./m-video-wall-02.webm" width="100%" autoplay loop></video>
