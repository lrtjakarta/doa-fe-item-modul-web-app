import React, { createContext, useState } from 'react';
import QrCode from 'qrcode';

export const GenerateQrCodeContext = createContext({});

export default function GenerateQrCodeProvider(props) {
	const [qrBase, setQrBase] = useState('');

	const generateQr = async data => {
		// console.log('generate qr code', data);
		if (data !== undefined) {
			const response = await QrCode.toDataURL(data);
			setQrBase(response);
		}
	};

	return (
		<GenerateQrCodeContext.Provider
			value={{
				qrBase,
				generateQr,
			}}
			{...props}
		/>
	);
}
