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
ENV_USER1_USERNAME = 'USER1_USERNAME'
ENV_USER2_USERNAME = 'USER2_USERNAME'

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587

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
    # sender_display_name = '' # old variable initialization removed
    if logged_in_user == 'USER1':
        recipient_email = receiver_2_email
        sender_display_name = os.getenv(ENV_USER1_USERNAME, logged_in_user)
    elif logged_in_user == 'USER2':
        recipient_email = receiver_1_email
        sender_display_name = os.getenv(ENV_USER2_USERNAME, logged_in_user)
    else:
        # This case should ideally not be reached due to prior validation
        # but if it is, default to logged_in_user for display name as well
        sender_display_name = logged_in_user 
        return jsonify({'error': 'Invalid user identifier'}), 400

    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"A heartfelt message from your love ({sender_display_name})"
        
        plain_text_content = f"A heartfelt message from your love ({sender_display_name}):\n\n{message_content}"
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