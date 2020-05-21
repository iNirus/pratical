import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  constructor(private router: Router, private activeRoute: ActivatedRoute, private _employeeService: EmployeeService) { }
  addEditEmployeeFormData: any = { name: '', salary: '', age: '' }
  employeeId: number;
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.employeeId = params['id'];
        this.getEmployeeDetail();
      }
    })
  }

  addEditEmployeeSubmit(addEditEmployee: NgForm) {
    if (addEditEmployee.invalid)
      return false;

    if (this.employeeId) {
      this._employeeService.updateEmployee(this.addEditEmployeeFormData, this.employeeId).subscribe((data: any) => {
        if (data.status == 'success') {
          alert('Employee updated successfully.')
          this.cancelAddEditEmployee();
        }
      }, error => { console.log("Error: ", error) })
    } else {
      this._employeeService.addEmployee(this.addEditEmployeeFormData).subscribe((data: any) => {
        if (data.status == 'success') {
          alert('Employee added successfully.')
          this.cancelAddEditEmployee();
        }
      }, error => { console.log("Error: ", error) })
    }

  }

  getEmployeeDetail() {
    // this._employeeService.getEmployeeDetail(+this.employeeId).subscribe((data: any) => {
    //   if (data.status == 'success') {
    //     this.addEditEmployeeFormData.name = data.data.employee_name;
    //     this.addEditEmployeeFormData.salary = data.data.employee_salary;
    //     this.addEditEmployeeFormData.age = data.data.employee_age;
    //   }
    // })

    let emloyeeList = JSON.parse(localStorage.getItem('employeeList'));
    let emloyeeDetails: any = {};
    if (emloyeeList.length > 0) {
      let index = emloyeeList.findIndex(x => x.id == this.employeeId);
      if (index > -1) {
        emloyeeDetails = emloyeeList[index];
        this.addEditEmployeeFormData.name = emloyeeDetails.employee_name;
        this.addEditEmployeeFormData.salary = emloyeeDetails.employee_salary;
        this.addEditEmployeeFormData.age = emloyeeDetails.employee_age;
      }
    }
  }

  cancelAddEditEmployee() {
    this.router.navigate(['/employee/list']);
  }

  ngOnDestroy() {

  }

}
