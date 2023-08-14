ALTER TABLE `usuario` CHANGE `usuario_cad_token` `usuario_cad_token` DATETIME NULL, CHANGE `usuario_intentos_fallidos` `usuario_intentos_fallidos` INT(11) NOT NULL DEFAULT '0', CHANGE `usuario_fecha_bloqueo` `usuario_fecha_bloqueo` DATETIME NULL, CHANGE `usuario_token_recuperar_pass` `usuario_token_recuperar_pass` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NULL, CHANGE `usuario_cad_token_recuperacion` `usuario_cad_token_recuperacion` DATETIME NULL;
ALTER TABLE `accionesrealizadas` ADD `acciones_realizadas_actualizacion` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `acciones_valor_nuevo`;

ALTER TABLE `accionesrealizadas` CHANGE `acciones_valor_antiguo` `acciones_valor_antiguo` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NULL, CHANGE `acciones_valor_nuevo` `acciones_valor_nuevo` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NULL;

UPDATE `permisos` SET `permisos_nombre_funcion` = 'crear' WHERE `permisos`.`permisos_id` = 4;
ALTER TABLE `accionesrealizadas` CHANGE `acciones_id` `acciones_id` INT(11) NOT NULL AUTO_INCREMENT;
