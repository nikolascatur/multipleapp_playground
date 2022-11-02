import { ScrollView, XStack, YStack, Text } from '@my/ui'
import UserViewComponent from 'app/component/user-view-component'
import { ProjectDto } from 'app/model/github/Users'
import { useFetchRefresh } from 'app/service/FetchRequestApi'
import { useEffect, useState } from 'react'
import { useMachine } from '@xstate/react'
import { userListMachine } from 'app/machine/user-list-machine'

export type BundleUsersResponseProps = {
  initialCourseRespone?: Array<ProjectDto>
}

export function UserListScreen(props: BundleUsersResponseProps) {
  const [state, send] = useMachine(userListMachine)
  //   const { callRequest } = useFetchRefresh()
  //   const [projectList, setProjectList] = useState<Array<ProjectDto>>(
  //     props.initialCourseRespone ?? []
  //   )

  //   useEffect(() => {
  //     if (props.initialCourseRespone === undefined) {
  //       callRequest<Array<ProjectDto>>({
  //         uri: 'https://api.github.com/users/timmywheels/repos',
  //         useAuth: false,
  //       }).then((res) => setProjectList(res ?? []))
  //     }
  //   }, [props.initialCourseRespone])

  console.log(`STATE ${state.matches('success')}`)
  console.log(state)

  const RenderView = () => {
    switch (true) {
      case state.matches('success'): {
        return (
          <XStack flexWrap="wrap">
            {projectList.map((project) => {
              return (
                <UserViewComponent
                  imageUrl={project.owner.avatar_url}
                  name={project.name}
                  full_name={project.full_name}
                  description={project.description}
                />
              )
            })}
          </XStack>
        )
      }
      case state.matches('loading'): {
        return (
          <XStack>
            <Text>Loading ....</Text>
          </XStack>
        )
      }
      case state.matches('error'): {
        return (
          <XStack>
            <Text>ERROR SCREEENN</Text>
          </XStack>
        )
      }
      default: {
        return (
          <XStack>
            <Text>No Screen Show</Text>
          </XStack>
        )
      }
    }
  }

  const projectList = state.context.data ?? []
  return (
    <YStack>
      <ScrollView>{RenderView()}</ScrollView>
    </YStack>
  )
}
