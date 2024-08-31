import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class StudentLoginComponent {
  rollNumber = '';
  dob = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.studentLogin(this.rollNumber, this.dob)
      .then(response => {
        console.log('Login successful:', response.data);
        const studentDetails = response.data.student;
        // Navigate to student dashboard with student details
        this.router.navigate(['/student-dashboard', this.rollNumber], { state: { student: studentDetails } });
      })
      .catch(error => {
        console.error('Login failed:', error.response ? error.response.data : error.message);
      });
  }
}
