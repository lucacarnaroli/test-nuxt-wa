<script setup>
import { ref, computed } from 'vue'
import { useRoute } from "vue-router";
import { useDisplay } from 'vuetify'

const route = useRoute()
const productId = route.params.id
const product = ref({})
const error = ref()


fetch('https://dummyjson.com/products/' + productId).then((res) => res.json())
    .then((json) => (product.value = json))
    .catch((err) => (error.value = err))

const { name } = useDisplay()

const col = computed(() => {
    switch (name.value) {
        case 'xs': return [12, 12]
        case 'sm': return [12, 12]
        case 'md': return [7, 5]
        case 'lg': return [7, 5]
        case 'xl': return [7, 5]
        case 'xxl': return [7,5]
    }
    return undefined
})
</script>


<template>
    <v-container>
        <v-row>
            <v-col :cols="col[0]">
                <v-card class="pa-2 mt-5">
                    <v-img :src="product.thumbnail" max-height="300px" max-width="500px"></v-img>
                    <v-card-title>{{ product.title }}</v-card-title>
                    <v-chip class="ma-2">{{ product.brand }}</v-chip>
                    <v-card-subtitle>{{ product.description }}</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col :cols="col[1]">
                <v-table>
                    <tbody>
                        <tr class="table-info-product">
                            <td><b>Name product:</b></td>
                            <td>{{ product.title }}</td>
                        </tr>
                        <tr class="table-info-product">
                            <td><b>Brand:</b></td>
                            <td>{{ product.brand }}</td>
                        </tr>
                        <tr class="table-info-product">
                            <td><b>On sale:</b></td>
                            <td>{{ product.discountPercentage }}%</td>
                        </tr>
                        <tr class="table-info-product">
                            <td><b>Price:</b></td>
                            <td>{{ product.price }}€</td>
                        </tr>
                        <tr class="table-info-product">
                            <td><b>In stock:</b></td>
                            <td>{{ product.stock }}</td>
                        </tr>
                        <tr class="table-info-product">
                            <td><b>Category:</b></td>
                            <td>{{ product.category }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>