import { useContext, useState } from 'react';
import QRCode from 'react-qr-code';
import AuthContext from '../context/AuthProvider';

const ZephQrCode = () => {
  const { auth } = useContext(AuthContext);
  const [personalInfo] = useState({
    zephLink: auth?.zephLink || 'dfreedfr',
  });

  return (
    <div className='bg-purple-500 rounded-lg shadow p-6 flex flex-col items-center'>
      <div className='nbg-purple-500 text-white rounded-lg p-4 flex items-center'>
        <div className='flex-1'>
          <div className='bg-white p-3 h-24 w-24 flex items-center justify-center rounded-lg shadow-md'>
            <QRCode
              value={personalInfo.zephLink}
              size={200}
              bgColor='#ffffff'
              fgColor='#6366F1'
              level='H'
              includeMargin={true}
            />
          </div>
        </div>
      </div>

      <p className='mt-4 text-gray-200 text-center'>
        Scan this QR code to make a <br />
        payment to your ZephID.
      </p>
    </div>
  );
};

export default ZephQrCode;
