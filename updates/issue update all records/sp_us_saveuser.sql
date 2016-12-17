CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_us_saveuser`(
user_id INT,
user_name NVARCHAR(20),
password TEXT,
user_level INT,
isactive BIT
)
BEGIN
if user_id=0 then

	INSERT INTO `user`
	(`user_id`,
	`user_name`,
	`password`,
	`user_level`,
	`isactive`)
	VALUES
	(user_id,
	user_name,
	password,
	user_level,
	1);
	select 'successfully save record' as result, LAST_INSERT_ID() as insert_id;
else
	UPDATE `user`
	SET
    `user_name`=user_name,
	`user_level` = user_level
	WHERE user.`user_id` = user_id;

	select 'successfully update record' as result;
end if;
END