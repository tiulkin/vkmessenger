Ext.define('VKM.override.data.proxy.Rest', {
    override: 'Ext.data.proxy.Rest',
    createRequestCallback: function(request, operation, callback, scope) {                
        var me = this;                
        return function(options, success, response) {            
            if (success)
            {
                if(response)
                {                    
                    
                
                    var JsonResponse=JSON.parse(response.responseText);
                    if (!JsonResponse.error)
                    {
                        me.processResponse(success, operation, request, response, callback, scope);
                    }
                    else
                    {
                        console.log(response.responseText);
                        console.log(JsonResponse);
                        if (VKM.app.globals.doNotReconnect==true||JsonResponse.error.error_code==6)
                        {                            
                            setTimeout(
                                function(){
                                    //VKM.app.globals.doNotReconnect=false;
                                    me.doRequest(operation, callback, scope)},1500
                            );
                        }
                        else
                        {
                            if (JsonResponse.error.error_code==5)
                            {
                                VKM.app.globals.doNotReconnect=true;
                                VKM.app.getController('Login').relogin1(me,function()
                                                                        {
                                                                            VKM.app.globals.doNotReconnect=false;
                                                                            operation.config.params.access_token=VKM.app.globals.authData['access_token'];
                                                                            operation.initialConfig.params.access_token=VKM.app.globals.authData['access_token'];
                                                                            operation._params.access_token=VKM.app.globals.authData['access_token'];                                                                            
                                                                            me.doRequest(operation, callback, scope)
                                                                        });
                            }
                            else
                        
                            {                                
                                alert(JsonResponse.error.error_msg);
                                me.processResponse(success, operation, request, response, callback, scope);
                            }
                        }
                    }
                }
            }
            else                
            {                                
                console.log(response.responseText);
                alert(response.responseText);
                me.processResponse(success, operation, request, response, callback, scope);
            }                       
        };
        
        
    }
    
    
});