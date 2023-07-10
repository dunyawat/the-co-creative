import axios from "axios";

const getProjectsFilter = async (projectData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let projects = null
    
    await axios
        .post(`${baseUrl}/project/tag`,projectData)
        .then((respone) => (projects = respone.data.data))
        .catch((e)=>{
            console.log(e)
        })
    return projects
}

export default getProjectsFilter
