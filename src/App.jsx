import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
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
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <HelmetProvider>
          <div className="min-h-screen flex flex-col bg-brand-dark">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/work" element={<Work />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/thank-you" element={<ThankYou />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HelmetProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
