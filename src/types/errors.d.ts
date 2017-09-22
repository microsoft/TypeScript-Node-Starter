export class ErrorMessage {
    constructor() {
    }
    msg: string;
    param: string;
    value: any;
    location: string;
    nestedErrors: Array<ErrorMessage>;
}
export class ErrorArray {
    constructor();
    errors: Array<ErrorMessage>;
}