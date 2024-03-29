import React, { useEffect, useRef, useState } from 'react'
import stillqueriesgif from '../../assets/query_dark_mode.cd5014b9.gif'
import mt4Img from '../../assets/metatrader4.png'
import mt5Img from '../../assets/mt5img.png'
import Collapse from '../Common/Collapse'
import Footer from '../Common/Footer'
import { RiWhatsappLine } from 'react-icons/ri'
import CourseSection from './CourseSection'
import { Card, Flex, Space, Spin } from 'antd'
import img from '../../assets/—Pngtree—trading candle stick pattern char_8918768.png'
import {Button} from 'antd'

const CertificateSection = React.lazy(() => import('./CertificateSection'));
const ReviewSections = React.lazy(() => import('./ReviewSections'));


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
  
    if (scrollPosition >= QueryPosition) {
      setScrolled((prev) => ({ ...prev, queryScroll: true }));
    } else {
      setScrolled((prev) => ({ ...prev, queryScroll: false }));
    }
  
    if (scrollPosition >= footerPosition) {
      setScrolled((prev) => ({ ...prev, footerScroll: true }));
    } else {
      setScrolled((prev) => ({ ...prev, footerScroll: false }));
    }
  };
    
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  return (
  <>
    <CourseSection/>
    <React.Suspense fallback={<Flex justify='center'><Spin size={'lg'}/></Flex>}>
      <CertificateSection/>
      <ReviewSections/>
    </React.Suspense>
    <div className='my-12 px-4 sm:px-16'>
      <div className='text-xl sm:text-3xl my-4'>Frequenly asked questions</div>
      <Collapse items={items}/>
    </div>       
    <section ref={QueriesRef} className={`sm:grid grid-cols-2 `}>
      <div className='col-span-1 bg-yellow-300 relative'>
          <img className='opacity-50 absolute' src={img} alt="" />
          <div className={`text-3xl sm:text-6xl text-center font-semibold px-12 md:px-44 lg:px-64 py-12 ${scrolled.queryScroll ? 'animate-fade-down' : 'opacity-0'}`}>
                Your Trading career growth just one click away.
          </div>
        <div className='flex justify-center'>
            <Button >Start learning now</Button>
        </div>
          <p className='text-sm text-right py-4 px-8'>100+ Students joined </p>
      </div>
      <div className='col-span-1 bg-black py-12'>
            <div className={`w-full text-3xl sm:text-6xl text-center px-16 sm:px-36 text-white animate-fade-up ${scrolled.queryScroll ? 'animate-fade-down' : 'opacity-0'}`}>
              Still have any queries?
            </div>
            <div className='flex justify-center'>
            <img src={stillqueriesgif} className='h-72' alt="" />
            </div>
            <div className='w-full text-3xl sm:text-6xl text-center px-16 sm:px-36 text-white animate-fade-up'>
              We are here
            </div>
            <div className='p-2 rounded-lg flex items-center justify-center'>
              <div className='bg-green-500 flex items-center rounded-md p-2 text-white'>
              <RiWhatsappLine/>
              <a href='d' className='mx-2 '>Whatsapp Now!</a> 
              </div>
            </div>
      </div>
    </section>

    <section ref={MetaAppRef} className={`container relative my-8 mx-auto`}>
                {/* <img className='-z-20 w-full h-full opacity-50 absolute' src={img} alt="" /> */}
                <div className={`gap-5 mt-2 px-2 sm:flex justify-center  ${scrolled.footerScroll ? 'animate-fade-up' : 'opacity-0'}`}>
                  <Card className=''>
                    <a href='https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader4.com&utm_campaign=download'  className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5 hover:scale-110 transition'> 
                      <h4 className='mb-5'>MetaTrader 4</h4>
                      <p className='mb-5'>The world’s most popular trading 
                      <br />platform</p>
                      <img  src={mt4Img} alt="" />
                    </a>
                  </Card>
                  <Card className=''>
                    <a href='https://download.mql5.com/cdn/web/metaquotes.software.corp/mt4/mt4setup.exe?utm_source=www.metatrader4.com&utm_campaign=download' className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5 hover:scale-110 transition'>
                      <h4 className='mb-5'>MetaTrader 5</h4>
                      <p className='mb-5'>Multi-asset trading on one 
                      <br />powerful platform</p>
                      <img className='' src={mt5Img} alt="" />
                    </a>
                  </Card>
            </div>
      </section>
    <Footer/>
    </>
  )
}

export default Body
