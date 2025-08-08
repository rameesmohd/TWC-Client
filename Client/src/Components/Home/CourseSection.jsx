import React, { useState } from 'react';
import { Button, Card, Divider, Flex, Typography } from 'antd';
import { FacebookIcon, InstagramIcon, Whatsapp } from '../../Components/Common/SocialMediaIcons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const CourseSection = () => {
  const whatYouWillLearn = [
    "Introduction to Trading Fundamentals",
    "Indicators Deep Dive",
    "Liquidity Dynamics",
    "Market Structure Analysis",
    "Insights into Market Makers",
    "ICT Concepts"
  ];

  const SkillsYouWillAchieve = [
    "Trading in different currency pairs",
    "Forex analysis",
    "Technical analysis currency pairs",
    "Fundamental analysis",
    "Trading mindset",
    "Trading in different currency pairs",
    "Liquidity analysis"
  ];

  const navigate = useNavigate();
  const [loadings, setLoadings] = useState([]);
  const [option,setOption]=useState({
    rate : 0,
    mode : ''
  })

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
    navigate('/checkout', { state: { rate, mode } }); // use local variables
  }, 2000);
};


  return (
    <section id="enroll-course" className="md:grid grid-cols-5 mb-4">
      <div className="w-full px-2 py-3 sm:pl-14 col-span-3 font-sans animate-fade-right">
        <Title level={3} className="mb-2">About the course</Title>
        <Paragraph className="text-lg my-2">
          Mastering Trading Essentials, Unlock the secrets of successful trading with our comprehensive course on indicators, liquidity, market structure, and market maker concepts.
          Whether you're a beginner or an experienced trader, this course will equip you with the knowledge and strategies to navigate the financial markets confidently.
        </Paragraph>

        <div>
          <Title level={3} className="my-3">What you will learn</Title>
          <div className="flex flex-wrap w-2/3">
            {whatYouWillLearn.map((item, index) => (
              <div key={index} className="border rounded-t-lg text-base p-2 mx-1 my-1">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Title level={3} className="my-2">Skills you will achieve</Title>
          <div className="flex flex-wrap w-2/3">
            {SkillsYouWillAchieve.map((item, index) => (
              <div key={index} className="border rounded-b-lg text-base p-2 mx-1 my-1 bg-blue-50">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-2 flex py-2 px-2 justify-center">
        <Card
          className="sm:w-2/3 border p-4 shadow-xl rounded-lg"
          bodyStyle={{ padding: 0 }}
        >
          <div className="rounded-xl w-full h-48 bg-black flex justify-center items-center animate-jump overflow-hidden">
            {/* <iframe
              src="https://player.vimeo.com/video/928817377?h=f1ff6fedb1"
              className="w-full h-full object-cover"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Course Preview"
            ></iframe> */}
            <img 
              src="https://www.thestartupfounder.com/wp-content/uploads/2022/12/feature-xauusd-1.jpg" 
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className='text-lg font-bold my-3'>Gold Specialised Course</div>
          <hr />
          {/* Online Option */}
            <div className='font-bold text-lg pt-2'>Online</div>
            <Flex className='py-4' justify='space-between' align='center'>
              <div className="text-2xl font-extrabold text-blue-600">
                 ₹15900 <span className="line-through text-sm text-gray-500 ml-2">$21000</span>
              </div>
              <Button
                type="primary"
                shape="round"
                className="bg-blue-500 font-semibold animate-jump-in"
                loading={loadings[0]}
                onClick={() => purchase(0,15000,'Online')}
              >
                Purchase Now
              </Button>
            </Flex>

            <Divider className="my-2" />

            {/* Offline Option */}
            <div className='font-bold text-lg pt-2'>Offline</div>
            <Flex className='py-4' justify='space-between' align='center'>
              <div className="text-2xl font-extrabold text-blue-600 animate-bounce">
                 ₹25000 <span className="line-through text-sm text-gray-500 ml-2 font-base"> ₹32000</span>
              </div>
              <Button
                type="primary"
                shape="round"
                className="bg-blue-500 font-semibold animate-jump-in"
                loading={loadings[1]}
                onClick={() => purchase(1,23584,"Offline")}
              >
                Purchase Now
              </Button>
            </Flex>
              <hr />

          <Divider className="m-0" />

          <div className="px-2">
            {[
              // { key: "Course mode", value: "Online/Offline" },
              { key: "Duration", value: "1 Months" },
              { key: "Language", value: "Eng/Mal" },
              { key: "Students Enrolled", value: "800+" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <div>{item.key}</div>
                <div className='font-semibold'>{item.value}</div>
              </div>
            ))}
          </div>

          <div className="w-full bg-blue-50 rounded-xl py-1 mt-2 px-4">
            <div className="text-sm text-center">Share now</div>
            <div className="flex justify-evenly py-2">
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
        </Card>
      </div>
    </section>
  );
};

export default CourseSection;
