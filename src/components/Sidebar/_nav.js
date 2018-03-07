export default {
  items: [
    {
      name: 'Recargas',
      url: '/dashboard',
      icon: 'icon-phone',
      children: [
        {
          name: 'Recargar',
          url: '/recharge',
          icon: 'icon-screen-smartphone',
        },
        {
          name: 'Historial',
          url: '/record',
          icon: 'icon-clock',
        }
      ],
    },
    {
      name: 'Compras',
      url: '/purchases',
      icon: 'icon-basket-loaded',
    }
  ]
};
