package com.example.android.booksummary.adapter;

import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.android.booksummary.R;

public class BookHolder extends RecyclerView.ViewHolder {

    TextView bookTitle, bookSummary, author;
    public BookHolder(@NonNull View itemView) {
        super(itemView);
        bookTitle = itemView.findViewById(R.id.book_title);
        bookSummary = itemView.findViewById(R.id.book_summary);
        author = itemView.findViewById(R.id.book_author);
    }
}
