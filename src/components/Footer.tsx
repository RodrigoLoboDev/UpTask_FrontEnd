import { InboxIcon } from '@heroicons/react/24/solid'
import github from '../img/github.png'
import facebook from '../img/facebook.svg'
import linkedin from '../img/linkedin.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Jesús Luis Rodrigo Lobo</h2>
            <p className="text-sm">Desarrollador web apasionado por crear soluciones innovadoras y eficientes.</p>
            <div className="flex items-center space-x-2">
              <InboxIcon className="h-5 w-5" />
              <a href="mailto:rolobo2812@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                rolobo2812@gmail.com
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Sígueme en:</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/jes%C3%BAs-luis-rodrigo-lobo-6594a81b4/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <img
                    className=' w-7' 
                    src={linkedin} 
                    alt="logo github" 
                />
              </a>
              <a 
                href="https://github.com/RodrigoLoboDev" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <img
                    className=' w-7' 
                    src={github} 
                    alt="logo github" 
                />
              </a>
              <a 
                href="https://www.facebook.com/luis.r.lobo" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <img
                    className=' w-7' 
                    src={facebook} 
                    alt="logo github" 
                />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {currentYear} Jesús Luis Rodrigo Lobo. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer