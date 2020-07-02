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
	getSchemaFromKey: (key: string, current: DataTableSchema, data: DataSchema, searchForFinalResults: boolean=false): DataTableSchema | DataColumnSchema => {
		if (!searchForFinalResults) {
			// Search DataTableSchema
			// 
			const table = (current && current.relations || data.tables || {})[key];
			if (table) {
				return table;
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
  findAllPossibleNotations: (tree: any, accumulatedNotation: string=null, notations: string[]=[]): string[] => {
    for (let key in tree) {
      if (tree.hasOwnProperty(key)) {
        let currentNotation = null;
        if (accumulatedNotation == null) {
          currentNotation = key.split('[')[0];
        } else {
          currentNotation = accumulatedNotation + '.' + key.split('[')[0];
        }
        if (Object.keys(tree[key]) == 0) {
          notations.push(currentNotation);
        } else {
          SchemaHelper.findAllPossibleNotations(tree[key], currentNotation, notations);
        }
      }
    }
    
    return notations;
  },
	verifyNotations: (tree: any, data: DataSchema) => {
	  let notations = SchemaHelper.findAllPossibleNotations(tree || {});
	  for (const notation of notations) {
	    const splited = notation.split(".");
  		let shifted: string = splited.shift();
  		let current: DataTableSchema | DataColumnSchema = null;
  		
  		do {
  		  current = SchemaHelper.getSchemaFromKey(shifted, current, data, splited.length == 0);
  		  shifted = splited.shift();
  		} while (current && shifted);
  		
  		if (current == null) throw new Error(`There was an error verifying dot notation (disconnected: ${notation}).`);
	  }
	},
	getDataTableSchemaFromNotation: (notation: string, data: DataSchema): DataTableSchema => {
	  if (!notation) return null;
	  
    const splited = notation.split(".");
		let shifted: string = splited.shift();
		let current: DataTableSchema | DataColumnSchema = null;
		
		while (current && shifted) {
			current = SchemaHelper.getSchemaFromKey(shifted, current, data, splited.length == 0);
			shifted = splited.shift();
		}
		
		if (current == null) throw new Error("There was an error retreiving data schema (invalid of dot notation).");
		if ('fieldType' in current) throw new Error("There was an error retreiving data schema (dot notation gave a column instead of a table).");
		
		return current;
	}
};

export {DataSchema, DataTableSchema, DataColumnSchema, DataRelationSchema, SchemaHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.