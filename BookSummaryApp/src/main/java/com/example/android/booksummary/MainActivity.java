package com.example.android.booksummary;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.example.android.booksummary.model.Book;
import com.example.android.booksummary.retrofit.BookApi;
import com.example.android.booksummary.retrofit.RetrofitService;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import java.util.logging.Level;
import java.util.logging.Logger;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().setHomeButtonEnabled(true);
        initializeComponents();
    }

    private void initializeComponents() {
        TextInputEditText formTitle = findViewById(R.id.form_title);
        TextInputEditText formSummary = findViewById(R.id.form_summary);
        TextInputEditText formAuthor = findViewById(R.id.form_author);
        MaterialButton buttonSave = findViewById(R.id.form_buttonSave);

        RetrofitService retrofitService = new RetrofitService();
        BookApi bookApi = retrofitService.getRetrofit().create(BookApi.class);

        buttonSave.setOnClickListener(view -> {
            String title = String.valueOf(formTitle.getText());
            String summary = String.valueOf(formSummary.getText());
            String author = String.valueOf(formAuthor.getText());

            Book book = new Book();
            book.setTitle(title);
            book.setSummary(summary);
            book.setAuthor(author);

            bookApi.addBook(book)
                    .enqueue(new Callback<Book>() {
                        @Override
                        public void onResponse(Call<Book> call, Response<Book> response) {
                            Toast.makeText(MainActivity.this, "Save successful!", Toast.LENGTH_SHORT).show();
                            Intent intent = new Intent(view.getContext(), BookListActivity.class);
                            view.getContext().startActivity(intent);
                        }

                        @Override
                        public void onFailure(Call<Book> call, Throwable t) {
                            Toast.makeText(MainActivity.this, "Save failed!!!", Toast.LENGTH_SHORT).show();
                            Logger.getLogger(MainActivity.class.getName()).log(Level.SEVERE, "Error occurred", t);
                        }
                    });
        });
    }
}