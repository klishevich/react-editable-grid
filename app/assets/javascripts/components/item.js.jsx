var Item = React.createClass({ 
    getInitialState: function() { 
        return {edit: false, name: '', plandate: '', comment: '', factdate: '', priority_id: ''}; 
    }, 
    handleChange: function(e) { 
      this.setState({ [e.target.name]: e.target.value });
    },
    handleSelectChange: function(item) { 
      this.setState(item);
    },
    handleEdit: function(e) { 
        e.preventDefault(); 
        this.setState({ edit: true, name: this.props.name, plandate: this.props.plandate, 
            comment: this.props.comment, factdate: this.props.factdate, priority_id: this.props.priority_id}); 
    }, 
    handleCancel: function(e) { 
        e.preventDefault(); 
        this.setState({ edit: false, name: this.props.name, plandate: this.props.plandate, 
            comment: this.props.comment, factdate: this.props.factdate, priority_id: this.props.priority_id}); 
    }, 
    handleSave: function(e) { 
        e.preventDefault(); 
        var name = this.state.name; 
        var plandate = this.state.plandate; 
        var comment = this.state.comment; 
        var factdate = this.state.factdate;
        var priority_id = this.state.priority_id; 
        if (!name || !plandate ) { 
            return; 
        } 
        this.props.onItemSave({ id: this.props.id, 
            name: name, plandate: plandate, comment: comment, factdate: factdate, priority_id: priority_id}); 
        this.setState({ edit: false }); 
    }, 
    handleDelete: function(e) { 
        e.preventDefault(); 
        this.props.onItemDelete({ id: this.props.id }); 
    }, 
    itemRowView: function() { 
        return (<tr className="ItemView"> 
            <td className="ItemName">{this.props.name}</td> 
            <td className="ItemPlandate">{this.props.plandate}</td> 
            <td className="ItemComment">{this.props.comment}</td> 
            <td className="ItemFactdate">{this.props.factdate}</td> 
            <td className="ItemPriority">
                <PrioritySelect view="true" priority_id={this.props.priority_id} onSelectChange={this.handleSelectChange}/> 
            </td> 
            <td className="ItemEdit"><a href="#" className="btn btn-primary" onClick={this.handleEdit}>Edit</a></td> 
            <td className="ItemDelete"><a href="#" className="btn btn-danger" onClick={this.handleDelete}>Delete</a></td> 
        </tr>); 
    },  
    itemRowEdit: function() { 
        return (<tr className="ItemEdit"> 
            <td className="ItemName"> 
                <input className="form-control" type="text" defaultValue={this.state.name} name="name" onChange={this.handleChange} /> 
            </td> 
            <td className="ItemPlandate"> 
                <input className="form-control" type="date" defaultValue={this.state.plandate} name="plandate" onChange={this.handleChange}/> 
            </td> 
            <td className="ItemComment"> 
                <input className="form-control" type="text" defaultValue={this.state.comment} name="comment" onChange={this.handleChange}/> 
            </td> 
            <td className="ItemFactdate"> 
                <input className="form-control" type="date" defaultValue={this.state.factdate} name="factdate" onChange={this.handleChange}/> 
            </td> 
            <td className="ItemPriority"> 
                <PrioritySelect priority_id={this.state.priority_id} onSelectChange={this.handleSelectChange}/> 
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