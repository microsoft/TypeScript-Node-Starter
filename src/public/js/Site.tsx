// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.

import {Project, DeclarationHelper} from './helpers/DeclarationHelper.js';
import {DataManipulationHelper} from './helpers/DataManipulationHelper.js';
import {HTMLHelper} from './helpers/HTMLHelper.js';
import {EventHelper} from './helpers/EventHelper.js';
import './components/TextElement_9bab7d34.js';

declare let React: any;
declare let ReactDOM: any;
declare let window: any;

let expandingPlaceholders = [...document.querySelectorAll('[internal-fsb-init-class]')];
for (let expandingPlaceholder of expandingPlaceholders) {
	let forward = JSON.parse((expandingPlaceholder.getAttribute('internal-fsb-init-forward') || '{}').replace(/'/g, '"'));
	ReactDOM.render(React.createElement(DeclarationHelper.get(expandingPlaceholder.getAttribute('internal-fsb-init-class')), {forward: forward, data: window.data || null}, null), expandingPlaceholder);
	expandingPlaceholder.parentNode.insertBefore(expandingPlaceholder.firstChild, expandingPlaceholder);
	expandingPlaceholder.parentNode.removeChild(expandingPlaceholder);
}

window.internalFsbSubmit = (guid: string, action: string, dataControls: string, callback: any) => {
	DataManipulationHelper.register(guid, dataControls && dataControls.split(' ') || []);
	DataManipulationHelper.request(guid, action, callback);
}

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.