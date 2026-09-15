---
title: How This Site Was Built
date: September 2026
tags: Web, React, HTMLL/CSS
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

## Overview {#overview}

This site has been redesigned and rebuilt four times, with each rebuild stemming from learning a new technique and wanting to implement it myself; in this way, the history of this site is also a fairly honest record of what I knew about web development at each point. I never set out to build any of them as practice for the next one; that only became evident in hindsight.

The current implementation of the website is its fourth iteration, and incidentally the first version where my rebuild did not coincide with a complete redesign (I ultimately chose to  keep the third version's design and layout, but upgrade the underlying technology).

## v1: Raw HTML and CSS {#v1}

The first iteration of my website was simply a handful of HTML files, stylized with the new.css framework. Although it was pretty rough around the edges, it was functional enough, and ultimately helped me learn how web pages are actually structured. Honestly, it was not a very good site, but I was still proud to call it my own.

```figure-row
src: /writing/colophon/v1-home-1024.png
alt: v1's home page: a black page with a heading, a nav line, and two short lists
caption: v1, mid-2024. The whole home page.
---
src: /writing/colophon/v1-projects-1024.png
alt: The first version's projects page, two headings on a black page
caption: v1's projects page. Two headings, no links yet.
```

## v2: Bootstrap {#v2}

One day, I had seen a friend configuring their own website with Bootstrap Studio, using its WYSIWYG workflow to build up a beautiful website with not that much effort. As a result, I decided to completely scrap my original site in favor of rebuilding it in Bootstrap Studio. Although it ended up looking much cleaner almost immediately, it ultimately cost me ownership of the result; the WYSIWYG workflow that had drawn me into using it began to make the site feel more like I had assembled it, rather than built it myself. I fell out of love with it quickly and never finished it.

```figure
src: /writing/colophon/v2-home-fold.png
alt: The Bootstrap version's landing section with a dark navbar and a centred heading
caption: v2, mid-2024, above the fold. Bootstrap Studio made it look finished before it was.
```

```figure
src: /writing/colophon/v2-home.png
alt: The full Bootstrap version home page, one long scroll with About, Fun Facts, Skills, and Projects sections
caption: The full v2 home page. Everything lived on one page; the Projects and Skills pages on that branch are blank.
```

## v3: Return to HTML and CSS {#v3}

During a break, I finally scrapped the Bootstrap version and took it upon myself to redesign the website from the ground up, using pure HTML and CSS (since that was all I was comfortable with at the time), without using any frameworks or shortcuts. With this redesign, I wanted to own every design decision and understand what was happening with each component, and how they came together to create a cohesive page. It is here that the current visual design language originates from: inspired by Apple's Liquid Glass and the way modern mobile interfaces lean on transparency, I settled on a dark, layered background with translucent glass surfaces floating over it, a pill-shaped navigation bar, and a single typeface throughout. This ultimately became the definitive version of the site, with all changes made since being measured against it.

```figure
src: /writing/colophon/v3-home-fold.jpg
alt: The third version's home page, a name and one line over a purple video background with a floating pill nav
caption: v3, early 2026. The layered background, the glass surfaces, and the pill nav all start here.
```

```figure-row
src: /writing/colophon/v3-projects-fold.jpg
alt: The third version's projects page with large glass cards
caption: v3's projects page.
---
src: /writing/colophon/v3-project-page-fold.jpg
alt: A v3 project detail page with a carousel on the left and text on the right
caption: A v3 project page.
```

## v4: React and Vite {#v4}

After joining clubs on campus and picking up React, I ported my website over to using React, keeping the same overall look and feel, but breaking every repeated piece of the page (the nav, the cards, the carousel, the footer) into its own component instead of copying the same HTML across every file. React Router handles navigation cleanly, and Bulma provides a small set of layout utilities without the opinionated behaviour that had put me off Bootstrap. My main constraint with this version was that the overall design of the site should not change just because the underlying tooling did, which mostly held.

```figure-row
src: /writing/colophon/v4-home-fold.jpg
alt: The current home page, visually the same as v3 with buttons and social links added
caption: v4, the current site; built to look the same as v3.
---
src: /writing/colophon/v4-projects-fold.jpg
alt: The current projects page
caption: The current projects page.
```

Since this major port, the site has continue to change and evolve in less visible ways. For example, the background used to be a royalty-free video, which was then changed to a single frame from this video, and ultimately became a procedural SVG drawn at load time (a full-screen gradient in an SVG dithers into a visible grid on desktop engines, and as such required moving the colour into CSS). In addition, the project pages grew from one shared layout for all projects into a data-driven list with previous and next links between them. Long-form writeups (like the one you're reading right now!) are written in Markdown before being compiled into React components by a small Python script, such that the prose lives in a text file and the layout lives in one template.

## What it runs on {#stack}

For thos curious, here's what the current website is built upon:

- **React 18** handles all of the components, with **Vite** running the dev server and builds (the main appeal of Vite was that I never had to think about it).
- **React Router** takes care of navigation on the client side; since the site is just a single page under the hood, Vercel writes every path back to `index.html`, allowing page links and refreshes to land on the right page, rather than a 404. 
- While **Bulma** is still being used, it's mainly only for a handful of layout and spacing utilities; almost everything you actually see is hand-written CSS, carried over from v3.
- **Inter** is the only typeface on the site, and I have yet to find a reason to add a second.
- **Vercel** hosts everything and redeploys on every push to `main`.

The source is on [GitHub](https://github.com/wen-ethan/wen-ethan.net), if you'd like to check it out!