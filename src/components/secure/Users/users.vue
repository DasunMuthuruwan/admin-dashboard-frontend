<template>
<div class="d-flex justify-content-end pt-3 pb-2 mb-3">
    <router-link :to="`/users/create`" href="javascript:void(0)" class="btn btn-success">Add User</router-link>
</div>
<span class="" v-if="success">{{success}}</span>
<div class="table-responsive">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{user?.id}}</td>
                <td>{{user?.first_name}}</td>
                <td>{{user?.last_name}}</td>
                <td>{{user?.email}}</td>
                <td>{{user.role?.name}}</td>
                <td>
                    <router-link :to="`/users/${user.id}/edit`" class="btn btn-danger btn-sm mr-2">Edit</router-link>
                    <a href="" class="btn btn-warning btn-sm" @click.prevent="del(user.id)">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<nav aria-label="...">
    <ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="javascript:void(0)" @click="prev">Previous</a>
        </li>
        <li class="page-item active">
            <a class="page-link" href="#">{{page}} <span class="sr-only" disabled>(current)</span></a>
        </li>
        <li class="page-item">
            <a class="page-link" href="javascript:void(0)" @click="next">Next</a>
        </li>
    </ul>
</nav>
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
    Entity
} from "@/interfaces/entity";

export default {
    name: "users",
    props: {
        success: String
    },

    setup() {

        const users = ref([]);
        const page = ref(1);
        const lastPage = ref(0);

        // load current pagination users data
        const load = async () => {
            // create pagination 
            const response = await axios.get(`users?page=${page.value}`);

            // console.log(response.data.data.data)
            // get response data
            users.value = response.data.data;
            console.log(users.value);
            // find last page value in pagination
            lastPage.value = response.data.data.last_page;
            // console.log(lastPage.value);
        }
        // delete user detials
        const del = async (id: number) => {
            if (confirm("Are you sure delete users details ?")) {
                await axios.delete(`users/${id}`);
                users.value = users.value.filter((e: Entity) => e.id !== id);
            }
        }

        // load the page 1 users data(first time loading page)
        onMounted(load);

        // next function url in pagination
        const next = async () => {
            // console.log(lastPage.value)
            if (page.value === lastPage.value) return;

            page.value++;

            await load();

        }

        // prev function url in pagination 
        const prev = async () => {
            if (page.value === 1) return;

            page.value--;

            await load();

        }

        return {
            users,
            prev,
            next,
            page,
            del
        };
    }
}
</script>
