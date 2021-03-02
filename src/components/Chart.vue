<script>
import axios from "axios"
import {Line} from "vue-chartjs"
export default {
  created(){
    axios.get("/history?start_at=2020-01-01&end_at=2020-02-01")
    .then(response=>{
      console.log(response.data.rates);
      let data = response.data.rates
      let size = 0
      for(let key in data){
        // console.log(key+" "+response.data.rates[key].TRY);
        this.dates.push(key)
        this.prices.push(response.data.rates[key].TRY)
        this.dataset.labels = this.dates.map(String)
        this.dataset.datasets.data= this.prices.map(String)
      }
      console.log(this.dataset.labels);
      // console.log(this.dates);
      console.log(this.dataset.datasets.data);
    })
  },
  extends:Line,
  data(){
    return{
      dates:[],
      prices:[],
      dataset:{
        labels: [],
        datasets: [{
            label: '# of Votes',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      },
      options:{
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.dataset, this.options)
  }
}
</script>