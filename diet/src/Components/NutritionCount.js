import React from "react";
import "./NutritionCount.css";
import Networking from "./Networking";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

class NutritionCount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calories: 0,
      caloriesToAdd: 0,
      protein: 0,
      proteinToAdd: 0,
      satFat: 0,
      sugar: 0,
      carb: 0,
      addMeal: false,
    };

    this.cookies = new Cookies();
    this.networking = new Networking();
  }

  componentDidMount = async () => {
    await this.loadNutrients()
  };

  loadNutrients = async () => {
    const nutrientLog = await this.networking.loadNutrientLog();
    this.setState({
      calories: nutrientLog.calories,
      protein: nutrientLog.protein,
    });
  }

  handleChange = (e) => {
    const stateName = e.target.id + "ToAdd";
    this.setState({ [stateName]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.networking.addNutrition(this.state.caloriesToAdd, this.state.proteinToAdd)
    this.setState({caloriesToAdd: 0, proteinToAdd: 0})
    // await this.loadNutrients()
    // could try setting state of calories + protein to new value here instead
    this.setState({calories: parseInt(this.state.calories) + parseInt(this.state.caloriesToAdd)})
    this.setState({
      protein:
        parseInt(this.state.protein) + parseInt(this.state.proteinToAdd),
    });
  };

  addButton = () => {
    this.setState({ addMeal: !this.state.addMeal });
  };

  testServer = async () => {
    await this.networking.addNutrition(1989, 22)
  };

  renderAddMealForm = () => {
    if (this.state.addMeal) {
      return (
        <form className="add-meal-form" onSubmit={this.handleSubmit}>
          <div className="input">
            <label for="calories" className="form-label">
              Calories:
            </label>{" "}
            <input
              className="input-num"
              type="number"
              name="calories"
              id="calories"
              value={this.state.caloriesToAdd}
              onChange={this.handleChange}
            />
          </div>
          <div className="input">
            <label for="protein" className="form-label">
              Protein:
            </label>{" "}
            <input
              className="input-num"
              type="number"
              name="protein"
              id="protein"
              value={this.state.proteinToAdd}
              onChange={this.handleChange}
            />
          </div>
          <input type="submit" />
        </form>
      );
    } else {
      return <div></div>;
    }
  };

  render() {
    return (
      <div className="all">
        <h1>{this.cookies.get("user")}</h1>

        <div className="add-meal">
          <Link to="/userselection">
            <button type="button">Select Different User</button>
          </Link>
        </div>

        <div className="add-meal">
          <button onClick={this.addButton}>Add Meal</button>
          {this.renderAddMealForm()}
        </div>

        <div className="category">
          <div className="display">
            <h2 className="no-margin">Calories</h2>
            <p className="no-margin">{this.state.calories} / 2000</p>
          </div>
          {/* <div className="add">
            <form
              id="calories"
              className="add-form"
              onSubmit={this.handleSubmit}
            >
              <input
                className="input-num"
                type="number"
                name="calories"
                id="calories"
                value={this.state.caloriesToAdd}
                onChange={this.handleChange}
              />
              <input type="submit" value="Add" />
            </form>
          </div> */}
        </div>

        <div className="category">
          <div className="display">
            <h2 className="no-margin title">Protein</h2>
            <p className="no-margin">{this.state.protein} / 52</p>
          </div>
          {/* <div className="add">
            <form
              id="protein"
              className="add-form"
              onSubmit={this.handleSubmit}
            >
              <input
                className="input-num"
                type="number"
                name="protein"
                id="protein"
                value={this.state.proteinToAdd}
                onChange={this.handleChange}
              />
              <input type="submit" value="Add" />
            </form>
          </div> */}
        </div>

        <button type="button" onClick={this.testServer}>
          Test Server
        </button>
      </div>
    );
  }
}

export default NutritionCount;
