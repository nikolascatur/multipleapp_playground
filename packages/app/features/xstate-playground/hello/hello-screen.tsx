import { YStack, Text, Button } from '@my/ui'
import { useMachine } from '@xstate/react'
import { helloMachine } from 'app/machine/hello-machine'

export function HelloScreen() {
  const [state, send] = useMachine(helloMachine)

  return (
    <YStack>
      <h1>Todo Screen</h1>
      <YStack>
        <Text>{state.value}</Text>
        <Button
          onPress={() => {
            if (state.matches('notHovered')) {
              send('MOUSEOUT')
            } else {
              send('MOUSEOVER')
            }
          }}
        >
          PressMe
        </Button>
      </YStack>
    </YStack>
  )
}
