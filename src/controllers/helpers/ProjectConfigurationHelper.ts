// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import fs from "fs";
import {DataSchema} from "./SchemaHelper.js";

const file = fs.readFileSync("../../../project.stackblend", "utf8");
const data = JSON.parse(file);

const ProjectConfigurationHelper = {
	getDataSchema: (): DataSchema => {
	  return {
	    tables: data.globalSettings.dataSchema || {}
	  };
	},
	getDotNotationPossibilities: (page: string): any => {
	  return data.sites[page].notations;
	}
};

export {ProjectConfigurationHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.