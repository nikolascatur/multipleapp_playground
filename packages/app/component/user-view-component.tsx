import { YStack, Image, XStack, Text } from '@my/ui'

type propsUserView = {
  imageUrl: string
  name: string
  full_name: string
  description: string
}
const UserViewComponent = ({ imageUrl, name, full_name, description }: propsUserView) => {
  return (
    <YStack width={283} margin={10}>
      <XStack borderWidth={1} borderRadius={10} overflow="hidden">
        <Image src={imageUrl} width={100} height={100} borderRadius={50} margin={10} />
        <YStack paddingLeft={10} flex={1} backgroundColor="$blue1">
          <Text fontSize={18} marginTop={10}>
            {name}
          </Text>
          <Text fontSize={10}>{full_name}</Text>
          <Text fontSize={14} marginTop={5}>
            {description}
          </Text>
        </YStack>
      </XStack>
    </YStack>
  )
}

export default UserViewComponent
