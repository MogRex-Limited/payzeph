import { useContext, useState } from 'react';
import QRCode from 'react-qr-code';
import AuthContext from '../context/AuthProvider';

const ZephQrCode = () => {
  const { auth } = useContext(AuthContext);
  const [personalInfo] = useState({
    zephLink: auth?.zephLink || 'dfreedfr',
  });

  return (
    <div className='bg-white rounded-lg shadow p-6 flex flex-col items-center'>
      <QRCode
        value={personalInfo.zephLink}
        size={200}
        bgColor='#ffffff'
        fgColor='#6366F1'
        level='H'
        includeMargin={true}
      />
      <p className='mt-4 text-gray-600 text-center'>
        Scan this QR code to make a <br />
        payment to your ZephID.
      </p>
    </div>
  );
};

export default ZephQrCode;
