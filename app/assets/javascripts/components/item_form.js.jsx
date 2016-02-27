var ItemForm = React.createClass({ 
    getInitialState: function() { 
        return {name: '', plandate: '', comment: '', factdate: '', priority_id: ''}; 
    },
    handleChange: function(e) { 
      this.setState({ [e.target.name]: e.target.value });
    },
    handleSelectChange: function(item) { 
      this.setState(item);
    },
    handleSubmit: function(e) { 
        e.preventDefault(); 
        var name = this.state.name; 
        var plandate = this.state.plandate; 
        var comment = this.state.comment; 
        var factdate = this.state.factdate; 
        var priority_id = this.state.priority_id; 
        if (!name || !plandate ) { 
            return; 
        } 
        this.props.onItemSubmit({ to_do_list_id: this.props.to_do_list_id, name: name,
        plandate: plandate, comment: comment, factdate: factdate, priority_id: priority_id }); 
        this.setState({name: '', plandate: '', comment: '', factdate: '', priority_id: ''}); 
    }, 
    render: function() { 
        return ( 
      <form className="ItemForm form-inline" onSubmit={this.handleSubmit}> 
        <div className="form-group"> 
            <input 
            className="form-control" 
            type="text" 
            placeholder="Name"
            name="name"
            value={this.state.name} 
            onChange={this.handleChange} 
            /> 
        </div> 
        <div className="form-group"> 
          <input 
            className="form-control" 
            type="date" 
            name="plandate"
            value={this.state.plandate} 
            onChange={this.handleChange} 
            /> 
        </div> 
        <div className="form-group"> 
            <input 
            className="form-control" 
            type="text" 
            placeholder="Comment" 
            name="comment"
            value={this.state.comment} 
            onChange={this.handleChange} 
            /> 
        </div> 
        <div className="form-group"> 
            <input 
            className="form-control" 
            type="date" 
            name="factdate"
            value={this.state.factdate} 
            onChange={this.handleChange} 
            /> 
        </div>
        <PrioritySelect priority_id={this.state.priority_id} onSelectChange={this.handleSelectChange}/>  
      <input type="submit" value="Add" className = "btn btn-primary"/> 
      </form> 
      ); 
    } 
}); 