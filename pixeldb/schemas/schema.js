// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import user from './user'
import category from './category'
import post from './post'
import downloads from './downloads'
import followers from './followers'
import likes from './likes'
import social from './social'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    user,
    category,
    post,
    downloads,
    followers,
    likes,
    social,
  ]),
})
