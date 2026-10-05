import { Helmet } from 'react-helmet-async'

const pages = {
  privacy: {
    title: 'Privacy Policy | MUTAG HOUSE',
    heading: 'Privacy Policy',
    body: [
      'MUTAG HOUSE collects the details you choose to send us: your name, company, email, phone number, and the message you write on the contact form, by email, or on WhatsApp.',
      'We use that information to reply to your enquiry and to keep a record of the conversation. We do not sell it.',
      'Email info@mutag.co.za if you want a copy of what we hold about you, or if you want it deleted.'
    ]
  },
  terms: {
    title: 'Terms of Service | MUTAG HOUSE',
    heading: 'Terms of Service',
    body: [
      'Work starts only after MUTAG HOUSE and the client agree the scope, price, and timeline in writing.',
      'Quotes on this website are invitations to talk. They are not a contract until both sides confirm them.',
      'Questions about these terms can be sent to info@mutag.co.za or on WhatsApp at +27 72 957 2238.'
    ]
  }
}

const Legal = ({ page }) => {
  const content = pages[page]

  return (
    <>
      <Helmet>
        <title>{content.title}</title>
        <meta name="description" content={content.body[0]} />
        <link rel="canonical" href={`https://www.mutag.co.za/${page === 'privacy' ? 'privacy' : 'terms'}`} />
      </Helmet>
      <section className="pt-36 pb-24">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl md:text-5xl mb-8">{content.heading}</h1>
          <div className="space-y-5 text-brand-light/80 text-lg leading-relaxed">
            {content.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Legal
