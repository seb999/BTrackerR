import * as React from 'react';
import { withRouter } from 'react-router-dom'
import logo from '../images/Logo.png'
import './NavMenu.css';
import MyNavLink from './MyNavLink'
import { connect } from 'react-redux'

export interface NavCommand {
  type: string,
  path: string,
  text: string,
  isActive: boolean,
}

export interface Props {
  history?: any;
  commands: NavCommand[];
  userEmail : string;
  isLogged : string;
}

export interface State { }

class NavMenu extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  login = () => {
    this.props.history.push("/Login");
  }

  logout = () => {
    this.props.history.push("/Home");
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
                  <MyNavLink key={i}
                    path={link.path}
                    text={link.text}
                    isActive={link.isActive}
                  />
                );
              }
              return (<div key={i}></div>)
            })}
          </ul>

          Hello {this.props.userEmail}! {this.props.isLogged}
                 {this.props.commands.map((link, i) => {
            if (link.type === "Button") {
              return (
               
                <button key={i} className={link.isActive ? "btn btn-outline-success my-2 my-sm-0" : "btn btn-outline-success my-2 my-sm-0 d-none"}
                  onClick={link.text == 'Login' ? this.login : this.logout}>{link.text}
                </button>
              
              )
            }
            return (<div key={i}></div>)
          })}
        </div>
      </nav>
    )
  }
}

//map the props of this class to the root redux state
const mapStateToProps = (state: any) => {
  return {
    userId: state.userId,
    userEmail: state.userEmail,
    isLogged: state.isLogged,
  }
}

export default connect(mapStateToProps)(withRouter(NavMenu));

