import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import { FiMail } from 'react-icons/fi';

const map = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  mail: FiMail,
} as const;

export function SocialIcon({ name, size = 18 }: { name: string; size?: number }) {
  const Icon = map[name as keyof typeof map] ?? FiMail;
  return <Icon size={size} aria-hidden />;
}
