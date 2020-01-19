module.exports = function parseStringAsArray(string) {
    return string.split(',').map(item => item.trim());
}