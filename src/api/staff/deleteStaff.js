import axios from "axios";

const deleteStaff = async (staffId) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL

    let staff = null

    await axios
        .delete(`${baseUrl}/staff/${staffId}`)
        .then((respone) => (staff = respone))
        .catch((e)=>{
            alert(e)
        })
    return staff
}

export default deleteStaff