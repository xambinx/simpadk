CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_sp_savesupplier`(
supplier_id INT
,name NVARCHAR(100)
,address TEXT
,phone_no NVARCHAR(100)
,remarks TEXT
,isactive BIT
)
BEGIN
if supplier_id=0 then
	INSERT INTO `supplier`
	(
	`name`,
	`address`,
	`phone_no`,
	`remarks`,
	`isactive`)
	VALUES
	(name
	,address
	,phone_no
	,remarks
	,1);
    select 'successfully save record' as result, LAST_INSERT_ID() as insert_id;
else
UPDATE `supplier`
SET
`name` = name,
`address` = address,
`phone_no` = phone_no,
`remarks` = remarks
WHERE supplier.`supplier_id` = supplier_id;

select 'successfully update record' as result;
end if;



END