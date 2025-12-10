import { useState } from 'react'
import { motion } from 'framer-motion'
import Section from '../components/Section'
import Button from '../components/Button'
import StructuredData from '../components/StructuredData'
import { Helmet } from 'react-helmet-async'

const Contact = () => {
  const [formData, setFormData] = useState({
    company: '',
    decisionMaker: '',
    employees: '',
    email: '',
    phone: '',
    summary: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }
    
    if (!formData.decisionMaker.trim()) {
      newErrors.decisionMaker = 'Decision maker name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.summary.trim()) {
      newErrors.summary = 'Brief summary is required'
    } else if (formData.summary.trim().length < 20) {
      newErrors.summary = 'Please provide at least 20 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // Example: Replace with your actual form submission endpoint
      // For Netlify Forms, use: action="/" method="POST" data-netlify="true"
      // For custom API, use fetch to your endpoint
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, replace with actual API call:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      setSubmitStatus('success')
      setFormData({
        company: '',
        decisionMaker: '',
        employees: '',
        email: '',
        phone: '',
        summary: ''
      })
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/thank-you'
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const employeeSizes = [
    '1-10',
    '11-50',
    '51-200',
    '201-500',
    '500+'
  ]

  return (
    <>
      <Helmet>
        <title>Contact MUTAG HOUSE | Corporate Enquiries</title>
        <meta name="description" content="Contact MUTAG HOUSE for corporate branding, marketing, and web development services. Get in touch via email, phone, or WhatsApp. Request a formal quote or proposal for your business needs." />
        <meta property="og:title" content="Contact MUTAG HOUSE | Corporate Enquiries" />
        <meta property="og:description" content="Contact MUTAG HOUSE for corporate branding, marketing, and web development services." />
        <link rel="canonical" href="https://www.mutag.co.za/contact" />
      </Helmet>
      <StructuredData type="organization" />
      <StructuredData type="localBusiness" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="container relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6"
          >
            Let's Build Something Great
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-light/70 max-w-3xl mx-auto"
          >
            Ready to transform your business? Get in touch and let's discuss how MUTAG HOUSE can help you achieve your branding and marketing goals.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <Section background="dark">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl mb-8">Get In Touch</h2>
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-medium text-brand-blue mb-2">Email</h3>
                <a
                  href="mailto:info@mutag.co.za"
                  className="text-brand-light/80 hover:text-brand-blue transition-luxury"
                >
                  info@mutag.co.za
                </a>
              </div>
              <div>
                <h3 className="font-medium text-brand-blue mb-2">Phone</h3>
                <a
                  href="tel:+27729572238"
                  className="text-brand-light/80 hover:text-brand-blue transition-luxury"
                >
                  +27 72 957 2238
                </a>
              </div>
              <div>
                <h3 className="font-medium text-brand-blue mb-2">WhatsApp</h3>
                <a
                  href="https://wa.link/rgwahs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-light/80 hover:text-brand-blue transition-luxury"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
              <div>
                <h3 className="font-medium text-brand-blue mb-2">Location</h3>
                <p className="text-brand-light/80">Centurion, South Africa</p>
              </div>
            </div>
            
            {/* Trust Signals */}
            <div className="border-t border-brand-blue/20 pt-8">
              <p className="text-sm text-brand-light/60 mb-4">Trusted by:</p>
              <div className="flex flex-wrap gap-6 opacity-60">
                <img src="/flowerclub-logo.png" alt="FlowerClub" className="h-8 w-auto grayscale" loading="lazy" />
                <img src="/attorneys-logo.png" alt="Mathibele Mahlaela Attorneys" className="h-8 w-auto grayscale" loading="lazy" />
              </div>
            </div>
          </motion.div>

          {/* Enterprise Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company Name <span className="text-brand-blue">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full bg-brand-dark/50 border rounded-lg px-4 py-3 text-brand-light placeholder-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-luxury ${
                    errors.company ? 'border-red-500' : 'border-brand-blue/20'
                  }`}
                  placeholder="Your company name"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                )}
              </div>

              <div>
                <label htmlFor="decisionMaker" className="block text-sm font-medium mb-2">
                  Decision Maker Name <span className="text-brand-blue">*</span>
                </label>
                <input
                  type="text"
                  id="decisionMaker"
                  name="decisionMaker"
                  value={formData.decisionMaker}
                  onChange={handleChange}
                  className={`w-full bg-brand-dark/50 border rounded-lg px-4 py-3 text-brand-light placeholder-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-luxury ${
                    errors.decisionMaker ? 'border-red-500' : 'border-brand-blue/20'
                  }`}
                  placeholder="Your name"
                />
                {errors.decisionMaker && (
                  <p className="text-red-500 text-sm mt-1">{errors.decisionMaker}</p>
                )}
              </div>

              <div>
                <label htmlFor="employees" className="block text-sm font-medium mb-2">
                  Company Size
                </label>
                <select
                  id="employees"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  className="w-full bg-brand-dark/50 border border-brand-blue/20 rounded-lg px-4 py-3 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-blue transition-luxury"
                >
                  <option value="">Select company size</option>
                  {employeeSizes.map((size) => (
                    <option key={size} value={size}>
                      {size} employees
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-brand-blue">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-brand-dark/50 border rounded-lg px-4 py-3 text-brand-light placeholder-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-luxury ${
                    errors.email ? 'border-red-500' : 'border-brand-blue/20'
                  }`}
                  placeholder="your.email@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-brand-dark/50 border border-brand-blue/20 rounded-lg px-4 py-3 text-brand-light placeholder-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-luxury"
                  placeholder="+27 XX XXX XXXX"
                />
              </div>

              <div>
                <label htmlFor="summary" className="block text-sm font-medium mb-2">
                  Brief Summary <span className="text-brand-blue">*</span>
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-brand-dark/50 border rounded-lg px-4 py-3 text-brand-light placeholder-brand-light/40 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-luxury resize-none ${
                    errors.summary ? 'border-red-500' : 'border-brand-blue/20'
                  }`}
                  placeholder="Tell us about your project, goals, and timeline..."
                />
                {errors.summary && (
                  <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
                )}
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
                  Thank you! We'll be in touch within 24-48 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                  Something went wrong. Please try again or contact us directly.
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Private Review'}
              </Button>
            </form>
          </motion.div>
        </div>
      </Section>
    </>
  )
}

export default Contact

