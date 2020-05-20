import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl: string = 'http://dummy.restapiexample.com/api/v1/'
  constructor(private _http: HttpClient) { }

  getEmployeeList(): Observable<any> {
    return this._http.get(this.baseUrl + 'employees');
  }

  addEmployee(data): Observable<any> {
    return this._http.post(this.baseUrl + 'create', data);
  }
  
  updateEmployee(data, employeeId): Observable<any> {
    return this._http.put(this.baseUrl + 'update/' + employeeId, data);
  }

  getEmployeeDetail(employeeId): Observable<any> {
    return this._http.get(this.baseUrl + 'employee/' + employeeId);
  }

  deleteEmployee(employeeId): Observable<any> {
    return this._http.delete(this.baseUrl + 'delete/' + employeeId);
  }
}
