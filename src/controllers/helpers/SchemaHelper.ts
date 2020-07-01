// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {SourceType} from "./DatabaseHelper.js";
import {ProjectConfigurationHelper} from "./ProjectConfigurationHelper.js";

enum FieldType {
  AutoNumber,
  String,
  Number,
  Boolean
}

interface DataSchema {
  tables: {[Identifier: string]: DataTableSchema};
}
interface DataTableSchema {
	source: SourceType;
	group: string;
	guid: string;
  keys: {[Identifier: string]: DataColumnSchema};
  columns: {[Identifier: string]: DataColumnSchema};
  relations: {[Identifier: string]: DataRelationSchema};
}
interface DataColumnSchema {
	name: string;
	guid: string;
	fieldType: FieldType;
	required: boolean;
	unique: boolean;
}
interface DataRelationSchema {
  name: string;
	guid: string;
  sourceGroup: string;
  sourceEntity: string;
  targetGroup: string;
  targetEntity: string;
}

const SchemaHelper = {
	getFieldType: (value: string): FieldType => {
		switch (value) {
			case "auto":
				return FieldType.AutoNumber;
			case "number":
				return FieldType.Number;
			case "boolean":
				return FieldType.Boolean;
			default:
				return FieldType.String;
		}
	},
	verifyDataSchema: (data: DataSchema=ProjectConfigurationHelper.getDataSchema()) => {
	  for (const tableKey in data.tables) {
	    if (data.tables.hasOwnProperty(tableKey)) {
  	    const table = data.tables[tableKey];
  	    if (table.group === undefined || table.group === null || table.group.trim() === "")
  	      throw new Error("There was an error verifying data schema (missing a group name).");
  	    if (Object.keys(table.keys).length == 0)
  	      throw new Error("There was an error verifying data schema (missing a primary key).");
  	    
  	    for (const primaryKey in table.keys) {
	        if (table.keys.hasOwnProperty(primaryKey)) {
	          const column = table.keys[primaryKey];
	          if (column.name === undefined || column.name === null || column.name.trim() === "")
  	          throw new Error("There was an error verifying data schema (missing a column name).");
	        }
	      }
  	    for (const columnKey in table.columns) {
	        if (table.columns.hasOwnProperty(columnKey)) {
	          const column = table.columns[columnKey];
	          if (column.name === undefined || column.name === null || column.name.trim() === "")
  	          throw new Error("There was an error verifying data schema (missing a column name).");
	        }
	      }
  	    
        for (const relationTableKey in table.relations) {
          if (table.relations.hasOwnProperty(relationTableKey)) {
            const relation = table.relations[relationTableKey];
            
            if (relation.sourceGroup === undefined || relation.sourceGroup === null || relation.sourceGroup.trim() === "")
        	    throw new Error("There was an error verifying data schema (missing a source group name).");
            if (relation.sourceEntity === undefined || relation.sourceEntity === null || relation.sourceEntity.trim() === "")
        	    throw new Error("There was an error verifying data schema (missing a source entity name).");
            if (relation.targetGroup === undefined || relation.targetGroup === null || relation.targetGroup.trim() === "")
        	    throw new Error("There was an error verifying data schema (missing a target group name).");
            if (relation.targetEntity === undefined || relation.targetEntity === null || relation.targetEntity.trim() === "")
        	    throw new Error("There was an error verifying data schema (missing a target entity name).");
        	  
        	  if (!data.tables[relation.sourceGroup])
        	    throw new Error("There was an error verifying data schema (source group unavailable).");
        	  if (!data.tables[relation.sourceGroup].keys[relation.sourceEntity] && !data.tables[relation.sourceGroup].columns[relation.sourceEntity])
        	    throw new Error("There was an error verifying data schema (source entity unavailable).");
        	  if (!data.tables[relation.targetGroup])
        	    throw new Error("There was an error verifying data schema (target group unavailable).");
        	  if (!data.tables[relation.targetGroup].keys[relation.targetEntity] && !data.tables[relation.targetGroup].columns[relation.targetEntity])
        	    throw new Error("There was an error verifying data schema (target entity unavailable).");
          }
        }
  	  }
	  }
	},
	getSchemaFromKey: (key: string, current: any, data: DataSchema, searchForFinalResults: boolean=false): any => {
		if (!searchForFinalResults) {
			// Search DataTableSchema
			// 
			const table = (current || data.tables || {})[key];
			if (table) {
				return table.relations.map((relation) => {
				  return data.tables[relation.targetGroup];
				});
			} else {
				return null;
			}
		} else {
			// Search DataColumnSchema
			// 
			const column = (current.keys || {})[key] || (current.columns || {})[key];
			if (column) {
				return column;
			} else {
				return null;
			}
		}
  },
	verifyNotations: (notations: string[], data: DataSchema) => {
	  for (const notation of notations) {
	    const splited = notation.split(".");
  		let shifted = splited.shift();
  		let current = null;
  		
  		while (current && shifted) {
  			current = SchemaHelper.getSchemaFromKey(shifted, current, data, splited.length == 0);
  			shifted = splited.shift();
  		}
  		
  		if (current == null) throw new Error("There was an error verifying dot notation (a disconnected of dot notation).");
	  }
	}
};

export {DataSchema, DataTableSchema, DataColumnSchema, DataRelationSchema, SchemaHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.