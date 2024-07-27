'use client';

import React from 'react';

import * as XLSX from 'xlsx';

import { AutoAdjustExcelColumnsWidth } from '@/utils';
import { useDataGridContext } from '@/context/DataGridProvider';

interface ExportsProps {
	handleClose: () => void;
}

const Exports = (props: ExportsProps) => {
	const { filteredItems: items, selectedItems, tableConfigs, tableConfigsIsShow } = useDataGridContext();

	const { handleClose } = props;

	const tableToCsv = (items: any[]) => {
		const tableHeaders = tableConfigs.filter(({ fieldKey }) => tableConfigsIsShow.includes(fieldKey));

		const csvHeaders = tableHeaders.map(({ fieldValue, downloadHeaderSetting }) =>
			downloadHeaderSetting ? downloadHeaderSetting : fieldValue
		);
		let csvContents = '';

		csvContents += csvHeaders.join(',') + '\n';
		csvContents += items
			.map((item) => tableConfigs.map(({ downloadSetting }) => downloadSetting(item)).join(',') + '\n')
			.join('');

		return csvContents;
	};

	const tableToExcel = (items: any[]) => {
		const tableHeaders = tableConfigs.filter(({ fieldKey }) => tableConfigsIsShow.includes(fieldKey));

		const excelHeaders = tableHeaders.map((header) => header.fieldValue);
		const excelContents = [] as any[];

		items.forEach((item) => {
			const arr = [
				...tableHeaders.map(({ downloadSetting }) => {
					if (typeof downloadSetting(item) !== 'string') {
						return downloadSetting(item);
					} else if (downloadSetting(item).includes(`"="`)) {
						return downloadSetting(item).replace(/^"=|"$|"/g, '');
					} else if (downloadSetting(item).includes('')) {
						return downloadSetting(item).replace(/"/g, '');
					} else {
						return downloadSetting(item);
					}
				}),
			];
			excelContents.push(arr);
		});

		return { headers: excelHeaders, contents: excelContents };
	};

	const handleClickDownloadCsv = () => {
		let csvContents;

		if (selectedItems.length === 0) {
			csvContents = tableToCsv(items);
		} else {
			csvContents = tableToCsv(selectedItems);
		}

		const fileName = 'csv_' + new Date().getTime() + '.csv';

		let link = document.createElement('a');
		link.setAttribute('href', 'data:text/csv;charset=utf-8' + encodeURI(csvContents));
		link.setAttribute('download', fileName);
		link.click();
		handleClose();
	};

	const handleClickDownloadExcel = () => {
		const workbook = XLSX.utils.book_new();
		let worksheet;
		let excelData;

		if (selectedItems.length === 0) {
			excelData = tableToExcel(items);
		} else {
			excelData = tableToExcel(selectedItems);
		}

		const columnWidths = AutoAdjustExcelColumnsWidth(excelData);
		worksheet = XLSX.utils.aoa_to_sheet([excelData.headers, ...excelData.contents]);
		worksheet['!cols'] = columnWidths;

		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

		const fileName = 'excel_' + new Date().getTime() + '.xlsx';
		XLSX.writeFile(workbook, fileName);
		handleClose();
	};

	return (
		<div className="flex flex-col gap-2 text-black font-inter py-2">
			<div className="cursor-pointer p-2 hover:bg-gray hover:bg-opacity-90" onClick={handleClickDownloadExcel}>
				Download as Excel
			</div>
		</div>
	);
};

export default Exports;
