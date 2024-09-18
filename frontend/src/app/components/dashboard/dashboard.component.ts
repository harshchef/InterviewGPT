import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userId!: number;
  selectedFile!: File;
  uploadMessage: string = '';

  constructor(private http: HttpClient) {}

  // Capture the file selected by the user
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Handle form submission for PDF upload
  onPDFUpload() {
    if (!this.selectedFile || !this.userId) {
      this.uploadMessage = "Please provide a valid User ID and a PDF file.";
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userId', this.userId.toString());

    // Send the POST request to upload the PDF
    this.http.post('http://localhost:8080/pdf/upload', formData, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.uploadMessage = response;
        },
        error: (err) => {
          this.uploadMessage = "Error uploading PDF: " + err.error;
        }
      });
  }
}
