/*
 * File: app/model/Dialogues.js
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

Ext.define('VKM.model.Dialogues', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        idProperty: 'did',
        fields: [
            {
                name: 'id'
            },
            {
                name: 'date'
            },
            {
                name: 'read_state'
            },
            {
                name: 'out'
            },
            {
                name: 'title'
            },
            {
                name: 'body'
            },
            {
                name: 'attachments'
            },
            {
                name: 'fwd_messages'
            },
            {
                name: 'deleted'
            },
            {
                name: 'emoji'
            },
            {
                name: 'user_id'
            },
            {
                name: 'chat_id'
            },
            {
                name: 'chat_active'
            },
            {
                name: 'users_count'
            },
            {
                name: 'admin_id'
            },
            {
                name: 'photo_50'
            },
            {
                name: 'photo_100'
            },
            {
                name: 'photo_200'
            },
            {
                name: 'from_id'
            },
            {
                name: 'geo'
            },
            {
                name: 'name'
            },
            {
                name: 'did'
            }
        ]
    }
});