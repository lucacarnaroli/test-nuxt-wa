<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { name } = useDisplay()

const width = computed(() => {

    switch (name.value) {
        case 'xs': return 220
        case 'sm': return 400
        case 'md': return 500
        case 'lg': return 600
        case 'xl': return 800
        case 'xxl': return 1200
    }

    return undefined
})

</script>



<template>
    <v-container>
        <v-row justify="center">
            <div class="mt-5">
                <div class="text-center mb-2"><h1>Login</h1></div>
                <v-card>
                    <v-sheet :width="width" class="pa-2 ma-2">
                        <form-login/>
                    </v-sheet>
                </v-card>
            </div>
        </v-row>
    </v-container>
</template>
