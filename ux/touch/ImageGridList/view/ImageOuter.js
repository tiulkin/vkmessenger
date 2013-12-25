/**
 * Image outer component of Ext.ux.touch.ImageGridList 
 *
 * @class Ext.ux.touch.ImageGridList.view.ImageOuter
 * @extends Ext.Container
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 */
Ext.define('ux.touch.ImageGridList.view.ImageOuter', {

    requires: [
    'ux.touch.ImageGridList.view.Image'
    ],

    extend: 'Ext.Container',

    alias: 'widget.image-grid-list-imageouter',

    config: {

        cls: 'image-grid-list-imageouter',

        items: [
        ]
    }
});