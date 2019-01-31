import React, { Component } from 'react';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    editEmployee=()=>{
        this.props.editEmployee(this.props.detailsEmployee.Id);
    }
    deleteEmployee=()=>{
        this.props.deleteEmployee(this.props.detailsEmployee.Id);
    }
    render() {
        const employee=this.props.detailsEmployee;
        console.log(this.props)
        return (
            <>
            <tr>
            {/* <td>
              <span className="custom-checkbox">
                <input type="checkbox" id="checkbox1" name="options[]" defaultValue={1} />
                <label htmlFor="checkbox1" />
              </span>
            </td> */}
            <td>{employee.Name}</td>
            <td>{employee.Email}</td>
            <td>{employee.Address}</td>
            <td>{employee.Phone}</td>
            <td>
              <a className="edit" onClick={this.editEmployee}><i className="material-icons" title="Edit"></i></a>
              <a className="delete" onClick={this.deleteEmployee}><i className="material-icons" title="Delete"></i></a>
            </td>
          </tr>
        
            </>
        );
    }
}

export default Employee;