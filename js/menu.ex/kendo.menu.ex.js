/*
 *# Kendo UI MenuEx by CZ
 *
 * MenuEx allows you to create:
 *  - context menus
 *  - hook to click event of menu node
 *  - extra data assigned to menu node
 *  - addnode callback (envoked when html of node generated)
 *
 *## Auto data-data insertion.
 *
 * {text: 'text', data: {id:5}}
 *
 * will be
 *
 * <li class='...' data-data='{id:5}'>text</li>
 *
 *## Node click callback
 *
 * {text: 'text', click: 'alert(this)' }
 *
 *## addnode callback
 *
 *  addnode: function ( e ) {
 *      console.log(e);
 *  }
 *
 *## All extra options
 *
 * - anchor - selector to elements menu will be linked
 * - event  - jQuery event triggers context menu (default: 'contexmenu')
 * - delay  - delay before menu will hide
 *
 *## Example
 *
 * $(document).ready(function()  {
 *      $('#testMenu').kendoMenuEx({
 *      dataSource: [
 *            {
 *                text: 'item #1',
 *                imageUrl: "../../content/shared/icons/sports/baseball.png",
 *                data: {id: 5, extra: 'extradata'},
 *                click: 'showalert(this)'
 *            }
 *        ],
 *        select: function(el) {
 *            console.log(el);
 *        },
 *        orientation: 'vertical',
 *        anchor: '#mySpan, #myButton',
 *        delay: 1500,
 *        addnode: function(el) { console.log(el); }
 *    });
 * });
 *
 *
 * Kendo UI Complete v2012.1.322 (http://kendoui.com)
 * Copyright 2012 Telerik AD. All rights reserved.
 *
 */

(function( $, undefined ){
    var MenuEx = window.kendo.ui.Menu.extend({/** @lends kendo.ui.Menu.prototype */
     _hiding : false;
    _that._showing : false;


        /**
         * target object which was clicked
         */
        target: {},
        /**
         * menu item which was clicked
         */
        item: {},

        options: {
            name: "MenuEx",
            delay: 1000,
            event: 'contextmenu',
            orientation: 'vertical', //horizontal looks kinda awful
            anchor: ""
        },

        init: function(element, options) {
            var that = this;
            options.anchor=options.anchor || $(element).data("anchor");

            options.delay=$(element).data("delay") || 1000; //1 sec delay default

            window.kendo.ui.Menu.fn.init.call(that, element, options); 
            that.element.addClass('k-context-menu');
            if (options.anchor){
                event = options.event || that.options.event;
                $(options.anchor).bind(event, function(e){ 
                    that.show(options.anchor, e);
                    return false;
                });
            }
            $(document).click($.proxy( that._documentClick, that )); //hides the context menu when you click outside of the span where the context menu is to be active.
        },

        hide: function () {
	    var that = this;
            if (that._showing) {
                that._hiding = true;
                var $target = $(that.target);
                if ($target.hasClass('k-item')) {
                    $target.find('.k-in').removeClass('k-state-focused');
                }
                that.element.fadeOut(function() {

                    that._hiding = false;
                    that._showing = false;
                });
            }
        },

        show: function (anchor, e) {
	    var that=this;
            if (that._hiding == false) {
                that.target = e.currentTarget;
                var $target = $(that.target);
                if ($target.hasClass('k-item')) {
                    $target.find('.k-in').addClass('k-state-focused');
                }
                that.element.css({'top': e.pageY, 'left': e.pageX});
                that.element.fadeIn(function(){ that._showing = true; });
            }
        },

        _documentClick: function (e) {
            var that = this;
            that.hide();
        }
    });
    window.kendo.ui.plugin(MenuEx);

})(jQuery);
