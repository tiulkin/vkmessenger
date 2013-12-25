Ext.define('ux.AudioPlayer',{
	xtype:'audioplayer',
	extend:'Ext.Container',
	config:{
		url:'',
		duration:0,
		text:'Play',
		textPause:'Pause',
		loadingText:'Loading...',
		thumbWidth:320,//width of thumb on 1x device	
		thumbHeight:100,//height of thumb on 1x device
		tabletThumbWidth:640,//width of thumb on 1x tablet device
		tabletThumbHeight:200,//height of thumb on 1x tablet device
		thumb:'',
		tabletThumb:'',
		stopOnHide:true,
		title:'',
		layout_:'fit',
		
		items:[{
			xtype:'audio',
			url:'',
			hidden:true,
			cls:'x-hidden-display',
			listeners:{
				stop:function(){
					this.up().setButtonText(false);
				},
				ended:function(){
				    var me = this;
				    if( this.up().fireStopEvent!==false ){
						this.up().fireAudioEndedEvent(this);
					}
					setTimeout(function(){me.up().fireStopEvent = true;}, 1000);
					this.up().setButtonText(false);
				},
				startplaying:function(){
					this.up().setButtonText(true);
				},
				timeupdate:function(media, time, eOpts ){
					this.up().onTimeupdate(media, time, eOpts);
				},
				pause:function(){
					var p = this.up();
					if(p){
						p.setButtonText(false);
					}
				}
			}
		},{
			layout:{type:'hbox'},
			items:[{
				xtype:'button',
				cls:'playbutton',
				ui:'action',
				iconCls:'play',
				margin:'5',
				width:60,
				height:60,
				handler:function(button, evt){				
					var text 	= this.getText();
					var p 		= this.up('audioplayer');
					var audio	= p.getAudioComponent();
					if(evt && evt.target.className.indexOf('restart')!=-1){
						p.fireStopEvent = false;
						audio.stop();
						setTimeout(function(){audio.play();}, 100);
					}else{
						if(text==p.getText()){
							p.play();
						}else{
							audio.pause();
						}
					}
				}
			},{
				height:50,
				flex:1,
				//margin:'-5 0 0 0',
				layout:{type:'vbox',},
				items:[{
					docked:'top',
					cls:'audiotitle',
					ref:'audioTitleComponet',
					html:' '
				},{
					ref:'timeSliderComponet',
					docked:'top',
					xtype:'slider',
					increment:.1,
					value:0,
					listeners:{
						change:function(slider , thumb, newValue, oldValue,  eOpts){
							this.up('audioplayer').onSliderChange(slider , thumb, newValue, oldValue,  eOpts);
							if(this.sliderProgressElement){
								this.sliderProgressElement.setWidth(thumb.translatableBehavior.translatable.x+'px');
							}
						},
						drag:function(slider , thumb, newValue, oldValue,  eOpts){
							this.up('audioplayer').fireStopEvent = false;
							if(this.sliderProgressElement){
								this.sliderProgressElement.setWidth(thumb.translatableBehavior.translatable.x+'px');
							}
						},
						painted:function(){
							var audioplayer = this.up('audioplayer');
							this.sliderProgressElement = this.innerElement.createChild({cls:'x-slider-progress'});
							this.element.on({
								touchstart:function(){
									audioplayer.stop(false);
									audioplayer.updateSliderValue = false;
									audioplayer.fireStopEvent     = false;
								},
								touchend:function(){
									setTimeout(function(){audioplayer.updateSliderValue = true;}, 100);
									setTimeout(function(){audioplayer.fireStopEvent     = false;}, 1000);
								},
								scope:this
							});	
						}
					}
				},{
					docked:'bottom',
					layout:{type:'hbox'},
					cls:'bottomContainer',
					items:[{
						ref:'timePlayedComponet',
						xtype:'component',
						cls:'audiotime',
						html:'0:00'
					},{
						xtype:'spacer',
						flex:1
					},{
						ref:'timeRemainingComponet',
						xtype:'component',
						cls:'audiotime',						
						html:'0:00'	
					}]
				}]	
			}]
		}]
	},
	onSliderChange:function(slider , thumb, newValue, oldValue,  eOpts){
		var media = this.getAudioComponent();
		var duration = media.getDuration();
		media.setCurrentTime(newValue/100*duration);
		var me = this;
		setTimeout(function(){me.play();}, 100);
	},
	onTimeupdate:function(media, time){
		time 			= Math.round(time);
		var minutes 	= Math.floor(time / 60);
		var seconds 	= Ext.String.leftPad(''+(time - minutes * 60), 2, '0');
		this.timePlayedComponet.setHtml(minutes+':'+seconds);
		
		var duration 	= Math.round(media.getDuration());
		minutes 		= Math.floor(duration / 60);
		seconds 		= Ext.String.leftPad(''+(duration - minutes * 60), 2, '0');
		this.timeRemainingComponet.setHtml(minutes+':'+seconds);
		
		if(this.updateSliderValue!==false){
			this.timeSliderComponet.setValue(time/duration*100);
			if(this.timeSliderComponet.sliderProgressElement){
				var thumb = this.timeSliderComponet.getThumbs()[0];
				this.timeSliderComponet.sliderProgressElement.setWidth(thumb.translatableBehavior.translatable.x+'px');
			}
		}
	},
	fireAudioEndedEvent:function(audio){
		var me = this;
		if(!me.audioEndedEventFired){
			me.audioEndedEventFired = true;
			me.fireEvent('audioended', audio, this);
		}
		setTimeout(function(){me.audioEndedEventFired=false}, 1000);
	},
	fireAudioPlayEvent:function(audio){
		var me = this;
		if(!me.audioPlayedEventFired){
			me.audioPlayedEventFired = true;
			me.fireEvent('audioplay', audio, this);
			setTimeout(function(){me.audioPlayedEventFired=false}, 1000);
		}
	},
	getAudioComponent:function(){
		return this.items.getAt(0);
	},
	play:function(){
		this.fireStopEvent = true;
	    this.fireAudioPlayEvent(this);
	    this.setButtonText('play');
		var me = this;
		setTimeout(function(){me.getAudioComponent().play();}, 400);
	},
    stop:function(fireEvent){
	   this.fireStopEvent = !(fireEvent===false);
	   this.getAudioComponent().stop();
    },
	setButtonText:function(isPlaying){
		var text;
		if(isPlaying==='play'){
			text = this.getLoadingText()
		}else if(isPlaying){
			text = this.getTextPause();
		}else{
			text = this.getText()
		}
		this.updateText(text);
	},
	getElementConfig:function(){
		return {
			reference:'element',
			cls:'audioplayer',
			children:[{
				reference:'elementInner',
				cls:'elementInner'
			}]
		}
	},
	initialize:function(){
		var me = this;
		me.callParent();
		me.audioEndedEventFired=false;
		var thumbUrl = me.getThumbUrl();
		if(thumbUrl){
			me.elementInner.setStyle('background-image', 'url('+thumbUrl+')');
			me.elementInner.setStyle('background-size', me.getThumbW()+'px '+ me.getThumbH()+'px');
			me.elementInner.setHeight(me.getThumbH()+'px');
			me.items.getAt(1).setMargin('-105 0 0 0');
		}else{
			me.elementInner.hide();
		}
		if(me.getStopOnHide()){
			me.on('painted', function(){
				var ancestors = me.getAncestors();
				for(var i=0; i<ancestors.length; i++){
					ancestors[i].on('deactivate', me.onDeactivate, me);
				}
			}, me);
		}
		this.timePlayedComponet 	= this.down('[ref="timePlayedComponet"]');
		this.timeRemainingComponet 	= this.down('[ref="timeRemainingComponet"]');
		this.timeSliderComponet 	= this.down('[ref="timeSliderComponet"]');
		this.audioTitleComponet 	= this.down('[ref="audioTitleComponet"]');
		this.audioTitleComponet.setHtml(this.getTitle());		
		
		
		if (this.getDuration()>0)
		{
			var duration 	= Math.round(this.getDuration());
			minutes 		= Math.floor(duration / 60);
			seconds 		= Ext.String.leftPad(''+(duration - minutes * 60), 2, '0');
			this.timeRemainingComponet.setHtml(minutes+':'+seconds);
		}

		
		
	},
	applyTitle:function(title){
		if(this.audioTitleComponet){
			this.audioTitleComponet.setHtml(title);
		}
		return title;
	},
	onDeactivate:function(){
		var audio  = this.getAudioComponent();
		if(audio.media && audio.media.dom && audio.isPlaying()){
			audio.stop();
		}
	},
	getThumbUrl:function(){
		return this.getConfigFor('thumb');
	},
	updateUrl:function(url){
		this.getAudioComponent().setUrl(url);
	},
	updateText:function(text){
		var b = this.down('button');
		//_dir(text);
		b.removeCls('play');
		b.removeCls('loading');
		
		if(text.indexOf('Play')!=-1 || text.indexOf('Listen')!=-1){
			b.addCls('play');
		}else if(text.indexOf('Loading')!=-1){
			b.addCls('loading');
			this.fireEvent('audioloading', this.getAudioComponent(), this);
		}else{
			this.fireEvent('audioplaying', this.getAudioComponent(), this);	
		}
		b.setText(text);
	},
	getThumbW:function(){
		return this.getConfigFor('thumbWidth');
	},
	getThumbH:function(){
		return this.getConfigFor('thumbHeight');
	},
	getConfigFor:function(k){
		k 				= Ext.String.capitalize(k);
		var key		  	= 'get'+k;
		var tabletKey 	= 'getTablet'+k;
		if(Ext.isFunction(this[tabletKey]) && (Ext.os.is.Tablet || Ext.os.is.Desktop) && this[tabletKey]()){
			return this[tabletKey]();
		}else{
			return this[key]();
		}		
	}
});