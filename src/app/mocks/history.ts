export const history = [
    {
      Fecha: '29/10/2020',
      Descripcion: '1 x Tarjeta Google $25.00',
      total: 25.00
    },
    {
      Fecha: '29/10/2020',
      Descripcion: '3 x Tarjeta Google $25.00',
      total: 75.00
    },
    {
      Fecha: '29/10/2020',
      Descripcion: '2 x Tarjeta Google $25.00',
      total: 50.00
    },
    {
      Fecha: '29/10/2020',
      Descripcion: '3 x Tarjeta Google $25.00',
      total: 75.00
    }
  ];

export const rHistory = history.map(item => ({
    date: item.Fecha,
    description: item.Descripcion,
    total: item.total
  }));
