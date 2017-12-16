import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './style.css'
class Sub extends Component{
    constructor(props){
        super(props);
        this.state={
            list: []
        }
        // console.log(this.props.match.params.type)
    }

    componentDidMount(){
        axios.get("/api/threads/"+this.props.match.params.type)
            .then((response)=>{
                this.setState({
                    list: response.data
                })
            })
    }
    
    render(){
        var type=this.props.match.params.type;
        var rows = this.state.list.map(function(lists) {
            var cells = [];
            cells.push(<td className="col-8"><Link to={`/forum/subforum/${type}/${lists.id}`}>{lists.title}</Link></td>);
            cells.push(<td className="col-1">{lists.view}</td>);
            cells.push(<td className="col-2">{lists.comments}</td>);
            cells.push(<td className="col-1">{lists.likes}</td>);
            return <tr className="d-flex">{cells}</tr>;
          });
        var user=localStorage.getItem("name")!=null;
        var newdisc = () => {
            if(user) return(
            <div className="newdisc btn btn-primary float-right">
                <Link className="link" to={`/forum/subforum/${type}/newdiscussion`}>Create New Discussion</Link>
            </div>
            )
            else return(<div></div>)
        }
        console.log(rows)
        return(
            <div className="container justify-content-center">
            {newdisc()}
            <table className="table">
                <thead>
                    <tr className="d-flex">
                        <th className="col-8">Title</th>
                        <th className="col-1">View</th>
                        <th className="col-2">Comment</th>
                        <th className="col-1">Like</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
        )
    }
}
export default Sub