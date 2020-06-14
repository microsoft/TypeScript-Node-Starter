import {Response} from "express";

const RenderHelper = {
	json: (response: Response, data: any) => {
	  response.json({
			success: true,
			error: null,
			results: data
		});
	},
	navigate: (response: Response, data: string) => {
		response.redirect(data);
	},
	error: (response: Response, error: Error) => {
	  response.json({
			success: false,
			error: error.message,
			results: null
		});
	}
};

export {RenderHelper};