<template>
<div class="career-page">
    <Navbar />
    <div class="career-header-container px-4">
      <div class="row m-0">
        <div class="col-lg-4 p-0">
          <div class="career-header">
            Career
          </div>
        </div>
        <div class="col-lg-8 p-0">
          <div class="career-header-content">
            We’re a purpose-driven studio, always aiming to create beautiful, meaningful, and responsible brands. We value social and environmental sustainability and believe that diversity and inclusion within our organization is critical to the success of our company and our clients. We seek to recruit, develop, and retain talented people who share our values.
          </div>
        </div>
      </div>
    </div>
    <div>
    <MDBAccordion v-model="activeItem" flush>
      <MDBAccordionItem
        v-for="career in careers"
        :key="career._id"
        :headerTitle="career.name"
        :collapseId="career._id"
      >
      <div class="row career-item mx-0" v-if="career.responsibilities">
        <div class="col-md-4 p-0 career-item-header">Responsibilities</div>
        <div class="col-md-8 p-0 career-item-content">
          <div v-html="career.responsibilities"></div>
        </div>
      </div>
      <div class="row career-item mx-0" v-if="career.requirements">
        <div class="col-md-4 p-0 career-item-header">Requirements</div>
        <div class="col-md-8 p-0 career-item-content">
          <div v-html="career.requirements"></div>
        </div>
      </div>
         <div class="row career-item mx-0" v-if="career.personal_attributes">
        <div class="col-md-4 p-0  career-item-header">Personal Attributes</div>
        <div class="col-md-8 p-0 career-item-content">
          <div v-html="career.personal_attributes"></div>
        </div>
      </div>
      </MDBAccordionItem>
  </MDBAccordion>
    </div>
</div>
<Footer />

</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue'
import Footer from '@/components/footer/Footer.vue'
import { MDBAccordion, MDBAccordionItem } from "mdb-vue-ui-kit";
import {useStore} from 'vuex'
import { PUSH_CAREERS,GETTER_CAREERS,DELETE_CAREER,TRIGGER_LOADING } from '@/store/constants'
import { ref,computed } from "vue";
export default {
  name: 'CareerView',
  components:{
    Navbar,
    Footer,
    MDBAccordion,
    MDBAccordionItem
  },
  setup(){
    const activeItem = ref('');
    const store = useStore()
    const careers = computed(()=> store.getters[GETTER_CAREERS])
    return {
      activeItem,
      careers,
      store,
    }
  },
  async mounted(){
     await this.store.commit(TRIGGER_LOADING,true)
    await this.store.dispatch(PUSH_CAREERS)
     await this.store.commit(TRIGGER_LOADING,false)
  },
  methods:{
    toProject(tag){
      this.router.push({name:'ProjectView',query:{tag:tag}})
    },
  }
}
</script>

<style>
.career-header-container{
  margin-top: 85px;
  margin-bottom: 70px;
}

.career-header{
  font-family: "freight-big-pro";
  font-weight: 300;
  font-size: 100px;
  letter-spacing: 0px;
  color: #000000;
  line-height: 105px;
}

.career-header-content{
   font-family: "freight-big-pro";
   font-weight: 300;
   font-size: 40px;
   line-height: 45px;
   letter-spacing: 0.25px;
    color: #000000;
}

.accordion-item:first-child .accordion-button{
    border-top: 1px solid #000 !important;
}

.accordion-button{
  border-bottom: 1px solid #000 !important;
}

.accordion-button.collapsed{
  border-bottom:none !important
}

.accordion-button::after {
  display: none !important;
}

.accordion-flush .accordion-item {
    border-bottom: 1px solid #000 !important;
}

.accordion-button{
  letter-spacing: 0px !important;
  text-transform: uppercase !important;
  font-size: 50px !important;
  font-weight: 300 !important;
  color: #000 !important;
  padding-top: 80px !important;
  padding-bottom: 80px !important;
  line-height: 105px !important;
}

.accordion-body{
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.career-item{
  margin-top: 60px !important;
  margin-bottom: 60px !important;
}
.career-item-header{
  letter-spacing: 0px;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
}
.career-item-content{
  font-size: 22px;
  font-weight: 300;
}

.career-page .footer-logo{
  margin-top: -1px;
}

.accordion-header{
  position: relative;
}

.accordion-header:hover::after{
  z-index: 3 !important;
}

.accordion-header:hover .accordion-button{
  background-color: #F0F0F0;
}

.accordion-header::after{
  content: '';
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1.15rem;
  z-index: -1;
  width: 71px;
  height: 30px;
  background-image: url('@/assets/images/up.png');
  background-size: 100% 100%;
}

@media (max-width: 767.98px) { 
  .accordion-header::after{
      width: 40px !important;
      height: 20px  !important;;
    }
}




.accordion-header:has(.collapsed)::after{
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1.15rem;
  z-index: -1;
  width: 71px;
  height: 30px;
  background-image: url('@/assets/images/down.png');
  background-size: 100% 100%;
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 1440.98px) { 
    .career-header{
      font-size: 70px;
      line-height: 105px;
    }

    .career-header-content{
      font-size: 30px;
      line-height: 35px;
    }

    .accordion-button{
      font-size: 30px !important;
      line-height: 35px !important;
    }
}

@media (max-width: 991.98px) { 
  .career-header{
    margin-bottom: 26.5px;
  }
}

@media (max-width: 767.98px) { 
  .career-header-container{
    margin-top: 25px;
    margin-bottom: 75px;
  }
  .career-header{
    margin-bottom: 26.5px;
    font-size: 40px;
    line-height: 49px;
  }

  .career-header-content{
    font-size: 24px;
    line-height: 28px;
  }

  .accordion-button{
    font-size: 20px !important;
    line-height: 28px !important;
    padding-bottom: 30px !important;
    padding-top: 30px !important;
  }

  .career-item{
    margin-top: 35px !important;
    margin-bottom: 35px !important;
  }

  .career-item-header{
    font-size: 14px;
    margin-bottom: 20px;
  }

  .career-item-content{
    font-size: 14px;
  }
}

.accordion-button.collapsed .fa-chevron-up{
  transform: rotate(180deg);
}

.accordion-button:hover {
  background-color: #F0F0F0;
}

.accordion-flush .accordion-button:not(.collapsed):hover{
  background-color: #F0F0F0;
}

.career-item-content p, .career-item-content ol,.career-item-content li{
  font-size: 14px;
  line-height: 18px;
}

</style>
