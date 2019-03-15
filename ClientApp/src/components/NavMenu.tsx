import * as React from 'react';
import { withRouter } from 'react-router-dom'
import logo from '../images/Logo.png'
import './NavMenu.css';
// import {Page} from '../class/Enums'
import MyNavLink from './MyNavLink'
// import {Button, Navbar, Nav, Form, FormControl} from 'react-bootstrap';

export interface NavCommand{
    type  :string,
    path : string,
    text : string,
    isActive : boolean,
    onExecute?(p : any): void;
}

export interface Props {
    history? : any;
    commands : NavCommand[]
}

export interface State {}

class NavMenu extends React.Component<Props, State> {
    constructor(props: any){
        super(props);
    }

   login = ()=> {
       console.log('Login from Navbar')
       //this.props.redirectTo(Page.Login);
   }

   logout = () =>{
       console.log('Logout from Navbar')
       //this.props.redirectTo(Page.Logout);
       //this.props.history.push("/Home");
   }

    render(){
        return  (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/"><img src={logo} className="logo" /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {this.props.commands.map((link, i) => {
                        if (link.type === "NavLink") {
                            return (
                                <MyNavLink
                                path={link.path} 
                                text={link.text} 
                                isActive={link.isActive}
                                key={i} />
                            )
                        }
                        return (<div></div>)
                    })}
                </ul>

                 {this.props.commands.map((link, i) => {
                     if (link.type === "Button") {
                         return (
                             <div><button className="btn btn-outline-success my-2 my-sm-0" onClick={link.onExecute}>{link.text}</button></div>
                        )
                     }
                     return (<div></div>)
                 })}           
                                     
                {/* {!this.props.user.userEmail &&
                    <div className="my-0 my-lg-0 md-3">
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.login}>Login</button>
                    </div>
                }
                {this.props.user.userEmal &&
                    <div className="my-0 my-lg-0 md-3">
                    Hello {this.props.user.userEmal}! 
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.logout}>Logout</button>
                    </div>
                } */}

               {/* {this.state.login && <Redirect to="/Login" />}
                {this.state.logout && <Redirect to="/" />}

               
                 */}
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

export default withRouter(NavMenu);

