var ItemsList = React.createClass({ 
    handleItemDelete: function(item) { 
        this.props.onItemDelete2(item); 
    }, 
    handleItemSave: function(item) { 
        this.props.onItemSave2(item); 
    }, 
    render: function() { 
        var _this = this, itemNodes = this.props.data.map(function(item){ 
            return ( 
                <Item onItemDelete={_this.handleItemDelete} 
                    onItemSave={_this.handleItemSave} 
                    name={item.name} 
                    plandate={item.plandate} 
                    comment={item.comment} 
                    factdate={item.factdate}
                    priority_id={item.priority_id} 
                    key={item.id}
                    id={item.id}> 
                </Item> 
                ); 
            }); 
        return ( 
          <table className="ItemsList table table-striped"> 
            <tbody> 
            <tr> 
                <th>Item Name</th> 
                <th>Plan Date</th> 
                <th>Comment</th> 
                <th>Fact Date</th>
                <th width="150px">Priority</th>
                <th width="100px"></th>
                <th width="100px"></th>
            </tr> 
                {itemNodes} 
            </tbody> 
          </table> 
      ); 
    } 
}); 