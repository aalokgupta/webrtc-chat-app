const moment = require('moment');

var date = new Date().getTime();
var app = moment();

var generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: moment.valueOf()
  }
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from: from,
    locationUrl: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    createdAt: moment.valueOf()
  }
};


module.exports = {generateMessage, generateLocationMessage};
