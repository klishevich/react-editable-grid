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
    handleFactdateChange: function(e) { 
        this.setState({factdate: e.target.value}); 
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
            className="form-control" 
            type="text" 
            placeholder="Name" 
            value={this.state.name} 
            onChange={this.handleNameChange} 
            /> 
        </div> 
        <div className="form-group"> 
          <input 
            className="form-control" 
            type="date" 
            value={this.state.plandate} 
            onChange={this.handlePlandateChange} 
            /> 
        </div> 
        <div className="form-group"> 
            <input 
            className="form-control" 
            type="text" 
            placeholder="Comment" 
            value={this.state.comment} 
            onChange={this.handleCommentChange} 
            /> 
        </div> 
        <div className="form-group"> 
            <input 
            className="form-control" 
            type="date" 
            value={this.state.factdate} 
            onChange={this.handleFactdateChange} 
            /> 
        </div>  
      <input type="submit" value="Add" className = "btn btn-primary"/> 
      </form> 
      ); 
    } 
}); 