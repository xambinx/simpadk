CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cp_savecustomerprice`(
customer_price_id INT,
	customer_id INT,
	product_id INT,
	price FLOAT
)
BEGIN
if customerprice_id=0 then

	INSERT INTO `customer_price`
	(`customer_id`,
	`product_id`,
	`price`)
	VALUES(
	customer_id,
	product_id,
	price);

    select 'successfully save record' as result, LAST_INSERT_ID() as insert_id;
else
	UPDATE `customer_price`
	SET
	`customer_id` = customer_id,
	`product_id` = product_id,
	`price` = price
	WHERE customer_price.`customer_price_id` = customer_price_id;


select 'successfully update record' as result;
end if;



END