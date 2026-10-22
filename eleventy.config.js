import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const site = {
  title: "Ryan Houlette",
  subtitle: "singer / songwriter",
  url: "https://www.ryanhoulette.com/",
};

export default function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", site);

  // WordPress turned single newlines into <br>, and the lyrics depend on it.
  eleventyConfig.amendLibrary("md", (md) => md.set({ breaks: true }));

  eleventyConfig.addPassthroughCopy("src/wp-content");
  eleventyConfig.addPassthroughCopy("src/media");
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  eleventyConfig.addShortcode(
    "youtube",
    (id) =>
      `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`,
  );
  eleventyConfig.addShortcode(
    "audio",
    (src) =>
      `<audio controls preload="metadata" src="${src}"><a href="${src}">Download the MP3</a></audio>`,
  );

  // Dates are stored as the site's local time, so format them without shifting zones.
  eleventyConfig.addFilter("readableDate", (date) =>
    date.toLocaleDateString("en-US", { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" }),
  );
  eleventyConfig.addFilter("isoDate", (date) => date.toISOString().slice(0, 10));

  eleventyConfig.addCollection("categoryList", (api) => {
    const slugs = new Set(api.getFilteredByTag("post").flatMap((post) => post.data.categories || []));
    return [...slugs].sort();
  });
  eleventyConfig.addFilter("inCategory", (posts, slug) =>
    posts.filter((post) => (post.data.categories || []).includes(slug)),
  );

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "post", limit: 20 },
    metadata: {
      language: "en",
      title: site.title,
      subtitle: site.subtitle,
      base: site.url,
      author: { name: "Ryan Houlette" },
    },
  });

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
  };
}
