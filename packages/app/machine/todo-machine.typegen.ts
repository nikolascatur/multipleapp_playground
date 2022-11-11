// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.todoMachine.Creating new todo.saving todo:invocation[0]': {
      type: 'done.invoke.todoMachine.Creating new todo.saving todo:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.todoMachine.Deleting todo:invocation[0]': {
      type: 'done.invoke.todoMachine.Deleting todo:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'done.invoke.todoMachine.Loading todos:invocation[0]': {
      type: 'done.invoke.todoMachine.Loading todos:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'error.platform.todoMachine.Creating new todo.saving todo:invocation[0]': {
      type: 'error.platform.todoMachine.Creating new todo.saving todo:invocation[0]'
      data: unknown
    }
    'error.platform.todoMachine.Deleting todo:invocation[0]': {
      type: 'error.platform.todoMachine.Deleting todo:invocation[0]'
      data: unknown
    }
    'error.platform.todoMachine.Loading todos:invocation[0]': {
      type: 'error.platform.todoMachine.Loading todos:invocation[0]'
      data: unknown
    }
    'xstate.after(2500)#todoMachine.error delete': {
      type: 'xstate.after(2500)#todoMachine.error delete'
    }
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {
    loadTodos: 'done.invoke.todoMachine.Loading todos:invocation[0]'
    saveTodo: 'done.invoke.todoMachine.Creating new todo.saving todo:invocation[0]'
    todoDelete: 'done.invoke.todoMachine.Deleting todo:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: 'loadTodos' | 'saveTodo' | 'todoDelete'
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignErrorToContext:
      | 'error.platform.todoMachine.Creating new todo.saving todo:invocation[0]'
      | 'error.platform.todoMachine.Loading todos:invocation[0]'
    assignNewFormInput: 'Form input change'
    assignTodoToContext: 'done.invoke.todoMachine.Loading todos:invocation[0]'
  }
  eventsCausingServices: {
    loadTodos:
      | 'done.invoke.todoMachine.Creating new todo.saving todo:invocation[0]'
      | 'done.invoke.todoMachine.Deleting todo:invocation[0]'
      | 'xstate.init'
    saveTodo: 'submit'
    todoDelete: 'delete'
  }
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates:
    | 'Creating new todo'
    | 'Creating new todo.saving todo'
    | 'Creating new todo.showing form input'
    | 'Deleting todo'
    | 'Loading todos'
    | 'error delete'
    | 'loaded error'
    | 'todos loaded'
    | { 'Creating new todo'?: 'saving todo' | 'showing form input' }
  tags: never
}
