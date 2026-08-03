import React from 'react'
import { Button, Col, Row } from 'antd'
import {
  RiTimeLine,
  RiBookletLine,
  RiEmotionHappyLine,
  RiShieldCheckLine,
  RiCheckboxCircleLine,
  RiWalletLine,
  RiGraduationCapLine,
  RiHome4Line,
  RiBriefcaseLine,
  RiStore2Line,
} from 'react-icons/ri'

const benefits = [
  { icon: RiTimeLine, title: 'Save Your Time', desc: 'The software trades for you, so your day stays free.' },
  { icon: RiBookletLine, title: 'No Trading Knowledge Required', desc: 'Built-in strategy logic — no charts to learn.' },
  { icon: RiEmotionHappyLine, title: 'Emotion & Stress Free', desc: 'Rules-based entries and exits, no panic decisions.' },
  { icon: RiShieldCheckLine, title: 'Reduced Risk', desc: 'A low-risk strategy designed to protect your capital.' },
  { icon: RiCheckboxCircleLine, title: 'Errorless Trading', desc: 'Consistent execution, every single time.' },
  { icon: RiWalletLine, title: 'Passive-Style Trading', desc: 'Let the system work while you focus elsewhere.' },
]

const audience = [
  { icon: RiGraduationCapLine, label: 'Students' },
  { icon: RiHome4Line, label: 'Home Makers' },
  { icon: RiBriefcaseLine, label: 'Working Professionals' },
  { icon: RiStore2Line, label: 'Business Persons' },
]

const MetrixSection = () => {
  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Algo Trading
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Robotic Trading, Powered by <span className="text-lime-400">Metrix Software</span>
          </h2>
          <p className="mt-4 text-white/70">
            A forex trading bot — also known as algo trading — runs your strategy in the market automatically.
            Metrix is one of the market's leading robot trading systems, backed by 4.7+ years of live PNL
            and experience.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-sm font-semibold text-emerald-300">
            4.7+ Years of Proven PNL
          </div>
        </div>

        {/* Why robot trading */}
        <div className="mt-14">
          <h3 className="text-center text-xl font-bold sm:text-2xl">
            Why Robot Trading — Automate Your Success
          </h3>
          <Row gutter={[16, 16]} className="mt-8">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <Col xs={24} sm={12} md={8} key={i}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-emerald-400/40 hover:bg-white/10">
                  <Icon className="text-3xl text-lime-400" />
                  <h4 className="mt-4 font-semibold">{title}</h4>
                  <p className="mt-1 text-sm text-white/60">{desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Who can choose */}
        <div className="mt-16">
          <h3 className="text-center text-xl font-bold sm:text-2xl">Who Can Choose Robotic Trading</h3>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-white/60">
            Anyone without consistent profit or time can trade with Metrix — including:
          </p>
          <Row gutter={[16, 16]} className="mt-8">
            {audience.map(({ icon: Icon, label }, i) => (
              <Col xs={12} sm={6} key={i}>
                <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 py-6 text-center">
                  <Icon className="text-2xl text-emerald-400" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Button
            type="primary"
            size="large"
            shape="round"
            className="!h-12 !bg-lime-500 !px-8 !font-semibold !text-black hover:!bg-lime-400"
          >
            Explore Metrix Software
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MetrixSection