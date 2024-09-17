import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const authRequest = {
      username: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8080/login', authRequest, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          // Store JWT token in local storage or session storage
          localStorage.setItem('token', response);

          // Navigate to dashboard or any other protected route
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          if (err.status === 404) {
            alert("Username not found.");
          } else if (err.status === 401) {
            alert("Invalid password.");
          } else {
            alert("Authentication failed.");
          }
        }
      });
  }
}
