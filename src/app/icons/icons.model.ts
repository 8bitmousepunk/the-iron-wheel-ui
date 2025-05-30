import { Theme } from '../theme/theme.service';

export enum Icon {
  AgravatedDark = "agravated_dark",
  Agravated = "agravated",
  ChroniclesOfDarkness = "chronicles_of_darkness",
  Decrease = "decrease",
  EyeClosed = "eye_closed",
  EyeOpened = "eye_opened",
  Increase = "increase",
  Lethal_dark = "lethal_dark",
  Lethal = "lethal",
  Melee = "melee",
  PointCrossedDark = "point_crossed_dark",
  PointCrossed = "point_crossed",
  PointEmpty = "point_empty",
  PointFilledDark = "point_filled_dark",
  PointFilled = "point_filled",
  Raise = "raise",
  Ranged = "ranged",
  Revert = "revert",
  Save = "save",
  Light = 'light',
  Dark = 'dark'
}

export const IconPathes: {[key in Icon]: string} = {
  agravated_dark: '/icons/agravated_dark.svg',
  agravated: '/icons/agravated.svg',
  chronicles_of_darkness: '/icons/chronicles_of_darkness.svg',
  decrease: '/icons/decrease.svg',
  eye_closed: '/icons/eye_closed.svg',
  eye_opened: '/icons/eye_opened.svg',
  increase: '/icons/increase.svg',
  lethal_dark: '/icons/lethal_dark.svg',
  lethal: '/icons/lethal.svg',
  melee: '/icons/melee.svg',
  point_crossed_dark: '/icons/point_crossed_dark.svg',
  point_crossed: '/icons/point_crossed.svg',
  point_empty: '/icons/point_empty.svg',
  point_filled_dark: '/icons/point_filled_dark.svg',
  point_filled: '/icons/point_filled.svg',
  raise: '/icons/raise.svg',
  ranged: '/icons/ranged.svg',
  revert: '/icons/revert.svg',
  save: '/icons/save.svg',
  light: '/icons/light.svg',
  dark: '/icons/dark.svg'
}

export const IconThemeMap: Partial<{[key in Icon]: {[Theme.Light]: Icon, [Theme.Dark]: Icon}}> = {
  agravated: { light: Icon.Agravated, dark: Icon.AgravatedDark },
  lethal: { light: Icon.Lethal, dark: Icon.Lethal_dark },
  point_crossed: { light: Icon.PointCrossed, dark: Icon.PointCrossedDark },
  point_filled: { light: Icon.PointFilled, dark: Icon.PointFilledDark },
  light: { light: Icon.Light, dark: Icon.Dark }
}
