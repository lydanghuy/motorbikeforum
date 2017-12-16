import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './style.css'
class UnderboneList extends Component{
    render(){
        return(
            <div className="container">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Underbone/29.png')}/>
                                <Link to="/categories/29"><h4>Honda Future 125cc</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Underbone/30.png')}/>
                                <Link to="/categories/30"><h4>Honda Wave Alpha 110cc</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Underbone/31.png')}/>
                                <Link to="/categories/31"><h4>Honda Wave Rsx 110cc</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Underbone/32.jpg')}/>
                                <Link to="/categories/32"><h4>Suzuki Address</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Underbone/33.jpg')}/>
                                <Link to="/categories/33"><h4>Suzuki Raider Fi GP</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Underbone/34.jpg')}/>
                                <Link to="/categories/34"><h4>Suzuki Viva</h4></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="img-fluid" src={require('../img/Underbone/35.png')}/>
                                <Link to="/categories/35"><h4>Yamaha Exciter 150</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Underbone/36.png')}/>
                                <Link to="/categories/36"><h4>Yamaha Jupiter</h4></Link>
                            </td>
                            <td>
                                <img className="img-fluid" src={require('../img/Underbone/37.png')}/>
                                <Link to="/categories/37"><h4>Yamaha Sirius </h4></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default UnderboneList