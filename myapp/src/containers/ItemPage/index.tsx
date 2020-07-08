import React from "react";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions } from "../../shared/store";

interface Item {
  name: string;
  id: number;
}
interface ItemProps {
  name?: string;
  items: Item[];
  fetchItems: (id?: number) => void;
  updateItem: (id: number, name: string) => void;
  match: any;
  history: any;
  role: string;
}
interface ItemState {
  name: string;
  id: number;
}

class Item extends React.Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);
    this.state = { name: "", id: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchItems(this.props.match.params.id);
  }

  handleSubmit(e: any) {
    e.preventDefault();

    const { name } = this.state;
    if (name) {
      this.props.updateItem(this.props.match.params.id, name);
    }
    this.props.history.goBack();
  }

  handleChange(e: any) {
    const { value } = e.target;

    this.setState({ name: value });
  }
  render() {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: 360,
        }}
      >
        <label>Logged In as {localStorage.getItem("role")}</label>
        <br />
        <label>ItemName</label>

        {this.props?.items?.map((item) => (
          <form name="form" onSubmit={this.handleSubmit}>
            {localStorage.getItem("role") === "Admin" ? (
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name || item.name}
                onChange={this.handleChange}
              />
            ) : (
              <label>{item.name}</label>
            )}

            <div className="form-group">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        ))}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch, props: any) => {
  return bindActionCreators(
    {
      fetchItems: (id?: number) => actions.fetchItemsAction(id),
      updateItem: (id: number, name: string) =>
        actions.updateItemsAction(id, name),
    },
    dispatch,
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { items, role } = state?.App || [];

  return { items, role };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
