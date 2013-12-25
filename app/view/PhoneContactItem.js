/*
 * File: app/view/PhoneContactItem.js
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

Ext.define('VKM.view.PhoneContactItem', {
    extend: 'Ext.dataview.component.ListItem',
    alias: 'widget.phonecontactitem',

    requires: [
        'Ext.Img',
        'Ext.Container'
    ],

    config: {
        padding: '5 0 0 0',
        layout: 'vbox',
        itemCls: 'x-list-item',
        items: [
            {
                xtype: 'image',
                docked: 'left',
                height: 40,
                itemId: 'avatar',
                margin: 2,
                style: 'style="border-radius: 50% 50% 50% 50%"',
                width: 40
            },
            {
                xtype: 'container',
                margin: 0,
                layout: {
                    type: 'hbox',
                    align: 'start'
                },
                items: [
                    {
                        xtype: 'component',
                        flex: 1,
                        cls: 'name',
                        html: 'Sample component inside dataitem',
                        itemId: 'name'
                    },
                    {
                        xtype: 'component',
                        cls: 'x-item-datetime',
                        hidden: true,
                        html: 'Sample component inside dataitem',
                        itemId: 'datetime'
                    }
                ]
            },
            {
                xtype: 'component',
                flex: 1,
                cls: 'x-item-body',
                itemId: 'body'
            }
        ]
    },

    updateRecord: function(record) {
        if (!record) return

        var user=record;
        this.down('#avatar').setSrc(user.get('photoURI'));
        var isOnlineCls="";
        // if (user.get('online'))
        // {
        //     isOnlineCls='class="userOnline"';
        //     this.down('#body').setHidden(true);
        // }
        // else
        // {
        //     isOnlineCls='class="userOffline"';

        //     if (user.get('last_seen'))
        //     {
        //         var last_seen=new Date(parseInt(user.get('last_seen').time)*1000);
        //         this.down('#body').setHidden(false);
        //         this.down('#body').setHtml(ux.locale.Manager.get('labels.lastvisit')+' '+moment(last_seen).fromNow());
        //     }
        //     else
        //     {
        //         this.down('#body').setHidden(false);
        //     }
        //         ;
        // }
        //this.down('#name').setHtml('<span '+isOnlineCls+'>'+Ext.String.ellipsis(user.get('first_name')+' '+user.get('last_name'),23)+'</span>'); //+isOnline);
        this.down('#name').setHtml(
            Ext.String.ellipsis(user.get('firstName')+' '+user.get('lastName'),23)); //+isOnline);

    }

});