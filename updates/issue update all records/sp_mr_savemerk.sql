CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_mr_savemerk`(
merk_id INT
,merk_nama NVARCHAR(100)
,remarks TEXT
,isactive BIT
)
BEGIN
if merk_id=0 then

	INSERT INTO `merk`
(`merk_nama`,
`remarks`,
`isactive`)
VALUES
(merk_nama,
remarks,
isactive);

    select 'successfully save record' as result, LAST_INSERT_ID() as insert_id;
else
UPDATE `merk`
SET
`merk_nama` = merk_nama,
`remarks` = remarks,
`isactive` = isactive
WHERE merk.`merk_id` = merk_id;


select 'successfully update record' as result;
end if;



END