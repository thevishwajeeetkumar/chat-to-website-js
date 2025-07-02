// src/lib/chunk.js

/**
 * Splits a long text string into an array of chunks of roughly the given size.
 *
 * @param {string} text - The text to split.
 * @param {number} [size=1000] - Approximate character length of each chunk.
 * @returns {string[]} An array of text chunks.
 */
export function chunkText(text, size = 1000) {
  const chunks = [];
  let index = 0;

  // Clean up whitespace
  const cleanText = text.replace(/\s+/g, ' ').trim();

  while (index < cleanText.length) {
    chunks.push(cleanText.slice(index, index + size));
    index += size;
  }

  return chunks;
}
