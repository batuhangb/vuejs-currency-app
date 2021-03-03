<template>
  <div class="container pt-5">
    <h1 class="text-center">Currencies</h1>
    <h3 class="text-center">Base <b>{{base}}</b></h3>
    <hr>
    <div class="row">
    <div class="col-lg-12 table-content">
      <table class="table table-hover">
      <thead>
        <tr class="table-primary">
          <th scope="col">Curreny</th>
          <th scope="col">Rate</th>
        </tr>
      </thead>
      <tbody v-for="(currency,key) in currencyList">
        <tr :class="{'table-active': key%2!=0}">
          <th scope="row">{{currency.currencyName}}</th>
          <td scope="row">{{currency.exchangeRate}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"
export default {

  data(){
    return{
      currencyList:[],
      base:'',
      
    }
  },
  created(){
    axios.get("/latest")
    .then(response=>{
      this.base = response.data.base
      let data = response.data.rates
      for(let key in data){
        this.currencyList.push({currencyName:key, exchangeRate:response.data.rates[key]})
      }
      this.currencyList.sort(function(a,b){
        var sortA = a.currencyName.toUpperCase();
        var sortB = b.currencyName.toUpperCase();
        if(sortA< sortB){
          return -1;
        }
        if(sortA>sortB){
          return 1;
        }
        return 0 
      })
    })
  }
}
</script>
<style scoped>
.table-content{
  display: flex;
  justify-content: center;
}
.table{
  text-align: center;
  width: 50%;
  box-shadow: 2px 2px 6px #000;
}
</style>
