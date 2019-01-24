import Display from "./interface";
const DEFAULT_URI = "default&N:W";
const HEADERS = { Accept: "application/json" };
const MAX_LAT = 90;
const MAX_LONG = 180;
const PNG_METADATA = "data:image/png;base64,";

const display = new Display();

async function getDefaultImage(baseUrl) {
  const url = baseUrl + DEFAULT_URI;
  console.log("res : ", url);
  return await fetch(url, {
    method: "GET",
    headers: HEADERS
  })
    .then(data => {
      return data.json();
    })
    .then(response => {
      return PNG_METADATA + response.Row[0].Cell[0].$;
    })
    .catch(err => {
      console.error(err.message)
      return err.message;
    });
}

/**
 * Return the URI of the wanted file in HBase
 * @param {string} lat The latitude
 * @param {string} lng The longitude
 * @param {string} zoom The zoom level
 * @returns {string} Retrieves a correct URI for the hbase request e.g. : N43W0455
 */
function buildRequestURI(lat, lng, zoom) {
  lat = Number(lat);
  lng = Number(lng);
  let card = "";
  let uri = "";

  if (lat < 0) {
    lat *= -1;
    card += "S";
  } else {
    card += "N";
  }
  uri += lat > MAX_LAT ? MAX_LAT.toString() : lat.toString();

  card += ":";
  if (lng < 0) {
    lng *= -1;
    card += "W";
  } else {
    card += "E";
  }
  uri += lng > MAX_LONG ? MAX_LONG.toString() : lng.toString();
  uri += zoom + "&" + card;
  return uri;
}

class Requests {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchImage(lat, lng, zoom) {
    const url = this.baseUrl + buildRequestURI(lat, lng, zoom);
    console.log(url);
    display.displayMessage(url);
    return await fetch(url, {
      method: "GET",
      headers: HEADERS
    })
      .then(data => {
        return data.json();
      })
      .then(response => {
        return PNG_METADATA + response.Row[0].Cell[0].$;
      })
      .catch(async err => {
        return await getDefaultImage(this.baseUrl);
      });
  }
}

export default Requests;
