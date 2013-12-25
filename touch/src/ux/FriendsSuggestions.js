Ext.define('ux.FriendsSuggestions', {
    extend : 'Ext.data.reader.Json',
    alias : 'reader.friendssuggestions',
    xtype:'widget.friendssuggestions',
    getResponseData : function(response) {
		var data = this.callParent([response]);		
		if (!data.response)
		{
			return data;    
		}
		
		var cities=Ext.getStore("Cities");
		console.log(data);
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
		
		for (var i=0;i<data.response.items.length;i++)
		{
			if(data.response.items[i].city)
			{
				var cityName=cities.getById(data.response.items[i].city);
				//console.log(cityName.get('title'));
				if(cityName)
				{					
					data.response.items[i].cityName=cityName.getData().title;					
				}					
			}
			if(data.response.items[i].country)
			{
				var countryName=countries.getById(data.response.items[i].country);
				if(countryName)
				{
					data.response.items[i].countryName=countryName.getData().title;
				}
			}
		}
		return data;    
    }
});

