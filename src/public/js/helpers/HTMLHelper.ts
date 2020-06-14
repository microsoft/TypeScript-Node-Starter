// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

const HTMLHelper = {
	// Document Object Model (DOM) Queries
	// 
  getElementById: (id: string, container: any=document): any => {
    return container.getElementById(id);
  },
  getElementByClassName: (className: string, container: any=document): any => { // return the last one
    let elements = HTMLHelper.getElementsByClassName(className, container);
    if (elements.length != 0) { return elements[elements.length - 1]; }
    else { return null; }
  },
  getElementsByClassName: (className: string, container: any=document, notToBeUnder: string=null): any[] => {
    let elements = container.getElementsByClassName(className);
    
    if (notToBeUnder === null) {
      return elements;
    } else {
      return [...elements].filter((element) => {
        let current = element.parentNode;
        while (current != null && current != container) {
          if (HTMLHelper.hasClass(current, notToBeUnder)) return false;
          current = current.parentNode;
        }
        return true;
      });
    }
  },
  getElementByAttributeNameAndValue: (attributeName: string, value: string, container: any=document): any => {
    return container.querySelectorAll('[' + attributeName + '="' + value + '"]')[0];
  },
  getElementsByAttributeNameAndValue: (attributeName: string, value: string, container: any=document): any[] => {
    return container.querySelectorAll('[' + attributeName + '="' + value + '"]');
  },
  getElementsByAttribute: (attributeName: string, container: any=document, includingSelf: boolean=false): any[] => {
    let results = [...container.querySelectorAll('[' + attributeName + ']')];
    if (includingSelf && HTMLHelper.hasAttribute(container, attributeName)) {
      results.splice(0, 0, container);
    }
    return results;
  },
  getAttribute: (element: any, name: string): string => {
  	if (!element || !element.getAttribute) return null;
  	return element.getAttribute(name);
  },
  setAttribute: (element: any, name: string, value: any) => {    
  	if (!element || !element.getAttribute || !element.setAttribute) return;
  	return element.setAttribute(name, value);
  },
  removeAttribute: (element: any, name: string) => {
  	if (!element || !element.getAttribute || !element.removeAttribute) return;
  	return element.removeAttribute(name);
  },
  hasAttribute: (element: any, name: string): boolean => {
  	if (!element || !element.getAttribute || !element.hasAttribute) return null;
  	return element.hasAttribute(name);
  },
  findTheParentInClassName: (className: string, element: any, isIncludingSelf: boolean=false): any => { // the closet one
    let current = (!isIncludingSelf) ? element.parentNode : element;
    while (current != null) {
      if (HTMLHelper.hasClass(current, className)) {
        return current;
      }
      current = current.parentNode;
    }
    
    return null;
  },
  findAllParentsInClassName: (className: string, element: any): any[] => {
    let results = [];
    let current = element.parentNode;
    
    while (current != null && current != document) {
      if (HTMLHelper.hasClass(current, className)) {
        results.push(current);
      }
      current = current.parentNode;
    }
    
    return results;
  },
  findAllParentValuesInAttributeName: (attributeName: string, fromElement: any, toElement: any=null, includeSelf: boolean=false): any[] => {
    let results = [];
    let current = (includeSelf) ? fromElement : fromElement.parentNode;
    
    if (current == null) {
      return results;
    }
    
    do {
      let value = current.getAttribute(attributeName);
      if (value !== '' && value !== null) {
        results.push(value);
      }
      current = current.parentNode;
    }
    while (current != toElement && current != null && current != document)
    
    return results;
  },
  
  // Cascading Style Sheets' Class Queries
	// 
  hasClass: (element: any, name: string): boolean => {
    let classAttributeValue: string = element;
    if (typeof element === 'object') {
      classAttributeValue = (element.className || '');
    }
    let splited = classAttributeValue.split(' ');
    return splited.indexOf(name) != -1;
  },
  removeClass: (element: any, name: string) => {
    let classAttributeValue: string = element;
    if (typeof element === 'object') {
      classAttributeValue = (element.className || '');
    }
    let splited = classAttributeValue.split(' ');
    let index = splited.indexOf(name);
    if (index != -1) {
      splited.splice(index, 1);
    }
    element.className = splited.join(' ').replace(/( )+/g, ' ').trim();
  },
  addClass: (element: any, name: string) => {
    let classAttributeValue: string = element;
    if (typeof element === 'object') {
      classAttributeValue = (element.className || '');
    }
    let splited = classAttributeValue.split(' ');
    if (splited.indexOf(name) == -1) {
      splited.push(name);
    }
    element.className = splited.join(' ').replace(/( )+/g, ' ').trim();
  },
  
  // Cascading Style Sheets' Inline Style Queries
	// 
  setInlineStyle: (inlineStyle: string, styleName: string, styleValue: string) => {
    let splited = (inlineStyle || '').replace(/;$/, '').split('; ');
    let found = false;
    
    for (var i=0; i<splited.length; i++) {
      if (splited[i].indexOf(styleName + ': ') == 0) {
        found = true;
        if (styleValue) {
        	splited[i] = styleName + ': ' + styleValue;
        } else {
        	splited.splice(i, 1);
        }
        break;
      }
    }
    
    if (!found && styleValue) {
      splited.push(styleName + ': ' + styleValue);
    }
    
    return splited.join('; ');
  },
  getInlineStyle: (inlineStyle: string, styleName: string): string => {
  	if (!inlineStyle) return null;
    if (('; ' + inlineStyle).indexOf('; ' + styleName + ': ') == -1) return null;
    
    let splited = inlineStyle.replace(/;$/, '').split('; ');
    
    for (var i=0; i<splited.length; i++) {
      if (splited[i].trim().indexOf(styleName + ': ') == 0) {
        let tokens = splited[i].split(': ');
        return tokens[tokens.length - 1];
      }
    }
    
    return null;
  },
  getHashMapFromInlineStyle: (inlineStyle: string): any => {
  	if (!inlineStyle) return {};
    let splited = inlineStyle.replace(/;$/, '').split('; ');
    let hashMap = {};
    
    for (var i=0; i<splited.length; i++) {
      let tokens = splited[i].split(': ');
      hashMap[tokens[0]] = tokens[1];
    }
    
    return hashMap;
  },
  getInlineStyleFromHashMap: (hash: any): string => {
    let results = [];
    for (var key in hash) {
      if (hash.hasOwnProperty(key) && hash[key] != null) {
        results.push(key + ': ' + hash[key]);
      }
    }
    return results.join('; ');
  },
  
  // Size and Position Queries
	// 
  getPosition: (object: any, ofDocument: boolean=true): [number, number] => {
    var curleft = 0;
    var curtop = 0;
    var computedStyle = null;
    
    if (object.offsetParent) {
      do {
        computedStyle = window.getComputedStyle(object, null);
        curleft += object.offsetLeft;
        curleft += parseInt(computedStyle.getPropertyValue('border-left-width'));
        curtop += object.offsetTop;
        curtop += parseInt(computedStyle.getPropertyValue('border-top-width'));
        curtop -= object.scrollTop;
      } while (ofDocument && (object = object.offsetParent));
    }
    
    return [curleft, curtop];
  },
  getSize: (object: any): [number, number] => {
    return [object.offsetWidth, object.offsetHeight];
  }
};

export {HTMLHelper};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.