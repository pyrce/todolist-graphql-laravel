import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';
import Todolists from './Todolists';
 
class Home extends Component {
    
    render() {
        return (
            <div>
          <div className="">

          </div>
<Todolists />
           </div>
        )
    }
}
    
export default Home;