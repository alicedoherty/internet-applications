export default {
  props: {
    fourDayAverage: { required: true, type: Number },
    rain: { required: true, type: Boolean },
  },
  data() {
    return {};
  },
  template: `
    <p v-if="rain==true">It is predicted to rain over the next four days. Pack an umbrella!</p>
    <p v-if="rain!=true">It is not predicted to rain over the next four days. You don't need to bring an umbrella!</p>

    <p>The average temperature over the next four days is {{Math.round(fourDayAverage)}}℃.</p>
    
    <div v-if="fourDayAverage<12">
        <p>You need to pack for cold weather.</p>
        <p>Here are some suggestions!</p>
        <ul>
            <li><input type="checkbox">Coat</li>
            <li><input type="checkbox">Gloves</li>
            <li><input type="checkbox">Scarf</li>
            <li><input type="checkbox">Hat</li>
         </ul>
    </div>

    <div v-if="fourDayAverage>=12 && fourDayAverage<=24">
        <p>You need to pack for mild weather.</p>
        <p>Here are some suggestions!</p>
        <ul>
            <li><input type="checkbox">Jacket</li>
            <li><input type="checkbox">T-shirts</li>
            <li><input type="checkbox">Jeans</li>
            <li><input type="checkbox">Runners</li>
         </ul>
    </div>

    <div v-if="fourDayAverage>24">
        <p>You need to pack for hot weather.</p>
        <p>Here are some suggestions!</p>
        <ul>
            <li><input type="checkbox">Sunglasses</li>
            <li><input type="checkbox">Cap</li>
            <li><input type="checkbox">Suncream</li>
            <li><input type="checkbox">Flip flops</li>
        </ul>
    </div>
    
`,
};
