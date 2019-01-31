import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class PopupEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visible: false,
          employee:{}
        }
      }

      handleChange=(event)=> {
          
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState(prevState => ({
            employee: {
                ...prevState.employee,
                [name]: value
            }
        }))
      }
      
      componentWillReceiveProps(nextProps){
          this.setState({employee:nextProps._employeeEditing})
      }
      saveEmployee=()=>{
        this.props.save(this.state.employee);
      }

    render() {
        return (
            <>
            <Modal
          title={this.props._add0edit1==0?'Add Employee':'Edit Employee'}
          visible={this.props.isShow}
          onCancel={this.props.closePopup}
          footer={[
            <Button key="back" onClick={this.props.closePopup}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={this.saveEmployee}>
              Save
            </Button>,
          ]}
        >
          <div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" name="Name" onChange={this.handleChange} value={this.state.employee.Name} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" name="Email" onChange={this.handleChange} value={this.state.employee.Email} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea className="form-control" name="Address" onChange={this.handleChange} value={this.state.employee.Address} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" className="form-control" name="Phone" onChange={this.handleChange} value={this.state.employee.Phone} />
            </div>
          </div>

        </Modal>
            </>
        );
    }
}

export default PopupEmployee;