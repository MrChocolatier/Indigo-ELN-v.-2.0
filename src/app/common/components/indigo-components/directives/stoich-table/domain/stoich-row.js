var StoichField = require('./stoich-field');
var fieldTypes = require('./field-types');
var calculationUtil = require('../calculation/calculation-util');

function StoichRow() {
    _.defaults(this, getDefaultStoichRow());
}

StoichRow.prototype = {
    isSolventRow: isSolventRow,
    isValuePresent: isValuePresent,
    areValuesPresent: areValuesPresent,
    isLimiting: isLimiting,
    getResetFieldForDensity: getResetFieldForDensity,
    getResetFieldsForSolvent: getResetFieldsForSolvent,
    getResetFieldForMolarity: getResetFieldForMolarity,
    getResetFieldsForMol: getResetFieldsForMol,
    getResetFieldsForWeight: getResetFieldsForWeight,
    updateMolWeight: updateMolWeight,
    updateVolume: updateVolume,
    updateEq: updateEq,
    updateEqDependingOnLimitingEq: updateEqDependingOnLimitingEq,
    updateMol: updateMol,
    setComputedMolWeight: setComputedMolWeight,
    setComputedVolume: setComputedVolume,
    setComputedWeight: setComputedWeight,
    setComputedMol: setComputedMol,
    setDefaultValues: setDefaultValues,
    setEntered: setEntered,
    setReadonly: setReadonly,
    resetFields: resetFields,
    resetEntered: resetEntered,
    clear: clear,
    isMolWeightPresent: isMolWeightPresent,
    isMolPresent: isMolPresent,
    isWeightPresent: isWeightPresent,
    isVolumePresent: isVolumePresent,
    isMolarityPresent: isMolarityPresent,
    isDensityPresent: isDensityPresent,
    isWeightManuallyEntered: isWeightManuallyEntered,
    isVolumeManuallyEntered: isVolumeManuallyEntered
};

StoichRow.prototype.constructor = StoichRow;
StoichRow.fromJson = fromJson;

function updateMolWeight() {
    if (!this.molWeight.value && this.mol.value && this.weight.value) {
        this.resetEntered([fieldTypes.molWeight]);
        this.molWeight.value = calculationUtil.computeMolWeight(this.weight.value, this.mol.value);
        this.molWeight.originalValue = this.molWeight.value;
    }
}

// TODO: refactor
function updateVolume() {
    if (this.molarity.value && this.mol.value) {
        this.volume.value = calculationUtil.computeVolumeByMolarity(this.mol.value, this.molarity.value);
    } else if (this.density.value && this.weight.value) {
        this.volume.value = calculationUtil.computeVolumeByDensity(this.weight.value, this.density.value);
    }

    if (this.weight.entered || this.mol.entered) {
        this.resetEntered([fieldTypes.volume]);
    }
}

function updateEq(limitingRow) {
    var isArgsExist = limitingRow && this.mol.value && limitingRow.mol.value;
    var canUpdateEq = this.weight.entered || this.mol.entered || this.molarity.entered || this.density.entered;

    if (isArgsExist && canUpdateEq) {
        this.resetEntered([fieldTypes.eq]);
        this.eq.value = calculationUtil.computeEq(this.mol.value, limitingRow.mol.value);
        this.eq.prevValue = this.eq.value;
    }
}

function updateEqDependingOnLimitingEq(limitingRow) {
    this.updateEq(limitingRow);
    this.eq.value = calculationUtil.multiply(this.eq.value, limitingRow.eq.value);
    this.eq.prevValue = this.eq.value;
}

function updateMol(mol, callback) {
    this.mol.value = this.isSolventRow() ? 0 : mol;

    if (callback) {
        callback(this);
    }
}

function setDefaultValues(fields) {
    var self = this;
    var defaultFields = getDefaultStoichRow();

    _.forEach(fields, function(id) {
        self[id] = defaultFields[id];
    });
}

function setEntered(field) {
    this[field].entered = true;
}

// TODO: maybe it useless? just setDefaultValues
function resetEntered(fields) {
    var self = this;

    _.forEach(fields, function(id) {
        self[id].entered = false;
    });
}

function isSolventRow() {
    return this.rxnRole.name === 'SOLVENT';
}

function isValuePresent(field) {
    return this[field].value;
}

function areValuesPresent(fields) {
    var self = this;

    return _.every(fields, function(fieldId) {
        return self[fieldId].value;
    });
}

function isLimiting() {
    return this.limiting;
}

function getResetFieldForDensity() {
    if (!this.volume.entered) {
        return fieldTypes.volume;
    }

    if (!this.weight.entered) {
        return fieldTypes.weight;
    }
}

function getResetFieldForMolarity() {
    if (!this.volume.entered) {
        return fieldTypes.volume;
    }

    if (!this.mol.entered) {
        return fieldTypes.mol;
    }
}

function getResetFieldsForWeight() {
    var fields = [fieldTypes.mol, fieldTypes.eq];

    if (!this.volume.entered) {
        fields.push(fieldTypes.volume);
    }

    return fields;
}

function getResetFieldsForMol() {
    var fields = [fieldTypes.weight, fieldTypes.eq];

    if (!this.volume.entered) {
        fields.push(fieldTypes.volume);
    }

    return fields;
}

function setComputedMolWeight(molWeight, originalValue, callback) {
    this.molWeight.value = molWeight;
    this.resetEntered([fieldTypes.molWeight]);

    if (callback) {
        callback(this);
    }

    this.molWeight.originalValue = originalValue;
}

function setComputedVolume(volume, callback) {
    this.volume.value = volume;
    this.resetEntered([fieldTypes.volume]);

    if (callback) {
        callback(this);
    }
}

function setComputedWeight(weight, callback) {
    this.weight.value = weight;
    this.resetEntered([fieldTypes.weight]);

    if (callback) {
        callback(this);
    }
}

function setComputedMol(mol, callback) {
    // TODO: set limiting true if limitingRow doesn't exist
    this.mol.value = mol;
    this.resetEntered([fieldTypes.mol]);

    if (callback) {
        callback(this);
    }
}

function resetFields(fields, callback) {
    this.setDefaultValues(fields);

    if (callback) {
        callback(this);
    }
}

function setReadonly(fields, isReadonly) {
    var self = this;

    _.forEach(fields, function(id) {
        self[id].readonly = isReadonly;
    });
}

function clear() {
    _.assign(this, getDefaultStoichRow());
}

function getResetFieldsForSolvent() {
    return [
        fieldTypes.weight,
        fieldTypes.mol,
        fieldTypes.eq,
        fieldTypes.molarity,
        fieldTypes.density,
        fieldTypes.stoicPurity,
        fieldTypes.saltCode,
        fieldTypes.saltEq
    ];
}

function isMolPresent() {
    return this.mol.value;
}

function isWeightPresent() {
    return this.weight.value;
}

function isMolWeightPresent() {
    return this.molWeight.value;
}

function isVolumePresent() {
    return this.volume.value;
}

function isMolarityPresent() {
    return this.molarity.value;
}

function isDensityPresent() {
    return this.density.value;
}

function isWeightManuallyEntered() {
    return this.weight.entered;
}

function isVolumeManuallyEntered() {
    return this.volume.entered;
}

function fromJson(json) {
    var defaultRow = new StoichRow();

    _.forEach(json, function(value, key) {
        if (fieldTypes.isMolWeight(key)) {
            defaultRow[key].value = value.value;
            defaultRow[key].originalValue = value.value;
            defaultRow[key].entered = value.entered;
        } else if (fieldTypes.isStoichField(key)) {
            defaultRow[key].value = value.value;
            defaultRow[key].entered = value.entered;
        } else if (fieldTypes.isEq(key) || fieldTypes.isStoicPurity(key)) {
            defaultRow[key].value = value.value;
            defaultRow[key].prevValue = value.prevValue ? value.prevValue : value.value;
            defaultRow[key].entered = value.entered;
        } else if (fieldTypes.isRxnRole(key)) {
            defaultRow[key].name = value.name;

            if (_.has(json, fieldTypes.prevRxnRole)) {
                defaultRow.prevRxnRole.name = json.prevRxnRole.name;
            } else {
                defaultRow.prevRxnRole.name = defaultRow[key].name;
            }
        }
    });

    // Replace default values and add missing from json
    _.assignInWith(defaultRow, json, function(defaultValue, valueFromJson) {
        return _.isNull(defaultValue) || _.isUndefined(defaultValue)
            ? valueFromJson
            : defaultValue;
    });

    return defaultRow;
}

function getDefaultStoichRow() {
    return {
        compoundId: null,
        chemicalName: null,
        fullNbkBatch: null,
        molWeight: {value: 0, originalValue: 0, entered: false},
        weight: new StoichField(0, 'mg'),
        volume: new StoichField(0, 'mL'),
        mol: new StoichField(0, 'mmol'),
        eq: {value: 1, prevValue: 1, entered: false},
        limiting: false,
        rxnRole: {name: 'REACTANT'},
        prevRxnRole: {name: 'REACTANT'},
        density: new StoichField(0, 'g/mL'),
        molarity: new StoichField(0, 'M'),
        // TODO: rename to purity
        stoicPurity: {value: 100, prevValue: 100, entered: false},
        formula: null,
        saltCode: {name: '00 - Parent Structure', value: '0', regValue: '00', weight: 0},
        saltEq: {value: 0},
        loadFactor: null,
        hazardComments: null,
        comments: null
    };
}

module.exports = StoichRow;
