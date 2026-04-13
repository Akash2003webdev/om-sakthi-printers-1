import emailjs from '@emailjs/browser'

// Replace with your EmailJS credentials
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xxxxxxx'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_xxxxxxx'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'xxxxxxxxxxxxxxx'

export async function sendEnquiryEmail(formData) {
  const templateParams = {
    from_name: formData.name,
    phone: formData.phone,
    message: formData.message,
    design_id: formData.designId || 'Custom Enquiry',
    to_email: 'omsakhtiprinters@gmail.com', // Replace with owner's email
  }

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
}

/*
── EmailJS Template Setup ──

Subject: New Enquiry from {{from_name}} - Design {{design_id}}

Body:
Hello Om Sakthi Printers,

You have a new enquiry!

Name: {{from_name}}
Phone: {{phone}}
Design ID: {{design_id}}
Message: {{message}}

Please respond within 24 hours.
*/
