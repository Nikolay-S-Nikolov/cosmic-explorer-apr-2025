import { Schema, model } from "mongoose";

const planetSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        minLength: [2, 'The Name should be at least 2 characters'],
    },

    age: {
        type: Number,
        required: [true, 'Age field is required'],
        validate: { 
            validator: function (value) {
                return value > 0;
            },
            message: 'The Age should be a positive number'
        },
    },

    solarSystem: {
        type: String,
        required: [true, 'Solar System field is required'],
        minLength: [5, 'The Solar System should be at least 2 characters'],
    },

    type: {
        type: String,
        enum: ['Inner', 'Outer', 'Dwarf'],
        message: 'The Type should be one of the option [Inner, Outer, Dwarf]',
    },

    moons: {
        type: Number,
        required: [true, 'Moons field is required'],
        min: [0, 'The Moons should be a positive number'],
    },

    size: {
        type: Number,
        required: [true, 'Size field is required'],
        validate: { 
            validator: function (value) {
                return value > 0;
            },
            message: 'The Size should be a positive number'
        },
    },

    rings: {
        type: String,
        enum: ['Yes', 'No'],
        message: 'The Rings should be one of the option [Yes, No]',
    },

    description: {
        type: String,
        required: [true, 'Description field is required'],
        minLength: [10, 'The Description should be minimum 10 characters long'],
        maxLength: [100, 'The Description should be maximum 100 characters long'],
    },

    image: {
        type: String,
        required: [true, 'Image field is required'],
        match: [/^https?:\/\/.+/, 'The Image should start with http:// or https://'],
    },

    likedList: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Planet = model('Planet', planetSchema);

export default Planet;