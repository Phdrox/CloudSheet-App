import { Github, Linkedin } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image src={'/LogoCloud.png'} alt="Cloud Finance" width={100} height={40} />
              <span className="text-2xl font-semibold">Cloud Finance</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transforme a maneira como você gerencia suas finanças. Tecnologia de ponta para controle total dos seus gastos e ganhos.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/Phdrox"
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 rounded-lg flex items-center justify-center transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/phmx/"
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 rounded-lg flex items-center justify-center transition-all"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Empresa</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Cloud Finance. Todos os direitos reservados.
           </p>
            </div>
          </div>
        </div>
      
    </footer>
  );
}
