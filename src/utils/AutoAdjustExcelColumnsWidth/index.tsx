const AutoAdjustExcelColumnsWidth = (propExcelData: any) => {
	const excelData = [propExcelData.headers, ...propExcelData.contents];
	const columnsWidth: number[] = new Array(excelData[0].length).fill(0);

	excelData.forEach((row: any[]) => {
		row.forEach((item, index) => {
			const length = typeof item === 'string' ? item.length : String(item).length;
			columnsWidth[index] = Math.max(columnsWidth[index], length + 1);
		});
	});

	return columnsWidth.map((width) => ({ width }));
};

export default AutoAdjustExcelColumnsWidth;
