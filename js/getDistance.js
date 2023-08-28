function getDistance(time) {
    let timeNow = new Date();
    let timePost = new Date(time);

    let distance = timeNow - timePost;

    let milisecond = 1000;
    let secondInHours = 3600;
    let hoursInDays = 24;

    let distanceDay = Math.floor(
        distance / (milisecond * secondInHours * hoursInDays)
    );
    let distanceHours = Math.floor(distance / (milisecond * 60 * 60));
    let distanceMinutes = Math.floor(distance / (milisecond * 60));
    let distanceSecond = Math.floor(distance / milisecond);

    if (distanceDay > 0) {
        return `${distanceDay} days ago`;
    } else if (distanceHours > 0) {
        return `${distanceHours} hours ago`;
    } else if (distanceMinutes > 0) {
        return `${distanceMinutes} minutes ago`;
    } else {
        return `${distanceSecond} seconds ago`;
    }
}

module.exports = getDistance;