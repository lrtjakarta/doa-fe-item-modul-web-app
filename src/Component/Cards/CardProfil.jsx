import { Box, Grid, Hidden, Stack } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Title20 from 'Component/Typographys/Title20';
import AppAvatar from 'Component/avatars/AppAvatar';
import Title14400 from 'Component/Typographys/Title14400';
import Photo from 'Assets/qr-code.png';
import AvatarPhoto from 'Assets/avatar.png';
import React, { useContext, useEffect, useState } from 'react';
import QrCode from 'qrcode';
import { jwtDecode } from 'jwt-decode';

import { UserProfilContext } from 'Context/UserProfile';
import Title16700 from 'Component/Typographys/Title16700';
import Title16500 from 'Component/Typographys/Title16500';

function CardProfil(props) {
	const { userProfilById, userWorkorder } = useContext(UserProfilContext);

	const [qrBase, setQrBase] = useState('');

	const generateQrCode = async idNumber => {
		const response = await QrCode.toDataURL(idNumber);
		setQrBase(response);
	};

	useEffect(() => {
		if (userProfilById !== null) {
			generateQrCode(userProfilById?.userId);
		}
	}, [userProfilById]);

	// console.log('data user', userWorkorder);

	return (
		<Box sx={{maxWidth: '1024px'}}>
			{/* versi destop */}
			<Hidden only={['xs']}>
				<Stack direction="row" spacing={{ sm: 2, md: 4 }}>
					<AppAvatar
						src={AvatarPhoto}
						sx={{
							borderRadius: '10%',
							width: 125,
							height: 125,
						}}
					/>
					<Stack direction="column" spacing={3} sx={{ width: '100%' }}>
						<Stack direction="column" spacing={1}>
							<Title20 font={600} text={userProfilById?.name} />
							<Stack direction="row" spacing={1}>
								<AccountCircleOutlinedIcon style={{ color: '#7E8299' }} />
								<Title14400
									text={userProfilById?.jobPosition?.name}
									color="#7E8299"
								/>
							</Stack>
						</Stack>
						<Stack
							direction="row"
							justifyContent="space-between"
							spacing={{ sm: 2, md: 4 }}
						>
							<Stack direction="row" spacing={1}>
								<AccessTimeOutlinedIcon style={{ color: '#ED1C24' }} />
								<Title14400
									text={
										userWorkorder?.workOrder?.start +
										' - ' +
										userWorkorder?.workOrder?.end
									}
								/>
							</Stack>
							<Stack direction="row" spacing={1}>
								<TimerOutlinedIcon style={{ color: '#ED1C24' }} />
								<Title14400 text="Shift" color="#A1A5B7" />
								<Title14400 text={userWorkorder?.workOrder?.shift} />
							</Stack>
							<Stack direction="row" spacing={1}>
								<BadgeOutlinedIcon style={{ color: '#ED1C24' }} />
								<Title14400 text="Kode Dinas" color="#A1A5B7" />
								<Title14400 text={userWorkorder?.workOrder?.code} />
							</Stack>
						</Stack>
					</Stack>
					<AppAvatar
						src={qrBase}
						sx={{
							borderRadius: '5%',
							width: 100,
							height: 100,
						}}
					/>
				</Stack>
			</Hidden>
			{/* versi mobile */}
			<Hidden only={['sm', 'md', 'lg', 'xl']}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<AppAvatar
						src={AvatarPhoto}
						sx={{
							borderRadius: '10%',
							width: 125,
							height: 125,
							mb: 2,
						}}
					/>
					<Title20 font={600} text={userProfilById?.name} />
					<Title14400
						text={userProfilById?.jobPosition?.name}
						color="#7E8299"
					/>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						justifyContent="space-between"
						spacing={2}
						sx={{ mt: 2 }}
					>
						<Stack direction="row" spacing={1}>
							<AccessTimeOutlinedIcon style={{ color: '#ED1C24' }} />
							<Title14400
								text={
									userWorkorder?.workOrder?.start +
									' - ' +
									userWorkorder?.workOrder?.end
								}
							/>
						</Stack>
						<Stack direction="row" spacing={1}>
							<TimerOutlinedIcon style={{ color: '#ED1C24' }} />
							<Title14400 text="Shift" color="#A1A5B7" />
							<Title14400 text={userWorkorder?.workOrder?._id.shift} />
						</Stack>
						<Stack direction="row" spacing={1}>
							<BadgeOutlinedIcon style={{ color: '#ED1C24' }} />
							<Title14400 text="Kode Dinas" color="#A1A5B7" />
							<Title14400 text={userWorkorder?.workOrder?.code} />
						</Stack>
					</Stack>
				</Box>
			</Hidden>
		</Box>
	);
}

export default CardProfil;
