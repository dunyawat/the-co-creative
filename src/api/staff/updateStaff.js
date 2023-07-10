import axios from "axios";

const updateStaff = async (staffId,staffData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let staff = null
    
    await axios
        .put(`${baseUrl}/staff/${staffId}`,staffData)
        .then((respone) => (staff = respone))
        .catch((e)=>{
            console.log(e)
        })
    return staff  
}

export default updateStaff