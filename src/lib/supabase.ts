import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const validateCIAFEmail = (email: string): boolean => {
  return email.toLowerCase().endsWith('@ciaf.edu.co');
};

export const authService = {
  signUp: async (email: string, password: string, fullName: string) => {
    if (!validateCIAFEmail(email)) {
      throw new Error('Solo se permiten correos institucionales @ciaf.edu.co');
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('No se puede conectar al servidor. Por favor, verifica tu conexión a internet o contacta al administrador.');
      }
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('No se puede conectar al servidor. Por favor, verifica tu conexión a internet o contacta al administrador.');
      }
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('No se puede conectar al servidor. Por favor, verifica tu conexión a internet.');
      }
      throw error;
    }
  },

  resetPassword: async (email: string) => {
    if (!validateCIAFEmail(email)) {
      throw new Error('Solo se permiten correos institucionales @ciaf.edu.co');
    }
    
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('No se puede conectar al servidor. Por favor, verifica tu conexión a internet o contacta al administrador.');
      }
      throw error;
    }
  },
};