export interface MenuRoute {
	path: string;
	title?: string;
	name?: string;
	icon?:
	| string
	| {
		render: () => void;
	};
	redirect?: string;
	children: MenuRoute[];
	meta: any;
}
