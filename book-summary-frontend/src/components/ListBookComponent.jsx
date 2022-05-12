import React, { Component } from 'react'
import BookService from '../services/BookService';
import '../BookCard.css';

class ListBookComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
                books: []
        }
        
    }

    addBook(){
        this.props.history.push('/add-books/_add');
        window.location.reload();
    }

    deleteBook(id){
        BookService.deleteBook(id).then( res => {
            this.setState({books: this.state.books.filter(book => book.id !== id)});
        });
        window.location.reload();
    }
    viewBook(id){
        this.props.history.push(`/view-book/${id}`);
        window.location.reload();
    }
    editBook(id){
        this.props.history.push(`/update-book/${id}`);
        window.location.reload();
    }

    componentDidMount(){
        BookService.getBooks().then((res)=>{
                this.setState({books: res.data})
            }
        )
    }

    render() {


        return (

            <div>
                <h2>Books Details</h2>
                <button onClick={() => this.addBook()  }  className="btn btn-primary" > Add Book</button>
                <body>
                    {        
                this.state.books.map(
                book =>
                <div className="card" key={book.id}>                
                <div className="card-header">Title: {book.title}</div>
                <div className="card-body">
                    <h5 className="card-title">Summary: {book.summary}</h5>
                    <p className="card-text">Author: {book.author}</p>
                    
                    <button style={{marginLeft: "10px"}} onClick={ () => this.editBook(book.id)} className="btn btn-info">Update </button>
                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBook(book.id)} className="btn btn-danger">Delete </button>
                    <button style={{marginLeft: "10px"}} onClick={ () => this.viewBook(book.id)} className="btn btn-info">View </button>
                    <br></br>
                </div>
                </div>
                )  
                    }            
                </body>    
            </div>
        );
    }
}

export default ListBookComponent;

