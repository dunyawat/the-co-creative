<template>
    <input type="text" v-model="username">
    <input type="password" v-model="password">
    <button @click="login()">Login</button>
</template>

<script>
import { ref } from 'vue';
export default {
    name:'login',
    setup(){  
        const username = ref('')
        const password = ref('')

        return { 
            username, 
            password
        }
    },
  
}
</script>