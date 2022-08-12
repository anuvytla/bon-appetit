const datetime = require('date-and-time');

module.exports = {
    format_time: (time) => {
        return datetime.format(datetime.parse(time, "HH:mm:ss"), "hh:mm A");
    },
    format_date: (date) => {
        console.log("DATE IS.........", date);
        return date;
        // return date.slice(0,10);
    },
  };