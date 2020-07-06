// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {VolatileMemoryClient, RelationalDatabaseClient, RelationalDatabaseORMClient, DocumentDatabaseClient, PrioritizedWorkerClient} from "./ConnectionHelper.js";
import {ValidationInfo} from "./ValidationHelper.js";
import {FieldType, DataTableSchema} from "./SchemaHelper.js";

enum SourceType {
  Relational,
  PrioritizedWorker,
  Document,
  VolatileMemory
}
enum ActionType {
  Insert,
  Update,
  Delete,
  Retrieve,
  Popup,
  Navigate,
  Test
}
enum OperationType {
  Equal,
  LessThan,
  MoreThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  NotEqual,
  Include,
  Exclude
}
interface HierarchicalDataTable {
	source: SourceType;
	group: string;
  rows: HierarchicalDataRow[];
}
interface HierarchicalDataRow {
  keys: {[Identifier: string]: HierarchicalDataColumn};
  columns: {[Identifier: string]: HierarchicalDataColumn};
  relations: {[Identifier: string]: HierarchicalDataTable};
}
interface HierarchicalDataColumn {
	name: string;
  value: any;
}
interface HierarchicalDataFilter {
  name: string;
  operation: OperationType;
  value: any;
}

interface Input {
  target: SourceType;
  group: string;
  name: string;
  value: any;
  guid: string;
  validation: ValidationInfo;
}

const DatabaseHelper = {
	prepareRow: (data: Input[], action: string, schema: DataTableSchema): HierarchicalDataRow => {
	  const row: HierarchicalDataRow = {
	    keys: {},
	    columns: {},
	    relations: {}
	  };
	  if (data) {
	    for (const input of data) {
	      if (schema.source != input.source || schema.group != input.group)
	        throw new Error(`There was an error preparing data for manipulation ('${input.group}' doesn't match the schema group '${schema.group}').`);
	      if (!schema.keys[input.name] || !schema.columns[input.name])
	        throw new Error(`There was an error preparing data for manipulation ('${input.name}' column doesn't exist in the schema group '${schema.group}').`);
	      if (schema.keys[input.name]) {
	        row.keys[input.name] = {
	          name: input.name,
	          value: input.value
	        };
	      } else {
	        row.columns[input.name] = {
	          name: input.name,
	          value: input.value
	        };
	      }
	    }
	  }
		for (const key in schema.keys) {
		  if (schema.keys.hasOwnProperty(key)) {
		    switch (action) {
		      case "insert":
		        if (schema.keys[key].fieldType != FieldType.AutoNumber) {
		          if (!row.keys[key] || row.keys[key].value === undefined || row.keys[key].value === null) {
		            throw new Error(`There was an error preparing data for manipulation (required ${schema.group}.${key}).`);
		          } else {
		            switch (schema.keys[key].fieldType) {
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.keys[key].value.toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn't a number).`);
		                row.keys[key].value = parseFloat(row.keys[key].value.toString());
		                break;
		              case FieldType.Boolean:
		                row.keys[key].value = (row.keys[key].value.toString() === "true" || row.keys[key].value.toString() === "1");
		                break;
		              case FieldType.String:
		                row.keys[key].value = row.keys[key].value.toString();
		                break;
		            }
		          }
		        }
		        break;
		      case "update":
		      case "delete":
	          if (!row.keys[key] || row.keys[key].value === undefined || row.keys[key].value === null) {
	            throw new Error(`There was an error preparing data for manipulation (required ${schema.group}.${key}).`);
	          } else {
	            switch (schema.keys[key].fieldType) {
	              case FieldType.AutoNumber:
	              case FieldType.Number:
	                if (isNaN(parseFloat(row.keys[key].value.toString())))
	                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn't a number).`);
	                row.keys[key].value = parseFloat(row.keys[key].value.toString());
	                break;
	              case FieldType.Boolean:
	                row.keys[key].value = (row.keys[key].value.toString() === "true" || row.keys[key].value.toString() === "1");
	                break;
	              case FieldType.String:
	                row.keys[key].value = row.keys[key].value.toString();
	                break;
	            }
	          }
		        break;
		    }
		  }
		}
		for (const key in schema.columns) {
		  if (schema.columns.hasOwnProperty(key)) {
		    switch (action) {
		      case "insert":
		        if (schema.columns[key].fieldType != FieldType.AutoNumber) {
		          if (!row.columns[key] || row.columns[key].value === undefined || row.columns[key].value === null) {
		            throw new Error(`There was an error preparing data for manipulation (required ${schema.group}.${key}).`);
		          } else {
		            switch (schema.columns[key].fieldType) {
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.keys[key].value.toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn't a number).`);
		                row.keys[key].value = parseFloat(row.keys[key].value.toString());
		                break;
		              case FieldType.Boolean:
		                row.keys[key].value = (row.keys[key].value.toString() === "true" || row.keys[key].value.toString() === "1");
		                break;
		              case FieldType.String:
		                row.keys[key].value = row.keys[key].value.toString();
		                break;
		            }
		          }
		        }
		        break;
		      case "update":
		        if (schema.columns[key].required) {
		          if (!row.columns[key] || row.columns[key].value === undefined || row.columns[key].value === null) {
		            throw new Error(`There was an error preparing data for manipulation (required ${schema.group}.${key}).`);
		          } else {
		            switch (schema.columns[key].fieldType) {
		              case FieldType.AutoNumber:
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.keys[key].value.toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn't a number).`);
		                row.keys[key].value = parseFloat(row.keys[key].value.toString());
		                break;
		              case FieldType.Boolean:
		                row.keys[key].value = (row.keys[key].value.toString() === "true" || row.keys[key].value.toString() === "1");
		                break;
		              case FieldType.String:
		                row.keys[key].value = row.keys[key].value.toString();
		                break;
		            }
		          }
		        }
		        break;
		      case "delete":
		        break;
		    }
		  }
		}
		return row;
	},
	prepareFilter: (data: Input[], schema: DataTableSchema): {[Identifier: string]: HierarchicalDataFilter} => {
		return null;
	},
	insert: async (data: Input[], schema: DataTableSchema): Promise<HierarchicalDataRow[]> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataRow = DatabaseHelper.prepareRow(data, "insert", schema);
			
      switch (input.source) {
      	case SourceType.Relational:
      		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
					
					let map = RelationalDatabaseORMClient.tableMap(schema.group);
					const hash = {};
					for (const key in schema.columns) {
					  if (schema.columns.hasOwnProperty(key)) {
					    map = map.columnMap(key, key, {isAutoIncrement: schema.columns[key].fieldType == FieldType.AutoNumber});
					    if (schema.columns[key].fieldType !== FieldType.AutoNumber) {
					      hash[key] = input.columns[key] && input.columns[key].value || null;
					    }
					  }
					}
					for (const key in schema.keys) {
					  if (schema.keys.hasOwnProperty(key)) {
					    map = map.columnMap(key, key, {isAutoIncrement: schema.keys[key].fieldType == FieldType.AutoNumber});
					    if (schema.columns[key].fieldType !== FieldType.AutoNumber) {
					      hash[key] = input.keys[key] && input.keys[key].value || null;
					    }
					  }
					}
					
					map.insert(hash).then((results) => {
					  if (results.affectedRows == 0) throw new Error("There was an error executing INSERT command.");
					  const row = {
					    keys: {},
					    columns: {},
					    relations: {}
					  };
					  for (const key in schema.columns) {
  					  if (schema.columns.hasOwnProperty(key)) {
  					    row.columns[key] = {
  					      name: key,
  					      value: results[key]
  					    };
  					  }
  					}
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    row.keys[key] = {
  					      name: key,
  					      value: results[key]
  					    };
  					  }
  					}
  					resolve([row]);
					});
					
      		break;
      	case SourceType.PrioritizedWorker:
      		if (!VolatileMemoryClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      	case SourceType.Document:
      		if (!DocumentDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      	case SourceType.VolatileMemory:
      		if (!PrioritizedWorkerClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      }
    });
	},
	update: async (data: Input[], schema: DataTableSchema): Promise<HierarchicalDataRow[]> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataRow = DatabaseHelper.prepareRow(data, "update", schema);
			
      switch (input.source) {
      	case SourceType.Relational:
      		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		let map = RelationalDatabaseORMClient.tableMap(schema.group);
					const hash = {};
					for (const key in schema.columns) {
					  if (schema.columns.hasOwnProperty(key)) {
					    map = map.columnMap(key, key, {isAutoIncrement: schema.columns[key].fieldType == FieldType.AutoNumber});
					    hash[key] = input.columns[key] && input.columns[key].value || null;
					  }
					}
					for (const key in schema.keys) {
					  if (schema.keys.hasOwnProperty(key)) {
					    map = map.columnMap(key, key, {isAutoIncrement: schema.keys[key].fieldType == FieldType.AutoNumber});
					    hash[key] = input.keys[key] && input.keys[key].value || null;
					  }
					}
					
					map.update(hash).then((results) => {
					  if (results.affectedRows == 0) throw new Error("There was an error executing UPDATE command.");
					  const row = {
					    keys: {},
					    columns: {},
					    relations: {}
					  };
					  for (const key in schema.columns) {
  					  if (schema.columns.hasOwnProperty(key)) {
  					    row.columns[key] = {
  					      name: key,
  					      value: results[key]
  					    };
  					  }
  					}
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    row.keys[key] = {
  					      name: key,
  					      value: results[key]
  					    };
  					  }
  					}
  					resolve([row]);
					});
      		
      		break;
      	case SourceType.PrioritizedWorker:
      		if (!VolatileMemoryClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      	case SourceType.Document:
      		if (!DocumentDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      	case SourceType.VolatileMemory:
      		if (!PrioritizedWorkerClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      }
    });
	},
	retrieve: async (data: Input[], schema: DataTableSchema): Promise<{[Identifier: string]: HierarchicalDataTable}> => {
		return new Promise((resolve) => {
			const input: {[Identifier: string]: HierarchicalDataFilter} = DatabaseHelper.prepareFilter(data, schema);
			
      switch (input.source) {
      	case SourceType.Relational:
      		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		let map = RelationalDatabaseORMClient.tableMap(schema.group);
					const hash = {};
					for (const key in schema.columns) {
					  if (schema.columns.hasOwnProperty(key)) {
					    map = map.columnMap(key, key, {isAutoIncrement: schema.columns[key].fieldType == FieldType.AutoNumber});
					  }
					}
					for (const key in schema.keys) {
					  if (schema.keys.hasOwnProperty(key)) {
					    map = map.columnMap(key, key, {isAutoIncrement: schema.keys[key].fieldType == FieldType.AutoNumber});
					  }
					}
					
					map.select().then((results) => {
					  if (results.affectedRows == 0) throw new Error("There was an error executing SELECT command.");
					  const row = {
					    keys: {},
					    columns: {},
					    relations: {}
					  };
					  for (const key in schema.columns) {
  					  if (schema.columns.hasOwnProperty(key)) {
  					    row.columns[key] = {
  					      name: key,
  					      value: results[key]
  					    };
  					  }
  					}
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    row.keys[key] = {
  					      name: key,
  					      value: results[key]
  					    };
  					  }
  					}
  					resolve([row]);
					});
      		
      		break;
      	case SourceType.PrioritizedWorker:
      		if (!VolatileMemoryClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      	case SourceType.Document:
      		if (!DocumentDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      	case SourceType.VolatileMemory:
      		if (!PrioritizedWorkerClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      }
    });
	},
	delete: async (data: Input[], schema: DataTableSchema): Promise<HierarchicalDataRow[]> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataRow = DatabaseHelper.prepareRow(data, "delete", schema);
			
      switch (input.source) {
      	case SourceType.Relational:
      		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		let map = RelationalDatabaseORMClient.tableMap(schema.group);
					const hash = {};
					for (const key in schema.keys) {
					  if (schema.keys.hasOwnProperty(key)) {
					    map = map.columnMap(key, key, {isAutoIncrement: schema.keys[key].fieldType == FieldType.AutoNumber});
					    hash[key] = input.keys[key] && input.keys[key].value || null;
					  }
					}
					
					map.delete(hash).then((results) => {
					  if (results.affectedRows == 0) throw new Error("There was an error executing DELETE command.");
					  const row = {
					    keys: {},
					    columns: {},
					    relations: {}
					  };
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    row.keys[key] = {
  					      name: key,
  					      value: results[key]
  					    };
  					  }
  					}
  					resolve([row]);
					});
      		
      		break;
      	case SourceType.PrioritizedWorker:
      		if (!VolatileMemoryClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      	case SourceType.Document:
      		if (!DocumentDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      	case SourceType.VolatileMemory:
      		if (!PrioritizedWorkerClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
      		break;
      }
    });
	}
};

export {SourceType, ActionType, HierarchicalDataTable, HierarchicalDataRow, HierarchicalDataColumn, Input, DatabaseHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.