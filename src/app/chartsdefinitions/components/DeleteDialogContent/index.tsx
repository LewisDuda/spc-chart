import { DELETE_CONTENT_INTERFACE } from '@/models/chartsDefinitions';
import React from 'react';

interface EditDialogContentProps {
	deleteContent: DELETE_CONTENT_INTERFACE;
}

const DeleteDialogContent = (props: EditDialogContentProps) => {
	const { deleteContent } = props;

	return (
		<div className="flex flex-col items-center gap-10">
			<h1>
				Are you sure you want to delete all data and settings for the chart{' '}
				<b>
					{deleteContent.toolName}_{deleteContent.chartName}
				</b>{' '}
				?
			</h1>
		</div>
	);
};

export default DeleteDialogContent;
