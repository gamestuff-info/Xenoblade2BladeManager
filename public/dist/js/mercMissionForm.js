webpackJsonp([1],{

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

const $ = __webpack_require__(0);
const collections = __webpack_require__(4);

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

},[16]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWVyY01pc3Npb25Gb3JtLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb2xsZWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ltZm9ueS1jb2xsZWN0aW9uL2pxdWVyeS5jb2xsZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcENBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQW9DO0FBQ3BDLDJCQUEyQjtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGlCQUFpQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxpQkFBaUI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMscUJBQXFCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFdBQVc7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQixhQUFhLEVBQUU7O0FBRWY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVU7O0FBRVY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELHdCQUF3QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDRDQUE0Qzs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRkFBbUYsNkNBQTZDO0FBQ2hJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLEVBQUU7O0FBRW5CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhOztBQUViOztBQUVBLFNBQVMsRUFBRTs7QUFFWDtBQUNBLE1BQU07O0FBRU4sQ0FBQztBQUNEIiwiZmlsZSI6ImpzL21lcmNNaXNzaW9uRm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbmNvbnN0IGNvbGxlY3Rpb25zID0gcmVxdWlyZSgnLi9jb2xsZWN0aW9ucycpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnI21lcmNfbWlzc2lvbl9mb3JtX3JlcXVpcmVtZW50c19ibGFkZV9jbGFzcycpLmNvbGxlY3Rpb24oY29sbGVjdGlvbnMuc2V0dGluZ3Moe1xuICAgICAgICBhZnRlcl9hZGQ6IGNhbGxiYWNrQWRkRWxlbWVudCxcbiAgICAgICAgYWZ0ZXJfcmVtb3ZlOiBjYWxsYmFja1JlbW92ZUVsZW1lbnQsXG4gICAgfSkpO1xuICAgICQoJyNtZXJjX21pc3Npb25fZm9ybV9yZXF1aXJlbWVudHNfZWxlbWVudCcpLmNvbGxlY3Rpb24oY29sbGVjdGlvbnMuc2V0dGluZ3Moe1xuICAgICAgICBhZnRlcl9hZGQ6IGNhbGxiYWNrQWRkRWxlbWVudCxcbiAgICAgICAgYWZ0ZXJfcmVtb3ZlOiBjYWxsYmFja1JlbW92ZUVsZW1lbnQsXG4gICAgfSkpO1xuICAgICQoJyNtZXJjX21pc3Npb25fZm9ybV9yZXF1aXJlbWVudHNfZmllbGRfc2tpbGwnKS5jb2xsZWN0aW9uKGNvbGxlY3Rpb25zLnNldHRpbmdzKHtcbiAgICAgICAgYWZ0ZXJfYWRkOiBjYWxsYmFja0FkZEVsZW1lbnQsXG4gICAgICAgIGFmdGVyX3JlbW92ZTogY2FsbGJhY2tSZW1vdmVFbGVtZW50LFxuICAgIH0pKTtcbiAgICAkKCcjbWVyY19taXNzaW9uX2Zvcm1fcmVxdWlyZW1lbnRzX2dlbmRlcicpLmNvbGxlY3Rpb24oY29sbGVjdGlvbnMuc2V0dGluZ3Moe1xuICAgICAgICBhZnRlcl9hZGQ6IGNhbGxiYWNrQWRkRWxlbWVudCxcbiAgICAgICAgYWZ0ZXJfcmVtb3ZlOiBjYWxsYmFja1JlbW92ZUVsZW1lbnQsXG4gICAgfSkpO1xuICAgICQoJyNtZXJjX21pc3Npb25fZm9ybV9yZXF1aXJlbWVudHNfc3RyZW5ndGgnKS5jb2xsZWN0aW9uKGNvbGxlY3Rpb25zLnNldHRpbmdzKHtcbiAgICAgICAgYWZ0ZXJfYWRkOiBjYWxsYmFja0FkZEVsZW1lbnQsXG4gICAgICAgIGFmdGVyX3JlbW92ZTogY2FsbGJhY2tSZW1vdmVFbGVtZW50LFxuICAgIH0pKTtcbiAgICAkKCcjbWVyY19taXNzaW9uX2Zvcm1fcmVxdWlyZW1lbnRzX3dlYXBvbl9jbGFzcycpLmNvbGxlY3Rpb24oY29sbGVjdGlvbnMuc2V0dGluZ3Moe1xuICAgICAgICBhZnRlcl9hZGQ6IGNhbGxiYWNrQWRkRWxlbWVudCxcbiAgICAgICAgYWZ0ZXJfcmVtb3ZlOiBjYWxsYmFja1JlbW92ZUVsZW1lbnQsXG4gICAgfSkpO1xufSk7XG5cbmZ1bmN0aW9uIGNhbGxiYWNrQWRkRWxlbWVudChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgY29sbGVjdGlvbnMuYWRqdXN0UmVxdWlyZW1lbnRzQ2hpbGRyZW5Db3VudChjb2xsZWN0aW9uLCAxKTtcbn1cblxuZnVuY3Rpb24gY2FsbGJhY2tSZW1vdmVFbGVtZW50KGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICBjb2xsZWN0aW9ucy5hZGp1c3RSZXF1aXJlbWVudHNDaGlsZHJlbkNvdW50KGNvbGxlY3Rpb24sIC0xKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL2pzL21lcmNNaXNzaW9uRm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwicmVxdWlyZSgnc3ltZm9ueS1jb2xsZWN0aW9uL2pxdWVyeS5jb2xsZWN0aW9uJyk7XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHVwOiAnPGEgY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtaW5mbyBtYi0yIG1yLXNtLTJcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmFzIGZhLWFycm93LWNpcmNsZS11cFwiPjwvaT48L2E+JyxcbiAgICBkb3duOiAnPGEgY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtaW5mbyBtYi0yIG1yLXNtLTJcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmFzIGZhLWFycm93LWNpcmNsZS1kb3duXCI+PC9pPjwvYT4nLFxuICAgIGFkZDogJzxhIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXN1Y2Nlc3NcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmFzIGZhLXBsdXMtY2lyY2xlXCI+PC9pPjwvYT4nLFxuICAgIHJlbW92ZTogJzxhIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLWRhbmdlciBtYi0yIG1yLXNtLTJcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48L2E+JyxcbiAgICBkdXBsaWNhdGU6ICc8YSBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1zdWNjZXNzIG1iLTIgbXItc20tMlwiIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3M9XCJmYS1sYXllcnMgZmEtZndcIj48aSBjbGFzcz1cImZhcyBmYS1jaXJjbGVcIj48L2k+PGkgY2xhc3M9XCJmYS1pbnZlcnNlIGZhcyBmYS1jb3B5XCIgZGF0YS1mYS10cmFuc2Zvcm09XCJzaHJpbmstMTBcIj48L2k+PC9zcGFuPjwvYT4nLFxuICAgIGFsbG93X3VwOiBmYWxzZSxcbiAgICBhbGxvd19kb3duOiBmYWxzZSxcbiAgICBhbGxvd19hZGQ6IHRydWUsXG4gICAgYWxsb3dfcmVtb3ZlOiB0cnVlLFxuICAgIGFsbG93X2R1cGxpY2F0ZTogZmFsc2UsXG4gICAgYWRkX2F0X3RoZV9lbmQ6IHRydWUsXG4gICAgZWxlbWVudHNfc2VsZWN0b3I6ICc+IGZpZWxkc2V0Jyxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR0aW5ncyhjdXN0b20gPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgY3VzdG9tKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkanVzdFJlcXVpcmVtZW50c0NoaWxkcmVuQ291bnQoY29sbGVjdGlvbiwgY2hhbmdlKSB7XG4gICAgY29uc3QgZm9ybUlkID0gY29sbGVjdGlvbi5hdHRyKCdpZCcpO1xuICAgIGNvbnN0IGNvdW50RWxlbWVudCA9ICQoJyMnICsgZm9ybUlkICsgJy1jb3VudCcpO1xuICAgIGNvbnN0IG9sZFZhbCA9IHBhcnNlSW50KGNvdW50RWxlbWVudC50ZXh0KCkpO1xuICAgIGNvdW50RWxlbWVudC50ZXh0KG9sZFZhbCArIGNoYW5nZSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9qcy9jb2xsZWN0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMyIsIi8qXG4gKiBqcXVlcnkuY29sbGVjdGlvbi5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjA0MiBhbGFpbiB0aWVtYmxvIDxhbGFpbiBhdCBmdXogZG90IG9yZz5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4gKiBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuICogZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbiAqIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuICogTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWVxuICogQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkVcbiAqIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbjtcbihmdW5jdGlvbiAoJCkge1xuXG4gICAgJC5mbi5jb2xsZWN0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBjb250YWluZXI6ICdib2R5JyxcbiAgICAgICAgICAgIGFsbG93X3VwOiB0cnVlLFxuICAgICAgICAgICAgdXA6ICc8YSBocmVmPVwiI1wiPiYjeDI1QjI7PC9hPicsXG4gICAgICAgICAgICBiZWZvcmVfdXA6IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWZ0ZXJfdXA6IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWxsb3dfZG93bjogdHJ1ZSxcbiAgICAgICAgICAgIGRvd246ICc8YSBocmVmPVwiI1wiPiYjeDI1QkM7PC9hPicsXG4gICAgICAgICAgICBiZWZvcmVfZG93bjogZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZnRlcl9kb3duOiBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbG93X2FkZDogdHJ1ZSxcbiAgICAgICAgICAgIGFkZDogJzxhIGhyZWY9XCIjXCI+WyArIF08L2E+JyxcbiAgICAgICAgICAgIGJlZm9yZV9hZGQ6IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWZ0ZXJfYWRkOiBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbG93X3JlbW92ZTogdHJ1ZSxcbiAgICAgICAgICAgIHJlbW92ZTogJzxhIGhyZWY9XCIjXCI+WyAtIF08L2E+JyxcbiAgICAgICAgICAgIGJlZm9yZV9yZW1vdmU6IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWZ0ZXJfcmVtb3ZlOiBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFsbG93X2R1cGxpY2F0ZTogZmFsc2UsXG4gICAgICAgICAgICBkdXBsaWNhdGU6ICc8YSBocmVmPVwiI1wiPlsgIyBdPC9hPicsXG4gICAgICAgICAgICBiZWZvcmVfZHVwbGljYXRlOiBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFmdGVyX2R1cGxpY2F0ZTogZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWZvcmVfaW5pdDogZnVuY3Rpb24gKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhZnRlcl9pbml0OiBmdW5jdGlvbiAoY29sbGVjdGlvbikge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgYWRkX2F0X3RoZV9lbmQ6IGZhbHNlLFxuICAgICAgICAgICAgcHJlZml4OiAnY29sbGVjdGlvbicsXG4gICAgICAgICAgICBwcm90b3R5cGVfbmFtZTogJ19fbmFtZV9fJyxcbiAgICAgICAgICAgIG5hbWVfcHJlZml4OiBudWxsLFxuICAgICAgICAgICAgZWxlbWVudHNfc2VsZWN0b3I6ICc+IGRpdicsXG4gICAgICAgICAgICBlbGVtZW50c19wYXJlbnRfc2VsZWN0b3I6ICclaWQlJyxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBudWxsLFxuICAgICAgICAgICAgaW5pdF93aXRoX25fZWxlbWVudHM6IDAsXG4gICAgICAgICAgICBoaWRlX3VzZWxlc3NfYnV0dG9uczogdHJ1ZSxcbiAgICAgICAgICAgIGRyYWdfZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIGRyYWdfZHJvcF9vcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgJ3BsYWNlaG9sZGVyJzogJ3VpLXN0YXRlLWhpZ2hsaWdodCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnX2Ryb3Bfc3RhcnQ6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnX2Ryb3BfdXBkYXRlOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3VzdG9tX2FkZF9sb2NhdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBmYWRlX2luOiB0cnVlLFxuICAgICAgICAgICAgZmFkZV9vdXQ6IHRydWUsXG4gICAgICAgICAgICBwb3NpdGlvbl9maWVsZF9zZWxlY3RvcjogbnVsbCxcbiAgICAgICAgICAgIHByZXNlcnZlX25hbWVzOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHVzZWQgdG8gZ2VuZXJhdGUgcmFuZG9tIGlkIGF0dHJpYnV0ZXMgd2hlbiByZXF1aXJlZCBhbmQgbWlzc2luZ1xuICAgICAgICB2YXIgcmFuZG9tTnVtYmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJhbmQgPSAnJyArIE1hdGgucmFuZG9tKCkgKiAxMDAwICogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZC5yZXBsYWNlKCcuJywgJycpLnNwbGl0KCcnKS5zb3J0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41IC0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHJldHVybiBhbiBlbGVtZW50J3MgaWQsIGFmdGVyIGdlbmVyYXRpbmcgb25lIHdoZW4gbWlzc2luZ1xuICAgICAgICB2YXIgZ2V0T3JDcmVhdGVJZCA9IGZ1bmN0aW9uIChwcmVmaXgsIG9iaikge1xuICAgICAgICAgICAgaWYgKCFvYmouYXR0cignaWQnKSkge1xuICAgICAgICAgICAgICAgIHZhciBnZW5lcmF0ZWRfaWQ7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZWRfaWQgPSBwcmVmaXggKyAnXycgKyByYW5kb21OdW1iZXIoKTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlICgkKCcjJyArIGdlbmVyYXRlZF9pZCkubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgb2JqLmF0dHIoJ2lkJywgZ2VuZXJhdGVkX2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmouYXR0cignaWQnKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyByZXR1cm4gYSBmaWVsZCB2YWx1ZSB3aGF0ZXZlciB0aGUgZmllbGQgdHlwZVxuICAgICAgICB2YXIgZ2V0RmllbGRWYWx1ZSA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIganFFbGVtID0gJChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoanFFbGVtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChqcUVsZW0uaXMoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChqcUVsZW0ucHJvcCgnY2hlY2tlZCcpID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoanFFbGVtLmlzKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKSAmJiBqcUVsZW0uYXR0cignbmFtZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJCgnaW5wdXRbbmFtZT1cIicgKyBqcUVsZW0uYXR0cignbmFtZScpICsgJ1wiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGpxRWxlbS5wcm9wKCd2YWx1ZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ganFFbGVtLnZhbCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ganFFbGVtLmh0bWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBzZXQgYSBmaWVsZCB2YWx1ZSBpbiBhY2NvcmRhbmNlIHRvIHRoZSBmaWVsZCB0eXBlXG4gICAgICAgIHZhciBwdXRGaWVsZFZhbHVlID0gZnVuY3Rpb24gKHNlbGVjdG9yLCB2YWx1ZSwgcGh5c2ljYWwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGpxRWxlbSA9ICQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChqcUVsZW0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChqcUVsZW0uaXMoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGpxRWxlbS5hdHRyKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAganFFbGVtLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGpxRWxlbS5wcm9wKCd2YWx1ZScpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGh5c2ljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAganFFbGVtLmF0dHIoJ3ZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGpxRWxlbS52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAganFFbGVtLmh0bWwodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGEgY2FsbGJhY2sgc2V0IGluIGFuIGV2ZW50IHdpbGwgYmUgY29uc2lkZXJlZCBmYWlsZWQgaWYgaXRcbiAgICAgICAgLy8gcmV0dXJucyBmYWxzZSwgbnVsbCwgb3IgMC5cbiAgICAgICAgdmFyIHRydWVPclVuZGVmaW5lZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCA9PT0gdmFsdWUgfHwgdmFsdWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdXNlZCB0byBjaGFuZ2UgZWxlbWVudCBpbmRleGVzIGluIGFyYml0YXJ5IGlkIGF0dHJpYnV0ZXNcbiAgICAgICAgdmFyIHByZWdRdW90ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiAoc3RyaW5nICsgJycpLnJlcGxhY2UoL1suPyorXiRbXFxdXFxcXCgpe318LV0vZywgXCJcXFxcJCZcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gaWYgd2UgbmVlZCB0byBjaGFuZ2UgQ29sbGVjdGlvblR5cGVfZmllbGRfNDJfdmFsdWUgdG8gQ29sbGVjdGlvblR5cGVfZmllbGRfODRfdmFsdWUsIHRoaXMgbWV0aG9kXG4gICAgICAgIC8vIHdpbGwgY2hhbmdlIGl0IGluIGlkPVwiQ29sbGVjdGlvblR5cGVfZmllbGRfNDJfdmFsdWVcIiwgYnV0IGFsc28gZGF0YS1pZD1cIkNvbGxlY3Rpb25UeXBlX2ZpZWxkXzQyX3ZhbHVlXCJcbiAgICAgICAgLy8gb3IgYW55d2hlcmUgZWxzZSBqdXN0IGluIGNhc2UgaXQgY291bGQgYmUgdXNlZCBvdGhlcndpc2UuXG4gICAgICAgIHZhciByZXBsYWNlQXR0ckRhdGEgPSBmdW5jdGlvbiAoZWxlbWVudHMsIGluZGV4LCB0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKSB7XG5cbiAgICAgICAgICAgIHZhciByZXBsYWNlQXR0ckRhdGFOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIganFOb2RlID0gJChub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdvYmplY3QnICYmICdhdHRyaWJ1dGVzJyBpbiBub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChub2RlLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChpLCBhdHRyaWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLnR5cGUoYXR0cmliLnZhbHVlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqcU5vZGUuYXR0cihhdHRyaWIubmFtZS5yZXBsYWNlKHRvUmVwbGFjZSwgcmVwbGFjZVdpdGgpLCBhdHRyaWIudmFsdWUucmVwbGFjZSh0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoanFOb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGpxTm9kZS5kYXRhKCksIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQudHlwZSh2YWx1ZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganFOb2RlLmRhdGEobmFtZS5yZXBsYWNlKHRvUmVwbGFjZSwgcmVwbGFjZVdpdGgpLCB2YWx1ZS5yZXBsYWNlKHRvUmVwbGFjZSwgcmVwbGFjZVdpdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50cy5lcShpbmRleCk7XG4gICAgICAgICAgICByZXBsYWNlQXR0ckRhdGFOb2RlKGVsZW1lbnRbMF0pO1xuICAgICAgICAgICAgZWxlbWVudC5maW5kKCcqJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVwbGFjZUF0dHJEYXRhTm9kZSh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHJlcGxhY2UgZWxlbWVudCBuYW1lcyBhbmQgaW5kZXhlcyBpbiB0aGUgY29sbGVjdGlvbiwgaW4gU3ltZm9ueSwgbmFtZXMgYXJlIGFsd2F5cyBpbiBmb3JtYXRcbiAgICAgICAgLy8gQ29sbGVjdGlvblR5cGVbZmllbGRdWzQyXVt2YWx1ZV0gYW5kIGlkcyBhcmUgaW4gZm9ybWF0IENvbGxlY3Rpb25UeXBlX2ZpZWxkXzQyX3ZhbHVlO1xuICAgICAgICAvLyBzbyB3ZSBuZWVkIHRvIGNoYW5nZSBib3RoLlxuICAgICAgICB2YXIgY2hhbmdlRWxlbWVudEluZGV4ID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBzZXR0aW5ncywgaW5kZXgsIG9sZEluZGV4LCBuZXdJbmRleCkge1xuICAgICAgICAgICAgdmFyIHRvUmVwbGFjZSA9IG5ldyBSZWdFeHAocHJlZ1F1b3RlKHNldHRpbmdzLm5hbWVfcHJlZml4ICsgJ1snICsgb2xkSW5kZXggKyAnXScpLCAnZycpO1xuICAgICAgICAgICAgdmFyIHJlcGxhY2VXaXRoID0gc2V0dGluZ3MubmFtZV9wcmVmaXggKyAnWycgKyBuZXdJbmRleCArICddJztcblxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHNldHRpbmdzLmNoaWxkcmVuLCBmdW5jdGlvbiAoa2V5LCBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5maW5kKGNoaWxkLnNlbGVjdG9yKS5lcShpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZFNldHRpbmdzID0gY2hpbGRDb2xsZWN0aW9uLmRhdGEoJ2NvbGxlY3Rpb24tc2V0dGluZ3MnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkU2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkU2V0dGluZ3MubmFtZV9wcmVmaXggPSBjaGlsZFNldHRpbmdzLm5hbWVfcHJlZml4LnJlcGxhY2UodG9SZXBsYWNlLCByZXBsYWNlV2l0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZENvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1zZXR0aW5ncycsIGNoaWxkU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcGxhY2VBdHRyRGF0YShlbGVtZW50cywgaW5kZXgsIHRvUmVwbGFjZSwgcmVwbGFjZVdpdGgpO1xuXG4gICAgICAgICAgICB0b1JlcGxhY2UgPSBuZXcgUmVnRXhwKHByZWdRdW90ZShjb2xsZWN0aW9uLmF0dHIoJ2lkJykgKyAnXycgKyBvbGRJbmRleCksICdnJyk7XG4gICAgICAgICAgICByZXBsYWNlV2l0aCA9IGNvbGxlY3Rpb24uYXR0cignaWQnKSArICdfJyArIG5ld0luZGV4O1xuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAkLmVhY2goc2V0dGluZ3MuY2hpbGRyZW4sIGZ1bmN0aW9uIChrZXksIGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbmQoY2hpbGQuc2VsZWN0b3IpLmVxKGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkU2V0dGluZ3MgPSBjaGlsZENvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1zZXR0aW5ncycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRTZXR0aW5ncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRTZXR0aW5ncy5lbGVtZW50c19wYXJlbnRfc2VsZWN0b3IgPSBjaGlsZFNldHRpbmdzLmVsZW1lbnRzX3BhcmVudF9zZWxlY3Rvci5yZXBsYWNlKHRvUmVwbGFjZSwgcmVwbGFjZVdpdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRTZXR0aW5ncy5lbGVtZW50c19zZWxlY3RvciA9IGNoaWxkU2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IucmVwbGFjZSh0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkU2V0dGluZ3MucHJlZml4ID0gY2hpbGRTZXR0aW5ncy5wcmVmaXgucmVwbGFjZSh0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkQ29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLXNldHRpbmdzJywgY2hpbGRTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVwbGFjZUF0dHJEYXRhKGVsZW1lbnRzLCBpbmRleCwgdG9SZXBsYWNlLCByZXBsYWNlV2l0aCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSwgYnV0IHdpbGwgcmVwbGFjZSBlbGVtZW50IG5hbWVzIGFuZCBpbmRleGVzIGluIGFuIGh0bWwgc3RyaW5nIGluc3RlYWRcbiAgICAgICAgLy8gb2YgaW4gYSBkb20gZWxlbWVudC5cbiAgICAgICAgdmFyIGNoYW5nZUh0bWxJbmRleCA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBzZXR0aW5ncywgaHRtbCwgb2xkSW5kZXgsIG5ld0luZGV4LCBvbGRLZXksIG5ld0tleSkge1xuICAgICAgICAgICAgdmFyIHRvUmVwbGFjZSA9IG5ldyBSZWdFeHAocHJlZ1F1b3RlKHNldHRpbmdzLm5hbWVfcHJlZml4ICsgJ1snICsgb2xkS2V5ICsgJ10nKSwgJ2cnKTtcbiAgICAgICAgICAgIHZhciByZXBsYWNlV2l0aCA9IHNldHRpbmdzLm5hbWVfcHJlZml4ICsgJ1snICsgbmV3S2V5ICsgJ10nO1xuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSh0b1JlcGxhY2UsIHJlcGxhY2VXaXRoKTtcblxuICAgICAgICAgICAgdG9SZXBsYWNlID0gbmV3IFJlZ0V4cChwcmVnUXVvdGUoY29sbGVjdGlvbi5hdHRyKCdpZCcpICsgJ18nICsgb2xkSW5kZXgpLCAnZycpO1xuICAgICAgICAgICAgcmVwbGFjZVdpdGggPSBjb2xsZWN0aW9uLmF0dHIoJ2lkJykgKyAnXycgKyBuZXdJbmRleDtcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UodG9SZXBsYWNlLCByZXBsYWNlV2l0aCk7XG5cbiAgICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHNvbWV0aW1lcywgc2V0dGluZyBhIHZhbHVlIHdpbGwgb25seSBiZSBtYWRlIGluIG1lbW9yeSBhbmQgbm90XG4gICAgICAgIC8vIHBoeXNpY2FsbHkgaW4gdGhlIGRvbTsgYW5kIHdlIG5lZWQgdGhlIGZ1bGwgZG9tIHdoZW4gd2Ugd2FudFxuICAgICAgICAvLyB0byBkdXBsaWNhdGUgYSBmaWVsZC5cbiAgICAgICAgdmFyIHB1dEZpZWxkVmFsdWVzSW5Eb20gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCc6aW5wdXQnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaW5wdXRPYmopIHtcbiAgICAgICAgICAgICAgICBwdXRGaWVsZFZhbHVlKGlucHV0T2JqLCBnZXRGaWVsZFZhbHVlKGlucHV0T2JqKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB0aGlzIG1ldGhvZCBkb2VzIHRoZSB3aG9sZSBtYWdpYzogaW4gYSBjb2xsZWN0aW9uLCBpZiB3ZSB3YW50IHRvXG4gICAgICAgIC8vIG1vdmUgZWxlbWVudHMgYW5kIGtlZXAgZWxlbWVudCBwb3NpdGlvbnMgaW4gdGhlIGJhY2tlbmQsIHdlIHNob3VsZFxuICAgICAgICAvLyBlaXRoZXIgbW92ZSBlbGVtZW50IG5hbWVzIG9yIGVsZW1lbnQgY29udGVudHMsIGJ1dCBub3QgYm90aCEgdGh1cyxcbiAgICAgICAgLy8gaWYgeW91IGp1c3QgbW92ZSBlbGVtZW50cyBpbiB0aGUgZG9tLCB5b3Uga2VlcCBmaWVsZCBuYW1lcyBhbmQgZGF0YVxuICAgICAgICAvLyBhdHRhY2hlZCBhbmQgbm90aGluZyB3aWxsIGNoYW5nZSBpbiB0aGUgYmFja2VuZC5cbiAgICAgICAgdmFyIHN3YXBFbGVtZW50cyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50cywgb2xkSW5kZXgsIG5ld0luZGV4KSB7XG5cbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IGNvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1zZXR0aW5ncycpO1xuXG4gICAgICAgICAgICBpZiAoIXNldHRpbmdzLnBvc2l0aW9uX2ZpZWxkX3NlbGVjdG9yICYmICFzZXR0aW5ncy5wcmVzZXJ2ZV9uYW1lcykge1xuICAgICAgICAgICAgICAgIGNoYW5nZUVsZW1lbnRJbmRleChjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIG9sZEluZGV4LCBvbGRJbmRleCwgJ19fc3dhcF9fJyk7XG4gICAgICAgICAgICAgICAgY2hhbmdlRWxlbWVudEluZGV4KGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBzZXR0aW5ncywgbmV3SW5kZXgsIG5ld0luZGV4LCBvbGRJbmRleCk7XG4gICAgICAgICAgICAgICAgY2hhbmdlRWxlbWVudEluZGV4KGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBzZXR0aW5ncywgb2xkSW5kZXgsICdfX3N3YXBfXycsIG5ld0luZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWxlbWVudHMuZXEob2xkSW5kZXgpLmluc2VydEJlZm9yZShlbGVtZW50cy5lcShuZXdJbmRleCkpO1xuICAgICAgICAgICAgaWYgKG5ld0luZGV4ID4gb2xkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5lcShuZXdJbmRleCkuaW5zZXJ0QmVmb3JlKGVsZW1lbnRzLmVxKG9sZEluZGV4KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmVxKG5ld0luZGV4KS5pbnNlcnRBZnRlcihlbGVtZW50cy5lcShvbGRJbmRleCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBtb3ZpbmcgYW4gZWxlbWVudCBkb3duIG9mIDMgcm93cyBtZWFucyBpbmNyZWFzaW5nIGl0cyBpbmRleCBvZiAzLCBhbmRcbiAgICAgICAgLy8gZGVjcmVhc2luZyB0aGUgMiBvbmVzIGJldHdlZW4gb2YgMS4gRXhhbXBsZTogMC1BIDEtQiAyLUMgMy1EOlxuICAgICAgICAvLyBtb3ZpbmcgQiB0byAzIGJlY29tZXMgMC1BIDEtQyAyLUQgMy1CXG4gICAgICAgIHZhciBzd2FwRWxlbWVudHNVcCA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIG9sZEluZGV4LCBuZXdJbmRleCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IG9sZEluZGV4ICsgMTsgKGkgPD0gbmV3SW5kZXgpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50cyhjb2xsZWN0aW9uLCBlbGVtZW50cywgaSwgaSAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb24uZmluZChzZXR0aW5ncy5lbGVtZW50c19zZWxlY3Rvcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gbW92aW5nIGFuIGVsZW1lbnQgdXAgb2YgMyByb3dzIG1lYW5zIGRlY3JlYXNpbmcgaXRzIGluZGV4IG9mIDMsIGFuZFxuICAgICAgICAvLyBpbmNyZWFzaW5nIHRoZSAyIG9uZXMgYmV0d2VlbiBvZiAxLiBFeGFtcGxlOiAwLUEgMS1CIDItQyAzLUQ6XG4gICAgICAgIC8vIG1vdmluZyBEIHRvIDEgYmVjb21lcyAwLUEgMS1EIDItQiAzLUNcbiAgICAgICAgdmFyIHN3YXBFbGVtZW50c0Rvd24gPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBvbGRJbmRleCwgbmV3SW5kZXgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBvbGRJbmRleCAtIDE7IChpID49IG5ld0luZGV4KTsgaS0tKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHMoY29sbGVjdGlvbiwgZWxlbWVudHMsIGksIGkgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGlmIHdlIGNyZWF0ZSBhbiBlbGVtZW50IGF0IHBvc2l0aW9uIDIsIGFsbCBlbGVtZW50IGluZGV4ZXMgZnJvbSAyIHRvIE5cbiAgICAgICAgLy8gc2hvdWxkIGJlIGluY3JlYXNlZC4gZm9yIGV4YW1wbGUsIGluIDAtQSAxLUIgMi1DIDMtRCwgYWRkaW5nIFggYXQgcG9zaXRpb25cbiAgICAgICAgLy8gMSB3aWxsIGNyZWF0ZSAwLUEgMS1YIDItQiAzLUMgNC1EXG4gICAgICAgIHZhciBzaGlmdEVsZW1lbnRzVXAgPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBpbmRleCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGluZGV4ICsgMTsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHMoY29sbGVjdGlvbiwgZWxlbWVudHMsIGkgLSAxLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGlmIHdlIHJlbW92ZSBhbiBlbGVtZW50IGF0IHBvc2l0aW9uIDMsIGFsbCBlbGVtZW50IGluZGV4ZXMgZnJvbSAzIHRvIE5cbiAgICAgICAgLy8gc2hvdWxkIGJlIGRlY3JlYXNlZC4gZm9yIGV4YW1wbGUsIGluIDAtQSAxLUIgMi1DIDMtRCwgcmVtb3ZpbmcgQiB3aWxsIGNyZWF0ZVxuICAgICAgICAvLyAwLUEgMS1DIDItRFxuICAgICAgICB2YXIgc2hpZnRFbGVtZW50c0Rvd24gPSBmdW5jdGlvbiAoY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBpbmRleCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGVsZW1lbnRzLmxlbmd0aCAtIDI7IGkgPiBpbmRleDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHMoY29sbGVjdGlvbiwgZWxlbWVudHMsIGkgKyAxLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRoaXMgbWV0aG9kIGNyZWF0ZXMgYnV0dG9ucyBmb3IgZWFjaCBhY3Rpb24sIGFjY29yZGluZyB0byBhbGwgb3B0aW9ucyBzZXRcbiAgICAgICAgLy8gKGJ1dHRvbnMgZW5hYmxlZCwgbWluaW11bS9tYXhpbXVtIG9mIGVsZW1lbnRzIG5vdCB5ZXQgcmVhY2hlZCwgcmVzY3VlXG4gICAgICAgIC8vIGJ1dHRvbiBjcmVhdGlvbiB3aGVuIG5vIG1vcmUgZWxlbWVudHMgYXJlIHJlbWFpbmluZy4uLilcbiAgICAgICAgdmFyIGR1bXBDb2xsZWN0aW9uQWN0aW9ucyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBzZXR0aW5ncywgaXNJbml0aWFsaXphdGlvbiwgZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50c1BhcmVudCA9ICQoc2V0dGluZ3MuZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yKTtcbiAgICAgICAgICAgIHZhciBpbml0ID0gZWxlbWVudHNQYXJlbnQuZmluZCgnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLXRtcCcpLmxlbmd0aCA9PT0gMDtcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGNvbGxlY3Rpb24uZmluZChzZXR0aW5ncy5lbGVtZW50c19zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIGFkZCBhIHJlc2N1ZSBidXR0b24gdGhhdCB3aWxsIGFwcGVhciBvbmx5IGlmIGNvbGxlY3Rpb24gaXMgZW1wdGllZFxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmFsbG93X2FkZCkge1xuICAgICAgICAgICAgICAgIGlmIChpbml0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzUGFyZW50LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCInICsgc2V0dGluZ3MucHJlZml4ICsgJy10bXBcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5hZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzUGFyZW50LmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNldHRpbmdzLmFkZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKHNldHRpbmdzLnByZWZpeCArICctYWN0aW9uICcgKyBzZXR0aW5ncy5wcmVmaXggKyAnLXJlc2N1ZS1hZGQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGF0YSgnY29sbGVjdGlvbicsIGNvbGxlY3Rpb24uYXR0cignaWQnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGluaXRpYWxpemVzIHRoZSBjb2xsZWN0aW9uIHdpdGggYSBtaW5pbWFsIG51bWJlciBvZiBlbGVtZW50c1xuICAgICAgICAgICAgaWYgKGlzSW5pdGlhbGl6YXRpb24pIHtcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLmRhdGEoJ2NvbGxlY3Rpb24tb2Zmc2V0JywgMCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJChzZXR0aW5ncy5jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIHZhciBidXR0b24gPSBjb2xsZWN0aW9uLmZpbmQoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1hZGQsIC4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1yZXNjdWUtYWRkLCAuJyArIHNldHRpbmdzLnByZWZpeCArICctZHVwbGljYXRlJykuZmlyc3QoKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZWxlbWVudHMubGVuZ3RoIDwgc2V0dGluZ3MuaW5pdF93aXRoX25fZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBlbGVtZW50cy5sZW5ndGggPiAwID8gZWxlbWVudHMubGFzdCgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBlbGVtZW50cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGRvQWRkKGNvbnRhaW5lciwgYnV0dG9uLCBjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIGluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLW9mZnNldCcsIGVsZW1lbnRzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1ha2UgYnV0dG9ucyBhcHBlYXIvZGlzYXBwZWFyIGluIGVhY2ggZWxlbWVudHMgb2YgdGhlIGNvbGxlY3Rpb24gYWNjb3JkaW5nIHRvIG9wdGlvbnNcbiAgICAgICAgICAgIC8vIChlbmFibGVkLCBtaW4vbWF4Li4uKSBhbmQgbG9naWMgKGZvciBleGFtcGxlLCBkbyBub3QgcHV0IGEgbW92ZSB1cCBidXR0b24gb24gdGhlIGZpcnN0XG4gICAgICAgICAgICAvLyBlbGVtZW50IG9mIHRoZSBjb2xsZWN0aW9uKVxuICAgICAgICAgICAgZWxlbWVudHMuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNJbml0aWFsaXphdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGEoJ2luZGV4JywgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb25zID0gZWxlbWVudC5maW5kKCcuJyArIHNldHRpbmdzLnByZWZpeCArICctYWN0aW9ucycpLmFkZEJhY2soKS5maWx0ZXIoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1hY3Rpb25zJyk7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbnMgPSAkKCc8ZGl2IGNsYXNzPVwiJyArIHNldHRpbmdzLnByZWZpeCArICctYWN0aW9uc1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZChhY3Rpb25zKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGVsdGEgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChldmVudCA9PT0gJ3JlbW92ZScgJiYgc2V0dGluZ3MuZmFkZV9vdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBidXR0b25zID0gW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZW5hYmxlZCc6IHNldHRpbmdzLmFsbG93X3JlbW92ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzZWxlY3Rvcic6IHNldHRpbmdzLnByZWZpeCArICctcmVtb3ZlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogc2V0dGluZ3MucmVtb3ZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbmRpdGlvbic6IGVsZW1lbnRzLmxlbmd0aCAtIGRlbHRhID4gc2V0dGluZ3MubWluXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdlbmFibGVkJzogc2V0dGluZ3MuYWxsb3dfdXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VsZWN0b3InOiBzZXR0aW5ncy5wcmVmaXggKyAnLXVwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogc2V0dGluZ3MudXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZGl0aW9uJzogZWxlbWVudHMubGVuZ3RoIC0gZGVsdGEgPiAxICYmIGVsZW1lbnRzLmluZGV4KGVsZW1lbnQpIC0gZGVsdGEgPiAwXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdlbmFibGVkJzogc2V0dGluZ3MuYWxsb3dfZG93bixcbiAgICAgICAgICAgICAgICAgICAgICAgICdzZWxlY3Rvcic6IHNldHRpbmdzLnByZWZpeCArICctZG93bicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHRtbCc6IHNldHRpbmdzLmRvd24sXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZGl0aW9uJzogZWxlbWVudHMubGVuZ3RoIC0gZGVsdGEgPiAxICYmIGVsZW1lbnRzLmluZGV4KGVsZW1lbnQpICE9PSBlbGVtZW50cy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdlbmFibGVkJzogc2V0dGluZ3MuYWxsb3dfYWRkICYmICFzZXR0aW5ncy5hZGRfYXRfdGhlX2VuZCAmJiAhc2V0dGluZ3MuY3VzdG9tX2FkZF9sb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICdzZWxlY3Rvcic6IHNldHRpbmdzLnByZWZpeCArICctYWRkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodG1sJzogc2V0dGluZ3MuYWRkLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2NvbmRpdGlvbic6IGVsZW1lbnRzLmxlbmd0aCAtIGRlbHRhIDwgc2V0dGluZ3MubWF4XG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdlbmFibGVkJzogc2V0dGluZ3MuYWxsb3dfZHVwbGljYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NlbGVjdG9yJzogc2V0dGluZ3MucHJlZml4ICsgJy1kdXBsaWNhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0bWwnOiBzZXR0aW5ncy5kdXBsaWNhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29uZGl0aW9uJzogZWxlbWVudHMubGVuZ3RoIC0gZGVsdGEgPCBzZXR0aW5ncy5tYXhcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICAkLmVhY2goYnV0dG9ucywgZnVuY3Rpb24gKGksIGJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnV0dG9uLmVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBlbGVtZW50LmZpbmQoJy4nICsgYnV0dG9uLnNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubGVuZ3RoID09PSAwICYmIGJ1dHRvbi5odG1sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uID0gJChidXR0b24uaHRtbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKGFjdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhidXR0b24uc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1dHRvbi5jb25kaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucmVtb3ZlQ2xhc3Moc2V0dGluZ3MucHJlZml4ICsgJy1hY3Rpb24tZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuaGlkZV91c2VsZXNzX2J1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLmNzcygnZGlzcGxheScsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5hZGRDbGFzcyhzZXR0aW5ncy5wcmVmaXggKyAnLWFjdGlvbi1kaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5oaWRlX3VzZWxlc3NfYnV0dG9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3Moc2V0dGluZ3MucHJlZml4ICsgJy1hY3Rpb24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdjb2xsZWN0aW9uJywgY29sbGVjdGlvbi5hdHRyKCdpZCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKCdlbGVtZW50JywgZ2V0T3JDcmVhdGVJZChjb2xsZWN0aW9uLmF0dHIoJ2lkJykgKyAnXycgKyBpbmRleCwgZWxlbWVudCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5maW5kKCcuJyArIGJ1dHRvbi5zZWxlY3RvcikuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTsgLy8gZWxlbWVudHMuZWFjaFxuXG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZXNjdWUgYnV0dG9uIGFwcGVhciAvIGRpc2FwcGVhciBhY2NvcmRpbmcgdG8gb3B0aW9ucyAoYWRkX2F0X3RoZV9lbmQpIGFuZFxuICAgICAgICAgICAgLy8gbG9naWMgKG5vIG1vcmUgZWxlbWVudHMgb24gdGhlIGNvbGxlY3Rpb24pXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuYWxsb3dfYWRkKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGVsdGEgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChldmVudCA9PT0gJ3JlbW92ZScgJiYgc2V0dGluZ3MuZmFkZV9vdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEgPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByZXNjdWVBZGQgPSBjb2xsZWN0aW9uLmZpbmQoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1yZXNjdWUtYWRkJykuY3NzKCdkaXNwbGF5JywgJycpLnJlbW92ZUNsYXNzKHNldHRpbmdzLnByZWZpeCArICctYWN0aW9uLWRpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgdmFyIGFkZHMgPSBjb2xsZWN0aW9uLmZpbmQoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1hZGQnKTtcbiAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmdzLmFkZF9hdF90aGVfZW5kICYmIGFkZHMubGVuZ3RoID4gZGVsdGEgfHwgc2V0dGluZ3MuY3VzdG9tX2FkZF9sb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXNjdWVBZGQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAncmVtb3ZlJyAmJiBzZXR0aW5ncy5mYWRlX291dCkge1xuICAgICAgICAgICAgICAgICAgICByZXNjdWVBZGQuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzY3VlQWRkLmZhZGVJbignZmFzdCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoIC0gZGVsdGEgPj0gc2V0dGluZ3MubWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc2N1ZUFkZC5hZGRDbGFzcyhzZXR0aW5ncy5wcmVmaXggKyAnLWFjdGlvbi1kaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuaGlkZV91c2VsZXNzX2J1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24uZmluZCgnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWFkZCwgLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLXJlc2N1ZS1hZGQsIC4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1kdXBsaWNhdGUnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07IC8vIGR1bXBDb2xsZWN0aW9uQWN0aW9uc1xuXG4gICAgICAgIC8vIHRoaXMgcGx1Z2luIHN1cHBvcnRzIG5lc3RlZCBjb2xsZWN0aW9ucywgYW5kIHRoaXMgbWV0aG9kIGVuYWJsZXMgdGhlbSB3aGVuIHRoZVxuICAgICAgICAvLyBwYXJlbnQgY29sbGVjdGlvbiBpcyBpbml0aWFsaXplZC4gc2VlXG4gICAgICAgIC8vIGh0dHA6Ly9zeW1mb255LWNvbGxlY3Rpb24uZnV6Lm9yZy9zeW1mb255My9hZHZhbmNlZC9jb2xsZWN0aW9uT2ZDb2xsZWN0aW9uc1xuICAgICAgICB2YXIgZW5hYmxlQ2hpbGRyZW5Db2xsZWN0aW9ucyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBlbGVtZW50LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKHNldHRpbmdzLmNoaWxkcmVuLCBmdW5jdGlvbiAoaW5kZXgsIGNoaWxkcmVuU2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGlsZHJlblNldHRpbmdzLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImpxdWVyeS5jb2xsZWN0aW9uLmpzOiBnaXZlbiBjb2xsZWN0aW9uIFwiICsgY29sbGVjdGlvbi5hdHRyKCdpZCcpICsgXCIgaGFzIGNoaWxkcmVuIGNvbGxlY3Rpb25zLCBidXQgY2hpbGRyZW4ncyByb290IHNlbGVjdG9yIGlzIHVuZGVmaW5lZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5maW5kKGNoaWxkcmVuU2V0dGluZ3Muc2VsZWN0b3IpLmNvbGxlY3Rpb24oY2hpbGRyZW5TZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLmZpbmQoY2hpbGRyZW5TZXR0aW5ncy5zZWxlY3RvcikuY29sbGVjdGlvbihjaGlsZHJlblNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRoaXMgbWV0aG9kIGhhbmRsZXMgYSBjbGljayBvbiBcImFkZFwiIGJ1dHRvbnMsIGl0IGluY3JlYXNlcyBhbGwgZm9sbG93aW5nIGVsZW1lbnQgaW5kZXhlcyBvZlxuICAgICAgICAvLyAxIHBvc2l0aW9uIGFuZCBpbnNlcnQgYSBuZXcgb25lIGluIHRoZSBpbmRleCB0aGF0IGJlY29tZXMgZnJlZS4gaWYgY2xpY2sgaGFzIGJlZW4gbWFkZSBvbiBhXG4gICAgICAgIC8vIFwiZHVwbGljYXRlXCIgYnV0dG9uLCBhbGwgZWxlbWVudCB2YWx1ZXMgYXJlIHRoZW4gaW5zZXJ0ZWQuIGZpbmFsbHksIGNhbGxiYWNrcyBsZXQgdXNlciBjYW5jZWxcbiAgICAgICAgLy8gdGhvc2UgYWN0aW9ucyBpZiBuZWVkZWQuXG4gICAgICAgIHZhciBkb0FkZCA9IGZ1bmN0aW9uIChjb250YWluZXIsIHRoYXQsIGNvbGxlY3Rpb24sIHNldHRpbmdzLCBlbGVtZW50cywgZWxlbWVudCwgaW5kZXgsIGlzRHVwbGljYXRlKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoIDwgc2V0dGluZ3MubWF4ICYmIChpc0R1cGxpY2F0ZSAmJiB0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYmVmb3JlX2R1cGxpY2F0ZShjb2xsZWN0aW9uLCBlbGVtZW50KSkgfHwgdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmJlZm9yZV9hZGQoY29sbGVjdGlvbiwgZWxlbWVudCkpKSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm90b3R5cGUgPSBjb2xsZWN0aW9uLmRhdGEoJ3Byb3RvdHlwZScpO1xuICAgICAgICAgICAgICAgIHZhciBmcmVlSW5kZXggPSBjb2xsZWN0aW9uLmRhdGEoJ2NvbGxlY3Rpb24tb2Zmc2V0Jyk7XG5cbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uLmRhdGEoJ2NvbGxlY3Rpb24tb2Zmc2V0JywgZnJlZUluZGV4ICsgMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZWxlbWVudHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAocHJlZ1F1b3RlKHNldHRpbmdzLnByb3RvdHlwZV9uYW1lKSwgJ2cnKTtcbiAgICAgICAgICAgICAgICB2YXIgZnJlZUtleSA9IGZyZWVJbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5wcmVzZXJ2ZV9uYW1lcykge1xuICAgICAgICAgICAgICAgICAgICBmcmVlS2V5ID0gY29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLWZyZWUta2V5Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyZWVLZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJlZUtleSA9IGZpbmRGcmVlTnVtZXJpY0tleShzZXR0aW5ncywgZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLWZyZWUta2V5JywgZnJlZUtleSArIDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gJChwcm90b3R5cGUucmVwbGFjZShyZWdleHAsIGZyZWVLZXkpKS5kYXRhKCdpbmRleCcsIGZyZWVJbmRleCk7XG4gICAgICAgICAgICAgICAgc2V0UmlnaHRQcmVmaXgoc2V0dGluZ3MsIGNvZGUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzUGFyZW50ID0gJChzZXR0aW5ncy5lbGVtZW50c19wYXJlbnRfc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBlbGVtZW50c1BhcmVudC5maW5kKCc+IC4nICsgc2V0dGluZ3MucHJlZml4ICsgJy10bXAnKTtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSAkKGNvZGUpLmZpbmQoJ1tpZF0nKS5maXJzdCgpLmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNEdXBsaWNhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZEVsZW1lbnQgPSBlbGVtZW50cy5lcShpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHB1dEZpZWxkVmFsdWVzSW5Eb20ob2xkRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRIdG1sID0gJChcIjxkaXYvPlwiKS5hcHBlbmQob2xkRWxlbWVudC5jbG9uZSgpKS5odG1sKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRJbmRleCA9IHNldHRpbmdzLnByZXNlcnZlX25hbWVzIHx8IHNldHRpbmdzLnBvc2l0aW9uX2ZpZWxkX3NlbGVjdG9yID8gb2xkRWxlbWVudC5kYXRhKCdpbmRleCcpIDogaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRLZXkgPSBzZXR0aW5ncy5wcmVzZXJ2ZV9uYW1lcyA/IGdldEVsZW1lbnRLZXkoc2V0dGluZ3MsIG9sZEVsZW1lbnQpIDogb2xkSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdIdG1sID0gY2hhbmdlSHRtbEluZGV4KGNvbGxlY3Rpb24sIHNldHRpbmdzLCBvbGRIdG1sLCBvbGRJbmRleCwgZnJlZUluZGV4LCBvbGRLZXksIGZyZWVLZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSAkKCc8ZGl2Lz4nKS5odG1sKG5ld0h0bWwpLmNvbnRlbnRzKCkuZGF0YSgnaW5kZXgnLCBmcmVlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MuZmFkZV9pbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG1wLmJlZm9yZShjb2RlKS5maW5kKHNldHRpbmdzLnByZWZpeCArICctYWN0aW9ucycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5mYWRlX2luKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRtcC5iZWZvcmUoY29kZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGNvZGUuZmluZCgnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWFkZCwgLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWR1cGxpY2F0ZScpO1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uYWRkQ2xhc3Moc2V0dGluZ3MucHJlZml4ICsgJy1hY3Rpb24nKS5kYXRhKCdjb2xsZWN0aW9uJywgY29sbGVjdGlvbi5hdHRyKCdpZCcpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmdzLmFkZF9hdF90aGVfZW5kICYmIGluZGV4ICsgMSAhPT0gZnJlZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gZG9Nb3ZlKGNvbGxlY3Rpb24sIHNldHRpbmdzLCBlbGVtZW50cywgY29kZSwgZnJlZUluZGV4LCBpbmRleCArIDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGR1bXBDb2xsZWN0aW9uQWN0aW9ucyhjb2xsZWN0aW9uLCBzZXR0aW5ncywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVuYWJsZUNoaWxkcmVuQ29sbGVjdGlvbnMoY29sbGVjdGlvbiwgY29kZSwgc2V0dGluZ3MpO1xuXG4gICAgICAgICAgICAgICAgaWYgKChpc0R1cGxpY2F0ZSAmJiAhdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmFmdGVyX2R1cGxpY2F0ZShjb2xsZWN0aW9uLCBjb2RlKSkpIHx8ICF0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYWZ0ZXJfYWRkKGNvbGxlY3Rpb24sIGNvZGUpKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHNoaWZ0RWxlbWVudHNVcChjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb2RlICE9PSB1bmRlZmluZWQgJiYgc2V0dGluZ3MuZmFkZV9pbikge1xuICAgICAgICAgICAgICAgIGNvZGUuZmFkZUluKCdmYXN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ3MucG9zaXRpb25fZmllbGRfc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvUmV3cml0ZVBvc2l0aW9ucyhzZXR0aW5ncywgZWxlbWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5ncy5wb3NpdGlvbl9maWVsZF9zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9SZXdyaXRlUG9zaXRpb25zKHNldHRpbmdzLCBlbGVtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gcmVtb3ZlcyB0aGUgY3VycmVudCBlbGVtZW50IHdoZW4gY2xpY2tpbmcgb24gYSBcImRlbGV0ZVwiIGJ1dHRvbiBhbmQgZGVjcmVhc2UgYWxsIGZvbGxvd2luZ1xuICAgICAgICAvLyBpbmRleGVzIGZyb20gMSBwb3NpdGlvbi5cbiAgICAgICAgdmFyIGRvRGVsZXRlID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIHNldHRpbmdzLCBlbGVtZW50cywgZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50cy5sZW5ndGggPiBzZXR0aW5ncy5taW4gJiYgdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmJlZm9yZV9yZW1vdmUoY29sbGVjdGlvbiwgZWxlbWVudCkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlbGV0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9EZWxldGUgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmdzLnByZXNlcnZlX25hbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHNoaWZ0RWxlbWVudHNVcChjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvRGVsZXRlID0gZWxlbWVudHMubGFzdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBiYWNrdXAgPSB0b0RlbGV0ZS5jbG9uZSh7d2l0aERhdGFBbmRFdmVudHM6IHRydWV9KS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRvRGVsZXRlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5hZnRlcl9yZW1vdmUoY29sbGVjdGlvbiwgYmFja3VwKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50c1BhcmVudCA9ICQoc2V0dGluZ3MuZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzUGFyZW50LmZpbmQoJz4gLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLXRtcCcpLmJlZm9yZShiYWNrdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzaGlmdEVsZW1lbnRzRG93bihjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIGluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLnBvc2l0aW9uX2ZpZWxkX3NlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb1Jld3JpdGVQb3NpdGlvbnMoc2V0dGluZ3MsIGVsZW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzLmZhZGVfb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZmFkZU91dCgnZmFzdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gcmV2ZXJzZSBjdXJyZW50IGVsZW1lbnQgYW5kIHRoZSBwcmV2aW91cyBvbmUgKHNvIHRoZSBjdXJyZW50IGVsZW1lbnRcbiAgICAgICAgLy8gYXBwZWFycyBvbmUgcGxhY2UgaGlnaGVyKVxuICAgICAgICB2YXIgZG9VcCA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IDAgJiYgdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmJlZm9yZV91cChjb2xsZWN0aW9uLCBlbGVtZW50KSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50cyhjb2xsZWN0aW9uLCBlbGVtZW50cywgaW5kZXgsIGluZGV4IC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYWZ0ZXJfdXAoY29sbGVjdGlvbiwgZWxlbWVudCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc3dhcEVsZW1lbnRzKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBpbmRleCAtIDEsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5wb3NpdGlvbl9maWVsZF9zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb1Jld3JpdGVQb3NpdGlvbnMoc2V0dGluZ3MsIGVsZW1lbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHJldmVyc2UgdGhlIGN1cnJlbnQgZWxlbWVudCBhbmQgdGhlIG5leHQgb25lIChzbyB0aGUgY3VycmVudCBlbGVtZW50XG4gICAgICAgIC8vIGFwcGVhcnMgb25lIHBsYWNlIGxvd2VyKVxuICAgICAgICB2YXIgZG9Eb3duID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIHNldHRpbmdzLCBlbGVtZW50cywgZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gKGVsZW1lbnRzLmxlbmd0aCAtIDEpICYmIHRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5iZWZvcmVfZG93bihjb2xsZWN0aW9uLCBlbGVtZW50KSkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50cyhjb2xsZWN0aW9uLCBlbGVtZW50cywgaW5kZXgsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYWZ0ZXJfZG93bihjb2xsZWN0aW9uLCBlbGVtZW50cykpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc3dhcEVsZW1lbnRzKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBpbmRleCArIDEsIGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5wb3NpdGlvbl9maWVsZF9zZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb1Jld3JpdGVQb3NpdGlvbnMoc2V0dGluZ3MsIGVsZW1lbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIG1vdmUgYW4gZWxlbWVudCBmcm9tIGEgcG9zaXRpb24gdG8gYW4gYXJiaXRyYXJ5IG5ldyBwb3NpdGlvblxuICAgICAgICB2YXIgZG9Nb3ZlID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIHNldHRpbmdzLCBlbGVtZW50cywgZWxlbWVudCwgb2xkSW5kZXgsIG5ld0luZGV4KSB7XG4gICAgICAgICAgICBpZiAoMSA9PT0gTWF0aC5hYnMobmV3SW5kZXggLSBvbGRJbmRleCkpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50cyhjb2xsZWN0aW9uLCBlbGVtZW50cywgb2xkSW5kZXgsIG5ld0luZGV4KTtcbiAgICAgICAgICAgICAgICBpZiAoIShuZXdJbmRleCAtIG9sZEluZGV4ID4gMCA/IHRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5hZnRlcl91cChjb2xsZWN0aW9uLCBlbGVtZW50KSkgOiB0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYWZ0ZXJfZG93bihjb2xsZWN0aW9uLCBlbGVtZW50KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc3dhcEVsZW1lbnRzKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBuZXdJbmRleCwgb2xkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEluZGV4IDwgbmV3SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBzd2FwRWxlbWVudHNVcChjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIG9sZEluZGV4LCBuZXdJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKG5ld0luZGV4IC0gb2xkSW5kZXggPiAwID8gdHJ1ZU9yVW5kZWZpbmVkKHNldHRpbmdzLmFmdGVyX3VwKGNvbGxlY3Rpb24sIGVsZW1lbnQpKSA6IHRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5hZnRlcl9kb3duKGNvbGxlY3Rpb24sIGVsZW1lbnQpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gc3dhcEVsZW1lbnRzRG93bihjb2xsZWN0aW9uLCBlbGVtZW50cywgc2V0dGluZ3MsIG5ld0luZGV4LCBvbGRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50c0Rvd24oY29sbGVjdGlvbiwgZWxlbWVudHMsIHNldHRpbmdzLCBvbGRJbmRleCwgbmV3SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShuZXdJbmRleCAtIG9sZEluZGV4ID4gMCA/IHRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5hZnRlcl91cChjb2xsZWN0aW9uLCBlbGVtZW50KSkgOiB0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYWZ0ZXJfZG93bihjb2xsZWN0aW9uLCBlbGVtZW50KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IHN3YXBFbGVtZW50c1VwKGNvbGxlY3Rpb24sIGVsZW1lbnRzLCBzZXR0aW5ncywgbmV3SW5kZXgsIG9sZEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGR1bXBDb2xsZWN0aW9uQWN0aW9ucyhjb2xsZWN0aW9uLCBzZXR0aW5ncywgZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MucG9zaXRpb25fZmllbGRfc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9SZXdyaXRlUG9zaXRpb25zKHNldHRpbmdzLCBlbGVtZW50cyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50cztcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZG9SZXdyaXRlUG9zaXRpb25zID0gZnVuY3Rpb24gKHNldHRpbmdzLCBlbGVtZW50cykge1xuICAgICAgICAgICAgJChlbGVtZW50cykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIHB1dEZpZWxkVmFsdWUoZWxlbWVudC5maW5kKHNldHRpbmdzLnBvc2l0aW9uX2ZpZWxkX3NlbGVjdG9yKSwgZWxlbWVudHMuaW5kZXgoZWxlbWVudCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50cztcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZ2V0RWxlbWVudEtleSA9IGZ1bmN0aW9uIChzZXR0aW5ncywgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBlbGVtZW50LmZpbmQoJzppbnB1dFtuYW1lXj1cIicgKyBzZXR0aW5ncy5uYW1lX3ByZWZpeCArICdbXCJdJykuYXR0cignbmFtZScpO1xuXG4gICAgICAgICAgICByZXR1cm4gbmFtZS5zbGljZShzZXR0aW5ncy5uYW1lX3ByZWZpeC5sZW5ndGggKyAxKS5zcGxpdCgnXScsIDEpWzBdO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBmaW5kRnJlZU51bWVyaWNLZXkgPSBmdW5jdGlvbiAoc2V0dGluZ3MsIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgZnJlZUtleSA9IDA7XG5cbiAgICAgICAgICAgIGVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXRFbGVtZW50S2V5KHNldHRpbmdzLCAkKHRoaXMpKTtcblxuICAgICAgICAgICAgICAgIGlmICgvXjB8WzEtOV1cXGQqJC8udGVzdChrZXkpICYmIGtleSA+PSBmcmVlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGZyZWVLZXkgPSBOdW1iZXIoa2V5KSArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBmcmVlS2V5O1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzZXRSaWdodFByZWZpeCA9IGZ1bmN0aW9uIChzZXR0aW5ncywgY29udGFpbmVyKSB7XG4gICAgICAgICAgICB2YXIgc3VmZml4ZXMgPSBbXG4gICAgICAgICAgICAgICAgJy1hY3Rpb24nLFxuICAgICAgICAgICAgICAgICctYWN0aW9uLWRpc2FibGVkJyxcbiAgICAgICAgICAgICAgICAnLWFjdGlvbnMnLFxuICAgICAgICAgICAgICAgICctYWRkJyxcbiAgICAgICAgICAgICAgICAnLWRvd24nLFxuICAgICAgICAgICAgICAgICctZHVwbGljYXRlJyxcbiAgICAgICAgICAgICAgICAnLXJlbW92ZScsXG4gICAgICAgICAgICAgICAgJy1yZXNjdWUtYWRkJyxcbiAgICAgICAgICAgICAgICAnLXRtcCcsXG4gICAgICAgICAgICAgICAgJy11cCdcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICQuZWFjaChzdWZmaXhlcywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5oYXNDbGFzcyhzZXR0aW5ncy51c2VyX3ByZWZpeCArIHN1ZmZpeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkQ2xhc3Moc2V0dGluZ3MucHJlZml4ICsgc3VmZml4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmQoJyonKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZXJlID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZXJlLmhhc0NsYXNzKHNldHRpbmdzLnVzZXJfcHJlZml4ICsgc3VmZml4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlcmUuYWRkQ2xhc3Moc2V0dGluZ3MucHJlZml4ICsgc3VmZml4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB3ZSdyZSBpbiBhICQuZm4uLCBzbyBpbiAkKCcuY29sbGVjdGlvbicpLmNvbGxlY3Rpb24oKSwgJCh0aGlzKSBlcXVhbHMgJCgnLmNvbGxlY3Rpb24nKVxuICAgICAgICB2YXIgZWxlbXMgPSAkKHRoaXMpO1xuXG4gICAgICAgIC8vIGF0IGxlYXN0IG9uZSwgYnV0IHdoeSBub3Qgc2V2ZXJhbCBjb2xsZWN0aW9ucyBzaG91bGQgYmUgcmFpc2VkXG4gICAgICAgIGlmIChlbGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianF1ZXJ5LmNvbGxlY3Rpb24uanM6IGdpdmVuIGNvbGxlY3Rpb24gc2VsZWN0b3IgZG9lcyBub3QgZXhpc3QuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIC8vIHVzYWdlIG9mICQuZm4ub24gZXZlbnRzIHVzaW5nIGEgc3RhdGljIGNvbnRhaW5lciBqdXN0IGluIGNhc2UgdGhlcmUgd291bGQgYmUgc29tZVxuICAgICAgICAgICAgLy8gYWpheCBpbnRlcmFjdGlvbnMgaW5zaWRlIHRoZSBjb2xsZWN0aW9uXG4gICAgICAgICAgICBpZiAoJChzZXR0aW5ncy5jb250YWluZXIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianF1ZXJ5LmNvbGxlY3Rpb24uanM6IGEgY29udGFpbmVyIHNob3VsZCBleGlzdCB0byBoYW5kbGUgZXZlbnRzIChiYXNpY2FsbHksIGEgPGJvZHk+IHRhZykuXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaXQgaXMgcG9zc2libGUgdG8gdXNlIHRoaXMgcGx1Z2luIHdpdGggYSBzZWxlY3RvciB0aGF0IHdpbGwgY29udGFpbiB0aGUgY29sbGVjdGlvbiBpZFxuICAgICAgICAgICAgLy8gaW4gYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICAgICAgdmFyIGVsZW0gPSAkKHRoaXMpO1xuICAgICAgICAgICAgaWYgKGVsZW0uZGF0YSgnY29sbGVjdGlvbicpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29sbGVjdGlvbiA9ICQoJyMnICsgZWxlbS5kYXRhKCdjb2xsZWN0aW9uJykpO1xuICAgICAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImpxdWVyeS5jb2xsZWN0aW9uLmpzOiBnaXZlbiBjb2xsZWN0aW9uIGlkIGRvZXMgbm90IGV4aXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uID0gZWxlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbGxlY3Rpb24gPSAkKGNvbGxlY3Rpb24pO1xuXG4gICAgICAgICAgICAvLyB3aGVuIGFkZGluZyBlbGVtZW50cyB0byBhIGNvbGxlY3Rpb24sIHdlIHNob3VsZCBiZSBhd2FyZSBvZiB0aGUgbm9kZSB0aGF0IHdpbGwgY29udGFpbiB0aGVtXG4gICAgICAgICAgICBzZXR0aW5ncy5lbGVtZW50c19wYXJlbnRfc2VsZWN0b3IgPSBzZXR0aW5ncy5lbGVtZW50c19wYXJlbnRfc2VsZWN0b3IucmVwbGFjZSgnJWlkJScsICcjJyArIGdldE9yQ3JlYXRlSWQoJycsIGNvbGxlY3Rpb24pKTtcbiAgICAgICAgICAgIGlmICghc2V0dGluZ3MuZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yID0gJyMnICsgZ2V0T3JDcmVhdGVJZCgnJywgY29sbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKCQoc2V0dGluZ3MuZWxlbWVudHNfcGFyZW50X3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJqcXVlcnkuY29sbGVjdGlvbi5qczogZ2l2ZW4gZWxlbWVudHMgcGFyZW50IHNlbGVjdG9yIGRvZXMgbm90IHJldHVybiBhbnkgb2JqZWN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBPbiBuZXN0ZWQgY29sbGVjdGlvbnMsIHByZWZpeCBpcyB0aGUgc2FtZSBmb3IgYWxsIGNoaWxkcmVuIGxlYWRpbmcgdG8gdmVyeVxuICAgICAgICAgICAgLy8gcmFuZG9tIGFuZCB1bmV4ZXBjdGVkIGlzc3Vlcywgc28gd2UgbWVyZ2UgcHJlZml4IHdpdGggY3VycmVudCBjb2xsZWN0aW9uIGlkLlxuICAgICAgICAgICAgc2V0dGluZ3MudXNlcl9wcmVmaXggPSBzZXR0aW5ncy5wcmVmaXg7XG4gICAgICAgICAgICBzZXR0aW5ncy5wcmVmaXggPSBjb2xsZWN0aW9uLmF0dHIoJ2lkJykgKyAnLScgKyBzZXR0aW5ncy51c2VyX3ByZWZpeDtcbiAgICAgICAgICAgIHNldFJpZ2h0UHJlZml4KHNldHRpbmdzLCBjb2xsZWN0aW9uKTtcblxuICAgICAgICAgICAgLy8gZW5mb3JjaW5nIGxvZ2ljIGJldHdlZW4gb3B0aW9uc1xuICAgICAgICAgICAgaWYgKCFzZXR0aW5ncy5hbGxvd19hZGQpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbGxvd19kdXBsaWNhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5hZGRfYXRfdGhlX2VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmluaXRfd2l0aF9uX2VsZW1lbnRzID4gc2V0dGluZ3MubWF4KSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuaW5pdF93aXRoX25fZWxlbWVudHMgPSBzZXR0aW5ncy5tYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MubWluICYmICghc2V0dGluZ3MuaW5pdF93aXRoX25fZWxlbWVudHMgfHwgc2V0dGluZ3MuaW5pdF93aXRoX25fZWxlbWVudHMgPCBzZXR0aW5ncy5taW4pKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuaW5pdF93aXRoX25fZWxlbWVudHMgPSBzZXR0aW5ncy5taW47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVzZXIgY2FsbGJhY2tcbiAgICAgICAgICAgIHNldHRpbmdzLmJlZm9yZV9pbml0KGNvbGxlY3Rpb24pO1xuXG4gICAgICAgICAgICAvLyBwcm90b3R5cGUgcmVxdWlyZWQgdG8gY3JlYXRlIG5ldyBlbGVtZW50cyBpbiB0aGUgY29sbGVjdGlvblxuICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb24uZGF0YSgncHJvdG90eXBlJykgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImpxdWVyeS5jb2xsZWN0aW9uLmpzOiBnaXZlbiBjb2xsZWN0aW9uIGZpZWxkIGhhcyBubyBwcm90b3R5cGUsIGNoZWNrIHRoYXQgeW91ciBmaWVsZCBoYXMgdGhlIHByb3RvdHlwZSBvcHRpb24gc2V0IHRvIHRydWUuXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhbGwgdGhlIGZvbGxvd2luZyBkYXRhIGF0dHJpYnV0ZXMgYXJlIGF1dG9tYXRpY2FsbHkgYXZhaWxhYmxlIHRoYW5rcyB0b1xuICAgICAgICAgICAgLy8ganF1ZXJ5LmNvbGxlY3Rpb24uaHRtbC50d2lnIGZvcm0gdGhlbWVcbiAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uLmRhdGEoJ3Byb3RvdHlwZS1uYW1lJykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnByb3RvdHlwZV9uYW1lID0gY29sbGVjdGlvbi5kYXRhKCdwcm90b3R5cGUtbmFtZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb24uZGF0YSgnYWxsb3ctYWRkJykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsbG93X2FkZCA9IGNvbGxlY3Rpb24uZGF0YSgnYWxsb3ctYWRkJyk7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuYWxsb3dfZHVwbGljYXRlID0gY29sbGVjdGlvbi5kYXRhKCdhbGxvdy1hZGQnKSA/IHNldHRpbmdzLmFsbG93X2R1cGxpY2F0ZSA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb24uZGF0YSgnYWxsb3ctcmVtb3ZlJykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsbG93X3JlbW92ZSA9IGNvbGxlY3Rpb24uZGF0YSgnYWxsb3ctcmVtb3ZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29sbGVjdGlvbi5kYXRhKCduYW1lLXByZWZpeCcpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5uYW1lX3ByZWZpeCA9IGNvbGxlY3Rpb24uZGF0YSgnbmFtZS1wcmVmaXgnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcHJvdG90eXBlLW5hbWUgcmVxdWlyZWQgZm9yIG5lc3RlZCBjb2xsZWN0aW9ucywgd2hlcmUgY29sbGVjdGlvbiBpZCBwcmVmaXhcbiAgICAgICAgICAgIC8vIGlzbid0IGd1ZXNzYWJsZSAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zeW1mb255L3N5bWZvbnkvaXNzdWVzLzEzODM3KVxuICAgICAgICAgICAgaWYgKCFzZXR0aW5ncy5uYW1lX3ByZWZpeCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianF1ZXJ5LmNvbGxlY3Rpb24uanM6IHRoZSBwcmVmaXggdXNlZCBpbiBkZXNjZW5kYW50IGZpZWxkIG5hbWVzIGlzIG1hbmRhdG9yeSwgeW91IGNhbiBzZXQgaXQgdXNpbmcgMiB3YXlzOlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImpxdWVyeS5jb2xsZWN0aW9uLmpzOiAtIHVzZSB0aGUgZm9ybSB0aGVtZSBnaXZlbiB3aXRoIHRoaXMgcGx1Z2luIHNvdXJjZVwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImpxdWVyeS5jb2xsZWN0aW9uLmpzOiAtIHNldCBuYW1lX3ByZWZpeCBvcHRpb24gdG8gICd7eyBmb3JtVmlldy5teUNvbGxlY3Rpb25GaWVsZC52YXJzLmZ1bGxfbmFtZSB9fSdcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHByZXNlcnZlX25hbWVzIG9wdGlvbiBpcyBzZXQsIHdlIHNob3VsZCBlbmZvcmNlIG1hbnkgb3B0aW9ucyB0byBhdm9pZFxuICAgICAgICAgICAgLy8gaGF2aW5nIGluY29uc2lzdGVuY2llcyBiZXR3ZWVuIHRoZSBVSSBhbmQgdGhlIFN5bWZvbnkgcmVzdWx0XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MucHJlc2VydmVfbmFtZXMpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbGxvd191cCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsbG93X2Rvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5kcmFnX2Ryb3AgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5hZGRfYXRfdGhlX2VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRyYWcgJiBkcm9wIHN1cHBvcnQ6IHRoaXMgaXMgYSBiaXQgbW9yZSBjb21wbGV4IHRoYW4gcHJlc3NpbmcgXCJ1cFwiIG9yXG4gICAgICAgICAgICAvLyBcImRvd25cIiBidXR0b25zIGJlY2F1c2Ugd2UgY2FuIG1vdmUgZWxlbWVudHMgbW9yZSB0aGFuIG9uZSBwbGFjZSBhaGVhZFxuICAgICAgICAgICAgLy8gb3IgYmVsb3cuLi5cbiAgICAgICAgICAgIGlmICgodHlwZW9mIGpRdWVyeS51aSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGpRdWVyeS51aS5zb3J0YWJsZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgJiYgY29sbGVjdGlvbi5kYXRhKCdzb3J0YWJsZScpKSB7XG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbi5zb3J0YWJsZSgnZGlzYWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmRyYWdfZHJvcCAmJiBzZXR0aW5ncy5hbGxvd191cCAmJiBzZXR0aW5ncy5hbGxvd19kb3duKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGpRdWVyeS51aSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGpRdWVyeS51aS5zb3J0YWJsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuZHJhZ19kcm9wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbi5zb3J0YWJsZSgkLmV4dGVuZCh0cnVlLCB7fSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdWkuaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuZHJhZ19kcm9wX3N0YXJ0KGV2ZW50LCB1aSwgZWxlbWVudHMsIGVsZW1lbnQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNvcnRhYmxlKFwiY2FuY2VsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpLnBsYWNlaG9sZGVyLmhlaWdodCh1aS5pdGVtLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aS5wbGFjZWhvbGRlci53aWR0aCh1aS5pdGVtLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFBvc2l0aW9uID0gZWxlbWVudHMuaW5kZXgoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHVpLml0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc29ydGFibGUoXCJjYW5jZWxcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhbHNlID09PSBzZXR0aW5ncy5kcmFnX2Ryb3BfdXBkYXRlKGV2ZW50LCB1aSwgZWxlbWVudHMsIGVsZW1lbnQpIHx8ICEobmV3UG9zaXRpb24gLSBvbGRQb3NpdGlvbiA+IDAgPyB0cnVlT3JVbmRlZmluZWQoc2V0dGluZ3MuYmVmb3JlX3VwKGNvbGxlY3Rpb24sIGVsZW1lbnQpKSA6IHRydWVPclVuZGVmaW5lZChzZXR0aW5ncy5iZWZvcmVfZG93bihjb2xsZWN0aW9uLCBlbGVtZW50KSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBlbGVtZW50cy5pbmRleChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGNvbGxlY3Rpb24uZmluZChzZXR0aW5ncy5lbGVtZW50c19zZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9Nb3ZlKGNvbGxlY3Rpb24sIHNldHRpbmdzLCBlbGVtZW50cywgZWxlbWVudCwgb2xkUG9zaXRpb24sIG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgc2V0dGluZ3MuZHJhZ19kcm9wX29wdGlvbnMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbGxlY3Rpb24uZGF0YSgnY29sbGVjdGlvbi1zZXR0aW5ncycsIHNldHRpbmdzKTtcblxuICAgICAgICAgICAgLy8gZXZlbnRzIG9uIGJ1dHRvbnMgdXNpbmcgYSBcInN0YXRpY1wiIGNvbnRhaW5lciBzbyBldmVuIG5ld2x5XG4gICAgICAgICAgICAvLyBjcmVhdGVkL2FqYXggZG93bmxvYWRlZCBidXR0b25zIGRvZXNuJ3QgbmVlZCBmdXJ0aGVyIGluaXRpYWxpemF0aW9uXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJChzZXR0aW5ncy5jb250YWluZXIpO1xuICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgLm9mZignY2xpY2snLCAnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWFjdGlvbicpXG4gICAgICAgICAgICAgICAgLm9uKCdjbGljaycsICcuJyArIHNldHRpbmdzLnByZWZpeCArICctYWN0aW9uJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbGxlY3Rpb24gPSAkKCcjJyArIHRoYXQuZGF0YSgnY29sbGVjdGlvbicpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gY29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLXNldHRpbmdzJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xsZWN0aW9uID0gJCgnIycgKyB0aGF0LmRhdGEoJ2NvbGxlY3Rpb24nKSkuZmluZCgnLicgKyB0aGF0LmRhdGEoJ2NvbGxlY3Rpb24nKSArICctY29sbGVjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gY29sbGVjdGlvbi5kYXRhKCdjb2xsZWN0aW9uLXNldHRpbmdzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5kZWZpbmVkID09PSBzZXR0aW5ncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiQ2FuJ3QgZmluZCBjb2xsZWN0aW9uOiBcIiArIHRoYXQuZGF0YSgnY29sbGVjdGlvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gY29sbGVjdGlvbi5maW5kKHNldHRpbmdzLmVsZW1lbnRzX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGF0LmRhdGEoJ2VsZW1lbnQnKSA/ICQoJyMnICsgdGhhdC5kYXRhKCdlbGVtZW50JykpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBlbGVtZW50ICYmIGVsZW1lbnQubGVuZ3RoID8gZWxlbWVudHMuaW5kZXgoZWxlbWVudCkgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNEdXBsaWNhdGUgPSB0aGF0LmlzKCcuJyArIHNldHRpbmdzLnByZWZpeCArICctZHVwbGljYXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICgodGhhdC5pcygnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLWFkZCcpIHx8IHRoYXQuaXMoJy4nICsgc2V0dGluZ3MucHJlZml4ICsgJy1yZXNjdWUtYWRkJykgfHwgaXNEdXBsaWNhdGUpICYmIHNldHRpbmdzLmFsbG93X2FkZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSAnYWRkJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gZG9BZGQoY29udGFpbmVyLCB0aGF0LCBjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIGluZGV4LCBpc0R1cGxpY2F0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5pcygnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLXJlbW92ZScpICYmIHNldHRpbmdzLmFsbG93X3JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSAncmVtb3ZlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gZG9EZWxldGUoY29sbGVjdGlvbiwgc2V0dGluZ3MsIGVsZW1lbnRzLCBlbGVtZW50LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5pcygnLicgKyBzZXR0aW5ncy5wcmVmaXggKyAnLXVwJykgJiYgc2V0dGluZ3MuYWxsb3dfdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gJ3VwJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gZG9VcChjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmlzKCcuJyArIHNldHRpbmdzLnByZWZpeCArICctZG93bicpICYmIHNldHRpbmdzLmFsbG93X2Rvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gJ2Rvd24nO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudHMgPSBkb0Rvd24oY29sbGVjdGlvbiwgc2V0dGluZ3MsIGVsZW1lbnRzLCBlbGVtZW50LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkdW1wQ29sbGVjdGlvbkFjdGlvbnMoY29sbGVjdGlvbiwgc2V0dGluZ3MsIGZhbHNlLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9KTsgLy8gLm9uXG5cbiAgICAgICAgICAgIGR1bXBDb2xsZWN0aW9uQWN0aW9ucyhjb2xsZWN0aW9uLCBzZXR0aW5ncywgdHJ1ZSk7XG4gICAgICAgICAgICBlbmFibGVDaGlsZHJlbkNvbGxlY3Rpb25zKGNvbGxlY3Rpb24sIG51bGwsIHNldHRpbmdzKTtcblxuICAgICAgICAgICAgLy8gaWYgY29sbGVjdGlvbiBlbGVtZW50cyBhcmUgZ2l2ZW4gaW4gdGhlIHdyb25nIG9yZGVyLCBwbHVnaW5cbiAgICAgICAgICAgIC8vIG11c3QgcmVvcmRlciB0aGVtIGdyYXBoaWNhbGx5XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MucG9zaXRpb25fZmllbGRfc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBjb2xsZWN0aW9uLmZpbmQoc2V0dGluZ3MuZWxlbWVudHNfc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcGFyc2VGbG9hdChnZXRGaWVsZFZhbHVlKHRoYXQuZmluZChzZXR0aW5ncy5wb3NpdGlvbl9maWVsZF9zZWxlY3RvcikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoYXRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc29ydGVyID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChhLnBvc2l0aW9uIDwgYi5wb3NpdGlvbiA/IC0xIDogKGEucG9zaXRpb24gPiBiLnBvc2l0aW9uID8gMSA6IDApKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGFycmF5LnNvcnQoc29ydGVyKTtcblxuICAgICAgICAgICAgICAgICQuZWFjaChhcnJheSwgZnVuY3Rpb24gKG5ld0luZGV4LCBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnRzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRzLnB1c2goJCh0aGlzKS5hdHRyKCdpZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBvYmplY3QuZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZEluZGV4ID0gJC5pbkFycmF5KGVsZW1lbnQuYXR0cignaWQnKSwgaWRzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3SW5kZXggIT09IG9sZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IGRvTW92ZShjb2xsZWN0aW9uLCBzZXR0aW5ncywgZWxlbWVudHMsIGVsZW1lbnQsIG9sZEluZGV4LCBuZXdJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwdXRGaWVsZFZhbHVlKGVsZW1lbnQuZmluZChzZXR0aW5ncy5wb3NpdGlvbl9maWVsZF9zZWxlY3RvciksIGVsZW1lbnRzLmluZGV4KGVsZW1lbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSAvLyBpZiAoc2V0dGluZ3MucG9zaXRpb25fZmllbGRfc2VsZWN0b3IpIHtcblxuICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJfaW5pdChjb2xsZWN0aW9uKTtcblxuICAgICAgICB9KTsgLy8gZWxlbS5lYWNoXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTsgLy8gJC5mbi5jb2xsZWN0aW9uXG5cbn0pXG4oalF1ZXJ5KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N5bWZvbnktY29sbGVjdGlvbi9qcXVlcnkuY29sbGVjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMyJdLCJzb3VyY2VSb290IjoiIn0=