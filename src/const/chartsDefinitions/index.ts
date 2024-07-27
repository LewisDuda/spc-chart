import { GenerateValidContent, NormalRequiredFieldRule } from '@/utils';
import { ADD_CONTENT_INTERFACE, DELETE_CONTENT_INTERFACE, EDIT_CONTENT_INTERFACE } from '@/models/chartsDefinitions';

const ADD_CONTENT: ADD_CONTENT_INTERFACE = {
	toolName: '',
	chartName: '',
	yAxialTitle: '',
	maxSpec: '',
	minSpec: '',
	target: '',
};

const ADD_CONTENT_VALID_STATUS = GenerateValidContent(ADD_CONTENT);

const ADD_CONTENT_VALID_RULES = [
	{
		fieldName: 'toolName',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Tool Name is required';
			}
			return '';
		},
	},
	{
		fieldName: 'chartName',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Chart Name is required';
			}
			return '';
		},
	},
	{
		fieldName: 'yAxialTitle',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Y Axial Title is required';
			}
			return '';
		},
	},
	{
		fieldName: 'maxSpec',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Max Spec is required';
			}
			return '';
		},
	},
	{
		fieldName: 'minSpec',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Min Spec is required';
			}
			return '';
		},
	},
	{
		fieldName: 'target',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Target is required';
			}
			return '';
		},
	},
];

const EDIT_CONTENT: EDIT_CONTENT_INTERFACE = {
	id: '',
	toolName: '',
	chartName: '',
	yAxialTitle: '',
	maxSpec: '',
	minSpec: '',
	target: '',
};

const EDIT_CONTENT_VALID_STATUS = GenerateValidContent(EDIT_CONTENT);

const EDIT_CONTENT_VALID_RULES = [
	{
		fieldName: 'toolName',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Tool Name is required';
			}
			return '';
		},
	},
	{
		fieldName: 'chartName',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Chart Name is required';
			}
			return '';
		},
	},
	{
		fieldName: 'yAxialTitle',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Y Axial Title is required';
			}
			return '';
		},
	},
	{
		fieldName: 'maxSpec',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Max Spec is required';
			}
			return '';
		},
	},
	{
		fieldName: 'minSpec',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Min Spec is required';
			}
			return '';
		},
	},
	{
		fieldName: 'target',
		ruleFunc: <T>(fieldValue: T) => {
			if (!NormalRequiredFieldRule(fieldValue)) {
				return 'Target is required';
			}
			return '';
		},
	},
];

const DELETE_CONTENT: DELETE_CONTENT_INTERFACE = {
	id: '',
	toolName: '',
	chartName: '',
};

export {
	ADD_CONTENT,
	ADD_CONTENT_VALID_STATUS,
	ADD_CONTENT_VALID_RULES,
	EDIT_CONTENT,
	EDIT_CONTENT_VALID_STATUS,
	EDIT_CONTENT_VALID_RULES,
	DELETE_CONTENT,
};
