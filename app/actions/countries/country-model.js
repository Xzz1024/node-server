/*
* Country Model for country lsit
*/
const CountryListToHidePostalCode = ['IE', 'HK']
const showPostalCode = (countryCode) => {
    const countries = CountryListToHidePostalCode.filter((code) => {
            return code == countryCode
    })
    return !(countries.length >= 1)
}
module.exports = function (data) {
    this.countryId = data.COUNTRY_ID || '';
    this.countryName = data.COUNTRY_NAME || '';
    this.countryCode = data.COUNTRY_TWO_LETTER || '';
    this.salesOrg = data.SALES_ORG || '';
    //this.ecommEmail = data.ECOMM_EMAIL || '';
    //this.currencySign = data.CURRENCY_SIGN
    //this.showHomeEnabled = data.SHOWHOME_ENABLED || '';
    this.ecommEnabled = data.ECOMM_ENABLED || '';
    //this.mossRegion = data.MOSS_REGION || '';
    //this.homePageBanner = data.HOME_PAGE_BANNER || '';
    //this.fishPageBanner = data.FISH_PAGE_BANNER || '';
    //this.defaultTimeZone = data.DEFAULT_TIME_ZONE || '';
    this.showPostalCode = showPostalCode(this.countryCode);
}

