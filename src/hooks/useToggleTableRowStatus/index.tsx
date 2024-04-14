import { useState, MouseEvent, useEffect } from 'react';
import { useMouseOver } from '@/hooks';

interface UseToggleTableRowStatusProps {
	isSelected: boolean;
}

interface UseToggleTableRowStatusResult {
	rowStatus: string;
	handleMouseOver: () => void;
	handleMouseOut: () => void;
}

const useToggleTableRowStatus = ({ isSelected }: UseToggleTableRowStatusProps): UseToggleTableRowStatusResult => {
	const { isHovered, handleMouseOver, handleMouseOut } = useMouseOver();
	const [rowStatus, setRowStatus] = useState('');

	const observedStatus = () => {
		if ((isSelected && isHovered) || isSelected) {
			return 'Custom-Selected';
		}
		if (isHovered) {
			return 'Custom-Hovered';
		}
		return '';
	};

	useEffect(() => {
		const status = observedStatus();

		setRowStatus(status);
	}, [isSelected, isHovered]);

	return {
		rowStatus,
		handleMouseOver,
		handleMouseOut,
	};
};

export default useToggleTableRowStatus;
