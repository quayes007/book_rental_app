import styles from '../../ui/dashboard/bookList/booList.module.css';
import Link from "next/link";
import { fetchBooks } from '../../lib/data';

const BookListPage = async() => {
  const books = await fetchBooks();

    return (
        <div className={styles.container}>
        <div className={styles.top}>
          {/* <Search placeholder="Search for a user..." /> */}
          <Link href="/dashboard/books/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Author</td>
              <td>For Rent</td>
              <td>For Sell</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                {/* <td>{user.createdAt?.toString().slice(4, 16)}</td> */}
                <td>{book.availableForRent ? "Yes" : "No"}</td>
                <td>{book.availableForSell ? "Yes" : "No"}</td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Pagination count={count} /> */}
      </div>
    )
}

export default BookListPage;
