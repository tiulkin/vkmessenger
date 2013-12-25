Ext.define('ux.locale.override.st.field.DatePicker', {
    override : 'Ext.field.DatePicker',

    getPicker : function() {
        var picker     = this._picker,
            needLocale = picker && !picker.isPicker;

        picker = this.callParent(arguments);

        if (needLocale && picker.enableLocale) {
            picker.setLocale(ux.locale.Manager.getLanguage());
        }

        return picker;
    }
});