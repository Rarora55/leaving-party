import cloud1 from '../../../Components/Clouds/1.png';
import cloud2 from '../../../Components/Clouds/2.png';
import cloud3 from '../../../Components/Clouds/3.png';
import cloud4 from '../../../Components/Clouds/4.png';
import cloud5 from '../../../Components/Clouds/5.png';
import cloud6 from '../../../Components/Clouds/6.png';
import blackhorseMap from '../../../Components/Map/BlackhorseMap.webp';
import { HOME_ROUTE } from './navigation.constants';
import type { HalfMileSceneConfig } from '../types/site.types';

export const HALF_MILE_SURFACE_TOKENS = {
  skyColor: '#BFE9FF',
  pageGlow:
    'linear-gradient(180deg, rgba(191, 233, 255, 0.96) 0%, rgba(184, 226, 250, 0.95) 52%, rgba(176, 218, 245, 1) 100%)',
  mistGlow:
    'radial-gradient(circle at top left, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0) 28%)',
  horizonGlow:
    'radial-gradient(circle at 50% 78%, rgba(173, 216, 244, 0.62), rgba(173, 216, 244, 0) 40%)',
} as const;

export const HALF_MILE_SCENE_CONFIG: HalfMileSceneConfig = {
  mapAssetSrc: blackhorseMap,
  mapAlt: 'The Half Mile brewery map with interactive hotspot markers.',
  mapTopMargin: 'mt-10 sm:mt-14 lg:mt-16',
  mapBottomMargin: 'mb-24 sm:mb-28 lg:mb-32',
  cta: {
    id: 'home',
    label: 'Back Home',
    route: HOME_ROUTE,
    ariaLabel: 'Navigate back to Home',
    bottomOffsetMobile: 16,
    bottomOffsetDesktop: 28,
    maxWidth: 'min(100%, 16rem)',
  },
  clouds: [
    {
      id: 'half-mile-cloud-1',
      assetSrc: cloud1,
      width: 'clamp(88px, 12vw, 148px)',
      opacity: 0.52,
      minXPercent: 4,
      maxXPercent: 28,
      minYPercent: 4,
      maxYPercent: 22,
      zIndex: 4,
    },
    {
      id: 'half-mile-cloud-2',
      assetSrc: cloud2,
      width: 'clamp(100px, 14vw, 182px)',
      opacity: 0.74,
      minXPercent: 62,
      maxXPercent: 90,
      minYPercent: 6,
      maxYPercent: 24,
      zIndex: 6,
    },
    {
      id: 'half-mile-cloud-3',
      assetSrc: cloud3,
      width: 'clamp(124px, 16vw, 210px)',
      opacity: 0.62,
      minXPercent: 8,
      maxXPercent: 36,
      minYPercent: 30,
      maxYPercent: 46,
      zIndex: 5,
    },
    {
      id: 'half-mile-cloud-4',
      assetSrc: cloud4,
      width: 'clamp(88px, 12vw, 150px)',
      opacity: 0.48,
      minXPercent: 62,
      maxXPercent: 88,
      minYPercent: 30,
      maxYPercent: 52,
      zIndex: 4,
    },
    {
      id: 'half-mile-cloud-5',
      assetSrc: cloud5,
      width: 'clamp(74px, 10vw, 130px)',
      opacity: 0.58,
      minXPercent: 24,
      maxXPercent: 50,
      minYPercent: 54,
      maxYPercent: 68,
      zIndex: 3,
    },
    {
      id: 'half-mile-cloud-6',
      assetSrc: cloud6,
      width: 'clamp(110px, 14vw, 190px)',
      opacity: 0.76,
      minXPercent: 52,
      maxXPercent: 82,
      minYPercent: 56,
      maxYPercent: 72,
      zIndex: 5,
    },
  ],
  breweries: [
    {
      id: 'east-london-brewing-co',
      name: 'East London Brewing Co',
      websiteUrl: 'https://www.eastlondonbrewing.com/pages/blackhorse-road',
      cardPlacement: 'bottom',
      hotspot: {
        xPercent: 40.9,
        yPercent: 10.5,
        radiusPxMobile: 14,
        radiusPxDesktop: 16,
      },
    },
    {
      id: 'exale',
      name: 'Exale',
      websiteUrl: 'https://www.exale.uk/',
      cardPlacement: 'right',
      hotspot: {
        xPercent: 47.8,
        yPercent: 27.4,
        radiusPxMobile: 14,
        radiusPxDesktop: 16,
      },
    },
    {
      id: 'signature-brew',
      name: 'Signature Brew',
      websiteUrl: 'https://www.signaturebrew.co.uk/password',
      cardPlacement: 'right',
      hotspot: {
        xPercent: 35.3,
        yPercent: 43.5,
        radiusPxMobile: 16,
        radiusPxDesktop: 18,
      },
    },
    {
      id: 'pretty-decent-beer-co',
      name: 'Pretty Decent Beer Co',
      websiteUrl: 'https://prettydecentbeer.co/',
      cardPlacement: 'left',
      hotspot: {
        xPercent: 48.1,
        yPercent: 39.9,
        radiusPxMobile: 14,
        radiusPxDesktop: 16,
      },
    },
    {
      id: 'hackney-church-brew-co',
      name: 'Hackney Church Brew Co',
      websiteUrl: 'https://hackneychurchbrew.co/',
      cardPlacement: 'left',
      hotspot: {
        xPercent: 55.9,
        yPercent: 53.4,
        radiusPxMobile: 14,
        radiusPxDesktop: 16,
      },
    },
    {
      id: '40ft-brewery',
      name: '40FT Brewery',
      websiteUrl: 'https://40ftbrewery.com/',
      cardPlacement: 'bottom',
      hotspot: {
        xPercent: 50.8,
        yPercent: 9.5,
        radiusPxMobile: 14,
        radiusPxDesktop: 16,
      },

    },
  ],
} as const;
