import axios from 'axios';

const Book_API_Base_URL = "http://localhost:8080/api/v1/books";

class BookService{
    getBooks(){
        return axios.get(Book_API_Base_URL);
    }

    createBook(book){
        return axios.post(Book_API_Base_URL, book);
    }

    getBookById(bookId){
        return axios.get(Book_API_Base_URL + '/' + bookId);
    }

    updateBook(book, bookId){
        return axios.put(Book_API_Base_URL + '/' + bookId, book);
    }

    deleteBook(bookId){
        return axios.delete(Book_API_Base_URL + '/' + bookId);
    }
}

export default new BookService()