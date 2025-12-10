import { motion } from 'framer-motion'
import Section from '../components/Section'
import Card from '../components/Card'
import Button from '../components/Button'
import StructuredData from '../components/StructuredData'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      title: 'Branding',
      description: 'Complete brand identity and design solutions for businesses.',
      items: ['Logo design', 'Brand guidelines', 'Corporate identity', 'Marketing materials']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M3 17l9-5 9 5M3 12l9-5 9 5" />
        </svg>
      ),
      title: 'Marketing',
      description: 'Digital marketing campaigns and strategies to grow your business.',
      items: ['Social media marketing', 'Email campaigns', 'SEO optimization', 'Content creation']
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Development',
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
      items: ['Company registration', 'Beneficial ownership', 'Business documentation', 'Compliance setup']
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
      title: 'Printing',
      description: 'Professional printing and stationery services for businesses.',
      items: ['Business cards', 'Stationery design', 'Marketing materials', 'Large format printing']
    }
  ]

  const testimonials = [
    {
      quote: "MUTAG HOUSE's visual content made our flowers look even more beautiful than in real life! Their social media expertise helped us triple our online inquiries while maintaining our premium brand image.",
      author: "FlowerClub Marketing Director",
      outcome: "3x increase in qualified leads"
    },
    {
      quote: "Professional, fast and on-brand — we help businesses launch faster and achieve their marketing goals.",
      author: "Client Testimonial",
      outcome: "100% on-time delivery"
    }
  ]

  return (
    <>
      <Helmet>
        <title>MUTAG HOUSE | Premium Branding & Marketing Solutions</title>
        <meta name="description" content="MUTAG HOUSE is a branding and marketing agency in Centurion, South Africa. We provide professional logos, websites, printing services, and growth campaigns that help businesses win work, save time, and build credibility." />
        <meta property="og:title" content="MUTAG HOUSE | Premium Branding & Marketing Solutions" />
        <meta property="og:description" content="Premium branding and marketing solutions for enterprises that demand excellence." />
        <meta property="og:image" content="https://www.mutag.co.za/Logo-no-background.png" />
        <meta property="og:url" content="https://www.mutag.co.za/" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.mutag.co.za/" />
      </Helmet>
      <StructuredData type="organization" />
      <StructuredData type="localBusiness" />
      <StructuredData type="website" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        {/* Background Gradient */}
        <div className="absolute inset-0 gradient-primary opacity-10" />
        
        {/* Content */}
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Built to Brand.
              <br />
              <span className="gradient-text">Designed to Deliver.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-light/70 max-w-3xl mx-auto mb-10">
              We transform ambitious ideas into compelling brands that command attention, build authority, and drive meaningful business growth through strategic design and precision execution.
            </p>
            <a href="/contact">
              <Button
                size="lg"
                className="text-base px-10 py-4"
              >
                Request Private Strategy Call
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-brand-blue/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-brand-blue rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Preview */}
      <Section
        title="Who We Are"
        background="dark"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-brand-light/80 mb-6">
              MUTAG HOUSE is a forward-thinking branding and marketing company based in Centurion, South Africa. We specialize in helping businesses of all sizes build strong brand identities through strategic design, impactful content, and modern marketing solutions.
            </p>
            <p className="text-lg text-brand-light/80 mb-6">
              We work closely with entrepreneurs, SMEs, and established corporations to develop the visuals, platforms, and strategies they need to thrive. Whether you're launching a new business, refreshing your identity, or scaling up your marketing — we're here to deliver excellence with purpose.
            </p>
            <a
              href="/about"
              className="text-brand-blue hover:underline font-medium"
            >
              Learn more about our approach →
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="/images/team-collaboration.png"
              alt="MUTAG HOUSE team collaborating"
              className="rounded-2xl shadow-2xl"
              loading="lazy"
              onError={(e) => {
                console.error('Image failed to load:', e.target.src)
                e.target.style.display = 'none'
              }}
            />
          </motion.div>
        </div>
      </Section>

      {/* Services */}
      <Section
        title="Services That Move the Needle"
        subtitle="Results across retail, services and public entities — from identity to go‑to‑market."
        background="light"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={service.title} delay={index * 0.1}>
              <div className="text-brand-blue mb-4">{service.icon}</div>
              <h3 className="font-heading text-xl mb-3">{service.title}</h3>
              <p className="text-brand-dark/70 mb-4">{service.description}</p>
              <ul className="space-y-2 text-sm text-brand-dark/60">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/services">
            <Button variant="secondary">
              See Full Capabilities
            </Button>
          </a>
        </div>
      </Section>

      {/* Work Preview */}
      <Section
        title="Work That Speaks"
        subtitle="Results across retail, services and public entities — from identity to go‑to‑market."
        background="dark"
      >
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card>
            <h3 className="font-heading text-xl mb-3">Proven Results</h3>
            <p className="text-brand-light/70">
              Professional, fast and on-brand — we help businesses launch faster and achieve their marketing goals.
            </p>
          </Card>
          <Card delay={0.1}>
            <h3 className="font-heading text-xl mb-3">Trusted Signals</h3>
            <p className="text-brand-light/70">
              100% on-time delivery • South Africa based • Professional documentation services
            </p>
          </Card>
          <Card delay={0.2}>
            <h3 className="font-heading text-xl mb-3">Selected Outcomes</h3>
            <p className="text-brand-light/70">
              +45% lead enquiries after website launch • Professional brand identity packages
            </p>
          </Card>
        </div>
        <div className="text-center">
          <a href="/work">
            <Button variant="primary">
              View Portfolio
            </Button>
          </a>
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        title="Trusted by Industry Leaders"
        background="light"
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} delay={index * 0.1}>
              <p className="text-brand-dark/80 text-lg mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-brand-blue/20 pt-4">
                <p className="font-medium text-brand-dark">{testimonial.author}</p>
                <p className="text-sm text-brand-blue mt-1">{testimonial.outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section
        background="dark"
        className="gradient-primary/10"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Let's Build Your Brand Today
          </h2>
          <p className="text-xl text-brand-light/70 mb-10">
            Ready to transform your business? Get in touch and let's discuss how MUTAG HOUSE can help you achieve your branding and marketing goals.
          </p>
          <a href="/contact">
            <Button size="lg">
              Request Private Strategy Call
            </Button>
          </a>
        </div>
      </Section>
    </>
  )
}

export default Home
