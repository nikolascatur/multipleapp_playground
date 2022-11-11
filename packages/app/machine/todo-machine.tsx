import { Target } from '@tamagui/lucide-icons'
import { actions, assign, createMachine } from 'xstate'

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUFkCGBjAFgJYB2YAdADKrYQlQAEaGsAxBqWSQG6oDW5TLHiIcqNOo3SpYCbqlzZkhVMQDaABgC6GzYlAAHaYSUq9IAB6IALOvVkA7AEYrTx-fsBWAJzqP9gDQgAJ6IALQATI6OZB4AHG6xXvHhHgDM3qkAvpmBgjgEJORitMQMgqxgAE6VqJVk+gA2igBmtQC2ZHnChZTUJWVSMnIKJmpaOmaGsMbKxGaWCKlkKfaxqanqAGyx6unh24EhCOEpZF6pUZteVuFWmxfq9tm5UvkiAoP0DX2QbGANYGQYAmSBAUxmplBC3uHjOHkeVis6SRm12hzCsVh9nCqR8F02BMcXi8HmeIC6BQ45S+PwgLFwlTAijA9FIAHcQQYjKN5tYPNFYrF7F5seo1qlNlZYlZ0ccrF4yFYiVZ4atiR5wp4yRT3mQAMKMxQSdmSDBkWD4VBsiStSptegkfQAV2QLFgToARm1jJywdzZryEJtscsPNtNm4rhdHJtZbirGR8SSvKjVm5HtrXt0OAamUpSqywGzTahzZbrQXbfbHS6WAAxdoO4jO5D0AjYUrArSTf2Q0ALW72Mi7fYpWKRUcHYKIVKCsjOVJ3bwa1IpRxZHLkrOU8i5o0Fk2Cc3YLgSQRsFTkOT8Trb3V7-MMQ9SY+nguCWTEHgjWY6X3gnkoUQYVYXuO4vHCFNNj8KcjhxaJbFWSVhQgvwvEzDA3h6B9jSLEtXzPKQWCqGo6kaFp2lvTDs13Q1H0LYsj1gE9CIwT9vyNFQ-27UEAIDICgylGIJXsVdw3sdQTllMMFXhdREVWFYcViDChB3MgABF-kBVjUAvDhrw+aj1K0gF6I-YZOLGbQeK5aZAP7RBHEk8Jh35aD+XWUdUllVYHAUi5rg2G5wlUrCOFMnT3yIkjanqJpkCrKi1N1SLzKkdj5Cs7jdF43s5gE+wrjIcMLhcWICWDWNpwQUI7BVdZk28ZzNQzTcdR6WLKnoCBtKBN19DASB6CdfR-3ywMw2iOIfFWKV1GcLZZXXUDtlsFxFzSFINxeYzdS6nq+rAFhzFgZBmTIbBmiBSoAAoUlsABKFgOo4A7erMrtcrsiECscoNZxK5rwkSBb4klaSlkFGMvBjcHRNhqxsk3Yh0DgMxXqKPpdPgPL7P4-7HFc4lURFMNwOxAlZWJUMwpo5LYBpGhIB7fG+wsPlYjc9QIPiRJVyJWVQgkxNUKKm4kRTMU6fU75mYgegutZ37AyRM4JI1bZIPhHxYllGxolnSIJeXCCdq3PbsLo3DGJfC0rRtRsa2QZWHI5hANrOBapUliV7jjOcFxuRGGo8Ul2rvK28xt-DmLfAYMFdgn3eSZZNk1ESJduHyatnLmg92c54Tuc3Mf1a2DzwwQk-ZhYiQVEd07iCd09gxBIIVBdZ1hh7tkccPdpSno0t0mu-vd9wE3iLyUNE+IhbcVzoJFUTPGcCMThl-bqlqQ7PrHwNhSWFb+SKzESRSXyufsBSdh5jwlTWAeLaH0gD4E0JEX8yICXOIlkJzkcUIGw7BxDcLDZyOwrjh2yEAA */
  createMachine(
    {
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        formInput: '',
      },
      tsTypes: {} as import('./todo-machine.typegen').Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: string[]
          }
          saveTodo: {
            data: void
          }
          todoDelete: {
            data: void
          }
        },
        events: {} as
          | { type: 'create new' }
          | { type: 'Form input change'; value: string }
          | { type: 'submit' }
          | { type: 'delete'; todo: string }
          | { type: 'speed up' },
      },
      id: 'todoMachine',
      initial: 'Loading todos',
      states: {
        'Loading todos': {
          invoke: {
            src: 'loadTodos',
            onDone: [
              {
                target: 'todos loaded',
                actions: 'assignTodoToContext',
              },
            ],
            onError: [
              {
                target: 'loaded error',
                actions: 'assignErrorToContext',
              },
            ],
          },
        },
        'todos loaded': {
          on: {
            delete: {
              target: 'Deleting todo',
            },
            'create new': {
              target: 'Creating new todo',
            },
          },
        },
        'loaded error': {},
        'Creating new todo': {
          initial: 'showing form input',
          states: {
            'showing form input': {
              on: {
                submit: {
                  target: 'saving todo',
                },
                'Form input change': {
                  actions: 'assignNewFormInput',
                },
              },
            },
            'saving todo': {
              invoke: {
                src: 'saveTodo',
                onDone: [
                  {
                    target: '#todoMachine.Loading todos',
                  },
                ],
                onError: [
                  {
                    target: 'showing form input',
                    actions: 'assignErrorToContext',
                  },
                ],
              },
            },
          },
        },
        'Deleting todo': {
          invoke: {
            src: 'todoDelete',
            onDone: [
              {
                target: 'Loading todos',
              },
            ],
            onError: [
              {
                target: 'error delete',
              },
            ],
          },
        },
        'error delete': {
          after: {
            '2500': {
              target: '#todoMachine.todos loaded',
              actions: [],
              internal: false,
            },
          },
          on: {
            'speed up': {
              target: 'todos loaded',
            },
          },
        },
      },
    },
    {
      actions: {
        assignTodoToContext: assign((context, event) => {
          return {
            todos: event.data,
          }
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          }
        }),
        assignNewFormInput: assign((context, event) => {
          return {
            formInput: event.value,
          }
        }),
      },
    }
  )
