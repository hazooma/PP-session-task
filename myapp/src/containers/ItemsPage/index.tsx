import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { actions } from "../../shared/store";
import { Link } from "react-router-dom";

interface Item {
  name: string;
  id: number;
}
interface ListItemsProps {
  items?: Item[];
  fetchItems: () => void;
}

class ListItems extends React.Component<ListItemsProps> {
  constructor(props: ListItemsProps) {
    super(props);
  }
  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <div className="col-md-8 col-md-offset-3">
        <List component="nav" aria-label="secondary mailbox folders">
          {this.props?.items?.map((item) => (
            <Link to={`item/${item.id}`}>
              <ListItem button>
                <ListItemText primary={item?.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      fetchItems: () => actions.fetchItemsAction(),
    },
    dispatch,
  );
};

const mapStateToProps = (state: any) => {
  const { items } = state?.App || [];
  return { items };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItems);
