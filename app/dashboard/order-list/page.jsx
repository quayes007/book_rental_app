import OrderList from "../../ui/dashboard/orderList/orderList";
import styles from "../../ui/dashboard/bookList/booList.module.css";
import { fetchOrderedBooks } from "../../lib/data"

// const bookOrders = [
//     {
//         id: 1,
//         user: {
//             name: "Smith Doe"
//         },
//         title: "Book 1",
//         price: 250,
//         platformCost: 13,
//         totalCost: 263,
//         status: "Processing"
//     }
// ]

const OrderListPage = async() => {
    const bookOrders = await fetchOrderedBooks();

    return (
        <div className = {styles.container}>
            <div className={styles.top}>
            {/* <Search placeholder="Search for a user..." /> */}
                {/* <Link href="/dashboard/users/add">
                    <button className={styles.addButton}>Add New</button>
                </Link> */}
                <h2>User Ordered Book List</h2>
            </div>
            {
                bookOrders.map((item) => (
                    <OrderList key={item.id} item={item} />
                ))
            }
        </div>
    )
}

export default OrderListPage;