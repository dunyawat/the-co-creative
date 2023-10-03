import axios from "axios";

const postContact = async (mailData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let responseMail = null
    
    await axios
        .post(`${baseUrl}/mail`,mailData)
        .then((respone) => (responseMail = respone))
        .catch((e)=>{
            console.log(e)
        })
    return responseMail
}

export default postContact
