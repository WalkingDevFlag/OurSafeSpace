import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

ENV_EMAIL_SENDER = 'EMAIL_SENDER'
ENV_EMAIL_PASSWORD = 'EMAIL_PASSWORD'
ENV_EMAIL_RECEIVER_1 = 'EMAIL_RECEIVER_1'
ENV_EMAIL_RECEIVER_2 = 'EMAIL_RECEIVER_2'

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587

def load_email_template():
    try:
        template_path = os.path.join(os.path.dirname(__file__), 'email_template.html')
        with open(template_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        app.logger.error("email_template.html not found in api directory.")
        return "<p>Email template not found. Message content: {{message_content}}</p>"

@app.route('/api/send-email', methods=['POST'])
def send_email_route():
    data = request.get_json()
    message_content = data.get('message')
    logged_in_user = data.get('loggedInUser')

    if not message_content or not logged_in_user:
        return jsonify({'error': 'Missing message content or user identifier'}), 400

    sender_email = os.getenv(ENV_EMAIL_SENDER)
    sender_password = os.getenv(ENV_EMAIL_PASSWORD)
    receiver_1_email = os.getenv(ENV_EMAIL_RECEIVER_1)
    receiver_2_email = os.getenv(ENV_EMAIL_RECEIVER_2)

    if not all([sender_email, sender_password, receiver_1_email, receiver_2_email]):
        return jsonify({'error': 'Email configuration missing on server. Please set environment variables.'}), 500

    recipient_email = ''
    if logged_in_user == 'USER1':
        recipient_email = receiver_2_email
    elif logged_in_user == 'USER2':
        recipient_email = receiver_1_email
    else:
        return jsonify({'error': 'Invalid user identifier'}), 400

    try:
        email_template = load_email_template()
        html_content = email_template.replace('{{message_content}}', message_content)

        msg = MIMEMultipart('alternative')
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"A heartfelt message from your love ({logged_in_user})"
        
        msg.attach(MIMEText(html_content, 'html'))
        
        plain_text_content = f"A heartfelt message from your love ({logged_in_user}):\n\n{message_content}"
        msg.attach(MIMEText(plain_text_content, 'plain'))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())
        
        return jsonify({'success': True, 'message': 'Email sent successfully!'})

    except smtplib.SMTPAuthenticationError:
        app.logger.error(f"SMTP Authentication Error for user {sender_email}")
        return jsonify({'error': 'Failed to send email: SMTP Authentication Error. Check sender credentials.'}), 500
    except Exception as e:
        app.logger.error(f"Error sending email: {str(e)}")
        return jsonify({'error': f'Failed to send email: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)