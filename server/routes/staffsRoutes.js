// import express
import express from "express";

// init express staffsRouter
const staffsRouter = express.Router();

// import function from controller
import {showStaffs, showStaffsById} from "../controllers/staffs.js";


staffsRouter.get('/staffs', showStaffs);
staffsRouter.get('/staffs/:id', showStaffsById);

export default staffsRouter;