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