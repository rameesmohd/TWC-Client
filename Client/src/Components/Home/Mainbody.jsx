import React, { useEffect, useRef, useState } from 'react'
import stillqueriesgif from '../../assets/query_dark_mode.cd5014b9.gif'
import mt4Img from '../../assets/metatrader4.png'
import mt5Img from '../../assets/mt5img.png'
import Collapse from '../Common/Collapse'
import Footer from '../Common/Footer'
import { RiWhatsappLine, RiDownloadLine } from 'react-icons/ri'
import CourseSection from './CourseSection'
import { Button, Card, Col, Flex, Row, Spin } from 'antd'
import img from '../../assets/—Pngtree—trading candle stick pattern char_8918768.png'

const CertificateSection = React.lazy(() => import('./CertificateSection'));
const ReviewSections = React.lazy(() => import('./ReviewSections'));
const MetrixSection = React.lazy(() => import('./MetrixSection'));

const items = [
  {
    key: '1',
    label: (
      <span className="flex items-center gap-3 text-base font-semibold text-gray-900">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-100 text-xs font-bold text-lime-700">
          01
        </span>
        What is the minimum amount of money needed to start trading?
      </span>
    ),
    children: (
      <p className="pl-10 text-sm leading-relaxed text-gray-600">
        The minimum amount needed varies by broker and account type — in general, you can start trading with
        a deposit of around $50 with many brokers.
      </p>
    ),
  },
  {
    key: '2',
    label: (
      <span className="flex items-center gap-3 text-base font-semibold text-gray-900">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
          02
        </span>
        How can I get started with Forex trading?
      </span>
    ),
    children: (
      <p className="pl-10 text-sm leading-relaxed text-gray-600">
        Start by learning the fundamentals of the Forex market — currency pairs, trading strategies, technical
        analysis, and risk management. We're here to guide you through it.
      </p>
    ),
  },
  {
    key: '3',
    label: (
      <span className="flex items-center gap-3 text-base font-semibold text-gray-900">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
          03
        </span>
        What are the risks associated with Forex trading?
      </span>
    ),
    children: (
      <p className="pl-10 text-sm leading-relaxed text-gray-600">
        Forex trading carries risk due to market volatility, leverage, geopolitical events, economic releases,
        and liquidity. Manage it with stop-loss orders, careful leverage, and a diversified approach.
      </p>
    ),
  },
]

// Same two cards as before — just paired up so each logo/heading matches its
// own installer link (the previous version linked MT4's card to the MT5
// installer and vice versa).
const platforms = [
  {
    name: 'MetaTrader 4',
    description: "The world’s most popular trading platform",
    img: mt4Img,
    href: 'https://download.mql5.com/cdn/web/metaquotes.software.corp/mt4/mt4setup.exe?utm_source=www.metatrader4.com&utm_campaign=download',
  },
  {
    name: 'MetaTrader 5',
    description: 'Multi-asset trading on one powerful platform',
    img: mt5Img,
    href: 'https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader4.com&utm_campaign=download',
  },
];

const Body = () => {
  const QueriesRef = useRef();
  const MetaAppRef = useRef();
  const [scrolled, setScrolled] = useState({
      footerScroll : false,
      queryScroll : false
  });

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const footerPosition = MetaAppRef.current.offsetTop;
    const QueryPosition = QueriesRef.current.offsetTop;

    setScrolled((prev) => ({
      ...prev,
      queryScroll: scrollPosition >= QueryPosition,
      footerScroll: scrollPosition >= footerPosition,
    }));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  return (
  <>
   <React.Suspense fallback={<Flex justify='center' className='bg-black py-20'><Spin size={'large'}/></Flex>}>
      <MetrixSection/>
    </React.Suspense>
    
    <CourseSection/>
    <React.Suspense fallback={<Flex justify='center' className='py-20'><Spin size={'large'}/></Flex>}>
      <CertificateSection/>
      <ReviewSections/>
    </React.Suspense>

    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Support</span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-gray-500">Answers to the most common questions before you enroll.</p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <Collapse items={items} />
      </div>
    </div>  

   <section ref={QueriesRef} className="px-4 py-4 sm:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl shadow-2xl shadow-black/10 ring-1 ring-black/5">
        <div className="relative grid md:grid-cols-2">
          {/* Left panel */}
          <div className="relative flex min-h-[480px] flex-col items-center justify-center overflow-hidden bg-lime-400 px-6 py-16 text-center sm:px-10">
            <img
              className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 object-contain opacity-10"
              src={img}
              alt=""
            />

            <span
              className={`relative z-10 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 transition-all duration-500 ${
                scrolled.queryScroll ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Start Today
            </span>

            <h3
              className={`relative z-10 mt-3 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-black transition-all delay-100 duration-500 sm:text-5xl ${
                scrolled.queryScroll ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Your Trading Career Growth Is Just One Click Away
            </h3>

            <p
              className={`relative z-10 mt-4 max-w-sm text-sm text-black/70 transition-all delay-150 duration-500 ${
                scrolled.queryScroll ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Join a gold-specialised course built for people who don't have time to learn trading the hard way.
            </p>

            <Button
              type="primary"
              size="large"
              shape="round"
              className={`relative z-10 !mt-7 !h-12 !border-none !bg-black !px-8 !font-semibold !text-lime-400 transition-all delay-200 duration-500 hover:!scale-105 hover:!bg-gray-900 ${
                scrolled.queryScroll ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Start Learning Now
            </Button>

            <p className="relative z-10 mt-5 font-mono text-xs text-black/50">100+ Students Joined</p>
          </div>

          {/* Right panel */}
          <div className="flex flex-col items-center justify-center bg-black px-6 py-16 text-center text-white sm:px-10">
            <span
              className={`text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 transition-all duration-500 ${
                scrolled.queryScroll ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Support
            </span>

            <h3
              className={`mt-3 text-3xl font-extrabold tracking-tight transition-all delay-100 duration-500 sm:text-5xl ${
                scrolled.queryScroll ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Still Have Any Queries?
            </h3>

            <img
              src={stillqueriesgif}
              alt="Still have queries?"
              className={`my-6 h-48 transition-all delay-150 duration-500 sm:h-64 ${
                scrolled.queryScroll ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            />

            <p className="mb-6 text-sm text-white/60">We're one message away — real answers, no bots.</p>

            <a
              href="https://wa.me/917736833351"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition-all delay-200 duration-500 hover:scale-105 hover:bg-green-600 ${
                scrolled.queryScroll ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <RiWhatsappLine className="text-xl" />
              WhatsApp Now
            </a>
          </div>

          {/* Seam badge, desktop only */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xs font-bold text-black shadow-lg ring-4 ring-black/5 md:flex">
            OR
          </div>
        </div>
      </div>
    </section>

    <section ref={MetaAppRef} className="mx-auto max-w-5xl px-4 py-16 sm:px-8 sm:py-20">
      <div className={`grid gap-6 sm:grid-cols-2 ${scrolled.footerScroll ? 'animate-fade-up' : 'opacity-0'}`}>
        {platforms.map((platform, index) => (
          <Card
            key={index}
            className="rounded-2xl border-black/5 shadow-sm transition-shadow hover:shadow-lg"
            styles={{ body: { padding: 0 } }}
          >
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-2xl p-8 text-center transition-transform hover:scale-105"
            >
              <img src={platform.img} alt={platform.name} className="h-16 w-auto" />
              <h4 className="text-xl font-bold text-gray-900">{platform.name}</h4>
              <p className="text-gray-500">{platform.description}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                <RiDownloadLine />
                Download
              </span>
            </a>
          </Card>
        ))}
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default Body