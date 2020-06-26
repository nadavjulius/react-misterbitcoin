export const utilService = {
    getRandomColor,
    makeId,
    dynamicSort
}

function getRandomColor() {
    const colors = [ 
        '#00ffff', '#7FFF00', '#DC143C', '#00008B', '#8B008B', '#9932CC', '#FF8C00', '#8B0000', '#1E90FF', '#FFD700', '#ADFF2F', '#7CFC00', '#FF00FF',
        '#9370DB', '#C71585', '#800080', '#40E0D0', '#ff0000', '#ffff00', '#ee82EE', '#9ACD32', '#00FF7F', '#2E8B57', '#663399', '#4169E1', '#808000',
        '#2F4F4F', '#FF1493', '#DAA520', '#BA55D3', '#7B68EE', '#C71585', '#66CDAA', '#00FA9A', '#48D1CC', '#FF4500', '#8B4513', '#A0522D', '#FF6347'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}