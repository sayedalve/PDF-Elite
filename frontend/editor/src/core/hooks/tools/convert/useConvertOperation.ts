import { defineSingleFileTool, useToolOperation } from "@app/hooks/tools/shared/useToolOperation";
import { objectToFormData } from "@app/hooks/tools/shared/toolApiMapping";
import type { ErasedToolParams } from "@app/hooks/tools/shared/toolOperationTypes";
import { createStandardErrorHandler } from "@app/utils/toolErrorHandler";
import { useTranslation } from "react-i18next";

export const convertOperationConfig = defineSingleFileTool<ErasedToolParams>({
  operationType: "convert",
  endpoint: "/api/v1/convert/pdf/img",
  buildFormData: (params, file) =>
    objectToFormData(params as Record<string, unknown>, { fileInput: file }),
});

export const useConvertOperation = () => {
  const { t } = useTranslation();
  return useToolOperation<ErasedToolParams>({
    ...convertOperationConfig,
    getErrorMessage: createStandardErrorHandler(
      t("convert.error.failed", "Operation failed."),
    ),
  });
};
