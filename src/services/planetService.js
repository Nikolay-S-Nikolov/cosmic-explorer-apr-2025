import Planet from "../models/Planet.js";


export default {
    create(formData, userId) {
        formData.owner = userId;
        return Planet.create(formData);
    },

    getAll(){
        return Planet.find();
    },

    getOne(planetId){
        return Planet.findById(planetId);
    },
};