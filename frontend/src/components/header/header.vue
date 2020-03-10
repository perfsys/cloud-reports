<template>
    <div>
        <b-nav card-header pills justified>
            <b-nav-item to="/development" active>Development</b-nav-item>
            <b-nav-item to="/marketing">Marketing</b-nav-item>
            <b-nav-item to="/lead-generation">Lead Generation</b-nav-item>
        </b-nav>
    </div>
</template>

<script>

    export default {
        name: 'Header',
        data:() =>{
            return{
                isActiveNav: false
            }
         },
         methods: {

         }
    }
</script>

<style>
    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
        background-color: #007bff !important;
        color: white !important;
    }
</style>
