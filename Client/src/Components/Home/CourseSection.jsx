import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { FacebookIcon, InstagramIcon, Whatsapp } from '../../Components/Common/SocialMediaIcons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const CourseSection = () => {
  const whatYouWillLearn = [
    "Introduction to Trading Fundamentals",
    "Timeframes & Candlesticks",
    "Technical Setup",
    "Different Session Breakdowns",
    "Impulse Entries",
    "Live Sessions & Premium Community Membership"
  ];

  const SkillsYouWillAchieve = [
    "Technical Analysis",
    "Fundamental Analysis",
    "Trading Mindset",
    "Trading in Different Pairs",
    "Risk Management"
  ];

  const navigate = useNavigate();
  const [loadings, setLoadings] = useState([]);
  const [option, setOption] = useState({ rate: 0, mode: '' });
  const [activeTab, setActiveTab] = useState('Online');

  const pricingPlans = {
    Online: { index: 0, rate: 15000, display: '₹15,900', original: '$21,000' },
    Offline: { index: 1, rate: 23584, display: '₹25,000', original: '₹32,000' },
  };

  const stats = [
    { key: 'Duration', value: '1 Month' },
    { key: 'Language', value: 'Eng/Mal' },
    { key: 'Enrolled', value: '800+' },
  ];

  const purchase = (index, rate, mode) => {
    setLoadings((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });

    setOption({ rate, mode });

    setTimeout(() => {
      setLoadings((prev) => {
        const newState = [...prev];
        newState[index] = false;
        return newState;
      });
      navigate('/checkout', { state: { rate, mode } });
    }, 2000);
  };

  const plan = pricingPlans[activeTab];

  return (
    <section id="enroll-course" className="md:grid grid-cols-5 mb-4 gap-6 mt-4 sm:pl-8">
      {/* Left column */}
      <div className="w-full px-2 py-3 col-span-3 font-sans animate-fade-right">
        <span className="text-md font-bold uppercase tracking-[0.2em] text-emerald-600">
          Gold-Specialised Forex Course
        </span>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div className="border-l-2 border-lime-500 pl-4">
            <Title level={4} className="!mb-1">Mission</Title>
            <Paragraph className="!mb-0 text-slate-600">
              To teach people trading for financial freedom. The Forex Flow Trading course and automated
              trading (algo trading) system are developed for 9-to-5 workers who don't have time or trading
              knowledge.
            </Paragraph>
          </div>
          <div className="border-l-2 border-emerald-400 pl-4">
            <Title level={4} className="!mb-1">Vision</Title>
            <Paragraph className="!mb-0 text-slate-600">
              Empower people's financial status through forex trading with consistent monthly profits.
            </Paragraph>
          </div>
        </div>

        <Title level={3} className="!mt-8 !mb-2">About the Course</Title>
        <Paragraph className="text-lg text-slate-600">
          Forex trading is highly accessible, as it can be done online 24 hours a day, five days a week,
          making it available to both working people and students. This course is designed to teach an
          advanced strategy in the forex market, which can be used to generate consistent profits throughout
          your trading career.
        </Paragraph>

        <Title level={3} className="!mt-8 !mb-5">Course Curriculum</Title>
        <div className="relative border-l border-gray-200 pl-12">
          {whatYouWillLearn.map((item, index) => (
            <div key={index} className="relative pb-6 last:pb-0">
              <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-lime-400">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="pt-1 font-medium text-gray-800">{item}</div>
            </div>
          ))}
        </div>

        <Title level={3} className="!mt-8 !mb-3">Skills You'll Achieve</Title>
        <div className="flex flex-wrap gap-2">
          {SkillsYouWillAchieve.map((item, index) => (
            <span
              key={index}
              className="rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Right column — pricing ticket */}
      <div className="col-span-2 flex items-start justify-center px-2 py-2">
        <div className="w-full rounded-[28px] bg-gradient-to-br from-amber-300/70 via-amber-500/40 to-transparent p-px shadow-2xl shadow-black/20 sm:w-2/3">
          <div className="overflow-hidden rounded-[27px] bg-black text-white">
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src="https://www.thestartupfounder.com/wp-content/uploads/2022/12/feature-xauusd-1.jpg"
                alt="XAUUSD gold trading chart"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold tracking-wide text-amber-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
                XAU/USD
              </div>
              <div className="absolute bottom-4 left-4 text-lg font-bold">Gold Specialised Course</div>
            </div>

            <div className="px-6 pt-5">
              <div className="flex rounded-full bg-white/10 p-1">
                {['Online', 'Offline'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
                      activeTab === tab ? 'bg-amber-400 text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between gap-1 px-6 py-6">
              <div>
                <div className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-3xl font-extrabold text-transparent">
                  {plan.display}
                </div>
                <div className="mt-1 text-sm text-white/40 line-through">{plan.original}</div>
              </div>
              <Button
                type="primary"
                shape="round"
                size="large"
                className="!h-11 !bg-lime-400 !px-4 !font-semibold !text-black hover:!bg-lime-300"
                loading={loadings[plan.index]}
                onClick={() => purchase(plan.index, plan.rate, activeTab)}
              >
                Purchase Now
              </Button>
            </div>

            <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 px-6 py-4 text-center">
              {stats.map((item, index) => (
                <div key={index}>
                  <div className="text-[11px] uppercase tracking-wide text-white/40">{item.key}</div>
                  <div className="mt-1 font-semibold">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 bg-white/5 px-6 py-4">
              <div className="text-center text-xs uppercase tracking-widest text-white/40">Share now</div>
              <div className="mt-3 flex justify-center gap-5">
                <a href="https://www.facebook.com/share/h2LUdWwkSd4UjvbR/?mibextid=WC7FNe" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon />
                </a>
                <a href="https://www.instagram.com/fourcapedu?igsh=MW00MmJuNG1jMGNubg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                </a>
                <a href="https://wa.me/917736833351" target="_blank" rel="noopener noreferrer">
                  <Whatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;