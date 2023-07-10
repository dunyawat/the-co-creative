import axios from "axios";

const getProjects = async () => {
    const baseUrl = import.meta.env.VITE_APP_API_URL
    
    let projects = null

    await axios
        .get(`${baseUrl}/project`)
        .then((respone) => (projects = respone.data.data))
        .catch((e)=>{
            projects == null
        })
    return projects  
}

export default getProjects