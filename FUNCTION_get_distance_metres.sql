CREATE FUNCTION `get_distance_metres`(
lat1 DOUBLE, lng1 DOUBLE, lat2 DOUBLE, lng2 DOUBLE
) RETURNS double
BEGIN
    DECLARE radlat1 DOUBLE;
    DECLARE radlat2 DOUBLE;
    DECLARE theta DOUBLE;
    DECLARE radtheta DOUBLE;
    DECLARE dist DOUBLE;
    SET radlat1 = PI() * lat1 / 180;
    SET radlat2 = PI() * lat2 / 180;
    SET theta = lng1 - lng2;
    SET radtheta = PI() * theta / 180;
    SET dist = sin(radlat1) * sin(radlat2) + cos(radlat1) * cos(radlat2) * cos(radtheta);
    SET dist = acos(dist);
    SET dist = dist * 180 / PI();
    SET dist = dist * 60 * 1.1515;
    SET dist = dist * 1.609344;
RETURN dist;
END