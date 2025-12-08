import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Card from '../components/Card'
import Button from '../components/Button'
import StructuredData from '../components/StructuredData'
import { Helmet } from 'react-helmet-async'

const Services = () => {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      title: 'Branding & Design',
      description: 'Complete brand identity and design solutions for businesses.',
      items: ['Logo design', 'Brand guidelines', 'Corporate identity', 'Marketing materials']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M3 17l9-5 9 5M3 12l9-5 9 5" />
        </svg>
      ),
      title: 'Marketing Services',
      description: 'Digital marketing campaigns and strategies to grow your business.',
      items: ['Social media marketing', 'Email campaigns', 'SEO optimization', 'Content creation']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Development Services',
      description: 'Professional websites and digital solutions for businesses.',
      items: ['Corporate websites', 'E-commerce platforms', 'Landing pages', 'SEO optimization']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Business Setup',
      description: 'Complete business registration and documentation services.',
      items: [
        'Company registration',
        <Link key="bo" to="/beneficial-ownership" className="text-brand-blue hover:underline font-semibold">Beneficial ownership</Link>,
        'Business documentation',
        'Compliance setup'
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Presentations & Content',
      description: 'Professional presentations and content creation services.',
      items: ['PowerPoint presentations', 'Investor decks', 'Sales materials', 'Content writing']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      ),
      title: 'Print Services',
      description: 'Professional printing and stationery services for businesses.',
      items: ['Business cards', 'Stationery design', 'Marketing materials', 'Large format printing']
    }
  ]

  const benefits = [
    {
      title: 'Comprehensive Solutions',
      description: 'We offer a complete range of branding and marketing services, from initial concept development to final execution.'
    },
    {
      title: 'Strategic Approach',
      description: 'Every project begins with a thorough understanding of your business, your market, and your goals.'
    },
    {
      title: 'Modern Technology',
      description: 'We leverage the latest tools and technologies to create websites and digital solutions that are fast, secure, and optimized.'
    },
    {
      title: 'Local Expertise',
      description: 'Based in Centurion, we understand the South African market and can help you navigate local business requirements.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Branding, Web & Marketing Services in Centurion | MUTAG HOUSE</title>
        <meta name="description" content="Comprehensive branding, web development, and marketing services in Centurion. From unforgettable logos and fast websites to reliable printing and growth campaigns - we help South African businesses succeed." />
        <meta property="og:title" content="Branding, Web & Marketing Services | MUTAG HOUSE" />
        <meta property="og:description" content="Comprehensive branding, web development, and marketing services in Centurion." />
        <link rel="canonical" href="https://www.mutag.co.za/services" />
      </Helmet>
      <StructuredData type="organization" />

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
            Branding, Web & Marketing Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-light/70 max-w-3xl mx-auto"
          >
            Logos that make you unforgettable. Websites that convert. Printing that shows up on time.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <Section background="light">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={service.title} delay={index * 0.1}>
              <div className="text-brand-blue mb-4">{service.icon}</div>
              <h3 className="font-heading text-xl mb-3">{service.title}</h3>
              <p className="text-brand-dark/70 mb-4">{service.description}</p>
              <ul className="space-y-2 text-sm text-brand-dark/60">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {typeof item === 'string' ? item : item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Choose Our Services */}
      <Section
        title="Why Choose Our Services"
        background="dark"
      >
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-brand-light/80 text-center">
            At MUTAG HOUSE, we understand that your brand is one of your most valuable assets. That's why we take a comprehensive, strategic approach to every project, ensuring that every element of your brand identity and marketing strategy works together to achieve your business goals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={benefit.title} delay={index * 0.1}>
              <h3 className="font-heading text-xl mb-3 text-brand-blue">{benefit.title}</h3>
              <p className="text-brand-light/70">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section
        title="Our Process"
        background="light"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            { step: '1', title: 'Discovery', description: 'We start by understanding your business, your goals, and your challenges through detailed consultations and research.' },
            { step: '2', title: 'Strategy', description: 'Based on our findings, we develop a comprehensive strategy that aligns with your business objectives and market position.' },
            { step: '3', title: 'Design & Development', description: 'Our creative team brings the strategy to life through compelling designs and robust technical implementation.' },
            { step: '4', title: 'Launch & Support', description: 'We ensure smooth launches and provide ongoing support to help you maximize the value of your investment.' }
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="gradient-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-heading text-xl mb-2 text-brand-dark">{item.title}</h3>
                <p className="text-brand-dark/70">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="dark" className="gradient-primary/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Ready to Elevate Your Business?
          </h2>
          <p className="text-xl text-brand-light/70 mb-10">
            Let's discuss how our services can help you achieve your goals.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact">
              <Button size="lg">
                Request Private Strategy Call
              </Button>
            </Link>
            <Link to="/work">
              <Button variant="secondary" size="lg">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}

export default Services

