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
      console.log("this.employeeId = ", params)
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
    this._employeeService.getEmployeeDetail(+this.employeeId).subscribe((data: any) => {
      if (data.status == 'success') {
        this.addEditEmployeeFormData.name = data.data.employee_name;
        this.addEditEmployeeFormData.salary = data.data.employee_salary;
        this.addEditEmployeeFormData.age = data.data.employee_age;
      }
    })

  }

  cancelAddEditEmployee() {
    this.router.navigate(['/employee/list']);
  }

  ngOnDestroy() {

  }

}
