---
title: How This Site Was Built
date: September 2026
tags: Web, React, Meta
back_to: /writing
back_label: Back to writing
---

<!--
  DRAFT. Marked `draft: true` in src/data/writing.js, so it is routed but not
  listed on the Writing page or in the sitemap. Flip that flag and add the URL
  to assets/sitemap.xml to publish.

  Source of truth for the colophon. Rebuild with:

      python3 tools/build-writeup.py

  which regenerates src/pages/writing/Colophon.jsx. Do not edit the JSX by hand.
  The history here is the README's version history, expanded slightly.
-->

## Four versions {#overview}

This site has been rebuilt four times. Each rebuild came from learning something new and wanting to do the previous version better, so the history of the site is also a fairly honest record of what I knew about the web at each point. None of the versions were planned as stepping stones. They just turned out that way.

The current site is the fourth, and the first one where the rebuild was not a redesign. The look is the third version's; only the way it is put together changed.

## Raw HTML and CSS {#v1}

The first version was a handful of HTML files and one stylesheet. It was functional and rough, and its main value was that it forced me to learn how a page is actually structured: what the document is, how the cascade works, why a layout breaks when the viewport shrinks. It was not a good site, but nothing in it was hidden from me either.

## Bootstrap {#v2}

The second version was built in Bootstrap Studio. It looked cleaner almost immediately, which was the point, and it cost me ownership of the result. The WYSIWYG workflow and the plug-a-class-in nature of the framework meant the site felt assembled rather than made. When something did not look right I was searching for the class that would fix it, not understanding why it was wrong. I fell out of love with it quickly and never finished it.

## Back to HTML and CSS {#v3}

During a break I threw the Bootstrap version out and redesigned the site from scratch in plain HTML and CSS, deliberately without frameworks or shortcuts. I wanted to own every design decision and understand what was happening at each step. That is where the current visual language comes from: the dark, layered background, the translucent glass surfaces, the floating pill navigation, one typeface. This became the definitive version of the site and everything since has been measured against it.

## React and Vite {#v4}

After picking up React, I rebuilt the third version as a faithful port. Same look, same feel, same pages, now as components. React Router handles navigation cleanly, and Bulma provides a small set of layout utilities without the opinionated behaviour that had put me off Bootstrap. The constraint I set was that nothing about the design should change just because the tooling did, and it mostly held.

Since the port, the site has kept changing in ways that are less visible. The background used to be a video, then an image, and is now a procedural SVG drawn at load time, because a full-screen gradient in an SVG dithers into a visible grid on desktop engines and the fix was to move the colour into CSS. The project pages grew from one shared layout into a data-driven list with prev and next links between them. And the long-form writeups, including this one, are written in Markdown and compiled into React components by a small Python script, so the prose lives in a text file and the layout lives in one template.

## What it runs on {#stack}

- **React 18** for the components and **Vite** for the dev server and build.
- **React Router** for client-side routing. Vercel rewrites every path to `index.html`, so deep links work on a refresh.
- **Bulma** for a handful of layout and spacing utilities; almost all of the styling is hand-written CSS.
- **Inter** as the only typeface.
- **Vercel** for hosting, deploying on every push to `main`.

The source is on [GitHub](https://github.com/wen-ethan/wen-ethan.github.io). The repository name is a leftover from when it was hosted on GitHub Pages.
