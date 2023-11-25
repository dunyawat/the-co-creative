<template>
<div class="height-100">
<div>
    <Navbar :callbackMobile="toProject" />
    <div class="contact-page">
    <div class="contact-container">
        <div class="contact-content px-4" @click="toInquiries()">
            Client Inquiries
            <div class="contact-image d-none d-lg-block"><img src="@/assets/images/arrow-new.svg" alt=""></div>
        </div>
    </div>
    <div class="contact-container">
        <div class="contact-content px-4" @click="toCareer()">
            Career
            <div class="contact-image d-none d-lg-block"><img src="@/assets/images/arrow-new.svg" alt=""></div>
        </div>
    </div>
    </div>
</div>
<Footer />
</div>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue'
import Footer from '@/components/footer/Footer.vue'
import { useRouter } from 'vue-router'
export default {
    name: 'ContactView',
    components:{
        Navbar,
        Footer
    },
    setup(){
        const router = useRouter()
        return{
            router
        }
    },
    methods:{
        toInquiries(){
            this.router.push({name:'ClientViewUrl'})
        },
        toCareer(){
            this.router.push({name:'CareerViewUrl'})
        },
          toProject(tag){
            this.router.push({name:'ProjectView',query:{tag:tag}})
          },

    }
}
</script>

<style>
.contact-container{
    border-bottom: 1px solid #000;
}

.contact-content{
    padding-top: 70px;
    padding-bottom: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "freight-big-pro";
    letter-spacing: 0px;
    color: #000000;
    font-size: 100px;
    line-height: 110px;
    transition: all 0.5s ease;
    cursor: pointer;
}

.contact-image{
    opacity: 0;
    transition: all 0.5s ease;
}

.contact-content:hover{
    background-color: #F0F0F0;
    transition: all 0.5s ease;
}

.contact-content:hover .contact-image{
    opacity: 1;
    transition: all 0.5s ease;
}

.height-100{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 767.98px) { 


    .contact-page{
        border-top: 1px solid #000;
    }

    .contact-content{
        font-size: 40px;
        line-height: 49px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
}
</style>
