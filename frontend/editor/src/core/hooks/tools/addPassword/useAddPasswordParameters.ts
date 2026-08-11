import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AddPasswordParameters extends BaseParameters {}

export const defaultParameters: AddPasswordParameters = {};

export type AddPasswordParametersHook = BaseParametersHook<AddPasswordParameters>;

export const useAddPasswordParameters = (): AddPasswordParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "add-password" });
