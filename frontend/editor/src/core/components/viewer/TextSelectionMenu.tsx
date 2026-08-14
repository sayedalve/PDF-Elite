import { Tooltip, Group } from "@mantine/core";
import { ActionIcon } from "@app/ui/ActionIcon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HighlightIcon from "@mui/icons-material/Highlight";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import type { SelectionSelectionMenuProps } from "@embedpdf/plugin-selection/react";
import { useSelectionCapability } from "@embedpdf/plugin-selection/react";
import { useAnnotationCapability } from "@embedpdf/plugin-annotation/react";

export function TextSelectionMenu({
  selected,
  menuWrapperProps,
  placement,
}: SelectionSelectionMenuProps) {
  const { t } = useTranslation();
  const { provides: selection } = useSelectionCapability();
  const { provides: annotationApi } = useAnnotationCapability();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      wrapperRef.current = node;
      menuWrapperProps?.ref?.(node);
    },
    [menuWrapperProps],
  );

  const showAbove = placement?.suggestTop ?? true;

  useEffect(() => {
    if (!selected || !wrapperRef.current) {
      setPosition(null);
      return;
    }
    const update = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const r = wrapper.getBoundingClientRect();
      setPosition({
        top: showAbove ? r.top - 8 : r.bottom + 8,
        left: r.left + r.width / 2,
      });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [selected, showAbove]);

  const handleCopy = useCallback(() => {
    selection?.copyToClipboard();
  }, [selection]);

  const handleTool = useCallback(
    (toolId: string) => {
      if (annotationApi?.setActiveTool) {
        // EmbedPDF consumes current selection when setting tool if valid
        annotationApi.setActiveTool(null);
        annotationApi.setActiveTool(toolId);
      }
    },
    [annotationApi],
  );

  const portalContent =
    position &&
    createPortal(
      <div
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          transform: `translate(-50%, ${showAbove ? "-100%" : "0"})`,
          zIndex: 10000,
          pointerEvents: "auto",
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Group
          gap={4}
          style={{
            backgroundColor: "var(--c-surface-elevated)",
            padding: 4,
            borderRadius: "var(--radius-md)",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.25)",
            border: "1px solid var(--c-border)",
          }}
        >
          <Tooltip label={t("annotation.highlight", "Highlight")} withArrow>
            <ActionIcon
              variant="quiet"
              accent="neutral"
              size="md"
              onClick={() => handleTool("highlight")}
              aria-label={t("annotation.highlight", "Highlight")}
            >
              <HighlightIcon style={{ fontSize: 18 }} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label={t("annotation.underline", "Underline")} withArrow>
            <ActionIcon
              variant="quiet"
              accent="neutral"
              size="md"
              onClick={() => handleTool("underline")}
              aria-label={t("annotation.underline", "Underline")}
            >
              <FormatUnderlinedIcon style={{ fontSize: 18 }} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label={t("annotation.strikeout", "Strikeout")} withArrow>
            <ActionIcon
              variant="quiet"
              accent="neutral"
              size="md"
              onClick={() => handleTool("strikeout")}
              aria-label={t("annotation.strikeout", "Strikeout")}
            >
              <StrikethroughSIcon style={{ fontSize: 18 }} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label={t("annotation.comment", "Comment")} withArrow>
            <ActionIcon
              variant="quiet"
              accent="neutral"
              size="md"
              onClick={() => handleTool("textComment")}
              aria-label={t("annotation.comment", "Comment")}
            >
              <AddCommentIcon style={{ fontSize: 18 }} />
            </ActionIcon>
          </Tooltip>

          <div
            style={{
              width: 1,
              height: 20,
              backgroundColor: "var(--c-border)",
              margin: "0 4px",
            }}
          />

          <Tooltip label={t("viewer.copyText", "Copy")} withArrow>
            <ActionIcon
              variant="quiet"
              accent="neutral"
              size="md"
              onClick={handleCopy}
              aria-label={t("viewer.copyText", "Copy")}
            >
              <ContentCopyIcon style={{ fontSize: 18 }} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </div>,
      document.body,
    );

  return (
    <>
      <div ref={setRef} style={menuWrapperProps?.style} />
      {portalContent}
    </>
  );
}
