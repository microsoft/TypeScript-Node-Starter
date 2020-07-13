// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {VolatileMemoryClient, RelationalDatabaseClient, RelationalDatabaseORMClient, DocumentDatabaseClient, PrioritizedWorkerClient} from "./ConnectionHelper.js";
import {ValidationInfo} from "./ValidationHelper.js";
import {ProjectConfigurationHelper} from "./ProjectConfigurationHelper.js";
import {FieldType, DataTableSchema} from "./SchemaHelper.js";
import {DataTypes} from "sequelize";

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
	getSourceType: (value: string): SourceType => {
		switch (value) {
			case "relational":
				return SourceType.Relational;
			case "document":
				return SourceType.PrioritizedWorker;
			case "worker":
				return SourceType.Document;
			case "volatile-memory":
				return FieldType.VolatileMemory;
		  default:
		    throw new Error(`There was an error preparing data for manipulation (invalid type of available data source, '${value}').`);
		}
	},
  distinct: (data: Input[]): Input[] => {
    const results = [];
    const hash = {};
    for (const item of data) {
      if (!hash[`${item.target}:${item.group}:${item.name}`.toLowerCase()]) {
        hash[`${item.target}:${item.group}:${item.name}`.toLowerCase()] = true;
        results.push(item);
      }
    }
    return results;
  },
  satisfy: (data: Input[], action: ActionType, schema: DataTableSchema): boolean => {
    data = [...data];
    let inputs = data.filter(item => item.target == schema.source && item.group == schema.group);
    const requiredKeys = {};
    
    switch (action) {
      case ActionType.Insert:
        for (const key in schema.columns) {
          if (schema.columns.hasOwnProperty(key)) {
            if (schema.columns[key].fieldType != FieldType.AutoNumber && schema.columns[key].required) {
              requiredKeys[key] = schema.columns[key];
            }
          }
        }
        for (const key in schema.keys) {
          if (schema.keys.hasOwnProperty(key)) {
            if (schema.keys[key].fieldType != FieldType.AutoNumber) {
              requiredKeys[key] = schema.keys[key];
            }
          }
        }
        break;
      case ActionType.Update:
      case ActionType.Delete:
        for (const key in schema.keys) {
          if (schema.keys.hasOwnProperty(key)) {
            if (schema.keys[key].fieldType != FieldType.AutoNumber) {
              requiredKeys[key] = schema.keys[key];
            }
          }
        }
        break;
      case ActionType.Retrieve:
        return (inputs.length != 0);
      default:
        return false;
    }
    
    inputs = inputs.filter(input => !!requiredKeys[input.name]);
    
    if (inputs.length != Object.keys(requiredKeys).length) {
      return false;
    } else {
      data = data.filter(item => item.group != schema.group);
      
      if (data.length == 0) {
        return true;
      } else {
        for (const key in schema.relations) {
          if (schema.relations.hasOwnProperty(key)) {
            for (const input of data) {
              if (input.group == schema.relations[key].sourceGroup && input.name == schema.relations[key].sourceEntity) {
                data.push({
                  target: ProjectConfigurationHelper.getDataSchema().tables[schema.relations[key].targetGroup].source,
                  group: schema.relations[key].targetGroup,
                  name: schema.relations[key].targetEntity,
                  value: null,
                  guid: null,
                  validation: null
                });
              }
            }
          }
        }
        
        data = DatabaseHelper.distinct(data);
        
        for (const key in schema.relations) {
          if (schema.relations.hasOwnProperty(key)) {
            if (DatabaseHelper.satisfy(data, action, ProjectConfigurationHelper.getDataSchema().tables[schema.relations[key].targetGroup])) {
              return true;
            }
          }
        }
        
        return false;
      }
    }
  },
  getRows: (data: Input[], action: ActionType, schema: HierarchicalDataTable): HierarchicalDataRow[] => {
    const row: HierarchicalDataRow = {
	    keys: {},
	    columns: {},
	    relations: {}
	  };
	  
    for (const input of data) {
      if (schema.source != input.target || schema.group != input.group)
        throw new Error(`There was an error preparing data for manipulation ('${input.group}' doesn\'t match the schema group '${schema.group}').`);
      if (!schema.keys[input.name] && !schema.columns[input.name])
        throw new Error(`There was an error preparing data for manipulation ('${input.name}' column doesn\'t exist in the schema group '${schema.group}').`);
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
    
		for (const key in schema.keys) {
		  if (schema.keys.hasOwnProperty(key)) {
		    switch (action) {
		      case ActionType.Insert:
		        if (schema.keys[key].fieldType != FieldType.AutoNumber) {
		          if (!row.keys[key] || row.keys[key].value === undefined || row.keys[key].value === null) {
		            throw new Error(`There was an error preparing data for manipulation (required ${schema.group}.${key}).`);
		          } else {
		            switch (schema.keys[key].fieldType) {
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.keys[key].value.toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
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
		      case ActionType.Update:
		      case ActionType.Delete:
	          if (!row.keys[key] || row.keys[key].value === undefined || row.keys[key].value === null) {
	            throw new Error(`There was an error preparing data for manipulation (required ${schema.group}.${key}).`);
	          } else {
	            switch (schema.keys[key].fieldType) {
	              case FieldType.AutoNumber:
	              case FieldType.Number:
	                if (isNaN(parseFloat(row.keys[key].value.toString())))
	                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
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
		      case ActionType.Insert:
		        if (schema.columns[key].fieldType != FieldType.AutoNumber) {
		          if (!row.columns[key] || row.columns[key].value === undefined || row.columns[key].value === null) {
		            throw new Error(`There was an error preparing data for manipulation (required ${schema.group}.${key}).`);
		          } else {
		            switch (schema.columns[key].fieldType) {
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.columns[key].value.toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
		                row.columns[key].value = parseFloat(row.columns[key].value.toString());
		                break;
		              case FieldType.Boolean:
		                row.columns[key].value = (row.columns[key].value.toString() === "true" || row.columns[key].value.toString() === "1");
		                break;
		              case FieldType.String:
		                row.columns[key].value = row.columns[key].value.toString();
		                break;
		            }
		          }
		        }
		        break;
		      case ActionType.Update:
		        if (schema.columns[key].required) {
		          if (!row.columns[key] || row.columns[key].value === undefined || row.columns[key].value === null) {
		            /* void */
		          } else {
		            switch (schema.columns[key].fieldType) {
		              case FieldType.AutoNumber:
		              case FieldType.Number:
		                if (isNaN(parseFloat(row.columns[key].value.toString())))
		                  throw new Error(`There was an error preparing data for manipulation (the value of ${schema.group}.${key} isn\'t a number).`);
		                row.columns[key].value = parseFloat(row.columns[key].value.toString());
		                break;
		              case FieldType.Boolean:
		                row.columns[key].value = (row.columns[key].value.toString() === "true" || row.columns[key].value.toString() === "1");
		                break;
		              case FieldType.String:
		                row.columns[key].value = row.columns[key].value.toString();
		                break;
		            }
		          }
		        }
		        break;
		      case ActionType.Delete:
		        break;
		    }
		  }
		}
		
		return [row];
  },
	prepareData: (data: Input[], action: ActionType, baseSchema: DataTableSchema): HierarchicalDataTable[] => {
		data = DatabaseHelper.distinct(data);
	  
	  const results: HierarchicalDataTable[] = [];
	  let current: HierarchicalDataTable = null;
	  
	  while (data.length != 0) {
	    if (current == null) {
  	    if (baseSchema == null) {
    	    for (const key in ProjectConfigurationHelper.getDataSchema().tables) {
    	      if (DatabaseHelper.satisfy(data, action, ProjectConfigurationHelper.getDataSchema().tables[key])) {
    	        baseSchema = ProjectConfigurationHelper.getDataSchema().tables[key];
    	        break;
    	      }
    	    }
    	  }
    	  
    	  if (baseSchema == null) {
    	    throw new Error("There was an error preparing data for manipulation (a list of inputs can't satisfy the data schema).");
    	  }
    	  
  	    current = {
  	      source: baseSchema.source,
  	      group: baseSchema.group,
  	      rows: DatabaseHelper.getRows(data, action, baseSchema)
  	    };
  	    results.push([current, baseSchema]);
  	    
  	    data = data.filter(item => item.group != baseSchema.group);
  	  } else {
  	    let found = false;
  	    for (const key in baseSchema.relations) {
  	      if (DatabaseHelper.satisfy(data, action, ProjectConfigurationHelper.getDataSchema().tables[key])) {
  	        found = true;
  	        baseSchema = ProjectConfigurationHelper.getDataSchema().tables[key];
  	        break;
  	      }
  	    }
  	    
  	    if (!found) {
    	    throw new Error("There was an error preparing data for manipulation (a list of inputs can't satisfy any relation of the data schema).");
    	  }
    	  
    	  const next = {
  	      source: baseSchema.source,
  	      group: baseSchema.group,
  	      rows: DatabaseHelper.getRows(data, action, baseSchema)
  	    };
    	  
    	  current.rows[0].relations[baseSchema.group] = next;
    	  current = next;
    	  
  	    // TODO: Forward columns to foreign  table.
  	    // 
    	  data = data.filter(item => item.group != baseSchema.group);
  	  }
	  }
	  
	  return results;
	},
	ormMap: (schema: DataTableSchema): any => {
	  if (!RelationalDatabaseORMClient.models[schema.group]) {
	    const columns = {};
	    const options = {tableName: schema.group};
	    
			for (const key in schema.columns) {
			  if (schema.columns.hasOwnProperty(key)) {
			    let type;
			    let autoIncrement = false;
			    const unique = schema.columns[key].unique;
			    const primaryKey = true;
			    const allowNull = !schema.columns[key].required;
			    
			    switch (schema.columns[key].fieldType) {
			      case FieldType.AutoNumber:
              type = DataTypes.INTEGER;
              autoIncrement = true;
              break;
			      case FieldType.String:
              type = DataTypes.STRING;
              break;
            case FieldType.Number:
              type = DataTypes.INTEGER;
              break;
            case FieldType.Boolean:
              type = DataTypes.BOOLEAN;
              break;
            default:
              throw new Error("There was an error preparing data for manipulation (unsupported field type).");
			    }
			    
			    columns[key] = {
			      type: type,
			      autoIncrement: autoIncrement,
			      unique: unique,
			      primaryKey: primaryKey,
			      allowNull: allowNull
			    };
			  }
			}
			for (const key in schema.keys) {
			  if (schema.keys.hasOwnProperty(key)) {
			    let type;
			    let autoIncrement = false;
			    const unique = schema.keys[key].unique;
			    const primaryKey = false;
			    const allowNull = !schema.keys[key].required;
			    
			    switch (schema.keys[key].fieldType) {
			      case FieldType.AutoNumber:
              type = DataTypes.INTEGER;
              autoIncrement = true;
              break;
			      case FieldType.String:
              type = DataTypes.STRING;
              break;
            case FieldType.Number:
              type = DataTypes.INTEGER;
              break;
            case FieldType.Boolean:
              type = DataTypes.BOOLEAN;
              break;
            default:
              throw new Error("There was an error preparing data for manipulation (unsupported field type).");
			    }
			    
			    columns[key] = {
			      type: type,
			      autoIncrement: autoIncrement,
			      unique: unique,
			      primaryKey: primaryKey,
			      allowNull: allowNull
			    };
			  }
			}
	    
	    const User = RelationalDatabaseORMClient.define(schema.group, columns, options);
	  }
	  
	  return RelationalDatabaseORMClient.models[schema.group];
	},
	insert: async (data: Input[], baseSchema: DataTableSchema): Promise<HierarchicalDataRow[]> => {
		return new Promise(async (resolve, reject) => {
		  try {
  			const list = DatabaseHelper.prepareData(data, ActionType.Insert, baseSchema);
  			if (list.length > 1) throw new Error("There was an error preparing data for manipulation (related tables isn't supported for now)");
  		  
  			const input = list[0][0];
  			const schema = list[0][1];
  			
        switch (input.source) {
        	case SourceType.Relational:
        		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
  					
  					const map = DatabaseHelper.ormMap(schema);
  					const hash = {};
  					
  					for (const key in schema.columns) {
  					  if (schema.columns.hasOwnProperty(key)) {
  					    if (schema.columns[key].fieldType !== FieldType.AutoNumber) {
  					      hash[key] = input.rows[0].columns[key] && input.rows[0].columns[key].value;
  					    }
  					  }
  					}
  					
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    if (schema.keys[key].fieldType !== FieldType.AutoNumber) {
  					      hash[key] = input.rows[0].keys[key] && input.rows[0].keys[key].value;
  					    }
  					  }
  					}
  					
  					const record = await map.create(hash);
  				  
  				  const row = {
  				    keys: {},
  				    columns: {},
  				    relations: {}
  				  };
  				  
  				  for (const key in schema.columns) {
  					  if (schema.columns.hasOwnProperty(key)) {
  					    row.columns[key] = {
  					      name: key,
  					      value: record[key]
  					    };
  					  }
  					}
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    row.keys[key] = {
  					      name: key,
  					      value: record[key]
  					    };
  					  }
  					}
  					
  					resolve([row]);
  					
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
      } catch(error) {
        reject(error);
      }
    });
	},
	update: async (data: Input[], baseSchema: DataTableSchema): Promise<HierarchicalDataRow[]> => {
		return new Promise(async (resolve, reject) => {
		  try {
  			const list = DatabaseHelper.prepareData(data, ActionType.Update, baseSchema);
  			if (list.length > 1) throw new Error("There was an error preparing data for manipulation (related tables isn't supported for now)");
  		  
  			const input = list[0][0];
  			const schema = list[0][1];
  			
        switch (input.source) {
        	case SourceType.Relational:
        		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
        		
        		const map = DatabaseHelper.ormMap(schema);
  					const hash = {};
  					const data = {};
  					
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    hash[key] = input.rows[0].keys[key] && input.rows[0].keys[key].value;
  					  }
  					}
  					for (const key in schema.columns) {
  					  if (schema.columns.hasOwnProperty(key) && input.rows[0].columns[key]) {
  					    data[key] = input.rows[0].columns[key].value;
  					  }
  					}
  					
  					await map.update(data, {where: hash});
  					let record = await map.findOne({where: hash});
  				  
  				  const row = {
  				    keys: {},
  				    columns: {},
  				    relations: {}
  				  };
  				  
  				  for (const key in schema.columns) {
  					  if (schema.columns.hasOwnProperty(key)) {
  					    row.columns[key] = {
  					      name: key,
  					      value: record[key]
  					    };
  					  }
  					}
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    row.keys[key] = {
  					      name: key,
  					      value: record[key]
  					    };
  					  }
  					}
  					
  					resolve([row]);
        		
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
      } catch(error) {
        reject(error);
      }
    });
	},
	retrieve: async (data: Input[], baseSchema: DataTableSchema): Promise<{[Identifier: string]: HierarchicalDataTable}> => {
		return new Promise(async (resolve, reject) => {
		  try {
  			const list = DatabaseHelper.prepareData(data, ActionType.Retrieve, baseSchema);
  			if (list.length > 1) throw new Error("There was an error preparing data for manipulation (related tables isn't supported for now)");
  			
  			const input = list[0][0];
  			const schema = list[0][1];
  			
        switch (input.source) {
        	case SourceType.Relational:
        		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
        		
        		const map = DatabaseHelper.ormMap(schema);
        		const hash = {};
  					
  					for (const key in schema.columns) {
  					  if (schema.columns.hasOwnProperty(key) && input.rows[0].columns[key]) {
  					    if (schema.columns[key].fieldType !== FieldType.AutoNumber) {
  					      hash[key] = input.rows[0].columns[key] && input.rows[0].columns[key].value;
  					    }
  					  }
  					}
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key) && input.rows[0].keys[key]) {
  					    if (schema.keys[key].fieldType !== FieldType.AutoNumber) {
  					      hash[key] = input.rows[0].keys[key] && input.rows[0].keys[key].value;
  					    }
  					  }
  					}
  					
  					const rows = [];
  					const records = await map.findAll({where: hash}) || [];
  					
  					for (const record of records) {
  					  const row = {
    				    keys: {},
    				    columns: {},
    				    relations: {}
    				  };
  				  
  					  for (const key in schema.columns) {
    					  if (schema.columns.hasOwnProperty(key)) {
    					    row.columns[key] = {
    					      name: key,
    					      value: record[key]
    					    };
    					  }
    					}
    					for (const key in schema.keys) {
    					  if (schema.keys.hasOwnProperty(key)) {
    					    row.keys[key] = {
    					      name: key,
    					      value: record[key]
    					    };
    					  }
    					}
    					
    					rows.push(row);
  					}
  					
  					const results = {};
  					results[schema.group] = {
  					  source: schema.source,
  					  group: schema.group,
  					  rows: rows
  					};
  					
  					resolve(results);
        		
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
      } catch(error) {
        reject(error);
      }
    });
	},
	delete: async (data: Input[], baseSchema: DataTableSchema): Promise<HierarchicalDataRow[]> => {
		return new Promise(async (resolve, reject) => {
		  try {
  			const list = DatabaseHelper.prepareData(data, ActionType.Delete, baseSchema);
  			if (list.length > 1) throw new Error("There was an error preparing data for manipulation (related tables isn't supported for now)");
  		  
  			const input = list[0][0];
  			const schema = list[0][1];
  			
        switch (input.source) {
        	case SourceType.Relational:
        		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
        		
        		const map = DatabaseHelper.ormMap(schema);
  					const hash = {};
  					
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    hash[key] = input.rows[0].keys[key] && input.rows[0].keys[key].value;
  					  }
  					}
  					
  					const record = await map.findOne({where: hash});
  					await record.destroy({force: true});
  				  
  				  const row = {
  				    keys: {},
  				    columns: {},
  				    relations: {}
  				  };
  				  
  				  for (const key in schema.columns) {
  					  if (schema.columns.hasOwnProperty(key)) {
  					    row.columns[key] = {
  					      name: key,
  					      value: record[key]
  					    };
  					  }
  					}
  				  
  					for (const key in schema.keys) {
  					  if (schema.keys.hasOwnProperty(key)) {
  					    row.keys[key] = {
  					      name: key,
  					      value: record[key]
  					    };
  					  }
  					}
  					
  					resolve([row]);
        		
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
      } catch(error) {
        reject(error);
      }
    });
	}
};

export {SourceType, ActionType, HierarchicalDataTable, HierarchicalDataRow, HierarchicalDataColumn, Input, DatabaseHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.