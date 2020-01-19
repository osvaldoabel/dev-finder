const axios  = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../models/utils/parseStringAsArray');

module.exports = {
    async update(request, response) {
        let newData = request.params;
        delete newData.id;

        await Dev.updateOne({_id: request.params.id }, newData, {new: true}, (error, success) => { 
            console.log(success, error);
        });

        // const dev = await Dev.findOne({_id: request.params.id });
        
        
        return response.json(dev);
    },

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        const { github_username , techs, latitude, longitude } = request.body;
        
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        let dev = await Dev.findOne({ github_username });
        
        if (!dev) {
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            
            console.log(name, avatar_url, bio, github_username);
        
            
            dev = await Dev.create({
                github_username, 
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        
        return response.json(dev);
    }
}