import React, { useState } from 'react';
import { Stepper, Step, StepLabel, StepContent, Button } from '@mui/material';

interface TipsProps {
	handleClose: () => void;
}

const steps = [
	{
		label: 'Show or Hide required Columns',
		description: `Click Columns to expand the content.\n\nYou can hide or show the required fields as needed. Display the fields through SHOW ALL or HIDE ALL and RESET at the bottom of the expanded content.`,
	},
	{
		label: 'Filter Data',
		description: `Click Filters to expand the content.\n\n1.  Select the field you want to filter through the Select menu of Column.\n\n2. Select the rule you want to filter through the Select menu of Operator.\n\n3. Filter through the field of Value. The value you want to filter.\n\n4. If you need multiple conditions to filter, you can click ADD FILTER to add a new filter condition, and you can select the intersection or union of the data results of the filter condition by selecting AND or OR.\n\n5. In addition, if you want to delete the filter conditions, you can use the X button on the left to filter the filter conditions you want to filter out or click REMOVE ALL to delete all filter conditions.`,
	},
	{
		label: 'Download Data',
		description: `Click Exports to expand the content.\n\nYou can choose to download the data on the current form, reminding you that it will be the data presented on the current form. This means that if you have operated Columns or Filters, the downloaded content will be the result of the operation.\n\nIn addition, you can also check Select the data you want to download so that the next data will only display the data you selected.`,
	},
	{
		label: 'Manipulate table row data',
		description: 'Right-click the data row to perform operations (EDIT or DELETE)',
	},
];

const Tips = (props: TipsProps) => {
	const { handleClose } = props;
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleFinish = () => {
		handleClose();
		setActiveStep(0);
	};

	return (
		<div className="max-h-96 w-[40rem] p-4 overflow-y-scroll">
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((step, index) => (
					<Step key={step.label}>
						<StepLabel>{step.label}</StepLabel>
						<StepContent>
							<div className="flex whitespace-pre-wrap break-words">{step.description}</div>
							<div className="mb-2">
								<Button
									className="btn-submit"
									onClick={index === steps.length - 1 ? handleFinish : handleNext}
									sx={{ mt: 1, mr: 1 }}
								>
									{index === steps.length - 1 ? 'Finish and Close' : 'Continue'}
								</Button>
								<Button
									className="btn-submit"
									disabled={index === 0}
									onClick={handleBack}
									sx={{ mt: 1, mr: 1 }}
								>
									Back
								</Button>
							</div>
						</StepContent>
					</Step>
				))}
			</Stepper>
		</div>
	);
};

export default Tips;
