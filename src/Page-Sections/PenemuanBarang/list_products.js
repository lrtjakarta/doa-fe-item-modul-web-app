import Barang1 from '../../Assets/img1.png';
import Barang2 from '../../Assets/img2.png';
import Barang3 from '../../Assets/barang.png';

const LIST_ITEMS = [
	{
		no: 1,
		image: Barang1,
		number: 'FO-0023',
		item: 'Makanan dan Minuman',
		des: 'Kue kering dalam plastik hitam',
		locationFound: {
			name: 'LRV',
			date: '20 Maret 2024',
		},
		locationStorage: {
			name: 'Stasiun VLD',
			date: '20 Maret 2024',
		},
		identification: 'Barang bersifat segar / Makanan',
		status: 'Penyimpanan',
	},
	{
		no: 2,
		image: Barang2,
		number: 'FO-0022',
		item: 'Kartu Tanda Pengenal',
		des: 'Kartu Identitas Mahasiswa UI atas nama Ira Atika Zahra dan terdapat kartu Flazz di belakang KTM',
		locationFound: {
			name: 'LRV',
			date: '20 Maret 2024',
		},
		locationStorage: {
			name: 'Stasiun VLD',
			date: '20 Maret 2024',
		},
		identification: '',
		status: 'Unidentified',
	},
	{
		no: 3,
		image: Barang3,
		number: 'FO-0021',
		item: 'Kartu Uang Elektronik',
		des: '1 E-money Indomaret warna kuning putih',
		locationFound: {
			name: 'LRV',
			date: '20 Maret 2024',
		},
		locationStorage: {
			name: 'Stasiun VLD',
			date: '20 Maret 2024',
		},
		identification: 'Barang Berharga',
		status: 'Claimed',
	},
];
export default LIST_ITEMS;
