// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {RequestHelper} from './RequestHelper.js';
import {HTMLHelper} from './HTMLHelper.js';

const fieldManipulatorsInfoDict: any = {};

const DataManipulationHelper = {
	register: (guid: string, fields: string[]) => {
		if (!fieldManipulatorsInfoDict[guid]) {
			fieldManipulatorsInfoDict[guid] = fields;
		}
	},
  request: (guid: string, action: string, control: any) => {
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
	  				  control.setState({
	  				    data: json.results
	  				  });
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
  }
};

export {DataManipulationHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.