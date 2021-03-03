<template>
  <div class="container-fluid pt-5 card">
    <div class="row">
        <div class="col-6 offset-3 ">
      <h1 class="text-center">Currencies</h1>
      <h3 class="text-center">Base <b>{{base}}</b></h3>
      <hr>
        <div class="selectCurrency">


        <select class="custom-select" v-model="baseCurrencyId" @change="baseSelected">
        <option disabled value=null selected hidden>Select a currency to see rates</option>
        <option  v-for="(currency,key) in currencyList" :value="currency.id">{{currency.currencyName}}</option>
        </select>

        <select class="custom-select" v-model="selectedCurrencyId" @change="currencySelected">
        <option disabled value=null selected hidden>Select a currency to see rates</option>
        <option  v-for="(currency,key) in currencyList" :value="currency.id">{{currency.currencyName}}</option>
        </select>
        </div>
        <div class="currencies" v-if="selectedCurrencyId !=null">
          <div class="form-groups">
          <h1>{{base}}</h1>
          <input type="text" class="form-control" id="basePrice" v-model="basePrice">
        </div>
        <p style="font-size:50px;font-weight:bold; margin:0 10px 0 10px;">=</p>
        <div class="form-groups">
          <h1>{{selectedCurrency}}</h1>
          <input type="text" class="form-control" id="selectedPrice" v-model="selectedPrice">
        </div>

        </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return{
      currencyList:[],
      base:'',
      basePrice:1,
      baseCurrencyId:null,
      baseCurrency:null,
      selectedCurrencyId:null,
      selectedCurrency:null,
    }
  },
  created(){

    axios.get("/latest?base="+this.base)
    .then(response=>{
      this.base = response.data.base
      let data = response.data.rates
      for(let key in data){
        this.currencyList.push({currencyName:key, exchangeRate:response.data.rates[key]})
      }
      this.currencyList.push({currencyName:"EUR", exchangeRate:1})
      this.currencyList.sort(function(a,b){
        var sortA = a.currencyName
        var sortB = b.currencyName
        if(sortA< sortB){
          return -1;
        }
        if(sortA>sortB){
          return 1;
        }
        return 0 
      })
      this.currencyList.forEach((element,i)=>{
        element.id = i++;
      })

      
    })
  },
  methods:{
    currencySelected(){
      this.selectedCurrency = this.currencyList[this.selectedCurrencyId].currencyName
      
    },
    baseSelected(){
      this.basePrice=1
      this.baseCurrency = this.currencyList[this.baseCurrencyId].currencyName
      let exchangeRate=this.currencyList[this.baseCurrencyId].exchangeRate

      for(let i = 0;i<this.currencyList.length;i++){
        this.currencyList[i].exchangeRate = this.currencyList[i].exchangeRate / exchangeRate
      }
      this.base=this.baseCurrency
    }
  },
  computed:{
    selectedPrice(){
      if(this.basePrice==""){
        return ""
      }else{
        return parseFloat(this.currencyList[this.selectedCurrencyId].exchangeRate).toFixed(2) * parseFloat(this.basePrice)
      }
    }
  },
  watch:{

  }
}
</script>
<style scoped>
li{
  margin-top: 10px;
}
.row{
  margin-bottom: 110px;
}
.list-group{
  display: flex;
  justify-content: center;
  align-items:center;
}
.list-group-item{
    width: 100px;
    text-align: center;
}
.selectCurrency{
  display: flex;


}

.currencies{
  margin-top: 10px;
  padding: 100px 0 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(150, 150, 150,0.7);
  border-radius: 5px;
  box-shadow: 2px 2px 6px #000;
  border-left: 10px solid green;

}
.currencies h1{
  font-weight:bold;
  margin-bottom: 25px;
}
.form-groups{
  margin-right: 5px; 
  text-align: center;
}
.custom-select{
  margin: 0 5px 0 5px;
}


</style>