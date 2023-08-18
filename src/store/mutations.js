import {
    ADD_TAGS_STATE,
    ADD_STAFFS_STATE,
    ADD_CAREERS_STATE,
    ADD_PROJECTS_STATE,
    ADD_PROJECT_STATE,
    CREATE_LINK,
    DELETE_LINK,
    PUSH_SECTION_TEXT,
    PUSH_ALL_SECTION,
    ADD_IMAGE_SECTION,
    ADD_ALL_LINK,
    ADD_ALL_CREDIT,
    DELETE_CREDIT,
    CREATE_CREDIT,
    ADD_TEXT_CHECK,
    DELETE_SECTION,
    MOVE_SECTION,
    CLEAR_STATE_PROJECT,
    ADD_MATCH_PROJECT,
    TRIGGER_DROPDOWN,
    FALSE_DROPDOWN,
    TRIGGER_CREDIT_TYPE
} from '@/store/constants'


const mutations = {
    [ADD_TAGS_STATE](state,payload){
        state.tags = payload
    },
    [ADD_STAFFS_STATE](state,payload){
        state.staffs = payload
    },
    [ADD_CAREERS_STATE](state,payload){
        state.careers = payload
    },
    [ADD_PROJECTS_STATE](state,payload){
        state.projects = payload
    },
    [ADD_PROJECT_STATE](state,payload){
        state.project = payload
    },
    [CREATE_LINK](state){
        state.projectLinks.push({
            linkName:'',
            linkUrl:''
        })
    },
    [DELETE_LINK](state,payload){
        state.projectLinks.splice(payload, 1)
    },
    [PUSH_SECTION_TEXT](state,payload){
        state.projectSection.push(payload)
    },
    [PUSH_ALL_SECTION](state,payload){
        state.projectSection = payload
    },
    [ADD_IMAGE_SECTION](state,payload){
        state.projectSection[payload.index].image64 = payload.image
        state.projectSection[payload.index].update_image = true
    },
    [ADD_ALL_LINK](state,payload){
        state.projectLinks = payload
    },
    [ADD_ALL_CREDIT](state,payload){
        state.projectCredit = payload
    },
    [DELETE_CREDIT](state,payload){
        state.projectCredit.splice(payload, 1)
    },
    [CREATE_CREDIT](state,type){
        state.projectCredit.push({
            credit_type: type,
            name:"",
            position_1:"",
            position_2:"",
        })
    },
    [ADD_TEXT_CHECK](state,payload){
        state.tagCheck = []
        state.tagCheck = payload
    },
    [DELETE_SECTION](state,payload){
        state.projectSection.splice(payload, 1)
    },
    [MOVE_SECTION](state,payload){
        console.log(payload)
        const element = state.projectSection.splice(payload.currentIndex, 1)[0];
        state.projectSection.splice(payload.newIndex, 0, element);
    },
    [CLEAR_STATE_PROJECT](state){
        state.project = null
        state.projectLinks = [],
        state.projectSection = [],
        state.projectCredit = [],
        state.tagCheck = []
    },
    [ADD_MATCH_PROJECT](state,payload){
        state.matchProject = payload
    },
    [TRIGGER_DROPDOWN](state){
        state.projectDropdown = !state.projectDropdown
    },
    [FALSE_DROPDOWN](state){
        state.projectDropdown = false
    },
    [TRIGGER_CREDIT_TYPE](state,type){
        state.projectCredit.forEach(element => {
                element.credit_type = type
        });
    }
}

export default mutations