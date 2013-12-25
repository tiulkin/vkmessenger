/*
 * File: app/view/PopUpChooser.js
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

Ext.define('VKM.view.PopUpChooser', {
    extend: 'Ext.Panel',
    alias: 'widget.popupchooser',

    config: {
        centered: true,
        height: '100%',
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
        }
    }

});