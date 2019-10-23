import { observer } from "mobx-react";
import * as React from "react";
import { TodoList, Todo } from "./Store";

interface LocalProps {
  model: TodoList;
}

@observer
export class TodoListView extends React.Component<LocalProps> {
  render(): JSX.Element {
    return (
      <div>
        <button onClick={(): void => this.props.model.createTodos()}>
          Add Todos
        </button>
        <ul>
          {this.props.model.todos.map(todo => (
            <TodoView model={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.model.unfinishedTodoCount}
      </div>
    );
  }
}

interface LocalProps2 {
  model: Todo;
}
@observer
export class TodoView extends React.Component<LocalProps2> {
  render(): JSX.Element {
    return (
      <li>
        <input
          type="checkbox"
          checked={this.props.model.finished}
          onClick={() =>
            (this.props.model.finished = !this.props.model.finished)
          }
        />
        {this.props.model.title}
      </li>
    );
  }
}
