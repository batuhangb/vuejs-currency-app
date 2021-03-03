<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
    <router-link
          tag="a"
          class="navbar-brand"
          active-class="active"
          exact
          to="/">
      Currency Exchange Rates
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"  aria-label="Toggle navigation" @click="expandNav= !expandNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" :class="{'show':expandNav}" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link
          tag="li"
          class="nav-item"
          active-class="active"
          exact
          to="/">
          <a class="nav-link" href="#">Currency List</a>
        </router-link>
        <router-link
          tag="li"
          class="nav-item"
          active-class="active"
          exact
          to="/currency-rates">
          <a class="nav-link" href="#">Currency Rates</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>
<script>

export default {
  data(){
    return{
      expandNav:false
    }
  }
  
}
</script>