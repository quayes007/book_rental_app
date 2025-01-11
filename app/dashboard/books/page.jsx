import styles from '../../ui/dashboard/bookList/booList.module.css';
import Link from "next/link";

const books = [
    {
        id: 1,
        title: "Book 1",
        authorName: "Author 1",
        availableForRent: true,
        availableForSell: false,
        price: 250
    },
    {
        id: 2,
        title: "Book 2",
        authorName: "Author 2",
        availableForRent: false,
        availableForSell: true,
        price: 250
    }
]

const BookListPage = () => {
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
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                {/* <td>{user.createdAt?.toString().slice(4, 16)}</td> */}
                <td>{book.availableForRent ? "Yes" : "No"}</td>
                <td>{book.availableForSell ? "Yes" : "No"}</td>
                <td>{book.price}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/books/${book.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    {/* <form action={deleteUser}>
                      <input type="hidden" name="id" value={(user.id)} />
                      <button className={`${styles.button} ${styles.delete}`}>
                        Delete
                      </button>
                    </form> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Pagination count={count} /> */}
      </div>
    )
}

export default BookListPage;
