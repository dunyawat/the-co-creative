import axios from "axios";

const addCareer = async (careerData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let career = null
    
    await axios
        .post(`${baseUrl}/career`,careerData)
        .then((respone) => (career = respone))
        .catch((e)=>{
            console.log(e)
        })
    return career
}

export default addCareer
