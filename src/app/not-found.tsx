import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gres-yellow/20 text-6xl">
        🦬
      </div>
      <h1 className="font-heading text-3xl tracking-wide text-gres-blue">
        Oeps, deze pagina bestaat niet!
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Buffy heeft overal gezocht, maar kan deze pagina nergens vinden.
        Misschien is de link verkeerd getypt, of bestaat de pagina niet meer.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gres-blue px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-gres-blue-light hover:shadow-lg active:scale-95"
      >
        🏠 Terug naar de homepage
      </Link>
    </div>
  );
}
