package com.example.demo.books;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(path = "/api/v1/")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping(path = "/get-books")
    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    @PostMapping(path = "/add-book")
    public Book addBook(@RequestBody Book book){
        return bookRepository.save(book);
    }

    @GetMapping("/get-book/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book does'nt exist with id :" + id));
        return ResponseEntity.ok(book);
    }

    @PutMapping("/add-book/{id}")
    public ResponseEntity<Book> updateEmployee(@PathVariable Long id, @RequestBody Book bookDetails){
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book does'nt exist with id :" + id));

        book.setTitle(bookDetails.getTitle());
        book.setSummary(bookDetails.getSummary());
        book.setAuthor(bookDetails.getAuthor());

        Book updatedBook = bookRepository.save(book);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/delete-book/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Book does'nt exist with id :" + id));

        bookRepository.delete(book);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
