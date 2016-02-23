var ItemsBox = React.createClass({ 
    getInitialState: function() { 
        this.loadItemsFromServer(); 
        return {data: []}; 
    }, 
    loadItemsFromServer: function() { 
        $.ajax({ 
            url: '/to_do_lists/' + this.props.to_do_list_id + '/to_do_list_items', 
            dataType: 'json', 
            cache: false, 
            success: function(data) { 
                if (this.isMounted()) { 
                    this.setState({data: data}); 
                } 
            }.bind(this), 
            error: function(xhr, status, err) { 
                console.error(this.props.url, status, err.toString()); 
            }.bind(this) 
        }); 
    }, 
    handleItemSubmit: function(item) { 
        $.ajax({ 
            url: '/to_do_lists/' + this.props.to_do_list_id + '/to_do_list_items', 
            dataType: 'json', 
            type: 'POST', 
            data: item, 
            success: function(data) { 
                this.setState({data: data}); 
            }.bind(this), 
            error: function(xhr, status, err) { 
                console.error(this.props.url, status, err.toString()); 
            }.bind(this) 
        }); 
    }, 
    handleItemSave2: function(item) { 
        $.ajax({ 
            url: '/to_do_lists/' + this.props.to_do_list_id + '/to_do_list_items/' + item.id, 
            dataType: 'json', 
            type: 'PUT', 
            data: item, 
            success: function(data) { 
                this.setState({data: data}); 
            }.bind(this), 
            error: function(xhr, status, err) { 
                console.error(this.props.url, status, err.toString()); 
            }.bind(this) 
        }); 
    }, 
    handleItemDelete2: function(item) { 
        $.ajax({ 
            url: '/to_do_lists/' + this.props.to_do_list_id + '/to_do_list_items/' + item.id, 
            dataType: 'json', 
            type: 'DELETE', 
            data: item, 
            success: function(data) { 
                this.setState({data: data}); 
            }.bind(this), 
            error: function(xhr, status, err) { 
                console.error(this.props.url, status, err.toString()); 
            }.bind(this) 
        }); 
    }, 
    render: function() { 
        return ( 
          <div className="ItemsBox"> 
            <h3>ToDo List Items</h3> 
            <ItemsList data={this.state.data} onItemDelete2={this.handleItemDelete2} onItemSave2={this.handleItemSave2} to_do_list_id = {this.props.to_do_list_id}/> 
            <ItemForm onItemSubmit={this.handleItemSubmit} to_do_list_id = {this.props.to_do_list_id} /> 
          </div> 
      ); 
    } 
});