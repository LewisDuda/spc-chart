'use client';

import React, { FC, useEffect, useState } from 'react';
import { Panel, TableConfigs, FilterConfigs, Details, EditDialogContent, DeleteDialogContent } from './components';
import {
	ADD_CONTENT,
	ADD_CONTENT_VALID_STATUS,
	ADD_CONTENT_VALID_RULES,
	EDIT_CONTENT,
	EDIT_CONTENT_VALID_STATUS,
	EDIT_CONTENT_VALID_RULES,
	DELETE_CONTENT,
} from '@/const/chartsDefinitions';
import { ROW_ACTION_FUNC_PROPS } from '@/models/dataGrid';
import { DeepCopy, FormValidCheck } from '@/utils';
import { DataGrid, CustomDialog } from '@/components';
import { useFetcher } from '@/hooks';

interface ChartsDefinitionsProps {}

const ChartsDefinitions: FC<ChartsDefinitionsProps> = () => {
	const {
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

	const mainKey = 'id';
	const [addContent, setAddContent] = useState(DeepCopy(ADD_CONTENT));
	const [addContentValidStatus, setAddContentValidStatus] = useState(ADD_CONTENT_VALID_STATUS);
	const [enableAddContent, setEnableAddContent] = useState(true);
	const [editContent, setEditContent] = useState(DeepCopy(EDIT_CONTENT));
	const [editContentValidStatus, setEditContentValidStatus] = useState(EDIT_CONTENT_VALID_STATUS);
	const [enableEditContent, setEnableEditContent] = useState(true);
	const [deleteContent, setDeleteContent] = useState(DeepCopy(DELETE_CONTENT));
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
			handleAddChartDefinitions({
				url: '/chartsDefinitions',
				title: 'Charts Definitions',
				method: 'POST',
				data: addContent,
			});
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
			handleEditChartDefinitions({
				url: `/chartsDefinitions/${editContent.id}`,
				title: 'Charts Definitions',
				method: 'PUT',
				data: editContent,
			});
			setIsEditOpen(false);
		} else {
			setEnableEditContent(false);
			setEditContentValidStatus(checkEditContentEnable().validStatus);
			setTimeout(() => {
				setEnableEditContent(true);
			}, 2000);
		}
	};

	const checkEditContentEnable = () => {
		let params = {
			fieldsWithValue: editContent,
			validRules: EDIT_CONTENT_VALID_RULES,
		};
		const checkResult = FormValidCheck(params);
		return checkResult;
	};

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
		handleCloseMenu();
		setIsDeleteOpen(true);
	};

	const handleDeleteSubmit = () => {
		handleDeleteChartDefinitions({
			url: `/chartsDefinitions/${deleteContent.id}`,
			title: 'Charts Definitions',
			method: 'DELETE',
		});
		setIsDeleteOpen(false);
	};

	const handleDeleteClose = () => {
		setIsDeleteOpen(false);
	};

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
					isError={isError}
					errorStatus={errorMessage}
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
			</div>
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
				title={`Delete ${deleteContent?.toolName}_${deleteContent.chartName}`}
				dialogContent={<DeleteDialogContent deleteContent={deleteContent} />}
				enableSubmit={true}
				handleSubmit={handleDeleteSubmit}
				submitText="Delete"
			/>
		</div>
	);
};

export default ChartsDefinitions;
