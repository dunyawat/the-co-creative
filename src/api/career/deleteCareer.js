import axios from "axios";

const deleteCareer = async (careerId) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let career = null

    await axios
        .delete(`${baseUrl}/career/${careerId}`)
        .then((respone) => (career = respone))
        .catch((e)=>{
            alert(e)
        })
    return career
}

export default deleteCareer