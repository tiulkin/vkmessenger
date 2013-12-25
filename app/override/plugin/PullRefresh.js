Ext.define('VKM.override.plugin.PullRefresh', {
    override: 'Ext.plugin.PullRefresh',
    config: {
        /**
         * @cfg {Ext.dataview.List} list
         * The list to which this PullRefresh plugin is connected.
         * This will usually by set automatically when configuring the list with this plugin.
         * @accessor
         */
        list: null,

        /**
         * @cfg {String} pullText The text that will be shown while you are pulling down.
         * @accessor
         */
        pullText: 'Потяните для обновления...',

        /**
         * @cfg {String} releaseText The text that will be shown after you have pulled down enough to show the release message.
         * @accessor
         */
        releaseText: 'Отпустите для обновления...',

        /**
         * @cfg {String} loadingText The text that will be shown while the list is refreshing.
         * @accessor
         */
        loadingText: 'Загрузка...',

        /**
         * @cfg {String} loadedText The text that will be when data has been loaded.
         * @accessor
         */
        loadedText: 'Loaded.',

        /**
         * @cfg {String} lastUpdatedText The text to be shown in front of the last updated time.
         * @accessor
         */
        lastUpdatedText: 'Последнее обновление:&nbsp;',

        /**
         * @cfg {Boolean} scrollerAutoRefresh Determines whether the attached scroller should automatically track size changes of its container.
         * Enabling this will have performance impacts but will be necessary if your list size changes dynamically. For example if your list contains images
         * that will be loading and have unspecified heights.
         */
        scrollerAutoRefresh: false,

        /**
         * @cfg {Boolean} autoSnapBack Determines whether the pulldown should automatically snap back after data has been loaded.
         * If false call {@link #snapBack}() to manually snap the pulldown back.
         */
        autoSnapBack: true,

        /**
         * @cfg {Number} snappingAnimationDuration The duration for snapping back animation after the data has been refreshed
         * @accessor
         */
        snappingAnimationDuration: 300,
        /**
         * @cfg {String} lastUpdatedDateFormat The format to be used on the last updated date.
         */
        lastUpdatedDateFormat: 'm/d/Y h:iA',

        /**
         * @cfg {Number} overpullSnapBackDuration The duration for snapping back when pulldown has been lowered further then its height.
         */
        overpullSnapBackDuration: 300,

        /**
         * @cfg {Ext.XTemplate/String/Array} pullTpl The template being used for the pull to refresh markup.
         * Will be passed a config object with properties state, message and updated
         *
         * @accessor
         */
        pullTpl: [
            '<div class="x-list-pullrefresh-arrow"></div>',
            '<div class="x-loading-spinner">',
                '<span class="x-loading-top"></span>',
                '<span class="x-loading-right"></span>',
                '<span class="x-loading-bottom"></span>',
                '<span class="x-loading-left"></span>',
            '</div>',
            '<div class="x-list-pullrefresh-wrap">',
                '<h3 class="x-list-pullrefresh-message">{message}</h3>',
                '<div class="x-list-pullrefresh-updated">{updated}</div>',
            '</div>'
        ].join(''),

        translatable: true
    },
    fetchLatest: function() {
        var store = this.getList().getStore(),
            proxy = store.getProxy(),
            operation;
        var me=this;
        store.currentPage=1;
        store.removeAll();
        store.load({callback:function(){
            me.setState("loaded");
           // me.fireEvent('latestfetched', me, toInsert);
            if (me.getAutoSnapBack()) {
                me.snapBack();
            }    
        }
                   });

    },
    
});