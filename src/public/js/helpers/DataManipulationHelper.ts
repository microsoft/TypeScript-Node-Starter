// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {RequestHelper} from './RequestHelper.js';
import {HTMLHelper} from './HTMLHelper.js';

enum SourceType {
  Relational,
  PrioritizedWorker,
  Document,
  VolatileMemory
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

const fieldManipulatorsInfoDict: any = {};

const DataManipulationHelper = {
	register: (guid: string, fields: string[]) => {
		if (!fieldManipulatorsInfoDict[guid]) {
			fieldManipulatorsInfoDict[guid] = fields;
		}
	},
  request: (guid: string, action: string, callback: any) => {
  	if (fieldManipulatorsInfoDict[guid]) {
  		const params = {};
  		const fields = fieldManipulatorsInfoDict[guid];
  		
	  	for (const field of fields) {
	  		let element = HTMLHelper.getElementByAttributeNameAndValue('internal-fsb-guid', field) as any;
	  		
	  		if (element.tagName != 'INPUT') {
	  			element = element.firstChild;
	  			while (element && ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(element.tagName) == -1) {
	  				element = element.nextSibling;
	  			}
	  		}
	  		
	  		if (element) {
	  			params[field] = element.value;
	  		}
	  	}
	  	
	  	params['action'] = action;
	  	
	  	RequestHelper.post(`${location.protocol}//${location.host}${location.pathname}`, params)
	  		.then((json) => {
	  			if (json.success) {
	  				if (json.redirect) {
	  				  window.location = json.redirect;
	  				} else {
	  				  if (callback) {
  	  				  callback(action, json.results);
  	  				} else {
  	  				  alert(`There was an error rendering the data on client side (needed component).`);
  	  				}
	  				}
	  			} else {
	  				alert(json.error);
	  			}
	  		})
	  		.catch((status) => {
	  			alert(`There was an error connecting to the server (${status}). Please check your internet connection.`);
	  		})
	  		.finally(() => {
	  			
	  		});
  	}
  },
  getDataFromKey: (key: string, current: HierarchicalDataRow, searchForFinalResults: boolean=false): any => {
		if (!searchForFinalResults) {
			// Search HierarchicalDataTable
			// 
			let tables = (current.relations || []).filter(table => (table.group == key));
			if (tables.length > 0 && tables[0].rows && tables[0].rows.length > 0) {
				return tables[0].rows[0];
			} else {
				return null;
			}
		} else {
			// Search HierarchicalDataColumn
			// 
			let columns = (current.columns || []).filter(column => (column.name == key));
			if (columns.length > 0) {
				return columns[0].value;
			} else {
				let tables = (current.relations || []).filter(table => (table.group == key));
				if (tables.length > 0 && tables[0].rows && tables[0].rows.length > 0) {
					return tables[0].rows[0].relations;
				} else {
					return null;
				}
			}
		}
  },
  getDataFromNotation: (notation: string, data: HierarchicalDataTable[]): any => {
    if (!notation) {
      console.log('There was an error processing hierarchical data on client side (missing notation).');
      return [];
    }
    
    let splited = notation.split('.');
    let current = {
			columns: null,
			relations: data
		};
		
		let shifted = splited.shift();
		while (current && shifted) {
			current = DataManipulationHelper.getDataFromKey(shifted, current, splited.length == 0);
			shifted = splited.shift();
		}
		
		return current;
  }
};

export {HierarchicalDataTable, HierarchicalDataRow, HierarchicalDataColumn, DataManipulationHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.