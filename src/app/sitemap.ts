import type { MetadataRoute } from "next";

/**
 * Dynamic sitemap for search engines.
 * Update `SITE_URL` with your production domain.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bijovarghese.dev";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0,
        },
        // If you add dedicated route pages in the future
        // (e.g. /projects/[slug]), extend the array here:
        //
        // {
        //     url: `${SITE_URL}/projects`,
        //     lastModified: new Date(),
        //     changeFrequency: "weekly",
        //     priority: 0.8,
        // },
    ];
}
