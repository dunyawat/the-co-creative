import axios from "axios";

const updateCareer = async (careerId,careerData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let career = null
    
    await axios
        .put(`${baseUrl}/career/${careerId}`,careerData)
        .then((respone) => (career = respone))
        .catch((e)=>{
            console.log(e)
        })
    return career  
}

export default updateCareer