package com.example.demo.books;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "books")
@Getter
@Setter
@NoArgsConstructor
public class Book {
    @Id
    @SequenceGenerator(
            name = "book_sequence",
            sequenceName = "book_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "book_sequence"
    )
    private long id;
    private String title;
    private String summary;
    private String author;

    public Book(String title, String summary, String author) {
        this.title = title;
        this.summary = summary;
        this.author = author;
    }
}
