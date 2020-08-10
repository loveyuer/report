import axios from '../http/http';

export const orderOverview = p => axios.get('/mobile-report/pm-orderoverview/query', {params: p});