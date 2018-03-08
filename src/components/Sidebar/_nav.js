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
        },
        {
          name: 'Entradas',
          url: '/recharge-wait',
          icon: 'icon-action-redo',
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
      url: '/register',
      icon: 'icon-people',
      children: [
        {
          name: 'Crear',
          url: '/register',
          icon: 'icon-user-follow',
        },
        {
          name: 'Lista',
          url: '/listUser',
          icon: 'icon-list',
        },
      ]
    }
  ]
};
