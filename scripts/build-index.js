import path from "path";
import { LocalIndex } from "vectra";
import { getFumadocsChunks } from "../lib/fumadocs-chunker";
import { getEmbedding } from "../lib/gemini-embeddings";

async function buildVectorStore() {
  const indexPath = path.join(process.cwd(), "vector-store");
  const index = new LocalIndex(indexPath);

  if (!(await index.isIndexCreated())) {
    await index.createIndex();
  }

  const chunks = await getFumadocsChunks();
  console.log(`Processing ${chunks.length} Fumadocs sections...`);

  for (const [i, chunk] of chunks.entries()) {
    console.log(
      `[${i + 1}/${chunks.length}] Embedding: ${chunk.metadata.title} > ${chunk.metadata.heading}`,
    );
    const vector = await getEmbedding(chunk.vectorText);

    await index.insertItem({
      vector,
      metadata: chunk.metadata,
    });
  }

  console.log("Vectra vector store successfully generated.");
}

buildVectorStore().catch(console.error);
