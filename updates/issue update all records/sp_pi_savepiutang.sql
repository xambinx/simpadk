CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pi_savepiutang`(IN `piutang_id` INT
, IN `piutang_date` DATETIME, IN `customer_id` INT, IN `order_id` INT, IN `value` INT, IN `paid` INT, IN `balance` INT, IN `due_date` DATETIME)
BEGIN
if piutang_id=0 then

	INSERT INTO `simpadk`.`piutang`
(`piutang_id`,
`piutang_date`,
`customer_id`,
`order_id`,
`value`,
`paid`,
`balance`,
`due_date`)
VALUES
(piutang_id,
piutang_date,
customer_id,
order_id,
value,
paid,
balance,
due_date);


    select 'successfully save record' as result, LAST_INSERT_ID() as insert_id;
else
	UPDATE `piutang`
SET
`value` = value,
`paid` = paid,
`balance` = balance,
`due_date` = due_date
WHERE piutang.`piutang_id` = piutang_id;



select 'successfully update record' as result;
end if;



END