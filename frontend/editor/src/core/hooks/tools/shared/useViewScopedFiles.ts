import { useFileState } from "@app/contexts/FileContext";
import { StirlingFile } from "@app/types/fileContext";

/**
 * Returns the files that are in scope for the currently active tool view.
 *
 * In the workbench the "view-scoped" files are the files that belong to
 * whatever the user is looking at right now (the active file set). Tools and
 * automation runners use this hook so they always operate on the correct
 * subset of files without needing to know the internal FileContext structure.
 */
export function useViewScopedFiles(): StirlingFile[] {
  const { selectors } = useFileState();

  // Get currently selected StirlingFiles
  return selectors.getSelectedFiles?.() ?? [];
}
