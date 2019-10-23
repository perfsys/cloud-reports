<template>
    <div>
        <div class="position-save">
            <div>
                <b-button variant="primary" class="position-button" v-on:click="sendReport">Save
                </b-button>
            </div>
            <div class="col-4 col-form-label">
                <b-form-group id="input-group-3" label-for="input-3">
                    <div class="position-input">
                        <b-form-input v-model="user" placeholder="User"></b-form-input>

                    </div>
                </b-form-group>
                <b-form-group id="input-group-3" label-for="input-3">
                    <div class="position-input">
                        <b-form-input v-model="numberWeek" placeholder="Week"></b-form-input>

                    </div>
                </b-form-group>
            </div>
        </div>
        <div>
            <div v-for="day in week">
                <b-badge variant="primary">{{day}}</b-badge>
                <div class="container-report-form">
                    <div class="container-report" v-for="(i , index) in 3">
                        <div class="position-input">
                            <b-form-input v-model="getDay(day)[index].project" placeholder="Project"></b-form-input>

                        </div>
                        <div class="position-input">
                            <b-form-input v-model="getDay(day)[index].customer" placeholder="Customer"></b-form-input>
                        </div>
                        <div class="position-input">
                            <b-form-input v-model=getDay(day)[index].task placeholder="Task"></b-form-input>
                        </div>
                        <div class="position-input">
                            <b-form-input v-model=getDay(day)[index].hours placeholder="Hours"></b-form-input>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import axios from "axios";
    export default {
        name: "report",
        data: () => {
            return {
                week: null,
                report: null,
                user: null,
                numberWeek: null

            }
        },
        methods: {
            getMonday(date) {
                date = new Date(date);
                let month = new Date(date).getMonth()
                let day = date.getDay(),
                    diff = date.getDate() - day + (day == 0 ? -6 : 1);
                month = month < 10 ? `0${month}` : `${month}`
                return {"day": diff, "month": month}
            },
            getArrayWeek() {
                let monday = this.getMonday(new Date())
                let week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                let reportWeek = week.map((num, index) => `${num} ${monday.day + index}/${monday.month}`)
                this.week = reportWeek
            },
            sendReport() {
                let request = {
                    user: this.user,
                    week: this.numberWeek,
                    report: this.report
                }
                axios
                    .post('https://5ci0e5uuta.execute-api.us-east-1.amazonaws.com/test/reports/user-report', request)
                    .then(response => {
                        console.log("Good")
                    })


            },
            getDay(day) {
                let a = null;
                 this.report.filter((el, index )=> { if(el.day === day){
                    a = this.report[index].infoReport
                }})
                return a
            },
            createReport() {
                this.report = this.week.map(day => {
                    return {
                        day: day,
                        infoReport: [{
                            project: null,
                            customer: null,
                            task: null,
                            hours: null
                        },{
                            project: null,
                            customer: null,
                            task: null,
                            hours: null
                        },{
                            project: null,
                            customer: null,
                            task: null,
                            hours: null
                        }]
                    }

                })

            }
        },
        mounted() {
            this.getArrayWeek();
            this.createReport()
        },
    }
</script>

<style scoped>
    .container-report {
        display: flex;
        width: 100%;
    }

    .container-report-form {
        flex-direction: row;
        justify-content: flex-start;
        border: 1px solid rgba(230, 233, 233, 0.8);
        border-radius: 15px;
        padding: 20px;
    }

    .position-input {
        width: 100%;
        margin-right: 10px;
        margin-top: 10px
    }

    .position-button {
        margin-top: 35px;
        margin-right: 40px
    }

    .badge {
        display: inline-block;
        padding: 0.25em 0.4em;
        font-size: 100%;
        font-weight: 500;
        line-height: 1.5;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 0.25rem;
        height: 35px;
        width: 150px;
        position: relative;
        margin-bottom: 0px;
        /* bottom: 290px; */
        top: 15px;
        left: 22px;
    }

    .position-save {
        display: flex;
        margin-top: 50px;
        margin-left: 38%
    }

</style>
