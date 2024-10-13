import { btc, dodge, eth, ltc } from '../assets';
import WatchListPill from './WatchListPill';

function WatchListCard() {
  return (
    <div className='  rounded-lg p-[20px_18px] shadow-xl bg-white  '>
      <section className=''>
        <h1 className='font-bold text-[16px] mb-3 text-[#101828] ml-1'>
          Watch List
        </h1>
      </section>

      <section className='flex flex-col items-center justify-center'>
        <WatchListPill
          img={btc}
          coinABV='BTC'
          transact='BTC/USDC'
          value='26,864'
          percentChange='+0.36%'
        />
        <WatchListPill
          img={eth}
          coinABV='ETH'
          transact='ETH/USDC'
          value='1,574'
          percentChange='+0.04'
        />
        <WatchListPill
          img={ltc}
          coinABV='LTC'
          transact='LTC/USDC'
          value='16,050'
          percentChange='-0.002%'
        />
        <WatchListPill
          img={dodge}
          coinABV='DND'
          transact='DND/USDC'
          value='12,000'
          percentChange='+0.4%'
        />
      </section>
    </div>
  );
}

export default WatchListCard;
