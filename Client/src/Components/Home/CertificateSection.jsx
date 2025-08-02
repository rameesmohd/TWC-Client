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
    <section className="w-full font-sans bg-lime-400 border shadow-lg rounded-t-lg px-4 sm:px-16 py-8 mt-2">
      <Row gutter={[32, 16]} className="items-center ">
        <Col
          xs={24}
          sm={12}
          ref={CerticateRef}
          className={`${scrolled ? 'animate-fade-right animate-once' : 'opacity-0'}`}
        >
          <Title level={3} className="!font-sans !font-semibold !text-2xl">
            Get ahead with course certification
          </Title>
          <Paragraph className="">
            On successful completion of the course participants will be awarded a certificate of course completion issued by TradeWalkerEdu.com.
            This certificate is a golden ticket to the job of your dreams at leading finance firms and beyond.
          </Paragraph>

          <div className="w-full flex items-center mt-2">
            <div className="flex items-center mr-4">
              <img src={icon1} alt="certificate"  />
              <span className="text-base mx-2">Earn your certificate</span>
            </div>
            <div className="flex items-center">
              <img src={icon2} alt="share"  />
              <span className="text-base mx-2">Share your achievement</span>
            </div>
          </div>

          <div className="flex mt-4">
            <Button
              type="primary"
              className="bg-blue-500 text-white"
              onClick={() => navigate('/#enroll-course')}
            >
              Enroll course now
            </Button>
          </div>
        </Col>

        <Col
          xs={24}
          sm={12}
          className="flex justify-center"
        >
          <img
            src="https://res.cloudinary.com/dj5inosqh/image/upload/v1709130068/SDFSDFSDF_hk1otk.png"
            alt="Certificate preview"
            className={`h-56 ${scrolled ? 'animate-fade-left animate-once' : 'opacity-0'}`}
          />
        </Col>
      </Row>
    </section>
  )
}

export default CertificateSection
