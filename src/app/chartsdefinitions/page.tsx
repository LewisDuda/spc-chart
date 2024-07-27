'use client';

import React, { FC, useEffect, useState } from 'react';
import { Panel, TableConfigs, FilterConfigs, Details, EditDialogContent, DeleteDialogContent } from './components';
<<<<<<< HEAD
=======
import { useAppContext } from '@/context/AppProvider';
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
import {
	ADD_CONTENT,
	ADD_CONTENT_VALID_STATUS,
	ADD_CONTENT_VALID_RULES,
	EDIT_CONTENT,
	EDIT_CONTENT_VALID_STATUS,
	EDIT_CONTENT_VALID_RULES,
<<<<<<< HEAD
	DELETE_CONTENT,
} from '@/const/chartsDefinitions';
import { ROW_ACTION_FUNC_PROPS } from '@/models/dataGrid';
import { DeepCopy, FormValidCheck } from '@/utils';
import { DataGrid, CustomDialog } from '@/components';
import { useFetcher } from '@/hooks';
=======
} from '@/const/chartsDefinitions';
import { ROW_ACTION_FUNC_PROPS } from '@/models/dataGrid';
import { DeepCopy, FormValidCheck } from '@/utils';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { SnackbarMessage, DataGrid, CustomDialog } from '@/components';
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)

interface ChartsDefinitionsProps {}

const ChartsDefinitions: FC<ChartsDefinitionsProps> = () => {
	const {
<<<<<<< HEAD
		resData: chartsDefinitionsData,
		isLoading,
		isError,
		errorMessage,
		refetch,
		fetchData,
	} = useFetcher({
		url: '/chartsDefinitions',
		initialData: [],
	});

	const { isLoading: isAddLoading, isError: isAddError, handleFetch: handleAddChartDefinitions } = useFetcher();
	const { isLoading: isEditLoading, isError: isEditError, handleFetch: handleEditChartDefinitions } = useFetcher();
	const {
		isLoading: isDeleteLoading,
		isError: isDeleteError,
		handleFetch: handleDeleteChartDefinitions,
	} = useFetcher();
=======
		chartsDefinitionsData,
		getChartsDefinitionsData,
		addChartDefinitionsData,
		chartsDefinitionsStatus,
		initChartsDefinitionsStatus,
	} = useAppContext();
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)

	const mainKey = 'id';
	const [addContent, setAddContent] = useState(DeepCopy(ADD_CONTENT));
	const [addContentValidStatus, setAddContentValidStatus] = useState(ADD_CONTENT_VALID_STATUS);
	const [enableAddContent, setEnableAddContent] = useState(true);
	const [editContent, setEditContent] = useState(DeepCopy(EDIT_CONTENT));
	const [editContentValidStatus, setEditContentValidStatus] = useState(EDIT_CONTENT_VALID_STATUS);
	const [enableEditContent, setEnableEditContent] = useState(true);
<<<<<<< HEAD
	const [deleteContent, setDeleteContent] = useState(DeepCopy(DELETE_CONTENT));
=======
	const [isLoading, setIsLoading] = useState(true);
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
	const [selectedChartsDefinitions, setSelectedChartsDefinitions] = useState<any[]>([]);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	const onTextChangeAddContent = (field: string, value: string | number) => {
		setAddContent((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleAddContentSubmit = () => {
		if (checkAddContentEnable().isValid) {
<<<<<<< HEAD
			handleAddChartDefinitions({
				url: '/chartsDefinitions',
				title: 'Charts Definitions',
				method: 'POST',
				data: addContent,
			});
=======
			addChartDefinitionsData(addContent);
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
		} else {
			setEnableAddContent(false);
			setAddContentValidStatus(checkAddContentEnable().validStatus);
			setTimeout(() => {
				setEnableAddContent(true);
			}, 2000);
		}
	};

	const checkAddContentEnable = () => {
		let params = {
			fieldsWithValue: addContent,
			validRules: ADD_CONTENT_VALID_RULES,
		};
		const checkResult = FormValidCheck(params);
		return checkResult;
	};

	const handleAddContentCancel = () => {
		setAddContent(ADD_CONTENT);
		setAddContentValidStatus(ADD_CONTENT_VALID_STATUS);
	};

	const onSelect = (selectedItems: any[]) => {
		setSelectedChartsDefinitions(selectedItems);
	};

	const handleEditClick = (props: ROW_ACTION_FUNC_PROPS) => {
		const { item, handleCloseMenu } = props;
		setEditContent({
			id: item.id,
			toolName: item.toolName,
			chartName: item.chartName,
			yAxialTitle: item.yAxialTitle,
			maxSpec: item.maxSpec,
			minSpec: item.minSpec,
			target: item.target,
		});
		setEditContentValidStatus(EDIT_CONTENT_VALID_STATUS);
		handleCloseMenu();
		setIsEditOpen(true);
	};

	const handleEditClose = () => {
		setIsEditOpen(false);
	};

	const handleEditSubmit = () => {
		if (checkEditContentEnable().isValid) {
<<<<<<< HEAD
			handleEditChartDefinitions({
				url: `/chartsDefinitions/${editContent.id}`,
				title: 'Charts Definitions',
				method: 'PUT',
				data: editContent,
			});
=======
			// addChartDefinitionsData(addContent);
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
			setIsEditOpen(false);
		} else {
			setEnableEditContent(false);
			setEditContentValidStatus(checkEditContentEnable().validStatus);
			setTimeout(() => {
				setEnableEditContent(true);
			}, 2000);
		}
	};

<<<<<<< HEAD
=======
	const onTextChangeEditContent = (field: string, value: string | number) => {
		setEditContent((prev) => ({
			...prev,
			[field]: value,
		}));
	};

>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
	const checkEditContentEnable = () => {
		let params = {
			fieldsWithValue: editContent,
			validRules: EDIT_CONTENT_VALID_RULES,
		};
		const checkResult = FormValidCheck(params);
		return checkResult;
	};

<<<<<<< HEAD
	const onTextChangeEditContent = (field: string, value: string | number) => {
		setEditContent((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleDeleteClick = (props: ROW_ACTION_FUNC_PROPS) => {
		const { item, handleCloseMenu } = props;

		setDeleteContent({
			id: item.id,
			toolName: item.toolName,
			chartName: item.chartName,
		});
=======
	const handleDeleteClick = (props: ROW_ACTION_FUNC_PROPS) => {
		const { item, handleCloseMenu } = props;
		console.log('delete', item);
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
		handleCloseMenu();
		setIsDeleteOpen(true);
	};

	const handleDeleteSubmit = () => {
<<<<<<< HEAD
		handleDeleteChartDefinitions({
			url: `/chartsDefinitions/${deleteContent.id}`,
			title: 'Charts Definitions',
			method: 'DELETE',
		});
=======
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
		setIsDeleteOpen(false);
	};

	const handleDeleteClose = () => {
		setIsDeleteOpen(false);
	};

<<<<<<< HEAD
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (!isAddLoading && !isAddError) {
			setAddContent(ADD_CONTENT);
			refetch();
		}
	}, [isAddLoading]);

	useEffect(() => {
		if (!isEditLoading && !isEditError) {
			setEditContent(EDIT_CONTENT);
			refetch();
		}
	}, [isEditLoading]);

	useEffect(() => {
		if (!isDeleteLoading && !isDeleteError) {
			setDeleteContent(DELETE_CONTENT);
			refetch();
		}
	}, [isDeleteLoading]);

	// // function generateRandomChartDefinition(index) {
	// // 	const toolNames = ['Tool1', 'Tool2', 'Tool3', 'AASD'];
	// // 	const chartNames = ['Chart1', 'Chart2', 'Chart3', 'Chart4', 'Chart5', 'Chart6', 'Chart7'];
	// // 	const yAxialTitles = ['y title', 'asd', 'ytitle', '123', 'y', 'qwd'];

	// // 	const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

	// // 	return {
	// // 		id: String(Date.now() + index),
	// // 		toolName: randomElement(toolNames),
	// // 		chartName: randomElement(chartNames),
	// // 		yAxialTitle: randomElement(yAxialTitles),
	// // 		maxSpec: Math.floor(Math.random() * 100) + 1,
	// // 		minSpec: Math.floor(Math.random() * 100) + 1,
	// // 		target: Math.floor(Math.random() * 100) + 1,
	// // 		max: 100,
	// // 		min: 0,
	// // 		ticksSteps: 10,
	// // 		isShowLegend: true,
	// // 		chartTitleSize: 25,
	// // 		yTitleSize: 15,
	// // 		xLabelSize: 12,
	// // 		xSubLabelSize: 12,
	// // 		yLabelSize: 12,
	// // 		chartTitleWeight: 700,
	// // 		yTitleWeight: 700,
	// // 		xLabelWeight: 100,
	// // 		xSubLabelWeight: 100,
	// // 		yLabelWeight: 100,
	// // 		lineWidth: 2,
	// // 		pointRadius: 2,
	// // 		lineRadian: 0.01,
	// // 		xSubLabelAngle: 0,
	// // 		isShowXSubLabel: true,
	// // 		breakLine: [],
	// // 		createTime: Date.now(),
	// // 	};
	// // }
=======
	// function generateRandomChartDefinition(index) {
	// 	const toolNames = ['Tool1', 'Tool2', 'Tool3', 'AASD'];
	// 	const chartNames = ['Chart1', 'Chart2', 'Chart3', 'Chart4', 'Chart5', 'Chart6', 'Chart7'];
	// 	const yAxialTitles = ['y title', 'asd', 'ytitle', '123', 'y', 'qwd'];

	// 	const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

	// 	return {
	// 		id: String(Date.now() + index),
	// 		toolName: randomElement(toolNames),
	// 		chartName: randomElement(chartNames),
	// 		yAxialTitle: randomElement(yAxialTitles),
	// 		maxSpec: Math.floor(Math.random() * 100) + 1,
	// 		minSpec: Math.floor(Math.random() * 100) + 1,
	// 		target: Math.floor(Math.random() * 100) + 1,
	// 		max: 100,
	// 		min: 0,
	// 		ticksSteps: 10,
	// 		isShowLegend: true,
	// 		chartTitleSize: 25,
	// 		yTitleSize: 15,
	// 		xLabelSize: 12,
	// 		xSubLabelSize: 12,
	// 		yLabelSize: 12,
	// 		chartTitleWeight: 700,
	// 		yTitleWeight: 700,
	// 		xLabelWeight: 100,
	// 		xSubLabelWeight: 100,
	// 		yLabelWeight: 100,
	// 		lineWidth: 2,
	// 		pointRadius: 2,
	// 		lineRadian: 0.01,
	// 		xSubLabelAngle: 0,
	// 		isShowXSubLabel: true,
	// 		breakLine: [],
	// 		createTime: Date.now(),
	// 	};
	// }

	useEffect(() => {
		getChartsDefinitionsData();
		// const chartsDefinitions = Array.from({ length: 10000 }, (_, index) => generateRandomChartDefinition(index));
		// const result = { chartsDefinitions };

		// console.log(JSON.stringify(result, null, 2));
	}, []);

	useEffect(() => {
		const { brief, title, method, description } = chartsDefinitionsStatus;

		if (method === 'GET') {
			if (brief === 'succeed') {
				// console.log('chartsDefinitionsData', chartsDefinitionsData);
				setIsLoading(false);
				initChartsDefinitionsStatus();
			}
		}
		if (method === 'ADD') {
			if (brief === 'succeed') {
				const message = <SnackbarMessage title={title} method={method} />;
				enqueueSnackbar(message, {
					variant: 'success',
					autoHideDuration: 2000,
				});
				handleAddContentCancel();
				initChartsDefinitionsStatus();
			}
			if (brief === 'failed') {
				const message = <SnackbarMessage title={title} method={method} description={description} />;
				enqueueSnackbar(message, {
					variant: 'error',
					autoHideDuration: 5000,
				});
				handleAddContentCancel();
				initChartsDefinitionsStatus();
			}
		}
	}, [chartsDefinitionsStatus.brief]);
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)

	return (
		<div className="h-full w-full flex justify-center items-center gap-5">
			<div className="h-full w-1/3 flex flex-col justify-around items-center p-5 bg-white rounded-xl">
				<Panel
					content={addContent}
					validStatus={addContentValidStatus}
					onTextChange={onTextChangeAddContent}
					handleSubmit={handleAddContentSubmit}
					handleCancel={handleAddContentCancel}
					enableAdd={enableAddContent}
				/>
			</div>
			<div className="h-full w-2/3 bg-white rounded-xl p-5">
				<DataGrid
					isLoading={isLoading}
<<<<<<< HEAD
					isError={isError}
					errorStatus={errorMessage}
=======
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
					items={chartsDefinitionsData}
					selectedItems={selectedChartsDefinitions}
					mainKey={mainKey}
					toolbar={{
						columns: true,
						filters: {
							configs: FilterConfigs,
						},
						exports: true,
					}}
					table={{
						configs: TableConfigs,
						stickyHeader: true,
						rowDetails: Details,
						onSelect: onSelect,
						actions: [
							{
								label: <div>Edit</div>,
								func: handleEditClick,
							},
							{
								label: <div>Delete</div>,
								func: handleDeleteClick,
							},
						],
					}}
				/>
<<<<<<< HEAD
			</div>
=======
				{/* <DataGrid
					isLoading={isLoading}
					data={chartsDefinitionsData}
					tableFormat={TableFormat}
					withChecked={true}
					withSticky={true}
				/> */}
			</div>
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				className="!p-4 !text-lg"
			/>
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
			<CustomDialog
				isOpen={isEditOpen}
				handleClose={handleEditClose}
				title={`Edit ${editContent.toolName}_${editContent.chartName}`}
				dialogContent={
					<EditDialogContent
						editContent={editContent}
						validStatus={editContentValidStatus}
						onTextChange={onTextChangeEditContent}
						handleSubmit={handleEditSubmit}
						enableSubmit={enableEditContent}
					/>
				}
				enableSubmit={enableEditContent}
				handleSubmit={handleEditSubmit}
				submitText="Submit"
			/>
			<CustomDialog
				isOpen={isDeleteOpen}
				handleClose={handleDeleteClose}
<<<<<<< HEAD
				title={`Delete ${deleteContent?.toolName}_${deleteContent.chartName}`}
				dialogContent={<DeleteDialogContent deleteContent={deleteContent} />}
=======
				title={`Delete`}
				dialogContent={<DeleteDialogContent />}
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
				enableSubmit={true}
				handleSubmit={handleDeleteSubmit}
				submitText="Delete"
			/>
		</div>
	);
};

export default ChartsDefinitions;
