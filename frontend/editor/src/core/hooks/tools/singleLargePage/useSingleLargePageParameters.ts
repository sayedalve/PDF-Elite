import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SingleLargePageParameters extends BaseParameters {}

export const defaultParameters: SingleLargePageParameters = {};

export type SingleLargePageParametersHook =
  BaseParametersHook<SingleLargePageParameters>;

export const useSingleLargePageParameters = (): SingleLargePageParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "pdf-to-single-page" });
