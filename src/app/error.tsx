"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gres-yellow/20 text-6xl">
        🦬
      </div>
      <h1 className="font-heading text-3xl tracking-wide text-gres-blue">
        Oeps, er ging iets mis!
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Buffy struikelde ergens over. Geen paniek: dit ligt niet aan jou.
        Probeer het gewoon nog een keer.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl bg-gres-blue px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-gres-blue-light hover:shadow-lg active:scale-95"
        >
          🔄 Probeer opnieuw
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-gres-blue/20 bg-card px-6 py-3 text-sm font-semibold text-gres-blue shadow-sm transition-all hover:shadow-md active:scale-95"
        >
          🏠 Naar de homepage
        </Link>
      </div>
    </div>
  );
}
