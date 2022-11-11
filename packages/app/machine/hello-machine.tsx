import { createMachine } from 'xstate'

export const helloMachine = createMachine({
  initial: 'notHovered',
  id: 'todoMachine',
  states: {
    hovered: {
      on: {
        MOUSEOVER: {
          target: 'notHovered',
        },
      },
    },
    notHovered: {
      on: {
        MOUSEOUT: {
          target: 'hovered',
        },
      },
    },
  },
})
