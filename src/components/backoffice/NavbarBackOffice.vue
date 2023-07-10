<template>
    <div class="backoffice-nav-container">
        <div class="container d-flex justify-content-between py-3">
            <div>
                <router-link to="/website-management/tag" :class="route.path.includes('tag')? 'active b-nav-link' : 'b-nav-link'" >TAG</router-link>
                <router-link to="/website-management/project" :class="route.path.includes('project')? 'active b-nav-link' : 'b-nav-link'">PROJECT</router-link>
                <router-link to="/website-management/staff" :class="route.path.includes('staff')? 'active b-nav-link' : 'b-nav-link'">TEAM</router-link>
                <router-link to="/website-management/career" :class="route.path.includes('career')? 'active b-nav-link' : 'b-nav-link'">CAREER</router-link>
            </div>
            <div>
                <a @click="logout" class="b-logout">LOGOUT</a>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink,useRouter, useRoute  } from 'vue-router'
export default {
    name:'NavbarBackOffice',
    components:{
        RouterLink
    },
    setup() {
        const router = useRouter()
        const route = useRoute()

        return {
            router,
            route
        }
    },
    methods:{
        logout(){
            localStorage.removeItem("token");
            this.$router.push({name:'login'})
        }
    }
}
</script>

<style>
    .b-nav-link:not(:first-child){
        margin: 0 25px;
    }

    .b-nav-link:first-child{
        margin-right: 25px;
    }

    .b-nav-link{
        color: #000000;
        font-weight: 400;
        font-size: 18px;
    }

    .b-nav-link.active{
        border-bottom: 3px solid #000000;
    }

    .b-nav-link:hover{
        border-bottom: 3px solid #000000;
        color: #000;
    }

    .backoffice-nav-container{
        border-bottom: 1px solid #000000;
    }

    .b-logout{
        color: #000000;
        font-weight: 400;
        font-size: 18px;
    }

    .b-logout:hover{
        color: #000000;
        cursor: pointer;
    }
</style>