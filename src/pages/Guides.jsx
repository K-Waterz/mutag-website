import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Button from '../components/Button'
import { whatsappLink } from '../lib/whatsapp'

const Guides = () => (
  <>
    <Helmet>
      <title>Director or shareholder? | MUTAG HOUSE</title>
      <meta
        name="description"
        content="Plain-language notes on directors and shareholders, and on starting a company while you still have a 9-to-5."
      />
      <link rel="canonical" href="https://www.mutag.co.za/guides" />
    </Helmet>

    <section className="relative pt-32 pb-16">
      <div className="absolute inset-0 gradient-primary opacity-10" />
      <div className="container relative z-10 max-w-3xl px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-brand-blue text-sm font-medium tracking-wide uppercase mb-4"
        >
          Business notes
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl mb-6"
        >
          You can own the company and still not run it.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-brand-light/70"
        >
          A shareholder owns a piece of the company. A director is trusted to manage it. Plenty of people are one, the other, or both — and the law treats those roles differently.
        </motion.p>
      </div>
    </section>

    <article className="container max-w-3xl px-4 pb-20 space-y-8 text-brand-light/80 text-lg leading-relaxed">
      <p>
        In a South African company, under the Companies Act 71 of 2008, those are two separate seats. Mixing them up is how people sign the wrong documents, or assume a title they do not actually hold.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-brand-blue/20 p-6 bg-brand-dark">
          <h2 className="font-heading text-2xl text-brand-light mb-3">Shareholder</h2>
          <p>
            A shareholder owns shares. That is an ownership stake: a claim on value if the company declares a dividend, and a vote at shareholder meetings in the way the shares allow.
          </p>
          <p className="mt-4">
            Shareholders appoint and remove directors. They do not, just by owning shares, get to run the day-to-day business.
          </p>
        </div>
        <div className="rounded-xl border border-brand-blue/20 p-6 bg-brand-dark">
          <h2 className="font-heading text-2xl text-brand-light mb-3">Director</h2>
          <p>
            A director sits on the board and manages the company. The Act gives directors duties of good faith, care, skill, and diligence. Those duties are personal. A director can be held to account for how the company is run, even when they own no shares.
          </p>
          <p className="mt-4">
            A private company needs at least one director. The person does not have to be a shareholder.
          </p>
        </div>
      </div>

      <h2 className="font-heading text-3xl text-brand-light pt-4">The mix-up</h2>
      <p>
        One person is often both, especially in a small company. That is allowed. It does not collapse the two roles into one. When they vote as a shareholder, they are deciding as an owner. When they act as a director, they must act for the company, not only for their own shares.
      </p>
      <p>
        The company’s Memorandum of Incorporation and any shareholders’ agreement can change how appointments, votes, and decisions work. The Act sets the baseline. Those documents set the detail for that company.
      </p>
      <h2 className="font-heading text-4xl text-brand-light pt-10">
        Nobody said a 9-to-5 cancels your company.
      </h2>
      <p>
        South African law does not ban an employee from owning a business. Plenty of people keep the salary and build something on the side. The stop sign, when there is one, is usually in the employment contract — not in the Companies Act.
      </p>
      <p>
        Read the contract before you register. Look for words like outside interests, conflict of interest, moonlighting, exclusivity, or a line that says you may not be a director of another company while you work there. Some contracts only block a business that competes with the employer. Others ask you to get written permission first. A few ban outside directorships altogether.
      </p>
      <p>
        That last kind of clause is why the director-and-shareholder difference matters. If the contract says you cannot be a director, you may still be able to hold shares and let someone else sit on the board. If it says you cannot have any interest in another business, shares are caught too. The wording decides. Guessing does not.
      </p>
      <p>
        A fair way through it:
      </p>
      <ol className="list-decimal pl-6 space-y-3">
        <li>Find the clause. If you cannot see one, still check the staff handbook and any conflict-of-interest policy.</li>
        <li>Keep the new company out of your employer’s clients, time, tools, and confidential information.</li>
        <li>If the contract asks for consent, ask in writing and wait for a yes before you are appointed as a director.</li>
        <li>If the clause is a hard ban, do not ignore it. A breach can be misconduct. Get an attorney to read that clause before you choose a role.</li>
      </ol>
      <p>
        A restraint that tries to stop you working at all, long after you leave, has to be reasonable before a court will enforce it. That is a separate question from what your current contract allows while you are still employed.
      </p>
      <p className="text-sm text-brand-light/50">
        This is general information about South African company and employment practice, not legal advice. Your contract, your employer’s policies, and the facts of the role decide what you may do. Confirm anything you rely on with a qualified attorney before you act.
      </p>

      <div className="rounded-xl border border-brand-blue/30 p-8 text-center">
        <h2 className="font-heading text-3xl text-brand-light mb-4">Need this set up properly?</h2>
        <p className="mb-8">
          MUTAG HOUSE helps with company registration, beneficial ownership, and the paperwork around it. Tell us where you are stuck.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={whatsappLink("Hi MUTAG HOUSE, I'd like help with company setup, including how a directorship fits with my current job.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg">WhatsApp us</Button>
          </a>
          <a href="mailto:info@mutag.co.za">
            <Button variant="secondary" size="lg">Email info@mutag.co.za</Button>
          </a>
          <a href="/contact">
            <Button variant="secondary" size="lg">Use the contact form</Button>
          </a>
        </div>
      </div>
    </article>
  </>
)

export default Guides
