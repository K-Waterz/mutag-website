import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Section = ({
  children,
  className = '',
  title,
  subtitle,
  id,
  background = 'dark',
  ...props
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const bgClasses = {
    dark: 'bg-brand-dark',
    light: 'bg-brand-light text-brand-dark'
  }
  
  return (
    <section
      ref={ref}
      id={id}
      className={`${bgClasses[background]} ${className}`}
      {...props}
    >
      <div className="container py-16 md:py-24 lg:py-32">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            {title && (
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
                background === 'light' ? 'text-brand-dark/70' : 'text-brand-light/70'
              }`}>
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export default Section

