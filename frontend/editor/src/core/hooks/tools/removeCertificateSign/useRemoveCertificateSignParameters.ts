import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RemoveCertificateSignParameters extends BaseParameters {}

export const defaultParameters: RemoveCertificateSignParameters = {};

export type RemoveCertificateSignParametersHook =
  BaseParametersHook<RemoveCertificateSignParameters>;

export const useRemoveCertificateSignParameters =
  (): RemoveCertificateSignParametersHook =>
    useBaseParameters({
      defaultParameters,
      endpointName: "remove-certificate-sign",
    });
