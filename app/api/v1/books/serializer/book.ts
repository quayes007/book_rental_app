export const BookSerializer = (book: any) => {
    return {
        id: book.id,
        title: book.title,
        author: book.authorName,
        category_name: book.bookGeneres.name,
        subcategory_name: book.subCategoryId,
        for_rent: book.forRent,
        available_for_sell: book.availableForSell,
        rent_per_day: book.rentPerDay,
        price: book.price,
        created_at: book.createdAt,
        updated_at: book.updatedAt,
        user: {
            id: book.user.id,
            name: book.user.name,
            email: book.user.email,
            preferences: book.user.preferences,
            created_at: book.user.createdAt,
            updated_at: book.user.updatedAt
        }
    }
}

export const BookListSerializer = (books: any[]) => {
    return books.map(book => BookSerializer(book))
}