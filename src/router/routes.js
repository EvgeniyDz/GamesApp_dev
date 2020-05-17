import Developers from '../components/Developers'
import Platforms from '../components/Platforms'
import Games from '../components/Games'
import Favorites from '../components/Favorites'

export default [
  {
    path: '/',
    name: 'developers',
    component: Developers,
  },
  {
    path: '/developer/games/:id',
    name: 'games',
    component: Games,
  },
  {
    path: '/platforms',
    name: 'platforms',
    component: Platforms,
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorites,
  },
]
