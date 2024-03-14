
/**
 * Calculates the distance (in km) between two points on the earth
 */
export const distanceCalc = (lat1: number, lng1: number, lat2: number, lng2: number) => {

    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180); // deg2rad below
    const dLon = (lng2 - lng1) * (Math.PI / 180);
    const a =
        0.5 -
        Math.cos(dLat) / 2 +
        (Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            (1 - Math.cos(dLon))) /
        2;

    const kmDistance = R * 2 * Math.asin(Math.sqrt(a));
    const miDistance = kmDistance * 0.621371;

    return miDistance;
};

