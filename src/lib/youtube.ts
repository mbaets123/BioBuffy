/**
 * Haalt het video-ID uit alle gangbare YouTube-URL-vormen:
 * watch?v=, youtu.be/, shorts/, embed/ en live/.
 * Geeft null terug bij een onherkenbare URL, zodat de pagina
 * kan terugvallen op de "video komt later"-kaart.
 */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}
