import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillPhone } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { RiHomeOfficeFill } from 'react-icons/ri';
import ScrollToTopButton from './ScrollToTop';

const Footer = () => {
  const data = [
    {
      title: 'NAVIGATIONS',
      links: [
        { text: 'Home', url: '/' },
        { text: 'My Course', url: '/my-course' },
      ],
    },
    {
      title: 'USEFUL LINKS',
      links: [
        { text: 'Metatrader.com', url: 'https://www.metatrader4.com/en' },
        { text: 'ForexFactory.com', url: 'https://www.forexfactory.com/' },
        { text: 'Investing.com', url: 'https://www.investing.com/' },
        { text: 'coinmarketcap.com', url: 'https://coinmarketcap.com/' },
      ],
    },
    {
      title: 'CONTACT',
      links: [
        {
          text: 'Door No 2, First Floor, Oryx Arcade, Vmb Road, Pathadipalam, Ernakulam, Kerala',
          icon: <RiHomeOfficeFill />,
        },
        {
          text: '+91 7736833351',
          url: 'tel:+917736833351',
          icon: <AiFillPhone />,
        },
        {
          text: 'fourcapedu007@gmail.com',
          url: 'mailto:fourcapedu007@gmail.com',
          icon: <FiMail />,
        },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-black pt-16 text-white animate-fade-up">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 sm:px-10 md:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        {/* Brand column */}
        <div>
          <div className="text-xl font-extrabold tracking-tight">
            FourCap<span className="text-lime-400">Edu</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Gold-specialised forex education and algo trading tools for people who don't have time to learn
            the hard way.
          </p>
        </div>

        {data.map((section, index) => (
          <div key={index}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              {section.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {section.links.map((link, idx) => {
                const isInternal = link.url && link.url.startsWith('/');
                return (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-white/70">
                    {link.icon && (
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-emerald-400">
                        {link.icon}
                      </span>
                    )}
                    {link.url ? (
                      isInternal ? (
                        <Link to={link.url} className="transition-colors hover:text-lime-400">
                          {link.text}
                        </Link>
                      ) : (
                        <a
                          href={link.url}
                          target={link.url.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-lime-400"
                        >
                          {link.text}
                        </a>
                      )
                    ) : (
                      <span>{link.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 px-6 py-6 text-xs text-white/40 sm:flex-row sm:px-10">
        <div>© {new Date().getFullYear()} FourCapEdu & Co. All rights reserved.</div>
        <div className="flex gap-6">
          <Link to="/terms" className="transition-colors hover:text-white">Terms</Link>
          <Link to="/policy" className="transition-colors hover:text-white">Policy</Link>
        </div>
      </div>

      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;