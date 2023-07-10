import axios from "axios";

const getProject = async (projectId) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL
    let project = null

    await axios
        .get(`${baseUrl}/project/${projectId}`)
        .then((respone) => (project = respone.data.data))
        .catch((e)=>{
            project == null
        })
    return project
}

export default getProject