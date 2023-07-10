import axios from "axios";

const getTags = async () => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let tags = null

    await axios
        .get(`${baseUrl}/tag`)
        .then((respone) => (tags = respone.data.data))
        .catch((e)=>{
            tags == null
        })
    return tags  
}

export default getTags