import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/work', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]

  const isActive = (path) => {
    const current = currentPath.replace('.html', '')
    const checkPath = path === '/' ? '/' : path
    return current === checkPath || current === checkPath + '.html'
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-blue/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="container py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center" aria-label="MUTAG HOUSE Home">
            <img
              src="/Logo-no-background.png"
              alt="MUTAG HOUSE"
              className="h-10 w-auto"
              loading="eager"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-luxury ${
                  isActive(link.path)
                    ? 'text-brand-blue'
                    : 'text-brand-light/80 hover:text-brand-blue'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="/contact"
              className="gradient-primary text-white px-6 py-3 rounded-lg font-medium text-sm transition-luxury hover:opacity-90 hover:shadow-lg hover:shadow-brand-blue/20"
            >
              Request Private Strategy Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-brand-light p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-6 pb-6 border-t border-brand-blue/20"
          >
            <div className="flex flex-col gap-4 pt-6">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-luxury ${
                    isActive(link.path)
                      ? 'text-brand-blue'
                      : 'text-brand-light/80 hover:text-brand-blue'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="gradient-primary text-white px-6 py-3 rounded-lg font-medium text-sm text-center mt-2"
              >
                Request Private Strategy Call
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

export default Header

