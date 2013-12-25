/*
--- --- --- ---
|7| |8| |9| |-|    @ModuleName:    numpadfield
--- --- --- ---    @ModulePurpose: Emulate a numpad key field
--- --- --- ---    @Inputs:  Numeric only
|4| |5| |6| | |    @Outputs: Numeric only
--- --- --- | |    @Authors: Silviu Durduc <iamsilviu@gmail.com> 
--- --- --- | |              Sebastian Tomescu <sebastian.tomescu@gmail.com>
|1| |2| |3| | |    @version: 1.0
--- --- --- | |
------- --- | |
|  0  | |.| |x|
------- --- ---
 */

Ext.define('ux.Numpadfield',{
    extend: 'Ext.field.Text',
    xtype: 'numpadfield',
    alias : 'widget.numpadfield',
    requires : ['ux.Numpad'],    
    
    config: {
        /**
         * @private
         * Holds the numpad component for reuse 
         */              
        numpad: false,
        singleDot: true, 
        
        clearIcon: false,
                
        component: {
            useMask: true
        }
        
    },
    
    /**
     * @public
     * Allow single or multiple dots. 
     */      


    initialize: function() {
        this.callParent();

        this.getComponent().on({
            scope: this,

            masktap: 'onMaskTap'
        });
        
        this.getComponent().input.dom.disabled = true;
    },
    
    getNumpad: function(numfield) {
        
        var numpad = this._numpad;

        if(!numpad){
            
            if(Ext.os.is.Phone)
			{
                numpad = Ext.create('ux.Numpad',{
                // textfield
                numfield: numfield,
				separator:this.config.separator,
                
                width: '100%',
                height: 305,                
              
                defaults: {
                    xtype: 'button',
                    width: "23%",
                    height: 52,
                    style: 'float:left',
                    margin: "3px 1%"
                }
            });  
            
            
            }else{
                
            numpad = Ext.create('ux.Numpad',{
                // textfield
                numfield: numfield,
				separator:this.config.separator,
                
                width: 300,
                height: 360,
                padding: 5,
              
                defaults: {
                    xtype: 'button',
                    width: 60,
                    height: 60,
                    style: 'float:left',
                    margin: 4
                }
                
            });  
            
            
           } // tablet visual 
            
            
            Ext.Viewport.add(numpad);
            this._numpad = numpad;
        }
        
        numpad.getAt(0).setValues({ inputValue : numfield.getValue() });
        
        return numpad
    },
    
    /**
     * @private
     * Listener to the tap event of the mask element. 
     * Shows the internal Numpad component when the field has been tapped.
     */    
    onMaskTap: function(){ 
        if (this.getDisabled()) {
            return false;
        }

        if (this.getReadOnly()) {
            return false;
        }
        
        if(Ext.os.is.Phone){
            this.getNumpad(this).show();
            this.focus();
        }else{        
            this.getNumpad(this).showBy(this);
            this.focus();
        }
        
        return false;        
    }
    
}); // xtype numpadfield