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

Ext.define('ux.Numpad',{
    extend: 'Ext.Panel',
    xtype: 'numpad',

    config: {
        cls: Ext.baseCSSPrefix + 'numpad',
        
        numfield : false,

        modal: {
            style : {
                opacity: 0.3
            }
        },
		listeners:
		{
			hide:function(cmp)
			{
				if(this.config.numfield.config.autoClose)
					{
                        if (this.config.numfield.config.autoClose)
                        {
                            this.config.numfield.fireEvent('done', this.config.numfield);
                        }
                    }			
			}
		},
        
        bottom: 0,
        hideOnMaskTap: true,
        
     
        items: [   
        {
            xtype: 'formpanel',
            hidden: Ext.os.is.Phone ? false : true,
            margin: '5 1%',
            width: '98%',
            height: 43,
            border: 0,
            padding: 0,
            scrollable: false,
            items: [{
                xtype: 'textfield',
                name: 'inputValue',
                value: '0',
                cls: Ext.baseCSSPrefix + 'numpad-display',
                disabled: true,
                clearIcon: false
            }]
        },

        {
            text: '7',
            data: 7
        },
        {
            text: '8',
            data: 8
        },
        {
            text: '9',
            data: 9
        },
        {
            iconCls: 'arrow_left' ,
            iconMask: true,                
            data: 'del'
        },
        {
            text: '4',
            data: 4
        },
        {
            text: '5',
            data: 5
        },
        {
            text: '6',
            data: 6
        },
        {
            text: 'ok',
            data: 'done',
            height: Ext.os.is.Phone ? 168 : 196,
            style: 'float:right;'
        },            
        {
            text: '1',
            data: 1
        },
        {
            text: '2',
            data: 2
        },
        {
            text: '3',
            data: 3
        },
        {
            text: '0',
            data: 0,
            width:  Ext.os.is.Phone ? '48%' : 130
        }

        ]
        
        
    },
        
    initialize: function(){
        this.callParent();        
		if(this.config.separator!='comma')
		{
			this.add([{
				text: '.',
				data: '.'
			}])					
		}
		else
		{
			this.add([{				
				text: ',',
				data: ','
			}])					
		}
		
		this.applyInstructions(this.getItems());
    },
    
    applyInstructions: function(keys){
        var me = this;
        for(var i = 0; i < keys.getCount(); i++ ){
            keys.getAt(i).on('tap',this.onKeyTap, this); 
            if(keys.getAt(i).getData() == "del"){
                 keys.getAt(i).element.on('taphold', this.del, me); 
                 keys.getAt(i).on('release', this.stopDel, me);
            }
        }
        
    },
    /**
     * @private
     * Listener to the tap event of the key button. 
     */ 
    delTime : 0,
    
    del : function(){ 
        var me = this;
        var numfield = me.config.numfield;
        var oldValue = numfield.getValue();
        var newValue = '';
        
        newValue = oldValue.substr(0, oldValue.length-1);             
        me.getAt(0).setValues({ inputValue : newValue });
        numfield.setValue(newValue); 
              
        // global timer
        this.delTimer = setTimeout(function(){            
            me.del();
        },200);
    },
    
    stopDel: function(){        
        clearTimeout(this.delTimer);
    },
    onKeyTap: function(me){

        var numfield = me.getParent().config.numfield;
        var key = me.config.data;
        var oldValue = numfield.getValue();
        var newValue = '';
        
        /*
         * non numeric keys
         **/
        if(isNaN(key)){
            
            switch(key){
                case 'del' :
                    newValue = oldValue.substr(0, oldValue.length-1);
                    break;
					
                case ',' :
                    newValue = oldValue + ',';
                    break;
                
                case '.' :
                    if(numfield.config.singleDot){
                                    
                        if(oldValue.indexOf(".") < 0){
                        
                            if(oldValue.length == 0){
                                newValue = oldValue + '0.';    
                            }else{
                                newValue = oldValue + '.';
                            }
                        }else{
                            newValue = oldValue;
                        }
                        
                    }
					else{
                        newValue =  oldValue + '.';
                    }
                
                    break;
                
                case 'done':
                
                    if(oldValue.indexOf(".") == oldValue.length-1){
                        newValue = oldValue.substr(0,oldValue.length-1);
                    }else{
                        newValue = oldValue;
                    }
                    
                    me.getParent().hide();					                    
                    if(numfield.config.autoClose)
                    {
                        numfield.fireEvent('done',numfield);                        
                    }                                        
                    break;
            }
            
        }else{            
            newValue = oldValue + key;
        }
        
        me.getParent().getAt(0).setValues({ inputValue : newValue });
        numfield.setValue(newValue);
    }
}); // xtype numpad