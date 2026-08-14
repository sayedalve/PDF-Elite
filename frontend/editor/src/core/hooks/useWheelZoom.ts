import { RefObject, useEffect } from "react";

interface UseWheelZoomOptions {
  /**
   * Element the wheel listener should be bound to.
   */
  ref: RefObject<Element | null>;
  /**
   * Callback executed when the hook decides to zoom in (discrete).
   * Used as a fallback when setZoomLevel is not provided.
   */
  onZoomIn: () => void;
  /**
   * Callback executed when the hook decides to zoom out (discrete).
   * Used as a fallback when setZoomLevel is not provided.
   */
  onZoomOut: () => void;
  /**
   * Optional callback to set the zoom to an exact factor (e.g. 1.5 = 150%).
   * When provided, pinch/wheel zoom is smooth and continuous instead of discrete.
   */
  setZoomLevel?: (factor: number, center?: { vx: number; vy: number }) => void;
  /**
   * Optional callback to get the current zoom factor (e.g. 1.0 = 100%).
   * Required for smooth zoom to work correctly.
   */
  getZoomFactor?: () => number;
  /**
   * Whether the wheel listener should be active.
   */
  enabled?: boolean;
  /**
   * How much delta needs to accumulate before a zoom action is triggered
   * when using the discrete (non-smooth) fallback path.
   * Defaults to 10.
   */
  threshold?: number;
  /**
   * Whether a Ctrl/Cmd modifier is required for zooming. Defaults to true so
   * we only react to pinch gestures and intentional ctrl+wheel zooming.
   */
  requireModifierKey?: boolean;
}

/**
 * Shared hook for handling wheel-based zoom across components.
 *
 * Key fixes over the previous implementation:
 * 1. Binds in CAPTURE phase so events are intercepted before @embedpdf's inner
 *    interaction manager can call stopPropagation() on them.
 * 2. When setZoomLevel + getZoomFactor are provided, applies smooth continuous
 *    zoom using fractional deltas from the trackpad pinch gesture, rather than
 *    accumulating to an arbitrary threshold and then doing a discrete jump.
 * 3. Normal vertical scrolling (no ctrlKey) is untouched — only pinch or
 *    Ctrl+wheel triggers zoom.
 */
export function useWheelZoom({
  ref,
  onZoomIn,
  onZoomOut,
  setZoomLevel,
  getZoomFactor,
  enabled = true,
  threshold = 10,
  requireModifierKey = true,
}: UseWheelZoomOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    // Discrete fallback accumulator (used when smooth zoom isn't wired up)
    let accumulator = 0;

    const handleWheel = (event: Event) => {
      const wheelEvent = event as WheelEvent;
      // Trackpad pinch-to-zoom fires with ctrlKey=true on both Mac and Windows.
      // Cmd+scroll (metaKey) is used for OS-level page zoom and shouldn't trigger internal canvas zoom.
      const hasModifier = wheelEvent.ctrlKey;

      if (requireModifierKey && !hasModifier) {
        // Plain scroll — do not interfere.
        return;
      }

      // We are handling the zoom gesture — prevent the browser's native
      // pinch-to-zoom / page-zoom from firing as well.
      wheelEvent.preventDefault();
      wheelEvent.stopPropagation();

      // ── Smooth continuous zoom path ─────────────────────────────────────────
      // Trackpad pinch gestures produce small, fractional deltaY values at high
      // frequency.  Map them directly to a zoom factor change so the experience
      // feels native and fluid, exactly like a modern PDF reader.
      if (setZoomLevel && getZoomFactor) {
        const currentFactor = getZoomFactor();

        // Sensitivity: 0.002 means 100 px of cumulative delta ≈ 20% zoom change.
        // This feels similar to Preview on macOS or Edge's built-in PDF viewer.
        const sensitivity = 0.002;
        const delta = wheelEvent.deltaY;

        // Zoom direction: negative deltaY = pinch-open = zoom in.
        const newFactor = currentFactor * (1 - delta * sensitivity);

        // Clamp to reasonable bounds (20% – 500%)
        const clamped = Math.min(Math.max(newFactor, 0.2), 5.0);
        
        // Calculate the zoom center (viewport relative)
        const rect = element.getBoundingClientRect();
        const vx = (wheelEvent.clientX - rect.left) / rect.width;
        const vy = (wheelEvent.clientY - rect.top) / rect.height;

        setZoomLevel(clamped, { vx, vy });
        return;
      }

      // ── Discrete fallback (no smooth zoom wired) ────────────────────────────
      accumulator += wheelEvent.deltaY;

      if (accumulator <= -threshold) {
        onZoomIn();
        accumulator = 0;
      } else if (accumulator >= threshold) {
        onZoomOut();
        accumulator = 0;
      }
    };

    // CRITICAL: use { capture: true } so our handler fires BEFORE the
    // @embedpdf inner canvas interaction manager, which calls stopPropagation()
    // on wheel events in the bubble phase.  Without capture mode, pinch gestures
    // are swallowed and never reach this handler.
    element.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      element.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [
    ref,
    onZoomIn,
    onZoomOut,
    setZoomLevel,
    getZoomFactor,
    enabled,
    threshold,
    requireModifierKey,
  ]);
}
