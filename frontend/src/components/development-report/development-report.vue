<template>
    <div>
        <div class="position-save">
            <div class="col-5 col-form-label">
                <b-form-group id="input-group-3" label-for="input-3">
                    <div class="position-input">
                        <select class="form-control" v-model="user">
                            <option disabled value>Select user</option>
                            <option
                                    v-for="(user, index) in usersDb"
                                    v-bind:key="index"
                                    :value="user.username">{{user.name}}
                            </option>
                        </select>
                    </div>
                </b-form-group>
            </div>
        </div>
        <div class="week">
            <b-button class="week__item btn btn-light" :disabled="!isPreviousWeekPointerEnabled" @click="currentWeek--">
                previous week({{ currentWeek - 1 }})
            </b-button>
            <span class="week__item-current">{{ firstDayOfWeek }} - {{ lastDayOfWeek }} (week {{ currentWeek }})</span>
            <b-button class="week__item btn btn-light" :disabled="!isNextWeekPointerEnabled" @click="currentWeek++">next
                week ({{ currentWeek + 1 }})
            </b-button>
        </div>
        <div>
            <dayReport
                    v-for="(day, index) in fullWeek"
                    v-bind:key="index"
                    :info="{ day: day, id: index }"
                    :API_ENDPOINT="API_ENDPOINT"
                    @interface="handleFcAfterDateBack">
            </dayReport>
        </div>

        <div class="bottom">
            <b-button
                    variant="primary"
                    class="save-report-button"
                    v-on:click="sendReport">
                Send report
            </b-button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import usersDb from "../../db/users.json";
    import dayForm from "./day-form.vue";
    import Swal from "sweetalert2";

    export default {
        name: "report",
        props: {
            "API_ENDPOINT": String
        },
        data: () => {
            return {
                week: null,
                user: "",
                numberWeek: null,
                usersDb: usersDb,
                currentWeek: "",
                firstDayOfWeek: "",
                lastDayOfWeek: "",
                fullWeek: "",

                report: []
            };
        },
        mounted() {
            this.currentWeek = this.getWeekNumber(new Date());
            this.startOfWeek();
        },
        computed: {
            isPreviousWeekPointerEnabled() {
                return this.currentWeek > 1;
            },
            isNextWeekPointerEnabled() {
                return this.currentWeek < 53;
            }
        },
        components: {
            dayReport: dayForm
        },
        watch: {
            currentWeek() {
                this.setWeek();
            }
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
                let report = [...this.report];

                if (this.user !== "") {
                    let tasks = report
                        .flat()
                        .filter(el => el !== undefined)
                        .map(el => {
                            el.taskId = el.task.id
                            el.boardId = el.task.idBoard
                            el.listId = el.task.idList
                            delete el.trelloTasks
                            delete el.isInputsEnable
                            delete el.task
                            return el
                        });

                    if (tasks.length > 0) {
                        let request = {
                            user: this.user,
                            week: this.currentWeek,
                            tasks: tasks
                        };

                        axios
                            .post(`/report/developer-weekly`, request)
                            .then(() => {
                                Swal.fire({
                                    position: 'top-end',
                                    title: 'The report was created',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            })
                            .catch(error => {
                                this.$log.error(error)
                                Swal.fire({
                                    text: "Something went wrong!",
                                });
                            });
                    } else {
                        Swal.fire({
                            text: "Could not sent empty report",
                        });
                    }
                } else {
                    Swal.fire({
                        text: "Select user",
                    });
                }

            },
            getWeekNumber(d) {
                d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
                d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
                let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
                let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

                return weekNo;
            },
            setWeek() {
                let year = new Date().getFullYear();
                let weekNumber = this.currentWeek;
                let weekDay = 1;
                let d1 = new Date(year, 0, 1);
                let firstDay = d1.getDay();

                let days =
                    firstDay == weekDay ?
                        0 :
                        (weekNumber - 1) * 7 + weekDay - (firstDay - 1);
                let dn = new Date(year, 0, days);

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

    .save-report-button {
        margin-top: 35px;
        margin-right: 40px;
        float: right;
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

            &:disabled {
                cursor: default;
            }
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
