package com.interviewgpt.backend.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.interviewgpt.backend.entity.User;
import com.interviewgpt.backend.model.AuthRequest;
import com.interviewgpt.backend.service.MyUserDetailsService;
import com.interviewgpt.backend.service.UserService;
import com.interviewgpt.backend.util.JwtUtil;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;
    // @PostMapping("/login")
    // public ResponseEntity<String> createToken(@RequestBody AuthRequest authRequest) {
    //     try {
    //         // Check if the username exists
    //         UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
    
    //         // If username exists, validate password
    //         authenticationManager.authenticate(
    //                 new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
    //         );
    
    //         // // If authentication is successful, generate the JWT token
          
    //         String token = jwtUtil.generateToken(userDetails);
    //         User user = userService.findByUsername(authRequest.getUsername());

    //         return ResponseEntity.ok(token);
    //     } catch (UsernameNotFoundException ex) {
    //         // If username is not found, return 404 Not Found
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username not found");
    //     } catch (BadCredentialsException ex) {
    //         // If username is correct but password is incorrect, return 401 Unauthorized
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
    //     } catch (Exception ex) {
    //         // General error handling for other exceptions
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication failed");
    //     }
    // }
    @PostMapping("/login")
public ResponseEntity<Map<String, Object>> createToken(@RequestBody AuthRequest authRequest) {
    try {
        UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        // Generate JWT token
        String token = jwtUtil.generateToken(userDetails);

        // Fetch user from database to get user ID
        User user = userService.findByUsername(authRequest.getUsername());

        // Return both token and user ID in the response
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId()); // Include user ID
        return ResponseEntity.ok(response);

    } catch (UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } catch (BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (IllegalArgumentException e) {
            // Return a 400 Bad Request if the username already exists
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
