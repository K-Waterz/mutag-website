import { Helmet } from 'react-helmet-async'

const StructuredData = ({ type, data }) => {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'MUTAG HOUSE',
          url: 'https://www.mutag.co.za',
          logo: 'https://www.mutag.co.za/Logo-no-background.png',
          email: 'info@mutag.co.za',
          telephone: '+27729572238',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Centurion',
            addressRegion: 'Gauteng',
            addressCountry: 'ZA'
          },
          sameAs: [
            'https://www.facebook.com/people/MUTAG-House/61578437019157/',
            'https://www.linkedin.com/company/mutag-house/',
            'https://www.instagram.com/mutag_house'
          ]
        }
      
      case 'localBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'MUTAG HOUSE',
          image: 'https://www.mutag.co.za/Logo-no-background.png',
          '@id': 'https://www.mutag.co.za',
          url: 'https://www.mutag.co.za',
          telephone: '+27729572238',
          email: 'info@mutag.co.za',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Centurion',
            addressLocality: 'Centurion',
            addressRegion: 'Gauteng',
            postalCode: '0157',
            addressCountry: 'ZA'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -25.8958786,
            longitude: 28.1094738
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00'
          },
          priceRange: '$$',
          areaServed: {
            '@type': 'City',
            name: 'Centurion'
          },
          sameAs: [
            'https://www.facebook.com/people/MUTAG-House/61578437019157/',
            'https://www.linkedin.com/company/mutag-house/',
            'https://www.instagram.com/mutag_house'
          ]
        }
      
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'MUTAG HOUSE',
          url: 'https://www.mutag.co.za'
        }
      
      default:
        return data
    }
  }

  const schema = getSchema()
  
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export default StructuredData

