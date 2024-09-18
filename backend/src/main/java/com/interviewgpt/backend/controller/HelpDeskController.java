 package com.interviewgpt.backend.controller;

// import org.springframework.ai.chat.client.ResponseEntity;
// import org.springframework.http.HttpStatus;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.demo.models.HelpDeskRequest;
// import com.example.demo.models.HelpDeskResponse;
// import com.example.demo.service.HelpDeskChatbotAgentService;

// import org.springframework.http.HttpStatus;

// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/helpdesk")
// public class HelpDeskController {

//     private final HelpDeskChatbotAgentService helpDeskChatbotAgentService;

//     // All-args constructor for dependency injection
//     public HelpDeskController(HelpDeskChatbotAgentService helpDeskChatbotAgentService) {
//         this.helpDeskChatbotAgentService = helpDeskChatbotAgentService;
//     }

//     // POST endpoint to handle chat requests
//     @PostMapping("/chat")
//     public ResponseEntity<HelpDeskResponse> chat(@RequestBody HelpDeskRequest helpDeskRequest) {
//         // Calling the HelpDeskChatbotAgentService with the user prompt and history ID
//         String chatResponse = helpDeskChatbotAgentService.call(helpDeskRequest.getPromptMessage(), helpDeskRequest.getHistoryId());

//         // Returning the chatbot response wrapped in HelpDeskResponse with HTTP status OK
//         return ResponseEntity.ok(new HelpDeskResponse(chatResponse));
//     }
// }

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interviewgpt.backend.model.HelpDeskRequest;
import com.interviewgpt.backend.model.HelpDeskResponse;
import com.interviewgpt.backend.service.HelpDeskChatbotAgentService;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/helpdesk")
public class HelpDeskController {

    private final HelpDeskChatbotAgentService helpDeskChatbotAgentService;

    // Constructor for dependency injection
    public HelpDeskController(HelpDeskChatbotAgentService helpDeskChatbotAgentService) {
        this.helpDeskChatbotAgentService = helpDeskChatbotAgentService;
    }

    // Endpoint to handle chat requests
    @PostMapping("/chat")
    public ResponseEntity<HelpDeskResponse> chat(@RequestBody HelpDeskRequest helpDeskRequest) {
        // Call the HelpDeskChatbotAgentService to handle the user prompt
        String chatResponse = helpDeskChatbotAgentService.call(helpDeskRequest.getPromptMessage(), helpDeskRequest.getHistoryId());

        // Return the response wrapped in HelpDeskResponse with HTTP status OK
        return ResponseEntity.ok(new HelpDeskResponse(chatResponse));
    }
}
