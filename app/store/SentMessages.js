/*
 * File: app/store/SentMessages.js
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

Ext.define('VKM.store.SentMessages', {
    extend: 'Ext.data.Store',

    requires: [
        'VKM.model.Message',
        'Ext.util.Sorter',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    config: {
        buffered: true,
        clearOnPageLoad: false,
        model: 'VKM.model.Message',
        pageSize: 10,
        storeId: 'SentMessages',
        sorters: {
            direction: 'DESC',
            property: 'date'
        },
        proxy: {
            type: 'rest',
            filterParam: 'undefined',
            groupParam: 'undefined',
            limitParam: 'count',
            startParam: 'offset',
            appendId: false,
            reader: {
                type: 'json',
                rootProperty: 'messages.items',
                totalProperty: 'count'
            }
        },
        listeners: [
            {
                fn: 'onStoreLoad',
                event: 'load'
            }
        ]
    },

    onStoreLoad: function(store, records, successful, operation, eOpts) {

    }

});