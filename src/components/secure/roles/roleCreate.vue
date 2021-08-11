<template>
<div class="container">
    <div class="row">
        <div class="col-lg-8 col-md-12 offset-lg-2">
            <div class="card shadow mb-4 mt-4">
                <div class="card-header">
                    <h5 class="text-center">Create Role</h5>
                </div>
                <div class="card-body">
                    <form action="" class="form-horizontal form-user" @submit.prevent="submit">
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
                                    <input type="checkbox" class="form-check-input" :value="permission.id" @change="select(permission.id,$event.target.checked)">
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
    useRouter
} from 'vue-router';
export default {
    name: "roleCreate",
    setup() {
        const permissions = ref([]);
        const name = ref('');
        const selected = ref([] as number[]);
        const router = useRouter();

        onMounted(async () => {
            const response = await axios.get('permissions');
            // console.log(response.data.data)
            permissions.value = response.data.data
        });

        const select = (id: number, checked: boolean) => {
            // console.log(checked)
            if (checked) {
                // push the selected permission id in the array
                selected.value = [...selected.value, id];
                return;
            }
            selected.value = selected.value.filter(s => s !== id);
        }

        const submit = async () => {
            try {
                await axios.post('/roles', {
                    name: name.value,
                    per: selected.value
                });

                await router.push('/roles');
            }
            catch(error){
                console.error(error);
            }

        }

        return {
            permissions,
            name,
            select,
            submit
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
