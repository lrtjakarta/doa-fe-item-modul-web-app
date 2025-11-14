import { Card, Stack, Typography, Button, Box } from '@mui/material';
import AppTextField from 'Component/input-fields/AppTextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InputManual({ handleClose }) {
	const navigate = useNavigate();

	const [codeItem, setCodeItem] = useState('');

	const handleSubmit = () => {
		// navigate('/manajemenBarang/penemuan/formPengambilan', {
		// 	state: { _idNumber: codeItem },
		// });
		navigate('/manajemenBarang/penemuan/detail', {
			state: { idNumber: codeItem, status: 'Pengambilan' },
		});
	};
	// const handleClose = () => {
	// 	navigate(-1);
	// };

	return (
		<Stack direction="row" justifyContent="center">
			<Box
				sx={{
					width: { xs: '100%', sm: '100%' },
					padding: '30px 50px',
					backgroundColor: '#f5f2f2',
					borderRadius: '10px',
				}}
			>
				<Stack
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={3}
				>
					<Typography
						sx={{ fontSize: { xs: '18px', sm: '24px' }, fontWeight: 500 }}
					>
						Masukkan Secara Manual
					</Typography>
					<AppTextField
						sx={{ width: { xs: '100%', sm: '50%' } }}
						label="Kode Barang"
						value={codeItem}
						onChange={e => setCodeItem(e.target.value)}
					/>
					<Stack
						direction="row"
						justifyContent="flex-end"
						spacing={2}
						sx={{ paddingTop: '35px' }}
					>
						<Button
							variant="text"
							sx={{ padding: '10px 35px' }}
							color="error"
							onClick={handleClose}
						>
							Batal
						</Button>

						<Button
							type="submit"
							sx={{ padding: '10px 35px' }}
							variant="contained"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	);
}

export default InputManual;
