import React from "react";
import "./NutritionCount.css";
import Networking from "./Networking";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

class UserSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAddUser: false,
      username: "",
      userList: [],
    };

    this.cookies = new Cookies()
    this.networking = new Networking();
  }

  componentDidMount = async () => {
    await this.getUsers();
  };

  getUsers = async () => {
    const userList = await this.networking.getUsers();
    this.setState({ userList });
  };

  addUserButton = () => {
    this.setState({ displayAddUser: !this.state.displayAddUser });
    // const cookies = new Cookies()
    // console.log(cookies.get('user'))
  };

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  };

  submitUser = async (e) => {
    e.preventDefault();
    let message = await this.networking.createUser(this.state.username);
    await this.getUsers();
    console.log(message.json.message);
  };

  addUserForm = () => {
    if (this.state.displayAddUser) {
      return (
        <div>
          <form onSubmit={this.submitUser}>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  listUserButtons = () => {
    let jsxLoop = this.state.userList.map((user) => {
      return (
        <div className="category">
          <Link to="/nutrition" className="select-user-buttons-container">
            <button onClick={this.logIn} id={user}>
              {user}
            </button>
          </Link>
        </div>
      );
    });
    return jsxLoop;
  };

  logIn = async (e) => {
    this.cookies.set('user', e.target.id)
    // console.log(cookies.get("user"));
  };

  render() {
    return (
      <div className="all">
        {/* <Link to="/nutrition">
          <button>View Nutrition</button>
        </Link> */}
        <h1>Select User</h1>
        <button onClick={this.addUserButton}>Add user</button>
        {this.addUserForm()}
        {/* <button onClick={this.getUsers}>get users</button> */}
        <div className="add-meal-form">{this.listUserButtons()}</div>
      </div>
    );
  }
}

export default UserSelection;
