import getProjects from '@/api/project/getProjects.js'
import deleteProject from '@/api/project/deleteProject.js'
import getProject from '@/api/project/getProject.js'
import getProjectsFilter from '@/api/project/getProjectsFilter.js'

import { ADD_PROJECTS_STATE,PUSH_PROJECTS,DELETE_PROJECT,PUSH_PROJECT,ADD_PROJECT_STATE,PUSH_ALL_SECTION,ADD_ALL_LINK,ADD_ALL_CREDIT,PUSH_PROJECTS_FILTER} from '@/store/constants'

const project_actions = {
    [PUSH_PROJECTS]: async (context) =>{
        const projects = await getProjects()
        if(projects){
            context.commit(ADD_PROJECTS_STATE,projects)
        }
    },

    [DELETE_PROJECT]:async (context,projectId) =>{
        await deleteProject(projectId)
        const projects = await getProjects()
        if(projects){
            context.commit(ADD_PROJECTS_STATE,projects )
        } else{
            context.commit(ADD_PROJECTS_STATE,null)
        }
    },
    [PUSH_PROJECT]:async(context,projectId)=>{
        const project = await getProject(projectId)
        if(project){
            context.commit(ADD_PROJECT_STATE,project)

            const projectSection = await  Promise.all(project.section.map( async section=>{
                console.log(section)
                let imageSection =  section.image
                const imageFile =  await imageSection.replace('http://137.184.81.87:81/images/','');
                console.log(imageFile)
                return {
                    details:section.details,
                    header:section.header,
                    image:imageFile,
                    section_type:section.section_type,
                    theme:section.theme,
                    update_image:false,
                    image64:null
                }
            }))

            context.commit(PUSH_ALL_SECTION,projectSection)
            context.commit(ADD_ALL_LINK,project.link)
            context.commit(ADD_ALL_CREDIT,project.credit)
        } else{
            context.commit(ADD_PROJECT_STATE,null)
        }
    },
    [PUSH_PROJECTS_FILTER]:async(context,tag)=>{
        console.log(tag.tag)
        if(tag.tag == 'All Services'){
            console.log("afds;mgfda;lfm")
            const projects = await getProjects()
            if(projects){
                context.commit(ADD_PROJECTS_STATE,projects)
            }
        } else {
            console.log("fsadfasdfas")
            const projects = await getProjectsFilter(tag)
            if(projects){
                context.commit(ADD_PROJECTS_STATE,projects)
            }
        }
    }
}

export default project_actions