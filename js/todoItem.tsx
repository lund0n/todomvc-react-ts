import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ENTER_KEY, ESCAPE_KEY} from './constants';
import * as classNames from 'classnames';
import {ITodo} from './todoModel';
import * as moment from 'moment';

interface ITodoItemProps {
  key: string;
  todo: ITodo;
  editing?: boolean;
  onSave: (val: any) => void;
  onDestroy: () => void;
  onEdit: () => void;
  onCancel: (event: any) => void;
  onToggle: () => void;
}

interface ITodoItemState {
  editText: string;
}

export class TodoItem extends React.Component<ITodoItemProps, ITodoItemState> {

  constructor(props: ITodoItemProps) {
    super(props);
    this.state = { editText: this.props.todo.title };
  }

  public handleSubmit(event: any) {
    const val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({ editText: val });
    } else {
      this.props.onDestroy();
    }
  }

  public handleEdit() {
    this.props.onEdit();
    this.setState({ editText: this.props.todo.title });
  }

  public handleKeyDown(event: any) {
    // TODO is there an Event TypeScript type?
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  public handleChange(event: any) {
    this.setState({ editText: event.target.value });
  }

  public shouldComponentUpdate(nextProps: ITodoItemProps, nextState: ITodoItemState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  }

  public componentDidUpdate(prevProps: ITodoItemProps) {
    if (!prevProps.editing && this.props.editing) {
      // TODO import react-dom
      const node = ReactDOM.findDOMNode<HTMLInputElement>(this.refs['editField']);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  public render() {
    return (
      <li className={classNames({
        completed: this.props.todo.completed,
        editing: this.props.editing
      }) }>
        <div className="view">
          <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.props.onToggle}/>
          <label onDoubleClick={e => this.handleEdit() }>
            {this.props.todo.title} {moment(this.props.todo.created).format('ddd, hh:mm:ssA') }
          </label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={e => this.handleSubmit(e) }
          onChange={e => this.handleChange(e) }
          onKeyDown={e => this.handleKeyDown(e) }
          />
      </li>
    );
  }
};
