Ext.define('ux.DialoguesSearch', {
    extend : 'Ext.data.reader.Json',
    alias : 'reader.dialoguessearch',
    xtype:'widget.dialoguessearch',
    getResponseData : function(response) {
		var data = this.callParent([response]);
		if (!data.response)
		{
			return data;    
		}

		var usersStore=Ext.getStore('Users');		
		if (data.response.users)
		for (var i=0;i<data.response.users.length;i++)
		{
			var userRecord=usersStore.getById(data.response.users[i]);
			if(!userRecord)
			{
				userRecord=new VKM.model.User(data.response.users[i]);
				usersStore.add(userRecord);
			}
			else
			{
				userRecord.set(data.response.users[i]);
			}
//			userRecord.save();
		};
		if (data.response.owners)
			for (var i=0;i<data.response.owners.length;i++)
			{
				var userRecord=usersStore.getById(data.response.owners[i]);
				if(!userRecord)
				{
					userRecord=new VKM.model.User(data.response.owners[i]);
					usersStore.add(userRecord);
				}
				else
				{
					userRecord.set(data.response.owners[i]);
				}
//				userRecord.save();
			};
		if (data.response.chaters)
			for (var i=0;i<data.response.chaters.length;i++)
			{
				var userRecord=usersStore.getById(data.response.chaters[i]);
				if(!userRecord)
				{
					userRecord=new VKM.model.User(data.response.chaters[i]);
					usersStore.add(userRecord);
				}
				else
				{
					userRecord.set(data.response.chaters[i]);
				}
//				userRecord.save();
			};
	        
        //do stuff here
		
		var toDelete=[];
		for (var i=0;i<data.response.messages.length;i++)
		{
			var store=Ext.getStore('FilteredDialogues');
			var id;
			
			if (data.response.messages[i].type=='profile')
			{
				data.response.messages[i].user_id=data.response.messages[i].id;									
				data.response.messages[i].did=data.response.messages[i].id;
			}
			else
			if (data.response.messages[i].type=='chat')
			{			
				data.response.messages[i].user_id=data.response.messages[i].admin_id;
				data.response.messages[i].chat_id=data.response.messages[i].id;
				data.response.messages[i].did=20000000+data.response.messages[i].id;
				data.response.messages[i].chat_active=data.response.messages[i].users;					
			}	
			else				
			{
				toDelete.push(i);					
			}
		};					
		for (var i=0;i<toDelete.length;i++)
		{
			//data.response.messages.splice(toDelete[i], 1);
			//toDelete.delete(i);
		}						
		console.log(data);
		return data;
		
    
    }
});