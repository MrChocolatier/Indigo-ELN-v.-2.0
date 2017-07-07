angular
    .module('indigoeln')
    .controller('EditSolubilityController', EditSolubilityController);

function EditSolubilityController($uibModalInstance, solubility) {
    var vm = this;

    init();

    function init() {
        vm.solubility = getSolubility();
        vm.solubilityTypeSelect = [
            {
                name: 'Quantitative'
            },
            {
                name: 'Qualitative'
            }];

        vm.qualitativeSolubilitySelect = [
            {
                name: 'Soluble'
            },
            {
                name: 'Unsoluble'
            },
            {
                name: 'Precipitate'
            }];

        vm.unitSelect = [
            {
                name: 'g/ml'
            }];

        vm.operatorSelect = [
            {
                name: '>'
            },
            {
                name: '<'
            },
            {
                name: '='
            },
            {
                name: '~'
            }];

        vm.save = save;
        vm.cancel = cancel;
        vm.addSolvent = addSolvent;
        vm.remove = remove;
        vm.removeAll = removeAll;
    }

    function getSolubility() {
        var newSolubility = solubility || {};
        newSolubility.data = newSolubility.data || [];

        return newSolubility;
    }

    function addSolvent() {
        vm.solubility.data.push({
            solventName: {},
            type: {},
            value: {},
            comment: ''
        });
    }

    function remove(solvent) {
        vm.solubility.data = _.without(vm.solubility.data, solvent);
    }

    function removeAll() {
        vm.solubility.data = [];
    }

    function resultToString() {
        var solubilityStrings = _.map(vm.solubility.data, function(solubility) {
            var solvent = solubility.solventName && solubility.solventName.name ? solubility.solventName.name : null;
            var type = solubility.type && solubility.type.name ? solubility.type.name : null;
            var value = solubility.value && solubility.value.value ? solubility.value : null;
            var result = '';
            if (!type || !value || !solvent) {
                return '';
            }
            if (type === 'Quantitative') {
                result = value.operator.name + ' ' + value.value + ' ' + value.unit.name; // > 5 g/mL
            } else {
                result = value.value.name; // Unsoluble
            }

            return result + ' in ' + solvent; // in Acetic acid
        });

        return _.compact(solubilityStrings).join(', ');
    }

    function save() {
        vm.solubility.asString = resultToString();
        $uibModalInstance.close(vm.solubility);
    }

    function cancel() {
        $uibModalInstance.dismiss('cancel');
    }
}
