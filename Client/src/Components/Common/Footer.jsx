import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillPhone } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { RiHomeOfficeFill } from 'react-icons/ri';
import ScrollToTopButton from './Scrolltotop';

const Footer = () => {
    const data=[
        { title: 'NAVIGATIONS', 
            links: [ 
                { text: 'Home', url: '/' },  
                { text: 'My Course', url: '/my-course' }] },
        {
          title: 'USEFUL LINKS',
          links: [
            { text: 'Metatrader.com', url: 'https://www.metatrader4.com/en' },
            { text: 'ForexFactory.com', url: 'https://www.forexfactory.com/' },
            { text: 'Investing.com', url: 'https://www.investing.com/' },
            { text: 'coinmarketcap.com', url: 'https://coinmarketcap.com/' },
          ],
        },
        {
          title: 'CONTACT',
          links: [
            {
              text: 'city tower, baby hospital, Ernamkulam, 94126',
              icon: <RiHomeOfficeFill className='text-1xl mt-2 md:text-2xl' />,
            },
            {
              text: '+ 01 234 567 88',
              icon: <AiFillPhone className='mt-1' />,
            },
            {
              text: 'tradewalker@gmail.com',
              icon: <FiMail className='mt-1' />,
              isLink: true,
            },
          ],
        },
      ]
    return (
    <div className='z-20 border-t bg-slate-50 pt-2 animate-fade-up'>
    <div className='w-full h-auto py-3 grid grid-cols-1 md:grid-cols-3 gap-2 z-20'>
      {data.map((section, index) => (
        <div key={index} className='space-x-1 px-10 md:px-20 lg:px-40'>
          <ul>
            <h3 className='font-bold'>{section.title}</h3>
            {section.links.map((link, idx) => (
                <li key={idx} className={`my-2 ${link.isLink ? 'flex items-center underline' : ''}`}>
                {link.icon && <>{link.icon}</>}
                {link.url ? (
                  <a href={link.url} target='_blank'>
                    {link.text}
                  </a>
                ) : (
                  <>{link.text}</>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className='w-auto h-auto flex justify-center text-center text-gray-500 md:text-xs my-2'>
      <p className='mx-3'>Terms</p>
      <p className='mx-3'>Policy</p>
    </div>
    <div className='w-auto h-auto flex justify-center p-5'>
      <div className='text-sm'>Trade Walker & Co.</div>
    </div>
    <ScrollToTopButton />
  </div>
);
}

export default Footer;
