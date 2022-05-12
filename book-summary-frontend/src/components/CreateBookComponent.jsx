import React, { Component } from 'react'
import BookService from '../services/BookService';
// import { hashHistory } from 'react-router';

class CreateBookComponent extends Component {
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
        this.changeAuthorHandler = this.changeAuthorHandler.bind(this);
        this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);
    }


    componentDidMount(){
        if(this.state.id === '_add'){
            return
        }else{
            BookService.getBookById(this.state.id).then( (res) =>{
                let book = res.data;
                this.setState({title: book.title,
                    summary: book.summary,
                    author: book.author
                });
            });
        }        
    }
    saveOrUpdateBook = (e) => {
        e.preventDefault();
        let book = {title: this.state.title, summary: this.state.summary, author: this.state.author};
        console.log('book => ' + JSON.stringify(book));

        if(this.state.id === '_add'){
            BookService.createBook(book).then(res =>{
                this.props.history.push('/books');
            });
            window.location.reload();
            
        }else{
            BookService.updateBook(book, this.state.id).then( res => {
                this.props.history.push('/books');
            });
            window.location.reload();
            
        }
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
        window.location.reload();
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Book</h3>
        }else{
            return <h3 className="text-center">Update Book</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Title: </label>
                                            <input placeholder="Title" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changeTitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Summary: </label>
                                            <input placeholder="Summary" name="summary" className="form-control" 
                                                value={this.state.summary} onChange={this.changeSummaryHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Author: </label>
                                            <input placeholder="Author" name="author" className="form-control" 
                                                value={this.state.author} onChange={this.changeAuthorHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateBook}>Save</button>
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

export default CreateBookComponent