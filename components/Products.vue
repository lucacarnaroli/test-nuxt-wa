<script setup>
import { ref, computed } from 'vue'
import { filterValues, onlyUnique, loadFilter } from '../utils/filter'
import { useDisplay } from 'vuetify'

const products = ref({})
const error = ref()
const wishList = ref([])

fetch('https://dummyjson.com/products').then((res) => res.json())
    .then((json) => (products.value = json))
    .catch((err) => (error.value = err))

// assegno a una variabile una computed la quale mi renderà tutti i dati 'reattivi per il filtraggio
const productsFiltrati = loadFilter(products)

const optCategory = computed(() => {
    return Object.values(productsFiltrati.value).map(el => el.category).filter(onlyUnique)
})

const addItem = (index)=>{
    const product = productsFiltrati.value[index]
    if(!wishList.value.includes(product)){
        wishList.value.push(product)
    }    
}

const deleteItem = (id)=>{
    wishList.value = wishList.value.filter(p => p.id != id)
}

const { name } = useDisplay()

const col = computed(() => {
    switch (name.value) {
        case 'xs': return [12, 12]
        case 'sm': return [12, 12]
        case 'md': return [8, 4]
        case 'lg': return [8, 4]
        case 'xl': return [8, 4]
        case 'xxl': return [8, 4]
    }
    return undefined
})

</script>

<template>
    <v-container>
        <v-row class="box-filter">
            <v-col>
                <div class="ma-4 d-flex flex-column">
                    <label for="name">
                        <h5>Name</h5>
                    </label>
                    <div>
                        <input v-model="filterValues.title" placeholder="..." class="input" />
                    </div>
                </div>
            </v-col>
            <v-col>
                <div class="ma-4 d-flex flex-column">
                    <label for="name">
                        <h5>Description</h5>
                    </label>
                    <div>
                        <input v-model="filterValues.description" placeholder="..." class="input" />
                    </div>
                </div>
            </v-col>
            <v-col>
                <div class="ma-4 d-flex flex-column">
                    <label for="name">
                        <h5>Category</h5>
                    </label>
                    <div>
                        <select v-model="filterValues.category" name="" id="" class="input">
                            <option value="">--</option>
                            <option v-for="(category, i) in productsFiltrati" :key="category" :value="optCategory[i]">
                                {{ optCategory[i] }}
                            </option>
                        </select>
                    </div>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col :cols="col[0]">
                <v-table>
                    <thead>
                        <th class="">Name</th>
                        <th class="">Description</th>
                        <th class="">Price</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in productsFiltrati" :key="product">
                            <td>
                                <div class="pa-2 d-flex">
                                    <img :src="product.thumbnail" width="40" height="40">
                                    <div class="box-title">
                                        <nuxt-link :to="'products/'+product.id">
                                            <h5 class="ml-2 link-product">{{ product.title }}</h5>
                                        </nuxt-link>
                                    </div>
                                </div>
                            </td>
                            <td class="pa-1">
                                <p class="description">{{ product.description }}</p>
                            </td>
                            <td><span>{{ product.price }} €</span></td>
                            <td>
                                <v-btn @click="addItem(index)" class="btn-secondary mr-2">
                                    <v-icon icon="mdi-star-box-outline" size="25" title="Add to wish list"></v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
                <div>

                </div>
            <v-col :cols="col[1]">
                <v-table>
                    <thead>
                        <th class="text-left">Wish List</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="product in wishList" :key="product">
                            <td>
                                <div class="pa-3 d-flex">
                                    <img :src="product.thumbnail" width="40" height="40">
                                    <div class="box-title">
                                        <nuxt-link :to="'products/' + product.id">
                                            <h5 class="ml-2 link-product">{{ product.title }}</h5>
                                        </nuxt-link>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <v-btn @click="deleteItem(product.id)" class="btn-primary mr-2">
                                    <v-icon icon="mdi-delete-forever-outline" size="25" title="Remove"></v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>

   
</template>



