import React, { useEffect, useRef, useState } from 'react'
import reviewOne from '../../assets/IMG-20250805-WA0048.jpg'
import reviewTwoImg from '../../assets/IMG-20250805-WA0036.jpg'
import reviewThreeImg from '../../assets/IMG-20250805-WA0055 (1).jpg'

const ReviewSections = () => {
    const ReviewRef = useRef();
    const [scrolled, setScrolled] = useState(false);

    const reviews = [
      {
        imgSrc: reviewOne,
        text:
          'I recently completed the trading course, and I must say it exceeded my expectations. The in-depth coverage of indicators and market structure was incredibly insightful. The course strikes the right balance between theory and practical application.',
        author: 'Faheem,Malappuram (Intermediate Trader)',
      },
      {
        imgSrc: reviewTwoImg,
        text:
          'As a beginner in the world of trading, I found this course to be an excellent starting point. The explanations of technical indicators and market liquidity were clear and easy to understand.',
        author: 'Deepu kj (Beginner Trader)',
      },
      {
        imgSrc: reviewThreeImg,
        text:
          "Having been in the trading game for several years, I took this course to refine my skills, particularly in market maker concepts. I was pleasantly surprised by the depth of the content. The insights into market structure and the role of market makers added a new dimension to my trading strategy. The course goes beyond the basics and delves into advanced techniques. The live sessions were invaluable, offering practical tips that I could immediately apply to my trades.",
        author: 'Review by Junaid',
      },
    ];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const footerPosition = ReviewRef.current.offsetTop;
  
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
  <section
    ref={ReviewRef}
    className={`grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-16 mt-5 ${
      scrolled ? 'animate-fade-down animate-once' : 'opacity-0'
    }`}
  >

    {reviews.map((review, index) => (
      <div key={index} className='h-full'>
        <div className='flex h-44 w-full justify-center align-center'>
          <img className='rounded-full w-44 ' src={review.imgSrc} alt={`Review ${index + 1}`} />
        </div>
        <div className='text-sm text-center my-4 px-12'>{review.text}</div>
        <div className='text-center my-8'>{review.author}</div>
      </div>
    ))}
  </section>
  )
}

export default ReviewSections



