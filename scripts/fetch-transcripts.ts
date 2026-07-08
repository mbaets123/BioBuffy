import { createClient } from "@supabase/supabase-js";
import { YoutubeTranscript } from "youtube-transcript";
import { getYouTubeId } from "../src/lib/youtube";

// Draai dit script met de keys uit .env.local, bijv.:
//   npx dotenv -e .env.local -- npx tsx scripts/fetch-transcripts.ts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Ontbrekende env vars: NEXT_PUBLIC_SUPABASE_URL en SUPABASE_SERVICE_ROLE_KEY (of NEXT_PUBLIC_SUPABASE_ANON_KEY)"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchTranscripts() {
  const { data: paragraphs, error } = await supabase
    .from("paragraphs")
    .select("id, title, video_url")
    .neq("video_url", "")
    .order("id");

  if (error) {
    console.error("Database error:", error);
    return;
  }

  console.log(`Found ${paragraphs.length} paragraphs with videos\n`);

  for (const p of paragraphs) {
    const videoId = getYouTubeId(p.video_url);
    if (!videoId) {
      console.log(`⚠️  ${p.id} ${p.title} — no valid video ID`);
      continue;
    }

    try {
      const items = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: "nl",
      });
      const transcript = items.map((item) => item.text).join(" ");

      const { error: updateError } = await supabase
        .from("paragraphs")
        .update({ transcript })
        .eq("id", p.id);

      if (updateError) {
        console.log(`❌ ${p.id} ${p.title} — save error: ${updateError.message}`);
      } else {
        console.log(`✅ ${p.id} ${p.title} — ${transcript.length} chars`);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log(`❌ ${p.id} ${p.title} — ${msg}`);
    }
  }

  console.log("\nDone!");
}

fetchTranscripts();
