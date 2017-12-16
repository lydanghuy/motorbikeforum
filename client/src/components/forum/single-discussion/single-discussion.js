import React, { Component } from 'react'
import './style.css'
import axios from 'axios'

class Comment extends Component{
    constructor(props){
        super(props);
        this.state={
            comment: ""
        }
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
      comment(){
        axios({
            method: 'post',
            url: '/api/threads/'+this.props.id+'/comments',
            data: this.state,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem("token")}`
              }
        })
        
    }

    render(){
        return(
            <div className="comment clearfix">
                <div>Your opinion</div>
                <form action="">
                        <textarea name="" id="comment" placeholder="Add comment..." value={this.state.comment}
          onChange={this.handleChange}></textarea>   
                        <button className="btn btn-primary float-right" onClick={this.comment.bind(this)}>Reply</button>                             
                </form>
            </div>
        )
    }
}

class Like extends Component{
    constructor(props){
        super(props)
        this.state={
            status: this.props.likestatus
        }
    }

    like(){
        axios({
            method: 'post',
            url: "/api/threads/"+this.props.id+"/likes",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        }).then(()=>{
            window.location.reload()
        })

    }

    deletelike(){
        axios({
            method: 'delete',
            url: "/api/threads/"+this.props.id+"/likes/"+this.props.likeid,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        }).then(()=>{
            window.location.reload()
        })

    }

    render(){
        if(this.state.status) {
            return(<button className="btn" onClick={this.deletelike.bind(this)}>Unlike</button>)
        }
        else return(<button className="btn btn-primary" onClick={this.like.bind(this)}>Like</button>)
    }
}

class DeleteThread extends Component{
    constructor(props){
        super(props)
    }
    delete(){
        axios({
            method: 'delete',
            url: "/api/threads/"+this.props.id,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response)=>{
            window.location.assign("https://motorbikeforum.herokuapp.com/forum/subforum/"+this.props.type)
        })
    }

    render(){
        if(localStorage.getItem("admin")=="true"){
            return(
                <button className="btn btn-primary ml-auto" onClick={this.delete.bind(this)}>Delete</button>
            )
        }
        else return(
            <div></div>
        )
    }
}

class DeleteComment extends Component{
    constructor(props){
        super(props)
    }
    delete(){
        axios({
            method: 'delete',
            url: "/api/threads/"+this.props.id+"/comments/"+this.props.cmtid,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response)=>{
            window.location.assign("https://motorbikeforum.herokuapp.com/forum/subforum/"+this.props.type+"/"+this.props.id)
        })
    }

    render(){
        if(localStorage.getItem("admin")=="true"){
            return(
                <div className="row"><button className="btn btn-primary ml-auto" onClick={this.delete.bind(this)}>Delete</button></div>
            )
        }
        else return(
            <div></div>
        )
    }
}

class SingleDiscussion extends Component{
    constructor(props){
        super(props);
        this.state={
            thread: null
        }
        console.log(this.props.match.params.type)
    }

    componentWillMount(){
        axios.get("/api/threads/"+this.props.match.params.id)
            .then((response)=>{
                this.setState({
                    thread: response.data
                })
            })
    }
    
    render(){
        var thread = this.state.thread;
        var likestatus = false;
        var likeid = "";
        

        if(thread!=null) 
        {   
            thread.likes.map((item)=>{
                if(item.like_author==localStorage.getItem("userID")) {
                    likeid=item._id;
                    likestatus=true;
                }
            })
            var rep_comment = () => {
                if(localStorage.getItem("name")==null) {return (<div></div>)}
                else {
                    return(
                    <Comment id={this.props.match.params.id}/>
                )}
            }
            var notfound = () => {
                window.location.assign("https://motorbikeforum.herokuapp.com/forum"+this.props.match.params.type);
                return <div></div>;
            }
            var comments = this.state.thread.comments.map((comment) => {
                var list = [];
                list.push(
                    <div className="answer">
                        <div className="answer-owner">
                            <h6>{comment.author.username}</h6>
                            <h6>{comment.createdAt.substring(0,10)}</h6>
                        </div>
                        <div className="content">{comment.comment}</div>
                        <DeleteComment cmtid={comment._id} id={this.props.match.params.id} type={this.props.match.params.type}/>

                    </div>
                );
                console.log(list);
                return list
            })
            return(
                <div className="container">
                    <div className="discussion">
                        <div className="owner">
                            <h6>{thread.thread_author.username}</h6>
                            <h6>{thread.createdAt.substring(0,10)}</h6>
                        </div>
                        <h1>{thread.title}</h1>
                        <h5>{thread.view} views {thread.comments.length} comments {thread.likes.length} like</h5>
                        <div className="content">{thread.content}</div>
                        <div className="form-inline ">
                            <Like likeid={likeid} likestatus={likestatus} id={this.props.match.params.id}/>
                            <DeleteThread id={this.props.match.params.id} type={this.props.match.params.type}/>
                        </div>
                    </div>
                    {rep_comment()}
                    {comments}
                    
                </div>
            )
        }
        else return (<div></div>)
    }
}
export default SingleDiscussion
