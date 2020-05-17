import Developers from '../components/Developers'
import Games from '../components/Games'
import Favorites from '../components/Favorites'

export default [
  {
    path: '/developers',
    name: 'developers',
    component: Developers,
  },
  {
    path: '/',
    alias: '/developer/games/:id',
    name: 'games',
    component: Games,
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorites,
  },
]
