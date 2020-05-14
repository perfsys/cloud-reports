<template>
    <div id="app">
        <router-view class="container no-padding-bottom" style="padding-left: 0;padding-right: 0" name="header"/>
        <router-view class="container no-padding-bottom"/>
        <router-view class="container no-padding-bottom" style="padding-left: 0;padding-right: 0" name="footer"/>
    </div>

</template>

<script>

  export default {
        name: 'app',
        components: {}
    }
</script>
