export default {
  props: {
    averageAirQuality: { required: true, type: Number },
    maskRecommended: { required: true, type: Boolean },
  },
  data() {
    return {};
  },
  template: `
    <p>The average concentration of PM_2.5 for the next five days is {{averageAirQuality.toFixed(2)}} μg/m3</p>
    <p v-if="maskRecommended==true">The concentration of PM_2.5 will reach over 10μg/m3 in the next five days, so bring a mask!</p>
    <p v-if="maskRecommended==false">The concentration of PM_2.5 will not reach over 10μg/m3 in the next five days, so you don't need to bring a mask!</p>
    `,
};
