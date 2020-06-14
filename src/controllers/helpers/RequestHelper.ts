import {Request} from "express";
import {SourceType, Input} from "./DatabaseHelper.js";
import {ValidationHelper} from "./ValidationHelper.js";

enum ActionType {
  Insert,
  Update,
  Delete,
  Retrieve,
  Popup,
  Navigate
}
interface RequestParamInfo {
  target: SourceType;
  group: boolean;
  name: string;
}

const requestParamInfoDict: any = {};

const RequestHelper = {
	registerInput: (guid: string, target: string, group: string, name: string): void => {
		if (!guid || !target || !group || !name) throw new Error("There was an error trying to retrieve input info (incomplete schema).");
		
		let _target: SourceType;
		switch (target) {
			case 'relational':
				_target = SourceType.Relational;
				break;
			case 'worker':
				_target = SourceType.PrioritizedWorker;
				break;
			case 'document':
				_target = SourceType.Document;
				break;
			case 'volatile-memory':
				_target = SourceType.VolatileMemory;
				break;
			default:
				throw new Error("There was an error trying to retrieve input info (invalid).");
		}
		
		requestParamInfoDict[guid] = {
			target: _target,
			group: group,
			name: name
		};
	},
	getAction: (request: Request): ActionType => {
		let json: any = request.body;
		
		if (json == null) {
			throw new Error("There was an error trying to obtain requesting parameters (missing).");
		}
		
		switch (json.action) {
			case 'insert':
				return ActionType.Insert;
			case 'update':
				return ActionType.Update;
			case 'delete':
				return ActionType.Delete;
			case 'retrieve':
				return ActionType.Retrieve;
			case 'popup':
				return ActionType.Popup;
			case 'navigate':
				return ActionType.Navigate;
			default:
				throw new Error("There was an error trying to obtain requesting parameters (invalid).");
		}
	},
	getInput: (request: Request, guid: string): Input => {
		let json: any = request.body;
		
		if (json == null) {
			throw new Error("There was an error trying to obtain requesting parameters (missing).");
		}
		
		let paramInfo = requestParamInfoDict[guid];
		let input: Input = {
		  target: paramInfo.target,
  		group: paramInfo.group,
  		name: paramInfo.name,
  		value: json[guid],
  		guid: guid,
  		validation: null
		};
		
		if (input != null) {
			ValidationHelper.attachInfo(input);
		}
		
		return input;
	}
};

export {ActionType, RequestHelper};