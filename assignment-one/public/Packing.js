export default {
  props: {
    fourDayAverage: { required: true, type: Number },
    willRain: { required: true, type: Boolean },
  },
  template: `
    <h3>Packing Recommendations</h3>
    <p v-if="willRain===true">It is predicted to rain over the next four days. <b>Pack an umbrella!</b> ☔️</p>
    <p v-else>It is not predicted to rain over the next four days. <b>You don't need to bring an umbrella!</b> 😎</p>

    <p>The average temperature over the next four days is {{Math.round(fourDayAverage)}}℃.</p>
    
    <div v-if="fourDayAverage<12">
        <p>You need to pack for <b>cold weather</b>. Here are some suggestions!</p>
        <ul class="list-group">
            <li class="list-group-item">🧥 Coat</li>
            <li class="list-group-item">🧤 Gloves</li>
            <li class="list-group-item">🧣 Scarf</li>
            <li class="list-group-item">🌂 Umbrella</li>
         </ul>
    </div>

    <div v-if="fourDayAverage>=12 && fourDayAverage<=24">
        <p>You need to pack for <b>mild weather</b>. Here are some suggestions!</p>
        <ul class="list-group">
            <li class="list-group-item">🧥 Jacket</li>
            <li class="list-group-item">👕 T-shirts</li>
            <li class="list-group-item">👖 Jeans</li>
            <li class="list-group-item">👟 Runners</li>
         </ul>
    </div>

    <div v-if="fourDayAverage>24">
        <p>You need to pack for <b>hot weather</b>. Here are some suggestions!</p>
        <ul class="list-group">
            <li class="list-group-item">😎 Sunglasses</li>
            <li class="list-group-item">🧢 Cap</li>
            <li class="list-group-item">👙 Swimming togs</li>
            <li class="list-group-item">🩴 Flip flops</li>
        </ul>
    </div>
`,
};
