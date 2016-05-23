import * as React from 'react';
import {ALL_TODOS} from './constants';

export class TodoApp extends React.Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null
    };
  }

  public componentDidMount() {

  }
}
