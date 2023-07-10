import axios from "axios";

const updateProject = async (projectId,projectData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let project = null
    
    await axios
        .put(`${baseUrl}/project/${projectId}`,projectData)
        .then((respone) => (project = respone))
        .catch((e)=>{
            console.log(e)
        })
    return project  
}

export default updateProject