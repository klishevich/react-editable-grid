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
            <h3>ToDo Items</h3> 
            <ItemsList data={this.state.data} onItemDelete2={this.handleItemDelete2} onItemSave2={this.handleItemSave2} to_do_list_id = {this.props.to_do_list_id}/> 
            <ItemForm onItemSubmit={this.handleItemSubmit} to_do_list_id = {this.props.to_do_list_id} /> 
          </div> 
      ); 
    } 
}); 

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
                    key={item.id}
                    id={item.id}
                    to_do_list_id={_this.props.to_do_list_id}> 
                </Item> 
                ); 
            }); 
        return ( 
          <table className="ItemsList table table-striped"> 
            <tbody> 
            <tr> 
                <th>Item Name</th> 
                <th>PlanDate</th> 
                <th>Comment</th> 
                <th>FactDate</th>
                <th></th>
                <th></th>
            </tr> 
                {itemNodes} 
            </tbody> 
          </table> 
      ); 
    } 
}); 

var Item = React.createClass({ 
    getInitialState: function() { 
        return {edit: false, name: '', plandate: '', comment: '', factdate: ''}; 
    }, 
    handleNameChange: function(e) { 
        this.setState({name: e.target.value}); 
    }, 
    handlePlandateChange: function(e) { 
        this.setState({plandate: e.target.value}); 
    }, 
    handleCommentChange: function(e) { 
        this.setState({comment: e.target.value}); 
    }, 
    handleFactdateChange: function(e) { 
        this.setState({factdate: e.target.value}); 
    },  
    handleEdit: function(e) { 
        e.preventDefault(); 
        this.setState({ edit: true, name: this.props.name, plandate: this.props.plandate, 
            comment: this.props.comment, factdate: this.props.factdate}); 
    }, 
    handleCancel: function(e) { 
        e.preventDefault(); 
        this.setState({ edit: false, name: this.props.name, plandate: this.props.plandate, 
            comment: this.props.comment, factdate: this.props.factdate}); 
    }, 
    handleSave: function(e) { 
        e.preventDefault(); 
        var name = this.state.name; 
        var plandate = this.state.plandate; 
        var comment = this.state.comment; 
        var factdate = this.state.factdate; 
        if (!name || !plandate ) { 
            return; 
        } 
        this.props.onItemSave({ id: this.props.id, to_do_list_id: this.props.to_do_list_id, 
            name: name, plandate: plandate, comment: comment, factdate: factdate}); 
        this.setState({ edit: false }); 
    }, 
    handleDelete: function(e) { 
        this.props.onItemDelete({ id: this.props.id, to_do_list_id: this.props.to_do_list_id}); 
    }, 
    itemRowView: function() { 
        return (<tr className="ItemView"> 
            <td className="ItemName">{this.props.name}</td> 
            <td className="ItemPlandate">{this.props.plandate}</td> 
            <td className="ItemComment">{this.props.comment}</td> 
            <td className="ItemFactdate">{this.props.factdate}</td> 
            <td className="ItemEdit"><a href="#" className="btn btn-primary btn-sm" onClick={this.handleEdit}>Edit</a></td> 
            <td className="ItemDelete"><a href="#" className="btn btn-danger btn-sm" onClick={this.handleDelete}>Delete</a></td> 
        </tr>); 
    },  
    itemRowEdit: function() { 
        return (<tr className="ItemEdit"> 
            <td className="ItemName"> 
                <input className="form-control input-sm" type="text" defaultValue={this.state.name} onChange={this.handleNameChange} /> 
            </td> 
            <td className="ItemPlandate"> 
                <input className="form-control input-sm" type="date" defaultValue={this.state.plandate} onChange={this.handlePlandateChange}/> 
            </td> 
            <td className="ItemComment"> 
                <input className="form-control input-sm" type="text" defaultValue={this.state.comment} onChange={this.handleCommentChange}/> 
            </td> 
            <td className="ItemFactdate"> 
                <input className="form-control input-sm" type="text" defaultValue={this.state.factdate} onChange={this.handleFactdateChange}/> 
            </td> 
            <td className="ItemEdit"><a href="#" className="btn btn-primary btn-sm" onClick={this.handleSave}>Save</a></td> 
            <td className="ItemDelete"><a href="#" className="btn btn-defalut btn-sm" onClick={this.handleCancel}>Cancel</a></td> 
        </tr>); 
    }, 
    render: function() { 
        if (this.state.edit) { 
            return this.itemRowEdit(); 
        } 
        else {
            return this.itemRowView();
        } 
    } 
}); 

var ItemForm = React.createClass({ 
    getInitialState: function() { 
        return {name: '', plandate: '', comment: '', factdate: ''}; 
    }, 
    handleNameChange: function(e) { 
        this.setState({name: e.target.value}); 
    }, 
    handlePlandateChange: function(e) { 
        this.setState({plandate: e.target.value}); 
    }, 
    handleCommentChange: function(e) { 
        this.setState({comment: e.target.value}); 
    }, 
    handleSubmit: function(e) { 
        e.preventDefault(); 
        var name = this.state.name; 
        var plandate = this.state.plandate; 
        var comment = this.state.comment; 
        var factdate = this.state.factdate; 
        if (!name || !plandate ) { 
            return; 
        } 
        this.props.onItemSubmit({ to_do_list_id: this.props.to_do_list_id, name: name,
        plandate: plandate, comment: comment, factdate: factdate }); 
        this.setState({name: '', plandate: '', comment: '', factdate: ''}); 
    }, 
    render: function() { 
        return ( 
      <form className="ItemForm form-inline" onSubmit={this.handleSubmit}> 
        <div className="form-group"> 
            <input 
            className="form-control input-sm" 
            type="text" 
            placeholder="Name" 
            value={this.state.name} 
            onChange={this.handleNameChange} 
            /> 
        </div> 
        <div className="form-group"> 
          <input 
            className="form-control input-sm" 
            type="date" 
            placeholder="Plan Date" 
            value={this.state.plandate} 
            onChange={this.handlePlandateChange} 
            /> 
        </div> 
        <div className="form-group"> 
            <input 
            className="form-control input-sm" 
            type="text" 
            placeholder="Comment" 
            value={this.state.comment} 
            onChange={this.handleCommentChange} 
            /> 
        </div> 
        <div className="form-group"> 
            <input 
            className="form-control input-sm" 
            type="text" 
            placeholder="Fact Date" 
            value={this.state.factdate} 
            onChange={this.handleFactdateChange} 
            /> 
        </div>  
      <input type="submit" value="Add" className = "btn btn-primary"/> 
      </form> 
      ); 
    } 
}); 

ReactDOM.render( 
  <ItemsBox url="/" to_do_list_id={$('#to_do_list_id').val()}/>, 
  document.getElementById('contentToDo') 
); 