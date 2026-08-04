import React, { useEffect, useRef, useState } from 'react'
import { RiDoubleQuotesL } from 'react-icons/ri'
import reviewOne from '../../assets/IMG-20250805-WA0048.jpg'
import reviewTwoImg from '../../assets/IMG-20250805-WA0036.jpg'
import reviewThreeImg from '../../assets/IMG-20250805-WA0055 (1).jpg'

const accentBadge = ['bg-lime-400 text-black', 'bg-emerald-400 text-black', 'bg-amber-400 text-black']

const ReviewSections = () => {
  const ReviewRef = useRef()
  const [scrolled, setScrolled] = useState(false)

  const reviews = [
    {
      imgSrc: reviewOne,
      text:
        'I recently completed the trading course, and I must say it exceeded my expectations. The in-depth coverage of indicators and market structure was incredibly insightful. The course strikes the right balance between theory and practical application.',
      author: 'Faheem, Malappuram',
      role: 'Intermediate Trader',
    },
    {
      imgSrc: reviewTwoImg,
      text:
        'As a beginner in the world of trading, I found this course to be an excellent starting point. The explanations of technical indicators and market liquidity were clear and easy to understand.',
      author: 'Deepu KJ',
      role: 'Beginner Trader',
    },
    {
      imgSrc: reviewThreeImg,
      text:
        "Having been in the trading game for several years, I took this course to refine my skills, particularly in market maker concepts. I was pleasantly surprised by the depth of the content. The insights into market structure and the role of market makers added a new dimension to my trading strategy. The course goes beyond the basics and delves into advanced techniques. The live sessions were invaluable, offering practical tips that I could immediately apply to my trades.",
      author: 'Junaid',
      role: null,
    },
  ]

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight
    const footerPosition = ReviewRef.current.offsetTop

    if (scrollPosition > footerPosition) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={ReviewRef} className="bg-stone-50 px-4 py-16 sm:px-16 sm:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Student Reviews
        </span>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          What Our Traders Say
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => {
          const badge = accentBadge[index % accentBadge.length]
          return (
            <div
              key={index}
              style={{ transitionDelay: scrolled ? `${index * 150}ms` : '0ms' }}
              className={`relative rounded-2xl bg-white p-8 pt-14 text-center shadow-sm ring-1 ring-black/5 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-xl ${
                scrolled ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <img
                  className="h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-white transition-transform duration-300 hover:scale-105"
                  src={review.imgSrc}
                  alt={review.author}
                />
                <span className={`absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full ${badge}`}>
                  <RiDoubleQuotesL className="text-sm" />
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">{review.text}</p>

              <div className="mt-6 border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">{review.author}</div>
                {review.role && <div className="text-xs text-gray-400">{review.role}</div>}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ReviewSections