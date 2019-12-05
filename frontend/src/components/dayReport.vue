<template>
  <div>
    <div>
      <b-badge variant="primary">{{ info.day }}</b-badge>
      <div class="container-report-form">
        <div class="container-report" v-for="(item, index) in newReport">
          <div class="position-input">
            <select
              class="form-control"
              v-model="newReport[index].customer"
              @change="emitToParent"
            >
              <option disabled value>Select customer</option>
              <option v-for="customer in customersDb" :value="customer.name">{{
                customer.name
              }}</option>
            </select>
          </div>
          <div class="position-input">
            <select
              class="form-control"
              v-model="newReport[index].project"
              @change="emitToParent"
            >
              <option disabled value>Select project</option>
              <option
                v-for="project in setProject(index)"
                :value="project.name"
                >{{ project.name }}</option
              >
            </select>
          </div>

          <div class="position-input">
            <select
              class="form-control"
              v-model="taskArray[index]"
              @change="emitToParent"
            >
              <option disabled value>Select task</option>
              <option v-for="task in trelloTasks[index]" :value="task">{{
                task.name
              }}</option>
            </select>
          </div>

          <div class="position-input" @input="emitToParent">
            <b-form-input
              v-model="newReport[index].hours"
              placeholder="Hours"
            ></b-form-input>
          </div>
        </div>
        <div>
          <b-button variant="primary" class="position-button" @click="addTask"
            >Add Task
          </b-button>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import usersDb from "../db/users.json";
import projectsDb from "../db/projects.json";
import customersDb from "../db/customers.json";

const API_ENDPOINT = `${document.location.protocol}//${document.location.hostname}/dev`;

export default {
  name: "dayReport",
  props: ["info"],
  data: () => {
    return {
      week: null,
      report: null,
      user: null,
      numberWeek: null,
      usersDb: usersDb,
      customersDb: customersDb,
      reportForm: {
        customer: "",
        project: "",
        taskId: "",
        taskLink: "",
        hours: ""
      },
      newReport: [
        {
          date: "",
          customer: "",
          project: "",
          taskId: "",
          taskLink: "",
          hours: ""
        }
      ],
      trelloTasks: [],
      customerId: [],
      taskArray: []
    };
  },
  methods: {
    getTask(index, name, event) {
      this.newReport[index][name] = event.target.value;
    },
    emitToParent(event) {
      this.$emit("interface", this.newReport);
    },
    setData(event, index, name) {
      if (name == "customer") {
        this.newReport[index].customer = event.target.value;
      }
    },

    async setTask(index, idx) {
      let url = `${API_ENDPOINT}/trello/${this.customersDb[index].boardId}`;
      let result;

      await axios
        .get(url)
        .then(response => {
          result = response.data.response;
          console.log("result!!!!!!", result);
          this.trelloTasks[index] = result;
        })
        .catch(error => {
          console.log("error", error);
        });

      this.trelloTasks[index] = result;
    },
    addTask() {
      this.newReport.push(Object.assign({}, this.reportForm));
    },
    setProject(index) {
      let customerName = this.newReport[index].customer || 0;
      let projects = {};
      let customerId;
      let customerIdx = customersDb.findIndex(
        el => el.name == `${customerName}`
      );

      if (customerIdx != -1) {
        customerId = customersDb[customerIdx].id;
        projects = this.customersDb[customerId].projects;
      }

      if (customerId != undefined) {
        this.setTask(index, customerId);
      }

      return projects || 0;
    },
    setTest(event) {}
  },
  watch: {
    taskArray(newVal, oldVal) {
      for (let i = 0; i < this.newReport.length; i++) {
        this.newReport[i].taskId = this.taskArray[i].id;
        this.newReport[i].taskLink = this.taskArray[i].url;
      }
    }
  },
  mounted() {
    this.newReport.date = this.info;
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
</style>
