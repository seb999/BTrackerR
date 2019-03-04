import * as React from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../images/Logo.png'
import './NavMenu.css';

interface Props {
    user  : User;
}

interface State {

}

class NavMenu extends React.Component<Props, State> {
    constructor(props: any){
        super(props);
      }
    render(){
        return  (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
                <img src={logo} className="logo" />
                </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
            
                    <li className="nav-item active">
                    <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className="nav-link" to="/Tracker">Tracker</NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className="nav-link" to="/Traker">Map</NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className="nav-link" to="/Traker">About</NavLink>
                    </li>

                    <li className="nav-item">
                    <NavLink className="nav-link" to="/Traker">Contact</NavLink>
                    </li>
                    
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    Hello {this.props.user.userEmal}!
                    <NavLink className="nav-link" to="/Login">Login</NavLink>
                    {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                </form>
            </div>
        </nav>


        )
    }
}

export default NavMenu;