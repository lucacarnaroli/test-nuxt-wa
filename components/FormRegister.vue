<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'


const { handleSubmit } = useForm({
    validationSchema: {
        name(value) {
            if (value?.length >= 2) return true
            return 'Name needs to be at least 2 characters.'
        },
        surname(value) {
            if (value?.length >= 2) return true
            return 'Surname needs to be at least 2 characters.'
        },
        phone(value) {
            if (value?.length > 9 && /[0-9-]+/.test(value)) return true
            return 'Phone number needs to be at least 9 digits.'
        },
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Must be a valid e-mail.'
        },
        codice_fiscale(value) {
            if (value?.length == 16) return true
            return 'Fiscal code needs to be 16 characters.'
        },
        select(value) {
            if (value) return true
            return 'Select an option.'
        },
    },
})
const name = useField('name')
const surname = useField('surname')
const phone = useField('phone')
const email = useField('email')
const codice_fiscale = useField('codice_fiscale')
const select = useField('select')

const gender = ref([
    'Male',
    'Female',
])

const submit = handleSubmit(values => {
    const url = '/products'
    fetch(url, { method: 'POST', redirect: 'follow' })
        .then(response => {
            window.location.href = response.url;
        }).catch(function (err) {
            console.info(err + " url: " + url);
        });
})

</script>


<template>
    <form @submit.prevent="submit">
        <v-text-field v-model="name.value.value" :error-messages="name.errorMessage.value"
            label="Name">
        </v-text-field>

        <v-text-field v-model="surname.value.value" :error-messages="surname.errorMessage.value"
            label="Surname">
        </v-text-field>

        <v-text-field v-model="phone.value.value" :counter="9" :error-messages="phone.errorMessage.value"
            label="Phone Number">
        </v-text-field>

        <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail">
        </v-text-field>

        <v-text-field v-model="codice_fiscale.value.value" @update:modelValue="value => codice_fiscale.value.value = value.toUpperCase()" :error-messages="codice_fiscale.errorMessage.value" label="Codice fiscale">
        </v-text-field>

        <v-select v-model="select.value.value" :gender="gender" :error-messages="select.errorMessage.value"
            label="Select">
        </v-select>

        <v-btn type="submit" block class="mt-2 btn-primary">Sign Up</v-btn>
    </form>
    <div class="mt-2">
        <p class="text-body-2">Do you have an account? 
            <NuxtLink to="/login" class="link">Sign In</NuxtLink>
        </p>
    </div>
</template>