import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AddAttachmentsParameters extends BaseParameters {}

export const defaultParameters: AddAttachmentsParameters = {};

export type AddAttachmentsParametersHook = BaseParametersHook<AddAttachmentsParameters>;

export const useAddAttachmentsParameters = (): AddAttachmentsParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "add-attachments" });
