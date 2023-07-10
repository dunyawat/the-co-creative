import axios from "axios";

const addStaff = async (staffData) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let staff = null
    
    await axios
        .post(`${baseUrl}/staff`,staffData)
        .then((respone) => (staff = respone))
        .catch((e)=>{
            console.log(e)
        })
    return staff
}

export default addStaff
