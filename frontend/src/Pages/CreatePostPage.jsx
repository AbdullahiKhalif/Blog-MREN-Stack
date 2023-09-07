import React from 'react'
import ProtectedPages from '../Authentication/ProtectedPages'
import CreatePost from '../Components/Posts/CreatePost'

const CreatePostPage = () => {
  return (
    <ProtectedPages>
        <CreatePost/>
    </ProtectedPages>
  )
}

export default CreatePostPage