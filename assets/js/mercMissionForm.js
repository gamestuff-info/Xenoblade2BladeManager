const $ = require('jquery');
const collections = require('./_collections');

$(document).ready(function () {
    $('#merc_mission_form_requirements_blade_class').collection(collections.settings({
        after_add: callbackAddElement,
        after_remove: callbackRemoveElement,
    }));
    $('#merc_mission_form_requirements_element').collection(collections.settings({
        after_add: callbackAddElement,
        after_remove: callbackRemoveElement,
    }));
    $('#merc_mission_form_requirements_field_skill').collection(collections.settings({
        after_add: callbackAddElement,
        after_remove: callbackRemoveElement,
    }));
    $('#merc_mission_form_requirements_gender').collection(collections.settings({
        after_add: callbackAddElement,
        after_remove: callbackRemoveElement,
    }));
    $('#merc_mission_form_requirements_strength').collection(collections.settings({
        after_add: callbackAddElement,
        after_remove: callbackRemoveElement,
    }));
    $('#merc_mission_form_requirements_weapon_class').collection(collections.settings({
        after_add: callbackAddElement,
        after_remove: callbackRemoveElement,
    }));
});

function callbackAddElement(collection, element) {
    collections.adjustRequirementsChildrenCount(collection, 1);
}

function callbackRemoveElement(collection, element) {
    collections.adjustRequirementsChildrenCount(collection, -1);
}
