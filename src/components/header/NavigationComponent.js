import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, Nav, Collapse, NavbarToggler} from 'reactstrap'
import './header.css'
import { connect } from 'react-redux';

const mapStateToProps = (state)=>{
  return {
    token: state.auth.token
  }
}
const NavigationComponent = (props) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navToggler = ()=>{
    setIsNavOpen(!isNavOpen);
  }
  
  let links = null;
  if(props.token === null || props.token === undefined){
    links = (
      <Nav className="ms-auto me-5" navbar>
            <NavItem>
              <NavLink to="/login" className='nav-link hover-underline-animation'>Login</NavLink>
            </NavItem>
          </Nav>
    )
  }else{
    links = (
      <Nav className="ms-auto me-5" navbar>
            <NavItem>
              <NavLink to="/gallery" className='nav-link hover-underline-animation'>Gallery</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact" className='nav-link hover-underline-animation'>Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/logout" className='nav-link hover-underline-animation'>Logout</NavLink>
            </NavItem>
            
          </Nav>
    )
  }
  
  return (
    <div>
        <Navbar  dark expand="sm" >
        <NavbarToggler onClick={navToggler}/>
            <NavbarBrand className='ms-5'  to="/gallery" style={{cursor: 'pointer'}}>
                <NavLink to="/gallery" className='nav-link hover-underline-animation'>MemorySnaps</NavLink>
            </NavbarBrand>
            
        <Collapse isOpen={isNavOpen} navbar>
        {links}
        </Collapse>
         </Navbar>
    </div>
  )
}

export default connect(mapStateToProps) (NavigationComponent)