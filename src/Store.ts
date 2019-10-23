import { observable, computed, action } from "mobx";

export class Todo {
  constructor(title: string) {
    this.title = title;
    this.finished = false;
  }

  id: number = Math.random();
  @observable title: string = "";
  @observable finished: boolean = false;
}

export class TodoList {
  @observable todos: Todo[] = [];
  @computed get unfinishedTodoCount(): number {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action createTodos(): void {
    this.todos.push(new Todo("Get Coffee"), new Todo("Write simpler code"));
    this.todos[0].finished = true;
  }
}
