/**
 * Jax - a simple Json Accessor library
 * Usage: Jax.get() and Jax.set()
 *
 * Copyright (C) 2018  Itay Avtalyon <itay@imoogi.com>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

function Jax() {
}

/**
 * Returns the value specified by the path or the default value if path resolves to undefined
 * @param json the object containing the data
 * @param path the path of the value we are interested in
 * @param defaultValue the default value to return if not found
 * @returns {*} the value defined by the path or the default value
 */
Jax.get = function (json, path, defaultValue) {
    var pathArr = path.split(".");
    var obj = json;
    var dontStop = 1;
    var i, j;

    for (i = 0, j = pathArr.length; i < j && dontStop === 1; i++) {
        obj = obj[pathArr[i]];
        if (obj === undefined) {
            dontStop = 0;
        }
    }

    return obj || defaultValue;
};

/**
 * Creates a clone of the object, sets a value according to the path and returns the clone
 * @param json The original to be cloned and modified (the original remains untouched)
 * @param path The JSON path where to save the value. It will be created if it doesn't exist
 * @param value The value to be set in the cloned object
 * @returns {*} The cloned object with the modifications
 */
Jax.set = function (json, path, value) {
    var pathArr = path.split(".");
    var obj;
    var i, j;
    var newObj;
    var key;

    if (typeof Object.assign === "function") {
        newObj = Object.assign({}, json);
    } else {
        newObj = {};
        for (key in json) {
            // Calling hasOwnProperty ensures we are calling the original function we want
            if (Object.prototype.hasOwnProperty.call(json, key)) {
                newObj[key] = json[key];
            }
        }
    }

    if (newObj) {
        obj = newObj;
        for (i = 0, j = pathArr.length - 1; i++) {
            if (obj[pathArr[i]] === undefined) {
                obj[pathArr[i]] = {};
            }
            obj = obj[pathArr[i]];
        }

        obj[pathArr[pathArr.length - 1]] = value;
    }

    return newObj;
};
