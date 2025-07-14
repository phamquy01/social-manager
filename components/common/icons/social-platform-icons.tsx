'use client';

import { Facebook, Instagram, Linkedin, Music } from 'lucide-react';

interface SocialPlatformIconsProps {
  platform: string;
  className?: string;
}

export function SocialPlatformIcons({
  platform,
  className = 'w-4 h-4',
}: SocialPlatformIconsProps) {
  switch (platform) {
    case 'facebook':
      return <Facebook className={`${className} text-blue-600`} />;
    case 'instagram':
      return <Instagram className={`${className} text-pink-600`} />;
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return <Linkedin className={`${className} text-blue-700`} />;
    case 'tiktok':
      return <Music className={`${className} text-black`} />;
    default:
      return null;
  }
}
