# 📧 EmailJS Setup Guide

Your contact form is now configured to use EmailJS! Follow these steps to complete the setup:

## 🚀 Quick Setup (5 minutes)

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

### 2. Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended - easiest setup)
   - **Outlook**
   - **Yahoo**
   - Or any SMTP service
4. Follow the connection steps and **test the service**

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
From: {{from_name}} <{{from_email}}>
To: {{to_name}} <{{to_email}}>
Subject: Portfolio Contact: {{subject}}

Hi {{to_name}},

You received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. **Test the template** with sample data

### 4. Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your EmailJS credentials:
   ```env
   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id  
   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
   ```

3. Find these values in EmailJS dashboard:
   - **Public Key**: Account → API Keys → Public Key
   - **Service ID**: Email Services → Your service → Service ID
   - **Template ID**: Email Templates → Your template → Template ID

### 5. Test Your Setup
```bash
npm run build && npm run dev
```
1. Fill out the contact form
2. Submit and check for success message
3. Verify email received in your inbox

## 🔒 Security Notes

- ✅ **Public Key**: Safe to expose (it's meant to be public)
- ✅ **Environment Variables**: Automatically handled by Vite
- ✅ **Rate Limiting**: EmailJS provides built-in spam protection
- ✅ **Email Validation**: Form includes client-side validation

## 📊 Free Tier Limits

- **100 emails/month** (more than enough for portfolio)
- **2 email services**
- **3 email templates**
- **Basic analytics**

## 🚨 Troubleshooting

### Common Issues:

1. **"EmailJS not initialized"**
   - Check if `.env.local` file exists
   - Verify `VITE_EMAILJS_PUBLIC_KEY` is set correctly

2. **"Service not found"**
   - Verify `VITE_EMAILJS_SERVICE_ID` matches your EmailJS service
   - Ensure email service is active and tested

3. **"Template not found"**
   - Check `VITE_EMAILJS_TEMPLATE_ID` is correct
   - Verify template variables match the code

4. **Emails not received**
   - Check spam/junk folder
   - Verify template has correct `{{to_email}}` variable
   - Test the EmailJS service independently

### Debug Mode:
Open browser console to see EmailJS response details.

## 🎯 Next Steps (Optional)

- **Custom Domain**: Add your domain to EmailJS for better deliverability
- **Auto-Reply**: Create a second template for automatic responses
- **Analytics**: Monitor form submissions in EmailJS dashboard
- **Rate Limiting**: Configure per-user limits for additional security

---

**Need Help?** EmailJS has excellent documentation at [docs.emailjs.com](https://www.emailjs.com/docs/)

Your contact form is now enterprise-ready! 🚀