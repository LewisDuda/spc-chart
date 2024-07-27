const DeepCopy = <T>(target: T): T => {
	return JSON.parse(JSON.stringify(target));
};

export default DeepCopy;
