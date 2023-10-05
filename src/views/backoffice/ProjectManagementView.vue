<template>
    <div class="dropdown-bg" v-if="dropdown2" @click="dropdownCheck"></div>
    <NavbarBackOffice  />
    <form class="needs-validation" tag="form" novalidate @submit.prevent="checkForm">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center border-b py-4">
                <h2 class="back-office-header">Add project</h2>
                <div>
                    <button class="btn btn-add" @click="backToBackOffice">Back</button>
                </div>
            </div>
            <div class="sub-header py-3">Header</div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label for="bannerColor">Color*</label>
                        <select class="form-select input-b" name="bannerColor" id="bannerColor" v-model="projectBannerStyle">
                            <option value="black">Black text</option>
                            <option value="white">White text</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="projectName">Client / Project name*</label>
                        <MDBInput 
                            class="form-control input-b" 
                            required 
                            type="text" 
                            name="projectName" 
                            id="projectName" 
                            v-model="projectName" 
                            invalid-feedback="Please provide Project name"
                        />
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="projectDescription">Project detail</label>
                        <textarea class="text-area-b form-control input-b" name="projectDescription" id="projectDescription"  v-model="projectDescription" ></textarea>
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="projectInfo">Info</label>
                        <input class="form-control input-b" required type="text" name="projectInfo" id="projectInfo" v-model="projectInfo">
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <div class="row m-0" v-for="(link,index) in projectLink" :key="index">
                    <div class="col-6 p-0">
                        <div class="form-group mb-2">
                            <label class="label-b" :for="link.link">URL</label>
                            <input class="form-control input-b" required type="text" :name="link.link" :id="link.link" v-model="link.link">
                        </div>
                    </div>
                    <div class="col-5 p-0 ps-3">
                        <div class="form-group mb-2">
                            <label class="label-b" for="link.name">Display name</label>
                            <input class="form-control input-b" required type="text" :name="link.name" :id="link.name" v-model="link.name">
                        </div>
                    </div>
                    <div class="col-1 mt-4 pt-2" @click="deleteLink(index)">
                        <MDBIcon icon="trash" iconStyle="fas" size="2x" />
                    </div>
                </div>
                <div>
                    <a @click="addMoreLink" class="btn-in-color"><MDBIcon icon="plus" iconStyle="fas" size="1x" /> Add more URL</a>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="link.name">Tag</label>
                        <div id="list1" @click="dropdownCheck" :class="dropdown2 ? 'dropdown-check-list py-1 ps-2 active' : 'dropdown-check-list py-1 ps-2' " tabindex="100">
                            <span v-if="checkTag.length" class="anchor"><span v-for="tag in checkTag" :key="tag" class="me-1">{{tag}},</span></span>
                            <span v-else class="anchor">Select Tag</span>
                        </div>
                        <div class="position-relative">
                            <ul :class=" dropdown2 ? 'items active': 'items'">
                                <li v-for="tag in tagMenu" :key="tag._id">
                                    <input v-if="tag.check" class="tag-check" type="checkbox" checked :value="tag.name" />
                                    <input v-else type="checkbox" class="tag-check" :value="tag.name" />
                                    {{tag.name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row m-0">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label class="label-b" for="staffName">Banner*</label>
                        <MDBFile v-if="project" type="file" class="form-control input-b mb-3" @change="readFileMain($event)" />
                        <MDBFile v-else required type="file" class="form-control input-b mb-3" @change="readFileMain($event)" invalid-feedback="Please provide Banner" />
                        <img v-if="project" id="main-project-image" width="400" crossorigin="anonymous" :src="baseApiUrl+'/images/'+this.projectImage" alt="">
                        <img crossorigin="anonymous" v-else id="main-project-image" width="400" src="#" alt="">
                    </div>
                </div>
            </div>

            <div class="row m-0 border-b">
                <div class="col-6 p-0">
                    <div class="form-group mb-3">
                        <label for="bannerImage">Display image*</label>
                        <MDBFile v-if="project" type="file" class="form-control input-b mb-3" @change="readFileDisplay($event)" />
                        <MDBFile 
                            v-else 
                            required 
                            type="file" 
                            class="form-control input-b mb-3"
                            invalid-feedback="Please provide Display image"
                            @change="readFileDisplay($event)"
                        />
                        <img width="300" id="display-project-image" v-if="project" crossorigin="anonymous" :src="baseApiUrl+'/images/'+this.projectImageDisplay" alt="">
                        <img width="300" id="display-project-image" v-else src="#" alt="">
                    </div>
                </div>
            </div>
            <div v-for="(section,index) in projectSection" :key="index" class="border-b">
                <div class="text" v-if="section.section_type == 'text'">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="sub-header py-3">Text</div>
                        <div>
                            <button v-if="index != 0" class="btn" @click="moveSection(index,index-1)"><MDBIcon icon="chevron-circle-up" iconStyle="fas" size="2x" /></button>
                            <button v-if="!(index == (projectSection.length - 1))" class="btn" @click="moveSection(index,index+1)"><MDBIcon icon="chevron-circle-down" iconStyle="fas" size="2x" /></button>
                            <button class="btn section-delete" @click="deleteSection(index)"><MDBIcon icon="trash" iconStyle="fas" size="2x" /></button>
                        </div>
                    </div>
                    <div class="row m-0">
                        <div class="col-6 p-0">
                            <div class="form-group mb-3">
                                <label for="sectionColor">Color*</label>
                                <select class="form-select input-b" name="sectionColor" id="sectionColor" v-model="section.theme">
                                    <option value="blackBgGray">Black text - gray bg</option>
                                    <option value="blackBgWhite">Black text - white bg</option>
                                    <option value="whiteBgBlack">White text - black bg</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row m-0">
                        <div class="col-6 p-0">
                            <div class="form-group mb-3">
                                <label for="header-section">Topic*</label>
                                <input class="form-control input-b" type="text" v-model="section.header">
                            </div>
                        </div>
                    </div>
                    <div class="row m-0">
                        <div class="col-6 p-0">
                            <div class="form-group mb-3">
                                <label for="detail-section">Detail</label>
                                <textarea class="text-area-b form-control input-b" type="text" v-model="section.details"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="section.section_type == 'image'">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="sub-header py-3">Image</div>
                        <div>
                            <button v-if="index != 0" class="btn" @click="moveSection(index,index-1)"><MDBIcon icon="chevron-circle-up" iconStyle="fas" size="2x" /></button>
                            <button v-if="!(index == (projectSection.length - 1))" class="btn" @click="moveSection(index,index+1)"><MDBIcon icon="chevron-circle-down" iconStyle="fas" size="2x" /></button>
                            <button class="btn section-delete" @click="deleteSection(index)"><MDBIcon icon="trash" iconStyle="fas" size="2x" /></button>
                        </div>
                    </div>
                    <div class="row m-0">
                        <div class="col-6 p-0">
                            <div class="form-group mb-3">
                                <input class="form-control input-b mb-3" type="file" @change="readFile($event,index)">
                                <img width="400" crossorigin="anonymous" :id="'section-image-'+index" :src="baseApiUrl+'/images/'+section.image" alt=""> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row m-0 border-b py-3">
                <div class="col-6 p-0">
                    <button @click="addSectionText()" class="btn confirm-btn btn-w-100"><MDBIcon icon="plus" iconStyle="fas" size="1x" /> Add text</button>
                    <button @click="addSectionImage()" class="btn confirm-btn btn-w-100"><MDBIcon icon="plus" iconStyle="fas" size="1x" /> Add image</button>
                </div>
            </div>
            <div class="mb-5">
                <div class="sub-header py-3">Credit</div>
                <div class="row m-0">
                    <div class="col-6 p-0">
                            <div class="form-group mb-3">
                                <label for="sectionColorCredit">Color*</label>
                                <select class="form-select input-b" name="sectionColorCredit" v-model="creditType" @change="changeCredit">
                                    <option value="blackBgGray">Black text - Grey background</option>
                                    <option value="blackBgWhite">Black text - White background</option>
                                    <option value="whiteBgBlack">White text - Black background</option>
                                </select>
                            </div>
                        </div>
                    </div>
                <div class="border-b py-3" v-for="(credit,index) in projectCredit" :key="index">
                    <div class="row m-0">
                        <div class="col-6 p-0">
                            <div class="form-group mb-2">
                                <label class="label-b" :for="credit.name">Name</label>
                                <input class="form-control input-b" required type="text" :name="credit.name" :id="credit.name"  v-model="credit.name">
                            </div>
                        </div>
                        <div class="col-5 p-0 ps-3">
                            <div class="form-group mb-2">
                                <label class="label-b" :for="credit.position_1">Position</label>
                                <input class="form-control input-b" required type="text" :name="credit.position_1" :id="credit.position_1" v-model="credit.position_1">
                            </div>
                        </div>
                            <div class="col-1 mt-4 pt-2" @click="deleteCredit(index)">
                                <MDBIcon icon="trash" iconStyle="fas" size="2x" />
                            </div>
                        </div>
                    </div>
                <div>
                    <a @click="addMoreCredit" class="btn-in-color"><MDBIcon icon="plus" iconStyle="fas" size="1x" /> Add more credit</a>
                </div>
            </div>
            <div class="mb-5">
                <!-- @click="createProject" -->
                <button class="btn confirm-btn px-5" v-if="id == 'add'" type="submit">ADD</button>
                <button class="btn confirm-btn px-5" v-else type="submit">SAVE</button>
                <!-- @click="updateProject" -->
            </div>
        </div>
    </form>
   
</template>

<script>
    import { ref, computed } from 'vue';
    import addProject from '@/api/project/addProject.js'
    import updateProject from '@/api/project/updateProject.js'
    import { MDBIcon,MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBInput, MDBFile } from 'mdb-vue-ui-kit';
    import {
        PUSH_PROJECT,
        GETTER_PROJECT,
        PUSH_TAGS,
        CREATE_LINK,
        GETTER_LINK,
        DELETE_LINK,
        GETTER_TAGS,
        PUSH_SECTION_TEXT,
        ADD_IMAGE_SECTION,
        GETTER_SECTION,
        GETTER_CREDIT,
        DELETE_CREDIT,
        CREATE_CREDIT,
        ADD_TEXT_CHECK,
        GETTER_TEXT_CHECK,
        DELETE_SECTION,
        MOVE_SECTION,
        TRIGGER_CREDIT_TYPE,
        TRIGGER_LOADING
    } from '@/store/constants'
    import {useStore} from 'vuex'
    import NavbarBackOffice from '@/components/backoffice/NavbarBackOffice.vue'

    export default {
        name: 'ProjectManagementView',
        components:{
            NavbarBackOffice,
            MDBIcon,
            MDBDropdown, 
            MDBDropdownToggle, 
            MDBDropdownMenu, 
            MDBDropdownItem,
            MDBInput,
            MDBFile
        },
        setup(){
            const token = localStorage.getItem("token")
            const id = ref('')
            const store = useStore()
            const project = computed(()=> store.getters[GETTER_PROJECT])
            const projectName = ref('')
            const projectImage = ref('')
            const projectDescription = ref('')
            const projectInfo = ref('')
            const projectLink = computed(()=> store.getters[GETTER_LINK])
            const projectTag = ref(null)
            const projectBannerStyle = ref('black')
            const projectSection = computed(()=> store.getters[GETTER_SECTION])
            const projectImage64 = ref('')
            const projectCredit = computed(()=> store.getters[GETTER_CREDIT])
            const tags = computed(()=> store.getters[GETTER_TAGS])
            const tagMenu = ref([])
            const confirmTag = ([])
            const baseApiUrl = import.meta.env.VITE_APP_API_URL
            const projectImageDisplay = ref("")
            const projectImageDisplay64 = ref("")
            const updateImage = ref(false)
            const updateImageDisplay = ref(false)
            const dropdown2 = ref(false)
            const checkTag = computed(()=> store.getters[GETTER_TEXT_CHECK])
            const creditType = ref('blackBgGray')


            return {
                token,
                id,
                store,
                project,
                projectBannerStyle,
                projectName,
                projectInfo,
                projectDescription,
                projectLink,
                tags,
                tagMenu,
                projectTag,
                confirmTag,
                projectSection,
                baseApiUrl,
                projectImage64,
                projectCredit,
                projectImage,
                projectImageDisplay,
                projectImageDisplay64,
                updateImage,
                updateImageDisplay,
                dropdown2,
                checkTag,
                creditType
            }
        },
        async mounted(){
            if(!this.token){
                this.$router.push({name:'login'})
            }
            this.id = this.$route.params.id
            if(this.$route.params.id != 'add'){
                await this.store.commit(TRIGGER_LOADING, true)
                await this.store.dispatch(PUSH_PROJECT,this.$route.params.id)
                await this.store.commit(TRIGGER_LOADING, false)
                this.projectName = this.project.name
                this.projectInfo = this.project.info
                this.projectDescription = this.project.description
                this.projectBannerStyle = this.project.style
                let imageSection =  this.project.image
                const imageFile =  await imageSection.replace('http://137.184.81.87:81/images/','');
                this.projectImage = imageFile
                let imageDisplaySection =  this.project.image_display
                const imageDisplayFile =  await imageDisplaySection.replace('http://137.184.81.87:81/images/','');
                this.projectImageDisplay = imageDisplayFile
                if(this.project.credit.length){
                    this.creditType = this.project.credit[0].credit_type
                }
                this.cutUrl()
            }

            await this.store.commit(TRIGGER_LOADING, true)
            await this.store.dispatch(PUSH_TAGS)
            await this.store.commit(TRIGGER_LOADING, false)
            this.projectTag = this.project ? this.project.tag ? this.project.tag : null : null
            await this.genMenutag()
            console.log('this.projectTag',this.projectTag)
        },
        methods:{
            addMoreLink(){
                this.store.commit(CREATE_LINK)
            },
            addMoreCredit(){
                this.store.commit(CREATE_CREDIT,this.creditType)
            },
            test(){
                console.log(this.projectLink)
            },
            deleteLink(index){
               this.store.commit(DELETE_LINK,index) 
            },
            deleteCredit(index){
               this.store.commit(DELETE_CREDIT,index) 
            },
            async genMenutag(){
                if(this.projectTag){
                    console.log('this.projectTag',this.projectTag)
                    this.tagMenu = this.tags.map(tag => {
                        if(this.projectTag.includes(tag.name)){
                            return{
                                _id: tag._id,
                                name: tag.name,
                                description: tag.description,
                                check:true
                            }
                        } else{
                             return{
                                _id: tag._id,
                                name: tag.name,
                                description: tag.description,
                                check: false
                            }
                        }
                    })


                    this.projectTag.forEach(tag=>{
                        let found = false;
                        for(var i = 0; i < this.tagMenu.length; i++) {
                            if (this.tagMenu[i].name == tag) {
                                found = true;
                                break;
                            }
                        }
                        if(!found){
                            this.tagMenu.push({
                                _id: null,
                                name: tag,
                                description: null,
                                check:true
                            })
                        }
                    })
                } else {
                    this.tagMenu = this.tags.map(tag => {
                        return{
                            _id: tag._id,
                            name: tag.name,
                            description: tag.description,
                            check:false
                        }
                    })
                }
            },
            testTag(){
                this.confirmTag = []
                const checkboxs = document.querySelectorAll('.tag-check') 
                console.log(checkboxs)
                checkboxs.forEach(checkbox=>{
                    if(checkbox.checked){
                        this.confirmTag.push(checkbox.value)
                    }
                })

                this.store.commit(ADD_TEXT_CHECK,this.confirmTag)
            },
            testSection(){
                console.log(this.project.section)
            },
            addSectionText(){
                const sectionTextData = {
                    details:"",
                    header:"",
                    image:"http://137.184.81.87:81/images/images/null",
                    section_type:"text",
                    theme:"blackBgWhite",
                    image64:null,
                    update_image:false,
                }
                this.store.commit(PUSH_SECTION_TEXT,sectionTextData)
            },
            addSectionImage(){
                const sectionImageData = {
                    details:null,
                    header:null,
                    image:null,
                    section_type:"image",
                    theme:null,
                    image64:null,
                    update_image:false,
                }
                this.store.commit(PUSH_SECTION_TEXT,sectionImageData)
            },
            async readFileMain($event){
                let file = $event.target['files'][0]
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
                    this.projectImage64 = baseURL
                    this.updateImage = true

                    console.log(this.updateImage,this.projectImage64)
                    const imgElement = document.getElementById(`main-project-image`)
                    imgElement.src = URL.createObjectURL(file)
                    };
                });
            },
             async readFileDisplay($event){
                let file = $event.target['files'][0]
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
                    this.projectImageDisplay64 = baseURL
                    this.updateImageDisplay = true
                    console.log(this.updateImageDisplay,this.projectImageDisplay64)
                    const imgElement = document.getElementById(`display-project-image`)
                    imgElement.src = URL.createObjectURL(file)
                    };
                });
            },
             async readFile($event,index) {
                let file = $event.target['files'][0]
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
                    const payload = {
                        image:baseURL,
                        index:index
                    }
                        const imgElement = document.getElementById(`section-image-${index}`)
                        imgElement.src = URL.createObjectURL(file)
                        this.store.commit(ADD_IMAGE_SECTION,payload)
                    };
                });
            },
            async createProject(){
                await this.testTag()
                const dataProject = {
                    name:this.projectName,
                    image64: this.projectImage64,
                    image_display_64: this.projectImageDisplay64,
                    description:this.projectDescription,
                    info:this.projectInfo,
                    link:this.projectLink,
                    tag:this.confirmTag,
                    style:this.projectBannerStyle,
                    section:this.projectSection,
                    credit:this.projectCredit,
                    update_image:this.updateImage,
                    update_image_display:this.updateImageDisplay
                }

                console.log(dataProject)
                await this.store.commit(TRIGGER_LOADING, true)
                const status = await addProject(dataProject)
                await this.store.commit(TRIGGER_LOADING, false)
                console.log(status)
                if(status.status == 201){
                    this.$router.push({name:'ProjectBackOfficeViewUrl'})
                } else{
                        alert('Failed to create')
                }
            },
            async updateProject(){
                await this.testTag()
                const dataProject = {
                    name:this.projectName,
                    image64: this.projectImage64,
                    image_display_64: this.projectImageDisplay64,
                    description:this.projectDescription,
                    info:this.projectInfo,
                    link:this.projectLink,
                    tag:this.confirmTag,
                    style:this.projectBannerStyle,
                    section: await this.cutUrl(),
                    credit:this.projectCredit,
                    update_image:this.updateImage,
                    update_image_display:this.updateImageDisplay,
                    image:this.projectImage,
                    image_display :this.projectImageDisplay
                }

                console.log(dataProject)
                await this.store.commit(TRIGGER_LOADING, true)
                const status = await updateProject(this.$route.params.id,dataProject)
                await this.store.commit(TRIGGER_LOADING, false)
                console.log(status)
                if(status.status == 200){
                    this.$router.push({name:'ProjectBackOfficeViewUrl'})
                } else{
                        alert('The update was unsuccessful.')
                }
            },
            backToBackOffice(){
                this.$router.push({name:'ProjectBackOfficeViewUrl'})
            },
            dropdownCheck(){
                this.dropdown2 = !this.dropdown2
                this.testTag()
            },
            deleteSection(index){
                this.store.commit(DELETE_SECTION,index)
            },
            moveSection(index,newIndex){
                const payload = {
                    currentIndex : index,
                    newIndex :newIndex
                }
                this.store.commit(MOVE_SECTION,payload)
            },

            async changeCredit(){
                await this.store.commit(TRIGGER_CREDIT_TYPE,this.creditType)
            },
            async cutUrl(){
               const dataSection =  Promise.all( await this.projectSection.map(async (section) => {
                    const imageName = await section.image.replace('http://137.184.81.87:81/images/','');
                    return {
                        details:section.details,
                        header:section.header,
                        image:imageName,
                        section_type:section.section_type,
                        theme:section.theme,
                        image64:section.image64,
                        update_image:section.update_image,
                    }
                }))
                return dataSection
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
                    if(this.$route.params.id != 'add'){
                        this.updateProject()
                    } else{
                        this.createProject()  
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

.border-b{
    border-bottom: 1px solid #000;
}

.dropdown-check-list{
    width: 100%;
    border: 1px solid #000;
    position: relative;
}

.dropdown-check-list:hover{
    cursor: pointer;
}

.items{
    position: absolute;
    opacity: 0;
    z-index: -1;
    background: #fff;
    width: 100%;
    padding: 15px;
    list-style: none;
    border: 1px  solid #000;
    border-top: none;
}

.items.active{
    opacity: 1;
    z-index: 10;
}

.dropdown-bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
}

.btn.section-delete{
    background: red;
    color: white;
}
</style>


<style scoped>
.btn.confirm-btn.btn-w-100{
    width: 49%;
}
</style>