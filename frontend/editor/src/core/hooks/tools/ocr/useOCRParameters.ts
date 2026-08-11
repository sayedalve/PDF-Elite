import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OCRParameters extends BaseParameters {}

export const defaultParameters: OCRParameters = {};

export type OCRParametersHook = BaseParametersHook<OCRParameters>;

export const useOCRParameters = (): OCRParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "ocr-pdf" });
