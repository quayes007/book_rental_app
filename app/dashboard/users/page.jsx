import styles from '../../ui/dashboard/users/users.module.css'
import Link from "next/link";

const usersData = [
    {
        id: 1,
        username: "John Doe",
        email: "john.doe@example.com",
        // createdAt: new Date("2022-01-01"),
        role: "Admin",
        accountType: "All",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "019823223333"
    },
    {
        id: 2,
        username: "John Smith",
        email: "smith.doe@example.com",
        // createdAt: new Date("2022-01-01"),
        role: "General User",
        accountType: "Borrower",
        firstName: "John",
        lastName: "Smith",
        phoneNumber: "019923223333"
    }
]

const users = () => {
    return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* <Search placeholder="Search for a user..." /> */}
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            {/* <td>Role</td> */}
            <td>Account Type</td>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              {/* <td>
                <div className={styles.user}>
                  <Image
                    src={"/avatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td> */}
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              {/* <td>{user.createdAt?.toString().slice(4, 16)}</td> */}
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              {/* <td>{user.role}</td> */}
              <td>{user.accountType}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
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

export default users;
