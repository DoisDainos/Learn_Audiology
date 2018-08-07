/*
 * This file defines rules pertaining to masking.
 */

/*
 * Check two points to see if masking is required according to rule 1,
 * first point is from the test ear and is AC, second is from the non-test
 * ear an can be AC or BC.
 * Parameters:
 * - valueAC: value for air conduction point
 * - valueBC: value for bone conduction point
 */
function checkRule1(valueAC, valueAny) {
    if ((valueAC - valueAny) >= 40) {
        return true;
    }
    return false;
}

function checkRule2(valueAC, valueBC) {
    if ((valueAC - valueBC) >= 15) {
        return true;
    }
    return false;
}

/*
 * Check if masking required between two arrays of points with rule 1.
 * Returns an array of the indices of points to be masked.
 * Parameters:
 * - pointsAC: array of air conduction points (test ear)
 * - pointsAny: array of bone or air conduction points (non-test ear)
 */
function checkMaskingRule1(pointsAC, pointsAny) {
    var toMask = [];
    var minLength = pointsAC.length;
    if (pointsAny.length < pointsAC.length) {
        minLength = pointsAny.length;
    }
    for (var i=0; i<minLength; i++) {
        if (checkRule1(pointsAC[i], pointsAny[i])) {
            toMask.push(i);
        }
    }
    return toMask;
}

/*
 * Check if masking required between two arrays of points with rule 2.
 * Returns an array of the indices of points to be masked.
 * Parameters:
 * - pointsAC: array of air conduction points (test ear)
 * - pointsAny: array of bone conduction points (non-test ear)
 */
function checkMaskingRule2(pointsAC, pointsBC) {
    var toMask = [];
    var minLength = pointsAC.length;
    if (pointsBC.length < pointsAC.length) {
        minLength = pointsBC.length;
    }
    for (var i=0; i<minLength; i++) {
        if (checkRule2(pointsAC[i], pointsBC[i])) {
            toMask.push(i);
        }
    }
    return toMask;
}

/*
 * Find the test ear out of two points, the other ear will be the masked.
 * Parameters:
 * - pointLeft: left ear point
 * - pointRight: right ear point
 */
function findTestEar(pointLeft, pointRight) {
    if (pointLeft > pointRight) {
        return "left";
    }
    return "right";
}

/*
 * Find if masking has occured.
 */
function hasOvermasked(maskDB, stimDB) {
    return maskDB >= stimDB;
}

module.exports = {
    checkRule1: checkRule1,
    checkRule2: checkRule2,
    checkMaskingRule1: checkMaskingRule1,
    checkMaskingRule2: checkMaskingRule2,
    findTestEar: findTestEar,
    hasOvermasked: hasOvermasked
}
