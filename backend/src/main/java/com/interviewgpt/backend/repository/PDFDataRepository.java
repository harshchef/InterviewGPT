package com.interviewgpt.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interviewgpt.backend.entity.PDFData;

public interface PDFDataRepository extends JpaRepository<PDFData, Long> {

    PDFData findByUserId(Long userId);
}
