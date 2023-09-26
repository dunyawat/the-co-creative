<template>
    <NavbarBackOffice />
    <form class="needs-validation" tag="form" novalidate @submit.prevent="checkForm">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center py-4">
                <h2 class="back-office-header">Add member</h2>
                <div>
                    <button class="btn btn-add" @click="backToBackOffice">Back</button>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="staffName">Member name*</label>
                        <MDBInput 
                            class="form-control input-b" 
                            required 
                            type="text" 
                            name="staffName" 
                            id="staffName" 
                            v-model="staffName" 
                            invalid-feedback="Please provide Member name"
                        />
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="staffPosition_1">Position 1*</label>
                        <MDBInput 
                            class="form-control input-b" 
                            required 
                            type="text" 
                            name="staffPosition_1" 
                            id="staffPosition_1" 
                            v-model="staffPosition_1" 
                            invalid-feedback="Please provide Position 1"
                        />
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="staffPosition_2">Position 2</label>
                        <MDBInput 
                            class="form-control input-b" 
                            required 
                            type="text" 
                            name="staffPosition_2" 
                            id="staffPosition_2" 
                            v-model="staffPosition_2" 
                            invalid-feedback="Please provide Position 2"
                        />
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="staffFile">Member image*</label>
                        <MDBFile 
                            v-if="id == 'add'"
                            required 
                            class="form-control input-b" 
                            type="file" 
                            id="staffFile" 
                            @change="readFile"
                            invalid-feedback="Please provide Member image"
                        />
                         <MDBFile 
                            v-else
                            class="form-control input-b" 
                            type="file" 
                            id="staffFile" 
                            @change="readFile"
                            invalid-feedback="Please provide Member image"
                        />
                        <!-- <input type="text" v-model="staff64"> -->
                        <img class="mt-3" id="staffImage" crossorigin="anonymous" width="200" v-if="staffImage" :src="staffImage" alt="">
                        <img class="mt-3" id="staffImage" crossorigin="anonymous" width="200" v-else src="#" alt="">
                    </div>
                </div>
            </div>
            <div class="mt-4 mb-5">
                <!-- @click="addNewStaff" -->
                <button v-if="id == 'add'" class="btn confirm-btn px-5" type="submit">Add</button>
                <button v-else class="btn confirm-btn px-5"  type="submit">Save</button>
                <!-- @click="editStaff() -->
            </div>
        </div>
    </form>
</template>

<script>
    import { ref } from 'vue';
    import getStaff from '@/api/staff/getStaff.js'
    import addStaff from '@/api/staff/addStaff.js'
    import updateStaff from '@/api/staff/updateStaff.js'
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    import { MDBInput,MDBFile } from "mdb-vue-ui-kit";
    import { TRIGGER_LOADING } from '@/store/constants'
    import {useStore} from 'vuex'
    export default {
        name: 'StaffManagementView',
        components:{
            NavbarBackOffice,
            MDBInput,
            MDBFile
        },
        setup(){
            const store = useStore()
            const token = localStorage.getItem("token")
            const id = ref('')
            const staffName = ref('')
            const staff64 = ref(null)
            const staffImage = ref(null)
            const staffPosition_1 = ref('')
            const staffPosition_2 = ref('')
            return {
                token,
                id,
                staffName,
                staffImage,
                staffPosition_1,
                staffPosition_2,
                staff64,
                store,
            }
        },
        async mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }
            this.id = this.$route.params.id
            if(this.id != 'add'){
                await this.store.commit(TRIGGER_LOADING, true)
                const staffData = await getStaff(this.$route.params.id)
                await this.store.commit(TRIGGER_LOADING, false)
                console.log(staffData)
                this.staffName = staffData.name
                this.staffImage = staffData.image
                this.staffPosition_1 = staffData.position_1
                this.staffPosition_2 = staffData.position_2
            }
        },

        methods:{
            async readFile(e) {
                console.log(e)
                let file = document.querySelector('input[type=file]#staffFile')['files'][0];
                new Promise(resolve => {
                    let baseURL = "";
                    // Make new FileReader
                    let reader = new FileReader();
                    // Convert the file to base64 text
                    reader.readAsDataURL(file);
                    // on reader load somthing...
                    reader.onload = () => {
                    baseURL = reader.result;
                    resolve(baseURL);
                    const imgElement = document.getElementById(`staffImage`)
                    imgElement.src = URL.createObjectURL(file)

                    this.staff64 = baseURL
                    };
                });
            },
            async addNewStaff(){
                if(!this.staffName || !this.staffPosition_1 || !this.staff64){
                    console.log("asdlfkmsadlkfnmkla;snf")
                } else{
                    const staffData = {
                        name : this.staffName,
                        image:  this.staff64, 
                        position_1:this.staffPosition_1,
                        position_2:this.staffPosition_2,
                    }
                    await this.store.commit(TRIGGER_LOADING, true)
                    const status = await addStaff(staffData)
                    await this.store.commit(TRIGGER_LOADING, false)
                    console.log(status)
                    if(status.status == 201){
                        this.$router.push({name:'StaffBackOfficeViewUrl'})
                    }
                }
            },
            async editStaff(){
                let staffData = null
                if(this.staff64){
                    staffData = {
                        name : this.staffName,
                        image:  this.staff64, 
                        position_1:this.staffPosition_1,
                        position_2:this.staffPosition_2,
                    }
                } else{
                     staffData = {
                        name : this.staffName,
                        position_1:this.staffPosition_1,
                        position_2:this.staffPosition_2,
                    }
                }
                await this.store.commit(TRIGGER_LOADING, true)
                const status = await updateStaff(this.$route.params.id,staffData)
                await this.store.commit(TRIGGER_LOADING, false)
                if(status.status == 200){
                    this.$router.push({name:'StaffBackOfficeViewUrl'})
                }
            },
            backToBackOffice(){
                this.$router.push({name:'StaffBackOfficeViewUrl'})
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
                    if(this.id != 'add'){
                        this.editStaff()
                    } else {
                        this.addNewStaff()
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
