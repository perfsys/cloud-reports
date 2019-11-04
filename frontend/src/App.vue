<template>
  <div id="app" >
    <router-view class="container no-padding-bottom" style="padding-left: 0;padding-right: 0"
                 name="header"></router-view>
    <router-view class="container no-padding-bottom"></router-view>
    <router-view class="container no-padding-bottom" style="padding-left: 0;padding-right: 0"
                 name="footer"></router-view>
  </div>

</template>

<script>
    export default {
        name: 'app',
        components: {
        }
    }
</script>
<style lang="scss">
</style>
