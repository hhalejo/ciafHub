import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  CalendarIcon, 
  BriefcaseIcon, 
  SpeakerWaveIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Servicios',
    description: 'Encuentra tutorías, consultoría académica y apoyo estudiantil.',
    href: '/services',
    icon: AcademicCapIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Eventos',
    description: 'Descubre eventos académicos, institucionales y estudiantiles.',
    href: '/events',
    icon: CalendarIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Oportunidades',
    description: 'Encuentra prácticas, voluntariados y ofertas laborales.',
    href: '/opportunities',
    icon: BriefcaseIcon,
    color: 'bg-orange-500',
  },
  {
    name: 'Anuncios',
    description: 'Mantente al día con los anuncios de la comunidad.',
    href: '/announcements',
    icon: SpeakerWaveIcon,
    color: 'bg-purple-500',
  },
];

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-white font-bold text-2xl">C</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Bienvenido a <span className="text-blue-600">CIAF Community</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          La plataforma que conecta a la comunidad estudiantil del CIAF. 
          Encuentra servicios, eventos, oportunidades y mantente conectado con tu comunidad académica.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature) => (
          <Link
            key={feature.name}
            to={feature.href}
            className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`${feature.color} p-3 rounded-xl`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.name}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {feature.description}
            </p>
            <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
              <span className="text-sm font-medium">Explorar</span>
              <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Nuestra Comunidad</h2>
          <p className="mt-2 text-gray-600">Conectando estudiantes del CIAF</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-sm text-gray-600">Estudiantes Activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
            <div className="text-sm text-gray-600">Servicios Publicados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Eventos Mensuales</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-sm text-gray-600">Oportunidades</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Listo para participar en la comunidad?
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Comparte tus servicios, descubre eventos interesantes, encuentra oportunidades 
          y conecta con otros estudiantes del CIAF.
        </p>
        <Link
          to="/create"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Comenzar a Publicar
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}