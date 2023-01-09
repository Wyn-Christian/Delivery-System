import Header from "../components/Header";
import { useUser } from "../contexts/User";

function Account() {
  const { user } = useUser();

  return (
    <main>
      <Header title={"Account"} />

      <div className="account">
        <div className="pfp">
          <img
            src="img/no-profile-pic.jpg"
            style={{ width: "350px", borderRadius: "20px" }}
            alt="pic"
          />
        </div>

        <div className="information">
          <h1>My Profile</h1> <br />
          <h2>username</h2>
          <input
            type="text"
            name="username"
            className="input"
            value={user.username}
            disabled
          />
          <h2>First Name</h2>
          <input
            type="text"
            name="first_name"
            className="input"
            value={user.first_name}
          />
          <h2>Last Name</h2>
          <input
            type="text"
            name="last_name"
            className="input"
            value={user.last_name}
          />
          <h2>Email</h2>
          <input
            type="text"
            name="email"
            className="input"
            value={user.email}
          />
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            className="input"
            value={user.password}
          />
          <button className="btn">Update</button>
        </div>
      </div>
    </main>
  );
}

export default Account;
