// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

const RequestHelper = {
	request: async (method: string, url: string, body: string): Promise<any> => {
		return new Promise((resolve, reject) => {
			const xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
					if (xmlhttp.status == 200) {
						resolve(JSON.parse(xmlhttp.responseText));
					} else {
						reject(xmlhttp.status);
					}
				}
	    };
	    xmlhttp.open(method, url, true);
	    if (body) {
	    	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	    	xmlhttp.send(body);
	    }
	    else xmlhttp.send();
		});
	},
  get: (url: string): Promise<any> => {
  	let method = 'GET';
  	let bodyString = null;
  	
  	return RequestHelper.request(method, url, bodyString);
  },
  post: (url: string, body: any): Promise<any> => {
  	let method = 'POST';
  	let bodyString = JSON.stringify(body);
  	
  	return RequestHelper.request(method, url, bodyString);
  },
  put: (url: string, body: any): Promise<any> => {
  	let method = 'PUT';
  	let bodyString = JSON.stringify(body);
  	
  	return RequestHelper.request(method, url, bodyString);
  },
  delete: (url: string, body: any): Promise<any> => {
  	let method = 'DELETE';
  	let bodyString = JSON.stringify(body);
  	
  	return RequestHelper.request(method, url, bodyString);
  }
};

export {RequestHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.