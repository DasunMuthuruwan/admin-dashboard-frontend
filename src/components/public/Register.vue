<template>
<div class="container">
    <div class="col-md-6 offset-md-3">
        <div class="card shadow mt-4">
            <div class="card-header text-center">
                <h3>Please Register</h3>
            </div>
            <div class="card-body">
                <form class="form-login" @submit.prevent="submit">
                    <div class="form-label-group">
                        <label for="first_name">First Name</label>
                        <input type="text" id="first_name" class="form-control" placeholder="First Name" v-model="first_name" required>

                    </div>
                    <div class="form-label-group">
                        <label for="last_name">Last Name</label>
                        <input type="text" id="last_name" class="form-control" placeholder="Last Name" v-model="last_name" required>

                    </div>
                    <div class="form-label-group">
                        <label for="inputEmail">Email address</label>
                        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" required>

                    </div>
                    <div class="form-label-group">
                        <label for="inputPassword">Password</label>
                        <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>

                    </div>
                    <div class="form-label-group">
                        <label for="password_confirm">Password Confirm</label>
                        <input type="password" id="password_confirmation" class="form-control" placeholder="Password Confirm" v-model="password_confirmation" required>
                    </div>
                    <button class="btn btn btn-primary btn-block mt-3" type="submit">Sign Up</button>

                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref
} from '@vue/reactivity'
import axios from 'axios'
import {
    useRouter
} from 'vue-router'

export default {
    name: "Register",
    
    setup() {
        const first_name = ref('');
        const last_name = ref('');
        const email = ref('');
        const password = ref('');
        const password_confirmation = ref('');
        const router = useRouter();

        const submit = async () => {
            const data = {
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                password: password.value,
                password_confirmation: password_confirmation.value,
            }
            await axios.post('register', data);
            // console.log(response);
            await router.push('/login');
        }

        return {
            first_name,
            last_name,
            email,
            password,
            password_confirmation,
            submit
        }
    }
}
</script>

<style scoped>
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

/* .form-login input {
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
  padding: 5px 0;
  margin: 10px 0 5px 0;
  width: 100%;
} */

/* 
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
} */

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
