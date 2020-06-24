// Auto[Generating:V1]--->
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.

import * as homeController from './controllers/Home.js';

const route = (app: any) => {
 app.get("/", homeController.index);
 app.post("/", homeController.index);
}

export default route;

// <--- Auto[Generating:V1]
// PLEASE DO NOT MODIFY BECAUSE YOUR CHANGES MAY BE LOST.