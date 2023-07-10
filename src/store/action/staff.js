import getStaffs from '@/api/staff/getStaffs.js'
import deleteStaff from '@/api/staff/deleteStaff.js'

import { ADD_STAFFS_STATE,PUSH_STAFFS,DELETE_STAFF} from '@/store/constants'

const staff_actions = {
    [PUSH_STAFFS]: async (context) =>{
        const tags = await getStaffs()
        if(tags){
            context.commit(ADD_STAFFS_STATE,tags)
        }
    },
    [DELETE_STAFF]:async (context,staffId) =>{
        await deleteStaff(staffId)
        const staffs = await getStaffs()
        if(staffs){
            context.commit(ADD_STAFFS_STATE,staffs)
        } else{
            context.commit(ADD_STAFFS_STATE,null)
        }
    }
}

export default staff_actions