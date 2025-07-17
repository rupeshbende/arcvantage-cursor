# EmailJS Setup Guide for ArcVantage Contact Form

## Why Emails Aren't Being Received

The current contact form uses a `mailto:` link approach, which only opens your email client but doesn't automatically send emails. To actually send emails, we need to set up EmailJS.

## Step-by-Step EmailJS Setup

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (since you're using Gmail)
4. Connect your Gmail account (arcvantagedesignstudios@gmail.com)
5. Note down your **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Template Name:** Contact Form Template

**Subject:** New Contact Form Submission from {{from_name}}

**HTML Content:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>New Contact Form Submission</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{from_name}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{from_email}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{from_phone}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Project Type:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{project_type}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">{{message}}</td>
        </tr>
    </table>
    
    <p style="margin-top: 20px; color: #666;">
        This email was sent from the ArcVantage Design Studios website contact form.
    </p>
</body>
</html>
```

4. Note down your **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., `user_abc123def456`)

### 5. Update the JavaScript Code
Replace the placeholder values in `js/main.js`:

```javascript
// Replace these values with your actual EmailJS credentials
emailjs.init("YOUR_PUBLIC_KEY"); // Your actual public key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

**Example:**
```javascript
emailjs.init("user_abc123def456");
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

### 6. Test the Contact Form
1. Deploy your website
2. Fill out the contact form
3. Submit the form
4. Check your email (arcvantagedesignstudios@gmail.com)

## Alternative Solutions

### Option 1: Use a Different Email Service
- **Formspree**: Free for 50 submissions/month
- **Netlify Forms**: Free with Netlify hosting
- **Google Forms**: Free but less customizable

### Option 2: Server-Side Solution
If you have a server, you can use:
- **Node.js with Nodemailer**
- **PHP with mail() function**
- **Python with smtplib**

### Option 3: Third-Party Form Services
- **Typeform**: Beautiful forms, paid
- **JotForm**: Free tier available
- **Wufoo**: Paid service

## Troubleshooting

### Common Issues:
1. **"Failed to send email" error**
   - Check your EmailJS credentials
   - Verify service and template IDs
   - Check browser console for errors

2. **Emails going to spam**
   - Check spam/junk folder
   - Add sender email to contacts
   - Use a professional email domain

3. **Form not submitting**
   - Check JavaScript console for errors
   - Verify EmailJS SDK is loaded
   - Test with browser developer tools

### Testing Steps:
1. Open browser developer tools (F12)
2. Go to Console tab
3. Submit the contact form
4. Look for success/error messages
5. Check Network tab for API calls

## Free EmailJS Plan Limits
- 200 emails per month
- 2 email services
- 5 email templates
- Perfect for small businesses

## Next Steps
1. Set up EmailJS account
2. Update the JavaScript with your credentials
3. Test the contact form
4. Monitor email delivery
5. Consider upgrading to paid plan if needed

## Support
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- GitHub Issues: For code-related problems 