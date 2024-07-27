'use client';

import React from 'react';
import { Pagination, Select, MenuItem } from '@mui/material';
import { useDataGridContext } from '@/context/DataGridProvider';

const DataGridPagination = () => {
	const {
		filteredItems: items,
		page,
		itemsPerPage,
		handleChangePage,
		handleChangeItemsPerPage,
	} = useDataGridContext();

	return (
		<div className="flex items-center justify-end border border-gray bg-table-footer-bg gap-2 p-2 rounded-md">
			<div>Rows per page:</div>
			<Select
				id="row-page-selector"
				value={itemsPerPage}
				label=""
				onChange={handleChangeItemsPerPage}
				sx={{
					boxShadow: 'none',
					'.MuiOutlinedInput-notchedOutline': { border: 0 },
					'&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
						border: 0,
					},
					'&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
						border: 0,
					},
				}}
			>
				<MenuItem value={10}>10</MenuItem>
				<MenuItem value={20}>20</MenuItem>
				<MenuItem value={25}>25</MenuItem>
			</Select>
			<Pagination
<<<<<<< HEAD
				count={Math.ceil(items.length / itemsPerPage)}
=======
				count={Math.floor(items.length / itemsPerPage)}
>>>>>>> 4f7f682 (chartsdefinitions table build except edit delete)
				page={page}
				onChange={handleChangePage}
				size="large"
			/>
		</div>
	);
};

export default DataGridPagination;
