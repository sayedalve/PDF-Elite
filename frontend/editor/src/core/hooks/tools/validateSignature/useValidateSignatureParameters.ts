import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ValidateSignatureParameters extends BaseParameters {}

export const defaultParameters: ValidateSignatureParameters = {};

export type ValidateSignatureParametersHook =
  BaseParametersHook<ValidateSignatureParameters>;

export const useValidateSignatureParameters =
  (): ValidateSignatureParametersHook =>
    useBaseParameters({
      defaultParameters,
      endpointName: "validate-signature",
    });
