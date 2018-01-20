webpackJsonp([3],{

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

const $ = __webpack_require__(0);
__webpack_require__(6);
__webpack_require__(1);
const collections = __webpack_require__(4);

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


/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (immutable) */ __webpack_exports__["settings"] = settings;
/* harmony export (immutable) */ __webpack_exports__["adjustRequirementsChildrenCount"] = adjustRequirementsChildrenCount;
__webpack_require__(5);

const defaults = {
    up: '<a class="btn btn-outline-info mb-2 mr-sm-2" href="#"><i class="fas fa-arrow-circle-up"></i></a>',
    down: '<a class="btn btn-outline-info mb-2 mr-sm-2" href="#"><i class="fas fa-arrow-circle-down"></i></a>',
    add: '<a class="btn btn-outline-success" href="#"><i class="fas fa-plus-circle"></i></a>',
    remove: '<a class="btn btn-outline-danger mb-2 mr-sm-2" href="#"><i class="fas fa-minus-circle"></i></a>',
    duplicate: '<a class="btn btn-outline-success mb-2 mr-sm-2" href="#"><span class="fa-layers fa-fw"><i class="fas fa-circle"></i><i class="fa-inverse fas fa-copy" data-fa-transform="shrink-10"></i></span></a>',
    allow_up: false,
    allow_down: false,
    allow_add: true,
    allow_remove: true,
    allow_duplicate: false,
    add_at_the_end: true,
    elements_selector: '> fieldset',
};

function settings(custom = {}) {
    return Object.assign({}, defaults, custom);
}

function adjustRequirementsChildrenCount(collection, change) {
    const formId = collection.attr('id');
    const countElement = $('#' + formId + '-count');
    const oldVal = parseInt(countElement.text());
    countElement.text(oldVal + change);
}

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*
 * jquery.collection.js
 *
 * Copyright (c) 2042 alain tiemblo <alain at fuz dot org>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

;
(function ($) {

    $.fn.collection = function (options) {

        var defaults = {
            container: 'body',
            allow_up: true,
            up: '<a href="#">&#x25B2;</a>',
            before_up: function (collection, element) {
                return true;
            },
            after_up: function (collection, element) {
                return true;
            },
            allow_down: true,
            down: '<a href="#">&#x25BC;</a>',
            before_down: function (collection, element) {
                return true;
            },
            after_down: function (collection, element) {
                return true;
            },
            allow_add: true,
            add: '<a href="#">[ + ]</a>',
            before_add: function (collection, element) {
                return true;
            },
            after_add: function (collection, element) {
                return true;
            },
            allow_remove: true,
            remove: '<a href="#">[ - ]</a>',
            before_remove: function (collection, element) {
                return true;
            },
            after_remove: function (collection, element) {
                return true;
            },
            allow_duplicate: false,
            duplicate: '<a href="#">[ # ]</a>',
            before_duplicate: function (collection, element) {
                return true;
            },
            after_duplicate: function (collection, element) {
                return true;
            },
            before_init: function (collection) {
            },
            after_init: function (collection) {
            },
            min: 0,
            max: 100,
            add_at_the_end: false,
            prefix: 'collection',
            prototype_name: '__name__',
            name_prefix: null,
            elements_selector: '> div',
            elements_parent_selector: '%id%',
            children: null,
            init_with_n_elements: 0,
            hide_useless_buttons: true,
            drag_drop: true,
            drag_drop_options: {
                'placeholder': 'ui-state-highlight'
            },
            drag_drop_start: function (event, ui) {
                return true;
            },
            drag_drop_update: function (event, ui) {
                return true;
            },
            custom_add_location: false,
            fade_in: true,
            fade_out: true,
            position_field_selector: null,
            preserve_names: false
        };

        // used to generate random id attributes when required and missing
        var randomNumber = function () {
            var rand = '' + Math.random() * 1000 * new Date().getTime();
            return rand.replace('.', '').split('').sort(function () {
                return 0.5 - Math.random();
            }).join('');
        };

        // return an element's id, after generating one when missing
        var getOrCreateId = function (prefix, obj) {
            if (!obj.attr('id')) {
                var generated_id;
                do {
                    generated_id = prefix + '_' + randomNumber();
                } while ($('#' + generated_id).length > 0);
                obj.attr('id', generated_id);
            }
            return obj.attr('id');
        };

        // return a field value whatever the field type
        var getFieldValue = function (selector) {
            try {
                var jqElem = $(selector);
            } catch (e) {
                return null;
            }
            if (jqElem.length === 0) {
                return null;
            } else if (jqElem.is('input[type="checkbox"]')) {
                return (jqElem.prop('checked') === true ? true : false);
            } else if (jqElem.is('input[type="radio"]') && jqElem.attr('name') !== undefined) {
                return $('input[name="' + jqElem.attr('name') + '"]:checked').val();
            } else if (jqElem.prop('value') !== undefined) {
                return jqElem.val();
            } else {
                return jqElem.html();
            }
        };

        // set a field value in accordance to the field type
        var putFieldValue = function (selector, value, physical) {
            try {
                var jqElem = $(selector);
            } catch (e) {
                return;
            }
            if (jqElem.length === 0) {
                return;
            } else if (jqElem.is('input[type="checkbox"]')) {
                if (value) {
                    jqElem.attr('checked', true);
                } else {
                    jqElem.removeAttr('checked');
                }
            } else if (jqElem.prop('value') !== undefined) {
                if (physical) {
                    jqElem.attr('value', value);
                } else {
                    jqElem.val(value);
                }
            } else {
                jqElem.html(value);
            }
        };

        // a callback set in an event will be considered failed if it
        // returns false, null, or 0.
        var trueOrUndefined = function (value) {
            return undefined === value || value;
        };

        // used to change element indexes in arbitary id attributes
        var pregQuote = function (string) {
            return (string + '').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
        };

        // if we need to change CollectionType_field_42_value to CollectionType_field_84_value, this method
        // will change it in id="CollectionType_field_42_value", but also data-id="CollectionType_field_42_value"
        // or anywhere else just in case it could be used otherwise.
        var replaceAttrData = function (elements, index, toReplace, replaceWith) {

            var replaceAttrDataNode = function (node) {
                var jqNode = $(node);
                if (typeof node === 'object' && 'attributes' in node) {
                    $.each(node.attributes, function (i, attrib) {
                        if ($.type(attrib.value) === 'string') {
                            jqNode.attr(attrib.name.replace(toReplace, replaceWith), attrib.value.replace(toReplace, replaceWith));
                        }
                    });
                }
                if (jqNode.length > 0) {
                    $.each(jqNode.data(), function (name, value) {
                        if ($.type(value) === 'string') {
                            jqNode.data(name.replace(toReplace, replaceWith), value.replace(toReplace, replaceWith));
                        }
                    });
                }
            };

            var element = elements.eq(index);
            replaceAttrDataNode(element[0]);
            element.find('*').each(function () {
                replaceAttrDataNode(this);
            });
        };

        // replace element names and indexes in the collection, in Symfony, names are always in format
        // CollectionType[field][42][value] and ids are in format CollectionType_field_42_value;
        // so we need to change both.
        var changeElementIndex = function (collection, elements, settings, index, oldIndex, newIndex) {
            var toReplace = new RegExp(pregQuote(settings.name_prefix + '[' + oldIndex + ']'), 'g');
            var replaceWith = settings.name_prefix + '[' + newIndex + ']';

            if (settings.children) {
                $.each(settings.children, function (key, child) {
                    var childCollection = collection.find(child.selector).eq(index);
                    var childSettings = childCollection.data('collection-settings');
                    if (childSettings) {
                        childSettings.name_prefix = childSettings.name_prefix.replace(toReplace, replaceWith);
                        childCollection.data('collection-settings', childSettings);
                    }
                });
            }

            replaceAttrData(elements, index, toReplace, replaceWith);

            toReplace = new RegExp(pregQuote(collection.attr('id') + '_' + oldIndex), 'g');
            replaceWith = collection.attr('id') + '_' + newIndex;

            if (settings.children) {
                $.each(settings.children, function (key, child) {
                    var childCollection = collection.find(child.selector).eq(index);
                    var childSettings = childCollection.data('collection-settings');
                    if (childSettings) {
                        childSettings.elements_parent_selector = childSettings.elements_parent_selector.replace(toReplace, replaceWith);
                        childSettings.elements_selector = childSettings.elements_selector.replace(toReplace, replaceWith);
                        childSettings.prefix = childSettings.prefix.replace(toReplace, replaceWith);
                        childCollection.data('collection-settings', childSettings);
                    }
                });
            }

            replaceAttrData(elements, index, toReplace, replaceWith);
        };

        // same as above, but will replace element names and indexes in an html string instead
        // of in a dom element.
        var changeHtmlIndex = function (collection, settings, html, oldIndex, newIndex, oldKey, newKey) {
            var toReplace = new RegExp(pregQuote(settings.name_prefix + '[' + oldKey + ']'), 'g');
            var replaceWith = settings.name_prefix + '[' + newKey + ']';
            html = html.replace(toReplace, replaceWith);

            toReplace = new RegExp(pregQuote(collection.attr('id') + '_' + oldIndex), 'g');
            replaceWith = collection.attr('id') + '_' + newIndex;
            html = html.replace(toReplace, replaceWith);

            return html;
        };

        // sometimes, setting a value will only be made in memory and not
        // physically in the dom; and we need the full dom when we want
        // to duplicate a field.
        var putFieldValuesInDom = function (element) {
            $(element).find(':input').each(function (index, inputObj) {
                putFieldValue(inputObj, getFieldValue(inputObj), true);
            });
        };

        // this method does the whole magic: in a collection, if we want to
        // move elements and keep element positions in the backend, we should
        // either move element names or element contents, but not both! thus,
        // if you just move elements in the dom, you keep field names and data
        // attached and nothing will change in the backend.
        var swapElements = function (collection, elements, oldIndex, newIndex) {

            var settings = collection.data('collection-settings');

            if (!settings.position_field_selector && !settings.preserve_names) {
                changeElementIndex(collection, elements, settings, oldIndex, oldIndex, '__swap__');
                changeElementIndex(collection, elements, settings, newIndex, newIndex, oldIndex);
                changeElementIndex(collection, elements, settings, oldIndex, '__swap__', newIndex);
            }

            elements.eq(oldIndex).insertBefore(elements.eq(newIndex));
            if (newIndex > oldIndex) {
                elements.eq(newIndex).insertBefore(elements.eq(oldIndex));
            } else {
                elements.eq(newIndex).insertAfter(elements.eq(oldIndex));
            }

            return collection.find(settings.elements_selector);
        };

        // moving an element down of 3 rows means increasing its index of 3, and
        // decreasing the 2 ones between of 1. Example: 0-A 1-B 2-C 3-D:
        // moving B to 3 becomes 0-A 1-C 2-D 3-B
        var swapElementsUp = function (collection, elements, settings, oldIndex, newIndex) {
            for (var i = oldIndex + 1; (i <= newIndex); i++) {
                elements = swapElements(collection, elements, i, i - 1);
            }
            return collection.find(settings.elements_selector);
        };

        // moving an element up of 3 rows means decreasing its index of 3, and
        // increasing the 2 ones between of 1. Example: 0-A 1-B 2-C 3-D:
        // moving D to 1 becomes 0-A 1-D 2-B 3-C
        var swapElementsDown = function (collection, elements, settings, oldIndex, newIndex) {
            for (var i = oldIndex - 1; (i >= newIndex); i--) {
                elements = swapElements(collection, elements, i, i + 1);
            }
            return collection.find(settings.elements_selector);
        };

        // if we create an element at position 2, all element indexes from 2 to N
        // should be increased. for example, in 0-A 1-B 2-C 3-D, adding X at position
        // 1 will create 0-A 1-X 2-B 3-C 4-D
        var shiftElementsUp = function (collection, elements, settings, index) {
            for (var i = index + 1; i < elements.length; i++) {
                elements = swapElements(collection, elements, i - 1, i);
            }
            return collection.find(settings.elements_selector);
        };

        // if we remove an element at position 3, all element indexes from 3 to N
        // should be decreased. for example, in 0-A 1-B 2-C 3-D, removing B will create
        // 0-A 1-C 2-D
        var shiftElementsDown = function (collection, elements, settings, index) {
            for (var i = elements.length - 2; i > index; i--) {
                elements = swapElements(collection, elements, i + 1, i);
            }
            return collection.find(settings.elements_selector);
        };

        // this method creates buttons for each action, according to all options set
        // (buttons enabled, minimum/maximum of elements not yet reached, rescue
        // button creation when no more elements are remaining...)
        var dumpCollectionActions = function (collection, settings, isInitialization, event) {
            var elementsParent = $(settings.elements_parent_selector);
            var init = elementsParent.find('.' + settings.prefix + '-tmp').length === 0;
            var elements = collection.find(settings.elements_selector);

            // add a rescue button that will appear only if collection is emptied
            if (settings.allow_add) {
                if (init) {
                    elementsParent.append('<span class="' + settings.prefix + '-tmp"></span>');
                    if (settings.add) {
                        elementsParent.append(
                            $(settings.add)
                                .addClass(settings.prefix + '-action ' + settings.prefix + '-rescue-add')
                                .data('collection', collection.attr('id'))
                        );
                    }
                }
            }

            // initializes the collection with a minimal number of elements
            if (isInitialization) {
                collection.data('collection-offset', 0);

                var container = $(settings.container);
                var button = collection.find('.' + settings.prefix + '-add, .' + settings.prefix + '-rescue-add, .' + settings.prefix + '-duplicate').first();
                while (elements.length < settings.init_with_n_elements) {
                    var element = elements.length > 0 ? elements.last() : undefined;
                    var index = elements.length - 1;
                    elements = doAdd(container, button, collection, settings, elements, element, index, false);
                }

                collection.data('collection-offset', elements.length);
            }

            // make buttons appear/disappear in each elements of the collection according to options
            // (enabled, min/max...) and logic (for example, do not put a move up button on the first
            // element of the collection)
            elements.each(function (index) {
                var element = $(this);

                if (isInitialization) {
                    element.data('index', index);
                }

                var actions = element.find('.' + settings.prefix + '-actions').addBack().filter('.' + settings.prefix + '-actions');
                if (actions.length === 0) {
                    actions = $('<div class="' + settings.prefix + '-actions"></div>');
                    element.append(actions);
                }

                var delta = 0;
                if (event === 'remove' && settings.fade_out) {
                    delta = 1;
                }

                var buttons = [
                    {
                        'enabled': settings.allow_remove,
                        'selector': settings.prefix + '-remove',
                        'html': settings.remove,
                        'condition': elements.length - delta > settings.min
                    }, {
                        'enabled': settings.allow_up,
                        'selector': settings.prefix + '-up',
                        'html': settings.up,
                        'condition': elements.length - delta > 1 && elements.index(element) - delta > 0
                    }, {
                        'enabled': settings.allow_down,
                        'selector': settings.prefix + '-down',
                        'html': settings.down,
                        'condition': elements.length - delta > 1 && elements.index(element) !== elements.length - 1
                    }, {
                        'enabled': settings.allow_add && !settings.add_at_the_end && !settings.custom_add_location,
                        'selector': settings.prefix + '-add',
                        'html': settings.add,
                        'condition': elements.length - delta < settings.max
                    }, {
                        'enabled': settings.allow_duplicate,
                        'selector': settings.prefix + '-duplicate',
                        'html': settings.duplicate,
                        'condition': elements.length - delta < settings.max
                    }
                ];

                $.each(buttons, function (i, button) {
                    if (button.enabled) {
                        var action = element.find('.' + button.selector);
                        if (action.length === 0 && button.html) {
                            action = $(button.html)
                                .appendTo(actions)
                                .addClass(button.selector);
                        }
                        if (button.condition) {
                            action.removeClass(settings.prefix + '-action-disabled');
                            if (settings.hide_useless_buttons) {
                                action.css('display', '');
                            }
                        } else {
                            action.addClass(settings.prefix + '-action-disabled');
                            if (settings.hide_useless_buttons) {
                                action.css('display', 'none');
                            }
                        }
                        action
                            .addClass(settings.prefix + '-action')
                            .data('collection', collection.attr('id'))
                            .data('element', getOrCreateId(collection.attr('id') + '_' + index, element));
                    } else {
                        element.find('.' + button.selector).css('display', 'none');
                    }
                });

            }); // elements.each

            // make the rescue button appear / disappear according to options (add_at_the_end) and
            // logic (no more elements on the collection)
            if (settings.allow_add) {

                var delta = 0;
                if (event === 'remove' && settings.fade_out) {
                    delta = 1;
                }

                var rescueAdd = collection.find('.' + settings.prefix + '-rescue-add').css('display', '').removeClass(settings.prefix + '-action-disabled');
                var adds = collection.find('.' + settings.prefix + '-add');
                if (!settings.add_at_the_end && adds.length > delta || settings.custom_add_location) {
                    rescueAdd.css('display', 'none');
                } else if (event === 'remove' && settings.fade_out) {
                    rescueAdd.css('display', 'none');
                    rescueAdd.fadeIn('fast');
                }
                if (elements.length - delta >= settings.max) {
                    rescueAdd.addClass(settings.prefix + '-action-disabled');
                    if (settings.hide_useless_buttons) {
                        collection.find('.' + settings.prefix + '-add, .' + settings.prefix + '-rescue-add, .' + settings.prefix + '-duplicate').css('display', 'none');
                    }
                }
            }

        }; // dumpCollectionActions

        // this plugin supports nested collections, and this method enables them when the
        // parent collection is initialized. see
        // http://symfony-collection.fuz.org/symfony3/advanced/collectionOfCollections
        var enableChildrenCollections = function (collection, element, settings) {
            if (settings.children) {
                $.each(settings.children, function (index, childrenSettings) {
                    if (!childrenSettings.selector) {
                        console.log("jquery.collection.js: given collection " + collection.attr('id') + " has children collections, but children's root selector is undefined.");
                        return true;
                    }
                    if (element !== null) {
                        element.find(childrenSettings.selector).collection(childrenSettings);
                    } else {
                        collection.find(childrenSettings.selector).collection(childrenSettings);
                    }
                });
            }
        };

        // this method handles a click on "add" buttons, it increases all following element indexes of
        // 1 position and insert a new one in the index that becomes free. if click has been made on a
        // "duplicate" button, all element values are then inserted. finally, callbacks let user cancel
        // those actions if needed.
        var doAdd = function (container, that, collection, settings, elements, element, index, isDuplicate) {
            if (elements.length < settings.max && (isDuplicate && trueOrUndefined(settings.before_duplicate(collection, element)) || trueOrUndefined(settings.before_add(collection, element)))) {
                var prototype = collection.data('prototype');
                var freeIndex = collection.data('collection-offset');

                collection.data('collection-offset', freeIndex + 1);

                if (index === -1) {
                    index = elements.length - 1;
                }
                var regexp = new RegExp(pregQuote(settings.prototype_name), 'g');
                var freeKey = freeIndex;

                if (settings.preserve_names) {
                    freeKey = collection.data('collection-free-key');

                    if (freeKey === undefined) {
                        freeKey = findFreeNumericKey(settings, elements);
                    }

                    collection.data('collection-free-key', freeKey + 1);
                }

                var code = $(prototype.replace(regexp, freeKey)).data('index', freeIndex);
                setRightPrefix(settings, code);

                var elementsParent = $(settings.elements_parent_selector);
                var tmp = elementsParent.find('> .' + settings.prefix + '-tmp');
                var id = $(code).find('[id]').first().attr('id');

                if (isDuplicate) {
                    var oldElement = elements.eq(index);
                    putFieldValuesInDom(oldElement);
                    var oldHtml = $("<div/>").append(oldElement.clone()).html();
                    var oldIndex = settings.preserve_names || settings.position_field_selector ? oldElement.data('index') : index;
                    var oldKey = settings.preserve_names ? getElementKey(settings, oldElement) : oldIndex;
                    var newHtml = changeHtmlIndex(collection, settings, oldHtml, oldIndex, freeIndex, oldKey, freeKey);

                    code = $('<div/>').html(newHtml).contents().data('index', freeIndex);
                    if (settings.fade_in) {
                        code.hide();
                    }
                    tmp.before(code).find(settings.prefix + '-actions').remove();
                } else {
                    if (settings.fade_in) {
                        code.hide();
                    }

                    tmp.before(code);
                }

                elements = collection.find(settings.elements_selector);

                var action = code.find('.' + settings.prefix + '-add, .' + settings.prefix + '-duplicate');
                if (action.length > 0) {
                    action.addClass(settings.prefix + '-action').data('collection', collection.attr('id'));
                }

                if (!settings.add_at_the_end && index + 1 !== freeIndex) {
                    elements = doMove(collection, settings, elements, code, freeIndex, index + 1);
                } else {
                    dumpCollectionActions(collection, settings, false);
                }

                enableChildrenCollections(collection, code, settings);

                if ((isDuplicate && !trueOrUndefined(settings.after_duplicate(collection, code))) || !trueOrUndefined(settings.after_add(collection, code))) {
                    if (index !== -1) {
                        elements = shiftElementsUp(collection, elements, settings, index + 1);
                    }
                    code.remove();
                }
            }

            if (code !== undefined && settings.fade_in) {
                code.fadeIn('fast', function () {
                    if (settings.position_field_selector) {
                        doRewritePositions(settings, elements);
                    }
                });
            } else {
                if (settings.position_field_selector) {
                    return doRewritePositions(settings, elements);
                }
            }

            return elements;
        };

        // removes the current element when clicking on a "delete" button and decrease all following
        // indexes from 1 position.
        var doDelete = function (collection, settings, elements, element, index) {
            if (elements.length > settings.min && trueOrUndefined(settings.before_remove(collection, element))) {
                var deletion = function () {
                    var toDelete = element;
                    if (!settings.preserve_names) {
                        elements = shiftElementsUp(collection, elements, settings, index);
                        toDelete = elements.last();
                    }
                    var backup = toDelete.clone({withDataAndEvents: true}).show();
                    toDelete.remove();
                    if (!trueOrUndefined(settings.after_remove(collection, backup))) {
                        var elementsParent = $(settings.elements_parent_selector);
                        elementsParent.find('> .' + settings.prefix + '-tmp').before(backup);
                        elements = collection.find(settings.elements_selector);
                        elements = shiftElementsDown(collection, elements, settings, index - 1);
                    }
                    if (settings.position_field_selector) {
                        doRewritePositions(settings, elements);
                    }
                };
                if (settings.fade_out) {
                    element.fadeOut('fast', function () {
                        deletion();
                    });
                } else {
                    deletion();
                }
            }

            return elements;
        };

        // reverse current element and the previous one (so the current element
        // appears one place higher)
        var doUp = function (collection, settings, elements, element, index) {
            if (index !== 0 && trueOrUndefined(settings.before_up(collection, element))) {
                elements = swapElements(collection, elements, index, index - 1);
                if (!trueOrUndefined(settings.after_up(collection, element))) {
                    elements = swapElements(collection, elements, index - 1, index);
                }
            }

            if (settings.position_field_selector) {
                return doRewritePositions(settings, elements);
            }

            return elements;
        };

        // reverse the current element and the next one (so the current element
        // appears one place lower)
        var doDown = function (collection, settings, elements, element, index) {
            if (index !== (elements.length - 1) && trueOrUndefined(settings.before_down(collection, element))) {
                elements = swapElements(collection, elements, index, index + 1);
                if (!trueOrUndefined(settings.after_down(collection, elements))) {
                    elements = swapElements(collection, elements, index + 1, index);
                }
            }

            if (settings.position_field_selector) {
                return doRewritePositions(settings, elements);
            }

            return elements;
        };

        // move an element from a position to an arbitrary new position
        var doMove = function (collection, settings, elements, element, oldIndex, newIndex) {
            if (1 === Math.abs(newIndex - oldIndex)) {
                elements = swapElements(collection, elements, oldIndex, newIndex);
                if (!(newIndex - oldIndex > 0 ? trueOrUndefined(settings.after_up(collection, element)) : trueOrUndefined(settings.after_down(collection, element)))) {
                    elements = swapElements(collection, elements, newIndex, oldIndex);
                }
            } else {
                if (oldIndex < newIndex) {
                    elements = swapElementsUp(collection, elements, settings, oldIndex, newIndex);
                    if (!(newIndex - oldIndex > 0 ? trueOrUndefined(settings.after_up(collection, element)) : trueOrUndefined(settings.after_down(collection, element)))) {
                        elements = swapElementsDown(collection, elements, settings, newIndex, oldIndex);
                    }
                } else {
                    elements = swapElementsDown(collection, elements, settings, oldIndex, newIndex);
                    if (!(newIndex - oldIndex > 0 ? trueOrUndefined(settings.after_up(collection, element)) : trueOrUndefined(settings.after_down(collection, element)))) {
                        elements = swapElementsUp(collection, elements, settings, newIndex, oldIndex);
                    }
                }
            }
            dumpCollectionActions(collection, settings, false);

            if (settings.position_field_selector) {
                return doRewritePositions(settings, elements);
            }

            return elements;
        };

        var doRewritePositions = function (settings, elements) {
            $(elements).each(function () {
                var element = $(this);
                putFieldValue(element.find(settings.position_field_selector), elements.index(element));
            });

            return elements;
        };

        var getElementKey = function (settings, element) {
            var name = element.find(':input[name^="' + settings.name_prefix + '["]').attr('name');

            return name.slice(settings.name_prefix.length + 1).split(']', 1)[0];
        };

        var findFreeNumericKey = function (settings, elements) {
            var freeKey = 0;

            elements.each(function () {
                var key = getElementKey(settings, $(this));

                if (/^0|[1-9]\d*$/.test(key) && key >= freeKey) {
                    freeKey = Number(key) + 1;
                }
            });

            return freeKey;
        };

        var setRightPrefix = function (settings, container) {
            var suffixes = [
                '-action',
                '-action-disabled',
                '-actions',
                '-add',
                '-down',
                '-duplicate',
                '-remove',
                '-rescue-add',
                '-tmp',
                '-up'
            ];

            $.each(suffixes, function () {
                var suffix = this;
                container.each(function () {
                    var that = $(this);
                    if (that.hasClass(settings.user_prefix + suffix)) {
                        that.addClass(settings.prefix + suffix);
                    }
                    that.find('*').each(function () {
                        var here = $(this);
                        if (here.hasClass(settings.user_prefix + suffix)) {
                            here.addClass(settings.prefix + suffix);
                        }
                    });
                });
            });
        };

        // we're in a $.fn., so in $('.collection').collection(), $(this) equals $('.collection')
        var elems = $(this);

        // at least one, but why not several collections should be raised
        if (elems.length === 0) {
            console.log("jquery.collection.js: given collection selector does not exist.");
            return false;
        }

        elems.each(function () {

            var settings = $.extend(true, {}, defaults, options);

            // usage of $.fn.on events using a static container just in case there would be some
            // ajax interactions inside the collection
            if ($(settings.container).length === 0) {
                console.log("jquery.collection.js: a container should exist to handle events (basically, a <body> tag).");
                return false;
            }

            // it is possible to use this plugin with a selector that will contain the collection id
            // in a data attribute
            var elem = $(this);
            if (elem.data('collection') !== undefined) {
                var collection = $('#' + elem.data('collection'));
                if (collection.length === 0) {
                    console.log("jquery.collection.js: given collection id does not exist.");
                    return true;
                }
            } else {
                collection = elem;
            }
            collection = $(collection);

            // when adding elements to a collection, we should be aware of the node that will contain them
            settings.elements_parent_selector = settings.elements_parent_selector.replace('%id%', '#' + getOrCreateId('', collection));
            if (!settings.elements_parent_selector) {
                settings.elements_parent_selector = '#' + getOrCreateId('', collection);
                if ($(settings.elements_parent_selector).length === 0) {
                    console.log("jquery.collection.js: given elements parent selector does not return any object.");
                    return true;
                }
            }

            // On nested collections, prefix is the same for all children leading to very
            // random and unexepcted issues, so we merge prefix with current collection id.
            settings.user_prefix = settings.prefix;
            settings.prefix = collection.attr('id') + '-' + settings.user_prefix;
            setRightPrefix(settings, collection);

            // enforcing logic between options
            if (!settings.allow_add) {
                settings.allow_duplicate = false;
                settings.add_at_the_end = false;
            }
            if (settings.init_with_n_elements > settings.max) {
                settings.init_with_n_elements = settings.max;
            }
            if (settings.min && (!settings.init_with_n_elements || settings.init_with_n_elements < settings.min)) {
                settings.init_with_n_elements = settings.min;
            }

            // user callback
            settings.before_init(collection);

            // prototype required to create new elements in the collection
            if (collection.data('prototype') === null) {
                console.log("jquery.collection.js: given collection field has no prototype, check that your field has the prototype option set to true.");
                return true;
            }

            // all the following data attributes are automatically available thanks to
            // jquery.collection.html.twig form theme
            if (collection.data('prototype-name') !== undefined) {
                settings.prototype_name = collection.data('prototype-name');
            }
            if (collection.data('allow-add') !== undefined) {
                settings.allow_add = collection.data('allow-add');
                settings.allow_duplicate = collection.data('allow-add') ? settings.allow_duplicate : false;
            }
            if (collection.data('allow-remove') !== undefined) {
                settings.allow_remove = collection.data('allow-remove');
            }
            if (collection.data('name-prefix') !== undefined) {
                settings.name_prefix = collection.data('name-prefix');
            }

            // prototype-name required for nested collections, where collection id prefix
            // isn't guessable (see https://github.com/symfony/symfony/issues/13837)
            if (!settings.name_prefix) {
                console.log("jquery.collection.js: the prefix used in descendant field names is mandatory, you can set it using 2 ways:");
                console.log("jquery.collection.js: - use the form theme given with this plugin source");
                console.log("jquery.collection.js: - set name_prefix option to  '{{ formView.myCollectionField.vars.full_name }}'");
                return true;
            }

            // if preserve_names option is set, we should enforce many options to avoid
            // having inconsistencies between the UI and the Symfony result
            if (settings.preserve_names) {
                settings.allow_up = false;
                settings.allow_down = false;
                settings.drag_drop = false;
                settings.add_at_the_end = true;
            }

            // drag & drop support: this is a bit more complex than pressing "up" or
            // "down" buttons because we can move elements more than one place ahead
            // or below...
            if ((typeof jQuery.ui !== 'undefined' && typeof jQuery.ui.sortable !== 'undefined')
                && collection.data('sortable')) {
                collection.sortable('disable');
            }
            if (settings.drag_drop && settings.allow_up && settings.allow_down) {
                var oldPosition;
                var newPosition;
                if (typeof jQuery.ui === 'undefined' || typeof jQuery.ui.sortable === 'undefined') {
                    settings.drag_drop = false;
                } else {
                    collection.sortable($.extend(true, {}, {
                        start: function (event, ui) {
                            var elements = collection.find(settings.elements_selector);
                            var element = ui.item;
                            var that = $(this);
                            if (!trueOrUndefined(settings.drag_drop_start(event, ui, elements, element))) {
                                that.sortable("cancel");
                                return;
                            }
                            ui.placeholder.height(ui.item.height());
                            ui.placeholder.width(ui.item.width());
                            oldPosition = elements.index(element);
                        },
                        update: function (event, ui) {
                            var elements = collection.find(settings.elements_selector);
                            var element = ui.item;
                            var that = $(this);
                            that.sortable("cancel");
                            if (false === settings.drag_drop_update(event, ui, elements, element) || !(newPosition - oldPosition > 0 ? trueOrUndefined(settings.before_up(collection, element)) : trueOrUndefined(settings.before_down(collection, element)))) {
                                return;
                            }
                            newPosition = elements.index(element);
                            elements = collection.find(settings.elements_selector);
                            doMove(collection, settings, elements, element, oldPosition, newPosition);
                        }
                    }, settings.drag_drop_options));
                }
            }

            collection.data('collection-settings', settings);

            // events on buttons using a "static" container so even newly
            // created/ajax downloaded buttons doesn't need further initialization
            var container = $(settings.container);
            container
                .off('click', '.' + settings.prefix + '-action')
                .on('click', '.' + settings.prefix + '-action', function (e) {

                    var that = $(this);

                    var collection = $('#' + that.data('collection'));
                    var settings = collection.data('collection-settings');

                    if (undefined === settings) {
                        var collection = $('#' + that.data('collection')).find('.' + that.data('collection') + '-collection');
                        var settings = collection.data('collection-settings');
                        if (undefined === settings) {
                            throw "Can't find collection: " + that.data('collection');
                        }
                    }

                    var elements = collection.find(settings.elements_selector);
                    var element = that.data('element') ? $('#' + that.data('element')) : undefined;
                    var index = element && element.length ? elements.index(element) : -1;
                    var event = null;

                    var isDuplicate = that.is('.' + settings.prefix + '-duplicate');
                    if ((that.is('.' + settings.prefix + '-add') || that.is('.' + settings.prefix + '-rescue-add') || isDuplicate) && settings.allow_add) {
                        event = 'add';
                        elements = doAdd(container, that, collection, settings, elements, element, index, isDuplicate);
                    }

                    if (that.is('.' + settings.prefix + '-remove') && settings.allow_remove) {
                        event = 'remove';
                        elements = doDelete(collection, settings, elements, element, index);
                    }

                    if (that.is('.' + settings.prefix + '-up') && settings.allow_up) {
                        event = 'up';
                        elements = doUp(collection, settings, elements, element, index);
                    }

                    if (that.is('.' + settings.prefix + '-down') && settings.allow_down) {
                        event = 'down';
                        elements = doDown(collection, settings, elements, element, index);
                    }

                    dumpCollectionActions(collection, settings, false, event);
                    e.preventDefault();
                }); // .on

            dumpCollectionActions(collection, settings, true);
            enableChildrenCollections(collection, null, settings);

            // if collection elements are given in the wrong order, plugin
            // must reorder them graphically
            if (settings.position_field_selector) {
                var array = [];
                var elements = collection.find(settings.elements_selector);
                elements.each(function (index) {
                    var that = $(this);
                    array.push({
                        position: parseFloat(getFieldValue(that.find(settings.position_field_selector))),
                        element: that
                    });
                });

                var sorter = function (a, b) {
                    return (a.position < b.position ? -1 : (a.position > b.position ? 1 : 0));
                };
                array.sort(sorter);

                $.each(array, function (newIndex, object) {
                    var ids = [];
                    $(elements).each(function (index) {
                        ids.push($(this).attr('id'));
                    });

                    var element = object.element;
                    var oldIndex = $.inArray(element.attr('id'), ids);

                    if (newIndex !== oldIndex) {
                        elements = doMove(collection, settings, elements, element, oldIndex, newIndex);
                        putFieldValue(element.find(settings.position_field_selector), elements.index(element));
                    }
                });
            } // if (settings.position_field_selector) {

            settings.after_init(collection);

        }); // elem.each

        return true;
    }; // $.fn.collection

})
(jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[14]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYmxhZGVGb3JtLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb2xsZWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ltZm9ueS1jb2xsZWN0aW9uL2pxdWVyeS5jb2xsZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7O0FDckNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQW9DO0FBQ3BDLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGlCQUFpQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxpQkFBaUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMscUJBQXFCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFdBQVc7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQixhQUFhLEVBQUU7O0FBRWY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELHdCQUF3QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDRDQUE0Qzs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsNkNBQTZDO0FBQ2hJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLEVBQUU7O0FBRW5CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhOztBQUViOztBQUVBLFNBQVMsRUFBRTs7QUFFWDtBQUNBLE1BQU07O0FBRU4sQ0FBQztBQUNEIiwiZmlsZSI6ImpzL2JsYWRlRm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbnJlcXVpcmUoJ3BvcHBlci5qcycpO1xucmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5jb25zdCBjb2xsZWN0aW9ucyA9IHJlcXVpcmUoJy4vY29sbGVjdGlvbnMnKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICQoJyNibGFkZV9mb3JtX2FmZmluaXR5Tm9kZXMnKS5jb2xsZWN0aW9uKGNvbGxlY3Rpb25zLnNldHRpbmdzKCkpO1xuXG4gICAgJCgnI2JsYWRlX2Zvcm1faXNNZXJjJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI2JsYWRlX2Zvcm1fbWVyY1RlYW1OYW1lJykucHJvcCgnZGlzYWJsZWQnLCAhdGhpcy5jaGVja2VkKTtcbiAgICB9KTtcblxuICAgICQoJyNibGFkZV9mb3JtX3RydXN0JykudG9vbHRpcCh7XG4gICAgICAgIHBsYWNlbWVudDogJ3JpZ2h0JyxcbiAgICAgICAgdGl0bGU6ICdBZmZpbml0eSBtYXhlZCBvdXQnLFxuICAgICAgICB0cmlnZ2VyOiAnbWFudWFsJyxcbiAgICB9KS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9ICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJyk7XG4gICAgICAgIGlmIChzZWxlY3RlZE9wdGlvbi50ZXh0KCkgPT0gJ1MnKSB7XG4gICAgICAgICAgICAvLyBNYXggb3V0IGFsbCBhZmZpbml0eSBvcHRpb25zXG4gICAgICAgICAgICBjb25zdCBtYXhBZmZpbml0eSA9ICQoJyNibGFkZV9mb3JtX2FmZmluaXR5VG90YWwnKS5hdHRyKCd2YWx1ZScpO1xuICAgICAgICAgICAgJCgnI2JsYWRlX2Zvcm1fYWZmaW5pdHknKS5hdHRyKCd2YWx1ZScsIG1heEFmZmluaXR5KTtcblxuICAgICAgICAgICAgLy8gTWF4IG91dCBhbGwgYWZmaW5pdHkgbm9kZXNcbiAgICAgICAgICAgIGNvbnN0IGFmZmluaXR5Tm9kZUxpc3QgPSAkKCcjYmxhZGVfZm9ybV9hZmZpbml0eU5vZGVzJyk7XG4gICAgICAgICAgICBsZXQgZWxlbWVudFByZWZpeDtcbiAgICAgICAgICAgIGxldCBtYXhMZXZlbDtcbiAgICAgICAgICAgIGZvciAobGV0IGFmZmluaXR5Tm9kZSBvZiBhZmZpbml0eU5vZGVMaXN0LmZpbmQoJz4gZmllbGRzZXQnKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRQcmVmaXggPSAkKGFmZmluaXR5Tm9kZSkuZmluZCgnW2lkXj1cImJsYWRlX2Zvcm1fYWZmaW5pdHlOb2Rlc1wiXScpLmZpcnN0KCkuYXR0cignaWQnKSArICdfJztcbiAgICAgICAgICAgICAgICBtYXhMZXZlbCA9ICQoYWZmaW5pdHlOb2RlKS5maW5kKCcjJyArIGVsZW1lbnRQcmVmaXggKyAnbWF4TGV2ZWwnKS5hdHRyKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICQoYWZmaW5pdHlOb2RlKS5maW5kKCcjJyArIGVsZW1lbnRQcmVmaXggKyAnbGV2ZWwnKS5hdHRyKCd2YWx1ZScsIG1heExldmVsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVGVsbCB0aGUgdXNlciB3aGF0IGp1c3QgaGFwcGVuZWQuXG4gICAgICAgICAgICAkKHRoaXMpLnRvb2x0aXAoJ3Nob3cnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9qcy9ibGFkZUZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsInJlcXVpcmUoJ3N5bWZvbnktY29sbGVjdGlvbi9qcXVlcnkuY29sbGVjdGlvbicpO1xuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgICB1cDogJzxhIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLWluZm8gbWItMiBtci1zbS0yXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhcyBmYS1hcnJvdy1jaXJjbGUtdXBcIj48L2k+PC9hPicsXG4gICAgZG93bjogJzxhIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLWluZm8gbWItMiBtci1zbS0yXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhcyBmYS1hcnJvdy1jaXJjbGUtZG93blwiPjwvaT48L2E+JyxcbiAgICBhZGQ6ICc8YSBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1zdWNjZXNzXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2E+JyxcbiAgICByZW1vdmU6ICc8YSBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1kYW5nZXIgbWItMiBtci1zbS0yXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhcyBmYS1taW51cy1jaXJjbGVcIj48L2k+PC9hPicsXG4gICAgZHVwbGljYXRlOiAnPGEgY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtc3VjY2VzcyBtYi0yIG1yLXNtLTJcIiBocmVmPVwiI1wiPjxzcGFuIGNsYXNzPVwiZmEtbGF5ZXJzIGZhLWZ3XCI+PGkgY2xhc3M9XCJmYXMgZmEtY2lyY2xlXCI+PC9pPjxpIGNsYXNzPVwiZmEtaW52ZXJzZSBmYXMgZmEtY29weVwiIGRhdGEtZmEtdHJhbnNmb3JtPVwic2hyaW5rLTEwXCI+PC9pPjwvc3Bhbj48L2E+JyxcbiAgICBhbGxvd191cDogZmFsc2UsXG4gICAgYWxsb3dfZG93bjogZmFsc2UsXG4gICAgYWxsb3dfYWRkOiB0cnVlLFxuICAgIGFsbG93X3JlbW92ZTogdHJ1ZSxcbiAgICBhbGxvd19kdXBsaWNhdGU6IGZhbHNlLFxuICAgIGFkZF9hdF90aGVfZW5kOiB0cnVlLFxuICAgIGVsZW1lbnRzX3NlbGVjdG9yOiAnPiBmaWVsZHNldCcsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dGluZ3MoY3VzdG9tID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGN1c3RvbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGp1c3RSZXF1aXJlbWVudHNDaGlsZHJlbkNvdW50KGNvbGxlY3Rpb24sIGNoYW5nZSkge1xuICAgIGNvbnN0IGZvcm1JZCA9IGNvbGxlY3Rpb24uYXR0cignaWQnKTtcbiAgICBjb25zdCBjb3VudEVsZW1lbnQgPSAkKCcjJyArIGZvcm1JZCArICctY291bnQnKTtcbiAgICBjb25zdCBvbGRWYWwgPSBwYXJzZUludChjb3VudEVsZW1lbnQudGV4dCgpKTtcbiAgICBjb3VudEVsZW1lbnQudGV4dChvbGRWYWwgKyBjaGFuZ2UpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hc3NldHMvanMvY29sbGVjdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDMiLCIvKlxuICoganF1ZXJ5LmNvbGxlY3Rpb24uanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwNDIgYWxhaW4gdGllbWJsbyA8YWxhaW4gYXQgZnV6IGRvdCBvcmc+XG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuICogXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbiAqIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4gKiBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcbiAqIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcbiAqIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFXG4gKiBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG47XG4oZnVuY3Rpb24gKCQpIHtcblxuICAgICQuZm4uY29sbGVjdGlvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICAgICAgICBhbGxvd191cDogdHJ1ZSxcbiAgICAgICAgICAgIHVwOiAnPGEgaHJlZj1cIiNcIj4mI3gyNUIyOzwvYT4nLFxuICAgICAgICAgICAgYmVmb3JlX3VwOiBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFmdGVyX3VwOiBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbG93X2Rvd246IHRydWUsXG4gICAgICAgICAgICBkb3duOiAnPGEgaHJlZj1cIiNcIj4mI3gyNUJDOzwvYT4nLFxuICAgICAgICAgICAgYmVmb3JlX2Rvd246IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWZ0ZXJfZG93bjogZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGxvd19hZGQ6IHRydWUsXG4gICAgICAgICAgICBhZGQ6ICc8YSBocmVmPVwiI1wiPlsgKyBdPC9hPicsXG4gICAgICAgICAgICBiZWZvcmVfYWRkOiBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFmdGVyX2FkZDogZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGxvd19yZW1vdmU6IHRydWUsXG4gICAgICAgICAgICByZW1vdmU6ICc8YSBocmVmPVwiI1wiPlsgLSBdPC9hPicsXG4gICAgICAgICAgICBiZWZvcmVfcmVtb3ZlOiBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFmdGVyX3JlbW92ZTogZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbGxvd19kdXBsaWNhdGU6IGZhbHNlLFxuICAgICAgICAgICAgZHVwbGljYXRlOiAnPGEgaHJlZj1cIiNcIj5bICMgXTwvYT4nLFxuICAgICAgICAgICAgYmVmb3JlX2R1cGxpY2F0ZTogZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZnRlcl9kdXBsaWNhdGU6IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmVmb3JlX2luaXQ6IGZ1bmN0aW9uIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWZ0ZXJfaW5pdDogZnVuY3Rpb24gKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgIGFkZF9hdF90aGVfZW5kOiBmYWxzZSxcbiAgICAgICAgICAgIHByZWZpeDogJ2NvbGxlY3Rpb24nLFxuICAgICAgICAgICAgcHJvdG90eXBlX25hbWU6ICdfX25hbWVfXycsXG4gICAgICAgICAgICBuYW1lX3ByZWZpeDogbnVsbCxcbiAgICAgICAgICAgIGVsZW1lbnRzX3NlbGVjdG9yOiAnPiBkaXYnLFxuICAgICAgICAgICAgZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yOiAnJWlkJScsXG4gICAgICAgICAgICBjaGlsZHJlbjogbnVsbCxcbiAgICAgICAgICAgIGluaXRfd2l0aF9uX2VsZW1lbnRzOiAwLFxuICAgICAgICAgICAgaGlkZV91c2VsZXNzX2J1dHRvbnM6IHRydWUsXG4gICAgICAgICAgICBkcmFnX2Ryb3A6IHRydWUsXG4gICAgICAgICAgICBkcmFnX2Ryb3Bfb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICdwbGFjZWhvbGRlcic6ICd1aS1zdGF0ZS1oaWdobGlnaHQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhZ19kcm9wX3N0YXJ0OiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhZ19kcm9wX3VwZGF0ZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGN1c3RvbV9hZGRfbG9jYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgZmFkZV9pbjogdHJ1ZSxcbiAgICAgICAgICAgIGZhZGVfb3V0OiB0cnVlLFxuICAgICAgICAgICAgcG9zaXRpb25fZmllbGRfc2VsZWN0b3I6IG51bGwsXG4gICAgICAgICAgICBwcmVzZXJ2ZV9uYW1lczogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB1c2VkIHRvIGdlbmVyYXRlIHJhbmRvbSBpZCBhdHRyaWJ1dGVzIHdoZW4gcmVxdWlyZWQgYW5kIG1pc3NpbmdcbiAgICAgICAgdmFyIHJhbmRvbU51bWJlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByYW5kID0gJycgKyBNYXRoLnJhbmRvbSgpICogMTAwMCAqIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmQucmVwbGFjZSgnLicsICcnKS5zcGxpdCgnJykuc29ydChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAtIE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICB9KS5qb2luKCcnKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyByZXR1cm4gYW4gZWxlbWVudCdzIGlkLCBhZnRlciBnZW5lcmF0aW5nIG9uZSB3aGVuIG1pc3NpbmdcbiAgICAgICAgdmFyIGdldE9yQ3JlYXRlSWQgPSBmdW5jdGlvbiAocHJlZml4LCBvYmopIHtcbiAgICAgICAgICAgIGlmICghb2JqLmF0dHIoJ2lkJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2VuZXJhdGVkX2lkO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVkX2lkID0gcHJlZml4ICsgJ18nICsgcmFuZG9tTnVtYmVyKCk7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoJCgnIycgKyBnZW5lcmF0ZWRfaWQpLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgIG9iai5hdHRyKCdpZCcsIGdlbmVyYXRlZF9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqLmF0dHIoJ2lkJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gcmV0dXJuIGEgZmllbGQgdmFsdWUgd2hhdGV2ZXIgdGhlIGZpZWxkIHR5cGVcbiAgICAgICAgdmFyIGdldEZpZWxkVmFsdWUgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGpxRWxlbSA9ICQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGpxRWxlbS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoanFFbGVtLmlzKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoanFFbGVtLnByb3AoJ2NoZWNrZWQnKSA9PT0gdHJ1ZSA/IHRydWUgOiBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGpxRWxlbS5pcygnaW5wdXRbdHlwZT1cInJhZGlvXCJdJykgJiYganFFbGVtLmF0dHIoJ25hbWUnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJ2lucHV0W25hbWU9XCInICsganFFbGVtLmF0dHIoJ25hbWUnKSArICdcIl06Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChqcUVsZW0ucHJvcCgndmFsdWUnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpxRWxlbS52YWwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpxRWxlbS5odG1sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gc2V0IGEgZmllbGQgdmFsdWUgaW4gYWNjb3JkYW5jZSB0byB0aGUgZmllbGQgdHlwZVxuICAgICAgICB2YXIgcHV0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChzZWxlY3RvciwgdmFsdWUsIHBoeXNpY2FsKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBqcUVsZW0gPSAkKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoanFFbGVtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoanFFbGVtLmlzKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBqcUVsZW0uYXR0cignY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGpxRWxlbS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChqcUVsZW0ucHJvcCgndmFsdWUnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBoeXNpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIGpxRWxlbS5hdHRyKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBqcUVsZW0udmFsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGpxRWxlbS5odG1sKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBhIGNhbGxiYWNrIHNldCBpbiBhbiBldmVudCB3aWxsIGJlIGNvbnNpZGVyZWQgZmFpbGVkIGlmIGl0XG4gICAgICAgIC8vIHJldHVybnMgZmFsc2UsIG51bGwsIG9yIDAuXG4gICAgICAgIHZhciB0cnVlT3JVbmRlZmluZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgPT09IHZhbHVlIHx8IHZhbHVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHVzZWQgdG8gY2hhbmdlIGVsZW1lbnQgaW5kZXhlcyBpbiBhcmJpdGFyeSBpZCBhdHRyaWJ1dGVzXG4gICAgICAgIHZhciBwcmVnUXVvdGUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gKHN0cmluZyArICcnKS5yZXBsYWNlKC9bLj8qK14kW1xcXVxcXFwoKXt9fC1dL2csIFwiXFxcXCQmXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGlmIHdlIG5lZWQgdG8gY2hhbmdlIENvbGxlY3Rpb25UeXBlX2ZpZWxkXzQyX3ZhbHVlIHRvIENvbGxlY3Rpb25UeXBlX2ZpZWxkXzg0X3ZhbHVlLCB0aGlzIG1ldGhvZFxuICAgICAgICAvLyB3aWxsIGNoYW5nZSBpdCBpbiBpZD1cIkNvbGxlY3Rpb25UeXBlX2ZpZWxkXzQyX3ZhbHVlXCIsIGJ1dCBhbHNvIGRhdGEtaWQ9XCJDb2xsZWN0aW9uVHlwZV9maWVsZF80Ml92YWx1ZVwiXG4gICAgICAgIC8vIG9yIGFueXdoZXJlIGVsc2UganVzdCBpbiBjYXNlIGl0IGNvdWxkIGJlIHVzZWQgb3RoZXJ3aXNlLlxuICAgICAgICB2YXIgcmVwbGFjZUF0dHJEYXRhID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBpbmRleCwgdG9SZXBsYWNlLCByZXBsYWNlV2l0aCkge1xuXG4gICAgICAgICAgICB2YXIgcmVwbGFjZUF0dHJEYXRhTm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpxTm9kZSA9ICQobm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnb2JqZWN0JyAmJiAnYXR0cmlidXRlcycgaW4gbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2gobm9kZS5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoaSwgYXR0cmliKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJC50eXBlKGF0dHJpYi52YWx1ZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganFOb2RlLmF0dHIoYXR0cmliLm5hbWUucmVwbGFjZSh0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKSwgYXR0cmliLnZhbHVlLnJlcGxhY2UodG9SZXBsYWNlLCByZXBsYWNlV2l0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGpxTm9kZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChqcU5vZGUuZGF0YSgpLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnR5cGUodmFsdWUpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpxTm9kZS5kYXRhKG5hbWUucmVwbGFjZSh0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKSwgdmFsdWUucmVwbGFjZSh0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZWxlbWVudHMuZXEoaW5kZXgpO1xuICAgICAgICAgICAgcmVwbGFjZUF0dHJEYXRhTm9kZShlbGVtZW50WzBdKTtcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnKicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VBdHRyRGF0YU5vZGUodGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyByZXBsYWNlIGVsZW1lbnQgbmFtZXMgYW5kIGluZGV4ZXMgaW4gdGhlIGNvbGxlY3Rpb24sIGluIFN5bWZvbnksIG5hbWVzIGFyZSBhbHdheXMgaW4gZm9ybWF0XG4gICAgICAgIC8vIENvbGxlY3Rpb25UeXBlW2ZpZWxkXVs0Ml1bdmFsdWVdIGFuZCBpZHMgYXJlIGluIGZvcm1hdCBDb2xsZWN0aW9uVHlwZV9maWVsZF80Ml92YWx1ZTtcbiAgICAgICAgLy8gc28gd2UgbmVlZCB0byBjaGFuZ2UgYm90aC5cbiAgICAgICAgdmFyIGNoYW5nZUVsZW1lbnRJbmRleCA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIGluZGV4LCBvbGRJbmRleCwgbmV3SW5kZXgpIHtcbiAgICAgICAgICAgIHZhciB0b1JlcGxhY2UgPSBuZXcgUmVnRXhwKHByZWdRdW90ZShzZXR0aW5ncy5uYW1lX3ByZWZpeCArICdbJyArIG9sZEluZGV4ICsgJ10nKSwgJ2cnKTtcbiAgICAgICAgICAgIHZhciByZXBsYWNlV2l0aCA9IHNldHRpbmdzLm5hbWVfcHJlZml4ICsgJ1snICsgbmV3SW5kZXggKyAnXSc7XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICQuZWFjaChzZXR0aW5ncy5jaGlsZHJlbiwgZnVuY3Rpb24gKGtleSwgY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uZmluZChjaGlsZC5zZWxlY3RvcikuZXEoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRTZXR0aW5ncyA9IGNoaWxkQ29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLXNldHRpbmdzJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZFNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZFNldHRpbmdzLm5hbWVfcHJlZml4ID0gY2hpbGRTZXR0aW5ncy5uYW1lX3ByZWZpeC5yZXBsYWNlKHRvUmVwbGFjZSwgcmVwbGFjZVdpdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRDb2xsZWN0aW9uLmRhdGEoJ2NvbGxlY3Rpb24tc2V0dGluZ3MnLCBjaGlsZFNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXBsYWNlQXR0ckRhdGEoZWxlbWVudHMsIGluZGV4LCB0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKTtcblxuICAgICAgICAgICAgdG9SZXBsYWNlID0gbmV3IFJlZ0V4cChwcmVnUXVvdGUoY29sbGVjdGlvbi5hdHRyKCdpZCcpICsgJ18nICsgb2xkSW5kZXgpLCAnZycpO1xuICAgICAgICAgICAgcmVwbGFjZVdpdGggPSBjb2xsZWN0aW9uLmF0dHIoJ2lkJykgKyAnXycgKyBuZXdJbmRleDtcblxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHNldHRpbmdzLmNoaWxkcmVuLCBmdW5jdGlvbiAoa2V5LCBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5maW5kKGNoaWxkLnNlbGVjdG9yKS5lcShpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZFNldHRpbmdzID0gY2hpbGRDb2xsZWN0aW9uLmRhdGEoJ2NvbGxlY3Rpb24tc2V0dGluZ3MnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkU2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkU2V0dGluZ3MuZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yID0gY2hpbGRTZXR0aW5ncy5lbGVtZW50c19wYXJlbnRfc2VsZWN0b3IucmVwbGFjZSh0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkU2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IgPSBjaGlsZFNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yLnJlcGxhY2UodG9SZXBsYWNlLCByZXBsYWNlV2l0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZFNldHRpbmdzLnByZWZpeCA9IGNoaWxkU2V0dGluZ3MucHJlZml4LnJlcGxhY2UodG9SZXBsYWNlLCByZXBsYWNlV2l0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1zZXR0aW5ncycsIGNoaWxkU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcGxhY2VBdHRyRGF0YShlbGVtZW50cywgaW5kZXgsIHRvUmVwbGFjZSwgcmVwbGFjZVdpdGgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHNhbWUgYXMgYWJvdmUsIGJ1dCB3aWxsIHJlcGxhY2UgZWxlbWVudCBuYW1lcyBhbmQgaW5kZXhlcyBpbiBhbiBodG1sIHN0cmluZyBpbnN0ZWFkXG4gICAgICAgIC8vIG9mIGluIGEgZG9tIGVsZW1lbnQuXG4gICAgICAgIHZhciBjaGFuZ2VIdG1sSW5kZXggPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgc2V0dGluZ3MsIGh0bWwsIG9sZEluZGV4LCBuZXdJbmRleCwgb2xkS2V5LCBuZXdLZXkpIHtcbiAgICAgICAgICAgIHZhciB0b1JlcGxhY2UgPSBuZXcgUmVnRXhwKHByZWdRdW90ZShzZXR0aW5ncy5uYW1lX3ByZWZpeCArICdbJyArIG9sZEtleSArICddJyksICdnJyk7XG4gICAgICAgICAgICB2YXIgcmVwbGFjZVdpdGggPSBzZXR0aW5ncy5uYW1lX3ByZWZpeCArICdbJyArIG5ld0tleSArICddJztcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UodG9SZXBsYWNlLCByZXBsYWNlV2l0aCk7XG5cbiAgICAgICAgICAgIHRvUmVwbGFjZSA9IG5ldyBSZWdFeHAocHJlZ1F1b3RlKGNvbGxlY3Rpb24uYXR0cignaWQnKSArICdfJyArIG9sZEluZGV4KSwgJ2cnKTtcbiAgICAgICAgICAgIHJlcGxhY2VXaXRoID0gY29sbGVjdGlvbi5hdHRyKCdpZCcpICsgJ18nICsgbmV3SW5kZXg7XG4gICAgICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKHRvUmVwbGFjZSwgcmVwbGFjZVdpdGgpO1xuXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBzb21ldGltZXMsIHNldHRpbmcgYSB2YWx1ZSB3aWxsIG9ubHkgYmUgbWFkZSBpbiBtZW1vcnkgYW5kIG5vdFxuICAgICAgICAvLyBwaHlzaWNhbGx5IGluIHRoZSBkb207IGFuZCB3ZSBuZWVkIHRoZSBmdWxsIGRvbSB3aGVuIHdlIHdhbnRcbiAgICAgICAgLy8gdG8gZHVwbGljYXRlIGEgZmllbGQuXG4gICAgICAgIHZhciBwdXRGaWVsZFZhbHVlc0luRG9tID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnOmlucHV0JykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGlucHV0T2JqKSB7XG4gICAgICAgICAgICAgICAgcHV0RmllbGRWYWx1ZShpbnB1dE9iaiwgZ2V0RmllbGRWYWx1ZShpbnB1dE9iaiksIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdGhpcyBtZXRob2QgZG9lcyB0aGUgd2hvbGUgbWFnaWM6IGluIGEgY29sbGVjdGlvbiwgaWYgd2Ugd2FudCB0b1xuICAgICAgICAvLyBtb3ZlIGVsZW1lbnRzIGFuZCBrZWVwIGVsZW1lbnQgcG9zaXRpb25zIGluIHRoZSBiYWNrZW5kLCB3ZSBzaG91bGRcbiAgICAgICAgLy8gZWl0aGVyIG1vdmUgZWxlbWVudCBuYW1lcyBvciBlbGVtZW50IGNvbnRlbnRzLCBidXQgbm90IGJvdGghIHRodXMsXG4gICAgICAgIC8vIGlmIHlvdSBqdXN0IG1vdmUgZWxlbWVudHMgaW4gdGhlIGRvbSwgeW91IGtlZXAgZmllbGQgbmFtZXMgYW5kIGRhdGFcbiAgICAgICAgLy8gYXR0YWNoZWQgYW5kIG5vdGhpbmcgd2lsbCBjaGFuZ2UgaW4gdGhlIGJhY2tlbmQuXG4gICAgICAgIHZhciBzd2FwRWxlbWVudHMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudHMsIG9sZEluZGV4LCBuZXdJbmRleCkge1xuXG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBjb2xsZWN0aW9uLmRhdGEoJ2NvbGxlY3Rpb24tc2V0dGluZ3MnKTtcblxuICAgICAgICAgICAgaWYgKCFzZXR0aW5ncy5wb3NpdGlvbl9maWVsZF9zZWxlY3RvciAmJiAhc2V0dGluZ3MucHJlc2VydmVfbmFtZXMpIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VFbGVtZW50SW5kZXgoY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBvbGRJbmRleCwgb2xkSW5kZXgsICdfX3N3YXBfXycpO1xuICAgICAgICAgICAgICAgIGNoYW5nZUVsZW1lbnRJbmRleChjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIG5ld0luZGV4LCBuZXdJbmRleCwgb2xkSW5kZXgpO1xuICAgICAgICAgICAgICAgIGNoYW5nZUVsZW1lbnRJbmRleChjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIG9sZEluZGV4LCAnX19zd2FwX18nLCBuZXdJbmRleCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsZW1lbnRzLmVxKG9sZEluZGV4KS5pbnNlcnRCZWZvcmUoZWxlbWVudHMuZXEobmV3SW5kZXgpKTtcbiAgICAgICAgICAgIGlmIChuZXdJbmRleCA+IG9sZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZXEobmV3SW5kZXgpLmluc2VydEJlZm9yZShlbGVtZW50cy5lcShvbGRJbmRleCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5lcShuZXdJbmRleCkuaW5zZXJ0QWZ0ZXIoZWxlbWVudHMuZXEob2xkSW5kZXgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uZmluZChzZXR0aW5ncy5lbGVtZW50c19zZWxlY3Rvcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbW92aW5nIGFuIGVsZW1lbnQgZG93biBvZiAzIHJvd3MgbWVhbnMgaW5jcmVhc2luZyBpdHMgaW5kZXggb2YgMywgYW5kXG4gICAgICAgIC8vIGRlY3JlYXNpbmcgdGhlIDIgb25lcyBiZXR3ZWVuIG9mIDEuIEV4YW1wbGU6IDAtQSAxLUIgMi1DIDMtRDpcbiAgICAgICAgLy8gbW92aW5nIEIgdG8gMyBiZWNvbWVzIDAtQSAxLUMgMi1EIDMtQlxuICAgICAgICB2YXIgc3dhcEVsZW1lbnRzVXAgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBvbGRJbmRleCwgbmV3SW5kZXgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBvbGRJbmRleCArIDE7IChpIDw9IG5ld0luZGV4KTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHMoY29sbGVjdGlvbiwgZWxlbWVudHMsIGksIGkgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIG1vdmluZyBhbiBlbGVtZW50IHVwIG9mIDMgcm93cyBtZWFucyBkZWNyZWFzaW5nIGl0cyBpbmRleCBvZiAzLCBhbmRcbiAgICAgICAgLy8gaW5jcmVhc2luZyB0aGUgMiBvbmVzIGJldHdlZW4gb2YgMS4gRXhhbXBsZTogMC1BIDEtQiAyLUMgMy1EOlxuICAgICAgICAvLyBtb3ZpbmcgRCB0byAxIGJlY29tZXMgMC1BIDEtRCAyLUIgMy1DXG4gICAgICAgIHZhciBzd2FwRWxlbWVudHNEb3duID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBzZXR0aW5ncywgb2xkSW5kZXgsIG5ld0luZGV4KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gb2xkSW5kZXggLSAxOyAoaSA+PSBuZXdJbmRleCk7IGktLSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc3dhcEVsZW1lbnRzKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBpLCBpICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBpZiB3ZSBjcmVhdGUgYW4gZWxlbWVudCBhdCBwb3NpdGlvbiAyLCBhbGwgZWxlbWVudCBpbmRleGVzIGZyb20gMiB0byBOXG4gICAgICAgIC8vIHNob3VsZCBiZSBpbmNyZWFzZWQuIGZvciBleGFtcGxlLCBpbiAwLUEgMS1CIDItQyAzLUQsIGFkZGluZyBYIGF0IHBvc2l0aW9uXG4gICAgICAgIC8vIDEgd2lsbCBjcmVhdGUgMC1BIDEtWCAyLUIgMy1DIDQtRFxuICAgICAgICB2YXIgc2hpZnRFbGVtZW50c1VwID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBzZXR0aW5ncywgaW5kZXgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBpbmRleCArIDE7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc3dhcEVsZW1lbnRzKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBpIC0gMSwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBpZiB3ZSByZW1vdmUgYW4gZWxlbWVudCBhdCBwb3NpdGlvbiAzLCBhbGwgZWxlbWVudCBpbmRleGVzIGZyb20gMyB0byBOXG4gICAgICAgIC8vIHNob3VsZCBiZSBkZWNyZWFzZWQuIGZvciBleGFtcGxlLCBpbiAwLUEgMS1CIDItQyAzLUQsIHJlbW92aW5nIEIgd2lsbCBjcmVhdGVcbiAgICAgICAgLy8gMC1BIDEtQyAyLURcbiAgICAgICAgdmFyIHNoaWZ0RWxlbWVudHNEb3duID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBzZXR0aW5ncywgaW5kZXgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBlbGVtZW50cy5sZW5ndGggLSAyOyBpID4gaW5kZXg7IGktLSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc3dhcEVsZW1lbnRzKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBpICsgMSwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB0aGlzIG1ldGhvZCBjcmVhdGVzIGJ1dHRvbnMgZm9yIGVhY2ggYWN0aW9uLCBhY2NvcmRpbmcgdG8gYWxsIG9wdGlvbnMgc2V0XG4gICAgICAgIC8vIChidXR0b25zIGVuYWJsZWQsIG1pbmltdW0vbWF4aW11bSBvZiBlbGVtZW50cyBub3QgeWV0IHJlYWNoZWQsIHJlc2N1ZVxuICAgICAgICAvLyBidXR0b24gY3JlYXRpb24gd2hlbiBubyBtb3JlIGVsZW1lbnRzIGFyZSByZW1haW5pbmcuLi4pXG4gICAgICAgIHZhciBkdW1wQ29sbGVjdGlvbkFjdGlvbnMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgc2V0dGluZ3MsIGlzSW5pdGlhbGl6YXRpb24sIGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHNQYXJlbnQgPSAkKHNldHRpbmdzLmVsZW1lbnRzX3BhcmVudF9zZWxlY3Rvcik7XG4gICAgICAgICAgICB2YXIgaW5pdCA9IGVsZW1lbnRzUGFyZW50LmZpbmQoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy10bXAnKS5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAvLyBhZGQgYSByZXNjdWUgYnV0dG9uIHRoYXQgd2lsbCBhcHBlYXIgb25seSBpZiBjb2xsZWN0aW9uIGlzIGVtcHRpZWRcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5hbGxvd19hZGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50c1BhcmVudC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiJyArIHNldHRpbmdzLnByZWZpeCArICctdG1wXCI+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuYWRkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50c1BhcmVudC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChzZXR0aW5ncy5hZGQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhzZXR0aW5ncy5wcmVmaXggKyAnLWFjdGlvbiAnICsgc2V0dGluZ3MucHJlZml4ICsgJy1yZXNjdWUtYWRkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ2NvbGxlY3Rpb24nLCBjb2xsZWN0aW9uLmF0dHIoJ2lkJykpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbml0aWFsaXplcyB0aGUgY29sbGVjdGlvbiB3aXRoIGEgbWluaW1hbCBudW1iZXIgb2YgZWxlbWVudHNcbiAgICAgICAgICAgIGlmIChpc0luaXRpYWxpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLW9mZnNldCcsIDApO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoc2V0dGluZ3MuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9uID0gY29sbGVjdGlvbi5maW5kKCcuJyArIHNldHRpbmdzLnByZWZpeCArICctYWRkLCAuJyArIHNldHRpbmdzLnByZWZpeCArICctcmVzY3VlLWFkZCwgLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWR1cGxpY2F0ZScpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVsZW1lbnRzLmxlbmd0aCA8IHNldHRpbmdzLmluaXRfd2l0aF9uX2VsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZWxlbWVudHMubGVuZ3RoID4gMCA/IGVsZW1lbnRzLmxhc3QoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBkb0FkZChjb250YWluZXIsIGJ1dHRvbiwgY29sbGVjdGlvbiwgc2V0dGluZ3MsIGVsZW1lbnRzLCBlbGVtZW50LCBpbmRleCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1vZmZzZXQnLCBlbGVtZW50cy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtYWtlIGJ1dHRvbnMgYXBwZWFyL2Rpc2FwcGVhciBpbiBlYWNoIGVsZW1lbnRzIG9mIHRoZSBjb2xsZWN0aW9uIGFjY29yZGluZyB0byBvcHRpb25zXG4gICAgICAgICAgICAvLyAoZW5hYmxlZCwgbWluL21heC4uLikgYW5kIGxvZ2ljIChmb3IgZXhhbXBsZSwgZG8gbm90IHB1dCBhIG1vdmUgdXAgYnV0dG9uIG9uIHRoZSBmaXJzdFxuICAgICAgICAgICAgLy8gZWxlbWVudCBvZiB0aGUgY29sbGVjdGlvbilcbiAgICAgICAgICAgIGVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5pdGlhbGl6YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5kYXRhKCdpbmRleCcsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9ucyA9IGVsZW1lbnQuZmluZCgnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWFjdGlvbnMnKS5hZGRCYWNrKCkuZmlsdGVyKCcuJyArIHNldHRpbmdzLnByZWZpeCArICctYWN0aW9ucycpO1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb25zID0gJCgnPGRpdiBjbGFzcz1cIicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWFjdGlvbnNcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoYWN0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgPT09ICdyZW1vdmUnICYmIHNldHRpbmdzLmZhZGVfb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgYnV0dG9ucyA9IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2VuYWJsZWQnOiBzZXR0aW5ncy5hbGxvd19yZW1vdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0b3InOiBzZXR0aW5ncy5wcmVmaXggKyAnLXJlbW92ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHRtbCc6IHNldHRpbmdzLnJlbW92ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb25kaXRpb24nOiBlbGVtZW50cy5sZW5ndGggLSBkZWx0YSA+IHNldHRpbmdzLm1pblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZW5hYmxlZCc6IHNldHRpbmdzLmFsbG93X3VwLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NlbGVjdG9yJzogc2V0dGluZ3MucHJlZml4ICsgJy11cCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHRtbCc6IHNldHRpbmdzLnVwLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbmRpdGlvbic6IGVsZW1lbnRzLmxlbmd0aCAtIGRlbHRhID4gMSAmJiBlbGVtZW50cy5pbmRleChlbGVtZW50KSAtIGRlbHRhID4gMFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZW5hYmxlZCc6IHNldHRpbmdzLmFsbG93X2Rvd24sXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0b3InOiBzZXR0aW5ncy5wcmVmaXggKyAnLWRvd24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0bWwnOiBzZXR0aW5ncy5kb3duLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbmRpdGlvbic6IGVsZW1lbnRzLmxlbmd0aCAtIGRlbHRhID4gMSAmJiBlbGVtZW50cy5pbmRleChlbGVtZW50KSAhPT0gZWxlbWVudHMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZW5hYmxlZCc6IHNldHRpbmdzLmFsbG93X2FkZCAmJiAhc2V0dGluZ3MuYWRkX2F0X3RoZV9lbmQgJiYgIXNldHRpbmdzLmN1c3RvbV9hZGRfbG9jYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0b3InOiBzZXR0aW5ncy5wcmVmaXggKyAnLWFkZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHRtbCc6IHNldHRpbmdzLmFkZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb25kaXRpb24nOiBlbGVtZW50cy5sZW5ndGggLSBkZWx0YSA8IHNldHRpbmdzLm1heFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZW5hYmxlZCc6IHNldHRpbmdzLmFsbG93X2R1cGxpY2F0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzZWxlY3Rvcic6IHNldHRpbmdzLnByZWZpeCArICctZHVwbGljYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogc2V0dGluZ3MuZHVwbGljYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbmRpdGlvbic6IGVsZW1lbnRzLmxlbmd0aCAtIGRlbHRhIDwgc2V0dGluZ3MubWF4XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgJC5lYWNoKGJ1dHRvbnMsIGZ1bmN0aW9uIChpLCBidXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5lbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gZWxlbWVudC5maW5kKCcuJyArIGJ1dHRvbi5zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLmxlbmd0aCA9PT0gMCAmJiBidXR0b24uaHRtbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiA9ICQoYnV0dG9uLmh0bWwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhhY3Rpb25zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoYnV0dG9uLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChidXR0b24uY29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnJlbW92ZUNsYXNzKHNldHRpbmdzLnByZWZpeCArICctYWN0aW9uLWRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmhpZGVfdXNlbGVzc19idXR0b25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5jc3MoJ2Rpc3BsYXknLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uYWRkQ2xhc3Moc2V0dGluZ3MucHJlZml4ICsgJy1hY3Rpb24tZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuaGlkZV91c2VsZXNzX2J1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKHNldHRpbmdzLnByZWZpeCArICctYWN0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnY29sbGVjdGlvbicsIGNvbGxlY3Rpb24uYXR0cignaWQnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnZWxlbWVudCcsIGdldE9yQ3JlYXRlSWQoY29sbGVjdGlvbi5hdHRyKCdpZCcpICsgJ18nICsgaW5kZXgsIGVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLicgKyBidXR0b24uc2VsZWN0b3IpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7IC8vIGVsZW1lbnRzLmVhY2hcblxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVzY3VlIGJ1dHRvbiBhcHBlYXIgLyBkaXNhcHBlYXIgYWNjb3JkaW5nIHRvIG9wdGlvbnMgKGFkZF9hdF90aGVfZW5kKSBhbmRcbiAgICAgICAgICAgIC8vIGxvZ2ljIChubyBtb3JlIGVsZW1lbnRzIG9uIHRoZSBjb2xsZWN0aW9uKVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmFsbG93X2FkZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgPT09ICdyZW1vdmUnICYmIHNldHRpbmdzLmZhZGVfb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzY3VlQWRkID0gY29sbGVjdGlvbi5maW5kKCcuJyArIHNldHRpbmdzLnByZWZpeCArICctcmVzY3VlLWFkZCcpLmNzcygnZGlzcGxheScsICcnKS5yZW1vdmVDbGFzcyhzZXR0aW5ncy5wcmVmaXggKyAnLWFjdGlvbi1kaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIHZhciBhZGRzID0gY29sbGVjdGlvbi5maW5kKCcuJyArIHNldHRpbmdzLnByZWZpeCArICctYWRkJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5ncy5hZGRfYXRfdGhlX2VuZCAmJiBhZGRzLmxlbmd0aCA+IGRlbHRhIHx8IHNldHRpbmdzLmN1c3RvbV9hZGRfbG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzY3VlQWRkLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ3JlbW92ZScgJiYgc2V0dGluZ3MuZmFkZV9vdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzY3VlQWRkLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2N1ZUFkZC5mYWRlSW4oJ2Zhc3QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCAtIGRlbHRhID49IHNldHRpbmdzLm1heCkge1xuICAgICAgICAgICAgICAgICAgICByZXNjdWVBZGQuYWRkQ2xhc3Moc2V0dGluZ3MucHJlZml4ICsgJy1hY3Rpb24tZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmhpZGVfdXNlbGVzc19idXR0b25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLmZpbmQoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1hZGQsIC4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1yZXNjdWUtYWRkLCAuJyArIHNldHRpbmdzLnByZWZpeCArICctZHVwbGljYXRlJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9OyAvLyBkdW1wQ29sbGVjdGlvbkFjdGlvbnNcblxuICAgICAgICAvLyB0aGlzIHBsdWdpbiBzdXBwb3J0cyBuZXN0ZWQgY29sbGVjdGlvbnMsIGFuZCB0aGlzIG1ldGhvZCBlbmFibGVzIHRoZW0gd2hlbiB0aGVcbiAgICAgICAgLy8gcGFyZW50IGNvbGxlY3Rpb24gaXMgaW5pdGlhbGl6ZWQuIHNlZVxuICAgICAgICAvLyBodHRwOi8vc3ltZm9ueS1jb2xsZWN0aW9uLmZ1ei5vcmcvc3ltZm9ueTMvYWR2YW5jZWQvY29sbGVjdGlvbk9mQ29sbGVjdGlvbnNcbiAgICAgICAgdmFyIGVuYWJsZUNoaWxkcmVuQ29sbGVjdGlvbnMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICQuZWFjaChzZXR0aW5ncy5jaGlsZHJlbiwgZnVuY3Rpb24gKGluZGV4LCBjaGlsZHJlblNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hpbGRyZW5TZXR0aW5ncy5zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJqcXVlcnkuY29sbGVjdGlvbi5qczogZ2l2ZW4gY29sbGVjdGlvbiBcIiArIGNvbGxlY3Rpb24uYXR0cignaWQnKSArIFwiIGhhcyBjaGlsZHJlbiBjb2xsZWN0aW9ucywgYnV0IGNoaWxkcmVuJ3Mgcm9vdCBzZWxlY3RvciBpcyB1bmRlZmluZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZmluZChjaGlsZHJlblNldHRpbmdzLnNlbGVjdG9yKS5jb2xsZWN0aW9uKGNoaWxkcmVuU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbi5maW5kKGNoaWxkcmVuU2V0dGluZ3Muc2VsZWN0b3IpLmNvbGxlY3Rpb24oY2hpbGRyZW5TZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyB0aGlzIG1ldGhvZCBoYW5kbGVzIGEgY2xpY2sgb24gXCJhZGRcIiBidXR0b25zLCBpdCBpbmNyZWFzZXMgYWxsIGZvbGxvd2luZyBlbGVtZW50IGluZGV4ZXMgb2ZcbiAgICAgICAgLy8gMSBwb3NpdGlvbiBhbmQgaW5zZXJ0IGEgbmV3IG9uZSBpbiB0aGUgaW5kZXggdGhhdCBiZWNvbWVzIGZyZWUuIGlmIGNsaWNrIGhhcyBiZWVuIG1hZGUgb24gYVxuICAgICAgICAvLyBcImR1cGxpY2F0ZVwiIGJ1dHRvbiwgYWxsIGVsZW1lbnQgdmFsdWVzIGFyZSB0aGVuIGluc2VydGVkLiBmaW5hbGx5LCBjYWxsYmFja3MgbGV0IHVzZXIgY2FuY2VsXG4gICAgICAgIC8vIHRob3NlIGFjdGlvbnMgaWYgbmVlZGVkLlxuICAgICAgICB2YXIgZG9BZGQgPSBmdW5jdGlvbiAoY29udGFpbmVyLCB0aGF0LCBjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIGluZGV4LCBpc0R1cGxpY2F0ZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA8IHNldHRpbmdzLm1heCAmJiAoaXNEdXBsaWNhdGUgJiYgdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmJlZm9yZV9kdXBsaWNhdGUoY29sbGVjdGlvbiwgZWxlbWVudCkpIHx8IHRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5iZWZvcmVfYWRkKGNvbGxlY3Rpb24sIGVsZW1lbnQpKSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gY29sbGVjdGlvbi5kYXRhKCdwcm90b3R5cGUnKTtcbiAgICAgICAgICAgICAgICB2YXIgZnJlZUluZGV4ID0gY29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLW9mZnNldCcpO1xuXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLW9mZnNldCcsIGZyZWVJbmRleCArIDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGVsZW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKHByZWdRdW90ZShzZXR0aW5ncy5wcm90b3R5cGVfbmFtZSksICdnJyk7XG4gICAgICAgICAgICAgICAgdmFyIGZyZWVLZXkgPSBmcmVlSW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MucHJlc2VydmVfbmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJlZUtleSA9IGNvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1mcmVlLWtleScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmcmVlS2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyZWVLZXkgPSBmaW5kRnJlZU51bWVyaWNLZXkoc2V0dGluZ3MsIGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1mcmVlLWtleScsIGZyZWVLZXkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgY29kZSA9ICQocHJvdG90eXBlLnJlcGxhY2UocmVnZXhwLCBmcmVlS2V5KSkuZGF0YSgnaW5kZXgnLCBmcmVlSW5kZXgpO1xuICAgICAgICAgICAgICAgIHNldFJpZ2h0UHJlZml4KHNldHRpbmdzLCBjb2RlKTtcblxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50c1BhcmVudCA9ICQoc2V0dGluZ3MuZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICB2YXIgdG1wID0gZWxlbWVudHNQYXJlbnQuZmluZCgnPiAuJyArIHNldHRpbmdzLnByZWZpeCArICctdG1wJyk7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gJChjb2RlKS5maW5kKCdbaWRdJykuZmlyc3QoKS5hdHRyKCdpZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzRHVwbGljYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRFbGVtZW50ID0gZWxlbWVudHMuZXEoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBwdXRGaWVsZFZhbHVlc0luRG9tKG9sZEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkSHRtbCA9ICQoXCI8ZGl2Lz5cIikuYXBwZW5kKG9sZEVsZW1lbnQuY2xvbmUoKSkuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkSW5kZXggPSBzZXR0aW5ncy5wcmVzZXJ2ZV9uYW1lcyB8fCBzZXR0aW5ncy5wb3NpdGlvbl9maWVsZF9zZWxlY3RvciA/IG9sZEVsZW1lbnQuZGF0YSgnaW5kZXgnKSA6IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkS2V5ID0gc2V0dGluZ3MucHJlc2VydmVfbmFtZXMgPyBnZXRFbGVtZW50S2V5KHNldHRpbmdzLCBvbGRFbGVtZW50KSA6IG9sZEluZGV4O1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3SHRtbCA9IGNoYW5nZUh0bWxJbmRleChjb2xsZWN0aW9uLCBzZXR0aW5ncywgb2xkSHRtbCwgb2xkSW5kZXgsIGZyZWVJbmRleCwgb2xkS2V5LCBmcmVlS2V5KTtcblxuICAgICAgICAgICAgICAgICAgICBjb2RlID0gJCgnPGRpdi8+JykuaHRtbChuZXdIdG1sKS5jb250ZW50cygpLmRhdGEoJ2luZGV4JywgZnJlZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmZhZGVfaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRtcC5iZWZvcmUoY29kZSkuZmluZChzZXR0aW5ncy5wcmVmaXggKyAnLWFjdGlvbnMnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuZmFkZV9pbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0bXAuYmVmb3JlKGNvZGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBjb2RlLmZpbmQoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1hZGQsIC4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1kdXBsaWNhdGUnKTtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmFkZENsYXNzKHNldHRpbmdzLnByZWZpeCArICctYWN0aW9uJykuZGF0YSgnY29sbGVjdGlvbicsIGNvbGxlY3Rpb24uYXR0cignaWQnKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5ncy5hZGRfYXRfdGhlX2VuZCAmJiBpbmRleCArIDEgIT09IGZyZWVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGRvTW92ZShjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGNvZGUsIGZyZWVJbmRleCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkdW1wQ29sbGVjdGlvbkFjdGlvbnMoY29sbGVjdGlvbiwgc2V0dGluZ3MsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbmFibGVDaGlsZHJlbkNvbGxlY3Rpb25zKGNvbGxlY3Rpb24sIGNvZGUsIHNldHRpbmdzKTtcblxuICAgICAgICAgICAgICAgIGlmICgoaXNEdXBsaWNhdGUgJiYgIXRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5hZnRlcl9kdXBsaWNhdGUoY29sbGVjdGlvbiwgY29kZSkpKSB8fCAhdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmFmdGVyX2FkZChjb2xsZWN0aW9uLCBjb2RlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzaGlmdEVsZW1lbnRzVXAoY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29kZSAhPT0gdW5kZWZpbmVkICYmIHNldHRpbmdzLmZhZGVfaW4pIHtcbiAgICAgICAgICAgICAgICBjb2RlLmZhZGVJbignZmFzdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLnBvc2l0aW9uX2ZpZWxkX3NlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb1Jld3JpdGVQb3NpdGlvbnMoc2V0dGluZ3MsIGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MucG9zaXRpb25fZmllbGRfc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvUmV3cml0ZVBvc2l0aW9ucyhzZXR0aW5ncywgZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHJlbW92ZXMgdGhlIGN1cnJlbnQgZWxlbWVudCB3aGVuIGNsaWNraW5nIG9uIGEgXCJkZWxldGVcIiBidXR0b24gYW5kIGRlY3JlYXNlIGFsbCBmb2xsb3dpbmdcbiAgICAgICAgLy8gaW5kZXhlcyBmcm9tIDEgcG9zaXRpb24uXG4gICAgICAgIHZhciBkb0RlbGV0ZSA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoID4gc2V0dGluZ3MubWluICYmIHRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5iZWZvcmVfcmVtb3ZlKGNvbGxlY3Rpb24sIGVsZW1lbnQpKSkge1xuICAgICAgICAgICAgICAgIHZhciBkZWxldGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvRGVsZXRlID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5ncy5wcmVzZXJ2ZV9uYW1lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzaGlmdEVsZW1lbnRzVXAoY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b0RlbGV0ZSA9IGVsZW1lbnRzLmxhc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgYmFja3VwID0gdG9EZWxldGUuY2xvbmUoe3dpdGhEYXRhQW5kRXZlbnRzOiB0cnVlfSkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB0b0RlbGV0ZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYWZ0ZXJfcmVtb3ZlKGNvbGxlY3Rpb24sIGJhY2t1cCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHNQYXJlbnQgPSAkKHNldHRpbmdzLmVsZW1lbnRzX3BhcmVudF9zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50c1BhcmVudC5maW5kKCc+IC4nICsgc2V0dGluZ3MucHJlZml4ICsgJy10bXAnKS5iZWZvcmUoYmFja3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc2hpZnRFbGVtZW50c0Rvd24oY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBpbmRleCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5wb3NpdGlvbl9maWVsZF9zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9SZXdyaXRlUG9zaXRpb25zKHNldHRpbmdzLCBlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5mYWRlX291dCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmZhZGVPdXQoJ2Zhc3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHJldmVyc2UgY3VycmVudCBlbGVtZW50IGFuZCB0aGUgcHJldmlvdXMgb25lIChzbyB0aGUgY3VycmVudCBlbGVtZW50XG4gICAgICAgIC8vIGFwcGVhcnMgb25lIHBsYWNlIGhpZ2hlcilcbiAgICAgICAgdmFyIGRvVXAgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgc2V0dGluZ3MsIGVsZW1lbnRzLCBlbGVtZW50LCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAwICYmIHRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5iZWZvcmVfdXAoY29sbGVjdGlvbiwgZWxlbWVudCkpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHMoY29sbGVjdGlvbiwgZWxlbWVudHMsIGluZGV4LCBpbmRleCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmICghdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmFmdGVyX3VwKGNvbGxlY3Rpb24sIGVsZW1lbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50cyhjb2xsZWN0aW9uLCBlbGVtZW50cywgaW5kZXggLSAxLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MucG9zaXRpb25fZmllbGRfc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9SZXdyaXRlUG9zaXRpb25zKHNldHRpbmdzLCBlbGVtZW50cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50cztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyByZXZlcnNlIHRoZSBjdXJyZW50IGVsZW1lbnQgYW5kIHRoZSBuZXh0IG9uZSAoc28gdGhlIGN1cnJlbnQgZWxlbWVudFxuICAgICAgICAvLyBhcHBlYXJzIG9uZSBwbGFjZSBsb3dlcilcbiAgICAgICAgdmFyIGRvRG93biA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IChlbGVtZW50cy5sZW5ndGggLSAxKSAmJiB0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYmVmb3JlX2Rvd24oY29sbGVjdGlvbiwgZWxlbWVudCkpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHMoY29sbGVjdGlvbiwgZWxlbWVudHMsIGluZGV4LCBpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIGlmICghdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmFmdGVyX2Rvd24oY29sbGVjdGlvbiwgZWxlbWVudHMpKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50cyhjb2xsZWN0aW9uLCBlbGVtZW50cywgaW5kZXggKyAxLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MucG9zaXRpb25fZmllbGRfc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9SZXdyaXRlUG9zaXRpb25zKHNldHRpbmdzLCBlbGVtZW50cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50cztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBtb3ZlIGFuIGVsZW1lbnQgZnJvbSBhIHBvc2l0aW9uIHRvIGFuIGFyYml0cmFyeSBuZXcgcG9zaXRpb25cbiAgICAgICAgdmFyIGRvTW92ZSA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIG9sZEluZGV4LCBuZXdJbmRleCkge1xuICAgICAgICAgICAgaWYgKDEgPT09IE1hdGguYWJzKG5ld0luZGV4IC0gb2xkSW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHMoY29sbGVjdGlvbiwgZWxlbWVudHMsIG9sZEluZGV4LCBuZXdJbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKCEobmV3SW5kZXggLSBvbGRJbmRleCA+IDAgPyB0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYWZ0ZXJfdXAoY29sbGVjdGlvbiwgZWxlbWVudCkpIDogdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmFmdGVyX2Rvd24oY29sbGVjdGlvbiwgZWxlbWVudCkpKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50cyhjb2xsZWN0aW9uLCBlbGVtZW50cywgbmV3SW5kZXgsIG9sZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvbGRJbmRleCA8IG5ld0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc3dhcEVsZW1lbnRzVXAoY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBvbGRJbmRleCwgbmV3SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShuZXdJbmRleCAtIG9sZEluZGV4ID4gMCA/IHRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5hZnRlcl91cChjb2xsZWN0aW9uLCBlbGVtZW50KSkgOiB0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYWZ0ZXJfZG93bihjb2xsZWN0aW9uLCBlbGVtZW50KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50c0Rvd24oY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBuZXdJbmRleCwgb2xkSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHNEb3duKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBzZXR0aW5ncywgb2xkSW5kZXgsIG5ld0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobmV3SW5kZXggLSBvbGRJbmRleCA+IDAgPyB0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYWZ0ZXJfdXAoY29sbGVjdGlvbiwgZWxlbWVudCkpIDogdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmFmdGVyX2Rvd24oY29sbGVjdGlvbiwgZWxlbWVudCkpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHNVcChjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIG5ld0luZGV4LCBvbGRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkdW1wQ29sbGVjdGlvbkFjdGlvbnMoY29sbGVjdGlvbiwgc2V0dGluZ3MsIGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnBvc2l0aW9uX2ZpZWxkX3NlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvUmV3cml0ZVBvc2l0aW9ucyhzZXR0aW5ncywgZWxlbWVudHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGRvUmV3cml0ZVBvc2l0aW9ucyA9IGZ1bmN0aW9uIChzZXR0aW5ncywgZWxlbWVudHMpIHtcbiAgICAgICAgICAgICQoZWxlbWVudHMpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICBwdXRGaWVsZFZhbHVlKGVsZW1lbnQuZmluZChzZXR0aW5ncy5wb3NpdGlvbl9maWVsZF9zZWxlY3RvciksIGVsZW1lbnRzLmluZGV4KGVsZW1lbnQpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGdldEVsZW1lbnRLZXkgPSBmdW5jdGlvbiAoc2V0dGluZ3MsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gZWxlbWVudC5maW5kKCc6aW5wdXRbbmFtZV49XCInICsgc2V0dGluZ3MubmFtZV9wcmVmaXggKyAnW1wiXScpLmF0dHIoJ25hbWUnKTtcblxuICAgICAgICAgICAgcmV0dXJuIG5hbWUuc2xpY2Uoc2V0dGluZ3MubmFtZV9wcmVmaXgubGVuZ3RoICsgMSkuc3BsaXQoJ10nLCAxKVswXTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZmluZEZyZWVOdW1lcmljS2V5ID0gZnVuY3Rpb24gKHNldHRpbmdzLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIGZyZWVLZXkgPSAwO1xuXG4gICAgICAgICAgICBlbGVtZW50cy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0RWxlbWVudEtleShzZXR0aW5ncywgJCh0aGlzKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoL14wfFsxLTldXFxkKiQvLnRlc3Qoa2V5KSAmJiBrZXkgPj0gZnJlZUtleSkge1xuICAgICAgICAgICAgICAgICAgICBmcmVlS2V5ID0gTnVtYmVyKGtleSkgKyAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gZnJlZUtleTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc2V0UmlnaHRQcmVmaXggPSBmdW5jdGlvbiAoc2V0dGluZ3MsIGNvbnRhaW5lcikge1xuICAgICAgICAgICAgdmFyIHN1ZmZpeGVzID0gW1xuICAgICAgICAgICAgICAgICctYWN0aW9uJyxcbiAgICAgICAgICAgICAgICAnLWFjdGlvbi1kaXNhYmxlZCcsXG4gICAgICAgICAgICAgICAgJy1hY3Rpb25zJyxcbiAgICAgICAgICAgICAgICAnLWFkZCcsXG4gICAgICAgICAgICAgICAgJy1kb3duJyxcbiAgICAgICAgICAgICAgICAnLWR1cGxpY2F0ZScsXG4gICAgICAgICAgICAgICAgJy1yZW1vdmUnLFxuICAgICAgICAgICAgICAgICctcmVzY3VlLWFkZCcsXG4gICAgICAgICAgICAgICAgJy10bXAnLFxuICAgICAgICAgICAgICAgICctdXAnXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAkLmVhY2goc3VmZml4ZXMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VmZml4ID0gdGhpcztcbiAgICAgICAgICAgICAgICBjb250YWluZXIuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuaGFzQ2xhc3Moc2V0dGluZ3MudXNlcl9wcmVmaXggKyBzdWZmaXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZENsYXNzKHNldHRpbmdzLnByZWZpeCArIHN1ZmZpeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kKCcqJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGVyZSA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVyZS5oYXNDbGFzcyhzZXR0aW5ncy51c2VyX3ByZWZpeCArIHN1ZmZpeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZXJlLmFkZENsYXNzKHNldHRpbmdzLnByZWZpeCArIHN1ZmZpeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gd2UncmUgaW4gYSAkLmZuLiwgc28gaW4gJCgnLmNvbGxlY3Rpb24nKS5jb2xsZWN0aW9uKCksICQodGhpcykgZXF1YWxzICQoJy5jb2xsZWN0aW9uJylcbiAgICAgICAgdmFyIGVsZW1zID0gJCh0aGlzKTtcblxuICAgICAgICAvLyBhdCBsZWFzdCBvbmUsIGJ1dCB3aHkgbm90IHNldmVyYWwgY29sbGVjdGlvbnMgc2hvdWxkIGJlIHJhaXNlZFxuICAgICAgICBpZiAoZWxlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImpxdWVyeS5jb2xsZWN0aW9uLmpzOiBnaXZlbiBjb2xsZWN0aW9uIHNlbGVjdG9yIGRvZXMgbm90IGV4aXN0LlwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1zLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAvLyB1c2FnZSBvZiAkLmZuLm9uIGV2ZW50cyB1c2luZyBhIHN0YXRpYyBjb250YWluZXIganVzdCBpbiBjYXNlIHRoZXJlIHdvdWxkIGJlIHNvbWVcbiAgICAgICAgICAgIC8vIGFqYXggaW50ZXJhY3Rpb25zIGluc2lkZSB0aGUgY29sbGVjdGlvblxuICAgICAgICAgICAgaWYgKCQoc2V0dGluZ3MuY29udGFpbmVyKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImpxdWVyeS5jb2xsZWN0aW9uLmpzOiBhIGNvbnRhaW5lciBzaG91bGQgZXhpc3QgdG8gaGFuZGxlIGV2ZW50cyAoYmFzaWNhbGx5LCBhIDxib2R5PiB0YWcpLlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGl0IGlzIHBvc3NpYmxlIHRvIHVzZSB0aGlzIHBsdWdpbiB3aXRoIGEgc2VsZWN0b3IgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIGNvbGxlY3Rpb24gaWRcbiAgICAgICAgICAgIC8vIGluIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAgICAgICAgIHZhciBlbGVtID0gJCh0aGlzKTtcbiAgICAgICAgICAgIGlmIChlbGVtLmRhdGEoJ2NvbGxlY3Rpb24nKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSAkKCcjJyArIGVsZW0uZGF0YSgnY29sbGVjdGlvbicpKTtcbiAgICAgICAgICAgICAgICBpZiAoY29sbGVjdGlvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJqcXVlcnkuY29sbGVjdGlvbi5qczogZ2l2ZW4gY29sbGVjdGlvbiBpZCBkb2VzIG5vdCBleGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbiA9IGVsZW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2xsZWN0aW9uID0gJChjb2xsZWN0aW9uKTtcblxuICAgICAgICAgICAgLy8gd2hlbiBhZGRpbmcgZWxlbWVudHMgdG8gYSBjb2xsZWN0aW9uLCB3ZSBzaG91bGQgYmUgYXdhcmUgb2YgdGhlIG5vZGUgdGhhdCB3aWxsIGNvbnRhaW4gdGhlbVxuICAgICAgICAgICAgc2V0dGluZ3MuZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yID0gc2V0dGluZ3MuZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yLnJlcGxhY2UoJyVpZCUnLCAnIycgKyBnZXRPckNyZWF0ZUlkKCcnLCBjb2xsZWN0aW9uKSk7XG4gICAgICAgICAgICBpZiAoIXNldHRpbmdzLmVsZW1lbnRzX3BhcmVudF9zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLmVsZW1lbnRzX3BhcmVudF9zZWxlY3RvciA9ICcjJyArIGdldE9yQ3JlYXRlSWQoJycsIGNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGlmICgkKHNldHRpbmdzLmVsZW1lbnRzX3BhcmVudF9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianF1ZXJ5LmNvbGxlY3Rpb24uanM6IGdpdmVuIGVsZW1lbnRzIHBhcmVudCBzZWxlY3RvciBkb2VzIG5vdCByZXR1cm4gYW55IG9iamVjdC5cIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT24gbmVzdGVkIGNvbGxlY3Rpb25zLCBwcmVmaXggaXMgdGhlIHNhbWUgZm9yIGFsbCBjaGlsZHJlbiBsZWFkaW5nIHRvIHZlcnlcbiAgICAgICAgICAgIC8vIHJhbmRvbSBhbmQgdW5leGVwY3RlZCBpc3N1ZXMsIHNvIHdlIG1lcmdlIHByZWZpeCB3aXRoIGN1cnJlbnQgY29sbGVjdGlvbiBpZC5cbiAgICAgICAgICAgIHNldHRpbmdzLnVzZXJfcHJlZml4ID0gc2V0dGluZ3MucHJlZml4O1xuICAgICAgICAgICAgc2V0dGluZ3MucHJlZml4ID0gY29sbGVjdGlvbi5hdHRyKCdpZCcpICsgJy0nICsgc2V0dGluZ3MudXNlcl9wcmVmaXg7XG4gICAgICAgICAgICBzZXRSaWdodFByZWZpeChzZXR0aW5ncywgY29sbGVjdGlvbik7XG5cbiAgICAgICAgICAgIC8vIGVuZm9yY2luZyBsb2dpYyBiZXR3ZWVuIG9wdGlvbnNcbiAgICAgICAgICAgIGlmICghc2V0dGluZ3MuYWxsb3dfYWRkKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuYWxsb3dfZHVwbGljYXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuYWRkX2F0X3RoZV9lbmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5pbml0X3dpdGhfbl9lbGVtZW50cyA+IHNldHRpbmdzLm1heCkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLmluaXRfd2l0aF9uX2VsZW1lbnRzID0gc2V0dGluZ3MubWF4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLm1pbiAmJiAoIXNldHRpbmdzLmluaXRfd2l0aF9uX2VsZW1lbnRzIHx8IHNldHRpbmdzLmluaXRfd2l0aF9uX2VsZW1lbnRzIDwgc2V0dGluZ3MubWluKSkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLmluaXRfd2l0aF9uX2VsZW1lbnRzID0gc2V0dGluZ3MubWluO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB1c2VyIGNhbGxiYWNrXG4gICAgICAgICAgICBzZXR0aW5ncy5iZWZvcmVfaW5pdChjb2xsZWN0aW9uKTtcblxuICAgICAgICAgICAgLy8gcHJvdG90eXBlIHJlcXVpcmVkIHRvIGNyZWF0ZSBuZXcgZWxlbWVudHMgaW4gdGhlIGNvbGxlY3Rpb25cbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEoJ3Byb3RvdHlwZScpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJqcXVlcnkuY29sbGVjdGlvbi5qczogZ2l2ZW4gY29sbGVjdGlvbiBmaWVsZCBoYXMgbm8gcHJvdG90eXBlLCBjaGVjayB0aGF0IHlvdXIgZmllbGQgaGFzIHRoZSBwcm90b3R5cGUgb3B0aW9uIHNldCB0byB0cnVlLlwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWxsIHRoZSBmb2xsb3dpbmcgZGF0YSBhdHRyaWJ1dGVzIGFyZSBhdXRvbWF0aWNhbGx5IGF2YWlsYWJsZSB0aGFua3MgdG9cbiAgICAgICAgICAgIC8vIGpxdWVyeS5jb2xsZWN0aW9uLmh0bWwudHdpZyBmb3JtIHRoZW1lXG4gICAgICAgICAgICBpZiAoY29sbGVjdGlvbi5kYXRhKCdwcm90b3R5cGUtbmFtZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5wcm90b3R5cGVfbmFtZSA9IGNvbGxlY3Rpb24uZGF0YSgncHJvdG90eXBlLW5hbWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEoJ2FsbG93LWFkZCcpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbGxvd19hZGQgPSBjb2xsZWN0aW9uLmRhdGEoJ2FsbG93LWFkZCcpO1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsbG93X2R1cGxpY2F0ZSA9IGNvbGxlY3Rpb24uZGF0YSgnYWxsb3ctYWRkJykgPyBzZXR0aW5ncy5hbGxvd19kdXBsaWNhdGUgOiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEoJ2FsbG93LXJlbW92ZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbGxvd19yZW1vdmUgPSBjb2xsZWN0aW9uLmRhdGEoJ2FsbG93LXJlbW92ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb24uZGF0YSgnbmFtZS1wcmVmaXgnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MubmFtZV9wcmVmaXggPSBjb2xsZWN0aW9uLmRhdGEoJ25hbWUtcHJlZml4Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHByb3RvdHlwZS1uYW1lIHJlcXVpcmVkIGZvciBuZXN0ZWQgY29sbGVjdGlvbnMsIHdoZXJlIGNvbGxlY3Rpb24gaWQgcHJlZml4XG4gICAgICAgICAgICAvLyBpc24ndCBndWVzc2FibGUgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vc3ltZm9ueS9zeW1mb255L2lzc3Vlcy8xMzgzNylcbiAgICAgICAgICAgIGlmICghc2V0dGluZ3MubmFtZV9wcmVmaXgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImpxdWVyeS5jb2xsZWN0aW9uLmpzOiB0aGUgcHJlZml4IHVzZWQgaW4gZGVzY2VuZGFudCBmaWVsZCBuYW1lcyBpcyBtYW5kYXRvcnksIHlvdSBjYW4gc2V0IGl0IHVzaW5nIDIgd2F5czpcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJqcXVlcnkuY29sbGVjdGlvbi5qczogLSB1c2UgdGhlIGZvcm0gdGhlbWUgZ2l2ZW4gd2l0aCB0aGlzIHBsdWdpbiBzb3VyY2VcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJqcXVlcnkuY29sbGVjdGlvbi5qczogLSBzZXQgbmFtZV9wcmVmaXggb3B0aW9uIHRvICAne3sgZm9ybVZpZXcubXlDb2xsZWN0aW9uRmllbGQudmFycy5mdWxsX25hbWUgfX0nXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBwcmVzZXJ2ZV9uYW1lcyBvcHRpb24gaXMgc2V0LCB3ZSBzaG91bGQgZW5mb3JjZSBtYW55IG9wdGlvbnMgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIGhhdmluZyBpbmNvbnNpc3RlbmNpZXMgYmV0d2VlbiB0aGUgVUkgYW5kIHRoZSBTeW1mb255IHJlc3VsdFxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnByZXNlcnZlX25hbWVzKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuYWxsb3dfdXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbGxvd19kb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuZHJhZ19kcm9wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuYWRkX2F0X3RoZV9lbmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkcmFnICYgZHJvcCBzdXBwb3J0OiB0aGlzIGlzIGEgYml0IG1vcmUgY29tcGxleCB0aGFuIHByZXNzaW5nIFwidXBcIiBvclxuICAgICAgICAgICAgLy8gXCJkb3duXCIgYnV0dG9ucyBiZWNhdXNlIHdlIGNhbiBtb3ZlIGVsZW1lbnRzIG1vcmUgdGhhbiBvbmUgcGxhY2UgYWhlYWRcbiAgICAgICAgICAgIC8vIG9yIGJlbG93Li4uXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBqUXVlcnkudWkgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBqUXVlcnkudWkuc29ydGFibGUgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgICYmIGNvbGxlY3Rpb24uZGF0YSgnc29ydGFibGUnKSkge1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24uc29ydGFibGUoJ2Rpc2FibGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5kcmFnX2Ryb3AgJiYgc2V0dGluZ3MuYWxsb3dfdXAgJiYgc2V0dGluZ3MuYWxsb3dfZG93bikge1xuICAgICAgICAgICAgICAgIHZhciBvbGRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB2YXIgbmV3UG9zaXRpb247XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBqUXVlcnkudWkgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBqUXVlcnkudWkuc29ydGFibGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmRyYWdfZHJvcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24uc29ydGFibGUoJC5leHRlbmQodHJ1ZSwge30sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHVpLml0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmRyYWdfZHJvcF9zdGFydChldmVudCwgdWksIGVsZW1lbnRzLCBlbGVtZW50KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zb3J0YWJsZShcImNhbmNlbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aS5wbGFjZWhvbGRlci5oZWlnaHQodWkuaXRlbS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWkucGxhY2Vob2xkZXIud2lkdGgodWkuaXRlbS53aWR0aCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRQb3NpdGlvbiA9IGVsZW1lbnRzLmluZGV4KGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGNvbGxlY3Rpb24uZmluZChzZXR0aW5ncy5lbGVtZW50c19zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB1aS5pdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNvcnRhYmxlKFwiY2FuY2VsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWxzZSA9PT0gc2V0dGluZ3MuZHJhZ19kcm9wX3VwZGF0ZShldmVudCwgdWksIGVsZW1lbnRzLCBlbGVtZW50KSB8fCAhKG5ld1Bvc2l0aW9uIC0gb2xkUG9zaXRpb24gPiAwID8gdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmJlZm9yZV91cChjb2xsZWN0aW9uLCBlbGVtZW50KSkgOiB0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYmVmb3JlX2Rvd24oY29sbGVjdGlvbiwgZWxlbWVudCkpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gZWxlbWVudHMuaW5kZXgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvTW92ZShjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIG9sZFBvc2l0aW9uLCBuZXdQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIHNldHRpbmdzLmRyYWdfZHJvcF9vcHRpb25zKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb2xsZWN0aW9uLmRhdGEoJ2NvbGxlY3Rpb24tc2V0dGluZ3MnLCBzZXR0aW5ncyk7XG5cbiAgICAgICAgICAgIC8vIGV2ZW50cyBvbiBidXR0b25zIHVzaW5nIGEgXCJzdGF0aWNcIiBjb250YWluZXIgc28gZXZlbiBuZXdseVxuICAgICAgICAgICAgLy8gY3JlYXRlZC9hamF4IGRvd25sb2FkZWQgYnV0dG9ucyBkb2Vzbid0IG5lZWQgZnVydGhlciBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoc2V0dGluZ3MuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrJywgJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1hY3Rpb24nKVxuICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCAnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWFjdGlvbicsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2xsZWN0aW9uID0gJCgnIycgKyB0aGF0LmRhdGEoJ2NvbGxlY3Rpb24nKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IGNvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1zZXR0aW5ncycpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh1bmRlZmluZWQgPT09IHNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29sbGVjdGlvbiA9ICQoJyMnICsgdGhhdC5kYXRhKCdjb2xsZWN0aW9uJykpLmZpbmQoJy4nICsgdGhhdC5kYXRhKCdjb2xsZWN0aW9uJykgKyAnLWNvbGxlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IGNvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1zZXR0aW5ncycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbid0IGZpbmQgY29sbGVjdGlvbjogXCIgKyB0aGF0LmRhdGEoJ2NvbGxlY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGNvbGxlY3Rpb24uZmluZChzZXR0aW5ncy5lbGVtZW50c19zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhhdC5kYXRhKCdlbGVtZW50JykgPyAkKCcjJyArIHRoYXQuZGF0YSgnZWxlbWVudCcpKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZWxlbWVudCAmJiBlbGVtZW50Lmxlbmd0aCA/IGVsZW1lbnRzLmluZGV4KGVsZW1lbnQpIDogLTE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldmVudCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzRHVwbGljYXRlID0gdGhhdC5pcygnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWR1cGxpY2F0ZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHRoYXQuaXMoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1hZGQnKSB8fCB0aGF0LmlzKCcuJyArIHNldHRpbmdzLnByZWZpeCArICctcmVzY3VlLWFkZCcpIHx8IGlzRHVwbGljYXRlKSAmJiBzZXR0aW5ncy5hbGxvd19hZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gJ2FkZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGRvQWRkKGNvbnRhaW5lciwgdGhhdCwgY29sbGVjdGlvbiwgc2V0dGluZ3MsIGVsZW1lbnRzLCBlbGVtZW50LCBpbmRleCwgaXNEdXBsaWNhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuaXMoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1yZW1vdmUnKSAmJiBzZXR0aW5ncy5hbGxvd19yZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gJ3JlbW92ZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGRvRGVsZXRlKGNvbGxlY3Rpb24sIHNldHRpbmdzLCBlbGVtZW50cywgZWxlbWVudCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuaXMoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy11cCcpICYmIHNldHRpbmdzLmFsbG93X3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9ICd1cCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGRvVXAoY29sbGVjdGlvbiwgc2V0dGluZ3MsIGVsZW1lbnRzLCBlbGVtZW50LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5pcygnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWRvd24nKSAmJiBzZXR0aW5ncy5hbGxvd19kb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9ICdkb3duJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gZG9Eb3duKGNvbGxlY3Rpb24sIHNldHRpbmdzLCBlbGVtZW50cywgZWxlbWVudCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZHVtcENvbGxlY3Rpb25BY3Rpb25zKGNvbGxlY3Rpb24sIHNldHRpbmdzLCBmYWxzZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfSk7IC8vIC5vblxuXG4gICAgICAgICAgICBkdW1wQ29sbGVjdGlvbkFjdGlvbnMoY29sbGVjdGlvbiwgc2V0dGluZ3MsIHRydWUpO1xuICAgICAgICAgICAgZW5hYmxlQ2hpbGRyZW5Db2xsZWN0aW9ucyhjb2xsZWN0aW9uLCBudWxsLCBzZXR0aW5ncyk7XG5cbiAgICAgICAgICAgIC8vIGlmIGNvbGxlY3Rpb24gZWxlbWVudHMgYXJlIGdpdmVuIGluIHRoZSB3cm9uZyBvcmRlciwgcGx1Z2luXG4gICAgICAgICAgICAvLyBtdXN0IHJlb3JkZXIgdGhlbSBncmFwaGljYWxseVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnBvc2l0aW9uX2ZpZWxkX3NlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHBhcnNlRmxvYXQoZ2V0RmllbGRWYWx1ZSh0aGF0LmZpbmQoc2V0dGluZ3MucG9zaXRpb25fZmllbGRfc2VsZWN0b3IpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiB0aGF0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNvcnRlciA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoYS5wb3NpdGlvbiA8IGIucG9zaXRpb24gPyAtMSA6IChhLnBvc2l0aW9uID4gYi5wb3NpdGlvbiA/IDEgOiAwKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhcnJheS5zb3J0KHNvcnRlcik7XG5cbiAgICAgICAgICAgICAgICAkLmVhY2goYXJyYXksIGZ1bmN0aW9uIChuZXdJbmRleCwgb2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50cykuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkcy5wdXNoKCQodGhpcykuYXR0cignaWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gb2JqZWN0LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRJbmRleCA9ICQuaW5BcnJheShlbGVtZW50LmF0dHIoJ2lkJyksIGlkcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luZGV4ICE9PSBvbGRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBkb01vdmUoY29sbGVjdGlvbiwgc2V0dGluZ3MsIGVsZW1lbnRzLCBlbGVtZW50LCBvbGRJbmRleCwgbmV3SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHV0RmllbGRWYWx1ZShlbGVtZW50LmZpbmQoc2V0dGluZ3MucG9zaXRpb25fZmllbGRfc2VsZWN0b3IpLCBlbGVtZW50cy5pbmRleChlbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gLy8gaWYgKHNldHRpbmdzLnBvc2l0aW9uX2ZpZWxkX3NlbGVjdG9yKSB7XG5cbiAgICAgICAgICAgIHNldHRpbmdzLmFmdGVyX2luaXQoY29sbGVjdGlvbik7XG5cbiAgICAgICAgfSk7IC8vIGVsZW0uZWFjaFxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07IC8vICQuZm4uY29sbGVjdGlvblxuXG59KVxuKGpRdWVyeSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zeW1mb255LWNvbGxlY3Rpb24vanF1ZXJ5LmNvbGxlY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDMiXSwic291cmNlUm9vdCI6IiJ9