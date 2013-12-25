/*
 * File: app/store/PhoneContacts.js
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

Ext.define('VKM.store.PhoneContacts', {
    extend: 'Ext.data.Store',

    requires: [
        'VKM.model.PhoneContact',
        'Ext.util.Grouper'
    ],

    config: {
        autoLoad: true,
        autoSync: true,
        clearOnPageLoad: false,
        model: 'VKM.model.PhoneContact',
        storeId: 'PhoneContacts',
        grouper: {
            groupFn: function(item) {
                if (item.get('displayName'))
                return (item.get('displayName')[0]);


            }
        }
    }
});