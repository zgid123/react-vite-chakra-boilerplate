import type { TBuildStyles } from './interface';
import type {
  preloaderAnatomy,
  formWrapperAnatomy,
} from './componentAnatomies';

export * from './v1';
export * from './utils';

export interface IStyleConfigProps {
  Preloader: TBuildStyles<typeof preloaderAnatomy>;
  FormWrapper: TBuildStyles<typeof formWrapperAnatomy>;
}
