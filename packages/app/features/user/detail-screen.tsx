import { Button, Paragraph, YStack } from '@my/ui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useMachine } from '@xstate/react'
import { toggleMachine } from 'app/machine/togle-machine'
import React from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'

const { useParam } = createParam<{ id: string }>()

export function UserDetailScreen() {
  const [id] = useParam('id')
  const linkProps = useLink({ href: '/' })
  const [state, send] = useMachine(toggleMachine)
  const active = state.matches('active')

  return (
    <YStack f={1} jc="center" ai="center" space>
      <Paragraph ta="center" fow="800">{`User ID: ${id}`}</Paragraph>
      <Button {...linkProps} icon={ChevronLeft}>
        Go Home
      </Button>
      <YStack>
        <h1>Toggle Example</h1>
        <Button onPress={() => send('TOGGLE')}>
          Click me {active ? '✅' : '❌'} count = {state.context.count}
        </Button>
      </YStack>
    </YStack>
  )
}
