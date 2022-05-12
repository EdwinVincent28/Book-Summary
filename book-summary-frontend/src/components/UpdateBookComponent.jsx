import React, { Component } from 'react'
import BookService from '../services/BookService';

class UpdateBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            summary: '',
            author: ''
        }
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeSummaryHandler = this.changeSummaryHandler.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    componentDidMount(){
        BookService.getBookById(this.state.id).then( (res) =>{
            let book = res.data;
            this.setState({title: book.title,
                summary: book.summary,
                author : book.author
            });
        });
    }

    updateBook = (e) => {
        e.preventDefault();
        let book = {title: this.state.title, summary: this.state.summary, author: this.state.author};
        console.log('book => ' + JSON.stringify(book));
        console.log('id => ' + JSON.stringify(this.state.id));
        BookService.updateBook(book, this.state.id).then( res => {
            this.props.history.push('/books');
            window.location.reload();
        });
        
    }
    
    changeTitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changeSummaryHandler= (event) => {
        this.setState({summary: event.target.value});
    }

    changeAuthorHandler= (event) => {
        this.setState({author: event.target.value});
    }

    cancel(){
        this.props.history.push('/books');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update book</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Title: </label>
                                            <input placeholder="First Name" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changeTitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Summary: </label>
                                            <input placeholder="Last Name" name="summary" className="form-control" 
                                                value={this.state.summary} onChange={this.changeSummaryHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Author: </label>
                                            <input placeholder="Email Address" name="author" className="form-control" 
                                                value={this.state.author} onChange={this.changeAuthorHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateBook}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateBookComponent