import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";
import { addUser } from "../../../lib/action";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="First Name" name="firstName" required />
        <input type="text" placeholder="Last Name" name="lastName" required />
        <input type="email" placeholder="email" name="email" required />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <input type="phone" placeholder="phone number" name="phoneNumber" />
        <select name="accountType" id="accountType">
          <option>
            Select Account Type
          </option>
          <option value={"borrower"}>Borrower</option>
          <option value={"seller"}>Seller</option>
          <option value={"renter"}>Renter</option>
          <option value={"all"}>All</option>
        </select>
        <select name="role" id="role">
          <option>
            Select User Role
          </option>
          <option value={"admin"}>Admin</option>
          <option value={"general_user"}>General User</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
