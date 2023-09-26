<template>
    <NavbarBackOffice />
    <form class="needs-validation" tag="form" novalidate @submit.prevent="checkForm">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center py-4">
                <h2 class="back-office-header">Add career</h2>
                <div>
                    <button class="btn btn-add" @click="backToBackOffice">Back</button>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="tagName">Position name</label>
                        <MDBInput 
                            class="form-control input-b" 
                            required 
                            type="text" 
                            name="tagName" 
                            id="tagName" 
                            v-model="careerName"
                            invalid-feedback="Please provide Position name"
                        />
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="responsibilities">Responsibilities</label>
                        <ckeditor :editor="editor" v-model="careerResponsibilities" :config="editorConfig"></ckeditor>
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="responsibilities">Requirements</label>
                        <ckeditor :editor="editor" v-model="careerRequirements" :config="editorConfig"></ckeditor>
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="responsibilities">Personal Attributes</label>
                        <ckeditor :editor="editor" v-model="careerPersonalAttributes" :config="editorConfig"></ckeditor>
                    </div>
                </div>
            </div>
            <div class="mb-5">
                <!-- @click="addNewCareer()" -->
                <button v-if="id == 'add'" class="btn confirm-btn px-5"  type="submit">Add</button>
                <button v-else class="btn confirm-btn px-5" type="submit">Save</button>
                <!-- @click="editCareer()" -->
            </div>
        </div>
    </form>

</template>

<script>
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    import { ref } from 'vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import addCareer from '@/api/career/addCareer.js'
    import getCareer from '@/api/career/getCareer.js'
    import updateCareer from '@/api/career/updateCareer.js'
    import { MDBInput,MDBFile } from "mdb-vue-ui-kit";
    import { TRIGGER_LOADING } from '@/store/constants'
    import {useStore} from 'vuex'
    export default {
        name: 'CareerManagementView',
        components:{
            NavbarBackOffice,
            MDBInput,
            MDBFile,
        },
            setup(){
                const store = useStore()
                const token = localStorage.getItem("token")
                const careerName = ref('')
                const careerResponsibilities = ref('')
                const careerRequirements = ref('')
                const careerPersonalAttributes = ref('')
                const id = ref('')
                return {
                    token,
                    careerName,
                    careerResponsibilities,
                    careerRequirements,
                    careerPersonalAttributes,
                    id,
                    store,
                }
            },
            data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                }
            };
        },
        async mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }
            this.id = this.$route.params.id
            await this.store.commit(TRIGGER_LOADING, true)
            const staffData = await getCareer(this.$route.params.id)
            await this.store.commit(TRIGGER_LOADING, false)
            if(staffData){
                this.careerName = staffData.name
                this.careerResponsibilities = staffData.responsibilities
                this.careerRequirements = staffData.requirements
                this.careerPersonalAttributes = staffData.personal_attributes
            }
        },

        methods:{
             async addNewCareer(){
                const careerData = {
                    name: this.careerName,
                    responsibilities:this.careerResponsibilities,
                    requirements: this.careerRequirements,
                    personal_attributes:this.careerPersonalAttributes
                }
                await this.store.commit(TRIGGER_LOADING, true)
                const status = await addCareer(careerData)
                await this.store.commit(TRIGGER_LOADING, false)
                if(status.status == 201){
                    this.$router.push({name:'CareerBackOfficeViewUrl'})
                }
            },
            async editCareer(){
                console.log("Fadsga;slmglk")
                const careerData = {
                    name: this.careerName,
                    responsibilities:this.careerResponsibilities,
                    requirements: this.careerRequirements,
                    personal_attributes:this.careerPersonalAttributes
                }
                await this.store.commit(TRIGGER_LOADING, true)
                const status = await updateCareer(this.$route.params.id,careerData)
                await this.store.commit(TRIGGER_LOADING, false)
                if(status.status == 200){
                    this.$router.push({name:'CareerBackOfficeViewUrl'})
                }
            },
            backToBackOffice(){
                this.$router.push({name:'CareerBackOfficeViewUrl'})
            },
            checkForm(event){
                event.target.classList.add('was-validated');
                this.countryCardValidated = true
                this.countryCreateCardValidated = true
                const inputArray = Object.values(event.target)
                this.checkvalidate = []
                // this.validateCountryCard(this.checkvalidate)
                // this.validateCountryCreateCard(this.checkvalidate)
                inputArray.forEach((input) => {
                    if (input.tagName === 'INPUT' || input.tagName === 'SELECT') {
                        if (!input.checkValidity()) {
                            this.checkvalidate.push(false)
                        }
                    }
                })
                if (this.checkvalidate.some((item) => item === false)) {
                    return false
                } else {
                    console.log("Okkk")
                    if(this.id == 'add'){
                        this.addNewCareer()
                    } else{
                        this.editCareer()
                    }
                }
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

</style>
