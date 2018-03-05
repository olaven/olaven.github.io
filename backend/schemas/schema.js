import createSchema from 'part:@sanity/base/schema-creator'

import contact from "./contact"
import project from "./project"
import skills from "./skills" 
import person from "./person"

export default createSchema({
  name: 'homepage',
  types: [
    contact, 
    project, 
    skills, 
    person
  ]
})
