package com.interviewgpt.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.interviewgpt.backend.service.PDFService;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/pdf")
public class PDFController {

    @Autowired
    private PDFService pdfService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadPDF(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId) {
        try {
            String extractedText = pdfService.extractTextFromPDF(file, userId);
            return ResponseEntity.ok("PDF uploaded and text extracted: " + extractedText);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error extracting text from PDF: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}

