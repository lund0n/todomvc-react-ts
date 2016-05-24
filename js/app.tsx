import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as director from 'director';
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY} from './constants';
import {TodoItem} from './todoItem';
import {TodoFooter} from './footer';
import {TodoModel} from './todoModel';

export class TodoApp extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null
    };
  }

  public componentDidMount() {
    var setState = this.setState;
    var router = director.Router({
      '/': setState.bind(this, { nowShowing: ALL_TODOS }),
      '/active': setState.bind(this, { nowShowing: ACTIVE_TODOS }),
      '/completed': setState.bind(this, { nowShowing: COMPLETED_TODOS })
    });
    router.init('/');
  }

  public handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = ReactDOM.findDOMNode<HTMLInputElement>(this.refs['newField']).value.trim();

    if (val) {
      this.props.model.addTodo(val);
      ReactDOM.findDOMNode<HTMLInputElement>(this.refs['newField']).value = '';
    }
  }

  public toggleAll(event: any) {
    var checked = event.target.checked;
    this.props.model.toggleAll(checked);
  }

  public toggle(todoToToggle: ITodo) {
    this.props.model.toggle(todoToToggle);
  }

  public destroy(todo: ITodo) {
    this.props.model.destroy(todo);
  }

  public edit(todo: ITodo) {
    this.setState({ editing: todo.id });
  }

  public save(todoToSave: ITodo, text: string) {
    this.props.model.save(todoToSave, text);
    this.setState({ editing: null });
  }

  public cancel() {
    this.setState({ editing: null });
  }

  public clearCompleted() {
    this.props.model.clearCompleted();
  }

  public render() {
    var footer;
    var main;
    var todos = this.props.model.todos;

    var shownTodos = todos.filter(todo => {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });

    var todoItems = shownTodos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo) }
          onDestroy={this.destroy.bind(this, todo) }
          onEdit={this.edit.bind(this, todo) }
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo) }
          onCancel={e => this.cancel() }
          />
      );
    });

    var activeTodoCount = todos.reduce((accum, todo) => todo.completed ? accum : accum + 1, 0);

    var completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={e => this.clearCompleted() }
          />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input className="toggle-all"
            type="checkbox"
            onChange={e => this.toggleAll(e) }
            checked={activeTodoCount === 0}
            />
          <ul className="todo-list">{todoItems}</ul>
        </section>
      );
    }

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            ref="newField"
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={e => this.handleNewTodoKeyDown(e) }
            autoFocus={true}
            />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}

var model = new TodoModel('react-todos');

function render() {
  ReactDOM.render(
    <TodoApp model={model}/>,
    document.querySelector('.todoapp')
  )
}

model.subscribe(render);
render();
