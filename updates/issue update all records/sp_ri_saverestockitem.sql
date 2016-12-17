CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ri_saverestockitem`(IN `restock_item_id` INT
, IN `restock_id` INT
, IN `product_id` INT
,  IN `price` FLOAT
, IN `quantity` INT
, IN `subtotal` FLOAT)
BEGIN
if restock_item_id=0 then

	INSERT INTO `restock_item`
(
`restock_id`,
`product_id`,
`price`,
`quantity`,
`subtotal`)
VALUES
(
restock_id,
product_id,
price,
quantity,
subtotal);
UPDATE product as t1,
(SELECT * FROM product WHERE product.`product_id`= product_id) as t2 
SET t1.stock = t2.stock+ quantity
WHERE t1.product_id = product_id;

    select 'successfully save record' as result, LAST_INSERT_ID() as insert_id;
else
UPDATE `restock_item`
SET
`restock_id` = restock_id,
`product_id` = product_id,
`price` = price,
`quantity` = quantity,
`subtotal` = subtotal
WHERE restock_item.`restock_item_id` = restock_item_id;



select 'successfully update record' as result;
end if;



END