import * as React from 'react';
import axios from 'axios'

interface State{
    deviceList : Array<Device>;
}

interface Props{
}

class Tracker extends React.Component<Props, State>{
    constructor(props: any){
        super(props);
        
        this.state = {
            deviceList  : new Array<Device>()
          }
        };
      
    componentDidMount(){
        let url = "/api/MyDevice/GetDeviceList/";
        axios.get(url).then(res =>{ 
            this.setState({
                deviceList : res.data
            })
        })
    }

    render(){

        let displayList = this.state.deviceList.map((item, index) => (
            <tr key={index}>
                <td>{item.deviceId}</td>
                <td>{item.deviceEUI}</td>
                <td>{item.deviceDescription}</td>
                <td>{item.userId}</td>
            </tr>
        ));
      
            return (
              
                <div>
                    <br />
                    <button type="button" className="btn btn-primary">Add new tracker</button>
                    <br /><br />
                    <table className="table" >
                   <thead className="thead-dark">
                    <tr>
                        <th scope="col">Device Id</th>
                        <th scope="col">EUI</th>
                        <th scope="col">Usage</th>
                        <th scope="col">UserId</th>
                    </tr>
                    </thead>
                    <tbody>
                        {displayList}
                    </tbody>
                  
                        </table>
                         </div>

                       
  
                        )
       
        
    }
}

export default Tracker