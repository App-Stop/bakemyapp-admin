import breadIcon from '../../assets/menu/category-bread.svg'
import cakeIcon from '../../assets/menu/category-cake.svg'
import coffeeIcon from '../../assets/menu/category-coffee.svg'
import croissantActiveIcon from '../../assets/menu/category-croissant-active.svg'
import donutIcon from '../../assets/menu/category-donut.svg'
import croissantPanelIcon from '../../assets/menu/panel-croissant.svg'

/**
 * Menu categories (Figma 68:4643). Each has a grey `icon` for the list, an orange
 * `activeIcon` when selected, and a `panelIcon` for the products panel header.
 *
 * The frame only contains one colour variant per icon, so until the missing
 * variants are exported the other colour falls back to the one we have.
 */
export const CATEGORIES = [
  {
    key: 'croissants',
    label: 'Croissants',
    icon: croissantActiveIcon, // TODO: grey category-croissant.svg
    activeIcon: croissantActiveIcon,
    panelIcon: croissantPanelIcon,
  },
  {
    key: 'donuts',
    label: 'Donuts',
    icon: donutIcon,
    activeIcon: donutIcon, // TODO: orange category-donut-active.svg
  },
  {
    key: 'coffee',
    label: 'Coffee',
    icon: coffeeIcon,
    activeIcon: coffeeIcon, // TODO: orange category-coffee-active.svg
  },
  {
    key: 'bread',
    label: 'Bread',
    icon: breadIcon,
    activeIcon: breadIcon, // TODO: orange category-bread-active.svg
  },
  {
    key: 'cakes',
    label: 'Cakes',
    icon: cakeIcon,
    activeIcon: cakeIcon, // TODO: orange category-cake-active.svg
  },
]
