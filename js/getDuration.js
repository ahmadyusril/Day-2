function getDuration(start, end) {
    let projectStart = new Date(start)
    let projectEnd = new Date(end)

    let duration = projectEnd - projectStart

    let monthDuration = Math.floor(duration / (30 * 24 * 60 * 60 * 1000))
    if (monthDuration > 0) {
        return monthDuration + ' bulan'
    } else {
        let weekDuration = Math.floor(duration / (7 * 24 * 60 * 60 * 1000))
        if (weekDuration > 0) {
            return weekDuration + ' minggu'
        } else {
            let dayDuration = Math.floor(duration / (24 * 60 * 60 * 1000))
            if (dayDuration > 0) {
                return dayDuration + ' hari'
            } else {
                let hourDuration = Math.floor(duration / (60 * 60 * 1000))
                if (hourDuration > 0) {
                    return hourDuration + ' jam'
                } else {
                    let minuteDuration = Math.floor(duration / (60 * 1000))
                    if (minuteDuration > 0) {
                        return minuteDuration + ' menit'
                    } else {
                        let secondDuration = Math.floor(duration / 1000)
                        if (secondDuration > 0) {
                            return secondDuration + ' detik'
                        }
                    }
                }
            }
        }
    }
}

module.exports = getDuration;