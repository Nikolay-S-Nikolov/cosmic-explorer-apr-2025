import { Router } from "express";
import { selectType } from "../utils/planetTypeUtils.js";
import { selectRings } from "../utils/ringsUtils.js";

const planetController = Router();

planetController.get('/create', (req, res) => {
    const selectedType = selectType('---');
    const haveRings = selectRings('---');
    res.render('planets/create', {selectedType, haveRings});
})

export default planetController;