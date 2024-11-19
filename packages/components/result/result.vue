<template>
  <div id="KResult" class="k-result" :class="[_styleModule]">
    <div
      style="
        max-width: 12vw;
        max-height: 12vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        overflow: hidden;
      "
    >
      <slot name="icon">
        <div v-if="DigitalStatusCode.includes(status)" class="def-bg">
          <h1 :data-h1="status">
            {{ status }}
            <div class="presuppose-icon" :style="{ backgroundColor: statusMessage.color }">
              <IconLocked v-if="status == '403'" size="1.8vw" color="#FFFFFF"></IconLocked>
              <span v-if="status == '404'">?</span>
              <span v-if="status == '500'">!</span>
            </div>
          </h1>
          <svg
            width="1132px"
            height="1098px"
            viewBox="0 0 1132 1098"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g
              id="页面-1" stroke="none" stroke-width="1"
              fill="none" fill-rule="evenodd"
            >
              <g id="画板" transform="translate(-170, 0)" fill-rule="nonzero">
                <g id="undraw_read_notes_gqmq" transform="translate(170, 0)">
                  <path
                    id="路径"
                    d="M1132,566.004115 C1132,878.608187 941.771293,858.439574 629.169503,858.439574 C559.683535,858.439574 429.971413,1119.48065 368.484892,1096.57632 L368.466007,1096.57632 C366.201988,1095.74618 363.956855,1094.87838 361.711702,1093.99156 C361.070292,1093.76516 360.428788,1093.51989 359.806263,1093.25574 C356.278197,1091.89739 352.768922,1090.48238 349.278626,1089.02959 C342.090426,1086.04871 334.977656,1082.91677 327.959312,1079.67173 C324.318065,1077.97368 320.69557,1076.25684 317.110979,1074.48336 C283.830162,1058.16354 252.379448,1038.65521 223.155001,1016.37351 C208.438908,1005.16663 194.270022,993.22402 180.742661,980.658672 C169.535861,970.244272 158.76307,959.39586 148.461814,948.113436 C145.216691,944.585343 142.04711,941.019499 138.915281,937.415996 C137.632366,935.963214 136.387091,934.510546 135.160833,933.057764 C126.274596,922.662136 117.784596,911.926925 109.671949,900.889882 C107.049463,897.324038 104.46473,893.720516 101.917768,890.079128 C84.6169594,865.363653 69.2406832,839.176529 55.9962459,811.781893 C20.1118094,737.446761 0,654.074336 0,566.004115 C0,253.400042 253.398229,0 566.000019,0 C878.601808,0 1132,253.400042 1132,566.004115 Z"
                    fill="#eaeaea"
                  ></path>
                  <path
                    id="路径"
                    d="M169.71637,924.60466 C169.71637,925.50539 170.43968,926.22869 171.3404,926.22869 L980.98032,926.22869 C981.88101,926.22869 982.60435,925.50538 982.60435,924.60466 C982.60435,923.70394 981.881,922.98063 980.98032,922.98063 L171.3404,922.98063 C170.43968,922.98063 169.71637,923.70394 169.71637,924.60466 Z"
                    fill="#c2c3cb"
                  ></path>
                  <path
                    id="路径"
                    d="M589.55989,764.33668 C587.33679,777.81193 575.61059,788.1245 561.51566,788.1245 C547.42073,788.1245 535.69457,777.81193 533.47147,764.33668 L461.72286,764.33668 L461.72286,919.82785 L661.30849,919.82785 L661.30849,764.33668 L589.55986,764.33668 L589.5599,764.33668 L589.55989,764.33668 Z"
                    fill="#B6B3C5"
                  ></path>
                  <rect
                    id="矩形"
                    fill="#B6B3C5"
                    x="465.204"
                    y="919.24777"
                    width="19.72649"
                    height="3.48113"
                  ></rect>
                  <rect
                    id="矩形"
                    fill="#B6B3C5"
                    x="639.84147"
                    y="919.82798"
                    width="19.72649"
                    height="3.48113"
                  ></rect>
                  <path
                    id="路径"
                    d="M962.90439,768.39805 L160.12674,768.39805 C153.99139,768.39805 149,763.40634 149,757.27126 L149,299.12674 C149,292.99168 153.99139,288 160.12674,288 L962.90439,288 C969.03976,288 974.03139,292.99168 974.03139,299.12674 L974.03139,757.2713 C974.03139,763.40638 969.03968,768.39805 962.90439,768.39805 L962.90439,768.39805 Z"
                    fill="#c2c3cb"
                  ></path>
                  <rect
                    id="矩形"
                    fill="#FFFFFF"
                    x="169.30667"
                    y="307.72662"
                    width="785.57844"
                    height="443.26583"
                  ></rect>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div v-if="TextlStatusCode.includes(status)" class="def-bg">
          <div class="presuppose-icon" :style="{ backgroundColor: statusMessage.color }">
            <IconCheck v-if="status == 'success'" size="1.8vw" color="#FFFFFF" />
            <span v-if="status == 'warning'">!</span>
            <IconClose v-if="status == 'error'" size="1.8vw" color="#FFFFFF" />
            <span v-if="status == 'info'">i</span>
          </div>
        </div>
      </slot>
    </div>
    <slot name="title">
      <div style="display: flex; flex-direction: column; align-items: center">
        <p v-if="!title" class="base-title">{{ statusMessage.title }}</p>
        <p v-else class="base-title">{{ title }}</p>
        <p class="base-subTitle">{{ content }}</p>
      </div>
    </slot>
    <div style="display: flex">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';

import { ResultProps } from './type';

defineOptions({
  name: 'KResult'
});

const props = withDefaults(defineProps<ResultProps>(), {
  status: '',
  title: '',
  subTitle: ''
});

const _styleModule = inject('_styleModule', '');
const DigitalStatusCode = ['403', '404', '500'];
const TextlStatusCode = ['success', 'warning', 'info', 'error'];

const statusMessage = computed(() => {
  switch (props.status) {
    case '403':
      return { title: '你没有权限访问', color: '#a26ef4' };
    case '404':
      return { title: '对不起，您访问的页面不存在', color: '#1890ff' };
    case '500':
      return { title: '对不起，服务器错误', color: '#ff603b' };
    case 'success':
      return { title: 'success', color: '#52c41a' };
    case 'warning':
      return { title: 'warning', color: '#faad14' };
    case 'info':
      return { title: 'info', color: '#1890ff' };
    case 'error':
      return { title: 'error', color: '#ff4d4f' };
    default:
      return {
        title:
          '未知状态, 请在组件中正确使用 status / title / subTitle 属性, 或 #icon / #extra 插槽',
        color: '#ff4d4f'
      };
  }
});
</script>

<style lang="less" scoped>
@import './style.less';
</style>
