package com.interviewgpt.backend.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    @GetMapping("/contact")
    public String getContactPage() {
        return "This is the contact page. Only accessible to logged-in users.";
    }
}
