import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

export type RedactMode = "text" | "regex" | "color";

export interface RedactParameters extends BaseParameters {
  mode: RedactMode;
  searchText?: string;
  useRegex?: boolean;
  wholeWordOnly?: boolean;
  caseSensitive?: boolean;
  redactColor?: string;
  customPadding?: number;
  convertPDFToImage?: boolean;
}

export const defaultParameters: RedactParameters = {
  mode: "text",
  searchText: "",
  useRegex: false,
  wholeWordOnly: false,
  caseSensitive: false,
};


export type RedactParametersHook = BaseParametersHook<RedactParameters>;

export const useRedactParameters = (): RedactParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "redact" });
