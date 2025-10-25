import { Router } from "express";
import { selectType } from "../utils/planetTypeUtils.js";
import { selectRings } from "../utils/ringsUtils.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import planetService from "../services/planetService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const planetController = Router();

planetController.get('/create', (req, res) => {
    const selectedType = selectType('---');
    const haveRings = selectRings('---');
    res.render('planets/create', { selectedType, haveRings });
})


planetController.post('/create', async (req, res) => {
    const formData = req.body;
    const userId = req.user.id;

    try {
        await planetService.create(formData, userId);
        res.redirect('/planets/catalog');
    } catch (err) {
        const selectedType = selectType(formData.type);
        const haveRings = selectRings(formData.rings);
        const errorMessage = getErrorMessage(err);
        res.status(400).render('planets/create', {
            error: errorMessage,
            planet: formData,
            selectedType,
            haveRings,
        });
    }
})

planetController.get('/catalog', async (req, res) => {
    try {
        const planets = await planetService.getAll();
        res.render('planets/catalog', { planets });
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage, });
    }
})

planetController.get('/:planetId/details', async (req, res) => {
    const planetId = req.params.planetId;
    const userId = req.user?.id;

    try {
        const planet = await planetService.getOne(planetId);
        const isCreator = planet.owner.equals(userId);
        const isLiked = planet.likedList.some(l => l.equals(userId));
        res.render('planets/details', { planet, isCreator, isLiked });
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage, });
    }

})

planetController.get('/:planetId/like', isAuth, async (req, res) => {
    const planetId = req.params.planetId;
    const userId = req.user.id;

    try {
        await planetService.like(planetId,userId);
        res.redirect(`/planets/${planetId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render('404', { error: errorMessage, });
    }

})

export default planetController;