import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  rollNumber = '';
  semester: any;
  amountReceived: any;
  bankReferenceNo: any;
  dateOfReceipt: any;
  submissionStatus: string = '';
  dob: string = '';
  email: string = '';
  name: string = '';
  loans=[];
  studentData: any;
  selectedLoan: any = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rollNumber = params['rollNumber']; // Get roll number from route params
    this.fetchStudentData();
    });
  }
  async fetchStudentData(): Promise<void> {
    try {
      console.log('Fetching student data...');
      const response = await this.apiService.getStudentDetails(this.rollNumber);
      console.log('Response.Data:', response.data);
      this.studentData = response.data.student;
      console.log('Response.data.student Student Data:', this.studentData);
      return this.studentData;
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  }
  editLoan(loan: any): void {
    this.selectedLoan = { ...this.studentData.loans }; // Create a copy of the loan to edit
  }
  async submitLoanDetails(): Promise<void> {
    if (!this.selectedLoan || !this.selectedLoan.amount || !this.selectedLoan.bankReferenceNo || !this.selectedLoan.semester || !this.selectedLoan.dateOfReceipt) {
      this.submissionStatus = 'Please fill in all required fields.';
      return;
    }

    const formData = new FormData();
    formData.append('rollnumber', this.rollNumber);
    formData.append('dob', this.dob);
    formData.append('email', this.email);
    formData.append('name', this.name);
    formData.append('loan', JSON.stringify([this.selectedLoan])); // Send the selected loan for update
    formData.append('semester', this.selectedLoan.semester);
    formData.append('amountreceived', this.selectedLoan.amount.toString());
    formData.append('bankreferenceno', this.selectedLoan.bankReferenceNo);
    formData.append('dateofreceipt', this.selectedLoan.dateOfReceipt);

    try {
      console.log('FormData:', formData);
      const response = await this.apiService.updateLoanDetails(formData);
      this.submissionStatus = 'Loan details submitted successfully.';
      console.log('Loan details submitted:', response.data);
      this.selectedLoan = null; // Clear the selected loan after submission
    } catch (error) {
      this.submissionStatus = 'Submission failed. Please try again.';
      console.error('Submission failed:', error);
    }
  }
}
