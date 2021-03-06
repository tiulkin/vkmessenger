/*
 * File: app/model/Images.js
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

Ext.define('VKM.model.Images', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                name: 'photo_130'
            },
            {
                defaultValue: false,
                name: 'selected'
            },
            {
                name: 'id'
            },
            {
                name: 'owner_id'
            },
            {
                convert: function(v, rec) {
                    return (rec.get('photo_130'));
                },
                name: 'image'
            },
            {
                convert: function(v, rec) {
                    return("");
                },
                name: 'title'
            },
            {
                name: 'photo_604'
            }
        ]
    }
});