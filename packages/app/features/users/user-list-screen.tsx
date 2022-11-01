import { XStack, YStack } from '@my/ui'
import UserViewComponent from 'app/component/user-view-component'
import { ProjectDto, ProjectList } from 'app/model/github/Users'
import { useFetchRefresh } from 'app/service/FetchRequestApi'
import { useEffect, useState } from 'react'

export type BundleUsersResponseProps = {
  initialCourseRespone?: Array<ProjectDto>
}

export function UserListScreen(props: BundleUsersResponseProps) {
  const { callRequest } = useFetchRefresh()
  const [projectList, setProjectList] = useState<Array<ProjectDto>>(
    props.initialCourseRespone ?? []
  )

  useEffect(() => {
    if (props.initialCourseRespone === undefined) {
      callRequest<Array<ProjectDto>>({
        uri: 'https://api.github.com/users/timmywheels/repos',
        useAuth: false,
      }).then((res) => setProjectList(res ?? []))
    }
  }, [])

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
