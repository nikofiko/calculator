import React from 'react'

const Result = ({ value }) => {
  const formatValue = (num) => {
    return parseFloat(num).toLocaleString('en-US', {
      maximumFractionDigits: 6
    });
  };

  return (
    <div className='flex justify-center pt-[32px]'>
      <p className='pr-[32px] bg-screenbg rounded-[10px] text-white font-lea font-bold text-[56px] text-end min-w-[327px] lg:min-w-[540px] pt-[24px] pb-[13px] light:text-grayishyellow light:bg-white purple:text-yellow purple:bg-purpletogglebg'>{formatValue(value)}</p>
    </div>
  )
}

export default Result
