export default {
  props: {
    averageRain: { required: true, type: Number },
    averageTemp: { required: true, type: Number },
    averageWind: { required: true, type: Number },
    date: { required: true, type: String },
    list: { required: true, type: Array },
  },
  data() {
    return {
      today: new Date().toJSON().slice(0, 10),
    };
  },
  template: `
    <h3 v-if="date==today">Today's Weather ({{list[0].dt_txt.slice(0,10)}})</h3>
    <h3 v-if="date!=today">{{list[0].dt_txt.slice(0,10)}}</h3>

    <table style="width:100%">
        <tr>
            <th>Time</th>
            <th>Temperature</th>
            <th>Wind Speed</th>
            <th>Rainfall Level</th>
        </tr>
        <tr v-for="item in list">
          <td>{{item.dt_txt.slice(11,20)}}</td>
          <td>{{item.main.temp}}</td>
          <td>{{item.wind.speed}}</td>
          <!-- TODO fix this -->
          <td>{{item.rain}}</td>
        </tr>
    </table>
    `,
};
