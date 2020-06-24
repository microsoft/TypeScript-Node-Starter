// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.

// Auto[Import]--->
import {Request, Response} from "express";
import {SourceType, ActionType, HierarchicalDataTable, HierarchicalDataRow, HierarchicalDataColumn, Input, DatabaseHelper} from '../helpers/DatabaseHelper.js';
import {ValidationInfo, ValidationHelper} from '../helpers/ValidationHelper.js';
import {RequestHelper} from '../helpers/RequestHelper.js';
import {RenderHelper} from '../helpers/RenderHelper.js';
import {Base} from './Base.js';

// <---Auto[Import]

// Import additional modules here:
//
import {RelationalDatabaseClient} from '../helpers/ConnectionHelper.js'

// Auto[Declare]--->
/*enum SourceType {
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
enum ValidationInfo {
  name: string;
  required: boolean;
  customMessage: string;
}*/
// <---Auto[Declare]

// Declare private static variables here:
//

// Auto[Interface]--->
/*interface HierarchicalDataTable {
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
}*/
// <---Auto[Interface]

// Declare or extend interfaces here:
//

// Auto[ClassBegin]--->
class Controller extends Base {
  constructor(request: Request, response: Response, template: string) {
  	super(request, response, template);
  	
  	try {
	    let [action, data] = this.initialize(request);
	    this.perform(action, data);
   	} catch(error) {
	  	RenderHelper.error(this.response, error);
	  }
  }
  // <---Auto[ClassBegin]
  
  // Declare class variables and functions here:
  //
  protected validate(data: Input[]): void {
  	// The message of thrown error will be the validation message.
  	//
 		ValidationHelper.validate(data);
  }
  
  protected async get(data: Input[]): Promise<HierarchicalDataTable[]> {
 		return super.get(data);
  }
  
  protected async post(data: Input[]): Promise<HierarchicalDataTable[]> {
 		return super.post(data);
  }
  
  protected async put(data: Input[]): Promise<HierarchicalDataTable[]> {
 		return super.put(data);
  }
  
  protected async delete(data: Input[]): Promise<HierarchicalDataTable[]> {
 		return super.delete(data);
  }
  
  protected async insert(data: Input[]): Promise<HierarchicalDataRow> {
 		return await DatabaseHelper.insert(data);
  }
  
  protected async update(data: Input[]): Promise<HierarchicalDataRow> {
    let key: string;
    let value: string;
 		for (let input of data) {
 		  switch (input.name) {
 		    case 'key':
 		      key = input.value;
 		      break;
 		    case 'value':
 		      value = input.value;
 		      break;
 		  }
 		}
 		
 		RelationalDatabaseClient.query('INSERT INTO Settings (key, value) VALUES ?', [[[key, value]]], (function(error, results, fields) {
 		  return new Promise((resolve, reject) => {
 		    if (error) {
 		      reject(error);
   		  } else {
   		    resolve({
   		      key: key,
   		      value: value
   		    });
   		  }
 		  });
 		}));
  }
  
  protected async remove(data: Input[]): Promise<boolean> {
 		return await DatabaseHelper.delete(data);
  }
  
  protected async retrieve(data: Input[]): Promise<HierarchicalDataTable> {
 		return await DatabaseHelper.retrieve(data);
  }
  
  protected async navigate(data: Input[]): Promise<string> {
 		return '/';
  }
 	
  // Auto[MergingBegin]--->  
  private initialize(request: Request): [ActionType, Input[]] {
  	let action: ActionType = RequestHelper.getAction(request);
  	let data: Input[] = [];
  	let input: Input = null;
  	
	  // <---Auto[MergingBegin]
	  
	  // Auto[Merging]--->
		RequestHelper.registerInput('a84b2958', "relational", "Settings", "key");
		ValidationHelper.registerInput('a84b2958', "Textbox 1", true, "Needed Key");
    input = RequestHelper.getInput(request, 'a84b2958');
    
    // Override data parsing and manipulation of Textbox 1 here:
    // 
    
    if (input != null) data.push(input);
		RequestHelper.registerInput('1765d360', "relational", "Settings", "value");
		ValidationHelper.registerInput('1765d360', "Textbox 2", true, "Needed Value");
    input = RequestHelper.getInput(request, '1765d360');
    
    // Override data parsing and manipulation of Textbox 2 here:
    // 
    
    if (input != null) data.push(input);
	  // <---Auto[Merging]
	  
	  // Auto[MergingEnd]--->
	  
	  return [action, data];
	}
  // <---Auto[MergingEnd]
  
  // Auto[ClassEnd]--->
}
// <---Auto[ClassEnd]

// Export variables here:
//
export default Controller;

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.