

exports.isObjectValueEmpty = (obj) => {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return false;
    }
    return true;
}
