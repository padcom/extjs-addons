/*!
 * Ext JS Library 3.3.1
 * Copyright(c) 2011 Matthias Hryniszak
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * @class Ext.ux.grid.AjaxRowExpander
 * @extends Object 
 * Plugin (ptype = 'ajaxrowexpander') for displaying Ajax-loaded content in details of an expanded row
 * 
 * @ptype ajaxrowexpander
 */
Ext.ux.grid.AjaxRowExpander = Ext.extend(Ext.ux.grid.RowExpander, {
    /**
     * @cfg {String} mode
     * <p>The mode in which to render the content</p>
     * <dl>
     * <dt>html</dt>
     * <dd>The content returned by server is inserted as-is into the body element</dd>
     * <dt>tpl</dt>
     * <dd>The content returned by server is transformed using the tpl and inserted into the body element. In this case
     *     there are 2 properties that you can use in the template:
     *     <ul>
     *        <li>parent - which points to the parent record</li>
     *        <li>details - which points to the object returned by server</li>
     *     </ul>
     * </dd>
     * </dl>
     * <p>Defaults to 'html'</p>
     */
    mode: 'html', 

    /**
     * @cfg {String} loadingIndicatorTpl
     * <p>The template to use while the content is loading. Default is '<div id="{id}">Loading...<div>'</p>
     */
    loadingIndicatorTpl: new Ext.Template('<div id="{id}">Loading...<div>'),

    getBodyContent : function(record, index) {
        var body = this.bodyContent[record.id];
        if (!this.enableCaching || !body){
            var bodyId = Ext.id();
            var body = this.loadingIndicatorTpl.apply({ id: bodyId });
            Ext.Ajax.request({
               url: this.previewUrl + record.id,
               disableCaching: true,
               success: this.onContentLoaded,
               failure: this.onLoadError,
               record: record,
               objId: record.id,
               bodyId: bodyId,
               scope: this
            });
        }
        return body;
    },

    onContentLoaded: function(response, options) {
        this.bodyContent[options.record.id] = this.onRenderContent(response, options);
        Ext.getDom(options.bodyId).innerHTML = this.bodyContent[options.record.id];
    },

    onLoadError: function(error) {
        Ext.MessageBox.alert("Error", error);
    },

    onRenderContent : function(response, options) {
        if (this.mode == 'html') {
          return response.responseText;
        } else {
          var data = { parent: options.record.data, details: Ext.decode(response.responseText) };
          return this.tpl.apply(data);
        }
    }
});

Ext.preg('ajaxrowexpander', Ext.ux.grid.AjaxRowExpander);
