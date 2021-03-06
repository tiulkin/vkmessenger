/*
 * File: app/view/MapChooser.js
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

Ext.define('VKM.view.MapChooser', {
    extend: 'Ext.Panel',
    alias: 'widget.mapchooser',

    requires: [
        'Ext.Container',
        'Ext.Button'
    ],

    config: {
        centered: true,
        height: '100%',
        id: 'tmpPanel',
        itemId: 'popUpChooser',
        width: '100%',
        hideOnMaskTap: true,
        layout: 'fit',
        modal: true,
        hideAnimation: {
            type: 'popOut',
            duration: 250,
            easing: 'ease-out'
        },
        showAnimation: {
            type: 'popIn',
            duration: 250,
            easing: 'ease-out'
        },
        items: [
            {
                xtype: 'component',
                id: 'YMapsID'
            },
            {
                xtype: 'container',
                docked: 'bottom',
                style: {
                    'font-size': '1.2em'
                },
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'mybutton116',
                        ui: 'action',
                        width: '30%',
                        iconCls: 'delete'
                    },
                    {
                        xtype: 'button',
                        itemId: 'mybutton115',
                        ui: 'action',
                        width: '30%',
                        iconCls: 'checkMark'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onPopUpChooserPainted',
                event: 'painted'
            },
            {
                fn: 'onTmpPanelDestroy',
                event: 'destroy'
            },
            {
                fn: 'onMybutton116Tap',
                event: 'tap',
                delegate: '#mybutton116'
            },
            {
                fn: 'onMybutton115Tap',
                event: 'tap',
                delegate: '#mybutton115'
            }
        ]
    },

    onPopUpChooserPainted: function(element, eOpts) {
        var service = new GeolocationService(),
            myLocation = service.getLocation({
                // Режим получения наиболее точных данных.
                enableHighAccuracy: true,
                // Максимальное время ожидания ответа (в миллисекундах).
                timeout: 10000,
                // Максимальное время жизни полученных данных (в миллисекундах).
                maximumAge: 1000
            });




        myLocation.then(function (loc) {
            var myCoords = [loc.latitude, loc.longitude];

            VKM.app.globals.coords=myCoords;
            VKM.app.globals.myMap = new ymaps.Map('YMapsID', {
                center: myCoords,
                zoom: 14,
                behaviors: ['default', 'scrollZoom']
            });
            var SearchControl = new ymaps.control.SearchControl({noPlacemark:true});
            VKM.app.globals.myMap.controls
            .add(SearchControl)
            .add('zoomControl')
        //    .add('typeSelector')
        //    .add('mapTools');
            VKM.app.globals.myPlacemark = new ymaps.Placemark(myCoords,{}, {preset: "twirl#redIcon", draggable: true});
            VKM.app.globals.myMap.geoObjects.add(VKM.app.globals.myPlacemark);

            //Отслеживаем событие перемещения метки
            VKM.app.globals.myPlacemark.events.add("dragend", function (e) {
                VKM.app.globals.coords = this.geometry.getCoordinates();
                VKM.app.savecoordinats();
            }, VKM.app.globals.myPlacemark);

            //Отслеживаем событие щелчка по карте
            VKM.app.globals.myMap.events.add('click', function (e) {
                VKM.app.globals.coords = e.get('coordPosition');
                VKM.app.savecoordinats();
            });

            //Отслеживаем событие выбора результата поиска
            SearchControl.events.add("resultselect", function (e) {
                VKM.app.globals.coords = SearchControl.getResultsArray()[0].geometry.getCoordinates();
                VKM.app.savecoordinats();
            });


            //Ослеживаем событие изменения области просмотра карты - масштаб и центр карты
            VKM.app.globals.myMap.events.add('boundschange', function (event) {
                if (event.get('newZoom') != event.get('oldZoom')) {
                    VKM.app.savecoordinats();
                }
                if (event.get('newCenter') != event.get('oldCenter')) {
                    VKM.app.savecoordinats();
                }

            });

        });



    },

    onTmpPanelDestroy: function(eOpts) {
        console.log(10);
        VKM.app.globals.myMap.destroy()
    },

    onMybutton116Tap: function(button, e, eOpts) {
        button.up('#tmpPanel').destroy();
    },

    onMybutton115Tap: function(button, e, eOpts) {
        var url='http://maps.googleapis.com/maps/api/staticmap?center='+VKM.app.globals.coords+
                '&zoom=15&size=100x70&maptype=roadmap&markers=color:blue%7C'+VKM.app.globals.coords+'&sensor=true'

        Ext.getStore('Attachments').add({
            id:'geo',
            type:'geo',
            picture:url,
            lat:VKM.app.globals.coords[0],
            "long":VKM.app.globals.coords[1]
        });
        button.up('#tmpPanel').destroy();

    }

});