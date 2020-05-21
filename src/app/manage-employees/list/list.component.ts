import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private router: Router, private _employeeService: EmployeeService) { }
  employeeListData: any = [];
  ngOnInit() {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this._employeeService.getEmployeeList().subscribe((data: any) => {
      this.employeeListData = data.data;
      localStorage.setItem('employeeList', JSON.stringify(this.employeeListData));
    })
  }

  editEmployee(data) {
    this.router.navigate(['/employee/edit', data.id]);
  }

  deleteEmployee(data) {
    if (data.id) {
      if (confirm('Are you sure you want to delete this record?')) {
        this._employeeService.deleteEmployee(data.id).subscribe((resData: any) => {
          if (resData.status == 'success') {
            this.getEmployeeList();
            alert('Employee deleted successfully.');
          } else if (resData.status == 'failed') {
            alert(resData.message);
          }
        })
      }
    }
  }
}
