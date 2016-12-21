CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pr_viewproductlistcustomer`(IN `product_id` INT,IN customer_id INT)
BEGIN

	SELECT pr.`product_id`,
    pr.`merk_id`,
    mr.merk_nama,
    pr.`satuan_id`,
    st.satuan_nama,
    pr.`product_nama`,
    pr.`remarks`,
    pr.`stock`,
    pr.`min_stock`,
	  pr.`isactive`,
	  pr.`default_price`,
      cp.price as customer_price
	FROM `product` pr
    INNER JOIN merk mr ON mr.merk_id=pr.merk_id
    INNER JOIN satuan st ON st.satuan_id=pr.satuan_id
	LEFT JOIN customer_price cp ON (cp.customer_id=customer_id AND cp.product_id = pr.product_id)
	WHERE ((pr.isactive=1))
	AND (pr.product_id=product_id or product_id=0 OR product_id is null);
    

END

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_pr_viewproductlist`(IN `product_id` INT, IN `page_no` INT, IN `row_ct` INT, IN `isactive` BIT)
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
	  pr.`isactive`,
	  pr.`default_price`,
      pr.supplier_price
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
	  pr.`isactive`,
	  pr.`default_price`,
      pr.supplier_price
	FROM `product` pr
    INNER JOIN merk mr ON mr.merk_id=pr.merk_id
    INNER JOIN satuan st ON st.satuan_id=pr.satuan_id

	WHERE ((pr.isactive=1 AND isactive=1) OR (isactive=0))
	AND (pr.product_id=product_id or product_id=0 OR product_id is null);
end if;
END