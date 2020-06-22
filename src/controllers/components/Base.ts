// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {Request, Response} from "express";
import {HierarchicalDataTable, HierarchicalDataRow, HierarchicalDataColumn, ActionType, Input} from "../helpers/DatabaseHelper.js";
import {ValidationHelper} from "../helpers/ValidationHelper.js";
import {RenderHelper} from "../helpers/RenderHelper.js";

class Base {
	protected request: Request;
	protected response: Response;
	protected template: string;
	
	constructor(request: Request, response: Response, template: string) {
  	this.request = request;
  	this.response = response;
  	this.template = template;
  }
	
	protected perform(action: ActionType, data: Input[]) {
		this.call(action, data).catch((error) => {
			RenderHelper.error(this.response, error);
		});
	}
  
  private async call(action: ActionType, data: Input[]) {
    this.validate(data);
  	
    switch (action) {
      case ActionType.Insert:
        RenderHelper.json(this.response, await this.insert(data));
        break;
      case ActionType.Update:
        RenderHelper.json(this.response, await this.update(data));
        break;
      case ActionType.Delete:
        RenderHelper.json(this.response, await this.remove(data));
        break;
      case ActionType.Retrieve:
        RenderHelper.json(this.response, await this.retrieve(data));
        break;
      case ActionType.Popup:
        RenderHelper.json(this.response, await this.retrieve(data));
        break;
      case ActionType.Navigate:
        RenderHelper.navigate(this.response, await this.navigate(data));
        break;
      case ActionType.Test:
      	RenderHelper.json(this.response, await this.get(data));
      	break;
      default:
        switch (this.request.method) {
          case "GET":
            RenderHelper.page(this.response, this.template, await this.get(data));
            break;
          case "POST":
            RenderHelper.page(this.response, this.template, await this.post(data));
            break;
          case "PUT":
            RenderHelper.page(this.response, this.template, await this.put(data));
            break;
          case "DELETE":
            RenderHelper.page(this.response, this.template, await this.delete(data));
            break;
        }
        break;
    }
  }
  
  protected validate(data: Input[]): void {
 		ValidationHelper.validate(data);
  }
  
  protected async get(data: Input[]): Promise<HierarchicalDataTable[]> {
 	  return new Promise((resolve) => {
 	    resolve([]);
 	  });
  }
  
  protected async post(data: Input[]): Promise<HierarchicalDataTable[]> {
 		return new Promise((resolve) => {
 	    resolve([]);
 	  });
  }
  
  protected async put(data: Input[]): Promise<HierarchicalDataTable[]> {
 		return new Promise((resolve) => {
 	    resolve([]);
 	  });
  }
  
  protected async delete(data: Input[]): Promise<HierarchicalDataTable[]> {
 		return new Promise((resolve) => {
 	    resolve([]);
 	  });
  }
  
  protected async insert(data: Input[]): Promise<HierarchicalDataRow> {
 		throw new Error("Not Implemented Error");
  }
  
  protected async update(data: Input[]): Promise<HierarchicalDataRow> {
 		throw new Error("Not Implemented Error");
  }
  
  protected async retrieve(data: Input[]): Promise<HierarchicalDataTable> {
 		throw new Error("Not Implemented Error");
  }
  
  protected async remove(data: Input[]): Promise<boolean> {
 		throw new Error("Not Implemented Error");
  }
  
  protected async navigate(data: Input[]): Promise<string> {
 		throw new Error("Not Implemented Error");
  }
}

export {Base};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.