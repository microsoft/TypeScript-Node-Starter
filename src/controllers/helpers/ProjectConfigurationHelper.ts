// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import fs from "fs";
import path from "path";
import {DataSchema, SchemaHelper} from "./SchemaHelper.js";
import {DatabaseHelper} from "./DatabaseHelper.js";

const file = fs.readFileSync(path.resolve(__dirname, "../../../project.stackblend"), "utf8");
const data = JSON.parse(file);

let cachedSchema = null;

const ProjectConfigurationHelper = {
  convertToSchema: (tables: any) => {
    for (const tableKey in tables) {
      if (tables.hasOwnProperty(tableKey)) {
        tables[tableKey].source = DatabaseHelper.getSourceType(tables[tableKey].source);
      }
      
      for (const columnKey in tables[tableKey].keys) {
        if (tables[tableKey].keys.hasOwnProperty(columnKey)) {
          tables[tableKey].keys[columnKey].fieldType = SchemaHelper.getFieldType(tables[tableKey].keys[columnKey].fieldType);
        }
      }
      
      for (const columnKey in tables[tableKey].columns) {
        if (tables[tableKey].columns.hasOwnProperty(columnKey)) {
          tables[tableKey].columns[columnKey].fieldType = SchemaHelper.getFieldType(tables[tableKey].columns[columnKey].fieldType);
        }
      }
    }
    
    return tables;
  },
	getDataSchema: (): DataSchema => {
	  if (!cachedSchema) cachedSchema = ProjectConfigurationHelper.convertToSchema(data.flows.schema || {});
	  
	  return {
	    tables: cachedSchema
	  };
	},
	getDotNotationPossibilities: (page: string): any => {
	  return data.sites[page].notations;
	}
};

export {ProjectConfigurationHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.