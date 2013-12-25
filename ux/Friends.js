Ext.define('ux.Friends', {
    extend : 'Ext.data.reader.Json',
    alias : 'reader.friends',
    xtype:'widget.friends',
    getResponseData : function(response) {
		
		var data = this.callParent([response]);		
		if (!data.response)
		{
			return data;    
		}
		console.log(data)
		
		var alpha={};
		//var friw=JSON.parse(response.responseText);		

		var cities=Ext.getStore("Cities");
		var countries=Ext.getStore("Countries");
		if (data.response.cities1)
		{
			for (var i=0;i<data.response.cities1.length;i++)
			{
				cities.add(data.response.cities1[i]);
			}
		}
		if (data.response.countries1)
		{
			for (var i=0;i<data.response.countries1.length;i++)
			{
				countries.add(data.response.countries1[i]);
			}
		}		
		if (data.response.cities)
		{
			for (var i=0;i<data.response.cities.length;i++)
			{
				cities.add(data.response.cities[i]);
			}
		}
		
		if (data.response.countries)
		{
			for (var i=0;i<data.response.countries.length;i++)
			{
				countries.add(data.response.countries[i]);
			}
		}		

		
		for (var i=0;i<data.response.important.items.length;i++)
		{
			data.response.important.items[i].important=ux.locale.Manager.get('labels.important');
			
			if(data.response.important.items[i].city)
			{
				var cityName=cities.getById(data.response.important.items[i].city);
				//console.log(cityName.get('title'));
				if(cityName)
				{					
					data.response.important.items[i].cityName=cityName.getData().title;					
				}					
			}
			if(data.response.important.items[i].country)
			{
				var countryName=countries.getById(data.response.important.items[i].country);
				if(countryName)
				{
					data.response.important.items[i].countryName=countryName.getData().title;
				}
			}					
			
			alpha[data.response.important.items[i]['first_name'][0]]=true;
		};
		

		
		
		for (var i=0;i<data.response.friends.items.length;i++)
		{			
			alpha[data.response.friends.items[i]['first_name'][0]]=true;
			
			if(data.response.friends.items[i].city)
			{
				var cityName=cities.getById(data.response.friends.items[i].city);
				//console.log(cityName.get('title'));
				if(cityName)
				{					
					data.response.friends.items[i].cityName=cityName.getData().title;					
				}					
			}
			if(data.response.friends.items[i].country)
			{
				var countryName=countries.getById(data.response.friends.items[i].country);
				if(countryName)
				{
					data.response.friends.items[i].countryName=countryName.getData().title;
				}
			}					
		};
				
		data.response.friends.items=data.response.friends.items.concat(data.response.important.items);
		
		if (!VKM.app.globals.alpha)
		{
			VKM.app.globals.alpha=[];
		}
		for (var k in alpha){
			VKM.app.globals.alpha.push(k);
		}
		
		var controller=VKM.app.getController('InitDataLoader');
		controller.getFriendsIndex().setLetters(VKM.app.globals.alpha.sort());
		
		return data;    
    }
});