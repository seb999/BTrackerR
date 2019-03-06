import * as React from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import logo from '../images/Logo.png'
import './NavMenu.css';
import {Page} from '../class/Enums'

interface Props {
    user  : User;
    redirectTo(p : any): void;
}

interface State {
    login : boolean,
    logout : boolean
}

class NavMenu extends React.Component<Props, State> {
    constructor(props: any){
        super(props);

        this.state = {
            login : false,
            logout : false,
            
        }
    }

   login = ()=> {
       this.setState({
           login : true,
           logout : false
       })
   }

   logout = () =>{
        this.setState({
            login : false,
            logout : true
        })
       this.props.redirectTo(Page.Logout);
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
                {this.state.login && <Redirect to="/Login" />}
                {this.state.logout && <Redirect to="/" />}

                {!this.props.user.userEmal &&
                    <div className="my-0 my-lg-0 md-3">
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.login}>Login</button>
                    </div>
                }
                {this.props.user.userEmal &&
                    <div className="my-0 my-lg-0 md-3">
                    Hello {this.props.user.userEmal}! 
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.logout}>Logout</button>
                    </div>
                }
                
                {/* A search box if needed
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
            </div>
        </nav>


        )
    }
}

export default NavMenu;