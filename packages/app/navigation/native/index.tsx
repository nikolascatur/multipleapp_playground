import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import UserListSScreen from '../../../../apps/next/pages/user-list/[id]'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  'user-list': undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
      <Stack.Screen name="user-list" component={UserListSScreen} />
    </Stack.Navigator>
  )
}
