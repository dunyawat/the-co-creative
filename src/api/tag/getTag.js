import axios from "axios";

const getTag = async (tagId) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let tag = null

    await axios
        .get(`${baseUrl}/tag/${tagId}`)
        .then((respone) => (tag = respone.data.data))
        .catch((e)=>{
            tag == null
        })
    return tag  
}

export default getTag