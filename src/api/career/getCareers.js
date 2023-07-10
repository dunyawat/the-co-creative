import axios from "axios";

const getCareers = async () => {
    const baseUrl = import.meta.env.VITE_APP_API_URL
    
    let careers = null

    await axios
        .get(`${baseUrl}/career`)
        .then((respone) => (careers = respone.data.data))
        .catch((e)=>{
            careers == null
        })
    return careers  
}

export default getCareers