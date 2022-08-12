const datetime = require('date-and-time');

module.exports = {
    format_time: (time) => {
        return datetime.format(datetime.parse(time, "HH:mm:ss"), "hh:mm A");
    },
    format_date: (date) => {
        console.log("DATE IS.........", date);
        return datetime.format(datetime.parse(date, "YYYY-MM-DD HH:mm:ss"), "dddd MMM DD, YYYY");
    },
  };