<<<<<<< HEAD
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
=======
import React from 'react';

const DeleteDialogContent = () => {
	return <>Delete Dialog Content</>;
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
};

export default DeleteDialogContent;
