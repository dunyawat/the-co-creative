<template>
<div>
  <Navbar :callback="filterProject" :callbackMobile="filterProjectMobile" />
  <div class="modal-selected" v-if="modalSelected"></div>
   <div class="tag-container project-view-tag px-4">
        <div class="tag-select-container d-block d-lg-none">
          <div :class="openSelected ? 'select-header open' : 'select-header'" @click="openSelect">{{selectMobile}} <img src="@/assets/images/tag-select.svg" alt=""></div>
          <ul class="p-0" v-if="openSelected">
              <li class="tag-select px-0" @click="filterProjectMobile('All Services')">
                All Services
              </li>
              <li v-for="tag in tags" :key="tag" class="tag-select px-0" @click="filterProjectMobile(tag.name)">
                {{tag.name}}
              </li>
          </ul>
      </div>
   </div>

   <div class="project-list-view px-4 mt-5 row m-0" v-if="projects.length">
    <div class="product-card col-lg-4 p-0 pe-lg-2">
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
     <div class="product-card col-lg-4 p-0 ps-lg-1 pe-lg-1">
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
     <div class="product-card col-lg-4 p-0 ps-lg-2">
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
  </div>
  <div v-else class="px-4">
      No data
  </div>
</div>
  <Footer />
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue'
import Footer from '@/components/footer/Footer.vue'
import { ref, computed } from 'vue';
import { RouterLink,useRouter, useRoute  } from 'vue-router'
import { FALSE_DROPDOWN,PUSH_PROJECTS,GETTER_PROJECTS,PUSH_PROJECTS_FILTER,GETTER_TAGS,PUSH_TAGS,CLEAR_STATE_PROJECT,GETTER_DROPDOWN,TRIGGER_LOADING} from '@/store/constants'
import {useStore} from 'vuex'

  export default {
        name: 'ProjectView',
        components:{
          Navbar,
          Footer,
        },
        setup(){
          const route = useRoute()
          const tagParam = ref(route.query.tag)
          const store = useStore()
          const projects = computed(()=> store.getters[GETTER_PROJECTS])
          const dropdown = computed(()=> store.getters[GETTER_DROPDOWN])
          const productElementOne = ref([])
          const productElementTwo = ref([])
          const productElementThree = ref([])
          const tags = computed(()=> store.getters[GETTER_TAGS])
          const router = useRouter()
          const selectMobile = ref('All Services')
          const openSelected = ref(false)
          const modalSelected = ref(false)
          return {
            tagParam,
            store,
            projects,
            productElementOne,
            productElementTwo,
            productElementThree,
            tags,
            router,
            selectMobile,
            openSelected,
            modalSelected,
            dropdown
          }
        },

        async mounted(){
          this.store.commit(FALSE_DROPDOWN)
          this.store.commit(CLEAR_STATE_PROJECT)
          await this.store.commit(TRIGGER_LOADING,true)
          if(this.tagParam){
            await this.store.dispatch(PUSH_PROJECTS_FILTER,{tag:this.tagParam})
              console.log(this.tagParam)
          }else{
            await this.store.dispatch(PUSH_PROJECTS)
          }

           await this.store.dispatch(PUSH_TAGS)
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
          async filterProject(tagName){
            this.productElementOne = []
            this.productElementTwo = []
            this.productElementThree = []
            this.store.commit(CLEAR_STATE_PROJECT)
            await this.store.commit(TRIGGER_LOADING,true)
            await this.store.dispatch(PUSH_PROJECTS_FILTER,{tag:tagName})
            await this.store.commit(TRIGGER_LOADING,false)
            this.addProductToElement()
          },
          toProjectDetail(projectId){
            this.router.push({name:'ProjectDetailViewUrl',params:{id:projectId}})
          },
          async filterProjectMobile(tagName){
            this.selectMobile = tagName
            this.openSelected = false
            this.productElementOne = []
            this.productElementTwo = []
            this.productElementThree = []
            this.store.commit(CLEAR_STATE_PROJECT)
            await this.store.commit(TRIGGER_LOADING,true)
            await this.store.dispatch(PUSH_PROJECTS_FILTER,{tag:tagName})
            await this.store.commit(TRIGGER_LOADING,false)
            this.addProductToElement()
          },
          openSelect(){
            this.openSelected = !this.openSelected
          },
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
  grid-column-gap: 0px !important;
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

.project-detail{
  margin-top: 25px;
}

.project-name{
  font-size: 20px;
  font-weight: 600;
  color: #000;
}

.project-tag{
  font-size: 18px;
  color: #888;
  letter-spacing:0;
  line-height:22px
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

.tag-item:nth-child(1),.tag-item:nth-child(2),.tag-item:nth-child(3){
  border-top: 1px solid black;
}

.home-logo{
  margin-top: 150px;
  margin-bottom: 100px;
}


.project-view-tag{
  margin-top: -1px;
}

.select-header{
  font-size: 14px;
  font-weight: 400;
  color: black;
  line-height: 18px;
  padding: 8.5px 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 40px;
}

.product-card{
  cursor: pointer;
  transition: all .5s ease;
}

.product-card:hover{
  opacity: 0.75;
}

.select-header img{
  transition: all .4s ease;
}

.select-header.open img{
  transform: rotate(180deg);
}

.tag-select{
  font-size: 14px;
  font-weight: 400;
  color: black;
  line-height: 18px;
  padding: 8.5px 0;
  border-bottom: 1px solid #000;
  list-style: none;
  cursor: pointer;
}

@media (max-width: 991.98px) { 
  .tag-item:nth-child(1){
    border-top: 1px solid black;
  }

  .tag-item:nth-child(2),.tag-item:nth-child(3){
    border-top: none;
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
      font-size: 14px;
      margin-bottom: 5px;
    }
    .project-name {
      font-size: 20px
    }

    .tag-container.mb-5{
      margin-bottom: 22px !important;
    }

    .tag-item{
      font-size: 14px;
      padding: 8.5px 0;
    }
  }
}
</style>
