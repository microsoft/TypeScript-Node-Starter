const RequestHelper = {
	request: async (method: string, url: string, body: string, responseType: string=null, retryCount: number=10): Promise<any> => {
		return new Promise((resolve, reject) => {
			const process = (() => {
			  const xmlhttp = new XMLHttpRequest();
  	    xmlhttp.onreadystatechange = function() {
  				if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
  					if (xmlhttp.status == 200) {
  						let output = xmlhttp.response;
  						try {
  						  output = JSON.parse(xmlhttp.responseText);
  						} catch { /* void */ }
  						resolve(output);
  					} else {
  					  window.setTimeout((() => {
  					    if (--retryCount >= 0) {
  					      process();
  					    } else {
  						    reject(xmlhttp.status);
  						  }
  						}).bind(this), 1000);
  					}
  				}
  	    };
  	    if (responseType) xmlhttp.responseType = responseType;
  	    xmlhttp.open(method, url, true);
  	    if (body) {
  	    	xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	    	xmlhttp.send(body);
  	    }
  	    else xmlhttp.send();
  	  });
  	  process();
		});
	},
  get: (url: string, responseType: string=null): Promise<any> => {
  	let method = 'GET';
  	let bodyString = null;
  	
  	return RequestHelper.request(method, url, bodyString, responseType);
  },
  post: (url: string, body: any, responseType: string=null): Promise<any> => {
  	let method = 'POST';
  	let bodyString = JSON.stringify(body);
  	
  	return RequestHelper.request(method, url, bodyString, responseType);
  },
  put: (url: string, body: any, responseType: string=null): Promise<any> => {
  	let method = 'PUT';
  	let bodyString = JSON.stringify(body);
  	
  	return RequestHelper.request(method, url, bodyString, responseType);
  },
  delete: (url: string, body: any, responseType: string=null): Promise<any> => {
  	let method = 'DELETE';
  	let bodyString = JSON.stringify(body);
  	
  	return RequestHelper.request(method, url, bodyString, responseType);
  }
};

export {RequestHelper};