import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ReplaceColorParameters extends BaseParameters {}

export const defaultParameters: ReplaceColorParameters = {};

export type ReplaceColorParametersHook = BaseParametersHook<ReplaceColorParameters>;

export const useReplaceColorParameters = (): ReplaceColorParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "replace-invert-pdf" });
