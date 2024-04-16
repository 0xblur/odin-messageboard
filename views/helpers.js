import { escapeExpression } from "handlebars";

const helpers = {
	or(left, right) {
		return left || right || escapeExpression("");
	},
};

export default helpers;
