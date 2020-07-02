// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {RequestHelper} from './RequestHelper.js';
import {HTMLHelper} from './HTMLHelper.js';

declare let window: any;

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
  keys: {[Identifier: string]: HierarchicalDataColumn};
  columns: {[Identifier: string]: HierarchicalDataColumn};
  relations: {[Identifier: string]: HierarchicalDataTable};
}
interface HierarchicalDataColumn {
	name: string;
  value: any;
}

const fieldManipulatorsInfoDict: any = {};
const isDevelopmentMachine = ['localhost:3000', 'develop.stackblend.com', 'staging.stackblend.com', 'www.stackblend.com'].indexOf(location.host) != -1;
const registeredEndpoint: string = (isDevelopmentMachine) ? window.ENDPOINT || null : null;
const currentPath: string = (isDevelopmentMachine) ? window.PATH || null : null;

const DataManipulationHelper = {
	register: (guid: string, fields: string[]) => {
		if (!fieldManipulatorsInfoDict[guid]) {
			fieldManipulatorsInfoDict[guid] = fields;
		}
	},
  request: (guid: string, action: string, notation: string, options: any, callback: any) => {
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
	  	
	  	RequestHelper.post((registeredEndpoint || `${location.protocol}//${location.host}`) + (currentPath || `${location.pathname}`), params)
	  		.then((json) => {
	  			if (json.success) {
	  				if (json.redirect) {
	  				  window.location = json.redirect;
	  				} else {
	  				  if (callback) {
  	  				  callback(action, notation, json.results, options);
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
  getDataFromKey: (key: string, current: HierarchicalDataRow, searchForFinalResults: boolean=false, index: number=0): any => {
		if (!searchForFinalResults) {
			// Search HierarchicalDataTable
			// 
			let table = (current.relations || {})[key];
			if (table) {
				return table.rows[index];
			} else {
				return null;
			}
		} else {
			// Search HierarchicalDataColumn
			// 
			let column = (current.keys || {})[key] || (current.columns || {})[key];
			if (column) {
				return column.value;
			} else {
				let table = (current.relations || {})[key];
				if (table) {
					return table.rows;
				} else {
					return null;
				}
			}
		}
  },
  getDataFromNotation: (notation: string, data: {[Identifier: string]: HierarchicalDataTable}): any => {
    if (!notation) {
      console.log('There was an error processing hierarchical data on client side (missing notation).');
      return [];
    }
    
    let splited = notation.split('.');
    let current = {
			keys: null,
			columns: null,
			relations: data
		};
		
		let shifted = splited.shift();
		while (current && shifted) {
		  let tokens = shifted.split('[');
		  if (tokens.length == 1) {
			  current = DataManipulationHelper.getDataFromKey(tokens[0], current, splited.length == 0);
			} else if (tokens.length == 2) {
			  current = DataManipulationHelper.getDataFromKey(tokens[0], current, false, parseInt(tokens[1].split(']')[0]));
			} else {
			  current = null;
			}
			shifted = splited.shift();
		}
		
		return current || [];
  }
};

export {HierarchicalDataTable, HierarchicalDataRow, HierarchicalDataColumn, DataManipulationHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.