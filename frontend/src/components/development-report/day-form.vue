<template>
    <div>
        <div>
            <b-badge variant="primary" class="day-badge">{{ day.date }}</b-badge>

            <div class="container-report-form">
                <b-table v-if="dailyReport && dailyReport.length > 0" striped hover :fields="fields" :items="dailyReport">
                    <template v-slot:cell(shortUrl)="data">

                        <button type="button" @click="openTrelloTask(data.item.shortUrl)" class="btn btn-primary">{{ data.item.name }}</button>
                    </template>
                </b-table>


                <div class="container-report">
                    <div class="position-input">
                        <select class="form-control"
                                v-model="tmpJob.customer"
                                @change="selectCustomer()"
                        >
                            <option disabled value>Select customer</option>
                            <option v-for="(customer, index) in customersDb"
                                    v-bind:key="index"
                                    :value="customer.name">{{ customer.name }}
                            </option>
                        </select>
                    </div>

                    <div class="position-input">
                        <select
                                class="form-control"
                                v-model="tmpJob.project"
                                @change="selectProject($event)"
                                :disabled="!tmpJob.form.projectEnable"
                        >
                            <option disabled value>Select project</option>
                            <option
                                    v-for="(project, project_index) in tmpJob.projectList"
                                    v-bind:key="project_index"
                                    :value="project.id">{{ project.name }}
                            </option>
                        </select>
                    </div>

                    <div class="position-input">
                        <select
                                class="form-control"
                                v-model="tmpJob.task"
                                @change="selectTask($event)"
                                :disabled="!tmpJob.form.taskEnable"
                        >
                            <option disabled selected value="Select task">Select task</option>
                            <option
                                    v-for="(task, task_index) in tmpJob.trelloTasks"
                                    v-bind:key="task_index"
                                    :value="task">{{task.name}}
                            </option>
                        </select>
                    </div>

                    <div class="position-input">
                        <b-form-input
                                v-model="tmpJob.hours"
                                type="number"
                                placeholder="Hours"
                                :disabled="!tmpJob.form.hoursEnable">
                        </b-form-input>
                    </div>
                    <b-button variant="success" class="save-task-button" @click="saveJob()"
                              :disabled="tmpJob.hours <= 0">
                        <font-awesome-icon icon="check"/>
                    </b-button>
                    <b-button variant="danger" class="remove-task-button" @click="initSaveForm()">
                        <font-awesome-icon icon="minus"/>
                    </b-button>
                </div>
                <br/>
            </div>
        </div>
    </div>
</template>

<script>
    import Swal from "sweetalert2";

    import usersDb from "../../db/users.json";
    import customersDb from "../../db/customers.json";

    export default {
        name: "dayReport",
        props: ["dayInfo", "user", "week", "dailyReport"],
        data: () => {
            return {
                fields: [
                    { key: 'customer', label: 'Customer' },
                    { key: 'project', label: 'Project' },
                    { key: 'shortUrl', label: 'Task' },
                    { key: 'hours', label: 'Hours' }
                ],
                usersDb: usersDb,
                customersDb: customersDb,
                day: {},
                // user: null,
                // week: null,
                tmpJob: {
                    form: {
                        taskEnable: false,
                        projectEnable: false,
                        hoursEnable: false,
                    },
                    customer: null,
                    project: null,
                    task: null,
                    hours: 0
                }
            };
        },
        async beforeMount() {
            this.day = this.dayInfo;
        },
        methods: {
            async fetchDay() {
                await this.$store.dispatch('fetchDay', {
                    user: this.user,
                    date: this.day.date
                })
            },
            saveJob() {
                if (this.user !== "") {

                    let request = {
                        user: this.user,
                        week: this.week,


                        date: this.day.date,
                        customer: this.tmpJob.customer,
                        project: this.tmpJob.projectName,
                        hours: this.tmpJob.hours,

                        taskId: this.tmpJob.task.id,
                        boardId: this.tmpJob.task.idBoard,
                        listId: this.tmpJob.task.idList,
                        shortUrl: this.tmpJob.task.shortUrl,
                        name: this.tmpJob.task.name
                    };
                    this.$log.info(this.request)
                    this.axios
                        .post(`/report/developer/job`, request)
                        .then(() => {
                            Swal.fire({
                                position: 'top-end',
                                title: 'The report was created',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            this.fetchDay()
                        })
                        .catch(error => {
                            this.$log.error(error)
                            Swal.fire({
                                text: "Something went wrong!",
                            });
                        });

                } else {
                    Swal.fire({
                        text: "Select user",
                    });
                }
                // this.dayReport[index].taskId = event.target.value.id;
                // this.dayReport[index].taskLink = event.target.value.url;
                this.initSaveForm()
            },
            getProjectList() {
                let customerName = this.tmpJob.customer;
                let projects = {};
                let customerIdx = this.customersDb.findIndex(
                    el => el.name === `${customerName}`
                );

                if (customerIdx !== -1) {
                    let customer = this.customersDb[customerIdx];
                    projects = customer.projects;
                }
                return projects;
            },
            getProjectById(id) {
                return  this.getProjectList().find(project => project.id === id);
            },
            selectCustomer() {
                this.clearProjectsDropdown()

                let projects = this.getProjectList();
                this.initProjectsDropdown(projects)

            },
            selectProject(event) {
                this.clearTasksDropdown()
                let me = this;
                let projectId = event.target.value;
                let url = `/trello?id=${projectId}`;
                this.tmpJob.projectName = this.getProjectById(projectId).name
                this.axios.get(url)
                    .then(response => {
                        let result = response.data.response;
                        me.$log.info("[getTrelloTasks] response", result)
                        me.initTasksDropdown(result)
                    })
                    .catch(error => {
                        me.$log.error(error)
                        me.clearTasksDropdown()
                    });
            },
            selectTask() {
                this.initHoursInput()
            },
            initSaveForm() {
                this.tmpJob.customer = null
                this.clearProjectsDropdown()
            },
            initProjectsDropdown(projects) {
                this.tmpJob.projectList = projects;
                this.tmpJob.form.projectEnable = true
            },
            clearProjectsDropdown() {
                this.tmpJob.projectList = [];
                this.tmpJob.project = null
                this.tmpJob.projectName = null
                this.tmpJob.form.projectEnable = false
                this.clearTasksDropdown()
            },
            initTasksDropdown(tasks) {
                this.tmpJob.trelloTasks = tasks;
                this.tmpJob.form.taskEnable = true
            },
            clearTasksDropdown() {
                this.tmpJob.trelloTasks = [];
                this.tmpJob.task = null
                this.tmpJob.form.taskEnable = false
                this.clearHoursInput()
            },
            initHoursInput() {
                this.tmpJob.hours = 0
                this.tmpJob.form.hoursEnable = true
            },
            clearHoursInput() {
                this.tmpJob.hours = 0
                this.tmpJob.form.hoursEnable = false
            },
            openTrelloTask(url){
                console.log(url)
                window.open(url, '_blank')
            }
        }
    };
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
        margin-top: 10px;
    }

    .add-task-button {
        width: 40px;
        height: 40px;
        margin-top: 15px;
    }

    .save-task-button,
    .remove-task-button {
        width: 40px;
        height: 40px;
        margin-top: 7px;
    }

    .save-task-button {
        margin-right: 4px;
    }

    .day-badge {
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
        top: 15px;
        left: 22px;
    }

    .position-save {
        display: flex;
        margin-top: 50px;
        margin-left: 38%;
    }
</style>
