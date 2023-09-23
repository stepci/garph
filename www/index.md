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

  .homepage .hero {
    align-items: center;
    display: flex;
    flex-direction: column;
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

  @keyframes gradient {
    0% {
      background-size: 50% 150%
    }

    100% {
      background-size: 100% 100%
    }
  }

  .homepage .heading-gradient {
    background: linear-gradient(120deg, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
    color: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: 1s gradient forwards;
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

  .homepage .video-backdrop {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .homepage .video-backdrop:hover > video {
    filter: blur(4px)
  }

  .homepage .video-backdrop:hover > .try-link-container > .try-link {
    opacity: 1
  }

  .homepage .features {
    display: grid;
    grid-template-columns: repeat(4, 1fr)
  }

  .homepage .feature {
    display: flex;
    align-items: center
  }

  .homepage .feature-title {
    font-size: 20px;
    font-weight: 600
  }

  .homepage .feature-subtitle {
    color: var(--vp-c-text-2)
  }

  .homepage .feature-description {
    display: flex;
    flex-direction: column;
  }

  .homepage .feature-icon {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .homepage .feature-icon img {
    width: auto;
    height: 50px
  }

  .homepage .quote {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 80px 0
  }

  .homepage blockquote {
    font-size: 42px;
    font-weight: 700;
    line-height: 1.2;
    max-width: 900px;
  }

  .homepage figcaption {
    color: var(--vp-c-text-2);
    margin-top: 15px;
    font-size: 18px
  }

  .homepage .section-title {
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 40px;
    color: var(--vp-c-text-2)
  }

  .homepage .start-link {
    border-radius: 40px;
    padding: 4px;
    background: linear-gradient(120deg, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
    background-size: 100% 100%;
    background-repeat: repeat-y;
    display: inline-flex;
    transition: all 10s linear
  }

  .homepage .start-link a {
    background: var(--vp-c-bg);
    padding: 14px 20px;
    border-radius: 40px;
    font-size: 18px;
    font-weight: 600;
  }

  .homepage .start-link a:hover {
    background: transparent;
    color: rgba(0,0,0,.9);
  }

  .homepage .footer-text {
    text-align: center;
    margin-top: 80px;
    font-weight: 500;
    color: var(--vp-c-text-2)
  }

  .homepage .footer-text a {
    font-weight: 700;
  }

  @media screen and (max-width: 720px) {
    .homepage .container {
      padding: 40px 24px
    }

    .homepage video {
      margin-bottom: 40px
    }

    .homepage .quote {
      margin: 40px 0;
    }

    .homepage blockquote {
      font-size: 32px
    }

    .homepage .hero-heading {
      font-size: 55px
    }

    .homepage .hero-subheading {
      font-size: 20px
    }

    .homepage .features {
      grid-template-columns: 1fr
    }

    .homepage .footer-text {
      margin-top: 40px
    }
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
          <span style="padding-left: 8px">Star <span style="font-weight:800;">1200+</span></span>
        </a>
        <a href="/docs" class="hero-action secondary">
          <span style="padding-right: 8px">Get started</span>
          <img src="/icons/chevron-right.svg" width="20" height="20" />
        </a>
      </div>
      <a class="video-backdrop" href="https://step.ci/garph-demo" target="_blank">
        <video
          src="https://user-images.githubusercontent.com/10400064/222474710-bc263775-06b8-4a78-8099-676a9ad3c7a4.mov"
          autoplay="true"
          loop="true"
          muted="true"
        >
        </video>
        <div class="try-link-container">
          <div class="try-link">Try on CodeSandbox →</div>
        </div>
      </a>
    </div>
  </div>
  <div style="background: var(--vp-c-bg-alt)">
    <div class="container">
      <!-- <span class="section-title">Features</span> -->
      <div class="features">
        <div class="feature">
          <div class="feature-icon">
            <img src="/icons/typescript.svg">
          </div>
          <div class="feature-description">
            <span class="feature-title">TypeScript</span>
            <span class="feature-subtitle">End-to-end type-safety</span>
          </div>
        </div>
        <div class="feature">
          <div class="feature-icon">
            <img src="/icons/graphql.svg">
          </div>
          <div class="feature-description">
            <span class="feature-title">GraphQL + Relay</span>
            <span class="feature-subtitle">Spec-compatible API</span>
          </div>
        </div>
        <div class="feature">
          <div class="feature-icon">
            <img src="/icons/react.svg">
          </div>
          <div class="feature-description">
            <span class="feature-title">Framework-ready</span>
            <span class="feature-subtitle">Backend and Frontend</span>
          </div>
        </div>
        <div class="feature">
          <div class="feature-icon">
            <img src="/icons/zap.svg">
          </div>
          <div class="feature-description">
            <span class="feature-title">Batteries-included</span>
            <span class="feature-subtitle">Everything you need</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <!-- <span class="section-title">What users say</span> -->
    <figure class="quote">
      <blockquote>
        “The ideal GQL stack imo looks like this”
      </blockquote>
      <figcaption>— Nate Wienert (Tamagui, Vercel)</figcaption>
    </figure>
    <div style="display: flex; justify-content: center">
      <div class="start-link">
        <a href="/docs">Start using Garph</a>
      </div>
    </div>
    <p class="footer-text">Made by the Team behind <a href="https://stepci.com">Step CI</a></p>
  </div>
</div>
