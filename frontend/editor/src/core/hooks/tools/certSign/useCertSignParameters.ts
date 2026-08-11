import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CertSignParameters extends BaseParameters {}

export const defaultParameters: CertSignParameters = {};

export type CertSignParametersHook = BaseParametersHook<CertSignParameters>;

export const useCertSignParameters = (): CertSignParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "cert-sign" });
