import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ConvertParameters extends BaseParameters {}

export const defaultParameters: ConvertParameters = {};

export type ConvertParametersHook = BaseParametersHook<ConvertParameters>;

export const useConvertParameters = (): ConvertParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "convert" });
