<template>
    <NavbarBackOffice />
    <div class="container">
        <div class="d-flex justify-content-between align-items-center py-4">
            <h2 class="back-office-header">Tag</h2>
            <div>
                <button class="btn btn-add" @click="addTag('add')"><MDBIcon icon="plus" iconStyle="fas" size="1x" /> Add tag</button>
            </div>
        </div>
        <div class="b-header">
            <div class="row m-0 py-2">
                <div class="col-3 ps-3">
                    Tag name
                </div>
                <div class="col-6 ps-3">
                    Description
                </div>
                <div class="col-3 ps-3">
                    Action
                </div>
            </div>
        </div>
        <div class="b-content mt-2">
            <div v-for="tag in tags" :key="tag.id" class="row m-0 py-2">
                 <div class="col-3 ps-3 d-flex align-items-center">
                    {{tag.name}}
                </div>
                <div class="col-6 ps-3 d-flex align-items-center">
                    <span class="cut-line-1">{{tag.description}}</span>
                </div>
                <div class="col-3 ps-3">
                    <button class="btn btn-edit" @click="()=>addTag(tag._id)">EDIT</button>
                    <button class="btn btn-delete" @click="()=>{modalContent=tag,tagDeleteModal=true}">Delete</button>
                </div>
            </div>
        </div>
    </div>
      <MDBModal
        id="tagDeleteModal"
        tabindex="-1"
        labelledby="tagDeleteModalLabel"
        v-model="tagDeleteModal"
    >
        <MDBModalBody>
            <h2 class="confirm-delete text-center mt-4 mb-4">Confirm delete</h2>
            <p class="detail-delete text-center mb-4">Are you sure you want to delete?</p>
            <MDBBtn class="d-block w-100 mb-3 confirm-btn" @click="deleteTag(modalContent._id)">CONFIRM</MDBBtn>
            <MDBBtn class="d-block w-100 close-btn mb-4" @click="tagDeleteModal=false">Close</MDBBtn>
        </MDBModalBody>
            
    </MDBModal>
</template>

<script>
    import { ref, computed } from 'vue';
    import { MDBIcon, MDBModal,
    MDBModalBody,
    MDBBtn, } from 'mdb-vue-ui-kit';
    import {useStore} from 'vuex'
    import { PUSH_TAGS,GETTER_TAGS,DELETE_TAG } from '@/store/constants'
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    export default {
        name: 'TagBackOfficeView',
        components:{
            NavbarBackOffice,
            MDBIcon,
            MDBModal,
            MDBModalBody,
            MDBBtn,
        },
        setup(){
            const store = useStore()
            const token = localStorage.getItem("token")
            const tags = computed(()=> store.getters[GETTER_TAGS])
            const tagDeleteModal = ref(false);
            return {
                token,
                tags,
                store,
                tagDeleteModal
            }
        },
        async mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }
            await this.store.dispatch(PUSH_TAGS)
        },
        methods:{
            addTag(tagId){
                this.$router.push({name:'TagManagementViewUrl',params:{id:tagId}})
            },
            async deleteTag(tagId){
                await this.store.dispatch(DELETE_TAG,tagId)
                this.tagDeleteModal = false
            }
        },
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

.cut-line-1{
    height: 23px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}


.ck-editor__main{
  color: black !important;
}
</style>
