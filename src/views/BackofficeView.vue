

<template>
    <NavbarBackOffice />
</template>

<script>
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    import { nextTick, ref } from 'vue';
    import Login from '../components/Login.vue'
    export default {
        name: 'backoffice',
        components:{
            NavbarBackOffice,
            Login
        },
        setup(){
            const token = localStorage.getItem("token")
            return {
                token,
            }
        },
        mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }
        },
        watch:{
            token(newValue, oldValue) {
                token = newValue
                this.forceRender()
            },
        },
        methods:{
            test(){
                console.log(this.editorData)
            },
        }
    }   
</script>

<style scoped>
    *{
        color: red;
    }
</style>
