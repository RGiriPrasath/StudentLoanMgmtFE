import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  selectedStudent: any[] = [];
  filteredStudents: any[] = [];
  searchRollNumber: string = '';
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadLoanRecords();
  }


  loadLoanRecords() {
    this.apiService.getLoanRecords()
      .then(response => {
        console.log('Loan Records:', response.data);
        const admins = response.data.studentsDetails; // Extract admin data from response.data
        this.selectedStudent = admins;
        this.filteredStudents = admins;
      console.log('Selected Students:', this.selectedStudent);
    })
      .catch(error => {
        console.error('Failed to fetch records:', error);
      });

  }
  filterStudentsOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.filterStudents(); // Call the filtering logic
    }
  }
  filterStudents() {
    if (this.searchRollNumber.trim() === '') {
      this.filteredStudents = this.selectedStudent; // If search is empty, show all students
    } else {
      this.filteredStudents = this.selectedStudent.filter(student =>
        student.rollNumber.includes(this.searchRollNumber.trim())

      );
      console.log('Filtered Students:', this.filteredStudents)
    }
  }
  toggleStatus(student: any) {// Toggle the status between 'approved' and 'pending'
    student.status = student.status === 'approved' ? 'pending' : 'approved';
    console.log(`Updated status for ${student.rollNumber}: ${student.status}`);
  }

  downloadLoanData() {// Handle file download
    this.apiService.downloadLoanData()
            .then(blob => {
              // Create a link element
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = 'loan_data.xlsx'; // Set the file name

              // Append to the body
              document.body.appendChild(link);

              // Trigger the download
              link.click();

              // Clean up and remove the link
              document.body.removeChild(link);
            })
      .catch(error => {
        console.error('Failed to download loan data:', error);
      });
  }
}
