// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

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

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.