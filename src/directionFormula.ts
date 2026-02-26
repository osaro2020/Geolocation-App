

export function direction(userCoords:number[], personCoords:number[]){
    //const coordNames = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest", "north"];

    //could think about using in front of, behind, right, left, etc.

    //Previsous Implemention Pre-Deployment 10-11-23
    //const coordNames = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest", "north"];
    // var radians = Math.atan2((personCoords[1] - userCoords[1]), (personCoords[0] - userCoords[0]));

    // var cardinal = radians * (180/Math.PI);

    // var coordIndex = Math.round(cardinal/45);
    
    // if(coordIndex < 0) coordIndex += 8;

    // return coordNames[coordIndex];

    var dLon = personCoords[1] - userCoords[1];
    var lat2 = userCoords[0];
    var lat1 = personCoords[0];

    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1)*Math.sin(lat2) -
        Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
    var theta:any = Math.atan2(y, x);
    var brng:any = (theta*180/Math.PI + 360) % 360;

    const bearings = ["NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    //const bearings = ["In front", "Right", "Behind", "Behind", "Behind", "Left", "In front", "In front"];

    var index:any = brng - 22.5;

    if(index < 0) index += 360;
    index = Math.floor(index/45);
    return bearings[index];

}