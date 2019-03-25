import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actionCreator from '../actions/actions';
import TrackerPopup from "./TrackerPopup"


interface State {
    show: boolean,

}

interface Props {
    history?: any;
    isLogged?: boolean;
    getTrackerList(): void;
    deviceList: Array<Device>;
}

class Tracker extends React.Component<Props, State>{
    constructor(props: any) {
        super(props);

        this.state = {
            show: false,
        };
    };

    componentDidMount() {
        //Call from redux
        !this.props.isLogged ? this.props.history.push("/Login") : this.props.getTrackerList();
    }

    handleClose = () =>{
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    render() {
        let displayList = this.props.deviceList.map((item, index) => (
            <tr key={index}>
                <td>{item.deviceId}</td>
                <td>{item.deviceEUI}</td>
                <td>{item.deviceDescription}</td>
                <td>{item.userId}</td>
            </tr>
        ));

        return (
            <div>
                {/* Don't show the html is user not identify and switch to Login page */}
                {this.props.isLogged &&
                    <div>
                        <br ></br>
                        <button type="button" className="btn btn-primary" onClick={this.handleShow}>Add new tracker</button>
                        <br /><br />
                        <table className="table" >
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Device Id</th>
                                    <th scope="col">EUI</th>
                                    <th scope="col">Usage</th>
                                    <th scope="col">User Id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayList}
                            </tbody>
                        </table>

                        <TrackerPopup
                            show={this.state.show}
                            hide={this.handleClose}
                            />
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
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        //we add this function to our props
        getTrackerList: () => dispatch<any>(actionCreator.trackerList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tracker));