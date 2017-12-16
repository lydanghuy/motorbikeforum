import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import Home from '../home/home'
import Forum from '../forum/forum'
import Categories from '../categories/categories'
import ScooterList from '../categories/scooter-list/scooter-list'
import UnderboneList from '../categories/underbone-list/underbone-list'
import SportbikeList from '../categories/motorbike-list/motorbike-list'
import Login from '../forum/login/login'
import Signup from '../forum/register/register'
import {Route} from 'react-router-dom'
import Contact from '../contact/contact';
import Forget from '../forum/forget/forget';
import Reset from '../forum/reset/reset';
import Info from '../categories/info';
import Legal from '../legal/legal';

class Main extends Component {
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/contact' component={Contact}/>
                    <Route exact path='/categories' component={Categories}/>
                    <Route path='/forum' component={Forum}/>
                    <Route exact path='/categories/scooter' component={ScooterList}/>
                    <Route exact path='/categories/underbone' component={UnderboneList}/>
                    <Route exact path='/categories/sportbike' component={SportbikeList}/>
                    <Route path='/categories/:infoid' component={Info}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Signup}></Route>
                    <Route path='/forget' component={Forget}/>
                    <Route path='/reset/:resettoken' component={Reset}/>
                    <Route path='/legal' component={Legal}/>
                </Switch>
            </div>
            
        )
    }
}

export default Main