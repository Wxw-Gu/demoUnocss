import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerAttributifyJsx } from 'unocss'

export default defineConfig({
  separators: [':', '-'],
  theme: {
  },
  shortcuts: {},
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
})
