import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GeoAxis – геодезически услуги",
    short_name: "GeoAxis",
    description: "Геодезически услуги в София и Софийска област.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#253a31",
    lang: "bg",
    icons: [
      { src: "/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
