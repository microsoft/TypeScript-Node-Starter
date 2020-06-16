// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {VolatileMemoryClient, RelationalDatabaseClient, DocumentDatabaseClient, PrioritizedWorkerClient} from "./ConnectionHelper.js";
import {ValidationInfo} from "./ValidationHelper.js";

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
  Navigate
}
interface HierarchicalDataTable {
	source: SourceType;
	group: string;
  rows: HierarchicalDataRow[];
}
interface HierarchicalDataRow {
  columns: HierarchicalDataColumn[];
  relations: HierarchicalDataTable[];
}
interface HierarchicalDataColumn {
	name: string;
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
	prepare: (data: Input[]): HierarchicalDataTable => {
		const tables: HierarchicalDataTable[] = [];
		for (const item of data) {
			let table = tables.filter(table => table.group == item.group)[0];
			if (!table) tables.push({source: item.target, group: item.group, rows: []});
			table = tables[0];
			
			if (table.rows.length == 0) table.rows.push({columns: [], relations: []});
			const row = table.rows[0];
			
			let column = row.columns.filter(column => column.name == item.name)[0];
			if (!column) row.columns.push({name: null, value: null});
			column = row.columns[0];
			
			column.name = item.name;
			column.value = item.value;
		}
		
		// [TODO]: Implement Relation
		//
		
		if (tables.length != 1) throw new Error("There are some dot notations that unsatisfy existing relations confined in data flow (unrelated).");
		
		return tables[0];
	},
	convertDictionaryToHierarchicalDataColumns: (dictionary: any): HierarchicalDataColumn[] => {
		const columns: HierarchicalDataColumn[] = [];
		for (const key in dictionary) {
    	if (dictionary.hasOwnProperty(key)) {
    		columns.push({
    			name: key,
    			value: dictionary[key]
    		});
    	}
   	}
   	return columns;
	},
	convertHierarchicalDataColumnsToDictionary: (columns: HierarchicalDataColumn[]): any => {
		const dictionary = {};
		for (const column of columns) {
			dictionary[column.name] = column.value;
		}
		return dictionary;
	},
	insert: async (data: Input[]): Promise<HierarchicalDataRow> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataTable = DatabaseHelper.prepare(data);
			
      switch (input.source) {
      	case SourceType.Relational:
      		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		/*let dictionary = this.convertHierarchicalDataColumnsToDictionary(input.rows[0].columns);
      		
      		relationalDatabaseClient.query(`INSERT INTO ${input.group} SET ?`, dictionary, (error, response) => {
					  if (response) {
					  	let output = {
					  		group: input.group,
					  		rows: [
					  			columns: this.convertDictionaryToHierarchicalDataColumns(response),
					  			relations: []
					  		]	
					  	}
					  }
					});*/
					
					throw new Error("NotImplementedError");
					
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
	update: async (data: Input[]): Promise<HierarchicalDataRow> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataTable = DatabaseHelper.prepare(data);
			
      switch (input.source) {
      	case SourceType.Relational:
      		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
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
	retrieve: async (data: Input[]): Promise<HierarchicalDataTable> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataTable = DatabaseHelper.prepare(data);
			
      switch (input.source) {
      	case SourceType.Relational:
      		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
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
	delete: async (data: Input[]): Promise<boolean> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataTable = DatabaseHelper.prepare(data);
			
      switch (input.source) {
      	case SourceType.Relational:
      		if (!RelationalDatabaseClient) throw new Error("There was an error trying to obtain a connection (not found).");
      		
      		throw new Error("NotImplementedError");
      		
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