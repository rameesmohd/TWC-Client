import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import reviewOne from '../../assets/Harshita-kumari 1.png'

const ScrollList = ({items}) => {
  const [props, set] = useSpring(() => ({
    x: 0,
    config: config.slow,
  }));

  const bind = useDrag(({ down, movement: [mx] }) => {
    set({ x: down ? mx : 0 });
  });

  return (
    <div
      {...bind()}
      style={{
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      <animated.div
        style={{
          display: 'flex',
          transform: props.x.interpolate((x) => `translate3d(${x}px, 0, 0)`),
        }}
      >
        {items.map((item, index) => (
          <div className='col-span-1 h-full my-2'>
          <div className='flex justify-center'>
              <img src={reviewOne} alt="" />
          </div>
            <div className='text-sm text-center'>
            I opted for Personal Coaching to prepare for my interviews. I was assigned 
            a coach who helped me with preparations & guided me throughout the interview process. 
            I now have a steady job with a 200% salary hike
            </div>
            <div className='text-center'>
            Monark Dadekiya
            </div>
            </div>
        ))}
      </animated.div>
    </div>
  );
};

export default ScrollList;
