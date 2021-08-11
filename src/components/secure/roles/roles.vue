<template>
<div v-if="alert" class="alert alert-success">
    {{alert}}
</div>
<div class="d-flex justify-content-end pt-3 pb-2 mb-3">
    <router-link :to="`/roles/create`" href="javascript:void(0)" class="btn btn-success">Add Role</router-link>
</div>
<div v-if="roles.length">
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles" :key="role.id">
                    <td>{{role.id}}</td>
                    <td>{{role.name}}</td>
                    <td>
                        <router-link :to="`/roles/${role.id}/edit`" class="btn btn-danger btn-sm mr-2">Edit</router-link>
                        <a @click.prevent="deleteRoles(role.id)" class="btn btn-danger btn-sm">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="alert alert-danger text-center" v-else>
    Roles Data Not Found
</div>
</template>

<script lang="ts">
import {
    ref
} from '@vue/reactivity';
import axios from 'axios';
import {
    onMounted
} from '@vue/runtime-core';
import {
    Entity
} from '@/interfaces/entity';
export default {
    name: "roles",
    setup() {

        const roles = ref([]);
        const alert = ref('');

        const loadRoles = async () => {
            const response = await axios.get('roles');
            roles.value = response.data.role;
            console.log(roles.value);
        }

        onMounted(loadRoles);

        const deleteRoles = async (id: number) => {
            if (confirm("Are you sure delete role")) {
                const role = await axios.delete(`/roles/${id}`);
                alert.value = role.data.message;
                console.log(alert.value)
                // console.log(role)
                roles.value = roles.value.filter((e: Entity) => e.id !== id);

            }
        }
        return {
            roles,
            deleteRoles,
            alert
        }
    }
}
</script>
