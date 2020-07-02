// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import fs from "fs";
import path from "path";
import {DataSchema} from "./SchemaHelper.js";

const file = fs.readFileSync(path.resolve(__dirname, "../../../project.stackblend"), "utf8");
const data = JSON.parse(file);

const ProjectConfigurationHelper = {
	getDataSchema: (): DataSchema => {
	  return {
	    tables: data.flows.schema || {}
	  };
	},
	getDotNotationPossibilities: (page: string): any => {
	  return data.sites[page].notations;
	}
};

export {ProjectConfigurationHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.