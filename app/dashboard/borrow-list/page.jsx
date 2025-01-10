import styles from "../../ui/dashboard/bookList/booList.module.css";
import Borrow from "../../ui/dashboard/borrow/borrow";

const borrowedBooks = [
    {
        id: 1,
        user: {
            name: "Smith Doe"
        },
        title: "Book 1",
        startDate: "14.02.2024",
        endDate: "18.02.2024",
        rentPerDay: 5,
        status: "Completed"
    }
]

const BorrowList = () => {
    return (
        <div className = {styles.container}>
            <div className={styles.top}>
            {/* <Search placeholder="Search for a user..." /> */}
                {/* <Link href="/dashboard/users/add">
                    <button className={styles.addButton}>Add New</button>
                </Link> */}
                <h2>User Borrowed Book List</h2>
            </div>
            {
                borrowedBooks.map((item) => (
                    <Borrow key={item.id} item={item} />
                ))
            }
        </div>
    )
}

export default BorrowList;
