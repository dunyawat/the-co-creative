import axios from "axios";

const getStaffs = async () => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let staffs = null

    await axios
        .get(`${baseUrl}/staff`)
        .then((respone) => (staffs = respone.data.data))
        .catch((e)=>{
            staffs == null
        })
    return staffs  
}

export default getStaffs