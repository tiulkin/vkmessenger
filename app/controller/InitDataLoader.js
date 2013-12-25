/*
 * File: app/controller/InitDataLoader.js
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

Ext.define('VKM.controller.InitDataLoader', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            friendsIndex: 'component#friendsIndex',
            mainTabBar: 'tabbar#mainTabBar',
            messagesTabBar: 'tabbar#messagesTabBar',
            dialoguesList: 'list#dialoguesList',
            chatList: 'list#chatList',
            messagesList: 'list#inboxList'
        }
    },

    loadDialogs: function() {

    },

    initLongPolling: function() {
        var url='https://api.vk.com/method/messages.getLongPollServer?v=5.3&access_token='+
            VKM.app.globals.authData['access_token'];
        var controller=this;
        Ext.Ajax.request({
            url: url,
            method: 'GET',
            disableCaching: true,
            success: function(response) {
                var jsonRespoinse=JSON.parse(response.responseText);
                VKM.app.globals.pollingConnectionData=jsonRespoinse.response;
                if(VKM.app.globals.pollingConnectionData)
                {
                    controller.connectLongPolling();
                }
            },
            fail:
            function(response) {
                console.log('fail');
                console.log(response);
            }
        });
    },

    connectLongPolling: function() {
        if(!VKM.app.globals.doNotReconnect&&VKM.app.globals.pollingConnectionData&&VKM.app.globals.pollingConnectionData.server)
        {
            var server=VKM.app.globals.pollingConnectionData.server;
            var key=VKM.app.globals.pollingConnectionData.key;
            var ts=VKM.app.globals.pollingConnectionData.ts;
            var url='http://'+server+'?act=a_check&key='+key+'&ts='+ts+'&wait=25&mode=2'
            var controller=this;
            VKM.app.globals.lastTime=Ext.DateExtras.now();
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                disableCaching: true,
                success: function(response)
                {
                    console.log(VKM.app.globals.lastTime);
                    var jsonResponse=JSON.parse(response.responseText);
                    VKM.app.globals.pollingConnectionData.ts=jsonResponse.ts;
                    if (jsonResponse.failed&&!VKM.app.globals.doNotReconnect)
                    {
                        VKM.app.getController('InitDataLoader').initLongPolling();
                    }
                    else
                    {
                        if(!jsonResponse.updates)
                        {
                            console.log(response.responseText);
                        }
                        else
                        {

                            setTimeout(function(){
                                controller.processUpdates(jsonResponse.updates)
                            },100);

                        }
                        if(!VKM.app.globals.doNotReconnect)
                        {
                            controller.connectLongPolling()
                        };
                    }
                },
                fail:function(response)
                {
                    console.log("failConnect");
                    console.log(response);
                    controller.initLongPolling()
                }
            });


        }
    },

    getRecord: function(id, callback) {

    },

    loadDocsStep1: function() {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token']
            };
        var store=Ext.getStore('Docs');
        store.getProxy().setExtraParams(params);
        if(store.getCount()==0)
        {
            store.load();
        }

        //})
    },

    loadDocsStep2: function(response, messages) {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var settingsStore=Ext.getStore('settings');
        var messagesStore=Ext.getStore('Docs');
        messagesStore.removeAll();
        if(messages.response&&messages.response['items'])
        {
            for (var i=0;i<messages.response['items'].length;i++)
            {
                //var newRecord=new VKM.model.Albums(messages.response['items'][i]);
                messagesStore.add(messages.response['items'][i]);

            }
        }

    },

    deleteMessages: function() {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var url='https://api.vk.com/method/docs.get';
        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token']
            };

        dataController.go(url,params,controller.loadDocsStep2);


        //})
    },

    loadAudioStep1: function() {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var url='https://api.vk.com/method/audio.get';
        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token']
            };
        var store=Ext.getStore('Audios');
        store.getProxy().setExtraParams(params);
        if(store.getCount()==0)
        {
            store.load();
        }
    },

    loadAudioStep2: function(response, messages) {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var settingsStore=Ext.getStore('settings');
        var messagesStore=Ext.getStore('Audios');
        messagesStore.removeAll();
        if(messages.response&&messages.response['items'])
        {
            for (var i=0;i<messages.response['items'].length;i++)
            {
                //var newRecord=new VKM.model.Albums(messages.response['items'][i]);
                messagesStore.add(messages.response['items'][i]);

            }
        }
        console.log(messagesStore);
    },

    loadVideosStep1: function() {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var url='https://api.vk.com/method/video.get';
        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token']
            };

        console.log('3');
        dataController.go(url,params,controller.loadVideosStep2);


        //})
    },

    loadVideosStep2: function(response, messages) {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var settingsStore=Ext.getStore('settings');
        var messagesStore=Ext.getStore('Videos');
        messagesStore.removeAll();
        if(messages.response&&messages.response['items'])
        {
            for (var i=0;i<messages.response['items'].length;i++)
            {
                //var newRecord=new VKM.model.Albums(messages.response['items'][i]);
                messagesStore.add(messages.response['items'][i]);

            }
        }
        console.log(messagesStore);
    },

    loadAlbumsStep1: function() {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var url='https://api.vk.com/method/photos.getAlbums';
        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token'],
                need_covers:1,
                need_system:1
            };

        dataController.go(url,params,controller.loadAlbumsStep2);


        //})
    },

    loadAlbumsStep2: function(response, messages) {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var settingsStore=Ext.getStore('settings');
        var messagesStore=Ext.getStore('Albums');
        messagesStore.removeAll();

        if(messages.response&&messages.response['items'])
        {
            for (var i=0;i<messages.response['items'].length;i++)
            {
                //var newRecord=new VKM.model.Albums(messages.response['items'][i]);
                messagesStore.add(messages.response['items'][i]);

            }
        }
    },

    loadPhotosStep1: function(aid,parentController) {
        var store=Ext.getStore('Images');
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var url='https://api.vk.com/method/photos.get';

        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token'],
                album_id:aid,
                photo_sizes:1
            };
        store.getProxy().setUrl(url);
        store.getProxy().setExtraParams(params);
        store.removeAll();
        store.load({callback:function(){}});





        //})
    },

    loadPhotosStep2: function(response, messages) {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var settingsStore=Ext.getStore('settings');
        var messagesStore=Ext.getStore('Images');
        messagesStore.removeAll();

        if(messages.response&&messages.response['items'])
        {
            for (var i=0;i<messages.response['items'].length;i++)
            {
                //var newRecord=new VKM.model.Albums(messages.response['items'][i]);
                messagesStore.add(messages.response['items'][i]);

            }
        };
        var controller=VKM.app.getController('Dialogues');
        var store = Ext.getStore('Images');

        controller.overlay.gallery.renderImages(store);
    },

    loadInbox: function(offset, skipInitOthers, count) {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var url='https://api.vk.com/method/execute.messages';

        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token'],
                rev:0
            };
        var store=Ext.getStore('InboxMessages');

        store.getProxy().setUrl(url);
        store.getProxy().setExtraParams(params);
        store.getProxy().setReader(
            Ext.create("ux.Dialogues",
                       {
                           rootProperty: 'response.messages.items',
                           totalProperty: 'response.messages.count'
                       }
                      )
        )
        store.load();

        //})
    },

    loadSent: function(offset, skipInitOthers, count) {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var url='https://api.vk.com/method/execute.messages';

        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token'],
                //offset:offsetParam,
                rev:0,
                out:1
            };
        var store=Ext.getStore('SentMessages');

        store.getProxy().setUrl(url);
        store.getProxy().setExtraParams(params);
        store.getProxy().setReader(
            Ext.create("ux.Dialogues",
                       {
                           rootProperty: 'response.messages.items',
                           totalProperty: 'response.messages.count'
                       }
                      )
        )
        store.load();

        //})
    },

    loadMessagesStep1: function(initPolling) {
        var controller=VKM.app.getController('InitDataLoader');
        var url='https://api.vk.com/method/execute.dialogues';
        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token'],
                user_id:VKM.app.globals.authData.user_id,
                rev:0
            };
        var store=Ext.getStore('AllMessages');

        store.getProxy().setUrl(url);
        store.getProxy().setExtraParams(params);
        store.getProxy().setReader(
            Ext.create("ux.Dialogues",
                       {
                           dialogue:true,
                           rootProperty: 'response.messages.items',
                           totalProperty: 'response.messages.count'
                       }
                      )
        )
        var dialoguesList=controller.getDialoguesList();
        dialoguesList.setLoadingText(ux.locale.Manager.get('labels.Loading'));
        if (!initPolling)
        {
            dialoguesList.setLoadingText(false);
        }

        store.load({callback:function(){
            if(initPolling)
            {
                console.log(Ext.getStore('Users'))
                dialoguesList.setLoadingText(ux.locale.Manager.get('labels.Loading'));
                controller.initLongPolling();
            }
        }});


    },

    loadChatMessagesStep1: function(userId, chatId, offset, count) {
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var url='https://api.vk.com/method/messages.getHistory';
        // var offsetParam=0;
        // var skipInitOthersParam=0
        // if (!count)
        // {
        //     count=20;
        // };
        // if(offset)
        // {
        //     offsetParam=parseInt(offset);
        // };

        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token'],
        //         count:count,
        //         offset:offsetParam,
                rev:0
            };

        if (userId)
        {
            params.user_id=userId;
        }
        if (chatId)
        {
            //console.log(chatId);
            params.user_id=parseInt(chatId)+2000000000;
        }

        // dataController.go(url,params,controller.loadChatMessagesStep2);

        var store=Ext.getStore('Chat');

        store.getProxy().setUrl(url);
        store.getProxy().setExtraParams(params);
        // store.getProxy().setReader(
        //     Ext.create("ux.Dialogues",
        //                {
        //                    rootProperty: 'response.messages.items',
        //                    totalProperty: 'response.messages.count'
        //                }
        //               )
        // )
        var chatList=controller.getChatList();

        chatList.setLoadingText(ux.locale.Manager.get('labels.Loading'));
        store.load({callback:function(){
        //    store.setLoadingText(false);
            chatList.setLoadingText(false);
        }});

    },

    loadChatMessagesStep2: function(response, messages) {
        console.log(response);
        var controller=VKM.app.getController('InitDataLoader');
        var dataController=VKM.app.getController('DataLoader');
        var unmark='';
        if(messages.response&&messages.response['items'])
        {
            var messagesStore=Ext.getStore('Chat');
            if (messages.response.count>0)
            {
                for (var i=0;i<messages.response['items'].length;i++)
                {
                    if (!messagesStore.getById(messages.response['items'][i].id))
                    {
                        messagesStore.add(messages.response['items'][i]);
                        if(messages.response['items'][i].out==0&&messages.response['items'][i].read_state==0)
                        {
                            unmark+=(unmark==''?'':',')+messages.response['items'][i].id
                        };
                    }
        //             else
        //             {
        //                 console.log('vvv');
        //                 console.log(messages.response['items'][i]);
        //                 messagesStore.applyData(messages.response['items'][i]);
        //             }

                };
            }
            else
            {

            }
            if (unmark!='')
            {
                var url='https://api.vk.com/method/messages.markAsRead';
                var params=
                    {
                        v:'5.3',
                        access_token:VKM.app.globals.authData['access_token'],
                        message_ids:unmark
                    };
                dataController.go(url,params);
            }
            messagesStore.sort('date','ASC');

            if(messages.response.count>messagesStore.getCount())
            {
                messagesStore.add({id:0,date:0,user_id: false})
            }
            else
            {
                messagesStore.add({id:0,date:0,user_id: true});
                messagesStore.add({id:0,date:0,user_id: true});
            }
            if(response.request.options.params.offset)
            {

                var activeItem = Ext.ComponentQuery.query("#chatList");
                activeItem[0].scrollToRecord(VKM.app.globals['scrollToRecord'])
                VKM.app.globals['doNotScrollChat']='new';
            }

        };


    },

    loadUnreadMessagesStep1: function(initPolling, unreadOnly) {
        var controller=VKM.app.getController('InitDataLoader');
        var url='https://api.vk.com/method/execute.messages';
        var params=
            {
                v:'5.3',
                access_token:VKM.app.globals.authData['access_token'],
                filters:1,
                rev:0
            };
        var store=Ext.getStore('UnreadMessages');

        store.getProxy().setUrl(url);
        store.getProxy().setExtraParams(params);
        store.getProxy().setReader(
            Ext.create("ux.Dialogues",
                       {
                           rootProperty: 'response.messages.items',
                           totalProperty: 'response.messages.count'
                       }
                      )
        )
        store.load({
            callback:function(records, operation, success)
            {
                console.log('unread1');
                console.log(records.length);
                var users={};
                for (var i=0;i<records.length;i++)
                {
                    var userId=(records[i].get("chat_id")?20000000+records[i].get("chat_id"):records[i].get("user_id"));
                    users[userId]=true;
                }
                var count=0;
                for (var i in users)
                {
                    count+=1;
                };

                controller.getMainTabBar().items.items[0].setBadgeText(store.getCount())
                controller.getMessagesTabBar().items.items[0].setBadgeText(count);
                controller.getMessagesTabBar().items.items[1].setBadgeText(store.getCount());
                var store1=Ext.getStore('InboxMessages');
                if(store1.getCount()!=0)
                {
                    var messagesList=controller.getMessagesList();
                    var currentPage=store1.currentPage;
                    messagesList.setLoadingText(false);
                    store1.load({callback:function(){store1.currentPage=currentPage;messagesList.setLoadingText(ux.locale.Manager.get('labels.Loading'))}});
                }

            }

        });

        if(!unreadOnly)
        {
            controller.loadMessagesStep1(initPolling);
        }

    },

    processUpdates: function(response) {
        if(!response)
        {
            return;
        }
        var messagesStore=Ext.getStore('AllMessages');
        var refreshDialogues=false;
        var refreshUnread=false;
        var refreshChat=false;


        if(!VKM.app.globals.chat)
        {
            VKM.app.globals.chat={currentUserId:null}
        };
        for (var i =0;i<response.length;i++)
        {
            console.log(response[i]);

            if (response[i][0]==8)
            {
                var urecord=Ext.getStore('Users').getById(-response[i][1])
                if(urecord)
                {
                    urecord.set({'last_seen':Ext.DateExtras.now(),online:1})
                    Ext.getStore('Users').add(urecord);
                }
                var urecord=Ext.getStore('Friends').getById(-response[i][1])
                if(urecord)
                {
                    urecord.set({'last_seen':Ext.DateExtras.now(),online:1});
                    Ext.getStore('Friends').add(urecord);
                }

            }
            if (response[i][0]==9)
            {
                var urecord=Ext.getStore('Users').getById(-response[i][1])
                if(urecord)
                {
                    urecord.set({'last_seen':Ext.DateExtras.now(),online:0});
                    Ext.getStore('Users').add(urecord);
                }
                var urecord=Ext.getStore('Friends').getById(-response[i][1])
                if(urecord)
                {
                    urecord.set({'last_seen':Ext.DateExtras.now(),online:0});
                    Ext.getStore('Friends').add(urecord)
                }


            }

            if (response[i][0]==51)
            {
                //var message=messagesStore.getById(response[i][1]);
                if(response[i][2]==0)
                {
                    refreshDialogues=true
                };

            }
            if (response[i][0]==0)
            {

                refreshDialogues=true;
        //         var message=messagesStore.getById(response[i][1]);
        //         if (response[i][2]==0)
        //         {
        //             messagesStore.remove(message);
        //             message.save();
        //             messagesStore.remove(message);
        //         }
            }
            if (response[i][0]==4)
            {
                refreshDialogues=true;
                refreshUnread=true;
                console.log(VKM.app.globals.chat);
                console.log(response[i][3]);
                console.log(VKM.app.globals.authData['user_id']);

                var suserid=response[i][3];
                if(VKM.app.globals.chat.currentUserId==response[i][3])
                {
                    refreshChat=true;

                }
                if(VKM.app.globals.chat.currentChatId+2000000000==response[i][3])
                {
                    refreshChat=true;
                };

                if(!VKM.app.globals.settings.globalSilenceMode)
                {
                    var settingsStore=Ext.getStore('userSettings');

                    var record=settingsStore.getById(response[i][3]);

                    if (record)
                    {
                        if(record.get('sound')&&record.get('sound')!='none')
                        {
                            VKM.app.globals.notificationAudio[record.get('sound')].play();
                        }
                    }
                    else
                    {
                        if(VKM.app.globals.settings.newMessageSound&&VKM.app.globals.settings.newMessageSound!='none')
                        {
                            VKM.app.globals.notificationAudio[VKM.app.globals.settings.newMessageSound].play();
                        };
                    }
                    if (record)
                    {
                        if(record.get('vibrate')&&tizen)
                        {
                            navigator.vibrate([1000, 1000]);
                        }
                    }
                    else
                    {
                        if(VKM.app.globals.settings.newMessageVibrate&&tizen)
                        {
                            navigator.vibrate([1000, 1000]);
                        };
                    }



                    if(!refreshChat)
                    {
                        var sender=Ext.getStore('Users').getById(response[i][3]);
                        var title='';
                        var img='';
                        var icon='';

                        if(sender)
                        {
                            title=sender.get('first_name')+','+sender.get('last_name');
                            //icon=sender.get('photo_50');
                        }
                        else
                        {
                            title=response[i][5]
                        }
                        var messageBody=response[i][6];
                        //         if(messageBody)
                        //         {
                        //             messageBody=VKM.app.smiles(messageBody)
                        //         };
                        console.log(response[i][2])
                        console.log(response[i][2]&&2)
                        if (record&&tizen&&(response[i][2]&&2))
                        {
                            if(record.get('banner'))
                            {
                                VKM.app.SimpleNotification(title,messageBody,icon)
                            }
                        }
                        else
                        {
                            if(VKM.app.globals.settings.newMessageNotification&&tizen&&(response[i][2]&&2))
                            {
                                VKM.app.SimpleNotification(title,messageBody,icon)
                            };
                        }
                    }

                }

            }
            if (response[i][0]==2)
            {

                var messageId=response[i][1];
                var isUnread=response[i][2]&&1;
                var isDeleted=response[i][2]&&128;
                var message=messagesStore.getById(response[i][1]);
                if (isDeleted&&message)
                {
                    messagesStore.remove(message);
                    refreshDialogues=true;
                    refreshUnread=true;
                }

                if (isUnread&&message)
                {
                    var messageData=message.getData();
                    messageData.read_state=0;
                    message.set(messageData);
                    //message.save();
                    refreshUnread=true;
                }
                if(VKM.app.globals.chat.currentUserId==response[i][3])
                {
                    refreshChat=true;
                };
            }
            if (response[i][0]==3)
            {
                var messageId=response[i][1];
                var isUnread=response[i][2]&&1;
                var isDeleted=response[i][2]&&128;
                var message=messagesStore.getById(response[i][3]);
                if (!message)
                {
                    if (isUnread)
                    {
                        refreshDialogues=true;
                        refreshUnread=true;
                    }
                    if (isDeleted)
                    {
                        refreshDialogues=true;
                    }


                }
                else
                {
                    if (isUnread)
                    {
                        refreshDialogues=true;
                        refreshUnread=true;
                    }
                    if (isDeleted)
                    {
                        refreshDialogues=true;
                    }
                }
                if(VKM.app.globals.chat.currentUserId==response[i][3])
                {
                    refreshChat=true;
                };


            }
            if (response[i][0]==2)
            {
                var messageId=response[i][1];
                var isUnread=response[i][2]&&1;
                var isDeleted=response[i][2]&&128;
                var message=messagesStore.getById(response[i][3]);
                if (!message)
                {
                    if (isUnread)
                    {
                        refreshDialogues=true;
                    }
                    if (isDeleted)
                    {
                        refreshDialogues=true;
                    }


                }
                else
                {
                    if (isUnread)
                    {
                        refreshDialogues=true;
                        refreshUnread=true;
                    }
                    if (isDeleted)
                    {
                        refreshDialogues=true;
                    }
                }
                if(VKM.app.globals.chat.userId==response[i][1])
                {
                    refreshChat=true;
                };

            }
        }

        if (refreshChat)
        {
            var controller=VKM.app.getController('InitDataLoader');
            var chatStore=Ext.getStore('Chat');
            var currentCPage=chatStore.currentPage;
            var currentCLimit=chatStore.getPageSize();
            console.log(currentCPage);
            chatStore.currentPage=1;
            chatStore.setPageSize(5);
            chatStore.loadPage(1,{callback:function()
                        {
                            console.log(currentCPage);
                            chatStore.setPageSize(currentLimit);
                            chatStore.currentPage=currentCPage;

                        }
                       });
            refreshUnread=false;
            controller.loadUnreadMessagesStep1(false,true);

        }

        if (refreshDialogues)
        {

            var controller=VKM.app.getController('InitDataLoader');
            var store=Ext.getStore('AllMessages');
            var currentPage=store.currentPage;
            var currentLimit=store.getPageSize();
            var dialoguesList=controller.getDialoguesList();
            dialoguesList.setLoadingText(false);


            //console.log(limit);
            store.currentPage=1;
            store.setPageSize(5);

            store.loadPage(1,{callback:function()
                              {
                                  store.setPageSize(currentLimit);
                                  store.currentPage=currentPage;
                                  dialoguesList.setLoadingText(ux.locale.Manager.get('labels.Loading'));
                              }
                             });
            if(refreshUnread)
                controller.loadUnreadMessagesStep1(false,true);


            //controller.refreshUnread(0,true,10);
        }
        else
        {
            if (refreshUnread)
            {

                var controller=VKM.app.getController('InitDataLoader');
                controller.loadUnreadMessagesStep1(false,true);
            }
        }
    }

});