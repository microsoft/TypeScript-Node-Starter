// Auto[Generating:V1]--->
    // PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.
    
// Auto[Import]--->
import {Project, DeclarationHelper} from '../helpers/DeclarationHelper.js';
import {CodeHelper} from '../helpers/CodeHelper.js';
import {EventHelper} from '../helpers/EventHelper.js';
import {IBaseProps, IBaseState, DefaultBaseProps, DefaultBaseState, Base} from './Base.js';
// <---Auto[Import]

// Import additional modules here:
//

// Auto[Declare]--->

declare let React: any;
declare let ReactDOM: any;
declare let window: any;

// <---Auto[Declare]

// Declare private static variables here:
//

// Auto[Interface]--->
interface IAutoBaseProps extends IBaseProps {
  forward: {classes: String, styles: any};
}
interface IAutoBaseState extends IBaseState {
}
// <---Auto[Interface]

// Declare or extend interfaces here:
//
interface IProps extends IAutoBaseProps {
  
}
interface IState extends IAutoBaseState { 
}

let DefaultProps = Object.assign({}, DefaultBaseProps, {
  
});
let DefaultState = Object.assign({}, DefaultBaseState, {
  
});

// Auto[ClassBegin]--->
class FlowLayout_106ad665 extends Base {
  state: IState = null;
  protected static defaultProps: IProps = DefaultProps;
  
  constructor(props) {
    super(props);
    this.state = CodeHelper.clone(DefaultState);
    
    this.initialize();
  }
  // <---Auto[ClassBegin]
  
  // Declare class variables and functions here:
  //
  protected initialize(): void {
  }
  
  // Providing data array base on dot notation:
  // 
  protected getDataFromNotation(notation: string): any {
    return super.getDataFromNotation(notation);
  }
  
  // Auto[Merging]--->
  // <---Auto[Merging]
  
  // Auto[ClassEnd]--->
  protected render(): any {
    return (
      <div className={"internal-fsb-element " + (this.props.forward && this.props.forward.classes || '')} internal-fsb-guid="106ad665" style={Object.assign({'minHeight': '200px', 'FsbBackgroundType': 'linear', 'background': 'linear-gradient(90deg, rgba(3, 115, 252, 1) 0%, rgba(255, 0, 85, 1) 100%)'}, this.props.forward && this.props.forward.styles || {})}>
        <div className="container-fluid">
          <div className="row internal-fsb-strict-layout">
            <div className="col-12 offset-0 internal-fsb-inheriting-element" style={{'color': 'rgba(255, 255, 255, 0.83)', 'textAlign': 'center'}}>
              <div>
                <br />
              </div>
              <div>
                <br />
              </div>
              <div>
                <br />
              </div>
              This is a component which can be duplicated.
            </div>
          </div>
        </div>
      </div>
    )
  }
}
DeclarationHelper.declare('Site', 'Controls.FlowLayout_106ad665', FlowLayout_106ad665);
// <---Auto[ClassEnd]

// Export variables here:
//
export {IProps, IState, DefaultProps, DefaultState};

    // <--- Auto[Generating:V1]
    // PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.