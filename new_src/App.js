import {Switch, Route, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute/index'
import HomeSection from './components/HomeSection/index'
import PopularSection from './components/PopularSection/index'
import AccountSection from './components/AccountSection/index'
import SearchRoute from './components/SearchRoute/index'
import MovieDetailSection from './components/MovieDetailSection/index'
import NotFound from './components/NotFound/index'
import ProtectedRoute from './components/ProtectedRoute/index'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeSection} />
    <ProtectedRoute exact path="/popular" component={PopularSection} />
    <ProtectedRoute exact path="/account" component={AccountSection} />
    <ProtectedRoute exact path="/search" component={SearchRoute} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetailSection} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
