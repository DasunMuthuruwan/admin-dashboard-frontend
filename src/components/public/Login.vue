<template>
<div class="container">
    <div class="col-md-6 offset-md-3">
        <div class="card shadow mt-4">
            <div class="card-header text-center">
                <h3>Please Login</h3>
            </div>
            <div class="card-body">
                <form class="form-login">
                    <div class="form-label-group">
                        <label for="inputEmail">Email address</label>
                        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="state.email">
                        <!-- <i class="fa fa-user fa-lg"></i> -->
                        <!-- <span v-if="state.allerrors.email" class="validation">{{ state.allerrors.email[0] }}</span> -->
                    </div>

                    <div class="form-label-group">
                        <label for="inputPassword">Password</label>
                        <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="state.password">
                        <!-- <i class="fa fa-lock fa-lg"></i> -->
                        <!-- <span v-if="state.allerrors.password" class="validation">{{ state.allerrors.password[0] }}</span> -->
                    </div>

                    <span v-if="state.invalid.message" class="validation">{{ state.invalid.message }}</span>
                    <button class="btn btn btn-primary btn-block mt-3" @click.prevent="submit">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    reactive
} from '@vue/reactivity'
import axios from 'axios';
import {
    useRouter
} from 'vue-router';
// import {
//     computed
// } from '@vue/runtime-core';
// import {
//     required
// } from '@vuelidate/validators'
// import useVuelidate from '@vuelidate/core';
export default {
    name: "Login",
    // data() {
    //     return {
    //         email: '',
    //         password: '',
    //         error_password: '',
    //         error_email: ''
    //     }
    // },

    // methods: {
    //     async submit() {
    //         try {
    //             // const router = useRouter();
    //             const response = await axios.post('login', {
    //                 email: this.email,
    //                 password: this.password
    //             });

    //             localStorage.setItem('token', response.data.token);
    //             axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

    //             await this.$router.push('/');
    //         } catch (error) {
    //             this.error_password = error.response.data.errors.password;
    //             this.error_email = error.response.data.errors.email
    //         }
    //     }
    // }
    setup() {

        const state = reactive({
            email: '',
            password: '',
            // allerrors: [],
            invalid: []
        });

        // const rules = computed(() => {
        //     return {
        //         email: {
        //             required
        //         },
        //         password: {
        //             required
        //         }
        //     }
        // });

        // console.log(rules.value.email.required.$message)

        // const v$ = useVuelidate(rules, state);

        const router = useRouter();

        const submit = async () => {

            try {
                // let's call for the backend using axios
                const response = await axios.post('login', {
                    email: state.email,
                    password: state.password
                });
                // console.log(response.data);
                // set the token in localstorage
                localStorage.setItem('token', response.data.token);

                // use token immediattly
                axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
                // console.log(axios.defaults.headers['Authorization']);

                // after login push / router
                await router.push('/');
                // console.log(response);

            } catch (error) {
                state.invalid = error.response.data;
                // state.allerrors = error.response.data.errors;
            }

        }

        return {
            state,
            submit,
            // v$
        }
    }
}
</script>

<style scoped>
html,
body {
    height: 100%;
}

body {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.card-header {
    background-color: aquamarine;
    color: darkcyan;
}

.card-body {
    background-color: darkcyan;
}

.form-login {
    width: 100%;
    max-width: 450px;
    padding: 19px;
    margin: 0 auto;
}

.form-login label {
    font-size: 16px;
    color: whitesmoke;
    font-weight: 400;
}

.form-login .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 8px;
    font-size: 14px;
}

.form-login .form-control:focus {
    z-index: 2;
}

.form-login .validation {
    color: chartreuse;
    font-weight: 700;
}

.form-login input[type="email"] {
    margin-bottom: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.form-login input[type="password"] {
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-login .btn-primary {
    color: whitesmoke;
    background-color: darkslategray;
}

.form-login .fa-user {
    position: absolute;
    bottom: 190px;
    right: 70px;
}

.form-login .fa-lock {
    position: absolute;
    bottom: 108px;
    right: 70px;
}

.form-login .btn-primary:focus {
    background-color: black;
}
</style>
