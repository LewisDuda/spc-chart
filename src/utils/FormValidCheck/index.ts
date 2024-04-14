import { GenerateValidContent } from '@/utils';
interface FORM_VALID_CHECK {
	fieldsWithValue: { [key: string]: any };
	validRules: {
		fieldName: string;
		ruleFunc: <T>(fieldValue: T) => string;
	}[];
}

const FormValidCheck = (props: FORM_VALID_CHECK) => {
	const { fieldsWithValue, validRules } = props;

	let isValid = true;
	let validStatus = GenerateValidContent(fieldsWithValue);

	for (let fieldRule of validRules) {
		let fieldName = fieldRule.fieldName;
		let fieldValue = fieldsWithValue[fieldName];
		let ruleFunc = fieldRule.ruleFunc;

		if (ruleFunc(fieldValue) !== '') {
			validStatus[fieldName] = ruleFunc(fieldValue);
			isValid = false;
		}
	}
	return { isValid, validStatus };
};

export default FormValidCheck;
