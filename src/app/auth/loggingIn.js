// function to handle login logic
import { useState } from "react";

export function loggingIn(form) {
    console.log("Logging in...");
    // Simulate a login process

    const usernameInput = form.elements.namedItem('username');
    const passwordInput = form.elements.namedItem('password');
    const username = usernameInput?.value.trim() ?? '';
    const password = passwordInput?.value.trim() ?? '';

    if (!username || !password) return;

    console.log("Login form submitted");

    const timer = setTimeout(() => {
        console.log("User logged in successfully");
        window.location.href = "/dashboard";
    }, 2000);

    // Return a cleanup function if needed
    return () => clearTimeout(timer);
}
