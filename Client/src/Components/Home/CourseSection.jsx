import React, { useState } from 'react'
import {FacebookIcon,InstagramIcon,TwitterIcon,Whatsapp} from '../../Components/Common/SocialMediaIcons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const CourseSection = () => {
    const whatYouWillLearn = ["Introduction to Trading Fundamentals","Indicators Deep Dive","Liquidity Dynamics","Market Structure Analysis","Insights into Market Makers","ICT Concepts"]
    const SkillsYouWillAchieve = ["Trading in different currency pairs ","Forex analysis","Technical analysis currency pairs","Fundamental analysis","Trading mindset","Trading in different currency pairs","Liquidity analysis"]
    const navigate= useNavigate()
    const [loadings, setLoadings] = useState([]);

    const enterLoading = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 2000);
    };

    const purchase = (index) => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });
      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
        navigate('/checkout')
      }, 2000);
    };

  return (
    <section id='enroll-course' className='grid grid-cols-5 mb-4'>
    <div className='w-full pl-16 col-span-3 font-sans animate-fade-right'>
      <div className='text-3xl mb-2 font-semibold'> 
          About the course
      </div>
      <p className='text-lg my-2 '>
        Mastering Trading Essentials,
        Unlock the secrets of successful trading with our comprehensive course on indicators, liquidity, market structure, and market maker concepts. 
        Whether you're a beginner or an experienced trader, this course will equip you with the knowledge and strategies to navigate the financial markets confidently.
      </p>
      <div>
      <div className='text-3xl my-2 font-semibold'> 
          What you will learn
      </div>
        <div className='flex flex-wrap w-2/3'>
          {whatYouWillLearn.map((value, index) => (
            <React.Fragment key={index}>
              <div className='border text-base p-2 mx-1 my-1'>
                {value}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div>
        <div className='text-3xl my-2 font-semibold'> 
            Skills you will achieve
        </div>
        <div className='flex flex-wrap w-2/3'>
          {
            SkillsYouWillAchieve.map((value,i)=>{
              return (
                <div className='border text-base p-2 mx-1 my-1 bg-blue-50 '>
                   {value}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>

    <div className='col-span-2 flex justify-center'>
      <div className='w-2/3'>
          <div className='rounded-xl w-full h-48 bg-gray-100 flex justify-center items-center animate-jump'>
                 <img
                 src="https://cdn.dribbble.com/userupload/8570778/file/original-37f90c018a0ac7de55ea7a331e659af1.png?resize=400x300&vertical=center"
                 alt="" className='w-full h-full object-cover '/>
          </div>
          <div className='text-2xl my-2 mx-2 font-extrabold animate-bounce'>
          $497 <span className='line-through text-sm text-red-700'>$549</span> 
          </div>
          <div className='flex justify-between'>
          <Button type="primary" className='bg-blue-500 font-semibold animate-jump-in' loading={loadings[1]} onClick={() => purchase(1)}>
             Purchase Now
          </Button>
          <Button type="default" loading={loadings[0]} onClick={() => enterLoading(0)}>
            Download syllabus
          </Button>
          </div>
          {
            [{key :"Coursemode",value : "Online"},{key :"Duration",value : "2 Months"},{key :"Language",value : "Eng/Mal"},{key : "Students Enrolled",value : "100+"},{},{}].map((value,index)=>{
                  return (
                    <div className='w-full flex justify-between px-2 py-2'>
                      <div>{value.key}</div>
                      <div>{value.value}</div>
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
  )
}

export default CourseSection
