// import { Component } from '@angular/core';
// import { HttpClient, HttpEventType } from '@angular/common/http';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {

//   userId!: number;
//   selectedFile!: File;
//   uploadMessage: string = '';

//   constructor(private http: HttpClient) {}

//   // Capture the file selected by the user
//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   // Handle form submission for PDF upload
//   onPDFUpload() {
//     if (!this.selectedFile || !this.userId) {
//       this.uploadMessage = "Please provide a valid User ID and a PDF file.";
//       return;
//     }

//     // Prepare the form data
//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
//     formData.append('userId', this.userId.toString());

//     // Send the POST request to upload the PDF
//     this.http.post('http://localhost:8080/pdf/upload', formData, { responseType: 'text' })
//       .subscribe({
//         next: (response) => {
//           this.uploadMessage = response;
//         },
//         error: (err) => {
//           this.uploadMessage = "Error uploading PDF: " + err.error;
//         }
//       });
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {

//   userId!: number;
//   selectedFile!: File;
//   uploadMessage: string = '';

//   constructor(private http: HttpClient, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     // Get the userId from query parameters
//     this.route.queryParams.subscribe(params => {
//       this.userId = +params['userId']; // Convert to a number
//     });
//   }

//   // Capture the file selected by the user
//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   // Handle form submission for PDF upload
//   onPDFUpload() {
//     if (!this.selectedFile || !this.userId) {
//       this.uploadMessage = "Please provide a valid User ID and a PDF file.";
//       return;
//     }

//     // Prepare the form data
//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
//     formData.append('userId', this.userId.toString());

//     // Send the POST request to upload the PDF
//     this.http.post('http://localhost:8080/pdf/upload', formData, { responseType: 'text' })
//       .subscribe({
//         next: (response) => {
//           this.uploadMessage = response;
//         },
//         error: (err) => {
//           this.uploadMessage = "Error uploading PDF: " + err.error;
//         }
//       });
//   }
// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userId!: number;
  selectedFile!: File;
  uploadMessage: string = '';
  chatbotResponse: string = '';  // To store chatbot response

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId']; // Convert to a number
    });
  }

  // Capture the file selected by the user
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Handle form submission for PDF upload using async/await
  async onPDFUpload() {
    if (!this.selectedFile || !this.userId) {
      this.uploadMessage = "Please provide a valid User ID and a PDF file.";
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userId', this.userId.toString());

    try {
      // Send the POST request to upload the PDF and await its response
      const response = await this.http.post('http://localhost:8080/pdf/upload', formData, { responseType: 'text' }).toPromise();
      this.uploadMessage = response || 'File uploaded successfully.';

      // If the uploadMessage is set, trigger the chatbot call
      if (this.uploadMessage) {
        await this.callChatbot(this.uploadMessage);
      }
    } catch (error: any) {  // Explicitly typing error as 'any'
      // Safely accessing the error properties
      this.uploadMessage = "Error uploading PDF: " + (error?.error || error?.message || 'Unknown error occurred.');
    }
  }

  // Method to call the chatbot API using async/await
  async callChatbot(uploadMessage: string) {
    const additionalPrompt = "Based on the resume give me interview questions for a fresher for a software developer role ";
    const chatbotRequest = {
      prompt_message: uploadMessage + additionalPrompt,  // Send the upload message to the chatbot
      history_id: ''  // History ID can be dynamically managed if needed
    };

    try {
      // Send the POST request to the chatbot endpoint and await its response
      const response = await this.http.post<{ result: string }>('http://localhost:8080/helpdesk/chat', chatbotRequest).toPromise();
      this.chatbotResponse = response?.result || 'No response from the chatbot.';
    } catch (error: any) {  // Explicitly typing error as 'any'
      // Safely accessing the error properties
      this.chatbotResponse = "Error: Unable to get a response from the chatbot. " + (error?.error || error?.message || 'Unknown error occurred.');
    }
  }
}
