import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AdjustContrastParameters extends BaseParameters {}

export const defaultParameters: AdjustContrastParameters = {};

export type AdjustContrastParametersHook = BaseParametersHook<AdjustContrastParameters>;

export const useAdjustContrastParameters = (): AdjustContrastParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "scanner-effect" });
