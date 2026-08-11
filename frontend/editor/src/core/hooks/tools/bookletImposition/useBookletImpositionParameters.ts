import { BaseParameters } from "@app/types/parameters";
import {
  BaseParametersHook,
  useBaseParameters,
} from "@app/hooks/tools/shared/useBaseParameters";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BookletImpositionParameters extends BaseParameters {}

export const defaultParameters: BookletImpositionParameters = {};

export type BookletImpositionParametersHook = BaseParametersHook<BookletImpositionParameters>;

export const useBookletImpositionParameters = (): BookletImpositionParametersHook =>
  useBaseParameters({ defaultParameters, endpointName: "booklet-imposition" });
