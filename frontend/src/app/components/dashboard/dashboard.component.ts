
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
  additionalText: string = '';  // To store the text appended by the user
  chatbotResponse: string = '';  // To store chatbot response
  isLoading: boolean = false;    // To show loading spinner

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
    } catch (error: any) {
      this.uploadMessage = "Error uploading PDF: " + (error?.error || error?.message || 'Unknown error occurred.');
    }
  }

  // Method to call the chatbot API with the appended text
  async submitChatbotRequest() {
    if (!this.uploadMessage) {
      this.chatbotResponse = "Upload a PDF first.";
      return;
    }

    const additionalPrompt = "Based on the resume given above give me the";
    const chatbotRequest = {
      prompt_message: this.uploadMessage + ' '+additionalPrompt+' '   + this.additionalText + ' ',  // Append custom text
      history_id: ''
    };

    // Show loading spinner
    this.isLoading = true;

    try {
      // Send the POST request to the chatbot endpoint and await its response
      const response = await this.http.post<{ result: string }>('http://localhost:8080/helpdesk/chat', chatbotRequest).toPromise();
      this.chatbotResponse = response?.result || 'No response from the chatbot.';
    } catch (error: any) {
      this.chatbotResponse = "Error: Unable to get a response from the chatbot. " + (error?.error || error?.message || 'Unknown error occurred.');
    } finally {
      // Hide loading spinner
      this.isLoading = false;
    }
  }
}
