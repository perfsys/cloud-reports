<template>
    <div>
        <div class="position-save">
            <div class="col-5 col-form-label">
                <b-form-group id="input-group-3" label-for="input-3">
                    <div class="position-input">
                        <select class="form-control" v-model="user">
                  <option disabled value>Select user</option>
                  <option v-for="(user, index) in usersDb" :value="user.name">{{
                    user.name
                  }}</option>
                </select>
                    </div>
                </b-form-group>
                <b-form-group id="input-group-3" label-for="input-3">
                    <div class="position-input"></div>
                </b-form-group>
            </div>
    </div>
    <div class="week">
      <span class="week__item pointer" @click="currentWeek--"
        >previous week({{ currentWeek - 1 }})</span
      ><span class="week__item-current"
        >{{ firstDayOfWeek }} - {{ lastDayOfWeek }} (current week
        {{ currentWeek }})</span
      ><span class="week__item pointer" :disabled="isDisabled" @click="currentWeek++"
        >next week ({{ currentWeek + 1 }})</span
      >
    </div>
    <div>
      <dayReport
        v-for="(day, index) in fullWeek"
        :info="{ day: day, id: index }"
        @interface="handleFcAfterDateBack"
      ></dayReport>
    </div>

    <div class="bottom">
      <b-button
        variant="primary"
        class="position-button"
        v-on:click="sendReport"
        >Save report
      </b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import usersDb from "../db/users.json";
import projectsDb from "../db/projects.json";
import customersDb from "../db/customers.json";
import dayReport from "./dayReport.vue";
import qs from "querystring";
import Swal from "sweetalert2";

export default {
    name: "report",
    data: () => {
        return {
            week: null,
            user: "",
            numberWeek: null,
            usersDb: usersDb,
            customersDb: customersDb,
            currentWeek: "",
            firstDayOfWeek: "",
            lastDayOfWeek: "",
            fullWeek: "",
            trelloCards: "",
            testReport: [],

            report: []
        };
    },
    methods: {
        handleFcAfterDateBack(event) {
            let result = [...event];

            for (let i = 0; i < result.length; i++) {
                result[i].date = event.date.day;
            }

            this.report[event.date.id] = result;
        },
        sendReport() {
            let array = [...this.report];
            let result = [];

            result = array.flat();
            let request = {
                user: this.user,
                week: this.currentWeek,
                report: result
            };

            axios
                .post(
                    "https://o814u8lpp8.execute-api.us-east-1.amazonaws.com/test/reports/user-report",
                    request
                )
                .then(response => {
                    //   console.log("Good");
                    Swal.fire({
                        position: 'top-end',
                        //   icon: 'success',
                        title: 'The report was created',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.log(error);
                    Swal.fire({
                        text: "Please fill all fields!",
                    });
                });
        },
        getWeekNumber(d) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

            return weekNo;
        },
        setWeek() {
            let year = 2019;
            let weekNumber = this.currentWeek;
            let weekDay = 1;
            let d1 = new Date(year, 0, 1);
            let firstDay = d1.getDay();
            let monday;

            let days =
                firstDay == weekDay ?
                0 :
                (weekNumber - 1) * 7 + weekDay - (firstDay - 1);
            let dn = new Date(year, 0, days);

            monday = dn.toLocaleDateString();
            let date = new Date(dn);
            let i = 1;
            let week = [];

            for (i; i <= 6; i++) {
                let dayOfWeek =
                    date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : i);
                week.push(new Date(date.setDate(dayOfWeek)).toLocaleDateString());
            }
            this.firstDayOfWeek = week[0];
            this.lastDayOfWeek = week[5];
            this.fullWeek = week;
        },
        startOfWeek(date) {
            date = new Date();
            let i = 1;
            let week = [];

            for (i; i <= 6; i++) {
                let dayOfWeek =
                    date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : i);
                week.push(new Date(date.setDate(dayOfWeek)).toLocaleDateString());
            }
            this.firstDayOfWeek = week[0];
            this.lastDayOfWeek = week[5];
            this.fullWeek = week;
        }
    },
    mounted() {
        this.currentWeek = this.getWeekNumber(new Date());
        this.startOfWeek();
    },
    computed: {
        isDisabled() {
            return !this.currentWeek < 53;
        }
    },
    components: {
        dayReport
    },
    watch: {
        currentWeek() {
            this.setWeek();
        }
    }
};
</script>

<style scoped lang="scss">
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
    margin-top: 10px;
}

.position-button {
    margin-top: 35px;
    margin-right: 40px;
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
    margin-left: 38%;
}

.week {

    text-align: center;
    &__item {
        font-size: 14px;
        font-weight: bold;
    }
    &__item-current {
        font-size: 18px;
        font-weight: bold;
        margin: 0 30px;
    }
}

.pointer {
    cursor: pointer;
}

.bottom {
    margin-bottom: 100px;
}
</style>
