export class UserMapper {
  static mapUserOpenOrder(orden) {
    return {
      orden_id: orden.getId(),
      status_orden: orden.getStatusOrden(),
      fecha_orden: orden.getFechaOrden(),
      presentations: orden.productos,
    };
  }

  static mapOrderStatus(orden) {
    return {
      orden_id: orden.getId(),
      status_orden: orden.getStatusOrden(),
      fecha_orden: orden.getFechaOrden(),
    };
  }

  static mapSignIn(usuario) {
    return {
      id: usuario.getId(),
      identification: usuario.getIdentificacion(),
      email: usuario.getCorreo(),
      name: usuario.getNombreCompleto(),
    };
  }

  static mapLogIn(usuario) {
    return {
      id: usuario.getId(),
      identification: usuario.getIdentificacion(),
      email: usuario.getCorreo(),
      name: usuario.getNombreCompleto(),
      ordenes: usuario.ordenes,
    };
  }
}
