<template>
    <NavbarBackOffice />
    <div class="container">
        <div class="d-flex justify-content-between align-items-center py-4">
            <h2 class="back-office-header">Project</h2>
            <div>
                <button class="btn btn-add" @click="addProject('add')"><MDBIcon icon="plus" iconStyle="fas" size="1x" /> Add project</button>
            </div>
        </div>
        <div class="b-header">
            <div class="row m-0 py-2">
                <div class="col-3 ps-3">
                  Project name
                </div>
                <div class="col-6 ps-3">
                   Info
                </div>
                <div class="col-3 ps-3">
                    Action
                </div>
            </div>
        </div>
      <div class="b-content mt-2">
  <Draggable
    v-model="localProjects"
    item-key="id"
    handle=".drag-handle"
    @end="onDragEnd"
  >
    <template #item="{ element: project }">
      <div class="row m-0 py-2 align-items-center">
        <div class="col-3 ps-3 d-flex align-items-center">
          <span class="drag-handle me-2">☰</span>
          {{ project.name }}
        </div>

        <div class="col-6 ps-3 d-flex align-items-center">
          <span class="cut-line-1">{{ project.info }}</span>
        </div>

        <div class="col-3 ps-3">
          <button class="btn btn-edit" @click="addProject(project.id)">EDIT</button>
          <button
            class="btn btn-delete"
            @click="()=>{modalContent=project,projectDeleteModal=true}"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </Draggable>
</div>

    </div>
      <MDBModal
        id="projectDeleteModal"
        tabindex="-1"
        labelledby="projectDeleteModalLabel"
        v-model="projectDeleteModal"
    >
        <MDBModalBody>
            <h2 class="confirm-delete text-center mt-4 mb-4">Confirm delete</h2>
            <p class="detail-delete text-center mb-4">Are you sure you want to delete?</p>
            <MDBBtn class="d-block w-100 mb-3 confirm-btn" @click="removeProject(modalContent.id)">CONFIRM</MDBBtn>
            <MDBBtn class="d-block w-100 close-btn mb-4" @click="projectDeleteModal=false">Close</MDBBtn>
        </MDBModalBody>
            
    </MDBModal>
</template>

<script>
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'
    import { ref, computed, watch } from 'vue';
    import { MDBIcon, MDBModal,
    MDBModalBody,
    MDBBtn, } from 'mdb-vue-ui-kit';
    import {useStore} from 'vuex'
    import { PUSH_PROJECTS,GETTER_PROJECTS,DELETE_PROJECT,CLEAR_STATE_PROJECT,TRIGGER_LOADING} from '@/store/constants'
    import Draggable from "vuedraggable";
    import reorderProject from "@/api/project/reorderProject";
    export default {
        name: 'ProjectBackOfficeView',
        components:{
            NavbarBackOffice,
            MDBIcon,
            MDBModal,
            MDBModalBody,
            MDBBtn,
            Draggable
        },
        setup(){
            const token = localStorage.getItem("token")
            const store = useStore()
            const projects = computed(()=> store.getters[GETTER_PROJECTS])
            const projectDeleteModal = ref(false);
            const localProjects = ref([]);
            watch(
                projects,
                (val) => {
                    localProjects.value = [...val].sort(
                    (a, b) => a.sortOrder - b.sortOrder
                    );
                },
                { immediate: true }
            );

            const onDragEnd = async () => {
                const payload = localProjects.value.map((p, index) => ({
                    id: p.id,
                    sortOrder: index
                }));

                 await reorderProject(payload);
            };
            return {
                token,
                projects,
                localProjects,
                projectDeleteModal,
                onDragEnd,
                store
            }
        },
        async mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }
            await this.store.commit(TRIGGER_LOADING, true)
            await this.store.dispatch(PUSH_PROJECTS)
            await this.store.commit(TRIGGER_LOADING, false)
        },
        methods:{
            async removeProject(projectId){
                await this.store.commit(TRIGGER_LOADING, true)
                await this.store.dispatch(DELETE_PROJECT,projectId)
                await this.store.commit(TRIGGER_LOADING, false)
                this.projectDeleteModal = false
            },
            addProject(projectId){
                this.store.commit(CLEAR_STATE_PROJECT)
                this.$router.push({name:'ProjectManagementViewUrl', params:{id:projectId}})
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
