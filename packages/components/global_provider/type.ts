import { StyleModule, Lang, CompSize, CssVariables } from '../../utils/typescript';

export interface GlobalProviderProps {
  locale?: Lang
  styleModule?: StyleModule
  size?: CompSize
  cssVariables: CssVariables
}