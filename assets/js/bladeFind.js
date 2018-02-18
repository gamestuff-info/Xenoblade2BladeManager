const $ = require('jquery');
const collections = require('./_collections');
const bladeList = require('./_bladeList');

$(document).ready(function () {
    bladeList.prepareBladeList();

    $('#blade_find_queries').collection(collections.settings({
        allow_up: true,
        allow_down: true,
        add_at_the_end: false,
        add: '<a class="btn btn-outline-success mb-2 mr-sm-2" href="#"><i class="fas fa-plus-circle"></i></a>',
        min: 1,
        init_with_n_elements: 1,
        before_init: collectionBeforeInit,
        after_add: collectionAfterAdd,
    }));

    function collectionBeforeInit(fullCollection) {
        $(fullCollection).children('fieldset.form-group').each(function () {
            collectionAfterAdd(fullCollection, this);
        });
    }

    function collectionAfterAdd(fullCollection, queryElement) {
        const fieldSelector = $(queryElement).find('select[id$=field]');
        const activeFieldName = fieldSelector.val();
        showRelevantField(activeFieldName, queryElement);

        // Toggle the shown field when the field selector changes
        fieldSelector.change(function () {
            showRelevantField($(this).val(), queryElement);
        });
    }

    function showRelevantField(fieldName, queryElement) {
        const fields = [
            'driver',
            'active',
            'element',
            'role',
            'weaponClass',
            'strength',
            'affinity',
            'trust',
            'rarity',
            'fieldSkill',
            'isMerc',
            'canBeReleased',
        ];
        // Hide all fields
        for (const thisFieldName of fields) {
            const field = $(queryElement).find('*[id$="' + thisFieldName + '"]').parents('.form-group').first();
            field.toggleClass('d-none', thisFieldName != fieldName);
            field.find(':input').prop('required', thisFieldName == fieldName);
        }
    }
});
