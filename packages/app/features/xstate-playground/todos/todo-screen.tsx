import { YStack, Text, Button, Input, XStack } from '@my/ui'
import { useMachine } from '@xstate/react'
import { todoMachine } from 'app/machine/todo-machine'

const todos = new Set<string>([])

export function ToDoScreen() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos)
      },
      saveTodo: async (context, event) => {
        todos.add(context.formInput)
      },
      todoDelete: async (contex, event) => {
        todos.delete(event.todo)
      },
    },
  })

  return (
    <YStack>
      <Text>{JSON.stringify(state.value)}</Text>
      <Text>{JSON.stringify(state.context)}</Text>
      <div>
        {state.context.todos.map((todo) => {
          return (
            <XStack>
              <Text>{todo}</Text>
              <Button
                onPress={() => {
                  send({
                    type: 'delete',
                    todo,
                  })
                }}
              >
                Delete
              </Button>
            </XStack>
          )
        })}
        {state.matches('todos loaded') && (
          <Button
            onPress={() => {
              send({ type: 'create new' })
            }}
          >
            Create new
          </Button>
        )}
        {state.matches('Creating new todo.showing form input') && (
          <form
            onSubmit={(e) => {
              e.preventDefault
              send({
                type: 'submit',
              })
            }}
          >
            <Input
              onChangeText={(e) => {
                send({
                  type: 'Form input change',
                  value: e,
                })
              }}
            ></Input>
          </form>
        )}
      </div>
    </YStack>
  )
}
