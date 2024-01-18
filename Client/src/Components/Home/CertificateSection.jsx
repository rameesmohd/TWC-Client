import React, { useEffect, useRef, useState } from 'react'
import icon1 from '../../assets/Frame.png'
import icon2 from '../../assets/Framee.png'
import Button from '../Common/Button'

const CertificateSection = () => {
    const CerticateRef = useRef();
    const [scrolled, setScrolled] = useState(false);
  
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const footerPosition = CerticateRef.current.offsetTop;
  
      if (scrollPosition > footerPosition) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
  return (
    <section className='w-full bg-yellow-300 border shadow-lg  border-b-2 px-16 py-8 grid grid-cols-2 mt-2 '>
    <div  ref={CerticateRef} className={`col-span-1 ${
        scrolled ? 'animate-fade-right animate-once' : 'opacity-0'
      }`}>
        <div className='text-2xl font-sans font-bold'>Get ahead with course certification</div>
        <div className='text-base font-semibold mt-2'>
          On successful completion of the course participants will be awarded a certificate of course completion issued by TradeWalkerEdu.com
          This certificate is a golden ticket to the job of your dreams at leading finance firms and beyond.
        </div>
        <div className='w-full flex justify-start mt-2'>
          <img src={icon1} alt="" />
          <div className='text-base my-2 mx-2'>Earn your certificate</div>
          <img src={icon2} alt="" />
          <div className='text-base my-2 mx-2'>Share your acheivement</div>
        </div>
        <div className='flex my-3'>
        <Button className={'bg-blue-500 px-3 py-1 flex rounded-md mt-2 text-white '} text={'Encroll course now'}/>
        </div>
    </div>
    <div className='col-span-1 flex justify-center '>
          <img src="https://html.scribdassets.com/78tqe38i0w8w965v/images/1-c33644bdc5.jpg" className={`h-56 ${scrolled ? 'animate-fade-left animate-once' : 'opacity-0'}`} alt="" />
    </div>
  </section>
  )
}

export default CertificateSection