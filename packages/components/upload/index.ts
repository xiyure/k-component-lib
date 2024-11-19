import Upload from './upload.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KUpload: SFCWithInstall<typeof Upload> = withInstall(Upload);
export default KUpload;

export * from './type';