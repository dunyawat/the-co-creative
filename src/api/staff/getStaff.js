import axios from "axios";

const getStaff = async (staffId) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL
    let staff = null

    await axios
        .get(`${baseUrl}/staff/${staffId}`)
        .then((respone) => (staff = respone.data.data))
        .catch((e)=>{
            staff == null
        })
    return staff
}

export default getStaff