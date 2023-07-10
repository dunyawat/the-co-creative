import tag_actions from "./action/tag"
import staff_actions from "./action/staff"
import career_actions from "./action/career"
import project_actions from "./action/project"

const actions = {
    ...tag_actions,
    ...staff_actions,
    ...career_actions,
    ...project_actions
}

export default actions