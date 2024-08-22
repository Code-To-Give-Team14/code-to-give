package com.morganstanley.code_to_give;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin("*")
public class TestHelloWord {

    @GetMapping("/")
    public String helloWorld() {
        return "Hello, World!";
    }
}
