---
title: Garph - GraphQL. Reimagined.
description: Garph provides fullstack TypeScript experience for building GraphQL-APIs without codegen
aside: false
sidebar: false
layout: page
---

<style>
  .homepage .container {
    max-width: 1280px;
    margin: auto;
    padding: 80px 24px;
  }

  /* .homepage .container.features {
    padding: 80px 24px
  } */

  .homepage .hero {
    align-items: center;
    display: flex;
    flex-direction: column;
    /* margin-bottom: 80px; */
    margin-top: 20px;
  }

  .homepage .hero-heading {
    font-size: 90px;
    font-weight: 800;
    margin: 0;
    padding: 0;
    line-height: 1.15;
    text-align: center;
  }

  .homepage .hero-heading span {
    display: block
  }

  .homepage .heading-gradient {
    background: linear-gradient(120deg, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
    color: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .homepage .hero-subheading {
    margin-top: 25px;
    font-weight: 400;
    font-size: 24px;
    color: var(--vp-c-text-2);
    max-width: 600px;
    text-align: center;
    line-height: 1.5
  }

  .homepage .hero-actions {
    margin-top: 25px;
    margin-bottom: 40px;
    display: flex
  }

  .homepage .hero-action {
    margin: 0 6px;
    font-size: 18px;
    border-radius: 40px;
    padding: 14px 18px;
    display: inline-flex;
    font-weight: 600
  }

  .homepage .hero-action.primary {
    background: white;
    color: black
  }

  .homepage .hero-action.secondary {
    background: var(--vp-c-brand);
    color: white
  }

  .homepage video {
    max-height: 640px;
    width: 100%;
    min-height: 200px;
    margin-top: 20px;
    margin-bottom: 80px;
    padding: 16px;
    background-color: #0c0f14;
    border-radius: 16px;
    box-shadow: 0 40px 60px rgba(0,0,0,.6);
    transition: all .2s linear
  }

  .homepage .try-link-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .homepage .try-link {
    background-color: rgba(255,255,255,.3);
    -webkit-backdrop-filter: blur(10px);
    color: white;
    font-weight: 500;
    padding: 14px 20px;
    border-radius: 40px;
    opacity: 0;
    transition: all .25s linear;
    margin-top: -40px
  }

  .video-backdrop {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .video-backdrop:hover > video {
    filter: blur(4px)
  }

  .video-backdrop:hover > .try-link-container > .try-link {
    opacity: 1
  }
</style>

<div class="homepage">
  <div class="container">
    <div class="hero">
      <h1 class="hero-heading">
        <span>GraphQL.</span>
        <span class="heading-gradient">Reimagined.</span>
      </h1>
      <p class="hero-subheading">
        Garph provides fullstack TypeScript experience for building GraphQL-APIs without codegen
      </p>
      <div class="hero-actions">
        <a href="https://github.com/stepci/garph/stargazers" class="hero-action primary">
          <img src="/icons/star.svg" width="20" height="20" />
          <span style="padding-left: 8px">Star us</span>
        </a>
        <a href="/docs" class="hero-action secondary">
          <span style="padding-right: 8px">Get started</span>
          <img src="/icons/chevron-right.svg" width="20" height="20" />
        </a>
      </div>
      <figure class="video-backdrop">
        <video
          src="https://user-images.githubusercontent.com/10400064/222474710-bc263775-06b8-4a78-8099-676a9ad3c7a4.mov"
          autoplay="true"
          loop="true"
          muted="true"
        >
        </video>
        <div class="try-link-container">
          <a href="#" class="try-link">Try on Stackblitz →</a>
        </div>
      </figure>
  </div>
  </div>
  <div style="background: var(--vp-c-bg-alt)">
    <div class="container features">
    dsds
    </div>
  </div>
</div>
