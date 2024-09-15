package com.interviewgpt.backend.service;
import com.interviewgpt.backend.models.User;
import com.interviewgpt.backend.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Extract user details from Google OAuth response
        String googleId = oAuth2User.getAttribute("sub");
        String name = oAuth2User.getAttribute("name");
        String email = oAuth2User.getAttribute("email");
        String picture = oAuth2User.getAttribute("picture");

        // Check if user already exists in the database
        Optional<User> existingUser = Optional.ofNullable(userRepository.findByGoogleId(googleId));

        User user;
        if (existingUser.isPresent()) {
            // Update existing user
            user = existingUser.get();
            user.setName(name);
            user.setEmail(email);
            user.setPicture(picture);
        } else {
            // Create new user
            user = new User();
            user.setGoogleId(googleId);
            user.setName(name);
            user.setEmail(email);
            user.setPicture(picture);
        }

        userRepository.save(user); // Save or update the user in the database

        return oAuth2User;
    }
}
