import React, { lazy, useEffect, useMemo, useState } from 'react'
import  Navbar  from '../../Components/Common/Navbar';
import { Button} from 'antd';
import { Card} from 'antd';
const { Meta } = Card;
import { SiTether } from "react-icons/si";
import { RiBankLine } from "react-icons/ri";
import Footer from '../../Components/Common/Footer';
import phonepayIcon from '../../assets/phonepe-logo-icon (1).svg'
import UsdtPayModal from '../../Components/UsdtPayModal'
import LocalBankModal from '../../Components/LocalBankModal'
import PhonePay from '../../Components/PhonePayModal';

const Checkout = () => {
  const [selectedMethod,setSelectedMethod]=useState(0)
  const [loading,setLoading]= useState({
      paynowButton : false
   })
  const [price,setPrice]=useState({
    currency : null,
    originalPrice : 0,
    discount : 0,
    subtotal : 0,
    gst : 0,
    total : 0
  })
  const [modal,setModal]=useState()
  const [openModal,setOpenModal]=useState(false)

  const PriceItem = ({ label, price,bold }) => (
    <div className={`flex justify-between font-poppins text-gray-600 ${ bold && 'font-bold'}`}>
      <p>{label}</p>
      <p>{selectedMethod==0 ? '$' : '₹'}{price}</p>
    </div>
  );

  const calculateSummary=()=>{
      const currPriceUsd = 550
      const discount = 61
      const currPriceInr = 40499
      if(selectedMethod===0){
          setPrice({
              currency : '$',
              originalPrice : currPriceUsd,
              discount : discount,
              subtotal : currPriceUsd-discount,
              gst : 0,
              total : currPriceUsd-discount
          })
      }else if(selectedMethod===1){
          setPrice({
            currency : '₹',
            originalPrice : currPriceInr,
            discount : 0,
            subtotal : currPriceInr,
            gst : 18,
            total : Math.floor((currPriceInr/100)*18 + currPriceInr)
          })
      }else if(selectedMethod===2){
        setPrice({
          currency : '₹',
          originalPrice : currPriceInr,
          discount : 0,
          subtotal : currPriceInr,
          gst : 18,
          total : Math.floor((currPriceInr/100)*18 + currPriceInr)
        })
      }
  }

  const handlePayment=()=>{
      setLoading({...loading , paynowButton : true})
      setTimeout(()=>{
        setModal(selectedMethod)
        setOpenModal(true)
        setLoading({...loading , paynowButton : false})
      },1000)
  }

  useEffect(()=>{
    calculateSummary()
  },[selectedMethod])

  return (
    <>
    <div className='bg-slate-50'>
        <Navbar/>
        <div className='container mx-auto pt-28 h-full px-4 '>
          <div className='flex justify-between my-2'>
            <div className='text-2xl font-semibold'>Checkout</div>
            <div className='text-blue-500 font-bold'>Amount : {price.currency +price.total}</div>
          </div>
          <hr className='my-2'/>
          <div className='sm:grid grid-cols-5 pt-8 my-4'>
              <div className='col-span-3 animate-fade-right'>
                <div className='text-3xl  font-poppins mb-8'>
                 How do you want to pay?
                </div>
                <div className='font-poppins text-sm'>Choose one of the payment method below</div>

                  <Button 
                    onClick={()=>setSelectedMethod(0)} 
                    icon={<SiTether />}
                    className={`w-full ${selectedMethod===0 && 'outline-2 outline'} flex items-center bg-white justify-start p-8 text-xl my-2`}>
                    USDT
                  </Button>

                  <Button 
                    onClick={()=>setSelectedMethod(1)} 
                    icon={<RiBankLine />} 
                    className={`w-full ${selectedMethod===1 && 'outline-2 outline'} flex items-center bg-white justify-start p-8 text-xl my-2`}>
                    Local Bank
                  </Button>

                  <Button 
                    onClick={()=>setSelectedMethod(2)} 
                    icon={<img src={phonepayIcon} className='w-7 h-7'/>} 
                    className={`w-full ${selectedMethod===2 && 'outline-2 outline'} flex items-center bg-white justify-start p-8 text-xl my-2`}>
                    Phonepay
                  </Button>

                  <hr />
                  <Button loading={loading.paynowButton} onClick={()=>handlePayment()} className='bg-blue-700 w-full text-white h-12 my-8'>Pay now</Button>
                  <div className='items-center text-sm font-poppins my-8'>Need some help?<span className='text-blue-600 mx-1 '>Chat now</span></div>
                  <hr />
              </div>
              <div className='col-span-2 animate-fade-left px-8 lg:pr-44'>
              <div className='text-xl font-poppins font-semibold my-2 '>Summary</div>
              <Card cover={<img alt="example" className='object-cover h-44' src="https://courses.tvisi.in/assets/images/course06.jpg" />}>
                  <Meta title="Mastering Trading Essentials" description="Master course for 0 to 100% knowledge in trading" />
              </Card>
              <Card className=' my-2'>
                <PriceItem label="Original price" price={price.originalPrice} />
                <PriceItem label="Discount" price={price.discount} />
                <hr className='my-3'/>
                <PriceItem label="Subtotal" bold={true} price={price.subtotal} />
                <div className={`flex justify-between font-poppins text-gray-600`}>
                  <p>GST</p>
                  <p>{price.gst}%</p>
                </div>
                <hr className='my-3'/>
                <div className='flex text-2xl justify-between font-bold'><p>Total</p> <p>{price.currency}{price.total}</p> </div>
              </Card>
              </div>
          </div>
          <hr />
          <div className='w-1/2'>
          </div>
        <Footer/>
        </div>
    </div>
    {modal===0 && <UsdtPayModal open={openModal} setOpen={setOpenModal} amount={price.total}/>}
    {modal===1 && <LocalBankModal open={openModal} setOpen={setOpenModal} amount={price.total} />}
    {modal===2 && <PhonePay open={openModal} setOpen={setOpenModal} amount={price.total}/>}
    </>
  )
}

export default Checkout
