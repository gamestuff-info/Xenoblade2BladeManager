const $ = require('jquery');
require('popper.js');
require('bootstrap');

$('#lightbox').on('show.bs.modal', function (event) {
    const thumbnail = $(event.relatedTarget);
    const imgSrc = thumbnail.data('image');
    const modal = $(this);

    modal.find('.modal-body img').attr('src', imgSrc);
    modal.modal('handleUpdate');
});
