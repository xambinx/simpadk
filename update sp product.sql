CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pr_saveproduct`(
product_id INT
,merk_id INT
,satuan_id INT
,product_nama nvarchar(100)
,stock INT
,min_stock INT

,remarks TEXT
,isactive BIT
)
BEGIN
if product_id=0 then

	INSERT INTO `product`
	(`merk_id`,
	`satuan_id`,
	`product_nama`,
	`remarks`,
    `stock`,
    `min_stock`,
	`isactive`)
	VALUES
	(merk_id,
	satuan_id,
	product_nama,
	remarks,
	stock,
    min_stock,
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
	`isactive` = isactive
	WHERE `product_id` = product_id;


select 'successfully update record' as result;
end if;



END