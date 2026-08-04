import React, { useState } from "react";
import { Col, Row } from "antd";
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
  RiWhatsappLine,
} from "react-icons/ri";

const benefits = [
  {
    icon: RiTimeLine,
    title: "Save Your Time",
    desc: "The software trades for you, so your day stays free.",
  },
  {
    icon: RiBookletLine,
    title: "No Trading Knowledge Required",
    desc: "Built-in strategy logic — no charts to learn.",
  },
  {
    icon: RiEmotionHappyLine,
    title: "Emotion & Stress Free",
    desc: "Rules-based entries and exits, no panic decisions.",
  },
  {
    icon: RiShieldCheckLine,
    title: "Reduced Risk",
    desc: "A low-risk strategy designed to protect your capital.",
  },
  {
    icon: RiCheckboxCircleLine,
    title: "Errorless Trading",
    desc: "Consistent execution, every single time.",
  },
  {
    icon: RiWalletLine,
    title: "Passive-Style Trading",
    desc: "Let the system work while you focus elsewhere.",
  },
];

const audience = [
  { icon: RiGraduationCapLine, label: "Students" },
  { icon: RiHome4Line, label: "Home Makers" },
  { icon: RiBriefcaseLine, label: "Working Professionals" },
  { icon: RiStore2Line, label: "Business Persons" },
];

const softwareOptions = [1, 2, 3, 6, 10];

const formatUSD = (n) => `$${n.toLocaleString("en-US")}`;
const formatINR = (n) => `₹${n.toLocaleString("en-IN")}`;

const MetrixSection = () => {
  const [qty, setQty] = useState(1);

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-lime-100 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-lime-700">
            Algo Trading
          </span>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Robotic Trading Powered by{" "}
            <span className="bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
              Metrix Software
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Metrix is an advanced forex trading bot that automatically executes
            trades based on proven strategies. Backed by over{" "}
            <strong>4.7 years of live trading performance</strong>, it helps
            traders automate their journey with consistency and discipline.
          </p>

          <div className="mt-8 inline-flex rounded-full bg-emerald-100 px-6 py-3 text-sm font-semibold text-emerald-700">
            ✅ 4.7+ Years of Proven Live PNL
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-20">
          <h3 className="text-center text-3xl font-bold text-gray-900">
            Why Choose Robot Trading?
          </h3>

          <Row gutter={[24, 24]} className="mt-10">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <Col xs={24} sm={12} lg={8} key={i}>
                <div className="group h-full rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-lime-400 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 transition-all group-hover:bg-lime-500">
                    <Icon className="text-3xl text-lime-600 group-hover:text-white" />
                  </div>

                  <h4 className="mt-6 text-xl font-bold text-gray-900">
                    {title}
                  </h4>

                  <p className="mt-3 leading-7 text-gray-600">{desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Audience */}
        <div className="mt-24">
          <h3 className="text-center text-3xl font-bold text-gray-900">
            Who Can Use Metrix?
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">
            Whether you're a beginner or a busy professional, Metrix helps you
            automate your trading with ease.
          </p>

          <Row gutter={[24, 24]} className="mt-10">
            {audience.map(({ icon: Icon, label }, i) => (
              <Col xs={12} sm={6} key={i}>
                <div className="group rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-2 hover:border-lime-400 hover:shadow-lg">
                  <Icon className="mx-auto text-4xl text-lime-500 transition-transform group-hover:scale-110" />

                  <p className="mt-4 font-semibold text-gray-800">{label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Purchase */}
        <div className="mt-24">
          <div className="mx-auto max-w-xl text-center">
            <span className="rounded-full bg-lime-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-lime-700">
              Get Started
            </span>

            <h3 className="mt-5 text-3xl font-bold text-gray-900">
              Purchase Metrix Bot
            </h3>

            <p className="mt-4 text-gray-600">
              Choose the number of software licenses you require. Capital,
              consultation charges, and VPS costs are calculated automatically.
            </p>
          </div>

          {/* Quantity */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {softwareOptions.map((n) => (
              <button
                key={n}
                onClick={() => setQty(n)}
                className={`rounded-full px-6 py-3 font-semibold transition-all ${
                  qty === n
                    ? "bg-gradient-to-r from-lime-500 to-emerald-500 text-white shadow-lg"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-lime-500 hover:text-lime-600"
                }`}
              >
                {n} Software{n > 1 ? "s" : ""}
              </button>
            ))}
          </div>

          {/* Pricing Card */}
          <div className="mx-auto mt-10 max-w-lg rounded-[32px] bg-gradient-to-br from-lime-500 via-emerald-500 to-green-400 p-[2px] shadow-2xl">
            <div className="rounded-[30px] bg-white p-8">
              <div className="flex items-center justify-between border-b border-gray-200 pb-5">
                <span className="text-gray-500">Required Capital</span>

                <span className="text-xl font-bold text-lime-600">
                  {formatUSD(qty * 1000)} – {formatUSD(qty * 2000)}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-200 py-5">
                <span className="text-gray-500">
                  Bot One Time Charge (Incl. GST)
                </span>

                <span className="text-lg font-semibold text-gray-900">
                  {formatINR(qty * 53000)}
                </span>
              </div>

              <div className="flex items-center justify-between py-5">
                <span className="text-gray-500">VPS / Month</span>

                <span className="text-lg font-semibold text-gray-900">
                  {formatINR(qty * 1000)} – {formatINR(qty * 1200)}
                </span>
              </div>

              <p className="mt-6 text-sm leading-7 text-gray-500">
                Your capital remains in your personal broker account. Only you
                have access to deposits and withdrawals. The software purchase
                is a one-time, non-refundable fee that includes regular updates
                and maintenance.
              </p>

              <a
                href="https://wa.me/917736833351"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 py-4 text-lg font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <RiWhatsappLine className="text-2xl" />
                Book a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetrixSection;