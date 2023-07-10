<template>
    <NavbarBackOffice />
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
                    <input class="form-control input-b" required type="text" name="tagName" id="tagName" v-model="careerName" >
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
            <button v-if="id == 'add'" class="btn confirm-btn px-5" @click="addNewCareer()">Add</button>
            <button v-else class="btn confirm-btn px-5" @click="editCareer()">Save</button>
        </div>
    </div>
</template>

<script>
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    import { ref } from 'vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import addCareer from '@/api/career/addCareer.js'
    import getCareer from '@/api/career/getCareer.js'
    import updateCareer from '@/api/career/updateCareer.js'
    export default {
        name: 'CareerManagementView',
        components:{
            NavbarBackOffice
        },
            setup(){
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
            console.log(this.id)
            const staffData = await getCareer(this.$route.params.id)
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
                const status = await addCareer(careerData)
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
                const status = await updateCareer(this.$route.params.id,careerData)
                console.log(status)
                if(status.status == 200){
                    this.$router.push({name:'CareerBackOfficeViewUrl'})
                }
            },
            backToBackOffice(){
                this.$router.push({name:'CareerBackOfficeViewUrl'})
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

</style>
