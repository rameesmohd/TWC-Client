import React, { useEffect, useRef, useState } from 'react'
import { Button, Row, Col, Typography } from 'antd'
import icon1 from '../../assets/Frame.png'
import icon2 from '../../assets/Framee.png'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

const CertificateSection = () => {
  const CerticateRef = useRef()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight
    const footerPosition = CerticateRef.current.offsetTop
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
    <section className="relative w-full overflow-hidden bg-black py-16 font-sans text-white sm:py-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <Row gutter={[48, 32]} className="items-center">
          <Col
            xs={24}
            sm={12}
            ref={CerticateRef}
            className={scrolled ? 'animate-fade-right animate-once' : 'opacity-0'}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Certification
            </span>
            <Title level={3} className="!mb-3 !mt-2 !font-sans !text-2xl !font-bold !text-white sm:!text-3xl">
              Get Ahead With Course Certification
            </Title>
            <Paragraph className="!text-white/70">
              On successful completion of the course, participants are awarded a certificate of completion
              issued by FourCapEdu — a golden ticket to the job of your dreams at leading finance firms and
              beyond.
            </Paragraph>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full bg-white/5 py-2 pl-2 pr-4 ring-1 ring-white/10">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <img src={icon1} alt="" className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">Earn your certificate</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/5 py-2 pl-2 pr-4 ring-1 ring-white/10">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <img src={icon2} alt="" className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">Share your achievement</span>
              </div>
            </div>

            <div className="mt-7">
              <Button
                type="primary"
                shape="round"
                size="large"
                className="!h-11 !bg-lime-400 !px-6 !font-semibold !text-black hover:!bg-lime-300"
                onClick={() => navigate('/#enroll-course')}
              >
                Enroll Course Now
              </Button>
            </div>
          </Col>

          <Col xs={24} sm={12} className="flex justify-center">
            <div className={`relative ${scrolled ? 'animate-fade-left animate-once' : 'opacity-0'}`}>
              <img
                src="https://res.cloudinary.com/dj5inosqh/image/upload/v1709130068/SDFSDFSDF_hk1otk.png"
                alt="Certificate preview"
                className="h-56 rounded-lg shadow-2xl shadow-amber-500/10 ring-1 ring-white/10"
              />
              <div className="absolute -right-3 -top-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-600 text-center text-[9px] font-bold uppercase leading-tight text-black shadow-lg ring-4 ring-black">
                Certified<br />FourCapEdu
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default CertificateSection