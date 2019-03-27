import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreator from '../actions/actions';
import TrackerPopup from "./TrackerPopup"
import ConfirmPopup from "./Popup/ConfirmPopup"


interface State {
    showAddTracker: boolean,
    showConfirmPopup: boolean

}

interface Props {
    history?: any;
    isLogged?: boolean;
    getTrackerList(): void;
    deviceList: Array<Device>;
    isDeviceSaved: boolean;
}

class Tracker extends React.Component<Props, State>{
    constructor(props: any) {
        super(props);

        this.state = {
            showAddTracker: false,
            showConfirmPopup: false,
        };
    };

    componentDidMount() {
        //Call from redux
        !this.props.isLogged ? this.props.history.push("/Login") : this.props.getTrackerList();
    }

    handleClose = () =>{
        this.setState({ showAddTracker: false });
    }

    handleShow = () => {
        this.setState({ showAddTracker: true });
    }

    handleDeleteTracker = (p:any) =>{
        this.setState({ showConfirmPopup: true });
    }

    handleConfirmDelete = (p:any) =>{
        if(p) alert("delete me");
        
        this.setState({ showConfirmPopup: false });
    }

    render() {
        let displayList = this.props.deviceList.map((item, index) => (
            <tr key={index}>
                <td>{item.deviceId}</td>
                <td>{item.deviceEUI}</td>
                <td>{item.deviceDescription}</td>
                <td>{item.userId}</td>
                <td><button className="btn btn-outline-success my-2" onClick={() => this.handleDeleteTracker(item.deviceId)}>del</button></td>
            </tr>
        ));

        return (
            <div>
                {/* Don't show the html is user not identify and switch to Login page */}
                {this.props.isLogged &&
                    <div>
                        <br ></br>
                        <div >
                            <button style={{ float: "left" }} type="button" className="btn btn-primary" onClick={this.handleShow}>Add new tracker</button>
                            <div style={{ float: "right", height:"40px", padding:"7px" }} className={this.props.isDeviceSaved ? "alert alert-success" : "d-none"} role="alert"> Saved!</div>
                        </div>
                      
                        <br /><br />
                        <table className="table" >
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Device Id</th>
                                    <th scope="col">EUI</th>
                                    <th scope="col">Usage</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayList}
                            </tbody>
                        </table>

                        <TrackerPopup show={this.state.showAddTracker} hide={this.handleClose}/>

                        <ConfirmPopup show={this.state.showConfirmPopup} hide={this.handleConfirmDelete} title="Delete tracker" content="Do you really want to delete this tracker ?"/>
                    </div>
                }
            </div>)
    }
}

//map the props of this class to the root redux state
const mapStateToProps = (state: any) => {
    return {
        //isLogged: state.isLogged,
        isLogged: true,
        deviceList: state.deviceList,
        isDeviceSaved: state.isDeviceSaved,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        //we add this function to our props
        getTrackerList: () => dispatch<any>(actionCreator.default.tracker.trackerList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tracker));