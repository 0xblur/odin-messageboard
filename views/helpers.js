import { SafeString } from "handlebars";

const helpers = {
	strictOR(left, right) {
		const result = left || right || null;
		return result;
	},
};

export default helpers;
