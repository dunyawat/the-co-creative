import {GETTER_MATCH_PROJECT,GETTER_TAGS,GETTER_STAFFS,GETTER_CAREERS,GETTER_PROJECTS,GETTER_PROJECT,GETTER_LINK,GETTER_SECTION,GETTER_CREDIT,GETTER_TEXT_CHECK,GETTER_DROPDOWN,GETTER_LOADING} from '@/store/constants' 

const getters = {
    [GETTER_TAGS](state){
        return state.tags
    },
    [GETTER_STAFFS](state){
        return state.staffs
    },
    [GETTER_CAREERS](state){
        return state.careers
    },
    [GETTER_PROJECTS](state){
        return state.projects
    },
    [GETTER_PROJECT](state){
        return state.project
    },
    [GETTER_LINK](state){
        return state.projectLinks
    },
    [GETTER_SECTION](state){
        return state.projectSection
    },
    [GETTER_CREDIT](state){
        return state.projectCredit
    },
    [GETTER_TEXT_CHECK](state){
        return state.tagCheck
    },
    [GETTER_MATCH_PROJECT](state){
        return state.matchProject
    },
    [GETTER_DROPDOWN](state){
        return state.projectDropdown
    },
    [GETTER_LOADING](state){
        return state.loading
    }

}

export default getters