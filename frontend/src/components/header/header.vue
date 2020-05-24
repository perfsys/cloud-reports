<template>
    <div>
        <b-nav card-header pills justified>
            <b-nav-item
                v-for="r in routes"
                :key="r.route"
                :to="r.route"
                :active="location===r.route"
                @click="changeLocation(r.route)"
                >{{r.title}}</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        data: () => ({
            location: null,
            routes: [{
                route: '/development',
                title: 'Development',
            }, {
                route: '/linked-in',
                title: 'LinkedIn',
            }, {
                route: '/lead-generation',
                title: 'Lead Generation',
            }],
        }),
        created() {
            this.location = this.$router.currentRoute.path;
        },
        methods: {
            changeLocation(route) {
                this.location = route;
            },
        },
    }
</script>
