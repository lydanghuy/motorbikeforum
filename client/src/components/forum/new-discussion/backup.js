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
            category: this.props.match.params.type,
            newid:""
        }
        console.log(this.props.match.params.type)
    }
    
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
      async new1(){
        let response = await fetch('/api/threads', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            title:this.state.title,
            content:this.state.content,
            category: this.state.category
          })
        });
        let responseJSON = await response.json();
        this.setState({newid: responseJSON._id})
      }
      new(){
        this.new1();
        alert("1")
        window.location.assign("https://motorbikeforum.herokuapp.com/forum/subforum/"+this.state.category+"/"+this.state._id)        

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