const NORTH = "N";
const SOUTH = "S";
const EAST = "E";
const WEST = "W";
const LAT_SIZE = 2;
const LNG_SIZE = 3;

class CoordinatesConverter {
  /**
   * Convert numeric coordinates to a hgt filename
   * @param {string} lat The latitude
   * @param {string} lng The longitude
   * @returns {string} The file name corresponding of the coordinates.
   */
  toFileName(lat, lng) {
    if (isNaN(lat) || isNaN(lng)) {
      throw new Error("NaN");
    }
    let fileName = "";
    lat = Number(lat);
    lng = Number(lng);
    lat += 90;
    lng += 180;

    return lat.toString() + lng.toString();
  }

  /**
   * Add '0' before the number if it's length is lower than size.
   * @param {number} num The number to transform
   * @param {number} size The size that the return string should at least be.
   * @returns {string} The string of the number with 0 before.
   */
  formatNumber(num, size) {
    let ret = "";
    if (num < 0 || isNaN(num)) {
      throw new Error("NaN");
    }
    num = num.toString();
    let diff = size - num.length;
    if (diff > 0) {
      for (let i = 0; i < diff; ++i) {
        ret += "0";
      }
    }
    return ret + num;
  }
}

module.exports = new CoordinatesConverter();
