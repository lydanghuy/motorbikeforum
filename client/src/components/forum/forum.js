import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Welcome from './welcome/welcome'
import Sub from './sub/sub'
import SingleDiscussion from './single-discussion/single-discussion'
import NewDiscussion from './new-discussion/new-discussion'
import {Route, Switch} from 'react-router-dom'
import './style.css'
import Search from './search/search';
var style={
    'margin-top': '2%'
}

class Main extends Component{
    render(){
        return(
            <div className="container" style={style}>
                <div className="row forumrow">
                    <div className="col-lg-6 col-md-12">
                        <Link to='/forum/subforum/scooter'>
                            <img className="img-fluid" src={require('./scooter.jpg')}/>
                            <div className="info">
                                SCOOTERS
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <Link to='/forum/subforum/underbone'>
                            <img className="img-fluid" src={require('./underbone.jpg')}/>
                            <div className="info">
                                UNDERBONE
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="row forumrow">
                    <div className="col-lg-6 col-md-12">
                        <Link to='/forum/subforum/sportbike'>
                                <img className="img-fluid" src={require('./motorbike.jpg')}/>
                            <div className="info">
                                MOTORBIKE
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <Link to='/forum/subforum/general'>
                            <img className="img-fluid" src={require('./accessories.jpg')}/>
                            <div className="info">
                                GENERAL
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
        )
    }
}

class SubForum extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/forum' component={Main}/>
                    <Route exact path='/forum/subforum/:type' component={Sub}/>
                    <Route path='/forum/subforum/:type/newdiscussion' component={NewDiscussion}/>
                    <Route path='/forum/subforum/:type/:id' component={SingleDiscussion}/>
                    <Route path='/forum/:searchtext' component={Search}/>
                </Switch>
            </div>
        )
    }
}

class Forum extends Component{
    render(){
        return(
            <div>
                <Welcome/>
                <SubForum/>
            </div>
        )
    }
}
export default Forum