require('symfony-collection/jquery.collection');

const defaults = {
    up: '<a class="btn btn-outline-info mb-2 mr-sm-2" href="#"><i class="fas fa-arrow-circle-up"></i></a>',
    down: '<a class="btn btn-outline-info mb-2 mr-sm-2" href="#"><i class="fas fa-arrow-circle-down"></i></a>',
    add: '<a class="btn btn-outline-success" href="#"><i class="fas fa-plus-circle"></i></a>',
    remove: '<a class="btn btn-outline-danger mb-2 mr-sm-2" href="#"><i class="fas fa-minus-circle"></i></a>',
    duplicate: '<a class="btn btn-outline-success mb-2 mr-sm-2" href="#"><i class="fas fa-copy"></i></a>',
    allow_up: false,
    allow_down: false,
    allow_add: true,
    allow_remove: true,
    allow_duplicate: false,
    add_at_the_end: true,
    elements_selector: '> fieldset',
};

export function settings(custom = {}) {
    return Object.assign({}, defaults, custom);
}

export function adjustRequirementsChildrenCount(collection, change) {
    const formId = collection.attr('id');
    const countElement = $('#' + formId + '-count');
    const oldVal = parseInt(countElement.text());
    countElement.text(oldVal + change);
}
