import React, { useEffect, useState } from 'react';

const Theme = ({ activeTheme, toggleTheme }) => {
  const [sliderPosition, setSliderPosition] = useState('0px')

  useEffect(() => {
    switch(activeTheme) {
      case 'light':
        setSliderPosition('24px')
        break
      case 'purple':
        setSliderPosition('44px')
        break
      default:
        setSliderPosition('0px')
    }
  }, [activeTheme])

  const handleToggle = () => {
    const themes = ['default', 'light', 'purple']
    const currentIndex = themes.indexOf(activeTheme)
    const newIndex = (currentIndex + 1) % 3
    toggleTheme(themes[newIndex])
  }

  return (
    <div className='flex justify-center lg:pt-[96px] pt-[30px]'>
      <div className='flex items-end justify-between min-w-[320px] lg:min-w-[540px]'>
        <div>
          <h1 className='font-lea text-[32px] font-bold text-white light:text-grayishyellow purple:text-yellow'>calc</h1>
        </div>
        <div className='flex items-end pb-3'>
          <p className='font-lea text-[12px] font-bold text-white pr-[26px] light:text-grayishyellow purple:text-yellow'>THEME</p>
          <div>
            <div className='flex font-lea text-white text-[12px] font-bold gap-[20px] pl-1.5 light:text-grayishyellow purple:text-yellow'>
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            <div className="pt-1">
              <div 
                className="relative h-7 w-[71px] rounded-full bg-[#232c43] light:bg-lighttogglebg purple:bg-purpletogglebg cursor-pointer"
                onClick={handleToggle}
              >
                <div 
                  className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-[#d03f2f] light:bg-lightredkeybg purple:bg-purecyan rounded-full transition-transform duration-300"
                  style={{
                    transform: `translateX(${sliderPosition})`,
                    left: '5px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Theme;

