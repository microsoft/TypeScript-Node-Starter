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
				throw new Error("There was an error trying to obtain requesting parameters (JSON object is null).");
			}
			
			const dirname = __dirname.replace("/dist/", "/src/");
			const rootPath = path.resolve(dirname, "../../");
			
			for (let file of json.files) {
  			const fullPath = path.resolve(dirname, file.path);
  			if (fullPath.indexOf(rootPath) == -1) {
  				throw new Error(`The specified path isn't under ${rootPath}.`);
  			}
  	  }
			
			response.json({
				success: true,
				error: null,
				results: true
			});
			
			for (let file of json.files) {
  			const fullPath = path.resolve(dirname, file.path);
  			
  			fs.writeFileSync(fullPath, file.content, {encoding: "utf8", flag: "w"});
  	  }
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