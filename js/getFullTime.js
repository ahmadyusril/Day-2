function getFullTime(time) {

    let date = time.getDate();

    let monthIndex = time.getMonth();

    let year = time.getFullYear();

    let hours = time.getHours();

    let minutes = time.getMinutes();

    let month;
    switch (monthIndex) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;
    }

    if (hours <= 9) {
        hours = "0" + hours;
    } else if (minutes <= 9) {
        minutes = "0" + minutes;
    }

    return `${date} ${month} ${year} ${hours}:${minutes} WIB`;
}

module.exports = getFullTime;