export default {
  props: {
    processedWeather: { required: true, type: Array },
  },
  data() {
    return {
      today: new Date().toJSON().slice(0, 10),
    };
  },
  template: `
    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#hourlyWeatherModal">
      See more detailed forecast
    </button>
    
    <br>

    <div class="modal fade" id="hourlyWeatherModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">4 Day (3 hour) Forecast</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div v-for="day in processedWeather">
              <h5 v-if="day.date===today">Today</h5>
              <h5 v-else>{{day.date}}</h5>
              
              <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Temperature</th>
                        <th>Wind Speed (meter/sec)</th>
                        <th>Rainfall Level (mm)</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="item in day.list">
                        <td>{{item.dt_txt.slice(11,20)}}</td>
                        <td>{{Math.round(item.main.temp)}}℃</td>
                        <td>{{item.wind.speed.toFixed(2)}}</td>
                        <td v-if="item.hasOwnProperty('rain') === true">{{item.rain["3h"]}}</td>
                        <td v-else>0.00</td>
                    </tr>
                    <br>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
