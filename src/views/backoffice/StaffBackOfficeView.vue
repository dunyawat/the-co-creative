<template>
    <NavbarBackOffice />
    <div class="container">
        <div class="d-flex justify-content-between align-items-center py-4">
            <h2 class="back-office-header">Team</h2>
            <div>
                <button class="btn btn-add" @click="addStaff('add')"><MDBIcon icon="plus" iconStyle="fas" size="1x" /> Add member</button>
            </div>
        </div>
        <div class="b-header">
            <div class="row m-0 py-2">
                <div class="col-3 ps-3">
                  Member name
                </div>
                <div class="col-3 ps-3">
                   Position 1
                </div>
                <div class="col-3 ps-3">
                  Position 2
                </div>
                <div class="col-3 ps-3">
                    Action
                </div>
            </div>
        </div>
        <div class="b-content mt-2">
            <div v-for="staff in staffs" :key="staff._id" class="row m-0 py-2">
                 <div class="col-3 ps-3 d-flex align-items-center">
                    <span class="cut-line-1">{{staff.name}}</span>
                </div>
                <div class="col-3 ps-3 d-flex align-items-center">
                    <span class="cut-line-1">{{staff.position_1}}</span>
                </div>
                 <div class="col-3 ps-3 d-flex align-items-center">
                    <span class="cut-line-1">{{staff.position_2}}</span>
                </div>
                <div class="col-3 ps-3">
                    <button class="btn btn-edit" @click="()=>addStaff(staff.id)">EDIT</button>
                    <button class="btn btn-delete" @click="()=>{modalContent=staff,staffDeleteModal=true}">Delete</button>
                </div>
            </div>
        </div>
    </div>
      <MDBModal
        id="staffDeleteModal"
        tabindex="-1"
        labelledby="staffDeleteModalLabel"
        v-model="staffDeleteModal"
    >
        <MDBModalBody>
            <h2 class="confirm-delete text-center mt-4 mb-4">Confirm delete</h2>
            <p class="detail-delete text-center mb-4">Are you sure you want to delete?</p>
            <MDBBtn class="d-block w-100 mb-3 confirm-btn" @click="removeStaff(modalContent.id)">CONFIRM</MDBBtn>
            <MDBBtn class="d-block w-100 close-btn mb-4" @click="staffDeleteModal=false">Close</MDBBtn>
        </MDBModalBody>
            
    </MDBModal>

            <!-- <img crossorigin="anonymous" width="100" height="100" :src="staff.image" alt=""> -->

</template>

<script>
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    import { ref, computed } from 'vue';
      import { MDBIcon, MDBModal,
    MDBModalBody,
    MDBBtn, } from 'mdb-vue-ui-kit';
    import {useStore} from 'vuex'
    import { PUSH_STAFFS,GETTER_STAFFS,DELETE_STAFF,TRIGGER_LOADING} from '@/store/constants'
    export default {
        name: 'StaffBackOfficeView',
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
            const staffs = computed(()=> store.getters[GETTER_STAFFS])
            const staffDeleteModal = ref(false);
            return {
                token,
                store,
                staffs,
                staffDeleteModal
            }
        },
        async mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }

            await this.store.commit(TRIGGER_LOADING, true)
            await this.store.dispatch(PUSH_STAFFS)
            await this.store.commit(TRIGGER_LOADING, false)
        },
        methods:{
            addStaff(staffId){
                console.log(staffId)
                this.$router.push({name:'StaffManagementViewUrl', params:{id:staffId}})
            },
            async removeStaff(staffId){
                await this.store.commit(TRIGGER_LOADING, true)
                await this.store.dispatch(DELETE_STAFF,staffId)
                await this.store.commit(TRIGGER_LOADING, false)
                this.staffDeleteModal = false
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
