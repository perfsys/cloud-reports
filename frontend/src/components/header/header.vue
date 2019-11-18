<template>
    <div>
        <b-nav card-header pills justified>
            <b-nav-item to="/" exact exact-active-class="active">Home</b-nav-item>
            <b-nav-item to="/report" exact exact-active-class="active" >Report</b-nav-item>
            <b-nav-item to="/test" exact exact-active-class="active" >Test</b-nav-item>
            <!--<b-nav-item disabled>Disabled</b-nav-item>-->
        </b-nav>
    </div>
</template>

<script>

    export default {
        name: 'Header',
        data:() =>{
            return{
                isActivNav: false
            }
         },
         methods: {

         }
    }
</script>

<style>
    .active {
        background-color: #007bff !important;
        color: white !important;
    }
</style>
