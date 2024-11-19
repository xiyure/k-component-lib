import SliderButton from './sliderButton.vue';
import type { SFCWithInstall } from '../../utils/typescript/install';
import { withInstall } from '../../utils/install';

export const KSliderButton: SFCWithInstall<typeof SliderButton> = withInstall(SliderButton);

export default KSliderButton;

// // 导出类型或其他相关内容
export * from './type';
