Ext.define('VKM.override.data.proxy.LocalStorage', {
    override: 'Ext.data.proxy.LocalStorage',
    read: function(operation, callback, scope) {
        
        var records    = [],
            ids        = this.getIds(),
            model      = this.getModel(),
            idProperty = model.getIdProperty(),
            params     = operation.getParams() || {},
            length     = ids.length,
            i, record;
        
        var pageRecords = [];
        
        //read a single record
        if (typeof params[idProperty] !== 'undefined') {
            record = this.getRecord(params[idProperty]);
            if (record) {
                records.push(record);
                operation.setSuccessful();
            }
            pageRecords = records;
        } else {
            
            for ( i = 0; i < length; i++) {
                records.push(this.getRecord(ids[i]));
            }
            
            var start = operation.getStart();
            var limit = operation.getLimit();
            var begin = ( isNaN(start) || typeof start === 'undefined') ? 0 : start;
            var end = ( isNaN(limit) || typeof limit === 'undefined') ? length : begin + limit;
            
            pageRecords = records.slice(begin, end);
            
            // TODO: Do we need to handle "remote" filtering and sorting?
            
            operation.setSuccessful();
        }
        
        operation.setCompleted();

        operation.setResultSet(Ext.create('Ext.data.ResultSet', {
            records:       pageRecords,
            total:         records.length,
            totalRecords:  records.length,
            count:         pageRecords.length,
            success:       true, // TODO: Should this be dynamically pulled from somewhere?
            loaded:        true
        }));
        
        operation.setRecords(pageRecords);
        
        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    }
    
});