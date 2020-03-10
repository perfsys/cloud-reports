<template>
    <div id="app">
        <router-view class="container no-padding-bottom" style="padding-left: 0;padding-right: 0"
                     name="header"></router-view>
        <router-view :API_ENDPOINT="this.API_ENDPOINT" class="container no-padding-bottom"></router-view>
        <router-view class="container no-padding-bottom" style="padding-left: 0;padding-right: 0"
                     name="footer"></router-view>
    </div>

</template>

<script>

  let API_ENDPOINT = '';
  if (document.location.hostname === 'localhost') {
    API_ENDPOINT = 'https://1ith9lnkc2.execute-api.eu-west-1.amazonaws.com/dev'
  } else {
    API_ENDPOINT = `${document.location.protocol}/${document.location.hostname}/dev`
  }


  export default {
        name: 'app',
        data: ()=> {
          return{
            API_ENDPOINT: API_ENDPOINT
          }
        },
        components: {}
    }
</script>
<style lang="scss">
</style>
