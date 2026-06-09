import { motion } from 'framer-motion'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-luxury focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'gradient-primary text-white hover:opacity-90 hover:shadow-lg hover:shadow-brand-blue/20',
    secondary: 'bg-transparent border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10',
    ghost: 'bg-transparent text-brand-light/80 hover:text-brand-blue hover:bg-brand-blue/5'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button

