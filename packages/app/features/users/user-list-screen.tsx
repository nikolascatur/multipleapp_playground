import { YStack } from '@my/ui'
import UserViewComponent from 'app/component/user-view-component'

export function UserListScreen() {
  return (
    <YStack>
      <UserViewComponent
        imageUrl="https://avatars.githubusercontent.com/u/17229444?v=4"
        name="nicolas"
        full_name="nicolas catur"
        description="mas nico tak uuk "
      ></UserViewComponent>
    </YStack>
  )
}
