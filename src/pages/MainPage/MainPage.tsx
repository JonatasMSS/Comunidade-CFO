

import MainFoto from '../../assets/Principal.jpg';

import '../../styles/global.css';
import { IntroductionSection, LoginSection } from './sections';


function MainPage() {
  return (
    <div className=' pb-2 overflow-auto bg-black flex flex-col-reverse lg:flex-row justify-center items-center'>
      {/* <IntroductionSection /> */}

      <LoginSection/>
      
      {/* Image Section */}
      <img src={MainFoto} alt="Foto principal"
        className='lg:relative lg:w-1/2 lg:min-h-screen' loading='lazy' />
    </div>
  )
}

export default MainPage
