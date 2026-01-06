import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Card = ({
  children,
  className = '',
  delay = 0,
  hover = true,
  ...props
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover
          ? {
              boxShadow: '0 14px 40px rgba(67, 121, 217, 0.18)',
              borderColor: 'rgba(67, 121, 217, 0.35)',
              transition: { duration: 0.2 }
            }
          : {}
      }
      className={`bg-brand-dark/50 backdrop-blur-sm border border-brand-blue/20 rounded-xl p-6 md:p-8 card-lift ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card

