import axios from "axios";

const deleteTag = async (tagId) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let tag = null

    await axios
        .delete(`${baseUrl}/tag/${tagId}`)
        .then((respone) => (tag = respone))
        .catch((e)=>{
            alert(e)
        })
    return tag
}

export default deleteTag