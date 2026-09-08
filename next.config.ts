import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Nothing to configure beyond the next-intl plugin: the site ships no
// bitmap images (every illustration is inline SVG), so there is no image
// pipeline to tune here.
const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
