<script setup>
import { useField, useForm } from 'vee-validate'

const { handleSubmit } = useForm({
    validationSchema: {
        email(value) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            return 'Must be a valid e-mail.'
        },
        password(value) {
            if (value?.length >= 7) return true
            return 'Password needs to be at least 7 characters.'
        },
    },
})
const email = useField('email')
const password = useField('password')
const submit = handleSubmit(values => {
    const url = '/products'
    fetch(url, { 
        method: 'POST', 
        redirect: 'follow', 
    }).then(response => {
        if(response.ok){
            window.location.href = response.url;
        }
    }).catch(function (err) {
        console.info(err + " url: " + url);
    });
})

</script>


<template>
    <!-- <v-row class="form-res">
        <v-col> -->
            <form @submit.prevent="submit" class="form-res">
                <v-text-field  v-model="email.value.value" :error-messages="email.errorMessage.value" label="email">
                </v-text-field>

                <v-text-field v-model="password.value.value" :error-messages="password.errorMessage.value" label="password">
                </v-text-field>

                <v-btn type="submit" block class="mt-2 btn-primary"><span>Sign in</span></v-btn>
            </form>

            <div class="mt-2">
                <p class="text-body-2">Don't have an account? 
                    <NuxtLink to="/registration" class="link">Sign Up</NuxtLink>
                </p>
            </div>
        <!-- </v-col>
    </v-row> -->
</template>

