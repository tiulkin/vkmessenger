Ext.define('ux.Contact', {
    extend : 'Ext.data.reader.Json',
    alias : 'reader.contact',
    xtype:'widget.contact',
    getResponseData : function(response) {	
		

		var data = this.callParent([response]);		
		if (!data.response)
		{
			return data;    
		}

		var cities=Ext.getStore("Cities");
		var countries=Ext.getStore("Countries");
		var users=Ext.getStore("Users");		
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
		
		
		
		if(data.response.user[0].city)
		{
			var cityName=cities.getById(data.response.user[0].city);			
			if(cityName)
			{					
				data.response.user[0].cityName=cityName.getData().title;
			}					
		}
		if(data.response.user[0].country)
		{
			var countryName=countries.getById(data.response.user[0].country);
			if(countryName)
			{
				data.response.user[0].countryName=countryName.getData().title;
			}
		}		
		if(data.response.isFriend)
		{
			data.response.user[0].isFriend=data.response.isFriend[0];

		}		

		
		users.add(data.response.user[0]);
		return data;
    }
});