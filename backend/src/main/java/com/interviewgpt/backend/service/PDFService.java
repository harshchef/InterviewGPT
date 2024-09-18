package com.interviewgpt.backend.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.interviewgpt.backend.entity.PDFData;
import com.interviewgpt.backend.entity.User;
import com.interviewgpt.backend.repository.PDFDataRepository;
import com.interviewgpt.backend.repository.UserRepository;

import java.io.IOException;

@Service
public class PDFService {

    @Autowired
    private PDFDataRepository pdfDataRepository;

    @Autowired
    private UserRepository userRepository;

    public String extractTextFromPDF(MultipartFile file, Long userId) throws IOException {
        // Load the PDF
        PDDocument document = PDDocument.load(file.getInputStream());
        PDFTextStripper pdfStripper = new PDFTextStripper();
        String text = pdfStripper.getText(document);
        document.close();

        // Find the user by ID
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Save extracted text to the database along with the user reference
        PDFData pdfData = new PDFData();
        pdfData.setExtractedText(text);
        pdfData.setUser(user);  // Associate PDFData with User
        pdfDataRepository.save(pdfData);

        return text;
    }
}
