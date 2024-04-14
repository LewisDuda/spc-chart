import axios from '@/services';
import { ADD_CONTENT_INTERFACE } from '@/const/chartsDefinitions';

const USER_ENDPOINT = '/chartsDefinitions';

const GET_CHARTS_DEFINITIONS = async () => {
	try {
		const response = await axios.get(USER_ENDPOINT);
		return { status: response.status, data: response.data };
	} catch (error: any) {
		return { status: error.response.status, data: error.response.data };
	}
};

const POST_CHART_DEFINITIONS = async (CHART_DEFINITIONS_CONTENT: ADD_CONTENT_INTERFACE) => {
	try {
		const response = await axios.post(USER_ENDPOINT, CHART_DEFINITIONS_CONTENT);
		return { status: response.status, data: response.data };
	} catch (error: any) {
		return { status: error.response.status, data: error.response.data.msg };
	}
};

export { GET_CHARTS_DEFINITIONS, POST_CHART_DEFINITIONS };
