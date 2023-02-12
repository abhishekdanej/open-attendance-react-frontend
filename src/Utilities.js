export function getUserFormattedDate() {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let today = new Date()
    const day = today.toString().substring(0, 3)
    let formatted_date = day + ", " + today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();

    return formatted_date;
}

export function getFormattedDate() {

    const months = ["Jan", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let today = new Date()
    const day = today.toString().substring(0, 3)
    let formatted_date = day + "-" + today.getDate() + "-" + months[today.getMonth()] + "-" + today.getFullYear();
    formatted_date = formatted_date.toUpperCase();

    return formatted_date;
}

export function getISODate() {
    // TO DO
}