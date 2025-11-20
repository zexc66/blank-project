import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AIABASD / AIBA',
    short_name: 'AIBA',
    description: 'Investor platform for African opportunities (AR/EN/FR)',
    start_url: '/ar',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#0F3D3E',
    icons: [
      { src: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
  }
}