import React, { Component } from 'react'
import Header from './components/head/head'
import Main from './components/main/main'
import Footer from './components/footer/footer'
class App extends Component {
  
  render(){
    return (
      <div className="">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App;
