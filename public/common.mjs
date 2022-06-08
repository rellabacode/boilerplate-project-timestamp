export function getDatePart(date) {
    const dateComps = date.toLocaleDateString("es-ES").split("/");
    const day = parseInt(dateComps[0]).toString().padStart(2, "0");
    const month = (parseInt(dateComps[1]) + 1).toString().padStart(2, "0");
    const dateComp = dateComps[2] + "-" + month + "-" + day;
    return dateComp;
}

export function getTimePart(date) {
    const hourComps = date.toLocaleTimeString("es-ES").split(":");
    const hour = parseInt(hourComps[0]).toString().padStart(2, "0");
    const min = parseInt(hourComps[1]).toString().padStart(2, "0");
    const sec = parseInt(hourComps[2]).toString().padStart(2, "0");
    const hourComp = hour + ":" + min + ":" + sec;
    return hourComp;
}