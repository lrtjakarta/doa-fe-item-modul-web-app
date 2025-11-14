import Barang from 'Assets/barang.png';
const ListData = [
	{
		foto: Barang,
		idNumber: 'FO-0001',
		date: '20/03/2024',
		penemuan: {
			location: 'LRV',
			date: '20/03/2024',
			name: 'Khoirul Mustaan',
		},
		storage: {
			location: 'Stasiun VLD',
			date: '20/03/2024',
		},
		identification: {
			name: 'Barang segar / makanan',
			type: 'Tertutup',
		},
		status: 'Expired',
	},
	{
		foto: Barang,
		idNumber: 'FO-0002',
		date: '20/03/2024',
		penemuan: {
			location: 'Stasiun VLD',
			date: '20/03/2024',
			name: 'Khoirul Mustaan',
		},
		storage: {
			location: 'Stasiun VLD',
			date: '20/03/2024',
		},
		identification: {
			name: 'Barang tidak mudah rusak',
			type: 'Pribadi',
		},
		status: 'Expired',
	},
	{
		foto: Barang,
		idNumber: 'FO-0002',
		date: '20/03/2024',
		penemuan: {
			location: 'Stasiun VLD',
			date: '20/03/2024',
			name: 'Khoirul Mustaan',
		},
		storage: {
			location: 'Stasiun VLD',
			date: '20/03/2024',
		},
		identification: {
			name: 'Barang tidak mudah rusak',
			type: 'Pribadi',
		},
		status: 'Penyimpanan',
	},
];
export default ListData;
