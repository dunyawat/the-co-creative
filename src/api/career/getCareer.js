import axios from "axios";

const getCareer = async (careerId) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL
    let career = null

    await axios
        .get(`${baseUrl}/career/${careerId}`)
        .then((respone) => (career = respone.data.data))
        .catch((e)=>{
            career == null
        })
    return career
}

export default getCareer