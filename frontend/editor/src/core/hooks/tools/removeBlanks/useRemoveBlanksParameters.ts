import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RemoveBlanksParameters extends BaseParameters {}

export const defaultParameters: RemoveBlanksParameters = {};

export type RemoveBlanksParametersHook = BaseParametersHook<RemoveBlanksParameters>;

export const useRemoveBlanksParameters = (): RemoveBlanksParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "remove-blanks" });
