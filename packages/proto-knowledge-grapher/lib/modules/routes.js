import {addRoute} from 'meteor/vulcan:core'
import '../components/Foo'

addRoute({name: 'foo', path: '/foo', componentName: 'Foo'})
