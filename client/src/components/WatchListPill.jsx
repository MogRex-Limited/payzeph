/* eslint-disable react/prop-types */

function WatchListPill({
  customStyle,
  img,
  coinABV,
  transact,
  value,
  percentChange,
}) {
  return (
    <div className='w-full h-[60px] flex flex-row justify-between items-center mb-[13px]'>
      <div className='flex flex-row justify-between items-center'>
        <figure
          className='mr-[5px] h-[51px] w-[51px] flex justify-around items-center bg-[#becdf497] rounded-full'
          style={customStyle}
        >
          <img src={img} className='w-[28px] h-[28px]' />
        </figure>

        <section className='flex flex-col'>
          <h1 className='text-[14px] mb-[4px] text-[#344054]'>{coinABV}</h1>
          <p className='text-[12px] font-normal text-[#98A2B3]'>{transact}</p>
        </section>
      </div>

      <section className='flex flex-col items-end'>
        <p className='font-bold text-[14px] mb-[4px]'>{value}</p>
        <p
          className={`font-normal text-[12px] ${
            percentChange.startsWith('+') ? 'text-[#039855]' : 'text-red-500'
          }`}
        >
          {percentChange}
        </p>
      </section>
    </div>
  );
}

export default WatchListPill;
