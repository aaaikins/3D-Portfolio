import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { Particles } from "../components/Particles";
import Input, { EmailIcon, UserIcon, MessageIcon } from "../components/Input";
import Button, { SendIcon } from "../components/Button";
import { useNotifications } from "../components/Toast";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const notifications = useNotifications();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      notifications.error("Please fix the errors in the form before submitting.");
      return;
    }
    
    setIsLoading(true);
    setFormErrors({});

    try {
      // Form submitted successfully
      await emailjs.send(
        "service_79b0nyj",
        "template_17us8im",
        {
          from_name: formData.name,
          to_name: "Aikins",
          from_email: formData.email,
          to_email: "aaache27@colby.edu",
          message: formData.message,
        },
        "pn-Bw_mS1_QQdofuV"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      notifications.success("Your message has been sent successfully! I'll get back to you soon.", {
        action: {
          label: "Send another",
          handler: () => {
            // Scroll back to form or do nothing since we're already here
          }
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.error('Email send error:', error);
      notifications.error("Something went wrong. Please try again or contact me directly at aaache27@colby.edu", {
        action: {
          label: "Copy email",
          handler: () => {
            navigator.clipboard.writeText("aaache27@colby.edu");
            notifications.info("Email address copied to clipboard!");
          }
        }
      });
    }
  };
  return (
    <section id="contact" className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center max-w-lg mx-auto"
      >
        {/* Contact Header */}
        <motion.div 
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-royal to-lavender mb-6 shadow-lg shadow-royal/25">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Let's Talk</h2>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
            Whether you're looking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help.
            Let's connect and discuss how we can work together!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="w-full p-8 border border-white/10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
              required
              autoComplete="name"
              leftIcon={<UserIcon />}
              maxLength={50}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              required
              autoComplete="email"
              leftIcon={<EmailIcon />}
            />

            <Input
              label="Message"
              name="message"
              type="textarea"
              placeholder="Tell me about your project or how I can help you..."
              value={formData.message}
              onChange={handleChange}
              error={formErrors.message}
              required
              rows={5}
              leftIcon={<MessageIcon />}
              maxLength={1000}
              helperText="Share your project details, timeline, or any questions you have."
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
              rightIcon={!isLoading && <SendIcon />}
              ariaLabel={isLoading ? "Sending your message..." : "Send your message"}
            >
              {isLoading ? "Sending Message..." : "Send Message"}
            </Button>
          </form>
          
          {/* Alternative contact info */}
          <motion.div 
            className="mt-8 pt-8 border-t border-white/10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-neutral-400 mb-4">
              Prefer to reach out directly?
            </p>
            <a 
              href="mailto:aaache27@colby.edu"
              className="inline-flex items-center gap-2 text-aqua hover:text-mint transition-colors duration-200 font-medium"
            >
              <EmailIcon className="w-4 h-4" />
              aaache27@colby.edu
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
