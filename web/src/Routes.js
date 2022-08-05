// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import TestLayout from './layouts/TestLayout/TestLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={TestLayout}>
        <Private unauthenticated="questions" roles={['admin', 'moderator']}>
          <Route path="/issues" page={IssuesPage} name="issues" />
        </Private>
        <Route path="/notification-test" page={NotificationTestPage} name="notificationTest" />
        <Route path="/answer/{id}" page={AnswerPage} name="answer" />
        <Route path="/comment-test" page={CommentTestPage} name="commentTest" />
        <Route path="/question/{id:Int}" page={QuestionPage} name="question" />
        <Route path="/questions" page={QuestionsPage} name="questions" />
        <Route path="/test" page={HomePage} name="test" />
        <Route path="/forms" page={FormsPage} name="forms" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
