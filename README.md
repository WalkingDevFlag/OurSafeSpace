# Our Safe Space

Our Safe Space is a private and loving one-page website designed for couples to share their thoughts, feelings, complaints, and inconveniences securely.
It features a soft, heart-themed design with pastel colors, creating a simple and heartfelt user interface. Users can log in securely to a private space and use a submission form to share their messages.

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set up Local Credentials:
   Create a file named `.env` in the root of the project and add your local development credentials. This file is gitignored and should not be committed.
   It should contain the following variables:

   ```
   # User Login Credentials
   USER1_USERNAME=your_user1_username
   USER1_PASSWORD=your_user1_password
   USER2_USERNAME=your_user2_username
   USER2_PASSWORD=your_user2_password

   # Email Sending Credentials (for the message sharing feature)
   EMAIL_SENDER=your_sender_email@gmail.com  # Gmail account used to send emails
   EMAIL_PASSWORD=your_gmail_app_password    # App Password for the EMAIL_SENDER account
   EMAIL_RECEIVER_1=receiver1_email@example.com # Email address for User 1 (receives messages from User 2)
   EMAIL_RECEIVER_2=receiver2_email@example.com # Email address for User 2 (receives messages from User 1)
   ```
   **Note on Email Credentials:**
   - The backend is configured by default to use Gmail's SMTP server (`smtp.gmail.com` on port `587`).
   - For `EMAIL_PASSWORD`, it is highly recommended to use an "App Password" generated from your Google Account settings, especially if 2-Step Verification is enabled. This is more secure than using your regular account password.
   
   These credentials are used for local development and testing of the login and email sending functionalities.

3. Run the Frontend (Vite):
   `npm run dev`
   This will start the Vite development server, usually on `http://localhost:5173`.

4. Run the Backend (Python Flask):
   The backend is a Python Flask application located in the `/api` directory.
   - **Prerequisites:** Python 3.x, pip. It's recommended to use a Python virtual environment.
   - **Install dependencies:**
     ```bash
     # If using a virtual environment (recommended)
     # python -m venv .venv
     # source .venv/bin/activate  # On Windows: .venv\Scripts\activate
     pip install -r api/requirements.txt
     ```
   - **Run the backend server:**
     ```bash
     python api/index.py
     ```
     This will start the Flask development server, typically on `http://localhost:5001` as configured in `api/index.py`. The frontend (running via `npm run dev`) will proxy requests to this backend if it's configured to do so (e.g., via Vite's `server.proxy` option, though this project uses direct API calls to `/api/send-email` which Vercel and `vc dev` handle).

5. Running both Frontend and Backend with Vercel CLI:
   If you have the Vercel CLI installed, you can run both the frontend and backend together using:
   ```bash
   vc dev
   ```
   This command will read your `vercel.json` configuration and simulate the Vercel deployment environment locally, running both the Vite frontend and the Python Flask API. It handles routing and environment variables from `.env`.

## Vercel Deployment

This project is configured for easy deployment to Vercel via the `vercel.json` file.
- The Vite frontend is built as a static site (`@vercel/static-build`).
- The Python Flask API in the `api` directory is deployed as serverless functions (`@vercel/python`).
- Routes are defined in `vercel.json` to direct `/api/*` requests to the Python backend and all other requests to the frontend's `index.html` for client-side routing.

To deploy, ensure you have the Vercel CLI installed and are logged in. Then, from the project root, you can typically run:
```bash
vercel
```
And follow the CLI prompts. Vercel will automatically pick up the `vercel.json` configuration. Remember to set up your environment variables (User credentials and Email credentials) in the Vercel project settings.
