import * as React from 'react';
import { withRouter } from 'react-router-dom'
import logo from '../images/Logo.png'
import './NavMenu.css';
// import {Page} from '../class/Enums'
import MyNavLink from './MyNavLink'
// import {Button, Navbar, Nav, Form, FormControl} from 'react-bootstrap';

export interface NavCommand {
  type: string,
  path: string,
  text: string,
  isActive: boolean,
  onExecute?(p: any): void;
}

export interface Props {
  history?: any;
  commands: NavCommand[];
  user: User;
}

export interface State { }

class NavMenu extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  login = () => {
    this.props.history.push("/Login");
  }

  render() {
    return (
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

          Hello {this.props.user.userEmail}!
                 {this.props.commands.map((link, i) => {
            if (link.type === "Button") {
              return (
                <button className={link.isActive ? "btn btn-outline-success my-2 my-sm-0" : "btn btn-outline-success my-2 my-sm-0 d-none"}
                  onClick={link.text == 'Login' ? this.login : link.onExecute}>{link.text}
                </button>
              )
            }
            return (<div></div>)
          })}

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

