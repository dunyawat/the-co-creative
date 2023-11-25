<template>
    <div class="margin-navbar"></div>
    <div class="px-4 navbar-main">
        <div class="row m-0">
            <div class="col-md-4 p-0"><router-link class="nav-link py-4" to="/">THE CO-CREATIVE</router-link> </div>
            <!-- <div class="col-md-4 p-0 ps-1" v-if="route.path == '/project'"><a class="nav-link" @click="toggleDropdownShow">PROJECTS</a></div> -->
            <div class="col-md-4 p-0 ps-1">
                <router-link  class="nav-link py-4 project-view-tag-btn" to="/project">PROJECTS
                    <div class="tag-container project-view-tag px-4">
                        <div class="row m-0 d-none d-lg-flex" v-if="route.path == '/project'">
                            <div class="col-lg-4 px-4 tag-item" v-for="tag in tags" :key="tag" @click="execute(tag.name)"> 
                                {{tag.name}} <span>*</span>
                            </div>
                            <div class="tag-last-line d-none d-lg-block"></div>
                        </div>
                        <div class="row m-0 d-none d-lg-flex" v-else>
                            <div class="col-lg-4 px-4 tag-item" v-for="tag in tags" :key="tag" @click="toProject(tag.name)"> 
                                {{tag.name}} <span>*</span>
                            </div>
                            <div class="tag-last-line d-none d-lg-block"></div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="col-md-2 p-0 ps-2 py-4"><router-link  class="nav-link" to="/about">ABOUT</router-link></div>
            <div class="col-md-2 p-0 ps-2 py-4"><router-link  class="nav-link" to="/contact">CONTACT</router-link></div>
        </div>
    </div>
    <div class="nav-mobile">
        <!-- <div class="top-black"></div> -->
        <div class="d-flex justify-content-between align-items-center px-4 py-4 position-relative">
            <div style="width:26px;"></div>
            <img @click="router.push({path:'/'})" class="d-block" src="@/assets/images/logo-big.png" width="176" height="17" alt="">
            <div @click="navTricker(),projectList = false" :class="navOpen ?  'hamburger is-active' : 'hamburger' " id="hamburger-1">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
        </div>
    </div>
         <div :class="navOpen ? 'mobile-menu is-active' : 'mobile-menu' ">
                <div class="w-100">
                    <router-link  class="nav-link-mobile" to="/project">PROJECTS</router-link >
                    <router-link  class="nav-link-mobile" to="/about" @click="navTricker()">ABOUT</router-link>
                    <router-link  class="nav-link-mobile" to="/contact" @click="navTricker()">CONTACT</router-link>
                </div>
                <div :class=" projectList ? 'project-list-nav open' : 'project-list-nav'">
                    <div class="px-4">
                        <div class="row m-0 d-lg-flex">
                            <div class="d-flex align-items-center back-project" @click="projectList = false">
                                <img class="me-2" src="@/assets/images/back.png"  alt="back"> PRODUCT
                            </div>
                            <div class="px-4 text-center back-project-text" @click="executeMobile('All Services')"> 
                                All Services
                            </div>
                            <div class="px-4 text-center back-project-text" v-for="tag in tags" :key="tag" @click="executeMobile(tag.name)"> 
                                {{tag.name}}
                            </div>
                        <div class="tag-last-line d-none d-lg-block"></div>
                        </div>
                    </div>
                </div>
        </div>
</template>

<script>
import { ref, computed,watch } from 'vue';
import { RouterLink,useRouter, useRoute  } from 'vue-router'
import { TRIGGER_DROPDOWN } from '@/store/constants'
import { FALSE_DROPDOWN,PUSH_PROJECTS,GETTER_PROJECTS,PUSH_PROJECTS_FILTER,GETTER_TAGS,PUSH_TAGS,CLEAR_STATE_PROJECT,GETTER_DROPDOWN} from '@/store/constants'
import {useStore} from 'vuex'
export default {
    name:'Navbar',
    props: {
        callback: {
            type: Function
        },
        callbackMobile: {
            type: Function
        }
    },
    
    setup() {
        const navOpen = ref(false)
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const tags = computed(()=> store.getters[GETTER_TAGS])
        const projectList = ref(false)

        return {
            navOpen,
            router,
            route,
            store,
            tags,
            projectList
        }
    },

    methods:{
        toggleDropdownShow(){
            this.store.commit(TRIGGER_DROPDOWN)
        },
        toProject(tag){
            this.router.push({name:'ProjectView',query:{tag:tag}})
        },
        async filterProjectMobile(tagName){
            this.selectMobile = tagName
            this.openSelected = false
            this.productElementOne = []
            this.productElementTwo = []
            this.productElementThree = []
            this.store.commit(CLEAR_STATE_PROJECT)
            await this.store.dispatch(PUSH_PROJECTS_FILTER,{tag:tagName})
            this.addProductToElement()
        },
        execute(tag) {
            if (this.callback) {
              this.callback(tag)
            }
        },
        executeMobile(tag){
            this.navTricker()
            this.projectList = false
            if (this.callbackMobile) {
                 this.callbackMobile(tag)
            }
        },
        openProjectList(){
            this.projectList = true
        },

        navTricker(){
            this.navOpen = !this.navOpen
            const body = document.getElementsByTagName("BODY")[0];
            if(this.navOpen){
                body.style.overflow = 'hidden'
            } else{
                body.style.overflow = 'auto'
            }
        }

    }
}
</script>

<style scoped>
    .back-project{
        justify-content: center;
        color: #888888;
        font-size: 18px;
        margin-bottom: 50px;
        cursor: pointer;
    }

    .back-project-text{
        font-size: 18px;
        margin-bottom: 20px;
        overflow: auto;
        cursor: pointer;
    }

    .project-list-nav{
        position: absolute;
        top: 0;
        left: 0;
        height: calc(100vh - 84.5px);
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(100%);
        transition: .5s all ease;
    }
    .project-list-nav.open{
        transform: translateX(0);
    }

    .navbar-main{
        border-bottom: 1px solid #000;
    }
    .nav-link{
        font-size: 18px;
        letter-spacing: 0px;
        color: #000000;
        cursor: pointer;
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
      position:fixed;
      top: 72.5px;
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

    .navbar-main{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: white;
        z-index: 10000;
    }

    .nav-mobile{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: white;
        z-index: 10000;
    }

    .margin-navbar{
        height: 72.5px;
        width: 100%;
    }

    .nav-link:hover, .nav-link:focus {
        color: black;
    }
</style>

<style scoped>
    img:hover{
        cursor: pointer;
    }

    .project-view-tag{
        position: absolute;
    }

    .tag-item{
  border-bottom: 1px solid black;
  border-collapse: collapse;
}

.tag-container .row{
  position: relative;
}

.tag-last-line{
  width: 100%;
  height: 1px;
  bottom: 0px;
  background-color: black;
  position: absolute;
}

.tag-item{
  font-size: 18px;
  padding: 5px 0;
  cursor: pointer;
  color: #000;
}


.project-view-tag-btn:hover .project-view-tag{
    display: block;
}

.project-view-tag{
    left: 0;
    background: white;
    top: 78px;
    z-index: 1000;
    width: 100%;
    position: absolute;
    display: none;
}

.tag-item span{
    display: none;
}

.tag-item:hover span{
    display: inline;
}
</style>