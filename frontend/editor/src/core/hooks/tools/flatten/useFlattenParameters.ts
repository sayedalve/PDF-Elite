import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FlattenParameters extends BaseParameters {}

export const defaultParameters: FlattenParameters = {};

export type FlattenParametersHook = BaseParametersHook<FlattenParameters>;

export const useFlattenParameters = (): FlattenParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "flatten" });
