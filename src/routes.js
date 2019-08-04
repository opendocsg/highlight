import About from '@/About'
import UploadPage from '@/components/UploadPage'
import HighlightPage from '@/components/HighlightPage'

export default [
  {
    path: '/',
    redirect: '/upload'
  },
  {
    path: '/upload',
    name: 'uploadPage',
    component: UploadPage
  },
  {
    path: '/highlight',
    name: 'highlightPage',
    component: HighlightPage,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]