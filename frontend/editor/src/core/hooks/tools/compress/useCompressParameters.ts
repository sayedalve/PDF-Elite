import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CompressParameters extends BaseParameters {}

export const defaultParameters: CompressParameters = {};

export type CompressParametersHook = BaseParametersHook<CompressParameters>;

export const useCompressParameters = (): CompressParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "compress-pdf" });
