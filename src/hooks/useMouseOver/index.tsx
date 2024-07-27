import { useState, MouseEvent } from 'react';

export interface UseMouseOverResult {
	isHovered: boolean;
	handleMouseOver: () => void;
	handleMouseOut: () => void;
}

const useMouseOver = (): UseMouseOverResult => {
	const [isHovered, setHovered] = useState(false);

	const handleMouseOver = () => {
		setHovered(true);
	};

	const handleMouseOut = () => {
		setHovered(false);
	};

	return {
		isHovered,
		handleMouseOver,
		handleMouseOut,
	};
};

export default useMouseOver;
