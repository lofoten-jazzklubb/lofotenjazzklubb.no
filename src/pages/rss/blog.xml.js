import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from "../../consts";

export async function GET(context) {
  const posts = await getCollection("blog");

  const items = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/aktuelt/${post.id}/`,
      pubDate: post.data.pubDate,
      ...(post.data.updatedDate && { updatedDate: post.data.updatedDate }),
    }));

  return rss({
    title: `${SITE_TITLE} - Aktuelt`,
    description: `RSS feed for blog posts from ${SITE_DESCRIPTION}`,
    site: context.site,
    items,
  });
}
