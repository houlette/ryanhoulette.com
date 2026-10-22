Source for www.ryanhoulette.com, a static site built with Eleventy and published to GitHub Pages on every push to `main`.

## Writing a post

Add a Markdown file to `src/posts/`, named `YYYY-MM-DD-slug.md`:

```markdown
---
title: "New song: Example"
date: "2026-11-01T12:00:00"
categories: ["demo"]
permalink: "/2026/11/01/new-song-example/"
---

Single line breaks are kept, so lyrics can be typed one line per line.

{% youtube "VIDEO_ID" %}

{% audio "/media/example.mp3" %}
```

Put MP3s and images in `src/media/` (create it on first use) or anywhere under `src/wp-content/uploads/`. Both are copied to the site as they are. A new category needs a display name in `src/_data/categoryNames.json`.

## Preview and build

```
npm install
npm start      # preview at http://localhost:8080
npm run build  # writes _site/
```

## History

The posts and uploads were exported in October 2026 from the old WordPress site, which ran on a Lightsail instance set up in January 2022. The `/wp-content/uploads/` paths and `/YYYY/MM/DD/slug/` permalinks match the WordPress URLs, so old links keep working.
