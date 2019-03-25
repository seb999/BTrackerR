import * as React from 'react';
import { Modal, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import * as actionCreator from '../actions/actions';
import { Dispatch } from 'redux';

interface State { 
    deviceEui  : string;
    deviceDescription : string;
}

interface Props {
    userId : string,
    show: boolean,
    hide() : void,
}

class TrackerPopup extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)
    }

    handleChange = (e:any) => {
        this.setState({
            [e.target.id] : e.target.value
        } as any)
    }

    handleSaveDevice = () =>{
        //Save device in Redux here
        this.props.hide();
    }

    render() {
        return (
            <div>  
                 <Modal show={this.props.show} onHide={this.props.hide}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add new device</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {/* <form className="form-signin" onSubmit={this.handleSubmit}> */}
                                <form className="form-signin">

                                    <div className="form-label-group">
                                        <label>EUI</label>
                                        <input id="deviceEui" type="text" className="form-control" placeholder="EUI code" required onChange={this.handleChange}></input>
                                    </div>

                                    <div className="form-label-group">
                                        <label>Description</label>
                                        <input id="deviceDescription" type="text" className="form-control" placeholder="Description" required onChange={this.handleChange}></input>
                                    </div>

                                    <div className="form-label-group">
                                        <label>User ID</label>
                                        <input id="userPassword" type="text" className="form-control" placeholder="userId" disabled value={this.props.userId}></input>
                                    </div>

                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.props.hide}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" onClick={this.handleSaveDevice} >
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
            </div>
        )
    }

}

//map the props of this class to the root redux state
const mapStateToProps = (state: any) => {
    return {
        userId: state.userId,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        //we add this function to our props
        getTrackerList: () => dispatch<any>(actionCreator.default.tracker.trackerList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackerPopup);