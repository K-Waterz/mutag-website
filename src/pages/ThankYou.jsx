import { motion } from 'framer-motion'
import Button from '../components/Button'
import { Helmet } from 'react-helmet-async'

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <title>Thank You | MUTAG HOUSE</title>
        <meta name="description" content="Thank you for contacting MUTAG HOUSE. We've received your message and will respond within 24-48 hours during business days." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center pt-24">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-8 gradient-primary rounded-full flex items-center justify-center"
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl mb-6">
              Thank You!
            </h1>
            <p className="text-xl text-brand-light/70 mb-10">
              We've received your message and will respond within 24-48 hours during business days.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/">
                <Button variant="primary" size="lg">
                  Return Home
                </Button>
              </a>
              <a href="/contact">
                <Button variant="secondary" size="lg">
                  Send Another Message
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ThankYou

