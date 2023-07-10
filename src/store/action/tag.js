import getTags from '@/api/tag/getTags.js'
import deleteTag from '@/api/tag/deleteTag.js'

import { ADD_TAGS_STATE,PUSH_TAGS,DELETE_TAG} from '@/store/constants'

const tag_actions = {
    [PUSH_TAGS]: async (context) =>{
        const tags = await getTags()
        if(tags){
            context.commit(ADD_TAGS_STATE,tags)
        }
    },
    [DELETE_TAG]:async (context,tagId) =>{
        await deleteTag(tagId)
        const tags = await getTags()
        if(tags){
            context.commit(ADD_TAGS_STATE,tags)
        } else{
            context.commit(ADD_TAGS_STATE,null)
        }
    }
}

export default tag_actions