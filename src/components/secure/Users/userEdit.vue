<template>
<div class="container">
    <div class="row">
        <div class="col-lg-8 col-md-12 offset-lg-2">
            <div class="card shadow mb-4 mt-4">
                <div class="card-header">
                    <h5 class="text-center">Edit User</h5>
                </div>
                <div class="card-body">
                    <form class="form-horizontal form-user" @submit.prevent="editUser">
                        <div class="form-group row">
                            <label for="first_name" class="control-label col-md-3 mt-2">First Name<span class="required">*</span></label>
                            <div class="col-md-9">
                                <input type="text" id="first_name" class="form-control" placeholder="First Name" v-model="first_name" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="last_name" class="control-label col-md-3 mt-2">Last Name<span class="required">*</span></label>
                            <div class="col-md-9">
                                <input type="text" id="last_name" class="form-control" placeholder="Last Name" v-model="last_name" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="control-label col-md-3 mt-2">Email<span class="required">*</span></label>
                            <div class="col-md-9">
                                <input type="email" id="email" class="form-control" placeholder="Email" v-model="email" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="role" class="control-label col-md-3 col-sm-3 mt-2">Role<span class="required">*</span></label>
                            <div class="col-md-9">
                                <select id="role" class="form-control" v-model="role_id" required>
                                    <option value="0">Select Role</option>
                                    <option :value="role.id" v-for="role in roles" :key="role.id">{{role.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="btn-submit">
                            <button class="btn btn-primary btn-sm" type="submit">Edit User</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    ref
} from '@vue/reactivity'
import {
    onMounted
} from '@vue/runtime-core';
import axios from 'axios';
import router from '@/router';
import { useRoute } from 'vue-router';
import { User } from '@/classes/user';
export default {
    name: "userEdit",
    setup() {
        const first_name = ref('');
        const last_name = ref('');
        const email = ref('');
        const role_id = ref(0);
        const roles = ref([]);
        // use params
        const {params} = useRoute();

        onMounted(async () => {

            // get the roles details  backend request
            const response = await axios.get('roles');
            roles.value = response.data.role;
            // console.log(roles.value);

            // get the single user details using params
            const userCall = await axios.get(`/users/${params.id}`);
            console.log(userCall.data.data);

            // assign user details response into the User Class
            const user: User = userCall.data.data;
            // console.log(user.role);

            
            first_name.value = user.first_name;
            // console.log(user.first_name);
            // console.log(user.id)
            last_name.value = user.last_name;
            email.value = user.email;
            role_id.value = user.role.id;

        });

        // Update the user data using axios backend request api
        const editUser = async () => {
            try {
                const res = await axios.put(`users/${params.id}`, {
                    first_name: first_name.value,
                    last_name: last_name.value,
                    email: email.value,
                    role_id: role_id.value
                });
                // console.log(res.data);
                // after success user create push the /users route using router
                await router.push('/users');
            } catch (error) {
                console.error(error);
            }
        }

        return {
            first_name,
            last_name,
            email,
            roles,
            role_id,
            editUser

        }
    }
}
</script>

<style scoped>
.container {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.card {
    border-radius: unset;
}

.card .card-header {
    padding: 8px;
}

.form-user {
    padding: 10px;
    width: 100%;
    max-width: 600px;
}

.form-user .control-label {
    font-weight: 580;
    font-size: 12px;
}

.form-user input {
    border: none;
    outline: none;
    border-bottom: 1px solid #ddd;
    font-size: 1em;
    padding-left: 0px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
}

.form-user .btn-primary {
    outline: none;
    /* border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0; */
    color: whitesmoke;
}

.form-user .btn-primary:hover {
    background-color: black;
}

.form-user #role {
    border: none;
    outline: none;
    border-bottom: 1px solid #ddd;
    padding-left: 0px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
}

.form-user .form-control {
    font-size: 12px;

}

.form-user .form-control:focus {
    background-color: floralwhite;
    color: darkorchid;
}

.form-user .required {
    color: red;
    font-weight: bold;
}
</style>
