import MusicPlayer from './components/musicPlayer/MusicPlayer'
import LogoBerserk from './assets/img/Logo_Berserk.png'
import './style/global.scss'

export default function App() {
  return (
    <main>
      <section className='sectionLogo'>
        <img src={LogoBerserk} alt="Logo Berserk" />
      </section>
      <MusicPlayer />
    </main>
  )
}