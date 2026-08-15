/**
 * offlinePageOps.ts
 *
 * Local (offline) PDF page operations using @cantoo/pdf-lib.
 *
 * Replaces the removed backend endpoints:
 *   POST /api/v1/general/remove-pages
 *   POST /api/v1/general/extract-pages
 *   POST /api/v1/general/rearrange-pages
 *
 * All functions accept a File and return a new Blob (PDF bytes) so they
 * plug directly into the useToolOperation customProcessor pattern.
 */

import { PDFDocument } from "@cantoo/pdf-lib";

/**
 * Parse a page-selection string like "1,3,5-8,10" into a sorted,
 * deduplicated, 0-indexed array of page indices.
 *
 * @param spec    Page selection string (1-indexed, e.g. "1-3,5,7-9")
 * @param total   Total page count in the document
 */
export function parsePageNumbers(spec: string, total: number): number[] {
  const indices = new Set<number>();
  const parts = spec
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [rawFrom, rawTo] = part.split("-");
      const from = parseInt(rawFrom, 10);
      const to = parseInt(rawTo, 10);
      if (isNaN(from) || isNaN(to)) continue;
      const lo = Math.max(1, Math.min(from, to));
      const hi = Math.min(total, Math.max(from, to));
      for (let i = lo; i <= hi; i++) {
        indices.add(i - 1); // convert to 0-indexed
      }
    } else {
      const n = parseInt(part, 10);
      if (!isNaN(n) && n >= 1 && n <= total) {
        indices.add(n - 1);
      }
    }
  }

  return [...indices].sort((a, b) => a - b);
}

/**
 * Remove the specified pages from a PDF file.
 *
 * @param file        Source PDF File
 * @param pageNumbers 1-indexed page selection string (e.g. "1,3,5-8")
 * @returns           New PDF Blob with the specified pages removed
 */
export async function removePagesLocal(
  file: File,
  pageNumbers: string,
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const total = srcDoc.getPageCount();

  // Pages to remove (0-indexed)
  const toRemove = new Set(parsePageNumbers(pageNumbers, total));

  // Build the output by copying pages NOT in the removal set
  const outDoc = await PDFDocument.create();
  const keepIndices = Array.from({ length: total }, (_, i) => i).filter(
    (i) => !toRemove.has(i),
  );

  if (keepIndices.length === 0) {
    throw new Error("Cannot remove all pages from a PDF.");
  }

  const copied = await outDoc.copyPages(srcDoc, keepIndices);
  for (const page of copied) {
    outDoc.addPage(page);
  }

  const outBytes = await outDoc.save();
  return new Blob([outBytes.buffer as ArrayBuffer], {
    type: "application/pdf",
  });
}

/**
 * Extract (keep only) the specified pages from a PDF file.
 *
 * @param file        Source PDF File
 * @param pageNumbers 1-indexed page selection string (e.g. "2,4-6")
 * @returns           New PDF Blob containing only the specified pages
 */
export async function extractPagesLocal(
  file: File,
  pageNumbers: string,
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const total = srcDoc.getPageCount();

  const keepIndices = parsePageNumbers(pageNumbers, total);
  if (keepIndices.length === 0) {
    throw new Error("No valid pages specified for extraction.");
  }

  const outDoc = await PDFDocument.create();
  const copied = await outDoc.copyPages(srcDoc, keepIndices);
  for (const page of copied) {
    outDoc.addPage(page);
  }

  const outBytes = await outDoc.save();
  return new Blob([outBytes.buffer as ArrayBuffer], {
    type: "application/pdf",
  });
}

/**
 * Rearrange pages in a PDF document.
 *
 * @param file        Source PDF File
 * @param pageOrder   Comma-separated 1-indexed page order (e.g. "3,1,2" to put page 3 first)
 * @returns           New PDF Blob with pages in the specified order
 */
export async function rearrangePagesLocal(
  file: File,
  pageOrder: string,
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const total = srcDoc.getPageCount();

  // pageOrder is a full ordered list (may repeat pages)
  const orderedIndices = pageOrder
    .split(",")
    .map((s) => parseInt(s.trim(), 10) - 1)
    .filter((i) => i >= 0 && i < total);

  if (orderedIndices.length === 0) {
    throw new Error("No valid page order specified.");
  }

  const outDoc = await PDFDocument.create();
  const copied = await outDoc.copyPages(srcDoc, orderedIndices);
  for (const page of copied) {
    outDoc.addPage(page);
  }

  const outBytes = await outDoc.save();
  return new Blob([outBytes.buffer as ArrayBuffer], {
    type: "application/pdf",
  });
}

/**
 * Rotate the specified pages in a PDF document.
 *
 * @param file        Source PDF File
 * @param pageNumbers 1-indexed page selection string, or "" for all pages
 * @param rotation    Degrees to rotate (90, 180, 270, or -90)
 * @returns           New PDF Blob with the pages rotated
 */
export async function rotatePagesLocal(
  file: File,
  pageNumbers: string,
  rotation: number,
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const doc = await PDFDocument.load(bytes);
  const total = doc.getPageCount();

  const targetIndices = pageNumbers.trim()
    ? parsePageNumbers(pageNumbers, total)
    : Array.from({ length: total }, (_, i) => i);

  for (const idx of targetIndices) {
    const page = doc.getPage(idx);
    const currentRotation = page.getRotation().angle;
    // Normalise to 0–359
    const newAngle = (((currentRotation + rotation) % 360) + 360) % 360;
    page.setRotation({ type: "degrees", angle: newAngle } as Parameters<
      typeof page.setRotation
    >[0]);
  }

  const outBytes = await doc.save();
  return new Blob([outBytes.buffer as ArrayBuffer], {
    type: "application/pdf",
  });
}

/**
 * Apply a complete set of organize operations (reorder, duplicate, remove, rotate)
 * to a PDF document in a single pass.
 *
 * @param file        Source PDF File
 * @param pages       Array describing the desired final state of the document.
 *                    Each entry contains the 1-indexed original page number and
 *                    its desired absolute rotation (0, 90, 180, 270).
 * @returns           New PDF Blob with the changes applied
 */
export async function applyOrganizeChangesLocal(
  file: File,
  pages: { originalId: number; rotation: number }[],
): Promise<Blob> {
  const bytes = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(bytes);
  const total = srcDoc.getPageCount();

  // Validate all requested indices are within bounds (convert to 0-indexed)
  const order = pages
    .map((p) => p.originalId - 1)
    .filter((i) => i >= 0 && i < total);

  if (order.length === 0) {
    throw new Error("No valid pages specified for the reorganized document.");
  }

  const outDoc = await PDFDocument.create();

  // Copy all requested pages in order (this handles duplicates correctly)
  const copied = await outDoc.copyPages(srcDoc, order);

  for (let i = 0; i < copied.length; i++) {
    const page = copied[i];
    const targetRot = pages[i].rotation;

    // Calculate new angle based on existing rotation + target rotation
    // Wait, the `rotation` from OrganizeMode is absolute?
    // Yes, OrganizeMode stores absolute rotation 0, 90, 180, 270 relative to the *original* page's current orientation.
    // Actually, OrganizeMode starts with rotation=0 for every page.
    // So `rotation` is the DELTA we need to apply on top of the page's original rotation.
    const currentRotation = page.getRotation().angle;
    const newAngle = (((currentRotation + targetRot) % 360) + 360) % 360;

    page.setRotation({ type: "degrees", angle: newAngle } as Parameters<
      typeof page.setRotation
    >[0]);

    outDoc.addPage(page);
  }

  const outBytes = await outDoc.save();
  return new Blob([outBytes.buffer as ArrayBuffer], {
    type: "application/pdf",
  });
}
