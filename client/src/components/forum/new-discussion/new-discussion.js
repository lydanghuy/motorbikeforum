import React, { Component } from 'react'
import './style.css'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
class NewDiscussion extends Component{
    constructor(props){
        super(props);
        this.state={
            title:"",
            content:"",
            category: this.props.match.params.type
        }
        console.log(this.props.match.params.type)
    }
    
    handleChange = event => {
        this.setState({
          [event.target.id] : event.target.value
        });
      }
      new(){
        const promise = axios({
            method: 'post',
            url: "/api/threads",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem("token")}`
            },
            data: this.state
        })
        promise
        .then((response)=>{
            alert("New discussion has been created");
            window.location.assign("https://motorbikeforum.herokuapp.com/forum/subforum/"+this.state.category+"/"+response.data.thread._id)
        })
        .catch((error)=>{
            alert(error)
        })
    }
    render(){
        
        return(
            <div className="container">
                <h2>Create new discussion</h2>
                <form className="">
                    <textarea className="title" name="" id="title" row="1" placeholder="Title" value={this.state.title}
          onChange={this.handleChange}></textarea>   
                    <textarea className="discuss" name="" id="content" placeholder="Your problem" value={this.state.content}
          onChange={this.handleChange}></textarea> 
                    <div className="row"><button type="submit" className="btn btn-primary ml-auto" onClick={this.new.bind(this)}>Submit</button> </div>     
                </form>
            </div>
        )
    }
}
export default NewDiscussion