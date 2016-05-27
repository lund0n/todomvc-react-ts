import * as moment from 'moment';
import {Utils} from './utils';

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
  created: string;
}

export interface ITodoModel {
  key: any;
  todos: Array<ITodo>;
  onChanges: Array<any>;
  subscribe(onChange: Function): void;
  inform(): void;
  addTodo(title: string): void;
  toggleAll(checked: boolean): void;
  toggle(todoToToggle: ITodo): void;
  destroy(todo: ITodo): void;
  save(todoToSave: ITodo, text: string): void;
  clearCompleted(): void;
}

export class TodoModel implements ITodoModel {

  public key: string;
  public todos: Array<ITodo>;
  public onChanges: Array<any>;

  constructor(key: string) {
    this.key = key;
    this.todos = Utils.store(key);
    this.onChanges = [];
  }

  public subscribe(onChange: any) {
    this.onChanges.push(onChange);
  }

  public inform() {
    Utils.store(this.key, this.todos);
    this.onChanges.forEach(function(cb) { cb(); });
  }

  public addTodo(title: string) {
    this.todos = this.todos.concat({
      id: Utils.uuid(),
      title: title,
      completed: false,
      created: moment().format()
    });

    this.inform();
  }

  public toggleAll(checked: boolean) {
    this.todos.map<ITodo>((todo: ITodo) => {
      return Utils.extend(
        {}, todo, { completed: checked }
      );
    });

    this.inform();
  }

  public toggle(todoToToggle: ITodo) {
    this.todos = this.todos.map<ITodo>((todo: ITodo) => {
      return todo !== todoToToggle ?
        todo :
        Utils.extend(
          {}, todo, { completed: !todo.completed }
        );
    });

    this.inform();
  }

  public destroy(todo: ITodo) {
    this.todos = this.todos.filter(candidate => {
      return candidate !== todo;
    });

    this.inform();
  }

  public save(todoToSave: ITodo, text: string) {
    this.todos = this.todos.map(todo => {
      return todo !== todoToSave ?
        todo :
        Utils.extend(
          {}, todo, { title: text }
        );
    });
    this.inform();
  }

  public clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.inform();
  }
}
