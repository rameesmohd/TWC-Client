import React from 'react'
import reviewOne from '../../assets/Harshita-kumari 1.png'
import reviewTwoImg from '../../assets/kushboo 1.png'
import reviewThreeImg from '../../assets/hari_ram 1.png'

const ReviewSections = () => {
  return (
    <section className='grid gap-16 grid-cols-3 px-16 mt-5 '>
    <div className='col-span-1 h-full  '>
        <div className='flex h-56 justify-center'>
            <img src={reviewOne} alt="" />
        </div>
          <div className='text-sm text-center my-4 px-12'>
          "I recently completed the trading course, and I must say it exceeded my expectations.
          The in-depth coverage of indicators and market structure was incredibly insightful.
          The course strikes the right balance between theory and practical application.
          </div>
          <div className='text-center my-8'>
            Shonisha  (Intermediate Trader)
          </div>
    </div>
    <div className='col-span-1 h-full '>
        <div className='flex h-56 justify-center'>
            <img src={reviewTwoImg} alt="" />
        </div>
          <div className='text-sm text-center my-4 px-12'>
          "As a beginner in the world of trading, I found this course to be an excellent starting point. 
          The explanations of technical indicators and market liquidity were clear and easy to understand. 
          </div>
          <div className='text-center my-8'>
          Sarah J  (Beginner Trader)
          </div>
    </div>
    <div className='col-span-1 h-full '>
        <div className='flex h-56 justify-center'>
            <img src={reviewThreeImg} alt="" />
        </div>
          <div className='text-sm text-center my-4 px-12'>
          "Having been in the trading game for several years, I took this course to refine my skills, 
          particularly in market maker concepts. I was pleasantly surprised by the depth of the content. 
          The insights into market structure and the role of market makers added a new dimension to my trading strategy. 
          The course goes beyond the basics and delves into advanced techniques. The live sessions were invaluable, offering practical tips that 
          I could immediately apply to my trades."
          </div>
          <div className='text-center my-8'>
            Review by Alex H. (Experienced Trader)
          </div>
        </div>
    </section>
  )
}

export default ReviewSections
