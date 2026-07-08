import React from 'react'
//import { CommentInput } from './CommentInput'
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';

export const CommentSection = () => {
  return (
    <>
        <CommentSection   
                currentUser={{ 
                    currentUserId: '',
                    currentUserImg: '',
                    currentUserProfile: '',
                    currentUserFullName: ''
                }}
                commentData={data}
                logIn={{
                    loginLink: '/login',
                    signupLink: '/signup'
                }}
                onSubmitAction={(data) => console.log('Comment submitted:', data)}
                onDeleteAction={(data) => console.log('Comment deleted:', data)}
                onEditAction={(data) => console.log('Comment edited:', data)}
                onReplyAction={(data) => console.log('Reply submitted:', data)}
        />

    </>
  )
}
