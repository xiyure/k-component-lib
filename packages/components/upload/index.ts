import Upload from './upload.vue';
import { withInstall } from '../../utils/install';
import { KUpload as _KUpload } from '../../../typings/all';

export const KUpload = withInstall<typeof _KUpload>(Upload);
export default KUpload;

export * from './type';