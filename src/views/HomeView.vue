<template>
<div id="home-page">
    <Navbar :callbackMobile="toProject" />
    <div class="px-4 home-detail">
    At The Co-Creative — We are a group of young creative specialized in 
    <span>branding, marketing & online strategy.</span> We work closely with brand to 
    <span>create strong identity </span>that lead to effective communication 
    <span> deliver emotions, experience & brand Loyalty. </span>
    Our strengths is that we offer you 
    <span> one stop service </span> and we are thriving to push this industry forward.
  </div>
  <div class="tag-container mb-5 mb-lg-0 px-4 px-md-4">
    <div class="row m-0">
      <div class="col-lg-4 px-0 tag-item" v-for="tag in tags" :key="tag" @click="toProject(tag.name)"> 
        {{tag.name}}
      </div>
      <div class="tag-last-line"></div>
    </div>
  </div>

  <div class="position-home">

  <div class="px-4 home-logo d-none d-md-block">
    <img class="w-100" src="@/assets/images/logo-big.png" alt="logo">
  </div>
  
  <div class="project-list-view px-4 row m-0">
    <div class="product-card d-none col-lg-4 p-0 pe-lg-2 d-md-grid">
      <div v-for="project in productElementOne" :key="project.id" @click="toProjectDetail(project.id)">
        <div>
          <img crossorigin="anonymous" :src="project.image_display" alt="">
          <div class="d-flex justify-content-between project-detail">
            <div class="project-name">{{project.name}}</div>
            <div>
              <p class="m-0 text-end project-tag" v-for="tag in project.tag" :key="tag">
                {{tag}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div class="product-card col-lg-4 p-0 ps-lg-1 pe-lg-1 d-none d-md-grid">
      <div v-for="project in productElementTwo" :key="project.id" @click="toProjectDetail(project.id)">
        <img crossorigin="anonymous" :src="project.image_display" alt="">
        <div class="d-flex justify-content-between project-detail">
            <div class="project-name">{{project.name}}</div>
            <div>
              <p class="m-0 text-end project-tag" v-for="tag in project.tag" :key="tag">
                {{tag}}
              </p>
            </div>
          </div>
      </div>
    </div>
     <div class="product-card d-none d-md-grid col-lg-4 p-0 ps-lg-2">
      <div v-for="project in productElementThree" :key="project.id" @click="toProjectDetail(project.id)">
        <img crossorigin="anonymous" :src="project.image_display" alt="">
        <div class="d-flex justify-content-between project-detail">
            <div class="project-name">{{project.name}}</div>
            <div>
              <p class="m-0 text-end project-tag" v-for="tag in project.tag" :key="tag">
                {{tag}}
              </p>
            </div>
          </div>
      </div>
    </div>

    <div class="product-card-mobile d-block d-md-none w-100 p-0">
      <div v-for="project in projects" :key="project.id" @click="toProjectDetail(project.id)">
        <img crossorigin="anonymous" :src="project.image_display" alt="">
        <div class="d-flex justify-content-between project-detail">
            <div class="project-name">{{project.name}}</div>
            <div>
              <p class="m-0 text-end project-tag" v-for="tag in project.tag" :key="tag">
                {{tag}}
              </p>
            </div>
          </div>
      </div>
    </div>
  </div>
  </div>

</div>

<div class="footer-home">
    <Footer />
</div>


</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue'
import Footer from '@/components/footer/Footer.vue'
import { ref, computed } from 'vue';
import {useStore} from 'vuex'
import { PUSH_PROJECTS,GETTER_PROJECTS,GETTER_TAGS,PUSH_TAGS,TRIGGER_LOADING} from '@/store/constants'
import { useRouter } from 'vue-router'

  export default {
        name: 'home',
        components:{
          Navbar,
          Footer
        },
        setup(){
          const store = useStore()
          const projects = computed(()=> store.getters[GETTER_PROJECTS])
          const productElementOne = ref([])
          const productElementTwo = ref([])
          const productElementThree = ref([])
          const tags = computed(()=> store.getters[GETTER_TAGS])
          const router = useRouter()
           return {
             projects,
             store,
             productElementOne,
             productElementTwo,
             productElementThree,
             tags,
             router
           }
        },
          async mounted(){
            await this.store.commit(TRIGGER_LOADING,true)
            await this.store.dispatch(PUSH_TAGS)
            await this.store.dispatch(PUSH_PROJECTS)
            await this.store.commit(TRIGGER_LOADING,false)
            this.addProductToElement()
        },
        methods:{
          async addProductToElement(){
            let count = 1
            await this.projects.forEach(element => {
              if(count == 1){
                this.productElementOne.push(element)
                count++
              } else if(count == 2){
                this.productElementTwo.push(element)
                count++
              } else if(count == 3){
                this.productElementThree.push(element)
                count = 1
              }
            });
            console.log('this.productElementOne',this.productElementOne)
            console.log('this.productElementTwo',this.productElementTwo)
            console.log('this.productElementThree',this.productElementThree)
          },
          toProject(tag){
            this.router.push({name:'ProjectView',query:{tag:tag}})
          },
          toProjectDetail(projectId){
            this.router.push({name:'ProjectDetailViewUrl',params:{id:projectId}})
          }
        }
    }

</script>

<style>

.ck input.ck-input.ck-input-text {
    transition: .2s ease-in-out;
    height: 500px;
    width: 100%;
    font-size: 16px;
    margin: 0;
    box-sizing: border-box;
    color: black;
}

.ck-editor__main{
  color: black !important;
}

.project-list-view{
  grid-column-gap: 24px;
  align-items: start;
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
}

.project-list-view img{
  width: 100%;
}

.product-card{
  display: grid;
  grid-template-columns: minmax(0,1fr);
  row-gap: 60px;
}

</style>

<style scoped>
#home-page .tag-container{
  margin-top: 450px;
  background: white;
}

.position-home{
  position: relative;
  z-index: 2;
  background: white;
  padding-bottom: 60px;
}


.project-detail{
  margin-top: 25px;
}

.project-name{
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: #000;
}

.project-tag{
  font-size: 14px;
  color: #888;
  letter-spacing:0;
  line-height:18px
}

.tag-item{
  border-bottom: 0.25px solid black;
  border-collapse: collapse;
}

.tag-container .row{
  position: relative;
}

.tag-last-line{
  width: 100%;
  height: 0.25px;
  bottom: 0px;
  background-color: black;
  position: absolute;
}

.tag-item{
  font-size: 14px;
  padding: 10px 0;
  cursor: pointer;
  color: #000;
  line-height: 18px;
}

.tag-item:nth-child(1),.tag-item:nth-child(2),.tag-item:nth-child(3){
  border-top: 0.25px solid black;
}

.home-detail{
  padding-top: 57px;
  padding-bottom: 200px;
  font-size: 40px;
  color: black;
  font-family: "freight-big-pro";
  line-height: 48px;
  background: white;
  position: fixed;
  z-index: 1;
}



.home-logo{
  padding-top: 100px;
  margin-bottom: 100px;
}

  @media (max-width: 1440.98px) { 
    .home-logo{
      padding-top: 80px;
    }
  }

  @media (max-width: 1324.98px) {
        #home-page .tag-container{
          margin-top: 497px;
        }   
  } 


  @media (max-width: 1200.98px) { 
    .home-detail{
        font-size: 30px;
        line-height: 36px;
          padding-bottom: 150px;
    }

    #home-page .tag-container{
      margin-top: 400px;
    }


    .home-logo{
      padding-top: 70px;
      margin-bottom: 70px;
    }

  }

.home-detail span{
  font-family: "freight-big-pro";
  font-style: italic;
  font-weight: 500;
}


@media (max-width: 991.98px) { 
  .tag-item:nth-child(1){
    border-top: 0.25px solid black;
  }

  .tag-item:nth-child(2),.tag-item:nth-child(3){
    border-top: none;
  }

  .home-detail{
    margin-bottom: 100px;
  }

  .project-tag{
    font-size: 14px;
  }

  .project-name {
    font-size: 18px
  }

  @media (max-width: 767.98px) { 
    .project-list-view{
      display: block;
    }

    .project-detail{
      margin-top: 16px;
      margin-bottom: 30px;
    }

    .project-tag{
      font-size: 12px;
      margin-bottom: 5px;
    }
    .project-name {
      font-size: 14px
    }

    .tag-container.mb-5{
      margin-bottom: 54px !important;
    }

    .home-detail{
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 42px;
      line-height: 34px;
      margin-top: 20px;
      font-size: 28px;
      position: relative;
    }

    #home-page .tag-container{
      margin-top: 0;
    }
    

    .tag-item{
      font-size: 14px;
      padding: 8.5px 0;
    }
  }
}

.product-card{
  transition: all .5s ease;
}

.product-card:hover{
  cursor: pointer;
  opacity: .75;
}

.footer-home{
  position: relative;
  z-index: 2;
  background: white;
  margin-top: -60px;
}

</style>
