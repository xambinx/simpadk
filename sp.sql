DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cp_deletecustomerprice`(customer_id int)
BEGIN
    delete from customer_price where customer_price.customerprice_id=customerprice_id;
    select 'successfully delete record' as result;

END$$
DELIMITER ;

DELIMITER $$
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

    select 'successfully save record' as result,mysql_insert_id() as insert_id;
else
	UPDATE `customer_price`
	SET
	`customer_id` = customer_id,
	`product_id` = product_id,
	`price` = price
	WHERE `customer_price_id` = customer_price_id;


select 'successfully update record' as result;
end if;



END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cp_viewcustomerpricelist`(customer_id int,product_id int)
BEGIN
select cu.name
,cu.address,cu.phone_no,cu.remarks,pr.product_nama,cp.price,pr.remarks,mr.merk_nama,st.satuan_nama
 from customer_price cp 
INNER JOIN customer cu ON cu.customer_id=cp.customer_id
INNER JOIN product pr ON pr.product_id=cp.product_id
INNER JOIN merk mr ON mr.merk_id=pr.merk_id
INNER JOIN satuan st ON st.satuan_id=pr.satuan_id
where cp.customer_id=customer_id and cp.product_id=product_id;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cs_deletecustomer`(customer_id int, delete_permanent bit)
BEGIN
if (delete_permanent=1) then

    delete from customer where customer.customer_id=customer_id;
    select 'successfully delete record' as result;
else
	update customer cs set cs.isactive=0 where cs.customer_id=customer_id;
    select 'successfully deactivate record' as result;
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cs_savecustomer`(
customer_id INT
,name NVARCHAR(100)
,address TEXT
,phone_no NVARCHAR(100)
,remarks TEXT
,isactive BIT
)
BEGIN
if customer_id=0 then

	INSERT INTO `customer`
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
    select 'successfully save record' as result,mysql_insert_id() as insert_id;
else
UPDATE `customer`
SET
`name` = name,
`address` = address,
`phone_no` = phone_no,
`remarks` = remarks
WHERE `customer_id` = customer_id;

select 'successfully update record' as result;
end if;



END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cs_viewcustomerlist`(customer_id int, page_no int, row_ct int, isactive bit)
BEGIN
declare start_no int;
declare end_no int;

if(page_no<1) then set page_no=1;end if;
set start_no = ((page_no-1)*row_ct);

if row_ct>0 and customer_id=0
then
	SELECT cus.`customer_id`,
		cus.`name`,
		cus.`address`,
		cus.`phone_no`,
		cus.`remarks`,
		cus.`isactive`
	FROM `customer` cus
	WHERE ((cus.isactive=1 AND isactive=1) OR (isactive=0))
	AND (cus.customer_id=customer_id or customer_id=0 OR customer_id is null)
	LIMIT start_no,row_ct;
else
	SELECT cus.`customer_id`,
		cus.`name`,
		cus.`address`,
		cus.`phone_no`,
		cus.`remarks`,
		cus.`isactive`
	FROM `customer` cus
	WHERE ((cus.isactive=1 AND isactive=1) OR (isactive=0))
	AND (cus.customer_id=customer_id or customer_id=0 OR customer_id is null);
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_mr_deletemerk`(merk_id int, delete_permanent bit)
BEGIN
if (delete_permanent=1) then

    delete from merk where merk.merk_id=merk_id;
    select 'successfully delete record' as result;
else
	update merk mr set mr.isactive=0 where mr.merk_id=merk_id;
    select 'successfully deactivate record' as result;
end if;
END$$
DELIMITER ;

DELIMITER $$
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

    select 'successfully save record' as result,mysql_insert_id() as insert_id;
else
UPDATE `merk`
SET
`merk_nama` = merk_nama,
`remarks` = remarks,
`isactive` = isactive
WHERE `merk_id` = merk_id;


select 'successfully update record' as result;
end if;



END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_mr_viewmerklist`(merk_id int, page_no int, row_ct int, isactive bit)
BEGIN
declare start_no int;

if(page_no<1) then set page_no=1;end if;
set start_no = ((page_no-1)*row_ct);

if row_ct>0 and merk_id=0
then
	SELECT mr.`merk_id`,
    mr.`merk_nama`,
    mr.`remarks`,
    mr.`isactive`
	FROM `merk` mr
	WHERE ((mr.isactive=1 AND isactive=1) OR (isactive=0))
	AND (mr.merk_id=merk_id or merk_id=0 OR merk_id is null)
	LIMIT start_no,row_ct;
else
	SELECT mr.`merk_id`,
    mr.`merk_nama`,
    mr.`remarks`,
    mr.`isactive`
	FROM `merk` mr
	WHERE ((mr.isactive=1 AND isactive=1) OR (isactive=0))
	AND (mr.merk_id=merk_id or merk_id=0 OR merk_id is null);
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_od_deleteorder`(order_id int, delete_permanent bit)
BEGIN
if (delete_permanent=1) then

    delete from `order` where `order`.order_id=order_id;
    select 'successfully delete record' as result;
else
	update `order` cs set cs.isactive=0 where cs.order_id=order_id;
    select 'successfully deactivate record' as result;
end if;
END$$
DELIMITER ;

DELIMITER $$
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
remarks TEXT
)
BEGIN
if customer_id=0 then

	INSERT INTO `order`
(`order_date`,
`user_id`,
`customer_id`,
`total`,
`discount`,
`grand_total`,
`delivery_date`,
`isdelivered`,
`remarks`)
VALUES
(order_date,
user_id,
customer_id,
total,
discount,
grand_total,
delivery_date,
isdelivered,
remarks);

    select 'successfully save record' as result,mysql_insert_id() as insert_id;
else
UPDATE `order`
SET
`order_date` = order_date,
`user_id` = user_id,
`customer_id` = customer_id,
`total` = total,
`discount` = discount,
`grand_total` = grand_total,
`delivery_date` = delivery_date,
`isdelivered` = isdelivered,
`remarks` = remarks
WHERE `order_id` = order_id;


select 'successfully update record' as result;
end if;



END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_od_vieworderlist`(order_id int, customer_id int, page_no int, row_ct int, isactive bit)
BEGIN
declare start_no int;

if(page_no<1) then set page_no=1;end if;
set start_no = ((page_no-1)*row_ct);

if row_ct>0 and order_id=0
then
SELECT od.`order_id`,
    od.`order_date`,
    od.`user_id`,
    us.user_name,
    od.`customer_id`,
    cs.name,
    od.`total`,
    od.`discount`,
    od.`grand_total`,
    od.`delivery_date`,
    od.`isdelivered`,
    od.`remarks`
FROM `order`od
	INNER JOIN user us ON us.user_id=od.user_id
    INNER JOIN customer cs ON cs.customer_id=od.customer_id
    
	WHERE (od.order_id=order_id or order_id=0 OR order_id is null)
	AND (od.customer_id=customer_id or customer_id=0 OR customer_id is null)
	LIMIT start_no,row_ct;
else
	SELECT od.`order_id`,
    od.`order_date`,
    od.`user_id`,
    us.user_name,
    od.`customer_id`,
    cs.name,
    od.`total`,
    od.`discount`,
    od.`grand_total`,
    od.`delivery_date`,
    od.`isdelivered`,
    od.`remarks`
FROM `order`od
	INNER JOIN user us ON us.user_id=od.user_id
    INNER JOIN customer cs ON cs.customer_id=od.customer_id
    
	WHERE (od.order_id=order_id or order_id=0 OR order_id is null)
	AND (od.customer_id=customer_id or customer_id=0 OR customer_id is null);
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_oi_deleteorderitem`(order_item_id int)
BEGIN

    delete from `order_item` where `order_item`.order_item_id=order_item_id;
    select 'successfully delete record' as result;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_oi_saveorderitem`(
order_item_id INT,
order_id INT,
product_id INT,
customer_price_id INT,
customer_price FLOAT,
quantity INT,
subtotal FLOAT
)
BEGIN
if customer_id=0 then

	INSERT INTO `order_item`
(`order_item_id`,
`order_id`,
`product_id`,
`customer_price_id`,
`customer_price`,
`quantity`,
`subtotal`)
VALUES
(order_item_id,
order_id,
product_id,
customer_price_id,
customer_price,
quantity,
subtotal);


    select 'successfully save record' as result,mysql_insert_id() as insert_id;
else
UPDATE `order_item`
SET
`order_id` = order_id,
`product_id` = product_id,
`customer_price_id` = customer_price_id,
`customer_price` = customer_price,
`quantity` = quantity,
`subtotal` = subtotal
WHERE `order_item_id` = order_item_id;



select 'successfully update record' as result;
end if;



END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_oi_vieworderitemlist`(order_id int, page_no int, row_ct int, isactive bit)
BEGIN
declare start_no int;

if(page_no<1) then set page_no=1;end if;
set start_no = ((page_no-1)*row_ct);

if row_ct>0 and order_id=0
then
SELECT 
	oi.`order_item_id`,
    oi.`order_id`,
    pr.product_nama,
    oi.`product_id`,
    st.satuan_nama,
    oi.`customer_price_id`,
    oi.`customer_price`,
    oi.`quantity`,
    oi.`subtotal`
FROM `order_item` oi
	INNER JOIN product pr ON pr.product_id=oi.product_id
    INNER JOIN satuan st ON st.satuan_id=pr.satuan_id
	WHERE  (od.order_id=order_id or order_id=0 OR order_id is null)
	LIMIT start_no,row_ct;
else
	SELECT 
	oi.`order_item_id`,
    oi.`order_id`,
    pr.product_nama,
    oi.`product_id`,
    st.satuan_nama,
    oi.`customer_price_id`,
    oi.`customer_price`,
    oi.`quantity`,
    oi.`subtotal`
FROM `order_item` oi
	INNER JOIN product pr ON pr.product_id=oi.product_id
    INNER JOIN satuan st ON st.satuan_id=pr.satuan_id
	WHERE  (od.order_id=order_id or order_id=0 OR order_id is null);
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pr_deleteproduct`(product_id int, delete_permanent bit)
BEGIN
if (delete_permanent=1) then

    delete from product where product.product_id=product_id;
    select 'successfully delete record' as result;
else
	update product pr set pr.isactive=0 where pr.product_id=product_id;
    select 'successfully deactivate record' as result;
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pr_saveproduct`(
product_id INT
,merk_id INT
,satuan_id INT
,product_nama nvarchar(100)
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



END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pr_viewproductlist`(product_id int, page_no int, row_ct int, isactive bit)
BEGIN
declare start_no int;
declare end_no int;

if(page_no<1) then set page_no=1;end if;
set start_no = ((page_no-1)*row_ct);

if row_ct>0 and product_id=0
then
	SELECT pr.`product_id`,
    pr.`merk_id`,
    mr.merk_nama,
    pr.`satuan_id`,
    st.satuan_nama,
    pr.`product_nama`,
    pr.`remarks`,
    pr.`stock`,
    pr.`min_stock`,
	 pr.`isactive`
	FROM `product` pr
    INNER JOIN merk mr ON mr.merk_id=pr.merk_id
    INNER JOIN satuan st ON st.satuan_id=pr.satuan_id
    
	WHERE ((pr.isactive=1 AND isactive=1) OR (isactive=0))
	AND (pr.product_id=product_id or product_id=0 OR product_id is null)
	LIMIT start_no,row_ct;
else
	SELECT pr.`product_id`,
    pr.`merk_id`,
    mr.merk_nama,
    pr.`satuan_id`,
    st.satuan_nama,
    pr.`product_nama`,
    pr.`remarks`,
	pr.`stock`,
    pr.`min_stock`,
	 pr.`isactive`
	FROM `product` pr
    INNER JOIN merk mr ON mr.merk_id=pr.merk_id
    INNER JOIN satuan st ON st.satuan_id=pr.satuan_id
    
	WHERE ((pr.isactive=1 AND isactive=1) OR (isactive=0))
	AND (pr.product_id=product_id or product_id=0 OR product_id is null);
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_st_deletesatuan`(satuan_id int, delete_permanent bit)
BEGIN
if (delete_permanent=1) then

    delete from satuan where satuan.satuan_id=satuan_id;
    select 'successfully delete record' as result;
else
	update satuan st set st.isactive=0 where st.satuan_id=satuan_id;
    select 'successfully deactivate record' as result;
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_st_savesatuan`(
satuan_id INT
,satuan_nama NVARCHAR(100)
,remarks TEXT
,isactive BIT
)
BEGIN
if satuan_id=0 then

	INSERT INTO `satuan`
(`satuan_nama`,
`remarks`,
`isactive`)
VALUES
(satuan_nama,
remarks,
isactive);


    select 'successfully save record' as result,mysql_insert_id() as insert_id;
else
UPDATE `satuan`
SET
`satuan_nama` = satuan_nama,
`remarks` = remarks,
`isactive` = isactive
WHERE `satuan_id` = satuan_id;



select 'successfully update record' as result;
end if;



END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_st_viewsatuanlist`(satuan_id int, page_no int, row_ct int, isactive bit)
BEGIN
declare start_no int;

if(page_no<1) then set page_no=1;end if;
set start_no = ((page_no-1)*row_ct);

if row_ct>0 and satuan_id=0
then
	SELECT st.`satuan_id`,
    st.`satuan_nama`,
    st.`remarks`,
    st.`isactive`
	FROM `satuan` st
	WHERE ((st.isactive=1 AND isactive=1) OR (isactive=0))
	AND (st.satuan_id=satuan_id or satuan_id=0 OR satuan_id is null)
	LIMIT start_no,row_ct;
else
	SELECT st.`satuan_id`,
    st.`satuan_nama`,
    st.`remarks`,
    st.`isactive`
	FROM `satuan` st
	WHERE ((st.isactive=1 AND isactive=1) OR (isactive=0))
	AND (st.satuan_id=satuan_id or satuan_id=0 OR satuan_id is null);
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_us_changepassword`(user_id int, old_password text,new_password text)
BEGIN
if((select count(us.password) from user us where us.user_id=user_id and us.password=old_password)>0)
then
update user set password=new_password where user.user_id=user_id;
select 1 as result;
else
select 0 as result;
end if;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_us_deleteuser`(user_id int, delete_permanent bit)
BEGIN
if (delete_permanent=1) then

    delete from user where user.user_id=user_id;
    select 'successfully delete record' as result;
    
else
	update user us set us.isactive=0 where us.user_id=user_id;
    select 'successfully delete record' as result;
end if;
END$$
DELIMITER ;

DELIMITER $$
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
	select 'successfully save record' as result,mysql_insert_id() as insert_id;
else
	UPDATE `user`
	SET
    `user_name`=user_name,
	`user_level` = user_level
	WHERE `user_id` = user_id;

	select 'successfully update record' as result;
end if;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_us_viewuserlist`(user_id int, page_no int, row_ct int, isactive bit)
BEGIN
declare start_no int;
declare end_no int;

if(page_no<1) then set page_no=1;end if;
set start_no = ((page_no-1)*row_ct);

if row_ct>0 and user_id=0
then
	SELECT usr.`user_id`,
    usr.`user_name`,
    usr.`password`,
    usr.`user_level`,
    usr.`isactive`
	FROM `user`usr
	WHERE ((usr.isactive=1 AND isactive=1) OR (isactive=0))
	AND (usr.user_id=user_id or user_id=0 OR user_id is null)
	LIMIT start_no,row_ct;
else
	SELECT usr.`user_id`,
    usr.`user_name`,
    usr.`password`,
    usr.`user_level`,
    usr.`isactive`
	FROM `user`usr
	WHERE ((usr.isactive=1 AND isactive=1) OR (isactive=0))
	AND (usr.user_id=user_id or user_id=0 OR user_id is null);
end if;
END$$
DELIMITER ;
