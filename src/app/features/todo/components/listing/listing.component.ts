import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetTodos, DeleteTodo, SetSelectedTodo } from 'src/app/actions/todo-actions';
import { Todo } from 'src/app/model/todo.model';
import { TodoState } from 'src/app/state/todo-state';

@Component({
  selector: 'app-list',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @Select(TodoState.getTodoList)
  todos!: Observable<Todo[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
      this.store.dispatch(new GetTodos());
  }

  deleteTodo(id: number) {
      this.store.dispatch(new DeleteTodo(id));
  }

  editTodo(payload: Todo) {
      this.store.dispatch(new SetSelectedTodo(payload));
  }

}
