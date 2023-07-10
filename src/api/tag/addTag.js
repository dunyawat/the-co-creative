import axios from "axios";

const addTag = async (tagData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let tag = null
    
    await axios
        .post(`${baseUrl}/tag`,tagData)
        .then((respone) => (tag = respone))
        .catch((e)=>{
            console.log(e)
        })
    return tag  
}

export default addTag