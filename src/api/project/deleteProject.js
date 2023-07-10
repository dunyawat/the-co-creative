import axios from "axios";

const deleteProject = async (projectId) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let project = null

    await axios
        .delete(`${baseUrl}/project/${projectId}`)
        .then((respone) => (project = respone))
        .catch((e)=>{
            alert(e)
        })
    return project
}

export default deleteProject