<template>
<div>
  <Navbar :callbackMobile="toProject"/>
    <h1 class="inquiries-header px-4">Client Inquiries</h1>
    <div class="px-4">
      <div class="row m-0">
        <div class="col-lg-6 p-0">
          <div class="inquiries-content pe-md-4">
             We’re passionate about working with forward- 
          thinking businesses that understand the power and 
          influence brands can have today. We believe that 
          when we connect beautiful brands with responsible
           ideas, we raise the collective consciousness and create
            a better future for everyone.
          </div>
          <div class="inquiries-address">
            <h3>THE CO-CREATIVE</h3>
            <p>
              Pu Hai Properties Buiding, <br>
              1974/1, ROOM 202, New Phetchaburi Rd.,<br>
              Bangkapi, Hueykwang, BKK 10310
            </p>
            <div>
              <a href="tel:+66989296523">(66) 098-929-6523</a>
              <a href="https://www.instagram.com/theco_creative/">Instagram</a>
              <a href="mailto:hello@the-cocreative.com">hello@the-cocreative.com</a>
            </div>
          </div>
        </div>
        <div class="col-lg-5 p-0 inquiries-form">
          <div class="form-group mb-2">
            <input class="form-control input-inquiries" @change="checkForm" v-model="name" required type="text" placeholder="* NAME">
          </div>
          <div class="form-group mb-2">
            <input class="form-control input-inquiries" @change="checkForm" v-model="company" required type="text" placeholder="* COMPANY NAME">
          </div>
           <div class="form-group mb-2">
            <input class="form-control input-inquiries" @change="checkForm" maxlength="10" required v-model="phone" type="text" placeholder="* CONTACT PHONE">
          </div>
           <div class="form-group mb-2">
            <input class="form-control input-inquiries" @change="checkForm" required type="email" v-model="email" placeholder="* EMAIL ADDRESS">
          </div>
            <div class="form-group mb-2">
            <input class="form-control input-inquiries" @change="checkForm" required type="text" v-model="budget" placeholder="* ESTIMATE BUDGET FOR SERVICES (THB)">
          </div>
          <div>
            <div class="row">
              <div class="col-lg-6"> 
                <div class="form-group mb-2">
                  <input class="form-control input-inquiries" @change="checkForm" v-model="launch_month" required type="text" placeholder="* LAUNCH MONTH">
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-2">
                  <input class="form-control input-inquiries" @change="checkForm" required v-model="launch_year" type="text" placeholder="* LAUNCH YEAR">
                </div>
              </div>
            </div>
          </div>
          <div class="form-group mb-2">
            <textarea rows="4" class="form-control input-inquiries" @change="checkForm" v-model="about_company" placeholder="TELL US A LITTLE BIT ABOUT YOUR COMPANY"></textarea>
          </div>
          <div>
            <h3 class="input-inquiries-header">REQUESTED SERVICES</h3>
            <h3 class="input-inquiries-header-muted mb-3">Please check all that apply.</h3>
            <div class="row m-0">
              <label class="col-lg-6 p-0 position-relative label-checkbox" v-for="tag in tags" :key="tag._id">
                <input type="checkbox" class="tag-check" @change="checkForm" :value="tag.name" />
                <span class="checkmark"></span>
                <span class="tag-name-inquiries">{{tag.name}}</span>
              </label>
            </div>
            <div class="form-group mt-4">
              <button :class="this.checkInput ? 'btn btn-inquiries-submit checked' : 'btn btn-inquiries-submit' " @click="submitForm">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-1 p-0"></div>
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
import { PUSH_TAGS,GETTER_TAGS,DELETE_TAG,TRIGGER_LOADING } from '@/store/constants'
import postContact from '@/api/contact/postContact.js'
export default {
  name: 'ClientView',
  components:{
    Navbar,
    Footer
  },
  setup(){
    const store = useStore()
    const tags = computed(()=> store.getters[GETTER_TAGS])
    const confirmTag = ([])
    const name = ref('')
    const company = ref('')
    const phone = ref('')
    const budget = ref('')
    const email = ref('')
    const launch_month = ref('')
    const launch_year = ref('')
    const about_company = ref('')
    const checkInput = ref(false)
    return {
        tags,
        store,
        confirmTag,
        name,
        company,
        phone,
        email,
        budget,
        launch_month,
        launch_year,
        about_company,
        checkInput
    }
  },
  async mounted(){
    await this.store.commit(TRIGGER_LOADING,true)
    await this.store.dispatch(PUSH_TAGS)
    await this.store.commit(TRIGGER_LOADING,false)
  },
  methods:{
      testTag(){
        this.confirmTag = []
        const checkboxs = document.querySelectorAll('.tag-check') 
        console.log(checkboxs)
        checkboxs.forEach(checkbox=>{
            if(checkbox.checked){
                this.confirmTag.push(checkbox.value)
            }
        })
        // this.store.commit(ADD_TEXT_CHECK,this.confirmTag)
    },
    unChecked(){
      this.confirmTag = []
      const checkboxs = document.querySelectorAll('.tag-check') 
      checkboxs.forEach(checkbox=>{
          checkbox.checked = false
      })
    },
    async checkForm(){
      await this.testTag()
      console.log(this.confirmTag)
      console.log(this.name)
      console.log(this.company)
      console.log(this.phone)
      console.log(this.budget)
      console.log(this.email)
      console.log(this.launch_month)
      console.log(this.launch_year)
      console.log(this.about_company)

      if(this.confirmTag.length && this.name && this.company && this.phone && this.budget && this.email && this.launch_month && this.launch_year){
        this.checkInput = true
        console.log(this.checkInput)
      } else {
        this.checkInput = false
        console.log(this.checkInput)
      }
    },
    async submitForm(){

      await this.testTag()

      const dataForm = {
        name: this.name,
        company:this.company,
        phone:this.phone,
        email:this.email,
        budget:this.budget,
        launch_month: this.launch_month,
        launch_year:this.launch_year,
        about_company:this.about_company,
        tag:this.confirmTag
      }

      const response = await postContact(dataForm)

      if(response.status = 201){
        alert('Email successfully sent')
          this.confirmTag = ''
          this.name = ''
          this.company = ''
          this.phone = ''
          this.budget = ''
          this.email = ''
          this.launch_month = ''
          this.launch_year = ''
          this.about_company = ''
          this.unChecked()
      } else{
        alert('Email failed to send')
      }
      
    },
      toProject(tag){
            this.router.push({name:'ProjectView',query:{tag:tag}})
          },
  }
}
</script>

<style scoped>

input.tag-check{
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}


.tag-name-inquiries{
  margin-left: 30px;
  letter-spacing: 0px;
  color: #000000;
  font-size: 18px;
}
</style>

<style>
.btn.btn-inquiries-submit{
  width: 100%;
  background: #F0F0F0;
  color:black;
  border-radius: 0;
  box-shadow: unset;
  font-size: 25px;
  line-height: 30px;
  font-weight: 300;
  pointer-events: none;
}



.btn.btn-inquiries-submit.checked{
    pointer-events: unset;
    background: black;
    color: white;
    border: 1px solid black;
}

.btn.btn-inquiries-submit.checked:hover{
  border: 1px solid black;
  background: white;
  color: #000;
  box-shadow: unset;
}


.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 1px solid black;
  transform: translateY(-50%);
}



input:checked ~ .checkmark {
  background-color: black;
}



.inquiries-header{
  font-family: "freight-big-pro";
  letter-spacing: 0px;
  color: #000000;
  font-size: 100px;
  line-height: 105px;
  font-weight: 300;
  margin: 70px 0 70px 0;
}
.inquiries-content{
  font-size: 40px;
  letter-spacing: 0px;
  line-height: 46px;
  color: #000000;
  margin-bottom: 70px;
  font-weight: 300;
  font-family: "freight-big-pro";
}

.inquiries-address h3{
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0px;
  color: #000000;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.inquiries-address p{
  font-size: 16px;
  letter-spacing: 0px;
  color: #000000;
  text-transform: capitalize;
  margin-bottom: 15px;
  line-height: 20px;
}

.inquiries-address a{
  color: #000000;
  display: block;
  font-size: 16px;
  letter-spacing: 0px;
  line-height: 20px;
}

.inquiries-address a:hover{
  color: #000000;
  text-decoration: underline;
}

.form-control.input-inquiries{
  border: none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  padding-left: 0;
  padding-right: 0;
  font-size: 18px;
  color: #000;
  margin-bottom: 30px;
  font-weight: 600;
}

textarea.form-control.input-inquiries{
    border-right: 1px solid #000;
}

.form-control.input-inquiries::placeholder {
  color: #000;
  font-weight: 300;
}

.form-control.input-inquiries:hover::placeholder{
  color:#eee;
  font-weight: 300;
}

.form-control.input-inquiries:focus{
  border-color: black;
  box-shadow: unset;
  color: #000;
}

.input-inquiries-header{
  letter-spacing: 0px;
  color: #000000;
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 5px;
    font-weight: 500;
}

.input-inquiries-header-muted{
  letter-spacing: 0px;
  color: #888888;
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 5px;
    font-weight: 300;
}

.label-checkbox{
  cursor: pointer;
  font-weight: 300;
}
  

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 991.98px) { 
  .inquiries-form{
    margin-top: 62px !important;
  }
}

@media (max-width: 767.98px) { 
  .inquiries-header {
    font-size: 40px;
    line-height: 49px;
    margin-top: 60px;
    margin-bottom: 30px;
  }

  .inquiries-content{
    font-size: 16px;
    font-weight: 19px;
    margin-bottom: 29px;
  }

  .inquiries-address h3 {
    font-size: 14px;
    line-height: 18px;
  }

  .inquiries-address p {
    font-size: 14px;
  line-height: 18px;
  }

  .inquiries-address a {
    font-size: 14px;
   line-height: 18px;
  }

  .form-control.input-inquiries{
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
  }

  .input-inquiries-header{
    font-size: 14px;
    line-height: 18px;
  }

  .input-inquiries-header-muted{
    font-size: 14px;
    line-height: 18px;
  }

  .label-checkbox{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .btn.btn-inquiries-submit{
    font-size: 20px;
    padding: 20px;
  }
}


</style>
