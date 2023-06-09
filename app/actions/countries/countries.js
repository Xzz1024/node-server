const CountryModel = require('./country-model'),
    util = require('../../utils/util.js');

exports.getCountryData = () => {
    const countries = require('../../../config/countries/countries.json');
    const results = {
        countries: []
    }

    countries.forEach(item => {
        if(!util.isObjectValueEmpty(item)) {
            results.countries.push(new CountryModel(item))
        }        
    });
    //sort by alphabetically
    results.countries.sort((a, b) => {
        return a.countryName.localeCompare(b.countryName);
    });

    return results;
}

exports.countriesList = (req, res, next) => {
    const results = this.getCountryData();
    req.model.response = {
        status: 200,
        data: results
    }
    req.model.error = null;
    return next();
}
