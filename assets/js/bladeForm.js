const $ = require('jquery');
require('popper.js');
require('bootstrap');
const collections = require('./collections');

$(document).ready(function () {
    $('#blade_form_affinityNodes').collection(collections.settings());

    $('#blade_form_isMerc').on('change', function () {
        $('#blade_form_mercTeamName').prop('disabled', !this.checked);
    });

    $('#blade_form_trust').tooltip({
        placement: 'right',
        title: 'Affinity maxed out',
        trigger: 'manual',
    }).on('change', function () {
        const selectedOption = $(this).find('option:selected');
        if (selectedOption.text() == 'S') {
            // Max out all affinity options
            const maxAffinity = $('#blade_form_affinityTotal').attr('value');
            $('#blade_form_affinity').attr('value', maxAffinity);

            // Max out all affinity nodes
            const affinityNodeList = $('#blade_form_affinityNodes');
            let elementPrefix;
            let maxLevel;
            for (let affinityNode of affinityNodeList.find('> fieldset')) {
                elementPrefix = $(affinityNode).find('[id^="blade_form_affinityNodes"]').first().attr('id') + '_';
                maxLevel = $(affinityNode).find('#' + elementPrefix + 'maxLevel').attr('value');
                $(affinityNode).find('#' + elementPrefix + 'level').attr('value', maxLevel);
            }

            // Tell the user what just happened.
            $(this).tooltip('show');
        }
    });
});
