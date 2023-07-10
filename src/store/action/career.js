import getCareers from '@/api/career/getCareers.js'
import deleteCareer from '@/api/career/deleteCareer.js'

import { ADD_CAREERS_STATE,PUSH_CAREERS,DELETE_CAREER} from '@/store/constants'

const career_actions = {
    [PUSH_CAREERS]: async (context) =>{
        const careers = await getCareers()
        if(careers){
            context.commit(ADD_CAREERS_STATE,careers)
        }
    },
    [DELETE_CAREER]:async (context,careerId) =>{
        await deleteCareer(careerId)
        const careers = await getCareers()
        if(careers){
            context.commit(ADD_CAREERS_STATE,careers)
        } else{
            context.commit(ADD_CAREERS_STATE,null)
        }
    }
}

export default career_actions