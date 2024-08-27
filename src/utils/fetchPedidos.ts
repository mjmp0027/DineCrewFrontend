import {Pedido} from '../types/Pedido';

const fetchPedidos = async (
  token: string,
  userId: string | null,
  role: string | null,
): Promise<Pedido[]> => {
  try {
    const url = `http://10.0.2.2:8080/api/pedidos?userId=${userId}&role=${role}`;

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      data.sort((a: Pedido, b: Pedido) => {
        const dateComparison =
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        if (dateComparison !== 0) {
          return dateComparison;
        } else {
          return b.mesa.localeCompare(a.mesa);
        }
      });

      return data;
    } else {
      console.error('Failed to fetch pedidos');
      return [];
    }
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    return [];
  }
};

export default fetchPedidos;
