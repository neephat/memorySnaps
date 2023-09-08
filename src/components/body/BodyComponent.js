import React, { Component } from 'react'
import { Navigate, Route, Routes} from 'react-router-dom'
import Contact from './Contact'
import Gallery from './Gallery'
import Auth from '../auth/Auth'
import { connect } from 'react-redux'
import { authCheck } from '../../redux/authActionCreators'
import Logout from '../auth/Logout'

const mapStateToProps = (state)=>{
  return {
    token: state.auth.token
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    authCheck: ()=> dispatch(authCheck())
  }
}

class BodyComponent extends Component{
  componentDidMount(){
    this.props.authCheck();
  }
  render(){
    let routes = null;
  if(this.props.token === null || this.props.token === undefined){
    routes = (
      <Routes>
        <Route path='/login' element={<Auth/>} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path="*" element={<Navigate to="/gallery" replace />} />
      </Routes>
    )
  }else{
    routes = (
    <Routes>
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="*" element={<Navigate to="/gallery" replace />} />
      </Routes>
      )
  }
  
  
  return (
    <div style={{background: '#202124'}}>
      {routes}
      {/* <Routes>
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Auth/>} />
        <Route path="/" element={<Navigate to="/gallery" replace />} />
      </Routes> */}
    </div>
  )
}
}
export default connect(mapStateToProps, mapDispatchToProps) (BodyComponent)