<template>
  <Navbar />
    <div class="header-about px-4">
      <div class="row m-0">
        <div class="col-md-4 p-0 about-header-name">
          ABOUT US
        </div>
        <div class="col-md-8 p-0 about-header-content">
          The Co-Creative is a creative studio bringing thought, relevance, and style to forward-thinking brands. Founded in 2006 by Creative Director Dhun, we unite strategy with intuition to pinpoint the most essential, visceral quality around which to build a brand’s story. By putting purpose first, and working as a strategic and creative resource to our clients, we align every step of the process to connect brands — and their leaders — with their highest potential. The Co-Creative continues to be recognized by our clients and by the design community as a creative force in driving fresh, iconic, and innovative ideas.
        </div>
      </div>
    </div>
    <div class="tag-service">
      <div class="px-4 tag-service-header">
        SERVICES
      </div>
      <div class="row m-0 px-4 px-lg-0" id="tag-about">
        <div class="col-md-4 p-0" v-for="tag in tags" :key="tag">
          <div class="header-tag px-0 px-lg-4 py-2">
            ({{tag.name}})
          </div>
          <div class="px-0 px-lg-4 des-tag">
            {{tag.description}}
          </div>
        </div>
      </div>
    </div>
    <div class="team-container px-4">
      <div class="row m-0">
        <div class="col-md-6 p-0 team-header">TEAM</div>
        <div class="col-md-6 p-0">
          <div class="row justify-content-lg-end m-0">
            <div :class="`col-6 team-detail order-${index}`" v-for="(staff,index) in staffs" :key="staff">
              <img class="w-100" crossorigin="anonymous" :src="staff.image" alt="">
              <div class="team-name">{{staff.name}}</div>
              <div class="team-position">{{staff.position_1}}</div>
              <div class="team-position">{{staff.position_2}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="client">
      <div class="client-header px-4">SELECTED CLIENTS</div>
      <div class="row m-0 px-4 px-lg-0" id="client-container">
        <div class="col-lg-3 px-lg-4 px-0 py-2 client-detail" v-for="project in projects" :key="project" @click="toProjectDetail(project.id)">
          {{ project.name }}
        </div>
      </div>
    </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue'
import Footer from '@/components/footer/Footer.vue'
import { ref, computed } from 'vue';
import {useStore} from 'vuex'
import { PUSH_PROJECTS,GETTER_PROJECTS,GETTER_TAGS,PUSH_TAGS, PUSH_STAFFS,GETTER_STAFFS} from '@/store/constants'
import { useRouter } from 'vue-router'
export default {
  name: 'AboutUsView',
  components:{
    Navbar,
    Footer
  },
  setup(){
    const store = useStore()
    const tags = computed(()=> store.getters[GETTER_TAGS])
    const staffs = computed(()=> store.getters[GETTER_STAFFS])
    const projects = computed(()=> store.getters[GETTER_PROJECTS])
    const router = useRouter()
    return {
      store,
      tags,
      staffs,
      projects,
      router
    }
  },
  async mounted(){
    await this.store.dispatch(PUSH_TAGS)
    await this.store.dispatch(PUSH_STAFFS)
    await this.store.dispatch(PUSH_PROJECTS)
    this.calTagElement()
    this.calClientElement()
  },
  methods:{
    calTagElement(){
      const tagContainer = document.getElementById('tag-about')
      const allRow = Math.ceil(this.tags.length / 3)
      const remainElement = (allRow * 3) - this.tags.length
      for (let i = 0; i < remainElement; i++) {
        tagContainer.insertAdjacentHTML('beforeend',`
          <div class="col-md-4 p-0">
            <div class="header-tag px-4 py-2 disabled">
              disabled
            </div>
          </div>
        `)
      }
    },
    calClientElement(){
      const clientContainer = document.getElementById('client-container')
      const allRow = Math.ceil(this.projects.length / 4)
      const remainElement = (allRow * 4) - this.projects.length
        for (let i = 0; i < remainElement; i++) {
        clientContainer.insertAdjacentHTML('beforeend',`
          <div class="col-md-3 px-4 py-2 client-detail disabled">
              disabled
          </div>
        `)
      }
    },
     toProjectDetail(projectId){
      this.router.push({name:'ProjectDetailViewUrl',params:{id:projectId}})
    }
  }
}
</script>

<style>
.header-about{
  margin-top: 150px;
  margin-bottom: 150px;
}

.about-header-name,.header-tag,.des-tag,.team-header,.team-name,.team-position,.client-header,.client-detail{
  letter-spacing: 0px;
  color: #000000;
  font-size: 18px;
  line-height: 22px;
}

.team-name{
  margin-top: 25px;
}

.about-header-content{
  font-family: "freight-big-pro";
  font-size: 50px;
  letter-spacing: 0.25px;
  color: #000000;
  line-height: 60px;
}

.tag-service-header{
  letter-spacing: 0px;
  color: #000000;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 25px;
}

.header-tag{
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}

.header-tag.disabled{
  color: transparent;
}

.des-tag{
  margin-top: 22px;
  margin-bottom: 60px;
}

.team-container{
  margin-top: 200px;
}

.team-detail{
  padding-right: 0px !important;
  padding-left: 18px !important;
  margin-bottom: 60px;
}

.team-detail img{
  aspect-ratio: 3/4;
  object-fit: cover;
}

.client-header{
  margin-top: 200px;
  margin-bottom: 30px;
}

.client-detail{
  border-bottom: 1px solid #000;
}

#client-container{
  border-top: 1px solid #000;
}

.client-detail.disabled{
  color: transparent;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 991.98px) { 
  .header-tag.disabled{
    display: none;
  }

  .header-about{
    margin-top: 64px;
    margin-bottom: 73px;
  }

  .about-header-name{
    font-size: 14px;
    margin-bottom: 44px;
  }

  .about-header-content{
    font-size: 26px;
    line-height: 30px;
  }

  .tag-service-header{
    font-size: 14px;
    margin-bottom: 26px;
    line-height: 18px;
  }

  .header-tag{
    font-size: 14px;
    line-height: 18px;
  }

  .des-tag {
    font-size: 14px;
    line-height: 18px;
    margin-top: 16px;
    margin-bottom: 26px;
  }

  .team-container{
    margin-top: 100px;
  }

  .team-detail{
    margin-bottom: 35px;
  }

  .team-detail:nth-child(odd){
    padding-right: 5px !important;
    padding-left: 0 !important;
  }

  .team-detail:nth-child(even){
    padding-right: 0px !important;
    padding-left: 5px !important;
  }

  .team-header{
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 30px;
  }

  .team-name{
    margin-top: 6px;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 15px;
  }

  .team-position{
    font-size: 14px;
    line-height: 18px;
  }

  .client-header {
    margin-top: 80px;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 22.5px;
  }

  #client-container{
    border: none;
  }

  .client-detail:first-child{
    border-top: 1px solid #000;
  }

  .client-detail{
    font-size: 14px;
    line-height: 18px;
  }

  .client-detail.disabled{
    display: none;
  }
}


.client-detail{
  cursor: pointer;
}


</style>
