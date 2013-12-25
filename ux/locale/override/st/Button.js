Ext.define('ux.locale.override.st.Button', {
    override : 'Ext.Button',

    requires : [
        'ux.locale.override.st.Component'
    ],

    constructor : function() {
        this.callSuper(arguments);
    },

    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            text        = locales.text,
            manager     = me.locale,
            defaultText = '';

        if (text) {
            if (Ext.isObject(text)) {
                defaultText = text.defaultText;
                text        = text.key;
            }

            text = manager.get(text, defaultText);

            if (Ext.isString(text)) {
                me.setText(text);
                me.refreshIconAlign();
            }
        }

        me.callParent(arguments);
    }
});