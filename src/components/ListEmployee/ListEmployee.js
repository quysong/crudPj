import React, { Component } from 'react';
import { employees } from './mockData'
import Employee from './Employee';
import PopupEmployee from './PopupEmployee';


class ListEmployee extends Component {
  constructor(props) {
    super(props);
    const newEmployee= {
      Id:0,
      Name:'',
      Email:'',
      Address:'',
      Phone:''
  }
    this.state = {
      newEmployee:newEmployee,
      employeesArr: [],
      visible: false,
      add0edit1: 0,
      employeeEditing:newEmployee
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  openAddPopup = () => {
    this.setState({
      add0edit1: 0,
      visible:true,
      employeeEditing:this.state.newEmployee
    });
    // this.showModal();
  }
  openEditPopup = (id) => {
    const _employeeEditing=this.state.employeesArr.filter((item,index)=>{
      return item.Id==id
    })[0];
    this.setState({
      add0edit1: 1,
      employeeEditing:_employeeEditing,
      visible:true
    });
    // this.showModal();
  }
  onDeleteAnEmployee=(id)=>{
    let newArr=this.state;
    var foundIndex = newArr.employeesArr.findIndex(x => x.Id == id);
    newArr.employeesArr.splice(foundIndex,1);
    this.setState(newArr);
    sessionStorage.setItem('myData', JSON.stringify(newArr.employeesArr));
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  onClosePopup=()=>{
    this.handleCancel();
  }
  onSave=(objEmployee)=>{
    let newArr=this.state;
    if(this.state.add0edit1==0){
      //Add
      let newId=0;
      var length=newArr.employeesArr.length;
      if(length>0){
        newId= newArr.employeesArr[length-1].Id+1;
      }
      objEmployee.Id=newId;
      newArr.employeesArr.push(objEmployee);
    }else{
      //Edit
      var foundIndex = newArr.employeesArr.findIndex(x => x.Id == objEmployee.Id);
      newArr.employeesArr[foundIndex] = objEmployee;
    }
    this.setState(newArr);
    sessionStorage.setItem('myData', JSON.stringify(newArr.employeesArr));
    this.handleCancel();
  }

  componentDidMount() {
    const sessionStorageData=sessionStorage.getItem('myData');
    const dataFetch = this.state;
    if(sessionStorageData==null){
      sessionStorage.setItem('myData', JSON.stringify(employees));
      dataFetch.employeesArr=employees;
    }else{
      dataFetch.employeesArr = JSON.parse(sessionStorageData);
    }
    
    this.setState(dataFetch);
  }
  render() {
    const employeesArr = this.state.employeesArr;
    const employeesRows = [];
    if (employeesArr.length > 0) {
      employeesArr.map((item, index) => {
        employeesRows.push(
          <Employee key={index} detailsEmployee={item} editEmployee={this.openEditPopup} deleteEmployee={this.onDeleteAnEmployee}></Employee>
        )
      })
    }

    return (
      <>
      <PopupEmployee _add0edit1={this.state.add0edit1} isShow={this.state.visible} closePopup={this.onClosePopup} save={this.onSave} _employeeEditing={this.state.employeeEditing}>
      </PopupEmployee>
        <div>
          <div className="container">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6 customCss">
                    <h2>Manage <b>Employees</b></h2>
                  </div>
                  <div className="col-sm-6">
                    <a className="btn btn-success" onClick={this.openAddPopup}><i className="material-icons"></i> <span>Add New Employee</span></a>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesRows}

                </tbody>
              </table>
            </div>
          </div>
        </div>

      </>
    );
  }
}

export default ListEmployee;