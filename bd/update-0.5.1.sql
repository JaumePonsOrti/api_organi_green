INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (NULL, '0', '25', '1'), (NULL, '1', '25', '1'), (NULL, '0', '4', '1'), (NULL, '1', '4', '1'), (NULL, '0', '5', '1'), (NULL, '1', '5', '1');
UPDATE `permisos` SET `permisos_id` = '154' WHERE `permisos`.`permisos_id` = 1; UPDATE `permisos` SET `permisos_id` = '151' WHERE `permisos`.`permisos_id` = 4; UPDATE `permisos` SET `permisos_id` = '152' WHERE `permisos`.`permisos_id` = 5; UPDATE `permisos` SET `permisos_id` = '153' WHERE `permisos`.`permisos_id` = 6; UPDATE `permisos` SET `permisos_id` = '88' WHERE `permisos`.`permisos_id` = 8; UPDATE `permisos` SET `permisos_id` = '81' WHERE `permisos`.`permisos_id` = 9; UPDATE `permisos` SET `permisos_id` = '82' WHERE `permisos`.`permisos_id` = 10; UPDATE `permisos` SET `permisos_id` = '83' WHERE `permisos`.`permisos_id` = 11; UPDATE `permisos` SET `permisos_id` = '143' WHERE `permisos`.`permisos_id` = 12; UPDATE `permisos` SET `permisos_id` = '1', `permisos_nombre_controlador` = 'app' WHERE `permisos`.`permisos_id` = 13; UPDATE `permisos` SET `permisos_id` = '85' WHERE `permisos`.`permisos_id` = 14; UPDATE `permisos` SET `permisos_id` = '84' WHERE `permisos`.`permisos_id` = 15;
UPDATE `permisos` SET `permisos_id` = '156' WHERE `permisos`.`permisos_id` = 154;

INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES ('21', 'app', 'create');

INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES ('31', 'campo', 'crear'), ('32', 'campo', 'ver'), ('33', 'campo', 'actualizar'), ('35', 'campo', 'borrar'), ('34', 'campo', 'remplazar');

INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES ('51', 'parcelas', 'crear'), ('52', 'parcelas', 'ver'), ('53', 'parcelas', 'actualizar'), ('54', 'parcelas', 'remplazar'), ('55', 'cliente', 'borrar'), ('56', 'cliente', 'count');

set @controller = "permisos";
set @n = "70";
INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES (@n+'1', @controller, 'crear'), (@n+'2', @controller, 'ver'), (@n+'3', @controller, 'actualizar'), (@n+'4', @controller, 'remplazar'), (@n+'5', @controller, 'borrar'), (@n+'6', @controller, 'count');

set @n = "90";
set @controller = "permisos_rol";
INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES (@n+'1', @controller, 'crear'), (@n+'2', @controller, 'ver'), (@n+'3', @controller, 'actualizar'), (@n+'4', @controller, 'remplazar'), (@n+'5', @controller, 'borrar'), (@n+'6', @controller, 'count');


set @n = "100";
set @controller = "planificacion";
INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES (@n+'1', @controller, 'crear'), (@n+'2', @controller, 'ver'), (@n+'3', @controller, 'actualizar'), (@n+'4', @controller, 'remplazar'), (@n+'5', @controller, 'borrar'), (@n+'6', @controller, 'count');


set @n = "110";
set @controller = "productos";
INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES (@n+'1', @controller, 'crear'), (@n+'2', @controller, 'ver'), (@n+'3', @controller, 'actualizar'), (@n+'4', @controller, 'remplazar'), (@n+'5', @controller, 'borrar'), (@n+'6', @controller, 'count');



set @n = "120";
set @controller = "productos_planificados";
INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES (@n+'1', @controller, 'crear'), (@n+'2', @controller, 'ver'), (@n+'3', @controller, 'actualizar'), (@n+'4', @controller, 'remplazar'), (@n+'5', @controller, 'borrar'), (@n+'6', @controller, 'count');

set @n = "130";
set @controller = "permisos_rol";
INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES (@n+'1', @controller, 'crear'), (@n+'2', @controller, 'ver'), (@n+'3', @controller, 'actualizar'), (@n+'4', @controller, 'remplazar'), (@n+'5', @controller, 'borrar'), (@n+'6', @controller, 'count');



set @n = "140";
set @controller = "unidad_medida";
INSERT INTO `permisos` (`permisos_id`, `permisos_nombre_controlador`, `permisos_nombre_funcion`) VALUES (@n+'1', @controller, 'crear'), (@n+'2', @controller, 'ver'), (@n+'3', @controller, 'actualizar'), (@n+'4', @controller, 'remplazar'), (@n+'5', @controller, 'borrar'), (@n+'6', @controller, 'count');



set @id_p_r = 8000;
set @rol = 8;

set @permiso = 7;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso, @rol, @permiso, '1');

//Repetir con todas las series de permisos

set @seriepermiso = 20;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');



/*#lo hacemos con la serie 0 y luego de la 40 a la 150*/
set @rol = 1;
set @id_p_r = 1000 * @rol;

set @permiso = 7;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso, @rol, @permiso, '1');



set @seriepermiso = 40;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');


set @seriepermiso = 50;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');

set @seriepermiso = 60;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');


set @seriepermiso = 70;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');




set @seriepermiso = 80;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');




set @seriepermiso = 90;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @seriepermiso = 100;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');

set @seriepermiso = 110;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');

set @seriepermiso = 120;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');

set @seriepermiso = 130;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');

set @seriepermiso = 140;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');

set @seriepermiso = 150;
set @permiso = @seriepermiso + 1;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 2;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 3;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 4;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 5;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');
set @permiso = @seriepermiso + 6;
INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES (@id_p_r + @permiso,  @rol, @permiso, '1');


INSERT INTO `permisos_rol` (`permisos_rol_id`, `permisos_rol_rol_id`, `permisos_rol_permisos_id`, `permisos_rol_permitido`) VALUES ('1992', '1', '992', '0'), ('8992', '8', '992', '0');
