import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { SITE_DESCRIPTION, SITE_TITLE } from "../../consts";

export async function GET(context) {
  const events = await getCollection("event");

  const items = events
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((event) => ({
      title: event.data.title,
      description: event.data.description,
      link: `/arrangement/${event.id}/`,
      pubDate: event.data.pubDate,
      ...(event.data.startDate && { startDate: event.data.startDate }),
      ...(event.data.endDate && { endDate: event.data.endDate }),
      ...(event.data.venue && { venue: event.data.venue }),
    }));

  return rss({
    title: `${SITE_TITLE} - Arrangementer`,
    description: `RSS feed for events from ${SITE_DESCRIPTION}`,
    site: context.site,
    items,
  });
}
