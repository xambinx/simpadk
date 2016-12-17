CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pr_saveproduct`(IN `product_id` INT, IN `merk_id` INT, IN `satuan_id` INT, IN `product_nama` TEXT, IN `remarks` TEXT, IN `isactive` BIT, IN `stock` INT, IN `min_stock` INT,IN `supplier_price` INT,IN `default_price` INT)
BEGIN
if product_id=0 then

	INSERT INTO `product`
	(`merk_id`,
	`satuan_id`,
	`product_nama`,
	`remarks`,
    `stock`,
    `min_stock`,
    `supplier_price`,
	`default_price`,
	`isactive`)
	VALUES
	(merk_id,
	satuan_id,
	product_nama,
	remarks,
	stock,
    min_stock,
    supplier_price,
    default_price,
    isactive);

    select 'successfully save record' as result, LAST_INSERT_ID() as insert_id;
else
	UPDATE`product`
	SET
	`merk_id` = merk_id,
	`satuan_id` = satuan_id,
	`product_nama` = product_nama,
	`remarks` = remarks,
	`stock`=stock,
    `min_stock`=min_stock,
    `supplier_price`=supplier_price,
    `default_price`=default_price,
	`isactive` = isactive
	WHERE product.`product_id` = product_id;


select 'successfully update record' as result;
end if;



END