Ext.define('ux.Dialogues', {
    extend : 'Ext.data.reader.Json',
    alias : 'reader.dialogues',
    xtype:'widget.dialogues',
    getResponseData : function(response) {

	var data = this.callParent([response]);
			if (!data.response)
		{
			return data;    
		}

		var usersStore=Ext.getStore('Users');
		var messages=JSON.parse(response.responseText);
		if (messages.response.users)
		for (var i=0;i<messages.response.users.length;i++)
		{
			var userRecord=usersStore.getById(messages.response.users[i]);
			if(!userRecord)
			{
				userRecord=new VKM.model.User(messages.response.users[i]);
				usersStore.add(userRecord);
			}
			else
			{
				userRecord.set(messages.response.users[i]);
			}
//			userRecord.save();
		};
		if (messages.response.owners)
			for (var i=0;i<messages.response.owners.length;i++)
			{
				var userRecord=usersStore.getById(messages.response.owners[i]);
				if(!userRecord)
				{
					userRecord=new VKM.model.User(messages.response.owners[i]);
					usersStore.add(userRecord);
				}
				else
				{
					userRecord.set(messages.response.owners[i]);
				}
//				userRecord.save();
			};
		if (messages.response.chaters)
			for (var i=0;i<messages.response.chaters.length;i++)
			{
				var userRecord=usersStore.getById(messages.response.chaters[i]);
				if(!userRecord)
				{
					userRecord=new VKM.model.User(messages.response.chaters[i]);
					usersStore.add(userRecord);
				}
				else
				{
					userRecord.set(messages.response.chaters[i]);
				}
//				userRecord.save();
			};
	        
        //do stuff here
		if(this.config.dialogue)
        {	for (var i=0;i<data.response.messages.items.length;i++)
			{
				var store=Ext.getStore('AllMessages');
				var id;
				if(data.response.messages.items[i].chat_id)
				{
					id=20000000+data.response.messages.items[i].chat_id
				}
				else
				{
					id=data.response.messages.items[i].user_id;
				}
				data.response.messages.items[i].did=id;
				//var record=store.getById(id);			
				
			};			
		}
		return data;
    
    }
});