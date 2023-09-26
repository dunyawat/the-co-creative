<template>
    <NavbarBackOffice />
    <div class="container">
        <div class="d-flex justify-content-between align-items-center py-4">
            <h2 class="back-office-header">Career</h2>
            <div>
                <button class="btn btn-add" @click="addCareer('add')"><MDBIcon icon="plus" iconStyle="fas" size="1x" /> Add career</button>
            </div>
        </div>
        <div class="b-header">
            <div class="row m-0 py-2">
                <div class="col-3 ps-3">
                   Position name
                </div>
                <div class="col-6 ps-3">
                   Responsibilities
                </div>
                <div class="col-3 ps-3">
                    Action
                </div>
            </div>
        </div>
        <div class="b-content mt-2">
            <div v-for="career in careers" :key="career._id" class="row m-0 py-2">
                 <div class="col-3 ps-3 d-flex align-items-center">
                    {{career.name}}
                </div>
                <div class="col-6 ps-3 d-flex align-items-center">
                    <span class="cut-line-1">{{career.responsibilities}}</span>
                </div>
                <div class="col-3 ps-3">
                    <button class="btn btn-edit" @click="()=>addCareer(career._id)">EDIT</button>
                    <button class="btn btn-delete" @click="()=>{modalContent=career,careerDeleteModal=true}">Delete</button>
                </div>
            </div>
        </div>
    </div>
      <MDBModal
        id="careerDeleteModal"
        tabindex="-1"
        labelledby="careerDeleteModalLabel"
        v-model="careerDeleteModal"
    >
        <MDBModalBody>
            <h2 class="confirm-delete text-center mt-4 mb-4">Confirm delete</h2>
            <p class="detail-delete text-center mb-4">Are you sure you want to delete?</p>
            <MDBBtn class="d-block w-100 mb-3 confirm-btn" @click="deleteCareer(modalContent._id)">CONFIRM</MDBBtn>
            <MDBBtn class="d-block w-100 close-btn mb-4" @click="careerDeleteModal=false">Close</MDBBtn>
        </MDBModalBody>
            
    </MDBModal>
</template>

<script>
    import { ref, computed } from 'vue';
    import { MDBIcon, MDBModal,
    MDBModalBody,
    MDBBtn, } from 'mdb-vue-ui-kit';
     import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    import {useStore} from 'vuex'
    import { PUSH_CAREERS,GETTER_CAREERS,DELETE_CAREER,TRIGGER_LOADING } from '@/store/constants'
    export default {
        name: 'CareerBackOfficeView',
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
            const careers = computed(()=> store.getters[GETTER_CAREERS])
            const careerDeleteModal = ref(false);
            return {
                token,
                careers,
                store,
                careerDeleteModal
            }
        },
        async mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }

            await this.store.commit(TRIGGER_LOADING, true)
            await this.store.dispatch(PUSH_CAREERS)
            await this.store.commit(TRIGGER_LOADING, false)
        },
        methods:{
             async deleteCareer(careerId){
                await this.store.commit(TRIGGER_LOADING, true)
                await this.store.dispatch(DELETE_CAREER,careerId)
                await this.store.commit(TRIGGER_LOADING, false)
                this.careerDeleteModal = false
            },
            addCareer(careerId){
                this.$router.push({name:'CareerManagementViewUrl',params:{id:careerId}})
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
