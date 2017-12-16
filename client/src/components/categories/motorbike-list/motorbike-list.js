import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './style.css'
class SportbikeList extends Component{
    render(){
        return(
            <div className="container">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/18.png')}/>
                                <Link to="/categories/18"><h4>Ducati Diavel</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/19.png')}/>
                                <Link to="/categories/19"><h4>Ducati Monster </h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/20.png')}/>
                                <Link to="/categories/20"><h4>Ducati Panigale</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/21.jpg')}/>
                                <Link to="/categories/21"><h4>Honda CBR 150cc</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/22.png')}/>
                                <Link to="/categories/22"><h4>Kawasaki Ninja H2</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/23.png')}/>
                                <Link to="/categories/23"><h4>Kawasaki Ninja ZX-10R</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/24.png')}/>
                                <Link to="/categories/24"><h4>Kawasaki Z1000</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/25.jpg')}/>
                                <Link to="/categories/25"><h4>Suzuki GSX R150</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/26.png')}/>
                                <Link to="/categories/26"><h4>Yamaha FZ150</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/27.png')}/>
                                <Link to="/categories/27"><h4>Yamaha TFX 150</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Sportbike/28.png')}/>
                                <Link to="/categories/28"><h4>Yamaha YZF_R15</h4></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default SportbikeList