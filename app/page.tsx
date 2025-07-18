'use client';

import Navbar from './components/Navbar';
import { HomePage } from '../src/presentation/pages/HomePage';
import { useLanguage } from './contexts/LanguageContext';

export default function Home() {
  const { language } = useLanguage();

  return (
    <>
      <Navbar />
      <HomePage language={language} />
    </>
  );
}