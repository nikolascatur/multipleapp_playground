import { Target } from '@tamagui/lucide-icons'
import { ProjectDto } from 'app/model/github/Users'
import { useFetchRefresh } from 'app/service/FetchRequestApi'
import axios, { Axios } from 'axios'
import { assign, createMachine } from 'xstate'

export const userListMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4BkCWsAuAsrrNgPYB2AdNhADZgDEA2gAwC6ioADqSXmeU4gAHogCMAJgBslFnLliWEgBwBOZSynKANCACe45QBZZR+UYDMUzWaMBfO7tQYc+IrBIVqdRkzEckEB4+ASFRBCkJXQMEIwBWCVMFFgtVVQB2azE4hyc0LFxCYgFKWlIAQwhscigGCAowanIAN1IAa0bnArdirzLK6qgEataAY3L+ClY2aaFg7EnBQPCJIxkLONULdIlM1UjVbOjEOPSWSjizFjELIzEtiVyQLtcijxL+qpqGDHRSdEoXFoEwAZv8ALaUF6FdyeKifQbDFqkcaLaazQLzRZhRCrdabba7KT7CSHOLHBBnc73IyqOJSOK3SLKHKOZ75V6wkqwZCjUZwWCUUYACzAozagwAIhNysx2HNeAtQstEFJJJQWVsNBZlGIGakKXFGZQaRlaRlVHJVE9oT13l4eXyBULReKpTLmP4FSEKDiIurNTqUrr9aoKWqLCbVLT0izNAyJBYHGzyKQIHAhLa3nDvPRvUrfSrYlF9OJ0iZlOkLBYxOk0lJaYmbRyYb14RUvlB89ii6dw5FZCoa1sNrSUs2XK37VRHfyPC6xRKatK8OVu8rQOF4qpKDqVGJ4mqJAepIbTru1VJqxYJPTNMoJ91s9zeXPBWBwVw8DFuIqe5vEFjHdawyFgrjkNQz3OYlaWsC0pDrB82SzLkHVfZ1hXKWAVzXTE-w3ERALUE06zOcCWEg0t-Wg6M0jiFgjVWe5H05NtKFnAV10LADYjEMRd2UfdD0kE8KTWfiYLpKQ1UtVIk2Qls7RzX5-i4pYeKMaQNQkFIJFWFhEKsdIKSpShJIQtJ0jEQSpBYqc4TUv0AFpTyolkNSrGsrA2FlrMeZMgA */
  createMachine(
    {
      id: 'userListMission',
      initial: 'idle',
      context: { data: undefined },
      schema: {
        context: {} as {
          data: Array<ProjectDto> | undefined
        },
        services: {} as {
          fetchData: { data: Array<ProjectDto> | undefined }
        },
      },
      tsTypes: {} as import('./user-list-machine.typegen').Typegen0,
      states: {
        idle: {
          always: [
            {
              target: 'loading',
              cond: 'isDataEmpty',
            },
            {
              target: 'success',
            },
          ],
        },
        loading: {
          invoke: {
            src: 'fetchData',
            onDone: [
              {
                target: 'success',
                actions: 'assignData',
              },
            ],
            onError: [
              {
                target: 'error',
              },
            ],
          },
        },
        success: {
          initial: 'checkingData',
          states: {
            checkingData: {
              always: [
                {
                  target: 'empty',
                  cond: 'noDataFound',
                },
                {
                  target: 'hasData',
                },
              ],
            },
            empty: {},
            hasData: {},
          },
        },
        error: {},
      },
    },
    {
      actions: {
        assignData: assign((_, event) => {
          return {
            data: event.data,
          }
        }),
      },
      guards: {
        isDataEmpty: (ctx) => {
          return !ctx.data
        },
        noDataFound: (ctx) => {
          return !ctx.data || ctx.data.length === 0
        },
      },
      services: {
        fetchData: async (ctx) => {
          const result = axios.get<Array<ProjectDto>>(
            'https://api.github.com/users/timmywheels/repos'
          )

          //   const { callRequest } = useFetchRefresh()
          //   const result = callRequest<Array<ProjectDto>>({
          //     uri: 'https://api.github.com/users/timmywheels/repos',
          //     useAuth: false,
          //   })
          return (await result).data
        },
      },
    }
  )
