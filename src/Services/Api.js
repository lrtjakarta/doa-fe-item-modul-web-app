import axios from 'axios';
import StaticVar from '../Config/StaticVar';
import { isExpired } from 'react-jwt';

let isRefreshing = false;
let refreshQueue = [];

// ===> api create
const api = axios.create({
	baseURL: StaticVar.URL_API,
	timeout: 1000000,
	//   headers: {
	//     "Content-Type": "application/json",
	//     Accept: "application/json",
	//   },
});

// const apiWorkOrder = axios.create({
// 	baseURL: StaticVar.WORKORDER_API,
// 	timeout: 1000000,
// 	//   headers: {
// 	//     "Content-Type": "application/json",
// 	//     Accept: "application/json",
// 	//   },
// });

api.interceptors.request.use(
	async config => {
		// get token
		const accessToken = localStorage.getItem('access_token');
		const refreshToken = localStorage.getItem('refresh_token');

		// check if token exists
		if (refreshToken && accessToken) {
			const accessTokenIsExpired = isExpired(accessToken);
			const refreshTokenIsExpired = isExpired(refreshToken);

			// check refresh token expire
			if (refreshTokenIsExpired) {
				// const navigate = useNavigate();
				// navigate to login page
				localStorage.clear();
				console.log('login expired');
				const message = { status: 401 };
				window.parent.postMessage(
					{ type: 'token expired', data: message },
					'*'
				);

				return;
			} else {
				// check access token expire
				if (accessTokenIsExpired) {
					// if access token has expired and we're not alredy refreshing
					if (!isRefreshing) {
						isRefreshing = true;
						// send refresh token api
						try {
							const data = { refreshToken };
							// console.log("data", data);
							const refresh = await axios.post(
								`${StaticVar.USER_API}/auth/refresh`,
								data
							);
							const newAccesToken = refresh.data.accessToken;
							const newRefreshToken = refresh.data.refreshToken;

							// udpate tokens
							localStorage.setItem('access_token', newAccesToken);
							localStorage.setItem('refresh_token', newRefreshToken);

							// send tokens to parent window
							window.parent.postMessage(
								{
									type: 'new token',
									data: {
										accessToken: newAccesToken,
										refreshToken: newRefreshToken,
									},
								},
								'*'
							);

							// Call all the requests that were waiting for the access token refresh
							refreshQueue.forEach(cb => cb(newAccesToken));
							refreshQueue = [];
							isRefreshing = false;
							console.log('succes refresh token');
						} catch (error) {
							isRefreshing = false;
							console.log('error refresh', error);
							localStorage.clear();
							const message = { status: 401 };
							window.parent.postMessage(
								{ type: 'token expired', data: message },
								'*'
							);
							return;
							//  throw new Error("Failed to refresh token");
						}
					}

					return new Promise(resolve => {
						refreshQueue.push(token => {
							config.headers.Authorization = `Bearer ${token}`;
							resolve(config);
						});
					});
				}

				// If the access token has not expired, set the Authorization header
				// config.headers.Authorization = `Bearer ${accessToken}`;
				// config.headers["x-access-token"] = accessToken;
				config.headers.Authorization = `Bearer ${localStorage.getItem(
					'access_token'
				)}`;
			}
		}

		// console.log("return config");
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	response => {
		// console.log("response", response);
		return response;
	},
	error => {
		// console.log("err response", error.response);
		if (error.response.status === 401) {
			const message = { status: 401 };
			window.parent.parent.postMessage(
				{ type: 'token expired', data: message },
				'*'
			);
			// removeTokensFromLocalStorage();
			// window.location.href = "/login?expired";

			return;
		}
		return Promise.reject(error);
	}
);

/* ########################################################################## */

/* GOODS SERVICES API */
// Penemuan Barang
const getLostFound = data => api.get('/goods/lostFound/', data);
const getLostFoundAll = data => api.get('/goods/lostFound/all', data);
const getLostFoundExpired = data => api.get('/goods/lostFound/expired/', data);
const getLostFoundById = (_id, data) =>
	api.get(`/goods/lostFound/${_id}`, data);
const postLostFound = data => api.post('/goods/lostFound/add', data);
const putLostFound = (_id, data) =>
	api.put(`/goods/lostFound/update/${_id}`, data);
const postManyLostFound = data => api.post('/goods/lostFound/updateMany', data);
const deleteLostFound = _id => api.delete(`/goods/lostFound/delete/${_id}`);

// Pengaduan Barang
const getGoodsComplaint = data => api.get('/goods/goodsComplaint/', data);
const getGoodsComplaintById = (_id, data) =>
	api.get(`/goods/goodsComplaint/${_id}`, data);
const postGoodsComplaint = data => api.post('/goods/goodsComplaint/add', data);
const putGoodsComplaint = (_id, data) =>
	api.put(`/goods/goodsComplaint/update/${_id}`, data);

// Pemindahan Barang
const getGoodsRelocation = data => api.get('/goods/goodsRelocation/', data);
const getGoodsRelocationById = (_id, data) =>
	api.get(`/goods/goodsRelocation/${_id}`, data);
const postGoodsRelocation = data =>
	api.post('/goods/goodsRelocation/add', data);
const putGoodsRelocation = (_id, data) =>
	api.put(`/goods/goodsRelocation/update/${_id}`, data);

// Penghapusbukuan
const getGoodsRemove = data => api.get('/goods/goodsRemove/', data);
const getGoodsRemoveById = (_id, data) =>
	api.get(`/goods/goodsRemove/${_id}`, data);
const postGoodsRemove = data => api.post('/goods/goodsRemove/add', data);
const postManyGoodsRemove = data =>
	api.post('/goods/goodsRemove/addMany', data);
const putGoodsRemove = (_id, data) =>
	api.put(`/goods/goodsRemove/update/${_id}`, data);
const putManyGoodsRemove = data =>
	api.put('/goods/goodsRemove/updateMany', data);

// Peminjaman Barang
const getGoodsLoanReturn = data => api.get('/goods/goodsLoanReturn/', data);
const getGoodsLoanReturnById = (_id, data) =>
	api.get(`/goods/goodsLoanReturn/${_id}`, data);
const postGoodsLoanReturn = data =>
	api.post('/goods/goodsLoanReturn/add', data);
const putGoodsLoanReturn = (_id, data) =>
	api.put(`/goods/goodsLoanReturn/update/${_id}`, data);

// Dashboard
const getDashboard = data => api.get('/goods/dashboard/', data);
const getCountLostFound = data =>
	api.get('/goods/dashboard/count/lostfound', data);
const getCountComplaint = data =>
	api.get('/goods/dashboard/count/complaint', data);
const getCountCombinasi = data =>
	api.get('/goods/dashboard/count/combined', data);
const getCountLostFoundExpired = params =>
	api.get('/goods/dashboard/count/lostFoundExpired', { params });

// Indetifikasi
const getIdentification = data => api.get('/goods/indetification/', data);
const getIdentificationById = (_id, data) =>
	api.get(`/goods/indetification/${_id}`, data);

// Lokasi Penyimpanan Dan Penemuan
const getLocation = data => api.get('/goods/location/', data);
const getLocationById = (_id, data) => api.get(`/goods/location/${_id}`, data);
const postLocation = data => api.post('/goods/location/add', data);
const putLocation = (_id, data) =>
	api.put(`/goods/location/update/${_id}`, data);
const deleteLocation = (_id, data) =>
	api.delete(`/goods/location/delete/${_id}`, data);

// Jenis Barang
const getItems = data => api.get('/goods/items/', data);
const getItemsById = (_id, data) => api.get(`/goods/items/${_id}`, data);
const postItems = data => api.post('/goods/items/add', data);
const putItems = (_id, data) => api.put(`/goods/items/update/${_id}`, data);
const deleteItems = (_id, data) =>
	api.delete(`/goods/items/delete/${_id}`, data);

// Workorder Service
const getProfileUser = (_id, data) =>
	api.get(`/work-order/profile/user/${_id}`, data);
const getProfileOfficer = data => api.get(`/work-order/profile/`, data);

// upload image
const getImage = (path, image) => api.get(`/uploads/${path}/${image}`);
const postManyImage = (params, data) =>
	api.post(`/uploads/multiple/${params}`, data);

// Work Order - Stasiun
const getStasiun = data => api.get(`/work-order/station`, data);

/* ########################################################################## */

export const API = {
	getLostFound,
	getLostFoundAll,
	getLostFoundExpired,
	getLostFoundById,
	postLostFound,
	putLostFound,
	postManyLostFound,
	deleteLostFound,

	getGoodsComplaint,
	getGoodsComplaintById,
	postGoodsComplaint,
	putGoodsComplaint,

	getGoodsRelocation,
	getGoodsRelocationById,
	postGoodsRelocation,
	putGoodsRelocation,

	getGoodsRemove,
	getGoodsRemoveById,
	postGoodsRemove,
	postManyGoodsRemove,
	putGoodsRemove,
	putManyGoodsRemove,

	getGoodsLoanReturn,
	getGoodsLoanReturnById,
	postGoodsLoanReturn,
	putGoodsLoanReturn,

	getDashboard,
	getCountLostFound,
	getCountComplaint,
	getCountCombinasi,
	getCountLostFoundExpired,

	getProfileUser,
	getProfileOfficer,

	getIdentification,
	getIdentificationById,

	getLocation,
	getLocationById,
	postLocation,
	putLocation,
	deleteLocation,

	getItems,
	getItemsById,
	postItems,
	putItems,
	deleteItems,

	postManyImage,
	getImage,

	getStasiun,
};

export default API;
