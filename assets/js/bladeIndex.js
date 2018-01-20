$ = require('jquery');
require('bootstrap');
const tablesorter = require('./tablesorter');

$(document).ready(function () {
    $('#blade-list').tablesorter(tablesorter.settings({
        widgets: ['filter'],
        widgetOptions: {
            filter_columnFilters: true,
            filter_functions: {
                // Trust
                6: {
                    'E': function (e, n, f, i, $r, c, data) {
                        return e == 6;
                    },
                    'D': function (e, n, f, i, $r, c, data) {
                        return e == 5;
                    },
                    'C': function (e, n, f, i, $r, c, data) {
                        return e == 4;
                    },
                    'B': function (e, n, f, i, $r, c, data) {
                        return e == 3;
                    },
                    'A': function (e, n, f, i, $r, c, data) {
                        return e == 2;
                    },
                    'S': function (e, n, f, i, $r, c, data) {
                        return e == 1;
                    },
                },

                // Merc Mission
                8: {
                    'No': function (e, n, f, i, $r, c, data) {
                        return e == '';
                    },
                    'Yes': function (e, n, f, i, $r, c, data) {
                        return /.+/.test(e);
                    },
                },
            },
        },
    }));

    $('#delete-blade').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const bladeName = button.data('blade-name');
        const bladeDeleteUrl = button.data('blade-delete-path');

        const modal = $(this);
        modal.find('.delete-name').text(bladeName);
        modal.find('.delete-link').attr('href', bladeDeleteUrl);
    });

});
