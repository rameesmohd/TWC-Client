import React from 'react'
import {FacebookIcon,InstagramIcon,TwitterIcon,Whatsapp} from '../../Components/Common/SocialMediaIcons'
import icon1 from '../../assets/Frame.png'
import icon2 from '../../assets/Framee.png'
import Button from '../Common/Button'
// import ScrollList from '../Common/Scrolllist'
import reviewOne from '../../assets/Harshita-kumari 1.png'
import reviewTwoImg from '../../assets/kushboo 1.png'
import reviewThreeImg from '../../assets/hari_ram 1.png'
import stillqueriesgif from '../../assets/query_dark_mode.cd5014b9.gif'
import mt4Img from '../../assets/metatrader4.png'
import mt5Img from '../../assets/mt5img.png'
import Collapse from '../../Components/Common/Collapse'
import Footer from '../Common/Footer'

const Body = () => {
  return (
    <>
    <section className='grid grid-cols-5'>
      <div className='w-full pl-16 col-span-3 font-sans '>
        <div className='text-3xl mb-2 font-semibold'> 
            About the course
        </div>
        <p className='text-sm my-2'>
        Get empowered digitally and start earning wisely! Our course is designed  thoughtfully
        to empower every student <br /> to leverage the latest job opportunities. 
        Starting from the basics the course covers 
         all the major and widespread topics  that form the essentials of these digital opportunities. 
         Our comprehensive enables students to get into jobs as soon as completion of the course. <br />
         This can surely work as a game-changer for
         every student who wishes to make it big with the latest technologies and update themselves for the fast-evolving world.
        </p>
        <div>
        <div className='text-3xl my-2 font-semibold'> 
            What you will learn
        </div>
        <div className=''>
            {[...Array(3)].map((value,index)=>{
                return(
            <div className='flex justify-around'>
            <div className='border text-base p-2 mx-1 my-1'>
            A complete overview of digital marketing and the different tools
            </div>
            <div className='border text-base p-2 mx-1 my-1'>
            A complete overview of digital marketing and the different tools
            </div>
            </div>
        )})}
        </div>
        </div>
        <div>
        <div className='text-3xl my-2 font-semibold'> 
            Skills you will achieve
        </div>
        <div className='w-full' >
          <div className='w-full flex py-2'>
          <div className='border p-1 bg-blue-200 mx-1 text-center rounded-xl '>
            trading in different currecy pairs
          </div>   
          <div className='border px-4 py-1 bg-blue-200 mx-1 text-center rounded-xl'> 
            forex analysis
          </div>        
          </ div>
          <div className='w-full flex py-1'>
          <div className='border px-4 mx-1 bg-blue-200 text-center rounded-xl '>
            technical analysis currecy pairs
          </div>   
          <div className='border px-4 py-1 mx-1 bg-blue-200 text-center rounded-xl'> 
            fundamental analysis
          </div>   
          <div className='border px-4 py-1 mx-1 bg-blue-200 text-center rounded-xl'> 
            trading mindset
          </div>       
          </ div>
          <div className='w-full flex py-1'>
          <div className='border px-2 bg-blue-200 mx-1 text-center rounded-xl '>
            trading in different currecy pairs
          </div>   
          <div className='border px-4 py-1 bg-blue-200 mx-1 text-center rounded-xl'> 
            forex analysis
          </div>        
          </ div>
              
        </div>
        </div>
      </div>

      <div className='col-span-2 flex justify-center'>
        <div className='w-2/3'>
            <div className='rounded-xl w-full h-48 bg-gray-100 flex justify-center items-center'>
                   <img
                   src="https://cdn.dribbble.com/userupload/8570778/file/original-37f90c018a0ac7de55ea7a331e659af1.png?resize=400x300&vertical=center"
                   alt="" className='w-full h-full object-cover'/>
            </div>
            <div className='text-2xl my-2 mx-2 font-extrabold animate-bounce'>
            $497 <span className='line-through text-sm text-red-700'>$549</span> 
            </div>
            <div className='flex'>
            <div className='border rounded-lg p-2 bg-blue-600 text-white'>
                Download course syllabus
            </div>
            </div>
            {
              [...Array(6)].map((value,index)=>{
                    return(
                      <div className='w-full flex justify-between px-2 py-2'>
                    <div>Coursemode</div>
                    <div>Online</div>
                    </div>
                    )
                })
            }
            <div className='w-full bg-blue-50 rounded-xl py-1'>
                  <div className='text-base text-center'>Share now</div>
                  <div className='flex justify-center py-2'>
                      <FacebookIcon/>
                      <InstagramIcon/>
                      <TwitterIcon/>
                      <Whatsapp/>
                  </div>
            </div>
        </div>
      </div>
    </section>

    <section className='w-full  bg-yellow-300 border shadow-lg  border-b-2 px-16 py-8 grid grid-cols-2 mt-2'>
      <div className='col-span-1'>
          <div className='text-2xl font-sans '>Get ahead with course certification</div>
          <div className='text-base mt-2'>
          On successful completion of the course participants will be awarded a certificate of course completion issued by FINPROV.
           This certificate is a golden ticket to the job of your dreams at leading finance firms and beyond.
          </div>
          <div className='w-full flex justify-start mt-2'>
            <img src={icon1} alt="" />
            <div className='text-base my-2 mx-2'>
              Earn your certificate
          </div>
            <img src={icon2} alt="" />
            <div className='text-base my-2 mx-2'>
              Share your acheivement
          </div>
          </div>
          <div className='flex my-2'>
          <Button className={'bg-blue-500 px-3 py-1 flex rounded-md mt-2 text-white '} text={'Encroll course now'}/>
          </div>
      </div>
      <div className='col-span-1 flex justify-center'>
            <img src="https://html.scribdassets.com/78tqe38i0w8w965v/images/1-c33644bdc5.jpg" className='h-56' alt="" />
      </div>
    </section>

    <section className='grid gap-16 grid-cols-3 h-96 px-16 my-12'>
          {/* <ScrollList items={[1,2,3]}/> */}
          <div className='col-span-1 h-full  '>
              <div className='flex h-56 justify-center'>
                  <img src={reviewOne} alt="" />
              </div>
                <div className='text-sm text-center my-4 px-12'>
                I opted for Personal Coaching to prepare for my interviews. I was assigned 
                a coach who helped me with preparations & guided me throughout the interview process. 
                I now have a steady job with a 200% salary hike
                </div>
                <div className='text-center my-8'>
                  Monark Dadekiya
                </div>
          </div>
          <div className='col-span-1  h-full '>
              <div className='flex h-56 justify-center'>
                  <img src={reviewTwoImg} alt="" />
              </div>
                <div className='text-sm text-center my-4 px-12'>
                I opted for Personal Coaching to prepare for my interviews. I was assigned 
                a coach who helped me with preparations & guided me throughout the interview process. 
                I now have a steady job with a 200% salary hike
                </div>
                <div className='text-center my-8'>
                  Monark Dadekiya
                </div>
          </div>
          <div className='col-span-1 h-full '>
              <div className='flex h-56 justify-center'>
                  <img src={reviewThreeImg} alt="" />
              </div>
                <div className='text-sm text-center my-4 px-12'>
                I opted for Personal Coaching to prepare for my interviews. I was assigned 
                a coach who helped me with preparations & guided me throughout the interview process. 
                I now have a steady job with a 200% salary hike
                </div>
                <div className='text-center my-8'>
                  Monark Dadekiya
                </div>
          </div>
    </section>

    <div className='my-12'>
      <div className='text-3xl my-4'>Frequenly asked questions</div>
      <Collapse/>
    </div>       

    <section className='grid grid-cols-2 '>
      <div className='col-span-1 bg-yellow-300'>
          <div className='  text-6xl text-center px-64 py-12'>
                Your Trading career growth just one click away.
          <div className='flex justify-center my-8 '>
              <Button className={'border p-2 bg-slate-200 text-sm rounded-lg px-8'} text={'Enroll course now'}/>
          </div>
          <p className='text-sm text-right'>100+ Students joined </p>
          </div>
      </div>
      <div className='col-span-1 bg-black py-12'>
            <div className='w-full text-6xl text-center px-36 text-white'>
              Still have any queries?
            </div>
            <div className='flex justify-center'>
            <img src={stillqueriesgif} className='h-72' alt="" />
            </div>
            <div className='w-full text-6xl text-center px-36 text-white'>
              We are here
            </div>
            <div className='text-white text-center my-16'> 
              Whatsapp Now!
            </div>
      </div>
    </section>

    <section className='container md:h-[400px] mx-auto '>
            <div className='grid grid-cols-1 md:grid-cols-4 h-full gap-5 mt-2'>
                <div className='col-span-1 mr-1'></div>
                <a href='https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader4.com&utm_campaign=download'  className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5 hover:scale-110 transition'> 
                        <h4 className='mb-5'>MetaTrader 4</h4>
                        <p className='mb-5'>The world’s most popular trading 
                            <br />platform</p>
                        <img  src={mt4Img} alt="" />
                </a>
                <a href='https://download.mql5.com/cdn/web/metaquotes.software.corp/mt4/mt4setup.exe?utm_source=www.metatrader4.com&utm_campaign=download' className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5 hover:scale-110 transition'>
                        <h4 className='mb-5'>MetaTrader 5</h4>
                        <p className='mb-5'>Multi-asset trading on one 
                            <br />powerful platform</p>
                            <img className='' src={mt5Img} alt="" />
                </a>
                <div className='col-span-1 mr-1'></div>
            </div>
      </section>
      <Footer/>
    </>
  )
}

export default Body
