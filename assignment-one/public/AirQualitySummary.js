export default {
  props: {
    averageAirQuality: { required: true, type: Number },
    maskRecommended: { required: true, type: Boolean },
  },
  data() {
    return {};
  },
  template: `
    <h3>Air Quality</h3>
    <p>The average concentration of PM<sub>2.5</sub> for the next five days is {{averageAirQuality.toFixed(2)}} μg/m<sup>3</sup></p>
    <p v-if="maskRecommended==true">The concentration of PM<sub>2.5</sub> will reach over 10μg/m<sup>3</sup> in the next five days, so <i>bring a mask!</i> 😷</p>
    <p v-if="maskRecommended==false">The concentration of PM<sub>2.5</sub> will not reach over 10μg/m<sup>3</sup> in the next five days, so you <i>don't need to bring a mask!</i> 🌱</p>
  `,
};
