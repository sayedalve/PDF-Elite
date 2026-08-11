import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AddWatermarkParameters extends BaseParameters {}

export const defaultParameters: AddWatermarkParameters = {};

export type AddWatermarkParametersHook = BaseParametersHook<AddWatermarkParameters>;

export const useAddWatermarkParameters = (): AddWatermarkParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "add-watermark" });
