CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_od_saveorder`(
order_id INT,
order_date DATETIME,
user_id INT,
customer_id INT,
total FLOAT,
discount FLOAT,
grand_total FLOAT,
delivery_date DATETIME,
isdelivered BIT,
remarks TEXT,
due_date DATETIME,
iscredit BIT
)
BEGIN
DECLARE new_id INT DEFAULT 0;

if order_id=0 then

	INSERT INTO `order`
	(`order_date`,
	`user_id`,
	`customer_id`,
	`total`,
	`discount`,
	`grand_total`,
	`delivery_date`,
	`isdelivered`,
	`remarks`,
    `due_date`,
    `iscredit`)
	VALUES
	(order_date,
	user_id,
	customer_id,
	total,
	discount,
	grand_total,
	delivery_date,
	isdelivered,
	remarks,
    due_date,
    iscredit);

	SET new_id = LAST_INSERT_ID();
	IF iscredit=1 THEN
		INSERT INTO `simpadk`.`piutang`
		(`piutang_date`,
		`customer_id`,
		`order_id`,
		`value`,
		`paid`,
		`balance`,
		`due_date`)
		VALUES
		(order_date,
		customer_id,
		new_id,
		grand_total,
		0,
		grand_total,
		due_date);
	ELSE
		INSERT INTO `cashflow`
		(`cashflow_date`,
		`order_id`,
		`restock_id`,
		`value`,
		`remarks`)
		VALUES
		(order_date,
		new_id,
		NULL,
		grand_total,
		remarks);

	END IF;
    select 'successfully save record' as result, new_id  as insert_id;
else

	UPDATE `order`
	SET
	
	`total` = total,
	`discount` = discount,
	`grand_total` = grand_total,
	`delivery_date` = delivery_date,
	`isdelivered` = isdelivered,
	`remarks` = remarks,
    `due_date`=due_date
    #iscredit ga boleh diedit, nanti mesti ngehapus 
	WHERE `order`.`order_id` = order_id;

	IF iscredit=1 THEN
		UPDATE `piutang` as t1,
		(SELECT paid FROM piutang WHERE `order_id`=order_id) as t2
		SET
		t1.`value` = grand_total,
		t1.`balance` = grand_total-t2.paid,
		t1.`due_date` = due_date
		WHERE t1.`order_id` = order_id;
	else
		
        UPDATE `cashflow`
		SET
		`value` = grand_total,
		`remarks` = remarks
		WHERE cashflow.`order_id` = order_id;

	END IF;

	select 'successfully update record' as result;
end if;



END