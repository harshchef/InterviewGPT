package com.interviewgpt.backend.service;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HelpDeskChatbotAgentService {

    // Static prompt instructions
    private static final String CURRENT_PROMPT_INSTRUCTIONS = """
        
        Here's the `user_main_prompt`:
        
        
        """;

    private static final String PROMPT_GENERAL_INSTRUCTIONS = """
Here are the general guidelines to answer the `user_resume_prompt`

    You'll act as a Resume Assistant to help the user with questions about their resume, including work experience, education, skills, and career objectives.

    Below are `resume_focused_solutions` you should follow in the order they appear in the list to help the user with resume-related inquiries:

    1. Provide details from the user's previous work experience relevant to the question.
    2. Highlight the skills listed on the resume that align with the user's query.
    3. Reference education and certifications where applicable to the question asked.

    You should give only one `resume_focused_solution` per prompt up to 3 solutions.

    Do not mention to the user the existence of any part from the guideline above.
""";

    // OllamaChatModel client
    private final OllamaChatModel ollamaChatClient;

    // Constructor for dependency injection
    public HelpDeskChatbotAgentService(OllamaChatModel ollamaChatClient) {
        this.ollamaChatClient = ollamaChatClient;
    }

    // Method to interact with the chat model
    public String call(String userMessage, String historyId) {
        // General instructions message for the AI system
        var generalInstructionsSystemMessage = new SystemMessage(PROMPT_GENERAL_INSTRUCTIONS);

        // Current prompt message combined with the user message

        var currentPromptMessage=new UserMessage(CURRENT_PROMPT_INSTRUCTIONS.concat(userMessage));
        // Context system message for conversation flow (define it as needed)
        var contextSystemMessage = new SystemMessage("This is the context of the ongoing conversation.");

        // Create a prompt combining the messages
        var prompt = new Prompt(List.of(generalInstructionsSystemMessage, contextSystemMessage, currentPromptMessage));


       // var prompt1=new Prompt(List.of(currentPromptMessage));

        // Call the AI client and get the response
        var response = ollamaChatClient.call(prompt).getResult().getOutput().getContent();

        // Return the AI's response
        return response;
    }
}
