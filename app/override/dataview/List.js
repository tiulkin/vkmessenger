Ext.define('VKM.override.dataview.List', {
    override: 'Ext.dataview.List',
    handlePinnedHeader: function(y) {
        var me = this,
            pinnedHeader = me.pinnedHeader,
            itemMap = me.getItemMap(),
            groups = me.groups,
            headerMap = me.headerMap,
            headerHeight = me.headerHeight,
            store = me.getStore(),
            totalScrollDockTopHeight = me.totalScrollDockTopHeight,
            record, closestHeader, pushedHeader, transY, headerString;
        
        closestHeader = itemMap.binarySearch(headerMap, -y);
        if(groups[closestHeader])
            record = groups[closestHeader].children[0];
        
        if (record) {
            pushedHeader = y + headerMap[closestHeader + 1] - headerHeight;
            // Top of the list or above (hide the floating header offscreen)
            if (y >= 0 || (closestHeader === 0 && totalScrollDockTopHeight + y >= 0) || (closestHeader === 0 && -y <= headerMap[closestHeader])) {
                transY = -10000;
            }
            // Scroll the floating header a bit
            else if (pushedHeader < 0) {
                transY = pushedHeader;
            }
            // Stick to the top of the screen
                else {
                    transY = Math.max(0, y);
                }
            
            headerString = store.getGroupString(record);
            
            if (pinnedHeader.$currentHeader != headerString) {
                pinnedHeader.setHtml(headerString);
                pinnedHeader.$currentHeader = headerString;
            }
            
            if (pinnedHeader.$position != transY) {
                pinnedHeader.translate(0, transY);
                pinnedHeader.$position = transY;
            }
        }
    },
    
});