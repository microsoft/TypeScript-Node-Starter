// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {CodeHelper} from '../helpers/CodeHelper';
import {Project, DeclarationHelper} from '../helpers/DeclarationHelper';
import {HierarchicalDataTable, DataManipulationHelper} from '../helpers/DataManipulationHelper';

declare let React: any;
declare let ReactDOM: any;

interface IBaseProps {
	data: HierarchicalDataTable[];
}

interface IBaseState {
	data: HierarchicalDataTable[];
}

let DefaultBaseProps: any = {
	data: null
};
let DefaultBaseState: any = {
	data: null
};

class Base extends React.Component {
    constructor(props) {
        super(props);
    }
    
    protected getDataFromNotation(notation: string): any {
        if (!notation) {
            console.log('There was an error processing hierarchical data on client side (missing notation).');
            return [];
        }
        
        if (this.state.data) {
        		return DataManipulationHelper.getDataFromNotation(notation, this.state.data);
        } else if (this.props.data) {
        		return DataManipulationHelper.getDataFromNotation(notation, this.props.data);
        } else {
            console.log('There was an error processing hierarchical data on client side (no data).');
            return [];
        }
    }
    
    public manipulate(action: string, results: any) {
        
    }
    
    protected render() { }
}

DeclarationHelper.declare('Site', 'Components.Base', Base);

export {IBaseProps, IBaseState, DefaultBaseProps, DefaultBaseState, Base};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.