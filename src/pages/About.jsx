import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Card from '../components/Card'
import Button from '../components/Button'
import StructuredData from '../components/StructuredData'
import { Helmet } from 'react-helmet-async'

const About = () => {
  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in every project, ensuring that our work meets the highest standards of quality and professionalism.'
    },
    {
      title: 'Innovation',
      description: 'We stay ahead of industry trends and leverage the latest technologies and design approaches to deliver cutting-edge solutions.'
    },
    {
      title: 'Partnership',
      description: 'We view every client relationship as a partnership, working closely with you to understand your goals and deliver solutions that drive success.'
    },
    {
      title: 'Reliability',
      description: 'You can count on us to deliver on time, within budget, and to the highest quality standards. We\'re committed to your success.'
    }
  ]

  const approach = [
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      title: 'Strategic Design',
      description: 'We don\'t just create beautiful designs – we develop strategic visual identities that communicate your brand\'s unique value proposition and resonate with your target audience.'
    },
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Results-Driven Marketing',
      description: 'Our marketing strategies are designed to deliver measurable outcomes. We focus on campaigns that drive growth, increase brand awareness, and generate qualified leads.'
    },
    {
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Modern Technology',
      description: 'We leverage the latest tools and technologies to create websites and digital solutions that are fast, secure, and optimized for search engines.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>About MUTAG HOUSE | Branding & Marketing Agency in Centurion</title>
        <meta name="description" content="Learn about MUTAG HOUSE, a forward-thinking branding and marketing agency in Centurion, South Africa. We help businesses build strong brand identities through strategic design and modern marketing solutions." />
        <meta property="og:title" content="About MUTAG HOUSE | Branding & Marketing Agency" />
        <meta property="og:description" content="Learn about MUTAG HOUSE, a forward-thinking branding and marketing agency in Centurion, South Africa." />
        <link rel="canonical" href="https://www.mutag.co.za/about" />
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
            About MUTAG HOUSE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-light/70 max-w-3xl mx-auto"
          >
            A forward-thinking branding and marketing agency helping businesses build strong brand identities through strategic design and modern marketing solutions.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <Section title="Our Story" background="dark">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-brand-light/80 mb-6">
              MUTAG HOUSE was founded with a clear vision: to help businesses of all sizes build compelling brand identities that drive growth and success. We've established ourselves as a trusted partner for entrepreneurs, small and medium enterprises, and established corporations looking to elevate their brand presence.
            </p>
            <p className="text-lg text-brand-light/80 mb-6">
              Our journey began with a simple belief – that every business, regardless of size, deserves access to professional branding and marketing services that can transform their market presence. We combine creative excellence with strategic thinking to deliver solutions that not only look great but also deliver measurable results.
            </p>
            <p className="text-lg text-brand-light/80">
              Over the years, we've worked with diverse businesses across various industries, from retail and legal services to agricultural businesses and technology. Each project has taught us something new, and we bring that accumulated expertise to every client engagement.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/Mutag wesbite images/Team working on project on separate screens.png"
              alt="MUTAG HOUSE team"
              className="rounded-2xl shadow-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </Section>

      {/* Our Approach */}
      <Section title="Our Approach" background="light">
        <div className="grid md:grid-cols-3 gap-8">
          {approach.map((item, index) => (
            <Card key={item.title} delay={index * 0.1}>
              <div className="text-brand-blue mb-4">{item.icon}</div>
              <h3 className="font-heading text-xl mb-3">{item.title}</h3>
              <p className="text-brand-dark/70">{item.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* What We Do */}
      <Section title="What We Do" background="dark">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-brand-light/80 mb-6">
              At MUTAG HOUSE, we offer a comprehensive suite of branding and marketing services designed to help your business succeed in today's competitive marketplace.
            </p>
            <ul className="space-y-4 text-brand-light/80">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-brand-blue">Brand Identity Design:</strong> Complete brand identity packages including logo design, brand guidelines, and corporate identity systems.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-brand-blue">Web Development:</strong> Professional websites and digital platforms built with modern technologies, optimized for performance.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-brand-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong className="text-brand-blue">Digital Marketing:</strong> Strategic marketing campaigns including social media management, content creation, and SEO.
                </div>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/Mutag wesbite images/Team showing each other code on a screen.png"
              alt="MUTAG HOUSE team developing"
              className="rounded-2xl shadow-2xl"
              loading="lazy"
            />
          </motion.div>
        </div>
      </Section>

      {/* Our Values */}
      <Section title="Our Values" background="light">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={value.title} delay={index * 0.1}>
              <h3 className="font-heading text-xl mb-3 text-brand-blue">{value.title}</h3>
              <p className="text-brand-dark/70">{value.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="dark" className="gradient-primary/10">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Ready to Build Your Brand?
          </h2>
          <p className="text-base md:text-xl text-brand-light/90 mb-10 leading-relaxed">
            Let's discuss how MUTAG HOUSE can help transform your business.
          </p>
          <Link to="/contact">
            <Button size="lg">
              Request Private Strategy Call
            </Button>
          </Link>
        </div>
      </Section>
    </>
  )
}

export default About

