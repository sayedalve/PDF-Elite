import { useFileState } from "@app/contexts/FileContext";

/**
 * Returns the files that are in scope for the currently active tool view.
 *
 * In the workbench the "view-scoped" files are the files that belong to
 * whatever the user is looking at right now (the active file set). Tools and
 * automation runners use this hook so they always operate on the correct
 * subset of files without needing to know the internal FileContext structure.
 */
export function useViewScopedFiles(): File[] {
  const { selectors } = useFileState();

  // Get currently selected StirlingFiles and return their underlying File objects.
  const stirlingFiles = selectors.getSelectedFiles?.() ?? [];
  const files: File[] = [];

  for (const sf of stirlingFiles) {
    if (sf?.file) {
      files.push(sf.file);
    }
  }

  return files;
}
