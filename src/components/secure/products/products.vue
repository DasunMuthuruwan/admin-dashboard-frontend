<template>
<div class="container shadow">
    <div v-if="alert" class="alert alert-success">
        {{alert}}
    </div>
    <div class="d-flex justify-content-end pt-3 pb-2">
        <router-link :to="`/products/create`" href="javascript:void(0)" class="btn btn-success">Add Product</router-link>
    </div>
    <div class="table-responsive">
        <table class="table table-striped table-sm table-hover table-bordered">
            <thead class="text-center">
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{product?.id}}</td>
                    <td><img :src="product.image" alt="" class="img-responsive img"></td>
                    <td>{{product?.title}}</td>
                    <td>{{product?.description}}</td>
                    <td>{{product?.price}}</td>
                    <td>
                        <div class="d-flex flex-row">
                            <router-link :to="`/products/${product.id}/edit`" class="btn btn-danger btn-sm edit mr-2">Edit</router-link>
                            <a class="btn btn-warning btn-sm delete" @click.prevent="del(product.id)">Delete</a>
                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
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
    Entity
} from '@/interfaces/entity';

export default {
    name: "products",
    setup() {
        const products = ref([]);
        const alert = ref('');

        const loadProducts = async () => {
            const response = await axios.get('products');
            products.value = response.data.data;

        };
        onMounted(loadProducts);

        const del = async (id: number) => {
            const response = await axios.delete(`products/${id}`);
            products.value = products.value.filter((e: Entity) => e.id !== id);
            alert.value = response.data.message;
        }

        return {
            products,
            del,
            alert
        }
    }
}
</script>

<style scoped>
.img {
    width: 40px;
    height: 40px;
}

.container {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.container tbody td {
    font-size: 13px;
}
.container .btn-success{
    font-size: 14px;
}
.container .btn-danger,.btn-warning{
    color: black;
    font-size: 12px;
}

.container .btn-danger:hover,.btn-warning:hover{
    color: rgb(248, 245, 245);
    font-size: 12px;
}
</style>
