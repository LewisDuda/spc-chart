const NormalRequiredFieldRule = (fieldValue: any) => {
	if (typeof fieldValue === 'string' && (fieldValue === '' || fieldValue === null || fieldValue === undefined)) {
		return false;
	}
	if (typeof fieldValue === 'number' && (fieldValue === null || fieldValue === undefined)) {
		return false;
	}
	if (typeof fieldValue === 'object' && (fieldValue === null || fieldValue === undefined)) {
		return false;
	}
	return true;
};

export default NormalRequiredFieldRule;
