import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CropParameters extends BaseParameters {}

export const defaultParameters: CropParameters = {};

export type CropParametersHook = BaseParametersHook<CropParameters>;

export const useCropParameters = (): CropParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "crop" });
