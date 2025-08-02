import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import CryptoWidget from '../Common/Cryptowidget'

const { Title, Paragraph } = Typography

const Header = () => {
  return (
    <>
      <Row gutter={[16, 16]} className="pt-6 sm:pt-12 px-3 sm:px-0">
        <Col xs={24} md={12} className="flex justify-center animate-fade-right">
          <div className='sm:pl-14'>
            <Title level={1} className="!text-5xl font-bold !leading-tight">
              Boost your
              <span className="text-lime-500 mx-2 font">Trading Career,</span>
              <br />
              be a
              <span className="text-lime-500"> MONK </span> - ready now
              <span className="animate-pulse animate-infinite animate-duration-[700ms] animate-ease-linear">!</span>
            </Title>
            <Paragraph className="text-lg mt-4">
              Our tutors will walk you through the different steps to make a trade profitable. <br />
              With each trade being different, you have to understand how the market works
              to select a performing trade. This is exactly what you will learn with FourCapedu.
            </Paragraph>
            <div className="mt-8">
              <Button type="primary" className="bg-blue-500 text-white">
                <a href="https://wa.me/917736833351" target="_blank" rel="noopener noreferrer">
                  Let's talk!
                </a>
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={24} md={12} className="animate-jump-in">
          <img
            src="https://en.windsorbrokers.com/wp-content/uploads/2023/07/WBCopyTrading-news-hero-image.png"
            alt="Trading Visual"
            className="animate-bounce-img w-full"
          />
        </Col>
      </Row>

      <div className="z-30 my-4 sm:my-8 hidden sm:block">
        <CryptoWidget />
      </div>
    </>
  )
}

export default Header
