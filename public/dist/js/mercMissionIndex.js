webpackJsonp([0],{

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$ = __webpack_require__(0);
__webpack_require__(1);
const tablesorter = __webpack_require__(2);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["settings"] = settings;
__webpack_require__(3);

const defaults = {
    theme: 'bootstrap',
    sortReset: true,
    debug: true,
};

function settings(custom = {}) {
    return Object.assign({}, defaults, custom);
}


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tablesorter (FORK) - updated 01-10-2018 (v2.29.3)*/
/* Includes widgets ( storage,uitheme,columns,filter,stickyHeaders,resizable,saveSort ) */
(function(factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function(jQuery) {

/*! TableSorter (FORK) v2.29.3 *//*
* Client-side table sorting with ease!
* @requires jQuery v1.2.6+
*
* Copyright (c) 2007 Christian Bach
* fork maintained by Rob Garrison
*
* Examples and original docs at: http://tablesorter.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @type jQuery
* @name tablesorter (FORK)
* @cat Plugins/Tablesorter
* @author Christian Bach - christian.bach@polyester.se
* @contributor Rob Garrison - https://github.com/Mottie/tablesorter
* @docs (fork) - https://mottie.github.io/tablesorter/docs/
*/
/*jshint browser:true, jquery:true, unused:false, expr: true */
;( function( $ ) {
	'use strict';
	var ts = $.tablesorter = {

		version : '2.29.3',

		parsers : [],
		widgets : [],
		defaults : {

			// *** appearance
			theme            : 'default',  // adds tablesorter-{theme} to the table for styling
			widthFixed       : false,      // adds colgroup to fix widths of columns
			showProcessing   : false,      // show an indeterminate timer icon in the header when the table is sorted or filtered.

			headerTemplate   : '{content}',// header layout template (HTML ok); {content} = innerHTML, {icon} = <i/> // class from cssIcon
			onRenderTemplate : null,       // function( index, template ){ return template; }, // template is a string
			onRenderHeader   : null,       // function( index ){}, // nothing to return

			// *** functionality
			cancelSelection  : true,       // prevent text selection in the header
			tabIndex         : true,       // add tabindex to header for keyboard accessibility
			dateFormat       : 'mmddyyyy', // other options: 'ddmmyyy' or 'yyyymmdd'
			sortMultiSortKey : 'shiftKey', // key used to select additional columns
			sortResetKey     : 'ctrlKey',  // key used to remove sorting on a column
			usNumberFormat   : true,       // false for German '1.234.567,89' or French '1 234 567,89'
			delayInit        : false,      // if false, the parsed table contents will not update until the first sort
			serverSideSorting: false,      // if true, server-side sorting should be performed because client-side sorting will be disabled, but the ui and events will still be used.
			resort           : true,       // default setting to trigger a resort after an 'update', 'addRows', 'updateCell', etc has completed

			// *** sort options
			headers          : {},         // set sorter, string, empty, locked order, sortInitialOrder, filter, etc.
			ignoreCase       : true,       // ignore case while sorting
			sortForce        : null,       // column(s) first sorted; always applied
			sortList         : [],         // Initial sort order; applied initially; updated when manually sorted
			sortAppend       : null,       // column(s) sorted last; always applied
			sortStable       : false,      // when sorting two rows with exactly the same content, the original sort order is maintained

			sortInitialOrder : 'asc',      // sort direction on first click
			sortLocaleCompare: false,      // replace equivalent character (accented characters)
			sortReset        : false,      // third click on the header will reset column to default - unsorted
			sortRestart      : false,      // restart sort to 'sortInitialOrder' when clicking on previously unsorted columns

			emptyTo          : 'bottom',   // sort empty cell to bottom, top, none, zero, emptyMax, emptyMin
			stringTo         : 'max',      // sort strings in numerical column as max, min, top, bottom, zero
			duplicateSpan    : true,       // colspan cells in the tbody will have duplicated content in the cache for each spanned column
			textExtraction   : 'basic',    // text extraction method/function - function( node, table, cellIndex ){}
			textAttribute    : 'data-text',// data-attribute that contains alternate cell text (used in default textExtraction function)
			textSorter       : null,       // choose overall or specific column sorter function( a, b, direction, table, columnIndex ) [alt: ts.sortText]
			numberSorter     : null,       // choose overall numeric sorter function( a, b, direction, maxColumnValue )

			// *** widget options
			initWidgets      : true,       // apply widgets on tablesorter initialization
			widgetClass      : 'widget-{name}', // table class name template to match to include a widget
			widgets          : [],         // method to add widgets, e.g. widgets: ['zebra']
			widgetOptions    : {
				zebra : [ 'even', 'odd' ]  // zebra widget alternating row class names
			},

			// *** callbacks
			initialized      : null,       // function( table ){},

			// *** extra css class names
			tableClass       : '',
			cssAsc           : '',
			cssDesc          : '',
			cssNone          : '',
			cssHeader        : '',
			cssHeaderRow     : '',
			cssProcessing    : '', // processing icon applied to header during sort/filter

			cssChildRow      : 'tablesorter-childRow', // class name indiciating that a row is to be attached to its parent
			cssInfoBlock     : 'tablesorter-infoOnly', // don't sort tbody with this class name (only one class name allowed here!)
			cssNoSort        : 'tablesorter-noSort',   // class name added to element inside header; clicking on it won't cause a sort
			cssIgnoreRow     : 'tablesorter-ignoreRow',// header row to ignore; cells within this row will not be added to c.$headers

			cssIcon          : 'tablesorter-icon', // if this class does not exist, the {icon} will not be added from the headerTemplate
			cssIconNone      : '', // class name added to the icon when there is no column sort
			cssIconAsc       : '', // class name added to the icon when the column has an ascending sort
			cssIconDesc      : '', // class name added to the icon when the column has a descending sort
			cssIconDisabled  : '', // class name added to the icon when the column has a disabled sort

			// *** events
			pointerClick     : 'click',
			pointerDown      : 'mousedown',
			pointerUp        : 'mouseup',

			// *** selectors
			selectorHeaders  : '> thead th, > thead td',
			selectorSort     : 'th, td', // jQuery selector of content within selectorHeaders that is clickable to trigger a sort
			selectorRemove   : '.remove-me',

			// *** advanced
			debug            : false,

			// *** Internal variables
			headerList: [],
			empties: {},
			strings: {},
			parsers: [],

			// *** parser options for validator; values must be falsy!
			globalize: 0,
			imgAttr: 0

			// removed: widgetZebra: { css: ['even', 'odd'] }

		},

		// internal css classes - these will ALWAYS be added to
		// the table and MUST only contain one class name - fixes #381
		css : {
			table      : 'tablesorter',
			cssHasChild: 'tablesorter-hasChildRow',
			childRow   : 'tablesorter-childRow',
			colgroup   : 'tablesorter-colgroup',
			header     : 'tablesorter-header',
			headerRow  : 'tablesorter-headerRow',
			headerIn   : 'tablesorter-header-inner',
			icon       : 'tablesorter-icon',
			processing : 'tablesorter-processing',
			sortAsc    : 'tablesorter-headerAsc',
			sortDesc   : 'tablesorter-headerDesc',
			sortNone   : 'tablesorter-headerUnSorted'
		},

		// labels applied to sortable headers for accessibility (aria) support
		language : {
			sortAsc      : 'Ascending sort applied, ',
			sortDesc     : 'Descending sort applied, ',
			sortNone     : 'No sort applied, ',
			sortDisabled : 'sorting is disabled',
			nextAsc      : 'activate to apply an ascending sort',
			nextDesc     : 'activate to apply a descending sort',
			nextNone     : 'activate to remove the sort'
		},

		regex : {
			templateContent : /\{content\}/g,
			templateIcon    : /\{icon\}/g,
			templateName    : /\{name\}/i,
			spaces          : /\s+/g,
			nonWord         : /\W/g,
			formElements    : /(input|select|button|textarea)/i,

			// *** sort functions ***
			// regex used in natural sort
			// chunk/tokenize numbers & letters
			chunk  : /(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,
			// replace chunks @ ends
			chunks : /(^\\0|\\0$)/,
			hex    : /^0x[0-9a-f]+$/i,

			// *** formatFloat ***
			comma                : /,/g,
			digitNonUS           : /[\s|\.]/g,
			digitNegativeTest    : /^\s*\([.\d]+\)/,
			digitNegativeReplace : /^\s*\(([.\d]+)\)/,

			// *** isDigit ***
			digitTest    : /^[\-+(]?\d+[)]?$/,
			digitReplace : /[,.'"\s]/g

		},

		// digit sort, text location
		string : {
			max      : 1,
			min      : -1,
			emptymin : 1,
			emptymax : -1,
			zero     : 0,
			none     : 0,
			'null'   : 0,
			top      : true,
			bottom   : false
		},

		keyCodes : {
			enter : 13
		},

		// placeholder date parser data (globalize)
		dates : {},

		// These methods can be applied on table.config instance
		instanceMethods : {},

		/*
		▄█████ ██████ ██████ ██  ██ █████▄
		▀█▄    ██▄▄     ██   ██  ██ ██▄▄██
		   ▀█▄ ██▀▀     ██   ██  ██ ██▀▀▀
		█████▀ ██████   ██   ▀████▀ ██
		*/

		setup : function( table, c ) {
			// if no thead or tbody, or tablesorter is already present, quit
			if ( !table || !table.tHead || table.tBodies.length === 0 || table.hasInitialized === true ) {
				if ( c.debug ) {
					if ( table.hasInitialized ) {
						console.warn( 'Stopping initialization. Tablesorter has already been initialized' );
					} else {
						console.error( 'Stopping initialization! No table, thead or tbody', table );
					}
				}
				return;
			}

			var tmp = '',
				$table = $( table ),
				meta = $.metadata;
			// initialization flag
			table.hasInitialized = false;
			// table is being processed flag
			table.isProcessing = true;
			// make sure to store the config object
			table.config = c;
			// save the settings where they read
			$.data( table, 'tablesorter', c );
			if ( c.debug ) {
				console[ console.group ? 'group' : 'log' ]( 'Initializing tablesorter v' + ts.version );
				$.data( table, 'startoveralltimer', new Date() );
			}

			// removing this in version 3 (only supports jQuery 1.7+)
			c.supportsDataObject = ( function( version ) {
				version[ 0 ] = parseInt( version[ 0 ], 10 );
				return ( version[ 0 ] > 1 ) || ( version[ 0 ] === 1 && parseInt( version[ 1 ], 10 ) >= 4 );
			})( $.fn.jquery.split( '.' ) );
			// ensure case insensitivity
			c.emptyTo = c.emptyTo.toLowerCase();
			c.stringTo = c.stringTo.toLowerCase();
			c.last = { sortList : [], clickedIndex : -1 };
			// add table theme class only if there isn't already one there
			if ( !/tablesorter\-/.test( $table.attr( 'class' ) ) ) {
				tmp = ( c.theme !== '' ? ' tablesorter-' + c.theme : '' );
			}

			// give the table a unique id, which will be used in namespace binding
			if ( !c.namespace ) {
				c.namespace = '.tablesorter' + Math.random().toString( 16 ).slice( 2 );
			} else {
				// make sure namespace starts with a period & doesn't have weird characters
				c.namespace = '.' + c.namespace.replace( ts.regex.nonWord, '' );
			}

			c.table = table;
			c.$table = $table
				// add namespace to table to allow bindings on extra elements to target
				// the parent table (e.g. parser-input-select)
				.addClass( ts.css.table + ' ' + c.tableClass + tmp + ' ' + c.namespace.slice(1) )
				.attr( 'role', 'grid' );
			c.$headers = $table.find( c.selectorHeaders );

			c.$table.children().children( 'tr' ).attr( 'role', 'row' );
			c.$tbodies = $table.children( 'tbody:not(.' + c.cssInfoBlock + ')' ).attr({
				'aria-live' : 'polite',
				'aria-relevant' : 'all'
			});
			if ( c.$table.children( 'caption' ).length ) {
				tmp = c.$table.children( 'caption' )[ 0 ];
				if ( !tmp.id ) { tmp.id = c.namespace.slice( 1 ) + 'caption'; }
				c.$table.attr( 'aria-labelledby', tmp.id );
			}
			c.widgetInit = {}; // keep a list of initialized widgets
			// change textExtraction via data-attribute
			c.textExtraction = c.$table.attr( 'data-text-extraction' ) || c.textExtraction || 'basic';
			// build headers
			ts.buildHeaders( c );
			// fixate columns if the users supplies the fixedWidth option
			// do this after theme has been applied
			ts.fixColumnWidth( table );
			// add widgets from class name
			ts.addWidgetFromClass( table );
			// add widget options before parsing (e.g. grouping widget has parser settings)
			ts.applyWidgetOptions( table );
			// try to auto detect column type, and store in tables config
			ts.setupParsers( c );
			// start total row count at zero
			c.totalRows = 0;
			ts.validateOptions( c );
			// build the cache for the tbody cells
			// delayInit will delay building the cache until the user starts a sort
			if ( !c.delayInit ) { ts.buildCache( c ); }
			// bind all header events and methods
			ts.bindEvents( table, c.$headers, true );
			ts.bindMethods( c );
			// get sort list from jQuery data or metadata
			// in jQuery < 1.4, an error occurs when calling $table.data()
			if ( c.supportsDataObject && typeof $table.data().sortlist !== 'undefined' ) {
				c.sortList = $table.data().sortlist;
			} else if ( meta && ( $table.metadata() && $table.metadata().sortlist ) ) {
				c.sortList = $table.metadata().sortlist;
			}
			// apply widget init code
			ts.applyWidget( table, true );
			// if user has supplied a sort list to constructor
			if ( c.sortList.length > 0 ) {
				ts.sortOn( c, c.sortList, {}, !c.initWidgets );
			} else {
				ts.setHeadersCss( c );
				if ( c.initWidgets ) {
					// apply widget format
					ts.applyWidget( table, false );
				}
			}

			// show processesing icon
			if ( c.showProcessing ) {
				$table
				.unbind( 'sortBegin' + c.namespace + ' sortEnd' + c.namespace )
				.bind( 'sortBegin' + c.namespace + ' sortEnd' + c.namespace, function( e ) {
					clearTimeout( c.timerProcessing );
					ts.isProcessing( table );
					if ( e.type === 'sortBegin' ) {
						c.timerProcessing = setTimeout( function() {
							ts.isProcessing( table, true );
						}, 500 );
					}
				});
			}

			// initialized
			table.hasInitialized = true;
			table.isProcessing = false;
			if ( c.debug ) {
				console.log( 'Overall initialization time:' + ts.benchmark( $.data( table, 'startoveralltimer' ) ) );
				if ( c.debug && console.groupEnd ) { console.groupEnd(); }
			}
			$table.triggerHandler( 'tablesorter-initialized', table );
			if ( typeof c.initialized === 'function' ) {
				c.initialized( table );
			}
		},

		bindMethods : function( c ) {
			var $table = c.$table,
				namespace = c.namespace,
				events = ( 'sortReset update updateRows updateAll updateHeaders addRows updateCell updateComplete ' +
					'sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup ' +
					'mouseleave ' ).split( ' ' )
					.join( namespace + ' ' );
			// apply easy methods that trigger bound events
			$table
			.unbind( events.replace( ts.regex.spaces, ' ' ) )
			.bind( 'sortReset' + namespace, function( e, callback ) {
				e.stopPropagation();
				// using this.config to ensure functions are getting a non-cached version of the config
				ts.sortReset( this.config, function( table ) {
					if (table.isApplyingWidgets) {
						// multiple triggers in a row... filterReset, then sortReset - see #1361
						// wait to update widgets
						setTimeout( function() {
							ts.applyWidget( table, '', callback );
						}, 100 );
					} else {
						ts.applyWidget( table, '', callback );
					}
				});
			})
			.bind( 'updateAll' + namespace, function( e, resort, callback ) {
				e.stopPropagation();
				ts.updateAll( this.config, resort, callback );
			})
			.bind( 'update' + namespace + ' updateRows' + namespace, function( e, resort, callback ) {
				e.stopPropagation();
				ts.update( this.config, resort, callback );
			})
			.bind( 'updateHeaders' + namespace, function( e, callback ) {
				e.stopPropagation();
				ts.updateHeaders( this.config, callback );
			})
			.bind( 'updateCell' + namespace, function( e, cell, resort, callback ) {
				e.stopPropagation();
				ts.updateCell( this.config, cell, resort, callback );
			})
			.bind( 'addRows' + namespace, function( e, $row, resort, callback ) {
				e.stopPropagation();
				ts.addRows( this.config, $row, resort, callback );
			})
			.bind( 'updateComplete' + namespace, function() {
				this.isUpdating = false;
			})
			.bind( 'sorton' + namespace, function( e, list, callback, init ) {
				e.stopPropagation();
				ts.sortOn( this.config, list, callback, init );
			})
			.bind( 'appendCache' + namespace, function( e, callback, init ) {
				e.stopPropagation();
				ts.appendCache( this.config, init );
				if ( $.isFunction( callback ) ) {
					callback( this );
				}
			})
			// $tbodies variable is used by the tbody sorting widget
			.bind( 'updateCache' + namespace, function( e, callback, $tbodies ) {
				e.stopPropagation();
				ts.updateCache( this.config, callback, $tbodies );
			})
			.bind( 'applyWidgetId' + namespace, function( e, id ) {
				e.stopPropagation();
				ts.applyWidgetId( this, id );
			})
			.bind( 'applyWidgets' + namespace, function( e, callback ) {
				e.stopPropagation();
				// apply widgets (false = not initializing)
				ts.applyWidget( this, false, callback );
			})
			.bind( 'refreshWidgets' + namespace, function( e, all, dontapply ) {
				e.stopPropagation();
				ts.refreshWidgets( this, all, dontapply );
			})
			.bind( 'removeWidget' + namespace, function( e, name, refreshing ) {
				e.stopPropagation();
				ts.removeWidget( this, name, refreshing );
			})
			.bind( 'destroy' + namespace, function( e, removeClasses, callback ) {
				e.stopPropagation();
				ts.destroy( this, removeClasses, callback );
			})
			.bind( 'resetToLoadState' + namespace, function( e ) {
				e.stopPropagation();
				// remove all widgets
				ts.removeWidget( this, true, false );
				var tmp = $.extend( true, {}, c.originalSettings );
				// restore original settings; this clears out current settings, but does not clear
				// values saved to storage.
				c = $.extend( true, {}, ts.defaults, tmp );
				c.originalSettings = tmp;
				this.hasInitialized = false;
				// setup the entire table again
				ts.setup( this, c );
			});
		},

		bindEvents : function( table, $headers, core ) {
			table = $( table )[ 0 ];
			var tmp,
				c = table.config,
				namespace = c.namespace,
				downTarget = null;
			if ( core !== true ) {
				$headers.addClass( namespace.slice( 1 ) + '_extra_headers' );
				tmp = ts.getClosest( $headers, 'table' );
				if ( tmp.length && tmp[ 0 ].nodeName === 'TABLE' && tmp[ 0 ] !== table ) {
					$( tmp[ 0 ] ).addClass( namespace.slice( 1 ) + '_extra_table' );
				}
			}
			tmp = ( c.pointerDown + ' ' + c.pointerUp + ' ' + c.pointerClick + ' sort keyup ' )
				.replace( ts.regex.spaces, ' ' )
				.split( ' ' )
				.join( namespace + ' ' );
			// apply event handling to headers and/or additional headers (stickyheaders, scroller, etc)
			$headers
			// http://stackoverflow.com/questions/5312849/jquery-find-self;
			.find( c.selectorSort )
			.add( $headers.filter( c.selectorSort ) )
			.unbind( tmp )
			.bind( tmp, function( e, external ) {
				var $cell, cell, temp,
					$target = $( e.target ),
					// wrap event type in spaces, so the match doesn't trigger on inner words
					type = ' ' + e.type + ' ';
				// only recognize left clicks
				if ( ( ( e.which || e.button ) !== 1 && !type.match( ' ' + c.pointerClick + ' | sort | keyup ' ) ) ||
					// allow pressing enter
					( type === ' keyup ' && e.which !== ts.keyCodes.enter ) ||
					// allow triggering a click event (e.which is undefined) & ignore physical clicks
					( type.match( ' ' + c.pointerClick + ' ' ) && typeof e.which !== 'undefined' ) ) {
					return;
				}
				// ignore mouseup if mousedown wasn't on the same target
				if ( type.match( ' ' + c.pointerUp + ' ' ) && downTarget !== e.target && external !== true ) {
					return;
				}
				// set target on mousedown
				if ( type.match( ' ' + c.pointerDown + ' ' ) ) {
					downTarget = e.target;
					// preventDefault needed or jQuery v1.3.2 and older throws an
					// "Uncaught TypeError: handler.apply is not a function" error
					temp = $target.jquery.split( '.' );
					if ( temp[ 0 ] === '1' && temp[ 1 ] < 4 ) { e.preventDefault(); }
					return;
				}
				downTarget = null;
				// prevent sort being triggered on form elements
				if ( ts.regex.formElements.test( e.target.nodeName ) ||
					// nosort class name, or elements within a nosort container
					$target.hasClass( c.cssNoSort ) || $target.parents( '.' + c.cssNoSort ).length > 0 ||
					// elements within a button
					$target.parents( 'button' ).length > 0 ) {
					return !c.cancelSelection;
				}
				if ( c.delayInit && ts.isEmptyObject( c.cache ) ) {
					ts.buildCache( c );
				}
				$cell = ts.getClosest( $( this ), '.' + ts.css.header );
				// reference original table headers and find the same cell
				// don't use $headers or IE8 throws an error - see #987
				temp = $headers.index( $cell );
				c.last.clickedIndex = ( temp < 0 ) ? $cell.attr( 'data-column' ) : temp;
				// use column index if $headers is undefined
				cell = c.$headers[ c.last.clickedIndex ];
				if ( cell && !cell.sortDisabled ) {
					ts.initSort( c, cell, e );
				}
			});
			if ( c.cancelSelection ) {
				// cancel selection
				$headers
					.attr( 'unselectable', 'on' )
					.bind( 'selectstart', false )
					.css({
						'user-select' : 'none',
						'MozUserSelect' : 'none' // not needed for jQuery 1.8+
					});
			}
		},

		buildHeaders : function( c ) {
			var $temp, icon, timer, indx;
			c.headerList = [];
			c.headerContent = [];
			c.sortVars = [];
			if ( c.debug ) {
				timer = new Date();
			}
			// children tr in tfoot - see issue #196 & #547
			// don't pass table.config to computeColumnIndex here - widgets (math) pass it to "quickly" index tbody cells
			c.columns = ts.computeColumnIndex( c.$table.children( 'thead, tfoot' ).children( 'tr' ) );
			// add icon if cssIcon option exists
			icon = c.cssIcon ?
				'<i class="' + ( c.cssIcon === ts.css.icon ? ts.css.icon : c.cssIcon + ' ' + ts.css.icon ) + '"></i>' :
				'';
			// redefine c.$headers here in case of an updateAll that replaces or adds an entire header cell - see #683
			c.$headers = $( $.map( c.$table.find( c.selectorHeaders ), function( elem, index ) {
				var configHeaders, header, column, template, tmp,
					$elem = $( elem );
				// ignore cell (don't add it to c.$headers) if row has ignoreRow class
				if ( ts.getClosest( $elem, 'tr' ).hasClass( c.cssIgnoreRow ) ) { return; }
				// transfer data-column to element if not th/td - #1459
				if ( !/(th|td)/i.test( elem.nodeName ) ) {
					tmp = ts.getClosest( $elem, 'th, td' );
					$elem.attr( 'data-column', tmp.attr( 'data-column' ) );
				}
				// make sure to get header cell & not column indexed cell
				configHeaders = ts.getColumnData( c.table, c.headers, index, true );
				// save original header content
				c.headerContent[ index ] = $elem.html();
				// if headerTemplate is empty, don't reformat the header cell
				if ( c.headerTemplate !== '' && !$elem.find( '.' + ts.css.headerIn ).length ) {
					// set up header template
					template = c.headerTemplate
						.replace( ts.regex.templateContent, $elem.html() )
						.replace( ts.regex.templateIcon, $elem.find( '.' + ts.css.icon ).length ? '' : icon );
					if ( c.onRenderTemplate ) {
						header = c.onRenderTemplate.apply( $elem, [ index, template ] );
						// only change t if something is returned
						if ( header && typeof header === 'string' ) {
							template = header;
						}
					}
					$elem.html( '<div class="' + ts.css.headerIn + '">' + template + '</div>' ); // faster than wrapInner
				}
				if ( c.onRenderHeader ) {
					c.onRenderHeader.apply( $elem, [ index, c, c.$table ] );
				}
				column = parseInt( $elem.attr( 'data-column' ), 10 );
				elem.column = column;
				tmp = ts.getOrder( ts.getData( $elem, configHeaders, 'sortInitialOrder' ) || c.sortInitialOrder );
				// this may get updated numerous times if there are multiple rows
				c.sortVars[ column ] = {
					count : -1, // set to -1 because clicking on the header automatically adds one
					order:  tmp ?
						( c.sortReset ? [ 1, 0, 2 ] : [ 1, 0 ] ) : // desc, asc, unsorted
						( c.sortReset ? [ 0, 1, 2 ] : [ 0, 1 ] ),  // asc, desc, unsorted
					lockedOrder : false
				};
				tmp = ts.getData( $elem, configHeaders, 'lockedOrder' ) || false;
				if ( typeof tmp !== 'undefined' && tmp !== false ) {
					c.sortVars[ column ].lockedOrder = true;
					c.sortVars[ column ].order = ts.getOrder( tmp ) ? [ 1, 1 ] : [ 0, 0 ];
				}
				// add cell to headerList
				c.headerList[ index ] = elem;
				$elem.addClass( ts.css.header + ' ' + c.cssHeader );
				// add to parent in case there are multiple rows
				ts.getClosest( $elem, 'tr' )
					.addClass( ts.css.headerRow + ' ' + c.cssHeaderRow )
					.attr( 'role', 'row' );
				// allow keyboard cursor to focus on element
				if ( c.tabIndex ) {
					$elem.attr( 'tabindex', 0 );
				}
				return elem;
			}) );
			// cache headers per column
			c.$headerIndexed = [];
			for ( indx = 0; indx < c.columns; indx++ ) {
				// colspan in header making a column undefined
				if ( ts.isEmptyObject( c.sortVars[ indx ] ) ) {
					c.sortVars[ indx ] = {};
				}
				// Use c.$headers.parent() in case selectorHeaders doesn't point to the th/td
				$temp = c.$headers.filter( '[data-column="' + indx + '"]' );
				// target sortable column cells, unless there are none, then use non-sortable cells
				// .last() added in jQuery 1.4; use .filter(':last') to maintain compatibility with jQuery v1.2.6
				c.$headerIndexed[ indx ] = $temp.length ?
					$temp.not( '.sorter-false' ).length ?
						$temp.not( '.sorter-false' ).filter( ':last' ) :
						$temp.filter( ':last' ) :
					$();
			}
			c.$table.find( c.selectorHeaders ).attr({
				scope: 'col',
				role : 'columnheader'
			});
			// enable/disable sorting
			ts.updateHeader( c );
			if ( c.debug ) {
				console.log( 'Built headers:' + ts.benchmark( timer ) );
				console.log( c.$headers );
			}
		},

		// Use it to add a set of methods to table.config which will be available for all tables.
		// This should be done before table initialization
		addInstanceMethods : function( methods ) {
			$.extend( ts.instanceMethods, methods );
		},

		/*
		█████▄ ▄████▄ █████▄ ▄█████ ██████ █████▄ ▄█████
		██▄▄██ ██▄▄██ ██▄▄██ ▀█▄    ██▄▄   ██▄▄██ ▀█▄
		██▀▀▀  ██▀▀██ ██▀██     ▀█▄ ██▀▀   ██▀██     ▀█▄
		██     ██  ██ ██  ██ █████▀ ██████ ██  ██ █████▀
		*/
		setupParsers : function( c, $tbodies ) {
			var rows, list, span, max, colIndex, indx, header, configHeaders,
				noParser, parser, extractor, time, tbody, len,
				table = c.table,
				tbodyIndex = 0,
				debug = {};
			// update table bodies in case we start with an empty table
			c.$tbodies = c.$table.children( 'tbody:not(.' + c.cssInfoBlock + ')' );
			tbody = typeof $tbodies === 'undefined' ? c.$tbodies : $tbodies;
			len = tbody.length;
			if ( len === 0 ) {
				return c.debug ? console.warn( 'Warning: *Empty table!* Not building a parser cache' ) : '';
			} else if ( c.debug ) {
				time = new Date();
				console[ console.group ? 'group' : 'log' ]( 'Detecting parsers for each column' );
			}
			list = {
				extractors: [],
				parsers: []
			};
			while ( tbodyIndex < len ) {
				rows = tbody[ tbodyIndex ].rows;
				if ( rows.length ) {
					colIndex = 0;
					max = c.columns;
					for ( indx = 0; indx < max; indx++ ) {
						header = c.$headerIndexed[ colIndex ];
						if ( header && header.length ) {
							// get column indexed table cell; adding true parameter fixes #1362 but
							// it would break backwards compatibility...
							configHeaders = ts.getColumnData( table, c.headers, colIndex ); // , true );
							// get column parser/extractor
							extractor = ts.getParserById( ts.getData( header, configHeaders, 'extractor' ) );
							parser = ts.getParserById( ts.getData( header, configHeaders, 'sorter' ) );
							noParser = ts.getData( header, configHeaders, 'parser' ) === 'false';
							// empty cells behaviour - keeping emptyToBottom for backwards compatibility
							c.empties[colIndex] = (
								ts.getData( header, configHeaders, 'empty' ) ||
								c.emptyTo || ( c.emptyToBottom ? 'bottom' : 'top' ) ).toLowerCase();
							// text strings behaviour in numerical sorts
							c.strings[colIndex] = (
								ts.getData( header, configHeaders, 'string' ) ||
								c.stringTo ||
								'max' ).toLowerCase();
							if ( noParser ) {
								parser = ts.getParserById( 'no-parser' );
							}
							if ( !extractor ) {
								// For now, maybe detect someday
								extractor = false;
							}
							if ( !parser ) {
								parser = ts.detectParserForColumn( c, rows, -1, colIndex );
							}
							if ( c.debug ) {
								debug[ '(' + colIndex + ') ' + header.text() ] = {
									parser : parser.id,
									extractor : extractor ? extractor.id : 'none',
									string : c.strings[ colIndex ],
									empty  : c.empties[ colIndex ]
								};
							}
							list.parsers[ colIndex ] = parser;
							list.extractors[ colIndex ] = extractor;
							span = header[ 0 ].colSpan - 1;
							if ( span > 0 ) {
								colIndex += span;
								max += span;
								while ( span + 1 > 0 ) {
									// set colspan columns to use the same parsers & extractors
									list.parsers[ colIndex - span ] = parser;
									list.extractors[ colIndex - span ] = extractor;
									span--;
								}
							}
						}
						colIndex++;
					}
				}
				tbodyIndex += ( list.parsers.length ) ? len : 1;
			}
			if ( c.debug ) {
				if ( !ts.isEmptyObject( debug ) ) {
					console[ console.table ? 'table' : 'log' ]( debug );
				} else {
					console.warn( '  No parsers detected!' );
				}
				console.log( 'Completed detecting parsers' + ts.benchmark( time ) );
				if ( console.groupEnd ) { console.groupEnd(); }
			}
			c.parsers = list.parsers;
			c.extractors = list.extractors;
		},

		addParser : function( parser ) {
			var indx,
				len = ts.parsers.length,
				add = true;
			for ( indx = 0; indx < len; indx++ ) {
				if ( ts.parsers[ indx ].id.toLowerCase() === parser.id.toLowerCase() ) {
					add = false;
				}
			}
			if ( add ) {
				ts.parsers[ ts.parsers.length ] = parser;
			}
		},

		getParserById : function( name ) {
			/*jshint eqeqeq:false */
			if ( name == 'false' ) { return false; }
			var indx,
				len = ts.parsers.length;
			for ( indx = 0; indx < len; indx++ ) {
				if ( ts.parsers[ indx ].id.toLowerCase() === ( name.toString() ).toLowerCase() ) {
					return ts.parsers[ indx ];
				}
			}
			return false;
		},

		detectParserForColumn : function( c, rows, rowIndex, cellIndex ) {
			var cur, $node, row,
				indx = ts.parsers.length,
				node = false,
				nodeValue = '',
				keepLooking = true;
			while ( nodeValue === '' && keepLooking ) {
				rowIndex++;
				row = rows[ rowIndex ];
				// stop looking after 50 empty rows
				if ( row && rowIndex < 50 ) {
					if ( row.className.indexOf( ts.cssIgnoreRow ) < 0 ) {
						node = rows[ rowIndex ].cells[ cellIndex ];
						nodeValue = ts.getElementText( c, node, cellIndex );
						$node = $( node );
						if ( c.debug ) {
							console.log( 'Checking if value was empty on row ' + rowIndex + ', column: ' +
								cellIndex + ': "' + nodeValue + '"' );
						}
					}
				} else {
					keepLooking = false;
				}
			}
			while ( --indx >= 0 ) {
				cur = ts.parsers[ indx ];
				// ignore the default text parser because it will always be true
				if ( cur && cur.id !== 'text' && cur.is && cur.is( nodeValue, c.table, node, $node ) ) {
					return cur;
				}
			}
			// nothing found, return the generic parser (text)
			return ts.getParserById( 'text' );
		},

		getElementText : function( c, node, cellIndex ) {
			if ( !node ) { return ''; }
			var tmp,
				extract = c.textExtraction || '',
				// node could be a jquery object
				// http://jsperf.com/jquery-vs-instanceof-jquery/2
				$node = node.jquery ? node : $( node );
			if ( typeof extract === 'string' ) {
				// check data-attribute first when set to 'basic'; don't use node.innerText - it's really slow!
				// http://www.kellegous.com/j/2013/02/27/innertext-vs-textcontent/
				if ( extract === 'basic' && typeof ( tmp = $node.attr( c.textAttribute ) ) !== 'undefined' ) {
					return $.trim( tmp );
				}
				return $.trim( node.textContent || $node.text() );
			} else {
				if ( typeof extract === 'function' ) {
					return $.trim( extract( $node[ 0 ], c.table, cellIndex ) );
				} else if ( typeof ( tmp = ts.getColumnData( c.table, extract, cellIndex ) ) === 'function' ) {
					return $.trim( tmp( $node[ 0 ], c.table, cellIndex ) );
				}
			}
			// fallback
			return $.trim( $node[ 0 ].textContent || $node.text() );
		},

		// centralized function to extract/parse cell contents
		getParsedText : function( c, cell, colIndex, txt ) {
			if ( typeof txt === 'undefined' ) {
				txt = ts.getElementText( c, cell, colIndex );
			}
			// if no parser, make sure to return the txt
			var val = '' + txt,
				parser = c.parsers[ colIndex ],
				extractor = c.extractors[ colIndex ];
			if ( parser ) {
				// do extract before parsing, if there is one
				if ( extractor && typeof extractor.format === 'function' ) {
					txt = extractor.format( txt, c.table, cell, colIndex );
				}
				// allow parsing if the string is empty, previously parsing would change it to zero,
				// in case the parser needs to extract data from the table cell attributes
				val = parser.id === 'no-parser' ? '' :
					// make sure txt is a string (extractor may have converted it)
					parser.format( '' + txt, c.table, cell, colIndex );
				if ( c.ignoreCase && typeof val === 'string' ) {
					val = val.toLowerCase();
				}
			}
			return val;
		},

		/*
		▄████▄ ▄████▄ ▄████▄ ██  ██ ██████
		██  ▀▀ ██▄▄██ ██  ▀▀ ██▄▄██ ██▄▄
		██  ▄▄ ██▀▀██ ██  ▄▄ ██▀▀██ ██▀▀
		▀████▀ ██  ██ ▀████▀ ██  ██ ██████
		*/
		buildCache : function( c, callback, $tbodies ) {
			var cache, val, txt, rowIndex, colIndex, tbodyIndex, $tbody, $row,
				cols, $cells, cell, cacheTime, totalRows, rowData, prevRowData,
				colMax, span, cacheIndex, hasParser, max, len, index,
				table = c.table,
				parsers = c.parsers;
			// update tbody variable
			c.$tbodies = c.$table.children( 'tbody:not(.' + c.cssInfoBlock + ')' );
			$tbody = typeof $tbodies === 'undefined' ? c.$tbodies : $tbodies,
			c.cache = {};
			c.totalRows = 0;
			// if no parsers found, return - it's an empty table.
			if ( !parsers ) {
				return c.debug ? console.warn( 'Warning: *Empty table!* Not building a cache' ) : '';
			}
			if ( c.debug ) {
				cacheTime = new Date();
			}
			// processing icon
			if ( c.showProcessing ) {
				ts.isProcessing( table, true );
			}
			for ( tbodyIndex = 0; tbodyIndex < $tbody.length; tbodyIndex++ ) {
				colMax = []; // column max value per tbody
				cache = c.cache[ tbodyIndex ] = {
					normalized: [] // array of normalized row data; last entry contains 'rowData' above
					// colMax: #   // added at the end
				};

				totalRows = ( $tbody[ tbodyIndex ] && $tbody[ tbodyIndex ].rows.length ) || 0;
				for ( rowIndex = 0; rowIndex < totalRows; ++rowIndex ) {
					rowData = {
						// order: original row order #
						// $row : jQuery Object[]
						child: [], // child row text (filter widget)
						raw: []    // original row text
					};
					/** Add the table data to main data array */
					$row = $( $tbody[ tbodyIndex ].rows[ rowIndex ] );
					cols = [];
					// ignore "remove-me" rows
					if ( $row.hasClass( c.selectorRemove.slice(1) ) ) {
						continue;
					}
					// if this is a child row, add it to the last row's children and continue to the next row
					// ignore child row class, if it is the first row
					if ( $row.hasClass( c.cssChildRow ) && rowIndex !== 0 ) {
						len = cache.normalized.length - 1;
						prevRowData = cache.normalized[ len ][ c.columns ];
						prevRowData.$row = prevRowData.$row.add( $row );
						// add 'hasChild' class name to parent row
						if ( !$row.prev().hasClass( c.cssChildRow ) ) {
							$row.prev().addClass( ts.css.cssHasChild );
						}
						// save child row content (un-parsed!)
						$cells = $row.children( 'th, td' );
						len = prevRowData.child.length;
						prevRowData.child[ len ] = [];
						// child row content does not account for colspans/rowspans; so indexing may be off
						cacheIndex = 0;
						max = c.columns;
						for ( colIndex = 0; colIndex < max; colIndex++ ) {
							cell = $cells[ colIndex ];
							if ( cell ) {
								prevRowData.child[ len ][ colIndex ] = ts.getParsedText( c, cell, colIndex );
								span = $cells[ colIndex ].colSpan - 1;
								if ( span > 0 ) {
									cacheIndex += span;
									max += span;
								}
							}
							cacheIndex++;
						}
						// go to the next for loop
						continue;
					}
					rowData.$row = $row;
					rowData.order = rowIndex; // add original row position to rowCache
					cacheIndex = 0;
					max = c.columns;
					for ( colIndex = 0; colIndex < max; ++colIndex ) {
						cell = $row[ 0 ].cells[ colIndex ];
						if ( cell && cacheIndex < c.columns ) {
							hasParser = typeof parsers[ cacheIndex ] !== 'undefined';
							if ( !hasParser && c.debug ) {
								console.warn( 'No parser found for row: ' + rowIndex + ', column: ' + colIndex +
									'; cell containing: "' + $(cell).text() + '"; does it have a header?' );
							}
							val = ts.getElementText( c, cell, cacheIndex );
							rowData.raw[ cacheIndex ] = val; // save original row text
							// save raw column text even if there is no parser set
							txt = ts.getParsedText( c, cell, cacheIndex, val );
							cols[ cacheIndex ] = txt;
							if ( hasParser && ( parsers[ cacheIndex ].type || '' ).toLowerCase() === 'numeric' ) {
								// determine column max value (ignore sign)
								colMax[ cacheIndex ] = Math.max( Math.abs( txt ) || 0, colMax[ cacheIndex ] || 0 );
							}
							// allow colSpan in tbody
							span = cell.colSpan - 1;
							if ( span > 0 ) {
								index = 0;
								while ( index <= span ) {
									// duplicate text (or not) to spanned columns
									// instead of setting duplicate span to empty string, use textExtraction to try to get a value
									// see http://stackoverflow.com/q/36449711/145346
									txt = c.duplicateSpan || index === 0 ?
										val :
										typeof c.textExtraction !== 'string' ?
											ts.getElementText( c, cell, cacheIndex + index ) || '' :
											'';
									rowData.raw[ cacheIndex + index ] = txt;
									cols[ cacheIndex + index ] = txt;
									index++;
								}
								cacheIndex += span;
								max += span;
							}
						}
						cacheIndex++;
					}
					// ensure rowData is always in the same location (after the last column)
					cols[ c.columns ] = rowData;
					cache.normalized[ cache.normalized.length ] = cols;
				}
				cache.colMax = colMax;
				// total up rows, not including child rows
				c.totalRows += cache.normalized.length;

			}
			if ( c.showProcessing ) {
				ts.isProcessing( table ); // remove processing icon
			}
			if ( c.debug ) {
				len = Math.min( 5, c.cache[ 0 ].normalized.length );
				console[ console.group ? 'group' : 'log' ]( 'Building cache for ' + c.totalRows +
					' rows (showing ' + len + ' rows in log) and ' + c.columns + ' columns' +
					ts.benchmark( cacheTime ) );
				val = {};
				for ( colIndex = 0; colIndex < c.columns; colIndex++ ) {
					for ( cacheIndex = 0; cacheIndex < len; cacheIndex++ ) {
						if ( !val[ 'row: ' + cacheIndex ] ) {
							val[ 'row: ' + cacheIndex ] = {};
						}
						val[ 'row: ' + cacheIndex ][ c.$headerIndexed[ colIndex ].text() ] =
							c.cache[ 0 ].normalized[ cacheIndex ][ colIndex ];
					}
				}
				console[ console.table ? 'table' : 'log' ]( val );
				if ( console.groupEnd ) { console.groupEnd(); }
			}
			if ( $.isFunction( callback ) ) {
				callback( table );
			}
		},

		getColumnText : function( table, column, callback, rowFilter ) {
			table = $( table )[0];
			var tbodyIndex, rowIndex, cache, row, tbodyLen, rowLen, raw, parsed, $cell, result,
				hasCallback = typeof callback === 'function',
				allColumns = column === 'all',
				data = { raw : [], parsed: [], $cell: [] },
				c = table.config;
			if ( ts.isEmptyObject( c ) ) {
				if ( c.debug ) {
					console.warn( 'No cache found - aborting getColumnText function!' );
				}
			} else {
				tbodyLen = c.$tbodies.length;
				for ( tbodyIndex = 0; tbodyIndex < tbodyLen; tbodyIndex++ ) {
					cache = c.cache[ tbodyIndex ].normalized;
					rowLen = cache.length;
					for ( rowIndex = 0; rowIndex < rowLen; rowIndex++ ) {
						row = cache[ rowIndex ];
						if ( rowFilter && !row[ c.columns ].$row.is( rowFilter ) ) {
							continue;
						}
						result = true;
						parsed = ( allColumns ) ? row.slice( 0, c.columns ) : row[ column ];
						row = row[ c.columns ];
						raw = ( allColumns ) ? row.raw : row.raw[ column ];
						$cell = ( allColumns ) ? row.$row.children() : row.$row.children().eq( column );
						if ( hasCallback ) {
							result = callback({
								tbodyIndex : tbodyIndex,
								rowIndex : rowIndex,
								parsed : parsed,
								raw : raw,
								$row : row.$row,
								$cell : $cell
							});
						}
						if ( result !== false ) {
							data.parsed[ data.parsed.length ] = parsed;
							data.raw[ data.raw.length ] = raw;
							data.$cell[ data.$cell.length ] = $cell;
						}
					}
				}
				// return everything
				return data;
			}
		},

		/*
		██  ██ █████▄ █████▄ ▄████▄ ██████ ██████
		██  ██ ██▄▄██ ██  ██ ██▄▄██   ██   ██▄▄
		██  ██ ██▀▀▀  ██  ██ ██▀▀██   ██   ██▀▀
		▀████▀ ██     █████▀ ██  ██   ██   ██████
		*/
		setHeadersCss : function( c ) {
			var indx, column,
				list = c.sortList,
				len = list.length,
				none = ts.css.sortNone + ' ' + c.cssNone,
				css = [ ts.css.sortAsc + ' ' + c.cssAsc, ts.css.sortDesc + ' ' + c.cssDesc ],
				cssIcon = [ c.cssIconAsc, c.cssIconDesc, c.cssIconNone ],
				aria = [ 'ascending', 'descending' ],
				updateColumnSort = function($el, index) {
					$el
						.removeClass( none )
						.addClass( css[ index ] )
						.attr( 'aria-sort', aria[ index ] )
						.find( '.' + ts.css.icon )
						.removeClass( cssIcon[ 2 ] )
						.addClass( cssIcon[ index ] );
				},
				// find the footer
				$extras = c.$table
					.find( 'tfoot tr' )
					.children( 'td, th' )
					.add( $( c.namespace + '_extra_headers' ) )
					.removeClass( css.join( ' ' ) ),
				// remove all header information
				$sorted = c.$headers
					.add( $( 'thead ' + c.namespace + '_extra_headers' ) )
					.removeClass( css.join( ' ' ) )
					.addClass( none )
					.attr( 'aria-sort', 'none' )
					.find( '.' + ts.css.icon )
					.removeClass( cssIcon.join( ' ' ) )
					.end();
			// add css none to all sortable headers
			$sorted
				.not( '.sorter-false' )
				.find( '.' + ts.css.icon )
				.addClass( cssIcon[ 2 ] );
			// add disabled css icon class
			if ( c.cssIconDisabled ) {
				$sorted
					.filter( '.sorter-false' )
					.find( '.' + ts.css.icon )
					.addClass( c.cssIconDisabled );
			}
			for ( indx = 0; indx < len; indx++ ) {
				// direction = 2 means reset!
				if ( list[ indx ][ 1 ] !== 2 ) {
					// multicolumn sorting updating - see #1005
					// .not(function(){}) needs jQuery 1.4
					// filter(function(i, el){}) <- el is undefined in jQuery v1.2.6
					$sorted = c.$headers.filter( function( i ) {
						// only include headers that are in the sortList (this includes colspans)
						var include = true,
							$el = c.$headers.eq( i ),
							col = parseInt( $el.attr( 'data-column' ), 10 ),
							end = col + ts.getClosest( $el, 'th, td' )[0].colSpan;
						for ( ; col < end; col++ ) {
							include = include ? include || ts.isValueInArray( col, c.sortList ) > -1 : false;
						}
						return include;
					});

					// choose the :last in case there are nested columns
					$sorted = $sorted
						.not( '.sorter-false' )
						.filter( '[data-column="' + list[ indx ][ 0 ] + '"]' + ( len === 1 ? ':last' : '' ) );
					if ( $sorted.length ) {
						for ( column = 0; column < $sorted.length; column++ ) {
							if ( !$sorted[ column ].sortDisabled ) {
								updateColumnSort( $sorted.eq( column ), list[ indx ][ 1 ] );
							}
						}
					}
					// add sorted class to footer & extra headers, if they exist
					if ( $extras.length ) {
						updateColumnSort( $extras.filter( '[data-column="' + list[ indx ][ 0 ] + '"]' ), list[ indx ][ 1 ] );
					}
				}
			}
			// add verbose aria labels
			len = c.$headers.length;
			for ( indx = 0; indx < len; indx++ ) {
				ts.setColumnAriaLabel( c, c.$headers.eq( indx ) );
			}
		},

		getClosest : function( $el, selector ) {
			// jQuery v1.2.6 doesn't have closest()
			if ( $.fn.closest ) {
				return $el.closest( selector );
			}
			return $el.is( selector ) ?
				$el :
				$el.parents( selector ).filter( ':first' );
		},

		// nextSort (optional), lets you disable next sort text
		setColumnAriaLabel : function( c, $header, nextSort ) {
			if ( $header.length ) {
				var column = parseInt( $header.attr( 'data-column' ), 10 ),
					vars = c.sortVars[ column ],
					tmp = $header.hasClass( ts.css.sortAsc ) ?
						'sortAsc' :
						$header.hasClass( ts.css.sortDesc ) ? 'sortDesc' : 'sortNone',
					txt = $.trim( $header.text() ) + ': ' + ts.language[ tmp ];
				if ( $header.hasClass( 'sorter-false' ) || nextSort === false ) {
					txt += ts.language.sortDisabled;
				} else {
					tmp = ( vars.count + 1 ) % vars.order.length;
					nextSort = vars.order[ tmp ];
					// if nextSort
					txt += ts.language[ nextSort === 0 ? 'nextAsc' : nextSort === 1 ? 'nextDesc' : 'nextNone' ];
				}
				$header.attr( 'aria-label', txt );
			}
		},

		updateHeader : function( c ) {
			var index, isDisabled, $header, col,
				table = c.table,
				len = c.$headers.length;
			for ( index = 0; index < len; index++ ) {
				$header = c.$headers.eq( index );
				col = ts.getColumnData( table, c.headers, index, true );
				// add 'sorter-false' class if 'parser-false' is set
				isDisabled = ts.getData( $header, col, 'sorter' ) === 'false' || ts.getData( $header, col, 'parser' ) === 'false';
				ts.setColumnSort( c, $header, isDisabled );
			}
		},

		setColumnSort : function( c, $header, isDisabled ) {
			var id = c.table.id;
			$header[ 0 ].sortDisabled = isDisabled;
			$header[ isDisabled ? 'addClass' : 'removeClass' ]( 'sorter-false' )
				.attr( 'aria-disabled', '' + isDisabled );
			// disable tab index on disabled cells
			if ( c.tabIndex ) {
				if ( isDisabled ) {
					$header.removeAttr( 'tabindex' );
				} else {
					$header.attr( 'tabindex', '0' );
				}
			}
			// aria-controls - requires table ID
			if ( id ) {
				if ( isDisabled ) {
					$header.removeAttr( 'aria-controls' );
				} else {
					$header.attr( 'aria-controls', id );
				}
			}
		},

		updateHeaderSortCount : function( c, list ) {
			var col, dir, group, indx, primary, temp, val, order,
				sortList = list || c.sortList,
				len = sortList.length;
			c.sortList = [];
			for ( indx = 0; indx < len; indx++ ) {
				val = sortList[ indx ];
				// ensure all sortList values are numeric - fixes #127
				col = parseInt( val[ 0 ], 10 );
				// prevents error if sorton array is wrong
				if ( col < c.columns ) {

					// set order if not already defined - due to colspan header without associated header cell
					// adding this check prevents a javascript error
					if ( !c.sortVars[ col ].order ) {
						if ( ts.getOrder( c.sortInitialOrder ) ) {
							order = c.sortReset ? [ 1, 0, 2 ] : [ 1, 0 ];
						} else {
							order = c.sortReset ? [ 0, 1, 2 ] : [ 0, 1 ];
						}
						c.sortVars[ col ].order = order;
						c.sortVars[ col ].count = 0;
					}

					order = c.sortVars[ col ].order;
					dir = ( '' + val[ 1 ] ).match( /^(1|d|s|o|n)/ );
					dir = dir ? dir[ 0 ] : '';
					// 0/(a)sc (default), 1/(d)esc, (s)ame, (o)pposite, (n)ext
					switch ( dir ) {
						case '1' : case 'd' : // descending
							dir = 1;
							break;
						case 's' : // same direction (as primary column)
							// if primary sort is set to 's', make it ascending
							dir = primary || 0;
							break;
						case 'o' :
							temp = order[ ( primary || 0 ) % order.length ];
							// opposite of primary column; but resets if primary resets
							dir = temp === 0 ? 1 : temp === 1 ? 0 : 2;
							break;
						case 'n' :
							dir = order[ ( ++c.sortVars[ col ].count ) % order.length ];
							break;
						default : // ascending
							dir = 0;
							break;
					}
					primary = indx === 0 ? dir : primary;
					group = [ col, parseInt( dir, 10 ) || 0 ];
					c.sortList[ c.sortList.length ] = group;
					dir = $.inArray( group[ 1 ], order ); // fixes issue #167
					c.sortVars[ col ].count = dir >= 0 ? dir : group[ 1 ] % order.length;
				}
			}
		},

		updateAll : function( c, resort, callback ) {
			var table = c.table;
			table.isUpdating = true;
			ts.refreshWidgets( table, true, true );
			ts.buildHeaders( c );
			ts.bindEvents( table, c.$headers, true );
			ts.bindMethods( c );
			ts.commonUpdate( c, resort, callback );
		},

		update : function( c, resort, callback ) {
			var table = c.table;
			table.isUpdating = true;
			// update sorting (if enabled/disabled)
			ts.updateHeader( c );
			ts.commonUpdate( c, resort, callback );
		},

		// simple header update - see #989
		updateHeaders : function( c, callback ) {
			c.table.isUpdating = true;
			ts.buildHeaders( c );
			ts.bindEvents( c.table, c.$headers, true );
			ts.resortComplete( c, callback );
		},

		updateCell : function( c, cell, resort, callback ) {
			// updateCell for child rows is a mess - we'll ignore them for now
			// eventually I'll break out the "update" row cache code to make everything consistent
			if ( $( cell ).closest( 'tr' ).hasClass( c.cssChildRow ) ) {
				console.warn('Tablesorter Warning! "updateCell" for child row content has been disabled, use "update" instead');
				return;
			}
			if ( ts.isEmptyObject( c.cache ) ) {
				// empty table, do an update instead - fixes #1099
				ts.updateHeader( c );
				ts.commonUpdate( c, resort, callback );
				return;
			}
			c.table.isUpdating = true;
			c.$table.find( c.selectorRemove ).remove();
			// get position from the dom
			var tmp, indx, row, icell, cache, len,
				$tbodies = c.$tbodies,
				$cell = $( cell ),
				// update cache - format: function( s, table, cell, cellIndex )
				// no closest in jQuery v1.2.6
				tbodyIndex = $tbodies.index( ts.getClosest( $cell, 'tbody' ) ),
				tbcache = c.cache[ tbodyIndex ],
				$row = ts.getClosest( $cell, 'tr' );
			cell = $cell[ 0 ]; // in case cell is a jQuery object
			// tbody may not exist if update is initialized while tbody is removed for processing
			if ( $tbodies.length && tbodyIndex >= 0 ) {
				row = $tbodies.eq( tbodyIndex ).find( 'tr' ).not( '.' + c.cssChildRow ).index( $row );
				cache = tbcache.normalized[ row ];
				len = $row[ 0 ].cells.length;
				if ( len !== c.columns ) {
					// colspan in here somewhere!
					icell = 0;
					tmp = false;
					for ( indx = 0; indx < len; indx++ ) {
						if ( !tmp && $row[ 0 ].cells[ indx ] !== cell ) {
							icell += $row[ 0 ].cells[ indx ].colSpan;
						} else {
							tmp = true;
						}
					}
				} else {
					icell = $cell.index();
				}
				tmp = ts.getElementText( c, cell, icell ); // raw
				cache[ c.columns ].raw[ icell ] = tmp;
				tmp = ts.getParsedText( c, cell, icell, tmp );
				cache[ icell ] = tmp; // parsed
				if ( ( c.parsers[ icell ].type || '' ).toLowerCase() === 'numeric' ) {
					// update column max value (ignore sign)
					tbcache.colMax[ icell ] = Math.max( Math.abs( tmp ) || 0, tbcache.colMax[ icell ] || 0 );
				}
				tmp = resort !== 'undefined' ? resort : c.resort;
				if ( tmp !== false ) {
					// widgets will be reapplied
					ts.checkResort( c, tmp, callback );
				} else {
					// don't reapply widgets is resort is false, just in case it causes
					// problems with element focus
					ts.resortComplete( c, callback );
				}
			} else {
				if ( c.debug ) {
					console.error( 'updateCell aborted, tbody missing or not within the indicated table' );
				}
				c.table.isUpdating = false;
			}
		},

		addRows : function( c, $row, resort, callback ) {
			var txt, val, tbodyIndex, rowIndex, rows, cellIndex, len, order,
				cacheIndex, rowData, cells, cell, span,
				// allow passing a row string if only one non-info tbody exists in the table
				valid = typeof $row === 'string' && c.$tbodies.length === 1 && /<tr/.test( $row || '' ),
				table = c.table;
			if ( valid ) {
				$row = $( $row );
				c.$tbodies.append( $row );
			} else if (
				!$row ||
				// row is a jQuery object?
				!( $row instanceof jQuery ) ||
				// row contained in the table?
				( ts.getClosest( $row, 'table' )[ 0 ] !== c.table )
			) {
				if ( c.debug ) {
					console.error( 'addRows method requires (1) a jQuery selector reference to rows that have already ' +
						'been added to the table, or (2) row HTML string to be added to a table with only one tbody' );
				}
				return false;
			}
			table.isUpdating = true;
			if ( ts.isEmptyObject( c.cache ) ) {
				// empty table, do an update instead - fixes #450
				ts.updateHeader( c );
				ts.commonUpdate( c, resort, callback );
			} else {
				rows = $row.filter( 'tr' ).attr( 'role', 'row' ).length;
				tbodyIndex = c.$tbodies.index( $row.parents( 'tbody' ).filter( ':first' ) );
				// fixes adding rows to an empty table - see issue #179
				if ( !( c.parsers && c.parsers.length ) ) {
					ts.setupParsers( c );
				}
				// add each row
				for ( rowIndex = 0; rowIndex < rows; rowIndex++ ) {
					cacheIndex = 0;
					len = $row[ rowIndex ].cells.length;
					order = c.cache[ tbodyIndex ].normalized.length;
					cells = [];
					rowData = {
						child : [],
						raw : [],
						$row : $row.eq( rowIndex ),
						order : order
					};
					// add each cell
					for ( cellIndex = 0; cellIndex < len; cellIndex++ ) {
						cell = $row[ rowIndex ].cells[ cellIndex ];
						txt = ts.getElementText( c, cell, cacheIndex );
						rowData.raw[ cacheIndex ] = txt;
						val = ts.getParsedText( c, cell, cacheIndex, txt );
						cells[ cacheIndex ] = val;
						if ( ( c.parsers[ cacheIndex ].type || '' ).toLowerCase() === 'numeric' ) {
							// update column max value (ignore sign)
							c.cache[ tbodyIndex ].colMax[ cacheIndex ] =
								Math.max( Math.abs( val ) || 0, c.cache[ tbodyIndex ].colMax[ cacheIndex ] || 0 );
						}
						span = cell.colSpan - 1;
						if ( span > 0 ) {
							cacheIndex += span;
						}
						cacheIndex++;
					}
					// add the row data to the end
					cells[ c.columns ] = rowData;
					// update cache
					c.cache[ tbodyIndex ].normalized[ order ] = cells;
				}
				// resort using current settings
				ts.checkResort( c, resort, callback );
			}
		},

		updateCache : function( c, callback, $tbodies ) {
			// rebuild parsers
			if ( !( c.parsers && c.parsers.length ) ) {
				ts.setupParsers( c, $tbodies );
			}
			// rebuild the cache map
			ts.buildCache( c, callback, $tbodies );
		},

		// init flag (true) used by pager plugin to prevent widget application
		// renamed from appendToTable
		appendCache : function( c, init ) {
			var parsed, totalRows, $tbody, $curTbody, rowIndex, tbodyIndex, appendTime,
				table = c.table,
				wo = c.widgetOptions,
				$tbodies = c.$tbodies,
				rows = [],
				cache = c.cache;
			// empty table - fixes #206/#346
			if ( ts.isEmptyObject( cache ) ) {
				// run pager appender in case the table was just emptied
				return c.appender ? c.appender( table, rows ) :
					table.isUpdating ? c.$table.triggerHandler( 'updateComplete', table ) : ''; // Fixes #532
			}
			if ( c.debug ) {
				appendTime = new Date();
			}
			for ( tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
				$tbody = $tbodies.eq( tbodyIndex );
				if ( $tbody.length ) {
					// detach tbody for manipulation
					$curTbody = ts.processTbody( table, $tbody, true );
					parsed = cache[ tbodyIndex ].normalized;
					totalRows = parsed.length;
					for ( rowIndex = 0; rowIndex < totalRows; rowIndex++ ) {
						rows[rows.length] = parsed[ rowIndex ][ c.columns ].$row;
						// removeRows used by the pager plugin; don't render if using ajax - fixes #411
						if ( !c.appender || ( c.pager && ( !c.pager.removeRows || !wo.pager_removeRows ) && !c.pager.ajax ) ) {
							$curTbody.append( parsed[ rowIndex ][ c.columns ].$row );
						}
					}
					// restore tbody
					ts.processTbody( table, $curTbody, false );
				}
			}
			if ( c.appender ) {
				c.appender( table, rows );
			}
			if ( c.debug ) {
				console.log( 'Rebuilt table' + ts.benchmark( appendTime ) );
			}
			// apply table widgets; but not before ajax completes
			if ( !init && !c.appender ) {
				ts.applyWidget( table );
			}
			if ( table.isUpdating ) {
				c.$table.triggerHandler( 'updateComplete', table );
			}
		},

		commonUpdate : function( c, resort, callback ) {
			// remove rows/elements before update
			c.$table.find( c.selectorRemove ).remove();
			// rebuild parsers
			ts.setupParsers( c );
			// rebuild the cache map
			ts.buildCache( c );
			ts.checkResort( c, resort, callback );
		},

		/*
		▄█████ ▄████▄ █████▄ ██████ ██ █████▄ ▄████▄
		▀█▄    ██  ██ ██▄▄██   ██   ██ ██  ██ ██ ▄▄▄
		   ▀█▄ ██  ██ ██▀██    ██   ██ ██  ██ ██ ▀██
		█████▀ ▀████▀ ██  ██   ██   ██ ██  ██ ▀████▀
		*/
		initSort : function( c, cell, event ) {
			if ( c.table.isUpdating ) {
				// let any updates complete before initializing a sort
				return setTimeout( function(){
					ts.initSort( c, cell, event );
				}, 50 );
			}

			var arry, indx, headerIndx, dir, temp, tmp, $header,
				notMultiSort = !event[ c.sortMultiSortKey ],
				table = c.table,
				len = c.$headers.length,
				th = ts.getClosest( $( cell ), 'th, td' ),
				col = parseInt( th.attr( 'data-column' ), 10 ),
				order = c.sortVars[ col ].order;
			th = th[0];
			// Only call sortStart if sorting is enabled
			c.$table.triggerHandler( 'sortStart', table );
			// get current column sort order
			tmp = ( c.sortVars[ col ].count + 1 ) % order.length;
			c.sortVars[ col ].count = event[ c.sortResetKey ] ? 2 : tmp;
			// reset all sorts on non-current column - issue #30
			if ( c.sortRestart ) {
				for ( headerIndx = 0; headerIndx < len; headerIndx++ ) {
					$header = c.$headers.eq( headerIndx );
					tmp = parseInt( $header.attr( 'data-column' ), 10 );
					// only reset counts on columns that weren't just clicked on and if not included in a multisort
					if ( col !== tmp && ( notMultiSort || $header.hasClass( ts.css.sortNone ) ) ) {
						c.sortVars[ tmp ].count = -1;
					}
				}
			}
			// user only wants to sort on one column
			if ( notMultiSort ) {
				// flush the sort list
				c.sortList = [];
				c.last.sortList = [];
				if ( c.sortForce !== null ) {
					arry = c.sortForce;
					for ( indx = 0; indx < arry.length; indx++ ) {
						if ( arry[ indx ][ 0 ] !== col ) {
							c.sortList[ c.sortList.length ] = arry[ indx ];
						}
					}
				}
				// add column to sort list
				dir = order[ c.sortVars[ col ].count ];
				if ( dir < 2 ) {
					c.sortList[ c.sortList.length ] = [ col, dir ];
					// add other columns if header spans across multiple
					if ( th.colSpan > 1 ) {
						for ( indx = 1; indx < th.colSpan; indx++ ) {
							c.sortList[ c.sortList.length ] = [ col + indx, dir ];
							// update count on columns in colSpan
							c.sortVars[ col + indx ].count = $.inArray( dir, order );
						}
					}
				}
				// multi column sorting
			} else {
				// get rid of the sortAppend before adding more - fixes issue #115 & #523
				c.sortList = $.extend( [], c.last.sortList );

				// the user has clicked on an already sorted column
				if ( ts.isValueInArray( col, c.sortList ) >= 0 ) {
					// reverse the sorting direction
					for ( indx = 0; indx < c.sortList.length; indx++ ) {
						tmp = c.sortList[ indx ];
						if ( tmp[ 0 ] === col ) {
							// order.count seems to be incorrect when compared to cell.count
							tmp[ 1 ] = order[ c.sortVars[ col ].count ];
							if ( tmp[1] === 2 ) {
								c.sortList.splice( indx, 1 );
								c.sortVars[ col ].count = -1;
							}
						}
					}
				} else {
					// add column to sort list array
					dir = order[ c.sortVars[ col ].count ];
					if ( dir < 2 ) {
						c.sortList[ c.sortList.length ] = [ col, dir ];
						// add other columns if header spans across multiple
						if ( th.colSpan > 1 ) {
							for ( indx = 1; indx < th.colSpan; indx++ ) {
								c.sortList[ c.sortList.length ] = [ col + indx, dir ];
								// update count on columns in colSpan
								c.sortVars[ col + indx ].count = $.inArray( dir, order );
							}
						}
					}
				}
			}
			// save sort before applying sortAppend
			c.last.sortList = $.extend( [], c.sortList );
			if ( c.sortList.length && c.sortAppend ) {
				arry = $.isArray( c.sortAppend ) ? c.sortAppend : c.sortAppend[ c.sortList[ 0 ][ 0 ] ];
				if ( !ts.isEmptyObject( arry ) ) {
					for ( indx = 0; indx < arry.length; indx++ ) {
						if ( arry[ indx ][ 0 ] !== col && ts.isValueInArray( arry[ indx ][ 0 ], c.sortList ) < 0 ) {
							dir = arry[ indx ][ 1 ];
							temp = ( '' + dir ).match( /^(a|d|s|o|n)/ );
							if ( temp ) {
								tmp = c.sortList[ 0 ][ 1 ];
								switch ( temp[ 0 ] ) {
									case 'd' :
										dir = 1;
										break;
									case 's' :
										dir = tmp;
										break;
									case 'o' :
										dir = tmp === 0 ? 1 : 0;
										break;
									case 'n' :
										dir = ( tmp + 1 ) % order.length;
										break;
									default:
										dir = 0;
										break;
								}
							}
							c.sortList[ c.sortList.length ] = [ arry[ indx ][ 0 ], dir ];
						}
					}
				}
			}
			// sortBegin event triggered immediately before the sort
			c.$table.triggerHandler( 'sortBegin', table );
			// setTimeout needed so the processing icon shows up
			setTimeout( function() {
				// set css for headers
				ts.setHeadersCss( c );
				ts.multisort( c );
				ts.appendCache( c );
				c.$table.triggerHandler( 'sortBeforeEnd', table );
				c.$table.triggerHandler( 'sortEnd', table );
			}, 1 );
		},

		// sort multiple columns
		multisort : function( c ) { /*jshint loopfunc:true */
			var tbodyIndex, sortTime, colMax, rows, tmp,
				table = c.table,
				sorter = [],
				dir = 0,
				textSorter = c.textSorter || '',
				sortList = c.sortList,
				sortLen = sortList.length,
				len = c.$tbodies.length;
			if ( c.serverSideSorting || ts.isEmptyObject( c.cache ) ) {
				// empty table - fixes #206/#346
				return;
			}
			if ( c.debug ) { sortTime = new Date(); }
			// cache textSorter to optimize speed
			if ( typeof textSorter === 'object' ) {
				colMax = c.columns;
				while ( colMax-- ) {
					tmp = ts.getColumnData( table, textSorter, colMax );
					if ( typeof tmp === 'function' ) {
						sorter[ colMax ] = tmp;
					}
				}
			}
			for ( tbodyIndex = 0; tbodyIndex < len; tbodyIndex++ ) {
				colMax = c.cache[ tbodyIndex ].colMax;
				rows = c.cache[ tbodyIndex ].normalized;

				rows.sort( function( a, b ) {
					var sortIndex, num, col, order, sort, x, y;
					// rows is undefined here in IE, so don't use it!
					for ( sortIndex = 0; sortIndex < sortLen; sortIndex++ ) {
						col = sortList[ sortIndex ][ 0 ];
						order = sortList[ sortIndex ][ 1 ];
						// sort direction, true = asc, false = desc
						dir = order === 0;

						if ( c.sortStable && a[ col ] === b[ col ] && sortLen === 1 ) {
							return a[ c.columns ].order - b[ c.columns ].order;
						}

						// fallback to natural sort since it is more robust
						num = /n/i.test( ts.getSortType( c.parsers, col ) );
						if ( num && c.strings[ col ] ) {
							// sort strings in numerical columns
							if ( typeof ( ts.string[ c.strings[ col ] ] ) === 'boolean' ) {
								num = ( dir ? 1 : -1 ) * ( ts.string[ c.strings[ col ] ] ? -1 : 1 );
							} else {
								num = ( c.strings[ col ] ) ? ts.string[ c.strings[ col ] ] || 0 : 0;
							}
							// fall back to built-in numeric sort
							// var sort = $.tablesorter['sort' + s]( a[col], b[col], dir, colMax[col], table );
							sort = c.numberSorter ? c.numberSorter( a[ col ], b[ col ], dir, colMax[ col ], table ) :
								ts[ 'sortNumeric' + ( dir ? 'Asc' : 'Desc' ) ]( a[ col ], b[ col ], num, colMax[ col ], col, c );
						} else {
							// set a & b depending on sort direction
							x = dir ? a : b;
							y = dir ? b : a;
							// text sort function
							if ( typeof textSorter === 'function' ) {
								// custom OVERALL text sorter
								sort = textSorter( x[ col ], y[ col ], dir, col, table );
							} else if ( typeof sorter[ col ] === 'function' ) {
								// custom text sorter for a SPECIFIC COLUMN
								sort = sorter[ col ]( x[ col ], y[ col ], dir, col, table );
							} else {
								// fall back to natural sort
								sort = ts[ 'sortNatural' + ( dir ? 'Asc' : 'Desc' ) ]( a[ col ], b[ col ], col, c );
							}
						}
						if ( sort ) { return sort; }
					}
					return a[ c.columns ].order - b[ c.columns ].order;
				});
			}
			if ( c.debug ) {
				console.log( 'Applying sort ' + sortList.toString() + ts.benchmark( sortTime ) );
			}
		},

		resortComplete : function( c, callback ) {
			if ( c.table.isUpdating ) {
				c.$table.triggerHandler( 'updateComplete', c.table );
			}
			if ( $.isFunction( callback ) ) {
				callback( c.table );
			}
		},

		checkResort : function( c, resort, callback ) {
			var sortList = $.isArray( resort ) ? resort : c.sortList,
				// if no resort parameter is passed, fallback to config.resort (true by default)
				resrt = typeof resort === 'undefined' ? c.resort : resort;
			// don't try to resort if the table is still processing
			// this will catch spamming of the updateCell method
			if ( resrt !== false && !c.serverSideSorting && !c.table.isProcessing ) {
				if ( sortList.length ) {
					ts.sortOn( c, sortList, function() {
						ts.resortComplete( c, callback );
					}, true );
				} else {
					ts.sortReset( c, function() {
						ts.resortComplete( c, callback );
						ts.applyWidget( c.table, false );
					} );
				}
			} else {
				ts.resortComplete( c, callback );
				ts.applyWidget( c.table, false );
			}
		},

		sortOn : function( c, list, callback, init ) {
			var table = c.table;
			c.$table.triggerHandler( 'sortStart', table );
			// update header count index
			ts.updateHeaderSortCount( c, list );
			// set css for headers
			ts.setHeadersCss( c );
			// fixes #346
			if ( c.delayInit && ts.isEmptyObject( c.cache ) ) {
				ts.buildCache( c );
			}
			c.$table.triggerHandler( 'sortBegin', table );
			// sort the table and append it to the dom
			ts.multisort( c );
			ts.appendCache( c, init );
			c.$table.triggerHandler( 'sortBeforeEnd', table );
			c.$table.triggerHandler( 'sortEnd', table );
			ts.applyWidget( table );
			if ( $.isFunction( callback ) ) {
				callback( table );
			}
		},

		sortReset : function( c, callback ) {
			c.sortList = [];
			ts.setHeadersCss( c );
			ts.multisort( c );
			ts.appendCache( c );
			var indx;
			for (indx = 0; indx < c.columns; indx++) {
				c.sortVars[ indx ].count = -1;
			}
			if ( $.isFunction( callback ) ) {
				callback( c.table );
			}
		},

		getSortType : function( parsers, column ) {
			return ( parsers && parsers[ column ] ) ? parsers[ column ].type || '' : '';
		},

		getOrder : function( val ) {
			// look for 'd' in 'desc' order; return true
			return ( /^d/i.test( val ) || val === 1 );
		},

		// Natural sort - https://github.com/overset/javascript-natural-sort (date sorting removed)
		sortNatural : function( a, b ) {
			if ( a === b ) { return 0; }
			a = a.toString();
			b = b.toString();
			var aNum, bNum, aFloat, bFloat, indx, max,
				regex = ts.regex;
			// first try and sort Hex codes
			if ( regex.hex.test( b ) ) {
				aNum = parseInt( ( a || '' ).match( regex.hex ), 16 );
				bNum = parseInt( ( b || '' ).match( regex.hex ), 16 );
				if ( aNum < bNum ) { return -1; }
				if ( aNum > bNum ) { return 1; }
			}
			// chunk/tokenize
			aNum = ( a || '' ).replace( regex.chunk, '\\0$1\\0' ).replace( regex.chunks, '' ).split( '\\0' );
			bNum = ( b || '' ).replace( regex.chunk, '\\0$1\\0' ).replace( regex.chunks, '' ).split( '\\0' );
			max = Math.max( aNum.length, bNum.length );
			// natural sorting through split numeric strings and default strings
			for ( indx = 0; indx < max; indx++ ) {
				// find floats not starting with '0', string or 0 if not defined
				aFloat = isNaN( aNum[ indx ] ) ? aNum[ indx ] || 0 : parseFloat( aNum[ indx ] ) || 0;
				bFloat = isNaN( bNum[ indx ] ) ? bNum[ indx ] || 0 : parseFloat( bNum[ indx ] ) || 0;
				// handle numeric vs string comparison - number < string - (Kyle Adams)
				if ( isNaN( aFloat ) !== isNaN( bFloat ) ) { return isNaN( aFloat ) ? 1 : -1; }
				// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
				if ( typeof aFloat !== typeof bFloat ) {
					aFloat += '';
					bFloat += '';
				}
				if ( aFloat < bFloat ) { return -1; }
				if ( aFloat > bFloat ) { return 1; }
			}
			return 0;
		},

		sortNaturalAsc : function( a, b, col, c ) {
			if ( a === b ) { return 0; }
			var empty = ts.string[ ( c.empties[ col ] || c.emptyTo ) ];
			if ( a === '' && empty !== 0 ) { return typeof empty === 'boolean' ? ( empty ? -1 : 1 ) : -empty || -1; }
			if ( b === '' && empty !== 0 ) { return typeof empty === 'boolean' ? ( empty ? 1 : -1 ) : empty || 1; }
			return ts.sortNatural( a, b );
		},

		sortNaturalDesc : function( a, b, col, c ) {
			if ( a === b ) { return 0; }
			var empty = ts.string[ ( c.empties[ col ] || c.emptyTo ) ];
			if ( a === '' && empty !== 0 ) { return typeof empty === 'boolean' ? ( empty ? -1 : 1 ) : empty || 1; }
			if ( b === '' && empty !== 0 ) { return typeof empty === 'boolean' ? ( empty ? 1 : -1 ) : -empty || -1; }
			return ts.sortNatural( b, a );
		},

		// basic alphabetical sort
		sortText : function( a, b ) {
			return a > b ? 1 : ( a < b ? -1 : 0 );
		},

		// return text string value by adding up ascii value
		// so the text is somewhat sorted when using a digital sort
		// this is NOT an alphanumeric sort
		getTextValue : function( val, num, max ) {
			if ( max ) {
				// make sure the text value is greater than the max numerical value (max)
				var indx,
					len = val ? val.length : 0,
					n = max + num;
				for ( indx = 0; indx < len; indx++ ) {
					n += val.charCodeAt( indx );
				}
				return num * n;
			}
			return 0;
		},

		sortNumericAsc : function( a, b, num, max, col, c ) {
			if ( a === b ) { return 0; }
			var empty = ts.string[ ( c.empties[ col ] || c.emptyTo ) ];
			if ( a === '' && empty !== 0 ) { return typeof empty === 'boolean' ? ( empty ? -1 : 1 ) : -empty || -1; }
			if ( b === '' && empty !== 0 ) { return typeof empty === 'boolean' ? ( empty ? 1 : -1 ) : empty || 1; }
			if ( isNaN( a ) ) { a = ts.getTextValue( a, num, max ); }
			if ( isNaN( b ) ) { b = ts.getTextValue( b, num, max ); }
			return a - b;
		},

		sortNumericDesc : function( a, b, num, max, col, c ) {
			if ( a === b ) { return 0; }
			var empty = ts.string[ ( c.empties[ col ] || c.emptyTo ) ];
			if ( a === '' && empty !== 0 ) { return typeof empty === 'boolean' ? ( empty ? -1 : 1 ) : empty || 1; }
			if ( b === '' && empty !== 0 ) { return typeof empty === 'boolean' ? ( empty ? 1 : -1 ) : -empty || -1; }
			if ( isNaN( a ) ) { a = ts.getTextValue( a, num, max ); }
			if ( isNaN( b ) ) { b = ts.getTextValue( b, num, max ); }
			return b - a;
		},

		sortNumeric : function( a, b ) {
			return a - b;
		},

		/*
		██ ██ ██ ██ █████▄ ▄████▄ ██████ ██████ ▄█████
		██ ██ ██ ██ ██  ██ ██ ▄▄▄ ██▄▄     ██   ▀█▄
		██ ██ ██ ██ ██  ██ ██ ▀██ ██▀▀     ██      ▀█▄
		███████▀ ██ █████▀ ▀████▀ ██████   ██   █████▀
		*/
		addWidget : function( widget ) {
			if ( widget.id && !ts.isEmptyObject( ts.getWidgetById( widget.id ) ) ) {
				console.warn( '"' + widget.id + '" widget was loaded more than once!' );
			}
			ts.widgets[ ts.widgets.length ] = widget;
		},

		hasWidget : function( $table, name ) {
			$table = $( $table );
			return $table.length && $table[ 0 ].config && $table[ 0 ].config.widgetInit[ name ] || false;
		},

		getWidgetById : function( name ) {
			var indx, widget,
				len = ts.widgets.length;
			for ( indx = 0; indx < len; indx++ ) {
				widget = ts.widgets[ indx ];
				if ( widget && widget.id && widget.id.toLowerCase() === name.toLowerCase() ) {
					return widget;
				}
			}
		},

		applyWidgetOptions : function( table ) {
			var indx, widget, wo,
				c = table.config,
				len = c.widgets.length;
			if ( len ) {
				for ( indx = 0; indx < len; indx++ ) {
					widget = ts.getWidgetById( c.widgets[ indx ] );
					if ( widget && widget.options ) {
						wo = $.extend( true, {}, widget.options );
						c.widgetOptions = $.extend( true, wo, c.widgetOptions );
						// add widgetOptions to defaults for option validator
						$.extend( true, ts.defaults.widgetOptions, widget.options );
					}
				}
			}
		},

		addWidgetFromClass : function( table ) {
			var len, indx,
				c = table.config,
				// look for widgets to apply from table class
				// don't match from 'ui-widget-content'; use \S instead of \w to include widgets
				// with dashes in the name, e.g. "widget-test-2" extracts out "test-2"
				regex = '^' + c.widgetClass.replace( ts.regex.templateName, '(\\S+)+' ) + '$',
				widgetClass = new RegExp( regex, 'g' ),
				// split up table class (widget id's can include dashes) - stop using match
				// otherwise only one widget gets extracted, see #1109
				widgets = ( table.className || '' ).split( ts.regex.spaces );
			if ( widgets.length ) {
				len = widgets.length;
				for ( indx = 0; indx < len; indx++ ) {
					if ( widgets[ indx ].match( widgetClass ) ) {
						c.widgets[ c.widgets.length ] = widgets[ indx ].replace( widgetClass, '$1' );
					}
				}
			}
		},

		applyWidgetId : function( table, id, init ) {
			table = $(table)[0];
			var applied, time, name,
				c = table.config,
				wo = c.widgetOptions,
				widget = ts.getWidgetById( id );
			if ( widget ) {
				name = widget.id;
				applied = false;
				// add widget name to option list so it gets reapplied after sorting, filtering, etc
				if ( $.inArray( name, c.widgets ) < 0 ) {
					c.widgets[ c.widgets.length ] = name;
				}
				if ( c.debug ) { time = new Date(); }

				if ( init || !( c.widgetInit[ name ] ) ) {
					// set init flag first to prevent calling init more than once (e.g. pager)
					c.widgetInit[ name ] = true;
					if ( table.hasInitialized ) {
						// don't reapply widget options on tablesorter init
						ts.applyWidgetOptions( table );
					}
					if ( typeof widget.init === 'function' ) {
						applied = true;
						if ( c.debug ) {
							console[ console.group ? 'group' : 'log' ]( 'Initializing ' + name + ' widget' );
						}
						widget.init( table, widget, c, wo );
					}
				}
				if ( !init && typeof widget.format === 'function' ) {
					applied = true;
					if ( c.debug ) {
						console[ console.group ? 'group' : 'log' ]( 'Updating ' + name + ' widget' );
					}
					widget.format( table, c, wo, false );
				}
				if ( c.debug ) {
					if ( applied ) {
						console.log( 'Completed ' + ( init ? 'initializing ' : 'applying ' ) + name + ' widget' + ts.benchmark( time ) );
						if ( console.groupEnd ) { console.groupEnd(); }
					}
				}
			}
		},

		applyWidget : function( table, init, callback ) {
			table = $( table )[ 0 ]; // in case this is called externally
			var indx, len, names, widget, time,
				c = table.config,
				widgets = [];
			// prevent numerous consecutive widget applications
			if ( init !== false && table.hasInitialized && ( table.isApplyingWidgets || table.isUpdating ) ) {
				return;
			}
			if ( c.debug ) { time = new Date(); }
			ts.addWidgetFromClass( table );
			// prevent "tablesorter-ready" from firing multiple times in a row
			clearTimeout( c.timerReady );
			if ( c.widgets.length ) {
				table.isApplyingWidgets = true;
				// ensure unique widget ids
				c.widgets = $.grep( c.widgets, function( val, index ) {
					return $.inArray( val, c.widgets ) === index;
				});
				names = c.widgets || [];
				len = names.length;
				// build widget array & add priority as needed
				for ( indx = 0; indx < len; indx++ ) {
					widget = ts.getWidgetById( names[ indx ] );
					if ( widget && widget.id ) {
						// set priority to 10 if not defined
						if ( !widget.priority ) { widget.priority = 10; }
						widgets[ indx ] = widget;
					} else if ( c.debug ) {
						console.warn( '"' + names[ indx ] + '" was enabled, but the widget code has not been loaded!' );
					}
				}
				// sort widgets by priority
				widgets.sort( function( a, b ) {
					return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1;
				});
				// add/update selected widgets
				len = widgets.length;
				if ( c.debug ) {
					console[ console.group ? 'group' : 'log' ]( 'Start ' + ( init ? 'initializing' : 'applying' ) + ' widgets' );
				}
				for ( indx = 0; indx < len; indx++ ) {
					widget = widgets[ indx ];
					if ( widget && widget.id ) {
						ts.applyWidgetId( table, widget.id, init );
					}
				}
				if ( c.debug && console.groupEnd ) { console.groupEnd(); }
			}
			c.timerReady = setTimeout( function() {
				table.isApplyingWidgets = false;
				$.data( table, 'lastWidgetApplication', new Date() );
				c.$table.triggerHandler( 'tablesorter-ready' );
				// callback executed on init only
				if ( !init && typeof callback === 'function' ) {
					callback( table );
				}
				if ( c.debug ) {
					widget = c.widgets.length;
					console.log( 'Completed ' +
						( init === true ? 'initializing ' : 'applying ' ) + widget +
						' widget' + ( widget !== 1 ? 's' : '' ) + ts.benchmark( time ) );
				}
			}, 10 );
		},

		removeWidget : function( table, name, refreshing ) {
			table = $( table )[ 0 ];
			var index, widget, indx, len,
				c = table.config;
			// if name === true, add all widgets from $.tablesorter.widgets
			if ( name === true ) {
				name = [];
				len = ts.widgets.length;
				for ( indx = 0; indx < len; indx++ ) {
					widget = ts.widgets[ indx ];
					if ( widget && widget.id ) {
						name[ name.length ] = widget.id;
					}
				}
			} else {
				// name can be either an array of widgets names,
				// or a space/comma separated list of widget names
				name = ( $.isArray( name ) ? name.join( ',' ) : name || '' ).toLowerCase().split( /[\s,]+/ );
			}
			len = name.length;
			for ( index = 0; index < len; index++ ) {
				widget = ts.getWidgetById( name[ index ] );
				indx = $.inArray( name[ index ], c.widgets );
				// don't remove the widget from config.widget if refreshing
				if ( indx >= 0 && refreshing !== true ) {
					c.widgets.splice( indx, 1 );
				}
				if ( widget && widget.remove ) {
					if ( c.debug ) {
						console.log( ( refreshing ? 'Refreshing' : 'Removing' ) + ' "' + name[ index ] + '" widget' );
					}
					widget.remove( table, c, c.widgetOptions, refreshing );
					c.widgetInit[ name[ index ] ] = false;
				}
			}
			c.$table.triggerHandler( 'widgetRemoveEnd', table );
		},

		refreshWidgets : function( table, doAll, dontapply ) {
			table = $( table )[ 0 ]; // see issue #243
			var indx, widget,
				c = table.config,
				curWidgets = c.widgets,
				widgets = ts.widgets,
				len = widgets.length,
				list = [],
				callback = function( table ) {
					$( table ).triggerHandler( 'refreshComplete' );
				};
			// remove widgets not defined in config.widgets, unless doAll is true
			for ( indx = 0; indx < len; indx++ ) {
				widget = widgets[ indx ];
				if ( widget && widget.id && ( doAll || $.inArray( widget.id, curWidgets ) < 0 ) ) {
					list[ list.length ] = widget.id;
				}
			}
			ts.removeWidget( table, list.join( ',' ), true );
			if ( dontapply !== true ) {
				// call widget init if
				ts.applyWidget( table, doAll || false, callback );
				if ( doAll ) {
					// apply widget format
					ts.applyWidget( table, false, callback );
				}
			} else {
				callback( table );
			}
		},

		/*
		██  ██ ██████ ██ ██     ██ ██████ ██ ██████ ▄█████
		██  ██   ██   ██ ██     ██   ██   ██ ██▄▄   ▀█▄
		██  ██   ██   ██ ██     ██   ██   ██ ██▀▀      ▀█▄
		▀████▀   ██   ██ ██████ ██   ██   ██ ██████ █████▀
		*/
		benchmark : function( diff ) {
			return ( ' (' + ( new Date().getTime() - diff.getTime() ) + ' ms)' );
		},
		// deprecated ts.log
		log : function() {
			console.log( arguments );
		},

		// $.isEmptyObject from jQuery v1.4
		isEmptyObject : function( obj ) {
			/*jshint forin: false */
			for ( var name in obj ) {
				return false;
			}
			return true;
		},

		isValueInArray : function( column, arry ) {
			var indx,
				len = arry && arry.length || 0;
			for ( indx = 0; indx < len; indx++ ) {
				if ( arry[ indx ][ 0 ] === column ) {
					return indx;
				}
			}
			return -1;
		},

		formatFloat : function( str, table ) {
			if ( typeof str !== 'string' || str === '' ) { return str; }
			// allow using formatFloat without a table; defaults to US number format
			var num,
				usFormat = table && table.config ? table.config.usNumberFormat !== false :
					typeof table !== 'undefined' ? table : true;
			if ( usFormat ) {
				// US Format - 1,234,567.89 -> 1234567.89
				str = str.replace( ts.regex.comma, '' );
			} else {
				// German Format = 1.234.567,89 -> 1234567.89
				// French Format = 1 234 567,89 -> 1234567.89
				str = str.replace( ts.regex.digitNonUS, '' ).replace( ts.regex.comma, '.' );
			}
			if ( ts.regex.digitNegativeTest.test( str ) ) {
				// make (#) into a negative number -> (10) = -10
				str = str.replace( ts.regex.digitNegativeReplace, '-$1' );
			}
			num = parseFloat( str );
			// return the text instead of zero
			return isNaN( num ) ? $.trim( str ) : num;
		},

		isDigit : function( str ) {
			// replace all unwanted chars and match
			return isNaN( str ) ?
				ts.regex.digitTest.test( str.toString().replace( ts.regex.digitReplace, '' ) ) :
				str !== '';
		},

		// computeTableHeaderCellIndexes from:
		// http://www.javascripttoolbox.com/lib/table/examples.php
		// http://www.javascripttoolbox.com/temp/table_cellindex.html
		computeColumnIndex : function( $rows, c ) {
			var i, j, k, l, cell, cells, rowIndex, rowSpan, colSpan, firstAvailCol,
				// total columns has been calculated, use it to set the matrixrow
				columns = c && c.columns || 0,
				matrix = [],
				matrixrow = new Array( columns );
			for ( i = 0; i < $rows.length; i++ ) {
				cells = $rows[ i ].cells;
				for ( j = 0; j < cells.length; j++ ) {
					cell = cells[ j ];
					rowIndex = i;
					rowSpan = cell.rowSpan || 1;
					colSpan = cell.colSpan || 1;
					if ( typeof matrix[ rowIndex ] === 'undefined' ) {
						matrix[ rowIndex ] = [];
					}
					// Find first available column in the first row
					for ( k = 0; k < matrix[ rowIndex ].length + 1; k++ ) {
						if ( typeof matrix[ rowIndex ][ k ] === 'undefined' ) {
							firstAvailCol = k;
							break;
						}
					}
					// jscs:disable disallowEmptyBlocks
					if ( columns && cell.cellIndex === firstAvailCol ) {
						// don't to anything
					} else if ( cell.setAttribute ) {
						// jscs:enable disallowEmptyBlocks
						// add data-column (setAttribute = IE8+)
						cell.setAttribute( 'data-column', firstAvailCol );
					} else {
						// remove once we drop support for IE7 - 1/12/2016
						$( cell ).attr( 'data-column', firstAvailCol );
					}
					for ( k = rowIndex; k < rowIndex + rowSpan; k++ ) {
						if ( typeof matrix[ k ] === 'undefined' ) {
							matrix[ k ] = [];
						}
						matrixrow = matrix[ k ];
						for ( l = firstAvailCol; l < firstAvailCol + colSpan; l++ ) {
							matrixrow[ l ] = 'x';
						}
					}
				}
			}
			ts.checkColumnCount($rows, matrix, matrixrow.length);
			return matrixrow.length;
		},

		checkColumnCount : function($rows, matrix, columns) {
			// this DOES NOT report any tbody column issues, except for the math and
			// and column selector widgets
			var i, len,
				valid = true,
				cells = [];
			for ( i = 0; i < matrix.length; i++ ) {
				// some matrix entries are undefined when testing the footer because
				// it is using the rowIndex property
				if ( matrix[i] ) {
					len = matrix[i].length;
					if ( matrix[i].length !== columns ) {
						valid = false;
						break;
					}
				}
			}
			if ( !valid ) {
				$rows.each( function( indx, el ) {
					var cell = el.parentElement.nodeName;
					if ( cells.indexOf( cell ) < 0 ) {
						cells.push( cell );
					}
				});
				console.error(
					'Invalid or incorrect number of columns in the ' +
					cells.join( ' or ' ) + '; expected ' + columns +
					', but found ' + len + ' columns'
				);
			}
		},

		// automatically add a colgroup with col elements set to a percentage width
		fixColumnWidth : function( table ) {
			table = $( table )[ 0 ];
			var overallWidth, percent, $tbodies, len, index,
				c = table.config,
				$colgroup = c.$table.children( 'colgroup' );
			// remove plugin-added colgroup, in case we need to refresh the widths
			if ( $colgroup.length && $colgroup.hasClass( ts.css.colgroup ) ) {
				$colgroup.remove();
			}
			if ( c.widthFixed && c.$table.children( 'colgroup' ).length === 0 ) {
				$colgroup = $( '<colgroup class="' + ts.css.colgroup + '">' );
				overallWidth = c.$table.width();
				// only add col for visible columns - fixes #371
				$tbodies = c.$tbodies.find( 'tr:first' ).children( ':visible' );
				len = $tbodies.length;
				for ( index = 0; index < len; index++ ) {
					percent = parseInt( ( $tbodies.eq( index ).width() / overallWidth ) * 1000, 10 ) / 10 + '%';
					$colgroup.append( $( '<col>' ).css( 'width', percent ) );
				}
				c.$table.prepend( $colgroup );
			}
		},

		// get sorter, string, empty, etc options for each column from
		// jQuery data, metadata, header option or header class name ('sorter-false')
		// priority = jQuery data > meta > headers option > header class name
		getData : function( header, configHeader, key ) {
			var meta, cl4ss,
				val = '',
				$header = $( header );
			if ( !$header.length ) { return ''; }
			meta = $.metadata ? $header.metadata() : false;
			cl4ss = ' ' + ( $header.attr( 'class' ) || '' );
			if ( typeof $header.data( key ) !== 'undefined' ||
				typeof $header.data( key.toLowerCase() ) !== 'undefined' ) {
				// 'data-lockedOrder' is assigned to 'lockedorder'; but 'data-locked-order' is assigned to 'lockedOrder'
				// 'data-sort-initial-order' is assigned to 'sortInitialOrder'
				val += $header.data( key ) || $header.data( key.toLowerCase() );
			} else if ( meta && typeof meta[ key ] !== 'undefined' ) {
				val += meta[ key ];
			} else if ( configHeader && typeof configHeader[ key ] !== 'undefined' ) {
				val += configHeader[ key ];
			} else if ( cl4ss !== ' ' && cl4ss.match( ' ' + key + '-' ) ) {
				// include sorter class name 'sorter-text', etc; now works with 'sorter-my-custom-parser'
				val = cl4ss.match( new RegExp( '\\s' + key + '-([\\w-]+)' ) )[ 1 ] || '';
			}
			return $.trim( val );
		},

		getColumnData : function( table, obj, indx, getCell, $headers ) {
			if ( typeof obj !== 'object' || obj === null ) {
				return obj;
			}
			table = $( table )[ 0 ];
			var $header, key,
				c = table.config,
				$cells = ( $headers || c.$headers ),
				// c.$headerIndexed is not defined initially
				$cell = c.$headerIndexed && c.$headerIndexed[ indx ] ||
					$cells.find( '[data-column="' + indx + '"]:last' );
			if ( typeof obj[ indx ] !== 'undefined' ) {
				return getCell ? obj[ indx ] : obj[ $cells.index( $cell ) ];
			}
			for ( key in obj ) {
				if ( typeof key === 'string' ) {
					$header = $cell
						// header cell with class/id
						.filter( key )
						// find elements within the header cell with cell/id
						.add( $cell.find( key ) );
					if ( $header.length ) {
						return obj[ key ];
					}
				}
			}
			return;
		},

		// *** Process table ***
		// add processing indicator
		isProcessing : function( $table, toggle, $headers ) {
			$table = $( $table );
			var c = $table[ 0 ].config,
				// default to all headers
				$header = $headers || $table.find( '.' + ts.css.header );
			if ( toggle ) {
				// don't use sortList if custom $headers used
				if ( typeof $headers !== 'undefined' && c.sortList.length > 0 ) {
					// get headers from the sortList
					$header = $header.filter( function() {
						// get data-column from attr to keep compatibility with jQuery 1.2.6
						return this.sortDisabled ?
							false :
							ts.isValueInArray( parseFloat( $( this ).attr( 'data-column' ) ), c.sortList ) >= 0;
					});
				}
				$table.add( $header ).addClass( ts.css.processing + ' ' + c.cssProcessing );
			} else {
				$table.add( $header ).removeClass( ts.css.processing + ' ' + c.cssProcessing );
			}
		},

		// detach tbody but save the position
		// don't use tbody because there are portions that look for a tbody index (updateCell)
		processTbody : function( table, $tb, getIt ) {
			table = $( table )[ 0 ];
			if ( getIt ) {
				table.isProcessing = true;
				$tb.before( '<colgroup class="tablesorter-savemyplace"/>' );
				return $.fn.detach ? $tb.detach() : $tb.remove();
			}
			var holdr = $( table ).find( 'colgroup.tablesorter-savemyplace' );
			$tb.insertAfter( holdr );
			holdr.remove();
			table.isProcessing = false;
		},

		clearTableBody : function( table ) {
			$( table )[ 0 ].config.$tbodies.children().detach();
		},

		// used when replacing accented characters during sorting
		characterEquivalents : {
			'a' : '\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5', // áàâãäąå
			'A' : '\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5', // ÁÀÂÃÄĄÅ
			'c' : '\u00e7\u0107\u010d', // çćč
			'C' : '\u00c7\u0106\u010c', // ÇĆČ
			'e' : '\u00e9\u00e8\u00ea\u00eb\u011b\u0119', // éèêëěę
			'E' : '\u00c9\u00c8\u00ca\u00cb\u011a\u0118', // ÉÈÊËĚĘ
			'i' : '\u00ed\u00ec\u0130\u00ee\u00ef\u0131', // íìİîïı
			'I' : '\u00cd\u00cc\u0130\u00ce\u00cf', // ÍÌİÎÏ
			'o' : '\u00f3\u00f2\u00f4\u00f5\u00f6\u014d', // óòôõöō
			'O' : '\u00d3\u00d2\u00d4\u00d5\u00d6\u014c', // ÓÒÔÕÖŌ
			'ss': '\u00df', // ß (s sharp)
			'SS': '\u1e9e', // ẞ (Capital sharp s)
			'u' : '\u00fa\u00f9\u00fb\u00fc\u016f', // úùûüů
			'U' : '\u00da\u00d9\u00db\u00dc\u016e' // ÚÙÛÜŮ
		},

		replaceAccents : function( str ) {
			var chr,
				acc = '[',
				eq = ts.characterEquivalents;
			if ( !ts.characterRegex ) {
				ts.characterRegexArray = {};
				for ( chr in eq ) {
					if ( typeof chr === 'string' ) {
						acc += eq[ chr ];
						ts.characterRegexArray[ chr ] = new RegExp( '[' + eq[ chr ] + ']', 'g' );
					}
				}
				ts.characterRegex = new RegExp( acc + ']' );
			}
			if ( ts.characterRegex.test( str ) ) {
				for ( chr in eq ) {
					if ( typeof chr === 'string' ) {
						str = str.replace( ts.characterRegexArray[ chr ], chr );
					}
				}
			}
			return str;
		},

		validateOptions : function( c ) {
			var setting, setting2, typ, timer,
				// ignore options containing an array
				ignore = 'headers sortForce sortList sortAppend widgets'.split( ' ' ),
				orig = c.originalSettings;
			if ( orig ) {
				if ( c.debug ) {
					timer = new Date();
				}
				for ( setting in orig ) {
					typ = typeof ts.defaults[setting];
					if ( typ === 'undefined' ) {
						console.warn( 'Tablesorter Warning! "table.config.' + setting + '" option not recognized' );
					} else if ( typ === 'object' ) {
						for ( setting2 in orig[setting] ) {
							typ = ts.defaults[setting] && typeof ts.defaults[setting][setting2];
							if ( $.inArray( setting, ignore ) < 0 && typ === 'undefined' ) {
								console.warn( 'Tablesorter Warning! "table.config.' + setting + '.' + setting2 + '" option not recognized' );
							}
						}
					}
				}
				if ( c.debug ) {
					console.log( 'validate options time:' + ts.benchmark( timer ) );
				}
			}
		},

		// restore headers
		restoreHeaders : function( table ) {
			var index, $cell,
				c = $( table )[ 0 ].config,
				$headers = c.$table.find( c.selectorHeaders ),
				len = $headers.length;
			// don't use c.$headers here in case header cells were swapped
			for ( index = 0; index < len; index++ ) {
				$cell = $headers.eq( index );
				// only restore header cells if it is wrapped
				// because this is also used by the updateAll method
				if ( $cell.find( '.' + ts.css.headerIn ).length ) {
					$cell.html( c.headerContent[ index ] );
				}
			}
		},

		destroy : function( table, removeClasses, callback ) {
			table = $( table )[ 0 ];
			if ( !table.hasInitialized ) { return; }
			// remove all widgets
			ts.removeWidget( table, true, false );
			var events,
				$t = $( table ),
				c = table.config,
				debug = c.debug,
				$h = $t.find( 'thead:first' ),
				$r = $h.find( 'tr.' + ts.css.headerRow ).removeClass( ts.css.headerRow + ' ' + c.cssHeaderRow ),
				$f = $t.find( 'tfoot:first > tr' ).children( 'th, td' );
			if ( removeClasses === false && $.inArray( 'uitheme', c.widgets ) >= 0 ) {
				// reapply uitheme classes, in case we want to maintain appearance
				$t.triggerHandler( 'applyWidgetId', [ 'uitheme' ] );
				$t.triggerHandler( 'applyWidgetId', [ 'zebra' ] );
			}
			// remove widget added rows, just in case
			$h.find( 'tr' ).not( $r ).remove();
			// disable tablesorter - not using .unbind( namespace ) because namespacing was
			// added in jQuery v1.4.3 - see http://api.jquery.com/event.namespace/
			events = 'sortReset update updateRows updateAll updateHeaders updateCell addRows updateComplete sorton ' +
				'appendCache updateCache applyWidgetId applyWidgets refreshWidgets removeWidget destroy mouseup mouseleave ' +
				'keypress sortBegin sortEnd resetToLoadState '.split( ' ' )
				.join( c.namespace + ' ' );
			$t
				.removeData( 'tablesorter' )
				.unbind( events.replace( ts.regex.spaces, ' ' ) );
			c.$headers
				.add( $f )
				.removeClass( [ ts.css.header, c.cssHeader, c.cssAsc, c.cssDesc, ts.css.sortAsc, ts.css.sortDesc, ts.css.sortNone ].join( ' ' ) )
				.removeAttr( 'data-column' )
				.removeAttr( 'aria-label' )
				.attr( 'aria-disabled', 'true' );
			$r
				.find( c.selectorSort )
				.unbind( ( 'mousedown mouseup keypress '.split( ' ' ).join( c.namespace + ' ' ) ).replace( ts.regex.spaces, ' ' ) );
			ts.restoreHeaders( table );
			$t.toggleClass( ts.css.table + ' ' + c.tableClass + ' tablesorter-' + c.theme, removeClasses === false );
			$t.removeClass(c.namespace.slice(1));
			// clear flag in case the plugin is initialized again
			table.hasInitialized = false;
			delete table.config.cache;
			if ( typeof callback === 'function' ) {
				callback( table );
			}
			if ( debug ) {
				console.log( 'tablesorter has been removed' );
			}
		}

	};

	$.fn.tablesorter = function( settings ) {
		return this.each( function() {
			var table = this,
			// merge & extend config options
			c = $.extend( true, {}, ts.defaults, settings, ts.instanceMethods );
			// save initial settings
			c.originalSettings = settings;
			// create a table from data (build table widget)
			if ( !table.hasInitialized && ts.buildTable && this.nodeName !== 'TABLE' ) {
				// return the table (in case the original target is the table's container)
				ts.buildTable( table, c );
			} else {
				ts.setup( table, c );
			}
		});
	};

	// set up debug logs
	if ( !( window.console && window.console.log ) ) {
		// access $.tablesorter.logs for browsers that don't have a console...
		ts.logs = [];
		/*jshint -W020 */
		console = {};
		console.log = console.warn = console.error = console.table = function() {
			var arg = arguments.length > 1 ? arguments : arguments[0];
			ts.logs[ ts.logs.length ] = { date: Date.now(), log: arg };
		};
	}

	// add default parsers
	ts.addParser({
		id : 'no-parser',
		is : function() {
			return false;
		},
		format : function() {
			return '';
		},
		type : 'text'
	});

	ts.addParser({
		id : 'text',
		is : function() {
			return true;
		},
		format : function( str, table ) {
			var c = table.config;
			if ( str ) {
				str = $.trim( c.ignoreCase ? str.toLocaleLowerCase() : str );
				str = c.sortLocaleCompare ? ts.replaceAccents( str ) : str;
			}
			return str;
		},
		type : 'text'
	});

	ts.regex.nondigit = /[^\w,. \-()]/g;
	ts.addParser({
		id : 'digit',
		is : function( str ) {
			return ts.isDigit( str );
		},
		format : function( str, table ) {
			var num = ts.formatFloat( ( str || '' ).replace( ts.regex.nondigit, '' ), table );
			return str && typeof num === 'number' ? num :
				str ? $.trim( str && table.config.ignoreCase ? str.toLocaleLowerCase() : str ) : str;
		},
		type : 'numeric'
	});

	ts.regex.currencyReplace = /[+\-,. ]/g;
	ts.regex.currencyTest = /^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/;
	ts.addParser({
		id : 'currency',
		is : function( str ) {
			str = ( str || '' ).replace( ts.regex.currencyReplace, '' );
			// test for £$€¤¥¢
			return ts.regex.currencyTest.test( str );
		},
		format : function( str, table ) {
			var num = ts.formatFloat( ( str || '' ).replace( ts.regex.nondigit, '' ), table );
			return str && typeof num === 'number' ? num :
				str ? $.trim( str && table.config.ignoreCase ? str.toLocaleLowerCase() : str ) : str;
		},
		type : 'numeric'
	});

	// too many protocols to add them all https://en.wikipedia.org/wiki/URI_scheme
	// now, this regex can be updated before initialization
	ts.regex.urlProtocolTest = /^(https?|ftp|file):\/\//;
	ts.regex.urlProtocolReplace = /(https?|ftp|file):\/\/(www\.)?/;
	ts.addParser({
		id : 'url',
		is : function( str ) {
			return ts.regex.urlProtocolTest.test( str );
		},
		format : function( str ) {
			return str ? $.trim( str.replace( ts.regex.urlProtocolReplace, '' ) ) : str;
		},
		type : 'text'
	});

	ts.regex.dash = /-/g;
	ts.regex.isoDate = /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/;
	ts.addParser({
		id : 'isoDate',
		is : function( str ) {
			return ts.regex.isoDate.test( str );
		},
		format : function( str, table ) {
			var date = str ? new Date( str.replace( ts.regex.dash, '/' ) ) : str;
			return date instanceof Date && isFinite( date ) ? date.getTime() : str;
		},
		type : 'numeric'
	});

	ts.regex.percent = /%/g;
	ts.regex.percentTest = /(\d\s*?%|%\s*?\d)/;
	ts.addParser({
		id : 'percent',
		is : function( str ) {
			return ts.regex.percentTest.test( str ) && str.length < 15;
		},
		format : function( str, table ) {
			return str ? ts.formatFloat( str.replace( ts.regex.percent, '' ), table ) : str;
		},
		type : 'numeric'
	});

	// added image parser to core v2.17.9
	ts.addParser({
		id : 'image',
		is : function( str, table, node, $node ) {
			return $node.find( 'img' ).length > 0;
		},
		format : function( str, table, cell ) {
			return $( cell ).find( 'img' ).attr( table.config.imgAttr || 'alt' ) || str;
		},
		parsed : true, // filter widget flag
		type : 'text'
	});

	ts.regex.dateReplace = /(\S)([AP]M)$/i; // used by usLongDate & time parser
	ts.regex.usLongDateTest1 = /^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i;
	ts.regex.usLongDateTest2 = /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i;
	ts.addParser({
		id : 'usLongDate',
		is : function( str ) {
			// two digit years are not allowed cross-browser
			// Jan 01, 2013 12:34:56 PM or 01 Jan 2013
			return ts.regex.usLongDateTest1.test( str ) || ts.regex.usLongDateTest2.test( str );
		},
		format : function( str, table ) {
			var date = str ? new Date( str.replace( ts.regex.dateReplace, '$1 $2' ) ) : str;
			return date instanceof Date && isFinite( date ) ? date.getTime() : str;
		},
		type : 'numeric'
	});

	// testing for ##-##-#### or ####-##-##, so it's not perfect; time can be included
	ts.regex.shortDateTest = /(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/;
	// escaped "-" because JSHint in Firefox was showing it as an error
	ts.regex.shortDateReplace = /[\-.,]/g;
	// XXY covers MDY & DMY formats
	ts.regex.shortDateXXY = /(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/;
	ts.regex.shortDateYMD = /(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/;
	ts.convertFormat = function( dateString, format ) {
		dateString = ( dateString || '' )
			.replace( ts.regex.spaces, ' ' )
			.replace( ts.regex.shortDateReplace, '/' );
		if ( format === 'mmddyyyy' ) {
			dateString = dateString.replace( ts.regex.shortDateXXY, '$3/$1/$2' );
		} else if ( format === 'ddmmyyyy' ) {
			dateString = dateString.replace( ts.regex.shortDateXXY, '$3/$2/$1' );
		} else if ( format === 'yyyymmdd' ) {
			dateString = dateString.replace( ts.regex.shortDateYMD, '$1/$2/$3' );
		}
		var date = new Date( dateString );
		return date instanceof Date && isFinite( date ) ? date.getTime() : '';
	};

	ts.addParser({
		id : 'shortDate', // 'mmddyyyy', 'ddmmyyyy' or 'yyyymmdd'
		is : function( str ) {
			str = ( str || '' ).replace( ts.regex.spaces, ' ' ).replace( ts.regex.shortDateReplace, '/' );
			return ts.regex.shortDateTest.test( str );
		},
		format : function( str, table, cell, cellIndex ) {
			if ( str ) {
				var c = table.config,
					$header = c.$headerIndexed[ cellIndex ],
					format = $header.length && $header.data( 'dateFormat' ) ||
						ts.getData( $header, ts.getColumnData( table, c.headers, cellIndex ), 'dateFormat' ) ||
						c.dateFormat;
				// save format because getData can be slow...
				if ( $header.length ) {
					$header.data( 'dateFormat', format );
				}
				return ts.convertFormat( str, format ) || str;
			}
			return str;
		},
		type : 'numeric'
	});

	// match 24 hour time & 12 hours time + am/pm - see http://regexr.com/3c3tk
	ts.regex.timeTest = /^(0?[1-9]|1[0-2]):([0-5]\d)(\s[AP]M)$|^((?:[01]\d|[2][0-4]):[0-5]\d)$/i;
	ts.regex.timeMatch = /(0?[1-9]|1[0-2]):([0-5]\d)(\s[AP]M)|((?:[01]\d|[2][0-4]):[0-5]\d)/i;
	ts.addParser({
		id : 'time',
		is : function( str ) {
			return ts.regex.timeTest.test( str );
		},
		format : function( str, table ) {
			// isolate time... ignore month, day and year
			var temp,
				timePart = ( str || '' ).match( ts.regex.timeMatch ),
				orig = new Date( str ),
				// no time component? default to 00:00 by leaving it out, but only if str is defined
				time = str && ( timePart !== null ? timePart[ 0 ] : '00:00 AM' ),
				date = time ? new Date( '2000/01/01 ' + time.replace( ts.regex.dateReplace, '$1 $2' ) ) : time;
			if ( date instanceof Date && isFinite( date ) ) {
				temp = orig instanceof Date && isFinite( orig ) ? orig.getTime() : 0;
				// if original string was a valid date, add it to the decimal so the column sorts in some kind of order
				// luckily new Date() ignores the decimals
				return temp ? parseFloat( date.getTime() + '.' + orig.getTime() ) : date.getTime();
			}
			return str;
		},
		type : 'numeric'
	});

	ts.addParser({
		id : 'metadata',
		is : function() {
			return false;
		},
		format : function( str, table, cell ) {
			var c = table.config,
			p = ( !c.parserMetadataName ) ? 'sortValue' : c.parserMetadataName;
			return $( cell ).metadata()[ p ];
		},
		type : 'numeric'
	});

	/*
		██████ ██████ █████▄ █████▄ ▄████▄
		  ▄█▀  ██▄▄   ██▄▄██ ██▄▄██ ██▄▄██
		▄█▀    ██▀▀   ██▀▀██ ██▀▀█  ██▀▀██
		██████ ██████ █████▀ ██  ██ ██  ██
		*/
	// add default widgets
	ts.addWidget({
		id : 'zebra',
		priority : 90,
		format : function( table, c, wo ) {
			var $visibleRows, $row, count, isEven, tbodyIndex, rowIndex, len,
				child = new RegExp( c.cssChildRow, 'i' ),
				$tbodies = c.$tbodies.add( $( c.namespace + '_extra_table' ).children( 'tbody:not(.' + c.cssInfoBlock + ')' ) );
			for ( tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
				// loop through the visible rows
				count = 0;
				$visibleRows = $tbodies.eq( tbodyIndex ).children( 'tr:visible' ).not( c.selectorRemove );
				len = $visibleRows.length;
				for ( rowIndex = 0; rowIndex < len; rowIndex++ ) {
					$row = $visibleRows.eq( rowIndex );
					// style child rows the same way the parent row was styled
					if ( !child.test( $row[ 0 ].className ) ) { count++; }
					isEven = ( count % 2 === 0 );
					$row
						.removeClass( wo.zebra[ isEven ? 1 : 0 ] )
						.addClass( wo.zebra[ isEven ? 0 : 1 ] );
				}
			}
		},
		remove : function( table, c, wo, refreshing ) {
			if ( refreshing ) { return; }
			var tbodyIndex, $tbody,
				$tbodies = c.$tbodies,
				toRemove = ( wo.zebra || [ 'even', 'odd' ] ).join( ' ' );
			for ( tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ){
				$tbody = ts.processTbody( table, $tbodies.eq( tbodyIndex ), true ); // remove tbody
				$tbody.children().removeClass( toRemove );
				ts.processTbody( table, $tbody, false ); // restore tbody
			}
		}
	});

})( jQuery );

/*! Widget: storage - updated 4/18/2017 (v2.28.8) */
/*global JSON:false */
;(function ($, window, document) {
	'use strict';

	var ts = $.tablesorter || {};

	// update defaults for validator; these values must be falsy!
	$.extend(true, ts.defaults, {
		fixedUrl: '',
		widgetOptions: {
			storage_fixedUrl: '',
			storage_group: '',
			storage_page: '',
			storage_storageType: '',
			storage_tableId: '',
			storage_useSessionStorage: ''
		}
	});

	// *** Store data in local storage, with a cookie fallback ***
	/* IE7 needs JSON library for JSON.stringify - (http://caniuse.com/#search=json)
	   if you need it, then include https://github.com/douglascrockford/JSON-js

	   $.parseJSON is not available is jQuery versions older than 1.4.1, using older
	   versions will only allow storing information for one page at a time

	   // *** Save data (JSON format only) ***
	   // val must be valid JSON... use http://jsonlint.com/ to ensure it is valid
	   var val = { "mywidget" : "data1" }; // valid JSON uses double quotes
	   // $.tablesorter.storage(table, key, val);
	   $.tablesorter.storage(table, 'tablesorter-mywidget', val);

	   // *** Get data: $.tablesorter.storage(table, key); ***
	   v = $.tablesorter.storage(table, 'tablesorter-mywidget');
	   // val may be empty, so also check for your data
	   val = (v && v.hasOwnProperty('mywidget')) ? v.mywidget : '';
	   alert(val); // 'data1' if saved, or '' if not
	*/
	ts.storage = function(table, key, value, options) {
		table = $(table)[0];
		var cookieIndex, cookies, date,
			hasStorage = false,
			values = {},
			c = table.config,
			wo = c && c.widgetOptions,
			storageType = (
				( options && options.storageType ) || ( wo && wo.storage_storageType )
			).toString().charAt(0).toLowerCase(),
			// deprecating "useSessionStorage"; any storageType setting overrides it
			session = storageType ? '' :
				( options && options.useSessionStorage ) || ( wo && wo.storage_useSessionStorage ),
			$table = $(table),
			// id from (1) options ID, (2) table 'data-table-group' attribute, (3) widgetOptions.storage_tableId,
			// (4) table ID, then (5) table index
			id = options && options.id ||
				$table.attr( options && options.group || wo && wo.storage_group || 'data-table-group') ||
				wo && wo.storage_tableId || table.id || $('.tablesorter').index( $table ),
			// url from (1) options url, (2) table 'data-table-page' attribute, (3) widgetOptions.storage_fixedUrl,
			// (4) table.config.fixedUrl (deprecated), then (5) window location path
			url = options && options.url ||
				$table.attr(options && options.page || wo && wo.storage_page || 'data-table-page') ||
				wo && wo.storage_fixedUrl || c && c.fixedUrl || window.location.pathname;

		// skip if using cookies
		if (storageType !== 'c') {
			storageType = (storageType === 's' || session) ? 'sessionStorage' : 'localStorage';
			// https://gist.github.com/paulirish/5558557
			if (storageType in window) {
				try {
					window[storageType].setItem('_tmptest', 'temp');
					hasStorage = true;
					window[storageType].removeItem('_tmptest');
				} catch (error) {
					if (c && c.debug) {
						console.warn( storageType + ' is not supported in this browser' );
					}
				}
			}
		}
		if (c.debug) {
			console.log('Storage widget using', hasStorage ? storageType : 'cookies');
		}
		// *** get value ***
		if ($.parseJSON) {
			if (hasStorage) {
				values = $.parseJSON( window[storageType][key] || 'null' ) || {};
			} else {
				// old browser, using cookies
				cookies = document.cookie.split(/[;\s|=]/);
				// add one to get from the key to the value
				cookieIndex = $.inArray(key, cookies) + 1;
				values = (cookieIndex !== 0) ? $.parseJSON(cookies[cookieIndex] || 'null') || {} : {};
			}
		}
		// allow value to be an empty string too
		if (typeof value !== 'undefined' && window.JSON && JSON.hasOwnProperty('stringify')) {
			// add unique identifiers = url pathname > table ID/index on page > data
			if (!values[url]) {
				values[url] = {};
			}
			values[url][id] = value;
			// *** set value ***
			if (hasStorage) {
				window[storageType][key] = JSON.stringify(values);
			} else {
				date = new Date();
				date.setTime(date.getTime() + (31536e+6)); // 365 days
				document.cookie = key + '=' + (JSON.stringify(values)).replace(/\"/g, '\"') + '; expires=' + date.toGMTString() + '; path=/';
			}
		} else {
			return values && values[url] ? values[url][id] : '';
		}
	};

})(jQuery, window, document);

/*! Widget: uitheme - updated 9/27/2017 (v2.29.0) */
;(function ($) {
	'use strict';
	var ts = $.tablesorter || {};

	ts.themes = {
		'bootstrap' : {
			table        : 'table table-bordered table-striped',
			caption      : 'caption',
			// header class names
			header       : 'bootstrap-header', // give the header a gradient background (theme.bootstrap_2.css)
			sortNone     : '',
			sortAsc      : '',
			sortDesc     : '',
			active       : '', // applied when column is sorted
			hover        : '', // custom css required - a defined bootstrap style may not override other classes
			// icon class names
			icons        : '', // add 'bootstrap-icon-white' to make them white; this icon class is added to the <i> in the header
			iconSortNone : 'bootstrap-icon-unsorted', // class name added to icon when column is not sorted
			iconSortAsc  : 'glyphicon glyphicon-chevron-up', // class name added to icon when column has ascending sort
			iconSortDesc : 'glyphicon glyphicon-chevron-down', // class name added to icon when column has descending sort
			filterRow    : '', // filter row class
			footerRow    : '',
			footerCells  : '',
			even         : '', // even row zebra striping
			odd          : ''  // odd row zebra striping
		},
		'jui' : {
			table        : 'ui-widget ui-widget-content ui-corner-all', // table classes
			caption      : 'ui-widget-content',
			// header class names
			header       : 'ui-widget-header ui-corner-all ui-state-default', // header classes
			sortNone     : '',
			sortAsc      : '',
			sortDesc     : '',
			active       : 'ui-state-active', // applied when column is sorted
			hover        : 'ui-state-hover',  // hover class
			// icon class names
			icons        : 'ui-icon', // icon class added to the <i> in the header
			iconSortNone : 'ui-icon-carat-2-n-s ui-icon-caret-2-n-s', // class name added to icon when column is not sorted
			iconSortAsc  : 'ui-icon-carat-1-n ui-icon-caret-1-n', // class name added to icon when column has ascending sort
			iconSortDesc : 'ui-icon-carat-1-s ui-icon-caret-1-s', // class name added to icon when column has descending sort
			filterRow    : '',
			footerRow    : '',
			footerCells  : '',
			even         : 'ui-widget-content', // even row zebra striping
			odd          : 'ui-state-default'   // odd row zebra striping
		}
	};

	$.extend(ts.css, {
		wrapper : 'tablesorter-wrapper' // ui theme & resizable
	});

	ts.addWidget({
		id: 'uitheme',
		priority: 10,
		format: function(table, c, wo) {
			var i, tmp, hdr, icon, time, $header, $icon, $tfoot, $h, oldtheme, oldremove, oldIconRmv, hasOldTheme,
				themesAll = ts.themes,
				$table = c.$table.add( $( c.namespace + '_extra_table' ) ),
				$headers = c.$headers.add( $( c.namespace + '_extra_headers' ) ),
				theme = c.theme || 'jui',
				themes = themesAll[theme] || {},
				remove = $.trim( [ themes.sortNone, themes.sortDesc, themes.sortAsc, themes.active ].join( ' ' ) ),
				iconRmv = $.trim( [ themes.iconSortNone, themes.iconSortDesc, themes.iconSortAsc ].join( ' ' ) );
			if (c.debug) { time = new Date(); }
			// initialization code - run once
			if (!$table.hasClass('tablesorter-' + theme) || c.theme !== c.appliedTheme || !wo.uitheme_applied) {
				wo.uitheme_applied = true;
				oldtheme = themesAll[c.appliedTheme] || {};
				hasOldTheme = !$.isEmptyObject(oldtheme);
				oldremove =  hasOldTheme ? [ oldtheme.sortNone, oldtheme.sortDesc, oldtheme.sortAsc, oldtheme.active ].join( ' ' ) : '';
				oldIconRmv = hasOldTheme ? [ oldtheme.iconSortNone, oldtheme.iconSortDesc, oldtheme.iconSortAsc ].join( ' ' ) : '';
				if (hasOldTheme) {
					wo.zebra[0] = $.trim( ' ' + wo.zebra[0].replace(' ' + oldtheme.even, '') );
					wo.zebra[1] = $.trim( ' ' + wo.zebra[1].replace(' ' + oldtheme.odd, '') );
					c.$tbodies.children().removeClass( [ oldtheme.even, oldtheme.odd ].join(' ') );
				}
				// update zebra stripes
				if (themes.even) { wo.zebra[0] += ' ' + themes.even; }
				if (themes.odd) { wo.zebra[1] += ' ' + themes.odd; }
				// add caption style
				$table.children('caption')
					.removeClass(oldtheme.caption || '')
					.addClass(themes.caption);
				// add table/footer class names
				$tfoot = $table
					// remove other selected themes
					.removeClass( (c.appliedTheme ? 'tablesorter-' + (c.appliedTheme || '') : '') + ' ' + (oldtheme.table || '') )
					.addClass('tablesorter-' + theme + ' ' + (themes.table || '')) // add theme widget class name
					.children('tfoot');
				c.appliedTheme = c.theme;

				if ($tfoot.length) {
					$tfoot
						// if oldtheme.footerRow or oldtheme.footerCells are undefined, all class names are removed
						.children('tr').removeClass(oldtheme.footerRow || '').addClass(themes.footerRow)
						.children('th, td').removeClass(oldtheme.footerCells || '').addClass(themes.footerCells);
				}
				// update header classes
				$headers
					.removeClass( (hasOldTheme ? [ oldtheme.header, oldtheme.hover, oldremove ].join(' ') : '') || '' )
					.addClass(themes.header)
					.not('.sorter-false')
					.unbind('mouseenter.tsuitheme mouseleave.tsuitheme')
					.bind('mouseenter.tsuitheme mouseleave.tsuitheme', function(event) {
						// toggleClass with switch added in jQuery 1.3
						$(this)[ event.type === 'mouseenter' ? 'addClass' : 'removeClass' ](themes.hover || '');
					});

				$headers.each(function(){
					var $this = $(this);
					if (!$this.find('.' + ts.css.wrapper).length) {
						// Firefox needs this inner div to position the icon & resizer correctly
						$this.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');
					}
				});
				if (c.cssIcon) {
					// if c.cssIcon is '', then no <i> is added to the header
					$headers
						.find('.' + ts.css.icon)
						.removeClass(hasOldTheme ? [ oldtheme.icons, oldIconRmv ].join(' ') : '')
						.addClass(themes.icons || '');
				}
				// filter widget initializes after uitheme
				if (ts.hasWidget( c.table, 'filter' )) {
					tmp = function() {
						$table.children('thead').children('.' + ts.css.filterRow)
							.removeClass(hasOldTheme ? oldtheme.filterRow || '' : '')
							.addClass(themes.filterRow || '');
					};
					if (wo.filter_initialized) {
						tmp();
					} else {
						$table.one('filterInit', function() {
							tmp();
						});
					}
				}
			}
			for (i = 0; i < c.columns; i++) {
				$header = c.$headers
					.add($(c.namespace + '_extra_headers'))
					.not('.sorter-false')
					.filter('[data-column="' + i + '"]');
				$icon = (ts.css.icon) ? $header.find('.' + ts.css.icon) : $();
				$h = $headers.not('.sorter-false').filter('[data-column="' + i + '"]:last');
				if ($h.length) {
					$header.removeClass(remove);
					$icon.removeClass(iconRmv);
					if ($h[0].sortDisabled) {
						// no sort arrows for disabled columns!
						$icon.removeClass(themes.icons || '');
					} else {
						hdr = themes.sortNone;
						icon = themes.iconSortNone;
						if ($h.hasClass(ts.css.sortAsc)) {
							hdr = [ themes.sortAsc, themes.active ].join(' ');
							icon = themes.iconSortAsc;
						} else if ($h.hasClass(ts.css.sortDesc)) {
							hdr = [ themes.sortDesc, themes.active ].join(' ');
							icon = themes.iconSortDesc;
						}
						$header.addClass(hdr);
						$icon.addClass(icon || '');
					}
				}
			}
			if (c.debug) {
				console.log('Applying ' + theme + ' theme' + ts.benchmark(time));
			}
		},
		remove: function(table, c, wo, refreshing) {
			if (!wo.uitheme_applied) { return; }
			var $table = c.$table,
				theme = c.appliedTheme || 'jui',
				themes = ts.themes[ theme ] || ts.themes.jui,
				$headers = $table.children('thead').children(),
				remove = themes.sortNone + ' ' + themes.sortDesc + ' ' + themes.sortAsc,
				iconRmv = themes.iconSortNone + ' ' + themes.iconSortDesc + ' ' + themes.iconSortAsc;
			$table.removeClass('tablesorter-' + theme + ' ' + themes.table);
			wo.uitheme_applied = false;
			if (refreshing) { return; }
			$table.find(ts.css.header).removeClass(themes.header);
			$headers
				.unbind('mouseenter.tsuitheme mouseleave.tsuitheme') // remove hover
				.removeClass(themes.hover + ' ' + remove + ' ' + themes.active)
				.filter('.' + ts.css.filterRow)
				.removeClass(themes.filterRow);
			$headers.find('.' + ts.css.icon).removeClass(themes.icons + ' ' + iconRmv);
		}
	});

})(jQuery);

/*! Widget: columns - updated 5/24/2017 (v2.28.11) */
;(function ($) {
	'use strict';
	var ts = $.tablesorter || {};

	ts.addWidget({
		id: 'columns',
		priority: 65,
		options : {
			columns : [ 'primary', 'secondary', 'tertiary' ]
		},
		format: function(table, c, wo) {
			var $tbody, tbodyIndex, $rows, rows, $row, $cells, remove, indx,
			$table = c.$table,
			$tbodies = c.$tbodies,
			sortList = c.sortList,
			len = sortList.length,
			// removed c.widgetColumns support
			css = wo && wo.columns || [ 'primary', 'secondary', 'tertiary' ],
			last = css.length - 1;
			remove = css.join(' ');
			// check if there is a sort (on initialization there may not be one)
			for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
				$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // detach tbody
				$rows = $tbody.children('tr');
				// loop through the visible rows
				$rows.each(function() {
					$row = $(this);
					if (this.style.display !== 'none') {
						// remove all columns class names
						$cells = $row.children().removeClass(remove);
						// add appropriate column class names
						if (sortList && sortList[0]) {
							// primary sort column class
							$cells.eq(sortList[0][0]).addClass(css[0]);
							if (len > 1) {
								for (indx = 1; indx < len; indx++) {
									// secondary, tertiary, etc sort column classes
									$cells.eq(sortList[indx][0]).addClass( css[indx] || css[last] );
								}
							}
						}
					}
				});
				ts.processTbody(table, $tbody, false);
			}
			// add classes to thead and tfoot
			rows = wo.columns_thead !== false ? [ 'thead tr' ] : [];
			if (wo.columns_tfoot !== false) {
				rows.push('tfoot tr');
			}
			if (rows.length) {
				$rows = $table.find( rows.join(',') ).children().removeClass(remove);
				if (len) {
					for (indx = 0; indx < len; indx++) {
						// add primary. secondary, tertiary, etc sort column classes
						$rows.filter('[data-column="' + sortList[indx][0] + '"]').addClass(css[indx] || css[last]);
					}
				}
			}
		},
		remove: function(table, c, wo) {
			var tbodyIndex, $tbody,
				$tbodies = c.$tbodies,
				remove = (wo.columns || [ 'primary', 'secondary', 'tertiary' ]).join(' ');
			c.$headers.removeClass(remove);
			c.$table.children('tfoot').children('tr').children('th, td').removeClass(remove);
			for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
				$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // remove tbody
				$tbody.children('tr').each(function() {
					$(this).children().removeClass(remove);
				});
				ts.processTbody(table, $tbody, false); // restore tbody
			}
		}
	});

})(jQuery);

/*! Widget: filter - updated 12/13/2017 (v2.29.1) *//*
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
;( function ( $ ) {
	'use strict';
	var tsf, tsfRegex,
		ts = $.tablesorter || {},
		tscss = ts.css,
		tskeyCodes = ts.keyCodes;

	$.extend( tscss, {
		filterRow      : 'tablesorter-filter-row',
		filter         : 'tablesorter-filter',
		filterDisabled : 'disabled',
		filterRowHide  : 'hideme'
	});

	$.extend( tskeyCodes, {
		backSpace : 8,
		escape : 27,
		space : 32,
		left : 37,
		down : 40
	});

	ts.addWidget({
		id: 'filter',
		priority: 50,
		options : {
			filter_cellFilter    : '',    // css class name added to the filter cell ( string or array )
			filter_childRows     : false, // if true, filter includes child row content in the search
			filter_childByColumn : false, // ( filter_childRows must be true ) if true = search child rows by column; false = search all child row text grouped
			filter_childWithSibs : true,  // if true, include matching child row siblings
			filter_columnAnyMatch: true,  // if true, allows using '#:{query}' in AnyMatch searches ( column:query )
			filter_columnFilters : true,  // if true, a filter will be added to the top of each table column
			filter_cssFilter     : '',    // css class name added to the filter row & each input in the row ( tablesorter-filter is ALWAYS added )
			filter_defaultAttrib : 'data-value', // data attribute in the header cell that contains the default filter value
			filter_defaultFilter : {},    // add a default column filter type '~{query}' to make fuzzy searches default; '{q1} AND {q2}' to make all searches use a logical AND.
			filter_excludeFilter : {},    // filters to exclude, per column
			filter_external      : '',    // jQuery selector string ( or jQuery object ) of external filters
			filter_filteredRow   : 'filtered', // class added to filtered rows; define in css with "display:none" to hide the filtered-out rows
			filter_formatter     : null,  // add custom filter elements to the filter row
			filter_functions     : null,  // add custom filter functions using this option
			filter_hideEmpty     : true,  // hide filter row when table is empty
			filter_hideFilters   : false, // collapse filter row when mouse leaves the area
			filter_ignoreCase    : true,  // if true, make all searches case-insensitive
			filter_liveSearch    : true,  // if true, search column content while the user types ( with a delay )
			filter_matchType     : { 'input': 'exact', 'select': 'exact' }, // global query settings ('exact' or 'match'); overridden by "filter-match" or "filter-exact" class
			filter_onlyAvail     : 'filter-onlyAvail', // a header with a select dropdown & this class name will only show available ( visible ) options within the drop down
			filter_placeholder   : { search : '', select : '' }, // default placeholder text ( overridden by any header 'data-placeholder' setting )
			filter_reset         : null,  // jQuery selector string of an element used to reset the filters
			filter_resetOnEsc    : true,  // Reset filter input when the user presses escape - normalized across browsers
			filter_saveFilters   : false, // Use the $.tablesorter.storage utility to save the most recent filters
			filter_searchDelay   : 300,   // typing delay in milliseconds before starting a search
			filter_searchFiltered: true,  // allow searching through already filtered rows in special circumstances; will speed up searching in large tables if true
			filter_selectSource  : null,  // include a function to return an array of values to be added to the column filter select
			filter_selectSourceSeparator : '|', // filter_selectSource array text left of the separator is added to the option value, right into the option text
			filter_serversideFiltering : false, // if true, must perform server-side filtering b/c client-side filtering is disabled, but the ui and events will still be used.
			filter_startsWith    : false, // if true, filter start from the beginning of the cell contents
			filter_useParsedData : false  // filter all data using parsed content
		},
		format: function( table, c, wo ) {
			if ( !c.$table.hasClass( 'hasFilters' ) ) {
				tsf.init( table, c, wo );
			}
		},
		remove: function( table, c, wo, refreshing ) {
			var tbodyIndex, $tbody,
				$table = c.$table,
				$tbodies = c.$tbodies,
				events = (
					'addRows updateCell update updateRows updateComplete appendCache filterReset ' +
					'filterAndSortReset filterFomatterUpdate filterEnd search stickyHeadersInit '
				).split( ' ' ).join( c.namespace + 'filter ' );
			$table
				.removeClass( 'hasFilters' )
				// add filter namespace to all BUT search
				.unbind( events.replace( ts.regex.spaces, ' ' ) )
				// remove the filter row even if refreshing, because the column might have been moved
				.find( '.' + tscss.filterRow ).remove();
			wo.filter_initialized = false;
			if ( refreshing ) { return; }
			for ( tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
				$tbody = ts.processTbody( table, $tbodies.eq( tbodyIndex ), true ); // remove tbody
				$tbody.children().removeClass( wo.filter_filteredRow ).show();
				ts.processTbody( table, $tbody, false ); // restore tbody
			}
			if ( wo.filter_reset ) {
				$( document ).undelegate( wo.filter_reset, 'click' + c.namespace + 'filter' );
			}
		}
	});

	tsf = ts.filter = {

		// regex used in filter 'check' functions - not for general use and not documented
		regex: {
			regex     : /^\/((?:\\\/|[^\/])+)\/([migyu]{0,5})?$/, // regex to test for regex
			child     : /tablesorter-childRow/, // child row class name; this gets updated in the script
			filtered  : /filtered/, // filtered (hidden) row class name; updated in the script
			type      : /undefined|number/, // check type
			exact     : /(^[\"\'=]+)|([\"\'=]+$)/g, // exact match (allow '==')
			operators : /[<>=]/g, // replace operators
			query     : '(q|query)', // replace filter queries
			wild01    : /\?/g, // wild card match 0 or 1
			wild0More : /\*/g, // wild care match 0 or more
			quote     : /\"/g,
			isNeg1    : /(>=?\s*-\d)/,
			isNeg2    : /(<=?\s*\d)/
		},
		// function( c, data ) { }
		// c = table.config
		// data.$row = jQuery object of the row currently being processed
		// data.$cells = jQuery object of all cells within the current row
		// data.filters = array of filters for all columns ( some may be undefined )
		// data.filter = filter for the current column
		// data.iFilter = same as data.filter, except lowercase ( if wo.filter_ignoreCase is true )
		// data.exact = table cell text ( or parsed data if column parser enabled; may be a number & not a string )
		// data.iExact = same as data.exact, except lowercase ( if wo.filter_ignoreCase is true; may be a number & not a string )
		// data.cache = table cell text from cache, so it has been parsed ( & in all lower case if c.ignoreCase is true )
		// data.cacheArray = An array of parsed content from each table cell in the row being processed
		// data.index = column index; table = table element ( DOM )
		// data.parsed = array ( by column ) of boolean values ( from filter_useParsedData or 'filter-parsed' class )
		types: {
			or : function( c, data, vars ) {
				// look for "|", but not if it is inside of a regular expression
				if ( ( tsfRegex.orTest.test( data.iFilter ) || tsfRegex.orSplit.test( data.filter ) ) &&
					// this test for regex has potential to slow down the overall search
					!tsfRegex.regex.test( data.filter ) ) {
					var indx, filterMatched, query, regex,
						// duplicate data but split filter
						data2 = $.extend( {}, data ),
						filter = data.filter.split( tsfRegex.orSplit ),
						iFilter = data.iFilter.split( tsfRegex.orSplit ),
						len = filter.length;
					for ( indx = 0; indx < len; indx++ ) {
						data2.nestedFilters = true;
						data2.filter = '' + ( tsf.parseFilter( c, filter[ indx ], data ) || '' );
						data2.iFilter = '' + ( tsf.parseFilter( c, iFilter[ indx ], data ) || '' );
						query = '(' + ( tsf.parseFilter( c, data2.filter, data ) || '' ) + ')';
						try {
							// use try/catch, because query may not be a valid regex if "|" is contained within a partial regex search,
							// e.g "/(Alex|Aar" -> Uncaught SyntaxError: Invalid regular expression: /(/(Alex)/: Unterminated group
							regex = new RegExp( data.isMatch ? query : '^' + query + '$', c.widgetOptions.filter_ignoreCase ? 'i' : '' );
							// filterMatched = data2.filter === '' && indx > 0 ? true
							// look for an exact match with the 'or' unless the 'filter-match' class is found
							filterMatched = regex.test( data2.exact ) || tsf.processTypes( c, data2, vars );
							if ( filterMatched ) {
								return filterMatched;
							}
						} catch ( error ) {
							return null;
						}
					}
					// may be null from processing types
					return filterMatched || false;
				}
				return null;
			},
			// Look for an AND or && operator ( logical and )
			and : function( c, data, vars ) {
				if ( tsfRegex.andTest.test( data.filter ) ) {
					var indx, filterMatched, result, query, regex,
						// duplicate data but split filter
						data2 = $.extend( {}, data ),
						filter = data.filter.split( tsfRegex.andSplit ),
						iFilter = data.iFilter.split( tsfRegex.andSplit ),
						len = filter.length;
					for ( indx = 0; indx < len; indx++ ) {
						data2.nestedFilters = true;
						data2.filter = '' + ( tsf.parseFilter( c, filter[ indx ], data ) || '' );
						data2.iFilter = '' + ( tsf.parseFilter( c, iFilter[ indx ], data ) || '' );
						query = ( '(' + ( tsf.parseFilter( c, data2.filter, data ) || '' ) + ')' )
							// replace wild cards since /(a*)/i will match anything
							.replace( tsfRegex.wild01, '\\S{1}' ).replace( tsfRegex.wild0More, '\\S*' );
						try {
							// use try/catch just in case RegExp is invalid
							regex = new RegExp( data.isMatch ? query : '^' + query + '$', c.widgetOptions.filter_ignoreCase ? 'i' : '' );
							// look for an exact match with the 'and' unless the 'filter-match' class is found
							result = ( regex.test( data2.exact ) || tsf.processTypes( c, data2, vars ) );
							if ( indx === 0 ) {
								filterMatched = result;
							} else {
								filterMatched = filterMatched && result;
							}
						} catch ( error ) {
							return null;
						}
					}
					// may be null from processing types
					return filterMatched || false;
				}
				return null;
			},
			// Look for regex
			regex: function( c, data ) {
				if ( tsfRegex.regex.test( data.filter ) ) {
					var matches,
						// cache regex per column for optimal speed
						regex = data.filter_regexCache[ data.index ] || tsfRegex.regex.exec( data.filter ),
						isRegex = regex instanceof RegExp;
					try {
						if ( !isRegex ) {
							// force case insensitive search if ignoreCase option set?
							// if ( c.ignoreCase && !regex[2] ) { regex[2] = 'i'; }
							data.filter_regexCache[ data.index ] = regex = new RegExp( regex[1], regex[2] );
						}
						matches = regex.test( data.exact );
					} catch ( error ) {
						matches = false;
					}
					return matches;
				}
				return null;
			},
			// Look for operators >, >=, < or <=
			operators: function( c, data ) {
				// ignore empty strings... because '' < 10 is true
				if ( tsfRegex.operTest.test( data.iFilter ) && data.iExact !== '' ) {
					var cachedValue, result, txt,
						table = c.table,
						parsed = data.parsed[ data.index ],
						query = ts.formatFloat( data.iFilter.replace( tsfRegex.operators, '' ), table ),
						parser = c.parsers[ data.index ] || {},
						savedSearch = query;
					// parse filter value in case we're comparing numbers ( dates )
					if ( parsed || parser.type === 'numeric' ) {
						txt = $.trim( '' + data.iFilter.replace( tsfRegex.operators, '' ) );
						result = tsf.parseFilter( c, txt, data, true );
						query = ( typeof result === 'number' && result !== '' && !isNaN( result ) ) ? result : query;
					}
					// iExact may be numeric - see issue #149;
					// check if cached is defined, because sometimes j goes out of range? ( numeric columns )
					if ( ( parsed || parser.type === 'numeric' ) && !isNaN( query ) &&
						typeof data.cache !== 'undefined' ) {
						cachedValue = data.cache;
					} else {
						txt = isNaN( data.iExact ) ? data.iExact.replace( ts.regex.nondigit, '' ) : data.iExact;
						cachedValue = ts.formatFloat( txt, table );
					}
					if ( tsfRegex.gtTest.test( data.iFilter ) ) {
						result = tsfRegex.gteTest.test( data.iFilter ) ? cachedValue >= query : cachedValue > query;
					} else if ( tsfRegex.ltTest.test( data.iFilter ) ) {
						result = tsfRegex.lteTest.test( data.iFilter ) ? cachedValue <= query : cachedValue < query;
					}
					// keep showing all rows if nothing follows the operator
					if ( !result && savedSearch === '' ) {
						result = true;
					}
					return result;
				}
				return null;
			},
			// Look for a not match
			notMatch: function( c, data ) {
				if ( tsfRegex.notTest.test( data.iFilter ) ) {
					var indx,
						txt = data.iFilter.replace( '!', '' ),
						filter = tsf.parseFilter( c, txt, data ) || '';
					if ( tsfRegex.exact.test( filter ) ) {
						// look for exact not matches - see #628
						filter = filter.replace( tsfRegex.exact, '' );
						return filter === '' ? true : $.trim( filter ) !== data.iExact;
					} else {
						indx = data.iExact.search( $.trim( filter ) );
						return filter === '' ? true :
							// return true if not found
							data.anyMatch ? indx < 0 :
							// return false if found
							!( c.widgetOptions.filter_startsWith ? indx === 0 : indx >= 0 );
					}
				}
				return null;
			},
			// Look for quotes or equals to get an exact match; ignore type since iExact could be numeric
			exact: function( c, data ) {
				/*jshint eqeqeq:false */
				if ( tsfRegex.exact.test( data.iFilter ) ) {
					var txt = data.iFilter.replace( tsfRegex.exact, '' ),
						filter = tsf.parseFilter( c, txt, data ) || '';
					return data.anyMatch ? $.inArray( filter, data.rowArray ) >= 0 : filter == data.iExact;
				}
				return null;
			},
			// Look for a range ( using ' to ' or ' - ' ) - see issue #166; thanks matzhu!
			range : function( c, data ) {
				if ( tsfRegex.toTest.test( data.iFilter ) ) {
					var result, tmp, range1, range2,
						table = c.table,
						index = data.index,
						parsed = data.parsed[index],
						// make sure the dash is for a range and not indicating a negative number
						query = data.iFilter.split( tsfRegex.toSplit );

					tmp = query[0].replace( ts.regex.nondigit, '' ) || '';
					range1 = ts.formatFloat( tsf.parseFilter( c, tmp, data ), table );
					tmp = query[1].replace( ts.regex.nondigit, '' ) || '';
					range2 = ts.formatFloat( tsf.parseFilter( c, tmp, data ), table );
					// parse filter value in case we're comparing numbers ( dates )
					if ( parsed || c.parsers[ index ].type === 'numeric' ) {
						result = c.parsers[ index ].format( '' + query[0], table, c.$headers.eq( index ), index );
						range1 = ( result !== '' && !isNaN( result ) ) ? result : range1;
						result = c.parsers[ index ].format( '' + query[1], table, c.$headers.eq( index ), index );
						range2 = ( result !== '' && !isNaN( result ) ) ? result : range2;
					}
					if ( ( parsed || c.parsers[ index ].type === 'numeric' ) && !isNaN( range1 ) && !isNaN( range2 ) ) {
						result = data.cache;
					} else {
						tmp = isNaN( data.iExact ) ? data.iExact.replace( ts.regex.nondigit, '' ) : data.iExact;
						result = ts.formatFloat( tmp, table );
					}
					if ( range1 > range2 ) {
						tmp = range1; range1 = range2; range2 = tmp; // swap
					}
					return ( result >= range1 && result <= range2 ) || ( range1 === '' || range2 === '' );
				}
				return null;
			},
			// Look for wild card: ? = single, * = multiple, or | = logical OR
			wild : function( c, data ) {
				if ( tsfRegex.wildOrTest.test( data.iFilter ) ) {
					var query = '' + ( tsf.parseFilter( c, data.iFilter, data ) || '' );
					// look for an exact match with the 'or' unless the 'filter-match' class is found
					if ( !tsfRegex.wildTest.test( query ) && data.nestedFilters ) {
						query = data.isMatch ? query : '^(' + query + ')$';
					}
					// parsing the filter may not work properly when using wildcards =/
					try {
						return new RegExp(
							query.replace( tsfRegex.wild01, '\\S{1}' ).replace( tsfRegex.wild0More, '\\S*' ),
							c.widgetOptions.filter_ignoreCase ? 'i' : ''
						)
						.test( data.exact );
					} catch ( error ) {
						return null;
					}
				}
				return null;
			},
			// fuzzy text search; modified from https://github.com/mattyork/fuzzy ( MIT license )
			fuzzy: function( c, data ) {
				if ( tsfRegex.fuzzyTest.test( data.iFilter ) ) {
					var indx,
						patternIndx = 0,
						len = data.iExact.length,
						txt = data.iFilter.slice( 1 ),
						pattern = tsf.parseFilter( c, txt, data ) || '';
					for ( indx = 0; indx < len; indx++ ) {
						if ( data.iExact[ indx ] === pattern[ patternIndx ] ) {
							patternIndx += 1;
						}
					}
					return patternIndx === pattern.length;
				}
				return null;
			}
		},
		init: function( table ) {
			// filter language options
			ts.language = $.extend( true, {}, {
				to  : 'to',
				or  : 'or',
				and : 'and'
			}, ts.language );

			var options, string, txt, $header, column, val, fxn, noSelect,
				c = table.config,
				wo = c.widgetOptions;
			c.$table.addClass( 'hasFilters' );
			c.lastSearch = [];

			// define timers so using clearTimeout won't cause an undefined error
			wo.filter_searchTimer = null;
			wo.filter_initTimer = null;
			wo.filter_formatterCount = 0;
			wo.filter_formatterInit = [];
			wo.filter_anyColumnSelector = '[data-column="all"],[data-column="any"]';
			wo.filter_multipleColumnSelector = '[data-column*="-"],[data-column*=","]';

			val = '\\{' + tsfRegex.query + '\\}';
			$.extend( tsfRegex, {
				child : new RegExp( c.cssChildRow ),
				filtered : new RegExp( wo.filter_filteredRow ),
				alreadyFiltered : new RegExp( '(\\s+(' + ts.language.or + '|-|' + ts.language.to + ')\\s+)', 'i' ),
				toTest : new RegExp( '\\s+(-|' + ts.language.to + ')\\s+', 'i' ),
				toSplit : new RegExp( '(?:\\s+(?:-|' + ts.language.to + ')\\s+)', 'gi' ),
				andTest : new RegExp( '\\s+(' + ts.language.and + '|&&)\\s+', 'i' ),
				andSplit : new RegExp( '(?:\\s+(?:' + ts.language.and + '|&&)\\s+)', 'gi' ),
				orTest : new RegExp( '(\\||\\s+' + ts.language.or + '\\s+)', 'i' ),
				orSplit : new RegExp( '(?:\\s+(?:' + ts.language.or + ')\\s+|\\|)', 'gi' ),
				iQuery : new RegExp( val, 'i' ),
				igQuery : new RegExp( val, 'ig' ),
				operTest : /^[<>]=?/,
				gtTest  : />/,
				gteTest : />=/,
				ltTest  : /</,
				lteTest : /<=/,
				notTest : /^\!/,
				wildOrTest : /[\?\*\|]/,
				wildTest : /\?\*/,
				fuzzyTest : /^~/,
				exactTest : /[=\"\|!]/
			});

			// don't build filter row if columnFilters is false or all columns are set to 'filter-false'
			// see issue #156
			val = c.$headers.filter( '.filter-false, .parser-false' ).length;
			if ( wo.filter_columnFilters !== false && val !== c.$headers.length ) {
				// build filter row
				tsf.buildRow( table, c, wo );
			}

			txt = 'addRows updateCell update updateRows updateComplete appendCache filterReset ' +
				'filterAndSortReset filterResetSaved filterEnd search '.split( ' ' ).join( c.namespace + 'filter ' );
			c.$table.bind( txt, function( event, filter ) {
				val = wo.filter_hideEmpty &&
					$.isEmptyObject( c.cache ) &&
					!( c.delayInit && event.type === 'appendCache' );
				// hide filter row using the 'filtered' class name
				c.$table.find( '.' + tscss.filterRow ).toggleClass( wo.filter_filteredRow, val ); // fixes #450
				if ( !/(search|filter)/.test( event.type ) ) {
					event.stopPropagation();
					tsf.buildDefault( table, true );
				}
				// Add filterAndSortReset - see #1361
				if ( event.type === 'filterReset' || event.type === 'filterAndSortReset' ) {
					c.$table.find( '.' + tscss.filter ).add( wo.filter_$externalFilters ).val( '' );
					if ( event.type === 'filterAndSortReset' ) {
						ts.sortReset( this.config, function() {
							tsf.searching( table, [] );
						});
					} else {
						tsf.searching( table, [] );
					}
				} else if ( event.type === 'filterResetSaved' ) {
					ts.storage( table, 'tablesorter-filters', '' );
				} else if ( event.type === 'filterEnd' ) {
					tsf.buildDefault( table, true );
				} else {
					// send false argument to force a new search; otherwise if the filter hasn't changed,
					// it will return
					filter = event.type === 'search' ? filter :
						event.type === 'updateComplete' ? c.$table.data( 'lastSearch' ) : '';
					if ( /(update|add)/.test( event.type ) && event.type !== 'updateComplete' ) {
						// force a new search since content has changed
						c.lastCombinedFilter = null;
						c.lastSearch = [];
						// update filterFormatters after update (& small delay) - Fixes #1237
						setTimeout(function(){
							c.$table.triggerHandler( 'filterFomatterUpdate' );
						}, 100);
					}
					// pass true ( skipFirst ) to prevent the tablesorter.setFilters function from skipping the first
					// input ensures all inputs are updated when a search is triggered on the table
					// $( 'table' ).trigger( 'search', [...] );
					tsf.searching( table, filter, true );
				}
				return false;
			});

			// reset button/link
			if ( wo.filter_reset ) {
				if ( wo.filter_reset instanceof $ ) {
					// reset contains a jQuery object, bind to it
					wo.filter_reset.click( function() {
						c.$table.triggerHandler( 'filterReset' );
					});
				} else if ( $( wo.filter_reset ).length ) {
					// reset is a jQuery selector, use event delegation
					$( document )
						.undelegate( wo.filter_reset, 'click' + c.namespace + 'filter' )
						.delegate( wo.filter_reset, 'click' + c.namespace + 'filter', function() {
							// trigger a reset event, so other functions ( filter_formatter ) know when to reset
							c.$table.triggerHandler( 'filterReset' );
						});
				}
			}
			if ( wo.filter_functions ) {
				for ( column = 0; column < c.columns; column++ ) {
					fxn = ts.getColumnData( table, wo.filter_functions, column );
					if ( fxn ) {
						// remove 'filter-select' from header otherwise the options added here are replaced with
						// all options
						$header = c.$headerIndexed[ column ].removeClass( 'filter-select' );
						// don't build select if 'filter-false' or 'parser-false' set
						noSelect = !( $header.hasClass( 'filter-false' ) || $header.hasClass( 'parser-false' ) );
						options = '';
						if ( fxn === true && noSelect ) {
							tsf.buildSelect( table, column );
						} else if ( typeof fxn === 'object' && noSelect ) {
							// add custom drop down list
							for ( string in fxn ) {
								if ( typeof string === 'string' ) {
									options += options === '' ?
										'<option value="">' +
											( $header.data( 'placeholder' ) ||
												$header.attr( 'data-placeholder' ) ||
												wo.filter_placeholder.select ||
												''
											) +
										'</option>' : '';
									val = string;
									txt = string;
									if ( string.indexOf( wo.filter_selectSourceSeparator ) >= 0 ) {
										val = string.split( wo.filter_selectSourceSeparator );
										txt = val[1];
										val = val[0];
									}
									options += '<option ' +
										( txt === val ? '' : 'data-function-name="' + string + '" ' ) +
										'value="' + val + '">' + txt + '</option>';
								}
							}
							c.$table
								.find( 'thead' )
								.find( 'select.' + tscss.filter + '[data-column="' + column + '"]' )
								.append( options );
							txt = wo.filter_selectSource;
							fxn = typeof txt === 'function' ? true : ts.getColumnData( table, txt, column );
							if ( fxn ) {
								// updating so the extra options are appended
								tsf.buildSelect( c.table, column, '', true, $header.hasClass( wo.filter_onlyAvail ) );
							}
						}
					}
				}
			}
			// not really updating, but if the column has both the 'filter-select' class &
			// filter_functions set to true, it would append the same options twice.
			tsf.buildDefault( table, true );

			tsf.bindSearch( table, c.$table.find( '.' + tscss.filter ), true );
			if ( wo.filter_external ) {
				tsf.bindSearch( table, wo.filter_external );
			}

			if ( wo.filter_hideFilters ) {
				tsf.hideFilters( c );
			}

			// show processing icon
			if ( c.showProcessing ) {
				txt = 'filterStart filterEnd '.split( ' ' ).join( c.namespace + 'filter ' );
				c.$table
					.unbind( txt.replace( ts.regex.spaces, ' ' ) )
					.bind( txt, function( event, columns ) {
					// only add processing to certain columns to all columns
					$header = ( columns ) ?
						c.$table
							.find( '.' + tscss.header )
							.filter( '[data-column]' )
							.filter( function() {
								return columns[ $( this ).data( 'column' ) ] !== '';
							}) : '';
					ts.isProcessing( table, event.type === 'filterStart', columns ? $header : '' );
				});
			}

			// set filtered rows count ( intially unfiltered )
			c.filteredRows = c.totalRows;

			// add default values
			txt = 'tablesorter-initialized pagerBeforeInitialized '.split( ' ' ).join( c.namespace + 'filter ' );
			c.$table
			.unbind( txt.replace( ts.regex.spaces, ' ' ) )
			.bind( txt, function() {
				tsf.completeInit( this );
			});
			// if filter widget is added after pager has initialized; then set filter init flag
			if ( c.pager && c.pager.initialized && !wo.filter_initialized ) {
				c.$table.triggerHandler( 'filterFomatterUpdate' );
				setTimeout( function() {
					tsf.filterInitComplete( c );
				}, 100 );
			} else if ( !wo.filter_initialized ) {
				tsf.completeInit( table );
			}
		},
		completeInit: function( table ) {
			// redefine 'c' & 'wo' so they update properly inside this callback
			var c = table.config,
				wo = c.widgetOptions,
				filters = tsf.setDefaults( table, c, wo ) || [];
			if ( filters.length ) {
				// prevent delayInit from triggering a cache build if filters are empty
				if ( !( c.delayInit && filters.join( '' ) === '' ) ) {
					ts.setFilters( table, filters, true );
				}
			}
			c.$table.triggerHandler( 'filterFomatterUpdate' );
			// trigger init after setTimeout to prevent multiple filterStart/End/Init triggers
			setTimeout( function() {
				if ( !wo.filter_initialized ) {
					tsf.filterInitComplete( c );
				}
			}, 100 );
		},

		// $cell parameter, but not the config, is passed to the filter_formatters,
		// so we have to work with it instead
		formatterUpdated: function( $cell, column ) {
			// prevent error if $cell is undefined - see #1056
			var $table = $cell && $cell.closest( 'table' );
			var config = $table.length && $table[0].config,
				wo = config && config.widgetOptions;
			if ( wo && !wo.filter_initialized ) {
				// add updates by column since this function
				// may be called numerous times before initialization
				wo.filter_formatterInit[ column ] = 1;
			}
		},
		filterInitComplete: function( c ) {
			var indx, len,
				wo = c.widgetOptions,
				count = 0,
				completed = function() {
					wo.filter_initialized = true;
					// update lastSearch - it gets cleared often
					c.lastSearch = c.$table.data( 'lastSearch' );
					c.$table.triggerHandler( 'filterInit', c );
					tsf.findRows( c.table, c.lastSearch || [] );
				};
			if ( $.isEmptyObject( wo.filter_formatter ) ) {
				completed();
			} else {
				len = wo.filter_formatterInit.length;
				for ( indx = 0; indx < len; indx++ ) {
					if ( wo.filter_formatterInit[ indx ] === 1 ) {
						count++;
					}
				}
				clearTimeout( wo.filter_initTimer );
				if ( !wo.filter_initialized && count === wo.filter_formatterCount ) {
					// filter widget initialized
					completed();
				} else if ( !wo.filter_initialized ) {
					// fall back in case a filter_formatter doesn't call
					// $.tablesorter.filter.formatterUpdated( $cell, column ), and the count is off
					wo.filter_initTimer = setTimeout( function() {
						completed();
					}, 500 );
				}
			}
		},
		// encode or decode filters for storage; see #1026
		processFilters: function( filters, encode ) {
			var indx,
				// fixes #1237; previously returning an encoded "filters" value
				result = [],
				mode = encode ? encodeURIComponent : decodeURIComponent,
				len = filters.length;
			for ( indx = 0; indx < len; indx++ ) {
				if ( filters[ indx ] ) {
					result[ indx ] = mode( filters[ indx ] );
				}
			}
			return result;
		},
		setDefaults: function( table, c, wo ) {
			var isArray, saved, indx, col, $filters,
				// get current ( default ) filters
				filters = ts.getFilters( table ) || [];
			if ( wo.filter_saveFilters && ts.storage ) {
				saved = ts.storage( table, 'tablesorter-filters' ) || [];
				isArray = $.isArray( saved );
				// make sure we're not just getting an empty array
				if ( !( isArray && saved.join( '' ) === '' || !isArray ) ) {
					filters = tsf.processFilters( saved );
				}
			}
			// if no filters saved, then check default settings
			if ( filters.join( '' ) === '' ) {
				// allow adding default setting to external filters
				$filters = c.$headers.add( wo.filter_$externalFilters )
					.filter( '[' + wo.filter_defaultAttrib + ']' );
				for ( indx = 0; indx <= c.columns; indx++ ) {
					// include data-column='all' external filters
					col = indx === c.columns ? 'all' : indx;
					filters[ indx ] = $filters
						.filter( '[data-column="' + col + '"]' )
						.attr( wo.filter_defaultAttrib ) || filters[indx] || '';
				}
			}
			c.$table.data( 'lastSearch', filters );
			return filters;
		},
		parseFilter: function( c, filter, data, parsed ) {
			return parsed || data.parsed[ data.index ] ?
				c.parsers[ data.index ].format( filter, c.table, [], data.index ) :
				filter;
		},
		buildRow: function( table, c, wo ) {
			var $filter, col, column, $header, makeSelect, disabled, name, ffxn, tmp,
				// c.columns defined in computeThIndexes()
				cellFilter = wo.filter_cellFilter,
				columns = c.columns,
				arry = $.isArray( cellFilter ),
				buildFilter = '<tr role="row" class="' + tscss.filterRow + ' ' + c.cssIgnoreRow + '">';
			for ( column = 0; column < columns; column++ ) {
				if ( c.$headerIndexed[ column ].length ) {
					// account for entire column set with colspan. See #1047
					tmp = c.$headerIndexed[ column ] && c.$headerIndexed[ column ][0].colSpan || 0;
					if ( tmp > 1 ) {
						buildFilter += '<td data-column="' + column + '-' + ( column + tmp - 1 ) + '" colspan="' + tmp + '"';
					} else {
						buildFilter += '<td data-column="' + column + '"';
					}
					if ( arry ) {
						buildFilter += ( cellFilter[ column ] ? ' class="' + cellFilter[ column ] + '"' : '' );
					} else {
						buildFilter += ( cellFilter !== '' ? ' class="' + cellFilter + '"' : '' );
					}
					buildFilter += '></td>';
				}
			}
			c.$filters = $( buildFilter += '</tr>' )
				.appendTo( c.$table.children( 'thead' ).eq( 0 ) )
				.children( 'td' );
			// build each filter input
			for ( column = 0; column < columns; column++ ) {
				disabled = false;
				// assuming last cell of a column is the main column
				$header = c.$headerIndexed[ column ];
				if ( $header && $header.length ) {
					// $filter = c.$filters.filter( '[data-column="' + column + '"]' );
					$filter = tsf.getColumnElm( c, c.$filters, column );
					ffxn = ts.getColumnData( table, wo.filter_functions, column );
					makeSelect = ( wo.filter_functions && ffxn && typeof ffxn !== 'function' ) ||
						$header.hasClass( 'filter-select' );
					// get data from jQuery data, metadata, headers option or header class name
					col = ts.getColumnData( table, c.headers, column );
					disabled = ts.getData( $header[0], col, 'filter' ) === 'false' ||
						ts.getData( $header[0], col, 'parser' ) === 'false';

					if ( makeSelect ) {
						buildFilter = $( '<select>' ).appendTo( $filter );
					} else {
						ffxn = ts.getColumnData( table, wo.filter_formatter, column );
						if ( ffxn ) {
							wo.filter_formatterCount++;
							buildFilter = ffxn( $filter, column );
							// no element returned, so lets go find it
							if ( buildFilter && buildFilter.length === 0 ) {
								buildFilter = $filter.children( 'input' );
							}
							// element not in DOM, so lets attach it
							if ( buildFilter && ( buildFilter.parent().length === 0 ||
								( buildFilter.parent().length && buildFilter.parent()[0] !== $filter[0] ) ) ) {
								$filter.append( buildFilter );
							}
						} else {
							buildFilter = $( '<input type="search">' ).appendTo( $filter );
						}
						if ( buildFilter ) {
							tmp = $header.data( 'placeholder' ) ||
								$header.attr( 'data-placeholder' ) ||
								wo.filter_placeholder.search || '';
							buildFilter.attr( 'placeholder', tmp );
						}
					}
					if ( buildFilter ) {
						// add filter class name
						name = ( $.isArray( wo.filter_cssFilter ) ?
							( typeof wo.filter_cssFilter[column] !== 'undefined' ? wo.filter_cssFilter[column] || '' : '' ) :
							wo.filter_cssFilter ) || '';
						// copy data-column from table cell (it will include colspan)
						buildFilter.addClass( tscss.filter + ' ' + name ).attr( 'data-column', $filter.attr( 'data-column' ) );
						if ( disabled ) {
							buildFilter.attr( 'placeholder', '' ).addClass( tscss.filterDisabled )[0].disabled = true;
						}
					}
				}
			}
		},
		bindSearch: function( table, $el, internal ) {
			table = $( table )[0];
			$el = $( $el ); // allow passing a selector string
			if ( !$el.length ) { return; }
			var tmp,
				c = table.config,
				wo = c.widgetOptions,
				namespace = c.namespace + 'filter',
				$ext = wo.filter_$externalFilters;
			if ( internal !== true ) {
				// save anyMatch element
				tmp = wo.filter_anyColumnSelector + ',' + wo.filter_multipleColumnSelector;
				wo.filter_$anyMatch = $el.filter( tmp );
				if ( $ext && $ext.length ) {
					wo.filter_$externalFilters = wo.filter_$externalFilters.add( $el );
				} else {
					wo.filter_$externalFilters = $el;
				}
				// update values ( external filters added after table initialization )
				ts.setFilters( table, c.$table.data( 'lastSearch' ) || [], internal === false );
			}
			// unbind events
			tmp = ( 'keypress keyup keydown search change input '.split( ' ' ).join( namespace + ' ' ) );
			$el
			// use data attribute instead of jQuery data since the head is cloned without including
			// the data/binding
			.attr( 'data-lastSearchTime', new Date().getTime() )
			.unbind( tmp.replace( ts.regex.spaces, ' ' ) )
			.bind( 'keydown' + namespace, function( event ) {
				if ( event.which === tskeyCodes.escape && !table.config.widgetOptions.filter_resetOnEsc ) {
					// prevent keypress event
					return false;
				}
			})
			.bind( 'keyup' + namespace, function( event ) {
				wo = table.config.widgetOptions; // make sure "wo" isn't cached
				var column = parseInt( $( this ).attr( 'data-column' ), 10 ),
					liveSearch = typeof wo.filter_liveSearch === 'boolean' ? wo.filter_liveSearch :
						ts.getColumnData( table, wo.filter_liveSearch, column );
				if ( typeof liveSearch === 'undefined' ) {
					liveSearch = wo.filter_liveSearch.fallback || false;
				}
				$( this ).attr( 'data-lastSearchTime', new Date().getTime() );
				// emulate what webkit does.... escape clears the filter
				if ( event.which === tskeyCodes.escape ) {
					// make sure to restore the last value on escape
					this.value = wo.filter_resetOnEsc ? '' : c.lastSearch[column];
					// don't return if the search value is empty ( all rows need to be revealed )
				} else if ( this.value !== '' && (
					// liveSearch can contain a min value length; ignore arrow and meta keys, but allow backspace
					( typeof liveSearch === 'number' && this.value.length < liveSearch ) ||
					// let return & backspace continue on, but ignore arrows & non-valid characters
					( event.which !== tskeyCodes.enter && event.which !== tskeyCodes.backSpace &&
						( event.which < tskeyCodes.space || ( event.which >= tskeyCodes.left && event.which <= tskeyCodes.down ) ) ) ) ) {
					return;
					// live search
				} else if ( liveSearch === false ) {
					if ( this.value !== '' && event.which !== tskeyCodes.enter ) {
						return;
					}
				}
				// change event = no delay; last true flag tells getFilters to skip newest timed input
				tsf.searching( table, true, true, column );
			})
			// include change for select - fixes #473
			.bind( 'search change keypress input blur '.split( ' ' ).join( namespace + ' ' ), function( event ) {
				// don't get cached data, in case data-column changes dynamically
				var column = parseInt( $( this ).attr( 'data-column' ), 10 ),
					eventType = event.type,
					liveSearch = typeof wo.filter_liveSearch === 'boolean' ?
						wo.filter_liveSearch :
						ts.getColumnData( table, wo.filter_liveSearch, column );
				if ( table.config.widgetOptions.filter_initialized &&
					// immediate search if user presses enter
					( event.which === tskeyCodes.enter ||
						// immediate search if a "search" or "blur" is triggered on the input
						( eventType === 'search' || eventType === 'blur' ) ||
						// change & input events must be ignored if liveSearch !== true
						( eventType === 'change' || eventType === 'input' ) &&
						// prevent search if liveSearch is a number
						( liveSearch === true || liveSearch !== true && event.target.nodeName !== 'INPUT' ) &&
						// don't allow 'change' or 'input' event to process if the input value
						// is the same - fixes #685
						this.value !== c.lastSearch[column]
					)
				) {
					event.preventDefault();
					// init search with no delay
					$( this ).attr( 'data-lastSearchTime', new Date().getTime() );
					tsf.searching( table, eventType !== 'keypress', true, column );
				}
			});
		},
		searching: function( table, filter, skipFirst, column ) {
			var liveSearch,
				wo = table.config.widgetOptions;
			if (typeof column === 'undefined') {
				// no delay
				liveSearch = false;
			} else {
				liveSearch = typeof wo.filter_liveSearch === 'boolean' ?
					wo.filter_liveSearch :
					// get column setting, or set to fallback value, or default to false
					ts.getColumnData( table, wo.filter_liveSearch, column );
				if ( typeof liveSearch === 'undefined' ) {
					liveSearch = wo.filter_liveSearch.fallback || false;
				}
			}
			clearTimeout( wo.filter_searchTimer );
			if ( typeof filter === 'undefined' || filter === true ) {
				// delay filtering
				wo.filter_searchTimer = setTimeout( function() {
					tsf.checkFilters( table, filter, skipFirst );
				}, liveSearch ? wo.filter_searchDelay : 10 );
			} else {
				// skip delay
				tsf.checkFilters( table, filter, skipFirst );
			}
		},
		equalFilters: function (c, filter1, filter2) {
			var indx,
				f1 = [],
				f2 = [],
				len = c.columns + 1; // add one to include anyMatch filter
			filter1 = $.isArray(filter1) ? filter1 : [];
			filter2 = $.isArray(filter2) ? filter2 : [];
			for (indx = 0; indx < len; indx++) {
				f1[indx] = filter1[indx] || '';
				f2[indx] = filter2[indx] || '';
			}
			return f1.join(',') === f2.join(',');
		},
		checkFilters: function( table, filter, skipFirst ) {
			var c = table.config,
				wo = c.widgetOptions,
				filterArray = $.isArray( filter ),
				filters = ( filterArray ) ? filter : ts.getFilters( table, true ),
				currentFilters = filters || []; // current filter values
			// prevent errors if delay init is set
			if ( $.isEmptyObject( c.cache ) ) {
				// update cache if delayInit set & pager has initialized ( after user initiates a search )
				if ( c.delayInit && ( !c.pager || c.pager && c.pager.initialized ) ) {
					ts.updateCache( c, function() {
						tsf.checkFilters( table, false, skipFirst );
					});
				}
				return;
			}
			// add filter array back into inputs
			if ( filterArray ) {
				ts.setFilters( table, filters, false, skipFirst !== true );
				if ( !wo.filter_initialized ) {
					c.lastSearch = [];
					c.lastCombinedFilter = '';
				}
			}
			if ( wo.filter_hideFilters ) {
				// show/hide filter row as needed
				c.$table
					.find( '.' + tscss.filterRow )
					.triggerHandler( tsf.hideFiltersCheck( c ) ? 'mouseleave' : 'mouseenter' );
			}
			// return if the last search is the same; but filter === false when updating the search
			// see example-widget-filter.html filter toggle buttons
			if ( tsf.equalFilters(c, c.lastSearch, currentFilters) && filter !== false ) {
				return;
			} else if ( filter === false ) {
				// force filter refresh
				c.lastCombinedFilter = '';
				c.lastSearch = [];
			}
			// define filter inside it is false
			filters = filters || [];
			// convert filters to strings - see #1070
			filters = Array.prototype.map ?
				filters.map( String ) :
				// for IE8 & older browsers - maybe not the best method
				filters.join( '\ufffd' ).split( '\ufffd' );

			if ( wo.filter_initialized ) {
				c.$table.triggerHandler( 'filterStart', [ filters ] );
			}
			if ( c.showProcessing ) {
				// give it time for the processing icon to kick in
				setTimeout( function() {
					tsf.findRows( table, filters, currentFilters );
					return false;
				}, 30 );
			} else {
				tsf.findRows( table, filters, currentFilters );
				return false;
			}
		},
		hideFiltersCheck: function( c ) {
			if (typeof c.widgetOptions.filter_hideFilters === 'function') {
				var val = c.widgetOptions.filter_hideFilters( c );
				if (typeof val === 'boolean') {
					return val;
				}
			}
			return ts.getFilters( c.$table ).join( '' ) === '';
		},
		hideFilters: function( c, $table ) {
			var timer;
			( $table || c.$table )
				.find( '.' + tscss.filterRow )
				.addClass( tscss.filterRowHide )
				.bind( 'mouseenter mouseleave', function( e ) {
					// save event object - http://bugs.jquery.com/ticket/12140
					var event = e,
						$row = $( this );
					clearTimeout( timer );
					timer = setTimeout( function() {
						if ( /enter|over/.test( event.type ) ) {
							$row.removeClass( tscss.filterRowHide );
						} else {
							// don't hide if input has focus
							// $( ':focus' ) needs jQuery 1.6+
							if ( $( document.activeElement ).closest( 'tr' )[0] !== $row[0] ) {
								// don't hide row if any filter has a value
								$row.toggleClass( tscss.filterRowHide, tsf.hideFiltersCheck( c ) );
							}
						}
					}, 200 );
				})
				.find( 'input, select' ).bind( 'focus blur', function( e ) {
					var event = e,
						$row = $( this ).closest( 'tr' );
					clearTimeout( timer );
					timer = setTimeout( function() {
						clearTimeout( timer );
						// don't hide row if any filter has a value
						$row.toggleClass( tscss.filterRowHide, tsf.hideFiltersCheck( c ) && event.type !== 'focus' );
					}, 200 );
				});
		},
		defaultFilter: function( filter, mask ) {
			if ( filter === '' ) { return filter; }
			var regex = tsfRegex.iQuery,
				maskLen = mask.match( tsfRegex.igQuery ).length,
				query = maskLen > 1 ? $.trim( filter ).split( /\s/ ) : [ $.trim( filter ) ],
				len = query.length - 1,
				indx = 0,
				val = mask;
			if ( len < 1 && maskLen > 1 ) {
				// only one 'word' in query but mask has >1 slots
				query[1] = query[0];
			}
			// replace all {query} with query words...
			// if query = 'Bob', then convert mask from '!{query}' to '!Bob'
			// if query = 'Bob Joe Frank', then convert mask '{q} OR {q}' to 'Bob OR Joe OR Frank'
			while ( regex.test( val ) ) {
				val = val.replace( regex, query[indx++] || '' );
				if ( regex.test( val ) && indx < len && ( query[indx] || '' ) !== '' ) {
					val = mask.replace( regex, val );
				}
			}
			return val;
		},
		getLatestSearch: function( $input ) {
			if ( $input ) {
				return $input.sort( function( a, b ) {
					return $( b ).attr( 'data-lastSearchTime' ) - $( a ).attr( 'data-lastSearchTime' );
				});
			}
			return $input || $();
		},
		findRange: function( c, val, ignoreRanges ) {
			// look for multiple columns '1-3,4-6,8' in data-column
			var temp, ranges, range, start, end, singles, i, indx, len,
				columns = [];
			if ( /^[0-9]+$/.test( val ) ) {
				// always return an array
				return [ parseInt( val, 10 ) ];
			}
			// process column range
			if ( !ignoreRanges && /-/.test( val ) ) {
				ranges = val.match( /(\d+)\s*-\s*(\d+)/g );
				len = ranges ? ranges.length : 0;
				for ( indx = 0; indx < len; indx++ ) {
					range = ranges[indx].split( /\s*-\s*/ );
					start = parseInt( range[0], 10 ) || 0;
					end = parseInt( range[1], 10 ) || ( c.columns - 1 );
					if ( start > end ) {
						temp = start; start = end; end = temp; // swap
					}
					if ( end >= c.columns ) {
						end = c.columns - 1;
					}
					for ( ; start <= end; start++ ) {
						columns[ columns.length ] = start;
					}
					// remove processed range from val
					val = val.replace( ranges[ indx ], '' );
				}
			}
			// process single columns
			if ( !ignoreRanges && /,/.test( val ) ) {
				singles = val.split( /\s*,\s*/ );
				len = singles.length;
				for ( i = 0; i < len; i++ ) {
					if ( singles[ i ] !== '' ) {
						indx = parseInt( singles[ i ], 10 );
						if ( indx < c.columns ) {
							columns[ columns.length ] = indx;
						}
					}
				}
			}
			// return all columns
			if ( !columns.length ) {
				for ( indx = 0; indx < c.columns; indx++ ) {
					columns[ columns.length ] = indx;
				}
			}
			return columns;
		},
		getColumnElm: function( c, $elements, column ) {
			// data-column may contain multiple columns '1-3,5-6,8'
			// replaces: c.$filters.filter( '[data-column="' + column + '"]' );
			return $elements.filter( function() {
				var cols = tsf.findRange( c, $( this ).attr( 'data-column' ) );
				return $.inArray( column, cols ) > -1;
			});
		},
		multipleColumns: function( c, $input ) {
			// look for multiple columns '1-3,4-6,8' in data-column
			var wo = c.widgetOptions,
				// only target 'all' column inputs on initialization
				// & don't target 'all' column inputs if they don't exist
				targets = wo.filter_initialized || !$input.filter( wo.filter_anyColumnSelector ).length,
				val = $.trim( tsf.getLatestSearch( $input ).attr( 'data-column' ) || '' );
			return tsf.findRange( c, val, !targets );
		},
		processTypes: function( c, data, vars ) {
			var ffxn,
				filterMatched = null,
				matches = null;
			for ( ffxn in tsf.types ) {
				if ( $.inArray( ffxn, vars.excludeMatch ) < 0 && matches === null ) {
					matches = tsf.types[ffxn]( c, data, vars );
					if ( matches !== null ) {
						data.matchedOn = ffxn;
						filterMatched = matches;
					}
				}
			}
			return filterMatched;
		},
		matchType: function( c, columnIndex ) {
			var isMatch,
				wo = c.widgetOptions,
				$el = c.$headerIndexed[ columnIndex ];
			// filter-exact > filter-match > filter_matchType for type
			if ( $el.hasClass( 'filter-exact' ) ) {
				isMatch = false;
			} else if ( $el.hasClass( 'filter-match' ) ) {
				isMatch = true;
			} else {
				// filter-select is not applied when filter_functions are used, so look for a select
				if ( wo.filter_columnFilters ) {
					$el = c.$filters
						.find( '.' + tscss.filter )
						.add( wo.filter_$externalFilters )
						.filter( '[data-column="' + columnIndex + '"]' );
				} else if ( wo.filter_$externalFilters ) {
					$el = wo.filter_$externalFilters.filter( '[data-column="' + columnIndex + '"]' );
				}
				isMatch = $el.length ?
					c.widgetOptions.filter_matchType[ ( $el[ 0 ].nodeName || '' ).toLowerCase() ] === 'match' :
					// default to exact, if no inputs found
					false;
			}
			return isMatch;
		},
		processRow: function( c, data, vars ) {
			var result, filterMatched,
				fxn, ffxn, txt,
				wo = c.widgetOptions,
				showRow = true,
				hasAnyMatchInput = wo.filter_$anyMatch && wo.filter_$anyMatch.length,

				// if wo.filter_$anyMatch data-column attribute is changed dynamically
				// we don't want to do an "anyMatch" search on one column using data
				// for the entire row - see #998
				columnIndex = wo.filter_$anyMatch && wo.filter_$anyMatch.length ?
					// look for multiple columns '1-3,4-6,8'
					tsf.multipleColumns( c, wo.filter_$anyMatch ) :
					[];
			data.$cells = data.$row.children();
			data.matchedOn = null;
			if ( data.anyMatchFlag && columnIndex.length > 1 || ( data.anyMatchFilter && !hasAnyMatchInput ) ) {
				data.anyMatch = true;
				data.isMatch = true;
				data.rowArray = data.$cells.map( function( i ) {
					if ( $.inArray( i, columnIndex ) > -1 || ( data.anyMatchFilter && !hasAnyMatchInput ) ) {
						if ( data.parsed[ i ] ) {
							txt = data.cacheArray[ i ];
						} else {
							txt = data.rawArray[ i ];
							txt = $.trim( wo.filter_ignoreCase ? txt.toLowerCase() : txt );
							if ( c.sortLocaleCompare ) {
								txt = ts.replaceAccents( txt );
							}
						}
						return txt;
					}
				}).get();
				data.filter = data.anyMatchFilter;
				data.iFilter = data.iAnyMatchFilter;
				data.exact = data.rowArray.join( ' ' );
				data.iExact = wo.filter_ignoreCase ? data.exact.toLowerCase() : data.exact;
				data.cache = data.cacheArray.slice( 0, -1 ).join( ' ' );
				vars.excludeMatch = vars.noAnyMatch;
				filterMatched = tsf.processTypes( c, data, vars );
				if ( filterMatched !== null ) {
					showRow = filterMatched;
				} else {
					if ( wo.filter_startsWith ) {
						showRow = false;
						// data.rowArray may not contain all columns
						columnIndex = Math.min( c.columns, data.rowArray.length );
						while ( !showRow && columnIndex > 0 ) {
							columnIndex--;
							showRow = showRow || data.rowArray[ columnIndex ].indexOf( data.iFilter ) === 0;
						}
					} else {
						showRow = ( data.iExact + data.childRowText ).indexOf( data.iFilter ) >= 0;
					}
				}
				data.anyMatch = false;
				// no other filters to process
				if ( data.filters.join( '' ) === data.filter ) {
					return showRow;
				}
			}

			for ( columnIndex = 0; columnIndex < c.columns; columnIndex++ ) {
				data.filter = data.filters[ columnIndex ];
				data.index = columnIndex;

				// filter types to exclude, per column
				vars.excludeMatch = vars.excludeFilter[ columnIndex ];

				// ignore if filter is empty or disabled
				if ( data.filter ) {
					data.cache = data.cacheArray[ columnIndex ];
					result = data.parsed[ columnIndex ] ? data.cache : data.rawArray[ columnIndex ] || '';
					data.exact = c.sortLocaleCompare ? ts.replaceAccents( result ) : result; // issue #405
					data.iExact = !tsfRegex.type.test( typeof data.exact ) && wo.filter_ignoreCase ?
						data.exact.toLowerCase() : data.exact;
					data.isMatch = tsf.matchType( c, columnIndex );

					result = showRow; // if showRow is true, show that row

					// in case select filter option has a different value vs text 'a - z|A through Z'
					ffxn = wo.filter_columnFilters ?
						c.$filters.add( wo.filter_$externalFilters )
							.filter( '[data-column="' + columnIndex + '"]' )
							.find( 'select option:selected' )
							.attr( 'data-function-name' ) || '' : '';
					// replace accents - see #357
					if ( c.sortLocaleCompare ) {
						data.filter = ts.replaceAccents( data.filter );
					}

					// replace column specific default filters - see #1088
					if ( wo.filter_defaultFilter && tsfRegex.iQuery.test( vars.defaultColFilter[ columnIndex ] ) ) {
						data.filter = tsf.defaultFilter( data.filter, vars.defaultColFilter[ columnIndex ] );
					}

					// data.iFilter = case insensitive ( if wo.filter_ignoreCase is true ),
					// data.filter = case sensitive
					data.iFilter = wo.filter_ignoreCase ? ( data.filter || '' ).toLowerCase() : data.filter;
					fxn = vars.functions[ columnIndex ];
					filterMatched = null;
					if ( fxn ) {
						if ( typeof fxn === 'function' ) {
							// filter callback( exact cell content, parser normalized content,
							// filter input value, column index, jQuery row object )
							filterMatched = fxn( data.exact, data.cache, data.filter, columnIndex, data.$row, c, data );
						} else if ( typeof fxn[ ffxn || data.filter ] === 'function' ) {
							// selector option function
							txt = ffxn || data.filter;
							filterMatched =
								fxn[ txt ]( data.exact, data.cache, data.filter, columnIndex, data.$row, c, data );
						}
					}
					if ( filterMatched === null ) {
						// cycle through the different filters
						// filters return a boolean or null if nothing matches
						filterMatched = tsf.processTypes( c, data, vars );
						// select with exact match; ignore "and" or "or" within the text; fixes #1486
						txt = fxn === true && (data.matchedOn === 'and' || data.matchedOn === 'or');
						if ( filterMatched !== null && !txt) {
							result = filterMatched;
						// Look for match, and add child row data for matching
						} else {
							// check fxn (filter-select in header) after filter types are checked
							// without this, the filter + jQuery UI selectmenu demo was breaking
							if ( fxn === true ) {
								// default selector uses exact match unless 'filter-match' class is found
								result = data.isMatch ?
									// data.iExact may be a number
									( '' + data.iExact ).search( data.iFilter ) >= 0 :
									data.filter === data.exact;
							} else {
								txt = ( data.iExact + data.childRowText ).indexOf( tsf.parseFilter( c, data.iFilter, data ) );
								result = ( ( !wo.filter_startsWith && txt >= 0 ) || ( wo.filter_startsWith && txt === 0 ) );
							}
						}
					} else {
						result = filterMatched;
					}
					showRow = ( result ) ? showRow : false;
				}
			}
			return showRow;
		},
		findRows: function( table, filters, currentFilters ) {
			if (
				tsf.equalFilters(table.config, table.config.lastSearch, currentFilters) ||
				!table.config.widgetOptions.filter_initialized
			) {
				return;
			}
			var len, norm_rows, rowData, $rows, $row, rowIndex, tbodyIndex, $tbody, columnIndex,
				isChild, childRow, lastSearch, showRow, showParent, time, val, indx,
				notFiltered, searchFiltered, query, injected, res, id, txt,
				storedFilters = $.extend( [], filters ),
				c = table.config,
				wo = c.widgetOptions,
				// data object passed to filters; anyMatch is a flag for the filters
				data = {
					anyMatch: false,
					filters: filters,
					// regex filter type cache
					filter_regexCache : []
				},
				vars = {
					// anyMatch really screws up with these types of filters
					noAnyMatch: [ 'range',  'operators' ],
					// cache filter variables that use ts.getColumnData in the main loop
					functions : [],
					excludeFilter : [],
					defaultColFilter : [],
					defaultAnyFilter : ts.getColumnData( table, wo.filter_defaultFilter, c.columns, true ) || ''
				};

			// parse columns after formatter, in case the class is added at that point
			data.parsed = [];
			for ( columnIndex = 0; columnIndex < c.columns; columnIndex++ ) {
				data.parsed[ columnIndex ] = wo.filter_useParsedData ||
					// parser has a "parsed" parameter
					( c.parsers && c.parsers[ columnIndex ] && c.parsers[ columnIndex ].parsed ||
					// getData may not return 'parsed' if other 'filter-' class names exist
					// ( e.g. <th class="filter-select filter-parsed"> )
					ts.getData && ts.getData( c.$headerIndexed[ columnIndex ],
						ts.getColumnData( table, c.headers, columnIndex ), 'filter' ) === 'parsed' ||
					c.$headerIndexed[ columnIndex ].hasClass( 'filter-parsed' ) );

				vars.functions[ columnIndex ] =
					ts.getColumnData( table, wo.filter_functions, columnIndex ) ||
					c.$headerIndexed[ columnIndex ].hasClass( 'filter-select' );
				vars.defaultColFilter[ columnIndex ] =
					ts.getColumnData( table, wo.filter_defaultFilter, columnIndex ) || '';
				vars.excludeFilter[ columnIndex ] =
					( ts.getColumnData( table, wo.filter_excludeFilter, columnIndex, true ) || '' ).split( /\s+/ );
			}

			if ( c.debug ) {
				console.log( 'Filter: Starting filter widget search', filters );
				time = new Date();
			}
			// filtered rows count
			c.filteredRows = 0;
			c.totalRows = 0;
			currentFilters = ( storedFilters || [] );

			for ( tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++ ) {
				$tbody = ts.processTbody( table, c.$tbodies.eq( tbodyIndex ), true );
				// skip child rows & widget added ( removable ) rows - fixes #448 thanks to @hempel!
				// $rows = $tbody.children( 'tr' ).not( c.selectorRemove );
				columnIndex = c.columns;
				// convert stored rows into a jQuery object
				norm_rows = c.cache[ tbodyIndex ].normalized;
				$rows = $( $.map( norm_rows, function( el ) {
					return el[ columnIndex ].$row.get();
				}) );

				if ( currentFilters.join('') === '' || wo.filter_serversideFiltering ) {
					$rows
						.removeClass( wo.filter_filteredRow )
						.not( '.' + c.cssChildRow )
						.css( 'display', '' );
				} else {
					// filter out child rows
					$rows = $rows.not( '.' + c.cssChildRow );
					len = $rows.length;

					if ( ( wo.filter_$anyMatch && wo.filter_$anyMatch.length ) ||
						typeof filters[c.columns] !== 'undefined' ) {
						data.anyMatchFlag = true;
						data.anyMatchFilter = '' + (
							filters[ c.columns ] ||
							wo.filter_$anyMatch && tsf.getLatestSearch( wo.filter_$anyMatch ).val() ||
							''
						);
						if ( wo.filter_columnAnyMatch ) {
							// specific columns search
							query = data.anyMatchFilter.split( tsfRegex.andSplit );
							injected = false;
							for ( indx = 0; indx < query.length; indx++ ) {
								res = query[ indx ].split( ':' );
								if ( res.length > 1 ) {
									// make the column a one-based index ( non-developers start counting from one :P )
									if ( isNaN( res[0] ) ) {
										$.each( c.headerContent, function( i, txt ) {
											// multiple matches are possible
											if ( txt.toLowerCase().indexOf( res[0] ) > -1 ) {
												id = i;
												filters[ id ] = res[1];
											}
										});
									} else {
										id = parseInt( res[0], 10 ) - 1;
									}
									if ( id >= 0 && id < c.columns ) { // if id is an integer
										filters[ id ] = res[1];
										query.splice( indx, 1 );
										indx--;
										injected = true;
									}
								}
							}
							if ( injected ) {
								data.anyMatchFilter = query.join( ' && ' );
							}
						}
					}

					// optimize searching only through already filtered rows - see #313
					searchFiltered = wo.filter_searchFiltered;
					lastSearch = c.lastSearch || c.$table.data( 'lastSearch' ) || [];
					if ( searchFiltered ) {
						// cycle through all filters; include last ( columnIndex + 1 = match any column ). Fixes #669
						for ( indx = 0; indx < columnIndex + 1; indx++ ) {
							val = filters[indx] || '';
							// break out of loop if we've already determined not to search filtered rows
							if ( !searchFiltered ) { indx = columnIndex; }
							// search already filtered rows if...
							searchFiltered = searchFiltered && lastSearch.length &&
								// there are no changes from beginning of filter
								val.indexOf( lastSearch[indx] || '' ) === 0 &&
								// if there is NOT a logical 'or', or range ( 'to' or '-' ) in the string
								!tsfRegex.alreadyFiltered.test( val ) &&
								// if we are not doing exact matches, using '|' ( logical or ) or not '!'
								!tsfRegex.exactTest.test( val ) &&
								// don't search only filtered if the value is negative
								// ( '> -10' => '> -100' will ignore hidden rows )
								!( tsfRegex.isNeg1.test( val ) || tsfRegex.isNeg2.test( val ) ) &&
								// if filtering using a select without a 'filter-match' class ( exact match ) - fixes #593
								!( val !== '' && c.$filters && c.$filters.filter( '[data-column="' + indx + '"]' ).find( 'select' ).length &&
									!tsf.matchType( c, indx ) );
						}
					}
					notFiltered = $rows.not( '.' + wo.filter_filteredRow ).length;
					// can't search when all rows are hidden - this happens when looking for exact matches
					if ( searchFiltered && notFiltered === 0 ) { searchFiltered = false; }
					if ( c.debug ) {
						console.log( 'Filter: Searching through ' +
							( searchFiltered && notFiltered < len ? notFiltered : 'all' ) + ' rows' );
					}
					if ( data.anyMatchFlag ) {
						if ( c.sortLocaleCompare ) {
							// replace accents
							data.anyMatchFilter = ts.replaceAccents( data.anyMatchFilter );
						}
						if ( wo.filter_defaultFilter && tsfRegex.iQuery.test( vars.defaultAnyFilter ) ) {
							data.anyMatchFilter = tsf.defaultFilter( data.anyMatchFilter, vars.defaultAnyFilter );
							// clear search filtered flag because default filters are not saved to the last search
							searchFiltered = false;
						}
						// make iAnyMatchFilter lowercase unless both filter widget & core ignoreCase options are true
						// when c.ignoreCase is true, the cache contains all lower case data
						data.iAnyMatchFilter = !( wo.filter_ignoreCase && c.ignoreCase ) ?
							data.anyMatchFilter :
							data.anyMatchFilter.toLowerCase();
					}

					// loop through the rows
					for ( rowIndex = 0; rowIndex < len; rowIndex++ ) {

						txt = $rows[ rowIndex ].className;
						// the first row can never be a child row
						isChild = rowIndex && tsfRegex.child.test( txt );
						// skip child rows & already filtered rows
						if ( isChild || ( searchFiltered && tsfRegex.filtered.test( txt ) ) ) {
							continue;
						}

						data.$row = $rows.eq( rowIndex );
						data.rowIndex = rowIndex;
						data.cacheArray = norm_rows[ rowIndex ];
						rowData = data.cacheArray[ c.columns ];
						data.rawArray = rowData.raw;
						data.childRowText = '';

						if ( !wo.filter_childByColumn ) {
							txt = '';
							// child row cached text
							childRow = rowData.child;
							// so, if 'table.config.widgetOptions.filter_childRows' is true and there is
							// a match anywhere in the child row, then it will make the row visible
							// checked here so the option can be changed dynamically
							for ( indx = 0; indx < childRow.length; indx++ ) {
								txt += ' ' + childRow[indx].join( ' ' ) || '';
							}
							data.childRowText = wo.filter_childRows ?
								( wo.filter_ignoreCase ? txt.toLowerCase() : txt ) :
								'';
						}

						showRow = false;
						showParent = tsf.processRow( c, data, vars );
						$row = rowData.$row;

						// don't pass reference to val
						val = showParent ? true : false;
						childRow = rowData.$row.filter( ':gt(0)' );
						if ( wo.filter_childRows && childRow.length ) {
							if ( wo.filter_childByColumn ) {
								if ( !wo.filter_childWithSibs ) {
									// hide all child rows
									childRow.addClass( wo.filter_filteredRow );
									// if only showing resulting child row, only include parent
									$row = $row.eq( 0 );
								}
								// cycle through each child row
								for ( indx = 0; indx < childRow.length; indx++ ) {
									data.$row = childRow.eq( indx );
									data.cacheArray = rowData.child[ indx ];
									data.rawArray = data.cacheArray;
									val = tsf.processRow( c, data, vars );
									// use OR comparison on child rows
									showRow = showRow || val;
									if ( !wo.filter_childWithSibs && val ) {
										childRow.eq( indx ).removeClass( wo.filter_filteredRow );
									}
								}
							}
							// keep parent row match even if no child matches... see #1020
							showRow = showRow || showParent;
						} else {
							showRow = val;
						}
						$row
							.toggleClass( wo.filter_filteredRow, !showRow )[0]
							.display = showRow ? '' : 'none';
					}
				}
				c.filteredRows += $rows.not( '.' + wo.filter_filteredRow ).length;
				c.totalRows += $rows.length;
				ts.processTbody( table, $tbody, false );
			}
			// lastCombinedFilter is no longer used internally
			c.lastCombinedFilter = storedFilters.join(''); // save last search
			// don't save 'filters' directly since it may have altered ( AnyMatch column searches )
			c.lastSearch = storedFilters;
			c.$table.data( 'lastSearch', storedFilters );
			if ( wo.filter_saveFilters && ts.storage ) {
				ts.storage( table, 'tablesorter-filters', tsf.processFilters( storedFilters, true ) );
			}
			if ( c.debug ) {
				console.log( 'Completed filter widget search' + ts.benchmark(time) );
			}
			if ( wo.filter_initialized ) {
				c.$table.triggerHandler( 'filterBeforeEnd', c );
				c.$table.triggerHandler( 'filterEnd', c );
			}
			setTimeout( function() {
				ts.applyWidget( c.table ); // make sure zebra widget is applied
			}, 0 );
		},
		getOptionSource: function( table, column, onlyAvail ) {
			table = $( table )[0];
			var c = table.config,
				wo = c.widgetOptions,
				arry = false,
				source = wo.filter_selectSource,
				last = c.$table.data( 'lastSearch' ) || [],
				fxn = typeof source === 'function' ? true : ts.getColumnData( table, source, column );

			if ( onlyAvail && last[column] !== '' ) {
				onlyAvail = false;
			}

			// filter select source option
			if ( fxn === true ) {
				// OVERALL source
				arry = source( table, column, onlyAvail );
			} else if ( fxn instanceof $ || ( $.type( fxn ) === 'string' && fxn.indexOf( '</option>' ) >= 0 ) ) {
				// selectSource is a jQuery object or string of options
				return fxn;
			} else if ( $.isArray( fxn ) ) {
				arry = fxn;
			} else if ( $.type( source ) === 'object' && fxn ) {
				// custom select source function for a SPECIFIC COLUMN
				arry = fxn( table, column, onlyAvail );
				// abort - updating the selects from an external method
				if (arry === null) {
					return null;
				}
			}
			if ( arry === false ) {
				// fall back to original method
				arry = tsf.getOptions( table, column, onlyAvail );
			}

			return tsf.processOptions( table, column, arry );

		},
		processOptions: function( table, column, arry ) {
			if ( !$.isArray( arry ) ) {
				return false;
			}
			table = $( table )[0];
			var cts, txt, indx, len, parsedTxt, str,
				c = table.config,
				validColumn = typeof column !== 'undefined' && column !== null && column >= 0 && column < c.columns,
				direction = validColumn ? c.$headerIndexed[ column ].hasClass( 'filter-select-sort-desc' ) : false,
				parsed = [];
			// get unique elements and sort the list
			// if $.tablesorter.sortText exists ( not in the original tablesorter ),
			// then natural sort the list otherwise use a basic sort
			arry = $.grep( arry, function( value, indx ) {
				if ( value.text ) {
					return true;
				}
				return $.inArray( value, arry ) === indx;
			});
			if ( validColumn && c.$headerIndexed[ column ].hasClass( 'filter-select-nosort' ) ) {
				// unsorted select options
				return arry;
			} else {
				len = arry.length;
				// parse select option values
				for ( indx = 0; indx < len; indx++ ) {
					txt = arry[ indx ];
					// check for object
					str = txt.text ? txt.text : txt;
					// sortNatural breaks if you don't pass it strings
					parsedTxt = ( validColumn && c.parsers && c.parsers.length &&
						c.parsers[ column ].format( str, table, [], column ) || str ).toString();
					parsedTxt = c.widgetOptions.filter_ignoreCase ? parsedTxt.toLowerCase() : parsedTxt;
					// parse array data using set column parser; this DOES NOT pass the original
					// table cell to the parser format function
					if ( txt.text ) {
						txt.parsed = parsedTxt;
						parsed[ parsed.length ] = txt;
					} else {
						parsed[ parsed.length ] = {
							text : txt,
							// check parser length - fixes #934
							parsed : parsedTxt
						};
					}
				}
				// sort parsed select options
				cts = c.textSorter || '';
				parsed.sort( function( a, b ) {
					var x = direction ? b.parsed : a.parsed,
						y = direction ? a.parsed : b.parsed;
					if ( validColumn && typeof cts === 'function' ) {
						// custom OVERALL text sorter
						return cts( x, y, true, column, table );
					} else if ( validColumn && typeof cts === 'object' && cts.hasOwnProperty( column ) ) {
						// custom text sorter for a SPECIFIC COLUMN
						return cts[column]( x, y, true, column, table );
					} else if ( ts.sortNatural ) {
						// fall back to natural sort
						return ts.sortNatural( x, y );
					}
					// using an older version! do a basic sort
					return true;
				});
				// rebuild arry from sorted parsed data
				arry = [];
				len = parsed.length;
				for ( indx = 0; indx < len; indx++ ) {
					arry[ arry.length ] = parsed[indx];
				}
				return arry;
			}
		},
		getOptions: function( table, column, onlyAvail ) {
			table = $( table )[0];
			var rowIndex, tbodyIndex, len, row, cache, indx, child, childLen,
				c = table.config,
				wo = c.widgetOptions,
				arry = [];
			for ( tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++ ) {
				cache = c.cache[tbodyIndex];
				len = c.cache[tbodyIndex].normalized.length;
				// loop through the rows
				for ( rowIndex = 0; rowIndex < len; rowIndex++ ) {
					// get cached row from cache.row ( old ) or row data object
					// ( new; last item in normalized array )
					row = cache.row ?
						cache.row[ rowIndex ] :
						cache.normalized[ rowIndex ][ c.columns ].$row[0];
					// check if has class filtered
					if ( onlyAvail && row.className.match( wo.filter_filteredRow ) ) {
						continue;
					}
					// get non-normalized cell content
					if ( wo.filter_useParsedData ||
						c.parsers[column].parsed ||
						c.$headerIndexed[column].hasClass( 'filter-parsed' ) ) {
						arry[ arry.length ] = '' + cache.normalized[ rowIndex ][ column ];
						// child row parsed data
						if ( wo.filter_childRows && wo.filter_childByColumn ) {
							childLen = cache.normalized[ rowIndex ][ c.columns ].$row.length - 1;
							for ( indx = 0; indx < childLen; indx++ ) {
								arry[ arry.length ] = '' + cache.normalized[ rowIndex ][ c.columns ].child[ indx ][ column ];
							}
						}
					} else {
						// get raw cached data instead of content directly from the cells
						arry[ arry.length ] = cache.normalized[ rowIndex ][ c.columns ].raw[ column ];
						// child row unparsed data
						if ( wo.filter_childRows && wo.filter_childByColumn ) {
							childLen = cache.normalized[ rowIndex ][ c.columns ].$row.length;
							for ( indx = 1; indx < childLen; indx++ ) {
								child =  cache.normalized[ rowIndex ][ c.columns ].$row.eq( indx ).children().eq( column );
								arry[ arry.length ] = '' + ts.getElementText( c, child, column );
							}
						}
					}
				}
			}
			return arry;
		},
		buildSelect: function( table, column, arry, updating, onlyAvail ) {
			table = $( table )[0];
			column = parseInt( column, 10 );
			if ( !table.config.cache || $.isEmptyObject( table.config.cache ) ) {
				return;
			}

			var indx, val, txt, t, $filters, $filter, option,
				c = table.config,
				wo = c.widgetOptions,
				node = c.$headerIndexed[ column ],
				// t.data( 'placeholder' ) won't work in jQuery older than 1.4.3
				options = '<option value="">' +
					( node.data( 'placeholder' ) ||
						node.attr( 'data-placeholder' ) ||
						wo.filter_placeholder.select || ''
					) + '</option>',
				// Get curent filter value
				currentValue = c.$table
					.find( 'thead' )
					.find( 'select.' + tscss.filter + '[data-column="' + column + '"]' )
					.val();

			// nothing included in arry ( external source ), so get the options from
			// filter_selectSource or column data
			if ( typeof arry === 'undefined' || arry === '' ) {
				arry = tsf.getOptionSource( table, column, onlyAvail );
				// abort, selects are updated by an external method
				if (arry === null) {
					return;
				}
			}

			if ( $.isArray( arry ) ) {
				// build option list
				for ( indx = 0; indx < arry.length; indx++ ) {
					option = arry[ indx ];
					if ( option.text ) {
						// OBJECT!! add data-function-name in case the value is set in filter_functions
						option['data-function-name'] = typeof option.value === 'undefined' ? option.text : option.value;

						// support jQuery < v1.8, otherwise the below code could be shortened to
						// options += $( '<option>', option )[ 0 ].outerHTML;
						options += '<option';
						for ( val in option ) {
							if ( option.hasOwnProperty( val ) && val !== 'text' ) {
								options += ' ' + val + '="' + option[ val ] + '"';
							}
						}
						if ( !option.value ) {
							options += ' value="' + option.text + '"';
						}
						options += '>' + option.text + '</option>';
						// above code is needed in jQuery < v1.8

						// make sure we don't turn an object into a string (objects without a "text" property)
					} else if ( '' + option !== '[object Object]' ) {
						txt = option = ( '' + option ).replace( tsfRegex.quote, '&quot;' );
						val = txt;
						// allow including a symbol in the selectSource array
						// 'a-z|A through Z' so that 'a-z' becomes the option value
						// and 'A through Z' becomes the option text
						if ( txt.indexOf( wo.filter_selectSourceSeparator ) >= 0 ) {
							t = txt.split( wo.filter_selectSourceSeparator );
							val = t[0];
							txt = t[1];
						}
						// replace quotes - fixes #242 & ignore empty strings
						// see http://stackoverflow.com/q/14990971/145346
						options += option !== '' ?
							'<option ' +
								( val === txt ? '' : 'data-function-name="' + option + '" ' ) +
								'value="' + val + '">' + txt +
							'</option>' : '';
					}
				}
				// clear arry so it doesn't get appended twice
				arry = [];
			}

			// update all selects in the same column ( clone thead in sticky headers &
			// any external selects ) - fixes 473
			$filters = ( c.$filters ? c.$filters : c.$table.children( 'thead' ) )
				.find( '.' + tscss.filter );
			if ( wo.filter_$externalFilters ) {
				$filters = $filters && $filters.length ?
					$filters.add( wo.filter_$externalFilters ) :
					wo.filter_$externalFilters;
			}
			$filter = $filters.filter( 'select[data-column="' + column + '"]' );

			// make sure there is a select there!
			if ( $filter.length ) {
				$filter[ updating ? 'html' : 'append' ]( options );
				if ( !$.isArray( arry ) ) {
					// append options if arry is provided externally as a string or jQuery object
					// options ( default value ) was already added
					$filter.append( arry ).val( currentValue );
				}
				$filter.val( currentValue );
			}
		},
		buildDefault: function( table, updating ) {
			var columnIndex, $header, noSelect,
				c = table.config,
				wo = c.widgetOptions,
				columns = c.columns;
			// build default select dropdown
			for ( columnIndex = 0; columnIndex < columns; columnIndex++ ) {
				$header = c.$headerIndexed[columnIndex];
				noSelect = !( $header.hasClass( 'filter-false' ) || $header.hasClass( 'parser-false' ) );
				// look for the filter-select class; build/update it if found
				if ( ( $header.hasClass( 'filter-select' ) ||
					ts.getColumnData( table, wo.filter_functions, columnIndex ) === true ) && noSelect ) {
					tsf.buildSelect( table, columnIndex, '', updating, $header.hasClass( wo.filter_onlyAvail ) );
				}
			}
		}
	};

	// filter regex variable
	tsfRegex = tsf.regex;

	ts.getFilters = function( table, getRaw, setFilters, skipFirst ) {
		var i, $filters, $column, cols,
			filters = [],
			c = table ? $( table )[0].config : '',
			wo = c ? c.widgetOptions : '';
		if ( ( getRaw !== true && wo && !wo.filter_columnFilters ) ||
			// setFilters called, but last search is exactly the same as the current
			// fixes issue #733 & #903 where calling update causes the input values to reset
			( $.isArray(setFilters) && tsf.equalFilters(c, setFilters, c.lastSearch) )
		) {
			return $( table ).data( 'lastSearch' ) || [];
		}
		if ( c ) {
			if ( c.$filters ) {
				$filters = c.$filters.find( '.' + tscss.filter );
			}
			if ( wo.filter_$externalFilters ) {
				$filters = $filters && $filters.length ?
					$filters.add( wo.filter_$externalFilters ) :
					wo.filter_$externalFilters;
			}
			if ( $filters && $filters.length ) {
				filters = setFilters || [];
				for ( i = 0; i < c.columns + 1; i++ ) {
					cols = ( i === c.columns ?
						// 'all' columns can now include a range or set of columms ( data-column='0-2,4,6-7' )
						wo.filter_anyColumnSelector + ',' + wo.filter_multipleColumnSelector :
						'[data-column="' + i + '"]' );
					$column = $filters.filter( cols );
					if ( $column.length ) {
						// move the latest search to the first slot in the array
						$column = tsf.getLatestSearch( $column );
						if ( $.isArray( setFilters ) ) {
							// skip first ( latest input ) to maintain cursor position while typing
							if ( skipFirst && $column.length > 1 ) {
								$column = $column.slice( 1 );
							}
							if ( i === c.columns ) {
								// prevent data-column='all' from filling data-column='0,1' ( etc )
								cols = $column.filter( wo.filter_anyColumnSelector );
								$column = cols.length ? cols : $column;
							}
							$column
								.val( setFilters[ i ] )
								// must include a namespace here; but not c.namespace + 'filter'?
								.trigger( 'change' + c.namespace );
						} else {
							filters[i] = $column.val() || '';
							// don't change the first... it will move the cursor
							if ( i === c.columns ) {
								// don't update range columns from 'all' setting
								$column
									.slice( 1 )
									.filter( '[data-column*="' + $column.attr( 'data-column' ) + '"]' )
									.val( filters[ i ] );
							} else {
								$column
									.slice( 1 )
									.val( filters[ i ] );
							}
						}
						// save any match input dynamically
						if ( i === c.columns && $column.length ) {
							wo.filter_$anyMatch = $column;
						}
					}
				}
			}
		}
		return filters;
	};

	ts.setFilters = function( table, filter, apply, skipFirst ) {
		var c = table ? $( table )[0].config : '',
			valid = ts.getFilters( table, true, filter, skipFirst );
		// default apply to "true"
		if ( typeof apply === 'undefined' ) {
			apply = true;
		}
		if ( c && apply ) {
			// ensure new set filters are applied, even if the search is the same
			c.lastCombinedFilter = null;
			c.lastSearch = [];
			tsf.searching( c.table, filter, skipFirst );
			c.$table.triggerHandler( 'filterFomatterUpdate' );
		}
		return valid.length !== 0;
	};

})( jQuery );

/*! Widget: stickyHeaders - updated 9/27/2017 (v2.29.0) *//*
 * Requires tablesorter v2.8+ and jQuery 1.4.3+
 * by Rob Garrison
 */
;(function ($, window) {
	'use strict';
	var ts = $.tablesorter || {};

	$.extend(ts.css, {
		sticky    : 'tablesorter-stickyHeader', // stickyHeader
		stickyVis : 'tablesorter-sticky-visible',
		stickyHide: 'tablesorter-sticky-hidden',
		stickyWrap: 'tablesorter-sticky-wrapper'
	});

	// Add a resize event to table headers
	ts.addHeaderResizeEvent = function(table, disable, settings) {
		table = $(table)[0]; // make sure we're using a dom element
		if ( !table.config ) { return; }
		var defaults = {
				timer : 250
			},
			options = $.extend({}, defaults, settings),
			c = table.config,
			wo = c.widgetOptions,
			checkSizes = function( triggerEvent ) {
				var index, headers, $header, sizes, width, height,
					len = c.$headers.length;
				wo.resize_flag = true;
				headers = [];
				for ( index = 0; index < len; index++ ) {
					$header = c.$headers.eq( index );
					sizes = $header.data( 'savedSizes' ) || [ 0, 0 ]; // fixes #394
					width = $header[0].offsetWidth;
					height = $header[0].offsetHeight;
					if ( width !== sizes[0] || height !== sizes[1] ) {
						$header.data( 'savedSizes', [ width, height ] );
						headers.push( $header[0] );
					}
				}
				if ( headers.length && triggerEvent !== false ) {
					c.$table.triggerHandler( 'resize', [ headers ] );
				}
				wo.resize_flag = false;
			};
		clearInterval(wo.resize_timer);
		if (disable) {
			wo.resize_flag = false;
			return false;
		}
		checkSizes( false );
		wo.resize_timer = setInterval(function() {
			if (wo.resize_flag) { return; }
			checkSizes();
		}, options.timer);
	};

	function getStickyOffset(c, wo) {
		var $el = isNaN(wo.stickyHeaders_offset) ? $(wo.stickyHeaders_offset) : [];
		return $el.length ?
			$el.height() || 0 :
			parseInt(wo.stickyHeaders_offset, 10) || 0;
	}

	// Sticky headers based on this awesome article:
	// http://css-tricks.com/13465-persistent-headers/
	// and https://github.com/jmosbech/StickyTableHeaders by Jonas Mosbech
	// **************************
	ts.addWidget({
		id: 'stickyHeaders',
		priority: 54, // sticky widget must be initialized after the filter & before pager widget!
		options: {
			stickyHeaders : '',       // extra class name added to the sticky header row
			stickyHeaders_appendTo : null, // jQuery selector or object to phycially attach the sticky headers
			stickyHeaders_attachTo : null, // jQuery selector or object to attach scroll listener to (overridden by xScroll & yScroll settings)
			stickyHeaders_xScroll : null, // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
			stickyHeaders_yScroll : null, // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
			stickyHeaders_offset : 0, // number or jquery selector targeting the position:fixed element
			stickyHeaders_filteredToTop: true, // scroll table top into view after filtering
			stickyHeaders_cloneId : '-sticky', // added to table ID, if it exists
			stickyHeaders_addResizeEvent : true, // trigger 'resize' event on headers
			stickyHeaders_includeCaption : true, // if false and a caption exist, it won't be included in the sticky header
			stickyHeaders_zIndex : 2 // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
		},
		format: function(table, c, wo) {
			// filter widget doesn't initialize on an empty table. Fixes #449
			if ( c.$table.hasClass('hasStickyHeaders') || ($.inArray('filter', c.widgets) >= 0 && !c.$table.hasClass('hasFilters')) ) {
				return;
			}
			var index, len, $t,
				$table = c.$table,
				// add position: relative to attach element, hopefully it won't cause trouble.
				$attach = $(wo.stickyHeaders_attachTo),
				namespace = c.namespace + 'stickyheaders ',
				// element to watch for the scroll event
				$yScroll = $(wo.stickyHeaders_yScroll || wo.stickyHeaders_attachTo || window),
				$xScroll = $(wo.stickyHeaders_xScroll || wo.stickyHeaders_attachTo || window),
				$thead = $table.children('thead:first'),
				$header = $thead.children('tr').not('.sticky-false').children(),
				$tfoot = $table.children('tfoot'),
				stickyOffset = getStickyOffset(c, wo),
				// is this table nested? If so, find parent sticky header wrapper (div, not table)
				$nestedSticky = $table.parent().closest('.' + ts.css.table).hasClass('hasStickyHeaders') ?
					$table.parent().closest('table.tablesorter')[0].config.widgetOptions.$sticky.parent() : [],
				nestedStickyTop = $nestedSticky.length ? $nestedSticky.height() : 0,
				// clone table, then wrap to make sticky header
				$stickyTable = wo.$sticky = $table.clone()
					.addClass('containsStickyHeaders ' + ts.css.sticky + ' ' + wo.stickyHeaders + ' ' + c.namespace.slice(1) + '_extra_table' )
					.wrap('<div class="' + ts.css.stickyWrap + '">'),
				$stickyWrap = $stickyTable.parent()
					.addClass(ts.css.stickyHide)
					.css({
						position   : $attach.length ? 'absolute' : 'fixed',
						padding    : parseInt( $stickyTable.parent().parent().css('padding-left'), 10 ),
						top        : stickyOffset + nestedStickyTop,
						left       : 0,
						visibility : 'hidden',
						zIndex     : wo.stickyHeaders_zIndex || 2
					}),
				$stickyThead = $stickyTable.children('thead:first'),
				$stickyCells,
				laststate = '',
				setWidth = function($orig, $clone){
					var index, width, border, $cell, $this,
						$cells = $orig.filter(':visible'),
						len = $cells.length;
					for ( index = 0; index < len; index++ ) {
						$cell = $clone.filter(':visible').eq(index);
						$this = $cells.eq(index);
						// code from https://github.com/jmosbech/StickyTableHeaders
						if ($this.css('box-sizing') === 'border-box') {
							width = $this.outerWidth();
						} else {
							if ($cell.css('border-collapse') === 'collapse') {
								if (window.getComputedStyle) {
									width = parseFloat( window.getComputedStyle($this[0], null).width );
								} else {
									// ie8 only
									border = parseFloat( $this.css('border-width') );
									width = $this.outerWidth() - parseFloat( $this.css('padding-left') ) - parseFloat( $this.css('padding-right') ) - border;
								}
							} else {
								width = $this.width();
							}
						}
						$cell.css({
							'width': width,
							'min-width': width,
							'max-width': width
						});
					}
				},
				getLeftPosition = function() {
					return $attach.length ?
						parseInt($attach.css('padding-left'), 10) || 0 :
						$table.offset().left - parseInt($table.css('margin-left'), 10) - $(window).scrollLeft();
				},
				resizeHeader = function() {
					$stickyWrap.css({
						left : getLeftPosition(),
						width: $table.outerWidth()
					});
					setWidth( $table, $stickyTable );
					setWidth( $header, $stickyCells );
				},
				scrollSticky = function( resizing ) {
					if (!$table.is(':visible')) { return; } // fixes #278
					// Detect nested tables - fixes #724
					nestedStickyTop = $nestedSticky.length ? $nestedSticky.offset().top - $yScroll.scrollTop() + $nestedSticky.height() : 0;
					var tmp,
						offset = $table.offset(),
						stickyOffset = getStickyOffset(c, wo),
						yWindow = $.isWindow( $yScroll[0] ), // $.isWindow needs jQuery 1.4.3
						attachTop = $attach.length ?
							( yWindow ? $yScroll.scrollTop() : $yScroll.offset().top ) :
							$yScroll.scrollTop(),
						captionHeight = wo.stickyHeaders_includeCaption ? 0 : $table.children( 'caption' ).height() || 0,
						scrollTop = attachTop + stickyOffset + nestedStickyTop - captionHeight,
						tableHeight = $table.height() - ($stickyWrap.height() + ($tfoot.height() || 0)) - captionHeight,
						isVisible = ( scrollTop > offset.top ) && ( scrollTop < offset.top + tableHeight ) ? 'visible' : 'hidden',
						state = isVisible === 'visible' ? ts.css.stickyVis : ts.css.stickyHide,
						needsUpdating = !$stickyWrap.hasClass( state ),
						cssSettings = { visibility : isVisible };
					if ($attach.length) {
						// attached sticky headers always need updating
						needsUpdating = true;
						cssSettings.top = yWindow ? scrollTop - $attach.offset().top : $attach.scrollTop();
					}
					// adjust when scrolling horizontally - fixes issue #143
					tmp = getLeftPosition();
					if (tmp !== parseInt($stickyWrap.css('left'), 10)) {
						needsUpdating = true;
						cssSettings.left = tmp;
					}
					cssSettings.top = ( cssSettings.top || 0 ) + stickyOffset + nestedStickyTop;
					if (needsUpdating) {
						$stickyWrap
							.removeClass( ts.css.stickyVis + ' ' + ts.css.stickyHide )
							.addClass( state )
							.css(cssSettings);
					}
					if (isVisible !== laststate || resizing) {
						// make sure the column widths match
						resizeHeader();
						laststate = isVisible;
					}
				};
			// only add a position relative if a position isn't already defined
			if ($attach.length && !$attach.css('position')) {
				$attach.css('position', 'relative');
			}
			// fix clone ID, if it exists - fixes #271
			if ($stickyTable.attr('id')) { $stickyTable[0].id += wo.stickyHeaders_cloneId; }
			// clear out cloned table, except for sticky header
			// include caption & filter row (fixes #126 & #249) - don't remove cells to get correct cell indexing
			$stickyTable.find('thead:gt(0), tr.sticky-false').hide();
			$stickyTable.find('tbody, tfoot').remove();
			$stickyTable.find('caption').toggle(wo.stickyHeaders_includeCaption);
			// issue #172 - find td/th in sticky header
			$stickyCells = $stickyThead.children().children();
			$stickyTable.css({ height:0, width:0, margin: 0 });
			// remove resizable block
			$stickyCells.find('.' + ts.css.resizer).remove();
			// update sticky header class names to match real header after sorting
			$table
				.addClass('hasStickyHeaders')
				.bind('pagerComplete' + namespace, function() {
					resizeHeader();
				});

			ts.bindEvents(table, $stickyThead.children().children('.' + ts.css.header));

			if (wo.stickyHeaders_appendTo) {
				$(wo.stickyHeaders_appendTo).append( $stickyWrap );
			} else {
				// add stickyheaders AFTER the table. If the table is selected by ID, the original one (first) will be returned.
				$table.after( $stickyWrap );
			}

			// onRenderHeader is defined, we need to do something about it (fixes #641)
			if (c.onRenderHeader) {
				$t = $stickyThead.children('tr').children();
				len = $t.length;
				for ( index = 0; index < len; index++ ) {
					// send second parameter
					c.onRenderHeader.apply( $t.eq( index ), [ index, c, $stickyTable ] );
				}
			}

			// make it sticky!
			$xScroll.add($yScroll)
				.unbind( ('scroll resize '.split(' ').join( namespace )).replace(/\s+/g, ' ') )
				.bind('scroll resize '.split(' ').join( namespace ), function( event ) {
					scrollSticky( event.type === 'resize' );
				});
			c.$table
				.unbind('stickyHeadersUpdate' + namespace)
				.bind('stickyHeadersUpdate' + namespace, function(){
					scrollSticky( true );
				});

			if (wo.stickyHeaders_addResizeEvent) {
				ts.addHeaderResizeEvent(table);
			}

			// look for filter widget
			if ($table.hasClass('hasFilters') && wo.filter_columnFilters) {
				// scroll table into view after filtering, if sticky header is active - #482
				$table.bind('filterEnd' + namespace, function() {
					// $(':focus') needs jQuery 1.6+
					var $td = $(document.activeElement).closest('td'),
						column = $td.parent().children().index($td);
					// only scroll if sticky header is active
					if ($stickyWrap.hasClass(ts.css.stickyVis) && wo.stickyHeaders_filteredToTop) {
						// scroll to original table (not sticky clone)
						window.scrollTo(0, $table.position().top);
						// give same input/select focus; check if c.$filters exists; fixes #594
						if (column >= 0 && c.$filters) {
							c.$filters.eq(column).find('a, select, input').filter(':visible').focus();
						}
					}
				});
				ts.filter.bindSearch( $table, $stickyCells.find('.' + ts.css.filter) );
				// support hideFilters
				if (wo.filter_hideFilters) {
					ts.filter.hideFilters(c, $stickyTable);
				}
			}

			// resize table (Firefox)
			if (wo.stickyHeaders_addResizeEvent) {
				$table.bind('resize' + c.namespace + 'stickyheaders', function() {
					resizeHeader();
				});
			}

			// make sure sticky is visible if page is partially scrolled
			scrollSticky( true );
			$table.triggerHandler('stickyHeadersInit');

		},
		remove: function(table, c, wo) {
			var namespace = c.namespace + 'stickyheaders ';
			c.$table
				.removeClass('hasStickyHeaders')
				.unbind( ('pagerComplete resize filterEnd stickyHeadersUpdate '.split(' ').join(namespace)).replace(/\s+/g, ' ') )
				.next('.' + ts.css.stickyWrap).remove();
			if (wo.$sticky && wo.$sticky.length) { wo.$sticky.remove(); } // remove cloned table
			$(window)
				.add(wo.stickyHeaders_xScroll)
				.add(wo.stickyHeaders_yScroll)
				.add(wo.stickyHeaders_attachTo)
				.unbind( ('scroll resize '.split(' ').join(namespace)).replace(/\s+/g, ' ') );
			ts.addHeaderResizeEvent(table, true);
		}
	});

})(jQuery, window);

/*! Widget: resizable - updated 12/13/2017 (v2.29.1) */
/*jshint browser:true, jquery:true, unused:false */
;(function ($, window) {
	'use strict';
	var ts = $.tablesorter || {};

	$.extend(ts.css, {
		resizableContainer : 'tablesorter-resizable-container',
		resizableHandle    : 'tablesorter-resizable-handle',
		resizableNoSelect  : 'tablesorter-disableSelection',
		resizableStorage   : 'tablesorter-resizable'
	});

	// Add extra scroller css
	$(function(){
		var s = '<style>' +
			'body.' + ts.css.resizableNoSelect + ' { -ms-user-select: none; -moz-user-select: -moz-none;' +
				'-khtml-user-select: none; -webkit-user-select: none; user-select: none; }' +
			'.' + ts.css.resizableContainer + ' { position: relative; height: 1px; }' +
			// make handle z-index > than stickyHeader z-index, so the handle stays above sticky header
			'.' + ts.css.resizableHandle + ' { position: absolute; display: inline-block; width: 8px;' +
				'top: 1px; cursor: ew-resize; z-index: 3; user-select: none; -moz-user-select: none; }' +
			'</style>';
		$('head').append(s);
	});

	ts.resizable = {
		init : function( c, wo ) {
			if ( c.$table.hasClass( 'hasResizable' ) ) { return; }
			c.$table.addClass( 'hasResizable' );

			var noResize, $header, column, storedSizes, tmp,
				$table = c.$table,
				$parent = $table.parent(),
				marginTop = parseInt( $table.css( 'margin-top' ), 10 ),

			// internal variables
			vars = wo.resizable_vars = {
				useStorage : ts.storage && wo.resizable !== false,
				$wrap : $parent,
				mouseXPosition : 0,
				$target : null,
				$next : null,
				overflow : $parent.css('overflow') === 'auto' ||
					$parent.css('overflow') === 'scroll' ||
					$parent.css('overflow-x') === 'auto' ||
					$parent.css('overflow-x') === 'scroll',
				storedSizes : []
			};

			// set default widths
			ts.resizableReset( c.table, true );

			// now get measurements!
			vars.tableWidth = $table.width();
			// attempt to autodetect
			vars.fullWidth = Math.abs( $parent.width() - vars.tableWidth ) < 20;

			/*
			// Hacky method to determine if table width is set to 'auto'
			// http://stackoverflow.com/a/20892048/145346
			if ( !vars.fullWidth ) {
				tmp = $table.width();
				$header = $table.wrap('<span>').parent(); // temp variable
				storedSizes = parseInt( $table.css( 'margin-left' ), 10 ) || 0;
				$table.css( 'margin-left', storedSizes + 50 );
				vars.tableWidth = $header.width() > tmp ? 'auto' : tmp;
				$table.css( 'margin-left', storedSizes ? storedSizes : '' );
				$header = null;
				$table.unwrap('<span>');
			}
			*/

			if ( vars.useStorage && vars.overflow ) {
				// save table width
				ts.storage( c.table, 'tablesorter-table-original-css-width', vars.tableWidth );
				tmp = ts.storage( c.table, 'tablesorter-table-resized-width' ) || 'auto';
				ts.resizable.setWidth( $table, tmp, true );
			}
			wo.resizable_vars.storedSizes = storedSizes = ( vars.useStorage ?
				ts.storage( c.table, ts.css.resizableStorage ) :
				[] ) || [];
			ts.resizable.setWidths( c, wo, storedSizes );
			ts.resizable.updateStoredSizes( c, wo );

			wo.$resizable_container = $( '<div class="' + ts.css.resizableContainer + '">' )
				.css({ top : marginTop })
				.insertBefore( $table );
			// add container
			for ( column = 0; column < c.columns; column++ ) {
				$header = c.$headerIndexed[ column ];
				tmp = ts.getColumnData( c.table, c.headers, column );
				noResize = ts.getData( $header, tmp, 'resizable' ) === 'false';
				if ( !noResize ) {
					$( '<div class="' + ts.css.resizableHandle + '">' )
						.appendTo( wo.$resizable_container )
						.attr({
							'data-column' : column,
							'unselectable' : 'on'
						})
						.data( 'header', $header )
						.bind( 'selectstart', false );
				}
			}
			ts.resizable.bindings( c, wo );
		},

		updateStoredSizes : function( c, wo ) {
			var column, $header,
				len = c.columns,
				vars = wo.resizable_vars;
			vars.storedSizes = [];
			for ( column = 0; column < len; column++ ) {
				$header = c.$headerIndexed[ column ];
				vars.storedSizes[ column ] = $header.is(':visible') ? $header.width() : 0;
			}
		},

		setWidth : function( $el, width, overflow ) {
			// overflow tables need min & max width set as well
			$el.css({
				'width' : width,
				'min-width' : overflow ? width : '',
				'max-width' : overflow ? width : ''
			});
		},

		setWidths : function( c, wo, storedSizes ) {
			var column, $temp,
				vars = wo.resizable_vars,
				$extra = $( c.namespace + '_extra_headers' ),
				$col = c.$table.children( 'colgroup' ).children( 'col' );
			storedSizes = storedSizes || vars.storedSizes || [];
			// process only if table ID or url match
			if ( storedSizes.length ) {
				for ( column = 0; column < c.columns; column++ ) {
					// set saved resizable widths
					ts.resizable.setWidth( c.$headerIndexed[ column ], storedSizes[ column ], vars.overflow );
					if ( $extra.length ) {
						// stickyHeaders needs to modify min & max width as well
						$temp = $extra.eq( column ).add( $col.eq( column ) );
						ts.resizable.setWidth( $temp, storedSizes[ column ], vars.overflow );
					}
				}
				$temp = $( c.namespace + '_extra_table' );
				if ( $temp.length && !ts.hasWidget( c.table, 'scroller' ) ) {
					ts.resizable.setWidth( $temp, c.$table.outerWidth(), vars.overflow );
				}
			}
		},

		setHandlePosition : function( c, wo ) {
			var startPosition,
				tableHeight = c.$table.height(),
				$handles = wo.$resizable_container.children(),
				handleCenter = Math.floor( $handles.width() / 2 );

			if ( ts.hasWidget( c.table, 'scroller' ) ) {
				tableHeight = 0;
				c.$table.closest( '.' + ts.css.scrollerWrap ).children().each(function(){
					var $this = $(this);
					// center table has a max-height set
					tableHeight += $this.filter('[style*="height"]').length ? $this.height() : $this.children('table').height();
				});
			}

			if ( !wo.resizable_includeFooter && c.$table.children('tfoot').length ) {
				tableHeight -= c.$table.children('tfoot').height();
			}
			// subtract out table left position from resizable handles. Fixes #864
			startPosition = c.$table.position().left;
			$handles.each( function() {
				var $this = $(this),
					column = parseInt( $this.attr( 'data-column' ), 10 ),
					columns = c.columns - 1,
					$header = $this.data( 'header' );
				if ( !$header ) { return; } // see #859
				if (
					!$header.is(':visible') ||
					( !wo.resizable_addLastColumn && ts.resizable.checkVisibleColumns(c, column) )
				) {
					$this.hide();
				} else if ( column < columns || column === columns && wo.resizable_addLastColumn ) {
					$this.css({
						display: 'inline-block',
						height : tableHeight,
						left : $header.position().left - startPosition + $header.outerWidth() - handleCenter
					});
				}
			});
		},

		// Fixes #1485
		checkVisibleColumns: function( c, column ) {
			var i,
				len = 0;
			for ( i = column + 1; i < c.columns; i++ ) {
				len += c.$headerIndexed[i].is( ':visible' ) ? 1 : 0;
			}
			return len === 0;
		},

		// prevent text selection while dragging resize bar
		toggleTextSelection : function( c, wo, toggle ) {
			var namespace = c.namespace + 'tsresize';
			wo.resizable_vars.disabled = toggle;
			$( 'body' ).toggleClass( ts.css.resizableNoSelect, toggle );
			if ( toggle ) {
				$( 'body' )
					.attr( 'unselectable', 'on' )
					.bind( 'selectstart' + namespace, false );
			} else {
				$( 'body' )
					.removeAttr( 'unselectable' )
					.unbind( 'selectstart' + namespace );
			}
		},

		bindings : function( c, wo ) {
			var namespace = c.namespace + 'tsresize';
			wo.$resizable_container.children().bind( 'mousedown', function( event ) {
				// save header cell and mouse position
				var column,
					vars = wo.resizable_vars,
					$extras = $( c.namespace + '_extra_headers' ),
					$header = $( event.target ).data( 'header' );

				column = parseInt( $header.attr( 'data-column' ), 10 );
				vars.$target = $header = $header.add( $extras.filter('[data-column="' + column + '"]') );
				vars.target = column;

				// if table is not as wide as it's parent, then resize the table
				vars.$next = event.shiftKey || wo.resizable_targetLast ?
					$header.parent().children().not( '.resizable-false' ).filter( ':last' ) :
					$header.nextAll( ':not(.resizable-false)' ).eq( 0 );

				column = parseInt( vars.$next.attr( 'data-column' ), 10 );
				vars.$next = vars.$next.add( $extras.filter('[data-column="' + column + '"]') );
				vars.next = column;

				vars.mouseXPosition = event.pageX;
				ts.resizable.updateStoredSizes( c, wo );
				ts.resizable.toggleTextSelection(c, wo, true );
			});

			$( document )
				.bind( 'mousemove' + namespace, function( event ) {
					var vars = wo.resizable_vars;
					// ignore mousemove if no mousedown
					if ( !vars.disabled || vars.mouseXPosition === 0 || !vars.$target ) { return; }
					if ( wo.resizable_throttle ) {
						clearTimeout( vars.timer );
						vars.timer = setTimeout( function() {
							ts.resizable.mouseMove( c, wo, event );
						}, isNaN( wo.resizable_throttle ) ? 5 : wo.resizable_throttle );
					} else {
						ts.resizable.mouseMove( c, wo, event );
					}
				})
				.bind( 'mouseup' + namespace, function() {
					if (!wo.resizable_vars.disabled) { return; }
					ts.resizable.toggleTextSelection( c, wo, false );
					ts.resizable.stopResize( c, wo );
					ts.resizable.setHandlePosition( c, wo );
				});

			// resizeEnd event triggered by scroller widget
			$( window ).bind( 'resize' + namespace + ' resizeEnd' + namespace, function() {
				ts.resizable.setHandlePosition( c, wo );
			});

			// right click to reset columns to default widths
			c.$table
				.bind( 'columnUpdate pagerComplete resizableUpdate '.split( ' ' ).join( namespace + ' ' ), function() {
					ts.resizable.setHandlePosition( c, wo );
				})
				.bind( 'resizableReset' + namespace, function() {
					ts.resizableReset( c.table );
				})
				.find( 'thead:first' )
				.add( $( c.namespace + '_extra_table' ).find( 'thead:first' ) )
				.bind( 'contextmenu' + namespace, function() {
					// $.isEmptyObject() needs jQuery 1.4+; allow right click if already reset
					var allowClick = wo.resizable_vars.storedSizes.length === 0;
					ts.resizableReset( c.table );
					ts.resizable.setHandlePosition( c, wo );
					wo.resizable_vars.storedSizes = [];
					return allowClick;
				});

		},

		mouseMove : function( c, wo, event ) {
			if ( wo.resizable_vars.mouseXPosition === 0 || !wo.resizable_vars.$target ) { return; }
			// resize columns
			var column,
				total = 0,
				vars = wo.resizable_vars,
				$next = vars.$next,
				tar = vars.storedSizes[ vars.target ],
				leftEdge = event.pageX - vars.mouseXPosition;
			if ( vars.overflow ) {
				if ( tar + leftEdge > 0 ) {
					vars.storedSizes[ vars.target ] += leftEdge;
					ts.resizable.setWidth( vars.$target, vars.storedSizes[ vars.target ], true );
					// update the entire table width
					for ( column = 0; column < c.columns; column++ ) {
						total += vars.storedSizes[ column ];
					}
					ts.resizable.setWidth( c.$table.add( $( c.namespace + '_extra_table' ) ), total );
				}
				if ( !$next.length ) {
					// if expanding right-most column, scroll the wrapper
					vars.$wrap[0].scrollLeft = c.$table.width();
				}
			} else if ( vars.fullWidth ) {
				vars.storedSizes[ vars.target ] += leftEdge;
				vars.storedSizes[ vars.next ] -= leftEdge;
				ts.resizable.setWidths( c, wo );
			} else {
				vars.storedSizes[ vars.target ] += leftEdge;
				ts.resizable.setWidths( c, wo );
			}
			vars.mouseXPosition = event.pageX;
			// dynamically update sticky header widths
			c.$table.triggerHandler('stickyHeadersUpdate');
		},

		stopResize : function( c, wo ) {
			var vars = wo.resizable_vars;
			ts.resizable.updateStoredSizes( c, wo );
			if ( vars.useStorage ) {
				// save all column widths
				ts.storage( c.table, ts.css.resizableStorage, vars.storedSizes );
				ts.storage( c.table, 'tablesorter-table-resized-width', c.$table.width() );
			}
			vars.mouseXPosition = 0;
			vars.$target = vars.$next = null;
			// will update stickyHeaders, just in case, see #912
			c.$table.triggerHandler('stickyHeadersUpdate');
			c.$table.triggerHandler('resizableComplete');
		}
	};

	// this widget saves the column widths if
	// $.tablesorter.storage function is included
	// **************************
	ts.addWidget({
		id: 'resizable',
		priority: 40,
		options: {
			resizable : true, // save column widths to storage
			resizable_addLastColumn : false,
			resizable_includeFooter: true,
			resizable_widths : [],
			resizable_throttle : false, // set to true (5ms) or any number 0-10 range
			resizable_targetLast : false
		},
		init: function(table, thisWidget, c, wo) {
			ts.resizable.init( c, wo );
		},
		format: function( table, c, wo ) {
			ts.resizable.setHandlePosition( c, wo );
		},
		remove: function( table, c, wo, refreshing ) {
			if (wo.$resizable_container) {
				var namespace = c.namespace + 'tsresize';
				c.$table.add( $( c.namespace + '_extra_table' ) )
					.removeClass('hasResizable')
					.children( 'thead' )
					.unbind( 'contextmenu' + namespace );

				wo.$resizable_container.remove();
				ts.resizable.toggleTextSelection( c, wo, false );
				ts.resizableReset( table, refreshing );
				$( document ).unbind( 'mousemove' + namespace + ' mouseup' + namespace );
			}
		}
	});

	ts.resizableReset = function( table, refreshing ) {
		$( table ).each(function(){
			var index, $t,
				c = this.config,
				wo = c && c.widgetOptions,
				vars = wo.resizable_vars;
			if ( table && c && c.$headerIndexed.length ) {
				// restore the initial table width
				if ( vars.overflow && vars.tableWidth ) {
					ts.resizable.setWidth( c.$table, vars.tableWidth, true );
					if ( vars.useStorage ) {
						ts.storage( table, 'tablesorter-table-resized-width', 'auto' );
					}
				}
				for ( index = 0; index < c.columns; index++ ) {
					$t = c.$headerIndexed[ index ];
					if ( wo.resizable_widths && wo.resizable_widths[ index ] ) {
						ts.resizable.setWidth( $t, wo.resizable_widths[ index ], vars.overflow );
					} else if ( !$t.hasClass( 'resizable-false' ) ) {
						// don't clear the width of any column that is not resizable
						ts.resizable.setWidth( $t, '', vars.overflow );
					}
				}

				// reset stickyHeader widths
				c.$table.triggerHandler( 'stickyHeadersUpdate' );
				if ( ts.storage && !refreshing ) {
					ts.storage( this, ts.css.resizableStorage, {} );
				}
			}
		});
	};

})( jQuery, window );

/*! Widget: saveSort - updated 10/31/2015 (v2.24.0) *//*
* Requires tablesorter v2.16+
* by Rob Garrison
*/
;(function ($) {
	'use strict';
	var ts = $.tablesorter || {};

	// this widget saves the last sort only if the
	// saveSort widget option is true AND the
	// $.tablesorter.storage function is included
	// **************************
	ts.addWidget({
		id: 'saveSort',
		priority: 20,
		options: {
			saveSort : true
		},
		init: function(table, thisWidget, c, wo) {
			// run widget format before all other widgets are applied to the table
			thisWidget.format(table, c, wo, true);
		},
		format: function(table, c, wo, init) {
			var stored, time,
				$table = c.$table,
				saveSort = wo.saveSort !== false, // make saveSort active/inactive; default to true
				sortList = { 'sortList' : c.sortList };
			if (c.debug) {
				time = new Date();
			}
			if ($table.hasClass('hasSaveSort')) {
				if (saveSort && table.hasInitialized && ts.storage) {
					ts.storage( table, 'tablesorter-savesort', sortList );
					if (c.debug) {
						console.log('saveSort widget: Saving last sort: ' + c.sortList + ts.benchmark(time));
					}
				}
			} else {
				// set table sort on initial run of the widget
				$table.addClass('hasSaveSort');
				sortList = '';
				// get data
				if (ts.storage) {
					stored = ts.storage( table, 'tablesorter-savesort' );
					sortList = (stored && stored.hasOwnProperty('sortList') && $.isArray(stored.sortList)) ? stored.sortList : '';
					if (c.debug) {
						console.log('saveSort: Last sort loaded: "' + sortList + '"' + ts.benchmark(time));
					}
					$table.bind('saveSortReset', function(event) {
						event.stopPropagation();
						ts.storage( table, 'tablesorter-savesort', '' );
					});
				}
				// init is true when widget init is run, this will run this widget before all other widgets have initialized
				// this method allows using this widget in the original tablesorter plugin; but then it will run all widgets twice.
				if (init && sortList && sortList.length > 0) {
					c.sortList = sortList;
				} else if (table.hasInitialized && sortList && sortList.length > 0) {
					// update sort change
					ts.sortOn( c, sortList );
				}
			}
		},
		remove: function(table, c) {
			c.$table.removeClass('hasSaveSort');
			// clear storage
			if (ts.storage) { ts.storage( table, 'tablesorter-savesort', '' ); }
		}
	});

})(jQuery);

return jQuery.tablesorter;
}));


/***/ })

},[15]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWVyY01pc3Npb25JbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGFibGVzb3J0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RhYmxlc29ydGVyL2Rpc3QvanMvanF1ZXJ5LnRhYmxlc29ydGVyLmNvbWJpbmVkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLENBQUM7Ozs7Ozs7Ozs7OztBQ3RCRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUFvQztBQUNwQywyQkFBMkI7QUFDM0I7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdURBQXVELE1BQU07QUFDN0Q7QUFDQTs7QUFFQSx3QkFBd0IsUUFBUSxzQ0FBc0MsRUFBRSxRQUFRLGVBQWUsS0FBSztBQUNwRyxpRUFBaUUsaUJBQWlCLEVBQUU7QUFDcEYsd0RBQXdEOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLDREQUE0RDtBQUM1RCx3REFBd0QsbUJBQW1CO0FBQzNFLDJEQUEyRDtBQUMzRDs7QUFFQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFOztB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osNERBQTREO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsdUJBQXVCLFFBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFD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LEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSx1RUFBdUU7QUFDdkUsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSwrRUFBK0U7QUFDL0U7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaURBQWlEO0FBQ3JFO0FBQ0EsRUFBRTs7QUFFRixDQUFDOztBQUVEO0FBQ0EsQ0FBQyIsImZpbGUiOiJqcy9tZXJjTWlzc2lvbkluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xucmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5jb25zdCB0YWJsZXNvcnRlciA9IHJlcXVpcmUoJy4vdGFibGVzb3J0ZXInKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICQoJyNtZXJjbWlzc2lvbi1saXN0JykudGFibGVzb3J0ZXIodGFibGVzb3J0ZXIuc2V0dGluZ3Moe1xuICAgICAgICB3aWRnZXRzOiBbJ2ZpbHRlciddLFxuICAgICAgICB3aWRnZXRPcHRpb25zOiB7XG4gICAgICAgICAgICBmaWx0ZXJfY29sdW1uRmlsdGVyczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICB9KSk7XG5cbiAgICAkKCcjZGVsZXRlLW1pc3Npb24nKS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSAkKGV2ZW50LnJlbGF0ZWRUYXJnZXQpO1xuICAgICAgICBjb25zdCBtaXNzaW9uTmFtZSA9IGJ1dHRvbi5kYXRhKCdtaXNzaW9uLW5hbWUnKTtcbiAgICAgICAgY29uc3QgbWlzc2lvbkRlbGV0ZVVybCA9IGJ1dHRvbi5kYXRhKCdtaXNzaW9uLWRlbGV0ZS1wYXRoJyk7XG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSAkKHRoaXMpO1xuICAgICAgICBtb2RhbC5maW5kKCcuZGVsZXRlLW5hbWUnKS50ZXh0KG1pc3Npb25OYW1lKTtcbiAgICAgICAgbW9kYWwuZmluZCgnLmRlbGV0ZS1saW5rJykuYXR0cignaHJlZicsIG1pc3Npb25EZWxldGVVcmwpO1xuICAgIH0pO1xuXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXNzZXRzL2pzL21lcmNNaXNzaW9uSW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJ3RhYmxlc29ydGVyJyk7XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRoZW1lOiAnYm9vdHN0cmFwJyxcbiAgICBzb3J0UmVzZXQ6IHRydWUsXG4gICAgZGVidWc6IHRydWUsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dGluZ3MoY3VzdG9tID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGN1c3RvbSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0cy9qcy90YWJsZXNvcnRlci5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiIsIi8qISB0YWJsZXNvcnRlciAoRk9SSykgLSB1cGRhdGVkIDAxLTEwLTIwMTggKHYyLjI5LjMpKi9cbi8qIEluY2x1ZGVzIHdpZGdldHMgKCBzdG9yYWdlLHVpdGhlbWUsY29sdW1ucyxmaWx0ZXIsc3RpY2t5SGVhZGVycyxyZXNpemFibGUsc2F2ZVNvcnQgKSAqL1xuKGZ1bmN0aW9uKGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTtcblx0fSBlbHNlIHtcblx0XHRmYWN0b3J5KGpRdWVyeSk7XG5cdH1cbn0oZnVuY3Rpb24oalF1ZXJ5KSB7XG5cbi8qISBUYWJsZVNvcnRlciAoRk9SSykgdjIuMjkuMyAqLy8qXG4qIENsaWVudC1zaWRlIHRhYmxlIHNvcnRpbmcgd2l0aCBlYXNlIVxuKiBAcmVxdWlyZXMgalF1ZXJ5IHYxLjIuNitcbipcbiogQ29weXJpZ2h0IChjKSAyMDA3IENocmlzdGlhbiBCYWNoXG4qIGZvcmsgbWFpbnRhaW5lZCBieSBSb2IgR2Fycmlzb25cbipcbiogRXhhbXBsZXMgYW5kIG9yaWdpbmFsIGRvY3MgYXQ6IGh0dHA6Ly90YWJsZXNvcnRlci5jb21cbiogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgbGljZW5zZXM6XG4qIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4qIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwuaHRtbFxuKlxuKiBAdHlwZSBqUXVlcnlcbiogQG5hbWUgdGFibGVzb3J0ZXIgKEZPUkspXG4qIEBjYXQgUGx1Z2lucy9UYWJsZXNvcnRlclxuKiBAYXV0aG9yIENocmlzdGlhbiBCYWNoIC0gY2hyaXN0aWFuLmJhY2hAcG9seWVzdGVyLnNlXG4qIEBjb250cmlidXRvciBSb2IgR2Fycmlzb24gLSBodHRwczovL2dpdGh1Yi5jb20vTW90dGllL3RhYmxlc29ydGVyXG4qIEBkb2NzIChmb3JrKSAtIGh0dHBzOi8vbW90dGllLmdpdGh1Yi5pby90YWJsZXNvcnRlci9kb2NzL1xuKi9cbi8qanNoaW50IGJyb3dzZXI6dHJ1ZSwganF1ZXJ5OnRydWUsIHVudXNlZDpmYWxzZSwgZXhwcjogdHJ1ZSAqL1xuOyggZnVuY3Rpb24oICQgKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIHRzID0gJC50YWJsZXNvcnRlciA9IHtcblxuXHRcdHZlcnNpb24gOiAnMi4yOS4zJyxcblxuXHRcdHBhcnNlcnMgOiBbXSxcblx0XHR3aWRnZXRzIDogW10sXG5cdFx0ZGVmYXVsdHMgOiB7XG5cblx0XHRcdC8vICoqKiBhcHBlYXJhbmNlXG5cdFx0XHR0aGVtZSAgICAgICAgICAgIDogJ2RlZmF1bHQnLCAgLy8gYWRkcyB0YWJsZXNvcnRlci17dGhlbWV9IHRvIHRoZSB0YWJsZSBmb3Igc3R5bGluZ1xuXHRcdFx0d2lkdGhGaXhlZCAgICAgICA6IGZhbHNlLCAgICAgIC8vIGFkZHMgY29sZ3JvdXAgdG8gZml4IHdpZHRocyBvZiBjb2x1bW5zXG5cdFx0XHRzaG93UHJvY2Vzc2luZyAgIDogZmFsc2UsICAgICAgLy8gc2hvdyBhbiBpbmRldGVybWluYXRlIHRpbWVyIGljb24gaW4gdGhlIGhlYWRlciB3aGVuIHRoZSB0YWJsZSBpcyBzb3J0ZWQgb3IgZmlsdGVyZWQuXG5cblx0XHRcdGhlYWRlclRlbXBsYXRlICAgOiAne2NvbnRlbnR9JywvLyBoZWFkZXIgbGF5b3V0IHRlbXBsYXRlIChIVE1MIG9rKTsge2NvbnRlbnR9ID0gaW5uZXJIVE1MLCB7aWNvbn0gPSA8aS8+IC8vIGNsYXNzIGZyb20gY3NzSWNvblxuXHRcdFx0b25SZW5kZXJUZW1wbGF0ZSA6IG51bGwsICAgICAgIC8vIGZ1bmN0aW9uKCBpbmRleCwgdGVtcGxhdGUgKXsgcmV0dXJuIHRlbXBsYXRlOyB9LCAvLyB0ZW1wbGF0ZSBpcyBhIHN0cmluZ1xuXHRcdFx0b25SZW5kZXJIZWFkZXIgICA6IG51bGwsICAgICAgIC8vIGZ1bmN0aW9uKCBpbmRleCApe30sIC8vIG5vdGhpbmcgdG8gcmV0dXJuXG5cblx0XHRcdC8vICoqKiBmdW5jdGlvbmFsaXR5XG5cdFx0XHRjYW5jZWxTZWxlY3Rpb24gIDogdHJ1ZSwgICAgICAgLy8gcHJldmVudCB0ZXh0IHNlbGVjdGlvbiBpbiB0aGUgaGVhZGVyXG5cdFx0XHR0YWJJbmRleCAgICAgICAgIDogdHJ1ZSwgICAgICAgLy8gYWRkIHRhYmluZGV4IHRvIGhlYWRlciBmb3Iga2V5Ym9hcmQgYWNjZXNzaWJpbGl0eVxuXHRcdFx0ZGF0ZUZvcm1hdCAgICAgICA6ICdtbWRkeXl5eScsIC8vIG90aGVyIG9wdGlvbnM6ICdkZG1teXl5JyBvciAneXl5eW1tZGQnXG5cdFx0XHRzb3J0TXVsdGlTb3J0S2V5IDogJ3NoaWZ0S2V5JywgLy8ga2V5IHVzZWQgdG8gc2VsZWN0IGFkZGl0aW9uYWwgY29sdW1uc1xuXHRcdFx0c29ydFJlc2V0S2V5ICAgICA6ICdjdHJsS2V5JywgIC8vIGtleSB1c2VkIHRvIHJlbW92ZSBzb3J0aW5nIG9uIGEgY29sdW1uXG5cdFx0XHR1c051bWJlckZvcm1hdCAgIDogdHJ1ZSwgICAgICAgLy8gZmFsc2UgZm9yIEdlcm1hbiAnMS4yMzQuNTY3LDg5JyBvciBGcmVuY2ggJzEgMjM0IDU2Nyw4OSdcblx0XHRcdGRlbGF5SW5pdCAgICAgICAgOiBmYWxzZSwgICAgICAvLyBpZiBmYWxzZSwgdGhlIHBhcnNlZCB0YWJsZSBjb250ZW50cyB3aWxsIG5vdCB1cGRhdGUgdW50aWwgdGhlIGZpcnN0IHNvcnRcblx0XHRcdHNlcnZlclNpZGVTb3J0aW5nOiBmYWxzZSwgICAgICAvLyBpZiB0cnVlLCBzZXJ2ZXItc2lkZSBzb3J0aW5nIHNob3VsZCBiZSBwZXJmb3JtZWQgYmVjYXVzZSBjbGllbnQtc2lkZSBzb3J0aW5nIHdpbGwgYmUgZGlzYWJsZWQsIGJ1dCB0aGUgdWkgYW5kIGV2ZW50cyB3aWxsIHN0aWxsIGJlIHVzZWQuXG5cdFx0XHRyZXNvcnQgICAgICAgICAgIDogdHJ1ZSwgICAgICAgLy8gZGVmYXVsdCBzZXR0aW5nIHRvIHRyaWdnZXIgYSByZXNvcnQgYWZ0ZXIgYW4gJ3VwZGF0ZScsICdhZGRSb3dzJywgJ3VwZGF0ZUNlbGwnLCBldGMgaGFzIGNvbXBsZXRlZFxuXG5cdFx0XHQvLyAqKiogc29ydCBvcHRpb25zXG5cdFx0XHRoZWFkZXJzICAgICAgICAgIDoge30sICAgICAgICAgLy8gc2V0IHNvcnRlciwgc3RyaW5nLCBlbXB0eSwgbG9ja2VkIG9yZGVyLCBzb3J0SW5pdGlhbE9yZGVyLCBmaWx0ZXIsIGV0Yy5cblx0XHRcdGlnbm9yZUNhc2UgICAgICAgOiB0cnVlLCAgICAgICAvLyBpZ25vcmUgY2FzZSB3aGlsZSBzb3J0aW5nXG5cdFx0XHRzb3J0Rm9yY2UgICAgICAgIDogbnVsbCwgICAgICAgLy8gY29sdW1uKHMpIGZpcnN0IHNvcnRlZDsgYWx3YXlzIGFwcGxpZWRcblx0XHRcdHNvcnRMaXN0ICAgICAgICAgOiBbXSwgICAgICAgICAvLyBJbml0aWFsIHNvcnQgb3JkZXI7IGFwcGxpZWQgaW5pdGlhbGx5OyB1cGRhdGVkIHdoZW4gbWFudWFsbHkgc29ydGVkXG5cdFx0XHRzb3J0QXBwZW5kICAgICAgIDogbnVsbCwgICAgICAgLy8gY29sdW1uKHMpIHNvcnRlZCBsYXN0OyBhbHdheXMgYXBwbGllZFxuXHRcdFx0c29ydFN0YWJsZSAgICAgICA6IGZhbHNlLCAgICAgIC8vIHdoZW4gc29ydGluZyB0d28gcm93cyB3aXRoIGV4YWN0bHkgdGhlIHNhbWUgY29udGVudCwgdGhlIG9yaWdpbmFsIHNvcnQgb3JkZXIgaXMgbWFpbnRhaW5lZFxuXG5cdFx0XHRzb3J0SW5pdGlhbE9yZGVyIDogJ2FzYycsICAgICAgLy8gc29ydCBkaXJlY3Rpb24gb24gZmlyc3QgY2xpY2tcblx0XHRcdHNvcnRMb2NhbGVDb21wYXJlOiBmYWxzZSwgICAgICAvLyByZXBsYWNlIGVxdWl2YWxlbnQgY2hhcmFjdGVyIChhY2NlbnRlZCBjaGFyYWN0ZXJzKVxuXHRcdFx0c29ydFJlc2V0ICAgICAgICA6IGZhbHNlLCAgICAgIC8vIHRoaXJkIGNsaWNrIG9uIHRoZSBoZWFkZXIgd2lsbCByZXNldCBjb2x1bW4gdG8gZGVmYXVsdCAtIHVuc29ydGVkXG5cdFx0XHRzb3J0UmVzdGFydCAgICAgIDogZmFsc2UsICAgICAgLy8gcmVzdGFydCBzb3J0IHRvICdzb3J0SW5pdGlhbE9yZGVyJyB3aGVuIGNsaWNraW5nIG9uIHByZXZpb3VzbHkgdW5zb3J0ZWQgY29sdW1uc1xuXG5cdFx0XHRlbXB0eVRvICAgICAgICAgIDogJ2JvdHRvbScsICAgLy8gc29ydCBlbXB0eSBjZWxsIHRvIGJvdHRvbSwgdG9wLCBub25lLCB6ZXJvLCBlbXB0eU1heCwgZW1wdHlNaW5cblx0XHRcdHN0cmluZ1RvICAgICAgICAgOiAnbWF4JywgICAgICAvLyBzb3J0IHN0cmluZ3MgaW4gbnVtZXJpY2FsIGNvbHVtbiBhcyBtYXgsIG1pbiwgdG9wLCBib3R0b20sIHplcm9cblx0XHRcdGR1cGxpY2F0ZVNwYW4gICAgOiB0cnVlLCAgICAgICAvLyBjb2xzcGFuIGNlbGxzIGluIHRoZSB0Ym9keSB3aWxsIGhhdmUgZHVwbGljYXRlZCBjb250ZW50IGluIHRoZSBjYWNoZSBmb3IgZWFjaCBzcGFubmVkIGNvbHVtblxuXHRcdFx0dGV4dEV4dHJhY3Rpb24gICA6ICdiYXNpYycsICAgIC8vIHRleHQgZXh0cmFjdGlvbiBtZXRob2QvZnVuY3Rpb24gLSBmdW5jdGlvbiggbm9kZSwgdGFibGUsIGNlbGxJbmRleCApe31cblx0XHRcdHRleHRBdHRyaWJ1dGUgICAgOiAnZGF0YS10ZXh0JywvLyBkYXRhLWF0dHJpYnV0ZSB0aGF0IGNvbnRhaW5zIGFsdGVybmF0ZSBjZWxsIHRleHQgKHVzZWQgaW4gZGVmYXVsdCB0ZXh0RXh0cmFjdGlvbiBmdW5jdGlvbilcblx0XHRcdHRleHRTb3J0ZXIgICAgICAgOiBudWxsLCAgICAgICAvLyBjaG9vc2Ugb3ZlcmFsbCBvciBzcGVjaWZpYyBjb2x1bW4gc29ydGVyIGZ1bmN0aW9uKCBhLCBiLCBkaXJlY3Rpb24sIHRhYmxlLCBjb2x1bW5JbmRleCApIFthbHQ6IHRzLnNvcnRUZXh0XVxuXHRcdFx0bnVtYmVyU29ydGVyICAgICA6IG51bGwsICAgICAgIC8vIGNob29zZSBvdmVyYWxsIG51bWVyaWMgc29ydGVyIGZ1bmN0aW9uKCBhLCBiLCBkaXJlY3Rpb24sIG1heENvbHVtblZhbHVlIClcblxuXHRcdFx0Ly8gKioqIHdpZGdldCBvcHRpb25zXG5cdFx0XHRpbml0V2lkZ2V0cyAgICAgIDogdHJ1ZSwgICAgICAgLy8gYXBwbHkgd2lkZ2V0cyBvbiB0YWJsZXNvcnRlciBpbml0aWFsaXphdGlvblxuXHRcdFx0d2lkZ2V0Q2xhc3MgICAgICA6ICd3aWRnZXQte25hbWV9JywgLy8gdGFibGUgY2xhc3MgbmFtZSB0ZW1wbGF0ZSB0byBtYXRjaCB0byBpbmNsdWRlIGEgd2lkZ2V0XG5cdFx0XHR3aWRnZXRzICAgICAgICAgIDogW10sICAgICAgICAgLy8gbWV0aG9kIHRvIGFkZCB3aWRnZXRzLCBlLmcuIHdpZGdldHM6IFsnemVicmEnXVxuXHRcdFx0d2lkZ2V0T3B0aW9ucyAgICA6IHtcblx0XHRcdFx0emVicmEgOiBbICdldmVuJywgJ29kZCcgXSAgLy8gemVicmEgd2lkZ2V0IGFsdGVybmF0aW5nIHJvdyBjbGFzcyBuYW1lc1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gKioqIGNhbGxiYWNrc1xuXHRcdFx0aW5pdGlhbGl6ZWQgICAgICA6IG51bGwsICAgICAgIC8vIGZ1bmN0aW9uKCB0YWJsZSApe30sXG5cblx0XHRcdC8vICoqKiBleHRyYSBjc3MgY2xhc3MgbmFtZXNcblx0XHRcdHRhYmxlQ2xhc3MgICAgICAgOiAnJyxcblx0XHRcdGNzc0FzYyAgICAgICAgICAgOiAnJyxcblx0XHRcdGNzc0Rlc2MgICAgICAgICAgOiAnJyxcblx0XHRcdGNzc05vbmUgICAgICAgICAgOiAnJyxcblx0XHRcdGNzc0hlYWRlciAgICAgICAgOiAnJyxcblx0XHRcdGNzc0hlYWRlclJvdyAgICAgOiAnJyxcblx0XHRcdGNzc1Byb2Nlc3NpbmcgICAgOiAnJywgLy8gcHJvY2Vzc2luZyBpY29uIGFwcGxpZWQgdG8gaGVhZGVyIGR1cmluZyBzb3J0L2ZpbHRlclxuXG5cdFx0XHRjc3NDaGlsZFJvdyAgICAgIDogJ3RhYmxlc29ydGVyLWNoaWxkUm93JywgLy8gY2xhc3MgbmFtZSBpbmRpY2lhdGluZyB0aGF0IGEgcm93IGlzIHRvIGJlIGF0dGFjaGVkIHRvIGl0cyBwYXJlbnRcblx0XHRcdGNzc0luZm9CbG9jayAgICAgOiAndGFibGVzb3J0ZXItaW5mb09ubHknLCAvLyBkb24ndCBzb3J0IHRib2R5IHdpdGggdGhpcyBjbGFzcyBuYW1lIChvbmx5IG9uZSBjbGFzcyBuYW1lIGFsbG93ZWQgaGVyZSEpXG5cdFx0XHRjc3NOb1NvcnQgICAgICAgIDogJ3RhYmxlc29ydGVyLW5vU29ydCcsICAgLy8gY2xhc3MgbmFtZSBhZGRlZCB0byBlbGVtZW50IGluc2lkZSBoZWFkZXI7IGNsaWNraW5nIG9uIGl0IHdvbid0IGNhdXNlIGEgc29ydFxuXHRcdFx0Y3NzSWdub3JlUm93ICAgICA6ICd0YWJsZXNvcnRlci1pZ25vcmVSb3cnLC8vIGhlYWRlciByb3cgdG8gaWdub3JlOyBjZWxscyB3aXRoaW4gdGhpcyByb3cgd2lsbCBub3QgYmUgYWRkZWQgdG8gYy4kaGVhZGVyc1xuXG5cdFx0XHRjc3NJY29uICAgICAgICAgIDogJ3RhYmxlc29ydGVyLWljb24nLCAvLyBpZiB0aGlzIGNsYXNzIGRvZXMgbm90IGV4aXN0LCB0aGUge2ljb259IHdpbGwgbm90IGJlIGFkZGVkIGZyb20gdGhlIGhlYWRlclRlbXBsYXRlXG5cdFx0XHRjc3NJY29uTm9uZSAgICAgIDogJycsIC8vIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGljb24gd2hlbiB0aGVyZSBpcyBubyBjb2x1bW4gc29ydFxuXHRcdFx0Y3NzSWNvbkFzYyAgICAgICA6ICcnLCAvLyBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBpY29uIHdoZW4gdGhlIGNvbHVtbiBoYXMgYW4gYXNjZW5kaW5nIHNvcnRcblx0XHRcdGNzc0ljb25EZXNjICAgICAgOiAnJywgLy8gY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgaWNvbiB3aGVuIHRoZSBjb2x1bW4gaGFzIGEgZGVzY2VuZGluZyBzb3J0XG5cdFx0XHRjc3NJY29uRGlzYWJsZWQgIDogJycsIC8vIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGljb24gd2hlbiB0aGUgY29sdW1uIGhhcyBhIGRpc2FibGVkIHNvcnRcblxuXHRcdFx0Ly8gKioqIGV2ZW50c1xuXHRcdFx0cG9pbnRlckNsaWNrICAgICA6ICdjbGljaycsXG5cdFx0XHRwb2ludGVyRG93biAgICAgIDogJ21vdXNlZG93bicsXG5cdFx0XHRwb2ludGVyVXAgICAgICAgIDogJ21vdXNldXAnLFxuXG5cdFx0XHQvLyAqKiogc2VsZWN0b3JzXG5cdFx0XHRzZWxlY3RvckhlYWRlcnMgIDogJz4gdGhlYWQgdGgsID4gdGhlYWQgdGQnLFxuXHRcdFx0c2VsZWN0b3JTb3J0ICAgICA6ICd0aCwgdGQnLCAvLyBqUXVlcnkgc2VsZWN0b3Igb2YgY29udGVudCB3aXRoaW4gc2VsZWN0b3JIZWFkZXJzIHRoYXQgaXMgY2xpY2thYmxlIHRvIHRyaWdnZXIgYSBzb3J0XG5cdFx0XHRzZWxlY3RvclJlbW92ZSAgIDogJy5yZW1vdmUtbWUnLFxuXG5cdFx0XHQvLyAqKiogYWR2YW5jZWRcblx0XHRcdGRlYnVnICAgICAgICAgICAgOiBmYWxzZSxcblxuXHRcdFx0Ly8gKioqIEludGVybmFsIHZhcmlhYmxlc1xuXHRcdFx0aGVhZGVyTGlzdDogW10sXG5cdFx0XHRlbXB0aWVzOiB7fSxcblx0XHRcdHN0cmluZ3M6IHt9LFxuXHRcdFx0cGFyc2VyczogW10sXG5cblx0XHRcdC8vICoqKiBwYXJzZXIgb3B0aW9ucyBmb3IgdmFsaWRhdG9yOyB2YWx1ZXMgbXVzdCBiZSBmYWxzeSFcblx0XHRcdGdsb2JhbGl6ZTogMCxcblx0XHRcdGltZ0F0dHI6IDBcblxuXHRcdFx0Ly8gcmVtb3ZlZDogd2lkZ2V0WmVicmE6IHsgY3NzOiBbJ2V2ZW4nLCAnb2RkJ10gfVxuXG5cdFx0fSxcblxuXHRcdC8vIGludGVybmFsIGNzcyBjbGFzc2VzIC0gdGhlc2Ugd2lsbCBBTFdBWVMgYmUgYWRkZWQgdG9cblx0XHQvLyB0aGUgdGFibGUgYW5kIE1VU1Qgb25seSBjb250YWluIG9uZSBjbGFzcyBuYW1lIC0gZml4ZXMgIzM4MVxuXHRcdGNzcyA6IHtcblx0XHRcdHRhYmxlICAgICAgOiAndGFibGVzb3J0ZXInLFxuXHRcdFx0Y3NzSGFzQ2hpbGQ6ICd0YWJsZXNvcnRlci1oYXNDaGlsZFJvdycsXG5cdFx0XHRjaGlsZFJvdyAgIDogJ3RhYmxlc29ydGVyLWNoaWxkUm93Jyxcblx0XHRcdGNvbGdyb3VwICAgOiAndGFibGVzb3J0ZXItY29sZ3JvdXAnLFxuXHRcdFx0aGVhZGVyICAgICA6ICd0YWJsZXNvcnRlci1oZWFkZXInLFxuXHRcdFx0aGVhZGVyUm93ICA6ICd0YWJsZXNvcnRlci1oZWFkZXJSb3cnLFxuXHRcdFx0aGVhZGVySW4gICA6ICd0YWJsZXNvcnRlci1oZWFkZXItaW5uZXInLFxuXHRcdFx0aWNvbiAgICAgICA6ICd0YWJsZXNvcnRlci1pY29uJyxcblx0XHRcdHByb2Nlc3NpbmcgOiAndGFibGVzb3J0ZXItcHJvY2Vzc2luZycsXG5cdFx0XHRzb3J0QXNjICAgIDogJ3RhYmxlc29ydGVyLWhlYWRlckFzYycsXG5cdFx0XHRzb3J0RGVzYyAgIDogJ3RhYmxlc29ydGVyLWhlYWRlckRlc2MnLFxuXHRcdFx0c29ydE5vbmUgICA6ICd0YWJsZXNvcnRlci1oZWFkZXJVblNvcnRlZCdcblx0XHR9LFxuXG5cdFx0Ly8gbGFiZWxzIGFwcGxpZWQgdG8gc29ydGFibGUgaGVhZGVycyBmb3IgYWNjZXNzaWJpbGl0eSAoYXJpYSkgc3VwcG9ydFxuXHRcdGxhbmd1YWdlIDoge1xuXHRcdFx0c29ydEFzYyAgICAgIDogJ0FzY2VuZGluZyBzb3J0IGFwcGxpZWQsICcsXG5cdFx0XHRzb3J0RGVzYyAgICAgOiAnRGVzY2VuZGluZyBzb3J0IGFwcGxpZWQsICcsXG5cdFx0XHRzb3J0Tm9uZSAgICAgOiAnTm8gc29ydCBhcHBsaWVkLCAnLFxuXHRcdFx0c29ydERpc2FibGVkIDogJ3NvcnRpbmcgaXMgZGlzYWJsZWQnLFxuXHRcdFx0bmV4dEFzYyAgICAgIDogJ2FjdGl2YXRlIHRvIGFwcGx5IGFuIGFzY2VuZGluZyBzb3J0Jyxcblx0XHRcdG5leHREZXNjICAgICA6ICdhY3RpdmF0ZSB0byBhcHBseSBhIGRlc2NlbmRpbmcgc29ydCcsXG5cdFx0XHRuZXh0Tm9uZSAgICAgOiAnYWN0aXZhdGUgdG8gcmVtb3ZlIHRoZSBzb3J0J1xuXHRcdH0sXG5cblx0XHRyZWdleCA6IHtcblx0XHRcdHRlbXBsYXRlQ29udGVudCA6IC9cXHtjb250ZW50XFx9L2csXG5cdFx0XHR0ZW1wbGF0ZUljb24gICAgOiAvXFx7aWNvblxcfS9nLFxuXHRcdFx0dGVtcGxhdGVOYW1lICAgIDogL1xce25hbWVcXH0vaSxcblx0XHRcdHNwYWNlcyAgICAgICAgICA6IC9cXHMrL2csXG5cdFx0XHRub25Xb3JkICAgICAgICAgOiAvXFxXL2csXG5cdFx0XHRmb3JtRWxlbWVudHMgICAgOiAvKGlucHV0fHNlbGVjdHxidXR0b258dGV4dGFyZWEpL2ksXG5cblx0XHRcdC8vICoqKiBzb3J0IGZ1bmN0aW9ucyAqKipcblx0XHRcdC8vIHJlZ2V4IHVzZWQgaW4gbmF0dXJhbCBzb3J0XG5cdFx0XHQvLyBjaHVuay90b2tlbml6ZSBudW1iZXJzICYgbGV0dGVyc1xuXHRcdFx0Y2h1bmsgIDogLyheKFsrXFwtXT8oPzpcXGQqKSg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/KT8kfF4weFswLTlhLWZdKyR8XFxkKykvZ2ksXG5cdFx0XHQvLyByZXBsYWNlIGNodW5rcyBAIGVuZHNcblx0XHRcdGNodW5rcyA6IC8oXlxcXFwwfFxcXFwwJCkvLFxuXHRcdFx0aGV4ICAgIDogL14weFswLTlhLWZdKyQvaSxcblxuXHRcdFx0Ly8gKioqIGZvcm1hdEZsb2F0ICoqKlxuXHRcdFx0Y29tbWEgICAgICAgICAgICAgICAgOiAvLC9nLFxuXHRcdFx0ZGlnaXROb25VUyAgICAgICAgICAgOiAvW1xcc3xcXC5dL2csXG5cdFx0XHRkaWdpdE5lZ2F0aXZlVGVzdCAgICA6IC9eXFxzKlxcKFsuXFxkXStcXCkvLFxuXHRcdFx0ZGlnaXROZWdhdGl2ZVJlcGxhY2UgOiAvXlxccypcXCgoWy5cXGRdKylcXCkvLFxuXG5cdFx0XHQvLyAqKiogaXNEaWdpdCAqKipcblx0XHRcdGRpZ2l0VGVzdCAgICA6IC9eW1xcLSsoXT9cXGQrWyldPyQvLFxuXHRcdFx0ZGlnaXRSZXBsYWNlIDogL1ssLidcIlxcc10vZ1xuXG5cdFx0fSxcblxuXHRcdC8vIGRpZ2l0IHNvcnQsIHRleHQgbG9jYXRpb25cblx0XHRzdHJpbmcgOiB7XG5cdFx0XHRtYXggICAgICA6IDEsXG5cdFx0XHRtaW4gICAgICA6IC0xLFxuXHRcdFx0ZW1wdHltaW4gOiAxLFxuXHRcdFx0ZW1wdHltYXggOiAtMSxcblx0XHRcdHplcm8gICAgIDogMCxcblx0XHRcdG5vbmUgICAgIDogMCxcblx0XHRcdCdudWxsJyAgIDogMCxcblx0XHRcdHRvcCAgICAgIDogdHJ1ZSxcblx0XHRcdGJvdHRvbSAgIDogZmFsc2Vcblx0XHR9LFxuXG5cdFx0a2V5Q29kZXMgOiB7XG5cdFx0XHRlbnRlciA6IDEzXG5cdFx0fSxcblxuXHRcdC8vIHBsYWNlaG9sZGVyIGRhdGUgcGFyc2VyIGRhdGEgKGdsb2JhbGl6ZSlcblx0XHRkYXRlcyA6IHt9LFxuXG5cdFx0Ly8gVGhlc2UgbWV0aG9kcyBjYW4gYmUgYXBwbGllZCBvbiB0YWJsZS5jb25maWcgaW5zdGFuY2Vcblx0XHRpbnN0YW5jZU1ldGhvZHMgOiB7fSxcblxuXHRcdC8qXG5cdFx04paE4paI4paI4paI4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWiCDilojilojilojilojilojilogg4paI4paIICDilojilogg4paI4paI4paI4paI4paI4paEXG5cdFx04paA4paI4paEICAgIOKWiOKWiOKWhOKWhCAgICAg4paI4paIICAg4paI4paIICDilojilogg4paI4paI4paE4paE4paI4paIXG5cdFx0ICAg4paA4paI4paEIOKWiOKWiOKWgOKWgCAgICAg4paI4paIICAg4paI4paIICDilojilogg4paI4paI4paA4paA4paAXG5cdFx04paI4paI4paI4paI4paI4paAIOKWiOKWiOKWiOKWiOKWiOKWiCAgIOKWiOKWiCAgIOKWgOKWiOKWiOKWiOKWiOKWgCDilojilohcblx0XHQqL1xuXG5cdFx0c2V0dXAgOiBmdW5jdGlvbiggdGFibGUsIGMgKSB7XG5cdFx0XHQvLyBpZiBubyB0aGVhZCBvciB0Ym9keSwgb3IgdGFibGVzb3J0ZXIgaXMgYWxyZWFkeSBwcmVzZW50LCBxdWl0XG5cdFx0XHRpZiAoICF0YWJsZSB8fCAhdGFibGUudEhlYWQgfHwgdGFibGUudEJvZGllcy5sZW5ndGggPT09IDAgfHwgdGFibGUuaGFzSW5pdGlhbGl6ZWQgPT09IHRydWUgKSB7XG5cdFx0XHRcdGlmICggYy5kZWJ1ZyApIHtcblx0XHRcdFx0XHRpZiAoIHRhYmxlLmhhc0luaXRpYWxpemVkICkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCAnU3RvcHBpbmcgaW5pdGlhbGl6YXRpb24uIFRhYmxlc29ydGVyIGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWQnICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdTdG9wcGluZyBpbml0aWFsaXphdGlvbiEgTm8gdGFibGUsIHRoZWFkIG9yIHRib2R5JywgdGFibGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdG1wID0gJycsXG5cdFx0XHRcdCR0YWJsZSA9ICQoIHRhYmxlICksXG5cdFx0XHRcdG1ldGEgPSAkLm1ldGFkYXRhO1xuXHRcdFx0Ly8gaW5pdGlhbGl6YXRpb24gZmxhZ1xuXHRcdFx0dGFibGUuaGFzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblx0XHRcdC8vIHRhYmxlIGlzIGJlaW5nIHByb2Nlc3NlZCBmbGFnXG5cdFx0XHR0YWJsZS5pc1Byb2Nlc3NpbmcgPSB0cnVlO1xuXHRcdFx0Ly8gbWFrZSBzdXJlIHRvIHN0b3JlIHRoZSBjb25maWcgb2JqZWN0XG5cdFx0XHR0YWJsZS5jb25maWcgPSBjO1xuXHRcdFx0Ly8gc2F2ZSB0aGUgc2V0dGluZ3Mgd2hlcmUgdGhleSByZWFkXG5cdFx0XHQkLmRhdGEoIHRhYmxlLCAndGFibGVzb3J0ZXInLCBjICk7XG5cdFx0XHRpZiAoIGMuZGVidWcgKSB7XG5cdFx0XHRcdGNvbnNvbGVbIGNvbnNvbGUuZ3JvdXAgPyAnZ3JvdXAnIDogJ2xvZycgXSggJ0luaXRpYWxpemluZyB0YWJsZXNvcnRlciB2JyArIHRzLnZlcnNpb24gKTtcblx0XHRcdFx0JC5kYXRhKCB0YWJsZSwgJ3N0YXJ0b3ZlcmFsbHRpbWVyJywgbmV3IERhdGUoKSApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmluZyB0aGlzIGluIHZlcnNpb24gMyAob25seSBzdXBwb3J0cyBqUXVlcnkgMS43Kylcblx0XHRcdGMuc3VwcG9ydHNEYXRhT2JqZWN0ID0gKCBmdW5jdGlvbiggdmVyc2lvbiApIHtcblx0XHRcdFx0dmVyc2lvblsgMCBdID0gcGFyc2VJbnQoIHZlcnNpb25bIDAgXSwgMTAgKTtcblx0XHRcdFx0cmV0dXJuICggdmVyc2lvblsgMCBdID4gMSApIHx8ICggdmVyc2lvblsgMCBdID09PSAxICYmIHBhcnNlSW50KCB2ZXJzaW9uWyAxIF0sIDEwICkgPj0gNCApO1xuXHRcdFx0fSkoICQuZm4uanF1ZXJ5LnNwbGl0KCAnLicgKSApO1xuXHRcdFx0Ly8gZW5zdXJlIGNhc2UgaW5zZW5zaXRpdml0eVxuXHRcdFx0Yy5lbXB0eVRvID0gYy5lbXB0eVRvLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRjLnN0cmluZ1RvID0gYy5zdHJpbmdUby50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0Yy5sYXN0ID0geyBzb3J0TGlzdCA6IFtdLCBjbGlja2VkSW5kZXggOiAtMSB9O1xuXHRcdFx0Ly8gYWRkIHRhYmxlIHRoZW1lIGNsYXNzIG9ubHkgaWYgdGhlcmUgaXNuJ3QgYWxyZWFkeSBvbmUgdGhlcmVcblx0XHRcdGlmICggIS90YWJsZXNvcnRlclxcLS8udGVzdCggJHRhYmxlLmF0dHIoICdjbGFzcycgKSApICkge1xuXHRcdFx0XHR0bXAgPSAoIGMudGhlbWUgIT09ICcnID8gJyB0YWJsZXNvcnRlci0nICsgYy50aGVtZSA6ICcnICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGdpdmUgdGhlIHRhYmxlIGEgdW5pcXVlIGlkLCB3aGljaCB3aWxsIGJlIHVzZWQgaW4gbmFtZXNwYWNlIGJpbmRpbmdcblx0XHRcdGlmICggIWMubmFtZXNwYWNlICkge1xuXHRcdFx0XHRjLm5hbWVzcGFjZSA9ICcudGFibGVzb3J0ZXInICsgTWF0aC5yYW5kb20oKS50b1N0cmluZyggMTYgKS5zbGljZSggMiApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gbWFrZSBzdXJlIG5hbWVzcGFjZSBzdGFydHMgd2l0aCBhIHBlcmlvZCAmIGRvZXNuJ3QgaGF2ZSB3ZWlyZCBjaGFyYWN0ZXJzXG5cdFx0XHRcdGMubmFtZXNwYWNlID0gJy4nICsgYy5uYW1lc3BhY2UucmVwbGFjZSggdHMucmVnZXgubm9uV29yZCwgJycgKTtcblx0XHRcdH1cblxuXHRcdFx0Yy50YWJsZSA9IHRhYmxlO1xuXHRcdFx0Yy4kdGFibGUgPSAkdGFibGVcblx0XHRcdFx0Ly8gYWRkIG5hbWVzcGFjZSB0byB0YWJsZSB0byBhbGxvdyBiaW5kaW5ncyBvbiBleHRyYSBlbGVtZW50cyB0byB0YXJnZXRcblx0XHRcdFx0Ly8gdGhlIHBhcmVudCB0YWJsZSAoZS5nLiBwYXJzZXItaW5wdXQtc2VsZWN0KVxuXHRcdFx0XHQuYWRkQ2xhc3MoIHRzLmNzcy50YWJsZSArICcgJyArIGMudGFibGVDbGFzcyArIHRtcCArICcgJyArIGMubmFtZXNwYWNlLnNsaWNlKDEpIClcblx0XHRcdFx0LmF0dHIoICdyb2xlJywgJ2dyaWQnICk7XG5cdFx0XHRjLiRoZWFkZXJzID0gJHRhYmxlLmZpbmQoIGMuc2VsZWN0b3JIZWFkZXJzICk7XG5cblx0XHRcdGMuJHRhYmxlLmNoaWxkcmVuKCkuY2hpbGRyZW4oICd0cicgKS5hdHRyKCAncm9sZScsICdyb3cnICk7XG5cdFx0XHRjLiR0Ym9kaWVzID0gJHRhYmxlLmNoaWxkcmVuKCAndGJvZHk6bm90KC4nICsgYy5jc3NJbmZvQmxvY2sgKyAnKScgKS5hdHRyKHtcblx0XHRcdFx0J2FyaWEtbGl2ZScgOiAncG9saXRlJyxcblx0XHRcdFx0J2FyaWEtcmVsZXZhbnQnIDogJ2FsbCdcblx0XHRcdH0pO1xuXHRcdFx0aWYgKCBjLiR0YWJsZS5jaGlsZHJlbiggJ2NhcHRpb24nICkubGVuZ3RoICkge1xuXHRcdFx0XHR0bXAgPSBjLiR0YWJsZS5jaGlsZHJlbiggJ2NhcHRpb24nIClbIDAgXTtcblx0XHRcdFx0aWYgKCAhdG1wLmlkICkgeyB0bXAuaWQgPSBjLm5hbWVzcGFjZS5zbGljZSggMSApICsgJ2NhcHRpb24nOyB9XG5cdFx0XHRcdGMuJHRhYmxlLmF0dHIoICdhcmlhLWxhYmVsbGVkYnknLCB0bXAuaWQgKTtcblx0XHRcdH1cblx0XHRcdGMud2lkZ2V0SW5pdCA9IHt9OyAvLyBrZWVwIGEgbGlzdCBvZiBpbml0aWFsaXplZCB3aWRnZXRzXG5cdFx0XHQvLyBjaGFuZ2UgdGV4dEV4dHJhY3Rpb24gdmlhIGRhdGEtYXR0cmlidXRlXG5cdFx0XHRjLnRleHRFeHRyYWN0aW9uID0gYy4kdGFibGUuYXR0ciggJ2RhdGEtdGV4dC1leHRyYWN0aW9uJyApIHx8IGMudGV4dEV4dHJhY3Rpb24gfHwgJ2Jhc2ljJztcblx0XHRcdC8vIGJ1aWxkIGhlYWRlcnNcblx0XHRcdHRzLmJ1aWxkSGVhZGVycyggYyApO1xuXHRcdFx0Ly8gZml4YXRlIGNvbHVtbnMgaWYgdGhlIHVzZXJzIHN1cHBsaWVzIHRoZSBmaXhlZFdpZHRoIG9wdGlvblxuXHRcdFx0Ly8gZG8gdGhpcyBhZnRlciB0aGVtZSBoYXMgYmVlbiBhcHBsaWVkXG5cdFx0XHR0cy5maXhDb2x1bW5XaWR0aCggdGFibGUgKTtcblx0XHRcdC8vIGFkZCB3aWRnZXRzIGZyb20gY2xhc3MgbmFtZVxuXHRcdFx0dHMuYWRkV2lkZ2V0RnJvbUNsYXNzKCB0YWJsZSApO1xuXHRcdFx0Ly8gYWRkIHdpZGdldCBvcHRpb25zIGJlZm9yZSBwYXJzaW5nIChlLmcuIGdyb3VwaW5nIHdpZGdldCBoYXMgcGFyc2VyIHNldHRpbmdzKVxuXHRcdFx0dHMuYXBwbHlXaWRnZXRPcHRpb25zKCB0YWJsZSApO1xuXHRcdFx0Ly8gdHJ5IHRvIGF1dG8gZGV0ZWN0IGNvbHVtbiB0eXBlLCBhbmQgc3RvcmUgaW4gdGFibGVzIGNvbmZpZ1xuXHRcdFx0dHMuc2V0dXBQYXJzZXJzKCBjICk7XG5cdFx0XHQvLyBzdGFydCB0b3RhbCByb3cgY291bnQgYXQgemVyb1xuXHRcdFx0Yy50b3RhbFJvd3MgPSAwO1xuXHRcdFx0dHMudmFsaWRhdGVPcHRpb25zKCBjICk7XG5cdFx0XHQvLyBidWlsZCB0aGUgY2FjaGUgZm9yIHRoZSB0Ym9keSBjZWxsc1xuXHRcdFx0Ly8gZGVsYXlJbml0IHdpbGwgZGVsYXkgYnVpbGRpbmcgdGhlIGNhY2hlIHVudGlsIHRoZSB1c2VyIHN0YXJ0cyBhIHNvcnRcblx0XHRcdGlmICggIWMuZGVsYXlJbml0ICkgeyB0cy5idWlsZENhY2hlKCBjICk7IH1cblx0XHRcdC8vIGJpbmQgYWxsIGhlYWRlciBldmVudHMgYW5kIG1ldGhvZHNcblx0XHRcdHRzLmJpbmRFdmVudHMoIHRhYmxlLCBjLiRoZWFkZXJzLCB0cnVlICk7XG5cdFx0XHR0cy5iaW5kTWV0aG9kcyggYyApO1xuXHRcdFx0Ly8gZ2V0IHNvcnQgbGlzdCBmcm9tIGpRdWVyeSBkYXRhIG9yIG1ldGFkYXRhXG5cdFx0XHQvLyBpbiBqUXVlcnkgPCAxLjQsIGFuIGVycm9yIG9jY3VycyB3aGVuIGNhbGxpbmcgJHRhYmxlLmRhdGEoKVxuXHRcdFx0aWYgKCBjLnN1cHBvcnRzRGF0YU9iamVjdCAmJiB0eXBlb2YgJHRhYmxlLmRhdGEoKS5zb3J0bGlzdCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdGMuc29ydExpc3QgPSAkdGFibGUuZGF0YSgpLnNvcnRsaXN0O1xuXHRcdFx0fSBlbHNlIGlmICggbWV0YSAmJiAoICR0YWJsZS5tZXRhZGF0YSgpICYmICR0YWJsZS5tZXRhZGF0YSgpLnNvcnRsaXN0ICkgKSB7XG5cdFx0XHRcdGMuc29ydExpc3QgPSAkdGFibGUubWV0YWRhdGEoKS5zb3J0bGlzdDtcblx0XHRcdH1cblx0XHRcdC8vIGFwcGx5IHdpZGdldCBpbml0IGNvZGVcblx0XHRcdHRzLmFwcGx5V2lkZ2V0KCB0YWJsZSwgdHJ1ZSApO1xuXHRcdFx0Ly8gaWYgdXNlciBoYXMgc3VwcGxpZWQgYSBzb3J0IGxpc3QgdG8gY29uc3RydWN0b3Jcblx0XHRcdGlmICggYy5zb3J0TGlzdC5sZW5ndGggPiAwICkge1xuXHRcdFx0XHR0cy5zb3J0T24oIGMsIGMuc29ydExpc3QsIHt9LCAhYy5pbml0V2lkZ2V0cyApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dHMuc2V0SGVhZGVyc0NzcyggYyApO1xuXHRcdFx0XHRpZiAoIGMuaW5pdFdpZGdldHMgKSB7XG5cdFx0XHRcdFx0Ly8gYXBwbHkgd2lkZ2V0IGZvcm1hdFxuXHRcdFx0XHRcdHRzLmFwcGx5V2lkZ2V0KCB0YWJsZSwgZmFsc2UgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBzaG93IHByb2Nlc3Nlc2luZyBpY29uXG5cdFx0XHRpZiAoIGMuc2hvd1Byb2Nlc3NpbmcgKSB7XG5cdFx0XHRcdCR0YWJsZVxuXHRcdFx0XHQudW5iaW5kKCAnc29ydEJlZ2luJyArIGMubmFtZXNwYWNlICsgJyBzb3J0RW5kJyArIGMubmFtZXNwYWNlIClcblx0XHRcdFx0LmJpbmQoICdzb3J0QmVnaW4nICsgYy5uYW1lc3BhY2UgKyAnIHNvcnRFbmQnICsgYy5uYW1lc3BhY2UsIGZ1bmN0aW9uKCBlICkge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dCggYy50aW1lclByb2Nlc3NpbmcgKTtcblx0XHRcdFx0XHR0cy5pc1Byb2Nlc3NpbmcoIHRhYmxlICk7XG5cdFx0XHRcdFx0aWYgKCBlLnR5cGUgPT09ICdzb3J0QmVnaW4nICkge1xuXHRcdFx0XHRcdFx0Yy50aW1lclByb2Nlc3NpbmcgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0dHMuaXNQcm9jZXNzaW5nKCB0YWJsZSwgdHJ1ZSApO1xuXHRcdFx0XHRcdFx0fSwgNTAwICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaW5pdGlhbGl6ZWRcblx0XHRcdHRhYmxlLmhhc0luaXRpYWxpemVkID0gdHJ1ZTtcblx0XHRcdHRhYmxlLmlzUHJvY2Vzc2luZyA9IGZhbHNlO1xuXHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyggJ092ZXJhbGwgaW5pdGlhbGl6YXRpb24gdGltZTonICsgdHMuYmVuY2htYXJrKCAkLmRhdGEoIHRhYmxlLCAnc3RhcnRvdmVyYWxsdGltZXInICkgKSApO1xuXHRcdFx0XHRpZiAoIGMuZGVidWcgJiYgY29uc29sZS5ncm91cEVuZCApIHsgY29uc29sZS5ncm91cEVuZCgpOyB9XG5cdFx0XHR9XG5cdFx0XHQkdGFibGUudHJpZ2dlckhhbmRsZXIoICd0YWJsZXNvcnRlci1pbml0aWFsaXplZCcsIHRhYmxlICk7XG5cdFx0XHRpZiAoIHR5cGVvZiBjLmluaXRpYWxpemVkID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0XHRjLmluaXRpYWxpemVkKCB0YWJsZSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRiaW5kTWV0aG9kcyA6IGZ1bmN0aW9uKCBjICkge1xuXHRcdFx0dmFyICR0YWJsZSA9IGMuJHRhYmxlLFxuXHRcdFx0XHRuYW1lc3BhY2UgPSBjLm5hbWVzcGFjZSxcblx0XHRcdFx0ZXZlbnRzID0gKCAnc29ydFJlc2V0IHVwZGF0ZSB1cGRhdGVSb3dzIHVwZGF0ZUFsbCB1cGRhdGVIZWFkZXJzIGFkZFJvd3MgdXBkYXRlQ2VsbCB1cGRhdGVDb21wbGV0ZSAnICtcblx0XHRcdFx0XHQnc29ydG9uIGFwcGVuZENhY2hlIHVwZGF0ZUNhY2hlIGFwcGx5V2lkZ2V0SWQgYXBwbHlXaWRnZXRzIHJlZnJlc2hXaWRnZXRzIGRlc3Ryb3kgbW91c2V1cCAnICtcblx0XHRcdFx0XHQnbW91c2VsZWF2ZSAnICkuc3BsaXQoICcgJyApXG5cdFx0XHRcdFx0LmpvaW4oIG5hbWVzcGFjZSArICcgJyApO1xuXHRcdFx0Ly8gYXBwbHkgZWFzeSBtZXRob2RzIHRoYXQgdHJpZ2dlciBib3VuZCBldmVudHNcblx0XHRcdCR0YWJsZVxuXHRcdFx0LnVuYmluZCggZXZlbnRzLnJlcGxhY2UoIHRzLnJlZ2V4LnNwYWNlcywgJyAnICkgKVxuXHRcdFx0LmJpbmQoICdzb3J0UmVzZXQnICsgbmFtZXNwYWNlLCBmdW5jdGlvbiggZSwgY2FsbGJhY2sgKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdC8vIHVzaW5nIHRoaXMuY29uZmlnIHRvIGVuc3VyZSBmdW5jdGlvbnMgYXJlIGdldHRpbmcgYSBub24tY2FjaGVkIHZlcnNpb24gb2YgdGhlIGNvbmZpZ1xuXHRcdFx0XHR0cy5zb3J0UmVzZXQoIHRoaXMuY29uZmlnLCBmdW5jdGlvbiggdGFibGUgKSB7XG5cdFx0XHRcdFx0aWYgKHRhYmxlLmlzQXBwbHlpbmdXaWRnZXRzKSB7XG5cdFx0XHRcdFx0XHQvLyBtdWx0aXBsZSB0cmlnZ2VycyBpbiBhIHJvdy4uLiBmaWx0ZXJSZXNldCwgdGhlbiBzb3J0UmVzZXQgLSBzZWUgIzEzNjFcblx0XHRcdFx0XHRcdC8vIHdhaXQgdG8gdXBkYXRlIHdpZGdldHNcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR0cy5hcHBseVdpZGdldCggdGFibGUsICcnLCBjYWxsYmFjayApO1xuXHRcdFx0XHRcdFx0fSwgMTAwICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRzLmFwcGx5V2lkZ2V0KCB0YWJsZSwgJycsIGNhbGxiYWNrICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0XHQuYmluZCggJ3VwZGF0ZUFsbCcgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCBlLCByZXNvcnQsIGNhbGxiYWNrICkge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR0cy51cGRhdGVBbGwoIHRoaXMuY29uZmlnLCByZXNvcnQsIGNhbGxiYWNrICk7XG5cdFx0XHR9KVxuXHRcdFx0LmJpbmQoICd1cGRhdGUnICsgbmFtZXNwYWNlICsgJyB1cGRhdGVSb3dzJyArIG5hbWVzcGFjZSwgZnVuY3Rpb24oIGUsIHJlc29ydCwgY2FsbGJhY2sgKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRzLnVwZGF0ZSggdGhpcy5jb25maWcsIHJlc29ydCwgY2FsbGJhY2sgKTtcblx0XHRcdH0pXG5cdFx0XHQuYmluZCggJ3VwZGF0ZUhlYWRlcnMnICsgbmFtZXNwYWNlLCBmdW5jdGlvbiggZSwgY2FsbGJhY2sgKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRzLnVwZGF0ZUhlYWRlcnMoIHRoaXMuY29uZmlnLCBjYWxsYmFjayApO1xuXHRcdFx0fSlcblx0XHRcdC5iaW5kKCAndXBkYXRlQ2VsbCcgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCBlLCBjZWxsLCByZXNvcnQsIGNhbGxiYWNrICkge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR0cy51cGRhdGVDZWxsKCB0aGlzLmNvbmZpZywgY2VsbCwgcmVzb3J0LCBjYWxsYmFjayApO1xuXHRcdFx0fSlcblx0XHRcdC5iaW5kKCAnYWRkUm93cycgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCBlLCAkcm93LCByZXNvcnQsIGNhbGxiYWNrICkge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR0cy5hZGRSb3dzKCB0aGlzLmNvbmZpZywgJHJvdywgcmVzb3J0LCBjYWxsYmFjayApO1xuXHRcdFx0fSlcblx0XHRcdC5iaW5kKCAndXBkYXRlQ29tcGxldGUnICsgbmFtZXNwYWNlLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dGhpcy5pc1VwZGF0aW5nID0gZmFsc2U7XG5cdFx0XHR9KVxuXHRcdFx0LmJpbmQoICdzb3J0b24nICsgbmFtZXNwYWNlLCBmdW5jdGlvbiggZSwgbGlzdCwgY2FsbGJhY2ssIGluaXQgKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRzLnNvcnRPbiggdGhpcy5jb25maWcsIGxpc3QsIGNhbGxiYWNrLCBpbml0ICk7XG5cdFx0XHR9KVxuXHRcdFx0LmJpbmQoICdhcHBlbmRDYWNoZScgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCBlLCBjYWxsYmFjaywgaW5pdCApIHtcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0dHMuYXBwZW5kQ2FjaGUoIHRoaXMuY29uZmlnLCBpbml0ICk7XG5cdFx0XHRcdGlmICggJC5pc0Z1bmN0aW9uKCBjYWxsYmFjayApICkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKCB0aGlzICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQvLyAkdGJvZGllcyB2YXJpYWJsZSBpcyB1c2VkIGJ5IHRoZSB0Ym9keSBzb3J0aW5nIHdpZGdldFxuXHRcdFx0LmJpbmQoICd1cGRhdGVDYWNoZScgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCBlLCBjYWxsYmFjaywgJHRib2RpZXMgKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRzLnVwZGF0ZUNhY2hlKCB0aGlzLmNvbmZpZywgY2FsbGJhY2ssICR0Ym9kaWVzICk7XG5cdFx0XHR9KVxuXHRcdFx0LmJpbmQoICdhcHBseVdpZGdldElkJyArIG5hbWVzcGFjZSwgZnVuY3Rpb24oIGUsIGlkICkge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR0cy5hcHBseVdpZGdldElkKCB0aGlzLCBpZCApO1xuXHRcdFx0fSlcblx0XHRcdC5iaW5kKCAnYXBwbHlXaWRnZXRzJyArIG5hbWVzcGFjZSwgZnVuY3Rpb24oIGUsIGNhbGxiYWNrICkge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHQvLyBhcHBseSB3aWRnZXRzIChmYWxzZSA9IG5vdCBpbml0aWFsaXppbmcpXG5cdFx0XHRcdHRzLmFwcGx5V2lkZ2V0KCB0aGlzLCBmYWxzZSwgY2FsbGJhY2sgKTtcblx0XHRcdH0pXG5cdFx0XHQuYmluZCggJ3JlZnJlc2hXaWRnZXRzJyArIG5hbWVzcGFjZSwgZnVuY3Rpb24oIGUsIGFsbCwgZG9udGFwcGx5ICkge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR0cy5yZWZyZXNoV2lkZ2V0cyggdGhpcywgYWxsLCBkb250YXBwbHkgKTtcblx0XHRcdH0pXG5cdFx0XHQuYmluZCggJ3JlbW92ZVdpZGdldCcgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCBlLCBuYW1lLCByZWZyZXNoaW5nICkge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR0cy5yZW1vdmVXaWRnZXQoIHRoaXMsIG5hbWUsIHJlZnJlc2hpbmcgKTtcblx0XHRcdH0pXG5cdFx0XHQuYmluZCggJ2Rlc3Ryb3knICsgbmFtZXNwYWNlLCBmdW5jdGlvbiggZSwgcmVtb3ZlQ2xhc3NlcywgY2FsbGJhY2sgKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRzLmRlc3Ryb3koIHRoaXMsIHJlbW92ZUNsYXNzZXMsIGNhbGxiYWNrICk7XG5cdFx0XHR9KVxuXHRcdFx0LmJpbmQoICdyZXNldFRvTG9hZFN0YXRlJyArIG5hbWVzcGFjZSwgZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdC8vIHJlbW92ZSBhbGwgd2lkZ2V0c1xuXHRcdFx0XHR0cy5yZW1vdmVXaWRnZXQoIHRoaXMsIHRydWUsIGZhbHNlICk7XG5cdFx0XHRcdHZhciB0bXAgPSAkLmV4dGVuZCggdHJ1ZSwge30sIGMub3JpZ2luYWxTZXR0aW5ncyApO1xuXHRcdFx0XHQvLyByZXN0b3JlIG9yaWdpbmFsIHNldHRpbmdzOyB0aGlzIGNsZWFycyBvdXQgY3VycmVudCBzZXR0aW5ncywgYnV0IGRvZXMgbm90IGNsZWFyXG5cdFx0XHRcdC8vIHZhbHVlcyBzYXZlZCB0byBzdG9yYWdlLlxuXHRcdFx0XHRjID0gJC5leHRlbmQoIHRydWUsIHt9LCB0cy5kZWZhdWx0cywgdG1wICk7XG5cdFx0XHRcdGMub3JpZ2luYWxTZXR0aW5ncyA9IHRtcDtcblx0XHRcdFx0dGhpcy5oYXNJbml0aWFsaXplZCA9IGZhbHNlO1xuXHRcdFx0XHQvLyBzZXR1cCB0aGUgZW50aXJlIHRhYmxlIGFnYWluXG5cdFx0XHRcdHRzLnNldHVwKCB0aGlzLCBjICk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0YmluZEV2ZW50cyA6IGZ1bmN0aW9uKCB0YWJsZSwgJGhlYWRlcnMsIGNvcmUgKSB7XG5cdFx0XHR0YWJsZSA9ICQoIHRhYmxlIClbIDAgXTtcblx0XHRcdHZhciB0bXAsXG5cdFx0XHRcdGMgPSB0YWJsZS5jb25maWcsXG5cdFx0XHRcdG5hbWVzcGFjZSA9IGMubmFtZXNwYWNlLFxuXHRcdFx0XHRkb3duVGFyZ2V0ID0gbnVsbDtcblx0XHRcdGlmICggY29yZSAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0JGhlYWRlcnMuYWRkQ2xhc3MoIG5hbWVzcGFjZS5zbGljZSggMSApICsgJ19leHRyYV9oZWFkZXJzJyApO1xuXHRcdFx0XHR0bXAgPSB0cy5nZXRDbG9zZXN0KCAkaGVhZGVycywgJ3RhYmxlJyApO1xuXHRcdFx0XHRpZiAoIHRtcC5sZW5ndGggJiYgdG1wWyAwIF0ubm9kZU5hbWUgPT09ICdUQUJMRScgJiYgdG1wWyAwIF0gIT09IHRhYmxlICkge1xuXHRcdFx0XHRcdCQoIHRtcFsgMCBdICkuYWRkQ2xhc3MoIG5hbWVzcGFjZS5zbGljZSggMSApICsgJ19leHRyYV90YWJsZScgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dG1wID0gKCBjLnBvaW50ZXJEb3duICsgJyAnICsgYy5wb2ludGVyVXAgKyAnICcgKyBjLnBvaW50ZXJDbGljayArICcgc29ydCBrZXl1cCAnIClcblx0XHRcdFx0LnJlcGxhY2UoIHRzLnJlZ2V4LnNwYWNlcywgJyAnIClcblx0XHRcdFx0LnNwbGl0KCAnICcgKVxuXHRcdFx0XHQuam9pbiggbmFtZXNwYWNlICsgJyAnICk7XG5cdFx0XHQvLyBhcHBseSBldmVudCBoYW5kbGluZyB0byBoZWFkZXJzIGFuZC9vciBhZGRpdGlvbmFsIGhlYWRlcnMgKHN0aWNreWhlYWRlcnMsIHNjcm9sbGVyLCBldGMpXG5cdFx0XHQkaGVhZGVyc1xuXHRcdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MzEyODQ5L2pxdWVyeS1maW5kLXNlbGY7XG5cdFx0XHQuZmluZCggYy5zZWxlY3RvclNvcnQgKVxuXHRcdFx0LmFkZCggJGhlYWRlcnMuZmlsdGVyKCBjLnNlbGVjdG9yU29ydCApIClcblx0XHRcdC51bmJpbmQoIHRtcCApXG5cdFx0XHQuYmluZCggdG1wLCBmdW5jdGlvbiggZSwgZXh0ZXJuYWwgKSB7XG5cdFx0XHRcdHZhciAkY2VsbCwgY2VsbCwgdGVtcCxcblx0XHRcdFx0XHQkdGFyZ2V0ID0gJCggZS50YXJnZXQgKSxcblx0XHRcdFx0XHQvLyB3cmFwIGV2ZW50IHR5cGUgaW4gc3BhY2VzLCBzbyB0aGUgbWF0Y2ggZG9lc24ndCB0cmlnZ2VyIG9uIGlubmVyIHdvcmRzXG5cdFx0XHRcdFx0dHlwZSA9ICcgJyArIGUudHlwZSArICcgJztcblx0XHRcdFx0Ly8gb25seSByZWNvZ25pemUgbGVmdCBjbGlja3Ncblx0XHRcdFx0aWYgKCAoICggZS53aGljaCB8fCBlLmJ1dHRvbiApICE9PSAxICYmICF0eXBlLm1hdGNoKCAnICcgKyBjLnBvaW50ZXJDbGljayArICcgfCBzb3J0IHwga2V5dXAgJyApICkgfHxcblx0XHRcdFx0XHQvLyBhbGxvdyBwcmVzc2luZyBlbnRlclxuXHRcdFx0XHRcdCggdHlwZSA9PT0gJyBrZXl1cCAnICYmIGUud2hpY2ggIT09IHRzLmtleUNvZGVzLmVudGVyICkgfHxcblx0XHRcdFx0XHQvLyBhbGxvdyB0cmlnZ2VyaW5nIGEgY2xpY2sgZXZlbnQgKGUud2hpY2ggaXMgdW5kZWZpbmVkKSAmIGlnbm9yZSBwaHlzaWNhbCBjbGlja3Ncblx0XHRcdFx0XHQoIHR5cGUubWF0Y2goICcgJyArIGMucG9pbnRlckNsaWNrICsgJyAnICkgJiYgdHlwZW9mIGUud2hpY2ggIT09ICd1bmRlZmluZWQnICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGlnbm9yZSBtb3VzZXVwIGlmIG1vdXNlZG93biB3YXNuJ3Qgb24gdGhlIHNhbWUgdGFyZ2V0XG5cdFx0XHRcdGlmICggdHlwZS5tYXRjaCggJyAnICsgYy5wb2ludGVyVXAgKyAnICcgKSAmJiBkb3duVGFyZ2V0ICE9PSBlLnRhcmdldCAmJiBleHRlcm5hbCAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gc2V0IHRhcmdldCBvbiBtb3VzZWRvd25cblx0XHRcdFx0aWYgKCB0eXBlLm1hdGNoKCAnICcgKyBjLnBvaW50ZXJEb3duICsgJyAnICkgKSB7XG5cdFx0XHRcdFx0ZG93blRhcmdldCA9IGUudGFyZ2V0O1xuXHRcdFx0XHRcdC8vIHByZXZlbnREZWZhdWx0IG5lZWRlZCBvciBqUXVlcnkgdjEuMy4yIGFuZCBvbGRlciB0aHJvd3MgYW5cblx0XHRcdFx0XHQvLyBcIlVuY2F1Z2h0IFR5cGVFcnJvcjogaGFuZGxlci5hcHBseSBpcyBub3QgYSBmdW5jdGlvblwiIGVycm9yXG5cdFx0XHRcdFx0dGVtcCA9ICR0YXJnZXQuanF1ZXJ5LnNwbGl0KCAnLicgKTtcblx0XHRcdFx0XHRpZiAoIHRlbXBbIDAgXSA9PT0gJzEnICYmIHRlbXBbIDEgXSA8IDQgKSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRkb3duVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0Ly8gcHJldmVudCBzb3J0IGJlaW5nIHRyaWdnZXJlZCBvbiBmb3JtIGVsZW1lbnRzXG5cdFx0XHRcdGlmICggdHMucmVnZXguZm9ybUVsZW1lbnRzLnRlc3QoIGUudGFyZ2V0Lm5vZGVOYW1lICkgfHxcblx0XHRcdFx0XHQvLyBub3NvcnQgY2xhc3MgbmFtZSwgb3IgZWxlbWVudHMgd2l0aGluIGEgbm9zb3J0IGNvbnRhaW5lclxuXHRcdFx0XHRcdCR0YXJnZXQuaGFzQ2xhc3MoIGMuY3NzTm9Tb3J0ICkgfHwgJHRhcmdldC5wYXJlbnRzKCAnLicgKyBjLmNzc05vU29ydCApLmxlbmd0aCA+IDAgfHxcblx0XHRcdFx0XHQvLyBlbGVtZW50cyB3aXRoaW4gYSBidXR0b25cblx0XHRcdFx0XHQkdGFyZ2V0LnBhcmVudHMoICdidXR0b24nICkubGVuZ3RoID4gMCApIHtcblx0XHRcdFx0XHRyZXR1cm4gIWMuY2FuY2VsU2VsZWN0aW9uO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggYy5kZWxheUluaXQgJiYgdHMuaXNFbXB0eU9iamVjdCggYy5jYWNoZSApICkge1xuXHRcdFx0XHRcdHRzLmJ1aWxkQ2FjaGUoIGMgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkY2VsbCA9IHRzLmdldENsb3Nlc3QoICQoIHRoaXMgKSwgJy4nICsgdHMuY3NzLmhlYWRlciApO1xuXHRcdFx0XHQvLyByZWZlcmVuY2Ugb3JpZ2luYWwgdGFibGUgaGVhZGVycyBhbmQgZmluZCB0aGUgc2FtZSBjZWxsXG5cdFx0XHRcdC8vIGRvbid0IHVzZSAkaGVhZGVycyBvciBJRTggdGhyb3dzIGFuIGVycm9yIC0gc2VlICM5ODdcblx0XHRcdFx0dGVtcCA9ICRoZWFkZXJzLmluZGV4KCAkY2VsbCApO1xuXHRcdFx0XHRjLmxhc3QuY2xpY2tlZEluZGV4ID0gKCB0ZW1wIDwgMCApID8gJGNlbGwuYXR0ciggJ2RhdGEtY29sdW1uJyApIDogdGVtcDtcblx0XHRcdFx0Ly8gdXNlIGNvbHVtbiBpbmRleCBpZiAkaGVhZGVycyBpcyB1bmRlZmluZWRcblx0XHRcdFx0Y2VsbCA9IGMuJGhlYWRlcnNbIGMubGFzdC5jbGlja2VkSW5kZXggXTtcblx0XHRcdFx0aWYgKCBjZWxsICYmICFjZWxsLnNvcnREaXNhYmxlZCApIHtcblx0XHRcdFx0XHR0cy5pbml0U29ydCggYywgY2VsbCwgZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICggYy5jYW5jZWxTZWxlY3Rpb24gKSB7XG5cdFx0XHRcdC8vIGNhbmNlbCBzZWxlY3Rpb25cblx0XHRcdFx0JGhlYWRlcnNcblx0XHRcdFx0XHQuYXR0ciggJ3Vuc2VsZWN0YWJsZScsICdvbicgKVxuXHRcdFx0XHRcdC5iaW5kKCAnc2VsZWN0c3RhcnQnLCBmYWxzZSApXG5cdFx0XHRcdFx0LmNzcyh7XG5cdFx0XHRcdFx0XHQndXNlci1zZWxlY3QnIDogJ25vbmUnLFxuXHRcdFx0XHRcdFx0J01velVzZXJTZWxlY3QnIDogJ25vbmUnIC8vIG5vdCBuZWVkZWQgZm9yIGpRdWVyeSAxLjgrXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGJ1aWxkSGVhZGVycyA6IGZ1bmN0aW9uKCBjICkge1xuXHRcdFx0dmFyICR0ZW1wLCBpY29uLCB0aW1lciwgaW5keDtcblx0XHRcdGMuaGVhZGVyTGlzdCA9IFtdO1xuXHRcdFx0Yy5oZWFkZXJDb250ZW50ID0gW107XG5cdFx0XHRjLnNvcnRWYXJzID0gW107XG5cdFx0XHRpZiAoIGMuZGVidWcgKSB7XG5cdFx0XHRcdHRpbWVyID0gbmV3IERhdGUoKTtcblx0XHRcdH1cblx0XHRcdC8vIGNoaWxkcmVuIHRyIGluIHRmb290IC0gc2VlIGlzc3VlICMxOTYgJiAjNTQ3XG5cdFx0XHQvLyBkb24ndCBwYXNzIHRhYmxlLmNvbmZpZyB0byBjb21wdXRlQ29sdW1uSW5kZXggaGVyZSAtIHdpZGdldHMgKG1hdGgpIHBhc3MgaXQgdG8gXCJxdWlja2x5XCIgaW5kZXggdGJvZHkgY2VsbHNcblx0XHRcdGMuY29sdW1ucyA9IHRzLmNvbXB1dGVDb2x1bW5JbmRleCggYy4kdGFibGUuY2hpbGRyZW4oICd0aGVhZCwgdGZvb3QnICkuY2hpbGRyZW4oICd0cicgKSApO1xuXHRcdFx0Ly8gYWRkIGljb24gaWYgY3NzSWNvbiBvcHRpb24gZXhpc3RzXG5cdFx0XHRpY29uID0gYy5jc3NJY29uID9cblx0XHRcdFx0JzxpIGNsYXNzPVwiJyArICggYy5jc3NJY29uID09PSB0cy5jc3MuaWNvbiA/IHRzLmNzcy5pY29uIDogYy5jc3NJY29uICsgJyAnICsgdHMuY3NzLmljb24gKSArICdcIj48L2k+JyA6XG5cdFx0XHRcdCcnO1xuXHRcdFx0Ly8gcmVkZWZpbmUgYy4kaGVhZGVycyBoZXJlIGluIGNhc2Ugb2YgYW4gdXBkYXRlQWxsIHRoYXQgcmVwbGFjZXMgb3IgYWRkcyBhbiBlbnRpcmUgaGVhZGVyIGNlbGwgLSBzZWUgIzY4M1xuXHRcdFx0Yy4kaGVhZGVycyA9ICQoICQubWFwKCBjLiR0YWJsZS5maW5kKCBjLnNlbGVjdG9ySGVhZGVycyApLCBmdW5jdGlvbiggZWxlbSwgaW5kZXggKSB7XG5cdFx0XHRcdHZhciBjb25maWdIZWFkZXJzLCBoZWFkZXIsIGNvbHVtbiwgdGVtcGxhdGUsIHRtcCxcblx0XHRcdFx0XHQkZWxlbSA9ICQoIGVsZW0gKTtcblx0XHRcdFx0Ly8gaWdub3JlIGNlbGwgKGRvbid0IGFkZCBpdCB0byBjLiRoZWFkZXJzKSBpZiByb3cgaGFzIGlnbm9yZVJvdyBjbGFzc1xuXHRcdFx0XHRpZiAoIHRzLmdldENsb3Nlc3QoICRlbGVtLCAndHInICkuaGFzQ2xhc3MoIGMuY3NzSWdub3JlUm93ICkgKSB7IHJldHVybjsgfVxuXHRcdFx0XHQvLyB0cmFuc2ZlciBkYXRhLWNvbHVtbiB0byBlbGVtZW50IGlmIG5vdCB0aC90ZCAtICMxNDU5XG5cdFx0XHRcdGlmICggIS8odGh8dGQpL2kudGVzdCggZWxlbS5ub2RlTmFtZSApICkge1xuXHRcdFx0XHRcdHRtcCA9IHRzLmdldENsb3Nlc3QoICRlbGVtLCAndGgsIHRkJyApO1xuXHRcdFx0XHRcdCRlbGVtLmF0dHIoICdkYXRhLWNvbHVtbicsIHRtcC5hdHRyKCAnZGF0YS1jb2x1bW4nICkgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBtYWtlIHN1cmUgdG8gZ2V0IGhlYWRlciBjZWxsICYgbm90IGNvbHVtbiBpbmRleGVkIGNlbGxcblx0XHRcdFx0Y29uZmlnSGVhZGVycyA9IHRzLmdldENvbHVtbkRhdGEoIGMudGFibGUsIGMuaGVhZGVycywgaW5kZXgsIHRydWUgKTtcblx0XHRcdFx0Ly8gc2F2ZSBvcmlnaW5hbCBoZWFkZXIgY29udGVudFxuXHRcdFx0XHRjLmhlYWRlckNvbnRlbnRbIGluZGV4IF0gPSAkZWxlbS5odG1sKCk7XG5cdFx0XHRcdC8vIGlmIGhlYWRlclRlbXBsYXRlIGlzIGVtcHR5LCBkb24ndCByZWZvcm1hdCB0aGUgaGVhZGVyIGNlbGxcblx0XHRcdFx0aWYgKCBjLmhlYWRlclRlbXBsYXRlICE9PSAnJyAmJiAhJGVsZW0uZmluZCggJy4nICsgdHMuY3NzLmhlYWRlckluICkubGVuZ3RoICkge1xuXHRcdFx0XHRcdC8vIHNldCB1cCBoZWFkZXIgdGVtcGxhdGVcblx0XHRcdFx0XHR0ZW1wbGF0ZSA9IGMuaGVhZGVyVGVtcGxhdGVcblx0XHRcdFx0XHRcdC5yZXBsYWNlKCB0cy5yZWdleC50ZW1wbGF0ZUNvbnRlbnQsICRlbGVtLmh0bWwoKSApXG5cdFx0XHRcdFx0XHQucmVwbGFjZSggdHMucmVnZXgudGVtcGxhdGVJY29uLCAkZWxlbS5maW5kKCAnLicgKyB0cy5jc3MuaWNvbiApLmxlbmd0aCA/ICcnIDogaWNvbiApO1xuXHRcdFx0XHRcdGlmICggYy5vblJlbmRlclRlbXBsYXRlICkge1xuXHRcdFx0XHRcdFx0aGVhZGVyID0gYy5vblJlbmRlclRlbXBsYXRlLmFwcGx5KCAkZWxlbSwgWyBpbmRleCwgdGVtcGxhdGUgXSApO1xuXHRcdFx0XHRcdFx0Ly8gb25seSBjaGFuZ2UgdCBpZiBzb21ldGhpbmcgaXMgcmV0dXJuZWRcblx0XHRcdFx0XHRcdGlmICggaGVhZGVyICYmIHR5cGVvZiBoZWFkZXIgPT09ICdzdHJpbmcnICkge1xuXHRcdFx0XHRcdFx0XHR0ZW1wbGF0ZSA9IGhlYWRlcjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0JGVsZW0uaHRtbCggJzxkaXYgY2xhc3M9XCInICsgdHMuY3NzLmhlYWRlckluICsgJ1wiPicgKyB0ZW1wbGF0ZSArICc8L2Rpdj4nICk7IC8vIGZhc3RlciB0aGFuIHdyYXBJbm5lclxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggYy5vblJlbmRlckhlYWRlciApIHtcblx0XHRcdFx0XHRjLm9uUmVuZGVySGVhZGVyLmFwcGx5KCAkZWxlbSwgWyBpbmRleCwgYywgYy4kdGFibGUgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbHVtbiA9IHBhcnNlSW50KCAkZWxlbS5hdHRyKCAnZGF0YS1jb2x1bW4nICksIDEwICk7XG5cdFx0XHRcdGVsZW0uY29sdW1uID0gY29sdW1uO1xuXHRcdFx0XHR0bXAgPSB0cy5nZXRPcmRlciggdHMuZ2V0RGF0YSggJGVsZW0sIGNvbmZpZ0hlYWRlcnMsICdzb3J0SW5pdGlhbE9yZGVyJyApIHx8IGMuc29ydEluaXRpYWxPcmRlciApO1xuXHRcdFx0XHQvLyB0aGlzIG1heSBnZXQgdXBkYXRlZCBudW1lcm91cyB0aW1lcyBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgcm93c1xuXHRcdFx0XHRjLnNvcnRWYXJzWyBjb2x1bW4gXSA9IHtcblx0XHRcdFx0XHRjb3VudCA6IC0xLCAvLyBzZXQgdG8gLTEgYmVjYXVzZSBjbGlja2luZyBvbiB0aGUgaGVhZGVyIGF1dG9tYXRpY2FsbHkgYWRkcyBvbmVcblx0XHRcdFx0XHRvcmRlcjogIHRtcCA/XG5cdFx0XHRcdFx0XHQoIGMuc29ydFJlc2V0ID8gWyAxLCAwLCAyIF0gOiBbIDEsIDAgXSApIDogLy8gZGVzYywgYXNjLCB1bnNvcnRlZFxuXHRcdFx0XHRcdFx0KCBjLnNvcnRSZXNldCA/IFsgMCwgMSwgMiBdIDogWyAwLCAxIF0gKSwgIC8vIGFzYywgZGVzYywgdW5zb3J0ZWRcblx0XHRcdFx0XHRsb2NrZWRPcmRlciA6IGZhbHNlXG5cdFx0XHRcdH07XG5cdFx0XHRcdHRtcCA9IHRzLmdldERhdGEoICRlbGVtLCBjb25maWdIZWFkZXJzLCAnbG9ja2VkT3JkZXInICkgfHwgZmFsc2U7XG5cdFx0XHRcdGlmICggdHlwZW9mIHRtcCAhPT0gJ3VuZGVmaW5lZCcgJiYgdG1wICE9PSBmYWxzZSApIHtcblx0XHRcdFx0XHRjLnNvcnRWYXJzWyBjb2x1bW4gXS5sb2NrZWRPcmRlciA9IHRydWU7XG5cdFx0XHRcdFx0Yy5zb3J0VmFyc1sgY29sdW1uIF0ub3JkZXIgPSB0cy5nZXRPcmRlciggdG1wICkgPyBbIDEsIDEgXSA6IFsgMCwgMCBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGFkZCBjZWxsIHRvIGhlYWRlckxpc3Rcblx0XHRcdFx0Yy5oZWFkZXJMaXN0WyBpbmRleCBdID0gZWxlbTtcblx0XHRcdFx0JGVsZW0uYWRkQ2xhc3MoIHRzLmNzcy5oZWFkZXIgKyAnICcgKyBjLmNzc0hlYWRlciApO1xuXHRcdFx0XHQvLyBhZGQgdG8gcGFyZW50IGluIGNhc2UgdGhlcmUgYXJlIG11bHRpcGxlIHJvd3Ncblx0XHRcdFx0dHMuZ2V0Q2xvc2VzdCggJGVsZW0sICd0cicgKVxuXHRcdFx0XHRcdC5hZGRDbGFzcyggdHMuY3NzLmhlYWRlclJvdyArICcgJyArIGMuY3NzSGVhZGVyUm93IClcblx0XHRcdFx0XHQuYXR0ciggJ3JvbGUnLCAncm93JyApO1xuXHRcdFx0XHQvLyBhbGxvdyBrZXlib2FyZCBjdXJzb3IgdG8gZm9jdXMgb24gZWxlbWVudFxuXHRcdFx0XHRpZiAoIGMudGFiSW5kZXggKSB7XG5cdFx0XHRcdFx0JGVsZW0uYXR0ciggJ3RhYmluZGV4JywgMCApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBlbGVtO1xuXHRcdFx0fSkgKTtcblx0XHRcdC8vIGNhY2hlIGhlYWRlcnMgcGVyIGNvbHVtblxuXHRcdFx0Yy4kaGVhZGVySW5kZXhlZCA9IFtdO1xuXHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBjLmNvbHVtbnM7IGluZHgrKyApIHtcblx0XHRcdFx0Ly8gY29sc3BhbiBpbiBoZWFkZXIgbWFraW5nIGEgY29sdW1uIHVuZGVmaW5lZFxuXHRcdFx0XHRpZiAoIHRzLmlzRW1wdHlPYmplY3QoIGMuc29ydFZhcnNbIGluZHggXSApICkge1xuXHRcdFx0XHRcdGMuc29ydFZhcnNbIGluZHggXSA9IHt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIFVzZSBjLiRoZWFkZXJzLnBhcmVudCgpIGluIGNhc2Ugc2VsZWN0b3JIZWFkZXJzIGRvZXNuJ3QgcG9pbnQgdG8gdGhlIHRoL3RkXG5cdFx0XHRcdCR0ZW1wID0gYy4kaGVhZGVycy5maWx0ZXIoICdbZGF0YS1jb2x1bW49XCInICsgaW5keCArICdcIl0nICk7XG5cdFx0XHRcdC8vIHRhcmdldCBzb3J0YWJsZSBjb2x1bW4gY2VsbHMsIHVubGVzcyB0aGVyZSBhcmUgbm9uZSwgdGhlbiB1c2Ugbm9uLXNvcnRhYmxlIGNlbGxzXG5cdFx0XHRcdC8vIC5sYXN0KCkgYWRkZWQgaW4galF1ZXJ5IDEuNDsgdXNlIC5maWx0ZXIoJzpsYXN0JykgdG8gbWFpbnRhaW4gY29tcGF0aWJpbGl0eSB3aXRoIGpRdWVyeSB2MS4yLjZcblx0XHRcdFx0Yy4kaGVhZGVySW5kZXhlZFsgaW5keCBdID0gJHRlbXAubGVuZ3RoID9cblx0XHRcdFx0XHQkdGVtcC5ub3QoICcuc29ydGVyLWZhbHNlJyApLmxlbmd0aCA/XG5cdFx0XHRcdFx0XHQkdGVtcC5ub3QoICcuc29ydGVyLWZhbHNlJyApLmZpbHRlciggJzpsYXN0JyApIDpcblx0XHRcdFx0XHRcdCR0ZW1wLmZpbHRlciggJzpsYXN0JyApIDpcblx0XHRcdFx0XHQkKCk7XG5cdFx0XHR9XG5cdFx0XHRjLiR0YWJsZS5maW5kKCBjLnNlbGVjdG9ySGVhZGVycyApLmF0dHIoe1xuXHRcdFx0XHRzY29wZTogJ2NvbCcsXG5cdFx0XHRcdHJvbGUgOiAnY29sdW1uaGVhZGVyJ1xuXHRcdFx0fSk7XG5cdFx0XHQvLyBlbmFibGUvZGlzYWJsZSBzb3J0aW5nXG5cdFx0XHR0cy51cGRhdGVIZWFkZXIoIGMgKTtcblx0XHRcdGlmICggYy5kZWJ1ZyApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coICdCdWlsdCBoZWFkZXJzOicgKyB0cy5iZW5jaG1hcmsoIHRpbWVyICkgKTtcblx0XHRcdFx0Y29uc29sZS5sb2coIGMuJGhlYWRlcnMgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gVXNlIGl0IHRvIGFkZCBhIHNldCBvZiBtZXRob2RzIHRvIHRhYmxlLmNvbmZpZyB3aGljaCB3aWxsIGJlIGF2YWlsYWJsZSBmb3IgYWxsIHRhYmxlcy5cblx0XHQvLyBUaGlzIHNob3VsZCBiZSBkb25lIGJlZm9yZSB0YWJsZSBpbml0aWFsaXphdGlvblxuXHRcdGFkZEluc3RhbmNlTWV0aG9kcyA6IGZ1bmN0aW9uKCBtZXRob2RzICkge1xuXHRcdFx0JC5leHRlbmQoIHRzLmluc3RhbmNlTWV0aG9kcywgbWV0aG9kcyApO1xuXHRcdH0sXG5cblx0XHQvKlxuXHRcdOKWiOKWiOKWiOKWiOKWiOKWhCDiloTilojilojilojilojiloQg4paI4paI4paI4paI4paI4paEIOKWhOKWiOKWiOKWiOKWiOKWiCDilojilojilojilojilojilogg4paI4paI4paI4paI4paI4paEIOKWhOKWiOKWiOKWiOKWiOKWiFxuXHRcdOKWiOKWiOKWhOKWhOKWiOKWiCDilojilojiloTiloTilojilogg4paI4paI4paE4paE4paI4paIIOKWgOKWiOKWhCAgICDilojilojiloTiloQgICDilojilojiloTiloTilojilogg4paA4paI4paEXG5cdFx04paI4paI4paA4paA4paAICDilojilojiloDiloDilojilogg4paI4paI4paA4paI4paIICAgICDiloDilojiloQg4paI4paI4paA4paAICAg4paI4paI4paA4paI4paIICAgICDiloDilojiloRcblx0XHTilojiloggICAgIOKWiOKWiCAg4paI4paIIOKWiOKWiCAg4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWgCDilojilojilojilojilojilogg4paI4paIICDilojilogg4paI4paI4paI4paI4paI4paAXG5cdFx0Ki9cblx0XHRzZXR1cFBhcnNlcnMgOiBmdW5jdGlvbiggYywgJHRib2RpZXMgKSB7XG5cdFx0XHR2YXIgcm93cywgbGlzdCwgc3BhbiwgbWF4LCBjb2xJbmRleCwgaW5keCwgaGVhZGVyLCBjb25maWdIZWFkZXJzLFxuXHRcdFx0XHRub1BhcnNlciwgcGFyc2VyLCBleHRyYWN0b3IsIHRpbWUsIHRib2R5LCBsZW4sXG5cdFx0XHRcdHRhYmxlID0gYy50YWJsZSxcblx0XHRcdFx0dGJvZHlJbmRleCA9IDAsXG5cdFx0XHRcdGRlYnVnID0ge307XG5cdFx0XHQvLyB1cGRhdGUgdGFibGUgYm9kaWVzIGluIGNhc2Ugd2Ugc3RhcnQgd2l0aCBhbiBlbXB0eSB0YWJsZVxuXHRcdFx0Yy4kdGJvZGllcyA9IGMuJHRhYmxlLmNoaWxkcmVuKCAndGJvZHk6bm90KC4nICsgYy5jc3NJbmZvQmxvY2sgKyAnKScgKTtcblx0XHRcdHRib2R5ID0gdHlwZW9mICR0Ym9kaWVzID09PSAndW5kZWZpbmVkJyA/IGMuJHRib2RpZXMgOiAkdGJvZGllcztcblx0XHRcdGxlbiA9IHRib2R5Lmxlbmd0aDtcblx0XHRcdGlmICggbGVuID09PSAwICkge1xuXHRcdFx0XHRyZXR1cm4gYy5kZWJ1ZyA/IGNvbnNvbGUud2FybiggJ1dhcm5pbmc6ICpFbXB0eSB0YWJsZSEqIE5vdCBidWlsZGluZyBhIHBhcnNlciBjYWNoZScgKSA6ICcnO1xuXHRcdFx0fSBlbHNlIGlmICggYy5kZWJ1ZyApIHtcblx0XHRcdFx0dGltZSA9IG5ldyBEYXRlKCk7XG5cdFx0XHRcdGNvbnNvbGVbIGNvbnNvbGUuZ3JvdXAgPyAnZ3JvdXAnIDogJ2xvZycgXSggJ0RldGVjdGluZyBwYXJzZXJzIGZvciBlYWNoIGNvbHVtbicgKTtcblx0XHRcdH1cblx0XHRcdGxpc3QgPSB7XG5cdFx0XHRcdGV4dHJhY3RvcnM6IFtdLFxuXHRcdFx0XHRwYXJzZXJzOiBbXVxuXHRcdFx0fTtcblx0XHRcdHdoaWxlICggdGJvZHlJbmRleCA8IGxlbiApIHtcblx0XHRcdFx0cm93cyA9IHRib2R5WyB0Ym9keUluZGV4IF0ucm93cztcblx0XHRcdFx0aWYgKCByb3dzLmxlbmd0aCApIHtcblx0XHRcdFx0XHRjb2xJbmRleCA9IDA7XG5cdFx0XHRcdFx0bWF4ID0gYy5jb2x1bW5zO1xuXHRcdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbWF4OyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0XHRoZWFkZXIgPSBjLiRoZWFkZXJJbmRleGVkWyBjb2xJbmRleCBdO1xuXHRcdFx0XHRcdFx0aWYgKCBoZWFkZXIgJiYgaGVhZGVyLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0Ly8gZ2V0IGNvbHVtbiBpbmRleGVkIHRhYmxlIGNlbGw7IGFkZGluZyB0cnVlIHBhcmFtZXRlciBmaXhlcyAjMTM2MiBidXRcblx0XHRcdFx0XHRcdFx0Ly8gaXQgd291bGQgYnJlYWsgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuLi5cblx0XHRcdFx0XHRcdFx0Y29uZmlnSGVhZGVycyA9IHRzLmdldENvbHVtbkRhdGEoIHRhYmxlLCBjLmhlYWRlcnMsIGNvbEluZGV4ICk7IC8vICwgdHJ1ZSApO1xuXHRcdFx0XHRcdFx0XHQvLyBnZXQgY29sdW1uIHBhcnNlci9leHRyYWN0b3Jcblx0XHRcdFx0XHRcdFx0ZXh0cmFjdG9yID0gdHMuZ2V0UGFyc2VyQnlJZCggdHMuZ2V0RGF0YSggaGVhZGVyLCBjb25maWdIZWFkZXJzLCAnZXh0cmFjdG9yJyApICk7XG5cdFx0XHRcdFx0XHRcdHBhcnNlciA9IHRzLmdldFBhcnNlckJ5SWQoIHRzLmdldERhdGEoIGhlYWRlciwgY29uZmlnSGVhZGVycywgJ3NvcnRlcicgKSApO1xuXHRcdFx0XHRcdFx0XHRub1BhcnNlciA9IHRzLmdldERhdGEoIGhlYWRlciwgY29uZmlnSGVhZGVycywgJ3BhcnNlcicgKSA9PT0gJ2ZhbHNlJztcblx0XHRcdFx0XHRcdFx0Ly8gZW1wdHkgY2VsbHMgYmVoYXZpb3VyIC0ga2VlcGluZyBlbXB0eVRvQm90dG9tIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuXHRcdFx0XHRcdFx0XHRjLmVtcHRpZXNbY29sSW5kZXhdID0gKFxuXHRcdFx0XHRcdFx0XHRcdHRzLmdldERhdGEoIGhlYWRlciwgY29uZmlnSGVhZGVycywgJ2VtcHR5JyApIHx8XG5cdFx0XHRcdFx0XHRcdFx0Yy5lbXB0eVRvIHx8ICggYy5lbXB0eVRvQm90dG9tID8gJ2JvdHRvbScgOiAndG9wJyApICkudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdFx0Ly8gdGV4dCBzdHJpbmdzIGJlaGF2aW91ciBpbiBudW1lcmljYWwgc29ydHNcblx0XHRcdFx0XHRcdFx0Yy5zdHJpbmdzW2NvbEluZGV4XSA9IChcblx0XHRcdFx0XHRcdFx0XHR0cy5nZXREYXRhKCBoZWFkZXIsIGNvbmZpZ0hlYWRlcnMsICdzdHJpbmcnICkgfHxcblx0XHRcdFx0XHRcdFx0XHRjLnN0cmluZ1RvIHx8XG5cdFx0XHRcdFx0XHRcdFx0J21heCcgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIG5vUGFyc2VyICkge1xuXHRcdFx0XHRcdFx0XHRcdHBhcnNlciA9IHRzLmdldFBhcnNlckJ5SWQoICduby1wYXJzZXInICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCAhZXh0cmFjdG9yICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIEZvciBub3csIG1heWJlIGRldGVjdCBzb21lZGF5XG5cdFx0XHRcdFx0XHRcdFx0ZXh0cmFjdG9yID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCAhcGFyc2VyICkge1xuXHRcdFx0XHRcdFx0XHRcdHBhcnNlciA9IHRzLmRldGVjdFBhcnNlckZvckNvbHVtbiggYywgcm93cywgLTEsIGNvbEluZGV4ICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRcdFx0XHRcdGRlYnVnWyAnKCcgKyBjb2xJbmRleCArICcpICcgKyBoZWFkZXIudGV4dCgpIF0gPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwYXJzZXIgOiBwYXJzZXIuaWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRleHRyYWN0b3IgOiBleHRyYWN0b3IgPyBleHRyYWN0b3IuaWQgOiAnbm9uZScsXG5cdFx0XHRcdFx0XHRcdFx0XHRzdHJpbmcgOiBjLnN0cmluZ3NbIGNvbEluZGV4IF0sXG5cdFx0XHRcdFx0XHRcdFx0XHRlbXB0eSAgOiBjLmVtcHRpZXNbIGNvbEluZGV4IF1cblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGxpc3QucGFyc2Vyc1sgY29sSW5kZXggXSA9IHBhcnNlcjtcblx0XHRcdFx0XHRcdFx0bGlzdC5leHRyYWN0b3JzWyBjb2xJbmRleCBdID0gZXh0cmFjdG9yO1xuXHRcdFx0XHRcdFx0XHRzcGFuID0gaGVhZGVyWyAwIF0uY29sU3BhbiAtIDE7XG5cdFx0XHRcdFx0XHRcdGlmICggc3BhbiA+IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29sSW5kZXggKz0gc3Bhbjtcblx0XHRcdFx0XHRcdFx0XHRtYXggKz0gc3Bhbjtcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAoIHNwYW4gKyAxID4gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIHNldCBjb2xzcGFuIGNvbHVtbnMgdG8gdXNlIHRoZSBzYW1lIHBhcnNlcnMgJiBleHRyYWN0b3JzXG5cdFx0XHRcdFx0XHRcdFx0XHRsaXN0LnBhcnNlcnNbIGNvbEluZGV4IC0gc3BhbiBdID0gcGFyc2VyO1xuXHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5leHRyYWN0b3JzWyBjb2xJbmRleCAtIHNwYW4gXSA9IGV4dHJhY3Rvcjtcblx0XHRcdFx0XHRcdFx0XHRcdHNwYW4tLTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbEluZGV4Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRib2R5SW5kZXggKz0gKCBsaXN0LnBhcnNlcnMubGVuZ3RoICkgPyBsZW4gOiAxO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRpZiAoICF0cy5pc0VtcHR5T2JqZWN0KCBkZWJ1ZyApICkge1xuXHRcdFx0XHRcdGNvbnNvbGVbIGNvbnNvbGUudGFibGUgPyAndGFibGUnIDogJ2xvZycgXSggZGVidWcgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oICcgIE5vIHBhcnNlcnMgZGV0ZWN0ZWQhJyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnNvbGUubG9nKCAnQ29tcGxldGVkIGRldGVjdGluZyBwYXJzZXJzJyArIHRzLmJlbmNobWFyayggdGltZSApICk7XG5cdFx0XHRcdGlmICggY29uc29sZS5ncm91cEVuZCApIHsgY29uc29sZS5ncm91cEVuZCgpOyB9XG5cdFx0XHR9XG5cdFx0XHRjLnBhcnNlcnMgPSBsaXN0LnBhcnNlcnM7XG5cdFx0XHRjLmV4dHJhY3RvcnMgPSBsaXN0LmV4dHJhY3RvcnM7XG5cdFx0fSxcblxuXHRcdGFkZFBhcnNlciA6IGZ1bmN0aW9uKCBwYXJzZXIgKSB7XG5cdFx0XHR2YXIgaW5keCxcblx0XHRcdFx0bGVuID0gdHMucGFyc2Vycy5sZW5ndGgsXG5cdFx0XHRcdGFkZCA9IHRydWU7XG5cdFx0XHRmb3IgKCBpbmR4ID0gMDsgaW5keCA8IGxlbjsgaW5keCsrICkge1xuXHRcdFx0XHRpZiAoIHRzLnBhcnNlcnNbIGluZHggXS5pZC50b0xvd2VyQ2FzZSgpID09PSBwYXJzZXIuaWQudG9Mb3dlckNhc2UoKSApIHtcblx0XHRcdFx0XHRhZGQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCBhZGQgKSB7XG5cdFx0XHRcdHRzLnBhcnNlcnNbIHRzLnBhcnNlcnMubGVuZ3RoIF0gPSBwYXJzZXI7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGdldFBhcnNlckJ5SWQgOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRcdC8qanNoaW50IGVxZXFlcTpmYWxzZSAqL1xuXHRcdFx0aWYgKCBuYW1lID09ICdmYWxzZScgKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dmFyIGluZHgsXG5cdFx0XHRcdGxlbiA9IHRzLnBhcnNlcnMubGVuZ3RoO1xuXHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBsZW47IGluZHgrKyApIHtcblx0XHRcdFx0aWYgKCB0cy5wYXJzZXJzWyBpbmR4IF0uaWQudG9Mb3dlckNhc2UoKSA9PT0gKCBuYW1lLnRvU3RyaW5nKCkgKS50b0xvd2VyQ2FzZSgpICkge1xuXHRcdFx0XHRcdHJldHVybiB0cy5wYXJzZXJzWyBpbmR4IF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXG5cdFx0ZGV0ZWN0UGFyc2VyRm9yQ29sdW1uIDogZnVuY3Rpb24oIGMsIHJvd3MsIHJvd0luZGV4LCBjZWxsSW5kZXggKSB7XG5cdFx0XHR2YXIgY3VyLCAkbm9kZSwgcm93LFxuXHRcdFx0XHRpbmR4ID0gdHMucGFyc2Vycy5sZW5ndGgsXG5cdFx0XHRcdG5vZGUgPSBmYWxzZSxcblx0XHRcdFx0bm9kZVZhbHVlID0gJycsXG5cdFx0XHRcdGtlZXBMb29raW5nID0gdHJ1ZTtcblx0XHRcdHdoaWxlICggbm9kZVZhbHVlID09PSAnJyAmJiBrZWVwTG9va2luZyApIHtcblx0XHRcdFx0cm93SW5kZXgrKztcblx0XHRcdFx0cm93ID0gcm93c1sgcm93SW5kZXggXTtcblx0XHRcdFx0Ly8gc3RvcCBsb29raW5nIGFmdGVyIDUwIGVtcHR5IHJvd3Ncblx0XHRcdFx0aWYgKCByb3cgJiYgcm93SW5kZXggPCA1MCApIHtcblx0XHRcdFx0XHRpZiAoIHJvdy5jbGFzc05hbWUuaW5kZXhPZiggdHMuY3NzSWdub3JlUm93ICkgPCAwICkge1xuXHRcdFx0XHRcdFx0bm9kZSA9IHJvd3NbIHJvd0luZGV4IF0uY2VsbHNbIGNlbGxJbmRleCBdO1xuXHRcdFx0XHRcdFx0bm9kZVZhbHVlID0gdHMuZ2V0RWxlbWVudFRleHQoIGMsIG5vZGUsIGNlbGxJbmRleCApO1xuXHRcdFx0XHRcdFx0JG5vZGUgPSAkKCBub2RlICk7XG5cdFx0XHRcdFx0XHRpZiAoIGMuZGVidWcgKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCAnQ2hlY2tpbmcgaWYgdmFsdWUgd2FzIGVtcHR5IG9uIHJvdyAnICsgcm93SW5kZXggKyAnLCBjb2x1bW46ICcgK1xuXHRcdFx0XHRcdFx0XHRcdGNlbGxJbmRleCArICc6IFwiJyArIG5vZGVWYWx1ZSArICdcIicgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0a2VlcExvb2tpbmcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0d2hpbGUgKCAtLWluZHggPj0gMCApIHtcblx0XHRcdFx0Y3VyID0gdHMucGFyc2Vyc1sgaW5keCBdO1xuXHRcdFx0XHQvLyBpZ25vcmUgdGhlIGRlZmF1bHQgdGV4dCBwYXJzZXIgYmVjYXVzZSBpdCB3aWxsIGFsd2F5cyBiZSB0cnVlXG5cdFx0XHRcdGlmICggY3VyICYmIGN1ci5pZCAhPT0gJ3RleHQnICYmIGN1ci5pcyAmJiBjdXIuaXMoIG5vZGVWYWx1ZSwgYy50YWJsZSwgbm9kZSwgJG5vZGUgKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gY3VyO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBub3RoaW5nIGZvdW5kLCByZXR1cm4gdGhlIGdlbmVyaWMgcGFyc2VyICh0ZXh0KVxuXHRcdFx0cmV0dXJuIHRzLmdldFBhcnNlckJ5SWQoICd0ZXh0JyApO1xuXHRcdH0sXG5cblx0XHRnZXRFbGVtZW50VGV4dCA6IGZ1bmN0aW9uKCBjLCBub2RlLCBjZWxsSW5kZXggKSB7XG5cdFx0XHRpZiAoICFub2RlICkgeyByZXR1cm4gJyc7IH1cblx0XHRcdHZhciB0bXAsXG5cdFx0XHRcdGV4dHJhY3QgPSBjLnRleHRFeHRyYWN0aW9uIHx8ICcnLFxuXHRcdFx0XHQvLyBub2RlIGNvdWxkIGJlIGEganF1ZXJ5IG9iamVjdFxuXHRcdFx0XHQvLyBodHRwOi8vanNwZXJmLmNvbS9qcXVlcnktdnMtaW5zdGFuY2VvZi1qcXVlcnkvMlxuXHRcdFx0XHQkbm9kZSA9IG5vZGUuanF1ZXJ5ID8gbm9kZSA6ICQoIG5vZGUgKTtcblx0XHRcdGlmICggdHlwZW9mIGV4dHJhY3QgPT09ICdzdHJpbmcnICkge1xuXHRcdFx0XHQvLyBjaGVjayBkYXRhLWF0dHJpYnV0ZSBmaXJzdCB3aGVuIHNldCB0byAnYmFzaWMnOyBkb24ndCB1c2Ugbm9kZS5pbm5lclRleHQgLSBpdCdzIHJlYWxseSBzbG93IVxuXHRcdFx0XHQvLyBodHRwOi8vd3d3LmtlbGxlZ291cy5jb20vai8yMDEzLzAyLzI3L2lubmVydGV4dC12cy10ZXh0Y29udGVudC9cblx0XHRcdFx0aWYgKCBleHRyYWN0ID09PSAnYmFzaWMnICYmIHR5cGVvZiAoIHRtcCA9ICRub2RlLmF0dHIoIGMudGV4dEF0dHJpYnV0ZSApICkgIT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0XHRcdHJldHVybiAkLnRyaW0oIHRtcCApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAkLnRyaW0oIG5vZGUudGV4dENvbnRlbnQgfHwgJG5vZGUudGV4dCgpICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIHR5cGVvZiBleHRyYWN0ID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0XHRcdHJldHVybiAkLnRyaW0oIGV4dHJhY3QoICRub2RlWyAwIF0sIGMudGFibGUsIGNlbGxJbmRleCApICk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiAoIHRtcCA9IHRzLmdldENvbHVtbkRhdGEoIGMudGFibGUsIGV4dHJhY3QsIGNlbGxJbmRleCApICkgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdFx0cmV0dXJuICQudHJpbSggdG1wKCAkbm9kZVsgMCBdLCBjLnRhYmxlLCBjZWxsSW5kZXggKSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBmYWxsYmFja1xuXHRcdFx0cmV0dXJuICQudHJpbSggJG5vZGVbIDAgXS50ZXh0Q29udGVudCB8fCAkbm9kZS50ZXh0KCkgKTtcblx0XHR9LFxuXG5cdFx0Ly8gY2VudHJhbGl6ZWQgZnVuY3Rpb24gdG8gZXh0cmFjdC9wYXJzZSBjZWxsIGNvbnRlbnRzXG5cdFx0Z2V0UGFyc2VkVGV4dCA6IGZ1bmN0aW9uKCBjLCBjZWxsLCBjb2xJbmRleCwgdHh0ICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdHh0ID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0dHh0ID0gdHMuZ2V0RWxlbWVudFRleHQoIGMsIGNlbGwsIGNvbEluZGV4ICk7XG5cdFx0XHR9XG5cdFx0XHQvLyBpZiBubyBwYXJzZXIsIG1ha2Ugc3VyZSB0byByZXR1cm4gdGhlIHR4dFxuXHRcdFx0dmFyIHZhbCA9ICcnICsgdHh0LFxuXHRcdFx0XHRwYXJzZXIgPSBjLnBhcnNlcnNbIGNvbEluZGV4IF0sXG5cdFx0XHRcdGV4dHJhY3RvciA9IGMuZXh0cmFjdG9yc1sgY29sSW5kZXggXTtcblx0XHRcdGlmICggcGFyc2VyICkge1xuXHRcdFx0XHQvLyBkbyBleHRyYWN0IGJlZm9yZSBwYXJzaW5nLCBpZiB0aGVyZSBpcyBvbmVcblx0XHRcdFx0aWYgKCBleHRyYWN0b3IgJiYgdHlwZW9mIGV4dHJhY3Rvci5mb3JtYXQgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdFx0dHh0ID0gZXh0cmFjdG9yLmZvcm1hdCggdHh0LCBjLnRhYmxlLCBjZWxsLCBjb2xJbmRleCApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGFsbG93IHBhcnNpbmcgaWYgdGhlIHN0cmluZyBpcyBlbXB0eSwgcHJldmlvdXNseSBwYXJzaW5nIHdvdWxkIGNoYW5nZSBpdCB0byB6ZXJvLFxuXHRcdFx0XHQvLyBpbiBjYXNlIHRoZSBwYXJzZXIgbmVlZHMgdG8gZXh0cmFjdCBkYXRhIGZyb20gdGhlIHRhYmxlIGNlbGwgYXR0cmlidXRlc1xuXHRcdFx0XHR2YWwgPSBwYXJzZXIuaWQgPT09ICduby1wYXJzZXInID8gJycgOlxuXHRcdFx0XHRcdC8vIG1ha2Ugc3VyZSB0eHQgaXMgYSBzdHJpbmcgKGV4dHJhY3RvciBtYXkgaGF2ZSBjb252ZXJ0ZWQgaXQpXG5cdFx0XHRcdFx0cGFyc2VyLmZvcm1hdCggJycgKyB0eHQsIGMudGFibGUsIGNlbGwsIGNvbEluZGV4ICk7XG5cdFx0XHRcdGlmICggYy5pZ25vcmVDYXNlICYmIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICkge1xuXHRcdFx0XHRcdHZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsO1xuXHRcdH0sXG5cblx0XHQvKlxuXHRcdOKWhOKWiOKWiOKWiOKWiOKWhCDiloTilojilojilojilojiloQg4paE4paI4paI4paI4paI4paEIOKWiOKWiCAg4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWiFxuXHRcdOKWiOKWiCAg4paA4paAIOKWiOKWiOKWhOKWhOKWiOKWiCDilojiloggIOKWgOKWgCDilojilojiloTiloTilojilogg4paI4paI4paE4paEXG5cdFx04paI4paIICDiloTiloQg4paI4paI4paA4paA4paI4paIIOKWiOKWiCAg4paE4paEIOKWiOKWiOKWgOKWgOKWiOKWiCDilojilojiloDiloBcblx0XHTiloDilojilojilojilojiloAg4paI4paIICDilojilogg4paA4paI4paI4paI4paI4paAIOKWiOKWiCAg4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWiFxuXHRcdCovXG5cdFx0YnVpbGRDYWNoZSA6IGZ1bmN0aW9uKCBjLCBjYWxsYmFjaywgJHRib2RpZXMgKSB7XG5cdFx0XHR2YXIgY2FjaGUsIHZhbCwgdHh0LCByb3dJbmRleCwgY29sSW5kZXgsIHRib2R5SW5kZXgsICR0Ym9keSwgJHJvdyxcblx0XHRcdFx0Y29scywgJGNlbGxzLCBjZWxsLCBjYWNoZVRpbWUsIHRvdGFsUm93cywgcm93RGF0YSwgcHJldlJvd0RhdGEsXG5cdFx0XHRcdGNvbE1heCwgc3BhbiwgY2FjaGVJbmRleCwgaGFzUGFyc2VyLCBtYXgsIGxlbiwgaW5kZXgsXG5cdFx0XHRcdHRhYmxlID0gYy50YWJsZSxcblx0XHRcdFx0cGFyc2VycyA9IGMucGFyc2Vycztcblx0XHRcdC8vIHVwZGF0ZSB0Ym9keSB2YXJpYWJsZVxuXHRcdFx0Yy4kdGJvZGllcyA9IGMuJHRhYmxlLmNoaWxkcmVuKCAndGJvZHk6bm90KC4nICsgYy5jc3NJbmZvQmxvY2sgKyAnKScgKTtcblx0XHRcdCR0Ym9keSA9IHR5cGVvZiAkdGJvZGllcyA9PT0gJ3VuZGVmaW5lZCcgPyBjLiR0Ym9kaWVzIDogJHRib2RpZXMsXG5cdFx0XHRjLmNhY2hlID0ge307XG5cdFx0XHRjLnRvdGFsUm93cyA9IDA7XG5cdFx0XHQvLyBpZiBubyBwYXJzZXJzIGZvdW5kLCByZXR1cm4gLSBpdCdzIGFuIGVtcHR5IHRhYmxlLlxuXHRcdFx0aWYgKCAhcGFyc2VycyApIHtcblx0XHRcdFx0cmV0dXJuIGMuZGVidWcgPyBjb25zb2xlLndhcm4oICdXYXJuaW5nOiAqRW1wdHkgdGFibGUhKiBOb3QgYnVpbGRpbmcgYSBjYWNoZScgKSA6ICcnO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRjYWNoZVRpbWUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gcHJvY2Vzc2luZyBpY29uXG5cdFx0XHRpZiAoIGMuc2hvd1Byb2Nlc3NpbmcgKSB7XG5cdFx0XHRcdHRzLmlzUHJvY2Vzc2luZyggdGFibGUsIHRydWUgKTtcblx0XHRcdH1cblx0XHRcdGZvciAoIHRib2R5SW5kZXggPSAwOyB0Ym9keUluZGV4IDwgJHRib2R5Lmxlbmd0aDsgdGJvZHlJbmRleCsrICkge1xuXHRcdFx0XHRjb2xNYXggPSBbXTsgLy8gY29sdW1uIG1heCB2YWx1ZSBwZXIgdGJvZHlcblx0XHRcdFx0Y2FjaGUgPSBjLmNhY2hlWyB0Ym9keUluZGV4IF0gPSB7XG5cdFx0XHRcdFx0bm9ybWFsaXplZDogW10gLy8gYXJyYXkgb2Ygbm9ybWFsaXplZCByb3cgZGF0YTsgbGFzdCBlbnRyeSBjb250YWlucyAncm93RGF0YScgYWJvdmVcblx0XHRcdFx0XHQvLyBjb2xNYXg6ICMgICAvLyBhZGRlZCBhdCB0aGUgZW5kXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0dG90YWxSb3dzID0gKCAkdGJvZHlbIHRib2R5SW5kZXggXSAmJiAkdGJvZHlbIHRib2R5SW5kZXggXS5yb3dzLmxlbmd0aCApIHx8IDA7XG5cdFx0XHRcdGZvciAoIHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0b3RhbFJvd3M7ICsrcm93SW5kZXggKSB7XG5cdFx0XHRcdFx0cm93RGF0YSA9IHtcblx0XHRcdFx0XHRcdC8vIG9yZGVyOiBvcmlnaW5hbCByb3cgb3JkZXIgI1xuXHRcdFx0XHRcdFx0Ly8gJHJvdyA6IGpRdWVyeSBPYmplY3RbXVxuXHRcdFx0XHRcdFx0Y2hpbGQ6IFtdLCAvLyBjaGlsZCByb3cgdGV4dCAoZmlsdGVyIHdpZGdldClcblx0XHRcdFx0XHRcdHJhdzogW10gICAgLy8gb3JpZ2luYWwgcm93IHRleHRcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdC8qKiBBZGQgdGhlIHRhYmxlIGRhdGEgdG8gbWFpbiBkYXRhIGFycmF5ICovXG5cdFx0XHRcdFx0JHJvdyA9ICQoICR0Ym9keVsgdGJvZHlJbmRleCBdLnJvd3NbIHJvd0luZGV4IF0gKTtcblx0XHRcdFx0XHRjb2xzID0gW107XG5cdFx0XHRcdFx0Ly8gaWdub3JlIFwicmVtb3ZlLW1lXCIgcm93c1xuXHRcdFx0XHRcdGlmICggJHJvdy5oYXNDbGFzcyggYy5zZWxlY3RvclJlbW92ZS5zbGljZSgxKSApICkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGlmIHRoaXMgaXMgYSBjaGlsZCByb3csIGFkZCBpdCB0byB0aGUgbGFzdCByb3cncyBjaGlsZHJlbiBhbmQgY29udGludWUgdG8gdGhlIG5leHQgcm93XG5cdFx0XHRcdFx0Ly8gaWdub3JlIGNoaWxkIHJvdyBjbGFzcywgaWYgaXQgaXMgdGhlIGZpcnN0IHJvd1xuXHRcdFx0XHRcdGlmICggJHJvdy5oYXNDbGFzcyggYy5jc3NDaGlsZFJvdyApICYmIHJvd0luZGV4ICE9PSAwICkge1xuXHRcdFx0XHRcdFx0bGVuID0gY2FjaGUubm9ybWFsaXplZC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0cHJldlJvd0RhdGEgPSBjYWNoZS5ub3JtYWxpemVkWyBsZW4gXVsgYy5jb2x1bW5zIF07XG5cdFx0XHRcdFx0XHRwcmV2Um93RGF0YS4kcm93ID0gcHJldlJvd0RhdGEuJHJvdy5hZGQoICRyb3cgKTtcblx0XHRcdFx0XHRcdC8vIGFkZCAnaGFzQ2hpbGQnIGNsYXNzIG5hbWUgdG8gcGFyZW50IHJvd1xuXHRcdFx0XHRcdFx0aWYgKCAhJHJvdy5wcmV2KCkuaGFzQ2xhc3MoIGMuY3NzQ2hpbGRSb3cgKSApIHtcblx0XHRcdFx0XHRcdFx0JHJvdy5wcmV2KCkuYWRkQ2xhc3MoIHRzLmNzcy5jc3NIYXNDaGlsZCApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gc2F2ZSBjaGlsZCByb3cgY29udGVudCAodW4tcGFyc2VkISlcblx0XHRcdFx0XHRcdCRjZWxscyA9ICRyb3cuY2hpbGRyZW4oICd0aCwgdGQnICk7XG5cdFx0XHRcdFx0XHRsZW4gPSBwcmV2Um93RGF0YS5jaGlsZC5sZW5ndGg7XG5cdFx0XHRcdFx0XHRwcmV2Um93RGF0YS5jaGlsZFsgbGVuIF0gPSBbXTtcblx0XHRcdFx0XHRcdC8vIGNoaWxkIHJvdyBjb250ZW50IGRvZXMgbm90IGFjY291bnQgZm9yIGNvbHNwYW5zL3Jvd3NwYW5zOyBzbyBpbmRleGluZyBtYXkgYmUgb2ZmXG5cdFx0XHRcdFx0XHRjYWNoZUluZGV4ID0gMDtcblx0XHRcdFx0XHRcdG1heCA9IGMuY29sdW1ucztcblx0XHRcdFx0XHRcdGZvciAoIGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCBtYXg7IGNvbEluZGV4KysgKSB7XG5cdFx0XHRcdFx0XHRcdGNlbGwgPSAkY2VsbHNbIGNvbEluZGV4IF07XG5cdFx0XHRcdFx0XHRcdGlmICggY2VsbCApIHtcblx0XHRcdFx0XHRcdFx0XHRwcmV2Um93RGF0YS5jaGlsZFsgbGVuIF1bIGNvbEluZGV4IF0gPSB0cy5nZXRQYXJzZWRUZXh0KCBjLCBjZWxsLCBjb2xJbmRleCApO1xuXHRcdFx0XHRcdFx0XHRcdHNwYW4gPSAkY2VsbHNbIGNvbEluZGV4IF0uY29sU3BhbiAtIDE7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBzcGFuID4gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhY2hlSW5kZXggKz0gc3Bhbjtcblx0XHRcdFx0XHRcdFx0XHRcdG1heCArPSBzcGFuO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRjYWNoZUluZGV4Kys7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBnbyB0byB0aGUgbmV4dCBmb3IgbG9vcFxuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJvd0RhdGEuJHJvdyA9ICRyb3c7XG5cdFx0XHRcdFx0cm93RGF0YS5vcmRlciA9IHJvd0luZGV4OyAvLyBhZGQgb3JpZ2luYWwgcm93IHBvc2l0aW9uIHRvIHJvd0NhY2hlXG5cdFx0XHRcdFx0Y2FjaGVJbmRleCA9IDA7XG5cdFx0XHRcdFx0bWF4ID0gYy5jb2x1bW5zO1xuXHRcdFx0XHRcdGZvciAoIGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCBtYXg7ICsrY29sSW5kZXggKSB7XG5cdFx0XHRcdFx0XHRjZWxsID0gJHJvd1sgMCBdLmNlbGxzWyBjb2xJbmRleCBdO1xuXHRcdFx0XHRcdFx0aWYgKCBjZWxsICYmIGNhY2hlSW5kZXggPCBjLmNvbHVtbnMgKSB7XG5cdFx0XHRcdFx0XHRcdGhhc1BhcnNlciA9IHR5cGVvZiBwYXJzZXJzWyBjYWNoZUluZGV4IF0gIT09ICd1bmRlZmluZWQnO1xuXHRcdFx0XHRcdFx0XHRpZiAoICFoYXNQYXJzZXIgJiYgYy5kZWJ1ZyApIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oICdObyBwYXJzZXIgZm91bmQgZm9yIHJvdzogJyArIHJvd0luZGV4ICsgJywgY29sdW1uOiAnICsgY29sSW5kZXggK1xuXHRcdFx0XHRcdFx0XHRcdFx0JzsgY2VsbCBjb250YWluaW5nOiBcIicgKyAkKGNlbGwpLnRleHQoKSArICdcIjsgZG9lcyBpdCBoYXZlIGEgaGVhZGVyPycgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR2YWwgPSB0cy5nZXRFbGVtZW50VGV4dCggYywgY2VsbCwgY2FjaGVJbmRleCApO1xuXHRcdFx0XHRcdFx0XHRyb3dEYXRhLnJhd1sgY2FjaGVJbmRleCBdID0gdmFsOyAvLyBzYXZlIG9yaWdpbmFsIHJvdyB0ZXh0XG5cdFx0XHRcdFx0XHRcdC8vIHNhdmUgcmF3IGNvbHVtbiB0ZXh0IGV2ZW4gaWYgdGhlcmUgaXMgbm8gcGFyc2VyIHNldFxuXHRcdFx0XHRcdFx0XHR0eHQgPSB0cy5nZXRQYXJzZWRUZXh0KCBjLCBjZWxsLCBjYWNoZUluZGV4LCB2YWwgKTtcblx0XHRcdFx0XHRcdFx0Y29sc1sgY2FjaGVJbmRleCBdID0gdHh0O1xuXHRcdFx0XHRcdFx0XHRpZiAoIGhhc1BhcnNlciAmJiAoIHBhcnNlcnNbIGNhY2hlSW5kZXggXS50eXBlIHx8ICcnICkudG9Mb3dlckNhc2UoKSA9PT0gJ251bWVyaWMnICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGRldGVybWluZSBjb2x1bW4gbWF4IHZhbHVlIChpZ25vcmUgc2lnbilcblx0XHRcdFx0XHRcdFx0XHRjb2xNYXhbIGNhY2hlSW5kZXggXSA9IE1hdGgubWF4KCBNYXRoLmFicyggdHh0ICkgfHwgMCwgY29sTWF4WyBjYWNoZUluZGV4IF0gfHwgMCApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdC8vIGFsbG93IGNvbFNwYW4gaW4gdGJvZHlcblx0XHRcdFx0XHRcdFx0c3BhbiA9IGNlbGwuY29sU3BhbiAtIDE7XG5cdFx0XHRcdFx0XHRcdGlmICggc3BhbiA+IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0aW5kZXggPSAwO1xuXHRcdFx0XHRcdFx0XHRcdHdoaWxlICggaW5kZXggPD0gc3BhbiApIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGR1cGxpY2F0ZSB0ZXh0IChvciBub3QpIHRvIHNwYW5uZWQgY29sdW1uc1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gaW5zdGVhZCBvZiBzZXR0aW5nIGR1cGxpY2F0ZSBzcGFuIHRvIGVtcHR5IHN0cmluZywgdXNlIHRleHRFeHRyYWN0aW9uIHRvIHRyeSB0byBnZXQgYSB2YWx1ZVxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xLzM2NDQ5NzExLzE0NTM0NlxuXHRcdFx0XHRcdFx0XHRcdFx0dHh0ID0gYy5kdXBsaWNhdGVTcGFuIHx8IGluZGV4ID09PSAwID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZW9mIGMudGV4dEV4dHJhY3Rpb24gIT09ICdzdHJpbmcnID9cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0cy5nZXRFbGVtZW50VGV4dCggYywgY2VsbCwgY2FjaGVJbmRleCArIGluZGV4ICkgfHwgJycgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCcnO1xuXHRcdFx0XHRcdFx0XHRcdFx0cm93RGF0YS5yYXdbIGNhY2hlSW5kZXggKyBpbmRleCBdID0gdHh0O1xuXHRcdFx0XHRcdFx0XHRcdFx0Y29sc1sgY2FjaGVJbmRleCArIGluZGV4IF0gPSB0eHQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRjYWNoZUluZGV4ICs9IHNwYW47XG5cdFx0XHRcdFx0XHRcdFx0bWF4ICs9IHNwYW47XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhY2hlSW5kZXgrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gZW5zdXJlIHJvd0RhdGEgaXMgYWx3YXlzIGluIHRoZSBzYW1lIGxvY2F0aW9uIChhZnRlciB0aGUgbGFzdCBjb2x1bW4pXG5cdFx0XHRcdFx0Y29sc1sgYy5jb2x1bW5zIF0gPSByb3dEYXRhO1xuXHRcdFx0XHRcdGNhY2hlLm5vcm1hbGl6ZWRbIGNhY2hlLm5vcm1hbGl6ZWQubGVuZ3RoIF0gPSBjb2xzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhY2hlLmNvbE1heCA9IGNvbE1heDtcblx0XHRcdFx0Ly8gdG90YWwgdXAgcm93cywgbm90IGluY2x1ZGluZyBjaGlsZCByb3dzXG5cdFx0XHRcdGMudG90YWxSb3dzICs9IGNhY2hlLm5vcm1hbGl6ZWQubGVuZ3RoO1xuXG5cdFx0XHR9XG5cdFx0XHRpZiAoIGMuc2hvd1Byb2Nlc3NpbmcgKSB7XG5cdFx0XHRcdHRzLmlzUHJvY2Vzc2luZyggdGFibGUgKTsgLy8gcmVtb3ZlIHByb2Nlc3NpbmcgaWNvblxuXHRcdFx0fVxuXHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRsZW4gPSBNYXRoLm1pbiggNSwgYy5jYWNoZVsgMCBdLm5vcm1hbGl6ZWQubGVuZ3RoICk7XG5cdFx0XHRcdGNvbnNvbGVbIGNvbnNvbGUuZ3JvdXAgPyAnZ3JvdXAnIDogJ2xvZycgXSggJ0J1aWxkaW5nIGNhY2hlIGZvciAnICsgYy50b3RhbFJvd3MgK1xuXHRcdFx0XHRcdCcgcm93cyAoc2hvd2luZyAnICsgbGVuICsgJyByb3dzIGluIGxvZykgYW5kICcgKyBjLmNvbHVtbnMgKyAnIGNvbHVtbnMnICtcblx0XHRcdFx0XHR0cy5iZW5jaG1hcmsoIGNhY2hlVGltZSApICk7XG5cdFx0XHRcdHZhbCA9IHt9O1xuXHRcdFx0XHRmb3IgKCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgYy5jb2x1bW5zOyBjb2xJbmRleCsrICkge1xuXHRcdFx0XHRcdGZvciAoIGNhY2hlSW5kZXggPSAwOyBjYWNoZUluZGV4IDwgbGVuOyBjYWNoZUluZGV4KysgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICF2YWxbICdyb3c6ICcgKyBjYWNoZUluZGV4IF0gKSB7XG5cdFx0XHRcdFx0XHRcdHZhbFsgJ3JvdzogJyArIGNhY2hlSW5kZXggXSA9IHt9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFsWyAncm93OiAnICsgY2FjaGVJbmRleCBdWyBjLiRoZWFkZXJJbmRleGVkWyBjb2xJbmRleCBdLnRleHQoKSBdID1cblx0XHRcdFx0XHRcdFx0Yy5jYWNoZVsgMCBdLm5vcm1hbGl6ZWRbIGNhY2hlSW5kZXggXVsgY29sSW5kZXggXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc29sZVsgY29uc29sZS50YWJsZSA/ICd0YWJsZScgOiAnbG9nJyBdKCB2YWwgKTtcblx0XHRcdFx0aWYgKCBjb25zb2xlLmdyb3VwRW5kICkgeyBjb25zb2xlLmdyb3VwRW5kKCk7IH1cblx0XHRcdH1cblx0XHRcdGlmICggJC5pc0Z1bmN0aW9uKCBjYWxsYmFjayApICkge1xuXHRcdFx0XHRjYWxsYmFjayggdGFibGUgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Z2V0Q29sdW1uVGV4dCA6IGZ1bmN0aW9uKCB0YWJsZSwgY29sdW1uLCBjYWxsYmFjaywgcm93RmlsdGVyICkge1xuXHRcdFx0dGFibGUgPSAkKCB0YWJsZSApWzBdO1xuXHRcdFx0dmFyIHRib2R5SW5kZXgsIHJvd0luZGV4LCBjYWNoZSwgcm93LCB0Ym9keUxlbiwgcm93TGVuLCByYXcsIHBhcnNlZCwgJGNlbGwsIHJlc3VsdCxcblx0XHRcdFx0aGFzQ2FsbGJhY2sgPSB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicsXG5cdFx0XHRcdGFsbENvbHVtbnMgPSBjb2x1bW4gPT09ICdhbGwnLFxuXHRcdFx0XHRkYXRhID0geyByYXcgOiBbXSwgcGFyc2VkOiBbXSwgJGNlbGw6IFtdIH0sXG5cdFx0XHRcdGMgPSB0YWJsZS5jb25maWc7XG5cdFx0XHRpZiAoIHRzLmlzRW1wdHlPYmplY3QoIGMgKSApIHtcblx0XHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybiggJ05vIGNhY2hlIGZvdW5kIC0gYWJvcnRpbmcgZ2V0Q29sdW1uVGV4dCBmdW5jdGlvbiEnICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRib2R5TGVuID0gYy4kdGJvZGllcy5sZW5ndGg7XG5cdFx0XHRcdGZvciAoIHRib2R5SW5kZXggPSAwOyB0Ym9keUluZGV4IDwgdGJvZHlMZW47IHRib2R5SW5kZXgrKyApIHtcblx0XHRcdFx0XHRjYWNoZSA9IGMuY2FjaGVbIHRib2R5SW5kZXggXS5ub3JtYWxpemVkO1xuXHRcdFx0XHRcdHJvd0xlbiA9IGNhY2hlLmxlbmd0aDtcblx0XHRcdFx0XHRmb3IgKCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgcm93TGVuOyByb3dJbmRleCsrICkge1xuXHRcdFx0XHRcdFx0cm93ID0gY2FjaGVbIHJvd0luZGV4IF07XG5cdFx0XHRcdFx0XHRpZiAoIHJvd0ZpbHRlciAmJiAhcm93WyBjLmNvbHVtbnMgXS4kcm93LmlzKCByb3dGaWx0ZXIgKSApIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0cGFyc2VkID0gKCBhbGxDb2x1bW5zICkgPyByb3cuc2xpY2UoIDAsIGMuY29sdW1ucyApIDogcm93WyBjb2x1bW4gXTtcblx0XHRcdFx0XHRcdHJvdyA9IHJvd1sgYy5jb2x1bW5zIF07XG5cdFx0XHRcdFx0XHRyYXcgPSAoIGFsbENvbHVtbnMgKSA/IHJvdy5yYXcgOiByb3cucmF3WyBjb2x1bW4gXTtcblx0XHRcdFx0XHRcdCRjZWxsID0gKCBhbGxDb2x1bW5zICkgPyByb3cuJHJvdy5jaGlsZHJlbigpIDogcm93LiRyb3cuY2hpbGRyZW4oKS5lcSggY29sdW1uICk7XG5cdFx0XHRcdFx0XHRpZiAoIGhhc0NhbGxiYWNrICkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBjYWxsYmFjayh7XG5cdFx0XHRcdFx0XHRcdFx0dGJvZHlJbmRleCA6IHRib2R5SW5kZXgsXG5cdFx0XHRcdFx0XHRcdFx0cm93SW5kZXggOiByb3dJbmRleCxcblx0XHRcdFx0XHRcdFx0XHRwYXJzZWQgOiBwYXJzZWQsXG5cdFx0XHRcdFx0XHRcdFx0cmF3IDogcmF3LFxuXHRcdFx0XHRcdFx0XHRcdCRyb3cgOiByb3cuJHJvdyxcblx0XHRcdFx0XHRcdFx0XHQkY2VsbCA6ICRjZWxsXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCByZXN1bHQgIT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRkYXRhLnBhcnNlZFsgZGF0YS5wYXJzZWQubGVuZ3RoIF0gPSBwYXJzZWQ7XG5cdFx0XHRcdFx0XHRcdGRhdGEucmF3WyBkYXRhLnJhdy5sZW5ndGggXSA9IHJhdztcblx0XHRcdFx0XHRcdFx0ZGF0YS4kY2VsbFsgZGF0YS4kY2VsbC5sZW5ndGggXSA9ICRjZWxsO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyByZXR1cm4gZXZlcnl0aGluZ1xuXHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Lypcblx0XHTilojiloggIOKWiOKWiCDilojilojilojilojilojiloQg4paI4paI4paI4paI4paI4paEIOKWhOKWiOKWiOKWiOKWiOKWhCDilojilojilojilojilojilogg4paI4paI4paI4paI4paI4paIXG5cdFx04paI4paIICDilojilogg4paI4paI4paE4paE4paI4paIIOKWiOKWiCAg4paI4paIIOKWiOKWiOKWhOKWhOKWiOKWiCAgIOKWiOKWiCAgIOKWiOKWiOKWhOKWhFxuXHRcdOKWiOKWiCAg4paI4paIIOKWiOKWiOKWgOKWgOKWgCAg4paI4paIICDilojilogg4paI4paI4paA4paA4paI4paIICAg4paI4paIICAg4paI4paI4paA4paAXG5cdFx04paA4paI4paI4paI4paI4paAIOKWiOKWiCAgICAg4paI4paI4paI4paI4paI4paAIOKWiOKWiCAg4paI4paIICAg4paI4paIICAg4paI4paI4paI4paI4paI4paIXG5cdFx0Ki9cblx0XHRzZXRIZWFkZXJzQ3NzIDogZnVuY3Rpb24oIGMgKSB7XG5cdFx0XHR2YXIgaW5keCwgY29sdW1uLFxuXHRcdFx0XHRsaXN0ID0gYy5zb3J0TGlzdCxcblx0XHRcdFx0bGVuID0gbGlzdC5sZW5ndGgsXG5cdFx0XHRcdG5vbmUgPSB0cy5jc3Muc29ydE5vbmUgKyAnICcgKyBjLmNzc05vbmUsXG5cdFx0XHRcdGNzcyA9IFsgdHMuY3NzLnNvcnRBc2MgKyAnICcgKyBjLmNzc0FzYywgdHMuY3NzLnNvcnREZXNjICsgJyAnICsgYy5jc3NEZXNjIF0sXG5cdFx0XHRcdGNzc0ljb24gPSBbIGMuY3NzSWNvbkFzYywgYy5jc3NJY29uRGVzYywgYy5jc3NJY29uTm9uZSBdLFxuXHRcdFx0XHRhcmlhID0gWyAnYXNjZW5kaW5nJywgJ2Rlc2NlbmRpbmcnIF0sXG5cdFx0XHRcdHVwZGF0ZUNvbHVtblNvcnQgPSBmdW5jdGlvbigkZWwsIGluZGV4KSB7XG5cdFx0XHRcdFx0JGVsXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIG5vbmUgKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCBjc3NbIGluZGV4IF0gKVxuXHRcdFx0XHRcdFx0LmF0dHIoICdhcmlhLXNvcnQnLCBhcmlhWyBpbmRleCBdIClcblx0XHRcdFx0XHRcdC5maW5kKCAnLicgKyB0cy5jc3MuaWNvbiApXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIGNzc0ljb25bIDIgXSApXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3MoIGNzc0ljb25bIGluZGV4IF0gKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Ly8gZmluZCB0aGUgZm9vdGVyXG5cdFx0XHRcdCRleHRyYXMgPSBjLiR0YWJsZVxuXHRcdFx0XHRcdC5maW5kKCAndGZvb3QgdHInIClcblx0XHRcdFx0XHQuY2hpbGRyZW4oICd0ZCwgdGgnIClcblx0XHRcdFx0XHQuYWRkKCAkKCBjLm5hbWVzcGFjZSArICdfZXh0cmFfaGVhZGVycycgKSApXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCBjc3Muam9pbiggJyAnICkgKSxcblx0XHRcdFx0Ly8gcmVtb3ZlIGFsbCBoZWFkZXIgaW5mb3JtYXRpb25cblx0XHRcdFx0JHNvcnRlZCA9IGMuJGhlYWRlcnNcblx0XHRcdFx0XHQuYWRkKCAkKCAndGhlYWQgJyArIGMubmFtZXNwYWNlICsgJ19leHRyYV9oZWFkZXJzJyApIClcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIGNzcy5qb2luKCAnICcgKSApXG5cdFx0XHRcdFx0LmFkZENsYXNzKCBub25lIClcblx0XHRcdFx0XHQuYXR0ciggJ2FyaWEtc29ydCcsICdub25lJyApXG5cdFx0XHRcdFx0LmZpbmQoICcuJyArIHRzLmNzcy5pY29uIClcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIGNzc0ljb24uam9pbiggJyAnICkgKVxuXHRcdFx0XHRcdC5lbmQoKTtcblx0XHRcdC8vIGFkZCBjc3Mgbm9uZSB0byBhbGwgc29ydGFibGUgaGVhZGVyc1xuXHRcdFx0JHNvcnRlZFxuXHRcdFx0XHQubm90KCAnLnNvcnRlci1mYWxzZScgKVxuXHRcdFx0XHQuZmluZCggJy4nICsgdHMuY3NzLmljb24gKVxuXHRcdFx0XHQuYWRkQ2xhc3MoIGNzc0ljb25bIDIgXSApO1xuXHRcdFx0Ly8gYWRkIGRpc2FibGVkIGNzcyBpY29uIGNsYXNzXG5cdFx0XHRpZiAoIGMuY3NzSWNvbkRpc2FibGVkICkge1xuXHRcdFx0XHQkc29ydGVkXG5cdFx0XHRcdFx0LmZpbHRlciggJy5zb3J0ZXItZmFsc2UnIClcblx0XHRcdFx0XHQuZmluZCggJy4nICsgdHMuY3NzLmljb24gKVxuXHRcdFx0XHRcdC5hZGRDbGFzcyggYy5jc3NJY29uRGlzYWJsZWQgKTtcblx0XHRcdH1cblx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdC8vIGRpcmVjdGlvbiA9IDIgbWVhbnMgcmVzZXQhXG5cdFx0XHRcdGlmICggbGlzdFsgaW5keCBdWyAxIF0gIT09IDIgKSB7XG5cdFx0XHRcdFx0Ly8gbXVsdGljb2x1bW4gc29ydGluZyB1cGRhdGluZyAtIHNlZSAjMTAwNVxuXHRcdFx0XHRcdC8vIC5ub3QoZnVuY3Rpb24oKXt9KSBuZWVkcyBqUXVlcnkgMS40XG5cdFx0XHRcdFx0Ly8gZmlsdGVyKGZ1bmN0aW9uKGksIGVsKXt9KSA8LSBlbCBpcyB1bmRlZmluZWQgaW4galF1ZXJ5IHYxLjIuNlxuXHRcdFx0XHRcdCRzb3J0ZWQgPSBjLiRoZWFkZXJzLmZpbHRlciggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdFx0XHQvLyBvbmx5IGluY2x1ZGUgaGVhZGVycyB0aGF0IGFyZSBpbiB0aGUgc29ydExpc3QgKHRoaXMgaW5jbHVkZXMgY29sc3BhbnMpXG5cdFx0XHRcdFx0XHR2YXIgaW5jbHVkZSA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdCRlbCA9IGMuJGhlYWRlcnMuZXEoIGkgKSxcblx0XHRcdFx0XHRcdFx0Y29sID0gcGFyc2VJbnQoICRlbC5hdHRyKCAnZGF0YS1jb2x1bW4nICksIDEwICksXG5cdFx0XHRcdFx0XHRcdGVuZCA9IGNvbCArIHRzLmdldENsb3Nlc3QoICRlbCwgJ3RoLCB0ZCcgKVswXS5jb2xTcGFuO1xuXHRcdFx0XHRcdFx0Zm9yICggOyBjb2wgPCBlbmQ7IGNvbCsrICkge1xuXHRcdFx0XHRcdFx0XHRpbmNsdWRlID0gaW5jbHVkZSA/IGluY2x1ZGUgfHwgdHMuaXNWYWx1ZUluQXJyYXkoIGNvbCwgYy5zb3J0TGlzdCApID4gLTEgOiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBpbmNsdWRlO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Ly8gY2hvb3NlIHRoZSA6bGFzdCBpbiBjYXNlIHRoZXJlIGFyZSBuZXN0ZWQgY29sdW1uc1xuXHRcdFx0XHRcdCRzb3J0ZWQgPSAkc29ydGVkXG5cdFx0XHRcdFx0XHQubm90KCAnLnNvcnRlci1mYWxzZScgKVxuXHRcdFx0XHRcdFx0LmZpbHRlciggJ1tkYXRhLWNvbHVtbj1cIicgKyBsaXN0WyBpbmR4IF1bIDAgXSArICdcIl0nICsgKCBsZW4gPT09IDEgPyAnOmxhc3QnIDogJycgKSApO1xuXHRcdFx0XHRcdGlmICggJHNvcnRlZC5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAkc29ydGVkLmxlbmd0aDsgY29sdW1uKysgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggISRzb3J0ZWRbIGNvbHVtbiBdLnNvcnREaXNhYmxlZCApIHtcblx0XHRcdFx0XHRcdFx0XHR1cGRhdGVDb2x1bW5Tb3J0KCAkc29ydGVkLmVxKCBjb2x1bW4gKSwgbGlzdFsgaW5keCBdWyAxIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBhZGQgc29ydGVkIGNsYXNzIHRvIGZvb3RlciAmIGV4dHJhIGhlYWRlcnMsIGlmIHRoZXkgZXhpc3Rcblx0XHRcdFx0XHRpZiAoICRleHRyYXMubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0dXBkYXRlQ29sdW1uU29ydCggJGV4dHJhcy5maWx0ZXIoICdbZGF0YS1jb2x1bW49XCInICsgbGlzdFsgaW5keCBdWyAwIF0gKyAnXCJdJyApLCBsaXN0WyBpbmR4IF1bIDEgXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gYWRkIHZlcmJvc2UgYXJpYSBsYWJlbHNcblx0XHRcdGxlbiA9IGMuJGhlYWRlcnMubGVuZ3RoO1xuXHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBsZW47IGluZHgrKyApIHtcblx0XHRcdFx0dHMuc2V0Q29sdW1uQXJpYUxhYmVsKCBjLCBjLiRoZWFkZXJzLmVxKCBpbmR4ICkgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Z2V0Q2xvc2VzdCA6IGZ1bmN0aW9uKCAkZWwsIHNlbGVjdG9yICkge1xuXHRcdFx0Ly8galF1ZXJ5IHYxLjIuNiBkb2Vzbid0IGhhdmUgY2xvc2VzdCgpXG5cdFx0XHRpZiAoICQuZm4uY2xvc2VzdCApIHtcblx0XHRcdFx0cmV0dXJuICRlbC5jbG9zZXN0KCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICRlbC5pcyggc2VsZWN0b3IgKSA/XG5cdFx0XHRcdCRlbCA6XG5cdFx0XHRcdCRlbC5wYXJlbnRzKCBzZWxlY3RvciApLmZpbHRlciggJzpmaXJzdCcgKTtcblx0XHR9LFxuXG5cdFx0Ly8gbmV4dFNvcnQgKG9wdGlvbmFsKSwgbGV0cyB5b3UgZGlzYWJsZSBuZXh0IHNvcnQgdGV4dFxuXHRcdHNldENvbHVtbkFyaWFMYWJlbCA6IGZ1bmN0aW9uKCBjLCAkaGVhZGVyLCBuZXh0U29ydCApIHtcblx0XHRcdGlmICggJGhlYWRlci5sZW5ndGggKSB7XG5cdFx0XHRcdHZhciBjb2x1bW4gPSBwYXJzZUludCggJGhlYWRlci5hdHRyKCAnZGF0YS1jb2x1bW4nICksIDEwICksXG5cdFx0XHRcdFx0dmFycyA9IGMuc29ydFZhcnNbIGNvbHVtbiBdLFxuXHRcdFx0XHRcdHRtcCA9ICRoZWFkZXIuaGFzQ2xhc3MoIHRzLmNzcy5zb3J0QXNjICkgP1xuXHRcdFx0XHRcdFx0J3NvcnRBc2MnIDpcblx0XHRcdFx0XHRcdCRoZWFkZXIuaGFzQ2xhc3MoIHRzLmNzcy5zb3J0RGVzYyApID8gJ3NvcnREZXNjJyA6ICdzb3J0Tm9uZScsXG5cdFx0XHRcdFx0dHh0ID0gJC50cmltKCAkaGVhZGVyLnRleHQoKSApICsgJzogJyArIHRzLmxhbmd1YWdlWyB0bXAgXTtcblx0XHRcdFx0aWYgKCAkaGVhZGVyLmhhc0NsYXNzKCAnc29ydGVyLWZhbHNlJyApIHx8IG5leHRTb3J0ID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHR0eHQgKz0gdHMubGFuZ3VhZ2Uuc29ydERpc2FibGVkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRtcCA9ICggdmFycy5jb3VudCArIDEgKSAlIHZhcnMub3JkZXIubGVuZ3RoO1xuXHRcdFx0XHRcdG5leHRTb3J0ID0gdmFycy5vcmRlclsgdG1wIF07XG5cdFx0XHRcdFx0Ly8gaWYgbmV4dFNvcnRcblx0XHRcdFx0XHR0eHQgKz0gdHMubGFuZ3VhZ2VbIG5leHRTb3J0ID09PSAwID8gJ25leHRBc2MnIDogbmV4dFNvcnQgPT09IDEgPyAnbmV4dERlc2MnIDogJ25leHROb25lJyBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRoZWFkZXIuYXR0ciggJ2FyaWEtbGFiZWwnLCB0eHQgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dXBkYXRlSGVhZGVyIDogZnVuY3Rpb24oIGMgKSB7XG5cdFx0XHR2YXIgaW5kZXgsIGlzRGlzYWJsZWQsICRoZWFkZXIsIGNvbCxcblx0XHRcdFx0dGFibGUgPSBjLnRhYmxlLFxuXHRcdFx0XHRsZW4gPSBjLiRoZWFkZXJzLmxlbmd0aDtcblx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW47IGluZGV4KysgKSB7XG5cdFx0XHRcdCRoZWFkZXIgPSBjLiRoZWFkZXJzLmVxKCBpbmRleCApO1xuXHRcdFx0XHRjb2wgPSB0cy5nZXRDb2x1bW5EYXRhKCB0YWJsZSwgYy5oZWFkZXJzLCBpbmRleCwgdHJ1ZSApO1xuXHRcdFx0XHQvLyBhZGQgJ3NvcnRlci1mYWxzZScgY2xhc3MgaWYgJ3BhcnNlci1mYWxzZScgaXMgc2V0XG5cdFx0XHRcdGlzRGlzYWJsZWQgPSB0cy5nZXREYXRhKCAkaGVhZGVyLCBjb2wsICdzb3J0ZXInICkgPT09ICdmYWxzZScgfHwgdHMuZ2V0RGF0YSggJGhlYWRlciwgY29sLCAncGFyc2VyJyApID09PSAnZmFsc2UnO1xuXHRcdFx0XHR0cy5zZXRDb2x1bW5Tb3J0KCBjLCAkaGVhZGVyLCBpc0Rpc2FibGVkICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNldENvbHVtblNvcnQgOiBmdW5jdGlvbiggYywgJGhlYWRlciwgaXNEaXNhYmxlZCApIHtcblx0XHRcdHZhciBpZCA9IGMudGFibGUuaWQ7XG5cdFx0XHQkaGVhZGVyWyAwIF0uc29ydERpc2FibGVkID0gaXNEaXNhYmxlZDtcblx0XHRcdCRoZWFkZXJbIGlzRGlzYWJsZWQgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJyBdKCAnc29ydGVyLWZhbHNlJyApXG5cdFx0XHRcdC5hdHRyKCAnYXJpYS1kaXNhYmxlZCcsICcnICsgaXNEaXNhYmxlZCApO1xuXHRcdFx0Ly8gZGlzYWJsZSB0YWIgaW5kZXggb24gZGlzYWJsZWQgY2VsbHNcblx0XHRcdGlmICggYy50YWJJbmRleCApIHtcblx0XHRcdFx0aWYgKCBpc0Rpc2FibGVkICkge1xuXHRcdFx0XHRcdCRoZWFkZXIucmVtb3ZlQXR0ciggJ3RhYmluZGV4JyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCRoZWFkZXIuYXR0ciggJ3RhYmluZGV4JywgJzAnICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIGFyaWEtY29udHJvbHMgLSByZXF1aXJlcyB0YWJsZSBJRFxuXHRcdFx0aWYgKCBpZCApIHtcblx0XHRcdFx0aWYgKCBpc0Rpc2FibGVkICkge1xuXHRcdFx0XHRcdCRoZWFkZXIucmVtb3ZlQXR0ciggJ2FyaWEtY29udHJvbHMnICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JGhlYWRlci5hdHRyKCAnYXJpYS1jb250cm9scycsIGlkICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dXBkYXRlSGVhZGVyU29ydENvdW50IDogZnVuY3Rpb24oIGMsIGxpc3QgKSB7XG5cdFx0XHR2YXIgY29sLCBkaXIsIGdyb3VwLCBpbmR4LCBwcmltYXJ5LCB0ZW1wLCB2YWwsIG9yZGVyLFxuXHRcdFx0XHRzb3J0TGlzdCA9IGxpc3QgfHwgYy5zb3J0TGlzdCxcblx0XHRcdFx0bGVuID0gc29ydExpc3QubGVuZ3RoO1xuXHRcdFx0Yy5zb3J0TGlzdCA9IFtdO1xuXHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBsZW47IGluZHgrKyApIHtcblx0XHRcdFx0dmFsID0gc29ydExpc3RbIGluZHggXTtcblx0XHRcdFx0Ly8gZW5zdXJlIGFsbCBzb3J0TGlzdCB2YWx1ZXMgYXJlIG51bWVyaWMgLSBmaXhlcyAjMTI3XG5cdFx0XHRcdGNvbCA9IHBhcnNlSW50KCB2YWxbIDAgXSwgMTAgKTtcblx0XHRcdFx0Ly8gcHJldmVudHMgZXJyb3IgaWYgc29ydG9uIGFycmF5IGlzIHdyb25nXG5cdFx0XHRcdGlmICggY29sIDwgYy5jb2x1bW5zICkge1xuXG5cdFx0XHRcdFx0Ly8gc2V0IG9yZGVyIGlmIG5vdCBhbHJlYWR5IGRlZmluZWQgLSBkdWUgdG8gY29sc3BhbiBoZWFkZXIgd2l0aG91dCBhc3NvY2lhdGVkIGhlYWRlciBjZWxsXG5cdFx0XHRcdFx0Ly8gYWRkaW5nIHRoaXMgY2hlY2sgcHJldmVudHMgYSBqYXZhc2NyaXB0IGVycm9yXG5cdFx0XHRcdFx0aWYgKCAhYy5zb3J0VmFyc1sgY29sIF0ub3JkZXIgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHRzLmdldE9yZGVyKCBjLnNvcnRJbml0aWFsT3JkZXIgKSApIHtcblx0XHRcdFx0XHRcdFx0b3JkZXIgPSBjLnNvcnRSZXNldCA/IFsgMSwgMCwgMiBdIDogWyAxLCAwIF07XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRvcmRlciA9IGMuc29ydFJlc2V0ID8gWyAwLCAxLCAyIF0gOiBbIDAsIDEgXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGMuc29ydFZhcnNbIGNvbCBdLm9yZGVyID0gb3JkZXI7XG5cdFx0XHRcdFx0XHRjLnNvcnRWYXJzWyBjb2wgXS5jb3VudCA9IDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3JkZXIgPSBjLnNvcnRWYXJzWyBjb2wgXS5vcmRlcjtcblx0XHRcdFx0XHRkaXIgPSAoICcnICsgdmFsWyAxIF0gKS5tYXRjaCggL14oMXxkfHN8b3xuKS8gKTtcblx0XHRcdFx0XHRkaXIgPSBkaXIgPyBkaXJbIDAgXSA6ICcnO1xuXHRcdFx0XHRcdC8vIDAvKGEpc2MgKGRlZmF1bHQpLCAxLyhkKWVzYywgKHMpYW1lLCAobylwcG9zaXRlLCAobilleHRcblx0XHRcdFx0XHRzd2l0Y2ggKCBkaXIgKSB7XG5cdFx0XHRcdFx0XHRjYXNlICcxJyA6IGNhc2UgJ2QnIDogLy8gZGVzY2VuZGluZ1xuXHRcdFx0XHRcdFx0XHRkaXIgPSAxO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ3MnIDogLy8gc2FtZSBkaXJlY3Rpb24gKGFzIHByaW1hcnkgY29sdW1uKVxuXHRcdFx0XHRcdFx0XHQvLyBpZiBwcmltYXJ5IHNvcnQgaXMgc2V0IHRvICdzJywgbWFrZSBpdCBhc2NlbmRpbmdcblx0XHRcdFx0XHRcdFx0ZGlyID0gcHJpbWFyeSB8fCAwO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ28nIDpcblx0XHRcdFx0XHRcdFx0dGVtcCA9IG9yZGVyWyAoIHByaW1hcnkgfHwgMCApICUgb3JkZXIubGVuZ3RoIF07XG5cdFx0XHRcdFx0XHRcdC8vIG9wcG9zaXRlIG9mIHByaW1hcnkgY29sdW1uOyBidXQgcmVzZXRzIGlmIHByaW1hcnkgcmVzZXRzXG5cdFx0XHRcdFx0XHRcdGRpciA9IHRlbXAgPT09IDAgPyAxIDogdGVtcCA9PT0gMSA/IDAgOiAyO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ24nIDpcblx0XHRcdFx0XHRcdFx0ZGlyID0gb3JkZXJbICggKytjLnNvcnRWYXJzWyBjb2wgXS5jb3VudCApICUgb3JkZXIubGVuZ3RoIF07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0ZGVmYXVsdCA6IC8vIGFzY2VuZGluZ1xuXHRcdFx0XHRcdFx0XHRkaXIgPSAwO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cHJpbWFyeSA9IGluZHggPT09IDAgPyBkaXIgOiBwcmltYXJ5O1xuXHRcdFx0XHRcdGdyb3VwID0gWyBjb2wsIHBhcnNlSW50KCBkaXIsIDEwICkgfHwgMCBdO1xuXHRcdFx0XHRcdGMuc29ydExpc3RbIGMuc29ydExpc3QubGVuZ3RoIF0gPSBncm91cDtcblx0XHRcdFx0XHRkaXIgPSAkLmluQXJyYXkoIGdyb3VwWyAxIF0sIG9yZGVyICk7IC8vIGZpeGVzIGlzc3VlICMxNjdcblx0XHRcdFx0XHRjLnNvcnRWYXJzWyBjb2wgXS5jb3VudCA9IGRpciA+PSAwID8gZGlyIDogZ3JvdXBbIDEgXSAlIG9yZGVyLmxlbmd0aDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHR1cGRhdGVBbGwgOiBmdW5jdGlvbiggYywgcmVzb3J0LCBjYWxsYmFjayApIHtcblx0XHRcdHZhciB0YWJsZSA9IGMudGFibGU7XG5cdFx0XHR0YWJsZS5pc1VwZGF0aW5nID0gdHJ1ZTtcblx0XHRcdHRzLnJlZnJlc2hXaWRnZXRzKCB0YWJsZSwgdHJ1ZSwgdHJ1ZSApO1xuXHRcdFx0dHMuYnVpbGRIZWFkZXJzKCBjICk7XG5cdFx0XHR0cy5iaW5kRXZlbnRzKCB0YWJsZSwgYy4kaGVhZGVycywgdHJ1ZSApO1xuXHRcdFx0dHMuYmluZE1ldGhvZHMoIGMgKTtcblx0XHRcdHRzLmNvbW1vblVwZGF0ZSggYywgcmVzb3J0LCBjYWxsYmFjayApO1xuXHRcdH0sXG5cblx0XHR1cGRhdGUgOiBmdW5jdGlvbiggYywgcmVzb3J0LCBjYWxsYmFjayApIHtcblx0XHRcdHZhciB0YWJsZSA9IGMudGFibGU7XG5cdFx0XHR0YWJsZS5pc1VwZGF0aW5nID0gdHJ1ZTtcblx0XHRcdC8vIHVwZGF0ZSBzb3J0aW5nIChpZiBlbmFibGVkL2Rpc2FibGVkKVxuXHRcdFx0dHMudXBkYXRlSGVhZGVyKCBjICk7XG5cdFx0XHR0cy5jb21tb25VcGRhdGUoIGMsIHJlc29ydCwgY2FsbGJhY2sgKTtcblx0XHR9LFxuXG5cdFx0Ly8gc2ltcGxlIGhlYWRlciB1cGRhdGUgLSBzZWUgIzk4OVxuXHRcdHVwZGF0ZUhlYWRlcnMgOiBmdW5jdGlvbiggYywgY2FsbGJhY2sgKSB7XG5cdFx0XHRjLnRhYmxlLmlzVXBkYXRpbmcgPSB0cnVlO1xuXHRcdFx0dHMuYnVpbGRIZWFkZXJzKCBjICk7XG5cdFx0XHR0cy5iaW5kRXZlbnRzKCBjLnRhYmxlLCBjLiRoZWFkZXJzLCB0cnVlICk7XG5cdFx0XHR0cy5yZXNvcnRDb21wbGV0ZSggYywgY2FsbGJhY2sgKTtcblx0XHR9LFxuXG5cdFx0dXBkYXRlQ2VsbCA6IGZ1bmN0aW9uKCBjLCBjZWxsLCByZXNvcnQsIGNhbGxiYWNrICkge1xuXHRcdFx0Ly8gdXBkYXRlQ2VsbCBmb3IgY2hpbGQgcm93cyBpcyBhIG1lc3MgLSB3ZSdsbCBpZ25vcmUgdGhlbSBmb3Igbm93XG5cdFx0XHQvLyBldmVudHVhbGx5IEknbGwgYnJlYWsgb3V0IHRoZSBcInVwZGF0ZVwiIHJvdyBjYWNoZSBjb2RlIHRvIG1ha2UgZXZlcnl0aGluZyBjb25zaXN0ZW50XG5cdFx0XHRpZiAoICQoIGNlbGwgKS5jbG9zZXN0KCAndHInICkuaGFzQ2xhc3MoIGMuY3NzQ2hpbGRSb3cgKSApIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKCdUYWJsZXNvcnRlciBXYXJuaW5nISBcInVwZGF0ZUNlbGxcIiBmb3IgY2hpbGQgcm93IGNvbnRlbnQgaGFzIGJlZW4gZGlzYWJsZWQsIHVzZSBcInVwZGF0ZVwiIGluc3RlYWQnKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0cy5pc0VtcHR5T2JqZWN0KCBjLmNhY2hlICkgKSB7XG5cdFx0XHRcdC8vIGVtcHR5IHRhYmxlLCBkbyBhbiB1cGRhdGUgaW5zdGVhZCAtIGZpeGVzICMxMDk5XG5cdFx0XHRcdHRzLnVwZGF0ZUhlYWRlciggYyApO1xuXHRcdFx0XHR0cy5jb21tb25VcGRhdGUoIGMsIHJlc29ydCwgY2FsbGJhY2sgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Yy50YWJsZS5pc1VwZGF0aW5nID0gdHJ1ZTtcblx0XHRcdGMuJHRhYmxlLmZpbmQoIGMuc2VsZWN0b3JSZW1vdmUgKS5yZW1vdmUoKTtcblx0XHRcdC8vIGdldCBwb3NpdGlvbiBmcm9tIHRoZSBkb21cblx0XHRcdHZhciB0bXAsIGluZHgsIHJvdywgaWNlbGwsIGNhY2hlLCBsZW4sXG5cdFx0XHRcdCR0Ym9kaWVzID0gYy4kdGJvZGllcyxcblx0XHRcdFx0JGNlbGwgPSAkKCBjZWxsICksXG5cdFx0XHRcdC8vIHVwZGF0ZSBjYWNoZSAtIGZvcm1hdDogZnVuY3Rpb24oIHMsIHRhYmxlLCBjZWxsLCBjZWxsSW5kZXggKVxuXHRcdFx0XHQvLyBubyBjbG9zZXN0IGluIGpRdWVyeSB2MS4yLjZcblx0XHRcdFx0dGJvZHlJbmRleCA9ICR0Ym9kaWVzLmluZGV4KCB0cy5nZXRDbG9zZXN0KCAkY2VsbCwgJ3Rib2R5JyApICksXG5cdFx0XHRcdHRiY2FjaGUgPSBjLmNhY2hlWyB0Ym9keUluZGV4IF0sXG5cdFx0XHRcdCRyb3cgPSB0cy5nZXRDbG9zZXN0KCAkY2VsbCwgJ3RyJyApO1xuXHRcdFx0Y2VsbCA9ICRjZWxsWyAwIF07IC8vIGluIGNhc2UgY2VsbCBpcyBhIGpRdWVyeSBvYmplY3Rcblx0XHRcdC8vIHRib2R5IG1heSBub3QgZXhpc3QgaWYgdXBkYXRlIGlzIGluaXRpYWxpemVkIHdoaWxlIHRib2R5IGlzIHJlbW92ZWQgZm9yIHByb2Nlc3Npbmdcblx0XHRcdGlmICggJHRib2RpZXMubGVuZ3RoICYmIHRib2R5SW5kZXggPj0gMCApIHtcblx0XHRcdFx0cm93ID0gJHRib2RpZXMuZXEoIHRib2R5SW5kZXggKS5maW5kKCAndHInICkubm90KCAnLicgKyBjLmNzc0NoaWxkUm93ICkuaW5kZXgoICRyb3cgKTtcblx0XHRcdFx0Y2FjaGUgPSB0YmNhY2hlLm5vcm1hbGl6ZWRbIHJvdyBdO1xuXHRcdFx0XHRsZW4gPSAkcm93WyAwIF0uY2VsbHMubGVuZ3RoO1xuXHRcdFx0XHRpZiAoIGxlbiAhPT0gYy5jb2x1bW5zICkge1xuXHRcdFx0XHRcdC8vIGNvbHNwYW4gaW4gaGVyZSBzb21ld2hlcmUhXG5cdFx0XHRcdFx0aWNlbGwgPSAwO1xuXHRcdFx0XHRcdHRtcCA9IGZhbHNlO1xuXHRcdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0XHRpZiAoICF0bXAgJiYgJHJvd1sgMCBdLmNlbGxzWyBpbmR4IF0gIT09IGNlbGwgKSB7XG5cdFx0XHRcdFx0XHRcdGljZWxsICs9ICRyb3dbIDAgXS5jZWxsc1sgaW5keCBdLmNvbFNwYW47XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0bXAgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpY2VsbCA9ICRjZWxsLmluZGV4KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dG1wID0gdHMuZ2V0RWxlbWVudFRleHQoIGMsIGNlbGwsIGljZWxsICk7IC8vIHJhd1xuXHRcdFx0XHRjYWNoZVsgYy5jb2x1bW5zIF0ucmF3WyBpY2VsbCBdID0gdG1wO1xuXHRcdFx0XHR0bXAgPSB0cy5nZXRQYXJzZWRUZXh0KCBjLCBjZWxsLCBpY2VsbCwgdG1wICk7XG5cdFx0XHRcdGNhY2hlWyBpY2VsbCBdID0gdG1wOyAvLyBwYXJzZWRcblx0XHRcdFx0aWYgKCAoIGMucGFyc2Vyc1sgaWNlbGwgXS50eXBlIHx8ICcnICkudG9Mb3dlckNhc2UoKSA9PT0gJ251bWVyaWMnICkge1xuXHRcdFx0XHRcdC8vIHVwZGF0ZSBjb2x1bW4gbWF4IHZhbHVlIChpZ25vcmUgc2lnbilcblx0XHRcdFx0XHR0YmNhY2hlLmNvbE1heFsgaWNlbGwgXSA9IE1hdGgubWF4KCBNYXRoLmFicyggdG1wICkgfHwgMCwgdGJjYWNoZS5jb2xNYXhbIGljZWxsIF0gfHwgMCApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRtcCA9IHJlc29ydCAhPT0gJ3VuZGVmaW5lZCcgPyByZXNvcnQgOiBjLnJlc29ydDtcblx0XHRcdFx0aWYgKCB0bXAgIT09IGZhbHNlICkge1xuXHRcdFx0XHRcdC8vIHdpZGdldHMgd2lsbCBiZSByZWFwcGxpZWRcblx0XHRcdFx0XHR0cy5jaGVja1Jlc29ydCggYywgdG1wLCBjYWxsYmFjayApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGRvbid0IHJlYXBwbHkgd2lkZ2V0cyBpcyByZXNvcnQgaXMgZmFsc2UsIGp1c3QgaW4gY2FzZSBpdCBjYXVzZXNcblx0XHRcdFx0XHQvLyBwcm9ibGVtcyB3aXRoIGVsZW1lbnQgZm9jdXNcblx0XHRcdFx0XHR0cy5yZXNvcnRDb21wbGV0ZSggYywgY2FsbGJhY2sgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoICd1cGRhdGVDZWxsIGFib3J0ZWQsIHRib2R5IG1pc3Npbmcgb3Igbm90IHdpdGhpbiB0aGUgaW5kaWNhdGVkIHRhYmxlJyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGMudGFibGUuaXNVcGRhdGluZyA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRhZGRSb3dzIDogZnVuY3Rpb24oIGMsICRyb3csIHJlc29ydCwgY2FsbGJhY2sgKSB7XG5cdFx0XHR2YXIgdHh0LCB2YWwsIHRib2R5SW5kZXgsIHJvd0luZGV4LCByb3dzLCBjZWxsSW5kZXgsIGxlbiwgb3JkZXIsXG5cdFx0XHRcdGNhY2hlSW5kZXgsIHJvd0RhdGEsIGNlbGxzLCBjZWxsLCBzcGFuLFxuXHRcdFx0XHQvLyBhbGxvdyBwYXNzaW5nIGEgcm93IHN0cmluZyBpZiBvbmx5IG9uZSBub24taW5mbyB0Ym9keSBleGlzdHMgaW4gdGhlIHRhYmxlXG5cdFx0XHRcdHZhbGlkID0gdHlwZW9mICRyb3cgPT09ICdzdHJpbmcnICYmIGMuJHRib2RpZXMubGVuZ3RoID09PSAxICYmIC88dHIvLnRlc3QoICRyb3cgfHwgJycgKSxcblx0XHRcdFx0dGFibGUgPSBjLnRhYmxlO1xuXHRcdFx0aWYgKCB2YWxpZCApIHtcblx0XHRcdFx0JHJvdyA9ICQoICRyb3cgKTtcblx0XHRcdFx0Yy4kdGJvZGllcy5hcHBlbmQoICRyb3cgKTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCEkcm93IHx8XG5cdFx0XHRcdC8vIHJvdyBpcyBhIGpRdWVyeSBvYmplY3Q/XG5cdFx0XHRcdCEoICRyb3cgaW5zdGFuY2VvZiBqUXVlcnkgKSB8fFxuXHRcdFx0XHQvLyByb3cgY29udGFpbmVkIGluIHRoZSB0YWJsZT9cblx0XHRcdFx0KCB0cy5nZXRDbG9zZXN0KCAkcm93LCAndGFibGUnIClbIDAgXSAhPT0gYy50YWJsZSApXG5cdFx0XHQpIHtcblx0XHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoICdhZGRSb3dzIG1ldGhvZCByZXF1aXJlcyAoMSkgYSBqUXVlcnkgc2VsZWN0b3IgcmVmZXJlbmNlIHRvIHJvd3MgdGhhdCBoYXZlIGFscmVhZHkgJyArXG5cdFx0XHRcdFx0XHQnYmVlbiBhZGRlZCB0byB0aGUgdGFibGUsIG9yICgyKSByb3cgSFRNTCBzdHJpbmcgdG8gYmUgYWRkZWQgdG8gYSB0YWJsZSB3aXRoIG9ubHkgb25lIHRib2R5JyApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHRhYmxlLmlzVXBkYXRpbmcgPSB0cnVlO1xuXHRcdFx0aWYgKCB0cy5pc0VtcHR5T2JqZWN0KCBjLmNhY2hlICkgKSB7XG5cdFx0XHRcdC8vIGVtcHR5IHRhYmxlLCBkbyBhbiB1cGRhdGUgaW5zdGVhZCAtIGZpeGVzICM0NTBcblx0XHRcdFx0dHMudXBkYXRlSGVhZGVyKCBjICk7XG5cdFx0XHRcdHRzLmNvbW1vblVwZGF0ZSggYywgcmVzb3J0LCBjYWxsYmFjayApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cm93cyA9ICRyb3cuZmlsdGVyKCAndHInICkuYXR0ciggJ3JvbGUnLCAncm93JyApLmxlbmd0aDtcblx0XHRcdFx0dGJvZHlJbmRleCA9IGMuJHRib2RpZXMuaW5kZXgoICRyb3cucGFyZW50cyggJ3Rib2R5JyApLmZpbHRlciggJzpmaXJzdCcgKSApO1xuXHRcdFx0XHQvLyBmaXhlcyBhZGRpbmcgcm93cyB0byBhbiBlbXB0eSB0YWJsZSAtIHNlZSBpc3N1ZSAjMTc5XG5cdFx0XHRcdGlmICggISggYy5wYXJzZXJzICYmIGMucGFyc2Vycy5sZW5ndGggKSApIHtcblx0XHRcdFx0XHR0cy5zZXR1cFBhcnNlcnMoIGMgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBhZGQgZWFjaCByb3dcblx0XHRcdFx0Zm9yICggcm93SW5kZXggPSAwOyByb3dJbmRleCA8IHJvd3M7IHJvd0luZGV4KysgKSB7XG5cdFx0XHRcdFx0Y2FjaGVJbmRleCA9IDA7XG5cdFx0XHRcdFx0bGVuID0gJHJvd1sgcm93SW5kZXggXS5jZWxscy5sZW5ndGg7XG5cdFx0XHRcdFx0b3JkZXIgPSBjLmNhY2hlWyB0Ym9keUluZGV4IF0ubm9ybWFsaXplZC5sZW5ndGg7XG5cdFx0XHRcdFx0Y2VsbHMgPSBbXTtcblx0XHRcdFx0XHRyb3dEYXRhID0ge1xuXHRcdFx0XHRcdFx0Y2hpbGQgOiBbXSxcblx0XHRcdFx0XHRcdHJhdyA6IFtdLFxuXHRcdFx0XHRcdFx0JHJvdyA6ICRyb3cuZXEoIHJvd0luZGV4ICksXG5cdFx0XHRcdFx0XHRvcmRlciA6IG9yZGVyXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHQvLyBhZGQgZWFjaCBjZWxsXG5cdFx0XHRcdFx0Zm9yICggY2VsbEluZGV4ID0gMDsgY2VsbEluZGV4IDwgbGVuOyBjZWxsSW5kZXgrKyApIHtcblx0XHRcdFx0XHRcdGNlbGwgPSAkcm93WyByb3dJbmRleCBdLmNlbGxzWyBjZWxsSW5kZXggXTtcblx0XHRcdFx0XHRcdHR4dCA9IHRzLmdldEVsZW1lbnRUZXh0KCBjLCBjZWxsLCBjYWNoZUluZGV4ICk7XG5cdFx0XHRcdFx0XHRyb3dEYXRhLnJhd1sgY2FjaGVJbmRleCBdID0gdHh0O1xuXHRcdFx0XHRcdFx0dmFsID0gdHMuZ2V0UGFyc2VkVGV4dCggYywgY2VsbCwgY2FjaGVJbmRleCwgdHh0ICk7XG5cdFx0XHRcdFx0XHRjZWxsc1sgY2FjaGVJbmRleCBdID0gdmFsO1xuXHRcdFx0XHRcdFx0aWYgKCAoIGMucGFyc2Vyc1sgY2FjaGVJbmRleCBdLnR5cGUgfHwgJycgKS50b0xvd2VyQ2FzZSgpID09PSAnbnVtZXJpYycgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHVwZGF0ZSBjb2x1bW4gbWF4IHZhbHVlIChpZ25vcmUgc2lnbilcblx0XHRcdFx0XHRcdFx0Yy5jYWNoZVsgdGJvZHlJbmRleCBdLmNvbE1heFsgY2FjaGVJbmRleCBdID1cblx0XHRcdFx0XHRcdFx0XHRNYXRoLm1heCggTWF0aC5hYnMoIHZhbCApIHx8IDAsIGMuY2FjaGVbIHRib2R5SW5kZXggXS5jb2xNYXhbIGNhY2hlSW5kZXggXSB8fCAwICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRzcGFuID0gY2VsbC5jb2xTcGFuIC0gMTtcblx0XHRcdFx0XHRcdGlmICggc3BhbiA+IDAgKSB7XG5cdFx0XHRcdFx0XHRcdGNhY2hlSW5kZXggKz0gc3Bhbjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNhY2hlSW5kZXgrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gYWRkIHRoZSByb3cgZGF0YSB0byB0aGUgZW5kXG5cdFx0XHRcdFx0Y2VsbHNbIGMuY29sdW1ucyBdID0gcm93RGF0YTtcblx0XHRcdFx0XHQvLyB1cGRhdGUgY2FjaGVcblx0XHRcdFx0XHRjLmNhY2hlWyB0Ym9keUluZGV4IF0ubm9ybWFsaXplZFsgb3JkZXIgXSA9IGNlbGxzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHJlc29ydCB1c2luZyBjdXJyZW50IHNldHRpbmdzXG5cdFx0XHRcdHRzLmNoZWNrUmVzb3J0KCBjLCByZXNvcnQsIGNhbGxiYWNrICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHVwZGF0ZUNhY2hlIDogZnVuY3Rpb24oIGMsIGNhbGxiYWNrLCAkdGJvZGllcyApIHtcblx0XHRcdC8vIHJlYnVpbGQgcGFyc2Vyc1xuXHRcdFx0aWYgKCAhKCBjLnBhcnNlcnMgJiYgYy5wYXJzZXJzLmxlbmd0aCApICkge1xuXHRcdFx0XHR0cy5zZXR1cFBhcnNlcnMoIGMsICR0Ym9kaWVzICk7XG5cdFx0XHR9XG5cdFx0XHQvLyByZWJ1aWxkIHRoZSBjYWNoZSBtYXBcblx0XHRcdHRzLmJ1aWxkQ2FjaGUoIGMsIGNhbGxiYWNrLCAkdGJvZGllcyApO1xuXHRcdH0sXG5cblx0XHQvLyBpbml0IGZsYWcgKHRydWUpIHVzZWQgYnkgcGFnZXIgcGx1Z2luIHRvIHByZXZlbnQgd2lkZ2V0IGFwcGxpY2F0aW9uXG5cdFx0Ly8gcmVuYW1lZCBmcm9tIGFwcGVuZFRvVGFibGVcblx0XHRhcHBlbmRDYWNoZSA6IGZ1bmN0aW9uKCBjLCBpbml0ICkge1xuXHRcdFx0dmFyIHBhcnNlZCwgdG90YWxSb3dzLCAkdGJvZHksICRjdXJUYm9keSwgcm93SW5kZXgsIHRib2R5SW5kZXgsIGFwcGVuZFRpbWUsXG5cdFx0XHRcdHRhYmxlID0gYy50YWJsZSxcblx0XHRcdFx0d28gPSBjLndpZGdldE9wdGlvbnMsXG5cdFx0XHRcdCR0Ym9kaWVzID0gYy4kdGJvZGllcyxcblx0XHRcdFx0cm93cyA9IFtdLFxuXHRcdFx0XHRjYWNoZSA9IGMuY2FjaGU7XG5cdFx0XHQvLyBlbXB0eSB0YWJsZSAtIGZpeGVzICMyMDYvIzM0NlxuXHRcdFx0aWYgKCB0cy5pc0VtcHR5T2JqZWN0KCBjYWNoZSApICkge1xuXHRcdFx0XHQvLyBydW4gcGFnZXIgYXBwZW5kZXIgaW4gY2FzZSB0aGUgdGFibGUgd2FzIGp1c3QgZW1wdGllZFxuXHRcdFx0XHRyZXR1cm4gYy5hcHBlbmRlciA/IGMuYXBwZW5kZXIoIHRhYmxlLCByb3dzICkgOlxuXHRcdFx0XHRcdHRhYmxlLmlzVXBkYXRpbmcgPyBjLiR0YWJsZS50cmlnZ2VySGFuZGxlciggJ3VwZGF0ZUNvbXBsZXRlJywgdGFibGUgKSA6ICcnOyAvLyBGaXhlcyAjNTMyXG5cdFx0XHR9XG5cdFx0XHRpZiAoIGMuZGVidWcgKSB7XG5cdFx0XHRcdGFwcGVuZFRpbWUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggdGJvZHlJbmRleCA9IDA7IHRib2R5SW5kZXggPCAkdGJvZGllcy5sZW5ndGg7IHRib2R5SW5kZXgrKyApIHtcblx0XHRcdFx0JHRib2R5ID0gJHRib2RpZXMuZXEoIHRib2R5SW5kZXggKTtcblx0XHRcdFx0aWYgKCAkdGJvZHkubGVuZ3RoICkge1xuXHRcdFx0XHRcdC8vIGRldGFjaCB0Ym9keSBmb3IgbWFuaXB1bGF0aW9uXG5cdFx0XHRcdFx0JGN1clRib2R5ID0gdHMucHJvY2Vzc1Rib2R5KCB0YWJsZSwgJHRib2R5LCB0cnVlICk7XG5cdFx0XHRcdFx0cGFyc2VkID0gY2FjaGVbIHRib2R5SW5kZXggXS5ub3JtYWxpemVkO1xuXHRcdFx0XHRcdHRvdGFsUm93cyA9IHBhcnNlZC5sZW5ndGg7XG5cdFx0XHRcdFx0Zm9yICggcm93SW5kZXggPSAwOyByb3dJbmRleCA8IHRvdGFsUm93czsgcm93SW5kZXgrKyApIHtcblx0XHRcdFx0XHRcdHJvd3Nbcm93cy5sZW5ndGhdID0gcGFyc2VkWyByb3dJbmRleCBdWyBjLmNvbHVtbnMgXS4kcm93O1xuXHRcdFx0XHRcdFx0Ly8gcmVtb3ZlUm93cyB1c2VkIGJ5IHRoZSBwYWdlciBwbHVnaW47IGRvbid0IHJlbmRlciBpZiB1c2luZyBhamF4IC0gZml4ZXMgIzQxMVxuXHRcdFx0XHRcdFx0aWYgKCAhYy5hcHBlbmRlciB8fCAoIGMucGFnZXIgJiYgKCAhYy5wYWdlci5yZW1vdmVSb3dzIHx8ICF3by5wYWdlcl9yZW1vdmVSb3dzICkgJiYgIWMucGFnZXIuYWpheCApICkge1xuXHRcdFx0XHRcdFx0XHQkY3VyVGJvZHkuYXBwZW5kKCBwYXJzZWRbIHJvd0luZGV4IF1bIGMuY29sdW1ucyBdLiRyb3cgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gcmVzdG9yZSB0Ym9keVxuXHRcdFx0XHRcdHRzLnByb2Nlc3NUYm9keSggdGFibGUsICRjdXJUYm9keSwgZmFsc2UgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCBjLmFwcGVuZGVyICkge1xuXHRcdFx0XHRjLmFwcGVuZGVyKCB0YWJsZSwgcm93cyApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyggJ1JlYnVpbHQgdGFibGUnICsgdHMuYmVuY2htYXJrKCBhcHBlbmRUaW1lICkgKTtcblx0XHRcdH1cblx0XHRcdC8vIGFwcGx5IHRhYmxlIHdpZGdldHM7IGJ1dCBub3QgYmVmb3JlIGFqYXggY29tcGxldGVzXG5cdFx0XHRpZiAoICFpbml0ICYmICFjLmFwcGVuZGVyICkge1xuXHRcdFx0XHR0cy5hcHBseVdpZGdldCggdGFibGUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggdGFibGUuaXNVcGRhdGluZyApIHtcblx0XHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoICd1cGRhdGVDb21wbGV0ZScsIHRhYmxlICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGNvbW1vblVwZGF0ZSA6IGZ1bmN0aW9uKCBjLCByZXNvcnQsIGNhbGxiYWNrICkge1xuXHRcdFx0Ly8gcmVtb3ZlIHJvd3MvZWxlbWVudHMgYmVmb3JlIHVwZGF0ZVxuXHRcdFx0Yy4kdGFibGUuZmluZCggYy5zZWxlY3RvclJlbW92ZSApLnJlbW92ZSgpO1xuXHRcdFx0Ly8gcmVidWlsZCBwYXJzZXJzXG5cdFx0XHR0cy5zZXR1cFBhcnNlcnMoIGMgKTtcblx0XHRcdC8vIHJlYnVpbGQgdGhlIGNhY2hlIG1hcFxuXHRcdFx0dHMuYnVpbGRDYWNoZSggYyApO1xuXHRcdFx0dHMuY2hlY2tSZXNvcnQoIGMsIHJlc29ydCwgY2FsbGJhY2sgKTtcblx0XHR9LFxuXG5cdFx0Lypcblx0XHTiloTilojilojilojilojilogg4paE4paI4paI4paI4paI4paEIOKWiOKWiOKWiOKWiOKWiOKWhCDilojilojilojilojilojilogg4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWhCDiloTilojilojilojilojiloRcblx0XHTiloDilojiloQgICAg4paI4paIICDilojilogg4paI4paI4paE4paE4paI4paIICAg4paI4paIICAg4paI4paIIOKWiOKWiCAg4paI4paIIOKWiOKWiCDiloTiloTiloRcblx0XHQgICDiloDilojiloQg4paI4paIICDilojilogg4paI4paI4paA4paI4paIICAgIOKWiOKWiCAgIOKWiOKWiCDilojiloggIOKWiOKWiCDilojilogg4paA4paI4paIXG5cdFx04paI4paI4paI4paI4paI4paAIOKWgOKWiOKWiOKWiOKWiOKWgCDilojiloggIOKWiOKWiCAgIOKWiOKWiCAgIOKWiOKWiCDilojiloggIOKWiOKWiCDiloDilojilojilojilojiloBcblx0XHQqL1xuXHRcdGluaXRTb3J0IDogZnVuY3Rpb24oIGMsIGNlbGwsIGV2ZW50ICkge1xuXHRcdFx0aWYgKCBjLnRhYmxlLmlzVXBkYXRpbmcgKSB7XG5cdFx0XHRcdC8vIGxldCBhbnkgdXBkYXRlcyBjb21wbGV0ZSBiZWZvcmUgaW5pdGlhbGl6aW5nIGEgc29ydFxuXHRcdFx0XHRyZXR1cm4gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR0cy5pbml0U29ydCggYywgY2VsbCwgZXZlbnQgKTtcblx0XHRcdFx0fSwgNTAgKTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGFycnksIGluZHgsIGhlYWRlckluZHgsIGRpciwgdGVtcCwgdG1wLCAkaGVhZGVyLFxuXHRcdFx0XHRub3RNdWx0aVNvcnQgPSAhZXZlbnRbIGMuc29ydE11bHRpU29ydEtleSBdLFxuXHRcdFx0XHR0YWJsZSA9IGMudGFibGUsXG5cdFx0XHRcdGxlbiA9IGMuJGhlYWRlcnMubGVuZ3RoLFxuXHRcdFx0XHR0aCA9IHRzLmdldENsb3Nlc3QoICQoIGNlbGwgKSwgJ3RoLCB0ZCcgKSxcblx0XHRcdFx0Y29sID0gcGFyc2VJbnQoIHRoLmF0dHIoICdkYXRhLWNvbHVtbicgKSwgMTAgKSxcblx0XHRcdFx0b3JkZXIgPSBjLnNvcnRWYXJzWyBjb2wgXS5vcmRlcjtcblx0XHRcdHRoID0gdGhbMF07XG5cdFx0XHQvLyBPbmx5IGNhbGwgc29ydFN0YXJ0IGlmIHNvcnRpbmcgaXMgZW5hYmxlZFxuXHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoICdzb3J0U3RhcnQnLCB0YWJsZSApO1xuXHRcdFx0Ly8gZ2V0IGN1cnJlbnQgY29sdW1uIHNvcnQgb3JkZXJcblx0XHRcdHRtcCA9ICggYy5zb3J0VmFyc1sgY29sIF0uY291bnQgKyAxICkgJSBvcmRlci5sZW5ndGg7XG5cdFx0XHRjLnNvcnRWYXJzWyBjb2wgXS5jb3VudCA9IGV2ZW50WyBjLnNvcnRSZXNldEtleSBdID8gMiA6IHRtcDtcblx0XHRcdC8vIHJlc2V0IGFsbCBzb3J0cyBvbiBub24tY3VycmVudCBjb2x1bW4gLSBpc3N1ZSAjMzBcblx0XHRcdGlmICggYy5zb3J0UmVzdGFydCApIHtcblx0XHRcdFx0Zm9yICggaGVhZGVySW5keCA9IDA7IGhlYWRlckluZHggPCBsZW47IGhlYWRlckluZHgrKyApIHtcblx0XHRcdFx0XHQkaGVhZGVyID0gYy4kaGVhZGVycy5lcSggaGVhZGVySW5keCApO1xuXHRcdFx0XHRcdHRtcCA9IHBhcnNlSW50KCAkaGVhZGVyLmF0dHIoICdkYXRhLWNvbHVtbicgKSwgMTAgKTtcblx0XHRcdFx0XHQvLyBvbmx5IHJlc2V0IGNvdW50cyBvbiBjb2x1bW5zIHRoYXQgd2VyZW4ndCBqdXN0IGNsaWNrZWQgb24gYW5kIGlmIG5vdCBpbmNsdWRlZCBpbiBhIG11bHRpc29ydFxuXHRcdFx0XHRcdGlmICggY29sICE9PSB0bXAgJiYgKCBub3RNdWx0aVNvcnQgfHwgJGhlYWRlci5oYXNDbGFzcyggdHMuY3NzLnNvcnROb25lICkgKSApIHtcblx0XHRcdFx0XHRcdGMuc29ydFZhcnNbIHRtcCBdLmNvdW50ID0gLTE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyB1c2VyIG9ubHkgd2FudHMgdG8gc29ydCBvbiBvbmUgY29sdW1uXG5cdFx0XHRpZiAoIG5vdE11bHRpU29ydCApIHtcblx0XHRcdFx0Ly8gZmx1c2ggdGhlIHNvcnQgbGlzdFxuXHRcdFx0XHRjLnNvcnRMaXN0ID0gW107XG5cdFx0XHRcdGMubGFzdC5zb3J0TGlzdCA9IFtdO1xuXHRcdFx0XHRpZiAoIGMuc29ydEZvcmNlICE9PSBudWxsICkge1xuXHRcdFx0XHRcdGFycnkgPSBjLnNvcnRGb3JjZTtcblx0XHRcdFx0XHRmb3IgKCBpbmR4ID0gMDsgaW5keCA8IGFycnkubGVuZ3RoOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGFycnlbIGluZHggXVsgMCBdICE9PSBjb2wgKSB7XG5cdFx0XHRcdFx0XHRcdGMuc29ydExpc3RbIGMuc29ydExpc3QubGVuZ3RoIF0gPSBhcnJ5WyBpbmR4IF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGFkZCBjb2x1bW4gdG8gc29ydCBsaXN0XG5cdFx0XHRcdGRpciA9IG9yZGVyWyBjLnNvcnRWYXJzWyBjb2wgXS5jb3VudCBdO1xuXHRcdFx0XHRpZiAoIGRpciA8IDIgKSB7XG5cdFx0XHRcdFx0Yy5zb3J0TGlzdFsgYy5zb3J0TGlzdC5sZW5ndGggXSA9IFsgY29sLCBkaXIgXTtcblx0XHRcdFx0XHQvLyBhZGQgb3RoZXIgY29sdW1ucyBpZiBoZWFkZXIgc3BhbnMgYWNyb3NzIG11bHRpcGxlXG5cdFx0XHRcdFx0aWYgKCB0aC5jb2xTcGFuID4gMSApIHtcblx0XHRcdFx0XHRcdGZvciAoIGluZHggPSAxOyBpbmR4IDwgdGguY29sU3BhbjsgaW5keCsrICkge1xuXHRcdFx0XHRcdFx0XHRjLnNvcnRMaXN0WyBjLnNvcnRMaXN0Lmxlbmd0aCBdID0gWyBjb2wgKyBpbmR4LCBkaXIgXTtcblx0XHRcdFx0XHRcdFx0Ly8gdXBkYXRlIGNvdW50IG9uIGNvbHVtbnMgaW4gY29sU3BhblxuXHRcdFx0XHRcdFx0XHRjLnNvcnRWYXJzWyBjb2wgKyBpbmR4IF0uY291bnQgPSAkLmluQXJyYXkoIGRpciwgb3JkZXIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gbXVsdGkgY29sdW1uIHNvcnRpbmdcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGdldCByaWQgb2YgdGhlIHNvcnRBcHBlbmQgYmVmb3JlIGFkZGluZyBtb3JlIC0gZml4ZXMgaXNzdWUgIzExNSAmICM1MjNcblx0XHRcdFx0Yy5zb3J0TGlzdCA9ICQuZXh0ZW5kKCBbXSwgYy5sYXN0LnNvcnRMaXN0ICk7XG5cblx0XHRcdFx0Ly8gdGhlIHVzZXIgaGFzIGNsaWNrZWQgb24gYW4gYWxyZWFkeSBzb3J0ZWQgY29sdW1uXG5cdFx0XHRcdGlmICggdHMuaXNWYWx1ZUluQXJyYXkoIGNvbCwgYy5zb3J0TGlzdCApID49IDAgKSB7XG5cdFx0XHRcdFx0Ly8gcmV2ZXJzZSB0aGUgc29ydGluZyBkaXJlY3Rpb25cblx0XHRcdFx0XHRmb3IgKCBpbmR4ID0gMDsgaW5keCA8IGMuc29ydExpc3QubGVuZ3RoOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0XHR0bXAgPSBjLnNvcnRMaXN0WyBpbmR4IF07XG5cdFx0XHRcdFx0XHRpZiAoIHRtcFsgMCBdID09PSBjb2wgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIG9yZGVyLmNvdW50IHNlZW1zIHRvIGJlIGluY29ycmVjdCB3aGVuIGNvbXBhcmVkIHRvIGNlbGwuY291bnRcblx0XHRcdFx0XHRcdFx0dG1wWyAxIF0gPSBvcmRlclsgYy5zb3J0VmFyc1sgY29sIF0uY291bnQgXTtcblx0XHRcdFx0XHRcdFx0aWYgKCB0bXBbMV0gPT09IDIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Yy5zb3J0TGlzdC5zcGxpY2UoIGluZHgsIDEgKTtcblx0XHRcdFx0XHRcdFx0XHRjLnNvcnRWYXJzWyBjb2wgXS5jb3VudCA9IC0xO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGFkZCBjb2x1bW4gdG8gc29ydCBsaXN0IGFycmF5XG5cdFx0XHRcdFx0ZGlyID0gb3JkZXJbIGMuc29ydFZhcnNbIGNvbCBdLmNvdW50IF07XG5cdFx0XHRcdFx0aWYgKCBkaXIgPCAyICkge1xuXHRcdFx0XHRcdFx0Yy5zb3J0TGlzdFsgYy5zb3J0TGlzdC5sZW5ndGggXSA9IFsgY29sLCBkaXIgXTtcblx0XHRcdFx0XHRcdC8vIGFkZCBvdGhlciBjb2x1bW5zIGlmIGhlYWRlciBzcGFucyBhY3Jvc3MgbXVsdGlwbGVcblx0XHRcdFx0XHRcdGlmICggdGguY29sU3BhbiA+IDEgKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAoIGluZHggPSAxOyBpbmR4IDwgdGguY29sU3BhbjsgaW5keCsrICkge1xuXHRcdFx0XHRcdFx0XHRcdGMuc29ydExpc3RbIGMuc29ydExpc3QubGVuZ3RoIF0gPSBbIGNvbCArIGluZHgsIGRpciBdO1xuXHRcdFx0XHRcdFx0XHRcdC8vIHVwZGF0ZSBjb3VudCBvbiBjb2x1bW5zIGluIGNvbFNwYW5cblx0XHRcdFx0XHRcdFx0XHRjLnNvcnRWYXJzWyBjb2wgKyBpbmR4IF0uY291bnQgPSAkLmluQXJyYXkoIGRpciwgb3JkZXIgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gc2F2ZSBzb3J0IGJlZm9yZSBhcHBseWluZyBzb3J0QXBwZW5kXG5cdFx0XHRjLmxhc3Quc29ydExpc3QgPSAkLmV4dGVuZCggW10sIGMuc29ydExpc3QgKTtcblx0XHRcdGlmICggYy5zb3J0TGlzdC5sZW5ndGggJiYgYy5zb3J0QXBwZW5kICkge1xuXHRcdFx0XHRhcnJ5ID0gJC5pc0FycmF5KCBjLnNvcnRBcHBlbmQgKSA/IGMuc29ydEFwcGVuZCA6IGMuc29ydEFwcGVuZFsgYy5zb3J0TGlzdFsgMCBdWyAwIF0gXTtcblx0XHRcdFx0aWYgKCAhdHMuaXNFbXB0eU9iamVjdCggYXJyeSApICkge1xuXHRcdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgYXJyeS5sZW5ndGg7IGluZHgrKyApIHtcblx0XHRcdFx0XHRcdGlmICggYXJyeVsgaW5keCBdWyAwIF0gIT09IGNvbCAmJiB0cy5pc1ZhbHVlSW5BcnJheSggYXJyeVsgaW5keCBdWyAwIF0sIGMuc29ydExpc3QgKSA8IDAgKSB7XG5cdFx0XHRcdFx0XHRcdGRpciA9IGFycnlbIGluZHggXVsgMSBdO1xuXHRcdFx0XHRcdFx0XHR0ZW1wID0gKCAnJyArIGRpciApLm1hdGNoKCAvXihhfGR8c3xvfG4pLyApO1xuXHRcdFx0XHRcdFx0XHRpZiAoIHRlbXAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wID0gYy5zb3J0TGlzdFsgMCBdWyAxIF07XG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoICggdGVtcFsgMCBdICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAnZCcgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkaXIgPSAxO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgJ3MnIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlyID0gdG1wO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgJ28nIDpcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGlyID0gdG1wID09PSAwID8gMSA6IDA7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAnbicgOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkaXIgPSAoIHRtcCArIDEgKSAlIG9yZGVyLmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkaXIgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Yy5zb3J0TGlzdFsgYy5zb3J0TGlzdC5sZW5ndGggXSA9IFsgYXJyeVsgaW5keCBdWyAwIF0sIGRpciBdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Ly8gc29ydEJlZ2luIGV2ZW50IHRyaWdnZXJlZCBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIHNvcnRcblx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnc29ydEJlZ2luJywgdGFibGUgKTtcblx0XHRcdC8vIHNldFRpbWVvdXQgbmVlZGVkIHNvIHRoZSBwcm9jZXNzaW5nIGljb24gc2hvd3MgdXBcblx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBzZXQgY3NzIGZvciBoZWFkZXJzXG5cdFx0XHRcdHRzLnNldEhlYWRlcnNDc3MoIGMgKTtcblx0XHRcdFx0dHMubXVsdGlzb3J0KCBjICk7XG5cdFx0XHRcdHRzLmFwcGVuZENhY2hlKCBjICk7XG5cdFx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnc29ydEJlZm9yZUVuZCcsIHRhYmxlICk7XG5cdFx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnc29ydEVuZCcsIHRhYmxlICk7XG5cdFx0XHR9LCAxICk7XG5cdFx0fSxcblxuXHRcdC8vIHNvcnQgbXVsdGlwbGUgY29sdW1uc1xuXHRcdG11bHRpc29ydCA6IGZ1bmN0aW9uKCBjICkgeyAvKmpzaGludCBsb29wZnVuYzp0cnVlICovXG5cdFx0XHR2YXIgdGJvZHlJbmRleCwgc29ydFRpbWUsIGNvbE1heCwgcm93cywgdG1wLFxuXHRcdFx0XHR0YWJsZSA9IGMudGFibGUsXG5cdFx0XHRcdHNvcnRlciA9IFtdLFxuXHRcdFx0XHRkaXIgPSAwLFxuXHRcdFx0XHR0ZXh0U29ydGVyID0gYy50ZXh0U29ydGVyIHx8ICcnLFxuXHRcdFx0XHRzb3J0TGlzdCA9IGMuc29ydExpc3QsXG5cdFx0XHRcdHNvcnRMZW4gPSBzb3J0TGlzdC5sZW5ndGgsXG5cdFx0XHRcdGxlbiA9IGMuJHRib2RpZXMubGVuZ3RoO1xuXHRcdFx0aWYgKCBjLnNlcnZlclNpZGVTb3J0aW5nIHx8IHRzLmlzRW1wdHlPYmplY3QoIGMuY2FjaGUgKSApIHtcblx0XHRcdFx0Ly8gZW1wdHkgdGFibGUgLSBmaXhlcyAjMjA2LyMzNDZcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBjLmRlYnVnICkgeyBzb3J0VGltZSA9IG5ldyBEYXRlKCk7IH1cblx0XHRcdC8vIGNhY2hlIHRleHRTb3J0ZXIgdG8gb3B0aW1pemUgc3BlZWRcblx0XHRcdGlmICggdHlwZW9mIHRleHRTb3J0ZXIgPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHRjb2xNYXggPSBjLmNvbHVtbnM7XG5cdFx0XHRcdHdoaWxlICggY29sTWF4LS0gKSB7XG5cdFx0XHRcdFx0dG1wID0gdHMuZ2V0Q29sdW1uRGF0YSggdGFibGUsIHRleHRTb3J0ZXIsIGNvbE1heCApO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIHRtcCA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdFx0XHRcdHNvcnRlclsgY29sTWF4IF0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRmb3IgKCB0Ym9keUluZGV4ID0gMDsgdGJvZHlJbmRleCA8IGxlbjsgdGJvZHlJbmRleCsrICkge1xuXHRcdFx0XHRjb2xNYXggPSBjLmNhY2hlWyB0Ym9keUluZGV4IF0uY29sTWF4O1xuXHRcdFx0XHRyb3dzID0gYy5jYWNoZVsgdGJvZHlJbmRleCBdLm5vcm1hbGl6ZWQ7XG5cblx0XHRcdFx0cm93cy5zb3J0KCBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdFx0XHR2YXIgc29ydEluZGV4LCBudW0sIGNvbCwgb3JkZXIsIHNvcnQsIHgsIHk7XG5cdFx0XHRcdFx0Ly8gcm93cyBpcyB1bmRlZmluZWQgaGVyZSBpbiBJRSwgc28gZG9uJ3QgdXNlIGl0IVxuXHRcdFx0XHRcdGZvciAoIHNvcnRJbmRleCA9IDA7IHNvcnRJbmRleCA8IHNvcnRMZW47IHNvcnRJbmRleCsrICkge1xuXHRcdFx0XHRcdFx0Y29sID0gc29ydExpc3RbIHNvcnRJbmRleCBdWyAwIF07XG5cdFx0XHRcdFx0XHRvcmRlciA9IHNvcnRMaXN0WyBzb3J0SW5kZXggXVsgMSBdO1xuXHRcdFx0XHRcdFx0Ly8gc29ydCBkaXJlY3Rpb24sIHRydWUgPSBhc2MsIGZhbHNlID0gZGVzY1xuXHRcdFx0XHRcdFx0ZGlyID0gb3JkZXIgPT09IDA7XG5cblx0XHRcdFx0XHRcdGlmICggYy5zb3J0U3RhYmxlICYmIGFbIGNvbCBdID09PSBiWyBjb2wgXSAmJiBzb3J0TGVuID09PSAxICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYVsgYy5jb2x1bW5zIF0ub3JkZXIgLSBiWyBjLmNvbHVtbnMgXS5vcmRlcjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gZmFsbGJhY2sgdG8gbmF0dXJhbCBzb3J0IHNpbmNlIGl0IGlzIG1vcmUgcm9idXN0XG5cdFx0XHRcdFx0XHRudW0gPSAvbi9pLnRlc3QoIHRzLmdldFNvcnRUeXBlKCBjLnBhcnNlcnMsIGNvbCApICk7XG5cdFx0XHRcdFx0XHRpZiAoIG51bSAmJiBjLnN0cmluZ3NbIGNvbCBdICkge1xuXHRcdFx0XHRcdFx0XHQvLyBzb3J0IHN0cmluZ3MgaW4gbnVtZXJpY2FsIGNvbHVtbnNcblx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgKCB0cy5zdHJpbmdbIGMuc3RyaW5nc1sgY29sIF0gXSApID09PSAnYm9vbGVhbicgKSB7XG5cdFx0XHRcdFx0XHRcdFx0bnVtID0gKCBkaXIgPyAxIDogLTEgKSAqICggdHMuc3RyaW5nWyBjLnN0cmluZ3NbIGNvbCBdIF0gPyAtMSA6IDEgKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRudW0gPSAoIGMuc3RyaW5nc1sgY29sIF0gKSA/IHRzLnN0cmluZ1sgYy5zdHJpbmdzWyBjb2wgXSBdIHx8IDAgOiAwO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdC8vIGZhbGwgYmFjayB0byBidWlsdC1pbiBudW1lcmljIHNvcnRcblx0XHRcdFx0XHRcdFx0Ly8gdmFyIHNvcnQgPSAkLnRhYmxlc29ydGVyWydzb3J0JyArIHNdKCBhW2NvbF0sIGJbY29sXSwgZGlyLCBjb2xNYXhbY29sXSwgdGFibGUgKTtcblx0XHRcdFx0XHRcdFx0c29ydCA9IGMubnVtYmVyU29ydGVyID8gYy5udW1iZXJTb3J0ZXIoIGFbIGNvbCBdLCBiWyBjb2wgXSwgZGlyLCBjb2xNYXhbIGNvbCBdLCB0YWJsZSApIDpcblx0XHRcdFx0XHRcdFx0XHR0c1sgJ3NvcnROdW1lcmljJyArICggZGlyID8gJ0FzYycgOiAnRGVzYycgKSBdKCBhWyBjb2wgXSwgYlsgY29sIF0sIG51bSwgY29sTWF4WyBjb2wgXSwgY29sLCBjICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBzZXQgYSAmIGIgZGVwZW5kaW5nIG9uIHNvcnQgZGlyZWN0aW9uXG5cdFx0XHRcdFx0XHRcdHggPSBkaXIgPyBhIDogYjtcblx0XHRcdFx0XHRcdFx0eSA9IGRpciA/IGIgOiBhO1xuXHRcdFx0XHRcdFx0XHQvLyB0ZXh0IHNvcnQgZnVuY3Rpb25cblx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgdGV4dFNvcnRlciA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBjdXN0b20gT1ZFUkFMTCB0ZXh0IHNvcnRlclxuXHRcdFx0XHRcdFx0XHRcdHNvcnQgPSB0ZXh0U29ydGVyKCB4WyBjb2wgXSwgeVsgY29sIF0sIGRpciwgY29sLCB0YWJsZSApO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0eXBlb2Ygc29ydGVyWyBjb2wgXSA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBjdXN0b20gdGV4dCBzb3J0ZXIgZm9yIGEgU1BFQ0lGSUMgQ09MVU1OXG5cdFx0XHRcdFx0XHRcdFx0c29ydCA9IHNvcnRlclsgY29sIF0oIHhbIGNvbCBdLCB5WyBjb2wgXSwgZGlyLCBjb2wsIHRhYmxlICk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZmFsbCBiYWNrIHRvIG5hdHVyYWwgc29ydFxuXHRcdFx0XHRcdFx0XHRcdHNvcnQgPSB0c1sgJ3NvcnROYXR1cmFsJyArICggZGlyID8gJ0FzYycgOiAnRGVzYycgKSBdKCBhWyBjb2wgXSwgYlsgY29sIF0sIGNvbCwgYyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIHNvcnQgKSB7IHJldHVybiBzb3J0OyB9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBhWyBjLmNvbHVtbnMgXS5vcmRlciAtIGJbIGMuY29sdW1ucyBdLm9yZGVyO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmICggYy5kZWJ1ZyApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coICdBcHBseWluZyBzb3J0ICcgKyBzb3J0TGlzdC50b1N0cmluZygpICsgdHMuYmVuY2htYXJrKCBzb3J0VGltZSApICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHJlc29ydENvbXBsZXRlIDogZnVuY3Rpb24oIGMsIGNhbGxiYWNrICkge1xuXHRcdFx0aWYgKCBjLnRhYmxlLmlzVXBkYXRpbmcgKSB7XG5cdFx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAndXBkYXRlQ29tcGxldGUnLCBjLnRhYmxlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICQuaXNGdW5jdGlvbiggY2FsbGJhY2sgKSApIHtcblx0XHRcdFx0Y2FsbGJhY2soIGMudGFibGUgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Y2hlY2tSZXNvcnQgOiBmdW5jdGlvbiggYywgcmVzb3J0LCBjYWxsYmFjayApIHtcblx0XHRcdHZhciBzb3J0TGlzdCA9ICQuaXNBcnJheSggcmVzb3J0ICkgPyByZXNvcnQgOiBjLnNvcnRMaXN0LFxuXHRcdFx0XHQvLyBpZiBubyByZXNvcnQgcGFyYW1ldGVyIGlzIHBhc3NlZCwgZmFsbGJhY2sgdG8gY29uZmlnLnJlc29ydCAodHJ1ZSBieSBkZWZhdWx0KVxuXHRcdFx0XHRyZXNydCA9IHR5cGVvZiByZXNvcnQgPT09ICd1bmRlZmluZWQnID8gYy5yZXNvcnQgOiByZXNvcnQ7XG5cdFx0XHQvLyBkb24ndCB0cnkgdG8gcmVzb3J0IGlmIHRoZSB0YWJsZSBpcyBzdGlsbCBwcm9jZXNzaW5nXG5cdFx0XHQvLyB0aGlzIHdpbGwgY2F0Y2ggc3BhbW1pbmcgb2YgdGhlIHVwZGF0ZUNlbGwgbWV0aG9kXG5cdFx0XHRpZiAoIHJlc3J0ICE9PSBmYWxzZSAmJiAhYy5zZXJ2ZXJTaWRlU29ydGluZyAmJiAhYy50YWJsZS5pc1Byb2Nlc3NpbmcgKSB7XG5cdFx0XHRcdGlmICggc29ydExpc3QubGVuZ3RoICkge1xuXHRcdFx0XHRcdHRzLnNvcnRPbiggYywgc29ydExpc3QsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dHMucmVzb3J0Q29tcGxldGUoIGMsIGNhbGxiYWNrICk7XG5cdFx0XHRcdFx0fSwgdHJ1ZSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRzLnNvcnRSZXNldCggYywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR0cy5yZXNvcnRDb21wbGV0ZSggYywgY2FsbGJhY2sgKTtcblx0XHRcdFx0XHRcdHRzLmFwcGx5V2lkZ2V0KCBjLnRhYmxlLCBmYWxzZSApO1xuXHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dHMucmVzb3J0Q29tcGxldGUoIGMsIGNhbGxiYWNrICk7XG5cdFx0XHRcdHRzLmFwcGx5V2lkZ2V0KCBjLnRhYmxlLCBmYWxzZSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzb3J0T24gOiBmdW5jdGlvbiggYywgbGlzdCwgY2FsbGJhY2ssIGluaXQgKSB7XG5cdFx0XHR2YXIgdGFibGUgPSBjLnRhYmxlO1xuXHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoICdzb3J0U3RhcnQnLCB0YWJsZSApO1xuXHRcdFx0Ly8gdXBkYXRlIGhlYWRlciBjb3VudCBpbmRleFxuXHRcdFx0dHMudXBkYXRlSGVhZGVyU29ydENvdW50KCBjLCBsaXN0ICk7XG5cdFx0XHQvLyBzZXQgY3NzIGZvciBoZWFkZXJzXG5cdFx0XHR0cy5zZXRIZWFkZXJzQ3NzKCBjICk7XG5cdFx0XHQvLyBmaXhlcyAjMzQ2XG5cdFx0XHRpZiAoIGMuZGVsYXlJbml0ICYmIHRzLmlzRW1wdHlPYmplY3QoIGMuY2FjaGUgKSApIHtcblx0XHRcdFx0dHMuYnVpbGRDYWNoZSggYyApO1xuXHRcdFx0fVxuXHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoICdzb3J0QmVnaW4nLCB0YWJsZSApO1xuXHRcdFx0Ly8gc29ydCB0aGUgdGFibGUgYW5kIGFwcGVuZCBpdCB0byB0aGUgZG9tXG5cdFx0XHR0cy5tdWx0aXNvcnQoIGMgKTtcblx0XHRcdHRzLmFwcGVuZENhY2hlKCBjLCBpbml0ICk7XG5cdFx0XHRjLiR0YWJsZS50cmlnZ2VySGFuZGxlciggJ3NvcnRCZWZvcmVFbmQnLCB0YWJsZSApO1xuXHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoICdzb3J0RW5kJywgdGFibGUgKTtcblx0XHRcdHRzLmFwcGx5V2lkZ2V0KCB0YWJsZSApO1xuXHRcdFx0aWYgKCAkLmlzRnVuY3Rpb24oIGNhbGxiYWNrICkgKSB7XG5cdFx0XHRcdGNhbGxiYWNrKCB0YWJsZSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzb3J0UmVzZXQgOiBmdW5jdGlvbiggYywgY2FsbGJhY2sgKSB7XG5cdFx0XHRjLnNvcnRMaXN0ID0gW107XG5cdFx0XHR0cy5zZXRIZWFkZXJzQ3NzKCBjICk7XG5cdFx0XHR0cy5tdWx0aXNvcnQoIGMgKTtcblx0XHRcdHRzLmFwcGVuZENhY2hlKCBjICk7XG5cdFx0XHR2YXIgaW5keDtcblx0XHRcdGZvciAoaW5keCA9IDA7IGluZHggPCBjLmNvbHVtbnM7IGluZHgrKykge1xuXHRcdFx0XHRjLnNvcnRWYXJzWyBpbmR4IF0uY291bnQgPSAtMTtcblx0XHRcdH1cblx0XHRcdGlmICggJC5pc0Z1bmN0aW9uKCBjYWxsYmFjayApICkge1xuXHRcdFx0XHRjYWxsYmFjayggYy50YWJsZSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRnZXRTb3J0VHlwZSA6IGZ1bmN0aW9uKCBwYXJzZXJzLCBjb2x1bW4gKSB7XG5cdFx0XHRyZXR1cm4gKCBwYXJzZXJzICYmIHBhcnNlcnNbIGNvbHVtbiBdICkgPyBwYXJzZXJzWyBjb2x1bW4gXS50eXBlIHx8ICcnIDogJyc7XG5cdFx0fSxcblxuXHRcdGdldE9yZGVyIDogZnVuY3Rpb24oIHZhbCApIHtcblx0XHRcdC8vIGxvb2sgZm9yICdkJyBpbiAnZGVzYycgb3JkZXI7IHJldHVybiB0cnVlXG5cdFx0XHRyZXR1cm4gKCAvXmQvaS50ZXN0KCB2YWwgKSB8fCB2YWwgPT09IDEgKTtcblx0XHR9LFxuXG5cdFx0Ly8gTmF0dXJhbCBzb3J0IC0gaHR0cHM6Ly9naXRodWIuY29tL292ZXJzZXQvamF2YXNjcmlwdC1uYXR1cmFsLXNvcnQgKGRhdGUgc29ydGluZyByZW1vdmVkKVxuXHRcdHNvcnROYXR1cmFsIDogZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHRpZiAoIGEgPT09IGIgKSB7IHJldHVybiAwOyB9XG5cdFx0XHRhID0gYS50b1N0cmluZygpO1xuXHRcdFx0YiA9IGIudG9TdHJpbmcoKTtcblx0XHRcdHZhciBhTnVtLCBiTnVtLCBhRmxvYXQsIGJGbG9hdCwgaW5keCwgbWF4LFxuXHRcdFx0XHRyZWdleCA9IHRzLnJlZ2V4O1xuXHRcdFx0Ly8gZmlyc3QgdHJ5IGFuZCBzb3J0IEhleCBjb2Rlc1xuXHRcdFx0aWYgKCByZWdleC5oZXgudGVzdCggYiApICkge1xuXHRcdFx0XHRhTnVtID0gcGFyc2VJbnQoICggYSB8fCAnJyApLm1hdGNoKCByZWdleC5oZXggKSwgMTYgKTtcblx0XHRcdFx0Yk51bSA9IHBhcnNlSW50KCAoIGIgfHwgJycgKS5tYXRjaCggcmVnZXguaGV4ICksIDE2ICk7XG5cdFx0XHRcdGlmICggYU51bSA8IGJOdW0gKSB7IHJldHVybiAtMTsgfVxuXHRcdFx0XHRpZiAoIGFOdW0gPiBiTnVtICkgeyByZXR1cm4gMTsgfVxuXHRcdFx0fVxuXHRcdFx0Ly8gY2h1bmsvdG9rZW5pemVcblx0XHRcdGFOdW0gPSAoIGEgfHwgJycgKS5yZXBsYWNlKCByZWdleC5jaHVuaywgJ1xcXFwwJDFcXFxcMCcgKS5yZXBsYWNlKCByZWdleC5jaHVua3MsICcnICkuc3BsaXQoICdcXFxcMCcgKTtcblx0XHRcdGJOdW0gPSAoIGIgfHwgJycgKS5yZXBsYWNlKCByZWdleC5jaHVuaywgJ1xcXFwwJDFcXFxcMCcgKS5yZXBsYWNlKCByZWdleC5jaHVua3MsICcnICkuc3BsaXQoICdcXFxcMCcgKTtcblx0XHRcdG1heCA9IE1hdGgubWF4KCBhTnVtLmxlbmd0aCwgYk51bS5sZW5ndGggKTtcblx0XHRcdC8vIG5hdHVyYWwgc29ydGluZyB0aHJvdWdoIHNwbGl0IG51bWVyaWMgc3RyaW5ncyBhbmQgZGVmYXVsdCBzdHJpbmdzXG5cdFx0XHRmb3IgKCBpbmR4ID0gMDsgaW5keCA8IG1heDsgaW5keCsrICkge1xuXHRcdFx0XHQvLyBmaW5kIGZsb2F0cyBub3Qgc3RhcnRpbmcgd2l0aCAnMCcsIHN0cmluZyBvciAwIGlmIG5vdCBkZWZpbmVkXG5cdFx0XHRcdGFGbG9hdCA9IGlzTmFOKCBhTnVtWyBpbmR4IF0gKSA/IGFOdW1bIGluZHggXSB8fCAwIDogcGFyc2VGbG9hdCggYU51bVsgaW5keCBdICkgfHwgMDtcblx0XHRcdFx0YkZsb2F0ID0gaXNOYU4oIGJOdW1bIGluZHggXSApID8gYk51bVsgaW5keCBdIHx8IDAgOiBwYXJzZUZsb2F0KCBiTnVtWyBpbmR4IF0gKSB8fCAwO1xuXHRcdFx0XHQvLyBoYW5kbGUgbnVtZXJpYyB2cyBzdHJpbmcgY29tcGFyaXNvbiAtIG51bWJlciA8IHN0cmluZyAtIChLeWxlIEFkYW1zKVxuXHRcdFx0XHRpZiAoIGlzTmFOKCBhRmxvYXQgKSAhPT0gaXNOYU4oIGJGbG9hdCApICkgeyByZXR1cm4gaXNOYU4oIGFGbG9hdCApID8gMSA6IC0xOyB9XG5cdFx0XHRcdC8vIHJlbHkgb24gc3RyaW5nIGNvbXBhcmlzb24gaWYgZGlmZmVyZW50IHR5cGVzIC0gaS5lLiAnMDInIDwgMiAhPSAnMDInIDwgJzInXG5cdFx0XHRcdGlmICggdHlwZW9mIGFGbG9hdCAhPT0gdHlwZW9mIGJGbG9hdCApIHtcblx0XHRcdFx0XHRhRmxvYXQgKz0gJyc7XG5cdFx0XHRcdFx0YkZsb2F0ICs9ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggYUZsb2F0IDwgYkZsb2F0ICkgeyByZXR1cm4gLTE7IH1cblx0XHRcdFx0aWYgKCBhRmxvYXQgPiBiRmxvYXQgKSB7IHJldHVybiAxOyB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9LFxuXG5cdFx0c29ydE5hdHVyYWxBc2MgOiBmdW5jdGlvbiggYSwgYiwgY29sLCBjICkge1xuXHRcdFx0aWYgKCBhID09PSBiICkgeyByZXR1cm4gMDsgfVxuXHRcdFx0dmFyIGVtcHR5ID0gdHMuc3RyaW5nWyAoIGMuZW1wdGllc1sgY29sIF0gfHwgYy5lbXB0eVRvICkgXTtcblx0XHRcdGlmICggYSA9PT0gJycgJiYgZW1wdHkgIT09IDAgKSB7IHJldHVybiB0eXBlb2YgZW1wdHkgPT09ICdib29sZWFuJyA/ICggZW1wdHkgPyAtMSA6IDEgKSA6IC1lbXB0eSB8fCAtMTsgfVxuXHRcdFx0aWYgKCBiID09PSAnJyAmJiBlbXB0eSAhPT0gMCApIHsgcmV0dXJuIHR5cGVvZiBlbXB0eSA9PT0gJ2Jvb2xlYW4nID8gKCBlbXB0eSA/IDEgOiAtMSApIDogZW1wdHkgfHwgMTsgfVxuXHRcdFx0cmV0dXJuIHRzLnNvcnROYXR1cmFsKCBhLCBiICk7XG5cdFx0fSxcblxuXHRcdHNvcnROYXR1cmFsRGVzYyA6IGZ1bmN0aW9uKCBhLCBiLCBjb2wsIGMgKSB7XG5cdFx0XHRpZiAoIGEgPT09IGIgKSB7IHJldHVybiAwOyB9XG5cdFx0XHR2YXIgZW1wdHkgPSB0cy5zdHJpbmdbICggYy5lbXB0aWVzWyBjb2wgXSB8fCBjLmVtcHR5VG8gKSBdO1xuXHRcdFx0aWYgKCBhID09PSAnJyAmJiBlbXB0eSAhPT0gMCApIHsgcmV0dXJuIHR5cGVvZiBlbXB0eSA9PT0gJ2Jvb2xlYW4nID8gKCBlbXB0eSA/IC0xIDogMSApIDogZW1wdHkgfHwgMTsgfVxuXHRcdFx0aWYgKCBiID09PSAnJyAmJiBlbXB0eSAhPT0gMCApIHsgcmV0dXJuIHR5cGVvZiBlbXB0eSA9PT0gJ2Jvb2xlYW4nID8gKCBlbXB0eSA/IDEgOiAtMSApIDogLWVtcHR5IHx8IC0xOyB9XG5cdFx0XHRyZXR1cm4gdHMuc29ydE5hdHVyYWwoIGIsIGEgKTtcblx0XHR9LFxuXG5cdFx0Ly8gYmFzaWMgYWxwaGFiZXRpY2FsIHNvcnRcblx0XHRzb3J0VGV4dCA6IGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0cmV0dXJuIGEgPiBiID8gMSA6ICggYSA8IGIgPyAtMSA6IDAgKTtcblx0XHR9LFxuXG5cdFx0Ly8gcmV0dXJuIHRleHQgc3RyaW5nIHZhbHVlIGJ5IGFkZGluZyB1cCBhc2NpaSB2YWx1ZVxuXHRcdC8vIHNvIHRoZSB0ZXh0IGlzIHNvbWV3aGF0IHNvcnRlZCB3aGVuIHVzaW5nIGEgZGlnaXRhbCBzb3J0XG5cdFx0Ly8gdGhpcyBpcyBOT1QgYW4gYWxwaGFudW1lcmljIHNvcnRcblx0XHRnZXRUZXh0VmFsdWUgOiBmdW5jdGlvbiggdmFsLCBudW0sIG1heCApIHtcblx0XHRcdGlmICggbWF4ICkge1xuXHRcdFx0XHQvLyBtYWtlIHN1cmUgdGhlIHRleHQgdmFsdWUgaXMgZ3JlYXRlciB0aGFuIHRoZSBtYXggbnVtZXJpY2FsIHZhbHVlIChtYXgpXG5cdFx0XHRcdHZhciBpbmR4LFxuXHRcdFx0XHRcdGxlbiA9IHZhbCA/IHZhbC5sZW5ndGggOiAwLFxuXHRcdFx0XHRcdG4gPSBtYXggKyBudW07XG5cdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0biArPSB2YWwuY2hhckNvZGVBdCggaW5keCApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudW0gKiBuO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fSxcblxuXHRcdHNvcnROdW1lcmljQXNjIDogZnVuY3Rpb24oIGEsIGIsIG51bSwgbWF4LCBjb2wsIGMgKSB7XG5cdFx0XHRpZiAoIGEgPT09IGIgKSB7IHJldHVybiAwOyB9XG5cdFx0XHR2YXIgZW1wdHkgPSB0cy5zdHJpbmdbICggYy5lbXB0aWVzWyBjb2wgXSB8fCBjLmVtcHR5VG8gKSBdO1xuXHRcdFx0aWYgKCBhID09PSAnJyAmJiBlbXB0eSAhPT0gMCApIHsgcmV0dXJuIHR5cGVvZiBlbXB0eSA9PT0gJ2Jvb2xlYW4nID8gKCBlbXB0eSA/IC0xIDogMSApIDogLWVtcHR5IHx8IC0xOyB9XG5cdFx0XHRpZiAoIGIgPT09ICcnICYmIGVtcHR5ICE9PSAwICkgeyByZXR1cm4gdHlwZW9mIGVtcHR5ID09PSAnYm9vbGVhbicgPyAoIGVtcHR5ID8gMSA6IC0xICkgOiBlbXB0eSB8fCAxOyB9XG5cdFx0XHRpZiAoIGlzTmFOKCBhICkgKSB7IGEgPSB0cy5nZXRUZXh0VmFsdWUoIGEsIG51bSwgbWF4ICk7IH1cblx0XHRcdGlmICggaXNOYU4oIGIgKSApIHsgYiA9IHRzLmdldFRleHRWYWx1ZSggYiwgbnVtLCBtYXggKTsgfVxuXHRcdFx0cmV0dXJuIGEgLSBiO1xuXHRcdH0sXG5cblx0XHRzb3J0TnVtZXJpY0Rlc2MgOiBmdW5jdGlvbiggYSwgYiwgbnVtLCBtYXgsIGNvbCwgYyApIHtcblx0XHRcdGlmICggYSA9PT0gYiApIHsgcmV0dXJuIDA7IH1cblx0XHRcdHZhciBlbXB0eSA9IHRzLnN0cmluZ1sgKCBjLmVtcHRpZXNbIGNvbCBdIHx8IGMuZW1wdHlUbyApIF07XG5cdFx0XHRpZiAoIGEgPT09ICcnICYmIGVtcHR5ICE9PSAwICkgeyByZXR1cm4gdHlwZW9mIGVtcHR5ID09PSAnYm9vbGVhbicgPyAoIGVtcHR5ID8gLTEgOiAxICkgOiBlbXB0eSB8fCAxOyB9XG5cdFx0XHRpZiAoIGIgPT09ICcnICYmIGVtcHR5ICE9PSAwICkgeyByZXR1cm4gdHlwZW9mIGVtcHR5ID09PSAnYm9vbGVhbicgPyAoIGVtcHR5ID8gMSA6IC0xICkgOiAtZW1wdHkgfHwgLTE7IH1cblx0XHRcdGlmICggaXNOYU4oIGEgKSApIHsgYSA9IHRzLmdldFRleHRWYWx1ZSggYSwgbnVtLCBtYXggKTsgfVxuXHRcdFx0aWYgKCBpc05hTiggYiApICkgeyBiID0gdHMuZ2V0VGV4dFZhbHVlKCBiLCBudW0sIG1heCApOyB9XG5cdFx0XHRyZXR1cm4gYiAtIGE7XG5cdFx0fSxcblxuXHRcdHNvcnROdW1lcmljIDogZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHRyZXR1cm4gYSAtIGI7XG5cdFx0fSxcblxuXHRcdC8qXG5cdFx04paI4paIIOKWiOKWiCDilojilogg4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWhCDiloTilojilojilojilojiloQg4paI4paI4paI4paI4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWiCDiloTilojilojilojilojilohcblx0XHTilojilogg4paI4paIIOKWiOKWiCDilojilogg4paI4paIICDilojilogg4paI4paIIOKWhOKWhOKWhCDilojilojiloTiloQgICAgIOKWiOKWiCAgIOKWgOKWiOKWhFxuXHRcdOKWiOKWiCDilojilogg4paI4paIIOKWiOKWiCDilojiloggIOKWiOKWiCDilojilogg4paA4paI4paIIOKWiOKWiOKWgOKWgCAgICAg4paI4paIICAgICAg4paA4paI4paEXG5cdFx04paI4paI4paI4paI4paI4paI4paI4paAIOKWiOKWiCDilojilojilojilojilojiloAg4paA4paI4paI4paI4paI4paAIOKWiOKWiOKWiOKWiOKWiOKWiCAgIOKWiOKWiCAgIOKWiOKWiOKWiOKWiOKWiOKWgFxuXHRcdCovXG5cdFx0YWRkV2lkZ2V0IDogZnVuY3Rpb24oIHdpZGdldCApIHtcblx0XHRcdGlmICggd2lkZ2V0LmlkICYmICF0cy5pc0VtcHR5T2JqZWN0KCB0cy5nZXRXaWRnZXRCeUlkKCB3aWRnZXQuaWQgKSApICkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyB3aWRnZXQuaWQgKyAnXCIgd2lkZ2V0IHdhcyBsb2FkZWQgbW9yZSB0aGFuIG9uY2UhJyApO1xuXHRcdFx0fVxuXHRcdFx0dHMud2lkZ2V0c1sgdHMud2lkZ2V0cy5sZW5ndGggXSA9IHdpZGdldDtcblx0XHR9LFxuXG5cdFx0aGFzV2lkZ2V0IDogZnVuY3Rpb24oICR0YWJsZSwgbmFtZSApIHtcblx0XHRcdCR0YWJsZSA9ICQoICR0YWJsZSApO1xuXHRcdFx0cmV0dXJuICR0YWJsZS5sZW5ndGggJiYgJHRhYmxlWyAwIF0uY29uZmlnICYmICR0YWJsZVsgMCBdLmNvbmZpZy53aWRnZXRJbml0WyBuYW1lIF0gfHwgZmFsc2U7XG5cdFx0fSxcblxuXHRcdGdldFdpZGdldEJ5SWQgOiBmdW5jdGlvbiggbmFtZSApIHtcblx0XHRcdHZhciBpbmR4LCB3aWRnZXQsXG5cdFx0XHRcdGxlbiA9IHRzLndpZGdldHMubGVuZ3RoO1xuXHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBsZW47IGluZHgrKyApIHtcblx0XHRcdFx0d2lkZ2V0ID0gdHMud2lkZ2V0c1sgaW5keCBdO1xuXHRcdFx0XHRpZiAoIHdpZGdldCAmJiB3aWRnZXQuaWQgJiYgd2lkZ2V0LmlkLnRvTG93ZXJDYXNlKCkgPT09IG5hbWUudG9Mb3dlckNhc2UoKSApIHtcblx0XHRcdFx0XHRyZXR1cm4gd2lkZ2V0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGFwcGx5V2lkZ2V0T3B0aW9ucyA6IGZ1bmN0aW9uKCB0YWJsZSApIHtcblx0XHRcdHZhciBpbmR4LCB3aWRnZXQsIHdvLFxuXHRcdFx0XHRjID0gdGFibGUuY29uZmlnLFxuXHRcdFx0XHRsZW4gPSBjLndpZGdldHMubGVuZ3RoO1xuXHRcdFx0aWYgKCBsZW4gKSB7XG5cdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0d2lkZ2V0ID0gdHMuZ2V0V2lkZ2V0QnlJZCggYy53aWRnZXRzWyBpbmR4IF0gKTtcblx0XHRcdFx0XHRpZiAoIHdpZGdldCAmJiB3aWRnZXQub3B0aW9ucyApIHtcblx0XHRcdFx0XHRcdHdvID0gJC5leHRlbmQoIHRydWUsIHt9LCB3aWRnZXQub3B0aW9ucyApO1xuXHRcdFx0XHRcdFx0Yy53aWRnZXRPcHRpb25zID0gJC5leHRlbmQoIHRydWUsIHdvLCBjLndpZGdldE9wdGlvbnMgKTtcblx0XHRcdFx0XHRcdC8vIGFkZCB3aWRnZXRPcHRpb25zIHRvIGRlZmF1bHRzIGZvciBvcHRpb24gdmFsaWRhdG9yXG5cdFx0XHRcdFx0XHQkLmV4dGVuZCggdHJ1ZSwgdHMuZGVmYXVsdHMud2lkZ2V0T3B0aW9ucywgd2lkZ2V0Lm9wdGlvbnMgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YWRkV2lkZ2V0RnJvbUNsYXNzIDogZnVuY3Rpb24oIHRhYmxlICkge1xuXHRcdFx0dmFyIGxlbiwgaW5keCxcblx0XHRcdFx0YyA9IHRhYmxlLmNvbmZpZyxcblx0XHRcdFx0Ly8gbG9vayBmb3Igd2lkZ2V0cyB0byBhcHBseSBmcm9tIHRhYmxlIGNsYXNzXG5cdFx0XHRcdC8vIGRvbid0IG1hdGNoIGZyb20gJ3VpLXdpZGdldC1jb250ZW50JzsgdXNlIFxcUyBpbnN0ZWFkIG9mIFxcdyB0byBpbmNsdWRlIHdpZGdldHNcblx0XHRcdFx0Ly8gd2l0aCBkYXNoZXMgaW4gdGhlIG5hbWUsIGUuZy4gXCJ3aWRnZXQtdGVzdC0yXCIgZXh0cmFjdHMgb3V0IFwidGVzdC0yXCJcblx0XHRcdFx0cmVnZXggPSAnXicgKyBjLndpZGdldENsYXNzLnJlcGxhY2UoIHRzLnJlZ2V4LnRlbXBsYXRlTmFtZSwgJyhcXFxcUyspKycgKSArICckJyxcblx0XHRcdFx0d2lkZ2V0Q2xhc3MgPSBuZXcgUmVnRXhwKCByZWdleCwgJ2cnICksXG5cdFx0XHRcdC8vIHNwbGl0IHVwIHRhYmxlIGNsYXNzICh3aWRnZXQgaWQncyBjYW4gaW5jbHVkZSBkYXNoZXMpIC0gc3RvcCB1c2luZyBtYXRjaFxuXHRcdFx0XHQvLyBvdGhlcndpc2Ugb25seSBvbmUgd2lkZ2V0IGdldHMgZXh0cmFjdGVkLCBzZWUgIzExMDlcblx0XHRcdFx0d2lkZ2V0cyA9ICggdGFibGUuY2xhc3NOYW1lIHx8ICcnICkuc3BsaXQoIHRzLnJlZ2V4LnNwYWNlcyApO1xuXHRcdFx0aWYgKCB3aWRnZXRzLmxlbmd0aCApIHtcblx0XHRcdFx0bGVuID0gd2lkZ2V0cy5sZW5ndGg7XG5cdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0aWYgKCB3aWRnZXRzWyBpbmR4IF0ubWF0Y2goIHdpZGdldENsYXNzICkgKSB7XG5cdFx0XHRcdFx0XHRjLndpZGdldHNbIGMud2lkZ2V0cy5sZW5ndGggXSA9IHdpZGdldHNbIGluZHggXS5yZXBsYWNlKCB3aWRnZXRDbGFzcywgJyQxJyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRhcHBseVdpZGdldElkIDogZnVuY3Rpb24oIHRhYmxlLCBpZCwgaW5pdCApIHtcblx0XHRcdHRhYmxlID0gJCh0YWJsZSlbMF07XG5cdFx0XHR2YXIgYXBwbGllZCwgdGltZSwgbmFtZSxcblx0XHRcdFx0YyA9IHRhYmxlLmNvbmZpZyxcblx0XHRcdFx0d28gPSBjLndpZGdldE9wdGlvbnMsXG5cdFx0XHRcdHdpZGdldCA9IHRzLmdldFdpZGdldEJ5SWQoIGlkICk7XG5cdFx0XHRpZiAoIHdpZGdldCApIHtcblx0XHRcdFx0bmFtZSA9IHdpZGdldC5pZDtcblx0XHRcdFx0YXBwbGllZCA9IGZhbHNlO1xuXHRcdFx0XHQvLyBhZGQgd2lkZ2V0IG5hbWUgdG8gb3B0aW9uIGxpc3Qgc28gaXQgZ2V0cyByZWFwcGxpZWQgYWZ0ZXIgc29ydGluZywgZmlsdGVyaW5nLCBldGNcblx0XHRcdFx0aWYgKCAkLmluQXJyYXkoIG5hbWUsIGMud2lkZ2V0cyApIDwgMCApIHtcblx0XHRcdFx0XHRjLndpZGdldHNbIGMud2lkZ2V0cy5sZW5ndGggXSA9IG5hbWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBjLmRlYnVnICkgeyB0aW1lID0gbmV3IERhdGUoKTsgfVxuXG5cdFx0XHRcdGlmICggaW5pdCB8fCAhKCBjLndpZGdldEluaXRbIG5hbWUgXSApICkge1xuXHRcdFx0XHRcdC8vIHNldCBpbml0IGZsYWcgZmlyc3QgdG8gcHJldmVudCBjYWxsaW5nIGluaXQgbW9yZSB0aGFuIG9uY2UgKGUuZy4gcGFnZXIpXG5cdFx0XHRcdFx0Yy53aWRnZXRJbml0WyBuYW1lIF0gPSB0cnVlO1xuXHRcdFx0XHRcdGlmICggdGFibGUuaGFzSW5pdGlhbGl6ZWQgKSB7XG5cdFx0XHRcdFx0XHQvLyBkb24ndCByZWFwcGx5IHdpZGdldCBvcHRpb25zIG9uIHRhYmxlc29ydGVyIGluaXRcblx0XHRcdFx0XHRcdHRzLmFwcGx5V2lkZ2V0T3B0aW9ucyggdGFibGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2Ygd2lkZ2V0LmluaXQgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdFx0XHRhcHBsaWVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGlmICggYy5kZWJ1ZyApIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZVsgY29uc29sZS5ncm91cCA/ICdncm91cCcgOiAnbG9nJyBdKCAnSW5pdGlhbGl6aW5nICcgKyBuYW1lICsgJyB3aWRnZXQnICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR3aWRnZXQuaW5pdCggdGFibGUsIHdpZGdldCwgYywgd28gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCAhaW5pdCAmJiB0eXBlb2Ygd2lkZ2V0LmZvcm1hdCA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdFx0XHRhcHBsaWVkID0gdHJ1ZTtcblx0XHRcdFx0XHRpZiAoIGMuZGVidWcgKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlWyBjb25zb2xlLmdyb3VwID8gJ2dyb3VwJyA6ICdsb2cnIF0oICdVcGRhdGluZyAnICsgbmFtZSArICcgd2lkZ2V0JyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR3aWRnZXQuZm9ybWF0KCB0YWJsZSwgYywgd28sIGZhbHNlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRcdGlmICggYXBwbGllZCApIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCAnQ29tcGxldGVkICcgKyAoIGluaXQgPyAnaW5pdGlhbGl6aW5nICcgOiAnYXBwbHlpbmcgJyApICsgbmFtZSArICcgd2lkZ2V0JyArIHRzLmJlbmNobWFyayggdGltZSApICk7XG5cdFx0XHRcdFx0XHRpZiAoIGNvbnNvbGUuZ3JvdXBFbmQgKSB7IGNvbnNvbGUuZ3JvdXBFbmQoKTsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRhcHBseVdpZGdldCA6IGZ1bmN0aW9uKCB0YWJsZSwgaW5pdCwgY2FsbGJhY2sgKSB7XG5cdFx0XHR0YWJsZSA9ICQoIHRhYmxlIClbIDAgXTsgLy8gaW4gY2FzZSB0aGlzIGlzIGNhbGxlZCBleHRlcm5hbGx5XG5cdFx0XHR2YXIgaW5keCwgbGVuLCBuYW1lcywgd2lkZ2V0LCB0aW1lLFxuXHRcdFx0XHRjID0gdGFibGUuY29uZmlnLFxuXHRcdFx0XHR3aWRnZXRzID0gW107XG5cdFx0XHQvLyBwcmV2ZW50IG51bWVyb3VzIGNvbnNlY3V0aXZlIHdpZGdldCBhcHBsaWNhdGlvbnNcblx0XHRcdGlmICggaW5pdCAhPT0gZmFsc2UgJiYgdGFibGUuaGFzSW5pdGlhbGl6ZWQgJiYgKCB0YWJsZS5pc0FwcGx5aW5nV2lkZ2V0cyB8fCB0YWJsZS5pc1VwZGF0aW5nICkgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICggYy5kZWJ1ZyApIHsgdGltZSA9IG5ldyBEYXRlKCk7IH1cblx0XHRcdHRzLmFkZFdpZGdldEZyb21DbGFzcyggdGFibGUgKTtcblx0XHRcdC8vIHByZXZlbnQgXCJ0YWJsZXNvcnRlci1yZWFkeVwiIGZyb20gZmlyaW5nIG11bHRpcGxlIHRpbWVzIGluIGEgcm93XG5cdFx0XHRjbGVhclRpbWVvdXQoIGMudGltZXJSZWFkeSApO1xuXHRcdFx0aWYgKCBjLndpZGdldHMubGVuZ3RoICkge1xuXHRcdFx0XHR0YWJsZS5pc0FwcGx5aW5nV2lkZ2V0cyA9IHRydWU7XG5cdFx0XHRcdC8vIGVuc3VyZSB1bmlxdWUgd2lkZ2V0IGlkc1xuXHRcdFx0XHRjLndpZGdldHMgPSAkLmdyZXAoIGMud2lkZ2V0cywgZnVuY3Rpb24oIHZhbCwgaW5kZXggKSB7XG5cdFx0XHRcdFx0cmV0dXJuICQuaW5BcnJheSggdmFsLCBjLndpZGdldHMgKSA9PT0gaW5kZXg7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRuYW1lcyA9IGMud2lkZ2V0cyB8fCBbXTtcblx0XHRcdFx0bGVuID0gbmFtZXMubGVuZ3RoO1xuXHRcdFx0XHQvLyBidWlsZCB3aWRnZXQgYXJyYXkgJiBhZGQgcHJpb3JpdHkgYXMgbmVlZGVkXG5cdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0d2lkZ2V0ID0gdHMuZ2V0V2lkZ2V0QnlJZCggbmFtZXNbIGluZHggXSApO1xuXHRcdFx0XHRcdGlmICggd2lkZ2V0ICYmIHdpZGdldC5pZCApIHtcblx0XHRcdFx0XHRcdC8vIHNldCBwcmlvcml0eSB0byAxMCBpZiBub3QgZGVmaW5lZFxuXHRcdFx0XHRcdFx0aWYgKCAhd2lkZ2V0LnByaW9yaXR5ICkgeyB3aWRnZXQucHJpb3JpdHkgPSAxMDsgfVxuXHRcdFx0XHRcdFx0d2lkZ2V0c1sgaW5keCBdID0gd2lkZ2V0O1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIGMuZGVidWcgKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lc1sgaW5keCBdICsgJ1wiIHdhcyBlbmFibGVkLCBidXQgdGhlIHdpZGdldCBjb2RlIGhhcyBub3QgYmVlbiBsb2FkZWQhJyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBzb3J0IHdpZGdldHMgYnkgcHJpb3JpdHlcblx0XHRcdFx0d2lkZ2V0cy5zb3J0KCBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdFx0XHRyZXR1cm4gYS5wcmlvcml0eSA8IGIucHJpb3JpdHkgPyAtMSA6IGEucHJpb3JpdHkgPT09IGIucHJpb3JpdHkgPyAwIDogMTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdC8vIGFkZC91cGRhdGUgc2VsZWN0ZWQgd2lkZ2V0c1xuXHRcdFx0XHRsZW4gPSB3aWRnZXRzLmxlbmd0aDtcblx0XHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRcdGNvbnNvbGVbIGNvbnNvbGUuZ3JvdXAgPyAnZ3JvdXAnIDogJ2xvZycgXSggJ1N0YXJ0ICcgKyAoIGluaXQgPyAnaW5pdGlhbGl6aW5nJyA6ICdhcHBseWluZycgKSArICcgd2lkZ2V0cycgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IgKCBpbmR4ID0gMDsgaW5keCA8IGxlbjsgaW5keCsrICkge1xuXHRcdFx0XHRcdHdpZGdldCA9IHdpZGdldHNbIGluZHggXTtcblx0XHRcdFx0XHRpZiAoIHdpZGdldCAmJiB3aWRnZXQuaWQgKSB7XG5cdFx0XHRcdFx0XHR0cy5hcHBseVdpZGdldElkKCB0YWJsZSwgd2lkZ2V0LmlkLCBpbml0ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggYy5kZWJ1ZyAmJiBjb25zb2xlLmdyb3VwRW5kICkgeyBjb25zb2xlLmdyb3VwRW5kKCk7IH1cblx0XHRcdH1cblx0XHRcdGMudGltZXJSZWFkeSA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0YWJsZS5pc0FwcGx5aW5nV2lkZ2V0cyA9IGZhbHNlO1xuXHRcdFx0XHQkLmRhdGEoIHRhYmxlLCAnbGFzdFdpZGdldEFwcGxpY2F0aW9uJywgbmV3IERhdGUoKSApO1xuXHRcdFx0XHRjLiR0YWJsZS50cmlnZ2VySGFuZGxlciggJ3RhYmxlc29ydGVyLXJlYWR5JyApO1xuXHRcdFx0XHQvLyBjYWxsYmFjayBleGVjdXRlZCBvbiBpbml0IG9ubHlcblx0XHRcdFx0aWYgKCAhaW5pdCAmJiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soIHRhYmxlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRcdHdpZGdldCA9IGMud2lkZ2V0cy5sZW5ndGg7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coICdDb21wbGV0ZWQgJyArXG5cdFx0XHRcdFx0XHQoIGluaXQgPT09IHRydWUgPyAnaW5pdGlhbGl6aW5nICcgOiAnYXBwbHlpbmcgJyApICsgd2lkZ2V0ICtcblx0XHRcdFx0XHRcdCcgd2lkZ2V0JyArICggd2lkZ2V0ICE9PSAxID8gJ3MnIDogJycgKSArIHRzLmJlbmNobWFyayggdGltZSApICk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIDEwICk7XG5cdFx0fSxcblxuXHRcdHJlbW92ZVdpZGdldCA6IGZ1bmN0aW9uKCB0YWJsZSwgbmFtZSwgcmVmcmVzaGluZyApIHtcblx0XHRcdHRhYmxlID0gJCggdGFibGUgKVsgMCBdO1xuXHRcdFx0dmFyIGluZGV4LCB3aWRnZXQsIGluZHgsIGxlbixcblx0XHRcdFx0YyA9IHRhYmxlLmNvbmZpZztcblx0XHRcdC8vIGlmIG5hbWUgPT09IHRydWUsIGFkZCBhbGwgd2lkZ2V0cyBmcm9tICQudGFibGVzb3J0ZXIud2lkZ2V0c1xuXHRcdFx0aWYgKCBuYW1lID09PSB0cnVlICkge1xuXHRcdFx0XHRuYW1lID0gW107XG5cdFx0XHRcdGxlbiA9IHRzLndpZGdldHMubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKCBpbmR4ID0gMDsgaW5keCA8IGxlbjsgaW5keCsrICkge1xuXHRcdFx0XHRcdHdpZGdldCA9IHRzLndpZGdldHNbIGluZHggXTtcblx0XHRcdFx0XHRpZiAoIHdpZGdldCAmJiB3aWRnZXQuaWQgKSB7XG5cdFx0XHRcdFx0XHRuYW1lWyBuYW1lLmxlbmd0aCBdID0gd2lkZ2V0LmlkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gbmFtZSBjYW4gYmUgZWl0aGVyIGFuIGFycmF5IG9mIHdpZGdldHMgbmFtZXMsXG5cdFx0XHRcdC8vIG9yIGEgc3BhY2UvY29tbWEgc2VwYXJhdGVkIGxpc3Qgb2Ygd2lkZ2V0IG5hbWVzXG5cdFx0XHRcdG5hbWUgPSAoICQuaXNBcnJheSggbmFtZSApID8gbmFtZS5qb2luKCAnLCcgKSA6IG5hbWUgfHwgJycgKS50b0xvd2VyQ2FzZSgpLnNwbGl0KCAvW1xccyxdKy8gKTtcblx0XHRcdH1cblx0XHRcdGxlbiA9IG5hbWUubGVuZ3RoO1xuXHRcdFx0Zm9yICggaW5kZXggPSAwOyBpbmRleCA8IGxlbjsgaW5kZXgrKyApIHtcblx0XHRcdFx0d2lkZ2V0ID0gdHMuZ2V0V2lkZ2V0QnlJZCggbmFtZVsgaW5kZXggXSApO1xuXHRcdFx0XHRpbmR4ID0gJC5pbkFycmF5KCBuYW1lWyBpbmRleCBdLCBjLndpZGdldHMgKTtcblx0XHRcdFx0Ly8gZG9uJ3QgcmVtb3ZlIHRoZSB3aWRnZXQgZnJvbSBjb25maWcud2lkZ2V0IGlmIHJlZnJlc2hpbmdcblx0XHRcdFx0aWYgKCBpbmR4ID49IDAgJiYgcmVmcmVzaGluZyAhPT0gdHJ1ZSApIHtcblx0XHRcdFx0XHRjLndpZGdldHMuc3BsaWNlKCBpbmR4LCAxICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCB3aWRnZXQgJiYgd2lkZ2V0LnJlbW92ZSApIHtcblx0XHRcdFx0XHRpZiAoIGMuZGVidWcgKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyggKCByZWZyZXNoaW5nID8gJ1JlZnJlc2hpbmcnIDogJ1JlbW92aW5nJyApICsgJyBcIicgKyBuYW1lWyBpbmRleCBdICsgJ1wiIHdpZGdldCcgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0d2lkZ2V0LnJlbW92ZSggdGFibGUsIGMsIGMud2lkZ2V0T3B0aW9ucywgcmVmcmVzaGluZyApO1xuXHRcdFx0XHRcdGMud2lkZ2V0SW5pdFsgbmFtZVsgaW5kZXggXSBdID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnd2lkZ2V0UmVtb3ZlRW5kJywgdGFibGUgKTtcblx0XHR9LFxuXG5cdFx0cmVmcmVzaFdpZGdldHMgOiBmdW5jdGlvbiggdGFibGUsIGRvQWxsLCBkb250YXBwbHkgKSB7XG5cdFx0XHR0YWJsZSA9ICQoIHRhYmxlIClbIDAgXTsgLy8gc2VlIGlzc3VlICMyNDNcblx0XHRcdHZhciBpbmR4LCB3aWRnZXQsXG5cdFx0XHRcdGMgPSB0YWJsZS5jb25maWcsXG5cdFx0XHRcdGN1cldpZGdldHMgPSBjLndpZGdldHMsXG5cdFx0XHRcdHdpZGdldHMgPSB0cy53aWRnZXRzLFxuXHRcdFx0XHRsZW4gPSB3aWRnZXRzLmxlbmd0aCxcblx0XHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uKCB0YWJsZSApIHtcblx0XHRcdFx0XHQkKCB0YWJsZSApLnRyaWdnZXJIYW5kbGVyKCAncmVmcmVzaENvbXBsZXRlJyApO1xuXHRcdFx0XHR9O1xuXHRcdFx0Ly8gcmVtb3ZlIHdpZGdldHMgbm90IGRlZmluZWQgaW4gY29uZmlnLndpZGdldHMsIHVubGVzcyBkb0FsbCBpcyB0cnVlXG5cdFx0XHRmb3IgKCBpbmR4ID0gMDsgaW5keCA8IGxlbjsgaW5keCsrICkge1xuXHRcdFx0XHR3aWRnZXQgPSB3aWRnZXRzWyBpbmR4IF07XG5cdFx0XHRcdGlmICggd2lkZ2V0ICYmIHdpZGdldC5pZCAmJiAoIGRvQWxsIHx8ICQuaW5BcnJheSggd2lkZ2V0LmlkLCBjdXJXaWRnZXRzICkgPCAwICkgKSB7XG5cdFx0XHRcdFx0bGlzdFsgbGlzdC5sZW5ndGggXSA9IHdpZGdldC5pZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dHMucmVtb3ZlV2lkZ2V0KCB0YWJsZSwgbGlzdC5qb2luKCAnLCcgKSwgdHJ1ZSApO1xuXHRcdFx0aWYgKCBkb250YXBwbHkgIT09IHRydWUgKSB7XG5cdFx0XHRcdC8vIGNhbGwgd2lkZ2V0IGluaXQgaWZcblx0XHRcdFx0dHMuYXBwbHlXaWRnZXQoIHRhYmxlLCBkb0FsbCB8fCBmYWxzZSwgY2FsbGJhY2sgKTtcblx0XHRcdFx0aWYgKCBkb0FsbCApIHtcblx0XHRcdFx0XHQvLyBhcHBseSB3aWRnZXQgZm9ybWF0XG5cdFx0XHRcdFx0dHMuYXBwbHlXaWRnZXQoIHRhYmxlLCBmYWxzZSwgY2FsbGJhY2sgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2FsbGJhY2soIHRhYmxlICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qXG5cdFx04paI4paIICDilojilogg4paI4paI4paI4paI4paI4paIIOKWiOKWiCDilojiloggICAgIOKWiOKWiCDilojilojilojilojilojilogg4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWiCDiloTilojilojilojilojilohcblx0XHTilojiloggIOKWiOKWiCAgIOKWiOKWiCAgIOKWiOKWiCDilojiloggICAgIOKWiOKWiCAgIOKWiOKWiCAgIOKWiOKWiCDilojilojiloTiloQgICDiloDilojiloRcblx0XHTilojiloggIOKWiOKWiCAgIOKWiOKWiCAgIOKWiOKWiCDilojiloggICAgIOKWiOKWiCAgIOKWiOKWiCAgIOKWiOKWiCDilojilojiloDiloAgICAgICDiloDilojiloRcblx0XHTiloDilojilojilojilojiloAgICDilojiloggICDilojilogg4paI4paI4paI4paI4paI4paIIOKWiOKWiCAgIOKWiOKWiCAgIOKWiOKWiCDilojilojilojilojilojilogg4paI4paI4paI4paI4paI4paAXG5cdFx0Ki9cblx0XHRiZW5jaG1hcmsgOiBmdW5jdGlvbiggZGlmZiApIHtcblx0XHRcdHJldHVybiAoICcgKCcgKyAoIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gZGlmZi5nZXRUaW1lKCkgKSArICcgbXMpJyApO1xuXHRcdH0sXG5cdFx0Ly8gZGVwcmVjYXRlZCB0cy5sb2dcblx0XHRsb2cgOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnNvbGUubG9nKCBhcmd1bWVudHMgKTtcblx0XHR9LFxuXG5cdFx0Ly8gJC5pc0VtcHR5T2JqZWN0IGZyb20galF1ZXJ5IHYxLjRcblx0XHRpc0VtcHR5T2JqZWN0IDogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdC8qanNoaW50IGZvcmluOiBmYWxzZSAqL1xuXHRcdFx0Zm9yICggdmFyIG5hbWUgaW4gb2JqICkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0aXNWYWx1ZUluQXJyYXkgOiBmdW5jdGlvbiggY29sdW1uLCBhcnJ5ICkge1xuXHRcdFx0dmFyIGluZHgsXG5cdFx0XHRcdGxlbiA9IGFycnkgJiYgYXJyeS5sZW5ndGggfHwgMDtcblx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdGlmICggYXJyeVsgaW5keCBdWyAwIF0gPT09IGNvbHVtbiApIHtcblx0XHRcdFx0XHRyZXR1cm4gaW5keDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cblx0XHRmb3JtYXRGbG9hdCA6IGZ1bmN0aW9uKCBzdHIsIHRhYmxlICkge1xuXHRcdFx0aWYgKCB0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJyB8fCBzdHIgPT09ICcnICkgeyByZXR1cm4gc3RyOyB9XG5cdFx0XHQvLyBhbGxvdyB1c2luZyBmb3JtYXRGbG9hdCB3aXRob3V0IGEgdGFibGU7IGRlZmF1bHRzIHRvIFVTIG51bWJlciBmb3JtYXRcblx0XHRcdHZhciBudW0sXG5cdFx0XHRcdHVzRm9ybWF0ID0gdGFibGUgJiYgdGFibGUuY29uZmlnID8gdGFibGUuY29uZmlnLnVzTnVtYmVyRm9ybWF0ICE9PSBmYWxzZSA6XG5cdFx0XHRcdFx0dHlwZW9mIHRhYmxlICE9PSAndW5kZWZpbmVkJyA/IHRhYmxlIDogdHJ1ZTtcblx0XHRcdGlmICggdXNGb3JtYXQgKSB7XG5cdFx0XHRcdC8vIFVTIEZvcm1hdCAtIDEsMjM0LDU2Ny44OSAtPiAxMjM0NTY3Ljg5XG5cdFx0XHRcdHN0ciA9IHN0ci5yZXBsYWNlKCB0cy5yZWdleC5jb21tYSwgJycgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEdlcm1hbiBGb3JtYXQgPSAxLjIzNC41NjcsODkgLT4gMTIzNDU2Ny44OVxuXHRcdFx0XHQvLyBGcmVuY2ggRm9ybWF0ID0gMSAyMzQgNTY3LDg5IC0+IDEyMzQ1NjcuODlcblx0XHRcdFx0c3RyID0gc3RyLnJlcGxhY2UoIHRzLnJlZ2V4LmRpZ2l0Tm9uVVMsICcnICkucmVwbGFjZSggdHMucmVnZXguY29tbWEsICcuJyApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0cy5yZWdleC5kaWdpdE5lZ2F0aXZlVGVzdC50ZXN0KCBzdHIgKSApIHtcblx0XHRcdFx0Ly8gbWFrZSAoIykgaW50byBhIG5lZ2F0aXZlIG51bWJlciAtPiAoMTApID0gLTEwXG5cdFx0XHRcdHN0ciA9IHN0ci5yZXBsYWNlKCB0cy5yZWdleC5kaWdpdE5lZ2F0aXZlUmVwbGFjZSwgJy0kMScgKTtcblx0XHRcdH1cblx0XHRcdG51bSA9IHBhcnNlRmxvYXQoIHN0ciApO1xuXHRcdFx0Ly8gcmV0dXJuIHRoZSB0ZXh0IGluc3RlYWQgb2YgemVyb1xuXHRcdFx0cmV0dXJuIGlzTmFOKCBudW0gKSA/ICQudHJpbSggc3RyICkgOiBudW07XG5cdFx0fSxcblxuXHRcdGlzRGlnaXQgOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0Ly8gcmVwbGFjZSBhbGwgdW53YW50ZWQgY2hhcnMgYW5kIG1hdGNoXG5cdFx0XHRyZXR1cm4gaXNOYU4oIHN0ciApID9cblx0XHRcdFx0dHMucmVnZXguZGlnaXRUZXN0LnRlc3QoIHN0ci50b1N0cmluZygpLnJlcGxhY2UoIHRzLnJlZ2V4LmRpZ2l0UmVwbGFjZSwgJycgKSApIDpcblx0XHRcdFx0c3RyICE9PSAnJztcblx0XHR9LFxuXG5cdFx0Ly8gY29tcHV0ZVRhYmxlSGVhZGVyQ2VsbEluZGV4ZXMgZnJvbTpcblx0XHQvLyBodHRwOi8vd3d3LmphdmFzY3JpcHR0b29sYm94LmNvbS9saWIvdGFibGUvZXhhbXBsZXMucGhwXG5cdFx0Ly8gaHR0cDovL3d3dy5qYXZhc2NyaXB0dG9vbGJveC5jb20vdGVtcC90YWJsZV9jZWxsaW5kZXguaHRtbFxuXHRcdGNvbXB1dGVDb2x1bW5JbmRleCA6IGZ1bmN0aW9uKCAkcm93cywgYyApIHtcblx0XHRcdHZhciBpLCBqLCBrLCBsLCBjZWxsLCBjZWxscywgcm93SW5kZXgsIHJvd1NwYW4sIGNvbFNwYW4sIGZpcnN0QXZhaWxDb2wsXG5cdFx0XHRcdC8vIHRvdGFsIGNvbHVtbnMgaGFzIGJlZW4gY2FsY3VsYXRlZCwgdXNlIGl0IHRvIHNldCB0aGUgbWF0cml4cm93XG5cdFx0XHRcdGNvbHVtbnMgPSBjICYmIGMuY29sdW1ucyB8fCAwLFxuXHRcdFx0XHRtYXRyaXggPSBbXSxcblx0XHRcdFx0bWF0cml4cm93ID0gbmV3IEFycmF5KCBjb2x1bW5zICk7XG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8ICRyb3dzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRjZWxscyA9ICRyb3dzWyBpIF0uY2VsbHM7XG5cdFx0XHRcdGZvciAoIGogPSAwOyBqIDwgY2VsbHMubGVuZ3RoOyBqKysgKSB7XG5cdFx0XHRcdFx0Y2VsbCA9IGNlbGxzWyBqIF07XG5cdFx0XHRcdFx0cm93SW5kZXggPSBpO1xuXHRcdFx0XHRcdHJvd1NwYW4gPSBjZWxsLnJvd1NwYW4gfHwgMTtcblx0XHRcdFx0XHRjb2xTcGFuID0gY2VsbC5jb2xTcGFuIHx8IDE7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2YgbWF0cml4WyByb3dJbmRleCBdID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0XHRcdG1hdHJpeFsgcm93SW5kZXggXSA9IFtdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBGaW5kIGZpcnN0IGF2YWlsYWJsZSBjb2x1bW4gaW4gdGhlIGZpcnN0IHJvd1xuXHRcdFx0XHRcdGZvciAoIGsgPSAwOyBrIDwgbWF0cml4WyByb3dJbmRleCBdLmxlbmd0aCArIDE7IGsrKyApIHtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIG1hdHJpeFsgcm93SW5kZXggXVsgayBdID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0XHRcdFx0Zmlyc3RBdmFpbENvbCA9IGs7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBqc2NzOmRpc2FibGUgZGlzYWxsb3dFbXB0eUJsb2Nrc1xuXHRcdFx0XHRcdGlmICggY29sdW1ucyAmJiBjZWxsLmNlbGxJbmRleCA9PT0gZmlyc3RBdmFpbENvbCApIHtcblx0XHRcdFx0XHRcdC8vIGRvbid0IHRvIGFueXRoaW5nXG5cdFx0XHRcdFx0fSBlbHNlIGlmICggY2VsbC5zZXRBdHRyaWJ1dGUgKSB7XG5cdFx0XHRcdFx0XHQvLyBqc2NzOmVuYWJsZSBkaXNhbGxvd0VtcHR5QmxvY2tzXG5cdFx0XHRcdFx0XHQvLyBhZGQgZGF0YS1jb2x1bW4gKHNldEF0dHJpYnV0ZSA9IElFOCspXG5cdFx0XHRcdFx0XHRjZWxsLnNldEF0dHJpYnV0ZSggJ2RhdGEtY29sdW1uJywgZmlyc3RBdmFpbENvbCApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyByZW1vdmUgb25jZSB3ZSBkcm9wIHN1cHBvcnQgZm9yIElFNyAtIDEvMTIvMjAxNlxuXHRcdFx0XHRcdFx0JCggY2VsbCApLmF0dHIoICdkYXRhLWNvbHVtbicsIGZpcnN0QXZhaWxDb2wgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yICggayA9IHJvd0luZGV4OyBrIDwgcm93SW5kZXggKyByb3dTcGFuOyBrKysgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBtYXRyaXhbIGsgXSA9PT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdFx0XHRcdG1hdHJpeFsgayBdID0gW107XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtYXRyaXhyb3cgPSBtYXRyaXhbIGsgXTtcblx0XHRcdFx0XHRcdGZvciAoIGwgPSBmaXJzdEF2YWlsQ29sOyBsIDwgZmlyc3RBdmFpbENvbCArIGNvbFNwYW47IGwrKyApIHtcblx0XHRcdFx0XHRcdFx0bWF0cml4cm93WyBsIF0gPSAneCc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0cy5jaGVja0NvbHVtbkNvdW50KCRyb3dzLCBtYXRyaXgsIG1hdHJpeHJvdy5sZW5ndGgpO1xuXHRcdFx0cmV0dXJuIG1hdHJpeHJvdy5sZW5ndGg7XG5cdFx0fSxcblxuXHRcdGNoZWNrQ29sdW1uQ291bnQgOiBmdW5jdGlvbigkcm93cywgbWF0cml4LCBjb2x1bW5zKSB7XG5cdFx0XHQvLyB0aGlzIERPRVMgTk9UIHJlcG9ydCBhbnkgdGJvZHkgY29sdW1uIGlzc3VlcywgZXhjZXB0IGZvciB0aGUgbWF0aCBhbmRcblx0XHRcdC8vIGFuZCBjb2x1bW4gc2VsZWN0b3Igd2lkZ2V0c1xuXHRcdFx0dmFyIGksIGxlbixcblx0XHRcdFx0dmFsaWQgPSB0cnVlLFxuXHRcdFx0XHRjZWxscyA9IFtdO1xuXHRcdFx0Zm9yICggaSA9IDA7IGkgPCBtYXRyaXgubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdC8vIHNvbWUgbWF0cml4IGVudHJpZXMgYXJlIHVuZGVmaW5lZCB3aGVuIHRlc3RpbmcgdGhlIGZvb3RlciBiZWNhdXNlXG5cdFx0XHRcdC8vIGl0IGlzIHVzaW5nIHRoZSByb3dJbmRleCBwcm9wZXJ0eVxuXHRcdFx0XHRpZiAoIG1hdHJpeFtpXSApIHtcblx0XHRcdFx0XHRsZW4gPSBtYXRyaXhbaV0ubGVuZ3RoO1xuXHRcdFx0XHRcdGlmICggbWF0cml4W2ldLmxlbmd0aCAhPT0gY29sdW1ucyApIHtcblx0XHRcdFx0XHRcdHZhbGlkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggIXZhbGlkICkge1xuXHRcdFx0XHQkcm93cy5lYWNoKCBmdW5jdGlvbiggaW5keCwgZWwgKSB7XG5cdFx0XHRcdFx0dmFyIGNlbGwgPSBlbC5wYXJlbnRFbGVtZW50Lm5vZGVOYW1lO1xuXHRcdFx0XHRcdGlmICggY2VsbHMuaW5kZXhPZiggY2VsbCApIDwgMCApIHtcblx0XHRcdFx0XHRcdGNlbGxzLnB1c2goIGNlbGwgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFxuXHRcdFx0XHRcdCdJbnZhbGlkIG9yIGluY29ycmVjdCBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgJyArXG5cdFx0XHRcdFx0Y2VsbHMuam9pbiggJyBvciAnICkgKyAnOyBleHBlY3RlZCAnICsgY29sdW1ucyArXG5cdFx0XHRcdFx0JywgYnV0IGZvdW5kICcgKyBsZW4gKyAnIGNvbHVtbnMnXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIGF1dG9tYXRpY2FsbHkgYWRkIGEgY29sZ3JvdXAgd2l0aCBjb2wgZWxlbWVudHMgc2V0IHRvIGEgcGVyY2VudGFnZSB3aWR0aFxuXHRcdGZpeENvbHVtbldpZHRoIDogZnVuY3Rpb24oIHRhYmxlICkge1xuXHRcdFx0dGFibGUgPSAkKCB0YWJsZSApWyAwIF07XG5cdFx0XHR2YXIgb3ZlcmFsbFdpZHRoLCBwZXJjZW50LCAkdGJvZGllcywgbGVuLCBpbmRleCxcblx0XHRcdFx0YyA9IHRhYmxlLmNvbmZpZyxcblx0XHRcdFx0JGNvbGdyb3VwID0gYy4kdGFibGUuY2hpbGRyZW4oICdjb2xncm91cCcgKTtcblx0XHRcdC8vIHJlbW92ZSBwbHVnaW4tYWRkZWQgY29sZ3JvdXAsIGluIGNhc2Ugd2UgbmVlZCB0byByZWZyZXNoIHRoZSB3aWR0aHNcblx0XHRcdGlmICggJGNvbGdyb3VwLmxlbmd0aCAmJiAkY29sZ3JvdXAuaGFzQ2xhc3MoIHRzLmNzcy5jb2xncm91cCApICkge1xuXHRcdFx0XHQkY29sZ3JvdXAucmVtb3ZlKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGMud2lkdGhGaXhlZCAmJiBjLiR0YWJsZS5jaGlsZHJlbiggJ2NvbGdyb3VwJyApLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdFx0JGNvbGdyb3VwID0gJCggJzxjb2xncm91cCBjbGFzcz1cIicgKyB0cy5jc3MuY29sZ3JvdXAgKyAnXCI+JyApO1xuXHRcdFx0XHRvdmVyYWxsV2lkdGggPSBjLiR0YWJsZS53aWR0aCgpO1xuXHRcdFx0XHQvLyBvbmx5IGFkZCBjb2wgZm9yIHZpc2libGUgY29sdW1ucyAtIGZpeGVzICMzNzFcblx0XHRcdFx0JHRib2RpZXMgPSBjLiR0Ym9kaWVzLmZpbmQoICd0cjpmaXJzdCcgKS5jaGlsZHJlbiggJzp2aXNpYmxlJyApO1xuXHRcdFx0XHRsZW4gPSAkdGJvZGllcy5sZW5ndGg7XG5cdFx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW47IGluZGV4KysgKSB7XG5cdFx0XHRcdFx0cGVyY2VudCA9IHBhcnNlSW50KCAoICR0Ym9kaWVzLmVxKCBpbmRleCApLndpZHRoKCkgLyBvdmVyYWxsV2lkdGggKSAqIDEwMDAsIDEwICkgLyAxMCArICclJztcblx0XHRcdFx0XHQkY29sZ3JvdXAuYXBwZW5kKCAkKCAnPGNvbD4nICkuY3NzKCAnd2lkdGgnLCBwZXJjZW50ICkgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjLiR0YWJsZS5wcmVwZW5kKCAkY29sZ3JvdXAgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gZ2V0IHNvcnRlciwgc3RyaW5nLCBlbXB0eSwgZXRjIG9wdGlvbnMgZm9yIGVhY2ggY29sdW1uIGZyb21cblx0XHQvLyBqUXVlcnkgZGF0YSwgbWV0YWRhdGEsIGhlYWRlciBvcHRpb24gb3IgaGVhZGVyIGNsYXNzIG5hbWUgKCdzb3J0ZXItZmFsc2UnKVxuXHRcdC8vIHByaW9yaXR5ID0galF1ZXJ5IGRhdGEgPiBtZXRhID4gaGVhZGVycyBvcHRpb24gPiBoZWFkZXIgY2xhc3MgbmFtZVxuXHRcdGdldERhdGEgOiBmdW5jdGlvbiggaGVhZGVyLCBjb25maWdIZWFkZXIsIGtleSApIHtcblx0XHRcdHZhciBtZXRhLCBjbDRzcyxcblx0XHRcdFx0dmFsID0gJycsXG5cdFx0XHRcdCRoZWFkZXIgPSAkKCBoZWFkZXIgKTtcblx0XHRcdGlmICggISRoZWFkZXIubGVuZ3RoICkgeyByZXR1cm4gJyc7IH1cblx0XHRcdG1ldGEgPSAkLm1ldGFkYXRhID8gJGhlYWRlci5tZXRhZGF0YSgpIDogZmFsc2U7XG5cdFx0XHRjbDRzcyA9ICcgJyArICggJGhlYWRlci5hdHRyKCAnY2xhc3MnICkgfHwgJycgKTtcblx0XHRcdGlmICggdHlwZW9mICRoZWFkZXIuZGF0YSgga2V5ICkgIT09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdHR5cGVvZiAkaGVhZGVyLmRhdGEoIGtleS50b0xvd2VyQ2FzZSgpICkgIT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0XHQvLyAnZGF0YS1sb2NrZWRPcmRlcicgaXMgYXNzaWduZWQgdG8gJ2xvY2tlZG9yZGVyJzsgYnV0ICdkYXRhLWxvY2tlZC1vcmRlcicgaXMgYXNzaWduZWQgdG8gJ2xvY2tlZE9yZGVyJ1xuXHRcdFx0XHQvLyAnZGF0YS1zb3J0LWluaXRpYWwtb3JkZXInIGlzIGFzc2lnbmVkIHRvICdzb3J0SW5pdGlhbE9yZGVyJ1xuXHRcdFx0XHR2YWwgKz0gJGhlYWRlci5kYXRhKCBrZXkgKSB8fCAkaGVhZGVyLmRhdGEoIGtleS50b0xvd2VyQ2FzZSgpICk7XG5cdFx0XHR9IGVsc2UgaWYgKCBtZXRhICYmIHR5cGVvZiBtZXRhWyBrZXkgXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdHZhbCArPSBtZXRhWyBrZXkgXTtcblx0XHRcdH0gZWxzZSBpZiAoIGNvbmZpZ0hlYWRlciAmJiB0eXBlb2YgY29uZmlnSGVhZGVyWyBrZXkgXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdHZhbCArPSBjb25maWdIZWFkZXJbIGtleSBdO1xuXHRcdFx0fSBlbHNlIGlmICggY2w0c3MgIT09ICcgJyAmJiBjbDRzcy5tYXRjaCggJyAnICsga2V5ICsgJy0nICkgKSB7XG5cdFx0XHRcdC8vIGluY2x1ZGUgc29ydGVyIGNsYXNzIG5hbWUgJ3NvcnRlci10ZXh0JywgZXRjOyBub3cgd29ya3Mgd2l0aCAnc29ydGVyLW15LWN1c3RvbS1wYXJzZXInXG5cdFx0XHRcdHZhbCA9IGNsNHNzLm1hdGNoKCBuZXcgUmVnRXhwKCAnXFxcXHMnICsga2V5ICsgJy0oW1xcXFx3LV0rKScgKSApWyAxIF0gfHwgJyc7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJC50cmltKCB2YWwgKTtcblx0XHR9LFxuXG5cdFx0Z2V0Q29sdW1uRGF0YSA6IGZ1bmN0aW9uKCB0YWJsZSwgb2JqLCBpbmR4LCBnZXRDZWxsLCAkaGVhZGVycyApIHtcblx0XHRcdGlmICggdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsICkge1xuXHRcdFx0XHRyZXR1cm4gb2JqO1xuXHRcdFx0fVxuXHRcdFx0dGFibGUgPSAkKCB0YWJsZSApWyAwIF07XG5cdFx0XHR2YXIgJGhlYWRlciwga2V5LFxuXHRcdFx0XHRjID0gdGFibGUuY29uZmlnLFxuXHRcdFx0XHQkY2VsbHMgPSAoICRoZWFkZXJzIHx8IGMuJGhlYWRlcnMgKSxcblx0XHRcdFx0Ly8gYy4kaGVhZGVySW5kZXhlZCBpcyBub3QgZGVmaW5lZCBpbml0aWFsbHlcblx0XHRcdFx0JGNlbGwgPSBjLiRoZWFkZXJJbmRleGVkICYmIGMuJGhlYWRlckluZGV4ZWRbIGluZHggXSB8fFxuXHRcdFx0XHRcdCRjZWxscy5maW5kKCAnW2RhdGEtY29sdW1uPVwiJyArIGluZHggKyAnXCJdOmxhc3QnICk7XG5cdFx0XHRpZiAoIHR5cGVvZiBvYmpbIGluZHggXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdHJldHVybiBnZXRDZWxsID8gb2JqWyBpbmR4IF0gOiBvYmpbICRjZWxscy5pbmRleCggJGNlbGwgKSBdO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICgga2V5IGluIG9iaiApIHtcblx0XHRcdFx0aWYgKCB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyApIHtcblx0XHRcdFx0XHQkaGVhZGVyID0gJGNlbGxcblx0XHRcdFx0XHRcdC8vIGhlYWRlciBjZWxsIHdpdGggY2xhc3MvaWRcblx0XHRcdFx0XHRcdC5maWx0ZXIoIGtleSApXG5cdFx0XHRcdFx0XHQvLyBmaW5kIGVsZW1lbnRzIHdpdGhpbiB0aGUgaGVhZGVyIGNlbGwgd2l0aCBjZWxsL2lkXG5cdFx0XHRcdFx0XHQuYWRkKCAkY2VsbC5maW5kKCBrZXkgKSApO1xuXHRcdFx0XHRcdGlmICggJGhlYWRlci5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gb2JqWyBrZXkgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9LFxuXG5cdFx0Ly8gKioqIFByb2Nlc3MgdGFibGUgKioqXG5cdFx0Ly8gYWRkIHByb2Nlc3NpbmcgaW5kaWNhdG9yXG5cdFx0aXNQcm9jZXNzaW5nIDogZnVuY3Rpb24oICR0YWJsZSwgdG9nZ2xlLCAkaGVhZGVycyApIHtcblx0XHRcdCR0YWJsZSA9ICQoICR0YWJsZSApO1xuXHRcdFx0dmFyIGMgPSAkdGFibGVbIDAgXS5jb25maWcsXG5cdFx0XHRcdC8vIGRlZmF1bHQgdG8gYWxsIGhlYWRlcnNcblx0XHRcdFx0JGhlYWRlciA9ICRoZWFkZXJzIHx8ICR0YWJsZS5maW5kKCAnLicgKyB0cy5jc3MuaGVhZGVyICk7XG5cdFx0XHRpZiAoIHRvZ2dsZSApIHtcblx0XHRcdFx0Ly8gZG9uJ3QgdXNlIHNvcnRMaXN0IGlmIGN1c3RvbSAkaGVhZGVycyB1c2VkXG5cdFx0XHRcdGlmICggdHlwZW9mICRoZWFkZXJzICE9PSAndW5kZWZpbmVkJyAmJiBjLnNvcnRMaXN0Lmxlbmd0aCA+IDAgKSB7XG5cdFx0XHRcdFx0Ly8gZ2V0IGhlYWRlcnMgZnJvbSB0aGUgc29ydExpc3Rcblx0XHRcdFx0XHQkaGVhZGVyID0gJGhlYWRlci5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Ly8gZ2V0IGRhdGEtY29sdW1uIGZyb20gYXR0ciB0byBrZWVwIGNvbXBhdGliaWxpdHkgd2l0aCBqUXVlcnkgMS4yLjZcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnNvcnREaXNhYmxlZCA/XG5cdFx0XHRcdFx0XHRcdGZhbHNlIDpcblx0XHRcdFx0XHRcdFx0dHMuaXNWYWx1ZUluQXJyYXkoIHBhcnNlRmxvYXQoICQoIHRoaXMgKS5hdHRyKCAnZGF0YS1jb2x1bW4nICkgKSwgYy5zb3J0TGlzdCApID49IDA7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHRhYmxlLmFkZCggJGhlYWRlciApLmFkZENsYXNzKCB0cy5jc3MucHJvY2Vzc2luZyArICcgJyArIGMuY3NzUHJvY2Vzc2luZyApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0JHRhYmxlLmFkZCggJGhlYWRlciApLnJlbW92ZUNsYXNzKCB0cy5jc3MucHJvY2Vzc2luZyArICcgJyArIGMuY3NzUHJvY2Vzc2luZyApO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBkZXRhY2ggdGJvZHkgYnV0IHNhdmUgdGhlIHBvc2l0aW9uXG5cdFx0Ly8gZG9uJ3QgdXNlIHRib2R5IGJlY2F1c2UgdGhlcmUgYXJlIHBvcnRpb25zIHRoYXQgbG9vayBmb3IgYSB0Ym9keSBpbmRleCAodXBkYXRlQ2VsbClcblx0XHRwcm9jZXNzVGJvZHkgOiBmdW5jdGlvbiggdGFibGUsICR0YiwgZ2V0SXQgKSB7XG5cdFx0XHR0YWJsZSA9ICQoIHRhYmxlIClbIDAgXTtcblx0XHRcdGlmICggZ2V0SXQgKSB7XG5cdFx0XHRcdHRhYmxlLmlzUHJvY2Vzc2luZyA9IHRydWU7XG5cdFx0XHRcdCR0Yi5iZWZvcmUoICc8Y29sZ3JvdXAgY2xhc3M9XCJ0YWJsZXNvcnRlci1zYXZlbXlwbGFjZVwiLz4nICk7XG5cdFx0XHRcdHJldHVybiAkLmZuLmRldGFjaCA/ICR0Yi5kZXRhY2goKSA6ICR0Yi5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHRcdHZhciBob2xkciA9ICQoIHRhYmxlICkuZmluZCggJ2NvbGdyb3VwLnRhYmxlc29ydGVyLXNhdmVteXBsYWNlJyApO1xuXHRcdFx0JHRiLmluc2VydEFmdGVyKCBob2xkciApO1xuXHRcdFx0aG9sZHIucmVtb3ZlKCk7XG5cdFx0XHR0YWJsZS5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcblx0XHR9LFxuXG5cdFx0Y2xlYXJUYWJsZUJvZHkgOiBmdW5jdGlvbiggdGFibGUgKSB7XG5cdFx0XHQkKCB0YWJsZSApWyAwIF0uY29uZmlnLiR0Ym9kaWVzLmNoaWxkcmVuKCkuZGV0YWNoKCk7XG5cdFx0fSxcblxuXHRcdC8vIHVzZWQgd2hlbiByZXBsYWNpbmcgYWNjZW50ZWQgY2hhcmFjdGVycyBkdXJpbmcgc29ydGluZ1xuXHRcdGNoYXJhY3RlckVxdWl2YWxlbnRzIDoge1xuXHRcdFx0J2EnIDogJ1xcdTAwZTFcXHUwMGUwXFx1MDBlMlxcdTAwZTNcXHUwMGU0XFx1MDEwNVxcdTAwZTUnLCAvLyDDocOgw6LDo8OkxIXDpVxuXHRcdFx0J0EnIDogJ1xcdTAwYzFcXHUwMGMwXFx1MDBjMlxcdTAwYzNcXHUwMGM0XFx1MDEwNFxcdTAwYzUnLCAvLyDDgcOAw4LDg8OExITDhVxuXHRcdFx0J2MnIDogJ1xcdTAwZTdcXHUwMTA3XFx1MDEwZCcsIC8vIMOnxIfEjVxuXHRcdFx0J0MnIDogJ1xcdTAwYzdcXHUwMTA2XFx1MDEwYycsIC8vIMOHxIbEjFxuXHRcdFx0J2UnIDogJ1xcdTAwZTlcXHUwMGU4XFx1MDBlYVxcdTAwZWJcXHUwMTFiXFx1MDExOScsIC8vIMOpw6jDqsOrxJvEmVxuXHRcdFx0J0UnIDogJ1xcdTAwYzlcXHUwMGM4XFx1MDBjYVxcdTAwY2JcXHUwMTFhXFx1MDExOCcsIC8vIMOJw4jDisOLxJrEmFxuXHRcdFx0J2knIDogJ1xcdTAwZWRcXHUwMGVjXFx1MDEzMFxcdTAwZWVcXHUwMGVmXFx1MDEzMScsIC8vIMOtw6zEsMOuw6/EsVxuXHRcdFx0J0knIDogJ1xcdTAwY2RcXHUwMGNjXFx1MDEzMFxcdTAwY2VcXHUwMGNmJywgLy8gw43DjMSww47Dj1xuXHRcdFx0J28nIDogJ1xcdTAwZjNcXHUwMGYyXFx1MDBmNFxcdTAwZjVcXHUwMGY2XFx1MDE0ZCcsIC8vIMOzw7LDtMO1w7bFjVxuXHRcdFx0J08nIDogJ1xcdTAwZDNcXHUwMGQyXFx1MDBkNFxcdTAwZDVcXHUwMGQ2XFx1MDE0YycsIC8vIMOTw5LDlMOVw5bFjFxuXHRcdFx0J3NzJzogJ1xcdTAwZGYnLCAvLyDDnyAocyBzaGFycClcblx0XHRcdCdTUyc6ICdcXHUxZTllJywgLy8g4bqeIChDYXBpdGFsIHNoYXJwIHMpXG5cdFx0XHQndScgOiAnXFx1MDBmYVxcdTAwZjlcXHUwMGZiXFx1MDBmY1xcdTAxNmYnLCAvLyDDusO5w7vDvMWvXG5cdFx0XHQnVScgOiAnXFx1MDBkYVxcdTAwZDlcXHUwMGRiXFx1MDBkY1xcdTAxNmUnIC8vIMOaw5nDm8Ocxa5cblx0XHR9LFxuXG5cdFx0cmVwbGFjZUFjY2VudHMgOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0dmFyIGNocixcblx0XHRcdFx0YWNjID0gJ1snLFxuXHRcdFx0XHRlcSA9IHRzLmNoYXJhY3RlckVxdWl2YWxlbnRzO1xuXHRcdFx0aWYgKCAhdHMuY2hhcmFjdGVyUmVnZXggKSB7XG5cdFx0XHRcdHRzLmNoYXJhY3RlclJlZ2V4QXJyYXkgPSB7fTtcblx0XHRcdFx0Zm9yICggY2hyIGluIGVxICkge1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGNociA9PT0gJ3N0cmluZycgKSB7XG5cdFx0XHRcdFx0XHRhY2MgKz0gZXFbIGNociBdO1xuXHRcdFx0XHRcdFx0dHMuY2hhcmFjdGVyUmVnZXhBcnJheVsgY2hyIF0gPSBuZXcgUmVnRXhwKCAnWycgKyBlcVsgY2hyIF0gKyAnXScsICdnJyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0cy5jaGFyYWN0ZXJSZWdleCA9IG5ldyBSZWdFeHAoIGFjYyArICddJyApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0cy5jaGFyYWN0ZXJSZWdleC50ZXN0KCBzdHIgKSApIHtcblx0XHRcdFx0Zm9yICggY2hyIGluIGVxICkge1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGNociA9PT0gJ3N0cmluZycgKSB7XG5cdFx0XHRcdFx0XHRzdHIgPSBzdHIucmVwbGFjZSggdHMuY2hhcmFjdGVyUmVnZXhBcnJheVsgY2hyIF0sIGNociApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9LFxuXG5cdFx0dmFsaWRhdGVPcHRpb25zIDogZnVuY3Rpb24oIGMgKSB7XG5cdFx0XHR2YXIgc2V0dGluZywgc2V0dGluZzIsIHR5cCwgdGltZXIsXG5cdFx0XHRcdC8vIGlnbm9yZSBvcHRpb25zIGNvbnRhaW5pbmcgYW4gYXJyYXlcblx0XHRcdFx0aWdub3JlID0gJ2hlYWRlcnMgc29ydEZvcmNlIHNvcnRMaXN0IHNvcnRBcHBlbmQgd2lkZ2V0cycuc3BsaXQoICcgJyApLFxuXHRcdFx0XHRvcmlnID0gYy5vcmlnaW5hbFNldHRpbmdzO1xuXHRcdFx0aWYgKCBvcmlnICkge1xuXHRcdFx0XHRpZiAoIGMuZGVidWcgKSB7XG5cdFx0XHRcdFx0dGltZXIgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZvciAoIHNldHRpbmcgaW4gb3JpZyApIHtcblx0XHRcdFx0XHR0eXAgPSB0eXBlb2YgdHMuZGVmYXVsdHNbc2V0dGluZ107XG5cdFx0XHRcdFx0aWYgKCB0eXAgPT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCAnVGFibGVzb3J0ZXIgV2FybmluZyEgXCJ0YWJsZS5jb25maWcuJyArIHNldHRpbmcgKyAnXCIgb3B0aW9uIG5vdCByZWNvZ25pemVkJyApO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIHR5cCA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCBzZXR0aW5nMiBpbiBvcmlnW3NldHRpbmddICkge1xuXHRcdFx0XHRcdFx0XHR0eXAgPSB0cy5kZWZhdWx0c1tzZXR0aW5nXSAmJiB0eXBlb2YgdHMuZGVmYXVsdHNbc2V0dGluZ11bc2V0dGluZzJdO1xuXHRcdFx0XHRcdFx0XHRpZiAoICQuaW5BcnJheSggc2V0dGluZywgaWdub3JlICkgPCAwICYmIHR5cCA9PT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCAnVGFibGVzb3J0ZXIgV2FybmluZyEgXCJ0YWJsZS5jb25maWcuJyArIHNldHRpbmcgKyAnLicgKyBzZXR0aW5nMiArICdcIiBvcHRpb24gbm90IHJlY29nbml6ZWQnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBjLmRlYnVnICkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCAndmFsaWRhdGUgb3B0aW9ucyB0aW1lOicgKyB0cy5iZW5jaG1hcmsoIHRpbWVyICkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyByZXN0b3JlIGhlYWRlcnNcblx0XHRyZXN0b3JlSGVhZGVycyA6IGZ1bmN0aW9uKCB0YWJsZSApIHtcblx0XHRcdHZhciBpbmRleCwgJGNlbGwsXG5cdFx0XHRcdGMgPSAkKCB0YWJsZSApWyAwIF0uY29uZmlnLFxuXHRcdFx0XHQkaGVhZGVycyA9IGMuJHRhYmxlLmZpbmQoIGMuc2VsZWN0b3JIZWFkZXJzICksXG5cdFx0XHRcdGxlbiA9ICRoZWFkZXJzLmxlbmd0aDtcblx0XHRcdC8vIGRvbid0IHVzZSBjLiRoZWFkZXJzIGhlcmUgaW4gY2FzZSBoZWFkZXIgY2VsbHMgd2VyZSBzd2FwcGVkXG5cdFx0XHRmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuOyBpbmRleCsrICkge1xuXHRcdFx0XHQkY2VsbCA9ICRoZWFkZXJzLmVxKCBpbmRleCApO1xuXHRcdFx0XHQvLyBvbmx5IHJlc3RvcmUgaGVhZGVyIGNlbGxzIGlmIGl0IGlzIHdyYXBwZWRcblx0XHRcdFx0Ly8gYmVjYXVzZSB0aGlzIGlzIGFsc28gdXNlZCBieSB0aGUgdXBkYXRlQWxsIG1ldGhvZFxuXHRcdFx0XHRpZiAoICRjZWxsLmZpbmQoICcuJyArIHRzLmNzcy5oZWFkZXJJbiApLmxlbmd0aCApIHtcblx0XHRcdFx0XHQkY2VsbC5odG1sKCBjLmhlYWRlckNvbnRlbnRbIGluZGV4IF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRkZXN0cm95IDogZnVuY3Rpb24oIHRhYmxlLCByZW1vdmVDbGFzc2VzLCBjYWxsYmFjayApIHtcblx0XHRcdHRhYmxlID0gJCggdGFibGUgKVsgMCBdO1xuXHRcdFx0aWYgKCAhdGFibGUuaGFzSW5pdGlhbGl6ZWQgKSB7IHJldHVybjsgfVxuXHRcdFx0Ly8gcmVtb3ZlIGFsbCB3aWRnZXRzXG5cdFx0XHR0cy5yZW1vdmVXaWRnZXQoIHRhYmxlLCB0cnVlLCBmYWxzZSApO1xuXHRcdFx0dmFyIGV2ZW50cyxcblx0XHRcdFx0JHQgPSAkKCB0YWJsZSApLFxuXHRcdFx0XHRjID0gdGFibGUuY29uZmlnLFxuXHRcdFx0XHRkZWJ1ZyA9IGMuZGVidWcsXG5cdFx0XHRcdCRoID0gJHQuZmluZCggJ3RoZWFkOmZpcnN0JyApLFxuXHRcdFx0XHQkciA9ICRoLmZpbmQoICd0ci4nICsgdHMuY3NzLmhlYWRlclJvdyApLnJlbW92ZUNsYXNzKCB0cy5jc3MuaGVhZGVyUm93ICsgJyAnICsgYy5jc3NIZWFkZXJSb3cgKSxcblx0XHRcdFx0JGYgPSAkdC5maW5kKCAndGZvb3Q6Zmlyc3QgPiB0cicgKS5jaGlsZHJlbiggJ3RoLCB0ZCcgKTtcblx0XHRcdGlmICggcmVtb3ZlQ2xhc3NlcyA9PT0gZmFsc2UgJiYgJC5pbkFycmF5KCAndWl0aGVtZScsIGMud2lkZ2V0cyApID49IDAgKSB7XG5cdFx0XHRcdC8vIHJlYXBwbHkgdWl0aGVtZSBjbGFzc2VzLCBpbiBjYXNlIHdlIHdhbnQgdG8gbWFpbnRhaW4gYXBwZWFyYW5jZVxuXHRcdFx0XHQkdC50cmlnZ2VySGFuZGxlciggJ2FwcGx5V2lkZ2V0SWQnLCBbICd1aXRoZW1lJyBdICk7XG5cdFx0XHRcdCR0LnRyaWdnZXJIYW5kbGVyKCAnYXBwbHlXaWRnZXRJZCcsIFsgJ3plYnJhJyBdICk7XG5cdFx0XHR9XG5cdFx0XHQvLyByZW1vdmUgd2lkZ2V0IGFkZGVkIHJvd3MsIGp1c3QgaW4gY2FzZVxuXHRcdFx0JGguZmluZCggJ3RyJyApLm5vdCggJHIgKS5yZW1vdmUoKTtcblx0XHRcdC8vIGRpc2FibGUgdGFibGVzb3J0ZXIgLSBub3QgdXNpbmcgLnVuYmluZCggbmFtZXNwYWNlICkgYmVjYXVzZSBuYW1lc3BhY2luZyB3YXNcblx0XHRcdC8vIGFkZGVkIGluIGpRdWVyeSB2MS40LjMgLSBzZWUgaHR0cDovL2FwaS5qcXVlcnkuY29tL2V2ZW50Lm5hbWVzcGFjZS9cblx0XHRcdGV2ZW50cyA9ICdzb3J0UmVzZXQgdXBkYXRlIHVwZGF0ZVJvd3MgdXBkYXRlQWxsIHVwZGF0ZUhlYWRlcnMgdXBkYXRlQ2VsbCBhZGRSb3dzIHVwZGF0ZUNvbXBsZXRlIHNvcnRvbiAnICtcblx0XHRcdFx0J2FwcGVuZENhY2hlIHVwZGF0ZUNhY2hlIGFwcGx5V2lkZ2V0SWQgYXBwbHlXaWRnZXRzIHJlZnJlc2hXaWRnZXRzIHJlbW92ZVdpZGdldCBkZXN0cm95IG1vdXNldXAgbW91c2VsZWF2ZSAnICtcblx0XHRcdFx0J2tleXByZXNzIHNvcnRCZWdpbiBzb3J0RW5kIHJlc2V0VG9Mb2FkU3RhdGUgJy5zcGxpdCggJyAnIClcblx0XHRcdFx0LmpvaW4oIGMubmFtZXNwYWNlICsgJyAnICk7XG5cdFx0XHQkdFxuXHRcdFx0XHQucmVtb3ZlRGF0YSggJ3RhYmxlc29ydGVyJyApXG5cdFx0XHRcdC51bmJpbmQoIGV2ZW50cy5yZXBsYWNlKCB0cy5yZWdleC5zcGFjZXMsICcgJyApICk7XG5cdFx0XHRjLiRoZWFkZXJzXG5cdFx0XHRcdC5hZGQoICRmIClcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCBbIHRzLmNzcy5oZWFkZXIsIGMuY3NzSGVhZGVyLCBjLmNzc0FzYywgYy5jc3NEZXNjLCB0cy5jc3Muc29ydEFzYywgdHMuY3NzLnNvcnREZXNjLCB0cy5jc3Muc29ydE5vbmUgXS5qb2luKCAnICcgKSApXG5cdFx0XHRcdC5yZW1vdmVBdHRyKCAnZGF0YS1jb2x1bW4nIClcblx0XHRcdFx0LnJlbW92ZUF0dHIoICdhcmlhLWxhYmVsJyApXG5cdFx0XHRcdC5hdHRyKCAnYXJpYS1kaXNhYmxlZCcsICd0cnVlJyApO1xuXHRcdFx0JHJcblx0XHRcdFx0LmZpbmQoIGMuc2VsZWN0b3JTb3J0IClcblx0XHRcdFx0LnVuYmluZCggKCAnbW91c2Vkb3duIG1vdXNldXAga2V5cHJlc3MgJy5zcGxpdCggJyAnICkuam9pbiggYy5uYW1lc3BhY2UgKyAnICcgKSApLnJlcGxhY2UoIHRzLnJlZ2V4LnNwYWNlcywgJyAnICkgKTtcblx0XHRcdHRzLnJlc3RvcmVIZWFkZXJzKCB0YWJsZSApO1xuXHRcdFx0JHQudG9nZ2xlQ2xhc3MoIHRzLmNzcy50YWJsZSArICcgJyArIGMudGFibGVDbGFzcyArICcgdGFibGVzb3J0ZXItJyArIGMudGhlbWUsIHJlbW92ZUNsYXNzZXMgPT09IGZhbHNlICk7XG5cdFx0XHQkdC5yZW1vdmVDbGFzcyhjLm5hbWVzcGFjZS5zbGljZSgxKSk7XG5cdFx0XHQvLyBjbGVhciBmbGFnIGluIGNhc2UgdGhlIHBsdWdpbiBpcyBpbml0aWFsaXplZCBhZ2FpblxuXHRcdFx0dGFibGUuaGFzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblx0XHRcdGRlbGV0ZSB0YWJsZS5jb25maWcuY2FjaGU7XG5cdFx0XHRpZiAoIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdFx0Y2FsbGJhY2soIHRhYmxlICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGRlYnVnICkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyggJ3RhYmxlc29ydGVyIGhhcyBiZWVuIHJlbW92ZWQnICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdH07XG5cblx0JC5mbi50YWJsZXNvcnRlciA9IGZ1bmN0aW9uKCBzZXR0aW5ncyApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0YWJsZSA9IHRoaXMsXG5cdFx0XHQvLyBtZXJnZSAmIGV4dGVuZCBjb25maWcgb3B0aW9uc1xuXHRcdFx0YyA9ICQuZXh0ZW5kKCB0cnVlLCB7fSwgdHMuZGVmYXVsdHMsIHNldHRpbmdzLCB0cy5pbnN0YW5jZU1ldGhvZHMgKTtcblx0XHRcdC8vIHNhdmUgaW5pdGlhbCBzZXR0aW5nc1xuXHRcdFx0Yy5vcmlnaW5hbFNldHRpbmdzID0gc2V0dGluZ3M7XG5cdFx0XHQvLyBjcmVhdGUgYSB0YWJsZSBmcm9tIGRhdGEgKGJ1aWxkIHRhYmxlIHdpZGdldClcblx0XHRcdGlmICggIXRhYmxlLmhhc0luaXRpYWxpemVkICYmIHRzLmJ1aWxkVGFibGUgJiYgdGhpcy5ub2RlTmFtZSAhPT0gJ1RBQkxFJyApIHtcblx0XHRcdFx0Ly8gcmV0dXJuIHRoZSB0YWJsZSAoaW4gY2FzZSB0aGUgb3JpZ2luYWwgdGFyZ2V0IGlzIHRoZSB0YWJsZSdzIGNvbnRhaW5lcilcblx0XHRcdFx0dHMuYnVpbGRUYWJsZSggdGFibGUsIGMgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRzLnNldHVwKCB0YWJsZSwgYyApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdC8vIHNldCB1cCBkZWJ1ZyBsb2dzXG5cdGlmICggISggd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nICkgKSB7XG5cdFx0Ly8gYWNjZXNzICQudGFibGVzb3J0ZXIubG9ncyBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBoYXZlIGEgY29uc29sZS4uLlxuXHRcdHRzLmxvZ3MgPSBbXTtcblx0XHQvKmpzaGludCAtVzAyMCAqL1xuXHRcdGNvbnNvbGUgPSB7fTtcblx0XHRjb25zb2xlLmxvZyA9IGNvbnNvbGUud2FybiA9IGNvbnNvbGUuZXJyb3IgPSBjb25zb2xlLnRhYmxlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHMgOiBhcmd1bWVudHNbMF07XG5cdFx0XHR0cy5sb2dzWyB0cy5sb2dzLmxlbmd0aCBdID0geyBkYXRlOiBEYXRlLm5vdygpLCBsb2c6IGFyZyB9O1xuXHRcdH07XG5cdH1cblxuXHQvLyBhZGQgZGVmYXVsdCBwYXJzZXJzXG5cdHRzLmFkZFBhcnNlcih7XG5cdFx0aWQgOiAnbm8tcGFyc2VyJyxcblx0XHRpcyA6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0sXG5cdFx0Zm9ybWF0IDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fSxcblx0XHR0eXBlIDogJ3RleHQnXG5cdH0pO1xuXG5cdHRzLmFkZFBhcnNlcih7XG5cdFx0aWQgOiAndGV4dCcsXG5cdFx0aXMgOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0Zm9ybWF0IDogZnVuY3Rpb24oIHN0ciwgdGFibGUgKSB7XG5cdFx0XHR2YXIgYyA9IHRhYmxlLmNvbmZpZztcblx0XHRcdGlmICggc3RyICkge1xuXHRcdFx0XHRzdHIgPSAkLnRyaW0oIGMuaWdub3JlQ2FzZSA/IHN0ci50b0xvY2FsZUxvd2VyQ2FzZSgpIDogc3RyICk7XG5cdFx0XHRcdHN0ciA9IGMuc29ydExvY2FsZUNvbXBhcmUgPyB0cy5yZXBsYWNlQWNjZW50cyggc3RyICkgOiBzdHI7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RyO1xuXHRcdH0sXG5cdFx0dHlwZSA6ICd0ZXh0J1xuXHR9KTtcblxuXHR0cy5yZWdleC5ub25kaWdpdCA9IC9bXlxcdywuIFxcLSgpXS9nO1xuXHR0cy5hZGRQYXJzZXIoe1xuXHRcdGlkIDogJ2RpZ2l0Jyxcblx0XHRpcyA6IGZ1bmN0aW9uKCBzdHIgKSB7XG5cdFx0XHRyZXR1cm4gdHMuaXNEaWdpdCggc3RyICk7XG5cdFx0fSxcblx0XHRmb3JtYXQgOiBmdW5jdGlvbiggc3RyLCB0YWJsZSApIHtcblx0XHRcdHZhciBudW0gPSB0cy5mb3JtYXRGbG9hdCggKCBzdHIgfHwgJycgKS5yZXBsYWNlKCB0cy5yZWdleC5ub25kaWdpdCwgJycgKSwgdGFibGUgKTtcblx0XHRcdHJldHVybiBzdHIgJiYgdHlwZW9mIG51bSA9PT0gJ251bWJlcicgPyBudW0gOlxuXHRcdFx0XHRzdHIgPyAkLnRyaW0oIHN0ciAmJiB0YWJsZS5jb25maWcuaWdub3JlQ2FzZSA/IHN0ci50b0xvY2FsZUxvd2VyQ2FzZSgpIDogc3RyICkgOiBzdHI7XG5cdFx0fSxcblx0XHR0eXBlIDogJ251bWVyaWMnXG5cdH0pO1xuXG5cdHRzLnJlZ2V4LmN1cnJlbmN5UmVwbGFjZSA9IC9bK1xcLSwuIF0vZztcblx0dHMucmVnZXguY3VycmVuY3lUZXN0ID0gL15cXCg/XFxkK1tcXHUwMGEzJFxcdTIwYWNcXHUwMGE0XFx1MDBhNVxcdTAwYTI/Ll18W1xcdTAwYTMkXFx1MjBhY1xcdTAwYTRcXHUwMGE1XFx1MDBhMj8uXVxcZCtcXCk/JC87XG5cdHRzLmFkZFBhcnNlcih7XG5cdFx0aWQgOiAnY3VycmVuY3knLFxuXHRcdGlzIDogZnVuY3Rpb24oIHN0ciApIHtcblx0XHRcdHN0ciA9ICggc3RyIHx8ICcnICkucmVwbGFjZSggdHMucmVnZXguY3VycmVuY3lSZXBsYWNlLCAnJyApO1xuXHRcdFx0Ly8gdGVzdCBmb3IgwqMk4oKswqTCpcKiXG5cdFx0XHRyZXR1cm4gdHMucmVnZXguY3VycmVuY3lUZXN0LnRlc3QoIHN0ciApO1xuXHRcdH0sXG5cdFx0Zm9ybWF0IDogZnVuY3Rpb24oIHN0ciwgdGFibGUgKSB7XG5cdFx0XHR2YXIgbnVtID0gdHMuZm9ybWF0RmxvYXQoICggc3RyIHx8ICcnICkucmVwbGFjZSggdHMucmVnZXgubm9uZGlnaXQsICcnICksIHRhYmxlICk7XG5cdFx0XHRyZXR1cm4gc3RyICYmIHR5cGVvZiBudW0gPT09ICdudW1iZXInID8gbnVtIDpcblx0XHRcdFx0c3RyID8gJC50cmltKCBzdHIgJiYgdGFibGUuY29uZmlnLmlnbm9yZUNhc2UgPyBzdHIudG9Mb2NhbGVMb3dlckNhc2UoKSA6IHN0ciApIDogc3RyO1xuXHRcdH0sXG5cdFx0dHlwZSA6ICdudW1lcmljJ1xuXHR9KTtcblxuXHQvLyB0b28gbWFueSBwcm90b2NvbHMgdG8gYWRkIHRoZW0gYWxsIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VSSV9zY2hlbWVcblx0Ly8gbm93LCB0aGlzIHJlZ2V4IGNhbiBiZSB1cGRhdGVkIGJlZm9yZSBpbml0aWFsaXphdGlvblxuXHR0cy5yZWdleC51cmxQcm90b2NvbFRlc3QgPSAvXihodHRwcz98ZnRwfGZpbGUpOlxcL1xcLy87XG5cdHRzLnJlZ2V4LnVybFByb3RvY29sUmVwbGFjZSA9IC8oaHR0cHM/fGZ0cHxmaWxlKTpcXC9cXC8od3d3XFwuKT8vO1xuXHR0cy5hZGRQYXJzZXIoe1xuXHRcdGlkIDogJ3VybCcsXG5cdFx0aXMgOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0cmV0dXJuIHRzLnJlZ2V4LnVybFByb3RvY29sVGVzdC50ZXN0KCBzdHIgKTtcblx0XHR9LFxuXHRcdGZvcm1hdCA6IGZ1bmN0aW9uKCBzdHIgKSB7XG5cdFx0XHRyZXR1cm4gc3RyID8gJC50cmltKCBzdHIucmVwbGFjZSggdHMucmVnZXgudXJsUHJvdG9jb2xSZXBsYWNlLCAnJyApICkgOiBzdHI7XG5cdFx0fSxcblx0XHR0eXBlIDogJ3RleHQnXG5cdH0pO1xuXG5cdHRzLnJlZ2V4LmRhc2ggPSAvLS9nO1xuXHR0cy5yZWdleC5pc29EYXRlID0gL15cXGR7NH1bXFwvXFwtXVxcZHsxLDJ9W1xcL1xcLV1cXGR7MSwyfS87XG5cdHRzLmFkZFBhcnNlcih7XG5cdFx0aWQgOiAnaXNvRGF0ZScsXG5cdFx0aXMgOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0cmV0dXJuIHRzLnJlZ2V4Lmlzb0RhdGUudGVzdCggc3RyICk7XG5cdFx0fSxcblx0XHRmb3JtYXQgOiBmdW5jdGlvbiggc3RyLCB0YWJsZSApIHtcblx0XHRcdHZhciBkYXRlID0gc3RyID8gbmV3IERhdGUoIHN0ci5yZXBsYWNlKCB0cy5yZWdleC5kYXNoLCAnLycgKSApIDogc3RyO1xuXHRcdFx0cmV0dXJuIGRhdGUgaW5zdGFuY2VvZiBEYXRlICYmIGlzRmluaXRlKCBkYXRlICkgPyBkYXRlLmdldFRpbWUoKSA6IHN0cjtcblx0XHR9LFxuXHRcdHR5cGUgOiAnbnVtZXJpYydcblx0fSk7XG5cblx0dHMucmVnZXgucGVyY2VudCA9IC8lL2c7XG5cdHRzLnJlZ2V4LnBlcmNlbnRUZXN0ID0gLyhcXGRcXHMqPyV8JVxccyo/XFxkKS87XG5cdHRzLmFkZFBhcnNlcih7XG5cdFx0aWQgOiAncGVyY2VudCcsXG5cdFx0aXMgOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0cmV0dXJuIHRzLnJlZ2V4LnBlcmNlbnRUZXN0LnRlc3QoIHN0ciApICYmIHN0ci5sZW5ndGggPCAxNTtcblx0XHR9LFxuXHRcdGZvcm1hdCA6IGZ1bmN0aW9uKCBzdHIsIHRhYmxlICkge1xuXHRcdFx0cmV0dXJuIHN0ciA/IHRzLmZvcm1hdEZsb2F0KCBzdHIucmVwbGFjZSggdHMucmVnZXgucGVyY2VudCwgJycgKSwgdGFibGUgKSA6IHN0cjtcblx0XHR9LFxuXHRcdHR5cGUgOiAnbnVtZXJpYydcblx0fSk7XG5cblx0Ly8gYWRkZWQgaW1hZ2UgcGFyc2VyIHRvIGNvcmUgdjIuMTcuOVxuXHR0cy5hZGRQYXJzZXIoe1xuXHRcdGlkIDogJ2ltYWdlJyxcblx0XHRpcyA6IGZ1bmN0aW9uKCBzdHIsIHRhYmxlLCBub2RlLCAkbm9kZSApIHtcblx0XHRcdHJldHVybiAkbm9kZS5maW5kKCAnaW1nJyApLmxlbmd0aCA+IDA7XG5cdFx0fSxcblx0XHRmb3JtYXQgOiBmdW5jdGlvbiggc3RyLCB0YWJsZSwgY2VsbCApIHtcblx0XHRcdHJldHVybiAkKCBjZWxsICkuZmluZCggJ2ltZycgKS5hdHRyKCB0YWJsZS5jb25maWcuaW1nQXR0ciB8fCAnYWx0JyApIHx8IHN0cjtcblx0XHR9LFxuXHRcdHBhcnNlZCA6IHRydWUsIC8vIGZpbHRlciB3aWRnZXQgZmxhZ1xuXHRcdHR5cGUgOiAndGV4dCdcblx0fSk7XG5cblx0dHMucmVnZXguZGF0ZVJlcGxhY2UgPSAvKFxcUykoW0FQXU0pJC9pOyAvLyB1c2VkIGJ5IHVzTG9uZ0RhdGUgJiB0aW1lIHBhcnNlclxuXHR0cy5yZWdleC51c0xvbmdEYXRlVGVzdDEgPSAvXltBLVpdezMsMTB9XFwuP1xccytcXGR7MSwyfSw/XFxzKyhcXGR7NH0pKFxccytcXGR7MSwyfTpcXGR7Mn0oOlxcZHsyfSk/KFxccytbQVBdTSk/KT8kL2k7XG5cdHRzLnJlZ2V4LnVzTG9uZ0RhdGVUZXN0MiA9IC9eXFxkezEsMn1cXHMrW0EtWl17MywxMH1cXHMrXFxkezR9L2k7XG5cdHRzLmFkZFBhcnNlcih7XG5cdFx0aWQgOiAndXNMb25nRGF0ZScsXG5cdFx0aXMgOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0Ly8gdHdvIGRpZ2l0IHllYXJzIGFyZSBub3QgYWxsb3dlZCBjcm9zcy1icm93c2VyXG5cdFx0XHQvLyBKYW4gMDEsIDIwMTMgMTI6MzQ6NTYgUE0gb3IgMDEgSmFuIDIwMTNcblx0XHRcdHJldHVybiB0cy5yZWdleC51c0xvbmdEYXRlVGVzdDEudGVzdCggc3RyICkgfHwgdHMucmVnZXgudXNMb25nRGF0ZVRlc3QyLnRlc3QoIHN0ciApO1xuXHRcdH0sXG5cdFx0Zm9ybWF0IDogZnVuY3Rpb24oIHN0ciwgdGFibGUgKSB7XG5cdFx0XHR2YXIgZGF0ZSA9IHN0ciA/IG5ldyBEYXRlKCBzdHIucmVwbGFjZSggdHMucmVnZXguZGF0ZVJlcGxhY2UsICckMSAkMicgKSApIDogc3RyO1xuXHRcdFx0cmV0dXJuIGRhdGUgaW5zdGFuY2VvZiBEYXRlICYmIGlzRmluaXRlKCBkYXRlICkgPyBkYXRlLmdldFRpbWUoKSA6IHN0cjtcblx0XHR9LFxuXHRcdHR5cGUgOiAnbnVtZXJpYydcblx0fSk7XG5cblx0Ly8gdGVzdGluZyBmb3IgIyMtIyMtIyMjIyBvciAjIyMjLSMjLSMjLCBzbyBpdCdzIG5vdCBwZXJmZWN0OyB0aW1lIGNhbiBiZSBpbmNsdWRlZFxuXHR0cy5yZWdleC5zaG9ydERhdGVUZXN0ID0gLyheXFxkezEsMn1bXFwvXFxzXVxcZHsxLDJ9W1xcL1xcc11cXGR7NH0pfCheXFxkezR9W1xcL1xcc11cXGR7MSwyfVtcXC9cXHNdXFxkezEsMn0pLztcblx0Ly8gZXNjYXBlZCBcIi1cIiBiZWNhdXNlIEpTSGludCBpbiBGaXJlZm94IHdhcyBzaG93aW5nIGl0IGFzIGFuIGVycm9yXG5cdHRzLnJlZ2V4LnNob3J0RGF0ZVJlcGxhY2UgPSAvW1xcLS4sXS9nO1xuXHQvLyBYWFkgY292ZXJzIE1EWSAmIERNWSBmb3JtYXRzXG5cdHRzLnJlZ2V4LnNob3J0RGF0ZVhYWSA9IC8oXFxkezEsMn0pW1xcL1xcc10oXFxkezEsMn0pW1xcL1xcc10oXFxkezR9KS87XG5cdHRzLnJlZ2V4LnNob3J0RGF0ZVlNRCA9IC8oXFxkezR9KVtcXC9cXHNdKFxcZHsxLDJ9KVtcXC9cXHNdKFxcZHsxLDJ9KS87XG5cdHRzLmNvbnZlcnRGb3JtYXQgPSBmdW5jdGlvbiggZGF0ZVN0cmluZywgZm9ybWF0ICkge1xuXHRcdGRhdGVTdHJpbmcgPSAoIGRhdGVTdHJpbmcgfHwgJycgKVxuXHRcdFx0LnJlcGxhY2UoIHRzLnJlZ2V4LnNwYWNlcywgJyAnIClcblx0XHRcdC5yZXBsYWNlKCB0cy5yZWdleC5zaG9ydERhdGVSZXBsYWNlLCAnLycgKTtcblx0XHRpZiAoIGZvcm1hdCA9PT0gJ21tZGR5eXl5JyApIHtcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoIHRzLnJlZ2V4LnNob3J0RGF0ZVhYWSwgJyQzLyQxLyQyJyApO1xuXHRcdH0gZWxzZSBpZiAoIGZvcm1hdCA9PT0gJ2RkbW15eXl5JyApIHtcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoIHRzLnJlZ2V4LnNob3J0RGF0ZVhYWSwgJyQzLyQyLyQxJyApO1xuXHRcdH0gZWxzZSBpZiAoIGZvcm1hdCA9PT0gJ3l5eXltbWRkJyApIHtcblx0XHRcdGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnJlcGxhY2UoIHRzLnJlZ2V4LnNob3J0RGF0ZVlNRCwgJyQxLyQyLyQzJyApO1xuXHRcdH1cblx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCBkYXRlU3RyaW5nICk7XG5cdFx0cmV0dXJuIGRhdGUgaW5zdGFuY2VvZiBEYXRlICYmIGlzRmluaXRlKCBkYXRlICkgPyBkYXRlLmdldFRpbWUoKSA6ICcnO1xuXHR9O1xuXG5cdHRzLmFkZFBhcnNlcih7XG5cdFx0aWQgOiAnc2hvcnREYXRlJywgLy8gJ21tZGR5eXl5JywgJ2RkbW15eXl5JyBvciAneXl5eW1tZGQnXG5cdFx0aXMgOiBmdW5jdGlvbiggc3RyICkge1xuXHRcdFx0c3RyID0gKCBzdHIgfHwgJycgKS5yZXBsYWNlKCB0cy5yZWdleC5zcGFjZXMsICcgJyApLnJlcGxhY2UoIHRzLnJlZ2V4LnNob3J0RGF0ZVJlcGxhY2UsICcvJyApO1xuXHRcdFx0cmV0dXJuIHRzLnJlZ2V4LnNob3J0RGF0ZVRlc3QudGVzdCggc3RyICk7XG5cdFx0fSxcblx0XHRmb3JtYXQgOiBmdW5jdGlvbiggc3RyLCB0YWJsZSwgY2VsbCwgY2VsbEluZGV4ICkge1xuXHRcdFx0aWYgKCBzdHIgKSB7XG5cdFx0XHRcdHZhciBjID0gdGFibGUuY29uZmlnLFxuXHRcdFx0XHRcdCRoZWFkZXIgPSBjLiRoZWFkZXJJbmRleGVkWyBjZWxsSW5kZXggXSxcblx0XHRcdFx0XHRmb3JtYXQgPSAkaGVhZGVyLmxlbmd0aCAmJiAkaGVhZGVyLmRhdGEoICdkYXRlRm9ybWF0JyApIHx8XG5cdFx0XHRcdFx0XHR0cy5nZXREYXRhKCAkaGVhZGVyLCB0cy5nZXRDb2x1bW5EYXRhKCB0YWJsZSwgYy5oZWFkZXJzLCBjZWxsSW5kZXggKSwgJ2RhdGVGb3JtYXQnICkgfHxcblx0XHRcdFx0XHRcdGMuZGF0ZUZvcm1hdDtcblx0XHRcdFx0Ly8gc2F2ZSBmb3JtYXQgYmVjYXVzZSBnZXREYXRhIGNhbiBiZSBzbG93Li4uXG5cdFx0XHRcdGlmICggJGhlYWRlci5sZW5ndGggKSB7XG5cdFx0XHRcdFx0JGhlYWRlci5kYXRhKCAnZGF0ZUZvcm1hdCcsIGZvcm1hdCApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cy5jb252ZXJ0Rm9ybWF0KCBzdHIsIGZvcm1hdCApIHx8IHN0cjtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblx0XHR0eXBlIDogJ251bWVyaWMnXG5cdH0pO1xuXG5cdC8vIG1hdGNoIDI0IGhvdXIgdGltZSAmIDEyIGhvdXJzIHRpbWUgKyBhbS9wbSAtIHNlZSBodHRwOi8vcmVnZXhyLmNvbS8zYzN0a1xuXHR0cy5yZWdleC50aW1lVGVzdCA9IC9eKDA/WzEtOV18MVswLTJdKTooWzAtNV1cXGQpKFxcc1tBUF1NKSR8XigoPzpbMDFdXFxkfFsyXVswLTRdKTpbMC01XVxcZCkkL2k7XG5cdHRzLnJlZ2V4LnRpbWVNYXRjaCA9IC8oMD9bMS05XXwxWzAtMl0pOihbMC01XVxcZCkoXFxzW0FQXU0pfCgoPzpbMDFdXFxkfFsyXVswLTRdKTpbMC01XVxcZCkvaTtcblx0dHMuYWRkUGFyc2VyKHtcblx0XHRpZCA6ICd0aW1lJyxcblx0XHRpcyA6IGZ1bmN0aW9uKCBzdHIgKSB7XG5cdFx0XHRyZXR1cm4gdHMucmVnZXgudGltZVRlc3QudGVzdCggc3RyICk7XG5cdFx0fSxcblx0XHRmb3JtYXQgOiBmdW5jdGlvbiggc3RyLCB0YWJsZSApIHtcblx0XHRcdC8vIGlzb2xhdGUgdGltZS4uLiBpZ25vcmUgbW9udGgsIGRheSBhbmQgeWVhclxuXHRcdFx0dmFyIHRlbXAsXG5cdFx0XHRcdHRpbWVQYXJ0ID0gKCBzdHIgfHwgJycgKS5tYXRjaCggdHMucmVnZXgudGltZU1hdGNoICksXG5cdFx0XHRcdG9yaWcgPSBuZXcgRGF0ZSggc3RyICksXG5cdFx0XHRcdC8vIG5vIHRpbWUgY29tcG9uZW50PyBkZWZhdWx0IHRvIDAwOjAwIGJ5IGxlYXZpbmcgaXQgb3V0LCBidXQgb25seSBpZiBzdHIgaXMgZGVmaW5lZFxuXHRcdFx0XHR0aW1lID0gc3RyICYmICggdGltZVBhcnQgIT09IG51bGwgPyB0aW1lUGFydFsgMCBdIDogJzAwOjAwIEFNJyApLFxuXHRcdFx0XHRkYXRlID0gdGltZSA/IG5ldyBEYXRlKCAnMjAwMC8wMS8wMSAnICsgdGltZS5yZXBsYWNlKCB0cy5yZWdleC5kYXRlUmVwbGFjZSwgJyQxICQyJyApICkgOiB0aW1lO1xuXHRcdFx0aWYgKCBkYXRlIGluc3RhbmNlb2YgRGF0ZSAmJiBpc0Zpbml0ZSggZGF0ZSApICkge1xuXHRcdFx0XHR0ZW1wID0gb3JpZyBpbnN0YW5jZW9mIERhdGUgJiYgaXNGaW5pdGUoIG9yaWcgKSA/IG9yaWcuZ2V0VGltZSgpIDogMDtcblx0XHRcdFx0Ly8gaWYgb3JpZ2luYWwgc3RyaW5nIHdhcyBhIHZhbGlkIGRhdGUsIGFkZCBpdCB0byB0aGUgZGVjaW1hbCBzbyB0aGUgY29sdW1uIHNvcnRzIGluIHNvbWUga2luZCBvZiBvcmRlclxuXHRcdFx0XHQvLyBsdWNraWx5IG5ldyBEYXRlKCkgaWdub3JlcyB0aGUgZGVjaW1hbHNcblx0XHRcdFx0cmV0dXJuIHRlbXAgPyBwYXJzZUZsb2F0KCBkYXRlLmdldFRpbWUoKSArICcuJyArIG9yaWcuZ2V0VGltZSgpICkgOiBkYXRlLmdldFRpbWUoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdHI7XG5cdFx0fSxcblx0XHR0eXBlIDogJ251bWVyaWMnXG5cdH0pO1xuXG5cdHRzLmFkZFBhcnNlcih7XG5cdFx0aWQgOiAnbWV0YWRhdGEnLFxuXHRcdGlzIDogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSxcblx0XHRmb3JtYXQgOiBmdW5jdGlvbiggc3RyLCB0YWJsZSwgY2VsbCApIHtcblx0XHRcdHZhciBjID0gdGFibGUuY29uZmlnLFxuXHRcdFx0cCA9ICggIWMucGFyc2VyTWV0YWRhdGFOYW1lICkgPyAnc29ydFZhbHVlJyA6IGMucGFyc2VyTWV0YWRhdGFOYW1lO1xuXHRcdFx0cmV0dXJuICQoIGNlbGwgKS5tZXRhZGF0YSgpWyBwIF07XG5cdFx0fSxcblx0XHR0eXBlIDogJ251bWVyaWMnXG5cdH0pO1xuXG5cdC8qXG5cdFx04paI4paI4paI4paI4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWiCDilojilojilojilojilojiloQg4paI4paI4paI4paI4paI4paEIOKWhOKWiOKWiOKWiOKWiOKWhFxuXHRcdCAg4paE4paI4paAICDilojilojiloTiloQgICDilojilojiloTiloTilojilogg4paI4paI4paE4paE4paI4paIIOKWiOKWiOKWhOKWhOKWiOKWiFxuXHRcdOKWhOKWiOKWgCAgICDilojilojiloDiloAgICDilojilojiloDiloDilojilogg4paI4paI4paA4paA4paIICDilojilojiloDiloDilojilohcblx0XHTilojilojilojilojilojilogg4paI4paI4paI4paI4paI4paIIOKWiOKWiOKWiOKWiOKWiOKWgCDilojiloggIOKWiOKWiCDilojiloggIOKWiOKWiFxuXHRcdCovXG5cdC8vIGFkZCBkZWZhdWx0IHdpZGdldHNcblx0dHMuYWRkV2lkZ2V0KHtcblx0XHRpZCA6ICd6ZWJyYScsXG5cdFx0cHJpb3JpdHkgOiA5MCxcblx0XHRmb3JtYXQgOiBmdW5jdGlvbiggdGFibGUsIGMsIHdvICkge1xuXHRcdFx0dmFyICR2aXNpYmxlUm93cywgJHJvdywgY291bnQsIGlzRXZlbiwgdGJvZHlJbmRleCwgcm93SW5kZXgsIGxlbixcblx0XHRcdFx0Y2hpbGQgPSBuZXcgUmVnRXhwKCBjLmNzc0NoaWxkUm93LCAnaScgKSxcblx0XHRcdFx0JHRib2RpZXMgPSBjLiR0Ym9kaWVzLmFkZCggJCggYy5uYW1lc3BhY2UgKyAnX2V4dHJhX3RhYmxlJyApLmNoaWxkcmVuKCAndGJvZHk6bm90KC4nICsgYy5jc3NJbmZvQmxvY2sgKyAnKScgKSApO1xuXHRcdFx0Zm9yICggdGJvZHlJbmRleCA9IDA7IHRib2R5SW5kZXggPCAkdGJvZGllcy5sZW5ndGg7IHRib2R5SW5kZXgrKyApIHtcblx0XHRcdFx0Ly8gbG9vcCB0aHJvdWdoIHRoZSB2aXNpYmxlIHJvd3Ncblx0XHRcdFx0Y291bnQgPSAwO1xuXHRcdFx0XHQkdmlzaWJsZVJvd3MgPSAkdGJvZGllcy5lcSggdGJvZHlJbmRleCApLmNoaWxkcmVuKCAndHI6dmlzaWJsZScgKS5ub3QoIGMuc2VsZWN0b3JSZW1vdmUgKTtcblx0XHRcdFx0bGVuID0gJHZpc2libGVSb3dzLmxlbmd0aDtcblx0XHRcdFx0Zm9yICggcm93SW5kZXggPSAwOyByb3dJbmRleCA8IGxlbjsgcm93SW5kZXgrKyApIHtcblx0XHRcdFx0XHQkcm93ID0gJHZpc2libGVSb3dzLmVxKCByb3dJbmRleCApO1xuXHRcdFx0XHRcdC8vIHN0eWxlIGNoaWxkIHJvd3MgdGhlIHNhbWUgd2F5IHRoZSBwYXJlbnQgcm93IHdhcyBzdHlsZWRcblx0XHRcdFx0XHRpZiAoICFjaGlsZC50ZXN0KCAkcm93WyAwIF0uY2xhc3NOYW1lICkgKSB7IGNvdW50Kys7IH1cblx0XHRcdFx0XHRpc0V2ZW4gPSAoIGNvdW50ICUgMiA9PT0gMCApO1xuXHRcdFx0XHRcdCRyb3dcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcyggd28uemVicmFbIGlzRXZlbiA/IDEgOiAwIF0gKVxuXHRcdFx0XHRcdFx0LmFkZENsYXNzKCB3by56ZWJyYVsgaXNFdmVuID8gMCA6IDEgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRyZW1vdmUgOiBmdW5jdGlvbiggdGFibGUsIGMsIHdvLCByZWZyZXNoaW5nICkge1xuXHRcdFx0aWYgKCByZWZyZXNoaW5nICkgeyByZXR1cm47IH1cblx0XHRcdHZhciB0Ym9keUluZGV4LCAkdGJvZHksXG5cdFx0XHRcdCR0Ym9kaWVzID0gYy4kdGJvZGllcyxcblx0XHRcdFx0dG9SZW1vdmUgPSAoIHdvLnplYnJhIHx8IFsgJ2V2ZW4nLCAnb2RkJyBdICkuam9pbiggJyAnICk7XG5cdFx0XHRmb3IgKCB0Ym9keUluZGV4ID0gMDsgdGJvZHlJbmRleCA8ICR0Ym9kaWVzLmxlbmd0aDsgdGJvZHlJbmRleCsrICl7XG5cdFx0XHRcdCR0Ym9keSA9IHRzLnByb2Nlc3NUYm9keSggdGFibGUsICR0Ym9kaWVzLmVxKCB0Ym9keUluZGV4ICksIHRydWUgKTsgLy8gcmVtb3ZlIHRib2R5XG5cdFx0XHRcdCR0Ym9keS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCB0b1JlbW92ZSApO1xuXHRcdFx0XHR0cy5wcm9jZXNzVGJvZHkoIHRhYmxlLCAkdGJvZHksIGZhbHNlICk7IC8vIHJlc3RvcmUgdGJvZHlcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG59KSggalF1ZXJ5ICk7XG5cbi8qISBXaWRnZXQ6IHN0b3JhZ2UgLSB1cGRhdGVkIDQvMTgvMjAxNyAodjIuMjguOCkgKi9cbi8qZ2xvYmFsIEpTT046ZmFsc2UgKi9cbjsoZnVuY3Rpb24gKCQsIHdpbmRvdywgZG9jdW1lbnQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciB0cyA9ICQudGFibGVzb3J0ZXIgfHwge307XG5cblx0Ly8gdXBkYXRlIGRlZmF1bHRzIGZvciB2YWxpZGF0b3I7IHRoZXNlIHZhbHVlcyBtdXN0IGJlIGZhbHN5IVxuXHQkLmV4dGVuZCh0cnVlLCB0cy5kZWZhdWx0cywge1xuXHRcdGZpeGVkVXJsOiAnJyxcblx0XHR3aWRnZXRPcHRpb25zOiB7XG5cdFx0XHRzdG9yYWdlX2ZpeGVkVXJsOiAnJyxcblx0XHRcdHN0b3JhZ2VfZ3JvdXA6ICcnLFxuXHRcdFx0c3RvcmFnZV9wYWdlOiAnJyxcblx0XHRcdHN0b3JhZ2Vfc3RvcmFnZVR5cGU6ICcnLFxuXHRcdFx0c3RvcmFnZV90YWJsZUlkOiAnJyxcblx0XHRcdHN0b3JhZ2VfdXNlU2Vzc2lvblN0b3JhZ2U6ICcnXG5cdFx0fVxuXHR9KTtcblxuXHQvLyAqKiogU3RvcmUgZGF0YSBpbiBsb2NhbCBzdG9yYWdlLCB3aXRoIGEgY29va2llIGZhbGxiYWNrICoqKlxuXHQvKiBJRTcgbmVlZHMgSlNPTiBsaWJyYXJ5IGZvciBKU09OLnN0cmluZ2lmeSAtIChodHRwOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1qc29uKVxuXHQgICBpZiB5b3UgbmVlZCBpdCwgdGhlbiBpbmNsdWRlIGh0dHBzOi8vZ2l0aHViLmNvbS9kb3VnbGFzY3JvY2tmb3JkL0pTT04tanNcblxuXHQgICAkLnBhcnNlSlNPTiBpcyBub3QgYXZhaWxhYmxlIGlzIGpRdWVyeSB2ZXJzaW9ucyBvbGRlciB0aGFuIDEuNC4xLCB1c2luZyBvbGRlclxuXHQgICB2ZXJzaW9ucyB3aWxsIG9ubHkgYWxsb3cgc3RvcmluZyBpbmZvcm1hdGlvbiBmb3Igb25lIHBhZ2UgYXQgYSB0aW1lXG5cblx0ICAgLy8gKioqIFNhdmUgZGF0YSAoSlNPTiBmb3JtYXQgb25seSkgKioqXG5cdCAgIC8vIHZhbCBtdXN0IGJlIHZhbGlkIEpTT04uLi4gdXNlIGh0dHA6Ly9qc29ubGludC5jb20vIHRvIGVuc3VyZSBpdCBpcyB2YWxpZFxuXHQgICB2YXIgdmFsID0geyBcIm15d2lkZ2V0XCIgOiBcImRhdGExXCIgfTsgLy8gdmFsaWQgSlNPTiB1c2VzIGRvdWJsZSBxdW90ZXNcblx0ICAgLy8gJC50YWJsZXNvcnRlci5zdG9yYWdlKHRhYmxlLCBrZXksIHZhbCk7XG5cdCAgICQudGFibGVzb3J0ZXIuc3RvcmFnZSh0YWJsZSwgJ3RhYmxlc29ydGVyLW15d2lkZ2V0JywgdmFsKTtcblxuXHQgICAvLyAqKiogR2V0IGRhdGE6ICQudGFibGVzb3J0ZXIuc3RvcmFnZSh0YWJsZSwga2V5KTsgKioqXG5cdCAgIHYgPSAkLnRhYmxlc29ydGVyLnN0b3JhZ2UodGFibGUsICd0YWJsZXNvcnRlci1teXdpZGdldCcpO1xuXHQgICAvLyB2YWwgbWF5IGJlIGVtcHR5LCBzbyBhbHNvIGNoZWNrIGZvciB5b3VyIGRhdGFcblx0ICAgdmFsID0gKHYgJiYgdi5oYXNPd25Qcm9wZXJ0eSgnbXl3aWRnZXQnKSkgPyB2Lm15d2lkZ2V0IDogJyc7XG5cdCAgIGFsZXJ0KHZhbCk7IC8vICdkYXRhMScgaWYgc2F2ZWQsIG9yICcnIGlmIG5vdFxuXHQqL1xuXHR0cy5zdG9yYWdlID0gZnVuY3Rpb24odGFibGUsIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcblx0XHR0YWJsZSA9ICQodGFibGUpWzBdO1xuXHRcdHZhciBjb29raWVJbmRleCwgY29va2llcywgZGF0ZSxcblx0XHRcdGhhc1N0b3JhZ2UgPSBmYWxzZSxcblx0XHRcdHZhbHVlcyA9IHt9LFxuXHRcdFx0YyA9IHRhYmxlLmNvbmZpZyxcblx0XHRcdHdvID0gYyAmJiBjLndpZGdldE9wdGlvbnMsXG5cdFx0XHRzdG9yYWdlVHlwZSA9IChcblx0XHRcdFx0KCBvcHRpb25zICYmIG9wdGlvbnMuc3RvcmFnZVR5cGUgKSB8fCAoIHdvICYmIHdvLnN0b3JhZ2Vfc3RvcmFnZVR5cGUgKVxuXHRcdFx0KS50b1N0cmluZygpLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0Ly8gZGVwcmVjYXRpbmcgXCJ1c2VTZXNzaW9uU3RvcmFnZVwiOyBhbnkgc3RvcmFnZVR5cGUgc2V0dGluZyBvdmVycmlkZXMgaXRcblx0XHRcdHNlc3Npb24gPSBzdG9yYWdlVHlwZSA/ICcnIDpcblx0XHRcdFx0KCBvcHRpb25zICYmIG9wdGlvbnMudXNlU2Vzc2lvblN0b3JhZ2UgKSB8fCAoIHdvICYmIHdvLnN0b3JhZ2VfdXNlU2Vzc2lvblN0b3JhZ2UgKSxcblx0XHRcdCR0YWJsZSA9ICQodGFibGUpLFxuXHRcdFx0Ly8gaWQgZnJvbSAoMSkgb3B0aW9ucyBJRCwgKDIpIHRhYmxlICdkYXRhLXRhYmxlLWdyb3VwJyBhdHRyaWJ1dGUsICgzKSB3aWRnZXRPcHRpb25zLnN0b3JhZ2VfdGFibGVJZCxcblx0XHRcdC8vICg0KSB0YWJsZSBJRCwgdGhlbiAoNSkgdGFibGUgaW5kZXhcblx0XHRcdGlkID0gb3B0aW9ucyAmJiBvcHRpb25zLmlkIHx8XG5cdFx0XHRcdCR0YWJsZS5hdHRyKCBvcHRpb25zICYmIG9wdGlvbnMuZ3JvdXAgfHwgd28gJiYgd28uc3RvcmFnZV9ncm91cCB8fCAnZGF0YS10YWJsZS1ncm91cCcpIHx8XG5cdFx0XHRcdHdvICYmIHdvLnN0b3JhZ2VfdGFibGVJZCB8fCB0YWJsZS5pZCB8fCAkKCcudGFibGVzb3J0ZXInKS5pbmRleCggJHRhYmxlICksXG5cdFx0XHQvLyB1cmwgZnJvbSAoMSkgb3B0aW9ucyB1cmwsICgyKSB0YWJsZSAnZGF0YS10YWJsZS1wYWdlJyBhdHRyaWJ1dGUsICgzKSB3aWRnZXRPcHRpb25zLnN0b3JhZ2VfZml4ZWRVcmwsXG5cdFx0XHQvLyAoNCkgdGFibGUuY29uZmlnLmZpeGVkVXJsIChkZXByZWNhdGVkKSwgdGhlbiAoNSkgd2luZG93IGxvY2F0aW9uIHBhdGhcblx0XHRcdHVybCA9IG9wdGlvbnMgJiYgb3B0aW9ucy51cmwgfHxcblx0XHRcdFx0JHRhYmxlLmF0dHIob3B0aW9ucyAmJiBvcHRpb25zLnBhZ2UgfHwgd28gJiYgd28uc3RvcmFnZV9wYWdlIHx8ICdkYXRhLXRhYmxlLXBhZ2UnKSB8fFxuXHRcdFx0XHR3byAmJiB3by5zdG9yYWdlX2ZpeGVkVXJsIHx8IGMgJiYgYy5maXhlZFVybCB8fCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cblx0XHQvLyBza2lwIGlmIHVzaW5nIGNvb2tpZXNcblx0XHRpZiAoc3RvcmFnZVR5cGUgIT09ICdjJykge1xuXHRcdFx0c3RvcmFnZVR5cGUgPSAoc3RvcmFnZVR5cGUgPT09ICdzJyB8fCBzZXNzaW9uKSA/ICdzZXNzaW9uU3RvcmFnZScgOiAnbG9jYWxTdG9yYWdlJztcblx0XHRcdC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC81NTU4NTU3XG5cdFx0XHRpZiAoc3RvcmFnZVR5cGUgaW4gd2luZG93KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0d2luZG93W3N0b3JhZ2VUeXBlXS5zZXRJdGVtKCdfdG1wdGVzdCcsICd0ZW1wJyk7XG5cdFx0XHRcdFx0aGFzU3RvcmFnZSA9IHRydWU7XG5cdFx0XHRcdFx0d2luZG93W3N0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKCdfdG1wdGVzdCcpO1xuXHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRcdGlmIChjICYmIGMuZGVidWcpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUud2Fybiggc3RvcmFnZVR5cGUgKyAnIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoYy5kZWJ1Zykge1xuXHRcdFx0Y29uc29sZS5sb2coJ1N0b3JhZ2Ugd2lkZ2V0IHVzaW5nJywgaGFzU3RvcmFnZSA/IHN0b3JhZ2VUeXBlIDogJ2Nvb2tpZXMnKTtcblx0XHR9XG5cdFx0Ly8gKioqIGdldCB2YWx1ZSAqKipcblx0XHRpZiAoJC5wYXJzZUpTT04pIHtcblx0XHRcdGlmIChoYXNTdG9yYWdlKSB7XG5cdFx0XHRcdHZhbHVlcyA9ICQucGFyc2VKU09OKCB3aW5kb3dbc3RvcmFnZVR5cGVdW2tleV0gfHwgJ251bGwnICkgfHwge307XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBvbGQgYnJvd3NlciwgdXNpbmcgY29va2llc1xuXHRcdFx0XHRjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KC9bO1xcc3w9XS8pO1xuXHRcdFx0XHQvLyBhZGQgb25lIHRvIGdldCBmcm9tIHRoZSBrZXkgdG8gdGhlIHZhbHVlXG5cdFx0XHRcdGNvb2tpZUluZGV4ID0gJC5pbkFycmF5KGtleSwgY29va2llcykgKyAxO1xuXHRcdFx0XHR2YWx1ZXMgPSAoY29va2llSW5kZXggIT09IDApID8gJC5wYXJzZUpTT04oY29va2llc1tjb29raWVJbmRleF0gfHwgJ251bGwnKSB8fCB7fSA6IHt9O1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBhbGxvdyB2YWx1ZSB0byBiZSBhbiBlbXB0eSBzdHJpbmcgdG9vXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkpTT04gJiYgSlNPTi5oYXNPd25Qcm9wZXJ0eSgnc3RyaW5naWZ5JykpIHtcblx0XHRcdC8vIGFkZCB1bmlxdWUgaWRlbnRpZmllcnMgPSB1cmwgcGF0aG5hbWUgPiB0YWJsZSBJRC9pbmRleCBvbiBwYWdlID4gZGF0YVxuXHRcdFx0aWYgKCF2YWx1ZXNbdXJsXSkge1xuXHRcdFx0XHR2YWx1ZXNbdXJsXSA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0dmFsdWVzW3VybF1baWRdID0gdmFsdWU7XG5cdFx0XHQvLyAqKiogc2V0IHZhbHVlICoqKlxuXHRcdFx0aWYgKGhhc1N0b3JhZ2UpIHtcblx0XHRcdFx0d2luZG93W3N0b3JhZ2VUeXBlXVtrZXldID0gSlNPTi5zdHJpbmdpZnkodmFsdWVzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHRkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoMzE1MzZlKzYpKTsgLy8gMzY1IGRheXNcblx0XHRcdFx0ZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz0nICsgKEpTT04uc3RyaW5naWZ5KHZhbHVlcykpLnJlcGxhY2UoL1xcXCIvZywgJ1xcXCInKSArICc7IGV4cGlyZXM9JyArIGRhdGUudG9HTVRTdHJpbmcoKSArICc7IHBhdGg9Lyc7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB2YWx1ZXMgJiYgdmFsdWVzW3VybF0gPyB2YWx1ZXNbdXJsXVtpZF0gOiAnJztcblx0XHR9XG5cdH07XG5cbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7XG5cbi8qISBXaWRnZXQ6IHVpdGhlbWUgLSB1cGRhdGVkIDkvMjcvMjAxNyAodjIuMjkuMCkgKi9cbjsoZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgdHMgPSAkLnRhYmxlc29ydGVyIHx8IHt9O1xuXG5cdHRzLnRoZW1lcyA9IHtcblx0XHQnYm9vdHN0cmFwJyA6IHtcblx0XHRcdHRhYmxlICAgICAgICA6ICd0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1zdHJpcGVkJyxcblx0XHRcdGNhcHRpb24gICAgICA6ICdjYXB0aW9uJyxcblx0XHRcdC8vIGhlYWRlciBjbGFzcyBuYW1lc1xuXHRcdFx0aGVhZGVyICAgICAgIDogJ2Jvb3RzdHJhcC1oZWFkZXInLCAvLyBnaXZlIHRoZSBoZWFkZXIgYSBncmFkaWVudCBiYWNrZ3JvdW5kICh0aGVtZS5ib290c3RyYXBfMi5jc3MpXG5cdFx0XHRzb3J0Tm9uZSAgICAgOiAnJyxcblx0XHRcdHNvcnRBc2MgICAgICA6ICcnLFxuXHRcdFx0c29ydERlc2MgICAgIDogJycsXG5cdFx0XHRhY3RpdmUgICAgICAgOiAnJywgLy8gYXBwbGllZCB3aGVuIGNvbHVtbiBpcyBzb3J0ZWRcblx0XHRcdGhvdmVyICAgICAgICA6ICcnLCAvLyBjdXN0b20gY3NzIHJlcXVpcmVkIC0gYSBkZWZpbmVkIGJvb3RzdHJhcCBzdHlsZSBtYXkgbm90IG92ZXJyaWRlIG90aGVyIGNsYXNzZXNcblx0XHRcdC8vIGljb24gY2xhc3MgbmFtZXNcblx0XHRcdGljb25zICAgICAgICA6ICcnLCAvLyBhZGQgJ2Jvb3RzdHJhcC1pY29uLXdoaXRlJyB0byBtYWtlIHRoZW0gd2hpdGU7IHRoaXMgaWNvbiBjbGFzcyBpcyBhZGRlZCB0byB0aGUgPGk+IGluIHRoZSBoZWFkZXJcblx0XHRcdGljb25Tb3J0Tm9uZSA6ICdib290c3RyYXAtaWNvbi11bnNvcnRlZCcsIC8vIGNsYXNzIG5hbWUgYWRkZWQgdG8gaWNvbiB3aGVuIGNvbHVtbiBpcyBub3Qgc29ydGVkXG5cdFx0XHRpY29uU29ydEFzYyAgOiAnZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXVwJywgLy8gY2xhc3MgbmFtZSBhZGRlZCB0byBpY29uIHdoZW4gY29sdW1uIGhhcyBhc2NlbmRpbmcgc29ydFxuXHRcdFx0aWNvblNvcnREZXNjIDogJ2dseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi1kb3duJywgLy8gY2xhc3MgbmFtZSBhZGRlZCB0byBpY29uIHdoZW4gY29sdW1uIGhhcyBkZXNjZW5kaW5nIHNvcnRcblx0XHRcdGZpbHRlclJvdyAgICA6ICcnLCAvLyBmaWx0ZXIgcm93IGNsYXNzXG5cdFx0XHRmb290ZXJSb3cgICAgOiAnJyxcblx0XHRcdGZvb3RlckNlbGxzICA6ICcnLFxuXHRcdFx0ZXZlbiAgICAgICAgIDogJycsIC8vIGV2ZW4gcm93IHplYnJhIHN0cmlwaW5nXG5cdFx0XHRvZGQgICAgICAgICAgOiAnJyAgLy8gb2RkIHJvdyB6ZWJyYSBzdHJpcGluZ1xuXHRcdH0sXG5cdFx0J2p1aScgOiB7XG5cdFx0XHR0YWJsZSAgICAgICAgOiAndWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnLCAvLyB0YWJsZSBjbGFzc2VzXG5cdFx0XHRjYXB0aW9uICAgICAgOiAndWktd2lkZ2V0LWNvbnRlbnQnLFxuXHRcdFx0Ly8gaGVhZGVyIGNsYXNzIG5hbWVzXG5cdFx0XHRoZWFkZXIgICAgICAgOiAndWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHQnLCAvLyBoZWFkZXIgY2xhc3Nlc1xuXHRcdFx0c29ydE5vbmUgICAgIDogJycsXG5cdFx0XHRzb3J0QXNjICAgICAgOiAnJyxcblx0XHRcdHNvcnREZXNjICAgICA6ICcnLFxuXHRcdFx0YWN0aXZlICAgICAgIDogJ3VpLXN0YXRlLWFjdGl2ZScsIC8vIGFwcGxpZWQgd2hlbiBjb2x1bW4gaXMgc29ydGVkXG5cdFx0XHRob3ZlciAgICAgICAgOiAndWktc3RhdGUtaG92ZXInLCAgLy8gaG92ZXIgY2xhc3Ncblx0XHRcdC8vIGljb24gY2xhc3MgbmFtZXNcblx0XHRcdGljb25zICAgICAgICA6ICd1aS1pY29uJywgLy8gaWNvbiBjbGFzcyBhZGRlZCB0byB0aGUgPGk+IGluIHRoZSBoZWFkZXJcblx0XHRcdGljb25Tb3J0Tm9uZSA6ICd1aS1pY29uLWNhcmF0LTItbi1zIHVpLWljb24tY2FyZXQtMi1uLXMnLCAvLyBjbGFzcyBuYW1lIGFkZGVkIHRvIGljb24gd2hlbiBjb2x1bW4gaXMgbm90IHNvcnRlZFxuXHRcdFx0aWNvblNvcnRBc2MgIDogJ3VpLWljb24tY2FyYXQtMS1uIHVpLWljb24tY2FyZXQtMS1uJywgLy8gY2xhc3MgbmFtZSBhZGRlZCB0byBpY29uIHdoZW4gY29sdW1uIGhhcyBhc2NlbmRpbmcgc29ydFxuXHRcdFx0aWNvblNvcnREZXNjIDogJ3VpLWljb24tY2FyYXQtMS1zIHVpLWljb24tY2FyZXQtMS1zJywgLy8gY2xhc3MgbmFtZSBhZGRlZCB0byBpY29uIHdoZW4gY29sdW1uIGhhcyBkZXNjZW5kaW5nIHNvcnRcblx0XHRcdGZpbHRlclJvdyAgICA6ICcnLFxuXHRcdFx0Zm9vdGVyUm93ICAgIDogJycsXG5cdFx0XHRmb290ZXJDZWxscyAgOiAnJyxcblx0XHRcdGV2ZW4gICAgICAgICA6ICd1aS13aWRnZXQtY29udGVudCcsIC8vIGV2ZW4gcm93IHplYnJhIHN0cmlwaW5nXG5cdFx0XHRvZGQgICAgICAgICAgOiAndWktc3RhdGUtZGVmYXVsdCcgICAvLyBvZGQgcm93IHplYnJhIHN0cmlwaW5nXG5cdFx0fVxuXHR9O1xuXG5cdCQuZXh0ZW5kKHRzLmNzcywge1xuXHRcdHdyYXBwZXIgOiAndGFibGVzb3J0ZXItd3JhcHBlcicgLy8gdWkgdGhlbWUgJiByZXNpemFibGVcblx0fSk7XG5cblx0dHMuYWRkV2lkZ2V0KHtcblx0XHRpZDogJ3VpdGhlbWUnLFxuXHRcdHByaW9yaXR5OiAxMCxcblx0XHRmb3JtYXQ6IGZ1bmN0aW9uKHRhYmxlLCBjLCB3bykge1xuXHRcdFx0dmFyIGksIHRtcCwgaGRyLCBpY29uLCB0aW1lLCAkaGVhZGVyLCAkaWNvbiwgJHRmb290LCAkaCwgb2xkdGhlbWUsIG9sZHJlbW92ZSwgb2xkSWNvblJtdiwgaGFzT2xkVGhlbWUsXG5cdFx0XHRcdHRoZW1lc0FsbCA9IHRzLnRoZW1lcyxcblx0XHRcdFx0JHRhYmxlID0gYy4kdGFibGUuYWRkKCAkKCBjLm5hbWVzcGFjZSArICdfZXh0cmFfdGFibGUnICkgKSxcblx0XHRcdFx0JGhlYWRlcnMgPSBjLiRoZWFkZXJzLmFkZCggJCggYy5uYW1lc3BhY2UgKyAnX2V4dHJhX2hlYWRlcnMnICkgKSxcblx0XHRcdFx0dGhlbWUgPSBjLnRoZW1lIHx8ICdqdWknLFxuXHRcdFx0XHR0aGVtZXMgPSB0aGVtZXNBbGxbdGhlbWVdIHx8IHt9LFxuXHRcdFx0XHRyZW1vdmUgPSAkLnRyaW0oIFsgdGhlbWVzLnNvcnROb25lLCB0aGVtZXMuc29ydERlc2MsIHRoZW1lcy5zb3J0QXNjLCB0aGVtZXMuYWN0aXZlIF0uam9pbiggJyAnICkgKSxcblx0XHRcdFx0aWNvblJtdiA9ICQudHJpbSggWyB0aGVtZXMuaWNvblNvcnROb25lLCB0aGVtZXMuaWNvblNvcnREZXNjLCB0aGVtZXMuaWNvblNvcnRBc2MgXS5qb2luKCAnICcgKSApO1xuXHRcdFx0aWYgKGMuZGVidWcpIHsgdGltZSA9IG5ldyBEYXRlKCk7IH1cblx0XHRcdC8vIGluaXRpYWxpemF0aW9uIGNvZGUgLSBydW4gb25jZVxuXHRcdFx0aWYgKCEkdGFibGUuaGFzQ2xhc3MoJ3RhYmxlc29ydGVyLScgKyB0aGVtZSkgfHwgYy50aGVtZSAhPT0gYy5hcHBsaWVkVGhlbWUgfHwgIXdvLnVpdGhlbWVfYXBwbGllZCkge1xuXHRcdFx0XHR3by51aXRoZW1lX2FwcGxpZWQgPSB0cnVlO1xuXHRcdFx0XHRvbGR0aGVtZSA9IHRoZW1lc0FsbFtjLmFwcGxpZWRUaGVtZV0gfHwge307XG5cdFx0XHRcdGhhc09sZFRoZW1lID0gISQuaXNFbXB0eU9iamVjdChvbGR0aGVtZSk7XG5cdFx0XHRcdG9sZHJlbW92ZSA9ICBoYXNPbGRUaGVtZSA/IFsgb2xkdGhlbWUuc29ydE5vbmUsIG9sZHRoZW1lLnNvcnREZXNjLCBvbGR0aGVtZS5zb3J0QXNjLCBvbGR0aGVtZS5hY3RpdmUgXS5qb2luKCAnICcgKSA6ICcnO1xuXHRcdFx0XHRvbGRJY29uUm12ID0gaGFzT2xkVGhlbWUgPyBbIG9sZHRoZW1lLmljb25Tb3J0Tm9uZSwgb2xkdGhlbWUuaWNvblNvcnREZXNjLCBvbGR0aGVtZS5pY29uU29ydEFzYyBdLmpvaW4oICcgJyApIDogJyc7XG5cdFx0XHRcdGlmIChoYXNPbGRUaGVtZSkge1xuXHRcdFx0XHRcdHdvLnplYnJhWzBdID0gJC50cmltKCAnICcgKyB3by56ZWJyYVswXS5yZXBsYWNlKCcgJyArIG9sZHRoZW1lLmV2ZW4sICcnKSApO1xuXHRcdFx0XHRcdHdvLnplYnJhWzFdID0gJC50cmltKCAnICcgKyB3by56ZWJyYVsxXS5yZXBsYWNlKCcgJyArIG9sZHRoZW1lLm9kZCwgJycpICk7XG5cdFx0XHRcdFx0Yy4kdGJvZGllcy5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCBbIG9sZHRoZW1lLmV2ZW4sIG9sZHRoZW1lLm9kZCBdLmpvaW4oJyAnKSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHVwZGF0ZSB6ZWJyYSBzdHJpcGVzXG5cdFx0XHRcdGlmICh0aGVtZXMuZXZlbikgeyB3by56ZWJyYVswXSArPSAnICcgKyB0aGVtZXMuZXZlbjsgfVxuXHRcdFx0XHRpZiAodGhlbWVzLm9kZCkgeyB3by56ZWJyYVsxXSArPSAnICcgKyB0aGVtZXMub2RkOyB9XG5cdFx0XHRcdC8vIGFkZCBjYXB0aW9uIHN0eWxlXG5cdFx0XHRcdCR0YWJsZS5jaGlsZHJlbignY2FwdGlvbicpXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKG9sZHRoZW1lLmNhcHRpb24gfHwgJycpXG5cdFx0XHRcdFx0LmFkZENsYXNzKHRoZW1lcy5jYXB0aW9uKTtcblx0XHRcdFx0Ly8gYWRkIHRhYmxlL2Zvb3RlciBjbGFzcyBuYW1lc1xuXHRcdFx0XHQkdGZvb3QgPSAkdGFibGVcblx0XHRcdFx0XHQvLyByZW1vdmUgb3RoZXIgc2VsZWN0ZWQgdGhlbWVzXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCAoYy5hcHBsaWVkVGhlbWUgPyAndGFibGVzb3J0ZXItJyArIChjLmFwcGxpZWRUaGVtZSB8fCAnJykgOiAnJykgKyAnICcgKyAob2xkdGhlbWUudGFibGUgfHwgJycpIClcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ3RhYmxlc29ydGVyLScgKyB0aGVtZSArICcgJyArICh0aGVtZXMudGFibGUgfHwgJycpKSAvLyBhZGQgdGhlbWUgd2lkZ2V0IGNsYXNzIG5hbWVcblx0XHRcdFx0XHQuY2hpbGRyZW4oJ3Rmb290Jyk7XG5cdFx0XHRcdGMuYXBwbGllZFRoZW1lID0gYy50aGVtZTtcblxuXHRcdFx0XHRpZiAoJHRmb290Lmxlbmd0aCkge1xuXHRcdFx0XHRcdCR0Zm9vdFxuXHRcdFx0XHRcdFx0Ly8gaWYgb2xkdGhlbWUuZm9vdGVyUm93IG9yIG9sZHRoZW1lLmZvb3RlckNlbGxzIGFyZSB1bmRlZmluZWQsIGFsbCBjbGFzcyBuYW1lcyBhcmUgcmVtb3ZlZFxuXHRcdFx0XHRcdFx0LmNoaWxkcmVuKCd0cicpLnJlbW92ZUNsYXNzKG9sZHRoZW1lLmZvb3RlclJvdyB8fCAnJykuYWRkQ2xhc3ModGhlbWVzLmZvb3RlclJvdylcblx0XHRcdFx0XHRcdC5jaGlsZHJlbigndGgsIHRkJykucmVtb3ZlQ2xhc3Mob2xkdGhlbWUuZm9vdGVyQ2VsbHMgfHwgJycpLmFkZENsYXNzKHRoZW1lcy5mb290ZXJDZWxscyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gdXBkYXRlIGhlYWRlciBjbGFzc2VzXG5cdFx0XHRcdCRoZWFkZXJzXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCAoaGFzT2xkVGhlbWUgPyBbIG9sZHRoZW1lLmhlYWRlciwgb2xkdGhlbWUuaG92ZXIsIG9sZHJlbW92ZSBdLmpvaW4oJyAnKSA6ICcnKSB8fCAnJyApXG5cdFx0XHRcdFx0LmFkZENsYXNzKHRoZW1lcy5oZWFkZXIpXG5cdFx0XHRcdFx0Lm5vdCgnLnNvcnRlci1mYWxzZScpXG5cdFx0XHRcdFx0LnVuYmluZCgnbW91c2VlbnRlci50c3VpdGhlbWUgbW91c2VsZWF2ZS50c3VpdGhlbWUnKVxuXHRcdFx0XHRcdC5iaW5kKCdtb3VzZWVudGVyLnRzdWl0aGVtZSBtb3VzZWxlYXZlLnRzdWl0aGVtZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHQvLyB0b2dnbGVDbGFzcyB3aXRoIHN3aXRjaCBhZGRlZCBpbiBqUXVlcnkgMS4zXG5cdFx0XHRcdFx0XHQkKHRoaXMpWyBldmVudC50eXBlID09PSAnbW91c2VlbnRlcicgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJyBdKHRoZW1lcy5ob3ZlciB8fCAnJyk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0JGhlYWRlcnMuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdFx0aWYgKCEkdGhpcy5maW5kKCcuJyArIHRzLmNzcy53cmFwcGVyKS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdC8vIEZpcmVmb3ggbmVlZHMgdGhpcyBpbm5lciBkaXYgdG8gcG9zaXRpb24gdGhlIGljb24gJiByZXNpemVyIGNvcnJlY3RseVxuXHRcdFx0XHRcdFx0JHRoaXMud3JhcElubmVyKCc8ZGl2IGNsYXNzPVwiJyArIHRzLmNzcy53cmFwcGVyICsgJ1wiIHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJVwiPjwvZGl2PicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChjLmNzc0ljb24pIHtcblx0XHRcdFx0XHQvLyBpZiBjLmNzc0ljb24gaXMgJycsIHRoZW4gbm8gPGk+IGlzIGFkZGVkIHRvIHRoZSBoZWFkZXJcblx0XHRcdFx0XHQkaGVhZGVyc1xuXHRcdFx0XHRcdFx0LmZpbmQoJy4nICsgdHMuY3NzLmljb24pXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoaGFzT2xkVGhlbWUgPyBbIG9sZHRoZW1lLmljb25zLCBvbGRJY29uUm12IF0uam9pbignICcpIDogJycpXG5cdFx0XHRcdFx0XHQuYWRkQ2xhc3ModGhlbWVzLmljb25zIHx8ICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBmaWx0ZXIgd2lkZ2V0IGluaXRpYWxpemVzIGFmdGVyIHVpdGhlbWVcblx0XHRcdFx0aWYgKHRzLmhhc1dpZGdldCggYy50YWJsZSwgJ2ZpbHRlcicgKSkge1xuXHRcdFx0XHRcdHRtcCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0JHRhYmxlLmNoaWxkcmVuKCd0aGVhZCcpLmNoaWxkcmVuKCcuJyArIHRzLmNzcy5maWx0ZXJSb3cpXG5cdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcyhoYXNPbGRUaGVtZSA/IG9sZHRoZW1lLmZpbHRlclJvdyB8fCAnJyA6ICcnKVxuXHRcdFx0XHRcdFx0XHQuYWRkQ2xhc3ModGhlbWVzLmZpbHRlclJvdyB8fCAnJyk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRpZiAod28uZmlsdGVyX2luaXRpYWxpemVkKSB7XG5cdFx0XHRcdFx0XHR0bXAoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0JHRhYmxlLm9uZSgnZmlsdGVySW5pdCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR0bXAoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGMuY29sdW1uczsgaSsrKSB7XG5cdFx0XHRcdCRoZWFkZXIgPSBjLiRoZWFkZXJzXG5cdFx0XHRcdFx0LmFkZCgkKGMubmFtZXNwYWNlICsgJ19leHRyYV9oZWFkZXJzJykpXG5cdFx0XHRcdFx0Lm5vdCgnLnNvcnRlci1mYWxzZScpXG5cdFx0XHRcdFx0LmZpbHRlcignW2RhdGEtY29sdW1uPVwiJyArIGkgKyAnXCJdJyk7XG5cdFx0XHRcdCRpY29uID0gKHRzLmNzcy5pY29uKSA/ICRoZWFkZXIuZmluZCgnLicgKyB0cy5jc3MuaWNvbikgOiAkKCk7XG5cdFx0XHRcdCRoID0gJGhlYWRlcnMubm90KCcuc29ydGVyLWZhbHNlJykuZmlsdGVyKCdbZGF0YS1jb2x1bW49XCInICsgaSArICdcIl06bGFzdCcpO1xuXHRcdFx0XHRpZiAoJGgubGVuZ3RoKSB7XG5cdFx0XHRcdFx0JGhlYWRlci5yZW1vdmVDbGFzcyhyZW1vdmUpO1xuXHRcdFx0XHRcdCRpY29uLnJlbW92ZUNsYXNzKGljb25SbXYpO1xuXHRcdFx0XHRcdGlmICgkaFswXS5zb3J0RGlzYWJsZWQpIHtcblx0XHRcdFx0XHRcdC8vIG5vIHNvcnQgYXJyb3dzIGZvciBkaXNhYmxlZCBjb2x1bW5zIVxuXHRcdFx0XHRcdFx0JGljb24ucmVtb3ZlQ2xhc3ModGhlbWVzLmljb25zIHx8ICcnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aGRyID0gdGhlbWVzLnNvcnROb25lO1xuXHRcdFx0XHRcdFx0aWNvbiA9IHRoZW1lcy5pY29uU29ydE5vbmU7XG5cdFx0XHRcdFx0XHRpZiAoJGguaGFzQ2xhc3ModHMuY3NzLnNvcnRBc2MpKSB7XG5cdFx0XHRcdFx0XHRcdGhkciA9IFsgdGhlbWVzLnNvcnRBc2MsIHRoZW1lcy5hY3RpdmUgXS5qb2luKCcgJyk7XG5cdFx0XHRcdFx0XHRcdGljb24gPSB0aGVtZXMuaWNvblNvcnRBc2M7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCRoLmhhc0NsYXNzKHRzLmNzcy5zb3J0RGVzYykpIHtcblx0XHRcdFx0XHRcdFx0aGRyID0gWyB0aGVtZXMuc29ydERlc2MsIHRoZW1lcy5hY3RpdmUgXS5qb2luKCcgJyk7XG5cdFx0XHRcdFx0XHRcdGljb24gPSB0aGVtZXMuaWNvblNvcnREZXNjO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0JGhlYWRlci5hZGRDbGFzcyhoZHIpO1xuXHRcdFx0XHRcdFx0JGljb24uYWRkQ2xhc3MoaWNvbiB8fCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoYy5kZWJ1Zykge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnQXBwbHlpbmcgJyArIHRoZW1lICsgJyB0aGVtZScgKyB0cy5iZW5jaG1hcmsodGltZSkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVtb3ZlOiBmdW5jdGlvbih0YWJsZSwgYywgd28sIHJlZnJlc2hpbmcpIHtcblx0XHRcdGlmICghd28udWl0aGVtZV9hcHBsaWVkKSB7IHJldHVybjsgfVxuXHRcdFx0dmFyICR0YWJsZSA9IGMuJHRhYmxlLFxuXHRcdFx0XHR0aGVtZSA9IGMuYXBwbGllZFRoZW1lIHx8ICdqdWknLFxuXHRcdFx0XHR0aGVtZXMgPSB0cy50aGVtZXNbIHRoZW1lIF0gfHwgdHMudGhlbWVzLmp1aSxcblx0XHRcdFx0JGhlYWRlcnMgPSAkdGFibGUuY2hpbGRyZW4oJ3RoZWFkJykuY2hpbGRyZW4oKSxcblx0XHRcdFx0cmVtb3ZlID0gdGhlbWVzLnNvcnROb25lICsgJyAnICsgdGhlbWVzLnNvcnREZXNjICsgJyAnICsgdGhlbWVzLnNvcnRBc2MsXG5cdFx0XHRcdGljb25SbXYgPSB0aGVtZXMuaWNvblNvcnROb25lICsgJyAnICsgdGhlbWVzLmljb25Tb3J0RGVzYyArICcgJyArIHRoZW1lcy5pY29uU29ydEFzYztcblx0XHRcdCR0YWJsZS5yZW1vdmVDbGFzcygndGFibGVzb3J0ZXItJyArIHRoZW1lICsgJyAnICsgdGhlbWVzLnRhYmxlKTtcblx0XHRcdHdvLnVpdGhlbWVfYXBwbGllZCA9IGZhbHNlO1xuXHRcdFx0aWYgKHJlZnJlc2hpbmcpIHsgcmV0dXJuOyB9XG5cdFx0XHQkdGFibGUuZmluZCh0cy5jc3MuaGVhZGVyKS5yZW1vdmVDbGFzcyh0aGVtZXMuaGVhZGVyKTtcblx0XHRcdCRoZWFkZXJzXG5cdFx0XHRcdC51bmJpbmQoJ21vdXNlZW50ZXIudHN1aXRoZW1lIG1vdXNlbGVhdmUudHN1aXRoZW1lJykgLy8gcmVtb3ZlIGhvdmVyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyh0aGVtZXMuaG92ZXIgKyAnICcgKyByZW1vdmUgKyAnICcgKyB0aGVtZXMuYWN0aXZlKVxuXHRcdFx0XHQuZmlsdGVyKCcuJyArIHRzLmNzcy5maWx0ZXJSb3cpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyh0aGVtZXMuZmlsdGVyUm93KTtcblx0XHRcdCRoZWFkZXJzLmZpbmQoJy4nICsgdHMuY3NzLmljb24pLnJlbW92ZUNsYXNzKHRoZW1lcy5pY29ucyArICcgJyArIGljb25SbXYpO1xuXHRcdH1cblx0fSk7XG5cbn0pKGpRdWVyeSk7XG5cbi8qISBXaWRnZXQ6IGNvbHVtbnMgLSB1cGRhdGVkIDUvMjQvMjAxNyAodjIuMjguMTEpICovXG47KGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0dmFyIHRzID0gJC50YWJsZXNvcnRlciB8fCB7fTtcblxuXHR0cy5hZGRXaWRnZXQoe1xuXHRcdGlkOiAnY29sdW1ucycsXG5cdFx0cHJpb3JpdHk6IDY1LFxuXHRcdG9wdGlvbnMgOiB7XG5cdFx0XHRjb2x1bW5zIDogWyAncHJpbWFyeScsICdzZWNvbmRhcnknLCAndGVydGlhcnknIF1cblx0XHR9LFxuXHRcdGZvcm1hdDogZnVuY3Rpb24odGFibGUsIGMsIHdvKSB7XG5cdFx0XHR2YXIgJHRib2R5LCB0Ym9keUluZGV4LCAkcm93cywgcm93cywgJHJvdywgJGNlbGxzLCByZW1vdmUsIGluZHgsXG5cdFx0XHQkdGFibGUgPSBjLiR0YWJsZSxcblx0XHRcdCR0Ym9kaWVzID0gYy4kdGJvZGllcyxcblx0XHRcdHNvcnRMaXN0ID0gYy5zb3J0TGlzdCxcblx0XHRcdGxlbiA9IHNvcnRMaXN0Lmxlbmd0aCxcblx0XHRcdC8vIHJlbW92ZWQgYy53aWRnZXRDb2x1bW5zIHN1cHBvcnRcblx0XHRcdGNzcyA9IHdvICYmIHdvLmNvbHVtbnMgfHwgWyAncHJpbWFyeScsICdzZWNvbmRhcnknLCAndGVydGlhcnknIF0sXG5cdFx0XHRsYXN0ID0gY3NzLmxlbmd0aCAtIDE7XG5cdFx0XHRyZW1vdmUgPSBjc3Muam9pbignICcpO1xuXHRcdFx0Ly8gY2hlY2sgaWYgdGhlcmUgaXMgYSBzb3J0IChvbiBpbml0aWFsaXphdGlvbiB0aGVyZSBtYXkgbm90IGJlIG9uZSlcblx0XHRcdGZvciAodGJvZHlJbmRleCA9IDA7IHRib2R5SW5kZXggPCAkdGJvZGllcy5sZW5ndGg7IHRib2R5SW5kZXgrKyApIHtcblx0XHRcdFx0JHRib2R5ID0gdHMucHJvY2Vzc1Rib2R5KHRhYmxlLCAkdGJvZGllcy5lcSh0Ym9keUluZGV4KSwgdHJ1ZSk7IC8vIGRldGFjaCB0Ym9keVxuXHRcdFx0XHQkcm93cyA9ICR0Ym9keS5jaGlsZHJlbigndHInKTtcblx0XHRcdFx0Ly8gbG9vcCB0aHJvdWdoIHRoZSB2aXNpYmxlIHJvd3Ncblx0XHRcdFx0JHJvd3MuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkcm93ID0gJCh0aGlzKTtcblx0XHRcdFx0XHRpZiAodGhpcy5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcblx0XHRcdFx0XHRcdC8vIHJlbW92ZSBhbGwgY29sdW1ucyBjbGFzcyBuYW1lc1xuXHRcdFx0XHRcdFx0JGNlbGxzID0gJHJvdy5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKHJlbW92ZSk7XG5cdFx0XHRcdFx0XHQvLyBhZGQgYXBwcm9wcmlhdGUgY29sdW1uIGNsYXNzIG5hbWVzXG5cdFx0XHRcdFx0XHRpZiAoc29ydExpc3QgJiYgc29ydExpc3RbMF0pIHtcblx0XHRcdFx0XHRcdFx0Ly8gcHJpbWFyeSBzb3J0IGNvbHVtbiBjbGFzc1xuXHRcdFx0XHRcdFx0XHQkY2VsbHMuZXEoc29ydExpc3RbMF1bMF0pLmFkZENsYXNzKGNzc1swXSk7XG5cdFx0XHRcdFx0XHRcdGlmIChsZW4gPiAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpbmR4ID0gMTsgaW5keCA8IGxlbjsgaW5keCsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBzZWNvbmRhcnksIHRlcnRpYXJ5LCBldGMgc29ydCBjb2x1bW4gY2xhc3Nlc1xuXHRcdFx0XHRcdFx0XHRcdFx0JGNlbGxzLmVxKHNvcnRMaXN0W2luZHhdWzBdKS5hZGRDbGFzcyggY3NzW2luZHhdIHx8IGNzc1tsYXN0XSApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHRzLnByb2Nlc3NUYm9keSh0YWJsZSwgJHRib2R5LCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBhZGQgY2xhc3NlcyB0byB0aGVhZCBhbmQgdGZvb3Rcblx0XHRcdHJvd3MgPSB3by5jb2x1bW5zX3RoZWFkICE9PSBmYWxzZSA/IFsgJ3RoZWFkIHRyJyBdIDogW107XG5cdFx0XHRpZiAod28uY29sdW1uc190Zm9vdCAhPT0gZmFsc2UpIHtcblx0XHRcdFx0cm93cy5wdXNoKCd0Zm9vdCB0cicpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHJvd3MubGVuZ3RoKSB7XG5cdFx0XHRcdCRyb3dzID0gJHRhYmxlLmZpbmQoIHJvd3Muam9pbignLCcpICkuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhyZW1vdmUpO1xuXHRcdFx0XHRpZiAobGVuKSB7XG5cdFx0XHRcdFx0Zm9yIChpbmR4ID0gMDsgaW5keCA8IGxlbjsgaW5keCsrKSB7XG5cdFx0XHRcdFx0XHQvLyBhZGQgcHJpbWFyeS4gc2Vjb25kYXJ5LCB0ZXJ0aWFyeSwgZXRjIHNvcnQgY29sdW1uIGNsYXNzZXNcblx0XHRcdFx0XHRcdCRyb3dzLmZpbHRlcignW2RhdGEtY29sdW1uPVwiJyArIHNvcnRMaXN0W2luZHhdWzBdICsgJ1wiXScpLmFkZENsYXNzKGNzc1tpbmR4XSB8fCBjc3NbbGFzdF0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVtb3ZlOiBmdW5jdGlvbih0YWJsZSwgYywgd28pIHtcblx0XHRcdHZhciB0Ym9keUluZGV4LCAkdGJvZHksXG5cdFx0XHRcdCR0Ym9kaWVzID0gYy4kdGJvZGllcyxcblx0XHRcdFx0cmVtb3ZlID0gKHdvLmNvbHVtbnMgfHwgWyAncHJpbWFyeScsICdzZWNvbmRhcnknLCAndGVydGlhcnknIF0pLmpvaW4oJyAnKTtcblx0XHRcdGMuJGhlYWRlcnMucmVtb3ZlQ2xhc3MocmVtb3ZlKTtcblx0XHRcdGMuJHRhYmxlLmNoaWxkcmVuKCd0Zm9vdCcpLmNoaWxkcmVuKCd0cicpLmNoaWxkcmVuKCd0aCwgdGQnKS5yZW1vdmVDbGFzcyhyZW1vdmUpO1xuXHRcdFx0Zm9yICh0Ym9keUluZGV4ID0gMDsgdGJvZHlJbmRleCA8ICR0Ym9kaWVzLmxlbmd0aDsgdGJvZHlJbmRleCsrICkge1xuXHRcdFx0XHQkdGJvZHkgPSB0cy5wcm9jZXNzVGJvZHkodGFibGUsICR0Ym9kaWVzLmVxKHRib2R5SW5kZXgpLCB0cnVlKTsgLy8gcmVtb3ZlIHRib2R5XG5cdFx0XHRcdCR0Ym9keS5jaGlsZHJlbigndHInKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCQodGhpcykuY2hpbGRyZW4oKS5yZW1vdmVDbGFzcyhyZW1vdmUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dHMucHJvY2Vzc1Rib2R5KHRhYmxlLCAkdGJvZHksIGZhbHNlKTsgLy8gcmVzdG9yZSB0Ym9keVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cbn0pKGpRdWVyeSk7XG5cbi8qISBXaWRnZXQ6IGZpbHRlciAtIHVwZGF0ZWQgMTIvMTMvMjAxNyAodjIuMjkuMSkgKi8vKlxuICogUmVxdWlyZXMgdGFibGVzb3J0ZXIgdjIuOCsgYW5kIGpRdWVyeSAxLjcrXG4gKiBieSBSb2IgR2Fycmlzb25cbiAqL1xuOyggZnVuY3Rpb24gKCAkICkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciB0c2YsIHRzZlJlZ2V4LFxuXHRcdHRzID0gJC50YWJsZXNvcnRlciB8fCB7fSxcblx0XHR0c2NzcyA9IHRzLmNzcyxcblx0XHR0c2tleUNvZGVzID0gdHMua2V5Q29kZXM7XG5cblx0JC5leHRlbmQoIHRzY3NzLCB7XG5cdFx0ZmlsdGVyUm93ICAgICAgOiAndGFibGVzb3J0ZXItZmlsdGVyLXJvdycsXG5cdFx0ZmlsdGVyICAgICAgICAgOiAndGFibGVzb3J0ZXItZmlsdGVyJyxcblx0XHRmaWx0ZXJEaXNhYmxlZCA6ICdkaXNhYmxlZCcsXG5cdFx0ZmlsdGVyUm93SGlkZSAgOiAnaGlkZW1lJ1xuXHR9KTtcblxuXHQkLmV4dGVuZCggdHNrZXlDb2Rlcywge1xuXHRcdGJhY2tTcGFjZSA6IDgsXG5cdFx0ZXNjYXBlIDogMjcsXG5cdFx0c3BhY2UgOiAzMixcblx0XHRsZWZ0IDogMzcsXG5cdFx0ZG93biA6IDQwXG5cdH0pO1xuXG5cdHRzLmFkZFdpZGdldCh7XG5cdFx0aWQ6ICdmaWx0ZXInLFxuXHRcdHByaW9yaXR5OiA1MCxcblx0XHRvcHRpb25zIDoge1xuXHRcdFx0ZmlsdGVyX2NlbGxGaWx0ZXIgICAgOiAnJywgICAgLy8gY3NzIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGZpbHRlciBjZWxsICggc3RyaW5nIG9yIGFycmF5IClcblx0XHRcdGZpbHRlcl9jaGlsZFJvd3MgICAgIDogZmFsc2UsIC8vIGlmIHRydWUsIGZpbHRlciBpbmNsdWRlcyBjaGlsZCByb3cgY29udGVudCBpbiB0aGUgc2VhcmNoXG5cdFx0XHRmaWx0ZXJfY2hpbGRCeUNvbHVtbiA6IGZhbHNlLCAvLyAoIGZpbHRlcl9jaGlsZFJvd3MgbXVzdCBiZSB0cnVlICkgaWYgdHJ1ZSA9IHNlYXJjaCBjaGlsZCByb3dzIGJ5IGNvbHVtbjsgZmFsc2UgPSBzZWFyY2ggYWxsIGNoaWxkIHJvdyB0ZXh0IGdyb3VwZWRcblx0XHRcdGZpbHRlcl9jaGlsZFdpdGhTaWJzIDogdHJ1ZSwgIC8vIGlmIHRydWUsIGluY2x1ZGUgbWF0Y2hpbmcgY2hpbGQgcm93IHNpYmxpbmdzXG5cdFx0XHRmaWx0ZXJfY29sdW1uQW55TWF0Y2g6IHRydWUsICAvLyBpZiB0cnVlLCBhbGxvd3MgdXNpbmcgJyM6e3F1ZXJ5fScgaW4gQW55TWF0Y2ggc2VhcmNoZXMgKCBjb2x1bW46cXVlcnkgKVxuXHRcdFx0ZmlsdGVyX2NvbHVtbkZpbHRlcnMgOiB0cnVlLCAgLy8gaWYgdHJ1ZSwgYSBmaWx0ZXIgd2lsbCBiZSBhZGRlZCB0byB0aGUgdG9wIG9mIGVhY2ggdGFibGUgY29sdW1uXG5cdFx0XHRmaWx0ZXJfY3NzRmlsdGVyICAgICA6ICcnLCAgICAvLyBjc3MgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgZmlsdGVyIHJvdyAmIGVhY2ggaW5wdXQgaW4gdGhlIHJvdyAoIHRhYmxlc29ydGVyLWZpbHRlciBpcyBBTFdBWVMgYWRkZWQgKVxuXHRcdFx0ZmlsdGVyX2RlZmF1bHRBdHRyaWIgOiAnZGF0YS12YWx1ZScsIC8vIGRhdGEgYXR0cmlidXRlIGluIHRoZSBoZWFkZXIgY2VsbCB0aGF0IGNvbnRhaW5zIHRoZSBkZWZhdWx0IGZpbHRlciB2YWx1ZVxuXHRcdFx0ZmlsdGVyX2RlZmF1bHRGaWx0ZXIgOiB7fSwgICAgLy8gYWRkIGEgZGVmYXVsdCBjb2x1bW4gZmlsdGVyIHR5cGUgJ357cXVlcnl9JyB0byBtYWtlIGZ1enp5IHNlYXJjaGVzIGRlZmF1bHQ7ICd7cTF9IEFORCB7cTJ9JyB0byBtYWtlIGFsbCBzZWFyY2hlcyB1c2UgYSBsb2dpY2FsIEFORC5cblx0XHRcdGZpbHRlcl9leGNsdWRlRmlsdGVyIDoge30sICAgIC8vIGZpbHRlcnMgdG8gZXhjbHVkZSwgcGVyIGNvbHVtblxuXHRcdFx0ZmlsdGVyX2V4dGVybmFsICAgICAgOiAnJywgICAgLy8galF1ZXJ5IHNlbGVjdG9yIHN0cmluZyAoIG9yIGpRdWVyeSBvYmplY3QgKSBvZiBleHRlcm5hbCBmaWx0ZXJzXG5cdFx0XHRmaWx0ZXJfZmlsdGVyZWRSb3cgICA6ICdmaWx0ZXJlZCcsIC8vIGNsYXNzIGFkZGVkIHRvIGZpbHRlcmVkIHJvd3M7IGRlZmluZSBpbiBjc3Mgd2l0aCBcImRpc3BsYXk6bm9uZVwiIHRvIGhpZGUgdGhlIGZpbHRlcmVkLW91dCByb3dzXG5cdFx0XHRmaWx0ZXJfZm9ybWF0dGVyICAgICA6IG51bGwsICAvLyBhZGQgY3VzdG9tIGZpbHRlciBlbGVtZW50cyB0byB0aGUgZmlsdGVyIHJvd1xuXHRcdFx0ZmlsdGVyX2Z1bmN0aW9ucyAgICAgOiBudWxsLCAgLy8gYWRkIGN1c3RvbSBmaWx0ZXIgZnVuY3Rpb25zIHVzaW5nIHRoaXMgb3B0aW9uXG5cdFx0XHRmaWx0ZXJfaGlkZUVtcHR5ICAgICA6IHRydWUsICAvLyBoaWRlIGZpbHRlciByb3cgd2hlbiB0YWJsZSBpcyBlbXB0eVxuXHRcdFx0ZmlsdGVyX2hpZGVGaWx0ZXJzICAgOiBmYWxzZSwgLy8gY29sbGFwc2UgZmlsdGVyIHJvdyB3aGVuIG1vdXNlIGxlYXZlcyB0aGUgYXJlYVxuXHRcdFx0ZmlsdGVyX2lnbm9yZUNhc2UgICAgOiB0cnVlLCAgLy8gaWYgdHJ1ZSwgbWFrZSBhbGwgc2VhcmNoZXMgY2FzZS1pbnNlbnNpdGl2ZVxuXHRcdFx0ZmlsdGVyX2xpdmVTZWFyY2ggICAgOiB0cnVlLCAgLy8gaWYgdHJ1ZSwgc2VhcmNoIGNvbHVtbiBjb250ZW50IHdoaWxlIHRoZSB1c2VyIHR5cGVzICggd2l0aCBhIGRlbGF5IClcblx0XHRcdGZpbHRlcl9tYXRjaFR5cGUgICAgIDogeyAnaW5wdXQnOiAnZXhhY3QnLCAnc2VsZWN0JzogJ2V4YWN0JyB9LCAvLyBnbG9iYWwgcXVlcnkgc2V0dGluZ3MgKCdleGFjdCcgb3IgJ21hdGNoJyk7IG92ZXJyaWRkZW4gYnkgXCJmaWx0ZXItbWF0Y2hcIiBvciBcImZpbHRlci1leGFjdFwiIGNsYXNzXG5cdFx0XHRmaWx0ZXJfb25seUF2YWlsICAgICA6ICdmaWx0ZXItb25seUF2YWlsJywgLy8gYSBoZWFkZXIgd2l0aCBhIHNlbGVjdCBkcm9wZG93biAmIHRoaXMgY2xhc3MgbmFtZSB3aWxsIG9ubHkgc2hvdyBhdmFpbGFibGUgKCB2aXNpYmxlICkgb3B0aW9ucyB3aXRoaW4gdGhlIGRyb3AgZG93blxuXHRcdFx0ZmlsdGVyX3BsYWNlaG9sZGVyICAgOiB7IHNlYXJjaCA6ICcnLCBzZWxlY3QgOiAnJyB9LCAvLyBkZWZhdWx0IHBsYWNlaG9sZGVyIHRleHQgKCBvdmVycmlkZGVuIGJ5IGFueSBoZWFkZXIgJ2RhdGEtcGxhY2Vob2xkZXInIHNldHRpbmcgKVxuXHRcdFx0ZmlsdGVyX3Jlc2V0ICAgICAgICAgOiBudWxsLCAgLy8galF1ZXJ5IHNlbGVjdG9yIHN0cmluZyBvZiBhbiBlbGVtZW50IHVzZWQgdG8gcmVzZXQgdGhlIGZpbHRlcnNcblx0XHRcdGZpbHRlcl9yZXNldE9uRXNjICAgIDogdHJ1ZSwgIC8vIFJlc2V0IGZpbHRlciBpbnB1dCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgZXNjYXBlIC0gbm9ybWFsaXplZCBhY3Jvc3MgYnJvd3NlcnNcblx0XHRcdGZpbHRlcl9zYXZlRmlsdGVycyAgIDogZmFsc2UsIC8vIFVzZSB0aGUgJC50YWJsZXNvcnRlci5zdG9yYWdlIHV0aWxpdHkgdG8gc2F2ZSB0aGUgbW9zdCByZWNlbnQgZmlsdGVyc1xuXHRcdFx0ZmlsdGVyX3NlYXJjaERlbGF5ICAgOiAzMDAsICAgLy8gdHlwaW5nIGRlbGF5IGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgc3RhcnRpbmcgYSBzZWFyY2hcblx0XHRcdGZpbHRlcl9zZWFyY2hGaWx0ZXJlZDogdHJ1ZSwgIC8vIGFsbG93IHNlYXJjaGluZyB0aHJvdWdoIGFscmVhZHkgZmlsdGVyZWQgcm93cyBpbiBzcGVjaWFsIGNpcmN1bXN0YW5jZXM7IHdpbGwgc3BlZWQgdXAgc2VhcmNoaW5nIGluIGxhcmdlIHRhYmxlcyBpZiB0cnVlXG5cdFx0XHRmaWx0ZXJfc2VsZWN0U291cmNlICA6IG51bGwsICAvLyBpbmNsdWRlIGEgZnVuY3Rpb24gdG8gcmV0dXJuIGFuIGFycmF5IG9mIHZhbHVlcyB0byBiZSBhZGRlZCB0byB0aGUgY29sdW1uIGZpbHRlciBzZWxlY3Rcblx0XHRcdGZpbHRlcl9zZWxlY3RTb3VyY2VTZXBhcmF0b3IgOiAnfCcsIC8vIGZpbHRlcl9zZWxlY3RTb3VyY2UgYXJyYXkgdGV4dCBsZWZ0IG9mIHRoZSBzZXBhcmF0b3IgaXMgYWRkZWQgdG8gdGhlIG9wdGlvbiB2YWx1ZSwgcmlnaHQgaW50byB0aGUgb3B0aW9uIHRleHRcblx0XHRcdGZpbHRlcl9zZXJ2ZXJzaWRlRmlsdGVyaW5nIDogZmFsc2UsIC8vIGlmIHRydWUsIG11c3QgcGVyZm9ybSBzZXJ2ZXItc2lkZSBmaWx0ZXJpbmcgYi9jIGNsaWVudC1zaWRlIGZpbHRlcmluZyBpcyBkaXNhYmxlZCwgYnV0IHRoZSB1aSBhbmQgZXZlbnRzIHdpbGwgc3RpbGwgYmUgdXNlZC5cblx0XHRcdGZpbHRlcl9zdGFydHNXaXRoICAgIDogZmFsc2UsIC8vIGlmIHRydWUsIGZpbHRlciBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGNlbGwgY29udGVudHNcblx0XHRcdGZpbHRlcl91c2VQYXJzZWREYXRhIDogZmFsc2UgIC8vIGZpbHRlciBhbGwgZGF0YSB1c2luZyBwYXJzZWQgY29udGVudFxuXHRcdH0sXG5cdFx0Zm9ybWF0OiBmdW5jdGlvbiggdGFibGUsIGMsIHdvICkge1xuXHRcdFx0aWYgKCAhYy4kdGFibGUuaGFzQ2xhc3MoICdoYXNGaWx0ZXJzJyApICkge1xuXHRcdFx0XHR0c2YuaW5pdCggdGFibGUsIGMsIHdvICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRyZW1vdmU6IGZ1bmN0aW9uKCB0YWJsZSwgYywgd28sIHJlZnJlc2hpbmcgKSB7XG5cdFx0XHR2YXIgdGJvZHlJbmRleCwgJHRib2R5LFxuXHRcdFx0XHQkdGFibGUgPSBjLiR0YWJsZSxcblx0XHRcdFx0JHRib2RpZXMgPSBjLiR0Ym9kaWVzLFxuXHRcdFx0XHRldmVudHMgPSAoXG5cdFx0XHRcdFx0J2FkZFJvd3MgdXBkYXRlQ2VsbCB1cGRhdGUgdXBkYXRlUm93cyB1cGRhdGVDb21wbGV0ZSBhcHBlbmRDYWNoZSBmaWx0ZXJSZXNldCAnICtcblx0XHRcdFx0XHQnZmlsdGVyQW5kU29ydFJlc2V0IGZpbHRlckZvbWF0dGVyVXBkYXRlIGZpbHRlckVuZCBzZWFyY2ggc3RpY2t5SGVhZGVyc0luaXQgJ1xuXHRcdFx0XHQpLnNwbGl0KCAnICcgKS5qb2luKCBjLm5hbWVzcGFjZSArICdmaWx0ZXIgJyApO1xuXHRcdFx0JHRhYmxlXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyggJ2hhc0ZpbHRlcnMnIClcblx0XHRcdFx0Ly8gYWRkIGZpbHRlciBuYW1lc3BhY2UgdG8gYWxsIEJVVCBzZWFyY2hcblx0XHRcdFx0LnVuYmluZCggZXZlbnRzLnJlcGxhY2UoIHRzLnJlZ2V4LnNwYWNlcywgJyAnICkgKVxuXHRcdFx0XHQvLyByZW1vdmUgdGhlIGZpbHRlciByb3cgZXZlbiBpZiByZWZyZXNoaW5nLCBiZWNhdXNlIHRoZSBjb2x1bW4gbWlnaHQgaGF2ZSBiZWVuIG1vdmVkXG5cdFx0XHRcdC5maW5kKCAnLicgKyB0c2Nzcy5maWx0ZXJSb3cgKS5yZW1vdmUoKTtcblx0XHRcdHdvLmZpbHRlcl9pbml0aWFsaXplZCA9IGZhbHNlO1xuXHRcdFx0aWYgKCByZWZyZXNoaW5nICkgeyByZXR1cm47IH1cblx0XHRcdGZvciAoIHRib2R5SW5kZXggPSAwOyB0Ym9keUluZGV4IDwgJHRib2RpZXMubGVuZ3RoOyB0Ym9keUluZGV4KysgKSB7XG5cdFx0XHRcdCR0Ym9keSA9IHRzLnByb2Nlc3NUYm9keSggdGFibGUsICR0Ym9kaWVzLmVxKCB0Ym9keUluZGV4ICksIHRydWUgKTsgLy8gcmVtb3ZlIHRib2R5XG5cdFx0XHRcdCR0Ym9keS5jaGlsZHJlbigpLnJlbW92ZUNsYXNzKCB3by5maWx0ZXJfZmlsdGVyZWRSb3cgKS5zaG93KCk7XG5cdFx0XHRcdHRzLnByb2Nlc3NUYm9keSggdGFibGUsICR0Ym9keSwgZmFsc2UgKTsgLy8gcmVzdG9yZSB0Ym9keVxuXHRcdFx0fVxuXHRcdFx0aWYgKCB3by5maWx0ZXJfcmVzZXQgKSB7XG5cdFx0XHRcdCQoIGRvY3VtZW50ICkudW5kZWxlZ2F0ZSggd28uZmlsdGVyX3Jlc2V0LCAnY2xpY2snICsgYy5uYW1lc3BhY2UgKyAnZmlsdGVyJyApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0dHNmID0gdHMuZmlsdGVyID0ge1xuXG5cdFx0Ly8gcmVnZXggdXNlZCBpbiBmaWx0ZXIgJ2NoZWNrJyBmdW5jdGlvbnMgLSBub3QgZm9yIGdlbmVyYWwgdXNlIGFuZCBub3QgZG9jdW1lbnRlZFxuXHRcdHJlZ2V4OiB7XG5cdFx0XHRyZWdleCAgICAgOiAvXlxcLygoPzpcXFxcXFwvfFteXFwvXSkrKVxcLyhbbWlneXVdezAsNX0pPyQvLCAvLyByZWdleCB0byB0ZXN0IGZvciByZWdleFxuXHRcdFx0Y2hpbGQgICAgIDogL3RhYmxlc29ydGVyLWNoaWxkUm93LywgLy8gY2hpbGQgcm93IGNsYXNzIG5hbWU7IHRoaXMgZ2V0cyB1cGRhdGVkIGluIHRoZSBzY3JpcHRcblx0XHRcdGZpbHRlcmVkICA6IC9maWx0ZXJlZC8sIC8vIGZpbHRlcmVkIChoaWRkZW4pIHJvdyBjbGFzcyBuYW1lOyB1cGRhdGVkIGluIHRoZSBzY3JpcHRcblx0XHRcdHR5cGUgICAgICA6IC91bmRlZmluZWR8bnVtYmVyLywgLy8gY2hlY2sgdHlwZVxuXHRcdFx0ZXhhY3QgICAgIDogLyheW1xcXCJcXCc9XSspfChbXFxcIlxcJz1dKyQpL2csIC8vIGV4YWN0IG1hdGNoIChhbGxvdyAnPT0nKVxuXHRcdFx0b3BlcmF0b3JzIDogL1s8Pj1dL2csIC8vIHJlcGxhY2Ugb3BlcmF0b3JzXG5cdFx0XHRxdWVyeSAgICAgOiAnKHF8cXVlcnkpJywgLy8gcmVwbGFjZSBmaWx0ZXIgcXVlcmllc1xuXHRcdFx0d2lsZDAxICAgIDogL1xcPy9nLCAvLyB3aWxkIGNhcmQgbWF0Y2ggMCBvciAxXG5cdFx0XHR3aWxkME1vcmUgOiAvXFwqL2csIC8vIHdpbGQgY2FyZSBtYXRjaCAwIG9yIG1vcmVcblx0XHRcdHF1b3RlICAgICA6IC9cXFwiL2csXG5cdFx0XHRpc05lZzEgICAgOiAvKD49P1xccyotXFxkKS8sXG5cdFx0XHRpc05lZzIgICAgOiAvKDw9P1xccypcXGQpL1xuXHRcdH0sXG5cdFx0Ly8gZnVuY3Rpb24oIGMsIGRhdGEgKSB7IH1cblx0XHQvLyBjID0gdGFibGUuY29uZmlnXG5cdFx0Ly8gZGF0YS4kcm93ID0galF1ZXJ5IG9iamVjdCBvZiB0aGUgcm93IGN1cnJlbnRseSBiZWluZyBwcm9jZXNzZWRcblx0XHQvLyBkYXRhLiRjZWxscyA9IGpRdWVyeSBvYmplY3Qgb2YgYWxsIGNlbGxzIHdpdGhpbiB0aGUgY3VycmVudCByb3dcblx0XHQvLyBkYXRhLmZpbHRlcnMgPSBhcnJheSBvZiBmaWx0ZXJzIGZvciBhbGwgY29sdW1ucyAoIHNvbWUgbWF5IGJlIHVuZGVmaW5lZCApXG5cdFx0Ly8gZGF0YS5maWx0ZXIgPSBmaWx0ZXIgZm9yIHRoZSBjdXJyZW50IGNvbHVtblxuXHRcdC8vIGRhdGEuaUZpbHRlciA9IHNhbWUgYXMgZGF0YS5maWx0ZXIsIGV4Y2VwdCBsb3dlcmNhc2UgKCBpZiB3by5maWx0ZXJfaWdub3JlQ2FzZSBpcyB0cnVlIClcblx0XHQvLyBkYXRhLmV4YWN0ID0gdGFibGUgY2VsbCB0ZXh0ICggb3IgcGFyc2VkIGRhdGEgaWYgY29sdW1uIHBhcnNlciBlbmFibGVkOyBtYXkgYmUgYSBudW1iZXIgJiBub3QgYSBzdHJpbmcgKVxuXHRcdC8vIGRhdGEuaUV4YWN0ID0gc2FtZSBhcyBkYXRhLmV4YWN0LCBleGNlcHQgbG93ZXJjYXNlICggaWYgd28uZmlsdGVyX2lnbm9yZUNhc2UgaXMgdHJ1ZTsgbWF5IGJlIGEgbnVtYmVyICYgbm90IGEgc3RyaW5nIClcblx0XHQvLyBkYXRhLmNhY2hlID0gdGFibGUgY2VsbCB0ZXh0IGZyb20gY2FjaGUsIHNvIGl0IGhhcyBiZWVuIHBhcnNlZCAoICYgaW4gYWxsIGxvd2VyIGNhc2UgaWYgYy5pZ25vcmVDYXNlIGlzIHRydWUgKVxuXHRcdC8vIGRhdGEuY2FjaGVBcnJheSA9IEFuIGFycmF5IG9mIHBhcnNlZCBjb250ZW50IGZyb20gZWFjaCB0YWJsZSBjZWxsIGluIHRoZSByb3cgYmVpbmcgcHJvY2Vzc2VkXG5cdFx0Ly8gZGF0YS5pbmRleCA9IGNvbHVtbiBpbmRleDsgdGFibGUgPSB0YWJsZSBlbGVtZW50ICggRE9NIClcblx0XHQvLyBkYXRhLnBhcnNlZCA9IGFycmF5ICggYnkgY29sdW1uICkgb2YgYm9vbGVhbiB2YWx1ZXMgKCBmcm9tIGZpbHRlcl91c2VQYXJzZWREYXRhIG9yICdmaWx0ZXItcGFyc2VkJyBjbGFzcyApXG5cdFx0dHlwZXM6IHtcblx0XHRcdG9yIDogZnVuY3Rpb24oIGMsIGRhdGEsIHZhcnMgKSB7XG5cdFx0XHRcdC8vIGxvb2sgZm9yIFwifFwiLCBidXQgbm90IGlmIGl0IGlzIGluc2lkZSBvZiBhIHJlZ3VsYXIgZXhwcmVzc2lvblxuXHRcdFx0XHRpZiAoICggdHNmUmVnZXgub3JUZXN0LnRlc3QoIGRhdGEuaUZpbHRlciApIHx8IHRzZlJlZ2V4Lm9yU3BsaXQudGVzdCggZGF0YS5maWx0ZXIgKSApICYmXG5cdFx0XHRcdFx0Ly8gdGhpcyB0ZXN0IGZvciByZWdleCBoYXMgcG90ZW50aWFsIHRvIHNsb3cgZG93biB0aGUgb3ZlcmFsbCBzZWFyY2hcblx0XHRcdFx0XHQhdHNmUmVnZXgucmVnZXgudGVzdCggZGF0YS5maWx0ZXIgKSApIHtcblx0XHRcdFx0XHR2YXIgaW5keCwgZmlsdGVyTWF0Y2hlZCwgcXVlcnksIHJlZ2V4LFxuXHRcdFx0XHRcdFx0Ly8gZHVwbGljYXRlIGRhdGEgYnV0IHNwbGl0IGZpbHRlclxuXHRcdFx0XHRcdFx0ZGF0YTIgPSAkLmV4dGVuZCgge30sIGRhdGEgKSxcblx0XHRcdFx0XHRcdGZpbHRlciA9IGRhdGEuZmlsdGVyLnNwbGl0KCB0c2ZSZWdleC5vclNwbGl0ICksXG5cdFx0XHRcdFx0XHRpRmlsdGVyID0gZGF0YS5pRmlsdGVyLnNwbGl0KCB0c2ZSZWdleC5vclNwbGl0ICksXG5cdFx0XHRcdFx0XHRsZW4gPSBmaWx0ZXIubGVuZ3RoO1xuXHRcdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0XHRkYXRhMi5uZXN0ZWRGaWx0ZXJzID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGRhdGEyLmZpbHRlciA9ICcnICsgKCB0c2YucGFyc2VGaWx0ZXIoIGMsIGZpbHRlclsgaW5keCBdLCBkYXRhICkgfHwgJycgKTtcblx0XHRcdFx0XHRcdGRhdGEyLmlGaWx0ZXIgPSAnJyArICggdHNmLnBhcnNlRmlsdGVyKCBjLCBpRmlsdGVyWyBpbmR4IF0sIGRhdGEgKSB8fCAnJyApO1xuXHRcdFx0XHRcdFx0cXVlcnkgPSAnKCcgKyAoIHRzZi5wYXJzZUZpbHRlciggYywgZGF0YTIuZmlsdGVyLCBkYXRhICkgfHwgJycgKSArICcpJztcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdC8vIHVzZSB0cnkvY2F0Y2gsIGJlY2F1c2UgcXVlcnkgbWF5IG5vdCBiZSBhIHZhbGlkIHJlZ2V4IGlmIFwifFwiIGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBwYXJ0aWFsIHJlZ2V4IHNlYXJjaCxcblx0XHRcdFx0XHRcdFx0Ly8gZS5nIFwiLyhBbGV4fEFhclwiIC0+IFVuY2F1Z2h0IFN5bnRheEVycm9yOiBJbnZhbGlkIHJlZ3VsYXIgZXhwcmVzc2lvbjogLygvKEFsZXgpLzogVW50ZXJtaW5hdGVkIGdyb3VwXG5cdFx0XHRcdFx0XHRcdHJlZ2V4ID0gbmV3IFJlZ0V4cCggZGF0YS5pc01hdGNoID8gcXVlcnkgOiAnXicgKyBxdWVyeSArICckJywgYy53aWRnZXRPcHRpb25zLmZpbHRlcl9pZ25vcmVDYXNlID8gJ2knIDogJycgKTtcblx0XHRcdFx0XHRcdFx0Ly8gZmlsdGVyTWF0Y2hlZCA9IGRhdGEyLmZpbHRlciA9PT0gJycgJiYgaW5keCA+IDAgPyB0cnVlXG5cdFx0XHRcdFx0XHRcdC8vIGxvb2sgZm9yIGFuIGV4YWN0IG1hdGNoIHdpdGggdGhlICdvcicgdW5sZXNzIHRoZSAnZmlsdGVyLW1hdGNoJyBjbGFzcyBpcyBmb3VuZFxuXHRcdFx0XHRcdFx0XHRmaWx0ZXJNYXRjaGVkID0gcmVnZXgudGVzdCggZGF0YTIuZXhhY3QgKSB8fCB0c2YucHJvY2Vzc1R5cGVzKCBjLCBkYXRhMiwgdmFycyApO1xuXHRcdFx0XHRcdFx0XHRpZiAoIGZpbHRlck1hdGNoZWQgKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZpbHRlck1hdGNoZWQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2ggKCBlcnJvciApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIG1heSBiZSBudWxsIGZyb20gcHJvY2Vzc2luZyB0eXBlc1xuXHRcdFx0XHRcdHJldHVybiBmaWx0ZXJNYXRjaGVkIHx8IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fSxcblx0XHRcdC8vIExvb2sgZm9yIGFuIEFORCBvciAmJiBvcGVyYXRvciAoIGxvZ2ljYWwgYW5kIClcblx0XHRcdGFuZCA6IGZ1bmN0aW9uKCBjLCBkYXRhLCB2YXJzICkge1xuXHRcdFx0XHRpZiAoIHRzZlJlZ2V4LmFuZFRlc3QudGVzdCggZGF0YS5maWx0ZXIgKSApIHtcblx0XHRcdFx0XHR2YXIgaW5keCwgZmlsdGVyTWF0Y2hlZCwgcmVzdWx0LCBxdWVyeSwgcmVnZXgsXG5cdFx0XHRcdFx0XHQvLyBkdXBsaWNhdGUgZGF0YSBidXQgc3BsaXQgZmlsdGVyXG5cdFx0XHRcdFx0XHRkYXRhMiA9ICQuZXh0ZW5kKCB7fSwgZGF0YSApLFxuXHRcdFx0XHRcdFx0ZmlsdGVyID0gZGF0YS5maWx0ZXIuc3BsaXQoIHRzZlJlZ2V4LmFuZFNwbGl0ICksXG5cdFx0XHRcdFx0XHRpRmlsdGVyID0gZGF0YS5pRmlsdGVyLnNwbGl0KCB0c2ZSZWdleC5hbmRTcGxpdCApLFxuXHRcdFx0XHRcdFx0bGVuID0gZmlsdGVyLmxlbmd0aDtcblx0XHRcdFx0XHRmb3IgKCBpbmR4ID0gMDsgaW5keCA8IGxlbjsgaW5keCsrICkge1xuXHRcdFx0XHRcdFx0ZGF0YTIubmVzdGVkRmlsdGVycyA9IHRydWU7XG5cdFx0XHRcdFx0XHRkYXRhMi5maWx0ZXIgPSAnJyArICggdHNmLnBhcnNlRmlsdGVyKCBjLCBmaWx0ZXJbIGluZHggXSwgZGF0YSApIHx8ICcnICk7XG5cdFx0XHRcdFx0XHRkYXRhMi5pRmlsdGVyID0gJycgKyAoIHRzZi5wYXJzZUZpbHRlciggYywgaUZpbHRlclsgaW5keCBdLCBkYXRhICkgfHwgJycgKTtcblx0XHRcdFx0XHRcdHF1ZXJ5ID0gKCAnKCcgKyAoIHRzZi5wYXJzZUZpbHRlciggYywgZGF0YTIuZmlsdGVyLCBkYXRhICkgfHwgJycgKSArICcpJyApXG5cdFx0XHRcdFx0XHRcdC8vIHJlcGxhY2Ugd2lsZCBjYXJkcyBzaW5jZSAvKGEqKS9pIHdpbGwgbWF0Y2ggYW55dGhpbmdcblx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoIHRzZlJlZ2V4LndpbGQwMSwgJ1xcXFxTezF9JyApLnJlcGxhY2UoIHRzZlJlZ2V4LndpbGQwTW9yZSwgJ1xcXFxTKicgKTtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdC8vIHVzZSB0cnkvY2F0Y2gganVzdCBpbiBjYXNlIFJlZ0V4cCBpcyBpbnZhbGlkXG5cdFx0XHRcdFx0XHRcdHJlZ2V4ID0gbmV3IFJlZ0V4cCggZGF0YS5pc01hdGNoID8gcXVlcnkgOiAnXicgKyBxdWVyeSArICckJywgYy53aWRnZXRPcHRpb25zLmZpbHRlcl9pZ25vcmVDYXNlID8gJ2knIDogJycgKTtcblx0XHRcdFx0XHRcdFx0Ly8gbG9vayBmb3IgYW4gZXhhY3QgbWF0Y2ggd2l0aCB0aGUgJ2FuZCcgdW5sZXNzIHRoZSAnZmlsdGVyLW1hdGNoJyBjbGFzcyBpcyBmb3VuZFxuXHRcdFx0XHRcdFx0XHRyZXN1bHQgPSAoIHJlZ2V4LnRlc3QoIGRhdGEyLmV4YWN0ICkgfHwgdHNmLnByb2Nlc3NUeXBlcyggYywgZGF0YTIsIHZhcnMgKSApO1xuXHRcdFx0XHRcdFx0XHRpZiAoIGluZHggPT09IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZmlsdGVyTWF0Y2hlZCA9IHJlc3VsdDtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRmaWx0ZXJNYXRjaGVkID0gZmlsdGVyTWF0Y2hlZCAmJiByZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2ggKCBlcnJvciApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIG1heSBiZSBudWxsIGZyb20gcHJvY2Vzc2luZyB0eXBlc1xuXHRcdFx0XHRcdHJldHVybiBmaWx0ZXJNYXRjaGVkIHx8IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fSxcblx0XHRcdC8vIExvb2sgZm9yIHJlZ2V4XG5cdFx0XHRyZWdleDogZnVuY3Rpb24oIGMsIGRhdGEgKSB7XG5cdFx0XHRcdGlmICggdHNmUmVnZXgucmVnZXgudGVzdCggZGF0YS5maWx0ZXIgKSApIHtcblx0XHRcdFx0XHR2YXIgbWF0Y2hlcyxcblx0XHRcdFx0XHRcdC8vIGNhY2hlIHJlZ2V4IHBlciBjb2x1bW4gZm9yIG9wdGltYWwgc3BlZWRcblx0XHRcdFx0XHRcdHJlZ2V4ID0gZGF0YS5maWx0ZXJfcmVnZXhDYWNoZVsgZGF0YS5pbmRleCBdIHx8IHRzZlJlZ2V4LnJlZ2V4LmV4ZWMoIGRhdGEuZmlsdGVyICksXG5cdFx0XHRcdFx0XHRpc1JlZ2V4ID0gcmVnZXggaW5zdGFuY2VvZiBSZWdFeHA7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGlmICggIWlzUmVnZXggKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGZvcmNlIGNhc2UgaW5zZW5zaXRpdmUgc2VhcmNoIGlmIGlnbm9yZUNhc2Ugb3B0aW9uIHNldD9cblx0XHRcdFx0XHRcdFx0Ly8gaWYgKCBjLmlnbm9yZUNhc2UgJiYgIXJlZ2V4WzJdICkgeyByZWdleFsyXSA9ICdpJzsgfVxuXHRcdFx0XHRcdFx0XHRkYXRhLmZpbHRlcl9yZWdleENhY2hlWyBkYXRhLmluZGV4IF0gPSByZWdleCA9IG5ldyBSZWdFeHAoIHJlZ2V4WzFdLCByZWdleFsyXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWF0Y2hlcyA9IHJlZ2V4LnRlc3QoIGRhdGEuZXhhY3QgKTtcblx0XHRcdFx0XHR9IGNhdGNoICggZXJyb3IgKSB7XG5cdFx0XHRcdFx0XHRtYXRjaGVzID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBtYXRjaGVzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fSxcblx0XHRcdC8vIExvb2sgZm9yIG9wZXJhdG9ycyA+LCA+PSwgPCBvciA8PVxuXHRcdFx0b3BlcmF0b3JzOiBmdW5jdGlvbiggYywgZGF0YSApIHtcblx0XHRcdFx0Ly8gaWdub3JlIGVtcHR5IHN0cmluZ3MuLi4gYmVjYXVzZSAnJyA8IDEwIGlzIHRydWVcblx0XHRcdFx0aWYgKCB0c2ZSZWdleC5vcGVyVGVzdC50ZXN0KCBkYXRhLmlGaWx0ZXIgKSAmJiBkYXRhLmlFeGFjdCAhPT0gJycgKSB7XG5cdFx0XHRcdFx0dmFyIGNhY2hlZFZhbHVlLCByZXN1bHQsIHR4dCxcblx0XHRcdFx0XHRcdHRhYmxlID0gYy50YWJsZSxcblx0XHRcdFx0XHRcdHBhcnNlZCA9IGRhdGEucGFyc2VkWyBkYXRhLmluZGV4IF0sXG5cdFx0XHRcdFx0XHRxdWVyeSA9IHRzLmZvcm1hdEZsb2F0KCBkYXRhLmlGaWx0ZXIucmVwbGFjZSggdHNmUmVnZXgub3BlcmF0b3JzLCAnJyApLCB0YWJsZSApLFxuXHRcdFx0XHRcdFx0cGFyc2VyID0gYy5wYXJzZXJzWyBkYXRhLmluZGV4IF0gfHwge30sXG5cdFx0XHRcdFx0XHRzYXZlZFNlYXJjaCA9IHF1ZXJ5O1xuXHRcdFx0XHRcdC8vIHBhcnNlIGZpbHRlciB2YWx1ZSBpbiBjYXNlIHdlJ3JlIGNvbXBhcmluZyBudW1iZXJzICggZGF0ZXMgKVxuXHRcdFx0XHRcdGlmICggcGFyc2VkIHx8IHBhcnNlci50eXBlID09PSAnbnVtZXJpYycgKSB7XG5cdFx0XHRcdFx0XHR0eHQgPSAkLnRyaW0oICcnICsgZGF0YS5pRmlsdGVyLnJlcGxhY2UoIHRzZlJlZ2V4Lm9wZXJhdG9ycywgJycgKSApO1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHNmLnBhcnNlRmlsdGVyKCBjLCB0eHQsIGRhdGEsIHRydWUgKTtcblx0XHRcdFx0XHRcdHF1ZXJ5ID0gKCB0eXBlb2YgcmVzdWx0ID09PSAnbnVtYmVyJyAmJiByZXN1bHQgIT09ICcnICYmICFpc05hTiggcmVzdWx0ICkgKSA/IHJlc3VsdCA6IHF1ZXJ5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBpRXhhY3QgbWF5IGJlIG51bWVyaWMgLSBzZWUgaXNzdWUgIzE0OTtcblx0XHRcdFx0XHQvLyBjaGVjayBpZiBjYWNoZWQgaXMgZGVmaW5lZCwgYmVjYXVzZSBzb21ldGltZXMgaiBnb2VzIG91dCBvZiByYW5nZT8gKCBudW1lcmljIGNvbHVtbnMgKVxuXHRcdFx0XHRcdGlmICggKCBwYXJzZWQgfHwgcGFyc2VyLnR5cGUgPT09ICdudW1lcmljJyApICYmICFpc05hTiggcXVlcnkgKSAmJlxuXHRcdFx0XHRcdFx0dHlwZW9mIGRhdGEuY2FjaGUgIT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0XHRcdFx0Y2FjaGVkVmFsdWUgPSBkYXRhLmNhY2hlO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0eHQgPSBpc05hTiggZGF0YS5pRXhhY3QgKSA/IGRhdGEuaUV4YWN0LnJlcGxhY2UoIHRzLnJlZ2V4Lm5vbmRpZ2l0LCAnJyApIDogZGF0YS5pRXhhY3Q7XG5cdFx0XHRcdFx0XHRjYWNoZWRWYWx1ZSA9IHRzLmZvcm1hdEZsb2F0KCB0eHQsIHRhYmxlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggdHNmUmVnZXguZ3RUZXN0LnRlc3QoIGRhdGEuaUZpbHRlciApICkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHNmUmVnZXguZ3RlVGVzdC50ZXN0KCBkYXRhLmlGaWx0ZXIgKSA/IGNhY2hlZFZhbHVlID49IHF1ZXJ5IDogY2FjaGVkVmFsdWUgPiBxdWVyeTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0c2ZSZWdleC5sdFRlc3QudGVzdCggZGF0YS5pRmlsdGVyICkgKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0c2ZSZWdleC5sdGVUZXN0LnRlc3QoIGRhdGEuaUZpbHRlciApID8gY2FjaGVkVmFsdWUgPD0gcXVlcnkgOiBjYWNoZWRWYWx1ZSA8IHF1ZXJ5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBrZWVwIHNob3dpbmcgYWxsIHJvd3MgaWYgbm90aGluZyBmb2xsb3dzIHRoZSBvcGVyYXRvclxuXHRcdFx0XHRcdGlmICggIXJlc3VsdCAmJiBzYXZlZFNlYXJjaCA9PT0gJycgKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fSxcblx0XHRcdC8vIExvb2sgZm9yIGEgbm90IG1hdGNoXG5cdFx0XHRub3RNYXRjaDogZnVuY3Rpb24oIGMsIGRhdGEgKSB7XG5cdFx0XHRcdGlmICggdHNmUmVnZXgubm90VGVzdC50ZXN0KCBkYXRhLmlGaWx0ZXIgKSApIHtcblx0XHRcdFx0XHR2YXIgaW5keCxcblx0XHRcdFx0XHRcdHR4dCA9IGRhdGEuaUZpbHRlci5yZXBsYWNlKCAnIScsICcnICksXG5cdFx0XHRcdFx0XHRmaWx0ZXIgPSB0c2YucGFyc2VGaWx0ZXIoIGMsIHR4dCwgZGF0YSApIHx8ICcnO1xuXHRcdFx0XHRcdGlmICggdHNmUmVnZXguZXhhY3QudGVzdCggZmlsdGVyICkgKSB7XG5cdFx0XHRcdFx0XHQvLyBsb29rIGZvciBleGFjdCBub3QgbWF0Y2hlcyAtIHNlZSAjNjI4XG5cdFx0XHRcdFx0XHRmaWx0ZXIgPSBmaWx0ZXIucmVwbGFjZSggdHNmUmVnZXguZXhhY3QsICcnICk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmlsdGVyID09PSAnJyA/IHRydWUgOiAkLnRyaW0oIGZpbHRlciApICE9PSBkYXRhLmlFeGFjdDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aW5keCA9IGRhdGEuaUV4YWN0LnNlYXJjaCggJC50cmltKCBmaWx0ZXIgKSApO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZpbHRlciA9PT0gJycgPyB0cnVlIDpcblx0XHRcdFx0XHRcdFx0Ly8gcmV0dXJuIHRydWUgaWYgbm90IGZvdW5kXG5cdFx0XHRcdFx0XHRcdGRhdGEuYW55TWF0Y2ggPyBpbmR4IDwgMCA6XG5cdFx0XHRcdFx0XHRcdC8vIHJldHVybiBmYWxzZSBpZiBmb3VuZFxuXHRcdFx0XHRcdFx0XHQhKCBjLndpZGdldE9wdGlvbnMuZmlsdGVyX3N0YXJ0c1dpdGggPyBpbmR4ID09PSAwIDogaW5keCA+PSAwICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fSxcblx0XHRcdC8vIExvb2sgZm9yIHF1b3RlcyBvciBlcXVhbHMgdG8gZ2V0IGFuIGV4YWN0IG1hdGNoOyBpZ25vcmUgdHlwZSBzaW5jZSBpRXhhY3QgY291bGQgYmUgbnVtZXJpY1xuXHRcdFx0ZXhhY3Q6IGZ1bmN0aW9uKCBjLCBkYXRhICkge1xuXHRcdFx0XHQvKmpzaGludCBlcWVxZXE6ZmFsc2UgKi9cblx0XHRcdFx0aWYgKCB0c2ZSZWdleC5leGFjdC50ZXN0KCBkYXRhLmlGaWx0ZXIgKSApIHtcblx0XHRcdFx0XHR2YXIgdHh0ID0gZGF0YS5pRmlsdGVyLnJlcGxhY2UoIHRzZlJlZ2V4LmV4YWN0LCAnJyApLFxuXHRcdFx0XHRcdFx0ZmlsdGVyID0gdHNmLnBhcnNlRmlsdGVyKCBjLCB0eHQsIGRhdGEgKSB8fCAnJztcblx0XHRcdFx0XHRyZXR1cm4gZGF0YS5hbnlNYXRjaCA/ICQuaW5BcnJheSggZmlsdGVyLCBkYXRhLnJvd0FycmF5ICkgPj0gMCA6IGZpbHRlciA9PSBkYXRhLmlFeGFjdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH0sXG5cdFx0XHQvLyBMb29rIGZvciBhIHJhbmdlICggdXNpbmcgJyB0byAnIG9yICcgLSAnICkgLSBzZWUgaXNzdWUgIzE2NjsgdGhhbmtzIG1hdHpodSFcblx0XHRcdHJhbmdlIDogZnVuY3Rpb24oIGMsIGRhdGEgKSB7XG5cdFx0XHRcdGlmICggdHNmUmVnZXgudG9UZXN0LnRlc3QoIGRhdGEuaUZpbHRlciApICkge1xuXHRcdFx0XHRcdHZhciByZXN1bHQsIHRtcCwgcmFuZ2UxLCByYW5nZTIsXG5cdFx0XHRcdFx0XHR0YWJsZSA9IGMudGFibGUsXG5cdFx0XHRcdFx0XHRpbmRleCA9IGRhdGEuaW5kZXgsXG5cdFx0XHRcdFx0XHRwYXJzZWQgPSBkYXRhLnBhcnNlZFtpbmRleF0sXG5cdFx0XHRcdFx0XHQvLyBtYWtlIHN1cmUgdGhlIGRhc2ggaXMgZm9yIGEgcmFuZ2UgYW5kIG5vdCBpbmRpY2F0aW5nIGEgbmVnYXRpdmUgbnVtYmVyXG5cdFx0XHRcdFx0XHRxdWVyeSA9IGRhdGEuaUZpbHRlci5zcGxpdCggdHNmUmVnZXgudG9TcGxpdCApO1xuXG5cdFx0XHRcdFx0dG1wID0gcXVlcnlbMF0ucmVwbGFjZSggdHMucmVnZXgubm9uZGlnaXQsICcnICkgfHwgJyc7XG5cdFx0XHRcdFx0cmFuZ2UxID0gdHMuZm9ybWF0RmxvYXQoIHRzZi5wYXJzZUZpbHRlciggYywgdG1wLCBkYXRhICksIHRhYmxlICk7XG5cdFx0XHRcdFx0dG1wID0gcXVlcnlbMV0ucmVwbGFjZSggdHMucmVnZXgubm9uZGlnaXQsICcnICkgfHwgJyc7XG5cdFx0XHRcdFx0cmFuZ2UyID0gdHMuZm9ybWF0RmxvYXQoIHRzZi5wYXJzZUZpbHRlciggYywgdG1wLCBkYXRhICksIHRhYmxlICk7XG5cdFx0XHRcdFx0Ly8gcGFyc2UgZmlsdGVyIHZhbHVlIGluIGNhc2Ugd2UncmUgY29tcGFyaW5nIG51bWJlcnMgKCBkYXRlcyApXG5cdFx0XHRcdFx0aWYgKCBwYXJzZWQgfHwgYy5wYXJzZXJzWyBpbmRleCBdLnR5cGUgPT09ICdudW1lcmljJyApIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGMucGFyc2Vyc1sgaW5kZXggXS5mb3JtYXQoICcnICsgcXVlcnlbMF0sIHRhYmxlLCBjLiRoZWFkZXJzLmVxKCBpbmRleCApLCBpbmRleCApO1xuXHRcdFx0XHRcdFx0cmFuZ2UxID0gKCByZXN1bHQgIT09ICcnICYmICFpc05hTiggcmVzdWx0ICkgKSA/IHJlc3VsdCA6IHJhbmdlMTtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGMucGFyc2Vyc1sgaW5kZXggXS5mb3JtYXQoICcnICsgcXVlcnlbMV0sIHRhYmxlLCBjLiRoZWFkZXJzLmVxKCBpbmRleCApLCBpbmRleCApO1xuXHRcdFx0XHRcdFx0cmFuZ2UyID0gKCByZXN1bHQgIT09ICcnICYmICFpc05hTiggcmVzdWx0ICkgKSA/IHJlc3VsdCA6IHJhbmdlMjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCAoIHBhcnNlZCB8fCBjLnBhcnNlcnNbIGluZGV4IF0udHlwZSA9PT0gJ251bWVyaWMnICkgJiYgIWlzTmFOKCByYW5nZTEgKSAmJiAhaXNOYU4oIHJhbmdlMiApICkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gZGF0YS5jYWNoZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dG1wID0gaXNOYU4oIGRhdGEuaUV4YWN0ICkgPyBkYXRhLmlFeGFjdC5yZXBsYWNlKCB0cy5yZWdleC5ub25kaWdpdCwgJycgKSA6IGRhdGEuaUV4YWN0O1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gdHMuZm9ybWF0RmxvYXQoIHRtcCwgdGFibGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCByYW5nZTEgPiByYW5nZTIgKSB7XG5cdFx0XHRcdFx0XHR0bXAgPSByYW5nZTE7IHJhbmdlMSA9IHJhbmdlMjsgcmFuZ2UyID0gdG1wOyAvLyBzd2FwXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiAoIHJlc3VsdCA+PSByYW5nZTEgJiYgcmVzdWx0IDw9IHJhbmdlMiApIHx8ICggcmFuZ2UxID09PSAnJyB8fCByYW5nZTIgPT09ICcnICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gTG9vayBmb3Igd2lsZCBjYXJkOiA/ID0gc2luZ2xlLCAqID0gbXVsdGlwbGUsIG9yIHwgPSBsb2dpY2FsIE9SXG5cdFx0XHR3aWxkIDogZnVuY3Rpb24oIGMsIGRhdGEgKSB7XG5cdFx0XHRcdGlmICggdHNmUmVnZXgud2lsZE9yVGVzdC50ZXN0KCBkYXRhLmlGaWx0ZXIgKSApIHtcblx0XHRcdFx0XHR2YXIgcXVlcnkgPSAnJyArICggdHNmLnBhcnNlRmlsdGVyKCBjLCBkYXRhLmlGaWx0ZXIsIGRhdGEgKSB8fCAnJyApO1xuXHRcdFx0XHRcdC8vIGxvb2sgZm9yIGFuIGV4YWN0IG1hdGNoIHdpdGggdGhlICdvcicgdW5sZXNzIHRoZSAnZmlsdGVyLW1hdGNoJyBjbGFzcyBpcyBmb3VuZFxuXHRcdFx0XHRcdGlmICggIXRzZlJlZ2V4LndpbGRUZXN0LnRlc3QoIHF1ZXJ5ICkgJiYgZGF0YS5uZXN0ZWRGaWx0ZXJzICkge1xuXHRcdFx0XHRcdFx0cXVlcnkgPSBkYXRhLmlzTWF0Y2ggPyBxdWVyeSA6ICdeKCcgKyBxdWVyeSArICcpJCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHBhcnNpbmcgdGhlIGZpbHRlciBtYXkgbm90IHdvcmsgcHJvcGVybHkgd2hlbiB1c2luZyB3aWxkY2FyZHMgPS9cblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBSZWdFeHAoXG5cdFx0XHRcdFx0XHRcdHF1ZXJ5LnJlcGxhY2UoIHRzZlJlZ2V4LndpbGQwMSwgJ1xcXFxTezF9JyApLnJlcGxhY2UoIHRzZlJlZ2V4LndpbGQwTW9yZSwgJ1xcXFxTKicgKSxcblx0XHRcdFx0XHRcdFx0Yy53aWRnZXRPcHRpb25zLmZpbHRlcl9pZ25vcmVDYXNlID8gJ2knIDogJydcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdC50ZXN0KCBkYXRhLmV4YWN0ICk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoIGVycm9yICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fSxcblx0XHRcdC8vIGZ1enp5IHRleHQgc2VhcmNoOyBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0eW9yay9mdXp6eSAoIE1JVCBsaWNlbnNlIClcblx0XHRcdGZ1enp5OiBmdW5jdGlvbiggYywgZGF0YSApIHtcblx0XHRcdFx0aWYgKCB0c2ZSZWdleC5mdXp6eVRlc3QudGVzdCggZGF0YS5pRmlsdGVyICkgKSB7XG5cdFx0XHRcdFx0dmFyIGluZHgsXG5cdFx0XHRcdFx0XHRwYXR0ZXJuSW5keCA9IDAsXG5cdFx0XHRcdFx0XHRsZW4gPSBkYXRhLmlFeGFjdC5sZW5ndGgsXG5cdFx0XHRcdFx0XHR0eHQgPSBkYXRhLmlGaWx0ZXIuc2xpY2UoIDEgKSxcblx0XHRcdFx0XHRcdHBhdHRlcm4gPSB0c2YucGFyc2VGaWx0ZXIoIGMsIHR4dCwgZGF0YSApIHx8ICcnO1xuXHRcdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGRhdGEuaUV4YWN0WyBpbmR4IF0gPT09IHBhdHRlcm5bIHBhdHRlcm5JbmR4IF0gKSB7XG5cdFx0XHRcdFx0XHRcdHBhdHRlcm5JbmR4ICs9IDE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBwYXR0ZXJuSW5keCA9PT0gcGF0dGVybi5sZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRpbml0OiBmdW5jdGlvbiggdGFibGUgKSB7XG5cdFx0XHQvLyBmaWx0ZXIgbGFuZ3VhZ2Ugb3B0aW9uc1xuXHRcdFx0dHMubGFuZ3VhZ2UgPSAkLmV4dGVuZCggdHJ1ZSwge30sIHtcblx0XHRcdFx0dG8gIDogJ3RvJyxcblx0XHRcdFx0b3IgIDogJ29yJyxcblx0XHRcdFx0YW5kIDogJ2FuZCdcblx0XHRcdH0sIHRzLmxhbmd1YWdlICk7XG5cblx0XHRcdHZhciBvcHRpb25zLCBzdHJpbmcsIHR4dCwgJGhlYWRlciwgY29sdW1uLCB2YWwsIGZ4biwgbm9TZWxlY3QsXG5cdFx0XHRcdGMgPSB0YWJsZS5jb25maWcsXG5cdFx0XHRcdHdvID0gYy53aWRnZXRPcHRpb25zO1xuXHRcdFx0Yy4kdGFibGUuYWRkQ2xhc3MoICdoYXNGaWx0ZXJzJyApO1xuXHRcdFx0Yy5sYXN0U2VhcmNoID0gW107XG5cblx0XHRcdC8vIGRlZmluZSB0aW1lcnMgc28gdXNpbmcgY2xlYXJUaW1lb3V0IHdvbid0IGNhdXNlIGFuIHVuZGVmaW5lZCBlcnJvclxuXHRcdFx0d28uZmlsdGVyX3NlYXJjaFRpbWVyID0gbnVsbDtcblx0XHRcdHdvLmZpbHRlcl9pbml0VGltZXIgPSBudWxsO1xuXHRcdFx0d28uZmlsdGVyX2Zvcm1hdHRlckNvdW50ID0gMDtcblx0XHRcdHdvLmZpbHRlcl9mb3JtYXR0ZXJJbml0ID0gW107XG5cdFx0XHR3by5maWx0ZXJfYW55Q29sdW1uU2VsZWN0b3IgPSAnW2RhdGEtY29sdW1uPVwiYWxsXCJdLFtkYXRhLWNvbHVtbj1cImFueVwiXSc7XG5cdFx0XHR3by5maWx0ZXJfbXVsdGlwbGVDb2x1bW5TZWxlY3RvciA9ICdbZGF0YS1jb2x1bW4qPVwiLVwiXSxbZGF0YS1jb2x1bW4qPVwiLFwiXSc7XG5cblx0XHRcdHZhbCA9ICdcXFxceycgKyB0c2ZSZWdleC5xdWVyeSArICdcXFxcfSc7XG5cdFx0XHQkLmV4dGVuZCggdHNmUmVnZXgsIHtcblx0XHRcdFx0Y2hpbGQgOiBuZXcgUmVnRXhwKCBjLmNzc0NoaWxkUm93ICksXG5cdFx0XHRcdGZpbHRlcmVkIDogbmV3IFJlZ0V4cCggd28uZmlsdGVyX2ZpbHRlcmVkUm93ICksXG5cdFx0XHRcdGFscmVhZHlGaWx0ZXJlZCA6IG5ldyBSZWdFeHAoICcoXFxcXHMrKCcgKyB0cy5sYW5ndWFnZS5vciArICd8LXwnICsgdHMubGFuZ3VhZ2UudG8gKyAnKVxcXFxzKyknLCAnaScgKSxcblx0XHRcdFx0dG9UZXN0IDogbmV3IFJlZ0V4cCggJ1xcXFxzKygtfCcgKyB0cy5sYW5ndWFnZS50byArICcpXFxcXHMrJywgJ2knICksXG5cdFx0XHRcdHRvU3BsaXQgOiBuZXcgUmVnRXhwKCAnKD86XFxcXHMrKD86LXwnICsgdHMubGFuZ3VhZ2UudG8gKyAnKVxcXFxzKyknLCAnZ2knICksXG5cdFx0XHRcdGFuZFRlc3QgOiBuZXcgUmVnRXhwKCAnXFxcXHMrKCcgKyB0cy5sYW5ndWFnZS5hbmQgKyAnfCYmKVxcXFxzKycsICdpJyApLFxuXHRcdFx0XHRhbmRTcGxpdCA6IG5ldyBSZWdFeHAoICcoPzpcXFxccysoPzonICsgdHMubGFuZ3VhZ2UuYW5kICsgJ3wmJilcXFxccyspJywgJ2dpJyApLFxuXHRcdFx0XHRvclRlc3QgOiBuZXcgUmVnRXhwKCAnKFxcXFx8fFxcXFxzKycgKyB0cy5sYW5ndWFnZS5vciArICdcXFxccyspJywgJ2knICksXG5cdFx0XHRcdG9yU3BsaXQgOiBuZXcgUmVnRXhwKCAnKD86XFxcXHMrKD86JyArIHRzLmxhbmd1YWdlLm9yICsgJylcXFxccyt8XFxcXHwpJywgJ2dpJyApLFxuXHRcdFx0XHRpUXVlcnkgOiBuZXcgUmVnRXhwKCB2YWwsICdpJyApLFxuXHRcdFx0XHRpZ1F1ZXJ5IDogbmV3IFJlZ0V4cCggdmFsLCAnaWcnICksXG5cdFx0XHRcdG9wZXJUZXN0IDogL15bPD5dPT8vLFxuXHRcdFx0XHRndFRlc3QgIDogLz4vLFxuXHRcdFx0XHRndGVUZXN0IDogLz49Lyxcblx0XHRcdFx0bHRUZXN0ICA6IC88Lyxcblx0XHRcdFx0bHRlVGVzdCA6IC88PS8sXG5cdFx0XHRcdG5vdFRlc3QgOiAvXlxcIS8sXG5cdFx0XHRcdHdpbGRPclRlc3QgOiAvW1xcP1xcKlxcfF0vLFxuXHRcdFx0XHR3aWxkVGVzdCA6IC9cXD9cXCovLFxuXHRcdFx0XHRmdXp6eVRlc3QgOiAvXn4vLFxuXHRcdFx0XHRleGFjdFRlc3QgOiAvWz1cXFwiXFx8IV0vXG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gZG9uJ3QgYnVpbGQgZmlsdGVyIHJvdyBpZiBjb2x1bW5GaWx0ZXJzIGlzIGZhbHNlIG9yIGFsbCBjb2x1bW5zIGFyZSBzZXQgdG8gJ2ZpbHRlci1mYWxzZSdcblx0XHRcdC8vIHNlZSBpc3N1ZSAjMTU2XG5cdFx0XHR2YWwgPSBjLiRoZWFkZXJzLmZpbHRlciggJy5maWx0ZXItZmFsc2UsIC5wYXJzZXItZmFsc2UnICkubGVuZ3RoO1xuXHRcdFx0aWYgKCB3by5maWx0ZXJfY29sdW1uRmlsdGVycyAhPT0gZmFsc2UgJiYgdmFsICE9PSBjLiRoZWFkZXJzLmxlbmd0aCApIHtcblx0XHRcdFx0Ly8gYnVpbGQgZmlsdGVyIHJvd1xuXHRcdFx0XHR0c2YuYnVpbGRSb3coIHRhYmxlLCBjLCB3byApO1xuXHRcdFx0fVxuXG5cdFx0XHR0eHQgPSAnYWRkUm93cyB1cGRhdGVDZWxsIHVwZGF0ZSB1cGRhdGVSb3dzIHVwZGF0ZUNvbXBsZXRlIGFwcGVuZENhY2hlIGZpbHRlclJlc2V0ICcgK1xuXHRcdFx0XHQnZmlsdGVyQW5kU29ydFJlc2V0IGZpbHRlclJlc2V0U2F2ZWQgZmlsdGVyRW5kIHNlYXJjaCAnLnNwbGl0KCAnICcgKS5qb2luKCBjLm5hbWVzcGFjZSArICdmaWx0ZXIgJyApO1xuXHRcdFx0Yy4kdGFibGUuYmluZCggdHh0LCBmdW5jdGlvbiggZXZlbnQsIGZpbHRlciApIHtcblx0XHRcdFx0dmFsID0gd28uZmlsdGVyX2hpZGVFbXB0eSAmJlxuXHRcdFx0XHRcdCQuaXNFbXB0eU9iamVjdCggYy5jYWNoZSApICYmXG5cdFx0XHRcdFx0ISggYy5kZWxheUluaXQgJiYgZXZlbnQudHlwZSA9PT0gJ2FwcGVuZENhY2hlJyApO1xuXHRcdFx0XHQvLyBoaWRlIGZpbHRlciByb3cgdXNpbmcgdGhlICdmaWx0ZXJlZCcgY2xhc3MgbmFtZVxuXHRcdFx0XHRjLiR0YWJsZS5maW5kKCAnLicgKyB0c2Nzcy5maWx0ZXJSb3cgKS50b2dnbGVDbGFzcyggd28uZmlsdGVyX2ZpbHRlcmVkUm93LCB2YWwgKTsgLy8gZml4ZXMgIzQ1MFxuXHRcdFx0XHRpZiAoICEvKHNlYXJjaHxmaWx0ZXIpLy50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0dHNmLmJ1aWxkRGVmYXVsdCggdGFibGUsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBBZGQgZmlsdGVyQW5kU29ydFJlc2V0IC0gc2VlICMxMzYxXG5cdFx0XHRcdGlmICggZXZlbnQudHlwZSA9PT0gJ2ZpbHRlclJlc2V0JyB8fCBldmVudC50eXBlID09PSAnZmlsdGVyQW5kU29ydFJlc2V0JyApIHtcblx0XHRcdFx0XHRjLiR0YWJsZS5maW5kKCAnLicgKyB0c2Nzcy5maWx0ZXIgKS5hZGQoIHdvLmZpbHRlcl8kZXh0ZXJuYWxGaWx0ZXJzICkudmFsKCAnJyApO1xuXHRcdFx0XHRcdGlmICggZXZlbnQudHlwZSA9PT0gJ2ZpbHRlckFuZFNvcnRSZXNldCcgKSB7XG5cdFx0XHRcdFx0XHR0cy5zb3J0UmVzZXQoIHRoaXMuY29uZmlnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0dHNmLnNlYXJjaGluZyggdGFibGUsIFtdICk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dHNmLnNlYXJjaGluZyggdGFibGUsIFtdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKCBldmVudC50eXBlID09PSAnZmlsdGVyUmVzZXRTYXZlZCcgKSB7XG5cdFx0XHRcdFx0dHMuc3RvcmFnZSggdGFibGUsICd0YWJsZXNvcnRlci1maWx0ZXJzJywgJycgKTtcblx0XHRcdFx0fSBlbHNlIGlmICggZXZlbnQudHlwZSA9PT0gJ2ZpbHRlckVuZCcgKSB7XG5cdFx0XHRcdFx0dHNmLmJ1aWxkRGVmYXVsdCggdGFibGUsIHRydWUgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBzZW5kIGZhbHNlIGFyZ3VtZW50IHRvIGZvcmNlIGEgbmV3IHNlYXJjaDsgb3RoZXJ3aXNlIGlmIHRoZSBmaWx0ZXIgaGFzbid0IGNoYW5nZWQsXG5cdFx0XHRcdFx0Ly8gaXQgd2lsbCByZXR1cm5cblx0XHRcdFx0XHRmaWx0ZXIgPSBldmVudC50eXBlID09PSAnc2VhcmNoJyA/IGZpbHRlciA6XG5cdFx0XHRcdFx0XHRldmVudC50eXBlID09PSAndXBkYXRlQ29tcGxldGUnID8gYy4kdGFibGUuZGF0YSggJ2xhc3RTZWFyY2gnICkgOiAnJztcblx0XHRcdFx0XHRpZiAoIC8odXBkYXRlfGFkZCkvLnRlc3QoIGV2ZW50LnR5cGUgKSAmJiBldmVudC50eXBlICE9PSAndXBkYXRlQ29tcGxldGUnICkge1xuXHRcdFx0XHRcdFx0Ly8gZm9yY2UgYSBuZXcgc2VhcmNoIHNpbmNlIGNvbnRlbnQgaGFzIGNoYW5nZWRcblx0XHRcdFx0XHRcdGMubGFzdENvbWJpbmVkRmlsdGVyID0gbnVsbDtcblx0XHRcdFx0XHRcdGMubGFzdFNlYXJjaCA9IFtdO1xuXHRcdFx0XHRcdFx0Ly8gdXBkYXRlIGZpbHRlckZvcm1hdHRlcnMgYWZ0ZXIgdXBkYXRlICgmIHNtYWxsIGRlbGF5KSAtIEZpeGVzICMxMjM3XG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnZmlsdGVyRm9tYXR0ZXJVcGRhdGUnICk7XG5cdFx0XHRcdFx0XHR9LCAxMDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBwYXNzIHRydWUgKCBza2lwRmlyc3QgKSB0byBwcmV2ZW50IHRoZSB0YWJsZXNvcnRlci5zZXRGaWx0ZXJzIGZ1bmN0aW9uIGZyb20gc2tpcHBpbmcgdGhlIGZpcnN0XG5cdFx0XHRcdFx0Ly8gaW5wdXQgZW5zdXJlcyBhbGwgaW5wdXRzIGFyZSB1cGRhdGVkIHdoZW4gYSBzZWFyY2ggaXMgdHJpZ2dlcmVkIG9uIHRoZSB0YWJsZVxuXHRcdFx0XHRcdC8vICQoICd0YWJsZScgKS50cmlnZ2VyKCAnc2VhcmNoJywgWy4uLl0gKTtcblx0XHRcdFx0XHR0c2Yuc2VhcmNoaW5nKCB0YWJsZSwgZmlsdGVyLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIHJlc2V0IGJ1dHRvbi9saW5rXG5cdFx0XHRpZiAoIHdvLmZpbHRlcl9yZXNldCApIHtcblx0XHRcdFx0aWYgKCB3by5maWx0ZXJfcmVzZXQgaW5zdGFuY2VvZiAkICkge1xuXHRcdFx0XHRcdC8vIHJlc2V0IGNvbnRhaW5zIGEgalF1ZXJ5IG9iamVjdCwgYmluZCB0byBpdFxuXHRcdFx0XHRcdHdvLmZpbHRlcl9yZXNldC5jbGljayggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRjLiR0YWJsZS50cmlnZ2VySGFuZGxlciggJ2ZpbHRlclJlc2V0JyApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCAkKCB3by5maWx0ZXJfcmVzZXQgKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0Ly8gcmVzZXQgaXMgYSBqUXVlcnkgc2VsZWN0b3IsIHVzZSBldmVudCBkZWxlZ2F0aW9uXG5cdFx0XHRcdFx0JCggZG9jdW1lbnQgKVxuXHRcdFx0XHRcdFx0LnVuZGVsZWdhdGUoIHdvLmZpbHRlcl9yZXNldCwgJ2NsaWNrJyArIGMubmFtZXNwYWNlICsgJ2ZpbHRlcicgKVxuXHRcdFx0XHRcdFx0LmRlbGVnYXRlKCB3by5maWx0ZXJfcmVzZXQsICdjbGljaycgKyBjLm5hbWVzcGFjZSArICdmaWx0ZXInLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0Ly8gdHJpZ2dlciBhIHJlc2V0IGV2ZW50LCBzbyBvdGhlciBmdW5jdGlvbnMgKCBmaWx0ZXJfZm9ybWF0dGVyICkga25vdyB3aGVuIHRvIHJlc2V0XG5cdFx0XHRcdFx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnZmlsdGVyUmVzZXQnICk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCB3by5maWx0ZXJfZnVuY3Rpb25zICkge1xuXHRcdFx0XHRmb3IgKCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBjLmNvbHVtbnM7IGNvbHVtbisrICkge1xuXHRcdFx0XHRcdGZ4biA9IHRzLmdldENvbHVtbkRhdGEoIHRhYmxlLCB3by5maWx0ZXJfZnVuY3Rpb25zLCBjb2x1bW4gKTtcblx0XHRcdFx0XHRpZiAoIGZ4biApIHtcblx0XHRcdFx0XHRcdC8vIHJlbW92ZSAnZmlsdGVyLXNlbGVjdCcgZnJvbSBoZWFkZXIgb3RoZXJ3aXNlIHRoZSBvcHRpb25zIGFkZGVkIGhlcmUgYXJlIHJlcGxhY2VkIHdpdGhcblx0XHRcdFx0XHRcdC8vIGFsbCBvcHRpb25zXG5cdFx0XHRcdFx0XHQkaGVhZGVyID0gYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uIF0ucmVtb3ZlQ2xhc3MoICdmaWx0ZXItc2VsZWN0JyApO1xuXHRcdFx0XHRcdFx0Ly8gZG9uJ3QgYnVpbGQgc2VsZWN0IGlmICdmaWx0ZXItZmFsc2UnIG9yICdwYXJzZXItZmFsc2UnIHNldFxuXHRcdFx0XHRcdFx0bm9TZWxlY3QgPSAhKCAkaGVhZGVyLmhhc0NsYXNzKCAnZmlsdGVyLWZhbHNlJyApIHx8ICRoZWFkZXIuaGFzQ2xhc3MoICdwYXJzZXItZmFsc2UnICkgKTtcblx0XHRcdFx0XHRcdG9wdGlvbnMgPSAnJztcblx0XHRcdFx0XHRcdGlmICggZnhuID09PSB0cnVlICYmIG5vU2VsZWN0ICkge1xuXHRcdFx0XHRcdFx0XHR0c2YuYnVpbGRTZWxlY3QoIHRhYmxlLCBjb2x1bW4gKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBmeG4gPT09ICdvYmplY3QnICYmIG5vU2VsZWN0ICkge1xuXHRcdFx0XHRcdFx0XHQvLyBhZGQgY3VzdG9tIGRyb3AgZG93biBsaXN0XG5cdFx0XHRcdFx0XHRcdGZvciAoIHN0cmluZyBpbiBmeG4gKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyApIHtcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMgKz0gb3B0aW9ucyA9PT0gJycgP1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQnPG9wdGlvbiB2YWx1ZT1cIlwiPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCggJGhlYWRlci5kYXRhKCAncGxhY2Vob2xkZXInICkgfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCRoZWFkZXIuYXR0ciggJ2RhdGEtcGxhY2Vob2xkZXInICkgfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHdvLmZpbHRlcl9wbGFjZWhvbGRlci5zZWxlY3QgfHxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCcnXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KSArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCc8L29wdGlvbj4nIDogJyc7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YWwgPSBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0XHR0eHQgPSBzdHJpbmc7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHN0cmluZy5pbmRleE9mKCB3by5maWx0ZXJfc2VsZWN0U291cmNlU2VwYXJhdG9yICkgPj0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsID0gc3RyaW5nLnNwbGl0KCB3by5maWx0ZXJfc2VsZWN0U291cmNlU2VwYXJhdG9yICk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHR4dCA9IHZhbFsxXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsID0gdmFsWzBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucyArPSAnPG9wdGlvbiAnICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0KCB0eHQgPT09IHZhbCA/ICcnIDogJ2RhdGEtZnVuY3Rpb24tbmFtZT1cIicgKyBzdHJpbmcgKyAnXCIgJyApICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0J3ZhbHVlPVwiJyArIHZhbCArICdcIj4nICsgdHh0ICsgJzwvb3B0aW9uPic7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGMuJHRhYmxlXG5cdFx0XHRcdFx0XHRcdFx0LmZpbmQoICd0aGVhZCcgKVxuXHRcdFx0XHRcdFx0XHRcdC5maW5kKCAnc2VsZWN0LicgKyB0c2Nzcy5maWx0ZXIgKyAnW2RhdGEtY29sdW1uPVwiJyArIGNvbHVtbiArICdcIl0nIClcblx0XHRcdFx0XHRcdFx0XHQuYXBwZW5kKCBvcHRpb25zICk7XG5cdFx0XHRcdFx0XHRcdHR4dCA9IHdvLmZpbHRlcl9zZWxlY3RTb3VyY2U7XG5cdFx0XHRcdFx0XHRcdGZ4biA9IHR5cGVvZiB0eHQgPT09ICdmdW5jdGlvbicgPyB0cnVlIDogdHMuZ2V0Q29sdW1uRGF0YSggdGFibGUsIHR4dCwgY29sdW1uICk7XG5cdFx0XHRcdFx0XHRcdGlmICggZnhuICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIHVwZGF0aW5nIHNvIHRoZSBleHRyYSBvcHRpb25zIGFyZSBhcHBlbmRlZFxuXHRcdFx0XHRcdFx0XHRcdHRzZi5idWlsZFNlbGVjdCggYy50YWJsZSwgY29sdW1uLCAnJywgdHJ1ZSwgJGhlYWRlci5oYXNDbGFzcyggd28uZmlsdGVyX29ubHlBdmFpbCApICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIG5vdCByZWFsbHkgdXBkYXRpbmcsIGJ1dCBpZiB0aGUgY29sdW1uIGhhcyBib3RoIHRoZSAnZmlsdGVyLXNlbGVjdCcgY2xhc3MgJlxuXHRcdFx0Ly8gZmlsdGVyX2Z1bmN0aW9ucyBzZXQgdG8gdHJ1ZSwgaXQgd291bGQgYXBwZW5kIHRoZSBzYW1lIG9wdGlvbnMgdHdpY2UuXG5cdFx0XHR0c2YuYnVpbGREZWZhdWx0KCB0YWJsZSwgdHJ1ZSApO1xuXG5cdFx0XHR0c2YuYmluZFNlYXJjaCggdGFibGUsIGMuJHRhYmxlLmZpbmQoICcuJyArIHRzY3NzLmZpbHRlciApLCB0cnVlICk7XG5cdFx0XHRpZiAoIHdvLmZpbHRlcl9leHRlcm5hbCApIHtcblx0XHRcdFx0dHNmLmJpbmRTZWFyY2goIHRhYmxlLCB3by5maWx0ZXJfZXh0ZXJuYWwgKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB3by5maWx0ZXJfaGlkZUZpbHRlcnMgKSB7XG5cdFx0XHRcdHRzZi5oaWRlRmlsdGVycyggYyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBzaG93IHByb2Nlc3NpbmcgaWNvblxuXHRcdFx0aWYgKCBjLnNob3dQcm9jZXNzaW5nICkge1xuXHRcdFx0XHR0eHQgPSAnZmlsdGVyU3RhcnQgZmlsdGVyRW5kICcuc3BsaXQoICcgJyApLmpvaW4oIGMubmFtZXNwYWNlICsgJ2ZpbHRlciAnICk7XG5cdFx0XHRcdGMuJHRhYmxlXG5cdFx0XHRcdFx0LnVuYmluZCggdHh0LnJlcGxhY2UoIHRzLnJlZ2V4LnNwYWNlcywgJyAnICkgKVxuXHRcdFx0XHRcdC5iaW5kKCB0eHQsIGZ1bmN0aW9uKCBldmVudCwgY29sdW1ucyApIHtcblx0XHRcdFx0XHQvLyBvbmx5IGFkZCBwcm9jZXNzaW5nIHRvIGNlcnRhaW4gY29sdW1ucyB0byBhbGwgY29sdW1uc1xuXHRcdFx0XHRcdCRoZWFkZXIgPSAoIGNvbHVtbnMgKSA/XG5cdFx0XHRcdFx0XHRjLiR0YWJsZVxuXHRcdFx0XHRcdFx0XHQuZmluZCggJy4nICsgdHNjc3MuaGVhZGVyIClcblx0XHRcdFx0XHRcdFx0LmZpbHRlciggJ1tkYXRhLWNvbHVtbl0nIClcblx0XHRcdFx0XHRcdFx0LmZpbHRlciggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvbHVtbnNbICQoIHRoaXMgKS5kYXRhKCAnY29sdW1uJyApIF0gIT09ICcnO1xuXHRcdFx0XHRcdFx0XHR9KSA6ICcnO1xuXHRcdFx0XHRcdHRzLmlzUHJvY2Vzc2luZyggdGFibGUsIGV2ZW50LnR5cGUgPT09ICdmaWx0ZXJTdGFydCcsIGNvbHVtbnMgPyAkaGVhZGVyIDogJycgKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHNldCBmaWx0ZXJlZCByb3dzIGNvdW50ICggaW50aWFsbHkgdW5maWx0ZXJlZCApXG5cdFx0XHRjLmZpbHRlcmVkUm93cyA9IGMudG90YWxSb3dzO1xuXG5cdFx0XHQvLyBhZGQgZGVmYXVsdCB2YWx1ZXNcblx0XHRcdHR4dCA9ICd0YWJsZXNvcnRlci1pbml0aWFsaXplZCBwYWdlckJlZm9yZUluaXRpYWxpemVkICcuc3BsaXQoICcgJyApLmpvaW4oIGMubmFtZXNwYWNlICsgJ2ZpbHRlciAnICk7XG5cdFx0XHRjLiR0YWJsZVxuXHRcdFx0LnVuYmluZCggdHh0LnJlcGxhY2UoIHRzLnJlZ2V4LnNwYWNlcywgJyAnICkgKVxuXHRcdFx0LmJpbmQoIHR4dCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRzZi5jb21wbGV0ZUluaXQoIHRoaXMgKTtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gaWYgZmlsdGVyIHdpZGdldCBpcyBhZGRlZCBhZnRlciBwYWdlciBoYXMgaW5pdGlhbGl6ZWQ7IHRoZW4gc2V0IGZpbHRlciBpbml0IGZsYWdcblx0XHRcdGlmICggYy5wYWdlciAmJiBjLnBhZ2VyLmluaXRpYWxpemVkICYmICF3by5maWx0ZXJfaW5pdGlhbGl6ZWQgKSB7XG5cdFx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnZmlsdGVyRm9tYXR0ZXJVcGRhdGUnICk7XG5cdFx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHRzZi5maWx0ZXJJbml0Q29tcGxldGUoIGMgKTtcblx0XHRcdFx0fSwgMTAwICk7XG5cdFx0XHR9IGVsc2UgaWYgKCAhd28uZmlsdGVyX2luaXRpYWxpemVkICkge1xuXHRcdFx0XHR0c2YuY29tcGxldGVJbml0KCB0YWJsZSApO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y29tcGxldGVJbml0OiBmdW5jdGlvbiggdGFibGUgKSB7XG5cdFx0XHQvLyByZWRlZmluZSAnYycgJiAnd28nIHNvIHRoZXkgdXBkYXRlIHByb3Blcmx5IGluc2lkZSB0aGlzIGNhbGxiYWNrXG5cdFx0XHR2YXIgYyA9IHRhYmxlLmNvbmZpZyxcblx0XHRcdFx0d28gPSBjLndpZGdldE9wdGlvbnMsXG5cdFx0XHRcdGZpbHRlcnMgPSB0c2Yuc2V0RGVmYXVsdHMoIHRhYmxlLCBjLCB3byApIHx8IFtdO1xuXHRcdFx0aWYgKCBmaWx0ZXJzLmxlbmd0aCApIHtcblx0XHRcdFx0Ly8gcHJldmVudCBkZWxheUluaXQgZnJvbSB0cmlnZ2VyaW5nIGEgY2FjaGUgYnVpbGQgaWYgZmlsdGVycyBhcmUgZW1wdHlcblx0XHRcdFx0aWYgKCAhKCBjLmRlbGF5SW5pdCAmJiBmaWx0ZXJzLmpvaW4oICcnICkgPT09ICcnICkgKSB7XG5cdFx0XHRcdFx0dHMuc2V0RmlsdGVycyggdGFibGUsIGZpbHRlcnMsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoICdmaWx0ZXJGb21hdHRlclVwZGF0ZScgKTtcblx0XHRcdC8vIHRyaWdnZXIgaW5pdCBhZnRlciBzZXRUaW1lb3V0IHRvIHByZXZlbnQgbXVsdGlwbGUgZmlsdGVyU3RhcnQvRW5kL0luaXQgdHJpZ2dlcnNcblx0XHRcdHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoICF3by5maWx0ZXJfaW5pdGlhbGl6ZWQgKSB7XG5cdFx0XHRcdFx0dHNmLmZpbHRlckluaXRDb21wbGV0ZSggYyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCAxMDAgKTtcblx0XHR9LFxuXG5cdFx0Ly8gJGNlbGwgcGFyYW1ldGVyLCBidXQgbm90IHRoZSBjb25maWcsIGlzIHBhc3NlZCB0byB0aGUgZmlsdGVyX2Zvcm1hdHRlcnMsXG5cdFx0Ly8gc28gd2UgaGF2ZSB0byB3b3JrIHdpdGggaXQgaW5zdGVhZFxuXHRcdGZvcm1hdHRlclVwZGF0ZWQ6IGZ1bmN0aW9uKCAkY2VsbCwgY29sdW1uICkge1xuXHRcdFx0Ly8gcHJldmVudCBlcnJvciBpZiAkY2VsbCBpcyB1bmRlZmluZWQgLSBzZWUgIzEwNTZcblx0XHRcdHZhciAkdGFibGUgPSAkY2VsbCAmJiAkY2VsbC5jbG9zZXN0KCAndGFibGUnICk7XG5cdFx0XHR2YXIgY29uZmlnID0gJHRhYmxlLmxlbmd0aCAmJiAkdGFibGVbMF0uY29uZmlnLFxuXHRcdFx0XHR3byA9IGNvbmZpZyAmJiBjb25maWcud2lkZ2V0T3B0aW9ucztcblx0XHRcdGlmICggd28gJiYgIXdvLmZpbHRlcl9pbml0aWFsaXplZCApIHtcblx0XHRcdFx0Ly8gYWRkIHVwZGF0ZXMgYnkgY29sdW1uIHNpbmNlIHRoaXMgZnVuY3Rpb25cblx0XHRcdFx0Ly8gbWF5IGJlIGNhbGxlZCBudW1lcm91cyB0aW1lcyBiZWZvcmUgaW5pdGlhbGl6YXRpb25cblx0XHRcdFx0d28uZmlsdGVyX2Zvcm1hdHRlckluaXRbIGNvbHVtbiBdID0gMTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGZpbHRlckluaXRDb21wbGV0ZTogZnVuY3Rpb24oIGMgKSB7XG5cdFx0XHR2YXIgaW5keCwgbGVuLFxuXHRcdFx0XHR3byA9IGMud2lkZ2V0T3B0aW9ucyxcblx0XHRcdFx0Y291bnQgPSAwLFxuXHRcdFx0XHRjb21wbGV0ZWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR3by5maWx0ZXJfaW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdC8vIHVwZGF0ZSBsYXN0U2VhcmNoIC0gaXQgZ2V0cyBjbGVhcmVkIG9mdGVuXG5cdFx0XHRcdFx0Yy5sYXN0U2VhcmNoID0gYy4kdGFibGUuZGF0YSggJ2xhc3RTZWFyY2gnICk7XG5cdFx0XHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoICdmaWx0ZXJJbml0JywgYyApO1xuXHRcdFx0XHRcdHRzZi5maW5kUm93cyggYy50YWJsZSwgYy5sYXN0U2VhcmNoIHx8IFtdICk7XG5cdFx0XHRcdH07XG5cdFx0XHRpZiAoICQuaXNFbXB0eU9iamVjdCggd28uZmlsdGVyX2Zvcm1hdHRlciApICkge1xuXHRcdFx0XHRjb21wbGV0ZWQoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxlbiA9IHdvLmZpbHRlcl9mb3JtYXR0ZXJJbml0Lmxlbmd0aDtcblx0XHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBsZW47IGluZHgrKyApIHtcblx0XHRcdFx0XHRpZiAoIHdvLmZpbHRlcl9mb3JtYXR0ZXJJbml0WyBpbmR4IF0gPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRjb3VudCsrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRjbGVhclRpbWVvdXQoIHdvLmZpbHRlcl9pbml0VGltZXIgKTtcblx0XHRcdFx0aWYgKCAhd28uZmlsdGVyX2luaXRpYWxpemVkICYmIGNvdW50ID09PSB3by5maWx0ZXJfZm9ybWF0dGVyQ291bnQgKSB7XG5cdFx0XHRcdFx0Ly8gZmlsdGVyIHdpZGdldCBpbml0aWFsaXplZFxuXHRcdFx0XHRcdGNvbXBsZXRlZCgpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCAhd28uZmlsdGVyX2luaXRpYWxpemVkICkge1xuXHRcdFx0XHRcdC8vIGZhbGwgYmFjayBpbiBjYXNlIGEgZmlsdGVyX2Zvcm1hdHRlciBkb2Vzbid0IGNhbGxcblx0XHRcdFx0XHQvLyAkLnRhYmxlc29ydGVyLmZpbHRlci5mb3JtYXR0ZXJVcGRhdGVkKCAkY2VsbCwgY29sdW1uICksIGFuZCB0aGUgY291bnQgaXMgb2ZmXG5cdFx0XHRcdFx0d28uZmlsdGVyX2luaXRUaW1lciA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Y29tcGxldGVkKCk7XG5cdFx0XHRcdFx0fSwgNTAwICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8vIGVuY29kZSBvciBkZWNvZGUgZmlsdGVycyBmb3Igc3RvcmFnZTsgc2VlICMxMDI2XG5cdFx0cHJvY2Vzc0ZpbHRlcnM6IGZ1bmN0aW9uKCBmaWx0ZXJzLCBlbmNvZGUgKSB7XG5cdFx0XHR2YXIgaW5keCxcblx0XHRcdFx0Ly8gZml4ZXMgIzEyMzc7IHByZXZpb3VzbHkgcmV0dXJuaW5nIGFuIGVuY29kZWQgXCJmaWx0ZXJzXCIgdmFsdWVcblx0XHRcdFx0cmVzdWx0ID0gW10sXG5cdFx0XHRcdG1vZGUgPSBlbmNvZGUgPyBlbmNvZGVVUklDb21wb25lbnQgOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdFx0XHRcdGxlbiA9IGZpbHRlcnMubGVuZ3RoO1xuXHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBsZW47IGluZHgrKyApIHtcblx0XHRcdFx0aWYgKCBmaWx0ZXJzWyBpbmR4IF0gKSB7XG5cdFx0XHRcdFx0cmVzdWx0WyBpbmR4IF0gPSBtb2RlKCBmaWx0ZXJzWyBpbmR4IF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdHNldERlZmF1bHRzOiBmdW5jdGlvbiggdGFibGUsIGMsIHdvICkge1xuXHRcdFx0dmFyIGlzQXJyYXksIHNhdmVkLCBpbmR4LCBjb2wsICRmaWx0ZXJzLFxuXHRcdFx0XHQvLyBnZXQgY3VycmVudCAoIGRlZmF1bHQgKSBmaWx0ZXJzXG5cdFx0XHRcdGZpbHRlcnMgPSB0cy5nZXRGaWx0ZXJzKCB0YWJsZSApIHx8IFtdO1xuXHRcdFx0aWYgKCB3by5maWx0ZXJfc2F2ZUZpbHRlcnMgJiYgdHMuc3RvcmFnZSApIHtcblx0XHRcdFx0c2F2ZWQgPSB0cy5zdG9yYWdlKCB0YWJsZSwgJ3RhYmxlc29ydGVyLWZpbHRlcnMnICkgfHwgW107XG5cdFx0XHRcdGlzQXJyYXkgPSAkLmlzQXJyYXkoIHNhdmVkICk7XG5cdFx0XHRcdC8vIG1ha2Ugc3VyZSB3ZSdyZSBub3QganVzdCBnZXR0aW5nIGFuIGVtcHR5IGFycmF5XG5cdFx0XHRcdGlmICggISggaXNBcnJheSAmJiBzYXZlZC5qb2luKCAnJyApID09PSAnJyB8fCAhaXNBcnJheSApICkge1xuXHRcdFx0XHRcdGZpbHRlcnMgPSB0c2YucHJvY2Vzc0ZpbHRlcnMoIHNhdmVkICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIGlmIG5vIGZpbHRlcnMgc2F2ZWQsIHRoZW4gY2hlY2sgZGVmYXVsdCBzZXR0aW5nc1xuXHRcdFx0aWYgKCBmaWx0ZXJzLmpvaW4oICcnICkgPT09ICcnICkge1xuXHRcdFx0XHQvLyBhbGxvdyBhZGRpbmcgZGVmYXVsdCBzZXR0aW5nIHRvIGV4dGVybmFsIGZpbHRlcnNcblx0XHRcdFx0JGZpbHRlcnMgPSBjLiRoZWFkZXJzLmFkZCggd28uZmlsdGVyXyRleHRlcm5hbEZpbHRlcnMgKVxuXHRcdFx0XHRcdC5maWx0ZXIoICdbJyArIHdvLmZpbHRlcl9kZWZhdWx0QXR0cmliICsgJ10nICk7XG5cdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDw9IGMuY29sdW1uczsgaW5keCsrICkge1xuXHRcdFx0XHRcdC8vIGluY2x1ZGUgZGF0YS1jb2x1bW49J2FsbCcgZXh0ZXJuYWwgZmlsdGVyc1xuXHRcdFx0XHRcdGNvbCA9IGluZHggPT09IGMuY29sdW1ucyA/ICdhbGwnIDogaW5keDtcblx0XHRcdFx0XHRmaWx0ZXJzWyBpbmR4IF0gPSAkZmlsdGVyc1xuXHRcdFx0XHRcdFx0LmZpbHRlciggJ1tkYXRhLWNvbHVtbj1cIicgKyBjb2wgKyAnXCJdJyApXG5cdFx0XHRcdFx0XHQuYXR0ciggd28uZmlsdGVyX2RlZmF1bHRBdHRyaWIgKSB8fCBmaWx0ZXJzW2luZHhdIHx8ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjLiR0YWJsZS5kYXRhKCAnbGFzdFNlYXJjaCcsIGZpbHRlcnMgKTtcblx0XHRcdHJldHVybiBmaWx0ZXJzO1xuXHRcdH0sXG5cdFx0cGFyc2VGaWx0ZXI6IGZ1bmN0aW9uKCBjLCBmaWx0ZXIsIGRhdGEsIHBhcnNlZCApIHtcblx0XHRcdHJldHVybiBwYXJzZWQgfHwgZGF0YS5wYXJzZWRbIGRhdGEuaW5kZXggXSA/XG5cdFx0XHRcdGMucGFyc2Vyc1sgZGF0YS5pbmRleCBdLmZvcm1hdCggZmlsdGVyLCBjLnRhYmxlLCBbXSwgZGF0YS5pbmRleCApIDpcblx0XHRcdFx0ZmlsdGVyO1xuXHRcdH0sXG5cdFx0YnVpbGRSb3c6IGZ1bmN0aW9uKCB0YWJsZSwgYywgd28gKSB7XG5cdFx0XHR2YXIgJGZpbHRlciwgY29sLCBjb2x1bW4sICRoZWFkZXIsIG1ha2VTZWxlY3QsIGRpc2FibGVkLCBuYW1lLCBmZnhuLCB0bXAsXG5cdFx0XHRcdC8vIGMuY29sdW1ucyBkZWZpbmVkIGluIGNvbXB1dGVUaEluZGV4ZXMoKVxuXHRcdFx0XHRjZWxsRmlsdGVyID0gd28uZmlsdGVyX2NlbGxGaWx0ZXIsXG5cdFx0XHRcdGNvbHVtbnMgPSBjLmNvbHVtbnMsXG5cdFx0XHRcdGFycnkgPSAkLmlzQXJyYXkoIGNlbGxGaWx0ZXIgKSxcblx0XHRcdFx0YnVpbGRGaWx0ZXIgPSAnPHRyIHJvbGU9XCJyb3dcIiBjbGFzcz1cIicgKyB0c2Nzcy5maWx0ZXJSb3cgKyAnICcgKyBjLmNzc0lnbm9yZVJvdyArICdcIj4nO1xuXHRcdFx0Zm9yICggY29sdW1uID0gMDsgY29sdW1uIDwgY29sdW1uczsgY29sdW1uKysgKSB7XG5cdFx0XHRcdGlmICggYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uIF0ubGVuZ3RoICkge1xuXHRcdFx0XHRcdC8vIGFjY291bnQgZm9yIGVudGlyZSBjb2x1bW4gc2V0IHdpdGggY29sc3Bhbi4gU2VlICMxMDQ3XG5cdFx0XHRcdFx0dG1wID0gYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uIF0gJiYgYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uIF1bMF0uY29sU3BhbiB8fCAwO1xuXHRcdFx0XHRcdGlmICggdG1wID4gMSApIHtcblx0XHRcdFx0XHRcdGJ1aWxkRmlsdGVyICs9ICc8dGQgZGF0YS1jb2x1bW49XCInICsgY29sdW1uICsgJy0nICsgKCBjb2x1bW4gKyB0bXAgLSAxICkgKyAnXCIgY29sc3Bhbj1cIicgKyB0bXAgKyAnXCInO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRidWlsZEZpbHRlciArPSAnPHRkIGRhdGEtY29sdW1uPVwiJyArIGNvbHVtbiArICdcIic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggYXJyeSApIHtcblx0XHRcdFx0XHRcdGJ1aWxkRmlsdGVyICs9ICggY2VsbEZpbHRlclsgY29sdW1uIF0gPyAnIGNsYXNzPVwiJyArIGNlbGxGaWx0ZXJbIGNvbHVtbiBdICsgJ1wiJyA6ICcnICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGJ1aWxkRmlsdGVyICs9ICggY2VsbEZpbHRlciAhPT0gJycgPyAnIGNsYXNzPVwiJyArIGNlbGxGaWx0ZXIgKyAnXCInIDogJycgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnVpbGRGaWx0ZXIgKz0gJz48L3RkPic7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGMuJGZpbHRlcnMgPSAkKCBidWlsZEZpbHRlciArPSAnPC90cj4nIClcblx0XHRcdFx0LmFwcGVuZFRvKCBjLiR0YWJsZS5jaGlsZHJlbiggJ3RoZWFkJyApLmVxKCAwICkgKVxuXHRcdFx0XHQuY2hpbGRyZW4oICd0ZCcgKTtcblx0XHRcdC8vIGJ1aWxkIGVhY2ggZmlsdGVyIGlucHV0XG5cdFx0XHRmb3IgKCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBjb2x1bW5zOyBjb2x1bW4rKyApIHtcblx0XHRcdFx0ZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdFx0Ly8gYXNzdW1pbmcgbGFzdCBjZWxsIG9mIGEgY29sdW1uIGlzIHRoZSBtYWluIGNvbHVtblxuXHRcdFx0XHQkaGVhZGVyID0gYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uIF07XG5cdFx0XHRcdGlmICggJGhlYWRlciAmJiAkaGVhZGVyLmxlbmd0aCApIHtcblx0XHRcdFx0XHQvLyAkZmlsdGVyID0gYy4kZmlsdGVycy5maWx0ZXIoICdbZGF0YS1jb2x1bW49XCInICsgY29sdW1uICsgJ1wiXScgKTtcblx0XHRcdFx0XHQkZmlsdGVyID0gdHNmLmdldENvbHVtbkVsbSggYywgYy4kZmlsdGVycywgY29sdW1uICk7XG5cdFx0XHRcdFx0ZmZ4biA9IHRzLmdldENvbHVtbkRhdGEoIHRhYmxlLCB3by5maWx0ZXJfZnVuY3Rpb25zLCBjb2x1bW4gKTtcblx0XHRcdFx0XHRtYWtlU2VsZWN0ID0gKCB3by5maWx0ZXJfZnVuY3Rpb25zICYmIGZmeG4gJiYgdHlwZW9mIGZmeG4gIT09ICdmdW5jdGlvbicgKSB8fFxuXHRcdFx0XHRcdFx0JGhlYWRlci5oYXNDbGFzcyggJ2ZpbHRlci1zZWxlY3QnICk7XG5cdFx0XHRcdFx0Ly8gZ2V0IGRhdGEgZnJvbSBqUXVlcnkgZGF0YSwgbWV0YWRhdGEsIGhlYWRlcnMgb3B0aW9uIG9yIGhlYWRlciBjbGFzcyBuYW1lXG5cdFx0XHRcdFx0Y29sID0gdHMuZ2V0Q29sdW1uRGF0YSggdGFibGUsIGMuaGVhZGVycywgY29sdW1uICk7XG5cdFx0XHRcdFx0ZGlzYWJsZWQgPSB0cy5nZXREYXRhKCAkaGVhZGVyWzBdLCBjb2wsICdmaWx0ZXInICkgPT09ICdmYWxzZScgfHxcblx0XHRcdFx0XHRcdHRzLmdldERhdGEoICRoZWFkZXJbMF0sIGNvbCwgJ3BhcnNlcicgKSA9PT0gJ2ZhbHNlJztcblxuXHRcdFx0XHRcdGlmICggbWFrZVNlbGVjdCApIHtcblx0XHRcdFx0XHRcdGJ1aWxkRmlsdGVyID0gJCggJzxzZWxlY3Q+JyApLmFwcGVuZFRvKCAkZmlsdGVyICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGZmeG4gPSB0cy5nZXRDb2x1bW5EYXRhKCB0YWJsZSwgd28uZmlsdGVyX2Zvcm1hdHRlciwgY29sdW1uICk7XG5cdFx0XHRcdFx0XHRpZiAoIGZmeG4gKSB7XG5cdFx0XHRcdFx0XHRcdHdvLmZpbHRlcl9mb3JtYXR0ZXJDb3VudCsrO1xuXHRcdFx0XHRcdFx0XHRidWlsZEZpbHRlciA9IGZmeG4oICRmaWx0ZXIsIGNvbHVtbiApO1xuXHRcdFx0XHRcdFx0XHQvLyBubyBlbGVtZW50IHJldHVybmVkLCBzbyBsZXRzIGdvIGZpbmQgaXRcblx0XHRcdFx0XHRcdFx0aWYgKCBidWlsZEZpbHRlciAmJiBidWlsZEZpbHRlci5sZW5ndGggPT09IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnVpbGRGaWx0ZXIgPSAkZmlsdGVyLmNoaWxkcmVuKCAnaW5wdXQnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Ly8gZWxlbWVudCBub3QgaW4gRE9NLCBzbyBsZXRzIGF0dGFjaCBpdFxuXHRcdFx0XHRcdFx0XHRpZiAoIGJ1aWxkRmlsdGVyICYmICggYnVpbGRGaWx0ZXIucGFyZW50KCkubGVuZ3RoID09PSAwIHx8XG5cdFx0XHRcdFx0XHRcdFx0KCBidWlsZEZpbHRlci5wYXJlbnQoKS5sZW5ndGggJiYgYnVpbGRGaWx0ZXIucGFyZW50KClbMF0gIT09ICRmaWx0ZXJbMF0gKSApICkge1xuXHRcdFx0XHRcdFx0XHRcdCRmaWx0ZXIuYXBwZW5kKCBidWlsZEZpbHRlciApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRidWlsZEZpbHRlciA9ICQoICc8aW5wdXQgdHlwZT1cInNlYXJjaFwiPicgKS5hcHBlbmRUbyggJGZpbHRlciApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCBidWlsZEZpbHRlciApIHtcblx0XHRcdFx0XHRcdFx0dG1wID0gJGhlYWRlci5kYXRhKCAncGxhY2Vob2xkZXInICkgfHxcblx0XHRcdFx0XHRcdFx0XHQkaGVhZGVyLmF0dHIoICdkYXRhLXBsYWNlaG9sZGVyJyApIHx8XG5cdFx0XHRcdFx0XHRcdFx0d28uZmlsdGVyX3BsYWNlaG9sZGVyLnNlYXJjaCB8fCAnJztcblx0XHRcdFx0XHRcdFx0YnVpbGRGaWx0ZXIuYXR0ciggJ3BsYWNlaG9sZGVyJywgdG1wICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggYnVpbGRGaWx0ZXIgKSB7XG5cdFx0XHRcdFx0XHQvLyBhZGQgZmlsdGVyIGNsYXNzIG5hbWVcblx0XHRcdFx0XHRcdG5hbWUgPSAoICQuaXNBcnJheSggd28uZmlsdGVyX2Nzc0ZpbHRlciApID9cblx0XHRcdFx0XHRcdFx0KCB0eXBlb2Ygd28uZmlsdGVyX2Nzc0ZpbHRlcltjb2x1bW5dICE9PSAndW5kZWZpbmVkJyA/IHdvLmZpbHRlcl9jc3NGaWx0ZXJbY29sdW1uXSB8fCAnJyA6ICcnICkgOlxuXHRcdFx0XHRcdFx0XHR3by5maWx0ZXJfY3NzRmlsdGVyICkgfHwgJyc7XG5cdFx0XHRcdFx0XHQvLyBjb3B5IGRhdGEtY29sdW1uIGZyb20gdGFibGUgY2VsbCAoaXQgd2lsbCBpbmNsdWRlIGNvbHNwYW4pXG5cdFx0XHRcdFx0XHRidWlsZEZpbHRlci5hZGRDbGFzcyggdHNjc3MuZmlsdGVyICsgJyAnICsgbmFtZSApLmF0dHIoICdkYXRhLWNvbHVtbicsICRmaWx0ZXIuYXR0ciggJ2RhdGEtY29sdW1uJyApICk7XG5cdFx0XHRcdFx0XHRpZiAoIGRpc2FibGVkICkge1xuXHRcdFx0XHRcdFx0XHRidWlsZEZpbHRlci5hdHRyKCAncGxhY2Vob2xkZXInLCAnJyApLmFkZENsYXNzKCB0c2Nzcy5maWx0ZXJEaXNhYmxlZCApWzBdLmRpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGJpbmRTZWFyY2g6IGZ1bmN0aW9uKCB0YWJsZSwgJGVsLCBpbnRlcm5hbCApIHtcblx0XHRcdHRhYmxlID0gJCggdGFibGUgKVswXTtcblx0XHRcdCRlbCA9ICQoICRlbCApOyAvLyBhbGxvdyBwYXNzaW5nIGEgc2VsZWN0b3Igc3RyaW5nXG5cdFx0XHRpZiAoICEkZWwubGVuZ3RoICkgeyByZXR1cm47IH1cblx0XHRcdHZhciB0bXAsXG5cdFx0XHRcdGMgPSB0YWJsZS5jb25maWcsXG5cdFx0XHRcdHdvID0gYy53aWRnZXRPcHRpb25zLFxuXHRcdFx0XHRuYW1lc3BhY2UgPSBjLm5hbWVzcGFjZSArICdmaWx0ZXInLFxuXHRcdFx0XHQkZXh0ID0gd28uZmlsdGVyXyRleHRlcm5hbEZpbHRlcnM7XG5cdFx0XHRpZiAoIGludGVybmFsICE9PSB0cnVlICkge1xuXHRcdFx0XHQvLyBzYXZlIGFueU1hdGNoIGVsZW1lbnRcblx0XHRcdFx0dG1wID0gd28uZmlsdGVyX2FueUNvbHVtblNlbGVjdG9yICsgJywnICsgd28uZmlsdGVyX211bHRpcGxlQ29sdW1uU2VsZWN0b3I7XG5cdFx0XHRcdHdvLmZpbHRlcl8kYW55TWF0Y2ggPSAkZWwuZmlsdGVyKCB0bXAgKTtcblx0XHRcdFx0aWYgKCAkZXh0ICYmICRleHQubGVuZ3RoICkge1xuXHRcdFx0XHRcdHdvLmZpbHRlcl8kZXh0ZXJuYWxGaWx0ZXJzID0gd28uZmlsdGVyXyRleHRlcm5hbEZpbHRlcnMuYWRkKCAkZWwgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR3by5maWx0ZXJfJGV4dGVybmFsRmlsdGVycyA9ICRlbDtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyB1cGRhdGUgdmFsdWVzICggZXh0ZXJuYWwgZmlsdGVycyBhZGRlZCBhZnRlciB0YWJsZSBpbml0aWFsaXphdGlvbiApXG5cdFx0XHRcdHRzLnNldEZpbHRlcnMoIHRhYmxlLCBjLiR0YWJsZS5kYXRhKCAnbGFzdFNlYXJjaCcgKSB8fCBbXSwgaW50ZXJuYWwgPT09IGZhbHNlICk7XG5cdFx0XHR9XG5cdFx0XHQvLyB1bmJpbmQgZXZlbnRzXG5cdFx0XHR0bXAgPSAoICdrZXlwcmVzcyBrZXl1cCBrZXlkb3duIHNlYXJjaCBjaGFuZ2UgaW5wdXQgJy5zcGxpdCggJyAnICkuam9pbiggbmFtZXNwYWNlICsgJyAnICkgKTtcblx0XHRcdCRlbFxuXHRcdFx0Ly8gdXNlIGRhdGEgYXR0cmlidXRlIGluc3RlYWQgb2YgalF1ZXJ5IGRhdGEgc2luY2UgdGhlIGhlYWQgaXMgY2xvbmVkIHdpdGhvdXQgaW5jbHVkaW5nXG5cdFx0XHQvLyB0aGUgZGF0YS9iaW5kaW5nXG5cdFx0XHQuYXR0ciggJ2RhdGEtbGFzdFNlYXJjaFRpbWUnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSApXG5cdFx0XHQudW5iaW5kKCB0bXAucmVwbGFjZSggdHMucmVnZXguc3BhY2VzLCAnICcgKSApXG5cdFx0XHQuYmluZCggJ2tleWRvd24nICsgbmFtZXNwYWNlLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdGlmICggZXZlbnQud2hpY2ggPT09IHRza2V5Q29kZXMuZXNjYXBlICYmICF0YWJsZS5jb25maWcud2lkZ2V0T3B0aW9ucy5maWx0ZXJfcmVzZXRPbkVzYyApIHtcblx0XHRcdFx0XHQvLyBwcmV2ZW50IGtleXByZXNzIGV2ZW50XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0LmJpbmQoICdrZXl1cCcgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0d28gPSB0YWJsZS5jb25maWcud2lkZ2V0T3B0aW9uczsgLy8gbWFrZSBzdXJlIFwid29cIiBpc24ndCBjYWNoZWRcblx0XHRcdFx0dmFyIGNvbHVtbiA9IHBhcnNlSW50KCAkKCB0aGlzICkuYXR0ciggJ2RhdGEtY29sdW1uJyApLCAxMCApLFxuXHRcdFx0XHRcdGxpdmVTZWFyY2ggPSB0eXBlb2Ygd28uZmlsdGVyX2xpdmVTZWFyY2ggPT09ICdib29sZWFuJyA/IHdvLmZpbHRlcl9saXZlU2VhcmNoIDpcblx0XHRcdFx0XHRcdHRzLmdldENvbHVtbkRhdGEoIHRhYmxlLCB3by5maWx0ZXJfbGl2ZVNlYXJjaCwgY29sdW1uICk7XG5cdFx0XHRcdGlmICggdHlwZW9mIGxpdmVTZWFyY2ggPT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0XHRcdGxpdmVTZWFyY2ggPSB3by5maWx0ZXJfbGl2ZVNlYXJjaC5mYWxsYmFjayB8fCBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkKCB0aGlzICkuYXR0ciggJ2RhdGEtbGFzdFNlYXJjaFRpbWUnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSApO1xuXHRcdFx0XHQvLyBlbXVsYXRlIHdoYXQgd2Via2l0IGRvZXMuLi4uIGVzY2FwZSBjbGVhcnMgdGhlIGZpbHRlclxuXHRcdFx0XHRpZiAoIGV2ZW50LndoaWNoID09PSB0c2tleUNvZGVzLmVzY2FwZSApIHtcblx0XHRcdFx0XHQvLyBtYWtlIHN1cmUgdG8gcmVzdG9yZSB0aGUgbGFzdCB2YWx1ZSBvbiBlc2NhcGVcblx0XHRcdFx0XHR0aGlzLnZhbHVlID0gd28uZmlsdGVyX3Jlc2V0T25Fc2MgPyAnJyA6IGMubGFzdFNlYXJjaFtjb2x1bW5dO1xuXHRcdFx0XHRcdC8vIGRvbid0IHJldHVybiBpZiB0aGUgc2VhcmNoIHZhbHVlIGlzIGVtcHR5ICggYWxsIHJvd3MgbmVlZCB0byBiZSByZXZlYWxlZCApXG5cdFx0XHRcdH0gZWxzZSBpZiAoIHRoaXMudmFsdWUgIT09ICcnICYmIChcblx0XHRcdFx0XHQvLyBsaXZlU2VhcmNoIGNhbiBjb250YWluIGEgbWluIHZhbHVlIGxlbmd0aDsgaWdub3JlIGFycm93IGFuZCBtZXRhIGtleXMsIGJ1dCBhbGxvdyBiYWNrc3BhY2Vcblx0XHRcdFx0XHQoIHR5cGVvZiBsaXZlU2VhcmNoID09PSAnbnVtYmVyJyAmJiB0aGlzLnZhbHVlLmxlbmd0aCA8IGxpdmVTZWFyY2ggKSB8fFxuXHRcdFx0XHRcdC8vIGxldCByZXR1cm4gJiBiYWNrc3BhY2UgY29udGludWUgb24sIGJ1dCBpZ25vcmUgYXJyb3dzICYgbm9uLXZhbGlkIGNoYXJhY3RlcnNcblx0XHRcdFx0XHQoIGV2ZW50LndoaWNoICE9PSB0c2tleUNvZGVzLmVudGVyICYmIGV2ZW50LndoaWNoICE9PSB0c2tleUNvZGVzLmJhY2tTcGFjZSAmJlxuXHRcdFx0XHRcdFx0KCBldmVudC53aGljaCA8IHRza2V5Q29kZXMuc3BhY2UgfHwgKCBldmVudC53aGljaCA+PSB0c2tleUNvZGVzLmxlZnQgJiYgZXZlbnQud2hpY2ggPD0gdHNrZXlDb2Rlcy5kb3duICkgKSApICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdC8vIGxpdmUgc2VhcmNoXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGxpdmVTZWFyY2ggPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdGlmICggdGhpcy52YWx1ZSAhPT0gJycgJiYgZXZlbnQud2hpY2ggIT09IHRza2V5Q29kZXMuZW50ZXIgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGNoYW5nZSBldmVudCA9IG5vIGRlbGF5OyBsYXN0IHRydWUgZmxhZyB0ZWxscyBnZXRGaWx0ZXJzIHRvIHNraXAgbmV3ZXN0IHRpbWVkIGlucHV0XG5cdFx0XHRcdHRzZi5zZWFyY2hpbmcoIHRhYmxlLCB0cnVlLCB0cnVlLCBjb2x1bW4gKTtcblx0XHRcdH0pXG5cdFx0XHQvLyBpbmNsdWRlIGNoYW5nZSBmb3Igc2VsZWN0IC0gZml4ZXMgIzQ3M1xuXHRcdFx0LmJpbmQoICdzZWFyY2ggY2hhbmdlIGtleXByZXNzIGlucHV0IGJsdXIgJy5zcGxpdCggJyAnICkuam9pbiggbmFtZXNwYWNlICsgJyAnICksIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0Ly8gZG9uJ3QgZ2V0IGNhY2hlZCBkYXRhLCBpbiBjYXNlIGRhdGEtY29sdW1uIGNoYW5nZXMgZHluYW1pY2FsbHlcblx0XHRcdFx0dmFyIGNvbHVtbiA9IHBhcnNlSW50KCAkKCB0aGlzICkuYXR0ciggJ2RhdGEtY29sdW1uJyApLCAxMCApLFxuXHRcdFx0XHRcdGV2ZW50VHlwZSA9IGV2ZW50LnR5cGUsXG5cdFx0XHRcdFx0bGl2ZVNlYXJjaCA9IHR5cGVvZiB3by5maWx0ZXJfbGl2ZVNlYXJjaCA9PT0gJ2Jvb2xlYW4nID9cblx0XHRcdFx0XHRcdHdvLmZpbHRlcl9saXZlU2VhcmNoIDpcblx0XHRcdFx0XHRcdHRzLmdldENvbHVtbkRhdGEoIHRhYmxlLCB3by5maWx0ZXJfbGl2ZVNlYXJjaCwgY29sdW1uICk7XG5cdFx0XHRcdGlmICggdGFibGUuY29uZmlnLndpZGdldE9wdGlvbnMuZmlsdGVyX2luaXRpYWxpemVkICYmXG5cdFx0XHRcdFx0Ly8gaW1tZWRpYXRlIHNlYXJjaCBpZiB1c2VyIHByZXNzZXMgZW50ZXJcblx0XHRcdFx0XHQoIGV2ZW50LndoaWNoID09PSB0c2tleUNvZGVzLmVudGVyIHx8XG5cdFx0XHRcdFx0XHQvLyBpbW1lZGlhdGUgc2VhcmNoIGlmIGEgXCJzZWFyY2hcIiBvciBcImJsdXJcIiBpcyB0cmlnZ2VyZWQgb24gdGhlIGlucHV0XG5cdFx0XHRcdFx0XHQoIGV2ZW50VHlwZSA9PT0gJ3NlYXJjaCcgfHwgZXZlbnRUeXBlID09PSAnYmx1cicgKSB8fFxuXHRcdFx0XHRcdFx0Ly8gY2hhbmdlICYgaW5wdXQgZXZlbnRzIG11c3QgYmUgaWdub3JlZCBpZiBsaXZlU2VhcmNoICE9PSB0cnVlXG5cdFx0XHRcdFx0XHQoIGV2ZW50VHlwZSA9PT0gJ2NoYW5nZScgfHwgZXZlbnRUeXBlID09PSAnaW5wdXQnICkgJiZcblx0XHRcdFx0XHRcdC8vIHByZXZlbnQgc2VhcmNoIGlmIGxpdmVTZWFyY2ggaXMgYSBudW1iZXJcblx0XHRcdFx0XHRcdCggbGl2ZVNlYXJjaCA9PT0gdHJ1ZSB8fCBsaXZlU2VhcmNoICE9PSB0cnVlICYmIGV2ZW50LnRhcmdldC5ub2RlTmFtZSAhPT0gJ0lOUFVUJyApICYmXG5cdFx0XHRcdFx0XHQvLyBkb24ndCBhbGxvdyAnY2hhbmdlJyBvciAnaW5wdXQnIGV2ZW50IHRvIHByb2Nlc3MgaWYgdGhlIGlucHV0IHZhbHVlXG5cdFx0XHRcdFx0XHQvLyBpcyB0aGUgc2FtZSAtIGZpeGVzICM2ODVcblx0XHRcdFx0XHRcdHRoaXMudmFsdWUgIT09IGMubGFzdFNlYXJjaFtjb2x1bW5dXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdC8vIGluaXQgc2VhcmNoIHdpdGggbm8gZGVsYXlcblx0XHRcdFx0XHQkKCB0aGlzICkuYXR0ciggJ2RhdGEtbGFzdFNlYXJjaFRpbWUnLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSApO1xuXHRcdFx0XHRcdHRzZi5zZWFyY2hpbmcoIHRhYmxlLCBldmVudFR5cGUgIT09ICdrZXlwcmVzcycsIHRydWUsIGNvbHVtbiApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHNlYXJjaGluZzogZnVuY3Rpb24oIHRhYmxlLCBmaWx0ZXIsIHNraXBGaXJzdCwgY29sdW1uICkge1xuXHRcdFx0dmFyIGxpdmVTZWFyY2gsXG5cdFx0XHRcdHdvID0gdGFibGUuY29uZmlnLndpZGdldE9wdGlvbnM7XG5cdFx0XHRpZiAodHlwZW9mIGNvbHVtbiA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0Ly8gbm8gZGVsYXlcblx0XHRcdFx0bGl2ZVNlYXJjaCA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGl2ZVNlYXJjaCA9IHR5cGVvZiB3by5maWx0ZXJfbGl2ZVNlYXJjaCA9PT0gJ2Jvb2xlYW4nID9cblx0XHRcdFx0XHR3by5maWx0ZXJfbGl2ZVNlYXJjaCA6XG5cdFx0XHRcdFx0Ly8gZ2V0IGNvbHVtbiBzZXR0aW5nLCBvciBzZXQgdG8gZmFsbGJhY2sgdmFsdWUsIG9yIGRlZmF1bHQgdG8gZmFsc2Vcblx0XHRcdFx0XHR0cy5nZXRDb2x1bW5EYXRhKCB0YWJsZSwgd28uZmlsdGVyX2xpdmVTZWFyY2gsIGNvbHVtbiApO1xuXHRcdFx0XHRpZiAoIHR5cGVvZiBsaXZlU2VhcmNoID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0XHRsaXZlU2VhcmNoID0gd28uZmlsdGVyX2xpdmVTZWFyY2guZmFsbGJhY2sgfHwgZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNsZWFyVGltZW91dCggd28uZmlsdGVyX3NlYXJjaFRpbWVyICk7XG5cdFx0XHRpZiAoIHR5cGVvZiBmaWx0ZXIgPT09ICd1bmRlZmluZWQnIHx8IGZpbHRlciA9PT0gdHJ1ZSApIHtcblx0XHRcdFx0Ly8gZGVsYXkgZmlsdGVyaW5nXG5cdFx0XHRcdHdvLmZpbHRlcl9zZWFyY2hUaW1lciA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHRzZi5jaGVja0ZpbHRlcnMoIHRhYmxlLCBmaWx0ZXIsIHNraXBGaXJzdCApO1xuXHRcdFx0XHR9LCBsaXZlU2VhcmNoID8gd28uZmlsdGVyX3NlYXJjaERlbGF5IDogMTAgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHNraXAgZGVsYXlcblx0XHRcdFx0dHNmLmNoZWNrRmlsdGVycyggdGFibGUsIGZpbHRlciwgc2tpcEZpcnN0ICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRlcXVhbEZpbHRlcnM6IGZ1bmN0aW9uIChjLCBmaWx0ZXIxLCBmaWx0ZXIyKSB7XG5cdFx0XHR2YXIgaW5keCxcblx0XHRcdFx0ZjEgPSBbXSxcblx0XHRcdFx0ZjIgPSBbXSxcblx0XHRcdFx0bGVuID0gYy5jb2x1bW5zICsgMTsgLy8gYWRkIG9uZSB0byBpbmNsdWRlIGFueU1hdGNoIGZpbHRlclxuXHRcdFx0ZmlsdGVyMSA9ICQuaXNBcnJheShmaWx0ZXIxKSA/IGZpbHRlcjEgOiBbXTtcblx0XHRcdGZpbHRlcjIgPSAkLmlzQXJyYXkoZmlsdGVyMikgPyBmaWx0ZXIyIDogW107XG5cdFx0XHRmb3IgKGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KyspIHtcblx0XHRcdFx0ZjFbaW5keF0gPSBmaWx0ZXIxW2luZHhdIHx8ICcnO1xuXHRcdFx0XHRmMltpbmR4XSA9IGZpbHRlcjJbaW5keF0gfHwgJyc7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZjEuam9pbignLCcpID09PSBmMi5qb2luKCcsJyk7XG5cdFx0fSxcblx0XHRjaGVja0ZpbHRlcnM6IGZ1bmN0aW9uKCB0YWJsZSwgZmlsdGVyLCBza2lwRmlyc3QgKSB7XG5cdFx0XHR2YXIgYyA9IHRhYmxlLmNvbmZpZyxcblx0XHRcdFx0d28gPSBjLndpZGdldE9wdGlvbnMsXG5cdFx0XHRcdGZpbHRlckFycmF5ID0gJC5pc0FycmF5KCBmaWx0ZXIgKSxcblx0XHRcdFx0ZmlsdGVycyA9ICggZmlsdGVyQXJyYXkgKSA/IGZpbHRlciA6IHRzLmdldEZpbHRlcnMoIHRhYmxlLCB0cnVlICksXG5cdFx0XHRcdGN1cnJlbnRGaWx0ZXJzID0gZmlsdGVycyB8fCBbXTsgLy8gY3VycmVudCBmaWx0ZXIgdmFsdWVzXG5cdFx0XHQvLyBwcmV2ZW50IGVycm9ycyBpZiBkZWxheSBpbml0IGlzIHNldFxuXHRcdFx0aWYgKCAkLmlzRW1wdHlPYmplY3QoIGMuY2FjaGUgKSApIHtcblx0XHRcdFx0Ly8gdXBkYXRlIGNhY2hlIGlmIGRlbGF5SW5pdCBzZXQgJiBwYWdlciBoYXMgaW5pdGlhbGl6ZWQgKCBhZnRlciB1c2VyIGluaXRpYXRlcyBhIHNlYXJjaCApXG5cdFx0XHRcdGlmICggYy5kZWxheUluaXQgJiYgKCAhYy5wYWdlciB8fCBjLnBhZ2VyICYmIGMucGFnZXIuaW5pdGlhbGl6ZWQgKSApIHtcblx0XHRcdFx0XHR0cy51cGRhdGVDYWNoZSggYywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR0c2YuY2hlY2tGaWx0ZXJzKCB0YWJsZSwgZmFsc2UsIHNraXBGaXJzdCApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vIGFkZCBmaWx0ZXIgYXJyYXkgYmFjayBpbnRvIGlucHV0c1xuXHRcdFx0aWYgKCBmaWx0ZXJBcnJheSApIHtcblx0XHRcdFx0dHMuc2V0RmlsdGVycyggdGFibGUsIGZpbHRlcnMsIGZhbHNlLCBza2lwRmlyc3QgIT09IHRydWUgKTtcblx0XHRcdFx0aWYgKCAhd28uZmlsdGVyX2luaXRpYWxpemVkICkge1xuXHRcdFx0XHRcdGMubGFzdFNlYXJjaCA9IFtdO1xuXHRcdFx0XHRcdGMubGFzdENvbWJpbmVkRmlsdGVyID0gJyc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggd28uZmlsdGVyX2hpZGVGaWx0ZXJzICkge1xuXHRcdFx0XHQvLyBzaG93L2hpZGUgZmlsdGVyIHJvdyBhcyBuZWVkZWRcblx0XHRcdFx0Yy4kdGFibGVcblx0XHRcdFx0XHQuZmluZCggJy4nICsgdHNjc3MuZmlsdGVyUm93IClcblx0XHRcdFx0XHQudHJpZ2dlckhhbmRsZXIoIHRzZi5oaWRlRmlsdGVyc0NoZWNrKCBjICkgPyAnbW91c2VsZWF2ZScgOiAnbW91c2VlbnRlcicgKTtcblx0XHRcdH1cblx0XHRcdC8vIHJldHVybiBpZiB0aGUgbGFzdCBzZWFyY2ggaXMgdGhlIHNhbWU7IGJ1dCBmaWx0ZXIgPT09IGZhbHNlIHdoZW4gdXBkYXRpbmcgdGhlIHNlYXJjaFxuXHRcdFx0Ly8gc2VlIGV4YW1wbGUtd2lkZ2V0LWZpbHRlci5odG1sIGZpbHRlciB0b2dnbGUgYnV0dG9uc1xuXHRcdFx0aWYgKCB0c2YuZXF1YWxGaWx0ZXJzKGMsIGMubGFzdFNlYXJjaCwgY3VycmVudEZpbHRlcnMpICYmIGZpbHRlciAhPT0gZmFsc2UgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH0gZWxzZSBpZiAoIGZpbHRlciA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdC8vIGZvcmNlIGZpbHRlciByZWZyZXNoXG5cdFx0XHRcdGMubGFzdENvbWJpbmVkRmlsdGVyID0gJyc7XG5cdFx0XHRcdGMubGFzdFNlYXJjaCA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0Ly8gZGVmaW5lIGZpbHRlciBpbnNpZGUgaXQgaXMgZmFsc2Vcblx0XHRcdGZpbHRlcnMgPSBmaWx0ZXJzIHx8IFtdO1xuXHRcdFx0Ly8gY29udmVydCBmaWx0ZXJzIHRvIHN0cmluZ3MgLSBzZWUgIzEwNzBcblx0XHRcdGZpbHRlcnMgPSBBcnJheS5wcm90b3R5cGUubWFwID9cblx0XHRcdFx0ZmlsdGVycy5tYXAoIFN0cmluZyApIDpcblx0XHRcdFx0Ly8gZm9yIElFOCAmIG9sZGVyIGJyb3dzZXJzIC0gbWF5YmUgbm90IHRoZSBiZXN0IG1ldGhvZFxuXHRcdFx0XHRmaWx0ZXJzLmpvaW4oICdcXHVmZmZkJyApLnNwbGl0KCAnXFx1ZmZmZCcgKTtcblxuXHRcdFx0aWYgKCB3by5maWx0ZXJfaW5pdGlhbGl6ZWQgKSB7XG5cdFx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnZmlsdGVyU3RhcnQnLCBbIGZpbHRlcnMgXSApO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBjLnNob3dQcm9jZXNzaW5nICkge1xuXHRcdFx0XHQvLyBnaXZlIGl0IHRpbWUgZm9yIHRoZSBwcm9jZXNzaW5nIGljb24gdG8ga2ljayBpblxuXHRcdFx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR0c2YuZmluZFJvd3MoIHRhYmxlLCBmaWx0ZXJzLCBjdXJyZW50RmlsdGVycyApO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSwgMzAgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRzZi5maW5kUm93cyggdGFibGUsIGZpbHRlcnMsIGN1cnJlbnRGaWx0ZXJzICk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGhpZGVGaWx0ZXJzQ2hlY2s6IGZ1bmN0aW9uKCBjICkge1xuXHRcdFx0aWYgKHR5cGVvZiBjLndpZGdldE9wdGlvbnMuZmlsdGVyX2hpZGVGaWx0ZXJzID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHZhciB2YWwgPSBjLndpZGdldE9wdGlvbnMuZmlsdGVyX2hpZGVGaWx0ZXJzKCBjICk7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsID09PSAnYm9vbGVhbicpIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHMuZ2V0RmlsdGVycyggYy4kdGFibGUgKS5qb2luKCAnJyApID09PSAnJztcblx0XHR9LFxuXHRcdGhpZGVGaWx0ZXJzOiBmdW5jdGlvbiggYywgJHRhYmxlICkge1xuXHRcdFx0dmFyIHRpbWVyO1xuXHRcdFx0KCAkdGFibGUgfHwgYy4kdGFibGUgKVxuXHRcdFx0XHQuZmluZCggJy4nICsgdHNjc3MuZmlsdGVyUm93IClcblx0XHRcdFx0LmFkZENsYXNzKCB0c2Nzcy5maWx0ZXJSb3dIaWRlIClcblx0XHRcdFx0LmJpbmQoICdtb3VzZWVudGVyIG1vdXNlbGVhdmUnLCBmdW5jdGlvbiggZSApIHtcblx0XHRcdFx0XHQvLyBzYXZlIGV2ZW50IG9iamVjdCAtIGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzEyMTQwXG5cdFx0XHRcdFx0dmFyIGV2ZW50ID0gZSxcblx0XHRcdFx0XHRcdCRyb3cgPSAkKCB0aGlzICk7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KCB0aW1lciApO1xuXHRcdFx0XHRcdHRpbWVyID0gc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRpZiAoIC9lbnRlcnxvdmVyLy50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRcdFx0XHRcdCRyb3cucmVtb3ZlQ2xhc3MoIHRzY3NzLmZpbHRlclJvd0hpZGUgKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIGRvbid0IGhpZGUgaWYgaW5wdXQgaGFzIGZvY3VzXG5cdFx0XHRcdFx0XHRcdC8vICQoICc6Zm9jdXMnICkgbmVlZHMgalF1ZXJ5IDEuNitcblx0XHRcdFx0XHRcdFx0aWYgKCAkKCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICkuY2xvc2VzdCggJ3RyJyApWzBdICE9PSAkcm93WzBdICkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGRvbid0IGhpZGUgcm93IGlmIGFueSBmaWx0ZXIgaGFzIGEgdmFsdWVcblx0XHRcdFx0XHRcdFx0XHQkcm93LnRvZ2dsZUNsYXNzKCB0c2Nzcy5maWx0ZXJSb3dIaWRlLCB0c2YuaGlkZUZpbHRlcnNDaGVjayggYyApICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCAyMDAgKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmZpbmQoICdpbnB1dCwgc2VsZWN0JyApLmJpbmQoICdmb2N1cyBibHVyJywgZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdFx0dmFyIGV2ZW50ID0gZSxcblx0XHRcdFx0XHRcdCRyb3cgPSAkKCB0aGlzICkuY2xvc2VzdCggJ3RyJyApO1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dCggdGltZXIgKTtcblx0XHRcdFx0XHR0aW1lciA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KCB0aW1lciApO1xuXHRcdFx0XHRcdFx0Ly8gZG9uJ3QgaGlkZSByb3cgaWYgYW55IGZpbHRlciBoYXMgYSB2YWx1ZVxuXHRcdFx0XHRcdFx0JHJvdy50b2dnbGVDbGFzcyggdHNjc3MuZmlsdGVyUm93SGlkZSwgdHNmLmhpZGVGaWx0ZXJzQ2hlY2soIGMgKSAmJiBldmVudC50eXBlICE9PSAnZm9jdXMnICk7XG5cdFx0XHRcdFx0fSwgMjAwICk7XG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0ZGVmYXVsdEZpbHRlcjogZnVuY3Rpb24oIGZpbHRlciwgbWFzayApIHtcblx0XHRcdGlmICggZmlsdGVyID09PSAnJyApIHsgcmV0dXJuIGZpbHRlcjsgfVxuXHRcdFx0dmFyIHJlZ2V4ID0gdHNmUmVnZXguaVF1ZXJ5LFxuXHRcdFx0XHRtYXNrTGVuID0gbWFzay5tYXRjaCggdHNmUmVnZXguaWdRdWVyeSApLmxlbmd0aCxcblx0XHRcdFx0cXVlcnkgPSBtYXNrTGVuID4gMSA/ICQudHJpbSggZmlsdGVyICkuc3BsaXQoIC9cXHMvICkgOiBbICQudHJpbSggZmlsdGVyICkgXSxcblx0XHRcdFx0bGVuID0gcXVlcnkubGVuZ3RoIC0gMSxcblx0XHRcdFx0aW5keCA9IDAsXG5cdFx0XHRcdHZhbCA9IG1hc2s7XG5cdFx0XHRpZiAoIGxlbiA8IDEgJiYgbWFza0xlbiA+IDEgKSB7XG5cdFx0XHRcdC8vIG9ubHkgb25lICd3b3JkJyBpbiBxdWVyeSBidXQgbWFzayBoYXMgPjEgc2xvdHNcblx0XHRcdFx0cXVlcnlbMV0gPSBxdWVyeVswXTtcblx0XHRcdH1cblx0XHRcdC8vIHJlcGxhY2UgYWxsIHtxdWVyeX0gd2l0aCBxdWVyeSB3b3Jkcy4uLlxuXHRcdFx0Ly8gaWYgcXVlcnkgPSAnQm9iJywgdGhlbiBjb252ZXJ0IG1hc2sgZnJvbSAnIXtxdWVyeX0nIHRvICchQm9iJ1xuXHRcdFx0Ly8gaWYgcXVlcnkgPSAnQm9iIEpvZSBGcmFuaycsIHRoZW4gY29udmVydCBtYXNrICd7cX0gT1Ige3F9JyB0byAnQm9iIE9SIEpvZSBPUiBGcmFuaydcblx0XHRcdHdoaWxlICggcmVnZXgudGVzdCggdmFsICkgKSB7XG5cdFx0XHRcdHZhbCA9IHZhbC5yZXBsYWNlKCByZWdleCwgcXVlcnlbaW5keCsrXSB8fCAnJyApO1xuXHRcdFx0XHRpZiAoIHJlZ2V4LnRlc3QoIHZhbCApICYmIGluZHggPCBsZW4gJiYgKCBxdWVyeVtpbmR4XSB8fCAnJyApICE9PSAnJyApIHtcblx0XHRcdFx0XHR2YWwgPSBtYXNrLnJlcGxhY2UoIHJlZ2V4LCB2YWwgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHZhbDtcblx0XHR9LFxuXHRcdGdldExhdGVzdFNlYXJjaDogZnVuY3Rpb24oICRpbnB1dCApIHtcblx0XHRcdGlmICggJGlucHV0ICkge1xuXHRcdFx0XHRyZXR1cm4gJGlucHV0LnNvcnQoIGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdFx0XHRcdHJldHVybiAkKCBiICkuYXR0ciggJ2RhdGEtbGFzdFNlYXJjaFRpbWUnICkgLSAkKCBhICkuYXR0ciggJ2RhdGEtbGFzdFNlYXJjaFRpbWUnICk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICRpbnB1dCB8fCAkKCk7XG5cdFx0fSxcblx0XHRmaW5kUmFuZ2U6IGZ1bmN0aW9uKCBjLCB2YWwsIGlnbm9yZVJhbmdlcyApIHtcblx0XHRcdC8vIGxvb2sgZm9yIG11bHRpcGxlIGNvbHVtbnMgJzEtMyw0LTYsOCcgaW4gZGF0YS1jb2x1bW5cblx0XHRcdHZhciB0ZW1wLCByYW5nZXMsIHJhbmdlLCBzdGFydCwgZW5kLCBzaW5nbGVzLCBpLCBpbmR4LCBsZW4sXG5cdFx0XHRcdGNvbHVtbnMgPSBbXTtcblx0XHRcdGlmICggL15bMC05XSskLy50ZXN0KCB2YWwgKSApIHtcblx0XHRcdFx0Ly8gYWx3YXlzIHJldHVybiBhbiBhcnJheVxuXHRcdFx0XHRyZXR1cm4gWyBwYXJzZUludCggdmFsLCAxMCApIF07XG5cdFx0XHR9XG5cdFx0XHQvLyBwcm9jZXNzIGNvbHVtbiByYW5nZVxuXHRcdFx0aWYgKCAhaWdub3JlUmFuZ2VzICYmIC8tLy50ZXN0KCB2YWwgKSApIHtcblx0XHRcdFx0cmFuZ2VzID0gdmFsLm1hdGNoKCAvKFxcZCspXFxzKi1cXHMqKFxcZCspL2cgKTtcblx0XHRcdFx0bGVuID0gcmFuZ2VzID8gcmFuZ2VzLmxlbmd0aCA6IDA7XG5cdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0cmFuZ2UgPSByYW5nZXNbaW5keF0uc3BsaXQoIC9cXHMqLVxccyovICk7XG5cdFx0XHRcdFx0c3RhcnQgPSBwYXJzZUludCggcmFuZ2VbMF0sIDEwICkgfHwgMDtcblx0XHRcdFx0XHRlbmQgPSBwYXJzZUludCggcmFuZ2VbMV0sIDEwICkgfHwgKCBjLmNvbHVtbnMgLSAxICk7XG5cdFx0XHRcdFx0aWYgKCBzdGFydCA+IGVuZCApIHtcblx0XHRcdFx0XHRcdHRlbXAgPSBzdGFydDsgc3RhcnQgPSBlbmQ7IGVuZCA9IHRlbXA7IC8vIHN3YXBcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBlbmQgPj0gYy5jb2x1bW5zICkge1xuXHRcdFx0XHRcdFx0ZW5kID0gYy5jb2x1bW5zIC0gMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yICggOyBzdGFydCA8PSBlbmQ7IHN0YXJ0KysgKSB7XG5cdFx0XHRcdFx0XHRjb2x1bW5zWyBjb2x1bW5zLmxlbmd0aCBdID0gc3RhcnQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHJlbW92ZSBwcm9jZXNzZWQgcmFuZ2UgZnJvbSB2YWxcblx0XHRcdFx0XHR2YWwgPSB2YWwucmVwbGFjZSggcmFuZ2VzWyBpbmR4IF0sICcnICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIHByb2Nlc3Mgc2luZ2xlIGNvbHVtbnNcblx0XHRcdGlmICggIWlnbm9yZVJhbmdlcyAmJiAvLC8udGVzdCggdmFsICkgKSB7XG5cdFx0XHRcdHNpbmdsZXMgPSB2YWwuc3BsaXQoIC9cXHMqLFxccyovICk7XG5cdFx0XHRcdGxlbiA9IHNpbmdsZXMubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRcdGlmICggc2luZ2xlc1sgaSBdICE9PSAnJyApIHtcblx0XHRcdFx0XHRcdGluZHggPSBwYXJzZUludCggc2luZ2xlc1sgaSBdLCAxMCApO1xuXHRcdFx0XHRcdFx0aWYgKCBpbmR4IDwgYy5jb2x1bW5zICkge1xuXHRcdFx0XHRcdFx0XHRjb2x1bW5zWyBjb2x1bW5zLmxlbmd0aCBdID0gaW5keDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIHJldHVybiBhbGwgY29sdW1uc1xuXHRcdFx0aWYgKCAhY29sdW1ucy5sZW5ndGggKSB7XG5cdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgYy5jb2x1bW5zOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0Y29sdW1uc1sgY29sdW1ucy5sZW5ndGggXSA9IGluZHg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjb2x1bW5zO1xuXHRcdH0sXG5cdFx0Z2V0Q29sdW1uRWxtOiBmdW5jdGlvbiggYywgJGVsZW1lbnRzLCBjb2x1bW4gKSB7XG5cdFx0XHQvLyBkYXRhLWNvbHVtbiBtYXkgY29udGFpbiBtdWx0aXBsZSBjb2x1bW5zICcxLTMsNS02LDgnXG5cdFx0XHQvLyByZXBsYWNlczogYy4kZmlsdGVycy5maWx0ZXIoICdbZGF0YS1jb2x1bW49XCInICsgY29sdW1uICsgJ1wiXScgKTtcblx0XHRcdHJldHVybiAkZWxlbWVudHMuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGNvbHMgPSB0c2YuZmluZFJhbmdlKCBjLCAkKCB0aGlzICkuYXR0ciggJ2RhdGEtY29sdW1uJyApICk7XG5cdFx0XHRcdHJldHVybiAkLmluQXJyYXkoIGNvbHVtbiwgY29scyApID4gLTE7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdG11bHRpcGxlQ29sdW1uczogZnVuY3Rpb24oIGMsICRpbnB1dCApIHtcblx0XHRcdC8vIGxvb2sgZm9yIG11bHRpcGxlIGNvbHVtbnMgJzEtMyw0LTYsOCcgaW4gZGF0YS1jb2x1bW5cblx0XHRcdHZhciB3byA9IGMud2lkZ2V0T3B0aW9ucyxcblx0XHRcdFx0Ly8gb25seSB0YXJnZXQgJ2FsbCcgY29sdW1uIGlucHV0cyBvbiBpbml0aWFsaXphdGlvblxuXHRcdFx0XHQvLyAmIGRvbid0IHRhcmdldCAnYWxsJyBjb2x1bW4gaW5wdXRzIGlmIHRoZXkgZG9uJ3QgZXhpc3Rcblx0XHRcdFx0dGFyZ2V0cyA9IHdvLmZpbHRlcl9pbml0aWFsaXplZCB8fCAhJGlucHV0LmZpbHRlciggd28uZmlsdGVyX2FueUNvbHVtblNlbGVjdG9yICkubGVuZ3RoLFxuXHRcdFx0XHR2YWwgPSAkLnRyaW0oIHRzZi5nZXRMYXRlc3RTZWFyY2goICRpbnB1dCApLmF0dHIoICdkYXRhLWNvbHVtbicgKSB8fCAnJyApO1xuXHRcdFx0cmV0dXJuIHRzZi5maW5kUmFuZ2UoIGMsIHZhbCwgIXRhcmdldHMgKTtcblx0XHR9LFxuXHRcdHByb2Nlc3NUeXBlczogZnVuY3Rpb24oIGMsIGRhdGEsIHZhcnMgKSB7XG5cdFx0XHR2YXIgZmZ4bixcblx0XHRcdFx0ZmlsdGVyTWF0Y2hlZCA9IG51bGwsXG5cdFx0XHRcdG1hdGNoZXMgPSBudWxsO1xuXHRcdFx0Zm9yICggZmZ4biBpbiB0c2YudHlwZXMgKSB7XG5cdFx0XHRcdGlmICggJC5pbkFycmF5KCBmZnhuLCB2YXJzLmV4Y2x1ZGVNYXRjaCApIDwgMCAmJiBtYXRjaGVzID09PSBudWxsICkge1xuXHRcdFx0XHRcdG1hdGNoZXMgPSB0c2YudHlwZXNbZmZ4bl0oIGMsIGRhdGEsIHZhcnMgKTtcblx0XHRcdFx0XHRpZiAoIG1hdGNoZXMgIT09IG51bGwgKSB7XG5cdFx0XHRcdFx0XHRkYXRhLm1hdGNoZWRPbiA9IGZmeG47XG5cdFx0XHRcdFx0XHRmaWx0ZXJNYXRjaGVkID0gbWF0Y2hlcztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmaWx0ZXJNYXRjaGVkO1xuXHRcdH0sXG5cdFx0bWF0Y2hUeXBlOiBmdW5jdGlvbiggYywgY29sdW1uSW5kZXggKSB7XG5cdFx0XHR2YXIgaXNNYXRjaCxcblx0XHRcdFx0d28gPSBjLndpZGdldE9wdGlvbnMsXG5cdFx0XHRcdCRlbCA9IGMuJGhlYWRlckluZGV4ZWRbIGNvbHVtbkluZGV4IF07XG5cdFx0XHQvLyBmaWx0ZXItZXhhY3QgPiBmaWx0ZXItbWF0Y2ggPiBmaWx0ZXJfbWF0Y2hUeXBlIGZvciB0eXBlXG5cdFx0XHRpZiAoICRlbC5oYXNDbGFzcyggJ2ZpbHRlci1leGFjdCcgKSApIHtcblx0XHRcdFx0aXNNYXRjaCA9IGZhbHNlO1xuXHRcdFx0fSBlbHNlIGlmICggJGVsLmhhc0NsYXNzKCAnZmlsdGVyLW1hdGNoJyApICkge1xuXHRcdFx0XHRpc01hdGNoID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGZpbHRlci1zZWxlY3QgaXMgbm90IGFwcGxpZWQgd2hlbiBmaWx0ZXJfZnVuY3Rpb25zIGFyZSB1c2VkLCBzbyBsb29rIGZvciBhIHNlbGVjdFxuXHRcdFx0XHRpZiAoIHdvLmZpbHRlcl9jb2x1bW5GaWx0ZXJzICkge1xuXHRcdFx0XHRcdCRlbCA9IGMuJGZpbHRlcnNcblx0XHRcdFx0XHRcdC5maW5kKCAnLicgKyB0c2Nzcy5maWx0ZXIgKVxuXHRcdFx0XHRcdFx0LmFkZCggd28uZmlsdGVyXyRleHRlcm5hbEZpbHRlcnMgKVxuXHRcdFx0XHRcdFx0LmZpbHRlciggJ1tkYXRhLWNvbHVtbj1cIicgKyBjb2x1bW5JbmRleCArICdcIl0nICk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHdvLmZpbHRlcl8kZXh0ZXJuYWxGaWx0ZXJzICkge1xuXHRcdFx0XHRcdCRlbCA9IHdvLmZpbHRlcl8kZXh0ZXJuYWxGaWx0ZXJzLmZpbHRlciggJ1tkYXRhLWNvbHVtbj1cIicgKyBjb2x1bW5JbmRleCArICdcIl0nICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aXNNYXRjaCA9ICRlbC5sZW5ndGggP1xuXHRcdFx0XHRcdGMud2lkZ2V0T3B0aW9ucy5maWx0ZXJfbWF0Y2hUeXBlWyAoICRlbFsgMCBdLm5vZGVOYW1lIHx8ICcnICkudG9Mb3dlckNhc2UoKSBdID09PSAnbWF0Y2gnIDpcblx0XHRcdFx0XHQvLyBkZWZhdWx0IHRvIGV4YWN0LCBpZiBubyBpbnB1dHMgZm91bmRcblx0XHRcdFx0XHRmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBpc01hdGNoO1xuXHRcdH0sXG5cdFx0cHJvY2Vzc1JvdzogZnVuY3Rpb24oIGMsIGRhdGEsIHZhcnMgKSB7XG5cdFx0XHR2YXIgcmVzdWx0LCBmaWx0ZXJNYXRjaGVkLFxuXHRcdFx0XHRmeG4sIGZmeG4sIHR4dCxcblx0XHRcdFx0d28gPSBjLndpZGdldE9wdGlvbnMsXG5cdFx0XHRcdHNob3dSb3cgPSB0cnVlLFxuXHRcdFx0XHRoYXNBbnlNYXRjaElucHV0ID0gd28uZmlsdGVyXyRhbnlNYXRjaCAmJiB3by5maWx0ZXJfJGFueU1hdGNoLmxlbmd0aCxcblxuXHRcdFx0XHQvLyBpZiB3by5maWx0ZXJfJGFueU1hdGNoIGRhdGEtY29sdW1uIGF0dHJpYnV0ZSBpcyBjaGFuZ2VkIGR5bmFtaWNhbGx5XG5cdFx0XHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZG8gYW4gXCJhbnlNYXRjaFwiIHNlYXJjaCBvbiBvbmUgY29sdW1uIHVzaW5nIGRhdGFcblx0XHRcdFx0Ly8gZm9yIHRoZSBlbnRpcmUgcm93IC0gc2VlICM5OThcblx0XHRcdFx0Y29sdW1uSW5kZXggPSB3by5maWx0ZXJfJGFueU1hdGNoICYmIHdvLmZpbHRlcl8kYW55TWF0Y2gubGVuZ3RoID9cblx0XHRcdFx0XHQvLyBsb29rIGZvciBtdWx0aXBsZSBjb2x1bW5zICcxLTMsNC02LDgnXG5cdFx0XHRcdFx0dHNmLm11bHRpcGxlQ29sdW1ucyggYywgd28uZmlsdGVyXyRhbnlNYXRjaCApIDpcblx0XHRcdFx0XHRbXTtcblx0XHRcdGRhdGEuJGNlbGxzID0gZGF0YS4kcm93LmNoaWxkcmVuKCk7XG5cdFx0XHRkYXRhLm1hdGNoZWRPbiA9IG51bGw7XG5cdFx0XHRpZiAoIGRhdGEuYW55TWF0Y2hGbGFnICYmIGNvbHVtbkluZGV4Lmxlbmd0aCA+IDEgfHwgKCBkYXRhLmFueU1hdGNoRmlsdGVyICYmICFoYXNBbnlNYXRjaElucHV0ICkgKSB7XG5cdFx0XHRcdGRhdGEuYW55TWF0Y2ggPSB0cnVlO1xuXHRcdFx0XHRkYXRhLmlzTWF0Y2ggPSB0cnVlO1xuXHRcdFx0XHRkYXRhLnJvd0FycmF5ID0gZGF0YS4kY2VsbHMubWFwKCBmdW5jdGlvbiggaSApIHtcblx0XHRcdFx0XHRpZiAoICQuaW5BcnJheSggaSwgY29sdW1uSW5kZXggKSA+IC0xIHx8ICggZGF0YS5hbnlNYXRjaEZpbHRlciAmJiAhaGFzQW55TWF0Y2hJbnB1dCApICkge1xuXHRcdFx0XHRcdFx0aWYgKCBkYXRhLnBhcnNlZFsgaSBdICkge1xuXHRcdFx0XHRcdFx0XHR0eHQgPSBkYXRhLmNhY2hlQXJyYXlbIGkgXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHR4dCA9IGRhdGEucmF3QXJyYXlbIGkgXTtcblx0XHRcdFx0XHRcdFx0dHh0ID0gJC50cmltKCB3by5maWx0ZXJfaWdub3JlQ2FzZSA/IHR4dC50b0xvd2VyQ2FzZSgpIDogdHh0ICk7XG5cdFx0XHRcdFx0XHRcdGlmICggYy5zb3J0TG9jYWxlQ29tcGFyZSApIHtcblx0XHRcdFx0XHRcdFx0XHR0eHQgPSB0cy5yZXBsYWNlQWNjZW50cyggdHh0ICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB0eHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KS5nZXQoKTtcblx0XHRcdFx0ZGF0YS5maWx0ZXIgPSBkYXRhLmFueU1hdGNoRmlsdGVyO1xuXHRcdFx0XHRkYXRhLmlGaWx0ZXIgPSBkYXRhLmlBbnlNYXRjaEZpbHRlcjtcblx0XHRcdFx0ZGF0YS5leGFjdCA9IGRhdGEucm93QXJyYXkuam9pbiggJyAnICk7XG5cdFx0XHRcdGRhdGEuaUV4YWN0ID0gd28uZmlsdGVyX2lnbm9yZUNhc2UgPyBkYXRhLmV4YWN0LnRvTG93ZXJDYXNlKCkgOiBkYXRhLmV4YWN0O1xuXHRcdFx0XHRkYXRhLmNhY2hlID0gZGF0YS5jYWNoZUFycmF5LnNsaWNlKCAwLCAtMSApLmpvaW4oICcgJyApO1xuXHRcdFx0XHR2YXJzLmV4Y2x1ZGVNYXRjaCA9IHZhcnMubm9BbnlNYXRjaDtcblx0XHRcdFx0ZmlsdGVyTWF0Y2hlZCA9IHRzZi5wcm9jZXNzVHlwZXMoIGMsIGRhdGEsIHZhcnMgKTtcblx0XHRcdFx0aWYgKCBmaWx0ZXJNYXRjaGVkICE9PSBudWxsICkge1xuXHRcdFx0XHRcdHNob3dSb3cgPSBmaWx0ZXJNYXRjaGVkO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICggd28uZmlsdGVyX3N0YXJ0c1dpdGggKSB7XG5cdFx0XHRcdFx0XHRzaG93Um93ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHQvLyBkYXRhLnJvd0FycmF5IG1heSBub3QgY29udGFpbiBhbGwgY29sdW1uc1xuXHRcdFx0XHRcdFx0Y29sdW1uSW5kZXggPSBNYXRoLm1pbiggYy5jb2x1bW5zLCBkYXRhLnJvd0FycmF5Lmxlbmd0aCApO1xuXHRcdFx0XHRcdFx0d2hpbGUgKCAhc2hvd1JvdyAmJiBjb2x1bW5JbmRleCA+IDAgKSB7XG5cdFx0XHRcdFx0XHRcdGNvbHVtbkluZGV4LS07XG5cdFx0XHRcdFx0XHRcdHNob3dSb3cgPSBzaG93Um93IHx8IGRhdGEucm93QXJyYXlbIGNvbHVtbkluZGV4IF0uaW5kZXhPZiggZGF0YS5pRmlsdGVyICkgPT09IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHNob3dSb3cgPSAoIGRhdGEuaUV4YWN0ICsgZGF0YS5jaGlsZFJvd1RleHQgKS5pbmRleE9mKCBkYXRhLmlGaWx0ZXIgKSA+PSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhLmFueU1hdGNoID0gZmFsc2U7XG5cdFx0XHRcdC8vIG5vIG90aGVyIGZpbHRlcnMgdG8gcHJvY2Vzc1xuXHRcdFx0XHRpZiAoIGRhdGEuZmlsdGVycy5qb2luKCAnJyApID09PSBkYXRhLmZpbHRlciApIHtcblx0XHRcdFx0XHRyZXR1cm4gc2hvd1Jvdztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKCBjb2x1bW5JbmRleCA9IDA7IGNvbHVtbkluZGV4IDwgYy5jb2x1bW5zOyBjb2x1bW5JbmRleCsrICkge1xuXHRcdFx0XHRkYXRhLmZpbHRlciA9IGRhdGEuZmlsdGVyc1sgY29sdW1uSW5kZXggXTtcblx0XHRcdFx0ZGF0YS5pbmRleCA9IGNvbHVtbkluZGV4O1xuXG5cdFx0XHRcdC8vIGZpbHRlciB0eXBlcyB0byBleGNsdWRlLCBwZXIgY29sdW1uXG5cdFx0XHRcdHZhcnMuZXhjbHVkZU1hdGNoID0gdmFycy5leGNsdWRlRmlsdGVyWyBjb2x1bW5JbmRleCBdO1xuXG5cdFx0XHRcdC8vIGlnbm9yZSBpZiBmaWx0ZXIgaXMgZW1wdHkgb3IgZGlzYWJsZWRcblx0XHRcdFx0aWYgKCBkYXRhLmZpbHRlciApIHtcblx0XHRcdFx0XHRkYXRhLmNhY2hlID0gZGF0YS5jYWNoZUFycmF5WyBjb2x1bW5JbmRleCBdO1xuXHRcdFx0XHRcdHJlc3VsdCA9IGRhdGEucGFyc2VkWyBjb2x1bW5JbmRleCBdID8gZGF0YS5jYWNoZSA6IGRhdGEucmF3QXJyYXlbIGNvbHVtbkluZGV4IF0gfHwgJyc7XG5cdFx0XHRcdFx0ZGF0YS5leGFjdCA9IGMuc29ydExvY2FsZUNvbXBhcmUgPyB0cy5yZXBsYWNlQWNjZW50cyggcmVzdWx0ICkgOiByZXN1bHQ7IC8vIGlzc3VlICM0MDVcblx0XHRcdFx0XHRkYXRhLmlFeGFjdCA9ICF0c2ZSZWdleC50eXBlLnRlc3QoIHR5cGVvZiBkYXRhLmV4YWN0ICkgJiYgd28uZmlsdGVyX2lnbm9yZUNhc2UgP1xuXHRcdFx0XHRcdFx0ZGF0YS5leGFjdC50b0xvd2VyQ2FzZSgpIDogZGF0YS5leGFjdDtcblx0XHRcdFx0XHRkYXRhLmlzTWF0Y2ggPSB0c2YubWF0Y2hUeXBlKCBjLCBjb2x1bW5JbmRleCApO1xuXG5cdFx0XHRcdFx0cmVzdWx0ID0gc2hvd1JvdzsgLy8gaWYgc2hvd1JvdyBpcyB0cnVlLCBzaG93IHRoYXQgcm93XG5cblx0XHRcdFx0XHQvLyBpbiBjYXNlIHNlbGVjdCBmaWx0ZXIgb3B0aW9uIGhhcyBhIGRpZmZlcmVudCB2YWx1ZSB2cyB0ZXh0ICdhIC0genxBIHRocm91Z2ggWidcblx0XHRcdFx0XHRmZnhuID0gd28uZmlsdGVyX2NvbHVtbkZpbHRlcnMgP1xuXHRcdFx0XHRcdFx0Yy4kZmlsdGVycy5hZGQoIHdvLmZpbHRlcl8kZXh0ZXJuYWxGaWx0ZXJzIClcblx0XHRcdFx0XHRcdFx0LmZpbHRlciggJ1tkYXRhLWNvbHVtbj1cIicgKyBjb2x1bW5JbmRleCArICdcIl0nIClcblx0XHRcdFx0XHRcdFx0LmZpbmQoICdzZWxlY3Qgb3B0aW9uOnNlbGVjdGVkJyApXG5cdFx0XHRcdFx0XHRcdC5hdHRyKCAnZGF0YS1mdW5jdGlvbi1uYW1lJyApIHx8ICcnIDogJyc7XG5cdFx0XHRcdFx0Ly8gcmVwbGFjZSBhY2NlbnRzIC0gc2VlICMzNTdcblx0XHRcdFx0XHRpZiAoIGMuc29ydExvY2FsZUNvbXBhcmUgKSB7XG5cdFx0XHRcdFx0XHRkYXRhLmZpbHRlciA9IHRzLnJlcGxhY2VBY2NlbnRzKCBkYXRhLmZpbHRlciApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIHJlcGxhY2UgY29sdW1uIHNwZWNpZmljIGRlZmF1bHQgZmlsdGVycyAtIHNlZSAjMTA4OFxuXHRcdFx0XHRcdGlmICggd28uZmlsdGVyX2RlZmF1bHRGaWx0ZXIgJiYgdHNmUmVnZXguaVF1ZXJ5LnRlc3QoIHZhcnMuZGVmYXVsdENvbEZpbHRlclsgY29sdW1uSW5kZXggXSApICkge1xuXHRcdFx0XHRcdFx0ZGF0YS5maWx0ZXIgPSB0c2YuZGVmYXVsdEZpbHRlciggZGF0YS5maWx0ZXIsIHZhcnMuZGVmYXVsdENvbEZpbHRlclsgY29sdW1uSW5kZXggXSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGRhdGEuaUZpbHRlciA9IGNhc2UgaW5zZW5zaXRpdmUgKCBpZiB3by5maWx0ZXJfaWdub3JlQ2FzZSBpcyB0cnVlICksXG5cdFx0XHRcdFx0Ly8gZGF0YS5maWx0ZXIgPSBjYXNlIHNlbnNpdGl2ZVxuXHRcdFx0XHRcdGRhdGEuaUZpbHRlciA9IHdvLmZpbHRlcl9pZ25vcmVDYXNlID8gKCBkYXRhLmZpbHRlciB8fCAnJyApLnRvTG93ZXJDYXNlKCkgOiBkYXRhLmZpbHRlcjtcblx0XHRcdFx0XHRmeG4gPSB2YXJzLmZ1bmN0aW9uc1sgY29sdW1uSW5kZXggXTtcblx0XHRcdFx0XHRmaWx0ZXJNYXRjaGVkID0gbnVsbDtcblx0XHRcdFx0XHRpZiAoIGZ4biApIHtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIGZ4biA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdFx0XHRcdFx0Ly8gZmlsdGVyIGNhbGxiYWNrKCBleGFjdCBjZWxsIGNvbnRlbnQsIHBhcnNlciBub3JtYWxpemVkIGNvbnRlbnQsXG5cdFx0XHRcdFx0XHRcdC8vIGZpbHRlciBpbnB1dCB2YWx1ZSwgY29sdW1uIGluZGV4LCBqUXVlcnkgcm93IG9iamVjdCApXG5cdFx0XHRcdFx0XHRcdGZpbHRlck1hdGNoZWQgPSBmeG4oIGRhdGEuZXhhY3QsIGRhdGEuY2FjaGUsIGRhdGEuZmlsdGVyLCBjb2x1bW5JbmRleCwgZGF0YS4kcm93LCBjLCBkYXRhICk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgZnhuWyBmZnhuIHx8IGRhdGEuZmlsdGVyIF0gPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHNlbGVjdG9yIG9wdGlvbiBmdW5jdGlvblxuXHRcdFx0XHRcdFx0XHR0eHQgPSBmZnhuIHx8IGRhdGEuZmlsdGVyO1xuXHRcdFx0XHRcdFx0XHRmaWx0ZXJNYXRjaGVkID1cblx0XHRcdFx0XHRcdFx0XHRmeG5bIHR4dCBdKCBkYXRhLmV4YWN0LCBkYXRhLmNhY2hlLCBkYXRhLmZpbHRlciwgY29sdW1uSW5kZXgsIGRhdGEuJHJvdywgYywgZGF0YSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIGZpbHRlck1hdGNoZWQgPT09IG51bGwgKSB7XG5cdFx0XHRcdFx0XHQvLyBjeWNsZSB0aHJvdWdoIHRoZSBkaWZmZXJlbnQgZmlsdGVyc1xuXHRcdFx0XHRcdFx0Ly8gZmlsdGVycyByZXR1cm4gYSBib29sZWFuIG9yIG51bGwgaWYgbm90aGluZyBtYXRjaGVzXG5cdFx0XHRcdFx0XHRmaWx0ZXJNYXRjaGVkID0gdHNmLnByb2Nlc3NUeXBlcyggYywgZGF0YSwgdmFycyApO1xuXHRcdFx0XHRcdFx0Ly8gc2VsZWN0IHdpdGggZXhhY3QgbWF0Y2g7IGlnbm9yZSBcImFuZFwiIG9yIFwib3JcIiB3aXRoaW4gdGhlIHRleHQ7IGZpeGVzICMxNDg2XG5cdFx0XHRcdFx0XHR0eHQgPSBmeG4gPT09IHRydWUgJiYgKGRhdGEubWF0Y2hlZE9uID09PSAnYW5kJyB8fCBkYXRhLm1hdGNoZWRPbiA9PT0gJ29yJyk7XG5cdFx0XHRcdFx0XHRpZiAoIGZpbHRlck1hdGNoZWQgIT09IG51bGwgJiYgIXR4dCkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBmaWx0ZXJNYXRjaGVkO1xuXHRcdFx0XHRcdFx0Ly8gTG9vayBmb3IgbWF0Y2gsIGFuZCBhZGQgY2hpbGQgcm93IGRhdGEgZm9yIG1hdGNoaW5nXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyBjaGVjayBmeG4gKGZpbHRlci1zZWxlY3QgaW4gaGVhZGVyKSBhZnRlciBmaWx0ZXIgdHlwZXMgYXJlIGNoZWNrZWRcblx0XHRcdFx0XHRcdFx0Ly8gd2l0aG91dCB0aGlzLCB0aGUgZmlsdGVyICsgalF1ZXJ5IFVJIHNlbGVjdG1lbnUgZGVtbyB3YXMgYnJlYWtpbmdcblx0XHRcdFx0XHRcdFx0aWYgKCBmeG4gPT09IHRydWUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZGVmYXVsdCBzZWxlY3RvciB1c2VzIGV4YWN0IG1hdGNoIHVubGVzcyAnZmlsdGVyLW1hdGNoJyBjbGFzcyBpcyBmb3VuZFxuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IGRhdGEuaXNNYXRjaCA/XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBkYXRhLmlFeGFjdCBtYXkgYmUgYSBudW1iZXJcblx0XHRcdFx0XHRcdFx0XHRcdCggJycgKyBkYXRhLmlFeGFjdCApLnNlYXJjaCggZGF0YS5pRmlsdGVyICkgPj0gMCA6XG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhLmZpbHRlciA9PT0gZGF0YS5leGFjdDtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0eHQgPSAoIGRhdGEuaUV4YWN0ICsgZGF0YS5jaGlsZFJvd1RleHQgKS5pbmRleE9mKCB0c2YucGFyc2VGaWx0ZXIoIGMsIGRhdGEuaUZpbHRlciwgZGF0YSApICk7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gKCAoICF3by5maWx0ZXJfc3RhcnRzV2l0aCAmJiB0eHQgPj0gMCApIHx8ICggd28uZmlsdGVyX3N0YXJ0c1dpdGggJiYgdHh0ID09PSAwICkgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBmaWx0ZXJNYXRjaGVkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzaG93Um93ID0gKCByZXN1bHQgKSA/IHNob3dSb3cgOiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHNob3dSb3c7XG5cdFx0fSxcblx0XHRmaW5kUm93czogZnVuY3Rpb24oIHRhYmxlLCBmaWx0ZXJzLCBjdXJyZW50RmlsdGVycyApIHtcblx0XHRcdGlmIChcblx0XHRcdFx0dHNmLmVxdWFsRmlsdGVycyh0YWJsZS5jb25maWcsIHRhYmxlLmNvbmZpZy5sYXN0U2VhcmNoLCBjdXJyZW50RmlsdGVycykgfHxcblx0XHRcdFx0IXRhYmxlLmNvbmZpZy53aWRnZXRPcHRpb25zLmZpbHRlcl9pbml0aWFsaXplZFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBsZW4sIG5vcm1fcm93cywgcm93RGF0YSwgJHJvd3MsICRyb3csIHJvd0luZGV4LCB0Ym9keUluZGV4LCAkdGJvZHksIGNvbHVtbkluZGV4LFxuXHRcdFx0XHRpc0NoaWxkLCBjaGlsZFJvdywgbGFzdFNlYXJjaCwgc2hvd1Jvdywgc2hvd1BhcmVudCwgdGltZSwgdmFsLCBpbmR4LFxuXHRcdFx0XHRub3RGaWx0ZXJlZCwgc2VhcmNoRmlsdGVyZWQsIHF1ZXJ5LCBpbmplY3RlZCwgcmVzLCBpZCwgdHh0LFxuXHRcdFx0XHRzdG9yZWRGaWx0ZXJzID0gJC5leHRlbmQoIFtdLCBmaWx0ZXJzICksXG5cdFx0XHRcdGMgPSB0YWJsZS5jb25maWcsXG5cdFx0XHRcdHdvID0gYy53aWRnZXRPcHRpb25zLFxuXHRcdFx0XHQvLyBkYXRhIG9iamVjdCBwYXNzZWQgdG8gZmlsdGVyczsgYW55TWF0Y2ggaXMgYSBmbGFnIGZvciB0aGUgZmlsdGVyc1xuXHRcdFx0XHRkYXRhID0ge1xuXHRcdFx0XHRcdGFueU1hdGNoOiBmYWxzZSxcblx0XHRcdFx0XHRmaWx0ZXJzOiBmaWx0ZXJzLFxuXHRcdFx0XHRcdC8vIHJlZ2V4IGZpbHRlciB0eXBlIGNhY2hlXG5cdFx0XHRcdFx0ZmlsdGVyX3JlZ2V4Q2FjaGUgOiBbXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR2YXJzID0ge1xuXHRcdFx0XHRcdC8vIGFueU1hdGNoIHJlYWxseSBzY3Jld3MgdXAgd2l0aCB0aGVzZSB0eXBlcyBvZiBmaWx0ZXJzXG5cdFx0XHRcdFx0bm9BbnlNYXRjaDogWyAncmFuZ2UnLCAgJ29wZXJhdG9ycycgXSxcblx0XHRcdFx0XHQvLyBjYWNoZSBmaWx0ZXIgdmFyaWFibGVzIHRoYXQgdXNlIHRzLmdldENvbHVtbkRhdGEgaW4gdGhlIG1haW4gbG9vcFxuXHRcdFx0XHRcdGZ1bmN0aW9ucyA6IFtdLFxuXHRcdFx0XHRcdGV4Y2x1ZGVGaWx0ZXIgOiBbXSxcblx0XHRcdFx0XHRkZWZhdWx0Q29sRmlsdGVyIDogW10sXG5cdFx0XHRcdFx0ZGVmYXVsdEFueUZpbHRlciA6IHRzLmdldENvbHVtbkRhdGEoIHRhYmxlLCB3by5maWx0ZXJfZGVmYXVsdEZpbHRlciwgYy5jb2x1bW5zLCB0cnVlICkgfHwgJydcblx0XHRcdFx0fTtcblxuXHRcdFx0Ly8gcGFyc2UgY29sdW1ucyBhZnRlciBmb3JtYXR0ZXIsIGluIGNhc2UgdGhlIGNsYXNzIGlzIGFkZGVkIGF0IHRoYXQgcG9pbnRcblx0XHRcdGRhdGEucGFyc2VkID0gW107XG5cdFx0XHRmb3IgKCBjb2x1bW5JbmRleCA9IDA7IGNvbHVtbkluZGV4IDwgYy5jb2x1bW5zOyBjb2x1bW5JbmRleCsrICkge1xuXHRcdFx0XHRkYXRhLnBhcnNlZFsgY29sdW1uSW5kZXggXSA9IHdvLmZpbHRlcl91c2VQYXJzZWREYXRhIHx8XG5cdFx0XHRcdFx0Ly8gcGFyc2VyIGhhcyBhIFwicGFyc2VkXCIgcGFyYW1ldGVyXG5cdFx0XHRcdFx0KCBjLnBhcnNlcnMgJiYgYy5wYXJzZXJzWyBjb2x1bW5JbmRleCBdICYmIGMucGFyc2Vyc1sgY29sdW1uSW5kZXggXS5wYXJzZWQgfHxcblx0XHRcdFx0XHQvLyBnZXREYXRhIG1heSBub3QgcmV0dXJuICdwYXJzZWQnIGlmIG90aGVyICdmaWx0ZXItJyBjbGFzcyBuYW1lcyBleGlzdFxuXHRcdFx0XHRcdC8vICggZS5nLiA8dGggY2xhc3M9XCJmaWx0ZXItc2VsZWN0IGZpbHRlci1wYXJzZWRcIj4gKVxuXHRcdFx0XHRcdHRzLmdldERhdGEgJiYgdHMuZ2V0RGF0YSggYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uSW5kZXggXSxcblx0XHRcdFx0XHRcdHRzLmdldENvbHVtbkRhdGEoIHRhYmxlLCBjLmhlYWRlcnMsIGNvbHVtbkluZGV4ICksICdmaWx0ZXInICkgPT09ICdwYXJzZWQnIHx8XG5cdFx0XHRcdFx0Yy4kaGVhZGVySW5kZXhlZFsgY29sdW1uSW5kZXggXS5oYXNDbGFzcyggJ2ZpbHRlci1wYXJzZWQnICkgKTtcblxuXHRcdFx0XHR2YXJzLmZ1bmN0aW9uc1sgY29sdW1uSW5kZXggXSA9XG5cdFx0XHRcdFx0dHMuZ2V0Q29sdW1uRGF0YSggdGFibGUsIHdvLmZpbHRlcl9mdW5jdGlvbnMsIGNvbHVtbkluZGV4ICkgfHxcblx0XHRcdFx0XHRjLiRoZWFkZXJJbmRleGVkWyBjb2x1bW5JbmRleCBdLmhhc0NsYXNzKCAnZmlsdGVyLXNlbGVjdCcgKTtcblx0XHRcdFx0dmFycy5kZWZhdWx0Q29sRmlsdGVyWyBjb2x1bW5JbmRleCBdID1cblx0XHRcdFx0XHR0cy5nZXRDb2x1bW5EYXRhKCB0YWJsZSwgd28uZmlsdGVyX2RlZmF1bHRGaWx0ZXIsIGNvbHVtbkluZGV4ICkgfHwgJyc7XG5cdFx0XHRcdHZhcnMuZXhjbHVkZUZpbHRlclsgY29sdW1uSW5kZXggXSA9XG5cdFx0XHRcdFx0KCB0cy5nZXRDb2x1bW5EYXRhKCB0YWJsZSwgd28uZmlsdGVyX2V4Y2x1ZGVGaWx0ZXIsIGNvbHVtbkluZGV4LCB0cnVlICkgfHwgJycgKS5zcGxpdCggL1xccysvICk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggYy5kZWJ1ZyApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coICdGaWx0ZXI6IFN0YXJ0aW5nIGZpbHRlciB3aWRnZXQgc2VhcmNoJywgZmlsdGVycyApO1xuXHRcdFx0XHR0aW1lID0gbmV3IERhdGUoKTtcblx0XHRcdH1cblx0XHRcdC8vIGZpbHRlcmVkIHJvd3MgY291bnRcblx0XHRcdGMuZmlsdGVyZWRSb3dzID0gMDtcblx0XHRcdGMudG90YWxSb3dzID0gMDtcblx0XHRcdGN1cnJlbnRGaWx0ZXJzID0gKCBzdG9yZWRGaWx0ZXJzIHx8IFtdICk7XG5cblx0XHRcdGZvciAoIHRib2R5SW5kZXggPSAwOyB0Ym9keUluZGV4IDwgYy4kdGJvZGllcy5sZW5ndGg7IHRib2R5SW5kZXgrKyApIHtcblx0XHRcdFx0JHRib2R5ID0gdHMucHJvY2Vzc1Rib2R5KCB0YWJsZSwgYy4kdGJvZGllcy5lcSggdGJvZHlJbmRleCApLCB0cnVlICk7XG5cdFx0XHRcdC8vIHNraXAgY2hpbGQgcm93cyAmIHdpZGdldCBhZGRlZCAoIHJlbW92YWJsZSApIHJvd3MgLSBmaXhlcyAjNDQ4IHRoYW5rcyB0byBAaGVtcGVsIVxuXHRcdFx0XHQvLyAkcm93cyA9ICR0Ym9keS5jaGlsZHJlbiggJ3RyJyApLm5vdCggYy5zZWxlY3RvclJlbW92ZSApO1xuXHRcdFx0XHRjb2x1bW5JbmRleCA9IGMuY29sdW1ucztcblx0XHRcdFx0Ly8gY29udmVydCBzdG9yZWQgcm93cyBpbnRvIGEgalF1ZXJ5IG9iamVjdFxuXHRcdFx0XHRub3JtX3Jvd3MgPSBjLmNhY2hlWyB0Ym9keUluZGV4IF0ubm9ybWFsaXplZDtcblx0XHRcdFx0JHJvd3MgPSAkKCAkLm1hcCggbm9ybV9yb3dzLCBmdW5jdGlvbiggZWwgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVsWyBjb2x1bW5JbmRleCBdLiRyb3cuZ2V0KCk7XG5cdFx0XHRcdH0pICk7XG5cblx0XHRcdFx0aWYgKCBjdXJyZW50RmlsdGVycy5qb2luKCcnKSA9PT0gJycgfHwgd28uZmlsdGVyX3NlcnZlcnNpZGVGaWx0ZXJpbmcgKSB7XG5cdFx0XHRcdFx0JHJvd3Ncblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcyggd28uZmlsdGVyX2ZpbHRlcmVkUm93IClcblx0XHRcdFx0XHRcdC5ub3QoICcuJyArIGMuY3NzQ2hpbGRSb3cgKVxuXHRcdFx0XHRcdFx0LmNzcyggJ2Rpc3BsYXknLCAnJyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGZpbHRlciBvdXQgY2hpbGQgcm93c1xuXHRcdFx0XHRcdCRyb3dzID0gJHJvd3Mubm90KCAnLicgKyBjLmNzc0NoaWxkUm93ICk7XG5cdFx0XHRcdFx0bGVuID0gJHJvd3MubGVuZ3RoO1xuXG5cdFx0XHRcdFx0aWYgKCAoIHdvLmZpbHRlcl8kYW55TWF0Y2ggJiYgd28uZmlsdGVyXyRhbnlNYXRjaC5sZW5ndGggKSB8fFxuXHRcdFx0XHRcdFx0dHlwZW9mIGZpbHRlcnNbYy5jb2x1bW5zXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdFx0XHRkYXRhLmFueU1hdGNoRmxhZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRkYXRhLmFueU1hdGNoRmlsdGVyID0gJycgKyAoXG5cdFx0XHRcdFx0XHRcdGZpbHRlcnNbIGMuY29sdW1ucyBdIHx8XG5cdFx0XHRcdFx0XHRcdHdvLmZpbHRlcl8kYW55TWF0Y2ggJiYgdHNmLmdldExhdGVzdFNlYXJjaCggd28uZmlsdGVyXyRhbnlNYXRjaCApLnZhbCgpIHx8XG5cdFx0XHRcdFx0XHRcdCcnXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0aWYgKCB3by5maWx0ZXJfY29sdW1uQW55TWF0Y2ggKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHNwZWNpZmljIGNvbHVtbnMgc2VhcmNoXG5cdFx0XHRcdFx0XHRcdHF1ZXJ5ID0gZGF0YS5hbnlNYXRjaEZpbHRlci5zcGxpdCggdHNmUmVnZXguYW5kU3BsaXQgKTtcblx0XHRcdFx0XHRcdFx0aW5qZWN0ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBxdWVyeS5sZW5ndGg7IGluZHgrKyApIHtcblx0XHRcdFx0XHRcdFx0XHRyZXMgPSBxdWVyeVsgaW5keCBdLnNwbGl0KCAnOicgKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIHJlcy5sZW5ndGggPiAxICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gbWFrZSB0aGUgY29sdW1uIGEgb25lLWJhc2VkIGluZGV4ICggbm9uLWRldmVsb3BlcnMgc3RhcnQgY291bnRpbmcgZnJvbSBvbmUgOlAgKVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBpc05hTiggcmVzWzBdICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQuZWFjaCggYy5oZWFkZXJDb250ZW50LCBmdW5jdGlvbiggaSwgdHh0ICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIG11bHRpcGxlIG1hdGNoZXMgYXJlIHBvc3NpYmxlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCB0eHQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCByZXNbMF0gKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWQgPSBpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZmlsdGVyc1sgaWQgXSA9IHJlc1sxXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWQgPSBwYXJzZUludCggcmVzWzBdLCAxMCApIC0gMTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGlmICggaWQgPj0gMCAmJiBpZCA8IGMuY29sdW1ucyApIHsgLy8gaWYgaWQgaXMgYW4gaW50ZWdlclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRmaWx0ZXJzWyBpZCBdID0gcmVzWzFdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRxdWVyeS5zcGxpY2UoIGluZHgsIDEgKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aW5keC0tO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpbmplY3RlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICggaW5qZWN0ZWQgKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YS5hbnlNYXRjaEZpbHRlciA9IHF1ZXJ5LmpvaW4oICcgJiYgJyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gb3B0aW1pemUgc2VhcmNoaW5nIG9ubHkgdGhyb3VnaCBhbHJlYWR5IGZpbHRlcmVkIHJvd3MgLSBzZWUgIzMxM1xuXHRcdFx0XHRcdHNlYXJjaEZpbHRlcmVkID0gd28uZmlsdGVyX3NlYXJjaEZpbHRlcmVkO1xuXHRcdFx0XHRcdGxhc3RTZWFyY2ggPSBjLmxhc3RTZWFyY2ggfHwgYy4kdGFibGUuZGF0YSggJ2xhc3RTZWFyY2gnICkgfHwgW107XG5cdFx0XHRcdFx0aWYgKCBzZWFyY2hGaWx0ZXJlZCApIHtcblx0XHRcdFx0XHRcdC8vIGN5Y2xlIHRocm91Z2ggYWxsIGZpbHRlcnM7IGluY2x1ZGUgbGFzdCAoIGNvbHVtbkluZGV4ICsgMSA9IG1hdGNoIGFueSBjb2x1bW4gKS4gRml4ZXMgIzY2OVxuXHRcdFx0XHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBjb2x1bW5JbmRleCArIDE7IGluZHgrKyApIHtcblx0XHRcdFx0XHRcdFx0dmFsID0gZmlsdGVyc1tpbmR4XSB8fCAnJztcblx0XHRcdFx0XHRcdFx0Ly8gYnJlYWsgb3V0IG9mIGxvb3AgaWYgd2UndmUgYWxyZWFkeSBkZXRlcm1pbmVkIG5vdCB0byBzZWFyY2ggZmlsdGVyZWQgcm93c1xuXHRcdFx0XHRcdFx0XHRpZiAoICFzZWFyY2hGaWx0ZXJlZCApIHsgaW5keCA9IGNvbHVtbkluZGV4OyB9XG5cdFx0XHRcdFx0XHRcdC8vIHNlYXJjaCBhbHJlYWR5IGZpbHRlcmVkIHJvd3MgaWYuLi5cblx0XHRcdFx0XHRcdFx0c2VhcmNoRmlsdGVyZWQgPSBzZWFyY2hGaWx0ZXJlZCAmJiBsYXN0U2VhcmNoLmxlbmd0aCAmJlxuXHRcdFx0XHRcdFx0XHRcdC8vIHRoZXJlIGFyZSBubyBjaGFuZ2VzIGZyb20gYmVnaW5uaW5nIG9mIGZpbHRlclxuXHRcdFx0XHRcdFx0XHRcdHZhbC5pbmRleE9mKCBsYXN0U2VhcmNoW2luZHhdIHx8ICcnICkgPT09IDAgJiZcblx0XHRcdFx0XHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBOT1QgYSBsb2dpY2FsICdvcicsIG9yIHJhbmdlICggJ3RvJyBvciAnLScgKSBpbiB0aGUgc3RyaW5nXG5cdFx0XHRcdFx0XHRcdFx0IXRzZlJlZ2V4LmFscmVhZHlGaWx0ZXJlZC50ZXN0KCB2YWwgKSAmJlxuXHRcdFx0XHRcdFx0XHRcdC8vIGlmIHdlIGFyZSBub3QgZG9pbmcgZXhhY3QgbWF0Y2hlcywgdXNpbmcgJ3wnICggbG9naWNhbCBvciApIG9yIG5vdCAnISdcblx0XHRcdFx0XHRcdFx0XHQhdHNmUmVnZXguZXhhY3RUZXN0LnRlc3QoIHZhbCApICYmXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZG9uJ3Qgc2VhcmNoIG9ubHkgZmlsdGVyZWQgaWYgdGhlIHZhbHVlIGlzIG5lZ2F0aXZlXG5cdFx0XHRcdFx0XHRcdFx0Ly8gKCAnPiAtMTAnID0+ICc+IC0xMDAnIHdpbGwgaWdub3JlIGhpZGRlbiByb3dzIClcblx0XHRcdFx0XHRcdFx0XHQhKCB0c2ZSZWdleC5pc05lZzEudGVzdCggdmFsICkgfHwgdHNmUmVnZXguaXNOZWcyLnRlc3QoIHZhbCApICkgJiZcblx0XHRcdFx0XHRcdFx0XHQvLyBpZiBmaWx0ZXJpbmcgdXNpbmcgYSBzZWxlY3Qgd2l0aG91dCBhICdmaWx0ZXItbWF0Y2gnIGNsYXNzICggZXhhY3QgbWF0Y2ggKSAtIGZpeGVzICM1OTNcblx0XHRcdFx0XHRcdFx0XHQhKCB2YWwgIT09ICcnICYmIGMuJGZpbHRlcnMgJiYgYy4kZmlsdGVycy5maWx0ZXIoICdbZGF0YS1jb2x1bW49XCInICsgaW5keCArICdcIl0nICkuZmluZCggJ3NlbGVjdCcgKS5sZW5ndGggJiZcblx0XHRcdFx0XHRcdFx0XHRcdCF0c2YubWF0Y2hUeXBlKCBjLCBpbmR4ICkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bm90RmlsdGVyZWQgPSAkcm93cy5ub3QoICcuJyArIHdvLmZpbHRlcl9maWx0ZXJlZFJvdyApLmxlbmd0aDtcblx0XHRcdFx0XHQvLyBjYW4ndCBzZWFyY2ggd2hlbiBhbGwgcm93cyBhcmUgaGlkZGVuIC0gdGhpcyBoYXBwZW5zIHdoZW4gbG9va2luZyBmb3IgZXhhY3QgbWF0Y2hlc1xuXHRcdFx0XHRcdGlmICggc2VhcmNoRmlsdGVyZWQgJiYgbm90RmlsdGVyZWQgPT09IDAgKSB7IHNlYXJjaEZpbHRlcmVkID0gZmFsc2U7IH1cblx0XHRcdFx0XHRpZiAoIGMuZGVidWcgKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyggJ0ZpbHRlcjogU2VhcmNoaW5nIHRocm91Z2ggJyArXG5cdFx0XHRcdFx0XHRcdCggc2VhcmNoRmlsdGVyZWQgJiYgbm90RmlsdGVyZWQgPCBsZW4gPyBub3RGaWx0ZXJlZCA6ICdhbGwnICkgKyAnIHJvd3MnICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggZGF0YS5hbnlNYXRjaEZsYWcgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGMuc29ydExvY2FsZUNvbXBhcmUgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHJlcGxhY2UgYWNjZW50c1xuXHRcdFx0XHRcdFx0XHRkYXRhLmFueU1hdGNoRmlsdGVyID0gdHMucmVwbGFjZUFjY2VudHMoIGRhdGEuYW55TWF0Y2hGaWx0ZXIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICggd28uZmlsdGVyX2RlZmF1bHRGaWx0ZXIgJiYgdHNmUmVnZXguaVF1ZXJ5LnRlc3QoIHZhcnMuZGVmYXVsdEFueUZpbHRlciApICkge1xuXHRcdFx0XHRcdFx0XHRkYXRhLmFueU1hdGNoRmlsdGVyID0gdHNmLmRlZmF1bHRGaWx0ZXIoIGRhdGEuYW55TWF0Y2hGaWx0ZXIsIHZhcnMuZGVmYXVsdEFueUZpbHRlciApO1xuXHRcdFx0XHRcdFx0XHQvLyBjbGVhciBzZWFyY2ggZmlsdGVyZWQgZmxhZyBiZWNhdXNlIGRlZmF1bHQgZmlsdGVycyBhcmUgbm90IHNhdmVkIHRvIHRoZSBsYXN0IHNlYXJjaFxuXHRcdFx0XHRcdFx0XHRzZWFyY2hGaWx0ZXJlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gbWFrZSBpQW55TWF0Y2hGaWx0ZXIgbG93ZXJjYXNlIHVubGVzcyBib3RoIGZpbHRlciB3aWRnZXQgJiBjb3JlIGlnbm9yZUNhc2Ugb3B0aW9ucyBhcmUgdHJ1ZVxuXHRcdFx0XHRcdFx0Ly8gd2hlbiBjLmlnbm9yZUNhc2UgaXMgdHJ1ZSwgdGhlIGNhY2hlIGNvbnRhaW5zIGFsbCBsb3dlciBjYXNlIGRhdGFcblx0XHRcdFx0XHRcdGRhdGEuaUFueU1hdGNoRmlsdGVyID0gISggd28uZmlsdGVyX2lnbm9yZUNhc2UgJiYgYy5pZ25vcmVDYXNlICkgP1xuXHRcdFx0XHRcdFx0XHRkYXRhLmFueU1hdGNoRmlsdGVyIDpcblx0XHRcdFx0XHRcdFx0ZGF0YS5hbnlNYXRjaEZpbHRlci50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIGxvb3AgdGhyb3VnaCB0aGUgcm93c1xuXHRcdFx0XHRcdGZvciAoIHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCBsZW47IHJvd0luZGV4KysgKSB7XG5cblx0XHRcdFx0XHRcdHR4dCA9ICRyb3dzWyByb3dJbmRleCBdLmNsYXNzTmFtZTtcblx0XHRcdFx0XHRcdC8vIHRoZSBmaXJzdCByb3cgY2FuIG5ldmVyIGJlIGEgY2hpbGQgcm93XG5cdFx0XHRcdFx0XHRpc0NoaWxkID0gcm93SW5kZXggJiYgdHNmUmVnZXguY2hpbGQudGVzdCggdHh0ICk7XG5cdFx0XHRcdFx0XHQvLyBza2lwIGNoaWxkIHJvd3MgJiBhbHJlYWR5IGZpbHRlcmVkIHJvd3Ncblx0XHRcdFx0XHRcdGlmICggaXNDaGlsZCB8fCAoIHNlYXJjaEZpbHRlcmVkICYmIHRzZlJlZ2V4LmZpbHRlcmVkLnRlc3QoIHR4dCApICkgKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRkYXRhLiRyb3cgPSAkcm93cy5lcSggcm93SW5kZXggKTtcblx0XHRcdFx0XHRcdGRhdGEucm93SW5kZXggPSByb3dJbmRleDtcblx0XHRcdFx0XHRcdGRhdGEuY2FjaGVBcnJheSA9IG5vcm1fcm93c1sgcm93SW5kZXggXTtcblx0XHRcdFx0XHRcdHJvd0RhdGEgPSBkYXRhLmNhY2hlQXJyYXlbIGMuY29sdW1ucyBdO1xuXHRcdFx0XHRcdFx0ZGF0YS5yYXdBcnJheSA9IHJvd0RhdGEucmF3O1xuXHRcdFx0XHRcdFx0ZGF0YS5jaGlsZFJvd1RleHQgPSAnJztcblxuXHRcdFx0XHRcdFx0aWYgKCAhd28uZmlsdGVyX2NoaWxkQnlDb2x1bW4gKSB7XG5cdFx0XHRcdFx0XHRcdHR4dCA9ICcnO1xuXHRcdFx0XHRcdFx0XHQvLyBjaGlsZCByb3cgY2FjaGVkIHRleHRcblx0XHRcdFx0XHRcdFx0Y2hpbGRSb3cgPSByb3dEYXRhLmNoaWxkO1xuXHRcdFx0XHRcdFx0XHQvLyBzbywgaWYgJ3RhYmxlLmNvbmZpZy53aWRnZXRPcHRpb25zLmZpbHRlcl9jaGlsZFJvd3MnIGlzIHRydWUgYW5kIHRoZXJlIGlzXG5cdFx0XHRcdFx0XHRcdC8vIGEgbWF0Y2ggYW55d2hlcmUgaW4gdGhlIGNoaWxkIHJvdywgdGhlbiBpdCB3aWxsIG1ha2UgdGhlIHJvdyB2aXNpYmxlXG5cdFx0XHRcdFx0XHRcdC8vIGNoZWNrZWQgaGVyZSBzbyB0aGUgb3B0aW9uIGNhbiBiZSBjaGFuZ2VkIGR5bmFtaWNhbGx5XG5cdFx0XHRcdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgY2hpbGRSb3cubGVuZ3RoOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0XHRcdFx0dHh0ICs9ICcgJyArIGNoaWxkUm93W2luZHhdLmpvaW4oICcgJyApIHx8ICcnO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGRhdGEuY2hpbGRSb3dUZXh0ID0gd28uZmlsdGVyX2NoaWxkUm93cyA/XG5cdFx0XHRcdFx0XHRcdFx0KCB3by5maWx0ZXJfaWdub3JlQ2FzZSA/IHR4dC50b0xvd2VyQ2FzZSgpIDogdHh0ICkgOlxuXHRcdFx0XHRcdFx0XHRcdCcnO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzaG93Um93ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRzaG93UGFyZW50ID0gdHNmLnByb2Nlc3NSb3coIGMsIGRhdGEsIHZhcnMgKTtcblx0XHRcdFx0XHRcdCRyb3cgPSByb3dEYXRhLiRyb3c7XG5cblx0XHRcdFx0XHRcdC8vIGRvbid0IHBhc3MgcmVmZXJlbmNlIHRvIHZhbFxuXHRcdFx0XHRcdFx0dmFsID0gc2hvd1BhcmVudCA/IHRydWUgOiBmYWxzZTtcblx0XHRcdFx0XHRcdGNoaWxkUm93ID0gcm93RGF0YS4kcm93LmZpbHRlciggJzpndCgwKScgKTtcblx0XHRcdFx0XHRcdGlmICggd28uZmlsdGVyX2NoaWxkUm93cyAmJiBjaGlsZFJvdy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggd28uZmlsdGVyX2NoaWxkQnlDb2x1bW4gKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCAhd28uZmlsdGVyX2NoaWxkV2l0aFNpYnMgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBoaWRlIGFsbCBjaGlsZCByb3dzXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGlsZFJvdy5hZGRDbGFzcyggd28uZmlsdGVyX2ZpbHRlcmVkUm93ICk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBpZiBvbmx5IHNob3dpbmcgcmVzdWx0aW5nIGNoaWxkIHJvdywgb25seSBpbmNsdWRlIHBhcmVudFxuXHRcdFx0XHRcdFx0XHRcdFx0JHJvdyA9ICRyb3cuZXEoIDAgKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Ly8gY3ljbGUgdGhyb3VnaCBlYWNoIGNoaWxkIHJvd1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgY2hpbGRSb3cubGVuZ3RoOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhLiRyb3cgPSBjaGlsZFJvdy5lcSggaW5keCApO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS5jYWNoZUFycmF5ID0gcm93RGF0YS5jaGlsZFsgaW5keCBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS5yYXdBcnJheSA9IGRhdGEuY2FjaGVBcnJheTtcblx0XHRcdFx0XHRcdFx0XHRcdHZhbCA9IHRzZi5wcm9jZXNzUm93KCBjLCBkYXRhLCB2YXJzICk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyB1c2UgT1IgY29tcGFyaXNvbiBvbiBjaGlsZCByb3dzXG5cdFx0XHRcdFx0XHRcdFx0XHRzaG93Um93ID0gc2hvd1JvdyB8fCB2YWw7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoICF3by5maWx0ZXJfY2hpbGRXaXRoU2licyAmJiB2YWwgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkUm93LmVxKCBpbmR4ICkucmVtb3ZlQ2xhc3MoIHdvLmZpbHRlcl9maWx0ZXJlZFJvdyApO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQvLyBrZWVwIHBhcmVudCByb3cgbWF0Y2ggZXZlbiBpZiBubyBjaGlsZCBtYXRjaGVzLi4uIHNlZSAjMTAyMFxuXHRcdFx0XHRcdFx0XHRzaG93Um93ID0gc2hvd1JvdyB8fCBzaG93UGFyZW50O1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0c2hvd1JvdyA9IHZhbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCRyb3dcblx0XHRcdFx0XHRcdFx0LnRvZ2dsZUNsYXNzKCB3by5maWx0ZXJfZmlsdGVyZWRSb3csICFzaG93Um93IClbMF1cblx0XHRcdFx0XHRcdFx0LmRpc3BsYXkgPSBzaG93Um93ID8gJycgOiAnbm9uZSc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGMuZmlsdGVyZWRSb3dzICs9ICRyb3dzLm5vdCggJy4nICsgd28uZmlsdGVyX2ZpbHRlcmVkUm93ICkubGVuZ3RoO1xuXHRcdFx0XHRjLnRvdGFsUm93cyArPSAkcm93cy5sZW5ndGg7XG5cdFx0XHRcdHRzLnByb2Nlc3NUYm9keSggdGFibGUsICR0Ym9keSwgZmFsc2UgKTtcblx0XHRcdH1cblx0XHRcdC8vIGxhc3RDb21iaW5lZEZpbHRlciBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5XG5cdFx0XHRjLmxhc3RDb21iaW5lZEZpbHRlciA9IHN0b3JlZEZpbHRlcnMuam9pbignJyk7IC8vIHNhdmUgbGFzdCBzZWFyY2hcblx0XHRcdC8vIGRvbid0IHNhdmUgJ2ZpbHRlcnMnIGRpcmVjdGx5IHNpbmNlIGl0IG1heSBoYXZlIGFsdGVyZWQgKCBBbnlNYXRjaCBjb2x1bW4gc2VhcmNoZXMgKVxuXHRcdFx0Yy5sYXN0U2VhcmNoID0gc3RvcmVkRmlsdGVycztcblx0XHRcdGMuJHRhYmxlLmRhdGEoICdsYXN0U2VhcmNoJywgc3RvcmVkRmlsdGVycyApO1xuXHRcdFx0aWYgKCB3by5maWx0ZXJfc2F2ZUZpbHRlcnMgJiYgdHMuc3RvcmFnZSApIHtcblx0XHRcdFx0dHMuc3RvcmFnZSggdGFibGUsICd0YWJsZXNvcnRlci1maWx0ZXJzJywgdHNmLnByb2Nlc3NGaWx0ZXJzKCBzdG9yZWRGaWx0ZXJzLCB0cnVlICkgKTtcblx0XHRcdH1cblx0XHRcdGlmICggYy5kZWJ1ZyApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coICdDb21wbGV0ZWQgZmlsdGVyIHdpZGdldCBzZWFyY2gnICsgdHMuYmVuY2htYXJrKHRpbWUpICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHdvLmZpbHRlcl9pbml0aWFsaXplZCApIHtcblx0XHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoICdmaWx0ZXJCZWZvcmVFbmQnLCBjICk7XG5cdFx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnZmlsdGVyRW5kJywgYyApO1xuXHRcdFx0fVxuXHRcdFx0c2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRzLmFwcGx5V2lkZ2V0KCBjLnRhYmxlICk7IC8vIG1ha2Ugc3VyZSB6ZWJyYSB3aWRnZXQgaXMgYXBwbGllZFxuXHRcdFx0fSwgMCApO1xuXHRcdH0sXG5cdFx0Z2V0T3B0aW9uU291cmNlOiBmdW5jdGlvbiggdGFibGUsIGNvbHVtbiwgb25seUF2YWlsICkge1xuXHRcdFx0dGFibGUgPSAkKCB0YWJsZSApWzBdO1xuXHRcdFx0dmFyIGMgPSB0YWJsZS5jb25maWcsXG5cdFx0XHRcdHdvID0gYy53aWRnZXRPcHRpb25zLFxuXHRcdFx0XHRhcnJ5ID0gZmFsc2UsXG5cdFx0XHRcdHNvdXJjZSA9IHdvLmZpbHRlcl9zZWxlY3RTb3VyY2UsXG5cdFx0XHRcdGxhc3QgPSBjLiR0YWJsZS5kYXRhKCAnbGFzdFNlYXJjaCcgKSB8fCBbXSxcblx0XHRcdFx0ZnhuID0gdHlwZW9mIHNvdXJjZSA9PT0gJ2Z1bmN0aW9uJyA/IHRydWUgOiB0cy5nZXRDb2x1bW5EYXRhKCB0YWJsZSwgc291cmNlLCBjb2x1bW4gKTtcblxuXHRcdFx0aWYgKCBvbmx5QXZhaWwgJiYgbGFzdFtjb2x1bW5dICE9PSAnJyApIHtcblx0XHRcdFx0b25seUF2YWlsID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGZpbHRlciBzZWxlY3Qgc291cmNlIG9wdGlvblxuXHRcdFx0aWYgKCBmeG4gPT09IHRydWUgKSB7XG5cdFx0XHRcdC8vIE9WRVJBTEwgc291cmNlXG5cdFx0XHRcdGFycnkgPSBzb3VyY2UoIHRhYmxlLCBjb2x1bW4sIG9ubHlBdmFpbCApO1xuXHRcdFx0fSBlbHNlIGlmICggZnhuIGluc3RhbmNlb2YgJCB8fCAoICQudHlwZSggZnhuICkgPT09ICdzdHJpbmcnICYmIGZ4bi5pbmRleE9mKCAnPC9vcHRpb24+JyApID49IDAgKSApIHtcblx0XHRcdFx0Ly8gc2VsZWN0U291cmNlIGlzIGEgalF1ZXJ5IG9iamVjdCBvciBzdHJpbmcgb2Ygb3B0aW9uc1xuXHRcdFx0XHRyZXR1cm4gZnhuO1xuXHRcdFx0fSBlbHNlIGlmICggJC5pc0FycmF5KCBmeG4gKSApIHtcblx0XHRcdFx0YXJyeSA9IGZ4bjtcblx0XHRcdH0gZWxzZSBpZiAoICQudHlwZSggc291cmNlICkgPT09ICdvYmplY3QnICYmIGZ4biApIHtcblx0XHRcdFx0Ly8gY3VzdG9tIHNlbGVjdCBzb3VyY2UgZnVuY3Rpb24gZm9yIGEgU1BFQ0lGSUMgQ09MVU1OXG5cdFx0XHRcdGFycnkgPSBmeG4oIHRhYmxlLCBjb2x1bW4sIG9ubHlBdmFpbCApO1xuXHRcdFx0XHQvLyBhYm9ydCAtIHVwZGF0aW5nIHRoZSBzZWxlY3RzIGZyb20gYW4gZXh0ZXJuYWwgbWV0aG9kXG5cdFx0XHRcdGlmIChhcnJ5ID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggYXJyeSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdC8vIGZhbGwgYmFjayB0byBvcmlnaW5hbCBtZXRob2Rcblx0XHRcdFx0YXJyeSA9IHRzZi5nZXRPcHRpb25zKCB0YWJsZSwgY29sdW1uLCBvbmx5QXZhaWwgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRzZi5wcm9jZXNzT3B0aW9ucyggdGFibGUsIGNvbHVtbiwgYXJyeSApO1xuXG5cdFx0fSxcblx0XHRwcm9jZXNzT3B0aW9uczogZnVuY3Rpb24oIHRhYmxlLCBjb2x1bW4sIGFycnkgKSB7XG5cdFx0XHRpZiAoICEkLmlzQXJyYXkoIGFycnkgKSApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dGFibGUgPSAkKCB0YWJsZSApWzBdO1xuXHRcdFx0dmFyIGN0cywgdHh0LCBpbmR4LCBsZW4sIHBhcnNlZFR4dCwgc3RyLFxuXHRcdFx0XHRjID0gdGFibGUuY29uZmlnLFxuXHRcdFx0XHR2YWxpZENvbHVtbiA9IHR5cGVvZiBjb2x1bW4gIT09ICd1bmRlZmluZWQnICYmIGNvbHVtbiAhPT0gbnVsbCAmJiBjb2x1bW4gPj0gMCAmJiBjb2x1bW4gPCBjLmNvbHVtbnMsXG5cdFx0XHRcdGRpcmVjdGlvbiA9IHZhbGlkQ29sdW1uID8gYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uIF0uaGFzQ2xhc3MoICdmaWx0ZXItc2VsZWN0LXNvcnQtZGVzYycgKSA6IGZhbHNlLFxuXHRcdFx0XHRwYXJzZWQgPSBbXTtcblx0XHRcdC8vIGdldCB1bmlxdWUgZWxlbWVudHMgYW5kIHNvcnQgdGhlIGxpc3Rcblx0XHRcdC8vIGlmICQudGFibGVzb3J0ZXIuc29ydFRleHQgZXhpc3RzICggbm90IGluIHRoZSBvcmlnaW5hbCB0YWJsZXNvcnRlciApLFxuXHRcdFx0Ly8gdGhlbiBuYXR1cmFsIHNvcnQgdGhlIGxpc3Qgb3RoZXJ3aXNlIHVzZSBhIGJhc2ljIHNvcnRcblx0XHRcdGFycnkgPSAkLmdyZXAoIGFycnksIGZ1bmN0aW9uKCB2YWx1ZSwgaW5keCApIHtcblx0XHRcdFx0aWYgKCB2YWx1ZS50ZXh0ICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAkLmluQXJyYXkoIHZhbHVlLCBhcnJ5ICkgPT09IGluZHg7XG5cdFx0XHR9KTtcblx0XHRcdGlmICggdmFsaWRDb2x1bW4gJiYgYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uIF0uaGFzQ2xhc3MoICdmaWx0ZXItc2VsZWN0LW5vc29ydCcgKSApIHtcblx0XHRcdFx0Ly8gdW5zb3J0ZWQgc2VsZWN0IG9wdGlvbnNcblx0XHRcdFx0cmV0dXJuIGFycnk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZW4gPSBhcnJ5Lmxlbmd0aDtcblx0XHRcdFx0Ly8gcGFyc2Ugc2VsZWN0IG9wdGlvbiB2YWx1ZXNcblx0XHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBsZW47IGluZHgrKyApIHtcblx0XHRcdFx0XHR0eHQgPSBhcnJ5WyBpbmR4IF07XG5cdFx0XHRcdFx0Ly8gY2hlY2sgZm9yIG9iamVjdFxuXHRcdFx0XHRcdHN0ciA9IHR4dC50ZXh0ID8gdHh0LnRleHQgOiB0eHQ7XG5cdFx0XHRcdFx0Ly8gc29ydE5hdHVyYWwgYnJlYWtzIGlmIHlvdSBkb24ndCBwYXNzIGl0IHN0cmluZ3Ncblx0XHRcdFx0XHRwYXJzZWRUeHQgPSAoIHZhbGlkQ29sdW1uICYmIGMucGFyc2VycyAmJiBjLnBhcnNlcnMubGVuZ3RoICYmXG5cdFx0XHRcdFx0XHRjLnBhcnNlcnNbIGNvbHVtbiBdLmZvcm1hdCggc3RyLCB0YWJsZSwgW10sIGNvbHVtbiApIHx8IHN0ciApLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0cGFyc2VkVHh0ID0gYy53aWRnZXRPcHRpb25zLmZpbHRlcl9pZ25vcmVDYXNlID8gcGFyc2VkVHh0LnRvTG93ZXJDYXNlKCkgOiBwYXJzZWRUeHQ7XG5cdFx0XHRcdFx0Ly8gcGFyc2UgYXJyYXkgZGF0YSB1c2luZyBzZXQgY29sdW1uIHBhcnNlcjsgdGhpcyBET0VTIE5PVCBwYXNzIHRoZSBvcmlnaW5hbFxuXHRcdFx0XHRcdC8vIHRhYmxlIGNlbGwgdG8gdGhlIHBhcnNlciBmb3JtYXQgZnVuY3Rpb25cblx0XHRcdFx0XHRpZiAoIHR4dC50ZXh0ICkge1xuXHRcdFx0XHRcdFx0dHh0LnBhcnNlZCA9IHBhcnNlZFR4dDtcblx0XHRcdFx0XHRcdHBhcnNlZFsgcGFyc2VkLmxlbmd0aCBdID0gdHh0O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRwYXJzZWRbIHBhcnNlZC5sZW5ndGggXSA9IHtcblx0XHRcdFx0XHRcdFx0dGV4dCA6IHR4dCxcblx0XHRcdFx0XHRcdFx0Ly8gY2hlY2sgcGFyc2VyIGxlbmd0aCAtIGZpeGVzICM5MzRcblx0XHRcdFx0XHRcdFx0cGFyc2VkIDogcGFyc2VkVHh0XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBzb3J0IHBhcnNlZCBzZWxlY3Qgb3B0aW9uc1xuXHRcdFx0XHRjdHMgPSBjLnRleHRTb3J0ZXIgfHwgJyc7XG5cdFx0XHRcdHBhcnNlZC5zb3J0KCBmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdFx0XHR2YXIgeCA9IGRpcmVjdGlvbiA/IGIucGFyc2VkIDogYS5wYXJzZWQsXG5cdFx0XHRcdFx0XHR5ID0gZGlyZWN0aW9uID8gYS5wYXJzZWQgOiBiLnBhcnNlZDtcblx0XHRcdFx0XHRpZiAoIHZhbGlkQ29sdW1uICYmIHR5cGVvZiBjdHMgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRcdFx0XHQvLyBjdXN0b20gT1ZFUkFMTCB0ZXh0IHNvcnRlclxuXHRcdFx0XHRcdFx0cmV0dXJuIGN0cyggeCwgeSwgdHJ1ZSwgY29sdW1uLCB0YWJsZSApO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIHZhbGlkQ29sdW1uICYmIHR5cGVvZiBjdHMgPT09ICdvYmplY3QnICYmIGN0cy5oYXNPd25Qcm9wZXJ0eSggY29sdW1uICkgKSB7XG5cdFx0XHRcdFx0XHQvLyBjdXN0b20gdGV4dCBzb3J0ZXIgZm9yIGEgU1BFQ0lGSUMgQ09MVU1OXG5cdFx0XHRcdFx0XHRyZXR1cm4gY3RzW2NvbHVtbl0oIHgsIHksIHRydWUsIGNvbHVtbiwgdGFibGUgKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0cy5zb3J0TmF0dXJhbCApIHtcblx0XHRcdFx0XHRcdC8vIGZhbGwgYmFjayB0byBuYXR1cmFsIHNvcnRcblx0XHRcdFx0XHRcdHJldHVybiB0cy5zb3J0TmF0dXJhbCggeCwgeSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyB1c2luZyBhbiBvbGRlciB2ZXJzaW9uISBkbyBhIGJhc2ljIHNvcnRcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdC8vIHJlYnVpbGQgYXJyeSBmcm9tIHNvcnRlZCBwYXJzZWQgZGF0YVxuXHRcdFx0XHRhcnJ5ID0gW107XG5cdFx0XHRcdGxlbiA9IHBhcnNlZC5sZW5ndGg7XG5cdFx0XHRcdGZvciAoIGluZHggPSAwOyBpbmR4IDwgbGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0YXJyeVsgYXJyeS5sZW5ndGggXSA9IHBhcnNlZFtpbmR4XTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gYXJyeTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGdldE9wdGlvbnM6IGZ1bmN0aW9uKCB0YWJsZSwgY29sdW1uLCBvbmx5QXZhaWwgKSB7XG5cdFx0XHR0YWJsZSA9ICQoIHRhYmxlIClbMF07XG5cdFx0XHR2YXIgcm93SW5kZXgsIHRib2R5SW5kZXgsIGxlbiwgcm93LCBjYWNoZSwgaW5keCwgY2hpbGQsIGNoaWxkTGVuLFxuXHRcdFx0XHRjID0gdGFibGUuY29uZmlnLFxuXHRcdFx0XHR3byA9IGMud2lkZ2V0T3B0aW9ucyxcblx0XHRcdFx0YXJyeSA9IFtdO1xuXHRcdFx0Zm9yICggdGJvZHlJbmRleCA9IDA7IHRib2R5SW5kZXggPCBjLiR0Ym9kaWVzLmxlbmd0aDsgdGJvZHlJbmRleCsrICkge1xuXHRcdFx0XHRjYWNoZSA9IGMuY2FjaGVbdGJvZHlJbmRleF07XG5cdFx0XHRcdGxlbiA9IGMuY2FjaGVbdGJvZHlJbmRleF0ubm9ybWFsaXplZC5sZW5ndGg7XG5cdFx0XHRcdC8vIGxvb3AgdGhyb3VnaCB0aGUgcm93c1xuXHRcdFx0XHRmb3IgKCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgbGVuOyByb3dJbmRleCsrICkge1xuXHRcdFx0XHRcdC8vIGdldCBjYWNoZWQgcm93IGZyb20gY2FjaGUucm93ICggb2xkICkgb3Igcm93IGRhdGEgb2JqZWN0XG5cdFx0XHRcdFx0Ly8gKCBuZXc7IGxhc3QgaXRlbSBpbiBub3JtYWxpemVkIGFycmF5IClcblx0XHRcdFx0XHRyb3cgPSBjYWNoZS5yb3cgP1xuXHRcdFx0XHRcdFx0Y2FjaGUucm93WyByb3dJbmRleCBdIDpcblx0XHRcdFx0XHRcdGNhY2hlLm5vcm1hbGl6ZWRbIHJvd0luZGV4IF1bIGMuY29sdW1ucyBdLiRyb3dbMF07XG5cdFx0XHRcdFx0Ly8gY2hlY2sgaWYgaGFzIGNsYXNzIGZpbHRlcmVkXG5cdFx0XHRcdFx0aWYgKCBvbmx5QXZhaWwgJiYgcm93LmNsYXNzTmFtZS5tYXRjaCggd28uZmlsdGVyX2ZpbHRlcmVkUm93ICkgKSB7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gZ2V0IG5vbi1ub3JtYWxpemVkIGNlbGwgY29udGVudFxuXHRcdFx0XHRcdGlmICggd28uZmlsdGVyX3VzZVBhcnNlZERhdGEgfHxcblx0XHRcdFx0XHRcdGMucGFyc2Vyc1tjb2x1bW5dLnBhcnNlZCB8fFxuXHRcdFx0XHRcdFx0Yy4kaGVhZGVySW5kZXhlZFtjb2x1bW5dLmhhc0NsYXNzKCAnZmlsdGVyLXBhcnNlZCcgKSApIHtcblx0XHRcdFx0XHRcdGFycnlbIGFycnkubGVuZ3RoIF0gPSAnJyArIGNhY2hlLm5vcm1hbGl6ZWRbIHJvd0luZGV4IF1bIGNvbHVtbiBdO1xuXHRcdFx0XHRcdFx0Ly8gY2hpbGQgcm93IHBhcnNlZCBkYXRhXG5cdFx0XHRcdFx0XHRpZiAoIHdvLmZpbHRlcl9jaGlsZFJvd3MgJiYgd28uZmlsdGVyX2NoaWxkQnlDb2x1bW4gKSB7XG5cdFx0XHRcdFx0XHRcdGNoaWxkTGVuID0gY2FjaGUubm9ybWFsaXplZFsgcm93SW5kZXggXVsgYy5jb2x1bW5zIF0uJHJvdy5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0XHRmb3IgKCBpbmR4ID0gMDsgaW5keCA8IGNoaWxkTGVuOyBpbmR4KysgKSB7XG5cdFx0XHRcdFx0XHRcdFx0YXJyeVsgYXJyeS5sZW5ndGggXSA9ICcnICsgY2FjaGUubm9ybWFsaXplZFsgcm93SW5kZXggXVsgYy5jb2x1bW5zIF0uY2hpbGRbIGluZHggXVsgY29sdW1uIF07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gZ2V0IHJhdyBjYWNoZWQgZGF0YSBpbnN0ZWFkIG9mIGNvbnRlbnQgZGlyZWN0bHkgZnJvbSB0aGUgY2VsbHNcblx0XHRcdFx0XHRcdGFycnlbIGFycnkubGVuZ3RoIF0gPSBjYWNoZS5ub3JtYWxpemVkWyByb3dJbmRleCBdWyBjLmNvbHVtbnMgXS5yYXdbIGNvbHVtbiBdO1xuXHRcdFx0XHRcdFx0Ly8gY2hpbGQgcm93IHVucGFyc2VkIGRhdGFcblx0XHRcdFx0XHRcdGlmICggd28uZmlsdGVyX2NoaWxkUm93cyAmJiB3by5maWx0ZXJfY2hpbGRCeUNvbHVtbiApIHtcblx0XHRcdFx0XHRcdFx0Y2hpbGRMZW4gPSBjYWNoZS5ub3JtYWxpemVkWyByb3dJbmRleCBdWyBjLmNvbHVtbnMgXS4kcm93Lmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0Zm9yICggaW5keCA9IDE7IGluZHggPCBjaGlsZExlbjsgaW5keCsrICkge1xuXHRcdFx0XHRcdFx0XHRcdGNoaWxkID0gIGNhY2hlLm5vcm1hbGl6ZWRbIHJvd0luZGV4IF1bIGMuY29sdW1ucyBdLiRyb3cuZXEoIGluZHggKS5jaGlsZHJlbigpLmVxKCBjb2x1bW4gKTtcblx0XHRcdFx0XHRcdFx0XHRhcnJ5WyBhcnJ5Lmxlbmd0aCBdID0gJycgKyB0cy5nZXRFbGVtZW50VGV4dCggYywgY2hpbGQsIGNvbHVtbiApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYXJyeTtcblx0XHR9LFxuXHRcdGJ1aWxkU2VsZWN0OiBmdW5jdGlvbiggdGFibGUsIGNvbHVtbiwgYXJyeSwgdXBkYXRpbmcsIG9ubHlBdmFpbCApIHtcblx0XHRcdHRhYmxlID0gJCggdGFibGUgKVswXTtcblx0XHRcdGNvbHVtbiA9IHBhcnNlSW50KCBjb2x1bW4sIDEwICk7XG5cdFx0XHRpZiAoICF0YWJsZS5jb25maWcuY2FjaGUgfHwgJC5pc0VtcHR5T2JqZWN0KCB0YWJsZS5jb25maWcuY2FjaGUgKSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaW5keCwgdmFsLCB0eHQsIHQsICRmaWx0ZXJzLCAkZmlsdGVyLCBvcHRpb24sXG5cdFx0XHRcdGMgPSB0YWJsZS5jb25maWcsXG5cdFx0XHRcdHdvID0gYy53aWRnZXRPcHRpb25zLFxuXHRcdFx0XHRub2RlID0gYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uIF0sXG5cdFx0XHRcdC8vIHQuZGF0YSggJ3BsYWNlaG9sZGVyJyApIHdvbid0IHdvcmsgaW4galF1ZXJ5IG9sZGVyIHRoYW4gMS40LjNcblx0XHRcdFx0b3B0aW9ucyA9ICc8b3B0aW9uIHZhbHVlPVwiXCI+JyArXG5cdFx0XHRcdFx0KCBub2RlLmRhdGEoICdwbGFjZWhvbGRlcicgKSB8fFxuXHRcdFx0XHRcdFx0bm9kZS5hdHRyKCAnZGF0YS1wbGFjZWhvbGRlcicgKSB8fFxuXHRcdFx0XHRcdFx0d28uZmlsdGVyX3BsYWNlaG9sZGVyLnNlbGVjdCB8fCAnJ1xuXHRcdFx0XHRcdCkgKyAnPC9vcHRpb24+Jyxcblx0XHRcdFx0Ly8gR2V0IGN1cmVudCBmaWx0ZXIgdmFsdWVcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gYy4kdGFibGVcblx0XHRcdFx0XHQuZmluZCggJ3RoZWFkJyApXG5cdFx0XHRcdFx0LmZpbmQoICdzZWxlY3QuJyArIHRzY3NzLmZpbHRlciArICdbZGF0YS1jb2x1bW49XCInICsgY29sdW1uICsgJ1wiXScgKVxuXHRcdFx0XHRcdC52YWwoKTtcblxuXHRcdFx0Ly8gbm90aGluZyBpbmNsdWRlZCBpbiBhcnJ5ICggZXh0ZXJuYWwgc291cmNlICksIHNvIGdldCB0aGUgb3B0aW9ucyBmcm9tXG5cdFx0XHQvLyBmaWx0ZXJfc2VsZWN0U291cmNlIG9yIGNvbHVtbiBkYXRhXG5cdFx0XHRpZiAoIHR5cGVvZiBhcnJ5ID09PSAndW5kZWZpbmVkJyB8fCBhcnJ5ID09PSAnJyApIHtcblx0XHRcdFx0YXJyeSA9IHRzZi5nZXRPcHRpb25Tb3VyY2UoIHRhYmxlLCBjb2x1bW4sIG9ubHlBdmFpbCApO1xuXHRcdFx0XHQvLyBhYm9ydCwgc2VsZWN0cyBhcmUgdXBkYXRlZCBieSBhbiBleHRlcm5hbCBtZXRob2Rcblx0XHRcdFx0aWYgKGFycnkgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCAkLmlzQXJyYXkoIGFycnkgKSApIHtcblx0XHRcdFx0Ly8gYnVpbGQgb3B0aW9uIGxpc3Rcblx0XHRcdFx0Zm9yICggaW5keCA9IDA7IGluZHggPCBhcnJ5Lmxlbmd0aDsgaW5keCsrICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IGFycnlbIGluZHggXTtcblx0XHRcdFx0XHRpZiAoIG9wdGlvbi50ZXh0ICkge1xuXHRcdFx0XHRcdFx0Ly8gT0JKRUNUISEgYWRkIGRhdGEtZnVuY3Rpb24tbmFtZSBpbiBjYXNlIHRoZSB2YWx1ZSBpcyBzZXQgaW4gZmlsdGVyX2Z1bmN0aW9uc1xuXHRcdFx0XHRcdFx0b3B0aW9uWydkYXRhLWZ1bmN0aW9uLW5hbWUnXSA9IHR5cGVvZiBvcHRpb24udmFsdWUgPT09ICd1bmRlZmluZWQnID8gb3B0aW9uLnRleHQgOiBvcHRpb24udmFsdWU7XG5cblx0XHRcdFx0XHRcdC8vIHN1cHBvcnQgalF1ZXJ5IDwgdjEuOCwgb3RoZXJ3aXNlIHRoZSBiZWxvdyBjb2RlIGNvdWxkIGJlIHNob3J0ZW5lZCB0b1xuXHRcdFx0XHRcdFx0Ly8gb3B0aW9ucyArPSAkKCAnPG9wdGlvbj4nLCBvcHRpb24gKVsgMCBdLm91dGVySFRNTDtcblx0XHRcdFx0XHRcdG9wdGlvbnMgKz0gJzxvcHRpb24nO1xuXHRcdFx0XHRcdFx0Zm9yICggdmFsIGluIG9wdGlvbiApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBvcHRpb24uaGFzT3duUHJvcGVydHkoIHZhbCApICYmIHZhbCAhPT0gJ3RleHQnICkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMgKz0gJyAnICsgdmFsICsgJz1cIicgKyBvcHRpb25bIHZhbCBdICsgJ1wiJztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCAhb3B0aW9uLnZhbHVlICkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zICs9ICcgdmFsdWU9XCInICsgb3B0aW9uLnRleHQgKyAnXCInO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0b3B0aW9ucyArPSAnPicgKyBvcHRpb24udGV4dCArICc8L29wdGlvbj4nO1xuXHRcdFx0XHRcdFx0Ly8gYWJvdmUgY29kZSBpcyBuZWVkZWQgaW4galF1ZXJ5IDwgdjEuOFxuXG5cdFx0XHRcdFx0XHQvLyBtYWtlIHN1cmUgd2UgZG9uJ3QgdHVybiBhbiBvYmplY3QgaW50byBhIHN0cmluZyAob2JqZWN0cyB3aXRob3V0IGEgXCJ0ZXh0XCIgcHJvcGVydHkpXG5cdFx0XHRcdFx0fSBlbHNlIGlmICggJycgKyBvcHRpb24gIT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuXHRcdFx0XHRcdFx0dHh0ID0gb3B0aW9uID0gKCAnJyArIG9wdGlvbiApLnJlcGxhY2UoIHRzZlJlZ2V4LnF1b3RlLCAnJnF1b3Q7JyApO1xuXHRcdFx0XHRcdFx0dmFsID0gdHh0O1xuXHRcdFx0XHRcdFx0Ly8gYWxsb3cgaW5jbHVkaW5nIGEgc3ltYm9sIGluIHRoZSBzZWxlY3RTb3VyY2UgYXJyYXlcblx0XHRcdFx0XHRcdC8vICdhLXp8QSB0aHJvdWdoIFonIHNvIHRoYXQgJ2EteicgYmVjb21lcyB0aGUgb3B0aW9uIHZhbHVlXG5cdFx0XHRcdFx0XHQvLyBhbmQgJ0EgdGhyb3VnaCBaJyBiZWNvbWVzIHRoZSBvcHRpb24gdGV4dFxuXHRcdFx0XHRcdFx0aWYgKCB0eHQuaW5kZXhPZiggd28uZmlsdGVyX3NlbGVjdFNvdXJjZVNlcGFyYXRvciApID49IDAgKSB7XG5cdFx0XHRcdFx0XHRcdHQgPSB0eHQuc3BsaXQoIHdvLmZpbHRlcl9zZWxlY3RTb3VyY2VTZXBhcmF0b3IgKTtcblx0XHRcdFx0XHRcdFx0dmFsID0gdFswXTtcblx0XHRcdFx0XHRcdFx0dHh0ID0gdFsxXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIHJlcGxhY2UgcXVvdGVzIC0gZml4ZXMgIzI0MiAmIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG5cdFx0XHRcdFx0XHQvLyBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMTQ5OTA5NzEvMTQ1MzQ2XG5cdFx0XHRcdFx0XHRvcHRpb25zICs9IG9wdGlvbiAhPT0gJycgP1xuXHRcdFx0XHRcdFx0XHQnPG9wdGlvbiAnICtcblx0XHRcdFx0XHRcdFx0XHQoIHZhbCA9PT0gdHh0ID8gJycgOiAnZGF0YS1mdW5jdGlvbi1uYW1lPVwiJyArIG9wdGlvbiArICdcIiAnICkgK1xuXHRcdFx0XHRcdFx0XHRcdCd2YWx1ZT1cIicgKyB2YWwgKyAnXCI+JyArIHR4dCArXG5cdFx0XHRcdFx0XHRcdCc8L29wdGlvbj4nIDogJyc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGNsZWFyIGFycnkgc28gaXQgZG9lc24ndCBnZXQgYXBwZW5kZWQgdHdpY2Vcblx0XHRcdFx0YXJyeSA9IFtdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB1cGRhdGUgYWxsIHNlbGVjdHMgaW4gdGhlIHNhbWUgY29sdW1uICggY2xvbmUgdGhlYWQgaW4gc3RpY2t5IGhlYWRlcnMgJlxuXHRcdFx0Ly8gYW55IGV4dGVybmFsIHNlbGVjdHMgKSAtIGZpeGVzIDQ3M1xuXHRcdFx0JGZpbHRlcnMgPSAoIGMuJGZpbHRlcnMgPyBjLiRmaWx0ZXJzIDogYy4kdGFibGUuY2hpbGRyZW4oICd0aGVhZCcgKSApXG5cdFx0XHRcdC5maW5kKCAnLicgKyB0c2Nzcy5maWx0ZXIgKTtcblx0XHRcdGlmICggd28uZmlsdGVyXyRleHRlcm5hbEZpbHRlcnMgKSB7XG5cdFx0XHRcdCRmaWx0ZXJzID0gJGZpbHRlcnMgJiYgJGZpbHRlcnMubGVuZ3RoID9cblx0XHRcdFx0XHQkZmlsdGVycy5hZGQoIHdvLmZpbHRlcl8kZXh0ZXJuYWxGaWx0ZXJzICkgOlxuXHRcdFx0XHRcdHdvLmZpbHRlcl8kZXh0ZXJuYWxGaWx0ZXJzO1xuXHRcdFx0fVxuXHRcdFx0JGZpbHRlciA9ICRmaWx0ZXJzLmZpbHRlciggJ3NlbGVjdFtkYXRhLWNvbHVtbj1cIicgKyBjb2x1bW4gKyAnXCJdJyApO1xuXG5cdFx0XHQvLyBtYWtlIHN1cmUgdGhlcmUgaXMgYSBzZWxlY3QgdGhlcmUhXG5cdFx0XHRpZiAoICRmaWx0ZXIubGVuZ3RoICkge1xuXHRcdFx0XHQkZmlsdGVyWyB1cGRhdGluZyA/ICdodG1sJyA6ICdhcHBlbmQnIF0oIG9wdGlvbnMgKTtcblx0XHRcdFx0aWYgKCAhJC5pc0FycmF5KCBhcnJ5ICkgKSB7XG5cdFx0XHRcdFx0Ly8gYXBwZW5kIG9wdGlvbnMgaWYgYXJyeSBpcyBwcm92aWRlZCBleHRlcm5hbGx5IGFzIGEgc3RyaW5nIG9yIGpRdWVyeSBvYmplY3Rcblx0XHRcdFx0XHQvLyBvcHRpb25zICggZGVmYXVsdCB2YWx1ZSApIHdhcyBhbHJlYWR5IGFkZGVkXG5cdFx0XHRcdFx0JGZpbHRlci5hcHBlbmQoIGFycnkgKS52YWwoIGN1cnJlbnRWYWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRmaWx0ZXIudmFsKCBjdXJyZW50VmFsdWUgKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGJ1aWxkRGVmYXVsdDogZnVuY3Rpb24oIHRhYmxlLCB1cGRhdGluZyApIHtcblx0XHRcdHZhciBjb2x1bW5JbmRleCwgJGhlYWRlciwgbm9TZWxlY3QsXG5cdFx0XHRcdGMgPSB0YWJsZS5jb25maWcsXG5cdFx0XHRcdHdvID0gYy53aWRnZXRPcHRpb25zLFxuXHRcdFx0XHRjb2x1bW5zID0gYy5jb2x1bW5zO1xuXHRcdFx0Ly8gYnVpbGQgZGVmYXVsdCBzZWxlY3QgZHJvcGRvd25cblx0XHRcdGZvciAoIGNvbHVtbkluZGV4ID0gMDsgY29sdW1uSW5kZXggPCBjb2x1bW5zOyBjb2x1bW5JbmRleCsrICkge1xuXHRcdFx0XHQkaGVhZGVyID0gYy4kaGVhZGVySW5kZXhlZFtjb2x1bW5JbmRleF07XG5cdFx0XHRcdG5vU2VsZWN0ID0gISggJGhlYWRlci5oYXNDbGFzcyggJ2ZpbHRlci1mYWxzZScgKSB8fCAkaGVhZGVyLmhhc0NsYXNzKCAncGFyc2VyLWZhbHNlJyApICk7XG5cdFx0XHRcdC8vIGxvb2sgZm9yIHRoZSBmaWx0ZXItc2VsZWN0IGNsYXNzOyBidWlsZC91cGRhdGUgaXQgaWYgZm91bmRcblx0XHRcdFx0aWYgKCAoICRoZWFkZXIuaGFzQ2xhc3MoICdmaWx0ZXItc2VsZWN0JyApIHx8XG5cdFx0XHRcdFx0dHMuZ2V0Q29sdW1uRGF0YSggdGFibGUsIHdvLmZpbHRlcl9mdW5jdGlvbnMsIGNvbHVtbkluZGV4ICkgPT09IHRydWUgKSAmJiBub1NlbGVjdCApIHtcblx0XHRcdFx0XHR0c2YuYnVpbGRTZWxlY3QoIHRhYmxlLCBjb2x1bW5JbmRleCwgJycsIHVwZGF0aW5nLCAkaGVhZGVyLmhhc0NsYXNzKCB3by5maWx0ZXJfb25seUF2YWlsICkgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvLyBmaWx0ZXIgcmVnZXggdmFyaWFibGVcblx0dHNmUmVnZXggPSB0c2YucmVnZXg7XG5cblx0dHMuZ2V0RmlsdGVycyA9IGZ1bmN0aW9uKCB0YWJsZSwgZ2V0UmF3LCBzZXRGaWx0ZXJzLCBza2lwRmlyc3QgKSB7XG5cdFx0dmFyIGksICRmaWx0ZXJzLCAkY29sdW1uLCBjb2xzLFxuXHRcdFx0ZmlsdGVycyA9IFtdLFxuXHRcdFx0YyA9IHRhYmxlID8gJCggdGFibGUgKVswXS5jb25maWcgOiAnJyxcblx0XHRcdHdvID0gYyA/IGMud2lkZ2V0T3B0aW9ucyA6ICcnO1xuXHRcdGlmICggKCBnZXRSYXcgIT09IHRydWUgJiYgd28gJiYgIXdvLmZpbHRlcl9jb2x1bW5GaWx0ZXJzICkgfHxcblx0XHRcdC8vIHNldEZpbHRlcnMgY2FsbGVkLCBidXQgbGFzdCBzZWFyY2ggaXMgZXhhY3RseSB0aGUgc2FtZSBhcyB0aGUgY3VycmVudFxuXHRcdFx0Ly8gZml4ZXMgaXNzdWUgIzczMyAmICM5MDMgd2hlcmUgY2FsbGluZyB1cGRhdGUgY2F1c2VzIHRoZSBpbnB1dCB2YWx1ZXMgdG8gcmVzZXRcblx0XHRcdCggJC5pc0FycmF5KHNldEZpbHRlcnMpICYmIHRzZi5lcXVhbEZpbHRlcnMoYywgc2V0RmlsdGVycywgYy5sYXN0U2VhcmNoKSApXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gJCggdGFibGUgKS5kYXRhKCAnbGFzdFNlYXJjaCcgKSB8fCBbXTtcblx0XHR9XG5cdFx0aWYgKCBjICkge1xuXHRcdFx0aWYgKCBjLiRmaWx0ZXJzICkge1xuXHRcdFx0XHQkZmlsdGVycyA9IGMuJGZpbHRlcnMuZmluZCggJy4nICsgdHNjc3MuZmlsdGVyICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHdvLmZpbHRlcl8kZXh0ZXJuYWxGaWx0ZXJzICkge1xuXHRcdFx0XHQkZmlsdGVycyA9ICRmaWx0ZXJzICYmICRmaWx0ZXJzLmxlbmd0aCA/XG5cdFx0XHRcdFx0JGZpbHRlcnMuYWRkKCB3by5maWx0ZXJfJGV4dGVybmFsRmlsdGVycyApIDpcblx0XHRcdFx0XHR3by5maWx0ZXJfJGV4dGVybmFsRmlsdGVycztcblx0XHRcdH1cblx0XHRcdGlmICggJGZpbHRlcnMgJiYgJGZpbHRlcnMubGVuZ3RoICkge1xuXHRcdFx0XHRmaWx0ZXJzID0gc2V0RmlsdGVycyB8fCBbXTtcblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBjLmNvbHVtbnMgKyAxOyBpKysgKSB7XG5cdFx0XHRcdFx0Y29scyA9ICggaSA9PT0gYy5jb2x1bW5zID9cblx0XHRcdFx0XHRcdC8vICdhbGwnIGNvbHVtbnMgY2FuIG5vdyBpbmNsdWRlIGEgcmFuZ2Ugb3Igc2V0IG9mIGNvbHVtbXMgKCBkYXRhLWNvbHVtbj0nMC0yLDQsNi03JyApXG5cdFx0XHRcdFx0XHR3by5maWx0ZXJfYW55Q29sdW1uU2VsZWN0b3IgKyAnLCcgKyB3by5maWx0ZXJfbXVsdGlwbGVDb2x1bW5TZWxlY3RvciA6XG5cdFx0XHRcdFx0XHQnW2RhdGEtY29sdW1uPVwiJyArIGkgKyAnXCJdJyApO1xuXHRcdFx0XHRcdCRjb2x1bW4gPSAkZmlsdGVycy5maWx0ZXIoIGNvbHMgKTtcblx0XHRcdFx0XHRpZiAoICRjb2x1bW4ubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0Ly8gbW92ZSB0aGUgbGF0ZXN0IHNlYXJjaCB0byB0aGUgZmlyc3Qgc2xvdCBpbiB0aGUgYXJyYXlcblx0XHRcdFx0XHRcdCRjb2x1bW4gPSB0c2YuZ2V0TGF0ZXN0U2VhcmNoKCAkY29sdW1uICk7XG5cdFx0XHRcdFx0XHRpZiAoICQuaXNBcnJheSggc2V0RmlsdGVycyApICkge1xuXHRcdFx0XHRcdFx0XHQvLyBza2lwIGZpcnN0ICggbGF0ZXN0IGlucHV0ICkgdG8gbWFpbnRhaW4gY3Vyc29yIHBvc2l0aW9uIHdoaWxlIHR5cGluZ1xuXHRcdFx0XHRcdFx0XHRpZiAoIHNraXBGaXJzdCAmJiAkY29sdW1uLmxlbmd0aCA+IDEgKSB7XG5cdFx0XHRcdFx0XHRcdFx0JGNvbHVtbiA9ICRjb2x1bW4uc2xpY2UoIDEgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIGkgPT09IGMuY29sdW1ucyApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBwcmV2ZW50IGRhdGEtY29sdW1uPSdhbGwnIGZyb20gZmlsbGluZyBkYXRhLWNvbHVtbj0nMCwxJyAoIGV0YyApXG5cdFx0XHRcdFx0XHRcdFx0Y29scyA9ICRjb2x1bW4uZmlsdGVyKCB3by5maWx0ZXJfYW55Q29sdW1uU2VsZWN0b3IgKTtcblx0XHRcdFx0XHRcdFx0XHQkY29sdW1uID0gY29scy5sZW5ndGggPyBjb2xzIDogJGNvbHVtbjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQkY29sdW1uXG5cdFx0XHRcdFx0XHRcdFx0LnZhbCggc2V0RmlsdGVyc1sgaSBdIClcblx0XHRcdFx0XHRcdFx0XHQvLyBtdXN0IGluY2x1ZGUgYSBuYW1lc3BhY2UgaGVyZTsgYnV0IG5vdCBjLm5hbWVzcGFjZSArICdmaWx0ZXInP1xuXHRcdFx0XHRcdFx0XHRcdC50cmlnZ2VyKCAnY2hhbmdlJyArIGMubmFtZXNwYWNlICk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRmaWx0ZXJzW2ldID0gJGNvbHVtbi52YWwoKSB8fCAnJztcblx0XHRcdFx0XHRcdFx0Ly8gZG9uJ3QgY2hhbmdlIHRoZSBmaXJzdC4uLiBpdCB3aWxsIG1vdmUgdGhlIGN1cnNvclxuXHRcdFx0XHRcdFx0XHRpZiAoIGkgPT09IGMuY29sdW1ucyApIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBkb24ndCB1cGRhdGUgcmFuZ2UgY29sdW1ucyBmcm9tICdhbGwnIHNldHRpbmdcblx0XHRcdFx0XHRcdFx0XHQkY29sdW1uXG5cdFx0XHRcdFx0XHRcdFx0XHQuc2xpY2UoIDEgKVxuXHRcdFx0XHRcdFx0XHRcdFx0LmZpbHRlciggJ1tkYXRhLWNvbHVtbio9XCInICsgJGNvbHVtbi5hdHRyKCAnZGF0YS1jb2x1bW4nICkgKyAnXCJdJyApXG5cdFx0XHRcdFx0XHRcdFx0XHQudmFsKCBmaWx0ZXJzWyBpIF0gKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHQkY29sdW1uXG5cdFx0XHRcdFx0XHRcdFx0XHQuc2xpY2UoIDEgKVxuXHRcdFx0XHRcdFx0XHRcdFx0LnZhbCggZmlsdGVyc1sgaSBdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIHNhdmUgYW55IG1hdGNoIGlucHV0IGR5bmFtaWNhbGx5XG5cdFx0XHRcdFx0XHRpZiAoIGkgPT09IGMuY29sdW1ucyAmJiAkY29sdW1uLmxlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0d28uZmlsdGVyXyRhbnlNYXRjaCA9ICRjb2x1bW47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmaWx0ZXJzO1xuXHR9O1xuXG5cdHRzLnNldEZpbHRlcnMgPSBmdW5jdGlvbiggdGFibGUsIGZpbHRlciwgYXBwbHksIHNraXBGaXJzdCApIHtcblx0XHR2YXIgYyA9IHRhYmxlID8gJCggdGFibGUgKVswXS5jb25maWcgOiAnJyxcblx0XHRcdHZhbGlkID0gdHMuZ2V0RmlsdGVycyggdGFibGUsIHRydWUsIGZpbHRlciwgc2tpcEZpcnN0ICk7XG5cdFx0Ly8gZGVmYXVsdCBhcHBseSB0byBcInRydWVcIlxuXHRcdGlmICggdHlwZW9mIGFwcGx5ID09PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdGFwcGx5ID0gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKCBjICYmIGFwcGx5ICkge1xuXHRcdFx0Ly8gZW5zdXJlIG5ldyBzZXQgZmlsdGVycyBhcmUgYXBwbGllZCwgZXZlbiBpZiB0aGUgc2VhcmNoIGlzIHRoZSBzYW1lXG5cdFx0XHRjLmxhc3RDb21iaW5lZEZpbHRlciA9IG51bGw7XG5cdFx0XHRjLmxhc3RTZWFyY2ggPSBbXTtcblx0XHRcdHRzZi5zZWFyY2hpbmcoIGMudGFibGUsIGZpbHRlciwgc2tpcEZpcnN0ICk7XG5cdFx0XHRjLiR0YWJsZS50cmlnZ2VySGFuZGxlciggJ2ZpbHRlckZvbWF0dGVyVXBkYXRlJyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsaWQubGVuZ3RoICE9PSAwO1xuXHR9O1xuXG59KSggalF1ZXJ5ICk7XG5cbi8qISBXaWRnZXQ6IHN0aWNreUhlYWRlcnMgLSB1cGRhdGVkIDkvMjcvMjAxNyAodjIuMjkuMCkgKi8vKlxuICogUmVxdWlyZXMgdGFibGVzb3J0ZXIgdjIuOCsgYW5kIGpRdWVyeSAxLjQuMytcbiAqIGJ5IFJvYiBHYXJyaXNvblxuICovXG47KGZ1bmN0aW9uICgkLCB3aW5kb3cpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHR2YXIgdHMgPSAkLnRhYmxlc29ydGVyIHx8IHt9O1xuXG5cdCQuZXh0ZW5kKHRzLmNzcywge1xuXHRcdHN0aWNreSAgICA6ICd0YWJsZXNvcnRlci1zdGlja3lIZWFkZXInLCAvLyBzdGlja3lIZWFkZXJcblx0XHRzdGlja3lWaXMgOiAndGFibGVzb3J0ZXItc3RpY2t5LXZpc2libGUnLFxuXHRcdHN0aWNreUhpZGU6ICd0YWJsZXNvcnRlci1zdGlja3ktaGlkZGVuJyxcblx0XHRzdGlja3lXcmFwOiAndGFibGVzb3J0ZXItc3RpY2t5LXdyYXBwZXInXG5cdH0pO1xuXG5cdC8vIEFkZCBhIHJlc2l6ZSBldmVudCB0byB0YWJsZSBoZWFkZXJzXG5cdHRzLmFkZEhlYWRlclJlc2l6ZUV2ZW50ID0gZnVuY3Rpb24odGFibGUsIGRpc2FibGUsIHNldHRpbmdzKSB7XG5cdFx0dGFibGUgPSAkKHRhYmxlKVswXTsgLy8gbWFrZSBzdXJlIHdlJ3JlIHVzaW5nIGEgZG9tIGVsZW1lbnRcblx0XHRpZiAoICF0YWJsZS5jb25maWcgKSB7IHJldHVybjsgfVxuXHRcdHZhciBkZWZhdWx0cyA9IHtcblx0XHRcdFx0dGltZXIgOiAyNTBcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBzZXR0aW5ncyksXG5cdFx0XHRjID0gdGFibGUuY29uZmlnLFxuXHRcdFx0d28gPSBjLndpZGdldE9wdGlvbnMsXG5cdFx0XHRjaGVja1NpemVzID0gZnVuY3Rpb24oIHRyaWdnZXJFdmVudCApIHtcblx0XHRcdFx0dmFyIGluZGV4LCBoZWFkZXJzLCAkaGVhZGVyLCBzaXplcywgd2lkdGgsIGhlaWdodCxcblx0XHRcdFx0XHRsZW4gPSBjLiRoZWFkZXJzLmxlbmd0aDtcblx0XHRcdFx0d28ucmVzaXplX2ZsYWcgPSB0cnVlO1xuXHRcdFx0XHRoZWFkZXJzID0gW107XG5cdFx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW47IGluZGV4KysgKSB7XG5cdFx0XHRcdFx0JGhlYWRlciA9IGMuJGhlYWRlcnMuZXEoIGluZGV4ICk7XG5cdFx0XHRcdFx0c2l6ZXMgPSAkaGVhZGVyLmRhdGEoICdzYXZlZFNpemVzJyApIHx8IFsgMCwgMCBdOyAvLyBmaXhlcyAjMzk0XG5cdFx0XHRcdFx0d2lkdGggPSAkaGVhZGVyWzBdLm9mZnNldFdpZHRoO1xuXHRcdFx0XHRcdGhlaWdodCA9ICRoZWFkZXJbMF0ub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHRcdGlmICggd2lkdGggIT09IHNpemVzWzBdIHx8IGhlaWdodCAhPT0gc2l6ZXNbMV0gKSB7XG5cdFx0XHRcdFx0XHQkaGVhZGVyLmRhdGEoICdzYXZlZFNpemVzJywgWyB3aWR0aCwgaGVpZ2h0IF0gKTtcblx0XHRcdFx0XHRcdGhlYWRlcnMucHVzaCggJGhlYWRlclswXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIGhlYWRlcnMubGVuZ3RoICYmIHRyaWdnZXJFdmVudCAhPT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoICdyZXNpemUnLCBbIGhlYWRlcnMgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHdvLnJlc2l6ZV9mbGFnID0gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdGNsZWFySW50ZXJ2YWwod28ucmVzaXplX3RpbWVyKTtcblx0XHRpZiAoZGlzYWJsZSkge1xuXHRcdFx0d28ucmVzaXplX2ZsYWcgPSBmYWxzZTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0Y2hlY2tTaXplcyggZmFsc2UgKTtcblx0XHR3by5yZXNpemVfdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRcdGlmICh3by5yZXNpemVfZmxhZykgeyByZXR1cm47IH1cblx0XHRcdGNoZWNrU2l6ZXMoKTtcblx0XHR9LCBvcHRpb25zLnRpbWVyKTtcblx0fTtcblxuXHRmdW5jdGlvbiBnZXRTdGlja3lPZmZzZXQoYywgd28pIHtcblx0XHR2YXIgJGVsID0gaXNOYU4od28uc3RpY2t5SGVhZGVyc19vZmZzZXQpID8gJCh3by5zdGlja3lIZWFkZXJzX29mZnNldCkgOiBbXTtcblx0XHRyZXR1cm4gJGVsLmxlbmd0aCA/XG5cdFx0XHQkZWwuaGVpZ2h0KCkgfHwgMCA6XG5cdFx0XHRwYXJzZUludCh3by5zdGlja3lIZWFkZXJzX29mZnNldCwgMTApIHx8IDA7XG5cdH1cblxuXHQvLyBTdGlja3kgaGVhZGVycyBiYXNlZCBvbiB0aGlzIGF3ZXNvbWUgYXJ0aWNsZTpcblx0Ly8gaHR0cDovL2Nzcy10cmlja3MuY29tLzEzNDY1LXBlcnNpc3RlbnQtaGVhZGVycy9cblx0Ly8gYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9qbW9zYmVjaC9TdGlja3lUYWJsZUhlYWRlcnMgYnkgSm9uYXMgTW9zYmVjaFxuXHQvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHR0cy5hZGRXaWRnZXQoe1xuXHRcdGlkOiAnc3RpY2t5SGVhZGVycycsXG5cdFx0cHJpb3JpdHk6IDU0LCAvLyBzdGlja3kgd2lkZ2V0IG11c3QgYmUgaW5pdGlhbGl6ZWQgYWZ0ZXIgdGhlIGZpbHRlciAmIGJlZm9yZSBwYWdlciB3aWRnZXQhXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0c3RpY2t5SGVhZGVycyA6ICcnLCAgICAgICAvLyBleHRyYSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBzdGlja3kgaGVhZGVyIHJvd1xuXHRcdFx0c3RpY2t5SGVhZGVyc19hcHBlbmRUbyA6IG51bGwsIC8vIGpRdWVyeSBzZWxlY3RvciBvciBvYmplY3QgdG8gcGh5Y2lhbGx5IGF0dGFjaCB0aGUgc3RpY2t5IGhlYWRlcnNcblx0XHRcdHN0aWNreUhlYWRlcnNfYXR0YWNoVG8gOiBudWxsLCAvLyBqUXVlcnkgc2VsZWN0b3Igb3Igb2JqZWN0IHRvIGF0dGFjaCBzY3JvbGwgbGlzdGVuZXIgdG8gKG92ZXJyaWRkZW4gYnkgeFNjcm9sbCAmIHlTY3JvbGwgc2V0dGluZ3MpXG5cdFx0XHRzdGlja3lIZWFkZXJzX3hTY3JvbGwgOiBudWxsLCAvLyBqUXVlcnkgc2VsZWN0b3Igb3Igb2JqZWN0IHRvIG1vbml0b3IgaG9yaXpvbnRhbCBzY3JvbGwgcG9zaXRpb24gKGRlZmF1bHRzOiB4U2Nyb2xsID4gYXR0YWNoVG8gPiB3aW5kb3cpXG5cdFx0XHRzdGlja3lIZWFkZXJzX3lTY3JvbGwgOiBudWxsLCAvLyBqUXVlcnkgc2VsZWN0b3Igb3Igb2JqZWN0IHRvIG1vbml0b3IgdmVydGljYWwgc2Nyb2xsIHBvc2l0aW9uIChkZWZhdWx0czogeVNjcm9sbCA+IGF0dGFjaFRvID4gd2luZG93KVxuXHRcdFx0c3RpY2t5SGVhZGVyc19vZmZzZXQgOiAwLCAvLyBudW1iZXIgb3IganF1ZXJ5IHNlbGVjdG9yIHRhcmdldGluZyB0aGUgcG9zaXRpb246Zml4ZWQgZWxlbWVudFxuXHRcdFx0c3RpY2t5SGVhZGVyc19maWx0ZXJlZFRvVG9wOiB0cnVlLCAvLyBzY3JvbGwgdGFibGUgdG9wIGludG8gdmlldyBhZnRlciBmaWx0ZXJpbmdcblx0XHRcdHN0aWNreUhlYWRlcnNfY2xvbmVJZCA6ICctc3RpY2t5JywgLy8gYWRkZWQgdG8gdGFibGUgSUQsIGlmIGl0IGV4aXN0c1xuXHRcdFx0c3RpY2t5SGVhZGVyc19hZGRSZXNpemVFdmVudCA6IHRydWUsIC8vIHRyaWdnZXIgJ3Jlc2l6ZScgZXZlbnQgb24gaGVhZGVyc1xuXHRcdFx0c3RpY2t5SGVhZGVyc19pbmNsdWRlQ2FwdGlvbiA6IHRydWUsIC8vIGlmIGZhbHNlIGFuZCBhIGNhcHRpb24gZXhpc3QsIGl0IHdvbid0IGJlIGluY2x1ZGVkIGluIHRoZSBzdGlja3kgaGVhZGVyXG5cdFx0XHRzdGlja3lIZWFkZXJzX3pJbmRleCA6IDIgLy8gVGhlIHpJbmRleCBvZiB0aGUgc3RpY2t5SGVhZGVycywgYWxsb3dzIHRoZSB1c2VyIHRvIGFkanVzdCB0aGlzIHRvIHRoZWlyIG5lZWRzXG5cdFx0fSxcblx0XHRmb3JtYXQ6IGZ1bmN0aW9uKHRhYmxlLCBjLCB3bykge1xuXHRcdFx0Ly8gZmlsdGVyIHdpZGdldCBkb2Vzbid0IGluaXRpYWxpemUgb24gYW4gZW1wdHkgdGFibGUuIEZpeGVzICM0NDlcblx0XHRcdGlmICggYy4kdGFibGUuaGFzQ2xhc3MoJ2hhc1N0aWNreUhlYWRlcnMnKSB8fCAoJC5pbkFycmF5KCdmaWx0ZXInLCBjLndpZGdldHMpID49IDAgJiYgIWMuJHRhYmxlLmhhc0NsYXNzKCdoYXNGaWx0ZXJzJykpICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgaW5kZXgsIGxlbiwgJHQsXG5cdFx0XHRcdCR0YWJsZSA9IGMuJHRhYmxlLFxuXHRcdFx0XHQvLyBhZGQgcG9zaXRpb246IHJlbGF0aXZlIHRvIGF0dGFjaCBlbGVtZW50LCBob3BlZnVsbHkgaXQgd29uJ3QgY2F1c2UgdHJvdWJsZS5cblx0XHRcdFx0JGF0dGFjaCA9ICQod28uc3RpY2t5SGVhZGVyc19hdHRhY2hUbyksXG5cdFx0XHRcdG5hbWVzcGFjZSA9IGMubmFtZXNwYWNlICsgJ3N0aWNreWhlYWRlcnMgJyxcblx0XHRcdFx0Ly8gZWxlbWVudCB0byB3YXRjaCBmb3IgdGhlIHNjcm9sbCBldmVudFxuXHRcdFx0XHQkeVNjcm9sbCA9ICQod28uc3RpY2t5SGVhZGVyc195U2Nyb2xsIHx8IHdvLnN0aWNreUhlYWRlcnNfYXR0YWNoVG8gfHwgd2luZG93KSxcblx0XHRcdFx0JHhTY3JvbGwgPSAkKHdvLnN0aWNreUhlYWRlcnNfeFNjcm9sbCB8fCB3by5zdGlja3lIZWFkZXJzX2F0dGFjaFRvIHx8IHdpbmRvdyksXG5cdFx0XHRcdCR0aGVhZCA9ICR0YWJsZS5jaGlsZHJlbigndGhlYWQ6Zmlyc3QnKSxcblx0XHRcdFx0JGhlYWRlciA9ICR0aGVhZC5jaGlsZHJlbigndHInKS5ub3QoJy5zdGlja3ktZmFsc2UnKS5jaGlsZHJlbigpLFxuXHRcdFx0XHQkdGZvb3QgPSAkdGFibGUuY2hpbGRyZW4oJ3Rmb290JyksXG5cdFx0XHRcdHN0aWNreU9mZnNldCA9IGdldFN0aWNreU9mZnNldChjLCB3byksXG5cdFx0XHRcdC8vIGlzIHRoaXMgdGFibGUgbmVzdGVkPyBJZiBzbywgZmluZCBwYXJlbnQgc3RpY2t5IGhlYWRlciB3cmFwcGVyIChkaXYsIG5vdCB0YWJsZSlcblx0XHRcdFx0JG5lc3RlZFN0aWNreSA9ICR0YWJsZS5wYXJlbnQoKS5jbG9zZXN0KCcuJyArIHRzLmNzcy50YWJsZSkuaGFzQ2xhc3MoJ2hhc1N0aWNreUhlYWRlcnMnKSA/XG5cdFx0XHRcdFx0JHRhYmxlLnBhcmVudCgpLmNsb3Nlc3QoJ3RhYmxlLnRhYmxlc29ydGVyJylbMF0uY29uZmlnLndpZGdldE9wdGlvbnMuJHN0aWNreS5wYXJlbnQoKSA6IFtdLFxuXHRcdFx0XHRuZXN0ZWRTdGlja3lUb3AgPSAkbmVzdGVkU3RpY2t5Lmxlbmd0aCA/ICRuZXN0ZWRTdGlja3kuaGVpZ2h0KCkgOiAwLFxuXHRcdFx0XHQvLyBjbG9uZSB0YWJsZSwgdGhlbiB3cmFwIHRvIG1ha2Ugc3RpY2t5IGhlYWRlclxuXHRcdFx0XHQkc3RpY2t5VGFibGUgPSB3by4kc3RpY2t5ID0gJHRhYmxlLmNsb25lKClcblx0XHRcdFx0XHQuYWRkQ2xhc3MoJ2NvbnRhaW5zU3RpY2t5SGVhZGVycyAnICsgdHMuY3NzLnN0aWNreSArICcgJyArIHdvLnN0aWNreUhlYWRlcnMgKyAnICcgKyBjLm5hbWVzcGFjZS5zbGljZSgxKSArICdfZXh0cmFfdGFibGUnIClcblx0XHRcdFx0XHQud3JhcCgnPGRpdiBjbGFzcz1cIicgKyB0cy5jc3Muc3RpY2t5V3JhcCArICdcIj4nKSxcblx0XHRcdFx0JHN0aWNreVdyYXAgPSAkc3RpY2t5VGFibGUucGFyZW50KClcblx0XHRcdFx0XHQuYWRkQ2xhc3ModHMuY3NzLnN0aWNreUhpZGUpXG5cdFx0XHRcdFx0LmNzcyh7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbiAgIDogJGF0dGFjaC5sZW5ndGggPyAnYWJzb2x1dGUnIDogJ2ZpeGVkJyxcblx0XHRcdFx0XHRcdHBhZGRpbmcgICAgOiBwYXJzZUludCggJHN0aWNreVRhYmxlLnBhcmVudCgpLnBhcmVudCgpLmNzcygncGFkZGluZy1sZWZ0JyksIDEwICksXG5cdFx0XHRcdFx0XHR0b3AgICAgICAgIDogc3RpY2t5T2Zmc2V0ICsgbmVzdGVkU3RpY2t5VG9wLFxuXHRcdFx0XHRcdFx0bGVmdCAgICAgICA6IDAsXG5cdFx0XHRcdFx0XHR2aXNpYmlsaXR5IDogJ2hpZGRlbicsXG5cdFx0XHRcdFx0XHR6SW5kZXggICAgIDogd28uc3RpY2t5SGVhZGVyc196SW5kZXggfHwgMlxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHQkc3RpY2t5VGhlYWQgPSAkc3RpY2t5VGFibGUuY2hpbGRyZW4oJ3RoZWFkOmZpcnN0JyksXG5cdFx0XHRcdCRzdGlja3lDZWxscyxcblx0XHRcdFx0bGFzdHN0YXRlID0gJycsXG5cdFx0XHRcdHNldFdpZHRoID0gZnVuY3Rpb24oJG9yaWcsICRjbG9uZSl7XG5cdFx0XHRcdFx0dmFyIGluZGV4LCB3aWR0aCwgYm9yZGVyLCAkY2VsbCwgJHRoaXMsXG5cdFx0XHRcdFx0XHQkY2VsbHMgPSAkb3JpZy5maWx0ZXIoJzp2aXNpYmxlJyksXG5cdFx0XHRcdFx0XHRsZW4gPSAkY2VsbHMubGVuZ3RoO1xuXHRcdFx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW47IGluZGV4KysgKSB7XG5cdFx0XHRcdFx0XHQkY2VsbCA9ICRjbG9uZS5maWx0ZXIoJzp2aXNpYmxlJykuZXEoaW5kZXgpO1xuXHRcdFx0XHRcdFx0JHRoaXMgPSAkY2VsbHMuZXEoaW5kZXgpO1xuXHRcdFx0XHRcdFx0Ly8gY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9qbW9zYmVjaC9TdGlja3lUYWJsZUhlYWRlcnNcblx0XHRcdFx0XHRcdGlmICgkdGhpcy5jc3MoJ2JveC1zaXppbmcnKSA9PT0gJ2JvcmRlci1ib3gnKSB7XG5cdFx0XHRcdFx0XHRcdHdpZHRoID0gJHRoaXMub3V0ZXJXaWR0aCgpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aWYgKCRjZWxsLmNzcygnYm9yZGVyLWNvbGxhcHNlJykgPT09ICdjb2xsYXBzZScpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHdpZHRoID0gcGFyc2VGbG9hdCggd2luZG93LmdldENvbXB1dGVkU3R5bGUoJHRoaXNbMF0sIG51bGwpLndpZHRoICk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIGllOCBvbmx5XG5cdFx0XHRcdFx0XHRcdFx0XHRib3JkZXIgPSBwYXJzZUZsb2F0KCAkdGhpcy5jc3MoJ2JvcmRlci13aWR0aCcpICk7XG5cdFx0XHRcdFx0XHRcdFx0XHR3aWR0aCA9ICR0aGlzLm91dGVyV2lkdGgoKSAtIHBhcnNlRmxvYXQoICR0aGlzLmNzcygncGFkZGluZy1sZWZ0JykgKSAtIHBhcnNlRmxvYXQoICR0aGlzLmNzcygncGFkZGluZy1yaWdodCcpICkgLSBib3JkZXI7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHdpZHRoID0gJHRoaXMud2lkdGgoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0JGNlbGwuY3NzKHtcblx0XHRcdFx0XHRcdFx0J3dpZHRoJzogd2lkdGgsXG5cdFx0XHRcdFx0XHRcdCdtaW4td2lkdGgnOiB3aWR0aCxcblx0XHRcdFx0XHRcdFx0J21heC13aWR0aCc6IHdpZHRoXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGdldExlZnRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiAkYXR0YWNoLmxlbmd0aCA/XG5cdFx0XHRcdFx0XHRwYXJzZUludCgkYXR0YWNoLmNzcygncGFkZGluZy1sZWZ0JyksIDEwKSB8fCAwIDpcblx0XHRcdFx0XHRcdCR0YWJsZS5vZmZzZXQoKS5sZWZ0IC0gcGFyc2VJbnQoJHRhYmxlLmNzcygnbWFyZ2luLWxlZnQnKSwgMTApIC0gJCh3aW5kb3cpLnNjcm9sbExlZnQoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0cmVzaXplSGVhZGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0JHN0aWNreVdyYXAuY3NzKHtcblx0XHRcdFx0XHRcdGxlZnQgOiBnZXRMZWZ0UG9zaXRpb24oKSxcblx0XHRcdFx0XHRcdHdpZHRoOiAkdGFibGUub3V0ZXJXaWR0aCgpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0V2lkdGgoICR0YWJsZSwgJHN0aWNreVRhYmxlICk7XG5cdFx0XHRcdFx0c2V0V2lkdGgoICRoZWFkZXIsICRzdGlja3lDZWxscyApO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRzY3JvbGxTdGlja3kgPSBmdW5jdGlvbiggcmVzaXppbmcgKSB7XG5cdFx0XHRcdFx0aWYgKCEkdGFibGUuaXMoJzp2aXNpYmxlJykpIHsgcmV0dXJuOyB9IC8vIGZpeGVzICMyNzhcblx0XHRcdFx0XHQvLyBEZXRlY3QgbmVzdGVkIHRhYmxlcyAtIGZpeGVzICM3MjRcblx0XHRcdFx0XHRuZXN0ZWRTdGlja3lUb3AgPSAkbmVzdGVkU3RpY2t5Lmxlbmd0aCA/ICRuZXN0ZWRTdGlja3kub2Zmc2V0KCkudG9wIC0gJHlTY3JvbGwuc2Nyb2xsVG9wKCkgKyAkbmVzdGVkU3RpY2t5LmhlaWdodCgpIDogMDtcblx0XHRcdFx0XHR2YXIgdG1wLFxuXHRcdFx0XHRcdFx0b2Zmc2V0ID0gJHRhYmxlLm9mZnNldCgpLFxuXHRcdFx0XHRcdFx0c3RpY2t5T2Zmc2V0ID0gZ2V0U3RpY2t5T2Zmc2V0KGMsIHdvKSxcblx0XHRcdFx0XHRcdHlXaW5kb3cgPSAkLmlzV2luZG93KCAkeVNjcm9sbFswXSApLCAvLyAkLmlzV2luZG93IG5lZWRzIGpRdWVyeSAxLjQuM1xuXHRcdFx0XHRcdFx0YXR0YWNoVG9wID0gJGF0dGFjaC5sZW5ndGggP1xuXHRcdFx0XHRcdFx0XHQoIHlXaW5kb3cgPyAkeVNjcm9sbC5zY3JvbGxUb3AoKSA6ICR5U2Nyb2xsLm9mZnNldCgpLnRvcCApIDpcblx0XHRcdFx0XHRcdFx0JHlTY3JvbGwuc2Nyb2xsVG9wKCksXG5cdFx0XHRcdFx0XHRjYXB0aW9uSGVpZ2h0ID0gd28uc3RpY2t5SGVhZGVyc19pbmNsdWRlQ2FwdGlvbiA/IDAgOiAkdGFibGUuY2hpbGRyZW4oICdjYXB0aW9uJyApLmhlaWdodCgpIHx8IDAsXG5cdFx0XHRcdFx0XHRzY3JvbGxUb3AgPSBhdHRhY2hUb3AgKyBzdGlja3lPZmZzZXQgKyBuZXN0ZWRTdGlja3lUb3AgLSBjYXB0aW9uSGVpZ2h0LFxuXHRcdFx0XHRcdFx0dGFibGVIZWlnaHQgPSAkdGFibGUuaGVpZ2h0KCkgLSAoJHN0aWNreVdyYXAuaGVpZ2h0KCkgKyAoJHRmb290LmhlaWdodCgpIHx8IDApKSAtIGNhcHRpb25IZWlnaHQsXG5cdFx0XHRcdFx0XHRpc1Zpc2libGUgPSAoIHNjcm9sbFRvcCA+IG9mZnNldC50b3AgKSAmJiAoIHNjcm9sbFRvcCA8IG9mZnNldC50b3AgKyB0YWJsZUhlaWdodCApID8gJ3Zpc2libGUnIDogJ2hpZGRlbicsXG5cdFx0XHRcdFx0XHRzdGF0ZSA9IGlzVmlzaWJsZSA9PT0gJ3Zpc2libGUnID8gdHMuY3NzLnN0aWNreVZpcyA6IHRzLmNzcy5zdGlja3lIaWRlLFxuXHRcdFx0XHRcdFx0bmVlZHNVcGRhdGluZyA9ICEkc3RpY2t5V3JhcC5oYXNDbGFzcyggc3RhdGUgKSxcblx0XHRcdFx0XHRcdGNzc1NldHRpbmdzID0geyB2aXNpYmlsaXR5IDogaXNWaXNpYmxlIH07XG5cdFx0XHRcdFx0aWYgKCRhdHRhY2gubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHQvLyBhdHRhY2hlZCBzdGlja3kgaGVhZGVycyBhbHdheXMgbmVlZCB1cGRhdGluZ1xuXHRcdFx0XHRcdFx0bmVlZHNVcGRhdGluZyA9IHRydWU7XG5cdFx0XHRcdFx0XHRjc3NTZXR0aW5ncy50b3AgPSB5V2luZG93ID8gc2Nyb2xsVG9wIC0gJGF0dGFjaC5vZmZzZXQoKS50b3AgOiAkYXR0YWNoLnNjcm9sbFRvcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBhZGp1c3Qgd2hlbiBzY3JvbGxpbmcgaG9yaXpvbnRhbGx5IC0gZml4ZXMgaXNzdWUgIzE0M1xuXHRcdFx0XHRcdHRtcCA9IGdldExlZnRQb3NpdGlvbigpO1xuXHRcdFx0XHRcdGlmICh0bXAgIT09IHBhcnNlSW50KCRzdGlja3lXcmFwLmNzcygnbGVmdCcpLCAxMCkpIHtcblx0XHRcdFx0XHRcdG5lZWRzVXBkYXRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Y3NzU2V0dGluZ3MubGVmdCA9IHRtcDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3NzU2V0dGluZ3MudG9wID0gKCBjc3NTZXR0aW5ncy50b3AgfHwgMCApICsgc3RpY2t5T2Zmc2V0ICsgbmVzdGVkU3RpY2t5VG9wO1xuXHRcdFx0XHRcdGlmIChuZWVkc1VwZGF0aW5nKSB7XG5cdFx0XHRcdFx0XHQkc3RpY2t5V3JhcFxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoIHRzLmNzcy5zdGlja3lWaXMgKyAnICcgKyB0cy5jc3Muc3RpY2t5SGlkZSApXG5cdFx0XHRcdFx0XHRcdC5hZGRDbGFzcyggc3RhdGUgKVxuXHRcdFx0XHRcdFx0XHQuY3NzKGNzc1NldHRpbmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGlzVmlzaWJsZSAhPT0gbGFzdHN0YXRlIHx8IHJlc2l6aW5nKSB7XG5cdFx0XHRcdFx0XHQvLyBtYWtlIHN1cmUgdGhlIGNvbHVtbiB3aWR0aHMgbWF0Y2hcblx0XHRcdFx0XHRcdHJlc2l6ZUhlYWRlcigpO1xuXHRcdFx0XHRcdFx0bGFzdHN0YXRlID0gaXNWaXNpYmxlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdC8vIG9ubHkgYWRkIGEgcG9zaXRpb24gcmVsYXRpdmUgaWYgYSBwb3NpdGlvbiBpc24ndCBhbHJlYWR5IGRlZmluZWRcblx0XHRcdGlmICgkYXR0YWNoLmxlbmd0aCAmJiAhJGF0dGFjaC5jc3MoJ3Bvc2l0aW9uJykpIHtcblx0XHRcdFx0JGF0dGFjaC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0XHQvLyBmaXggY2xvbmUgSUQsIGlmIGl0IGV4aXN0cyAtIGZpeGVzICMyNzFcblx0XHRcdGlmICgkc3RpY2t5VGFibGUuYXR0cignaWQnKSkgeyAkc3RpY2t5VGFibGVbMF0uaWQgKz0gd28uc3RpY2t5SGVhZGVyc19jbG9uZUlkOyB9XG5cdFx0XHQvLyBjbGVhciBvdXQgY2xvbmVkIHRhYmxlLCBleGNlcHQgZm9yIHN0aWNreSBoZWFkZXJcblx0XHRcdC8vIGluY2x1ZGUgY2FwdGlvbiAmIGZpbHRlciByb3cgKGZpeGVzICMxMjYgJiAjMjQ5KSAtIGRvbid0IHJlbW92ZSBjZWxscyB0byBnZXQgY29ycmVjdCBjZWxsIGluZGV4aW5nXG5cdFx0XHQkc3RpY2t5VGFibGUuZmluZCgndGhlYWQ6Z3QoMCksIHRyLnN0aWNreS1mYWxzZScpLmhpZGUoKTtcblx0XHRcdCRzdGlja3lUYWJsZS5maW5kKCd0Ym9keSwgdGZvb3QnKS5yZW1vdmUoKTtcblx0XHRcdCRzdGlja3lUYWJsZS5maW5kKCdjYXB0aW9uJykudG9nZ2xlKHdvLnN0aWNreUhlYWRlcnNfaW5jbHVkZUNhcHRpb24pO1xuXHRcdFx0Ly8gaXNzdWUgIzE3MiAtIGZpbmQgdGQvdGggaW4gc3RpY2t5IGhlYWRlclxuXHRcdFx0JHN0aWNreUNlbGxzID0gJHN0aWNreVRoZWFkLmNoaWxkcmVuKCkuY2hpbGRyZW4oKTtcblx0XHRcdCRzdGlja3lUYWJsZS5jc3MoeyBoZWlnaHQ6MCwgd2lkdGg6MCwgbWFyZ2luOiAwIH0pO1xuXHRcdFx0Ly8gcmVtb3ZlIHJlc2l6YWJsZSBibG9ja1xuXHRcdFx0JHN0aWNreUNlbGxzLmZpbmQoJy4nICsgdHMuY3NzLnJlc2l6ZXIpLnJlbW92ZSgpO1xuXHRcdFx0Ly8gdXBkYXRlIHN0aWNreSBoZWFkZXIgY2xhc3MgbmFtZXMgdG8gbWF0Y2ggcmVhbCBoZWFkZXIgYWZ0ZXIgc29ydGluZ1xuXHRcdFx0JHRhYmxlXG5cdFx0XHRcdC5hZGRDbGFzcygnaGFzU3RpY2t5SGVhZGVycycpXG5cdFx0XHRcdC5iaW5kKCdwYWdlckNvbXBsZXRlJyArIG5hbWVzcGFjZSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmVzaXplSGVhZGVyKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR0cy5iaW5kRXZlbnRzKHRhYmxlLCAkc3RpY2t5VGhlYWQuY2hpbGRyZW4oKS5jaGlsZHJlbignLicgKyB0cy5jc3MuaGVhZGVyKSk7XG5cblx0XHRcdGlmICh3by5zdGlja3lIZWFkZXJzX2FwcGVuZFRvKSB7XG5cdFx0XHRcdCQod28uc3RpY2t5SGVhZGVyc19hcHBlbmRUbykuYXBwZW5kKCAkc3RpY2t5V3JhcCApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gYWRkIHN0aWNreWhlYWRlcnMgQUZURVIgdGhlIHRhYmxlLiBJZiB0aGUgdGFibGUgaXMgc2VsZWN0ZWQgYnkgSUQsIHRoZSBvcmlnaW5hbCBvbmUgKGZpcnN0KSB3aWxsIGJlIHJldHVybmVkLlxuXHRcdFx0XHQkdGFibGUuYWZ0ZXIoICRzdGlja3lXcmFwICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIG9uUmVuZGVySGVhZGVyIGlzIGRlZmluZWQsIHdlIG5lZWQgdG8gZG8gc29tZXRoaW5nIGFib3V0IGl0IChmaXhlcyAjNjQxKVxuXHRcdFx0aWYgKGMub25SZW5kZXJIZWFkZXIpIHtcblx0XHRcdFx0JHQgPSAkc3RpY2t5VGhlYWQuY2hpbGRyZW4oJ3RyJykuY2hpbGRyZW4oKTtcblx0XHRcdFx0bGVuID0gJHQubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKCBpbmRleCA9IDA7IGluZGV4IDwgbGVuOyBpbmRleCsrICkge1xuXHRcdFx0XHRcdC8vIHNlbmQgc2Vjb25kIHBhcmFtZXRlclxuXHRcdFx0XHRcdGMub25SZW5kZXJIZWFkZXIuYXBwbHkoICR0LmVxKCBpbmRleCApLCBbIGluZGV4LCBjLCAkc3RpY2t5VGFibGUgXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIG1ha2UgaXQgc3RpY2t5IVxuXHRcdFx0JHhTY3JvbGwuYWRkKCR5U2Nyb2xsKVxuXHRcdFx0XHQudW5iaW5kKCAoJ3Njcm9sbCByZXNpemUgJy5zcGxpdCgnICcpLmpvaW4oIG5hbWVzcGFjZSApKS5yZXBsYWNlKC9cXHMrL2csICcgJykgKVxuXHRcdFx0XHQuYmluZCgnc2Nyb2xsIHJlc2l6ZSAnLnNwbGl0KCcgJykuam9pbiggbmFtZXNwYWNlICksIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0XHRzY3JvbGxTdGlja3koIGV2ZW50LnR5cGUgPT09ICdyZXNpemUnICk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0Yy4kdGFibGVcblx0XHRcdFx0LnVuYmluZCgnc3RpY2t5SGVhZGVyc1VwZGF0ZScgKyBuYW1lc3BhY2UpXG5cdFx0XHRcdC5iaW5kKCdzdGlja3lIZWFkZXJzVXBkYXRlJyArIG5hbWVzcGFjZSwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRzY3JvbGxTdGlja3koIHRydWUgKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdGlmICh3by5zdGlja3lIZWFkZXJzX2FkZFJlc2l6ZUV2ZW50KSB7XG5cdFx0XHRcdHRzLmFkZEhlYWRlclJlc2l6ZUV2ZW50KHRhYmxlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gbG9vayBmb3IgZmlsdGVyIHdpZGdldFxuXHRcdFx0aWYgKCR0YWJsZS5oYXNDbGFzcygnaGFzRmlsdGVycycpICYmIHdvLmZpbHRlcl9jb2x1bW5GaWx0ZXJzKSB7XG5cdFx0XHRcdC8vIHNjcm9sbCB0YWJsZSBpbnRvIHZpZXcgYWZ0ZXIgZmlsdGVyaW5nLCBpZiBzdGlja3kgaGVhZGVyIGlzIGFjdGl2ZSAtICM0ODJcblx0XHRcdFx0JHRhYmxlLmJpbmQoJ2ZpbHRlckVuZCcgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdC8vICQoJzpmb2N1cycpIG5lZWRzIGpRdWVyeSAxLjYrXG5cdFx0XHRcdFx0dmFyICR0ZCA9ICQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkuY2xvc2VzdCgndGQnKSxcblx0XHRcdFx0XHRcdGNvbHVtbiA9ICR0ZC5wYXJlbnQoKS5jaGlsZHJlbigpLmluZGV4KCR0ZCk7XG5cdFx0XHRcdFx0Ly8gb25seSBzY3JvbGwgaWYgc3RpY2t5IGhlYWRlciBpcyBhY3RpdmVcblx0XHRcdFx0XHRpZiAoJHN0aWNreVdyYXAuaGFzQ2xhc3ModHMuY3NzLnN0aWNreVZpcykgJiYgd28uc3RpY2t5SGVhZGVyc19maWx0ZXJlZFRvVG9wKSB7XG5cdFx0XHRcdFx0XHQvLyBzY3JvbGwgdG8gb3JpZ2luYWwgdGFibGUgKG5vdCBzdGlja3kgY2xvbmUpXG5cdFx0XHRcdFx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwgJHRhYmxlLnBvc2l0aW9uKCkudG9wKTtcblx0XHRcdFx0XHRcdC8vIGdpdmUgc2FtZSBpbnB1dC9zZWxlY3QgZm9jdXM7IGNoZWNrIGlmIGMuJGZpbHRlcnMgZXhpc3RzOyBmaXhlcyAjNTk0XG5cdFx0XHRcdFx0XHRpZiAoY29sdW1uID49IDAgJiYgYy4kZmlsdGVycykge1xuXHRcdFx0XHRcdFx0XHRjLiRmaWx0ZXJzLmVxKGNvbHVtbikuZmluZCgnYSwgc2VsZWN0LCBpbnB1dCcpLmZpbHRlcignOnZpc2libGUnKS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHRzLmZpbHRlci5iaW5kU2VhcmNoKCAkdGFibGUsICRzdGlja3lDZWxscy5maW5kKCcuJyArIHRzLmNzcy5maWx0ZXIpICk7XG5cdFx0XHRcdC8vIHN1cHBvcnQgaGlkZUZpbHRlcnNcblx0XHRcdFx0aWYgKHdvLmZpbHRlcl9oaWRlRmlsdGVycykge1xuXHRcdFx0XHRcdHRzLmZpbHRlci5oaWRlRmlsdGVycyhjLCAkc3RpY2t5VGFibGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlc2l6ZSB0YWJsZSAoRmlyZWZveClcblx0XHRcdGlmICh3by5zdGlja3lIZWFkZXJzX2FkZFJlc2l6ZUV2ZW50KSB7XG5cdFx0XHRcdCR0YWJsZS5iaW5kKCdyZXNpemUnICsgYy5uYW1lc3BhY2UgKyAnc3RpY2t5aGVhZGVycycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJlc2l6ZUhlYWRlcigpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gbWFrZSBzdXJlIHN0aWNreSBpcyB2aXNpYmxlIGlmIHBhZ2UgaXMgcGFydGlhbGx5IHNjcm9sbGVkXG5cdFx0XHRzY3JvbGxTdGlja3koIHRydWUgKTtcblx0XHRcdCR0YWJsZS50cmlnZ2VySGFuZGxlcignc3RpY2t5SGVhZGVyc0luaXQnKTtcblxuXHRcdH0sXG5cdFx0cmVtb3ZlOiBmdW5jdGlvbih0YWJsZSwgYywgd28pIHtcblx0XHRcdHZhciBuYW1lc3BhY2UgPSBjLm5hbWVzcGFjZSArICdzdGlja3loZWFkZXJzICc7XG5cdFx0XHRjLiR0YWJsZVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2hhc1N0aWNreUhlYWRlcnMnKVxuXHRcdFx0XHQudW5iaW5kKCAoJ3BhZ2VyQ29tcGxldGUgcmVzaXplIGZpbHRlckVuZCBzdGlja3lIZWFkZXJzVXBkYXRlICcuc3BsaXQoJyAnKS5qb2luKG5hbWVzcGFjZSkpLnJlcGxhY2UoL1xccysvZywgJyAnKSApXG5cdFx0XHRcdC5uZXh0KCcuJyArIHRzLmNzcy5zdGlja3lXcmFwKS5yZW1vdmUoKTtcblx0XHRcdGlmICh3by4kc3RpY2t5ICYmIHdvLiRzdGlja3kubGVuZ3RoKSB7IHdvLiRzdGlja3kucmVtb3ZlKCk7IH0gLy8gcmVtb3ZlIGNsb25lZCB0YWJsZVxuXHRcdFx0JCh3aW5kb3cpXG5cdFx0XHRcdC5hZGQod28uc3RpY2t5SGVhZGVyc194U2Nyb2xsKVxuXHRcdFx0XHQuYWRkKHdvLnN0aWNreUhlYWRlcnNfeVNjcm9sbClcblx0XHRcdFx0LmFkZCh3by5zdGlja3lIZWFkZXJzX2F0dGFjaFRvKVxuXHRcdFx0XHQudW5iaW5kKCAoJ3Njcm9sbCByZXNpemUgJy5zcGxpdCgnICcpLmpvaW4obmFtZXNwYWNlKSkucmVwbGFjZSgvXFxzKy9nLCAnICcpICk7XG5cdFx0XHR0cy5hZGRIZWFkZXJSZXNpemVFdmVudCh0YWJsZSwgdHJ1ZSk7XG5cdFx0fVxuXHR9KTtcblxufSkoalF1ZXJ5LCB3aW5kb3cpO1xuXG4vKiEgV2lkZ2V0OiByZXNpemFibGUgLSB1cGRhdGVkIDEyLzEzLzIwMTcgKHYyLjI5LjEpICovXG4vKmpzaGludCBicm93c2VyOnRydWUsIGpxdWVyeTp0cnVlLCB1bnVzZWQ6ZmFsc2UgKi9cbjsoZnVuY3Rpb24gKCQsIHdpbmRvdykge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciB0cyA9ICQudGFibGVzb3J0ZXIgfHwge307XG5cblx0JC5leHRlbmQodHMuY3NzLCB7XG5cdFx0cmVzaXphYmxlQ29udGFpbmVyIDogJ3RhYmxlc29ydGVyLXJlc2l6YWJsZS1jb250YWluZXInLFxuXHRcdHJlc2l6YWJsZUhhbmRsZSAgICA6ICd0YWJsZXNvcnRlci1yZXNpemFibGUtaGFuZGxlJyxcblx0XHRyZXNpemFibGVOb1NlbGVjdCAgOiAndGFibGVzb3J0ZXItZGlzYWJsZVNlbGVjdGlvbicsXG5cdFx0cmVzaXphYmxlU3RvcmFnZSAgIDogJ3RhYmxlc29ydGVyLXJlc2l6YWJsZSdcblx0fSk7XG5cblx0Ly8gQWRkIGV4dHJhIHNjcm9sbGVyIGNzc1xuXHQkKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHMgPSAnPHN0eWxlPicgK1xuXHRcdFx0J2JvZHkuJyArIHRzLmNzcy5yZXNpemFibGVOb1NlbGVjdCArICcgeyAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7IC1tb3otdXNlci1zZWxlY3Q6IC1tb3otbm9uZTsnICtcblx0XHRcdFx0Jy1raHRtbC11c2VyLXNlbGVjdDogbm9uZTsgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgdXNlci1zZWxlY3Q6IG5vbmU7IH0nICtcblx0XHRcdCcuJyArIHRzLmNzcy5yZXNpemFibGVDb250YWluZXIgKyAnIHsgcG9zaXRpb246IHJlbGF0aXZlOyBoZWlnaHQ6IDFweDsgfScgK1xuXHRcdFx0Ly8gbWFrZSBoYW5kbGUgei1pbmRleCA+IHRoYW4gc3RpY2t5SGVhZGVyIHotaW5kZXgsIHNvIHRoZSBoYW5kbGUgc3RheXMgYWJvdmUgc3RpY2t5IGhlYWRlclxuXHRcdFx0Jy4nICsgdHMuY3NzLnJlc2l6YWJsZUhhbmRsZSArICcgeyBwb3NpdGlvbjogYWJzb2x1dGU7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDhweDsnICtcblx0XHRcdFx0J3RvcDogMXB4OyBjdXJzb3I6IGV3LXJlc2l6ZTsgei1pbmRleDogMzsgdXNlci1zZWxlY3Q6IG5vbmU7IC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IH0nICtcblx0XHRcdCc8L3N0eWxlPic7XG5cdFx0JCgnaGVhZCcpLmFwcGVuZChzKTtcblx0fSk7XG5cblx0dHMucmVzaXphYmxlID0ge1xuXHRcdGluaXQgOiBmdW5jdGlvbiggYywgd28gKSB7XG5cdFx0XHRpZiAoIGMuJHRhYmxlLmhhc0NsYXNzKCAnaGFzUmVzaXphYmxlJyApICkgeyByZXR1cm47IH1cblx0XHRcdGMuJHRhYmxlLmFkZENsYXNzKCAnaGFzUmVzaXphYmxlJyApO1xuXG5cdFx0XHR2YXIgbm9SZXNpemUsICRoZWFkZXIsIGNvbHVtbiwgc3RvcmVkU2l6ZXMsIHRtcCxcblx0XHRcdFx0JHRhYmxlID0gYy4kdGFibGUsXG5cdFx0XHRcdCRwYXJlbnQgPSAkdGFibGUucGFyZW50KCksXG5cdFx0XHRcdG1hcmdpblRvcCA9IHBhcnNlSW50KCAkdGFibGUuY3NzKCAnbWFyZ2luLXRvcCcgKSwgMTAgKSxcblxuXHRcdFx0Ly8gaW50ZXJuYWwgdmFyaWFibGVzXG5cdFx0XHR2YXJzID0gd28ucmVzaXphYmxlX3ZhcnMgPSB7XG5cdFx0XHRcdHVzZVN0b3JhZ2UgOiB0cy5zdG9yYWdlICYmIHdvLnJlc2l6YWJsZSAhPT0gZmFsc2UsXG5cdFx0XHRcdCR3cmFwIDogJHBhcmVudCxcblx0XHRcdFx0bW91c2VYUG9zaXRpb24gOiAwLFxuXHRcdFx0XHQkdGFyZ2V0IDogbnVsbCxcblx0XHRcdFx0JG5leHQgOiBudWxsLFxuXHRcdFx0XHRvdmVyZmxvdyA6ICRwYXJlbnQuY3NzKCdvdmVyZmxvdycpID09PSAnYXV0bycgfHxcblx0XHRcdFx0XHQkcGFyZW50LmNzcygnb3ZlcmZsb3cnKSA9PT0gJ3Njcm9sbCcgfHxcblx0XHRcdFx0XHQkcGFyZW50LmNzcygnb3ZlcmZsb3cteCcpID09PSAnYXV0bycgfHxcblx0XHRcdFx0XHQkcGFyZW50LmNzcygnb3ZlcmZsb3cteCcpID09PSAnc2Nyb2xsJyxcblx0XHRcdFx0c3RvcmVkU2l6ZXMgOiBbXVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gc2V0IGRlZmF1bHQgd2lkdGhzXG5cdFx0XHR0cy5yZXNpemFibGVSZXNldCggYy50YWJsZSwgdHJ1ZSApO1xuXG5cdFx0XHQvLyBub3cgZ2V0IG1lYXN1cmVtZW50cyFcblx0XHRcdHZhcnMudGFibGVXaWR0aCA9ICR0YWJsZS53aWR0aCgpO1xuXHRcdFx0Ly8gYXR0ZW1wdCB0byBhdXRvZGV0ZWN0XG5cdFx0XHR2YXJzLmZ1bGxXaWR0aCA9IE1hdGguYWJzKCAkcGFyZW50LndpZHRoKCkgLSB2YXJzLnRhYmxlV2lkdGggKSA8IDIwO1xuXG5cdFx0XHQvKlxuXHRcdFx0Ly8gSGFja3kgbWV0aG9kIHRvIGRldGVybWluZSBpZiB0YWJsZSB3aWR0aCBpcyBzZXQgdG8gJ2F1dG8nXG5cdFx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMDg5MjA0OC8xNDUzNDZcblx0XHRcdGlmICggIXZhcnMuZnVsbFdpZHRoICkge1xuXHRcdFx0XHR0bXAgPSAkdGFibGUud2lkdGgoKTtcblx0XHRcdFx0JGhlYWRlciA9ICR0YWJsZS53cmFwKCc8c3Bhbj4nKS5wYXJlbnQoKTsgLy8gdGVtcCB2YXJpYWJsZVxuXHRcdFx0XHRzdG9yZWRTaXplcyA9IHBhcnNlSW50KCAkdGFibGUuY3NzKCAnbWFyZ2luLWxlZnQnICksIDEwICkgfHwgMDtcblx0XHRcdFx0JHRhYmxlLmNzcyggJ21hcmdpbi1sZWZ0Jywgc3RvcmVkU2l6ZXMgKyA1MCApO1xuXHRcdFx0XHR2YXJzLnRhYmxlV2lkdGggPSAkaGVhZGVyLndpZHRoKCkgPiB0bXAgPyAnYXV0bycgOiB0bXA7XG5cdFx0XHRcdCR0YWJsZS5jc3MoICdtYXJnaW4tbGVmdCcsIHN0b3JlZFNpemVzID8gc3RvcmVkU2l6ZXMgOiAnJyApO1xuXHRcdFx0XHQkaGVhZGVyID0gbnVsbDtcblx0XHRcdFx0JHRhYmxlLnVud3JhcCgnPHNwYW4+Jyk7XG5cdFx0XHR9XG5cdFx0XHQqL1xuXG5cdFx0XHRpZiAoIHZhcnMudXNlU3RvcmFnZSAmJiB2YXJzLm92ZXJmbG93ICkge1xuXHRcdFx0XHQvLyBzYXZlIHRhYmxlIHdpZHRoXG5cdFx0XHRcdHRzLnN0b3JhZ2UoIGMudGFibGUsICd0YWJsZXNvcnRlci10YWJsZS1vcmlnaW5hbC1jc3Mtd2lkdGgnLCB2YXJzLnRhYmxlV2lkdGggKTtcblx0XHRcdFx0dG1wID0gdHMuc3RvcmFnZSggYy50YWJsZSwgJ3RhYmxlc29ydGVyLXRhYmxlLXJlc2l6ZWQtd2lkdGgnICkgfHwgJ2F1dG8nO1xuXHRcdFx0XHR0cy5yZXNpemFibGUuc2V0V2lkdGgoICR0YWJsZSwgdG1wLCB0cnVlICk7XG5cdFx0XHR9XG5cdFx0XHR3by5yZXNpemFibGVfdmFycy5zdG9yZWRTaXplcyA9IHN0b3JlZFNpemVzID0gKCB2YXJzLnVzZVN0b3JhZ2UgP1xuXHRcdFx0XHR0cy5zdG9yYWdlKCBjLnRhYmxlLCB0cy5jc3MucmVzaXphYmxlU3RvcmFnZSApIDpcblx0XHRcdFx0W10gKSB8fCBbXTtcblx0XHRcdHRzLnJlc2l6YWJsZS5zZXRXaWR0aHMoIGMsIHdvLCBzdG9yZWRTaXplcyApO1xuXHRcdFx0dHMucmVzaXphYmxlLnVwZGF0ZVN0b3JlZFNpemVzKCBjLCB3byApO1xuXG5cdFx0XHR3by4kcmVzaXphYmxlX2NvbnRhaW5lciA9ICQoICc8ZGl2IGNsYXNzPVwiJyArIHRzLmNzcy5yZXNpemFibGVDb250YWluZXIgKyAnXCI+JyApXG5cdFx0XHRcdC5jc3MoeyB0b3AgOiBtYXJnaW5Ub3AgfSlcblx0XHRcdFx0Lmluc2VydEJlZm9yZSggJHRhYmxlICk7XG5cdFx0XHQvLyBhZGQgY29udGFpbmVyXG5cdFx0XHRmb3IgKCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBjLmNvbHVtbnM7IGNvbHVtbisrICkge1xuXHRcdFx0XHQkaGVhZGVyID0gYy4kaGVhZGVySW5kZXhlZFsgY29sdW1uIF07XG5cdFx0XHRcdHRtcCA9IHRzLmdldENvbHVtbkRhdGEoIGMudGFibGUsIGMuaGVhZGVycywgY29sdW1uICk7XG5cdFx0XHRcdG5vUmVzaXplID0gdHMuZ2V0RGF0YSggJGhlYWRlciwgdG1wLCAncmVzaXphYmxlJyApID09PSAnZmFsc2UnO1xuXHRcdFx0XHRpZiAoICFub1Jlc2l6ZSApIHtcblx0XHRcdFx0XHQkKCAnPGRpdiBjbGFzcz1cIicgKyB0cy5jc3MucmVzaXphYmxlSGFuZGxlICsgJ1wiPicgKVxuXHRcdFx0XHRcdFx0LmFwcGVuZFRvKCB3by4kcmVzaXphYmxlX2NvbnRhaW5lciApXG5cdFx0XHRcdFx0XHQuYXR0cih7XG5cdFx0XHRcdFx0XHRcdCdkYXRhLWNvbHVtbicgOiBjb2x1bW4sXG5cdFx0XHRcdFx0XHRcdCd1bnNlbGVjdGFibGUnIDogJ29uJ1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5kYXRhKCAnaGVhZGVyJywgJGhlYWRlciApXG5cdFx0XHRcdFx0XHQuYmluZCggJ3NlbGVjdHN0YXJ0JywgZmFsc2UgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dHMucmVzaXphYmxlLmJpbmRpbmdzKCBjLCB3byApO1xuXHRcdH0sXG5cblx0XHR1cGRhdGVTdG9yZWRTaXplcyA6IGZ1bmN0aW9uKCBjLCB3byApIHtcblx0XHRcdHZhciBjb2x1bW4sICRoZWFkZXIsXG5cdFx0XHRcdGxlbiA9IGMuY29sdW1ucyxcblx0XHRcdFx0dmFycyA9IHdvLnJlc2l6YWJsZV92YXJzO1xuXHRcdFx0dmFycy5zdG9yZWRTaXplcyA9IFtdO1xuXHRcdFx0Zm9yICggY29sdW1uID0gMDsgY29sdW1uIDwgbGVuOyBjb2x1bW4rKyApIHtcblx0XHRcdFx0JGhlYWRlciA9IGMuJGhlYWRlckluZGV4ZWRbIGNvbHVtbiBdO1xuXHRcdFx0XHR2YXJzLnN0b3JlZFNpemVzWyBjb2x1bW4gXSA9ICRoZWFkZXIuaXMoJzp2aXNpYmxlJykgPyAkaGVhZGVyLndpZHRoKCkgOiAwO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXRXaWR0aCA6IGZ1bmN0aW9uKCAkZWwsIHdpZHRoLCBvdmVyZmxvdyApIHtcblx0XHRcdC8vIG92ZXJmbG93IHRhYmxlcyBuZWVkIG1pbiAmIG1heCB3aWR0aCBzZXQgYXMgd2VsbFxuXHRcdFx0JGVsLmNzcyh7XG5cdFx0XHRcdCd3aWR0aCcgOiB3aWR0aCxcblx0XHRcdFx0J21pbi13aWR0aCcgOiBvdmVyZmxvdyA/IHdpZHRoIDogJycsXG5cdFx0XHRcdCdtYXgtd2lkdGgnIDogb3ZlcmZsb3cgPyB3aWR0aCA6ICcnXG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0c2V0V2lkdGhzIDogZnVuY3Rpb24oIGMsIHdvLCBzdG9yZWRTaXplcyApIHtcblx0XHRcdHZhciBjb2x1bW4sICR0ZW1wLFxuXHRcdFx0XHR2YXJzID0gd28ucmVzaXphYmxlX3ZhcnMsXG5cdFx0XHRcdCRleHRyYSA9ICQoIGMubmFtZXNwYWNlICsgJ19leHRyYV9oZWFkZXJzJyApLFxuXHRcdFx0XHQkY29sID0gYy4kdGFibGUuY2hpbGRyZW4oICdjb2xncm91cCcgKS5jaGlsZHJlbiggJ2NvbCcgKTtcblx0XHRcdHN0b3JlZFNpemVzID0gc3RvcmVkU2l6ZXMgfHwgdmFycy5zdG9yZWRTaXplcyB8fCBbXTtcblx0XHRcdC8vIHByb2Nlc3Mgb25seSBpZiB0YWJsZSBJRCBvciB1cmwgbWF0Y2hcblx0XHRcdGlmICggc3RvcmVkU2l6ZXMubGVuZ3RoICkge1xuXHRcdFx0XHRmb3IgKCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBjLmNvbHVtbnM7IGNvbHVtbisrICkge1xuXHRcdFx0XHRcdC8vIHNldCBzYXZlZCByZXNpemFibGUgd2lkdGhzXG5cdFx0XHRcdFx0dHMucmVzaXphYmxlLnNldFdpZHRoKCBjLiRoZWFkZXJJbmRleGVkWyBjb2x1bW4gXSwgc3RvcmVkU2l6ZXNbIGNvbHVtbiBdLCB2YXJzLm92ZXJmbG93ICk7XG5cdFx0XHRcdFx0aWYgKCAkZXh0cmEubGVuZ3RoICkge1xuXHRcdFx0XHRcdFx0Ly8gc3RpY2t5SGVhZGVycyBuZWVkcyB0byBtb2RpZnkgbWluICYgbWF4IHdpZHRoIGFzIHdlbGxcblx0XHRcdFx0XHRcdCR0ZW1wID0gJGV4dHJhLmVxKCBjb2x1bW4gKS5hZGQoICRjb2wuZXEoIGNvbHVtbiApICk7XG5cdFx0XHRcdFx0XHR0cy5yZXNpemFibGUuc2V0V2lkdGgoICR0ZW1wLCBzdG9yZWRTaXplc1sgY29sdW1uIF0sIHZhcnMub3ZlcmZsb3cgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JHRlbXAgPSAkKCBjLm5hbWVzcGFjZSArICdfZXh0cmFfdGFibGUnICk7XG5cdFx0XHRcdGlmICggJHRlbXAubGVuZ3RoICYmICF0cy5oYXNXaWRnZXQoIGMudGFibGUsICdzY3JvbGxlcicgKSApIHtcblx0XHRcdFx0XHR0cy5yZXNpemFibGUuc2V0V2lkdGgoICR0ZW1wLCBjLiR0YWJsZS5vdXRlcldpZHRoKCksIHZhcnMub3ZlcmZsb3cgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXRIYW5kbGVQb3NpdGlvbiA6IGZ1bmN0aW9uKCBjLCB3byApIHtcblx0XHRcdHZhciBzdGFydFBvc2l0aW9uLFxuXHRcdFx0XHR0YWJsZUhlaWdodCA9IGMuJHRhYmxlLmhlaWdodCgpLFxuXHRcdFx0XHQkaGFuZGxlcyA9IHdvLiRyZXNpemFibGVfY29udGFpbmVyLmNoaWxkcmVuKCksXG5cdFx0XHRcdGhhbmRsZUNlbnRlciA9IE1hdGguZmxvb3IoICRoYW5kbGVzLndpZHRoKCkgLyAyICk7XG5cblx0XHRcdGlmICggdHMuaGFzV2lkZ2V0KCBjLnRhYmxlLCAnc2Nyb2xsZXInICkgKSB7XG5cdFx0XHRcdHRhYmxlSGVpZ2h0ID0gMDtcblx0XHRcdFx0Yy4kdGFibGUuY2xvc2VzdCggJy4nICsgdHMuY3NzLnNjcm9sbGVyV3JhcCApLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyk7XG5cdFx0XHRcdFx0Ly8gY2VudGVyIHRhYmxlIGhhcyBhIG1heC1oZWlnaHQgc2V0XG5cdFx0XHRcdFx0dGFibGVIZWlnaHQgKz0gJHRoaXMuZmlsdGVyKCdbc3R5bGUqPVwiaGVpZ2h0XCJdJykubGVuZ3RoID8gJHRoaXMuaGVpZ2h0KCkgOiAkdGhpcy5jaGlsZHJlbigndGFibGUnKS5oZWlnaHQoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggIXdvLnJlc2l6YWJsZV9pbmNsdWRlRm9vdGVyICYmIGMuJHRhYmxlLmNoaWxkcmVuKCd0Zm9vdCcpLmxlbmd0aCApIHtcblx0XHRcdFx0dGFibGVIZWlnaHQgLT0gYy4kdGFibGUuY2hpbGRyZW4oJ3Rmb290JykuaGVpZ2h0KCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBzdWJ0cmFjdCBvdXQgdGFibGUgbGVmdCBwb3NpdGlvbiBmcm9tIHJlc2l6YWJsZSBoYW5kbGVzLiBGaXhlcyAjODY0XG5cdFx0XHRzdGFydFBvc2l0aW9uID0gYy4kdGFibGUucG9zaXRpb24oKS5sZWZ0O1xuXHRcdFx0JGhhbmRsZXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdFx0Y29sdW1uID0gcGFyc2VJbnQoICR0aGlzLmF0dHIoICdkYXRhLWNvbHVtbicgKSwgMTAgKSxcblx0XHRcdFx0XHRjb2x1bW5zID0gYy5jb2x1bW5zIC0gMSxcblx0XHRcdFx0XHQkaGVhZGVyID0gJHRoaXMuZGF0YSggJ2hlYWRlcicgKTtcblx0XHRcdFx0aWYgKCAhJGhlYWRlciApIHsgcmV0dXJuOyB9IC8vIHNlZSAjODU5XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHQhJGhlYWRlci5pcygnOnZpc2libGUnKSB8fFxuXHRcdFx0XHRcdCggIXdvLnJlc2l6YWJsZV9hZGRMYXN0Q29sdW1uICYmIHRzLnJlc2l6YWJsZS5jaGVja1Zpc2libGVDb2x1bW5zKGMsIGNvbHVtbikgKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHQkdGhpcy5oaWRlKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGNvbHVtbiA8IGNvbHVtbnMgfHwgY29sdW1uID09PSBjb2x1bW5zICYmIHdvLnJlc2l6YWJsZV9hZGRMYXN0Q29sdW1uICkge1xuXHRcdFx0XHRcdCR0aGlzLmNzcyh7XG5cdFx0XHRcdFx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRcdFx0XHRcdGhlaWdodCA6IHRhYmxlSGVpZ2h0LFxuXHRcdFx0XHRcdFx0bGVmdCA6ICRoZWFkZXIucG9zaXRpb24oKS5sZWZ0IC0gc3RhcnRQb3NpdGlvbiArICRoZWFkZXIub3V0ZXJXaWR0aCgpIC0gaGFuZGxlQ2VudGVyXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBGaXhlcyAjMTQ4NVxuXHRcdGNoZWNrVmlzaWJsZUNvbHVtbnM6IGZ1bmN0aW9uKCBjLCBjb2x1bW4gKSB7XG5cdFx0XHR2YXIgaSxcblx0XHRcdFx0bGVuID0gMDtcblx0XHRcdGZvciAoIGkgPSBjb2x1bW4gKyAxOyBpIDwgYy5jb2x1bW5zOyBpKysgKSB7XG5cdFx0XHRcdGxlbiArPSBjLiRoZWFkZXJJbmRleGVkW2ldLmlzKCAnOnZpc2libGUnICkgPyAxIDogMDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBsZW4gPT09IDA7XG5cdFx0fSxcblxuXHRcdC8vIHByZXZlbnQgdGV4dCBzZWxlY3Rpb24gd2hpbGUgZHJhZ2dpbmcgcmVzaXplIGJhclxuXHRcdHRvZ2dsZVRleHRTZWxlY3Rpb24gOiBmdW5jdGlvbiggYywgd28sIHRvZ2dsZSApIHtcblx0XHRcdHZhciBuYW1lc3BhY2UgPSBjLm5hbWVzcGFjZSArICd0c3Jlc2l6ZSc7XG5cdFx0XHR3by5yZXNpemFibGVfdmFycy5kaXNhYmxlZCA9IHRvZ2dsZTtcblx0XHRcdCQoICdib2R5JyApLnRvZ2dsZUNsYXNzKCB0cy5jc3MucmVzaXphYmxlTm9TZWxlY3QsIHRvZ2dsZSApO1xuXHRcdFx0aWYgKCB0b2dnbGUgKSB7XG5cdFx0XHRcdCQoICdib2R5JyApXG5cdFx0XHRcdFx0LmF0dHIoICd1bnNlbGVjdGFibGUnLCAnb24nIClcblx0XHRcdFx0XHQuYmluZCggJ3NlbGVjdHN0YXJ0JyArIG5hbWVzcGFjZSwgZmFsc2UgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdCQoICdib2R5JyApXG5cdFx0XHRcdFx0LnJlbW92ZUF0dHIoICd1bnNlbGVjdGFibGUnIClcblx0XHRcdFx0XHQudW5iaW5kKCAnc2VsZWN0c3RhcnQnICsgbmFtZXNwYWNlICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGJpbmRpbmdzIDogZnVuY3Rpb24oIGMsIHdvICkge1xuXHRcdFx0dmFyIG5hbWVzcGFjZSA9IGMubmFtZXNwYWNlICsgJ3RzcmVzaXplJztcblx0XHRcdHdvLiRyZXNpemFibGVfY29udGFpbmVyLmNoaWxkcmVuKCkuYmluZCggJ21vdXNlZG93bicsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0Ly8gc2F2ZSBoZWFkZXIgY2VsbCBhbmQgbW91c2UgcG9zaXRpb25cblx0XHRcdFx0dmFyIGNvbHVtbixcblx0XHRcdFx0XHR2YXJzID0gd28ucmVzaXphYmxlX3ZhcnMsXG5cdFx0XHRcdFx0JGV4dHJhcyA9ICQoIGMubmFtZXNwYWNlICsgJ19leHRyYV9oZWFkZXJzJyApLFxuXHRcdFx0XHRcdCRoZWFkZXIgPSAkKCBldmVudC50YXJnZXQgKS5kYXRhKCAnaGVhZGVyJyApO1xuXG5cdFx0XHRcdGNvbHVtbiA9IHBhcnNlSW50KCAkaGVhZGVyLmF0dHIoICdkYXRhLWNvbHVtbicgKSwgMTAgKTtcblx0XHRcdFx0dmFycy4kdGFyZ2V0ID0gJGhlYWRlciA9ICRoZWFkZXIuYWRkKCAkZXh0cmFzLmZpbHRlcignW2RhdGEtY29sdW1uPVwiJyArIGNvbHVtbiArICdcIl0nKSApO1xuXHRcdFx0XHR2YXJzLnRhcmdldCA9IGNvbHVtbjtcblxuXHRcdFx0XHQvLyBpZiB0YWJsZSBpcyBub3QgYXMgd2lkZSBhcyBpdCdzIHBhcmVudCwgdGhlbiByZXNpemUgdGhlIHRhYmxlXG5cdFx0XHRcdHZhcnMuJG5leHQgPSBldmVudC5zaGlmdEtleSB8fCB3by5yZXNpemFibGVfdGFyZ2V0TGFzdCA/XG5cdFx0XHRcdFx0JGhlYWRlci5wYXJlbnQoKS5jaGlsZHJlbigpLm5vdCggJy5yZXNpemFibGUtZmFsc2UnICkuZmlsdGVyKCAnOmxhc3QnICkgOlxuXHRcdFx0XHRcdCRoZWFkZXIubmV4dEFsbCggJzpub3QoLnJlc2l6YWJsZS1mYWxzZSknICkuZXEoIDAgKTtcblxuXHRcdFx0XHRjb2x1bW4gPSBwYXJzZUludCggdmFycy4kbmV4dC5hdHRyKCAnZGF0YS1jb2x1bW4nICksIDEwICk7XG5cdFx0XHRcdHZhcnMuJG5leHQgPSB2YXJzLiRuZXh0LmFkZCggJGV4dHJhcy5maWx0ZXIoJ1tkYXRhLWNvbHVtbj1cIicgKyBjb2x1bW4gKyAnXCJdJykgKTtcblx0XHRcdFx0dmFycy5uZXh0ID0gY29sdW1uO1xuXG5cdFx0XHRcdHZhcnMubW91c2VYUG9zaXRpb24gPSBldmVudC5wYWdlWDtcblx0XHRcdFx0dHMucmVzaXphYmxlLnVwZGF0ZVN0b3JlZFNpemVzKCBjLCB3byApO1xuXHRcdFx0XHR0cy5yZXNpemFibGUudG9nZ2xlVGV4dFNlbGVjdGlvbihjLCB3bywgdHJ1ZSApO1xuXHRcdFx0fSk7XG5cblx0XHRcdCQoIGRvY3VtZW50IClcblx0XHRcdFx0LmJpbmQoICdtb3VzZW1vdmUnICsgbmFtZXNwYWNlLCBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdFx0dmFyIHZhcnMgPSB3by5yZXNpemFibGVfdmFycztcblx0XHRcdFx0XHQvLyBpZ25vcmUgbW91c2Vtb3ZlIGlmIG5vIG1vdXNlZG93blxuXHRcdFx0XHRcdGlmICggIXZhcnMuZGlzYWJsZWQgfHwgdmFycy5tb3VzZVhQb3NpdGlvbiA9PT0gMCB8fCAhdmFycy4kdGFyZ2V0ICkgeyByZXR1cm47IH1cblx0XHRcdFx0XHRpZiAoIHdvLnJlc2l6YWJsZV90aHJvdHRsZSApIHtcblx0XHRcdFx0XHRcdGNsZWFyVGltZW91dCggdmFycy50aW1lciApO1xuXHRcdFx0XHRcdFx0dmFycy50aW1lciA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHR0cy5yZXNpemFibGUubW91c2VNb3ZlKCBjLCB3bywgZXZlbnQgKTtcblx0XHRcdFx0XHRcdH0sIGlzTmFOKCB3by5yZXNpemFibGVfdGhyb3R0bGUgKSA/IDUgOiB3by5yZXNpemFibGVfdGhyb3R0bGUgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dHMucmVzaXphYmxlLm1vdXNlTW92ZSggYywgd28sIGV2ZW50ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuYmluZCggJ21vdXNldXAnICsgbmFtZXNwYWNlLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIXdvLnJlc2l6YWJsZV92YXJzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuXHRcdFx0XHRcdHRzLnJlc2l6YWJsZS50b2dnbGVUZXh0U2VsZWN0aW9uKCBjLCB3bywgZmFsc2UgKTtcblx0XHRcdFx0XHR0cy5yZXNpemFibGUuc3RvcFJlc2l6ZSggYywgd28gKTtcblx0XHRcdFx0XHR0cy5yZXNpemFibGUuc2V0SGFuZGxlUG9zaXRpb24oIGMsIHdvICk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHQvLyByZXNpemVFbmQgZXZlbnQgdHJpZ2dlcmVkIGJ5IHNjcm9sbGVyIHdpZGdldFxuXHRcdFx0JCggd2luZG93ICkuYmluZCggJ3Jlc2l6ZScgKyBuYW1lc3BhY2UgKyAnIHJlc2l6ZUVuZCcgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0cy5yZXNpemFibGUuc2V0SGFuZGxlUG9zaXRpb24oIGMsIHdvICk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gcmlnaHQgY2xpY2sgdG8gcmVzZXQgY29sdW1ucyB0byBkZWZhdWx0IHdpZHRoc1xuXHRcdFx0Yy4kdGFibGVcblx0XHRcdFx0LmJpbmQoICdjb2x1bW5VcGRhdGUgcGFnZXJDb21wbGV0ZSByZXNpemFibGVVcGRhdGUgJy5zcGxpdCggJyAnICkuam9pbiggbmFtZXNwYWNlICsgJyAnICksIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHRzLnJlc2l6YWJsZS5zZXRIYW5kbGVQb3NpdGlvbiggYywgd28gKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmJpbmQoICdyZXNpemFibGVSZXNldCcgKyBuYW1lc3BhY2UsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHRzLnJlc2l6YWJsZVJlc2V0KCBjLnRhYmxlICk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5maW5kKCAndGhlYWQ6Zmlyc3QnIClcblx0XHRcdFx0LmFkZCggJCggYy5uYW1lc3BhY2UgKyAnX2V4dHJhX3RhYmxlJyApLmZpbmQoICd0aGVhZDpmaXJzdCcgKSApXG5cdFx0XHRcdC5iaW5kKCAnY29udGV4dG1lbnUnICsgbmFtZXNwYWNlLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvLyAkLmlzRW1wdHlPYmplY3QoKSBuZWVkcyBqUXVlcnkgMS40KzsgYWxsb3cgcmlnaHQgY2xpY2sgaWYgYWxyZWFkeSByZXNldFxuXHRcdFx0XHRcdHZhciBhbGxvd0NsaWNrID0gd28ucmVzaXphYmxlX3ZhcnMuc3RvcmVkU2l6ZXMubGVuZ3RoID09PSAwO1xuXHRcdFx0XHRcdHRzLnJlc2l6YWJsZVJlc2V0KCBjLnRhYmxlICk7XG5cdFx0XHRcdFx0dHMucmVzaXphYmxlLnNldEhhbmRsZVBvc2l0aW9uKCBjLCB3byApO1xuXHRcdFx0XHRcdHdvLnJlc2l6YWJsZV92YXJzLnN0b3JlZFNpemVzID0gW107XG5cdFx0XHRcdFx0cmV0dXJuIGFsbG93Q2xpY2s7XG5cdFx0XHRcdH0pO1xuXG5cdFx0fSxcblxuXHRcdG1vdXNlTW92ZSA6IGZ1bmN0aW9uKCBjLCB3bywgZXZlbnQgKSB7XG5cdFx0XHRpZiAoIHdvLnJlc2l6YWJsZV92YXJzLm1vdXNlWFBvc2l0aW9uID09PSAwIHx8ICF3by5yZXNpemFibGVfdmFycy4kdGFyZ2V0ICkgeyByZXR1cm47IH1cblx0XHRcdC8vIHJlc2l6ZSBjb2x1bW5zXG5cdFx0XHR2YXIgY29sdW1uLFxuXHRcdFx0XHR0b3RhbCA9IDAsXG5cdFx0XHRcdHZhcnMgPSB3by5yZXNpemFibGVfdmFycyxcblx0XHRcdFx0JG5leHQgPSB2YXJzLiRuZXh0LFxuXHRcdFx0XHR0YXIgPSB2YXJzLnN0b3JlZFNpemVzWyB2YXJzLnRhcmdldCBdLFxuXHRcdFx0XHRsZWZ0RWRnZSA9IGV2ZW50LnBhZ2VYIC0gdmFycy5tb3VzZVhQb3NpdGlvbjtcblx0XHRcdGlmICggdmFycy5vdmVyZmxvdyApIHtcblx0XHRcdFx0aWYgKCB0YXIgKyBsZWZ0RWRnZSA+IDAgKSB7XG5cdFx0XHRcdFx0dmFycy5zdG9yZWRTaXplc1sgdmFycy50YXJnZXQgXSArPSBsZWZ0RWRnZTtcblx0XHRcdFx0XHR0cy5yZXNpemFibGUuc2V0V2lkdGgoIHZhcnMuJHRhcmdldCwgdmFycy5zdG9yZWRTaXplc1sgdmFycy50YXJnZXQgXSwgdHJ1ZSApO1xuXHRcdFx0XHRcdC8vIHVwZGF0ZSB0aGUgZW50aXJlIHRhYmxlIHdpZHRoXG5cdFx0XHRcdFx0Zm9yICggY29sdW1uID0gMDsgY29sdW1uIDwgYy5jb2x1bW5zOyBjb2x1bW4rKyApIHtcblx0XHRcdFx0XHRcdHRvdGFsICs9IHZhcnMuc3RvcmVkU2l6ZXNbIGNvbHVtbiBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0cy5yZXNpemFibGUuc2V0V2lkdGgoIGMuJHRhYmxlLmFkZCggJCggYy5uYW1lc3BhY2UgKyAnX2V4dHJhX3RhYmxlJyApICksIHRvdGFsICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCAhJG5leHQubGVuZ3RoICkge1xuXHRcdFx0XHRcdC8vIGlmIGV4cGFuZGluZyByaWdodC1tb3N0IGNvbHVtbiwgc2Nyb2xsIHRoZSB3cmFwcGVyXG5cdFx0XHRcdFx0dmFycy4kd3JhcFswXS5zY3JvbGxMZWZ0ID0gYy4kdGFibGUud2lkdGgoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICggdmFycy5mdWxsV2lkdGggKSB7XG5cdFx0XHRcdHZhcnMuc3RvcmVkU2l6ZXNbIHZhcnMudGFyZ2V0IF0gKz0gbGVmdEVkZ2U7XG5cdFx0XHRcdHZhcnMuc3RvcmVkU2l6ZXNbIHZhcnMubmV4dCBdIC09IGxlZnRFZGdlO1xuXHRcdFx0XHR0cy5yZXNpemFibGUuc2V0V2lkdGhzKCBjLCB3byApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFycy5zdG9yZWRTaXplc1sgdmFycy50YXJnZXQgXSArPSBsZWZ0RWRnZTtcblx0XHRcdFx0dHMucmVzaXphYmxlLnNldFdpZHRocyggYywgd28gKTtcblx0XHRcdH1cblx0XHRcdHZhcnMubW91c2VYUG9zaXRpb24gPSBldmVudC5wYWdlWDtcblx0XHRcdC8vIGR5bmFtaWNhbGx5IHVwZGF0ZSBzdGlja3kgaGVhZGVyIHdpZHRoc1xuXHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoJ3N0aWNreUhlYWRlcnNVcGRhdGUnKTtcblx0XHR9LFxuXG5cdFx0c3RvcFJlc2l6ZSA6IGZ1bmN0aW9uKCBjLCB3byApIHtcblx0XHRcdHZhciB2YXJzID0gd28ucmVzaXphYmxlX3ZhcnM7XG5cdFx0XHR0cy5yZXNpemFibGUudXBkYXRlU3RvcmVkU2l6ZXMoIGMsIHdvICk7XG5cdFx0XHRpZiAoIHZhcnMudXNlU3RvcmFnZSApIHtcblx0XHRcdFx0Ly8gc2F2ZSBhbGwgY29sdW1uIHdpZHRoc1xuXHRcdFx0XHR0cy5zdG9yYWdlKCBjLnRhYmxlLCB0cy5jc3MucmVzaXphYmxlU3RvcmFnZSwgdmFycy5zdG9yZWRTaXplcyApO1xuXHRcdFx0XHR0cy5zdG9yYWdlKCBjLnRhYmxlLCAndGFibGVzb3J0ZXItdGFibGUtcmVzaXplZC13aWR0aCcsIGMuJHRhYmxlLndpZHRoKCkgKTtcblx0XHRcdH1cblx0XHRcdHZhcnMubW91c2VYUG9zaXRpb24gPSAwO1xuXHRcdFx0dmFycy4kdGFyZ2V0ID0gdmFycy4kbmV4dCA9IG51bGw7XG5cdFx0XHQvLyB3aWxsIHVwZGF0ZSBzdGlja3lIZWFkZXJzLCBqdXN0IGluIGNhc2UsIHNlZSAjOTEyXG5cdFx0XHRjLiR0YWJsZS50cmlnZ2VySGFuZGxlcignc3RpY2t5SGVhZGVyc1VwZGF0ZScpO1xuXHRcdFx0Yy4kdGFibGUudHJpZ2dlckhhbmRsZXIoJ3Jlc2l6YWJsZUNvbXBsZXRlJyk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIHRoaXMgd2lkZ2V0IHNhdmVzIHRoZSBjb2x1bW4gd2lkdGhzIGlmXG5cdC8vICQudGFibGVzb3J0ZXIuc3RvcmFnZSBmdW5jdGlvbiBpcyBpbmNsdWRlZFxuXHQvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHR0cy5hZGRXaWRnZXQoe1xuXHRcdGlkOiAncmVzaXphYmxlJyxcblx0XHRwcmlvcml0eTogNDAsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0cmVzaXphYmxlIDogdHJ1ZSwgLy8gc2F2ZSBjb2x1bW4gd2lkdGhzIHRvIHN0b3JhZ2Vcblx0XHRcdHJlc2l6YWJsZV9hZGRMYXN0Q29sdW1uIDogZmFsc2UsXG5cdFx0XHRyZXNpemFibGVfaW5jbHVkZUZvb3RlcjogdHJ1ZSxcblx0XHRcdHJlc2l6YWJsZV93aWR0aHMgOiBbXSxcblx0XHRcdHJlc2l6YWJsZV90aHJvdHRsZSA6IGZhbHNlLCAvLyBzZXQgdG8gdHJ1ZSAoNW1zKSBvciBhbnkgbnVtYmVyIDAtMTAgcmFuZ2Vcblx0XHRcdHJlc2l6YWJsZV90YXJnZXRMYXN0IDogZmFsc2Vcblx0XHR9LFxuXHRcdGluaXQ6IGZ1bmN0aW9uKHRhYmxlLCB0aGlzV2lkZ2V0LCBjLCB3bykge1xuXHRcdFx0dHMucmVzaXphYmxlLmluaXQoIGMsIHdvICk7XG5cdFx0fSxcblx0XHRmb3JtYXQ6IGZ1bmN0aW9uKCB0YWJsZSwgYywgd28gKSB7XG5cdFx0XHR0cy5yZXNpemFibGUuc2V0SGFuZGxlUG9zaXRpb24oIGMsIHdvICk7XG5cdFx0fSxcblx0XHRyZW1vdmU6IGZ1bmN0aW9uKCB0YWJsZSwgYywgd28sIHJlZnJlc2hpbmcgKSB7XG5cdFx0XHRpZiAod28uJHJlc2l6YWJsZV9jb250YWluZXIpIHtcblx0XHRcdFx0dmFyIG5hbWVzcGFjZSA9IGMubmFtZXNwYWNlICsgJ3RzcmVzaXplJztcblx0XHRcdFx0Yy4kdGFibGUuYWRkKCAkKCBjLm5hbWVzcGFjZSArICdfZXh0cmFfdGFibGUnICkgKVxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygnaGFzUmVzaXphYmxlJylcblx0XHRcdFx0XHQuY2hpbGRyZW4oICd0aGVhZCcgKVxuXHRcdFx0XHRcdC51bmJpbmQoICdjb250ZXh0bWVudScgKyBuYW1lc3BhY2UgKTtcblxuXHRcdFx0XHR3by4kcmVzaXphYmxlX2NvbnRhaW5lci5yZW1vdmUoKTtcblx0XHRcdFx0dHMucmVzaXphYmxlLnRvZ2dsZVRleHRTZWxlY3Rpb24oIGMsIHdvLCBmYWxzZSApO1xuXHRcdFx0XHR0cy5yZXNpemFibGVSZXNldCggdGFibGUsIHJlZnJlc2hpbmcgKTtcblx0XHRcdFx0JCggZG9jdW1lbnQgKS51bmJpbmQoICdtb3VzZW1vdmUnICsgbmFtZXNwYWNlICsgJyBtb3VzZXVwJyArIG5hbWVzcGFjZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0dHMucmVzaXphYmxlUmVzZXQgPSBmdW5jdGlvbiggdGFibGUsIHJlZnJlc2hpbmcgKSB7XG5cdFx0JCggdGFibGUgKS5lYWNoKGZ1bmN0aW9uKCl7XG5cdFx0XHR2YXIgaW5kZXgsICR0LFxuXHRcdFx0XHRjID0gdGhpcy5jb25maWcsXG5cdFx0XHRcdHdvID0gYyAmJiBjLndpZGdldE9wdGlvbnMsXG5cdFx0XHRcdHZhcnMgPSB3by5yZXNpemFibGVfdmFycztcblx0XHRcdGlmICggdGFibGUgJiYgYyAmJiBjLiRoZWFkZXJJbmRleGVkLmxlbmd0aCApIHtcblx0XHRcdFx0Ly8gcmVzdG9yZSB0aGUgaW5pdGlhbCB0YWJsZSB3aWR0aFxuXHRcdFx0XHRpZiAoIHZhcnMub3ZlcmZsb3cgJiYgdmFycy50YWJsZVdpZHRoICkge1xuXHRcdFx0XHRcdHRzLnJlc2l6YWJsZS5zZXRXaWR0aCggYy4kdGFibGUsIHZhcnMudGFibGVXaWR0aCwgdHJ1ZSApO1xuXHRcdFx0XHRcdGlmICggdmFycy51c2VTdG9yYWdlICkge1xuXHRcdFx0XHRcdFx0dHMuc3RvcmFnZSggdGFibGUsICd0YWJsZXNvcnRlci10YWJsZS1yZXNpemVkLXdpZHRoJywgJ2F1dG8nICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBjLmNvbHVtbnM7IGluZGV4KysgKSB7XG5cdFx0XHRcdFx0JHQgPSBjLiRoZWFkZXJJbmRleGVkWyBpbmRleCBdO1xuXHRcdFx0XHRcdGlmICggd28ucmVzaXphYmxlX3dpZHRocyAmJiB3by5yZXNpemFibGVfd2lkdGhzWyBpbmRleCBdICkge1xuXHRcdFx0XHRcdFx0dHMucmVzaXphYmxlLnNldFdpZHRoKCAkdCwgd28ucmVzaXphYmxlX3dpZHRoc1sgaW5kZXggXSwgdmFycy5vdmVyZmxvdyApO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoICEkdC5oYXNDbGFzcyggJ3Jlc2l6YWJsZS1mYWxzZScgKSApIHtcblx0XHRcdFx0XHRcdC8vIGRvbid0IGNsZWFyIHRoZSB3aWR0aCBvZiBhbnkgY29sdW1uIHRoYXQgaXMgbm90IHJlc2l6YWJsZVxuXHRcdFx0XHRcdFx0dHMucmVzaXphYmxlLnNldFdpZHRoKCAkdCwgJycsIHZhcnMub3ZlcmZsb3cgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyByZXNldCBzdGlja3lIZWFkZXIgd2lkdGhzXG5cdFx0XHRcdGMuJHRhYmxlLnRyaWdnZXJIYW5kbGVyKCAnc3RpY2t5SGVhZGVyc1VwZGF0ZScgKTtcblx0XHRcdFx0aWYgKCB0cy5zdG9yYWdlICYmICFyZWZyZXNoaW5nICkge1xuXHRcdFx0XHRcdHRzLnN0b3JhZ2UoIHRoaXMsIHRzLmNzcy5yZXNpemFibGVTdG9yYWdlLCB7fSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH07XG5cbn0pKCBqUXVlcnksIHdpbmRvdyApO1xuXG4vKiEgV2lkZ2V0OiBzYXZlU29ydCAtIHVwZGF0ZWQgMTAvMzEvMjAxNSAodjIuMjQuMCkgKi8vKlxuKiBSZXF1aXJlcyB0YWJsZXNvcnRlciB2Mi4xNitcbiogYnkgUm9iIEdhcnJpc29uXG4qL1xuOyhmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciB0cyA9ICQudGFibGVzb3J0ZXIgfHwge307XG5cblx0Ly8gdGhpcyB3aWRnZXQgc2F2ZXMgdGhlIGxhc3Qgc29ydCBvbmx5IGlmIHRoZVxuXHQvLyBzYXZlU29ydCB3aWRnZXQgb3B0aW9uIGlzIHRydWUgQU5EIHRoZVxuXHQvLyAkLnRhYmxlc29ydGVyLnN0b3JhZ2UgZnVuY3Rpb24gaXMgaW5jbHVkZWRcblx0Ly8gKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0dHMuYWRkV2lkZ2V0KHtcblx0XHRpZDogJ3NhdmVTb3J0Jyxcblx0XHRwcmlvcml0eTogMjAsXG5cdFx0b3B0aW9uczoge1xuXHRcdFx0c2F2ZVNvcnQgOiB0cnVlXG5cdFx0fSxcblx0XHRpbml0OiBmdW5jdGlvbih0YWJsZSwgdGhpc1dpZGdldCwgYywgd28pIHtcblx0XHRcdC8vIHJ1biB3aWRnZXQgZm9ybWF0IGJlZm9yZSBhbGwgb3RoZXIgd2lkZ2V0cyBhcmUgYXBwbGllZCB0byB0aGUgdGFibGVcblx0XHRcdHRoaXNXaWRnZXQuZm9ybWF0KHRhYmxlLCBjLCB3bywgdHJ1ZSk7XG5cdFx0fSxcblx0XHRmb3JtYXQ6IGZ1bmN0aW9uKHRhYmxlLCBjLCB3bywgaW5pdCkge1xuXHRcdFx0dmFyIHN0b3JlZCwgdGltZSxcblx0XHRcdFx0JHRhYmxlID0gYy4kdGFibGUsXG5cdFx0XHRcdHNhdmVTb3J0ID0gd28uc2F2ZVNvcnQgIT09IGZhbHNlLCAvLyBtYWtlIHNhdmVTb3J0IGFjdGl2ZS9pbmFjdGl2ZTsgZGVmYXVsdCB0byB0cnVlXG5cdFx0XHRcdHNvcnRMaXN0ID0geyAnc29ydExpc3QnIDogYy5zb3J0TGlzdCB9O1xuXHRcdFx0aWYgKGMuZGVidWcpIHtcblx0XHRcdFx0dGltZSA9IG5ldyBEYXRlKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJHRhYmxlLmhhc0NsYXNzKCdoYXNTYXZlU29ydCcpKSB7XG5cdFx0XHRcdGlmIChzYXZlU29ydCAmJiB0YWJsZS5oYXNJbml0aWFsaXplZCAmJiB0cy5zdG9yYWdlKSB7XG5cdFx0XHRcdFx0dHMuc3RvcmFnZSggdGFibGUsICd0YWJsZXNvcnRlci1zYXZlc29ydCcsIHNvcnRMaXN0ICk7XG5cdFx0XHRcdFx0aWYgKGMuZGVidWcpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdzYXZlU29ydCB3aWRnZXQ6IFNhdmluZyBsYXN0IHNvcnQ6ICcgKyBjLnNvcnRMaXN0ICsgdHMuYmVuY2htYXJrKHRpbWUpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHNldCB0YWJsZSBzb3J0IG9uIGluaXRpYWwgcnVuIG9mIHRoZSB3aWRnZXRcblx0XHRcdFx0JHRhYmxlLmFkZENsYXNzKCdoYXNTYXZlU29ydCcpO1xuXHRcdFx0XHRzb3J0TGlzdCA9ICcnO1xuXHRcdFx0XHQvLyBnZXQgZGF0YVxuXHRcdFx0XHRpZiAodHMuc3RvcmFnZSkge1xuXHRcdFx0XHRcdHN0b3JlZCA9IHRzLnN0b3JhZ2UoIHRhYmxlLCAndGFibGVzb3J0ZXItc2F2ZXNvcnQnICk7XG5cdFx0XHRcdFx0c29ydExpc3QgPSAoc3RvcmVkICYmIHN0b3JlZC5oYXNPd25Qcm9wZXJ0eSgnc29ydExpc3QnKSAmJiAkLmlzQXJyYXkoc3RvcmVkLnNvcnRMaXN0KSkgPyBzdG9yZWQuc29ydExpc3QgOiAnJztcblx0XHRcdFx0XHRpZiAoYy5kZWJ1Zykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ3NhdmVTb3J0OiBMYXN0IHNvcnQgbG9hZGVkOiBcIicgKyBzb3J0TGlzdCArICdcIicgKyB0cy5iZW5jaG1hcmsodGltZSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkdGFibGUuYmluZCgnc2F2ZVNvcnRSZXNldCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdHRzLnN0b3JhZ2UoIHRhYmxlLCAndGFibGVzb3J0ZXItc2F2ZXNvcnQnLCAnJyApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGluaXQgaXMgdHJ1ZSB3aGVuIHdpZGdldCBpbml0IGlzIHJ1biwgdGhpcyB3aWxsIHJ1biB0aGlzIHdpZGdldCBiZWZvcmUgYWxsIG90aGVyIHdpZGdldHMgaGF2ZSBpbml0aWFsaXplZFxuXHRcdFx0XHQvLyB0aGlzIG1ldGhvZCBhbGxvd3MgdXNpbmcgdGhpcyB3aWRnZXQgaW4gdGhlIG9yaWdpbmFsIHRhYmxlc29ydGVyIHBsdWdpbjsgYnV0IHRoZW4gaXQgd2lsbCBydW4gYWxsIHdpZGdldHMgdHdpY2UuXG5cdFx0XHRcdGlmIChpbml0ICYmIHNvcnRMaXN0ICYmIHNvcnRMaXN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRjLnNvcnRMaXN0ID0gc29ydExpc3Q7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGFibGUuaGFzSW5pdGlhbGl6ZWQgJiYgc29ydExpc3QgJiYgc29ydExpc3QubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdC8vIHVwZGF0ZSBzb3J0IGNoYW5nZVxuXHRcdFx0XHRcdHRzLnNvcnRPbiggYywgc29ydExpc3QgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVtb3ZlOiBmdW5jdGlvbih0YWJsZSwgYykge1xuXHRcdFx0Yy4kdGFibGUucmVtb3ZlQ2xhc3MoJ2hhc1NhdmVTb3J0Jyk7XG5cdFx0XHQvLyBjbGVhciBzdG9yYWdlXG5cdFx0XHRpZiAodHMuc3RvcmFnZSkgeyB0cy5zdG9yYWdlKCB0YWJsZSwgJ3RhYmxlc29ydGVyLXNhdmVzb3J0JywgJycgKTsgfVxuXHRcdH1cblx0fSk7XG5cbn0pKGpRdWVyeSk7XG5cbnJldHVybiBqUXVlcnkudGFibGVzb3J0ZXI7XG59KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90YWJsZXNvcnRlci9kaXN0L2pzL2pxdWVyeS50YWJsZXNvcnRlci5jb21iaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiJdLCJzb3VyY2VSb290IjoiIn0=