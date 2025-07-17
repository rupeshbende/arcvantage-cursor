# 📧 EmailJS Setup Guide for Contact Form

## Overview
This guide will help you set up EmailJS to send contact form submissions to `arcvantagedesignstudios@gmail.com`.

## Step 1: Create EmailJS Account

1. **Sign up at EmailJS**: https://www.emailjs.com/
2. **Create a free account** (allows 200 emails/month)
3. **Verify your email address**

## Step 2: Add Email Service

1. **Go to EmailJS Dashboard**
2. **Click "Email Services"**
3. **Click "Add New Service"**
4. **Choose "Gmail"**
5. **Connect your Gmail account** (arcvantagedesignstudios@gmail.com)
6. **Note the Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. **Go to "Email Templates"**
2. **Click "Create New Template"**
3. **Use this template**:

```html
Subject: New Contact Form Submission from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Project Type: {{projectType}}
Message: {{message}}

This is a new contact form submission from your website.
```

4. **Save the template**
5. **Note the Template ID** (e.g., `template_xyz789`)

## Step 4: Update Website Code

### Update the HTML file:

Replace `YOUR_USER_ID` in `index.html` with your actual EmailJS User ID:

```html
<script>
    (function() {
        emailjs.init("YOUR_ACTUAL_USER_ID"); // Replace with your real User ID
    })();
</script>
```

### Update the JavaScript file:

Replace the service and template IDs in `js/main.js`:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    to_email: 'arcvantagedesignstudios@gmail.com',
    from_name: formData.name || 'Website Contact',
    from_email: formData.email,
    phone: formData.phone || 'Not provided',
    projectType: formData.projectType || 'Not specified',
    message: formData.message
})
```

## Step 5: Test the Setup

1. **Deploy the updated website**
2. **Fill out the contact form**
3. **Submit the form**
4. **Check your email** (arcvantagedesignstudios@gmail.com)
5. **Verify the email was received**

## Alternative: Mailto Fallback

If EmailJS setup is complex, the website includes a mailto fallback that will:

1. **Open the user's email client**
2. **Pre-fill the email to arcvantagedesignstudios@gmail.com**
3. **Include all form data in the email body**

## EmailJS Configuration Details

### Required IDs:
- **User ID**: Found in EmailJS dashboard
- **Service ID**: From Gmail service setup
- **Template ID**: From email template creation

### Email Template Variables:
- `{{from_name}}` - Contact form name
- `{{from_email}}` - Contact form email
- `{{phone}}` - Contact form phone
- `{{projectType}}` - Selected project type
- `{{message}}` - Contact form message

## Troubleshooting

### If emails aren't sending:
1. **Check EmailJS console** for errors
2. **Verify all IDs are correct**
3. **Test with EmailJS dashboard**
4. **Check Gmail connection**

### If using mailto fallback:
1. **Ensure user has email client configured**
2. **Check browser popup blockers**
3. **Verify email address format**

## Security Considerations

- **EmailJS is client-side** - emails are sent from user's browser
- **Free tier limits** - 200 emails/month
- **Consider upgrading** for business use
- **Backup with mailto** for reliability

## Cost Information

- **Free tier**: 200 emails/month
- **Paid plans**: Start at $15/month for 1,000 emails
- **Enterprise**: Custom pricing for high volume

---

## Quick Setup Checklist

- [ ] Create EmailJS account
- [ ] Add Gmail service
- [ ] Create email template
- [ ] Update website with correct IDs
- [ ] Test contact form
- [ ] Verify email delivery

**Email will be sent to**: arcvantagedesignstudios@gmail.com 