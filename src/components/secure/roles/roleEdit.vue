<template>
<div class="container">
    <div class="row">
        <div class="col-lg-8 col-md-12 offset-lg-2">
            <div class="card shadow mb-4 mt-4">
                <div class="card-header">
                    <h5 class="text-center">Create Role</h5>
                </div>
                <div class="card-body">
                    <form action="" class="form-horizontal form-user" @submit.prevent="update">
                        <div class="form-group row">
                            <label for="first_name" class="control-label col-md-3 mt-2">Name<span class="required">*</span></label>
                            <div class="col-md-9">
                                <input type="text" id="name" class="form-control" placeholder="Role Name" v-model="name" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="permissions" class="control-label col-md-3 mt-2">Permissions<span class="required">*</span></label>
                            <div class="col-md-9">
                                <div class="form-check form-check-inline" v-for="permission in permissions" :key="permission.id">
                                    <!-- we can find checkbox selelcted or not using $event.target.checked -->
                                    <input type="checkbox" class="form-check-input" :value="permission.id" :checked="check(permission.id)" @change="select(permission.id,$event.target.checked)">
                                    <label class="form-check-label" for="exampleCheck1">{{permission.name}}</label>
                                </div>
                            </div>
                        </div>

                        <div class="btn-submit">
                            <button class="btn btn-primary btn-sm" type="submit">Add Role</button>
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
import {
    useRoute
} from 'vue-router';
import {
    Role
} from '@/classes/role';
import router from '@/router';
export default {
    name: "roleEdit",
    setup() {
        const name = ref('');
        const permissions = ref([]);
        const {
            params
        } = useRoute();
        const selected = ref([] as number[]);
        const alert = ref('');

        onMounted(async () => {
            const response = await axios.get('permissions');
            permissions.value = response.data.data;

            // get role using role id
            const roleCall = await axios.get(`roles/${params.id}`);

            const role: Role = roleCall.data.role;
            name.value = role.name;
            selected.value = role.permissions.map(p => p.id);
        });

        const select = (id: number, checked: boolean) => {
            if (checked) {
                selected.value = [...selected.value, id];
                return;
            }
            selected.value = selected.value.filter((s => s !== id));
            console.log(selected.value);
        }

        const check = (id: number) => selected.value.some((s: number): boolean => {
            console.log(id);
            console.log(s);
            return s === id;
        });

        const update = async () => {
            try {
                const response = await axios.put(`/roles/${params.id}`, {
                    name: name.value,
                    permissions: selected.value
                });

                alert.value = response.data.message;
                console.log(alert.value);
                await router.push('/roles');
            }
            catch(error){
                console.error(error);
            }

        }

        return {
            name,
            permissions,
            select,
            check,
            update
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
