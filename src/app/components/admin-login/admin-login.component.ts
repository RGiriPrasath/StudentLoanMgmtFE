import { Component } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet,RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  employeeId = '';
  dob = '';
  loanRecords: any;

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.adminLogin(this.employeeId, this.dob)
      .then(response => {
        console.log('Login successful:', response.data);
        // Redirect to admin dashboard
        const adminDetails = response.data.student;
        // Navigate to student dashboard with student details
        this.router.navigate(['/admin-dashboard'], { state: { admin: adminDetails } });
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  }
  toggleLoanReceived(arg0: any,arg1: boolean) {
    throw new Error('Method not implemented.');
    }
    downloadLoanData() {
    throw new Error('Method not implemented.');
    }
}
