// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import fs from "fs";
import path from "path";
import {Request, Response} from "express";

/**
 * POST /endpoint/update/content
 * Update the content of specific file in the repository.
 */
export const updateContent = (request: Request, response: Response) => {
		
		try {
			const json: any = request.body;
			if (json == null) {
				throw new Error("There was an error trying to obtain requesting parameters (missing).");
			}
			
			const dirname = __dirname.replace("/dist/", "/src/");
			const rootPath = path.resolve(dirname, "../../");
			const fullPath = path.resolve(dirname, json.path);
			if (fullPath.indexOf(rootPath) == -1) {
				throw new Error(`The specified path isn't under ${rootPath}.`);
			}
			
			fs.writeFileSync(fullPath, json.content, {encoding: "utf8", flag: "w"});
			
			response.json({
				success: true,
				error: null,
				results: true
			});
		} catch(error) {
			response.json({
				success: false,
				error: error.message,
				results: null
			});
		}

};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.