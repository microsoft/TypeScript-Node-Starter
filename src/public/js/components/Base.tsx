// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.

import {CodeHelper} from '../helpers/CodeHelper.js';
import {Project, DeclarationHelper} from '../helpers/DeclarationHelper.js';

declare let React: any;
declare let ReactDOM: any;

interface IBaseProps {
}

interface IBaseState {
}

let DefaultBaseProps: any = {
};
let DefaultBaseState: any = {
};

class Base extends React.Component {
    protected state: IBaseState = {};
    protected static defaultProps: IBaseProps = DefaultBaseProps;
    
    constructor(props) {
        super(props);
        Object.assign(this.state, CodeHelper.clone(DefaultBaseState));
    }
    
    protected render() { }
}

DeclarationHelper.declare('Site', 'Components.Base', Base);

export {IBaseProps, IBaseState, DefaultBaseProps, DefaultBaseState, Base};

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECUASE YOUR CHANGES MAY BE LOST.