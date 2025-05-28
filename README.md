# OurSafeSpace 💖

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=flat)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=flat)
![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white&style=flat)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=flat)
![Gmail](https://img.shields.io/badge/Gmail-EA4335?logo=gmail&logoColor=white&style=flat)


Our Safe Space is a private and loving one-page website designed for couples to share their thoughts, feelings, complaints, and inconveniences securely. It features a soft, heart-themed design with pastel colors, creating a simple and heartfelt user interface. Users can log in securely to a private space and use a submission form to share their messages.

### Demo

![OurSafeSpace Demo](assets/demo.gif)

## Features

- **Private Couple Space:** Only two users can access the space.
- **Secure Login:** Credentials required for privacy.
- **Heartfelt UI:** Soft, heart-themed, pastel design for emotional comfort.
- **Message Submission:** Share thoughts and feelings via a simple form.
- **Email Notifications:** Messages are sent securely via email using Gmail SMTP.
- **Easy Deployment:** Ready for Vercel with serverless backend.


## Getting Started

### 1. Clone the Repo

```
git clone https://github.com/WalkingDevFlag/OurSafeSpace.git
cd OurSafeSpace
```

### 2. Install Dependencies

**Frontend:**
```
npm install
```

**Backend:**
```
pip install -r api/requirements.txt
```

### 3. Configure Environment

Create a `.env` file in the root:

```
USER1_EMAIL=your_email1@gmail.com
USER1_PASSWORD=your_password_or_app_password
USER2_EMAIL=your_email2@gmail.com
USER2_PASSWORD=your_password_or_app_password

EMAIL_SENDER='email1@gmail.com'
EMAIL_PASSWORD='gmailapppassword'

EMAIL_RECEIVER_1='email2@gmail.com'
EMAIL_RECEIVER_2='email1@gmail.com'
```

> **Tip:** Use [Gmail App Passwords](https://support.google.com/accounts/answer/185833) for secure email integration.

### 4. Run Locally

**Frontend:**
```
npm run dev
```
**Backend:**
```
python api/index.py
```


### Deployment

This project is ready for [Vercel](https://vercel.com/):

- The frontend is served as a static site.
- The backend runs as serverless functions.
- See `vercel.json` for routing configuration.


### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details
