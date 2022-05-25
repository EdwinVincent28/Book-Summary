package com.example.android.booksummary.retrofit;

import com.example.android.booksummary.model.Book;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface BookApi {
    @GET("/api/v1/get-books")
    Call<List<Book>> getAllBooks();

    @POST("/api/v1/add-book")
    Call<Book> addBook(@Body Book book);
}
