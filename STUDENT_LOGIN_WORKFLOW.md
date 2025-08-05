### Simple Explanation

1.  **You Fill the Form:** On the "Student Login" page, you enter your email and password and click "Sign In".
2.  **The App Calls for Help:** The login page takes your details and sends them to a central manager called `AuthContext`.
3.  **Firebase Checks Your ID:** `AuthContext` asks Firebase (the authentication service) to verify if your email and password are correct.
4.  **You're In or Try Again:**
    *   **If Correct:** Firebase gives a thumbs-up. The app logs you in and sends you to your "Student Dashboard".
    *   **If Incorrect:** Firebase gives a thumbs-down. The login page shows an error message like "Incorrect password."

---

### Visual Workflow

```mermaid
graph TD
    A[User Enters Email/Password on Login Page] --> B{Clicks "Sign In"};
    B --> C[Login Component calls the login() function];
    C --> D[AuthContext sends credentials to Firebase];
    D --> E{Firebase checks if credentials are valid};
    E -->|✅ Yes| F[User is authenticated];
    F --> G[App redirects to /student/dashboard];
    E -->|❌ No| H[Firebase returns an error];
    H --> I[Login Page displays the error message];
```
