import { useState, useCallback } from "react";
import type { StorageType } from "@app/services/signatureStorageService";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SavedSignatureType = "canvas" | "image" | "text";

/** A signature stored persistently for re-use. */
export interface SavedSignature {
  id: string;
  type: SavedSignatureType;
  /** Base64 image data URL representing the signature preview. */
  dataUrl: string;
  /** Human-readable label (e.g. signer name for text signatures). */
  label?: string;
  /** When the signature was saved (ISO 8601). */
  createdAt: string;
  storageType?: StorageType;
}

/** The data sent when adding a new signature. */
export interface SavedSignaturePayload {
  type: SavedSignatureType;
  dataUrl: string;
  label?: string;
  storageType?: StorageType;
}

/** The result returned after adding a new signature. */
export interface AddSignatureResult {
  signature: SavedSignature;
  isAtCapacity: boolean;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export interface SavedSignaturesHook {
  signatures: SavedSignature[];
  isLoading: boolean;
  isAtCapacity: boolean;
  maxLimit: number;
  storageType: StorageType | null;
  addSignature: (payload: SavedSignaturePayload) => Promise<AddSignatureResult>;
  deleteSignature: (signature: SavedSignature) => Promise<void>;
  reload: () => Promise<void>;
}

const MAX_SIGNATURES = 10;

/**
 * Manages the user's saved signatures using the signature storage service.
 */
export function useSavedSignatures(): SavedSignaturesHook {
  const [signatures, setSignatures] = useState<SavedSignature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [storageType, setStorageType] = useState<StorageType | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const { signatureStorageService } = await import(
        "@app/services/signatureStorageService"
      );
      const loaded = await signatureStorageService.getAll();
      setSignatures(loaded);
      setStorageType(signatureStorageService.storageType ?? null);
    } catch {
      // storage unavailable — remain empty
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addSignature = useCallback(
    async (payload: SavedSignaturePayload): Promise<AddSignatureResult> => {
      const signature: SavedSignature = {
        id: crypto.randomUUID(),
        type: payload.type,
        dataUrl: payload.dataUrl,
        label: payload.label,
        createdAt: new Date().toISOString(),
        storageType: payload.storageType,
      };
      try {
        const { signatureStorageService } = await import(
          "@app/services/signatureStorageService"
        );
        await signatureStorageService.save(signature);
      } catch { /* ignore */ }
      const next = [...signatures, signature];
      setSignatures(next);
      return { signature, isAtCapacity: next.length >= MAX_SIGNATURES };
    },
    [signatures],
  );

  const deleteSignature = useCallback(async (signature: SavedSignature) => {
    try {
      const { signatureStorageService } = await import(
        "@app/services/signatureStorageService"
      );
      await signatureStorageService.remove(signature.id);
    } catch { /* ignore */ }
    setSignatures((prev) => prev.filter((s) => s.id !== signature.id));
  }, []);

  return {
    signatures,
    isLoading,
    isAtCapacity: signatures.length >= MAX_SIGNATURES,
    maxLimit: MAX_SIGNATURES,
    storageType,
    addSignature,
    deleteSignature,
    reload,
  };
}
