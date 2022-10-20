import HourlyWeather from "./HourlyWeather.js";

export default {
  components: {
    HourlyWeather,
  },
  props: {
    processedWeather: { required: true, type: Array },
  },
  data() {
    return {
      today: new Date().toJSON().slice(0, 10),
    };
  },
  template: `
    <h3>4 Day Weather Forecast</h3>
    <p>Below is a summary of the weather forecast for the next four days. Each value represents the average of all datapoints from that day.</p>
    <hourly-weather :processed-weather="processedWeather"></hourly-weather>
    <br>
    <table class="table table-bordered table-hover">
        <thead>
            <tr>
                <th>Date</th>
                <th>Temperature</th>
                <th>Wind Speed (meter/sec)</th>
                <th>Rainfall Level (mm)</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="day in processedWeather">
                <td v-if="day.date===today">Today</td>
                <td v-else>{{day.list[0].dt_txt.slice(0,10)}}</td>
                <td>{{Math.round(day.averageTemp)}}℃</td>
                <td>{{day.averageWind.toFixed(2)}}</td>
                <td>{{day.averageRain.toFixed(2)}}</td>
            </tr>
        </tbody>
      </table>
    `,
};
