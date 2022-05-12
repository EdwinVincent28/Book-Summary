import React, { Component } from 'react'
import BookService from '../services/BookService'

class ViewBookComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            book: {}
        }
    }

    returnBack(){
        this.props.history.push('/books');
        window.location.reload();
    }

    componentDidMount(){
        BookService.getBookById(this.state.id).then( res => {
            this.setState({book: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View book Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> book title: </label>
                            <div> { this.state.book.title }</div>
                        </div>
                        <br></br>
                        <div className = "row">
                            <label> book summary: </label>
                            <div> { this.state.book.summary }</div>
                        </div>
                        <br></br>
                        <div className = "row">
                            <label> book author: </label>
                            <div> { this.state.book.author }</div>
                        </div>
                        <br></br>
                    </div>
                    <button className="btn btn-success" onClick={()=>this.returnBack()}>Go Back</button>
                </div>
            </div>
        )
    }
}

export default ViewBookComponent