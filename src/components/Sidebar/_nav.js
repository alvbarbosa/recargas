export default {
  items: [
    {
      name: 'Recargas',
      url: '/dashboard',
      icon: 'icon-phone',
      children: [
        {
          name: 'Recargar',
          url: '/dashboard',
          icon: 'icon-screen-smartphone',
        },
        {
          name: 'Historial',
          url: '/record',
          icon: 'icon-clock',
        },
        {
          name: 'Entradas',
          url: '/recharge-wait',
          icon: 'icon-action-redo',
          restrict: 1
        }
      ],
    },
    {
      name: 'Compras',
      url: '/purchases',
      icon: 'icon-basket-loaded',
    },
    {
      name: 'Usuarios',
      url: '/users',
      icon: 'icon-people',
      restrict: 2
    }
  ]
};
