

import MainFoto from '../../assets/Principal.jpg';

import '../../styles/global.css';
import { IntroductionSection, LoginSection } from './sections';


function MainPage() {
  return (
    <div className='w-screen h-screen bg-black flex flex-col-reverse lg:flex-row justify-center items-center'>
      {/* <IntroductionSection /> */}

      <LoginSection/>
      
      {/* Image Section */}
      <img src={MainFoto} alt="Foto principal"
        className='lg:relative lg:w-1/2 lg:h-full' loading='lazy' />
    </div>
  )
}

export default MainPage
