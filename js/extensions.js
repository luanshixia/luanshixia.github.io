/**
 * extensions.js
 */

String.format = function (format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
};

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
};

Array.prototype.cross = function (another, selector) {
    var arr = [], i, j;
    for (i = 0; i < this.length; i++) {
        for (j = 0; j < another.length; j++) {
            arr.push(selector(this[i], another[j]));
        }
    }
    return arr;
};

Array.prototype.fold = function (state, folder) {
    var i;
    for (i = 0; i < this.length; i++) {
        state = folder(state, this[i]);
    }
    return state;
};

Array.range = function (start, count) {
    var arr = [], i;
    for (i = 0; i < count; i++) {
        arr.push(start + i);
    }
    return arr;
};