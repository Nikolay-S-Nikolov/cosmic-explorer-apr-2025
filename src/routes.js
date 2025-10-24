import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import planetController from "./controllers/planetController.js";

const routes = Router();

routes.use('/', homeController);
routes.use('/auth', authController);
routes.use('/planets', planetController);

routes.get('/*splash',(req,res)=>{
    res.render('404');
});

export default routes;