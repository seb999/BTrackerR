import * as React from 'react';

interface Props {
    logUser(event: any): void;
    isLogged? : boolean;
 }

interface State {
    userLogin : string,
    userPassword : string,
    rememberMe : boolean
}

class Login extends React.Component<Props, State>{
    constructor(props: any) {
       
        super(props)
        this.state = {
             userLogin : "", 
             userPassword: "",
             rememberMe:false};
      }

    handleChange = (e:any) => {
        this.setState({
            [e.target.id] : e.target.value
        } as any)
    }

    handleRememberMe = () => {
        this.setState({
            rememberMe : !this.state.rememberMe
        } as any)
    }
    
    handleSubmit = (e :any) => {
        e.preventDefault();
        this.props.logUser(this.state); 
    }
    
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form className="form-signin" onSubmit={this.handleSubmit}>
                                
                                    <div className="form-label-group">
                                        <input id="userLogin" type="email" className="form-control" placeholder="Email address" required onChange={this.handleChange}></input>
                                        <label>Email address</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input id="userPassword" type="password" className="form-control" placeholder="Password" required onChange={this.handleChange}></input>
                                        <label>Password</label>
                                    </div>

                                    <div className="mb-3">
                                        <input type="checkbox" onClick={this.handleRememberMe}></input>
                                        <label>Remember password</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>

                                </form>
                                {(!this.props.isLogged && this.props.isLogged!=undefined) && <Child />}
                            </div>
                        </div>
                    </div>
                
                </div>
               
            </div>
        )
    }
}

const Child = () =>(
     <span className="badge badge-danger">Login failed!</span>
)

export default Login;