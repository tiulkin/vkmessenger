/*
 * File: app/store/Friends.js
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

Ext.define('VKM.store.Friends', {
    extend: 'Ext.data.Store',

    requires: [
        'VKM.model.User',
        'Ext.util.Grouper',
        'Ext.data.proxy.Rest'
    ],

    config: {
        groupDir: 'ASC',
        model: 'VKM.model.User',
        pageSize: 20,
        remoteGroup: true,
        storeId: 'Friends',
        grouper: {
            groupFn: function(item) {
                if (item.get('important')!=""&&item.get('important')!=undefined)
                {
                    return(item.get('important'))
                }
                else
                {
                    return (item.get('first_name')[0]);
                }

            }
        },
        proxy: {
            type: 'rest',
            limitParam: 'count',
            startParam: 'offset'
        }
    }
});