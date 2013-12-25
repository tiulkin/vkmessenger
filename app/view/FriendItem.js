/*
 * File: app/view/FriendItem.js
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

Ext.define('VKM.view.FriendItem', {
    extend: 'Ext.dataview.component.ListItem',
    alias: 'widget.frienditem',

    requires: [
        'Ext.Img'
    ],

    config: {
        cls: 'friends',
        padding: '5 5 5 5',
        itemCls: 'friends',
        layout: {
            type: 'vbox',
            align: 'start'
        },
        items: [
            {
                xtype: 'image',
                docked: 'left',
                height: 60,
                itemId: 'avatar',
                margin: 2,
                style: 'style="border-radius: 50% 50% 50% 50%"',
                width: 60
            },
            {
                xtype: 'component',
                cls: 'name',
                itemId: 'name',
                width: '100%'
            },
            {
                xtype: 'component',
                cls: 'x-item-body',
                height: '15px',
                itemId: 'location'
            },
            {
                xtype: 'component',
                cls: 'x-item-body',
                height: '15px',
                itemId: 'body',
                width: '100%'
            },
            {
                xtype: 'component',
                cls: 'x-item-body',
                itemId: 'body1',
                maxWidth: 300
            },
            {
                xtype: 'component',
                cls: 'x-item-body',
                itemId: 'lastSeen'
            }
        ]
    },

    updateRecord: function(record) {
        if (!record) return

        var user=record;
        this.down('#avatar').setSrc(user.get('photo_50'));
        var isOnlineCls="";
        if (user.get('online'))
        {
            isOnlineCls='class="userOnline"';

        }
        else
        {
            isOnlineCls='class="userOffline"';
        }
        this.down('#name').setHtml('<span '+isOnlineCls+'>'+Ext.String.ellipsis(user.get('first_name')+' '+user.get('last_name'),23)+'</span>'); //+isOnline);


        var location='';

        var country=record.get('countryName');
        if(country)
        {
            location=country+',';
        }

        var city=record.get('cityName');
        if(city)
        {
            location+=city;
        }
        if(location!='')
        {
            this.down('#location').setHidden(false);
            var html='<b>'+location+'</b>';
            this.down('#location').setHtml(html);
        }
        else
        {
            this.down('#location').setHidden(true);
        }




        var university_name=record.get('university_name');

        var html='';

        if(university_name)
        {
            this.down('#body').setHidden(false);
            html+=university_name
            this.down('#body').setHtml(html);
        }
        else
        {
            this.down('#body').setHidden(true);
        }
        var status=record.get('status');

        if(status)
        {

            this.down('#body1').setHidden(false);
            this.down('#body1').setHtml('<i>'+VKM.app.smiles(status)+'</i>');
        }
        else
        {
            this.down('#body1').setHidden(true);
        }

        if (user.get('last_seen')&&!user.get('online'))
        {
            var last_seen=new Date(parseInt(user.get('last_seen').time)*1000);
            this.down('#lastSeen').setHidden(false);
            this.down('#lastSeen').setHtml(ux.locale.Manager.get('labels.lastvisit')+' '+moment(last_seen).fromNow());
        }
        else
        {
            this.down('#lastSeen').setHidden(false);
            this.down('#lastSeen').setHtml(ux.locale.Manager.get('labels.Online'));
        }

    }

});