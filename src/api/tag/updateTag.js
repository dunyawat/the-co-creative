import axios from "axios";

const updateTag = async (tagId,tagData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let tag = null
    
    await axios
        .put(`${baseUrl}/tag/${tagId}`,tagData)
        .then((respone) => (tag = respone))
        .catch((e)=>{
            console.log(e)
        })
    return tag  
}

export default updateTag