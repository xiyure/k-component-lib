import { ElLoading, LoadingOptions } from 'element-plus';
import './style.less';

const KLoading = ((options:LoadingOptions) => ElLoading.service(options));
export { KLoading };