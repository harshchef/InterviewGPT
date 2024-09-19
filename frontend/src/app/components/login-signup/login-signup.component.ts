// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login-signup',
//   templateUrl: './login-signup.component.html',
//   styleUrls: ['./login-signup.component.css']
// })
// export class LoginSignupComponent {
//   email: string = '';
//   password: string = '';

//   constructor(private http: HttpClient, private router: Router) {}

//   onLogin() {
//     const authRequest = {
//       username: this.email,
//       password: this.password
//     };

//     this.http.post('http://localhost:8080/login', authRequest, { responseType: 'text' })
//       .subscribe({
//         next: (response) => {
//           // Store JWT token in local storage or session storage
//           localStorage.setItem('token', response);

//           // Navigate to dashboard or any other protected route
//           this.router.navigate(['/dashboard']);
//         },
//         error: (err) => {
//           if (err.status === 404) {
//             alert("Username not found.");
//           } else if (err.status === 401) {
//             alert("Invalid password.");
//           } else {
//             alert("Authentication failed.");
//           }
//         }
//       });
//   }
// }
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
  signupName: string = '';
   signupEmail: string = '';
  // collegeName: string = '';
  // yearOfPassing: string = '';
  // phoneNumber: string = '';
   signupPassword: string = '';
 isLoginForm: boolean = true;
// isLoginForm: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const authRequest = {
      username: this.email,
      password: this.password
    };

    // this.http.post('http://localhost:8080/login', authRequest, { responseType: 'text' })
    //   .subscribe({
    //     next: (response) => {
    //       localStorage.setItem('token', response);
    //       this.router.navigate(['/dashboard']);
    //     },
    //     error: (err) => {
    //       if (err.status === 404) {
    //         alert("Username not found.");
    //       } else if (err.status === 401) {
    //         alert("Invalid password.");
    //       } else {
    //         alert("Authentication failed.");
    //       }
    //     }
    //   });
    this.http.post<{ token: string, userId: number }>('http://localhost:8080/login', authRequest)
    .subscribe({
      next: (response) => {
        // Store JWT token in local storage or session storage
        localStorage.setItem('token', response.token);

        // Navigate to the dashboard and pass the userId as a route parameter
        this.router.navigate(['/dashboard'], { queryParams: { userId: response.userId } });
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
  onSignup() {
    const signupRequest = {
      name: this.signupName,
      username: this.signupEmail,
      // college: this.collegeName,
      // year: this.yearOfPassing,
      // phone: this.phoneNumber,
      password: this.signupPassword
    };
  
    this.showSignup();
  
    // Call the registration endpoint
    this.http.post('http://localhost:8080/register', signupRequest)
      .subscribe({
        next: (response) => {
          // If the registration is successful, show success message
          alert('Registration successful');
          this.showLogin(); // Switch back to login form
        },
        error: (err) => {
          // Check for specific error message from the server
          if (err.status === 400 && err.error === 'Username already exists') {
            alert('Username already exists. Please choose a different one.');
          } else {
            // General error message for other errors
            alert('Registration failed. Please try again.');
          }
        }
      });
  }
  

  showSignup() {
    this.isLoginForm = false;
  }

  showLogin() {
    this.isLoginForm = true;
  }
}
