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
    label: 'What is the minimum amount of money needed to start trading?',
    children: <p>The minimum amount of money needed to start trading varies depending on the broker and the type of trading account. 
      However, in general, you can start trading with a minimum deposit of around $50 with many brokers.</p>,
  },
  {
    key: '2',
    label: 'How can I get started with Forex trading?',
    children: <p>To get started with Forex trading, you need to educate yourself about the fundamentals of the Forex market, 
      including currency pairs, trading strategies, technical analysis, and risk management principles.We are here for you!</p>,
  },
  {
    key: '3',
    label: 'What are the risks associated with Forex trading?',
    children: <p>Forex trading carries inherent risks due to the volatile nature of currency markets.
       Some common risks include market volatility, leverage, geopolitical events, economic releases, 
       and liquidity issues.It's essential for traders to develop risk management strategies, including setting stop-loss orders,
       managing leverage effectively, and diversifying their trading portfolio to mitigate potential losses.</p>,
  }
];

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

    <div className='mx-auto max-w-4xl px-4 py-16 sm:px-16 sm:py-20'>
      <div className='mb-8 text-2xl font-extrabold tracking-tight sm:text-4xl'>Frequenly asked questions</div>
      <div className='overflow-hidden rounded-2xl border border-gray-100 shadow-sm'>
        <Collapse items={items}/>
      </div>
    </div>       

   

    <section ref={QueriesRef}>
      <Row className="w-full">
        {/* Left Column */}
        <Col
          xs={24}
          md={12}
          className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden bg-lime-500 px-4 py-16 text-center sm:px-8 md:rounded-s-2xl"
        >
          <img
            className="absolute left-0 top-0 z-0 h-full w-full object-cover opacity-40"
            src={img}
            alt=""
          />

          <div
            className={`relative z-10 max-w-lg bg-black/20 px-6 py-8 text-3xl font-extrabold tracking-tight text-white outline outline-1 outline-emerald-300 backdrop-blur-sm transition-all duration-500 sm:px-10 sm:text-5xl ${
              scrolled.queryScroll ? 'animate-fade-down' : 'opacity-0'
            }`}
          >
            Your Trading Career Growth is Just One Click Away.
          </div>

          <Button
            type="primary"
            size="large"
            shape="round"
            className="relative z-10 !mt-6 !h-12 !bg-blue-600 !px-8 !font-semibold hover:!bg-blue-700"
          >
            Start Learning Now
          </Button>

          <p className="relative z-10 mt-6 font-mono text-sm text-white/90">
            100+ Students Joined
          </p>
        </Col>
  
  
        {/* Right Column */}
        <Col
          xs={24}
          md={12}
          className="flex flex-col items-center justify-center bg-black px-4 py-16 text-center text-white sm:px-12 md:rounded-e-2xl"
        >
          <div
            className={`text-3xl font-extrabold tracking-tight transition-all duration-500 sm:text-5xl ${
              scrolled.queryScroll ? 'animate-fade-down' : 'opacity-0'
            }`}
          >
            Still Have Any Queries?
          </div>

          <div className="my-6 flex justify-center">
            <img src={stillqueriesgif} alt="Still have queries?" className="h-56 sm:h-72" />
          </div>

          <div className="mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl">We Are Here</div>

          <a
            href="https://wa.me/917736833351"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition-transform hover:scale-105 hover:bg-green-600"
          >
            <RiWhatsappLine className="text-xl" />
            Whatsapp Now!
          </a>
        </Col>
      </Row>
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