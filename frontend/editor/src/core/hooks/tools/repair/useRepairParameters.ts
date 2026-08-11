import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RepairParameters extends BaseParameters {}

export const defaultParameters: RepairParameters = {};

export type RepairParametersHook = BaseParametersHook<RepairParameters>;

export const useRepairParameters = (): RepairParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "repair" });
