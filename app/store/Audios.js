/*
 * File: app/store/Audios.js
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

Ext.define('VKM.store.Audios', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    config: {
        storeId: 'Audios',
        fields: [
            {
                name: 'id'
            },
            {
                name: 'owner_id'
            },
            {
                name: 'title'
            },
            {
                name: 'artist'
            },
            {
                name: 'date'
            },
            {
                name: 'duration'
            }
        ],
        proxy: {
            type: 'rest',
            limitParam: 'count',
            startParam: 'offset',
            url: 'https://api.vk.com/method/audio.get',
            reader: {
                type: 'json',
                rootProperty: 'response.items',
                totalProperty: 'response.count'
            }
        }
    }
});