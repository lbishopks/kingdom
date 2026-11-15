// Vercel Blob read-write token.
// The store is connected with the "KINGDOM" prefix, so its token lives in
// KINGDOM_READ_WRITE_TOKEN. BLOB_READ_WRITE_TOKEN is kept as a fallback.
export function getBlobToken(): string | undefined {
  return process.env.KINGDOM_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN || undefined;
}
