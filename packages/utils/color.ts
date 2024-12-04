// culori
import { parse, converter, Oklch } from 'culori';
import { getCSSVar } from './utils';

// 预设状态颜色
const presetColors: {
  primary: string;
  success: string;
  warning: string;
  danger: string;
  error: string;
  info: string;
  [key: string]: string;
} = {
  primary: '#3b82f6',
  success: '#22c55e',
  warning: '#f97316',
  danger: '#ef4444',
  error: '#ef4444',
  info: '#64748b',
};
// 亮度
const lightness: number[] = [
  97.78, 93.56, 88.11, 82.67, 74.22, 64.78, 57.33, 46.89, 39.44, 32, 23.78,
];

// 纯度
const chromaArr: number[] = [
  0.0108, 0.0321, 0.0609, 0.0908, 0.1398, 0.1472, 0.1299, 0.1067, 0.0898, 0.0726, 0.054,
];

// 色阶名称
const colorName: string[] = [
  '--k-oklch-50',
  '--k-oklch-100',
  '--k-oklch-200',
  '--k-oklch-300',
  '--k-oklch-400',
  '--k-oklch-500',
  '--k-oklch-600',
  '--k-oklch-700',
  '--k-oklch-800',
  '--k-oklch-900',
  '--k-oklch-950',
];

export function GetColorLevelNew(color: string) {
  const lightnessDiff: number[] = lightness.map((value) => value - lightness[5]);
  const ChromaArrDiff: number[] = chromaArr.map((value) => value - chromaArr[5]);

  // 校验颜色是否是预设颜色
  let colorValue = presetColors[color] ?? color;

  // 1.转换成 oklch, 并获取 hue
  const toOKLCH = converter('oklch');
  const toRGB = converter('rgb');
  const colorLevel: { [key: string]: string } = {}; // 最终返回的颜色等级

  if (parse(colorValue)) {
    const { l, c, h } = toOKLCH(colorValue) ?? {};
    if (!l || !c || !h) {
      return;
    }

    // 提取颜色hub值, 计算色阶
    for (let i = 0; i < 11; i++) {
      const light = l + lightnessDiff[i] / 100;
      const lightMin = lightness[lightness.length - 1] / 100;
      const lightMax = lightness[0] / 100;
      const lightClamp = clampRgbValue(light, lightMin, lightMax);
      const chroma = c + ChromaArrDiff[i];
      const chromaMin = chromaArr[0];
      const chromaMax = c;
      const chromaClamp = clampRgbValue(chroma, chromaMin, chromaMax);

      const newOklchColor: Oklch = { l: lightClamp, c: chromaClamp, h, mode: 'oklch' };

      const newRGBColor: { r: number; g: number; b: number } = toRGB(newOklchColor);

      const newRGBColor255 = {
        mode: 'rgb',
        r: (clampRgbValue(newRGBColor.r, 0, 1) * 255).toFixed(2),
        g: (clampRgbValue(newRGBColor.g, 0, 1) * 255).toFixed(2),
        b: (clampRgbValue(newRGBColor.b, 0, 1) * 255).toFixed(2),
      };

      colorLevel[colorName[i]] =
        `rgb(${newRGBColor255.r}, ${newRGBColor255.g}, ${newRGBColor255.b})`;
    }
  } else {
    ('请输入正确颜色值');
  }

  return {
    colorLevel,
  };
}

function clampRgbValue(value: number, min = 0, max = 255) {
  return Math.max(min, Math.min(max, value));
}
