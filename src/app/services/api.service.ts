// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   private apiUrl = 'http://localhost:3000/api';

//   constructor(private http: HttpClient) {}

//   getStudentData(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/students`);
//   }

//   getAdminData(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/admins`);
//   }
// }

import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';
  constructor() { }

  // Student login
  studentLogin(rollNumber: string, dob: string) {
    console.log(rollNumber, dob);
    return axios.post(`${this.baseUrl}/student/login`, {
      rollNumber: rollNumber,
      dob: dob,
    });
  }

  async getStudentDetails(rollNumber: string): Promise<any> {
    console.log(`api.service.ts-> ${rollNumber}`);
    return axios.get(`${this.baseUrl}/student/dashboard?rollNumber=${rollNumber}`);
  }
  // Update loan details
  updateLoanDetails(data: any) {
    return axios.post(`${this.baseUrl}/student/update-loan`, data);
  }

  // Admin login
  adminLogin(employeeId: string, dob: string) {
    return axios.post(`${this.baseUrl}/admin/login`, {
      employeeId: employeeId,
      dob: dob,
    });
  }

  // Get all loan records
  getLoanRecords() {
    return axios.get(`${this.baseUrl}/admin/loan-records`);
  }

  // Download loan data as Excel (if needed)
  async downloadLoanData(): Promise<Blob> {
    const response = await axios.get(`${this.baseUrl}/admin/download-loan-data`, {
      responseType: 'blob' // Set the response type to blob
    });
    return response.data;
  }
}
