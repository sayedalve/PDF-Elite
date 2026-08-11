import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ScannerImageSplitParameters extends BaseParameters {}

export const defaultParameters: ScannerImageSplitParameters = {};

export type ScannerImageSplitParametersHook = BaseParametersHook<ScannerImageSplitParameters>;

export const useScannerImageSplitParameters = (): ScannerImageSplitParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "extract-image-scans" });
