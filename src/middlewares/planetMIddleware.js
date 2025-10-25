import planetService from "../services/planetService.js";

export async function isOwner(req, res, next) {
    const userId = req.user?.id;

    try {
        const planet = await planetService.getOne(req.params.planetId);

        if(!planet.owner.equals(userId)){
            return res.status(401).render('404', { error: 'Only creator can do this action!'});
        }

        next();
    } catch (err) {
        return res.status(401).render('404', { error: 'No such planet!' });
    }
};