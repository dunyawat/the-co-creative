<template>
    <NavbarBackOffice />
    <form class="needs-validation" tag="form" novalidate @submit.prevent="checkForm">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center py-4">
                <h2 class="back-office-header">Add tag</h2>
                <div>
                    <button class="btn btn-add" @click="backToBackOffice">Back</button>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="tagName">Tag Name</label>
                        <MDBInput
                            class="form-control input-b" 
                            required 
                            type="text" 
                            name="tagName" 
                            id="tagName" 
                            v-model="tagName" 
                            invalid-feedback="Please provide Tag Name"
                        />
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="tagDescription">Description</label>
                        <MDBTextarea
                            class="text-area-b form-control input-b" 
                            name="tagDescription" 
                            id="tagDescription"  
                            v-model="tagDescription"
                            required
                            invalid-feedback="Please provide Description"
                        />
                    </div>
                </div>
            </div>
            <div>
                <!-- @click="addNewTag()" -->
                <button v-if="id == 'add'" type="submit" class="btn confirm-btn px-5" >Add</button>
                <button v-else class="btn confirm-btn px-5" type="submit">Save</button>
                 <!-- @click="editTag()" -->
            </div>
        </div>
    </form>
  
   

 
</template>
<script>
    import { ref } from 'vue';
    import getTag from '@/api/tag/getTag.js'
    import addTag from '@/api/tag/addTag.js'
    import updateTag from '@/api/tag/updateTag.js'
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    import { MDBInput,MDBTextarea } from "mdb-vue-ui-kit";
    import { TRIGGER_LOADING } from '@/store/constants'
    import {useStore} from 'vuex'
    
    
    export default {
        name: 'TagManegementView',
        components:{
            NavbarBackOffice,
            MDBInput,
            MDBTextarea
        },  
         setup(){
            const store = useStore()
            const token = localStorage.getItem("token")
            const tagName = ref('')
            const tagDescription = ref('')
            const id = ref('')
            return {
                token,
                tagName,
                tagDescription,
                id,
                store,
            }
        },
        async mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }

            this.id = this.$route.params.id
            await this.store.commit(TRIGGER_LOADING, true)
            const tagData = await getTag(this.$route.params.id)
            await this.store.commit(TRIGGER_LOADING, false)
            console.log(tagData)
            this.tagName = tagData.name
            this.tagDescription = tagData.description
        },
        
        methods:{
            async addNewTag(){
                const tagData = {
                    name:this.tagName,
                    description:this.tagDescription
                }
                await this.store.commit(TRIGGER_LOADING, true)
                const status = await addTag(tagData)
                await this.store.commit(TRIGGER_LOADING, false)
                if(status.status == 201){
                    this.$router.push({name:'TagBackOfficeViewUrl'})
                } else{
                    alert('Failed to create')
                }
            },
            async editTag(){
                const tagData = {
                    name:this.tagName,
                    description:this.tagDescription
                }
                await this.store.commit(TRIGGER_LOADING, true)
                const status = await updateTag(this.$route.params.id,tagData)
                await this.store.commit(TRIGGER_LOADING, false)
                console.log(status)
                if(status.status == 200){
                    this.$router.push({name:'TagBackOfficeViewUrl'})
                } else{
                    alert('The update was unsuccessful.')
                }
            },
            backToBackOffice(){
                this.$router.push({name:'TagBackOfficeViewUrl'})
            },
            checkForm(event){
                event.target.classList.add('was-validated');
                this.countryCardValidated = true
                this.countryCreateCardValidated = true
                const inputArray = Object.values(event.target)
                this.checkvalidate = []
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
                        this.addNewTag()
                    } else{
                        this.editTag()
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
