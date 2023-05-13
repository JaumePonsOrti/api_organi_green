INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES (NULL, 'menu', 'get');
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES
(NULL, '0', '24', '0'), (NULL, '1', '24', '0'),(NULL, '2', '24', '0'), (NULL, '3', '24', '0'),
(NULL, '4', '24', '0'),(NULL, '5', '24', '0'),(NULL, '6', '24', '0'),(NULL, '7', '24', '0');

INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES
(NULL, '0', '1', '1'), (NULL, '1', '1', '1'), (NULL, '2', '1', '1'), (NULL, '3', '1', '1'),
 (NULL, '4', '1', '1'), (NULL, '5', '1', '1'), (NULL, '7', '1', '1');

DELETE FROM `permisos_de_rol_app` WHERE `permisos_de_rol_app`.`permisos_de_rol_app_id` = 3;
DELETE FROM `permisos_de_rol_app` WHERE `permisos_de_rol_app`.`permisos_de_rol_app_id` = 4;
