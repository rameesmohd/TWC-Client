import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import { RiWhatsappLine } from 'react-icons/ri'
import CryptoWidget from '../Common/Cryptowidget'
import bgPattern from '../../assets/—Pngtree—trading candle stick pattern char_8918768.png'

const { Title, Paragraph } = Typography

// Hand-placed candles, roughly ascending — this is decoration, not real
// market data. Bodies use fill-*, wicks use stroke-*, so the palette stays
// exactly lime-500 / gray-300 / blue-600, same as the rest of the site.
const candles = [
  { x: 20, wickTop: 190, wickBottom: 222, bodyTop: 196, bodyBottom: 216, bullish: false },
  { x: 66, wickTop: 168, wickBottom: 206, bodyTop: 174, bodyBottom: 200, bullish: true },
  { x: 112, wickTop: 148, wickBottom: 186, bodyTop: 154, bodyBottom: 180, bullish: true },
  { x: 158, wickTop: 162, wickBottom: 196, bodyTop: 168, bodyBottom: 190, bullish: false },
  { x: 204, wickTop: 118, wickBottom: 162, bodyTop: 124, bodyBottom: 156, bullish: true },
  { x: 250, wickTop: 92, wickBottom: 136, bodyTop: 98, bodyBottom: 130, bullish: true },
  { x: 296, wickTop: 108, wickBottom: 142, bodyTop: 112, bodyBottom: 136, bullish: false },
  { x: 342, wickTop: 56, wickBottom: 108, bodyTop: 62, bodyBottom: 100, bullish: true },
];

const CANDLE_WIDTH = 22;
const trendPoints = candles
  .map((c) => `${c.x + CANDLE_WIDTH / 2},${(c.bodyTop + c.bodyBottom) / 2}`)
  .join(' L');
const lastCandle = candles[candles.length - 1];
const lastPoint = {
  x: lastCandle.x + CANDLE_WIDTH / 2,
  y: (lastCandle.bodyTop + lastCandle.bodyBottom) / 2,
};

const Header = () => {
  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={bgPattern}
          alt=""
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2 object-cover opacity-[0.04]"
        />

        <Row
          gutter={[32, 32]}
          align="middle"
          className="relative mx-auto px-4 pt-8 sm:px-8 sm:pt-10 lg:px-12"
        >
          <Col xs={24} md={12} className="animate-fade-right">
            <Title
              level={1}
              className="!mb-0 !text-4xl !font-extrabold !leading-[1.1] !tracking-tight sm:!text-5xl lg:!text-6xl"
            >
              Master the
              <span className="text-lime-500"> Financial Markets</span>
              <br />
              with
              <span className="text-lime-500"> FourCapEdu</span>
            </Title>

            <Paragraph className="!mt-5 max-w-xl text-md md:text-lg leading-relaxed !text-gray-600">
              Learn price action, technical analysis, risk management, and trading psychology
              through structured, mentor-led sessions. Whether you're a beginner or looking
              to refine your strategy, our practical approach helps you build the confidence
              and discipline needed to trade consistently.
            </Paragraph>
            <div className="mt-8">
              <Button
                type="primary"
                shape="round"
                size="large"
                href="https://wa.me/917736833351"
                target="_blank"
                rel="noopener noreferrer"
                icon={<RiWhatsappLine className="text-lg" />}
                className="!flex !h-12 !w-fit !items-center !gap-2 !bg-blue-600 !px-8 !font-semibold hover:!bg-blue-700"
              >
                Let's talk!
              </Button>
            </div>
          </Col>

        <Col xs={24} md={10} className="animate-jump-in">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyp7f6PQzydN1x631G2cyupBCXTdfl5K_ScyCgiQy6fA&s=10"
            alt="Trading Visual"
            className="animate-bounce-img w-full"
          />
          </Col>
        </Row>
      </section>

      <div className="z-30 my-4 hidden sm:my-8 sm:block">
        <div className="mx-auto px-4 sm:px-8 lg:px-12">
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <CryptoWidget />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header