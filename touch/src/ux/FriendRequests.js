Ext.define('ux.FriendRequests', {
    extend : 'Ext.data.reader.Json',
    alias : 'reader.friendrequests',
    xtype:'widget.friendrequests',
    getResponseData : function(response) {
		var data = this.callParent([response]);		
		if (!data.response)
		{
			return data;    
		}

		var cities=Ext.getStore("Cities");
				
		if (data.response.cities)
		{
			for (var i=0;i<data.response.cities.length;i++)
			{
				cities.add(data.response.cities);
			}
		}
		
		var countries=Ext.getStore("Countries");
		if (data.response.countries)
		{
			for (var i=0;i<data.response.countries.length;i++)
			{
				countries.add(data.response.countries);
			}
		}		

		
		for (var i=0;i<data.response.requests.items.length;i++)
		{
			data.response.requests.items[i]['friendType']=ux.locale.Manager.get('labels.friendrequests');						
			
			if(data.response.requests.items[i].city)
			{
				var cityName=cities.getById(data.response.requests.items[i].city);
				//console.log(cityName.get('title'));
				if(cityName)
				{					
					data.response.requests.items[i].cityName=cityName.getData().title;					
				}					
			}
			if(data.response.requests.items[i].country)
			{
				var countryName=countries.getById(data.response.requests.items[i].country);
				if(countryName)
				{
					data.response.requests.items[i].countryName=countryName.getData().title;
				}
			}							
		};		
				
		for (var i=0;i<data.response.followers.items.length;i++)
		{
			
			if(data.response.followers.items[i].city)
			{
				var cityName=cities.getById(data.response.followers.items[i].city);
				//console.log(cityName.get('title'));
				if(cityName)
				{					
					data.response.followers.items[i].cityName=cityName.getData().title;					
				}					
			}
			if(data.response.followers.items[i].country)
			{
				var countryName=countries.getById(data.response.followers.items[i].country);
				if(countryName)
				{
					data.response.followers.items[i].countryName=countryName.getData().title;
				}
			}							
		};		
		
		
		if(data.response.followers.count>0)
		{
			data.response.followers.items=data.response.followers.items.concat(data.response.requests.items);
		}
		else
		{
			data.response.followers.items=data.response.requests.items;
		}
		
		
		console.log(data)
		return data;    
    }
});

