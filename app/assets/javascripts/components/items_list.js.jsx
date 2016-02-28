var ItemsList = React.createClass({ 
    getInitialState: function() { 
        return {sort_priority_id_asc: ''}; 
    },
    handlePrioritySortOrder: function(e) {
        e.preventDefault(); 
        switch(this.state.sort_priority_id_asc) {
            case '':
                this.setState({ sort_priority_id_asc: false });
                break;
            case true:
                this.setState({ sort_priority_id_asc: false });
                break;
            case false:
                this.setState({ sort_priority_id_asc: true });
                break;
        }
    },
    handleItemDelete: function(item) { 
        this.props.onItemDelete2(item); 
    }, 
    handleItemSave: function(item) { 
        this.props.onItemSave2(item); 
    }, 
    render: function() {
        var data_sort_by_priority_id;
        switch(this.state.sort_priority_id_asc) {
            case true:
                data_sort_by_priority_id = this.props.data.sort(compare_priority);
                break;
            case false:
                data_sort_by_priority_id = this.props.data.sort(compare_priority_desc);
                break;
            default:
                data_sort_by_priority_id = this.props.data;
        }
        var _this = this, itemNodes = data_sort_by_priority_id.map(function(item){ 
            return ( 
                <Item onItemDelete={_this.handleItemDelete} 
                    onItemSave={_this.handleItemSave} 
                    name={item.name} 
                    plandate={item.plandate} 
                    comment={item.comment} 
                    factdate={item.factdate}
                    priority_id={item.priority_id} 
                    key={item.id}
                    id={item.id}
                    dictpriority={_this.props.dictpriority}> 
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
                <th width="150px">
                  <a href="#" onClick={this.handlePrioritySortOrder}>Priority</a>
                </th>
                <th width="100px"></th>
                <th width="100px"></th>
            </tr> 
                {itemNodes} 
            </tbody> 
          </table> 
      ); 
    } 
}); 