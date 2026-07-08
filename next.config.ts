import type { NextConfig } from "next";

const securityHeaders = [
  // Voorkomt dat de site in een iframe op andere sites geladen wordt (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Browser mag content-type niet raden
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Stuur geen volledige URL mee naar externe sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // App gebruikt geen camera/microfoon/locatie
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
