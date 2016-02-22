var CCSessionBox = React.createClass({ 
    getInitialState: function() { 
        this.loadCCSessionsFromServer(); 
        return {data: []}; 
    }, 
    loadCCSessionsFromServer: function() { 
        $.ajax({ 
            url: '/CourtCase/SessionsList/' + this.props.IdCourtCase, 
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
    handleCCSessionSubmit: function(ccsession) { 
        $.ajax({ 
            url: '/CourtCaseSession/Create', 
            dataType: 'json', 
            type: 'POST', 
            data: ccsession, 
            success: function(data) { 
                this.setState({data: data}); 
            }.bind(this), 
            error: function(xhr, status, err) { 
                console.error(this.props.url, status, err.toString()); 
            }.bind(this) 
        }); 
    }, 
    handleCCSessionSave2: function(ccsession) { 
        $.ajax({ 
            url: '/CourtCaseSession/Edit', 
            dataType: 'json', 
            type: 'POST', 
            data: ccsession, 
            success: function(data) { 
                this.setState({data: data}); 
            }.bind(this), 
            error: function(xhr, status, err) { 
                console.error(this.props.url, status, err.toString()); 
            }.bind(this) 
        }); 
    }, 
    handleCCSessionDelete2: function(ccsession3) { 
        $.ajax({ 
            url: '/CourtCaseSession/Delete', 
            dataType: 'json', 
            type: 'POST', 
            data: ccsession3, 
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
          <div className="CCSessionBox"> 
            <h3 className="tw-settings-header">Заседания</h3> 
            <CCSessionList data={this.state.data} onCCSessionDelete2={this.handleCCSessionDelete2} onCCSessionSave2={this.handleCCSessionSave2} IdCourtCase = {this.props.IdCourtCase}/> 
            <CCSessionForm onCCSessionSubmit={this.handleCCSessionSubmit} IdCourtCase = {this.props.IdCourtCase} /> 
          </div> 
      ); 
    } 
}); 

var CCSessionList = React.createClass({ 
    handleCCSessionDelete: function(ccsession2) { 
        this.props.onCCSessionDelete2(ccsession2); 
    }, 
    handleCCSessionSave: function(ccsession) { 
        this.props.onCCSessionSave2(ccsession); 
    }, 
    render: function() { 
        var _this = this, ccsessionNodes = this.props.data.map(function(ccsession){ 
            return ( 
                <CCSession onCCSessionDelete={_this.handleCCSessionDelete} 
                    onCCSessionSave={_this.handleCCSessionSave} 
                    CourtName={ccsession.CourtName} 
                    HearingDate={ccsession.HearingDate} 
                    HearingPlace={ccsession.HearingPlace} 
                    JudgeName={ccsession.JudgeName} 
                    SessionResult={ccsession.SessionResult} 
                    SessionResultDate={ccsession.SessionResultDate ? ccsession.SessionResultDate : ''} 
                    EffectDate={ccsession.EffectDate ? ccsession.EffectDate : ''} 
                    key={ccsession.IdCourtCaseSession} 
                    IdCourtCaseSession={ccsession.IdCourtCaseSession} 
                    IdCourtCase = {_this.props.IdCourtCase} 
                    Errors = {ccsession.Errors}> 
                </CCSession> 
                ); 
            }); 
        return ( 
          <table className="CCSessionList table table-striped"> 
            <tbody> 
            <tr> 
                <th>Наименование суда</th> 
                <th>Дата заседания</th> 
                <th>Место заседания</th> 
                <th>Судья</th> 
                <th>Результат заседаний</th> 
                <th>Дата результата</th> 
                <th>Дата вступления в силу</th> 
                <th></th> 
                <th></th> 
            </tr> 
                {ccsessionNodes} 
            </tbody> 
          </table> 
      ); 
    } 
}); 

var CCSession = React.createClass({ 
    getInitialState: function() { 
        return {edit: false, CourtName: '', HearingDate: '', HearingPlace: '', JudgeName: '', SessionResult: '', SessionResultDate: '', EffectDate: ''}; 
    }, 
    handleCourtNameChange: function(e) { 
        this.setState({CourtName: e.target.value}); 
    }, 
    handleHearingDateChange: function(e) { 
        this.setState({HearingDate: e.target.value}); 
    }, 
    handleHearingPlaceChange: function(e) { 
        this.setState({HearingPlace: e.target.value}); 
    }, 
    handleJudgeNameChange: function(e) { 
        this.setState({JudgeName: e.target.value}); 
    }, 
    handleSessionResultChange: function(e) { 
        this.setState({SessionResult: e.target.value}); 
    }, 
    handleSessionResultDateChange: function(e) { 
        this.setState({SessionResultDate: e.target.value}); 
    }, 
    handleEffectDateChange: function(e) { 
        this.setState({EffectDate: e.target.value}); 
    }, 
    handleEdit: function(e) { 
        e.preventDefault(); 
        this.setState({ edit: true, CourtName: this.props.CourtName, HearingDate: convertDateEdit(this.props.HearingDate), HearingPlace: this.props.HearingPlace, JudgeName: this.props.JudgeName, 
            SessionResult: this.props.SessionResult, SessionResultDate: convertDateEdit(this.props.SessionResultDate), EffectDate: convertDateEdit(this.props.EffectDate)}); 
    }, 
    handleCancel: function(e) { 
        e.preventDefault(); 
        this.setState({ edit: false, CourtName: this.props.CourtName, HearingDate: convertDateEdit(this.props.HearingDate), HearingPlace: this.props.HearingPlace, JudgeName: this.props.JudgeName, 
            SessionResult: this.props.SessionResult, SessionResultDate: convertDateEdit(this.props.SessionResultDate), EffectDate: convertDateEdit(this.props.EffectDate)}); 
    }, 
    handleSave: function(e) { 
        e.preventDefault(); 
        var CourtName = this.state.CourtName; 
        var HearingDate = this.state.HearingDate; 
        var HearingPlace = this.state.HearingPlace; 
        var JudgeName = this.state.JudgeName; 
        var SessionResult = this.state.SessionResult; 
        var SessionResultDate = this.state.SessionResultDate; 
        var EffectDate = this.state.EffectDate; 
        var IdCourtCase = this.props.IdCourtCase; 
        if (!CourtName || !HearingDate ) { 
            return; 
        } 
        this.props.onCCSessionSave({ IdCourtCaseSession: this.props.IdCourtCaseSession, IdCourtCase: this.props.IdCourtCase, CourtName: CourtName, HearingDate: HearingDate, HearingPlace: HearingPlace, 
            JudgeName: JudgeName, SessionResult: SessionResult, SessionResultDate: SessionResultDate, EffectDate: EffectDate}); 
        this.setState({ edit: false }); 
    }, 
    handleDelete: function(e) { 
        this.props.onCCSessionDelete({ IdCourtCaseSession: this.props.IdCourtCaseSession, IdCourtCase: this.props.IdCourtCase}); 
    }, 
    ccsessionRowView: function() { 
        return (<tr className="CCSession"> 
            <td className="CCSessionCourtName">{this.props.CourtName}</td> 
            <td className="CCSessionHearingDate">{convertDateShow(this.props.HearingDate)}</td> 
            <td className="CCSessionHearingPlace">{this.props.HearingPlace}</td> 
            <td className="CCSessionJudgeName">{this.props.JudgeName}</td> 
            <td className="CCSessionResult">{this.props.SessionResult}</td> 
            <td className="CCSessionResultDate">{convertDateShow(this.props.SessionResultDate)}</td> 
            <td className="CCSessionEffectDate">{convertDateShow(this.props.EffectDate)}</td> 
            <td className="CCSessionToggleEdit"><a href="#" className="btn btn-primary btn-sm" onClick={this.handleEdit}>Изменить</a></td> 
            <td className="CCSessionDelete"><a href="#" className="btn btn-danger btn-sm" onClick={this.handleDelete}>Удалить</a></td> 
        </tr>); 
    }, 
    ccsessionRowViewError: function() { 
        return (<tr className="CCSession"> 
            <td className="CCSessionCourtName" colspan="2"><div className="alert alert-danger" role="alert">{this.props.Errors}</div>{this.props.CourtName}</td> 
            <td className="CCSessionHearingDate">{convertDateShow(this.props.HearingDate)}</td> 
            <td className="CCSessionHearingPlace">{this.props.HearingPlace}</td> 
            <td className="CCSessionJudgeName">{this.props.JudgeName}</td> 
            <td className="CCSessionResult">{this.props.SessionResult}</td> 
            <td className="CCSessionResultDate">{convertDateShow(this.props.SessionResultDate)}</td> 
            <td className="CCSessionEffectDate">{convertDateShow(this.props.EffectDate)}</td> 
            <td className="CCSessionToggleEdit"><a href="#" className="btn btn-primary btn-sm" onClick={this.handleEdit}>Изменить</a></td> 
            <td className="CCSessionDelete"><a href="#" className="btn btn-danger btn-sm" onClick={this.handleDelete}>Удалить</a></td> 
        </tr>); 
    }, 
    ccsessionRowEdit: function() { 
        return (<tr className="CCSession"> 
            <td className="CCSessionCourtName"> 
                <input className="form-control input-sm" type="text" placeholder="Суд" defaultValue={this.state.CourtName} onChange={this.handleCourtNameChange} /> 
            </td> 
            <td className="CCSessionHearingDate"> 
                <input className="form-control input-sm" type="date" defaultValue={this.state.HearingDate} onChange={this.handleHearingDateChange}/> 
            </td> 
            <td className="CCSessionHearingPlace"> 
                <input className="form-control input-sm" type="text" placeholder="Место" defaultValue={this.state.HearingPlace} onChange={this.handleHearingPlaceChange}/> 
            </td> 
            <td className="CCSessionJudgeName"> 
                <input className="form-control input-sm" type="text" placeholder="Судья" defaultValue={this.state.JudgeName} onChange={this.handleJudgeNameChange}/> 
            </td> 
            <td className="CCSessionResult"> 
                <input className="form-control input-sm" type="text" placeholder="Результат" defaultValue={this.state.SessionResult} onChange={this.handleSessionResultChange}/> 
            </td> 
            <td className="CCSessionResultDate"> 
                <input className="form-control input-sm" type="date" defaultValue={this.state.SessionResultDate} onChange={this.handleSessionResultDateChange}/> 
            </td> 
            <td className="CCSessionEffectDate "> 
                <input className="form-control input-sm" type="date" defaultValue={this.state.EffectDate} onChange={this.handleEffectDateChange}/> 
            </td> 
            <td className="CCSessionToggleEdit"><a href="#" className="btn btn-primary btn-sm" onClick={this.handleSave}>Сохранить</a></td> 
            <td className="CCSessionDelete"><a href="#" className="btn btn-defalut btn-sm" onClick={this.handleCancel}>Отменить</a></td> 
        </tr>); 
    }, 
    render: function() { 
        if (this.state.edit) { 
            return this.ccsessionRowEdit(); 
        } 
        else { 
            if (this.props.Errors) { 
                return this.ccsessionRowViewError(); 
            } 
            else { 
                return this.ccsessionRowView(); 
            } 
        } 
    } 
}); 

var CCSessionForm = React.createClass({ 
    getInitialState: function() { 
        return {CourtName: '', HearingDate: '', HearingPlace: '', JudgeName: '', SessionResult: ''}; 
    }, 
    handleCourtNameChange: function(e) { 
        this.setState({CourtName: e.target.value}); 
    }, 
    handleHearingDateChange: function(e) { 
        this.setState({HearingDate: e.target.value}); 
    }, 
    handleHearingPlaceChange: function(e) { 
        this.setState({HearingPlace: e.target.value}); 
    }, 
    handleJudgeNameChange: function(e) { 
        this.setState({JudgeName: e.target.value}); 
    }, 
    handleSessionResultChange: function(e) { 
        this.setState({SessionResult: e.target.value}); 
    }, 
    handleSubmit: function(e) { 
        e.preventDefault(); 
        var CourtName = this.state.CourtName.trim(); 
        var HearingDate = this.state.HearingDate; 
        var HearingPlace = this.state.HearingPlace; 
        var JudgeName = this.state.JudgeName; 
        var SessionResult = this.state.SessionResult.trim(); 
        if (!CourtName || !HearingDate ) { 
            return; 
        } 
        this.props.onCCSessionSubmit({ IdCourtCase: this.props.IdCourtCase, CourtName: CourtName, HearingDate: HearingDate, HearingPlace: HearingPlace, JudgeName: JudgeName, SessionResult: SessionResult}); 
        this.setState({CourtName: '', HearingDate: '', HearingPlace: '', JudgeName: '', SessionResult: ''}); 
    }, 
    render: function() { 
        return ( 
      <form className="CCSessionForm form-inline" onSubmit={this.handleSubmit}> 
        <div className="form-group"> 
            <input 
            className="form-control input-sm" 
            type="text" 
            placeholder="Наименование суда" 
            value={this.state.CourtName} 
            onChange={this.handleCourtNameChange} 
            /> 
        </div> 
        <div className="form-group"> 
          <input 
            className="form-control input-sm" 
            type="date" 
            placeholder="Дата заседания" 
            value={this.state.HearingDate} 
            onChange={this.handleHearingDateChange} 
            /> 
        </div> 
        <div className="form-group"> 
            <input 
            className="form-control input-sm" 
            type="text" 
            placeholder="Место заседания" 
            value={this.state.HearingPlace} 
            onChange={this.handleHearingPlaceChange} 
            /> 
        </div> 
        <div className="form-group"> 
            <input 
            className="form-control input-sm" 
            type="text" 
            placeholder="Судья" 
            value={this.state.JudgeName} 
            onChange={this.handleJudgeNameChange} 
            /> 
        </div> 
        <div className="form-group"> 
          <input 
            className="form-control input-sm" 
            type="text" 
            placeholder="Результат заседания" 
            value={this.state.SessionResult} 
            onChange={this.handleSessionResultChange} 
          /> 
        </div> 
      <input type="submit" value="Добавить" className = "btn btn-primary"/> 
      </form> 
      ); 
    } 
}); 

ReactDOM.render( 
  <CCSessionBox url="/" IdCourtCase={$('#to_do_list_id').val()}/>, 
  document.getElementById('contentToDo') 
); 