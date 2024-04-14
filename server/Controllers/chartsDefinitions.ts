import { Request, Response } from 'express';
import { getDB, writeDB } from '../Utils';

const Get = (req: Request, res: Response) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	const chartsDefinitions = getDB('chartsDefinitions');

	console.log(`GET: \\chartsDefinitions; IP: ${ip};`);
	res.status(200).send(chartsDefinitions);
};

const GetByID = (req: Request, res: Response) => {
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	const chartsDefinitions = getDB('chartsDefinitions');
	const chartDefinitions = chartsDefinitions.find(({ id }: { id: string }) => id === req.params.id);

	console.log(`GET: \\chartsDefinitions; GET ID: ${req.params.id}; IP: ${ip};`);
	res.status(200).send(chartDefinitions);
};

const Post = (req: Request, res: Response) => {
	// const time = new Date(Date.now());
	// console.log(formatDate(time));
	const chartsDefinitions = getDB('chartsDefinitions');
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

	// Check if necessary fields are empty
	if (
		!req.body.toolName ||
		!req.body.chartName ||
		!req.body.yAxialTitle ||
		isNaN(req.body.maxSpec) ||
		isNaN(req.body.minSpec) ||
		isNaN(req.body.target)
	) {
		console.log(`POST: \\chartsDefinitions; Necessary fields are empty. IP: ${ip};`);
		return res.status(400).send({ msg: 'Data format incorrect' });
	}

	// Verify if a ToolName_ChartName already exists.
	const isExists = chartsDefinitions.some(
		({ toolName, chartName }: { toolName: string; chartName: string }) =>
			`${req.body.toolName}_${req.body.chartName}` === `${toolName}_${chartName}`
	);
	if (isExists) {
		console.log(`POST: \\chartsDefinitions; ${req.body.toolName}_${req.body.chartName} already exists. IP: ${ip};`);
		return res.status(400).send({ msg: `${req.body.toolName}_${req.body.chartName} already exits` });
	}

	let chartDefinitions = {
		id: Math.floor(Date.now() / 1000).toString(),
		toolName: req.body.toolName,
		chartName: req.body.chartName,
		yAxialTitle: req.body.yAxialTitle,
		maxSpec: req.body.maxSpec,
		minSpec: req.body.minSpec,
		target: req.body.target,
		max: 100,
		min: 0,
		ticksSteps: 10,
		isShowLegend: true,
		chartTitleSize: 25,
		yTitleSize: 15,
		xLabelSize: 12,
		xSubLabelSize: 12,
		yLabelSize: 12,
		chartTitleWeight: 700,
		yTitleWeight: 700,
		xLabelWeight: 100,
		xSubLabelWeight: 100,
		yLabelWeight: 100,
		lineWidth: 2,
		pointRadius: 2,
		lineRadian: 0.01,
		xSubLabelAngle: 0,
		isShowXSubLabel: true,
		breakLine: [],
		createTime: Date.now(),
	};

	console.log(`POST: \\chartsDefinitions; IP: ${ip};`);
	chartsDefinitions.push(chartDefinitions);
	writeDB('chartsDefinitions', { chartsDefinitions: chartsDefinitions });
	res.status(201).send(chartDefinitions);
};

const Put = (req: Request, res: Response) => {
	const chartsDefinitions = getDB('chartsDefinitions');
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
	// Verify id does not exists.
	const foundChartDefinitions = chartsDefinitions.find(({ id }: { id: string }) => id === req.params.id);
	if (!foundChartDefinitions) {
		console.log(`PUT: \\chartsDefinitions; ${req.params.id} does not exists. IP: ${ip};`);
		return res.status(400).send({ msg: `${req.params.id} does not exists.` });
	}

	Object.assign(foundChartDefinitions, req.body);
	foundChartDefinitions.updateTime = Date.now();
	writeDB('chartsDefinitions', { chartsDefinitions: chartsDefinitions });
	console.log(`UPDATE: \\chartsDefinitions; UPDATE ID: ${req.params.id}; IP: ${ip};`);
	res.status(201).send(foundChartDefinitions);
};

const Delete = (req: Request, res: Response) => {
	const chartsDefinitions = getDB('chartsDefinitions');
	const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

	// Verify id does not exists.
	const foundChartDefinitions = chartsDefinitions.findIndex(({ id }: { id: string }) => id === req.params.id);
	if (foundChartDefinitions === -1) {
		console.log(`DELETE: \\chartsDefinitions; ${req.params.id} does not exists. IP: ${ip};`);
		return res.status(400).send({ msg: `${req.params.id} does not exists.` });
	}

	chartsDefinitions.splice(foundChartDefinitions, 1);
	writeDB('chartsDefinitions', { chartsDefinitions: chartsDefinitions });
	console.log(`DELETE: \\chartsDefinitions; DELETE ID: ${req.params.id}; IP: ${ip};`);
	res.status(200).send({ msg: `Delete ${req.params.id} success` });
};

export { Get, GetByID, Post, Put, Delete };
