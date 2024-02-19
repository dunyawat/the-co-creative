<template>
  <div id="product-detail">
     <Navbar :callbackMobile="toProject" />
    <div class="banner-project">
      <img v-if="project" :src="project.image" crossorigin="anonymous" alt="">
      <div v-if="project">
              <div :class="project.style == 'white' ? 'product-main light' : 'product-main'">
        <div class="px-4 py-2 product-header d-none d-md-block">
          <div class="row m-0">
            <div class="col-lg-4 col-md-3 p-0"></div>
            <div class="col-lg-4 col-md-3  p-0"></div>
            <div class="col-lg-2 col-md-3 p-0 ps-2">(INFO)</div>
            <div class="col-lg-2 col-md-3 p-0 ps-2">(SERVICES)</div>
          </div>
        </div>
        <div class="px-4 py-2 product-detail d-none d-md-block">
          <div class="row m-0">
            <div class="col-lg-4 col-md-3  p-0">{{project ? project.name : ''}}</div>
            <div class="col-lg-4 col-md-3  p-0 ps-1">{{project ? project.description : ''}}</div>
            <div class="col-lg-2 col-md-3  p-0 ps-2">
              <div class="mb-2">{{project ? project.info : ''}}</div>
              <div v-if="project">
                <div v-if="project.link.length">
                  <a :href="link.link" v-for="link in project.link" :key="link">
                    {{link.name}}
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 p-0 ps-2">
              <div v-if="project">
                <div v-if="project.tag.length">
                  <div v-for="tag in project.tag" :key="tag">
                    {{tag}}
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
       <div class="px-4 product-header-mobile d-block d-md-none">
            <div class="p-0 product-detail-name">{{project ? project.name : ''}}</div>
            <div class="p-0">{{project ? project.description : ''}}</div>
       </div>
       <div class="px-4 d-block d-md-none">
        <div class="product-detail-info">
          <div class="row m-0">
              <div class="col-6 p-0">(INFO)</div>
              <div class="col-6 p-0">
                 <div class="mb-1">{{project ? project.info : ''}}</div>
                <div v-if="project">
                  <div v-if="project.link.length">
                    <a :href="link.link" v-for="link in project.link" :key="link">
                      {{link.name}}
                    </a>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="product-detail-info product-detail-service">
          <div class="row m-0">
              <div class="col-6 p-0">(SERVICES)</div>
              <div class="col-6 p-0">
               <div v-if="project">
                <div v-if="project.tag.length">
                  <div v-for="tag in project.tag" :key="tag">
                      {{tag}}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
       </div>
      </div>
      </div>
    </div>
    <div v-if="project">
      <div v-if="project.section.length">
        <div v-for="section in project.section" :key="section">
          <div v-if="section.section_type == 'image'">
            <img :src="section.image" class="w-100" crossorigin="anonymous" alt="">
          </div>
           <div v-if="section.section_type == 'text'">
             <div v-if="section.theme == 'blackBgGray'" class="section-text bg-gray px-4">
               <div class="row m-0">
                <div class="col-lg-4 section-name p-0">
                  {{section.header}}
                </div>
                <div class="col-lg-8 section-description p-0">
                  {{section.details}}
                </div>
               </div>
             </div>
              <div v-else-if="section.theme == 'whiteBgBlack'" class="section-text bg-black px-4">
               <div class="row m-0">
                <div class="col-lg-4 section-name p-0">
                  {{section.header}}
                </div>
                <div class="col-lg-8 section-description p-0">
                  {{section.details}}
                </div>
               </div>
             </div>
              <div v-else class="section-text px-4">
               <div class="row m-0">
                <div class="col-lg-4 section-name p-0">
                  {{section.header}}
                </div>
                <div class="col-lg-8 section-description p-0">
                  {{section.details}}
                </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="project">
      <div :class="project.credit[0].credit_type + ' px-4 pt-3 credit-container'" v-if="project.credit.length">
        <div v-if="project.credit.length">
          <div class="row m-0">
            <div class="col-lg-8 col-md-6 p-0"></div>
            <div class="col-lg-1 col-md-2 p-0 credit-header">CREDIT</div>
            <div class="col-lg-3 col-md-4 p-0 credit-detail">
              <div v-for="credit in project.credit" :key="credit">
                <span class="credit-name">{{ credit.name }} </span> <span class="credit-position">{{credit.position_1}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="view-more-project px-4" v-if="projectsMatch">
      <div class="view-more-project-header">VIEW MORE PROJECTS</div>
      <div class="row">
        <div v-for="(project,index) in projectsMatch" :key="project.id" :class="index < 3 ? 'col-md-4 mb-4 mb-md-0 recent-product' : 'd-none'" @click="toProjectDetail(project.id)">
          <div v-if="index < 3">
            <img :src="project.image_display" crossorigin="anonymous" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
    <Footer />
</template>

<script>
  import { ref, computed } from 'vue';
  import Navbar from '@/components/navbar/Navbar.vue'
  import Footer from '@/components/footer/Footer.vue'
   import {
        PUSH_PROJECT,
        GETTER_PROJECT,
        PUSH_PROJECTS,GETTER_PROJECTS,ADD_MATCH_PROJECT,GETTER_MATCH_PROJECT,CLEAR_STATE_PROJECT,
        TRIGGER_LOADING
    } from '@/store/constants'
  import {useStore} from 'vuex'
  import { RouterLink,useRouter, useRoute  } from 'vue-router'
  export default {
        name: 'ProjectDetailView',
        components:{
          Navbar,
          Footer
        },
        setup(){
          const id = ref('')
          const store = useStore()
          const project = computed(()=> store.getters[GETTER_PROJECT])
          const projects = computed(()=> store.getters[GETTER_PROJECTS])
          const projectsMatch = computed(()=> store.getters[GETTER_MATCH_PROJECT])
          const matchProject = []
          const router = useRouter()
          return {
            id,
            project,
            store,
            projects,
            matchProject,
            projectsMatch,
            router
          }
        },

        async mounted(){
          window.scrollTo(0, 0)
          this.id = this.$route.params.id
          await this.store.commit(TRIGGER_LOADING,true)
          await this.store.dispatch(PUSH_PROJECT,this.$route.params.id)
          await this.store.dispatch(PUSH_PROJECTS)
          await this.store.commit(TRIGGER_LOADING,false)

          await this.trigermatchProject()
          await this.sortMatch()
        },
        methods:{
          async trigermatchProject(){
            if(this.project.tag.length){
             this.matchProject = await this.projects.map(p => {
                let matchCount = 0
                this.project.tag.forEach(tag => {
                  if(p.tag.includes(tag)){
                    matchCount = matchCount+1
                  }
                });
                return {
                  credit:p.credit,
                  description:p.description,
                  id:p.id,
                  image:p.image,
                  image_display:p.image_display,
                  info:p.info,
                  link:p.link,
                  name:p.name,
                  section:p.section,
                  style:p.style,
                  tag:p.tag,
                  matchCount:matchCount
                }
              }) 
            }
          },
          async sortMatch(){
            function dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
              return function (a,b) {
                  /* next line works with strings and numbers, 
                    * and you may want to customize it to your needs
                    */
                  var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                  return result * sortOrder;
              }
            }           
            let test 
            
            this.matchProject.forEach((project,index) => {
              if(project.id == this.project.id){
                test = index
              }
            })

            await this.matchProject.splice(test, 1);

            await this.matchProject.sort(dynamicSort("-matchCount"))

            if(this.project.tag.length){
              this.store.commit(ADD_MATCH_PROJECT,this.matchProject)
            } else{
              this.store.commit(ADD_MATCH_PROJECT,null)
            }

            this.showRecent = false
          },
          async toProjectDetail(projectId){
            this.router.push({name:'ProjectDetailViewUrl',params:{id:projectId}})
            this.store.commit(CLEAR_STATE_PROJECT)
            window.scrollTo(0,0);
            await this.store.dispatch(PUSH_PROJECT,projectId)
            await this.store.dispatch(PUSH_PROJECTS)
   
            await this.trigermatchProject()
            await this.sortMatch()
          },
          toProject(tag){
            this.router.push({name:'ProjectView',query:{tag:tag}})
          },
        }
    }

</script>

<style scoped>
  .blackBgGray{
    background-color: #F0F0F0;
  }
  .whiteBgBlack {
      background-color: black;
  }

  .whiteBgBlack .credit-header,.whiteBgBlack .credit-name{
      color: white;
  }

</style>

<style>
.ck input.ck-input.ck-input-text {
    transition: .2s ease-in-out;
    height: 500px;
    width: 100%;
    font-size: 16px;
    margin: 0;
    box-sizing: border-box;
    color: rgb(153, 146, 146);
}

#product-detail .footer-logo{
  margin-top: 0;
}

.ck-editor__main{
  color: black !important;
}

.banner-project{
  position: relative;
}

.banner-project img{
  width: 100%;
}

.product-main{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 14px;
  line-height: 18px;
  color: #000;
}

.product-main.light .product-header{
  border-bottom: 0.25px solid #FFF;
}

.view-more-project img{
  aspect-ratio: 6/4;
  width: 100%;
  object-fit: cover;
}

.product-main.light{
  color: #fff;
}

.product-main.light  .product-detail a{
  color: #fff;
}


.product-main.light   .product-detail a:hover{
  color: #fff;
  text-decoration: underline;
}

.product-header{
    border-bottom: 0.25px solid #000;
}

.product-detail a{
  color: #000;
}

.product-detail a:hover{
  color: #000;
  text-decoration: underline;
}

.section-text{
  padding-top: 100px;
  padding-bottom: 100px;
}

.section-text.bg-gray{
  background-color: #F0F0F0;
}

.section-text.bg-black .section-name{
  color: #FFF;
}

.section-text.bg-black .section-description{
  color: #FFF;
}

.section-description{
  font-family: "freight-big-pro";
  font-size: 40px;
  line-height: 45px;
  letter-spacing: 0.25px;
  color: #000;
}

.section-name{
  font-size: 14px;
  line-height: 18px;
  color: #000;
}

.credit-header{
 line-height: 18px;
 font-size: 14px;
 color: #000;
}

.credit-name{
 line-height: 18px;
 font-size: 14px;
  color: #000;
}
.credit-position{
 line-height: 18px;
 font-size: 14px;
  color: #888888;
}

.recent-product{
    cursor: pointer;
}

.recent-product:hover{
  opacity: 0.75;
}


.view-more-project{
  padding-bottom: 68px;
  background-color: #F0F0F0;
  border-top: 0.25px solid #000;
}

.view-more-project-header{
  font-size: 14px;
  color: #000;
  line-height: 18px;
  padding-top: 72px;
  margin-bottom: 68px;
  text-align: center;
}

.credit-container{
  padding-bottom: 100px;
}

@media (max-width: 1440.98px) { 
  .section-description{
    font-size: 30px;
    line-height: 35px;
  }
}

@media (max-width: 991.98px) { 
    .product-main{
      font-size: 14px;
    }

  .section-name{
    margin-bottom: 50px;
  }
}

@media (max-width: 767.98px) { 
  .view-more-project-header{
    font-size: 14px;
    color: #000;
    line-height: 18px;
    padding-top: 27px;
    margin-bottom: 27px;
    text-align: center;
  }

  .view-more-project{
    padding-bottom: 30px;
  }

.product-main{
  position: static;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 14px;
  line-height: 22px;
}

.product-detail-name{
  font-weight: 500;
}

.product-main.light .product-header{
  border-bottom: 0.25px solid #000;
}

.product-main.light{
  color: #000;
}

.product-main.light .product-detail a{
  color: #000;
}


.product-main.light .product-detail a:hover{
  color: #000;
  text-decoration: underline;
}

  .product-header-mobile{
    font-size: 14px;
    line-height: 18px;
    margin-top: 40px;
    margin-bottom: 25px;
    color: black;
  }

  .product-detail-name{
    margin-bottom: 40px;
  }

  .banner-project img{
    aspect-ratio: 3/4;
    object-fit: cover;
  }

  .product-detail-info{
    padding-top: 10px;
    padding-bottom: 25px;
    border-top: 0.25px solid #000;
    font-size: 14px;
    position: sticky;
  }

  .product-detail-info a{
    color: #000;
  }

  .product-detail-info a:hover{
    color: #000;
    text-decoration: underline;
  }

  .product-detail-info.product-detail-service{
    padding-bottom: 40px;
  }

  .section-text{
    padding-top: 41px;
    padding-bottom: 48px;
  }

  .section-name{
    font-size: 14px;
    margin-bottom: 40px;
    line-height: 18px;
  }

  .section-description{
    font-size: 26px;
    line-height: 30px;
  }

  .credit-header{
    margin-bottom: 16px;
    font-size: 14px;
  }

  .credit-container{
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .credit-name,.credit-position{
    font-size: 14px;
    line-height: 18px;
  }
}

#product-detail{
  margin-bottom: -60px;
}
</style>