require('tablesorter');

export function settings(custom = {}) {
    const defaults = {
        theme: 'bootstrap',
        sortReset: true,
        debug: true,
    };

    return Object.assign({}, defaults, custom);
}

export function pagerSettings(selector_prefix, custom = {}) {
    const defaults = {
        pager_countChildRows: false,
        pager_selectors: {
            container: '#' + selector_prefix + '-pager',
            first: '#' + selector_prefix + '-first',
            prev: '#' + selector_prefix + '-prev',
            next: '#' + selector_prefix + '-next',
            last: '#' + selector_prefix + '-last',
            gotoPage: '#' + selector_prefix + '-gotopage',
            pageDisplay: '#' + selector_prefix + '-pagedisplay',
            pageSize: '#' + selector_prefix + '-pagesize',
        },
        pager_output: '{startRow}-{endRow} / {filteredRows}',
        pager_updateArrows: true,
        pager_pageReset: 0,
        pager_size: 20,
    };

    return Object.assign({}, defaults, custom);
}
