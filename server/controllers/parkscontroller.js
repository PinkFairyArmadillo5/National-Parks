const NPS_API_KEY = process.env.NPS_API_KEY;
const axios = require('axios')

const parksController = {
    async getStateParks(req, res, next) {
        const selectedState = req.body.state;
        const { data: { data } } = await axios.get(`https://developer.nps.gov/api/v1/parks?stateCode=${selectedState}&limit=50&start=0&api_key=${NPS_API_KEY}`);
        res.locals.parks = data;
        return next();
    }
}

module.exports = parksController