//For parsing dummy date into the javascript date object

function parseDate(date) {
    let parsedDate = Date.parse(date)
    if (parseDate === NaN || !parseDate) {
        return false
    }
    const formatedDate = new Date(parsedDate)
    return formatedDate
}

module.exports = parseDate