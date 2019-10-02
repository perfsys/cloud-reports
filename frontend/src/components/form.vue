<template>
    <div class="container-form">
        <form class="form" @submit.prevent>
            <div class="form-group row">
                <label for="example-text-input" class="col-2 col-form-label">User name</label>
                <div class="col-10">
                    <input class="form-control" type="text" placeholder v-model.trim="name" :class="{isInvalid: ($v.name.$dirty && !$v.name.required)}" />
                </div>
            </div>
            <div class="invalidFeedback" v-if="$v.name.$dirty && !$v.name.required">
                <div class="invalidFeedback__info">The field is required</div>
            </div>
    
            <div class="form-group row">
                <label for="example-search-input" class="col-2 col-form-label">Date and time</label>
                <div class="col-10">
                    <datetime class="form-control" format="DD-MM-YYYY h:i" v-model="dateTime" :class="{isInvalid: ($v.dateTime.$dirty && !$v.dateTime.required)}"></datetime>
                </div>
            </div>
            <div class="invalidFeedback" v-if="$v.name.$dirty && !$v.name.required">
                <div class="invalidFeedback__info">The field is required</div>
            </div>
    
            <div class="form-group row">
                <label for="example-email-input" class="col-2 col-form-label">Connections</label>
                <div class="col-10">
                    <input class="form-control" type="text" placeholder v-model.trim="connections" :class="{isInvalid: ($v.connections.$dirty && !$v.connections.required)  ||  !$v.connections.integer}" />
                </div>
            </div>
            <div class="invalidFeedback">
                <div class="invalidFeedback__info" v-if="$v.connections.$dirty && !$v.connections.required">The field is required</div>
                <div class="invalidFeedback__info" v-if="!$v.connections.integer">Shoule be integer</div>
            </div>
    
            <div class="form-group row">
                <label for="example-url-input" class="col-2 col-form-label">Network groups</label>
                <div class="col-10">
                    <input class="form-control" type="text" placeholder v-model.trim="groups" :class="{isInvalid: ($v.groups.$dirty && !$v.groups.required)  ||  (!$v.groups.integer)}" />
                </div>
            </div>
            <div class="invalidFeedback">
                <div class="invalidFeedback__info" v-if="$v.groups.$dirty && !$v.groups.required">The field is required</div>
                <div class="invalidFeedback__info" v-if="!$v.groups.integer">Shoule be integer</div>
            </div>
    
            <div class="form-group row">
                <label for="example-tel-input" class="col-2 col-form-label">Network pages</label>
                <div class="col-10">
                    <input class="form-control" type="text" placeholder v-model.trim="pages" @blur="$v.pages.$touch()" :class="{isInvalid: ($v.pages.$dirty && !$v.pages.required) || !$v.pages.integer}" />
                </div>
            </div>
            <div class="invalidFeedback">
                <div class="invalidFeedback__info" v-if="$v.pages.$dirty && !$v.pages.required">The field is required</div>
                <div class="invalidFeedback__info" v-if="!$v.pages.integer">Shoule be integer</div>
            </div>
    
            <div class="right">
                <button class="btn btn-primary" @click="onSubmit()">Send</button>
            </div>
        </form>
    </div>
</template>

<script>
import { required, integer } from "vuelidate/lib/validators";
import MaskedInput from "vue-masked-input";
import Swal from "sweetalert2";
import axios from "axios";
import datetime from "vuejs-datetimepicker";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
    data() {
        return {
            name: "",
            connections: "",
            groups: "",
            pages: "",
            dateTime: ""
        };
    },
    validations: {
        name: { required },
        dateTime: { required },
        connections: { required, integer },
        groups: { required, integer },
        pages: { required, integer }
    },
    methods: {
        onSubmit() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                console.log('not send')
            } else {
                console.log('send')
                let url =
                    "https://1bskfqc8fk.execute-api.eu-central-1.amazonaws.com/dev/reports";
                let newReport = {
                    name: this.name,
                    date: this.dateTime,
                    connections: this.connections,
                    groups: this.groups,
                    pages: this.pages
                };
                console.log("send newReport", newReport);
                axios
                    .post(url, newReport)
                    .then(response => {
                        Swal.fire({
                            position: "top-end",
                            type: "success",
                            title: "Your form has been send",
                            showConfirmButton: false,
                            timer: 1500,
                            confirmButtonColor: "#23bfca"
                        });
                        console.log("OK", response);
                    })
                    .catch(error => {
                        console.log("NOT OK", error);
                    });
            }
        }
    },
    components: { MaskedInput, datetime }
};
</script>

<style lang='scss'>
// * {
//   box-sizing: border-box;
// }
.container-form {
    display: flex;
    transform: translateY(25%);
    align-items: center;
    justify-content: center;
    height: 100%;
}

.form {
    width: 50%;
    border: 1px solid rgba(230, 233, 233, 0.8); // box-shadow: 3px 3px 3px 3px rgba(230, 233, 233, 0.8);
    padding: 30px;
    border-radius: 15px;
    background-color: white;
    text-align: left;
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
        padding-top: 5px;
        text-align: left;
        padding-left: 155px;
    }
}

#tj-datetime-input {
    border: none !important;
}

.year-month-wrapper {
    background-color: grey !important;
}

.nav-l {
    background-color: grey !important;
}

.nav-r {
    background-color: grey !important;
}

.days {
    color: grey !important;
}

.okButton {
    color: grey !important;
}

.activePort {
    background-color: grey !important;
}

.active {
    background-color: grey !important;
}

.right {
    width: 100%;
    text-align: right;
}
</style>

