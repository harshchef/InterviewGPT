package com.interviewgpt.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Data
@NoArgsConstructor
@AllArgsConstructor
public class HelpDeskRequest {
    @JsonProperty("prompt_message")
    String promptMessage;

    @JsonProperty("history_id")
    String historyId;

    // getters, no-arg constructor
}