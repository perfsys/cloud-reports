<template>
  <div class="container-form">
    <form class="form" @submit.prevent>
      <!-- user name -->
      <div class="form__field">
        <label class="form__label" for>User name</label>
        <br />
        <input
          class="form__input"
          type="text"
          placeholder
          v-model.trim="name"
          @blur="$v.name.$touch()"
          :class="{isInvalid: ($v.name.$dirty && !$v.name.required)}"
        />
        <!-- {{$v.name}} -->
      </div>

      <div class="invalidFeedback" v-if="$v.name.$dirty && !$v.name.required">
        <div class="invalidFeedback__info">The field is required</div>
      </div>
      <!-- end user name -->

      <!-- date -->
      <div class="form__field">
        <label class="form__label" for>Date and time</label>
        <br />
        <!-- <a-date-picker class="form__input" placeholder />-->
        <masked-input
          class="form__input"
          v-model="date"
          mask="1111-11-11 11:11:11"
          placeholder="YYYY-MM-DD 00:00"
          @blur="$v.date.$touch()"
          :class="{isInvalid: ($v.date.$dirty && !$v.date.required)}"
        />
        <!-- {{$v.date}} -->
      </div>

      <div class="invalidFeedback" v-if="$v.date.$dirty && !$v.date.required">
        <div class="invalidFeedback__info">The field is required</div>
      </div>
      <!-- end date -->

      <!-- time -->
      <!-- <div class="form__field">
        <label class="form__label" for>Time</label>
      <br />-->
      <!-- <a-time-picker class="form__input" :defaultValue="moment('00:00', 'HH:mm')" format="HH:mm"/> -->
      <!-- <masked-input class="form__input" v-model="time" mask="11:11" placeholder />
      </div>-->

      <!-- <div class="invalidFeedback">
        <div class="invalidFeedback__info"></div>
      </div>-->
      <!-- end time -->

      <!-- network connections count -->
      <div class="form__field">
        <label class="form__label" for>My network connections count</label>
        <br />
        <input
          class="form__input"
          type="text"
          placeholder
          v-model.trim="connections"
          @blur="$v.connections.$touch()"
          :class="{isInvalid: ($v.connections.$dirty && !$v.connections.required)  ||  !$v.connections.integer}"
        />
        <!-- {{$v.connections}} -->
      </div>

      <div class="invalidFeedback">
        <div
          class="invalidFeedback__info"
          v-if="$v.connections.$dirty && !$v.connections.required"
        >The field is required</div>
        <div class="invalidFeedback__info" v-if="!$v.connections.integer">Shoule be integer</div>
      </div>
      <!-- end network connections count -->

      <!-- network groups followed -->
      <div class="form__field">
        <label class="form__label" for>My network groups followed</label>
        <br />

        <input
          class="form__input"
          type="text"
          placeholder
          v-model.trim="groups"
          @blur="$v.groups.$touch()"
          :class="{isInvalid: ($v.groups.$dirty && !$v.groups.required)  ||  (!$v.groups.integer)}"
        />
        <!-- {{$v.groups}} -->
      </div>

      <div class="invalidFeedback">
        <div
          class="invalidFeedback__info"
          v-if="$v.groups.$dirty && !$v.groups.required"
        >The field is required</div>
        <div class="invalidFeedback__info" v-if="!$v.groups.integer">Shoule be integer</div>
      </div>
      <!-- end network groups followed -->

      <!-- network pages followed -->
      <div class="form__field">
        <label class="form__label" for>My network pages followed</label>
        <br />

        <input
          class="form__input"
          type="text"
          placeholder
          v-model.trim="pages"
          @blur="$v.pages.$touch()"
          :class="{isInvalid: ($v.pages.$dirty && !$v.pages.required) || !$v.pages.integer}"
        />
        <!-- {{$v.pages}} -->
      </div>

      <div class="invalidFeedback">
        <div
          class="invalidFeedback__info"
          v-if="$v.pages.$dirty && !$v.pages.required"
        >The field is required</div>
        <div class="invalidFeedback__info" v-if="!$v.pages.integer">Shoule be integer</div>
      </div>
      <!-- end network pages followed -->

      <button class="form__button" @click="onSubmit()">Send</button>
    </form>
  </div>
</template>

<script>
import { required, integer } from "vuelidate/lib/validators";
import MaskedInput from "vue-masked-input";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      date: "",
      connections: "",
      groups: "",
      pages: ""
    };
  },
  validations: {
    name: { required },
    date: { required },
    connections: { required, integer },
    groups: { required, integer },
    pages: { required, integer }
  },
  methods: {
    onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
        // Swal.fire({
        //   type: "error",
        //   title: "Form was not send",
        //   text: "Please full fill all fields"
        // });
      } else {
        // let url =
        //   "https://1bskfqc8fk.execute-api.eu-central-1.amazonaws.com/dev/reports";
        // let newReport = {
        //   name: this.name,
        //   date: this.date,
        //   connections: this.connections,
        //   groups: this.groups,
        //   pages: this.pages
        // };
        // console.log("send newUser", newReport);
        // axios
        //   .post(url, newReport)
        //   .then(response => {
        //     Swal.fire({
        //       position: "top-end",
        //       type: "success",
        //       title: "Your form has been send",
        //       showConfirmButton: false,
        //       timer: 1500,
        //       confirmButtonColor: "#23bfca"
        //     });
        //     console.log("OK", response);
        //   })
        //   .catch(error => {
        //     console.log("NOT OK", error);
        //   });
      }
    }

    // checkForm() {
    //   return (
    //     this.name == "" ||
    //     this.date == "" ||
    //     this.time == "" ||
    //     this.connections == "" ||
    //     this.groups == "" ||
    //     this.pages == ""
    //   );
    // }
  },
  components: { MaskedInput }
};
</script>

<style lang='scss' scoped>
* {
  box-sizing: border-box;
}

.container-form {
  display: flex;
  transform: translateY(25%);
  // align-items: center;
  justify-content: center;
  height: 100%;
}

.form {
  border: 1px solid #23bfca;
  box-shadow: 3px 3px 3px 3px rgba(35, 191, 202, 0.8);
  padding: 30px;
  border-radius: 15px;
  background-color: white;
  text-align: left;

  &__field {
    margin-bottom: 24px;
  }

  &__input {
    height: 45px;
    width: 350px;
    border-radius: 15px;
    padding: 5px 20px;
    border: 1px solid #23bfca;
    box-shadow: 2px 3px 3px rgba(35, 191, 202, 0.8);
    color: #23bfca;

    &::placeholder {
      color: #23bfca;
    }

    &:focus {
      outline: none;
      border: 1px solid #23bfca;
    }

    &:hover {
      border: 2px solid #23bfca;
      box-shadow: 3px 4px 4px rgba(35, 191, 202, 0.8);
    }
  }

  &__button {
    height: 45px;
    width: 350px;
    border-radius: 15px;
    border: 1px solid #23bfca;
    background-color: #23bfca;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-top: 30px;

    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover {
      box-shadow: 3px 4px 4px rgba(35, 191, 202, 0.8);
      border: 1px solid #23bfca;
    }
  }

  &__label {
    color: #ccc;
    padding-left: 15px;
    font-size: 12px;
  }
}

.isInvalid {
  border: 1px solid #d24a43;
  box-shadow: 3px 4px 4px rgba(190, 111, 100, 0.8);
}

.invalidFeedback {
  font-size: 10px;
  color: #d24a43;
  margin-top: -20px;
  height: 24px;

  &__info {
    text-align: left;
    padding-left: 10px;
  }
}

// .ant-time-picker-input {
//   color: transparent !important;
//   border: none !important;
// }

// .ant-input {
//   border: none !important;
//   color: transparent !important;
// }
</style>

