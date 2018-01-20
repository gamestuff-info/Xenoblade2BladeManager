$ = require('jquery');
require('bootstrap');
const tablesorter = require('./tablesorter');

$(document).ready(function () {
    $('#mercmission-list').tablesorter(tablesorter.settings({
        widgets: ['filter'],
        widgetOptions: {
            filter_columnFilters: true,
        },
    }));

    $('#delete-mission').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const missionName = button.data('mission-name');
        const missionDeleteUrl = button.data('mission-delete-path');

        const modal = $(this);
        modal.find('.delete-name').text(missionName);
        modal.find('.delete-link').attr('href', missionDeleteUrl);
    });

});
