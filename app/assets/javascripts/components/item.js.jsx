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
            <td className="ItemEdit"><a href="#" className="btn btn-primary" onClick={this.handleEdit}>Edit</a></td> 
            <td className="ItemDelete"><a href="#" className="btn btn-danger" onClick={this.handleDelete}>Delete</a></td> 
        </tr>); 
    },  
    itemRowEdit: function() { 
        return (<tr className="ItemEdit"> 
            <td className="ItemName"> 
                <input className="form-control" type="text" defaultValue={this.state.name} onChange={this.handleNameChange} /> 
            </td> 
            <td className="ItemPlandate"> 
                <input className="form-control" type="date" defaultValue={this.state.plandate} onChange={this.handlePlandateChange}/> 
            </td> 
            <td className="ItemComment"> 
                <input className="form-control" type="text" defaultValue={this.state.comment} onChange={this.handleCommentChange}/> 
            </td> 
            <td className="ItemFactdate"> 
                <input className="form-control" type="text" defaultValue={this.state.factdate} onChange={this.handleFactdateChange}/> 
            </td> 
            <td className="ItemEdit"><a href="#" className="btn btn-primary" onClick={this.handleSave}>Save</a></td> 
            <td className="ItemDelete"><a href="#" className="btn btn-defalut" onClick={this.handleCancel}>Cancel</a></td> 
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