Ext.define('ux.nmsgbox',{
    override : 'Ext.TitleBar',    
    xtype: 'nmsgbox',
    onClick: function(button) {
        if (button) {
            var config = button.config.userConfig || {},
                initialConfig = button.getInitialConfig(),
                prompt = this.getPrompt();

            if (typeof config.fn == 'function') {
                button.disable();
                this.on({
                    hiddenchange: function() {
                        config.fn.call(
                            config.scope || null,
                            initialConfig.itemId || initialConfig.text,
                            prompt ? prompt.getValue() : null,
                            config
                        );
                        button.enable();
                    },
                    single: true,
                    scope: this
                });
            }

            if (config.input) {
                config.input.dom.blur();
            }
        }

        this.hide();
     //   this.destroy();
    }
})