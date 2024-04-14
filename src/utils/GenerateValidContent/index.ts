const GenerateValidContent = (originContent: any) => {
	let validStatus: Record<string, string> = {};

	validStatus = Object.entries(originContent).reduce((acc, [key]) => {
		acc[key] = '';
		return acc;
	}, validStatus);

	return validStatus;
};

export default GenerateValidContent;
