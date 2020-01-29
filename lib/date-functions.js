function getDate()  {
    const currentTime = new Date();

    // returns the month (from 0 to 11)
    const month = currentTime.getMonth() + 1;

    // returns the day of the month (from 1 to 31)
    const day = currentTime.getDate();

    // returns the year (four digits)
    const year = currentTime.getFullYear();
    
    const date = day + "-" + month + "-" + year;
    return date;
}

exports.getDate = getDate;