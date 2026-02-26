

export function snapToArr(snapshot:any) {
    var returnArr:any[] = [];

    snapshot.forEach(function(childSnapshot:any) {
        var item = childSnapshot.val();

        returnArr.push(item);
    });

    return returnArr;
};