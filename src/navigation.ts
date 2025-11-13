import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Sobre',
      href: getPermalink('/about'),
    },
    {
      text: 'Frentes',
      href: getPermalink('/frentes'),
    },
    {
      text: 'Projetos',
      href: getPermalink('/projetos'),
    },
    {
      text: 'Governança',
      href: getPermalink('/governanca'),
    },
    {
      text: 'Contato',
      href: getPermalink('/contato'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Instituto',
      links: [
        { text: 'Sobre', href: getPermalink('/about') },
        { text: 'Frentes', href: getPermalink('/frentes') },
        { text: 'Projetos', href: getPermalink('/projetos') },
        { text: 'Governança', href: getPermalink('/governanca') },
      ],
    },
    {
      title: 'Contato',
      links: [
        { text: 'Fale conosco', href: getPermalink('/contato') },
        { text: 'contato@mutirao.org.br', href: 'mailto:contato@mutirao.org.br' },
        { text: '(85) 99997-7378', href: 'tel:+5585999977378' },
      ],
    },
    {
      title: 'Redes Sociais',
      links: [
        { text: 'Instagram', href: 'https://instagram.com/mutiraoemrede' },
        { text: 'Facebook', href: 'https://facebook.com/MutiraoEmRede' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/mutiraoemrede' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://facebook.com/MutiraoEmRede' },
  ],
  footNote: `
    <strong>Instituto Brasileiro de Políticas Digitais – Mutirão</strong><br/>
    Rua João Cordeiro, 3069 – Joaquim Távora – Fortaleza/CE – CEP 60.110-535
  `,
};
