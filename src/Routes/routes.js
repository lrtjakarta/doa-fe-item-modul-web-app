import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingScreen from 'Component/Loading Screen';

const Loadable = Component => props => {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);
};

// Dashboard
const Dashboard = Loadable(lazy(() => import('Pages/Dashboard/index')));

// Penemuan
const ListPenemuan = Loadable(lazy(() => import('Pages/PenemuanBarang/index')));
const AddPenemuan = Loadable(
	lazy(() => import('Pages/PenemuanBarang/AddPenemuanBarang'))
);
const DetailPenemuan = Loadable(
	lazy(() => import('Pages/PenemuanBarang/DetailPenemuanBarang'))
);
const ScanPengambilan = Loadable(
	lazy(() => import('Pages/PenemuanBarang/ScanQRCode'))
);
const AddPengambilan = Loadable(
	lazy(() => import('Pages/PenemuanBarang/FormPengambilanBarang'))
);

// Pengaduan
const ListPengaduan = Loadable(
	lazy(() => import('Pages/PengaduanBarang/ListPengaduan'))
);
const AddPengaduan = Loadable(
	lazy(() => import('Pages/PengaduanBarang/AddPengaduan'))
);
const DetailPengaduan = Loadable(
	lazy(() => import('Pages/PengaduanBarang/DetailPengaduan'))
);

// Pemindahan
const ListPemindahan = Loadable(
	lazy(() => import('Pages/PemindahanBarang/ListPemindahan'))
);
const AddPemindahan = Loadable(
	lazy(() => import('Pages/PemindahanBarang/AddPemindahan'))
);
const DetailPemindahan = Loadable(
	lazy(() => import('Pages/PemindahanBarang/DetailPemindahan'))
);

// Penghapusbukuan Barang
const ListPenghapusBukuan = Loadable(
	lazy(() => import('Pages/PenghapusBukuan/TabListPenghapusbukuan'))
);
const FormPenghapusBukuan = Loadable(
	lazy(() => import('Pages/PenghapusBukuan/FormPenghapusBukuan'))
);
const DetailPenghapusBukuan = Loadable(
	lazy(() => import('Pages/PenghapusBukuan/DetailPenghapusBukuan'))
);
const DetailPenyerahan = Loadable(
	lazy(() => import('Pages/PenghapusBukuan/DetailPenyerahanBarang'))
);

// Peminjaman & Pengembalian Barang
const ListPeminjaman = Loadable(
	lazy(() => import('Pages/PeminjamanBarang/DaftarPeminjaman'))
);
const FormPeminjaman = Loadable(
	lazy(() => import('Pages/PeminjamanBarang/FormPeminjaman'))
);
const FormPengembalian = Loadable(
	lazy(() => import('Pages/PeminjamanBarang/FormPengembalian'))
);
const DetailPengembalianPengembalian = Loadable(
	lazy(() => import('Pages/PeminjamanBarang/DetailPeminjamanPengembalian'))
);
const BeritaAcaraPengembalian = Loadable(
	lazy(() => import('Pages/PeminjamanBarang/BeritaAcaraPengembalian'))
);
const BeritaAcaraPeminjaman = Loadable(
	lazy(() => import('Pages/PeminjamanBarang/BeritaAcaraPeminjaman'))
);

// Master Data
const ListJenisBarang = Loadable(
	lazy(() => import('Pages/MasterData/JenisBarang/List'))
);
const ListLokasi = Loadable(
	lazy(() => import('Pages/MasterData/LokasiPenemuanPenyimpanan/List'))
);

const mainRoutes = [
	{
		path: 'manajemenBarang',
		element: <Navigate to="/manajemenBarang/dashboard" />,
	},
	{
		path: 'manajemenBarang',
		children: [
			{
				path: 'dashboard',
				element: <Dashboard />,
			},
			{
				path: 'penemuan',
				element: <ListPenemuan />,
			},
			{
				path: 'penemuan/add',
				element: <AddPenemuan />,
			},
			{
				path: 'penemuan/detail',
				element: <DetailPenemuan />,
			},
			{
				path: 'penemuan/qrCode',
				element: <ScanPengambilan />,
			},
			{
				path: 'penemuan/formPengambilan',
				element: <AddPengambilan />,
			},

			{
				path: 'pengaduan',
				element: <ListPengaduan />,
			},
			{
				path: 'pengaduan/add',
				element: <AddPengaduan />,
			},
			{
				path: 'pengaduan/detail',
				element: <DetailPengaduan />,
			},

			{
				path: 'pemindahan',
				element: <ListPemindahan />,
			},
			{
				path: 'pemindahan/add',
				element: <AddPemindahan />,
			},
			{
				path: 'pemindahan/detail',
				element: <DetailPemindahan />,
			},

			{
				path: 'penghapusbukuan',
				element: <ListPenghapusBukuan />,
			},
			{
				path: 'penghapusbukuan/add',
				element: <FormPenghapusBukuan />,
			},
			{
				path: 'penghapusbukuan/detail',
				element: <DetailPenghapusBukuan />,
			},
			{
				path: 'penghapusbukuan/penyerahan',
				element: <DetailPenyerahan />,
			},
			{
				path: 'peminjamanPengembalian',
				children: [
					{
						path: '',
						element: <ListPeminjaman />,
					},
					{
						path: 'addPeminjaman',
						element: <FormPeminjaman />,
					},
					{
						path: 'addPengembalian',
						element: <FormPengembalian />,
					},
					{
						path: 'Detail',
						element: <DetailPengembalianPengembalian />,
					},
					{
						path: 'beritaAcara',
						children: [
							{
								path: 'Peminjaman',
								element: <BeritaAcaraPeminjaman />,
							},
							{
								path: 'Pengembalian',
								element: <BeritaAcaraPengembalian />,
							},
						],
					},
				],
			},
			{
				path: 'masterData',
				children: [
					{
						path: 'jenisBarang',
						element: <ListJenisBarang />,
					},
					{
						path: 'lokasi',
						element: <ListLokasi />,
					},
				],
			},
		],
	},
];

export default mainRoutes;
