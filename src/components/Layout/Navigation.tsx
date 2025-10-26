import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  AcademicCapIcon, 
  CalendarIcon, 
  BriefcaseIcon, 
  SpeakerWaveIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';
import clsx from 'clsx';

const navigation = [
  { name: 'Inicio', href: '/', icon: HomeIcon },
  { name: 'Servicios', href: '/services', icon: AcademicCapIcon },
  { name: 'Eventos', href: '/events', icon: CalendarIcon },
  { name: 'Oportunidades', href: '/opportunities', icon: BriefcaseIcon },
  { name: 'Anuncios', href: '/announcements', icon: SpeakerWaveIcon },
];

export function Navigation() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors',
                    isActive
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          <Link
            to="/create"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Crear</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}