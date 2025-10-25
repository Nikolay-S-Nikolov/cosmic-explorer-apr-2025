import Planet from "../models/Planet.js";


export default {
    create(formData, userId) {
        formData.owner = userId;
        return Planet.create(formData);
    },

    getAll() {
        return Planet.find();
    },

    getOne(planetId) {
        return Planet.findById(planetId);
    },

    async like(planetId, userId) {
        const planet = await this.getOne(planetId);

        if (!planet) {
            throw new Error('No such planet!');
        }

        if (planet.owner.equals(userId)) {
            throw new Error('Owners can not like their planet');
        }

        if (planet.likedList.some(id => id.equals(userId))) {
            throw new Error('You have already liked this planet');
        }

        planet.likedList.push(userId);        
        await planet.save();

        return planet;
    },

    edit(planetId, formData){
        return Planet.findByIdAndUpdate(planetId,formData,{runValidators:true});
    },
};