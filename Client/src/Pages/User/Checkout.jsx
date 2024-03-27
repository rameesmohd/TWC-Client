import React, { lazy, useEffect, useMemo, useState } from 'react'
import  Navbar  from '../../Components/Common/Navbar';
import { Button, Divider, Table} from 'antd';
import { Card} from 'antd';
import { SiTether } from "react-icons/si";
import { RiBankLine } from "react-icons/ri";
import Footer from '../../Components/Common/Footer';
import phonepayIcon from '../../assets/phonepe-logo-icon (1).svg'
import UsdtPayModal from '../../Components/UsdtPayModal'
import LocalBankModal from '../../Components/LocalBankModal'
import PhonePay from '../../Components/PhonePayModal';
import userAxios from '../../Axios/Useraxios';
import toast from 'react-hot-toast';
import { ClockCircleOutlined } from '@ant-design/icons';
const { Meta } = Card;

const Checkout = () => {
  const [selectedMethod,setSelectedMethod]=useState(0)
  const [salesData,setSalesData] = useState([])
  const [loading,setLoading]= useState({
      paynowButton : false,
      transactionTable : false
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
  const axiosInstance = userAxios()

  const PriceItem = ({ label, price,bold }) => (
    <div className={`flex justify-between font-poppins text-gray-600 ${ bold && 'font-bold'}`}>
      <p>{label}</p>
      <p>{selectedMethod==0 ? '$' : '₹'}{price}</p>
    </div>
  );

  const calculateSummary=()=>{
      const currPriceUsd = 549
      const discount = 100
      const currPriceInr = 37735
      if(selectedMethod===0){
          setPrice({
              currency : '$',
              originalPrice : currPriceUsd,
              discount : discount,
              subtotal : currPriceUsd-discount,
              gst : 6,
              total : currPriceUsd-discount
          })
      }else if(selectedMethod===1){
          setPrice({
            currency : '₹',
            originalPrice : currPriceInr,
            discount : 0,
            subtotal : currPriceInr,
            gst : 6,
            total : Math.floor((currPriceInr/100)*6 + currPriceInr)
          })
      }else if(selectedMethod===2){
        setPrice({
          currency : '₹',
          originalPrice : currPriceInr,
          discount : 0,
          subtotal : currPriceInr,
          gst : 6,
          total : Math.floor((currPriceInr/100)*6 + currPriceInr)
        })
      }
  }

  const fetchTransData=async()=>{
      try {
        const response = await axiosInstance.get('/transaction')
        setSalesData(response.data.result)
      } catch (error) {
        toast.error(error.message)
        console.log(error);
      }
  }

  useEffect(()=>{
    fetchTransData()
  },[])

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

  const columns = [
    { title: 'Trasanction Id', dataIndex: 'transaction_id', key: 'transaction_id' },
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date',
      render: (date) => {
        const dateTime = new Date(date);
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        };
        return dateTime.toLocaleString('en-IN', options);
      },
    },
    { 
      title: 'Amount', 
      dataIndex: 'amount', 
      key: 'amount',
      render: (amount,record) => 
      (<span style={{ fontSize: '16px' }}>
        {record.payment_method === 'local_bank' && <>₹ {amount}</>}
        {record.payment_method === 'phonepe' && <>₹ {amount}</>}
        {record.payment_method === 'usdt' && <>$ {amount}</>}
      </span>)
    },
    { title: 'Payment Mode', dataIndex: 'payment_method', key: 'payment_method' },
    { title: 'Email', dataIndex: 'user_email', key: 'user_email' },
    { 
      title: 'Status', 
      dataIndex: 'payment_status', 
      key: 'payment_status' ,
      render: (status) => 
      <>
        {status==='pending' && <span style={{ fontSize: '16px',color : 'orangered'}}><ClockCircleOutlined className='mx-1'/>Pending</span> }
        {status==='success' && <span style={{ fontSize: '16px',color: 'green' }}>Success</span>}
        {status==='rejected' && <span style={{ fontSize: '16px',color : 'red' }}>Rejected</span>}
      </>
    }
  ]

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
                    Phonepe
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
          {/* <hr /> */}
          <div className='w-1/2'>
          </div>
          <Divider style={{fontSize : 'xx-large'}} orientation="left" >Transactions</Divider>
          <Table className='animate-fade-up border-b shadow-md' 
            columns={columns.map((col) => ({
                ...col,
                onHeaderCell: (column) => ({
                style: { background: '	#383838', color: 'white' },
                })}))}
            dataSource={salesData} 
            loading={loading.transactionTable} 
            pagination={{
              pageSize: 5, 
              total: salesData?.length, 
            }}
            scroll={{ x: true }}
          />
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
