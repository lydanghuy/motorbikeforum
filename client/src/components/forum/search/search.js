import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './style.css'

export default class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            list: []
        }
    }
    componentDidMount(){
        axios.get('/api/threads/searchbox/' + this.props.match.params.searchtext.split(" ").join("&").toLowerCase())
            .then((response)=>{
                this.setState({
                    list: response.data
                })
            })
    }

    render(){
        var rows = this.state.list.map((lists) => {
            var cells = [];
            cells.push(<td className="col-8"><Link to={`/forum/subforum/${lists.category}/${lists._id}`}>{lists.title}</Link></td>);
            cells.push(<td className="col-1">{lists.view}</td>);
            cells.push(<td className="col-2">{lists.comments.length}</td>);
            cells.push(<td className="col-1">{lists.likes.length}</td>);
            return (<tr className="d-flex">{cells}</tr>);
          });
        console.log(rows)
        return(
            <div className="container justify-content-center">
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