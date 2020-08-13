import axios from '../http/http';
// 获取数据概览数据
export const orderOverview = p => axios.get('/mobile-report/pm-orderoverview/query', {params: p});
// 获取详情列表
export const orderList = p => axios.get('/mobile-report/pm-orderline-complete/query', {params: p});
// 获取小时产量趋势图数据
export const hourProduction = p => axios.get('/mobile-report/pm-hour-output/query-trend', {params: p});
// 获取定单数据
export const setRate = p => axios.get('/mobile-report/pm-set-rate/query-detail', {params: p});
// 获取齐套率分析图数据
export const setRateTrend = p => axios.get('/mobile-report/pm-set-rate/query', {params: p});