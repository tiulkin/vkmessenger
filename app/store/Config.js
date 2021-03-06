/*
 * File: app/store/Config.js
 *
 * This file was generated by Sencha Architect version 3.0.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('VKM.store.Config', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.Field'
    ],

    config: {
        autoSync: true,
        storeId: 'Config',
        proxy: {
            type: 'ajax',
            url: 'config.json',
            reader: {
                type: 'json',
                idProperty: 'variable',
                rootProperty: 'globals'
            }
        },
        fields: [
            {
                name: 'variable'
            },
            {
                name: 'value'
            }
        ],
        listeners: [
            {
                fn: 'onJsonstoreLoad',
                event: 'load'
            }
        ]
    },

    constructor: function() {
        var me = this;
        me.callParent(arguments);
        me.getProxy().getReader().on([{
            fn: 'onJsonException',
            event: 'exception',
            scope: me
        }]);
    },

    onJsonException: function(reader, response, error, eOpts) {

    },

    onJsonstoreLoad: function(store, records, successful, operation, eOpts) {
        for (var recordId in records)
        {
            VKM.app.globals[records[recordId].data['variable']]=records[recordId].data['value'];

        }




        // var localServer='';
        // var dbName='';
        // var localServer=VKM.app.globals.localServer;

        // if (!VKM.app.globals.dbName)
        // {
        //     VKM.app.globals.dbName='vkm';
        // }
        // dbName=VKM.app.globals.dbName;
        //VKM.app.globals.localDB= new PouchDB(localServer+dbName);
         VKM.app.startApp();





        //alert(Ext.device.Device.uuid);
        //NoERP.app.globals.deviceId=Ext.device.Device.uuid;




        //NoERP.app.globals.localDirsDB= new PouchDB(localServer+'noerp_dirs');
        //NoERP.app.globals.remoteDirsCouch=new PouchDB(remoteServer+'noerp_0_dirs');

        //NoERP.app.globals.localTransactionsDB= new PouchDB(localServer+'noerp_transactions');
        //NoERP.app.globals.remoteTransactionsCouch=new PouchDB(remoteServer+'noerp_0_transactions');

        //NoERP.app.globals.localStatDB= new PouchDB(localServer+'noerp_stat');
        //NoERP.app.globals.remoteStatCouch=new PouchDB(remoteServer+'noerp_0_stat');




        //if (this.globals.remoteCouch) {
        //    this.sync();
        //}

        //var mydb = window.openDatabase("testDB", "1.0", "Test DB", 10000000);

        //this.globals.localDB.replicate.to('http://noerp0:T2612ot@173.230.134.9:5984/abcd', {continuous: true});

    }

});