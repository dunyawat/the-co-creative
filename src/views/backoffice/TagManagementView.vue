<template>
    <NavbarBackOffice />
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
                    <input class="form-control input-b" required type="text" name="tagName" id="tagName" v-model="tagName" >
                </div>
            </div>
        </div>
         <div class="row m-0">
            <div class="col-6 p-0">
                <div class="form-group mb-3">
                    <label class="label-b" for="tagDescription">Description</label>
                    <textarea class="text-area-b form-control input-b" name="tagDescription" id="tagDescription"  v-model="tagDescription" ></textarea>
                </div>
            </div>
        </div>
        <div>
            <button v-if="id == 'add'" class="btn confirm-btn px-5" @click="addNewTag()">Add</button>
            <button v-else class="btn confirm-btn px-5"  @click="editTag()">Save</button>
        </div>
    </div>
   

 
</template>
<script>
    import { ref } from 'vue';
    import getTag from '@/api/tag/getTag.js'
    import addTag from '@/api/tag/addTag.js'
    import updateTag from '@/api/tag/updateTag.js'
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    
    export default {
        name: 'TagManegementView',
        components:{
            NavbarBackOffice
        },  
         setup(){
            const token = localStorage.getItem("token")
            const tagName = ref('')
            const tagDescription = ref('')
            const id = ref('')
            return {
                token,
                tagName,
                tagDescription,
                id,
            }
        },
        async mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }
            this.id = this.$route.params.id
            const tagData = await getTag(this.$route.params.id)
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
                const status = await addTag(tagData)
                if(status.status == 201){
                    this.$router.push({name:'TagBackOfficeViewUrl'})
                }
            },
            async editTag(){
                const tagData = {
                    name:this.tagName,
                    description:this.tagDescription
                }
                const status = await updateTag(this.$route.params.id,tagData)
                console.log(status)
                if(status.status == 200){
                    this.$router.push({name:'TagBackOfficeViewUrl'})
                }
            },
            backToBackOffice(){
                this.$router.push({name:'TagBackOfficeViewUrl'})
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
