import SliderButton from './sliderButton.vue';
import { withInstall } from '../../utils/install';
import { KSliderButton as _KSliderButton } from '../../../typings/all';

export const KSliderButton = withInstall<typeof _KSliderButton>(SliderButton);

export default KSliderButton;

// // 导出类型或其他相关内容
export * from './type';
