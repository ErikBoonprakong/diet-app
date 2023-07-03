import Cookies from "universal-cookie";

const API_URL = "http://localhost:8080";

class Networking {
    constructor(){
        this.cookies = new Cookies()
    }

  async createUser(username) {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    });
    const json = await response.json();
    return { json, status: response.status };
  }

  async getUsers() {
    const response = await fetch(`${API_URL}/userlist`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    return json;
  }

  async loadNutrientLog() {
    const response = await fetch(`${API_URL}/newday`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: this.cookies.get('user') }),
    });
    const json = await response.json();
    return json
  }

  async addNutrition(calories, protein){
    console.log(this.cookies.get('user'))
    const response = await fetch(`${API_URL}/addnutrients`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: this.cookies.get('user'), calories, protein }),
    });
    const json = await response.json();
    console.log(json.message)
    return json;
  }
}

export default Networking;
