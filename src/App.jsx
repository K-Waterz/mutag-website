import { HelmetProvider } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import ErrorBoundary from './ErrorBoundary'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Work from './pages/Work'
import Contact from './pages/Contact'
import ThankYou from './pages/ThankYou'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    // Update current path when page loads or URL changes
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    // Listen for popstate (back/forward buttons)
    window.addEventListener('popstate', handleLocationChange)
    
    // Check path on mount
    handleLocationChange()
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  // Render appropriate page based on current path
  const renderPage = () => {
    switch (currentPath) {
      case '/':
      case '/index.html':
        return <Home />
      case '/about':
      case '/about.html':
        return <About />
      case '/services':
      case '/services.html':
        return <Services />
      case '/work':
      case '/portfolio.html':
        return <Work />
      case '/contact':
      case '/contact.html':
        return <Contact />
      case '/thank-you':
      case '/thank-you.html':
        return <ThankYou />
      default:
        return <Home />
    }
  }

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <div className="min-h-screen flex flex-col bg-brand-dark">
          <Header />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
