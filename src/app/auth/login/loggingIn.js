export async function loggingIn(form) {
    const usernameInput = form.elements.namedItem('username');
    const passwordInput = form.elements.namedItem('password');
    const username = usernameInput?.value.trim() ?? '';
    const password = passwordInput?.value.trim() ?? '';

    if (!username || !password) return { error: "Username and password required." };

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            return { error: data.error || "Login failed." };
        }

        // Store JWT token
        localStorage.setItem('token', data.token);

        // Redirect to dashboard
        window.location.href = "/dashboard";
        return { success: true };
    } catch (err) {
        return { error: "Network error." + err.message };
    }
}