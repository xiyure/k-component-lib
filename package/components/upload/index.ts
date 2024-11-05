import Upload from './upload.vue';
import type { SFCWithInstall } from '../../types';
import { withInstall } from '../../utils/install';

export const KUpload: SFCWithInstall<typeof Upload> = withInstall(Upload);
export default KUpload;

export * from './type';