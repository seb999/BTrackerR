import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import NavMenu from './components/NavMenu';
import { NavCommand } from './components/NavMenu';
import Footer from './components/Footer';
import Login from './components/Login'
import Tracker from './components/Tracker'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

interface State {
  redirectTo?: string;
  user: User;
  navCommands: Array<NavCommand>;
}

interface Props {
  isLogged: boolean;
}

class App extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);

    this.state = {
      navCommands: [
        { type: "NavLink", path: "/", text: "Home", isActive: false },
        { type: "NavLink", path: "/Tracker", text: "Tracker", isActive: false },
        { type: "NavLink", path: "/Map", text: "Map", isActive: false },
        { type: "Button", path: "", text: "Login", isActive: !this.props.isLogged },
        { type: "Button", path: "", text: "Logout", isActive: this.props.isLogged },
      ],
      redirectTo: undefined,
      user: {
        userId: "",
        userEmail: "",
      }
    };
  }

  render() {

    return (

      <BrowserRouter>
        <div>
          <NavMenu commands={this.state.navCommands} />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/Home' component={Home} />
              <Route exact path='/Login' component={Login} />
              <Route exact path='/Tracker' component={Tracker} />} />
          </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    //logUser: (user: any) => dispatch<any>(actionCreator.logUserAsyn(user))
  }
}

//map the props of this class to the root redux state
const mapStateToProps = (state: any) => {
  return {
    isLogged: state.isLogged,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
