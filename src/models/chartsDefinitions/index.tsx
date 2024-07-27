export interface ADD_CONTENT_INTERFACE {
	toolName: string;
	chartName: string;
	yAxialTitle: string;
	maxSpec: number | string;
	minSpec: number | string;
	target: number | string;
}

export interface EDIT_CONTENT_INTERFACE {
	id: string;
	toolName: string;
	chartName: string;
	yAxialTitle: string;
	maxSpec: number | string;
	minSpec: number | string;
	target: number | string;
}

export interface DELETE_CONTENT_INTERFACE {
	id: string;
	toolName: string;
	chartName: string;
}
