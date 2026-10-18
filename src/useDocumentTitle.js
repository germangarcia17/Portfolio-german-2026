import { useEffect } from 'react';
import { profile } from './data/profile.js';

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : `${profile.name} · Portfolio`;
  }, [title]);
}
