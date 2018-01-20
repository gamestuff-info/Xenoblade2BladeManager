require('tablesorter');

const defaults = {
    theme: 'bootstrap',
    sortReset: true,
    debug: true,
};

export function settings(custom = {}) {
    return Object.assign({}, defaults, custom);
}
