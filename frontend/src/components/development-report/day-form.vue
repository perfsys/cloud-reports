<template>
    <div>
        <div>
            <b-badge variant="primary" class="day-badge">{{ info.day }}</b-badge>
            <div class="container-report-form">
                <div class="container-report"
                     v-for="(item, index) in dayReport"
                     v-bind:key="index"
                >
                    <div class="position-input">
                        <select
                                class="form-control"
                                v-model="dayReport[index].customer"
                                :disabled="!dayReport[index].isInputsEnable"
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
                                v-model="dayReport[index].project"
                                @change="selectProject($event, index)"
                                :disabled="!dayReport[index].isInputsEnable"
                        >
                            <option disabled value>Select project</option>
                            <option
                                    v-for="(project, project_index) in setProject(index)"
                                    v-bind:key="project_index"
                                    :value="project.id"
                            >{{ project.name }}
                            </option
                            >
                        </select>
                    </div>

                    <div class="position-input">
                        <select
                                class="form-control"
                                v-model="dayReport[index].task"
                                @change="selectTask($event, index)"
                                :disabled="!dayReport[index].isInputsEnable"
                        >
                            <option disabled selected value="Select task">Select task</option>
                            <option
                                    v-for="(task, task_index) in dayReport[index].trelloTasks"
                                    v-bind:key="task_index"
                                    :value="task">{{task.name}}
                            </option>
                        </select>
                    </div>

                    <div class="position-input">
                        <b-form-input
                                v-model="dayReport[index].hours"
                                type="number"
                                placeholder="Hours"
                                :disabled="!dayReport[index].isInputsEnable">
                        </b-form-input>
                    </div>
                    <b-button variant="success" class="save-task-button" @click="emitToParent(index)">
                        <font-awesome-icon icon="check"/>
                    </b-button>
                    <b-button variant="danger" class="remove-task-button" @click="removeTask(index)">
                        <font-awesome-icon icon="minus"/>
                    </b-button>

                </div>
                <div>
                    <b-button variant="success" class="add-task-button" @click="addTask">
                        <font-awesome-icon icon="plus"/>
                    </b-button>
                </div>
                <br/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import usersDb from "../../db/users.json";
    import customersDb from "../../db/customers.json";

    export default {
        name: "dayReport",
        props: ["info", "API_ENDPOINT"],
        data: () => {
            return {
                week: null,
                report: null,
                user: null,
                numberWeek: null,
                usersDb: usersDb,
                customersDb: customersDb,
                reportForm: {
                    trelloTasks: [],
                    isInputsEnable: true,
                    customer: "",
                    hours: ""
                },
                dayReport: [],
                customerId: [],
                taskArray: []
            };
        },
        watch: {
        },
        mounted() {
            this.dayReport.date = this.info;
        },
        methods: {
            emitToParent(index) {
                this.dayReport[index].isInputsEnable = false
                this.$emit("interface", this.dayReport);
            },

            async selectProject(event, index) {
                // let url = `${this.API_ENDPOINT}/trello/${event.target.value}`;
                let url = `/trello/${event.target.value}`;
                let result;
                let me = this;

                await axios
                    .get(url)
                    .then(response => {
                        result = response.data.response;
                        me.$log.info("result!!!!!!", result)
                        me.dayReport[index].trelloTasks = result;
                    })
                    .catch(error => {
                        me.$log.error(error)
                        me.dayReport[index].trelloTasks = [];
                    });

            },
            selectTask(event, index) {
                // this.dayReport[index].taskId = event.target.value.id;
                // this.dayReport[index].taskLink = event.target.value.url;
            },
            addTask() {
                this.dayReport.push(Object.assign({}, this.reportForm));
            },
            removeTask(taskIndex) {
                this.dayReport.splice(taskIndex, 1);
            },
            setProject(index) {
                let customerName = this.dayReport[index].customer || 0;
                let projects = {};
                // let customerId;
                let customerIdx = this.customersDb.findIndex(
                    el => el.name === `${customerName}`
                );

                if (customerIdx !== -1) {
                    let customer = this.customersDb[customerIdx];
                    // customerId = customer.id;
                    projects = customer.projects;
                }

                // if (customerId !== undefined) {
                //     this.setTask(index, customerId);
                // }

                return projects || 0;
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
