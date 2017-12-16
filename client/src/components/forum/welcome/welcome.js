import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './style.css'

class User extends Component{
    constructor(props){
        super(props);
        const id = localStorage.getItem("userID");
        const name = localStorage.getItem("name");
        const status = name!=null?true:false;
        this.state={
            // id: id,
            status: status,
            name: name
        }
      }
    clear(){
        localStorage.clear("name");
        localStorage.clear("userID")
        localStorage.clear("token")
    }


    render(){
        if(this.state.status) {return(
            <div className="form-inline welcome1">
                    <div className="my-auto welcomename">Welcome, {this.state.name}</div>
                    <button className="btn btn-primary" type="submit" onClick={this.clear.bind(this)}><Link className="link" to='/login'>Sign out</Link></button> 
            </div>
        ) } else{
            return(
                <div className="form-inline signinbtn">
                    <button className="btn btn-primary mx-auto"><Link className="link" to='/login'>Sign in</Link></button>      
                </div>
            )
        }
      }
}

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state={
            text: ""
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id] : event.target.value
        })
    }

    search(){
        var searchText = this.state.text.split(" ").join("&");
        window.location.assign("https://motorbikeforum.herokuapp.com/forum/"+searchText);
       
    }

    render(){
        return(
            <div className="row">
                <div className="col-lg-8">
                    <div className="form-inline welcome searchbox">
                        <input className="form-control box ml-auto" type="text" id="text" value={this.state.text} onChange={this.handleChange} placeholder="Search"/>
                        <button className="btn btn-primary my-sm-0" type="submit" onClick={this.search.bind(this)}>Search</button>
                    </div>
                </div>
                <div className="col-lg-4"><User/></div>
            </div>
        )
    }
}
export default Welcome