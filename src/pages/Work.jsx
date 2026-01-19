import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Card from '../components/Card'
import Modal from '../components/Modal'
import Button from '../components/Button'
import StructuredData from '../components/StructuredData'
import { Helmet } from 'react-helmet-async'

const Work = () => {
  const [selectedWork, setSelectedWork] = useState(null)

  const portfolioItems = [
    {
      id: 1,
      title: 'Custom Internal Quoting System for We Moove SA',
      category: 'Custom Software Development',
      image: '/we-moove-sa-logo.png',
      logo: '/we-moove-sa-logo.png',
      description: 'Built a custom internal web-based quoting feature for We Moove SA that enables staff to estimate service costs based on predefined inputs, streamlining pricing workflows and improving turnaround time without exposing internal logic externally.',
      fullDescription: 'The solution provides We Moove SA\'s team with an intuitive interface to quickly generate accurate service quotes while maintaining the confidentiality of their pricing strategies and business logic. This internal tool has significantly improved their operational efficiency and customer service response times.',
      tags: ['Custom Software', 'Web Development', 'Internal Tools'],
      link: 'https://wn48nk66.forms.app/my-new-form'
    },
    {
      id: 2,
      title: 'Complete Digital Business Setup & Advertising',
      category: 'Digital Solutions',
      image: '/Rapatla-rue-logo.jpg',
      logo: '/Rapatla-rue-logo.jpg',
      description: 'Delivered a comprehensive digital transformation for Rapatla Rue Attorneys, including a modern, responsive website with cutting-edge design, seamless hosting infrastructure, and professional email systems. We also created targeted digital advertising campaigns to help them reach their audience and drive business growth.',
      fullDescription: 'Our full-service approach ensured they launched with enterprise-grade reliability and performance, with every aspect of their digital presence optimized for both user experience and search engine visibility. The technical foundation we built supports their ongoing marketing efforts, enabling scalable growth and consistent brand messaging across all digital channels.',
      tags: ['Custom Website', 'Premium Hosting', 'SEO Optimization', 'Digital Advertising'],
      link: 'https://rapatlarue.co.za'
    },
    {
      id: 3,
      title: 'Website Development & Brand Identity for XFM Tech',
      category: 'Website Development',
      image: '/xfm-tech-logo.png',
      logo: '/xfm-tech-logo.png',
      description: 'Developed a modern, responsive website for XFM Tech that serves as their primary digital presence, clearly communicating the company\'s technology offerings through an intuitive user interface and optimized performance. We also developed branded social media visual content to support online visibility and reinforce brand recognition.',
      fullDescription: 'The website\'s technical architecture ensures fast load times, mobile responsiveness, and seamless user experience across all devices. This strong technical foundation is complemented by our brand identity work, which established XFM Tech as a professional technology solutions provider with a cohesive brand presence across all digital touchpoints.',
      tags: ['Website Development', 'Brand Identity', 'Social Media Marketing'],
      link: 'https://xfmtech.com/'
    },
    {
      id: 4,
      title: 'Website Development & Legal Branding Solutions',
      category: 'Website Development',
      image: '/business-card-mockup.png',
      logo: '/attorneys-logo.png',
      description: 'Created a complete website for Mathibele Mahlaela Attorneys, establishing a strong online presence with a clean, professional design that conveys trustworthiness and makes it easy for clients to learn about their services and get in touch. We also developed professional business cards and provided compliance services.',
      fullDescription: 'The website features responsive design, intuitive navigation, and optimized performance to ensure clients can easily access information about Mathibele Mahlaela Attorneys\' legal expertise. We also handled the complete business documentation process, ensuring all regulatory and compliance requirements were properly addressed, and designed professional business cards that reflect their legal professionalism.',
      tags: ['Website Development', 'Business Cards', 'CIPC Compliance'],
      link: 'https://mathibelem.co.za'
    },
    {
      id: 5,
      title: 'Lead Capturing & Social Media Visual Advertising for Magnificent Pools',
      category: 'Web Development',
      image: '/magnificent-pools-logo.png',
      logo: '/magnificent-pools-logo.png',
      description: 'Created a dedicated launch landing page for Magnificent Pools that enabled customers to scan a URL and have their leads automatically captured into a database, all without requiring any changes to their existing website. We also designed social media visual advertisements to support marketing and client acquisition efforts.',
      fullDescription: 'The landing page solution integrated lead capture functionality with database storage, allowing them to collect and manage customer inquiries efficiently while maintaining their current website infrastructure. Our creative team also developed eye-catching visual content for Magnificent Pools that effectively communicated their pool cleaning and maintenance services, helping them attract new clients and strengthen their brand presence across social media platforms.',
      tags: ['Landing Page Development', 'Lead Capture System', 'Database Integration', 'Social Media Marketing', 'Visual Design'],
      link: 'https://www.magpools.co.za/'
    },
    {
      id: 6,
      title: 'Social Media Transformation for FlowerClub',
      category: 'Social Media Strategy',
      image: '/flowerclub-social-media.gif',
      logo: '/flowerclub-logo.png',
      description: 'Revitalized FlowerClub\'s digital presence with stunning visual content. Created scroll-stopping social media visuals that perfectly captured their floral artistry while establishing a consistent brand aesthetic.',
      fullDescription: 'Our team developed a comprehensive social media strategy for FlowerClub that included content planning, visual design, and engagement optimization. The result was a cohesive brand presence that resonated with their target audience and helped establish FlowerClub as a premium floral destination.',
      tags: ['Social Media Strategy', 'Content Creation', 'Brand Storytelling'],
      link: 'https://flowerclub.co.za'
    },
    {
      id: 7,
      title: 'Complete Brand Identity for La Gracia Estate',
      category: 'Brand Identity',
      image: '/lagracia-logo.png',
      logo: '/lagracia-logo.png',
      description: 'Created a comprehensive brand identity for La Gracia Estate including logo, business cards, and letterhead. The cohesive stationery package established their professional presence in the agricultural market.',
      fullDescription: 'Our design approach for La Gracia Estate incorporated elements that reflected the farm\'s connection to the land and agricultural heritage, while maintaining a modern and professional aesthetic suitable for business communications. The brand identity extends across all touchpoints, creating a consistent experience that helps build recognition and trust.',
      tags: ['Logo Design', 'Business Cards', 'Letterhead'],
      link: null
    }
  ]

  const stats = [
    { value: '3x', label: 'Increase in qualified leads' },
    { value: '+120%', label: 'Organic traffic growth' },
    { value: '100%', label: 'On-time delivery for projects' },
    { value: '24/7', label: 'Support availability with SLA' }
  ]

  return (
    <>
      <Helmet>
        <title>Corporate Portfolio | MUTAG HOUSE</title>
        <meta name="description" content="Explore MUTAG HOUSE's portfolio of software systems. See how we've helped businesses with custom applications, dashboards, APIs, and automation platforms." />
        <meta property="og:title" content="Corporate Portfolio | MUTAG HOUSE" />
        <meta property="og:description" content="Explore MUTAG HOUSE's portfolio of successful branding and marketing projects." />
        <link rel="canonical" href="https://www.mutag.co.za/work" />
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
            Client Success Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-light/70 max-w-3xl mx-auto"
          >
            Transforming businesses through strategic branding, compliance expertise, and growth solutions
          </motion.p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <Section background="dark">
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="cursor-pointer h-full"
                onClick={() => setSelectedWork(item)}
                hover={true}
              >
                <div className="mb-4">
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt={`${item.title} logo`}
                      className="h-12 w-auto mb-4"
                      loading="lazy"
                    />
                  )}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-brand-blue/20 text-brand-blue rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading text-xl mb-3">{item.title}</h3>
                <p className="text-brand-light/70 mb-4">{item.description}</p>
                <button className="text-brand-blue hover:underline text-sm font-medium">
                  View Case Study →
                </button>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section background="light">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-4xl md:text-5xl mb-2 text-brand-blue">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-brand-dark/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Client Logos */}
      <Section
        title="Trusted Across Industries"
        subtitle="We're proud to have partnered with these distinguished organizations"
        background="dark"
      >
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {portfolioItems.map((item) => (
            item.logo && (
              <img
                key={item.id}
                src={item.logo}
                alt={item.title}
                className="h-16 w-auto grayscale hover:grayscale-0 transition-luxury"
                loading="lazy"
              />
            )
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="dark" className="gradient-primary/10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-brand-light/70 mb-10">
            Let's discuss how we can help transform your business.
          </p>
          <Link to="/contact">
            <Button size="lg">
              Request Private Strategy Call
            </Button>
          </Link>
        </div>
      </Section>

      {/* Modal */}
      <Modal
        isOpen={!!selectedWork}
        onClose={() => setSelectedWork(null)}
        title={selectedWork?.title}
      >
        {selectedWork && (
          <div className="space-y-6">
            {selectedWork.logo && (
              <img
                src={selectedWork.logo}
                alt={`${selectedWork.title} logo`}
                className="h-16 w-auto"
              />
            )}
            <div className="flex flex-wrap gap-2">
              {selectedWork.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-brand-blue/20 text-brand-blue rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-brand-light/80 text-lg leading-relaxed">
              {selectedWork.fullDescription}
            </p>
            {selectedWork.link && (
              <a
                href={selectedWork.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-blue hover:underline"
              >
                Visit Website
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        )}
      </Modal>
    </>
  )
}

export default Work

