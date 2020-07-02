// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {VolatileMemoryClient, RelationalDatabaseClient, DocumentDatabaseClient, PrioritizedWorkerClient} from "./ConnectionHelper.js";
import {ValidationInfo} from "./ValidationHelper.js";
import {DataTableSchema} from "./SchemaHelper.js";

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
	prepareRow: (data: Input[], schema: DataTableSchema): HierarchicalDataRow => {
		/*for (let key in schema.keys) {
		  if (schema.keys.hasOwnProperty(key)) {
		    let input = data.filter(item => item.)
		  }
		}*/
	},
	prepareFilter: (data: Input[], schema: DataTableSchema): HierarchicalDataFilter[] => {
		return null;
	},
	insert: async (data: Input[], schema: DataTableSchema): Promise<HierarchicalDataRow[]> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataRow = DatabaseHelper.prepareRow(data, schema);
			
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
	update: async (data: Input[], schema: DataTableSchema): Promise<HierarchicalDataRow[]> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataRow = DatabaseHelper.prepareRow(data, schema);
			
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
	retrieve: async (data: Input[], schema: DataTableSchema): Promise<{[Identifier: string]: HierarchicalDataTable}> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataFilter[] = DatabaseHelper.prepareFilter(data, schema);
			
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
	delete: async (data: Input[], schema: DataTableSchema): Promise<HierarchicalDataRow[]> => {
		return new Promise((resolve) => {
			const input: HierarchicalDataRow = DatabaseHelper.prepareRow(data, schema);
			
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