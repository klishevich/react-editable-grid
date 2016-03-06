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
    datePickerEdit: function(string_date) {
        if (string_date){
            return moment(string_date).toDate();
        }
        else {
            return null;
        }
    },
    datePickerShow: function(string_date) {
        if (string_date){
            return moment(string_date).format("DD.MM.YYYY");
        }
        else {
            return null;
        }
    },
    dateTimePickerShow: function(string_date) {
        if (string_date){
            return moment(string_date).format("DD.MM.YYYY hh:mm");
        }
        else {
            return null;
        }
    },
    itemRowView: function() { 
        return (<tr className="ItemView"> 
            <td className="ItemName">{this.props.name}</td> 
            <td className="ItemPlandate">{this.dateTimePickerShow(this.props.plandate)}</td> 
            <td className="ItemComment">{this.props.comment}</td> 
            <td className="ItemFactdate">{this.datePickerShow(this.props.factdate)}</td> 
            <td className="ItemPriority">
              <PrioritySelect view="true" priority_id={this.props.priority_id}
                  dictpriority={this.props.dictpriority}/> 
            </td> 
            <td className="ItemEdit"><a href="#" className="btn btn-primary" onClick={this.handleEdit}>Edit</a></td> 
            <td className="ItemDelete"><a href="#" className="btn btn-danger" onClick={this.handleDelete}>Delete</a></td> 
        </tr>); 
    },
    itemRowEdit: function() { 
        var changeDate = (name, value) => this.setState({ [name]: value });
        return (<tr className="ItemEdit"> 
            <td className="ItemName"> 
                <input className="form-control" type="text" defaultValue={this.state.name} name="name" onChange={this.handleChange} /> 
            </td> 
            <td className="ItemPlandate"> 
                <DateTimePicker value={this.datePickerEdit(this.state.plandate)} 
                  onChange={changeDate.bind(null, 'plandate')}
                  format={"DD.MM.YYYY hh:mm"}/>
            </td> 
            <td className="ItemComment"> 
                <input className="form-control" type="text" defaultValue={this.state.comment} name="comment" onChange={this.handleChange}/> 
            </td> 
            <td className="ItemFactdate"> 
                <DateTimePicker value={this.datePickerEdit(this.state.factdate)} 
                  defaultValue={null}
                  onChange={changeDate.bind(null, 'factdate')}
                  time={false}
                  format={"DD.MM.YYYY"}/>
            </td> 
            <td className="ItemPriority"> 
                <PrioritySelect priority_id={this.state.priority_id} onSelectChange={this.handleSelectChange}
                  dictpriority={this.props.dictpriority}/> 
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