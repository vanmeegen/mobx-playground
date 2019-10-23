import * as React from "react";
import { render } from "react-dom";
import { TodoList } from "./Store";
import { TodoListView } from "./App";

const store = new TodoList();

render(<TodoListView model={store} />, document.getElementById("root"));
