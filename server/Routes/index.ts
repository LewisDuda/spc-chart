import { Express } from 'express';
import * as chartsDefinitions from '../Controllers/chartsDefinitions';

const routes = (app: Express) => {
	app.get('/chartsDefinitions', chartsDefinitions.Get);
	app.get('/chartsDefinitions/:id', chartsDefinitions.GetByID);
	app.post('/chartsDefinitions', chartsDefinitions.Post);
	app.put('/chartsDefinitions/:id', chartsDefinitions.Put);
	app.delete('/chartsDefinitions/:id', chartsDefinitions.Delete);
};

export default routes;
