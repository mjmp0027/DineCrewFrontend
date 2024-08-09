type Estado = 'LEIDA' | 'NOLEIDA';

export interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  timestamp: string;
  userId: string;
  leida: Estado;
}
