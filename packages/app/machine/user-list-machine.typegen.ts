// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    '': { type: '' }
    'done.invoke.userListMission.loading:invocation[0]': {
      type: 'done.invoke.userListMission.loading:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {
    fetchData: 'done.invoke.userListMission.loading:invocation[0]'
  }
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    assignData: 'done.invoke.userListMission.loading:invocation[0]'
  }
  eventsCausingServices: {
    fetchData: ''
  }
  eventsCausingGuards: {
    isDataEmpty: ''
    noDataFound: ''
  }
  eventsCausingDelays: {}
  matchesStates:
    | 'error'
    | 'idle'
    | 'loading'
    | 'success'
    | 'success.checkingData'
    | 'success.empty'
    | 'success.hasData'
    | { success?: 'checkingData' | 'empty' | 'hasData' }
  tags: never
}
