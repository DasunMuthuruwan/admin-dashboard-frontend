<template>
<div class="container">
    <div class="row">
        <div class="col-lg-8 col-md-12 offset-lg-2">
            <div class="card shadow mb-4 mt-4">
                <div class="card-header">
                    <h5 class="text-center">Create User</h5>
                </div>
                <div class="card-body">
                    <form action="" class="form-horizontal form-user" @submit.prevent="submitUser">
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
                                    <option :value="role.id" v-for="role in roles" :key="role.id">{{role?.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="btn-submit">
                            <button class="btn btn-primary btn-sm" :success="success" type="submit">Submit User</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ref
} from '@vue/reactivity'
import {
  onBeforeMount,
    onMounted
} from '@vue/runtime-core';
import axios from 'axios';
// import router from '@/router';
import { useRouter } from 'vue-router';
export default {
    name: "userCreate",
    setup() {
        const first_name = ref('');
        const last_name = ref('');
        const email = ref('');
        const role_id = ref(0);
        const roles = ref([]);
        const success = ref('');
        const router =useRouter();

        onMounted(async () => {
            const response = await axios.get('roles');
            roles.value = response.data.role;
            // console.log(roles.value);
        });
        
        const submitUser = async () => {
            try {
                const res = await axios.post('users', {
                    first_name: first_name.value,
                    last_name: last_name.value,
                    email: email.value,
                    role_id: role_id.value
                });
                // console.log(res.data);
                success.value = res.data.message;
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
            submitUser,
            success

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
