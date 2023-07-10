<template>
    <div class="px-4 py-4 navbar-main">
        <div class="row m-0">
            <div class="col-md-4 p-0"><router-link class="nav-link" to="/">THE CO-CREATIVE</router-link> </div>
            <div class="col-md-4 p-0"><router-link  class="nav-link" to="/project">PROJECTS</router-link></div>
            <div class="col-md-2 p-0"><router-link  class="nav-link" to="/about">ABOUT</router-link></div>
            <div class="col-md-2 p-0"><router-link  class="nav-link" to="/contact">CONTACT</router-link></div>
        </div>
    </div>
    <div class="nav-mobile">
        <div class="top-black"></div>
        <div class="d-flex justify-content-between align-items-center px-4 position-relative">
            <div style="width:26px;"></div>
            <img @click="router.push({path:'/'})" class="d-block" src="@/assets/images/logo-big.png" width="176" height="17" alt="">
            <div @click="navOpen = !navOpen" :class="navOpen ?  'hamburger is-active' : 'hamburger' " id="hamburger-1">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
        </div>
         <div :class="navOpen ? 'mobile-menu is-active' : 'mobile-menu' ">
                <div class="w-100">
                    <router-link  class="nav-link-mobile" to="/project">PROJECTS</router-link>
                    <router-link  class="nav-link-mobile" to="/about">ABOUT</router-link>
                    <router-link  class="nav-link-mobile" to="/contact">CONTACT</router-link>
                </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { RouterLink,useRouter, useRoute  } from 'vue-router'
export default {
    name:'Navbar',
    
    setup() {
        const navOpen = ref(false)
        const router = useRouter()
        return {
            navOpen,
            router
        }
    },
}
</script>

<style scoped>
    .navbar-main{
        border-bottom: 1px solid #000;
    }
    .nav-link{
        font-size: 18px;
        letter-spacing: 0px;
        color: #000000;
    }

    .nav-link:hover{
        text-decoration: underline;
    }

    .hamburger .line{
        width: 26px;
        height: 1.5px;
        background-color: #000;
        display: block;
        margin: 5px auto;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

    .hamburger:hover{
    cursor: pointer;
    }

    /* ONE */

    #hamburger-1.is-active .line:nth-child(2){
    opacity: 0;
    }

    #hamburger-1.is-active .line:nth-child(1){
  -webkit-transform: translateY(8px) rotate(45deg);
  -ms-transform: translateY(8px) rotate(45deg);
  -o-transform: translateY(8px) rotate(45deg);
  transform: translateY(8px) rotate(45deg);
}

#hamburger-1.is-active .line:nth-child(3){
  -webkit-transform: translateY(-5.5px) rotate(-45deg);
  -ms-transform: translateY(-5.5px) rotate(-45deg);
  -o-transform: translateY(-5.5px) rotate(-45deg);
  transform: translateY(-5.5px) rotate(-45deg);
}

  .nav-mobile{
      display: none;
  }

  .mobile-menu{
      position:absolute;
      top: 84.5px;
      background: white;
      width: 100%;
      height: calc(100vh - 84.5px);
      opacity: 0;
      z-index: -1;
      transition: all .5s ease;
      display: flex;
      align-items: center;
  }

  .mobile-menu.is-active{
      opacity: 1;
      z-index: 10;
  }

  .nav-link-mobile{
      font-size: 24px;
      display: block;
      color: black;
    font-weight: 400;
    margin-bottom: 27px;
    text-align: center;
  }

  .nav-link-mobile:hover{
      text-decoration: underline;
      color: #000;
  
  }

    @media screen and (max-width: 768px) {
        .navbar-main{
            display: none;
        }

        .nav-mobile{
            display: block;
        }

        .top-black{
            background: black;
            height: 40px;
            margin-bottom: 20px;
        }
    }
</style>

<style scoped>
    img:hover{
        cursor: pointer;
    }
</style>