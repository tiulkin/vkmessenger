Ext.define('ux.locale.override.st.navigation.View', {
    override: 'Ext.navigation.View',

    requires: [
        'ux.locale.Manager'
    ],

    enableLocale: false,
    locale: null,
    locales: null,

    constructor : function(config) {
        var me = this;

        config = ux.locale.Manager.isLocalable(me, config);

        me.callParent([config]);

        if (me.enableLocale) {
            me.setLocale(ux.locale.Manager.getLanguage());
        }
    },

    setLocale : function(locale) {
        var me                    = this,
            locales               = me.locales || me.getInitialConfig().locales,
            defaultBackButtonText = locales.defaultBackButtonText,
            defaultText           = '',
            manager               = me.locale;

        if (defaultBackButtonText) {
            if (Ext.isObject(defaultBackButtonText)) {
                defaultText = defaultBackButtonText.defaultText;
                defaultBackButtonText = defaultBackButtonText.key;
            }

            defaultBackButtonText = manager.get(defaultBackButtonText, defaultText);

            if (Ext.isString(defaultBackButtonText)) {
                me.setDefaultBackButtonText(defaultBackButtonText);
            }
        }
    }
});