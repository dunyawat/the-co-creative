import axios from "axios";

const addProject = async (projectData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let project = null
    
    await axios
        .post(`${baseUrl}/project`,projectData)
        .then((respone) => (project = respone))
        .catch((e)=>{
            console.log(e)
        })
    return project
}

export default addProject
