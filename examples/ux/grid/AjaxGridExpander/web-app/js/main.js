Ext.onReady(function() {
  var store = new Ext.data.ArrayStore({
    fields: [
      { name: 'id', type: 'int' },
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string' }
    ], 
    data: [
      [ 1, 'John', 'Doe' ],
      [ 2, 'Jane', 'Smith' ]
    ]
  });

  var expander = new Ext.ux.grid.AjaxRowExpander({
    enableCaching: true, 
    previewUrl: '/example/data/details?id=',
    mode: 'tpl',
    tpl: new Ext.XTemplate(
      '<tpl for="details">',
        '{lastName}/{firstName}<br/>',
      '</tpl>'
    ),
    loadingIndicatorTpl: new Ext.Template('<span id="{id}">The content is loading...</span>')
  });

  var grid = new Ext.grid.GridPanel({
    store: store,
    autoExpandColumn: 'lastName',
    columns: [
      expander,
      { header: 'Id', dataIndex: 'id', sortable: true },
      { header: 'First name', dataIndex: 'firstName', sortable: true },
      { id: 'lastName', header: 'Last name', dataIndex: 'lastName', sortable: true }
    ],
    plugins: expander
  });

  var win = new Ext.Window({
    layout: 'fit',
    width: 600, 
    height: 480,
    items: [ grid ]
  });

  win.show();
});
