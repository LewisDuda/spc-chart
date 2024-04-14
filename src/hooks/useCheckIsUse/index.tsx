import { useEffect, useState } from 'react';

interface useCheckIsUseProps {
	itemToCheck: any;
	defaultUse: boolean;
}

const useCheckIsUse = (props: useCheckIsUseProps): boolean => {
	const { itemToCheck, defaultUse } = props;

	const [isUse, setIsUse] = useState(false);

	useEffect(() => {
		if ((itemToCheck === undefined || itemToCheck === false) && defaultUse === false) {
			setIsUse(false);
		} else {
			setIsUse(true);
		}
	}, []);

	return isUse;
};

export default useCheckIsUse;
