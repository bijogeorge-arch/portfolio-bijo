import type { MetadataRoute } from "next";

/**
 * robots.txt — allows all crawlers, points to the sitemap.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bijovarghese.dev";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
