/*
 * File: app/view/PhotoItem.js
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

Ext.define('VKM.view.PhotoItem', {
    extend: 'Ext.dataview.component.DataItem',
    alias: 'widget.photoitem',

    requires: [
        'Ext.Img'
    ],

    config: {
        cls: 'img3',
        width: 170,
        layout: 'fit',
        items: [
            {
                xtype: 'component',
                cls: 'checkMarkIcon',
                html: ''
            },
            {
                xtype: 'image',
                cls: [
                    'img3',
                    'PhotoBoxShadow',
                    'PhotoBorderRadius'
                ],
                itemId: 'photo'
            }
        ]
    },

    updateRecord: function(record) {
        //console.log(1234);
        if(record)
        {
            this.down('#photo').setSrc(record.get('photo_604'));
        };
    }

});