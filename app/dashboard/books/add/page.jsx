// import { addUser } from "@/app/lib/actions";
import styles from "../../../ui/dashboard/users/addUser/addUser.module.css";

const AddBookPage = () => {
  return (
    // action={addUser} 
    <div className={styles.container}>
      <form className={styles.form}>
        <input type="text" placeholder="title" name="title" required />
        <input type="text" placeholder="Author Name" name="authorName" required />
        <input type="number" placeholder="Rent per Day" name="rentPerDay" required />
        <input type="number" placeholder="Price" name="price" required />
       
        <select name="forRent" id="forRent">
          <option value={true}>
            For Rent
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="availableForSell" id="availableForSell">
          <option value={true}>
            Available for Sell
          </option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBookPage;
