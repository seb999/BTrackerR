import * as React from 'react';
import {connect} from 'react-redux'

class Home extends React.Component {
  render(){
   console.log(this.props)
    return (
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to your new single-page application, built with:</p>
      <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
    </div>
    )};
}

  const mapStateToProps = (state:any) =>{
    return {
      userId: state.userId
    }
  }
  
  export default connect(mapStateToProps)(Home);
