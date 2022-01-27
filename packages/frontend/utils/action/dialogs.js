export default {
  barcode: () => import('@devterm-toolbox/frontend/components/controls/actions/Barcode.vue'),
  qrCode: () => import('@devterm-toolbox/frontend/components/controls/actions/QrCode.vue'),
  grid: () => import('@devterm-toolbox/frontend/components/controls/actions/Grid.vue'),
  text: () => import('@devterm-toolbox/frontend/components/controls/actions/Text.vue'),
  nativeText: () => import('@devterm-toolbox/frontend/components/controls/actions/NativeText.vue'),
  image: () => import('@devterm-toolbox/frontend/components/controls/actions/Image.vue'),
  feedPitch: () => import('@devterm-toolbox/frontend/components/controls/actions/FeedPitch.vue'),
  setAlign: () => import('@devterm-toolbox/frontend/components/controls/actions/SetAlign.vue'),
  setFont: () => import('@devterm-toolbox/frontend/components/controls/actions/SetFont.vue'),
  setLineSpace: () => import('@devterm-toolbox/frontend/components/controls/actions/SetLineSpace.vue'),
  setWordGap: () => import('@devterm-toolbox/frontend/components/controls/actions/SetWordGap.vue'),
  setMargin: () => import('@devterm-toolbox/frontend/components/controls/actions/SetMargin.vue'),
  setDensity: () => import('@devterm-toolbox/frontend/components/controls/actions/SetDensity.vue')
};
