# Google OAuth2 Setup for Nodemailer

This guide explains how to set up Google OAuth2 credentials to enable Nodemailer to send emails via Gmail SMTP securely.

## Steps

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).

2. Create a new project or select an existing one.

3. Enable the "Gmail API" for your project:
   - Navigate to "APIs & Services" > "Library".
   - Search for "Gmail API" and enable it.

4. Create OAuth2 credentials:
   - Go to "APIs & Services" > "Credentials".
   - Click "Create Credentials" > "OAuth client ID".
   - Configure the consent screen if prompted.
   - Choose "Web application" as the application type.
   - Add `https://developers.google.com/oauthplayground` as an authorized redirect URI.
   - Save and note the `CLIENT_ID` and `CLIENT_SECRET`.

5. Obtain a refresh token:
   - Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
   - Click the gear icon (settings) and check "Use your own OAuth credentials".
   - Enter your `CLIENT_ID` and `CLIENT_SECRET`.
   - In Step 1, select "Gmail API v1" > "https://mail.google.com/" scope.
   - Click "Authorize APIs" and sign in with your Gmail account.
   - Click "Exchange authorization code for tokens".
   - Copy the `refresh_token`.

6. Update your `server/otp.js` file:
   - Replace `YOUR_GOOGLE_CLIENT_ID`, `YOUR_GOOGLE_CLIENT_SECRET`, and `YOUR_REFRESH_TOKEN` with the values obtained.

7. Restart your backend server.

## Notes

- Ensure your Gmail account has 2-Step Verification enabled.
- Use OAuth2 for secure and reliable email sending.
- Keep your credentials secure and do not commit them to version control.

---

This setup will enable the OTP email sending to work correctly with Nodemailer using OAuth2 authentication.
